"use client";
import { useMemo, useState } from 'react';
import CodeBlock from '@/components/CodeBlock';

type WizardInput = {
  gameName: string;
  unityVersion: string;
  backend: 'Mono' | 'IL2CPP';
  renderPipeline: 'Built-in' | 'URP' | 'HDRP' | 'Unknown';
  usesBundles: boolean;
  platformApis: string[]; // e.g., ['Steamworks']
};

const defaults: WizardInput = {
  gameName: '',
  unityVersion: '',
  backend: 'Mono',
  renderPipeline: 'Built-in',
  usesBundles: true,
  platformApis: [],
};

export default function WizardPage() {
  const [input, setInput] = useState<WizardInput>(defaults);

  const checklist = useMemo(() => {
    const items: string[] = [];
    items.push(`Detect Unity version (${input.unityVersion || 'unknown'}). Install exact version in Unity Hub.`);
    items.push('Run AssetRipper on GAMENAME_Data to export Assets/ and ProjectSettings/.');
    if (input.backend === 'IL2CPP') {
      items.push('Use Il2CppDumper/Inspector on GameAssembly.dll + global-metadata.dat.');
    } else {
      items.push('Decompile Assembly-CSharp.dll with ILSpy/dnSpy as needed.');
    }
    items.push('Create new Unity project, copy exported Assets and ProjectSettings.');
    items.push('Resolve missing packages and plugins (TextMeshPro, DOTween, etc).');
    if (input.renderPipeline !== 'Built-in') {
      items.push(`Install ${input.renderPipeline} via Package Manager and reimport shaders/materials.`);
    }
    if (input.usesBundles) {
      items.push('Rebuild Addressables/AssetBundles for Android platform.');
    }
    if (input.platformApis.length > 0) {
      items.push(`Replace platform APIs (${input.platformApis.join(', ')}) with mobile-friendly equivalents or stubs.`);
    }
    items.push('Adapt input: touch controls, UI scaling, on-screen prompts.');
    items.push('Switch paths to Application.persistentDataPath/streamingAssetsPath.');
    items.push('Configure Player Settings (Package ID, Min API 24+, Scripting Backend, ARM64).');
    items.push('Prefer GLES3; optionally enable Vulkan; test both.');
    items.push('Build .apk and test via ADB; fix crashes using logcat.');
    return items;
  }, [input]);

  const adb = `adb devices\nadb install -r ${input.gameName ? input.gameName.replace(/\s+/g, '-') : 'game'}.apk\nadb logcat -s Unity ActivityManager AndroidRuntime`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Porting Wizard</h1>
      <p className="text-slate-700">Fill details to generate a tailored checklist and commands.</p>

      <form className="grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Game Name</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={input.gameName}
            onChange={(e) => setInput({ ...input, gameName: e.target.value })}
            placeholder="CASE Animatronics"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Unity Version</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={input.unityVersion}
            onChange={(e) => setInput({ ...input, unityVersion: e.target.value })}
            placeholder="e.g. 2019.4.40f1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Scripting Backend</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={input.backend}
            onChange={(e) => setInput({ ...input, backend: e.target.value as WizardInput['backend'] })}
          >
            <option>Mono</option>
            <option>IL2CPP</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Render Pipeline</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={input.renderPipeline}
            onChange={(e) => setInput({ ...input, renderPipeline: e.target.value as WizardInput['renderPipeline'] })}
          >
            <option>Built-in</option>
            <option>URP</option>
            <option>HDRP</option>
            <option>Unknown</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Platform APIs to Replace (optional)</label>
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="e.g. Steamworks, Epic Online Services"
            onChange={(e) => setInput({ ...input, platformApis: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
          />
        </div>
        <div className="flex items-center gap-2 md:col-span-2">
          <input
            id="bundles"
            type="checkbox"
            checked={input.usesBundles}
            onChange={(e) => setInput({ ...input, usesBundles: e.target.checked })}
          />
          <label htmlFor="bundles" className="text-sm">Uses Addressables/AssetBundles</label>
        </div>
      </form>

      <section className="border rounded-lg p-5">
        <h2 className="font-semibold mb-3">Generated Checklist</h2>
        <ol className="list-decimal pl-6 space-y-2">
          {checklist.map((c, i) => (
            <li key={i} className="text-slate-800">{c}</li>
          ))}
        </ol>
      </section>

      <section className="border rounded-lg p-5 space-y-3">
        <h2 className="font-semibold">ADB Commands</h2>
        <CodeBlock code={adb} />
      </section>

      <section className="border rounded-lg p-5 space-y-3">
        <h2 className="font-semibold">References</h2>
        <ul className="list-disc pl-5 text-slate-700">
          <li><a className="text-brand-700" href="https://github.com/AssetRipper/AssetRipper" target="_blank" rel="noreferrer">AssetRipper</a></li>
          <li><a className="text-brand-700" href="https://github.com/Perfare/Il2CppDumper" target="_blank" rel="noreferrer">Il2CppDumper</a></li>
          <li><a className="text-brand-700" href="https://github.com/icsharpcode/ILSpy" target="_blank" rel="noreferrer">ILSpy</a></li>
          <li><a className="text-brand-700" href="https://docs.unity3d.com/Manual/android-getting-started.html" target="_blank" rel="noreferrer">Unity Android Build Support</a></li>
        </ul>
      </section>
    </div>
  );
}
