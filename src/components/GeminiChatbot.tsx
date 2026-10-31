import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  RotateCcw,
  BookOpen,
  Calendar,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { RoutePath } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

interface GeminiChatbotProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, context?: string) => void;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        'Hello! I am the AI Behavior Science & Supervision Advisor for The Behavior Canvas. How can I help you today with QASP-S/ABAT exam prep, behavior concepts, or international tele-supervision?',
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'What study resources do you offer for the QASP-S exam?',
    'How does international tele-supervision work?',
    'Explain the 4 functions of behavior with real examples.',
    'What payment options are supported for international clients?',
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Send conversation history to the server-side Gemini API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newHistory
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || 'I am here to guide your study journey. What else would you like to know?',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.warn('Backend unavailable, using client-side behavior science advisor:', err);
      
      const q = textToSend.toLowerCase();
      let responseText = '';
      
      if (q.includes('certif') || q.includes('credential') || q.includes('qasp') || q.includes('reema') || q.includes('founder') || q.includes('who are you') || q.includes('linkedin')) {
        responseText = `The Behavior Canvas was founded by Reema Singh, a **QASP-S® (Qualified Autism Services Practitioner-Supervisor)** board-certified through the Qualified Applied Behavior Analysis Credentialing Board (QABA®).\n\nKey credentials & accreditations:\n• QASP-S® Board Certified Practitioner & Supervisor\n• Psychology & Special Education Academic Background\n• International Tele-Supervisor for candidates worldwide\n\nVerify Reema's professional profile & credentials on LinkedIn:\nhttps://www.linkedin.com/in/reema-qasp-s-4402a431b/`;
      } else if (q.includes('supervis') || q.includes('tele') || q.includes('remote') || q.includes('hour') || q.includes('time') || q.includes('book')) {
        responseText = `We provide **Worldwide Tele-Supervision** for ABAT® and QASP-S® candidates across the US, UK, Middle East, Australia, India, and beyond.\n\n• Flexible multi-timezone matching (US EST/PST, UK GMT, UAE GST, India IST, Australia AEST)\n• 1-on-1 competency sign-offs and monthly verification documentation\n• Case formulation, ethical dilemma coaching, and mock portfolio defense\n\nClick 'Book Supervision' in the header to submit an initial consultation enquiry!`;
      } else if (q.includes('study') || q.includes('note') || q.includes('exam') || q.includes('cheat') || q.includes('question') || q.includes('resource') || q.includes('bank') || q.includes('price') || q.includes('cost')) {
        responseText = `The Behavior Canvas offers high-yield digital study materials for behavior practitioners:\n\n1. **QASP-S Complete Study System**: Comprehensive task list notes, ethical guidelines, and case vignettes.\n2. **Applied Scenario Question Bank**: 100+ scenario-based questions with thorough rationale breakdowns.\n3. **Quick-Reference Exam Cheat Sheets & Study Tracker**: High-yield visual summaries of formulas, reinforcement schedules, and prompt hierarchies.\n\nAvailable with instant download in both USD ($) and INR (₹) in our Study Store!`;
      } else if (q.includes('pay') || q.includes('stripe') || q.includes('paypal') || q.includes('card') || q.includes('currency') || q.includes('international')) {
        responseText = `We support 100% secure, internationally accepted payment methods through **Stripe** (Cards, Apple Pay, Google Pay) and **PayPal Global**, with automatic currency toggle between USD ($) and INR (₹). All downloads are delivered immediately to your email with 256-bit SSL encryption.`;
      } else if (q.includes('function') || q.includes('aba') || q.includes('reinforce') || q.includes('prompt') || q.includes('behavior')) {
        responseText = `In Applied Behavior Analysis (ABA), behavior always serves a function. The 4 primary functions of behavior are:\n\n1. **Sensory / Automatic**: Internally pleasing or self-soothing sensory input.\n2. **Escape / Avoidance**: Removing or delaying an unpleasant demand or situation.\n3. **Attention**: Gaining interaction or reaction from caregivers, peers, or instructors.\n4. **Tangible / Access**: Gaining access to a preferred item, activity, or environment.\n\nOur study notes and question banks dive deep into functional behavior assessments (FBA), functional communication training (FCT), and ethical considerations!`;
      } else {
        responseText = `Hello! I am your AI Behavior Science & Supervision Advisor at The Behavior Canvas. How can I help you today?\n\n• QASP-S / ABAT exam preparation & study bundles\n• International remote tele-supervision bookings\n• Core Applied Behavior Analysis concepts and ethical standards\n• Verifying founder certifications and partnerships\n\nYou can also contact Reema directly at info@behaviorcanvas.com or via LinkedIn: https://www.linkedin.com/in/reema-qasp-s-4402a431b/`;
      }

      const fallbackMsg: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content:
          'Conversation reset. Feel free to ask about our study notes, question banks, ABA concepts, or international supervision scheduling!',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#583256] text-white shadow-xl hover:bg-[#482746] hover:scale-105 active:scale-95 transition-all group border border-white/20"
          aria-label="Open Behavior Science & Supervision Chat Advisor"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#583256]" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-none flex items-center gap-1">
              <span>Study & Supervision Advisor</span>
              <Sparkles className="w-3 h-3 text-[#E8BCD5]" />
            </div>
            <div className="text-[10px] text-white/80 leading-none mt-1">
              Ask about QASP-S, ABA, or booking
            </div>
          </div>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col bg-white rounded-3xl border border-[#EDE2EB] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#3D213B] via-[#583256] to-[#482746] text-white p-4 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#583256]" />
              </div>
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span>Behavior & Supervision Advisor</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
                    AI
                  </span>
                </div>
                <div className="text-[11px] text-[#E0D5E3]">
                  The Behavior Canvas · Reema Singh (QASP-S)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Nav / Shortcuts strip */}
          <div className="bg-[#FAF5F9] px-4 py-2 border-b border-[#EDE2EB] flex items-center justify-between text-[11px] text-[#583256] shrink-0">
            <button
              onClick={() => {
                onNavigate('resources');
                setIsOpen(false);
              }}
              className="flex items-center gap-1 font-semibold hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study Store</span>
            </button>
            <span className="text-[#DACFDB]">|</span>
            <button
              onClick={() => {
                onOpenEnquiry('Tele-Supervision', 'Chatbot quick enquiry');
                setIsOpen(false);
              }}
              className="flex items-center gap-1 font-semibold hover:underline"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Supervision</span>
            </button>
            <span className="text-[#DACFDB]">|</span>
            <a
              href="https://www.linkedin.com/in/reema-qasp-s-4402a431b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold hover:underline text-[#0077B5]"
            >
              <span>Reema's LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Scrollable Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/60">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#FAF2F8] border border-[#EDE2EB] text-[#583256] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-[#583256] text-white rounded-tr-xs'
                        : 'bg-[#FAF6F8] text-[#2A182C] border border-[#EDE2EB] rounded-tl-xs whitespace-pre-wrap'
                    }`}
                  >
                    {message.content}
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isUser ? 'text-white/70' : 'text-[#7A677D]'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#583256] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#FAF2F8] border border-[#EDE2EB] text-[#583256] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-2xl rounded-tl-xs px-3.5 py-2.5 bg-[#FAF6F8] border border-[#EDE2EB] flex items-center gap-2 text-xs text-[#5C4A60]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#583256]" />
                  <span>Reviewing behavior science notes...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (shown if fewer than 4 messages) */}
          {messages.length <= 3 && (
            <div className="px-4 py-2 bg-[#FAF5F9] border-t border-[#EDE2EB] shrink-0">
              <div className="text-[10px] font-semibold text-[#7A5B79] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#583256]" />
                <span>Suggested Questions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-white border border-[#DACFDB] text-[#583256] hover:bg-[#FAF2F8] transition-colors leading-tight"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#EDE2EB] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about QASP-S, ABA, or supervision..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF6F8] border border-[#EDE2EB] text-xs text-[#2A182C] focus:outline-none focus:border-[#583256] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-[#583256] hover:bg-[#482746] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
