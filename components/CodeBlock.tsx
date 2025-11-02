"use client";
import { useState } from 'react';

export default function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group">
      <pre className="bg-slate-950 text-slate-100 p-4 rounded-md overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700"
        aria-label="Copy code"
      >{copied ? 'Copied' : 'Copy'}</button>
    </div>
  );
}
