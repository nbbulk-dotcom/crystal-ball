import LatticeOrb from '@/components/LatticeOrb';

export default function LatticePage() {
  return (
    <div className="p-8 max-w-screen-2xl mx-auto">
      <h1 className="text-4xl font-mono text-cyan-300 mb-8">188-NODE LATTICE EXPLORER</h1>
      <LatticeOrb />
      <p className="text-center text-xs text-zinc-500 mt-8 font-mono">
        Click any node to activate corresponding REGENESIS protocol
      </p>
    </div>
  );
}