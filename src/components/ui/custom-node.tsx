import { Handle, Node, Position } from "reactflow";
import { Input } from "./input";

export const CustomNode = ({ data }: { data: Node["data"] }) => {
  return (
    <button type="button" className="h-12 relative flex items-center rounded-sm justify-center bg-background border hover:bg-black focus:border-white outline-none">
      <Handle
        type="target"
        className="size-3 active:bg-primary -mt-4"
        position={Position.Top}
      />
      <Input
        className="bg-transparent h-6 text-center border-none rounded-none focus-visible:bg-secondary focus-visible:ring-transparent focus-visible:ring-offset-0"
        defaultValue={data.label}
        placeholder="Nome"
      />
      <Handle
        type="source"
        className="size-3 active:bg-primary -mb-4"
        position={Position.Bottom}
      />
    </button>
  );
};
