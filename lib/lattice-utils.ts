export interface LatticeNode {
  id: number;
  frequency: number;
  chakraClass?: number;
  label: string;
}

export const getNodeById = (id: number): LatticeNode => ({
  id,
  frequency: 138 * (1 + (id % 7) * 0.1),
  chakraClass: ((id - 1) % 7) + 1,
  label: `Node ${id}`,
});

export const getAllAttractors = () => [26, 131, 147, 176, 188];