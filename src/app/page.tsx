"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Send,
  Upload,
  Paperclip,
  Bot,
  User,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string | React.ReactNode;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Hello Officer. I am Cyber-Saathi, your AI investigation assistant. How can I help you today? You can upload FIRs or ask me to analyze telecom/financial data.",
      timestamp: new Date(),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputVal,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      let aiResponse: React.ReactNode = "";
      const lowerInput = (userMsg.content?.toString() || "").toLowerCase();

      if (lowerInput.includes("fir") || lowerInput.includes("analyze")) {
        aiResponse = (
          <div className="space-y-4">
            <p>
              I have analyzed the provided details. I am extracting indicators
              of compromise (IoCs).
            </p>
            <Card className="bg-primary/5 border-primary/20 space-y-2 p-4">
              <div className="text-primary flex items-center gap-2 font-bold">
                <TerminalSquare className="h-4 w-4" /> Active Extraction
              </div>
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  • <span className="font-semibold">Suspect UPI:</span>{" "}
                  hotelpay@upi
                </p>
                <p>
                  • <span className="font-semibold">Known Aliases:</span> 4
                  reported across jurisdictional databases.
                </p>
                <p>
                  • <span className="font-semibold">Recommended Action:</span>{" "}
                  Request immediate account freeze.
                </p>
              </div>
            </Card>
          </div>
        );
      } else {
        aiResponse =
          "I am processing your request. Gathering intelligence from correlated databases... Please stand by.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const suggestedPrompts = [
    "Analyze recent FIR document",
    "Track UPI transaction trail",
    "Draft Nodal Officer notice",
    "Find IP geo-location",
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
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm md:max-w-[75%] md:px-5 md:py-4 md:text-base ${
                  msg.role === "user"
                    ? "bg-primary rounded-tr-sm text-white"
                    : "dark:bg-surface-dark dark:border-border-subtle rounded-tl-sm border border-slate-200 bg-white text-slate-800 dark:text-slate-200"
                }`}
              >
                {msg.content}
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
          {/* Suggested Prompts (hide on very small screens if needed, or keep scrollable) */}
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
              placeholder="Ask Cyber-Sathi anything..."
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
              Cyber-Saathi AI can make mistakes. Verify important case details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
