import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Calendar, BarChart } from 'lucide-react';
import { Node } from '../types';
import { format } from 'date-fns';

interface NodeDetailsProps {
  node: Node;
  onClose: () => void;
  onUpdate: (node: Node) => void;
}

export const NodeDetails: React.FC<NodeDetailsProps> = ({
  node,
  onClose,
  onUpdate,
}) => {
  const handleComplete = () => {
    onUpdate({
      ...node,
      data: {
        ...node.data,
        completed: !node.data?.completed,
      },
    });
  };

  const handleProgressUpdate = (progress: number) => {
    onUpdate({
      ...node,
      data: {
        ...node.data,
        progress,
      },
    });
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold">
              {node.label}
            </Dialog.Title>
            <Dialog.Close className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {node.type === 'task' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={node.data?.completed}
                  onChange={handleComplete}
                  className="w-4 h-4 text-indigo-500"
                />
                <span>Mark as complete</span>
              </div>
              {node.data?.deadline && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Due {format(new Date(node.data.deadline), 'PPP')}
                  </span>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm font-medium">
                    {node.data?.progress || 0}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={node.data?.progress || 0}
                  onChange={(e) => handleProgressUpdate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {node.type === 'timeline' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  className="border rounded px-2 py-1"
                  value={node.data?.deadline || ''}
                  onChange={(e) =>
                    onUpdate({
                      ...node,
                      data: { ...node.data, deadline: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {node.type === 'dashboard' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BarChart className="w-4 h-4 text-gray-500" />
                <span>Dashboard view coming soon</span>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};