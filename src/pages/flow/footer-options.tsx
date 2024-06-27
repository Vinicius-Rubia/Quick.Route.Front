import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FlowSchema } from "@/schemas/flow-schema";
import { AddCityType } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Edge, Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";

interface FooterOptionsProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export const FooterOptions: React.FC<FooterOptionsProps> = ({
  setEdges,
  setNodes,
}) => {
  const form = useForm<AddCityType>({
    resolver: zodResolver(FlowSchema.AddCitySchema),
    defaultValues: {
      cityName: "",
    },
  });

  const addNodeSubmit: SubmitHandler<AddCityType> = ({ cityName }) => {
    const newNode: Node = {
      id: uuidv4(),
      position: {
        x: (Math.random() * (window.innerWidth - 400)) / 2,
        y: (Math.random() * window.innerHeight) / 2,
      },
      type: "textUpdater",
      data: {
        label: cityName,
      },
    };
    setNodes((prev) => [...prev, newNode]);
    form.reset();
  };

  const saveTemplate = () => {};

  const resetTemplate = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="absolute bottom-10 z-10 flex items-center gap-4">
      <Popover open={form.formState.isSubmitSuccessful ? false : undefined}>
        <PopoverTrigger>
          <HoverBorderGradient
            containerClassName="rounded-md"
            as="div"
            className="bg-black text-white flex items-center space-x-2"
            onClick={() => form.reset()}
          >
            <span className="text-base">Adicionar cidade</span>
          </HoverBorderGradient>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addNodeSubmit)}
              className="grid gap-4"
            >
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Adicionar cidade</h4>
                <p className="text-sm text-muted-foreground">
                  Informe o nome da cidade que deseja adicionar.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <FormField
                  control={form.control}
                  name="cityName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Nome da cidade"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size="icon" variant="default">
                  <Plus />
                </Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
      <HoverBorderGradient
        containerClassName="rounded-md"
        as="button"
        className="bg-black text-white flex items-center space-x-2"
        onClick={saveTemplate}
      >
        <span className="text-base">Salvar esquema</span>
      </HoverBorderGradient>
      <HoverBorderGradient
        containerClassName="rounded-md"
        as="button"
        className="bg-destructive text-white flex items-center space-x-2"
        onClick={resetTemplate}
      >
        <span className="text-base">Limpar esquema</span>
      </HoverBorderGradient>
    </div>
  );
};
