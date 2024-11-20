import React from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onZoomReset,
}) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
      <button
        onClick={onZoomIn}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        title="Zoom in"
      >
        <ZoomIn className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        title="Zoom out"
      >
        <ZoomOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
      <button
        onClick={onZoomReset}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        title="Reset zoom"
      >
        <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  );
};