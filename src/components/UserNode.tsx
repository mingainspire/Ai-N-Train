import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { User, Clock, Wrench, Calendar } from 'lucide-react';
import { Node } from '../types';
import { cn } from '../utils/cn';

interface UserNodeProps {
  node: Node;
  position: { x: number; y: number };
  onClose: () => void;
  onUpdate: (nodeId: string, updates: Partial<Node>) => void;
}

export const UserNode: React.FC<UserNodeProps> = ({
  node,
  position,
  onClose,
  onUpdate,
}) => {
  const [showDeadline, setShowDeadline] = useState(false);
  const [deadline, setDeadline] = useState(node.data?.deadline || '');
  const [resources, setResources] = useState(node.data?.resources || '');
  const [showResources, setShowResources] = useState(false);
  const [timeSpent, setTimeSpent] = useState(node.data?.timeSpent || 0);

  const handleSaveDeadline = () => {
    onUpdate(node.id, {
      data: { 
        ...node.data,
        deadline,
      },
      // Preserve current position
      x: node.x,
      y: node.y
    });
    setShowDeadline(false);
  };

  const handleSaveResources = () => {
    onUpdate(node.id, {
      data: { 
        ...node.data,
        resources,
      },
      // Preserve current position
      x: node.x,
      y: node.y
    });
    setShowResources(false);
  };

  const handleTimeUpdate = () => {
    onUpdate(node.id, {
      data: { 
        ...node.data,
        timeSpent: timeSpent + 1,
      },
      // Preserve current position
      x: node.x,
      y: node.y
    });
  };

  if (showDeadline) {
    return (
      <Popover.Root open={true} onOpenChange={onClose}>
        <Popover.Anchor style={{ position: 'absolute', left: position.x, top: position.y }} />
        <Popover.Portal>
          <Popover.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64">
            <h3 className="font-medium mb-2">Set Deadline</h3>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-2 py-1 mb-2 border rounded dark:bg-gray-700"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeadline(false)}
                className="px-2 py-1 text-sm text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDeadline}
                className="px-2 py-1 text-sm bg-indigo-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  if (showResources) {
    return (
      <Popover.Root open={true} onOpenChange={onClose}>
        <Popover.Anchor style={{ position: 'absolute', left: position.x, top: position.y }} />
        <Popover.Portal>
          <Popover.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64">
            <h3 className="font-medium mb-2">What do you need?</h3>
            <textarea
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              className="w-full px-2 py-1 mb-2 border rounded dark:bg-gray-700 h-24"
              placeholder="List resources needed..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResources(false)}
                className="px-2 py-1 text-sm text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveResources}
                className="px-2 py-1 text-sm bg-indigo-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  const suggestions = [
    {
      icon: Calendar,
      label: 'Set Deadline',
      description: node.data?.deadline 
        ? `Due: ${new Date(node.data.deadline).toLocaleString()}`
        : 'When do you want to achieve this?',
      onClick: () => setShowDeadline(true)
    },
    {
      icon: Wrench,
      label: 'Resources Needed',
      description: node.data?.resources 
        ? node.data.resources
        : 'Add tools or materials needed',
      onClick: () => setShowResources(true)
    },
    {
      icon: Clock,
      label: 'Track Time',
      description: `Time spent: ${node.data?.timeSpent || 0} hours`,
      onClick: handleTimeUpdate
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
          <div className="space-y-1">
            <div className="p-2 border-b dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Your Progress</span>
              </div>
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={suggestion.onClick}
                className={cn(
                  'w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors',
                  'hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <suggestion.icon className="w-5 h-5 text-purple-500" />
                <div className="flex-1">
                  <div className="font-medium">{suggestion.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {suggestion.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};