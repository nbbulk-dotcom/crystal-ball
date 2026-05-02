import './globals.css';
import type { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'CRYSTAL BALL — REGENESIS SOVEREIGN MASTER',
  description: 'Holographic 188-node lattice • Unified Resonance System • No external dependencies',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen h-full bg-black text-white antialiased">
        <div className="min-h-screen h-full w-full">{children}</div>
      </body>
    </html>
  );
}