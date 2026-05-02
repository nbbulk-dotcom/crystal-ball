import LatticeOrb from '@/components/LatticeOrb';
import CoherenceCanvas from '@/components/CoherenceCanvas';
import OracleVault from '@/components/OracleVault';

export default function Dashboard() {
  return (
    <div className="p-8 max-w-screen-2xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 holo-text">SOVEREIGN DASHBOARD</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          <LatticeOrb />
        </div>
        <div className="xl:col-span-4 space-y-8">
          <OracleVault />
          <CoherenceCanvas />
        </div>
      </div>

      {/* Quick links to all 16 apps */}
      <div className="mt-16">
        <h2 className="text-2xl font-mono text-cyan-400 mb-6">ALL REGENESIS MODULES</h2>
        {/* Will be expanded in Batch 5 with full launcher */}
        <p className="text-zinc-400">Full 16-app launcher coming in next batch integration...</p>
      </div>
    </div>
  );
}