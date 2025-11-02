import Link from 'next/link';

export default function Page() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Port Unity PC ? Android</h1>
      <p className="text-slate-700 max-w-3xl">
        Practical guide and interactive wizard to help you decompile, re-import, adapt, and build Unity PC games for Android. Built around AssetRipper, dnSpy/ILSpy, Il2CppDumper, and Unity Hub.
      </p>
      <div className="flex gap-3">
        <Link href="/wizard" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded">Start Wizard</Link>
        <Link href="/guide" className="border px-4 py-2 rounded hover:bg-slate-50">Read the Guide</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[
          { title: 'Detect Unity Version', text: 'Match engine version before import.'},
          { title: 'Decompile Assets', text: 'Use AssetRipper for assets and scripts.'},
          { title: 'Adapt for Android', text: 'Input, storage, shaders, performance.'},
        ].map(item => (
          <div key={item.title} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
