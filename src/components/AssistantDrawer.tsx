import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, X, MessageSquare, Info, Star } from "lucide-react";
import { ChatMessage } from "../types";

export default function AssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "chef",
      content: "Bonjour mon ami! 👨‍🍳 I am Chef Pierre, the Head Pastry Chef of Pasteleria! I am absolutely delighted to greet you. \n\nAre you looking to explore our premium 100% eggless pastries and savory menu, find directions to our outlet in Shalimar Garden, Ghaziabad, or do you have specific allergies? Ask me anything about our sweet treats!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDot, setShowDot] = useState(true);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleOpenClick = () => {
    setIsOpen(true);
    setShowDot(false);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          history: chatHistory
        })
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `chef-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            role: "chef",
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error(data.error || "Failed to communicate with kitchen");
      }
    } catch (err: any) {
      console.warn("Chef Pierre live assistant is in sweet offline mode:", err.message);
      
      // Standby offline replies for a charming user experience
      let fallbackReply = "Ah, mon ami! My smart recipe index is having a tiny break while our oven heats up. But Chef Pierre can tell you that our Royal Dutch Chocolate Truffle cake (₹650/kg) and Paneer Tikka Puff Patty are looking magnifíque today! Do drop by or ask me anything about our sweet creations!";
      
      if (inputValue.toLowerCase().includes("cake") || inputValue.toLowerCase().includes("custom")) {
        fallbackReply = "Oooh, custom design cakes are my culinary masterpiece! 🎂 We specialize in themed 100% eggless cream showcase cakes (starts ₹650/kg) for birthdays and anniversaries. You can browse our main menu on this page or drop by our outlet for special customizable shapes, sizes, and specific eggless combinations!";
      } else if (inputValue.toLowerCase().includes("location") || inputValue.toLowerCase().includes("where") || inputValue.toLowerCase().includes("address")) {
        fallbackReply = "You can find our charming boutique shop in Shalimar Garden, Sahibabad, Ghaziabad, UP! Check the bottom of our web page for full maps direction and coordinates. Drop by for freshly baked hot puff patties and hazelnut coffees!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `chef-error-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          role: "chef",
          content: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpenClick}
          className="relative p-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 border border-amber-600/30 text-white shadow-2xl hover:shadow-amber-500/10 cursor-pointer transform hover:scale-105 transition-all group flex items-center gap-2"
          aria-label="Ask Cake Assistant"
        >
          <span className="text-xl leading-none">👨‍🍳</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-xs font-bold uppercase tracking-wider font-sans">
            Ask Chef Pierre
          </span>
          {showDot && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-stone-900 animate-ping" />
          )}
        </button>
      </div>

      {/* Slide-over interactive box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-24 right-6 w-[360px] md:w-[400px] h-[520px] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Box Header */}
            <div className="bg-stone-950 p-4 border-b border-stone-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-base">
                  👨‍🍳
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-white leading-tight">Chef Pierre</h4>
                  <p className="text-[9px] text-amber-500 font-mono tracking-wider flex items-center gap-1.5 mt-0.5 animate-pulse">
                    <span>●</span>
                    <span>ONLINE IN KITCHEN</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-600/10 border border-amber-600/20 text-amber-500">
                  AI Assistant
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-stone-500 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MESSAGE FEED SCROLLBOARD */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-900/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-amber-700/80 text-white rounded-tr-none border border-amber-600/20"
                        : "bg-stone-950/80 text-stone-200 border border-stone-800 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span className="block text-right text-[8px] font-mono text-stone-500 mt-1.5">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loader Typing dots */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-stone-950 p-3 rounded-2xl rounded-tl-none border border-stone-800 flex items-center gap-1.5 min-w-[60px]">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* SEND BOTTOM PANEL BOX */}
            <form onSubmit={handleSendMessage} className="p-3.5 bg-stone-950 border-t border-stone-800 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask recipes, locations, allergens, custom cakes..."
                className="flex-1 bg-stone-900 border border-stone-800 focus:border-amber-600/50 outline-none rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-stone-600 transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow shadow-amber-950/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
