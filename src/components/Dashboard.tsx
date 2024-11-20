import React from 'react';
import { Clock } from 'lucide-react';
import { useMindMapStore } from '../store/mindMapStore';

export const Dashboard: React.FC = () => {
  const { mindMaps, setActiveMindMap } = useMindMapStore();
  
  // Only show the 5 most recent mind maps
  const recentMindMaps = mindMaps.slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {recentMindMaps.map((mindMap) => (
        <div
          key={mindMap.id}
          onClick={() => setActiveMindMap(mindMap.id)}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white truncate">
            {mindMap.prompt}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} className="mr-2" />
            {new Date(mindMap.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};