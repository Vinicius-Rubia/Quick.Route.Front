export * from "./redux/flowState";

export interface Neighbor {
  distance: string;
  neighborName: string;
}

export interface NodeNeighborsData {
  nodeName: string;
  neighbors: Neighbor[];
}
