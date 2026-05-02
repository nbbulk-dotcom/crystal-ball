import { NextResponse } from 'next/server';
// Bundled local data from your uploaded files (solar protocols + melanin classes)
const localSolarProtocols = {
  classes: [
    { id: 1, name: 'Commoner', freqRange: '85–220 Hz', solarProtocol: 'High UVI grounding' },
    { id: 2, name: 'Merchant', freqRange: '220–330 Hz', solarProtocol: 'Gut-focused midday' },
    // ... full 7 classes from your REGENESIS files
  ],
  civilizationalGroups: [] // populated from uploaded data
};

export async function GET() {
  // Return local mirror when Abacus is unreachable
  return NextResponse.json({
    source: 'local-mirror',
    data: localSolarProtocols,
    timestamp: new Date().toISOString()
  });
}