import { NodeAction } from '../types';

const getEmojiAndLabel = (content: string): { emoji: string; label: string } => {
  if (content.match(/computer|laptop|pc|mac|tech|fix/i)) {
    return { emoji: '💻', label: 'Fix' };
  }
  if (content.match(/call|phone|contact|reach/i)) {
    return { emoji: '📞', label: 'Call' };
  }
  if (content.match(/meet|visit|see/i)) {
    return { emoji: '🤝', label: 'Meet' };
  }
  if (content.match(/help|assist|support/i)) {
    return { emoji: '🤝', label: 'Help' };
  }
  return { emoji: '📋', label: 'Task' };
};

export const analyzeContent = (content: string): {
  mainLabel: string;
  actions: NodeAction[];
} => {
  const { emoji, label } = getEmojiAndLabel(content);
  
  // Create a simplified main label with emoji
  const mainLabel = `${emoji} ${label}`;

  const actions: NodeAction[] = [
    {
      id: 'details',
      label: '📝 Add Details',
      description: 'What needs to be done?',
      type: 'task',
      available: true,
    },
    {
      id: 'time',
      label: '⏰ Time Check',
      description: 'Set time and duration',
      type: 'timeline',
      available: true,
    },
    {
      id: 'resources',
      label: '🔧 Resources',
      description: 'What do you need?',
      type: 'task',
      available: true,
    }
  ];

  return { mainLabel, actions };
};