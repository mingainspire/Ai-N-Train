export type NodeType = 'basic' | 'task' | 'timeline' | 'dashboard';

export interface Node {
  id: string;
  label: string;
  type: NodeType;
  color?: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
  data?: {
    completed?: boolean;
    deadline?: string;
    progress?: number;
    description?: string;
    notes?: string;
    addingSteps?: boolean;
    addingDeadline?: boolean;
    addingResources?: boolean;
    trackingTime?: boolean;
    showProgress?: boolean;
  };
}

export interface Link {
  source: string;
  target: string;
}

export interface MindMap {
  id: string;
  prompt: string;
  nodes: Node[];
  links: Link[];
  timestamp: number;
  level: number;
}

export interface NodeAction {
  id: string;
  label: string;
  description: string;
  type: NodeType;
  available: boolean;
}