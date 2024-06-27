type Graph = {
  [node: string]: {
    [neighbor: string]: number;
  };
};

type Distances = {
  [node: string]: number;
};

type Visited = {
  [node: string]: string | null;
};

type PriorityQueueItem = {
  value: string;
  priority: number;
};

class PriorityQueue {
  private values: PriorityQueueItem[];

  constructor() {
    this.values = []; // Inicializa a fila de prioridade como um array vazio
  }

  enqueue(value: string, priority: number): void {
    this.values.push({ value, priority }); // Adiciona um novo item à fila com o valor e a prioridade especificados
    this.sort();
  }

  dequeue(): PriorityQueueItem | undefined {
    return this.values.shift(); // Remove e retorna o item com a menor prioridade (o primeiro item no array)
  }

  isEmpty(): boolean {
    return this.values.length === 0; // Verifica se a fila está vazia
  }

  private sort(): void {
    this.values.sort((a, b) => a.priority - b.priority); // Ordena os itens na fila com base na prioridade em ordem crescente.
  }
}

export const dijkstra = (graph: Graph, startNode: string): { distances: Distances, visited: Visited } => {
  const distances: Distances = {}; // Armazena as menores distâncias conhecidas de startNode para cada nó
  const visited: Visited = {}; // Armazenar o nó anterior no caminho mais curto para cada nó
  const pq = new PriorityQueue(); // Fila de prioridade para gerenciar qual nó processar em seguida

  for (const node in graph) { // Para cada nó no grafo
    if (node === startNode) {
      distances[node] = 0; // Define a distância como 0
      pq.enqueue(node, 0); // Coloca na fila de prioridade com prioridade 0
    } else {
      distances[node] = Infinity;
      pq.enqueue(node, Infinity);
    }
    visited[node] = null; // Inicialização do predecessor
  }

  while (!pq.isEmpty()) { // Enquanto a fila de prioridade NÃO estiver vazia
    const currentNode = pq.dequeue()?.value; // Remove o nó com a menor distância (prioridade) da fila (currentNode)

    if (!currentNode) continue; // Caso não exista o nó, pule para o próximo item porque se não existir o nó não existe vizinhos

    // Processar os vizinhos do nó atual
    for (const neighbor in graph[currentNode]) { // Para cada vizinho (neighbor) do currentNode
      const distance = graph[currentNode][neighbor]; // acessa o valor da chave neighbor no objeto graph[currentNode], que é a distância entre currentNode e neighbor
      const totalDistance = distances[currentNode] + distance; // Calcula a distância do startNode até neighbor passando por currentNode (totalDistance)

      if (totalDistance < distances[neighbor]) { // Se totalDistance for menor que a distância conhecida (distances[neighbor])
        distances[neighbor] = totalDistance; // Atualiza distances
        visited[neighbor] = currentNode; // Atualiza predecessor
        pq.enqueue(neighbor, totalDistance); // Adiciona o vizinho na fila de prioridade com a nova distância
      }
    }
  }

  return { distances, visited };
};