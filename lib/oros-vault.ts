import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const JWT_SECRET = process.env.ORACLE_JWT_SECRET!;
const MASTER_FCAT = process.env.MASTER_FCAT_HASH!;

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export interface AiCredential {
  id: string;
  provider: string;
  label: string;
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

// Hard-seeded admin (your account)
const ADMIN_EMAIL = 'tribuneplebeian@gmail.com';
const ADMIN_PASSWORD_HASH = '$2a$10$YOUR_HASH_HERE'; // bcrypt of "Tr1bun@l2026!"
const SECURITY_ANSWERS = {
  q1: '$2a$10$hash-of-1656Hz',     // frequency
  q2: '$2a$10$hash-of-MT.Kailash', // mountain
  q3: '$2a$10$hash-of-North',      // face
};

export async function login(email: string, password: string): Promise<string | null> {
  if (email !== ADMIN_EMAIL || !(await bcrypt.compare(password, ADMIN_PASSWORD_HASH))) {
    return null;
  }
  return jwt.sign({ email, role: 'ADMIN' }, JWT_SECRET, { expiresIn: '30d' });
}

export async function verifySecurity(answers: { q1: string; q2: string; q3: string }): Promise<boolean> {
  return (
    await bcrypt.compare(answers.q1.toLowerCase().trim(), SECURITY_ANSWERS.q1) &&
    await bcrypt.compare(answers.q2.toLowerCase().trim(), SECURITY_ANSWERS.q2) &&
    await bcrypt.compare(answers.q3.toLowerCase().trim(), SECURITY_ANSWERS.q3)
  );
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; role: string };
  } catch {
    return null;
  }
}

// AI Credential management (stored encrypted in DB, but for simplicity we expose via Prisma)
export const seededCredentials = [
  {
    id: '1',
    provider: 'xai',
    label: 'Grok Primary',
    apiKey: 'xai-vYT8kK4Hodkh6YPnAQhkrmN3eI23sVbJ7m0PzBHWpfCIDwGGvEvpcpf179pmNsPOsOJeLPgc2MM4a73U',
    model: 'grok-4.20-reasoning',
    baseUrl: 'https://api.x.ai/v1',
  },
  {
    id: '2',
    provider: 'deepseek',
    label: 'DeepSeek Primary',
    apiKey: 'sk-dd323319c78e40598d1ed40e0e69425b',
    model: 'deepseek-chat',
    baseUrl: 'https://api.deepseek.com/v1',
  },
] as AiCredential[];