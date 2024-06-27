import { Edge, Node } from "reactflow";

const CITIES = [
  "Piedade",
  "Sorocaba",
  "Votorantim",
  "Pilar do Sul",
  "Salto de Pirapora",
  "Tapiraí",
];

const INITIAL_EDGES: Edge[] = [
  {
    id: "e1-2",
    source: "C",
    target: "B",
    type: "custom",
    animated: true,
    data: { label: "3 Km" },
  },
  {
    id: "e1-3",
    source: "C",
    target: "A",
    type: "custom",
    animated: true,
    data: { label: "22 Km" },
  },
];

const INITIAL_NODES: Node[] = [
  {
    id: "A",
    type: "textUpdater",
    position: { x: 400, y: 300 },
    data: { label: "Piedade" },
  },
  {
    id: "B",
    type: "textUpdater",
    position: { x: 800, y: 300 },
    data: { label: "Sorocaba" },
  },
  {
    id: "C",
    type: "textUpdater",
    position: { x: 600, y: 100 },
    data: { label: "Votorantim" },
  },
];

export const DATA = {
  CITIES,
  INITIAL_EDGES,
  INITIAL_NODES,
};
