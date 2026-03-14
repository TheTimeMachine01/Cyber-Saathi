import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

// Paths to the system prompt files
const INTRO_PROMPT_PATH = "/home/ashish/Code/backend/cyber/info/intro.txt";
const INVALID_ID_PROMPT_PATH = "/home/ashish/Code/backend/cyber/info/invalid_ID.txt";
const CLASSIFY_CASE_PROMPT_PATH = "/home/ashish/Code/backend/cyber/info/classify_case.txt";

// Local Ollama config — override via .env.local
const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://10.42.0.15:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "qwen2.5:7b";

function parseCaseResponse(text: string): { caseNumber: string | null } | null {
  try {
    const match = text.match(/\{[\s\S]*?"case_number"[\s\S]*?\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    if ("case_number" in parsed) {
      return { caseNumber: parsed.case_number };
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt = "", context = [], state = "INIT" } = await req.json();

    let systemPromptPath = INTRO_PROMPT_PATH;
    let nextState = state;
    let responseContent = "";
    let updatedContext = context;

    // Evaluate current state and prompt if not INIT
    if (state === "WAIT_ID" && prompt) {
      // We received the ID in the prompt
      // Actually, we should send it to the AI first, get the response, and then evaluate
      // Let's call Ollama first
    }

    // STATE MACHINE LOGIC
    // We need to decide which system prompt to use for the CURRENT call based on the state.
    // However, if the user sends a prompt, we evaluate it with the CURRENT state's context, get response,
    // THEN we evaluate the response to possibly transition to NEXT state.

    // 1. Determine prompt path
    if (state === "INIT" || state === "WAIT_ID") {
      systemPromptPath = INTRO_PROMPT_PATH;
    } else if (state === "WAIT_STATEMENT") {
      systemPromptPath = CLASSIFY_CASE_PROMPT_PATH;
    }

    const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8").trim();

    // 2. Call local Ollama API
    // On INIT, we need a trigger prompt so the model actually introduces itself
    const actualPrompt = (state === "INIT" && !prompt)
      ? "Introduce yourself and ask me for the case number."
      : prompt;

    const ollamaRes = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: actualPrompt,
        system: systemPrompt,
        context: context.length > 0 ? context : undefined,
        stream: false,
      }),
    });

    if (!ollamaRes.ok) {
      const err = await ollamaRes.text();
      return NextResponse.json({ error: `Ollama error: ${err}` }, { status: 502 });
    }

    const data = await ollamaRes.json();
    responseContent = data.response ?? "";
    updatedContext = data.context ?? [];

    // 3. Evaluate response to transition state
    if (state === "INIT") {
      nextState = "WAIT_ID";
    } else if (state === "WAIT_ID") {
      // Programmatic validation: extract a 14-digit number from the user's prompt
      const digitMatch = prompt.match(/\b(\d{14})\b/);
      const isValidCaseId = !!digitMatch;
      const extractedCaseNumber = digitMatch ? digitMatch[1] : null;

      // We already sent the prompt to Ollama above (to maintain context), but we
      // DISCARD its response for validation. We use our own programmatic check instead.

      if (isValidCaseId && extractedCaseNumber) {
        // VALID 14-digit ID -> Transition to WAIT_STATEMENT
        nextState = "WAIT_STATEMENT";

        // Override responseContent: include the case number JSON so frontend can parse it
        responseContent = `{"case_number":"${extractedCaseNumber}"}`;

        // Now call Ollama with classify_case.txt to ask for the victim's statement
        const nextSystemPrompt = fs.readFileSync(CLASSIFY_CASE_PROMPT_PATH, "utf-8").trim();
        const nextRes = await fetch(`${OLLAMA_URL}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: OLLAMA_MODEL,
            system: nextSystemPrompt,
            prompt: "The case number has been verified. Please respond to the officer with the next required instructions according to your system prompt.",
            context: updatedContext,
            stream: false,
          }),
        });

        if (nextRes.ok) {
          const nextData = await nextRes.json();
          responseContent = responseContent + "\n\n" + (nextData.response ?? "");
          updatedContext = nextData.context ?? updatedContext;
        }
      } else {
        // NOT a valid 14-digit number -> Stay in WAIT_ID, ask again
        const invalidSystemPrompt = fs.readFileSync(INVALID_ID_PROMPT_PATH, "utf-8").trim();
        const invalidRes = await fetch(`${OLLAMA_URL}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: OLLAMA_MODEL,
            system: invalidSystemPrompt,
            prompt: "The ID provided was invalid. Please ask for a valid 14-digit case number.",
            context: updatedContext,
            stream: false,
          }),
        });

        if (invalidRes.ok) {
          const invalidData = await invalidRes.json();
          // Replace raw response entirely with the invalid ID message
          responseContent = invalidData.response ?? "";
          updatedContext = invalidData.context ?? updatedContext;
        }
      }
    } else if (state === "WAIT_STATEMENT") {
      // Check if the output contains the classification JSON
      const match = responseContent.match(/\{[\s\S]*?"case_type"[\s\S]*?\}/);
      if (match) {
        nextState = "DONE";
      } else {
        // Null JSON -> Invalid statement -> Stay in Wait Statement
        nextState = "WAIT_STATEMENT";
      }
    }

    return NextResponse.json({ content: responseContent, context: updatedContext, state: nextState });
  } catch (err: any) {
    if (err?.cause?.code === "ECONNREFUSED") {
      return NextResponse.json({ error: "Cannot connect to Ollama." }, { status: 502 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
