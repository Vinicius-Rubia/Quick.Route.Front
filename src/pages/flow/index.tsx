import CustomEdge from "@/components/ui/custom-edge";
import { CustomNode } from "@/components/ui/custom-node";
import { DATA } from "@/data";
import { AnimationTransition } from "@/shared/animation-transition";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  EdgeChange,
  EdgeTypes,
  NodeChange,
  NodeTypes,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { FooterOptions } from "./footer-options";
import { HeaderOptions } from "./header-options";
import { UsageGuide } from "./usage-guide";

const nodeTypes: NodeTypes = { textUpdater: CustomNode };
const edgeTypes: EdgeTypes = { custom: CustomEdge };

export const Flow: React.FC = () => {
  // const [nodes, setNodes, onNodesChange] = useNodesState(DATA.INITIAL_NODES);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(DATA.INITIAL_EDGES);

  const [nodes, setNodes] = useState(DATA.INITIAL_NODES);
  const [edges, setEdges] = useState(DATA.INITIAL_EDGES);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            id: uuidv4(),
            source: params.source!,
            target: params.target!,
            type: "custom",
            animated: true,
            data: { label: "0 Km" },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  return (
    <div className="h-screen flex relative">
      <UsageGuide />
      <div className="flex-1 flex justify-center items-center relative">
        <HeaderOptions nodes={nodes} edges={edges} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{
            maxZoom: 1.2,
            duration: 1000,
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
        <FooterOptions setEdges={setEdges} setNodes={setNodes} />
      </div>
      <AnimationTransition />
    </div>
  );
};
