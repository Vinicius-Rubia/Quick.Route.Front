import { ScrollArea } from "@/components/ui/scroll-area";
import { SimpleCard } from "@/components/ui/simple-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/spotlight";
import React from "react";

export const UsageGuide: React.FC = () => {
  return (
    <div className="w-[400px] border relative py-10">
      <Spotlight className="left-40 -top-20 z-20" fill="white" />
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0"
        particleColor="#353535"
      />
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Guia de Uso
      </h1>
      <div className="my-2 relative mb-10">
        <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-28 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-2/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>

      <SimpleCard>
        <ScrollArea className="h-[calc(100vh-230px)]">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl mb-4">1. Adicionar Cidades</h2>
              <ul className="space-y-2 list-disc [&>li]:ml-7">
                <li>
                  Clique no botão <em>"Adicionar cidade".</em>
                </li>
                <li>Insira um nome para a sua cidade.</li>
                <li>
                  Para conectar sua cidade a outras, pressione e segure o
                  círculo ao redor da cidade e arraste até a cidade desejado.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl mb-4">2. Editar Cidades e Conexões</h2>
              <ul className="space-y-2 list-disc [&>li]:ml-7">
                <li>
                  Para editar uma cidade, clique no texto do cidade e renomeie.
                </li>
                <li>
                  Para editar uma conexão, clique no texto da conexão e
                  renomeie.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl mb-4">3. Remover Cidades e Conexões</h2>
              <ul className="space-y-2 list-disc [&>li]:ml-7">
                <li>
                  Para remover uma cidade, selecione-a e pressione a tecla{" "}
                  <code>
                    <em>Backspace</em>
                  </code>
                  .
                </li>
                <li>
                  Para remover uma conexão, selecione-a e pressione a tecla{" "}
                  <code>
                    <em>Backspace</em>
                  </code>
                  .
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl mb-4">4. Salvar o Esquema</h2>
              <ul className="space-y-2 list-disc [&>li]:ml-7">
                <li>
                  Clique no botão{" "}
                  <code>
                    <em>"Salvar modelo"</em>
                  </code>{" "}
                  para salvar todo o esquema.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl mb-4">5. Limpar esquema</h2>
              <ul className="space-y-2 list-disc [&>li]:ml-7">
                <li>
                  Clique no botão{" "}
                  <code>
                    <em>"Limpar esquema"</em>
                  </code>{" "}
                  para resetar todo o esquema.
                </li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </SimpleCard>
    </div>
  );
};
