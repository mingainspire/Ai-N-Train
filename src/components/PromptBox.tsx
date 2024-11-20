import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useMindMapStore } from '../store/mindMapStore';

export const PromptBox: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const createMindMap = useMindMapStore((state) => state.createMindMap);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      createMindMap(prompt);
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your idea or task..."
          className="w-full px-4 py-3 pl-12 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>
    </form>
  );
};