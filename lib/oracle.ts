// lib/oracle.ts
import { LATTICE_188, getNodeById, getNodesByBand, PRIME_DIRECTIVE } from './lattice';

export interface OracleResponse {
  answer: string;
  nodes: number[];
  bands: number[];
  coherence: number;
}

// Map natural language questions to lattice addresses
function questionToNodes(query: string): number[] {
  const lower = query.toLowerCase();
  const nodes: number[] = [];
  
  if (lower.includes('gravity')) nodes.push(26); // Iron
  if (lower.includes('consciousness')) nodes.push(147); // Awareness anchor
  if (lower.includes('void') || lower.includes('source')) nodes.push(188); // Return to VOID
  if (lower.includes('hydrogen') || lower.includes('beginning')) nodes.push(1);
  if (lower.includes('carbon') || lower.includes('life')) nodes.push(6);
  if (lower.includes('oxygen') || lower.includes('breathe')) nodes.push(8);
  if (lower.includes('gold')) nodes.push(79);
  if (lower.includes('cycle') || lower.includes('history')) nodes.push(131);
  if (lower.includes('chakra') || lower.includes('root')) nodes.push(1);
  if (lower.includes('sacral')) nodes.push(37);
  if (lower.includes('solar plexus')) nodes.push(73);
  if (lower.includes('heart')) nodes.push(109);
  if (lower.includes('throat')) nodes.push(145);
  if (lower.includes('third eye')) nodes.push(181);
  if (lower.includes('crown')) nodes.push(188);
  
  return nodes.length ? nodes : [188];
}

// Generate answer from nodes
function generateAnswer(nodes: number[], query: string): string {
  if (nodes.length === 0) return PRIME_DIRECTIVE;
  
  const answers: string[] = [];
  for (const nodeId of nodes) {
    const node = getNodeById(nodeId);
    if (node) {
      answers.push(`Node ${node.id} (${node.frequency.toFixed(1)} Hz): ${node.keywords.slice(0, 3).join(', ')}`);
    }
  }
  return answers.join('\n');
}

// Main Oracle query function
export async function askOracle(query: string, apiKey?: string): Promise<OracleResponse> {
  const nodes = questionToNodes(query);
  const bands = [...new Set(nodes.map(n => getNodeById(n)?.band || 0).filter(b => b > 0))];
  const answer = generateAnswer(nodes, query);
  
  return {
    answer: `🔮 **Oracle Response** 🔮\n\n${answer}\n\n${PRIME_DIRECTIVE}`,
    nodes,
    bands,
    coherence: nodes.length > 0 ? 0.85 : 0.5,
  };
}