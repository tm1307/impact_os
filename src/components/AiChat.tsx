'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

interface AiChatProps {
  opportunityTitle: string;
  matchScore: number;
  domain: string;
  skills: string[];
  eligibility: string;
}

const quickQuestions = [
  'Am I eligible?',
  'What skills do I need?',
  'How can I improve my match?',
  'What documents do I need?',
];

function generateResponse(
  question: string,
  props: AiChatProps
): string {
  const q = question.toLowerCase();
  if (q.includes('eligible') || q.includes('eligibility') || q.includes('qualify')) {
    return `Based on your profile, you have a ${props.matchScore}% match with ${props.opportunityTitle}. The eligibility requirement is: "${props.eligibility}". ${
      props.matchScore >= 90
        ? 'You meet all the core requirements — I\'d recommend applying!'
        : props.matchScore >= 80
        ? 'You meet most requirements. Review the eligibility criteria carefully to ensure you qualify.'
        : 'You may need to strengthen some areas. Check if you meet the specific eligibility requirements before applying.'
    }`;
  }
  if (q.includes('skill') || q.includes('require') || q.includes('need what')) {
    return `This opportunity requires experience in: ${props.skills.join(', ')}. Based on your profile, you show strong alignment in several of these areas. ${
      props.matchScore >= 90
        ? 'Your existing skills are a great fit.'
        : `Consider gaining more experience in ${props.skills[props.skills.length - 1]} to strengthen your application.`
    }`;
  }
  if (q.includes('improve') || q.includes('better') || q.includes('increase')) {
    return `To improve your match score for ${props.opportunityTitle}, I\'d suggest: 1) Add relevant projects to your Impact Passport that demonstrate ${props.skills[0]} skills. 2) Complete online courses in ${props.skills[1] || props.skills[0]}. 3) Gain verified experience through related volunteer or open-source work. Each verified project can increase your match score by 3-8%.`;
  }
  if (q.includes('document') || q.includes('apply') || q.includes('submit') || q.includes('application')) {
    return `For ${props.opportunityTitle}, you\'ll typically need: 1) Updated resume/CV highlighting relevant experience. 2) Statement of interest explaining your motivation. 3) Academic transcripts or proof of enrollment. 4) Portfolio or links to relevant projects. Check the application checklist on this page for specific requirements.`;
  }
  if (q.includes('deadline') || q.includes('when') || q.includes('time')) {
    return `Make sure to submit your application well before the deadline. I recommend completing your application at least 2 days early to account for any technical issues. Use the checklist on this page to track your preparation progress.`;
  }
  return `That\'s a great question about ${props.opportunityTitle}! This ${props.domain} opportunity is looking for candidates with skills in ${props.skills.slice(0, 3).join(', ')}. Your ${props.matchScore}% match score suggests ${
    props.matchScore >= 85 ? 'a strong alignment' : 'potential alignment'
  } with the program requirements. Would you like to know more about eligibility, required skills, or how to improve your match?`;
}

export function AiChat(props: AiChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: `Hi! I'm your AI Match Assistant for ${props.opportunityTitle}. Ask me anything about eligibility, requirements, or how to improve your match score.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const question = text || input.trim();
    if (!question) return;

    const userMsg: Message = { id: Date.now(), role: 'user', content: question };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // UX: artificial delay before response
    setTimeout(() => {
      const response = generateResponse(question, props);
      const assistantMsg: Message = { id: Date.now() + 1, role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open AI chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex h-[500px] w-[380px] max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-indigo-600 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <div>
                <p className="text-sm font-semibold text-white">AI Match Assistant</p>
                <p className="text-xs text-indigo-200">Powered by IMPACT OS</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-indigo-200 transition-colors hover:bg-indigo-700 hover:text-white cursor-pointer"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  msg.role === 'assistant' ? 'bg-indigo-100' : 'bg-slate-200'
                }`}>
                  {msg.role === 'assistant' ? (
                    <Bot className="h-3.5 w-3.5 text-indigo-600" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-slate-600" />
                  )}
                </div>
                <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-indigo-600 text-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Bot className="h-3.5 w-3.5 text-indigo-600" />
                </div>
                <div className="rounded-xl bg-slate-100 px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="border-t border-slate-100 px-4 py-2">
              <p className="mb-2 text-xs font-medium text-slate-500">Quick questions</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-200 px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about eligibility, skills..."
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
