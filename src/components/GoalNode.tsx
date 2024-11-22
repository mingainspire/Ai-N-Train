import React from 'react';
import { Node } from '../types';

interface GoalNodeProps {
  node: Node;
  onClose: () => void;
  onUpdate: (nodeId: string, updates: Partial<Node>) => void;
}

export const GoalNode: React.FC<GoalNodeProps> = ({ node, onClose, onUpdate }) => {
  return (
    <div
      key={node.id}
      className="bg-blue-500 text-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow relative"
      style={{ position: 'absolute', left: `${node.x}px`, top: `${node.y}px` }}
    >
      <h3 className="text-lg font-semibold mb-2">{node.label}</h3>
      <button onClick={onClose} className="text-sm mt-2">
        Close
      </button>
    </div>
  );
};
