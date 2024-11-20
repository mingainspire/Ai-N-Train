import React, { useState, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useMindMapStore } from '../store/mindMapStore';
import { NodeContextMenu } from './NodeContextMenu';
import { GoalNode } from './GoalNode';
import { UserNode } from './UserNode';
import { Node } from '../types';

export const MindMap: React.FC = () => {
  const { activeMindMap, updateNode } = useMindMapStore();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const graphRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (graphRef.current && activeMindMap && containerRef.current) {
      // Configure forces
      graphRef.current.d3Force('charge').strength(-300);
      graphRef.current.d3Force('link').distance(100);
      graphRef.current.d3Force('center', null);

      // Update dimensions on resize
      const updateDimensions = () => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          setDimensions({ width, height });
        }
      };

      // Initial update
      updateDimensions();

      // Update on resize
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [activeMindMap]);

  // Center graph after initial render
  useEffect(() => {
    if (graphRef.current) {
      const timeoutId = setTimeout(() => {
        graphRef.current?.zoomToFit(400, 50);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [dimensions]);

  if (!activeMindMap) return null;

  const handleNodeClick = (node: Node, event: MouseEvent) => {
    setSelectedNode(node);
    setMenuPosition({ x: event.x, y: event.y });
  };

  const handleContextMenuClose = () => {
    setSelectedNode(null);
    setMenuPosition(null);
  };

  const getNodeColor = (node: Node) => {
    if (node.type === 'goal') return '#4F46E5';
    if (node.type === 'user') return '#8B5CF6';
    return '#6B7280';
  };

  const graphData = {
    nodes: activeMindMap.nodes.map(node => ({
      ...node,
      color: getNodeColor(node),
      val: node.type === 'goal' ? 2 : 1
    })),
    links: activeMindMap.links
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeLabel="label"
        nodeRelSize={10}
        linkDistance={100}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
          const size = node.type === 'goal' ? 12 : 10;
          const { x, y, color, label = '' } = node;

          // Draw node
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();

          // Draw label with better contrast
          ctx.font = '14px Arial';
          ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#000000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, x, y + 20);
        }}
        onNodeClick={(node: any, event) => handleNodeClick(node, event)}
        onNodeDragEnd={(node: any) => {
          if (node.type !== 'goal') {
            updateNode(node.id, { x: node.x, y: node.y });
          }
        }}
        linkColor={() => '#9CA3AF'}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        minZoom={0.5}
        maxZoom={2}
        cooldownTicks={50}
      />

      {selectedNode && menuPosition && (
        <>
          {selectedNode.type === 'goal' ? (
            <GoalNode
              node={selectedNode}
              position={menuPosition}
              onClose={handleContextMenuClose}
              onUpdate={updateNode}
            />
          ) : selectedNode.type === 'user' ? (
            <UserNode
              node={selectedNode}
              position={menuPosition}
              onClose={handleContextMenuClose}
              onUpdate={updateNode}
            />
          ) : (
            <NodeContextMenu
              node={selectedNode}
              position={menuPosition}
              onClose={handleContextMenuClose}
              onUpdate={updateNode}
              actions={[]}
            />
          )}
        </>
      )}
    </div>
  );
};