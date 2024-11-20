import React from 'react';
import { Brain } from 'lucide-react';
import { PromptBox } from './components/PromptBox';
import { MindMap } from './components/MindMap';
import { Dashboard } from './components/Dashboard';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <header className="border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-indigo-500" />
            <h1 className="text-2xl font-bold">Ai-N Visualizer</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PromptBox />
        <MindMap />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;