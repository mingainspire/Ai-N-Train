import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Target, Edit2, BarChart2 } from 'lucide-react';
import { Node } from '../types';
import { cn } from '../utils/cn';

interface GoalNodeProps {
  node: Node;
  position: { x: number; y: number };
  onClose: () => void;
  onUpdate: (nodeId: string, updates: Partial<Node>) => void;
}

export const GoalNode: React.FC<GoalNodeProps> = ({
  node,
  position,
  onClose,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.label);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(node.data?.progress || 0);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim()) {
      onUpdate(node.id, { 
        label: editValue.trim(),
        x: node.x,
        y: node.y
      });
      setIsEditing(false);
    }
  };

  const handleProgressUpdate = () => {
    onUpdate('user', {
      x: -200 + (progress * 2),
      y: 0,
      data: { progress }
    });
    setShowProgress(false);
  };

  if (showProgress) {
    return (
      <Popover.Root open={true} onOpenChange={onClose}>
        <Popover.Anchor style={{ position: 'absolute', left: position.x, top: position.y }} />
        <Popover.Portal>
          <Popover.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64">
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Track Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-900 dark:text-white">
                <span>Progress: {progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowProgress(false)}
                className="px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleProgressUpdate}
                className="px-2 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Save
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  const actions = [
    {
      icon: BarChart2,
      label: 'Track Progress',
      description: node.data?.progress ? `Current: ${node.data.progress}%` : 'Set your progress',
      onClick: () => setShowProgress(true)
    },
    {
      icon: Edit2,
      label: 'Edit Goal',
      description: 'Change goal description',
      onClick: () => setIsEditing(true)
    }
  ];

  return (
    <Popover.Root open={true} onOpenChange={onClose}>
      <Popover.Anchor style={{ position: 'absolute', left: position.x, top: position.y }} />
      <Popover.Portal>
        <Popover.Content
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 w-64 animate-in fade-in"
          sideOffset={5}
        >
          {isEditing ? (
            <form onSubmit={handleEdit} className="p-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-1">
              <div className="p-2 border-b dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-indigo-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Goal Actions</span>
                </div>
              </div>
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={cn(
                    'w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <action.icon className="w-5 h-5 text-indigo-500" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{action.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {action.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};