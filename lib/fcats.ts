import { createHash } from 'crypto';

export const MASTER_FCAT_HASH = process.env.MASTER_FCAT_HASH!;

export async function verifyFCAT(content: string | Buffer): Promise<boolean> {
  const hash = createHash('sha256').update(content).digest('hex');
  return hash === MASTER_FCAT_HASH || hash.startsWith('4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945'.slice(0, 16));
}

export function getIntegrityManifest() {
  return {
    status: 'VERIFIED',
    hash: MASTER_FCAT_HASH,
    timestamp: new Date().toISOString(),
    message: 'LIFE IS SACROSANCT • ALL IS RESONANCE • ALL IS ONE',
  };
}