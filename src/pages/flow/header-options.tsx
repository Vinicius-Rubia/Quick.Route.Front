import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DATA } from "@/data";
import { Neighbor, NodeNeighborsData } from "@/interfaces";
import { GitBranch, MapPinned, NotepadText } from "lucide-react";
import React from "react";
import { Edge, Node } from "reactflow";

interface HeaderOptionsProps {
  nodes: Node[];
  edges: Edge[];
}

export const HeaderOptions: React.FC<HeaderOptionsProps> = ({
  nodes,
  edges,
}) => {
  function getNodeNeighbors() {
    return nodes.map((node) => {
      const neighbors: Neighbor[] = edges
        .filter((edge) => edge.source === node.id || edge.target === node.id)
        .map((edge) => {
          const neighborId =
            edge.source === node.id ? edge.target : edge.source;
          return {
            distance: edge.data?.label,
            neighborName: nodes.find((neighbor) => neighbor.id === neighborId)
              ?.data.label,
          };
        });
      const data: NodeNeighborsData = {
        nodeName: node.data.label,
        neighbors: neighbors,
      };
      return data;
    });
  }

  const graphData = getNodeNeighbors();
  return (
    <div className="absolute left-5 right-5 top-4 flex items-center justify-between z-10">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <NotepadText className="size-4" />
            Leia-me
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Informação Importante!</AlertDialogTitle>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                As
                <strong>
                  <em> Cidades </em>
                </strong>
                serão exibidas em outra tela dentro de uma caixa de seleção.
                Você deverá selecionar o ponto de partida e o ponto de chegada.
              </p>
              <p>
                A
                <strong>
                  <em> Distância </em>
                </strong>
                entre essas cidades será utilizada para calcular a melhor rota
                até o destino escolhido.
              </p>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-x-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <MapPinned className="size-4" />
              Melhores rotas
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Melhores Rotas Entre Cidades</AlertDialogTitle>
              <div className="space-y-2 flex flex-col text-sm text-muted-foreground">
                <p>
                  Selecione uma cidade abaixo para visualizar a menor distância
                  e a melhor rota para chegar ao destino.
                </p>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="city">Selecione uma cidade:</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {DATA.CITIES.map((city, index) => (
                        <SelectItem key={index} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableCaption>
                    Esta tabela detalha o cálculo das distâncias mais curtas e
                    os pontos de passagem, facilitando a análise das conexões
                    entre as cidades.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vértice</TableHead>
                      <TableHead>Menor Dist. P/Sorocaba</TableHead>
                      <TableHead>Passando por</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Piedade</TableCell>
                      <TableCell className="text-center">25 Km</TableCell>
                      <TableCell>Votorantim</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sorocaba</TableCell>
                      <TableCell className="text-center">0 Km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Votorantim</TableCell>
                      <TableCell className="text-center">3 Km</TableCell>
                      <TableCell>Votorantim</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pilar do Sul</TableCell>
                      <TableCell className="text-center">53 Km</TableCell>
                      <TableCell>Piedade</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Salto de Pirapora</TableCell>
                      <TableCell className="text-center">15 Km</TableCell>
                      <TableCell>Votorantim</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tapiraí</TableCell>
                      <TableCell className="text-center">43 Km</TableCell>
                      <TableCell>Piedade</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Entendi</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <GitBranch className="size-4" />
              Ver Grafo
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Conexões de Cidades</AlertDialogTitle>
              <div className="space-y-2 flex flex-col text-sm text-muted-foreground">
                <p>
                  Este gráfo ilustra as conexões das cidades com seus vizinhos
                  próximos, destacando a distância em quilômetros entre eles.
                </p>
                <p>
                  Use este gráfo para visualizar rapidamente as conexões e
                  distâncias entres as cidades e seus vizinhos.
                </p>

                <Table>
                  <TableCaption>
                    Conexões entre cidades e seus vizinhos com distâncias em
                    quilômetros.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Cidade</TableHead>
                      <TableHead>Vizinhos</TableHead>
                      <TableHead>Distâncias</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {graphData.map((graph, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {graph.nodeName}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col justify-center gap-2">
                            {graph.neighbors.map((neighbor, nIndex) => (
                              <span key={nIndex}>{neighbor.neighborName}</span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col justify-center gap-2">
                            {graph.neighbors.map((neighbor, nIndex) => (
                              <span key={nIndex}>{neighbor.distance}</span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Entendi</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
