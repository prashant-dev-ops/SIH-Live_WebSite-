"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, X, ShieldCheck, Clock } from "lucide-react";
import { WorkerViewModel } from "@/features/workers/worker.types";
import { chatFeatureService } from "../chat.service";
import { ChatMessage } from "../chat.types";

interface ChatDrawerProps {
  worker: WorkerViewModel;
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  "Are you available today?",
  "What are your charges for repair?",
  "Do I need to buy parts?",
  "Can you bring an extra wire roll?",
];

export function ChatDrawer({ worker, isOpen, onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatFeatureService.getMessages(worker.id).then(setMessages);
    }
  }, [isOpen, worker.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    setInputText("");
    const { userMessage, workerReplyPromise } = await chatFeatureService.sendCustomerMessage(
      worker.id,
      text
    );

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const workerReply = await workerReplyPromise;
      setIsTyping(false);
      setMessages((prev) => [...prev, workerReply]);
    } catch {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-charcoal/40 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Chat Header */}
        <div className="p-4 bg-cream border-b border-cream-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-cream-warm border border-cream-border flex-shrink-0">
              <img
                src={worker.imageUrl}
                alt={worker.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-charcoal">{worker.name}</h3>
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
              </div>
              <p className="text-xs text-charcoal-muted line-clamp-1">{worker.trade}</p>
              <p className="text-[10px] text-forest font-medium mt-0.5">
                {worker.cooperativeSociety}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-charcoal-muted hover:text-charcoal hover:bg-cream-warm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-warmwhite">
          <div className="text-center my-2">
            <span className="text-[11px] text-charcoal-light bg-cream px-3 py-1 rounded-full border border-cream-border">
              Direct cooperative message session
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === "customer";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed shadow-subtle ${
                    isMe
                      ? "bg-forest text-white rounded-br-none"
                      : "bg-white text-charcoal border border-cream-border rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-charcoal-light mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-charcoal-muted bg-white p-2.5 rounded-xl border border-cream-border max-w-[120px]">
              <Clock className="w-3.5 h-3.5 animate-spin text-forest" />
              <span>Typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Chips */}
        <div className="px-3 pt-2 pb-1 bg-white border-t border-cream-border/60 overflow-x-auto flex gap-1.5 no-scrollbar">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap bg-cream hover:bg-cream-warm border border-cream-border px-2.5 py-1 rounded-full text-charcoal transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-white border-t border-cream-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Message ${worker.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-sm bg-warmwhite border border-cream-border rounded-lg px-3.5 py-2 text-charcoal placeholder-charcoal-light focus:outline-none focus:border-forest"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-lg bg-forest text-white hover:bg-forest-hover disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
