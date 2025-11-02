import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unity PC ? Android Porting Guide',
  description: 'A practical, step-by-step guide and wizard to port Unity PC games to Android.',
  metadataBase: new URL('https://agentic-737a8956.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b">
          <div className="container-content flex items-center justify-between py-4">
            <Link href="/" className="font-semibold text-xl">Unity Porting Guide</Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/guide" className="hover:text-brand-700">Guide</Link>
              <Link href="/wizard" className="hover:text-brand-700">Wizard</Link>
              <a href="https://github.com/AssetRipper/AssetRipper" className="hover:text-brand-700" target="_blank" rel="noreferrer">AssetRipper</a>
            </nav>
          </div>
        </header>
        <main className="container-content py-8">{children}</main>
        <footer className="border-t mt-16">
          <div className="container-content py-6 text-sm text-slate-600">
            Built for educational purposes. Ensure you own rights to port and distribute.
          </div>
        </footer>
      </body>
    </html>
  );
}
