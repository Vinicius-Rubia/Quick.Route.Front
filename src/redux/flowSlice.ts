import { DATA } from "@/data";
import { FlowState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { Node } from "reactflow";

const initialState: FlowState = {
  nodes: DATA.INITIAL_NODES,
  edges: DATA.INITIAL_EDGES,
};

export const slice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes(state, { payload }: { payload: Node }) {
      state.nodes.push(payload);
    },
    setEdges(state, { payload }: { payload: Node }) {
      state.nodes.push(payload);
    },
  },
});

export const { setNodes, setEdges } = slice.actions;

export const selectFlow = ({ flowModel }: { flowModel: FlowState }) => flowModel;

export default slice.reducer;