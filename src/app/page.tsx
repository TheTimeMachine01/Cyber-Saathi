"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Send,
  Paperclip,
  Bot,
  User,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

// Try to parse a JSON case number response from the model
function parseCaseResponse(text: string): { caseNumber: string | null; originalJson: string } | null {
  try {
    const match = text.match(new RegExp("\\{[\\s\\S]*?\"case_number\"[\\s\\S]*?\\}"));
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    if ("case_number" in parsed) {
      return { caseNumber: parsed.case_number, originalJson: match[0] };
    }
    return null;
  } catch (e: unknown) {
    return null;
  }
}

// Render model response — detect JSON case number reply and render it nicely
function RenderMessage({ content, currentCaseNumber }: { content: string, currentCaseNumber: string | null }) {
  const parsed = parseCaseResponse(content);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveCase = async (classifyData: { case_type?: string, platform?: string, financial_fraud?: string, website_involved?: string }) => {
      if (!currentCaseNumber) return;
      setIsSaving(true);
      try {
          const tokenRes = await fetch("/api/token");
          const tokenData = await tokenRes.json();
          const token = tokenData.token;

          const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL || "https://admired-zebra-60.eu-west-1.convex.site";
          const res = await fetch(`${convexSiteUrl}/api/cases`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  ...(token ? { "Authorization": `Bearer ${token}` } : {})
              },
              body: JSON.stringify({
                  caseNumber: currentCaseNumber,
                  caseType: classifyData.case_type,
                  platform: classifyData.platform,
                  financialFraud: classifyData.financial_fraud,
                  websiteInvolved: classifyData.website_involved
              })
          });
          if (res.ok) {
              setIsSaved(true);
          } else {
              console.error("Failed to save case details. Status:", res.status);
          }
      } catch (e: unknown) {
          console.error("Error saving case:", e);
      } finally {
          setIsSaving(false);
      }
  };


  // Parse classify_case response
  let classifyParsed: { case_type?: string, platform?: string, financial_fraud?: string, website_involved?: string } | null = null;
  let classifyRaw = "";
  let caseTypeStr = "";
  let platformStr = "";
  let financialFraudStr = "";
  let websiteInvolvedStr = "";

  try {
    const classMatch = content.match(new RegExp("\\{[\\s\\S]*?\"case_type\"[\\s\\S]*?\\}"));
    if (classMatch) {
        classifyParsed = JSON.parse(classMatch[0]);
        classifyRaw = classMatch[0];
        caseTypeStr = classifyParsed?.case_type || "";
        platformStr = classifyParsed?.platform || "";
        financialFraudStr = classifyParsed?.financial_fraud || "";
        websiteInvolvedStr = classifyParsed?.website_involved || "";
    }
  } catch (e) {}

  if (classifyParsed && classifyParsed.case_type) {
     const textPart = content.replace(classifyRaw, "").trim();
     return (
       <div className="space-y-4 w-full">
         <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-2">
            <Sparkles className="h-4 w-4" />
            Case Classified Successfully
          </div>
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 p-4 shadow-sm w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm w-full">
                <div>
                   <p className="text-slate-500 dark:text-slate-400 mb-1 text-xs uppercase tracking-wider">Case Type</p>
                   <p className="font-semibold text-blue-800 dark:text-blue-200">{caseTypeStr}</p>
                </div>
                <div>
                   <p className="text-slate-500 dark:text-slate-400 mb-1 text-xs uppercase tracking-wider">Platform</p>
                   <p className="font-semibold text-blue-800 dark:text-blue-200">{platformStr}</p>
                </div>
                <div>
                   <p className="text-slate-500 dark:text-slate-400 mb-1 text-xs uppercase tracking-wider">Financial Fraud</p>
                   <p className="font-semibold text-blue-800 dark:text-blue-200 capitalize">{financialFraudStr}</p>
                </div>
                <div>
                   <p className="text-slate-500 dark:text-slate-400 mb-1 text-xs uppercase tracking-wider">Website Involved</p>
                   <p className="font-semibold text-blue-800 dark:text-blue-200 capitalize">{websiteInvolvedStr}</p>
                </div>
            </div>
            
            <div className="mt-4 flex justify-end">
                <Button 
                    onClick={() => handleSaveCase(classifyParsed!)}
                    disabled={isSaving || isSaved || !currentCaseNumber}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {isSaved ? "Saved to Database" : (isSaving ? "Saving..." : "Save Case")}
                </Button>
            </div>
          </Card>
          {textPart ? (
            <div className="mt-4 border-t border-blue-100 dark:border-blue-900/50 pt-3">
               <p className="whitespace-pre-wrap leading-relaxed">{textPart}</p>
            </div>
          ) : null}
       </div>
     );
  }

  if (parsed) {
    const textPart = content.replace(parsed.originalJson, "").trim();

    if (parsed.caseNumber) {
      return (
        <div className="space-y-4 w-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Valid Case Number Detected
            </div>
            <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 px-4 py-3 shadow-sm w-full">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Case Number</p>
              <p className="font-mono text-lg font-bold tracking-widest text-emerald-700 dark:text-emerald-300">
                {parsed.caseNumber}
              </p>
            </Card>
          </div>
          {textPart && (
            <div className="mt-4 border-t border-emerald-100 dark:border-emerald-900/50 pt-3">
               <p className="whitespace-pre-wrap leading-relaxed">{textPart}</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="space-y-4 w-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-500 font-semibold gap-1.5">
              <XCircle className="h-4 w-4" />
              Invalid Case Number
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The number you entered is not a valid 14-digit case number. Please check and try again.
            </p>
          </div>
          {textPart && (
            <div className="mt-4 border-t border-red-100 dark:border-red-900/50 pt-3">
               <p className="whitespace-pre-wrap leading-relaxed">{textPart}</p>
            </div>
          )}
        </div>
      );
    }
  }

  // Plain text — render with line breaks
  return (
    <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
  );
}

async function callChatAPI(prompt: string, context: number[], state: string): Promise<{content: string, context: number[], state: string}> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, context, state }),
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error ?? data.hint ?? "Unknown error from AI");
  }
  return { content: data.content as string, context: data.context as number[], state: data.state as string };
}

async function getConvexAuth(): Promise<{ token: string, convexUrl: string }> {
  let token = "";
  try {
    const tokenRes = await fetch("/api/token");
    const tokenData = await tokenRes.json();
    token = tokenData.token;
  } catch {}
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL || "https://admired-zebra-60.eu-west-1.convex.site";
  return { token, convexUrl };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [ollamaContext, setOllamaContext] = useState<number[]>([]);
  const [flowState, setFlowState] = useState<string>("INIT");

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Compute the current valid case number from history
  const currentCaseNumber = React.useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const parsed = parseCaseResponse(messages[i].content);
      if (parsed?.caseNumber) return parsed.caseNumber;
    }
    return null;
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // On mount: clear old case data, then start a fresh chat
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    async function initChat() {
      setIsTyping(true);
      try {
        // Clear old case data from DB on refresh
        const { token, convexUrl } = await getConvexAuth();
        await fetch(`${convexUrl}/api/cases`, {
          method: "DELETE",
          headers: token ? { "Authorization": `Bearer ${token}` } : {},
        }).catch(() => {});

        const apiRes = await callChatAPI("", [], "INIT");
        const { content, context: newCtx, state: newState } = apiRes;
        setOllamaContext(newCtx);
        setFlowState(newState);
        setMessages([
          {
            id: "init-1",
            role: "assistant",
            content,
            timestamp: new Date(),
          },
        ]);
        setChatHistory([{ role: "assistant", content }]);
      } catch (err: unknown) {
        setMessages([
          {
            id: "init-error",
            role: "assistant",
            content: `⚠️ Error initializing chat.\n\n${(err as Error).message}`,
            timestamp: new Date(),
            isError: true,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    }

    initChat();
  }, []);

  const handleSend = async () => {
    const trimmed = inputVal.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    const newHistory: ChatMessage[] = [
      ...chatHistory,
      { role: "user", content: trimmed },
    ];

    setMessages((prev) => [...prev, userMsg]);
    setChatHistory(newHistory);
    setInputVal("");
    setIsTyping(true);

    try {
      const { content, context: newCtx, state: newState } = await callChatAPI(trimmed, ollamaContext, flowState);
      setOllamaContext(newCtx);
      setFlowState(newState);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setChatHistory((prev) => [...prev, { role: "assistant", content }]);

      // Auto-save case data to Convex DB
      const { token, convexUrl } = await getConvexAuth();
      const headers = { "Content-Type": "application/json", ...(token ? { "Authorization": `Bearer ${token}` } : {}) };

      // Check if a valid case_number was returned
      const caseMatch = parseCaseResponse(content);
      if (caseMatch?.caseNumber) {
        fetch(`${convexUrl}/api/cases`, {
          method: "POST",
          headers,
          body: JSON.stringify({ caseNumber: caseMatch.caseNumber }),
        }).catch(() => {});
      }

      // Check if classification JSON was returned
      try {
        const classMatch = content.match(/\{[\s\S]*?"case_type"[\s\S]*?\}/);
        if (classMatch) {
          const classData = JSON.parse(classMatch[0]);
          // Find the current case number from messages
          let caseNum = "";
          const allMsgs = [...messages, userMsg, aiMsg];
          for (let i = allMsgs.length - 1; i >= 0; i--) {
            const p = parseCaseResponse(allMsgs[i].content);
            if (p?.caseNumber) { caseNum = p.caseNumber; break; }
          }
          if (caseNum) {
            fetch(`${convexUrl}/api/cases`, {
              method: "PATCH",
              headers,
              body: JSON.stringify({
                caseNumber: caseNum,
                caseType: classData.case_type ?? "",
                platform: classData.platform ?? "",
                financialFraud: classData.financial_fraud ?? "",
                websiteInvolved: classData.website_involved ?? "",
              }),
            }).catch(() => {});
          }
        }
      } catch {}

    } catch (err: unknown) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `⚠️ Error: ${(err as Error).message}`,
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const suggestedPrompts = [
    "14012345678901",
    "My case number is 12345678901234",
    "Analyze recent FIR document",
    "Track UPI transaction trail",
  ];

  return (
    <div className="relative flex h-[calc(100vh-4rem)] flex-col md:h-[calc(100vh-4.5rem)]">
      <div className="hide-scrollbar flex-1 space-y-6 overflow-y-auto p-4 md:p-8">
        {/* Messages Container */}
        <div className="mx-auto max-w-4xl space-y-6 pb-24">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 md:gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm md:h-10 md:w-10 ${
                  msg.role === "assistant"
                    ? msg.isError
                      ? "bg-red-500 text-white"
                      : "bg-primary text-white"
                    : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {msg.role === "assistant" ? (
                  msg.isError ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm md:max-w-[75%] md:px-5 md:py-4 md:text-base ${
                  msg.role === "user"
                    ? "bg-primary rounded-tr-sm text-white"
                    : msg.isError
                      ? "rounded-tl-sm border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
                      : "dark:bg-surface-dark dark:border-border-subtle rounded-tl-sm border border-slate-200 bg-white text-slate-800 dark:text-slate-200"
                }`}
              >
                {msg.role === "assistant" && !msg.isError ? (
                  <RenderMessage content={msg.content} currentCaseNumber={currentCaseNumber} />
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                )}
                <div
                  className={`mt-2 text-[10px] opacity-60 ${msg.role === "user" ? "text-right" : "text-left"}`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-4">
              <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm">
                <Bot className="h-5 w-5" />
              </div>
              <div className="dark:bg-surface-dark dark:border-border-subtle flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-5 py-4 shadow-md">
                <div className="bg-primary/40 h-2 w-2 animate-bounce rounded-full transition-all [animation-delay:-0.3s]"></div>
                <div className="bg-primary/60 h-2 w-2 animate-bounce rounded-full transition-all [animation-delay:-0.15s]"></div>
                <div className="bg-primary/80 h-2 w-2 animate-bounce rounded-full transition-all"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="from-background via-background absolute bottom-0 left-0 w-full bg-gradient-to-t to-transparent px-4 pt-10 pb-4 md:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          {/* Suggested Prompts */}
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInputVal(prompt)}
                className="text-primary bg-primary/5 hover:bg-primary/15 dark:bg-primary/10 dark:hover:bg-primary/20 border-primary/20 flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold tracking-tight whitespace-nowrap shadow-sm transition-all"
              >
                <Sparkles className="h-3 w-3" /> {prompt}
              </button>
            ))}
          </div>

          <div className="dark:bg-surface-dark dark:border-border-subtle focus-within:ring-primary/40 relative flex items-end gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl transition-all duration-300 focus-within:ring-2 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary hover:bg-primary/10 h-10 w-10 shrink-0 rounded-full text-slate-500"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            <Input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter case number or ask Cyber-Saathi..."
              className="border-0 bg-transparent px-0 py-6 text-base shadow-none focus-visible:ring-0"
            />

            <Button
              onClick={handleSend}
              disabled={!inputVal.trim() || isTyping}
              className="h-10 w-10 shrink-0 rounded-full shadow-md transition-transform active:scale-95 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-medium text-slate-500">
              Cyber-Saathi AI · Powered by local LLM · Verify important case details independently
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
