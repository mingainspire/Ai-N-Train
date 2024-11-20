import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Clock, CheckSquare, ArrowRight, Edit2 } from 'lucide-react';
import { NodeAction, Node } from '../types';
import { cn } from '../utils/cn';

interface NodeContextMenuProps {
  node: Node;
  position: { x: number; y: number };
  onAction: (action: NodeAction) => void;
  onClose: () => void;
  actions: NodeAction[];
  onEdit: (node: Node, newLabel: string) => void;
}

const ActionIcon = {
  task: CheckSquare,
  timeline: Clock,
};

export const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  node,
  position,
  onAction,
  onClose,
  actions,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.label);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim()) {
      onEdit(node, editValue.trim());
      setIsEditing(false);
    }
  };

  return (
    <Popover.Root open={true} onOpenChange={onClose}>
      <Popover.Anchor
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
        }}
      />
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
                className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
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
              <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit2 className="w-5 h-5 text-indigo-500" />
                <div className="flex-1">
                  <div className="font-medium">Edit Node</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Modify node content
                  </div>
                </div>
              </button>
              {actions.map((action) => {
                const Icon = ActionIcon[action.type];
                return (
                  <button
                    key={action.id}
                    onClick={() => onAction(action)}
                    className={cn(
                      'w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors',
                      'hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                  >
                    <Icon className="w-5 h-5 text-indigo-500" />
                    <div className="flex-1">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {action.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                );
              })}
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};