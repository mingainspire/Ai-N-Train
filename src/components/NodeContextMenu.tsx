import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Node } from '../types';

interface NodeContextMenuProps {
  node: Node;
  position: { x: number; y: number };
  onClose: () => void;
  onUpdate: (nodeId: string, updates: Partial<Node>) => void;
  actions: { id: string; label: string; description: string; onClick: () => void }[];
}

export const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  node,
  position,
  onClose,
  onUpdate,
  actions,
}) => {
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
                <span className="font-medium">Node Actions</span>
              </div>
            </div>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex-1">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {action.description}
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
