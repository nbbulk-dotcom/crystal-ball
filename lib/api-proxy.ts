const ABACUS_BASES: Record<string, string> = {
  earthpulse: 'https://earthpulse.abacusai.app',
  '12stranddna': 'https://12stranddna.abacusai.app',
  worldcycles: 'https://worldcycles.abacusai.app',
  ancientlanguages: 'https://ancientlanguages.abacusai.app',
  '6dvoiduniverse': 'https://6dvoiduniverse.abacusai.app',
  lexmathematica: 'https://lexmathematica.abacusai.app',
  regenisisyairveda: 'https://regenisisyairveda.abacusai.app',
  contactlanguage: 'https://contactlanguage.abacusai.app',
  resonancemaporg: 'https://resonancemaporg.abacusai.app',
  oroswindows: 'https://oroswindows.abacusai.app',
  // Add more as needed
};

export async function proxyRequest(app: string, path: string, init?: RequestInit) {
  const base = ABACUS_BASES[app];
  if (!base) throw new Error(`Unknown app: ${app}`);

  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, init);

  // Local fallback logic for critical modules (example)
  if (!res.ok && app === '12stranddna' && path.includes('solarProtocols')) {
    // Return bundled local data from public/data/solar-protocols.json
    return Response.json({ fallback: true, data: [] /* loaded from static */ });
  }

  return res;
}

// Helper for Next.js API routes
export function createProxyRoute(app: string) {
  return async (req: Request) => {
    const url = new URL(req.url);
    const path = url.pathname.replace(`/api/proxy/${app}`, '');
    return proxyRequest(app, path, {
      method: req.method,
      headers: req.headers,
      body: req.body ? await req.text() : undefined,
    });
  };
}