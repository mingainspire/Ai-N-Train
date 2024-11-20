import { MindMap, Node, Link } from '../types';

const generateNodes = (prompt: string): Node[] => {
  const goalNode: Node = {
    id: 'goal',
    label: prompt,
    type: 'goal',
    x: 0,
    y: 0,
    fx: 0,  // Fix goal node position
    fy: 0   // Fix goal node position
  };

  const userNode: Node = {
    id: 'user',
    label: 'You',
    type: 'user',
    x: -200,  // Start further from goal
    y: 0
  };

  return [goalNode, userNode];
};

const generateLinks = (nodes: Node[]): Link[] => {
  return [{
    source: 'goal',
    target: 'user'
  }];
};

export const generateMindMap = (prompt: string): MindMap => {
  const nodes = generateNodes(prompt);
  const links = generateLinks(nodes);

  return {
    id: Date.now().toString(),
    prompt,
    nodes,
    links,
    timestamp: Date.now(),
    level: 1
  };
};