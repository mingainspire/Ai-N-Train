import { create } from 'zustand';
import { MindMap, Node, Link } from '../types';
import { generateMindMap } from '../utils/mockAi';

interface MindMapStore {
  mindMaps: MindMap[];
  activeMindMap: MindMap | null;
  createMindMap: (prompt: string) => void;
  setActiveMindMap: (id: string) => void;
  updateNode: (nodeId: string, updates: Partial<Node>) => void;
}

export const useMindMapStore = create<MindMapStore>((set, get) => ({
  mindMaps: [],
  activeMindMap: null,
  createMindMap: (prompt: string) => {
    const newMindMap = generateMindMap(prompt);
    set((state) => ({
      mindMaps: [...state.mindMaps, newMindMap],
      activeMindMap: newMindMap,
    }));
  },
  setActiveMindMap: (id: string) =>
    set((state) => ({
      activeMindMap: state.mindMaps.find((m) => m.id === id) || null,
    })),
  updateNode: (nodeId: string, updates: Partial<Node>) => {
    set((state) => {
      if (!state.activeMindMap) return state;

      const updatedNodes = state.activeMindMap.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node
      );

      const updatedMindMap = {
        ...state.activeMindMap,
        nodes: updatedNodes,
      };

      const updatedMindMaps = state.mindMaps.map((mindMap) =>
        mindMap.id === updatedMindMap.id ? updatedMindMap : mindMap
      );

      return {
        mindMaps: updatedMindMaps,
        activeMindMap: updatedMindMap,
      };
    });
  },
}));