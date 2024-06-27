import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SimpleCard } from "@/components/ui/simple-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/spotlight";
import { DATA } from "@/data";
import { dijkstra } from "@/utils/dijkstra";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Graph = {
  [node: string]: {
    [neighbor: string]: number;
  };
};

type ShortestPath = {
  path: string[];
  distance: number;
} | null;

const FormSchema = z.object({
  starting_point: z.string({
    required_error: "Selecione o ponto de partida",
  }),
  arrival_point: z.string({
    required_error: "Selecione o ponto de chegada",
  }),
});

export const BestRoute: React.FC = () => {
  const [shortestPath, setShortestPath] = useState<ShortestPath>(null); // Armazena o caminho mais curto

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const graph: Graph = {
    Piedade: { "Pilar do Sul": 28, Votorantim: 22, Tapiraí: 18 },
    Sorocaba: { Votorantim: 3 },
    Votorantim: { Piedade: 22, Sorocaba: 3, "Salto de Pirapora": 12 },
    "Pilar do Sul": { Piedade: 28, "Salto de Pirapora": 20 },
    "Salto de Pirapora": { "Pilar do Sul": 20, Votorantim: 12 },
    Tapiraí: { Piedade: 18 },
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { distances, visited } = dijkstra(graph, data.starting_point);
    // distances: Um mapa de distâncias mínimas do starting_point para cada nó
    // visited Um mapa indicando o nó anterior no caminho mais curto para cada nó

    const path: string[] = [];
    let currentNode: string | null = data.arrival_point; // Armazena o ponto de chegada

    // Começa do arrival_point(currentNode) e segue os nós no visited até chegar ao nó inicial
    while (currentNode) {
      path.push(currentNode);
      currentNode = visited[currentNode];
    }

    path.reverse(); // Inverte a ordem ao final para obter o caminho do início ao fim
    setShortestPath({ path, distance: distances[data.arrival_point] });
  }

  const isPresent = useIsPresent();
  return (
    <div>
      <div className="h-screen w-full rounded-md flex flex-col items-center pt-20 bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 z-20"
          fill="white"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Descubra a <br /> Rota Perfeita
          </h1>
          <div className="w-[40rem] my-2 relative mx-auto">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </div>
          <p className="mt-8 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Planeje suas viagens com facilidade. Selecione seu ponto de partida
            e destino para descobrir a rota mais rápida e eficiente. Experimente
            agora e veja como é simples otimizar seu trajeto!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center justify-center mt-10 w-[475px] z-10"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="starting_point"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ponto de partida:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o ponto de partida" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DATA.CITIES.map((city, index) => (
                          <SelectItem key={index} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="arrival_point"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ponto de chegada:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o ponto de chegada" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DATA.CITIES.map((city, index) => (
                          <SelectItem key={index} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="m-40 flex justify-center text-center">
                <HoverBorderGradient
                  containerClassName="rounded-md"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  <span className="text-base">Calcular</span>
                </HoverBorderGradient>
              </div>
            </form>
          </Form>
          <AnimatePresence>
          {shortestPath && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <SimpleCard>
                <h2 className="text-xl mb-4">Resultado</h2>
                <div className="space-y-2">
                  <p>Melhor caminho: {shortestPath.path.join(" -> ")}</p>
                  <p>Distância total: {shortestPath.distance} km</p>
                </div>
              </SimpleCard>
            </motion.div>
          )}
          </AnimatePresence>
        </motion.div>
      </div>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0"
        particleColor="#353535"
      />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="fixed inset-0 z-20 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors"
      />
    </div>
  );
};
