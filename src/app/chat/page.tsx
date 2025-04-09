"use client";
import React, { useState } from "react";
import { Plus, Settings, History } from "lucide-react";

export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);
    const [prompt, setPrompt] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!prompt.trim()) return;
  
      setMessages([...messages, prompt]);
      setPrompt("");
  
      // Future: fetch AI response here
    };
  
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
            <Plus size={18} />
            New Chat
          </button>
  
          <div className="mt-6 flex-1 overflow-auto">
            <h2 className="text-xs text-gray-500 mb-2">Recent</h2>
            <ul className="space-y-2">
              <li className="text-sm hover:text-blue-600 cursor-pointer">AI Project</li>
              <li className="text-sm hover:text-blue-600 cursor-pointer">How to use...</li>
            </ul>
          </div>
  
          <div className="mt-auto space-y-2">
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <History size={18} />
              History
            </button>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Settings size={18} />
              Settings
            </button>
          </div>
        </div>
  
        {/* Chat Window */}
        <div className="flex flex-col flex-1 p-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow">
                <p><strong>You:</strong> {msg}</p>
                <p className="mt-2 text-gray-600"><strong>AI:</strong> (response here)</p>
              </div>
            ))}
          </div>
  
          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
            <input
              className="flex-1 p-3 rounded border border-gray-300"
              placeholder="Send a message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Send
            </button>
          </form>
        </div>
      </div>
    );
}