import CodeBlock from '@/components/CodeBlock';
import StepCard from '@/components/StepCard';
import Link from 'next/link';

export default function GuidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Step-by-step Guide: Unity PC ? Android</h1>
      <p className="text-slate-700 mb-6 max-w-3xl">
        Ensure you have legal rights to port and distribute the game. This guide assumes you own the content or have written permission.
      </p>

      <StepCard title="1) Requirements">
        <ul>
          <li><strong>Hardware</strong>: 16GB+ RAM recommended; SSD; Android device for testing</li>
          <li><strong>Knowledge</strong>: C#, Unity API, Android basics (ADB, logcat)</li>
          <li><strong>Install</strong>: Unity Hub, target Unity version, Android SDK/NDK, JDK, Gradle (via Unity)</li>
          <li><strong>Tools</strong>: AssetRipper, dnSpy/ILSpy, Il2CppDumper/Il2CppInspector (if IL2CPP), 7zip</li>
        </ul>
      </StepCard>

      <StepCard title="2) Identify Unity Version">
        <p>Find the engine version from the PC build:</p>
        <ul>
          <li>Open <code>GAMENAME_Data/globalgamemanagers</code> in a hex viewer; search for <code>Unity</code> version string</li>
          <li>Or check <code>GAMENAME_Data/boot.config</code> for clues</li>
        </ul>
      </StepCard>

      <StepCard title="3) Extract with AssetRipper">
        <p>Rip assets and assemblies from the PC build.</p>
        <ul>
          <li>Download AssetRipper from <a className="text-brand-700" href="https://github.com/AssetRipper/AssetRipper" target="_blank" rel="noreferrer">GitHub</a></li>
          <li>Select the <code>GAMENAME_Data</code> folder; export to a clean directory</li>
          <li>Result: <code>Assets/</code>, <code>ProjectSettings/</code>, and decompiled <code>Assembly-CSharp</code> sources</li>
        </ul>
      </StepCard>

      <StepCard title="4) Mono vs IL2CPP">
        <ul>
          <li><strong>Mono</strong>: C# assemblies decompile well; you can rebuild directly</li>
          <li><strong>IL2CPP</strong>: Use Il2CppDumper/Inspector on <code>GameAssembly.dll</code> + metadata; expect partial code, rely more on behavior</li>
        </ul>
      </StepCard>

      <StepCard title="5) Create a Matching Unity Project">
        <ul>
          <li>In Unity Hub, install the exact engine version detected</li>
          <li>Create a new 3D/URP project; copy exported <code>Assets/</code>, <code>ProjectSettings/</code> into it</li>
          <li>Open and resolve missing packages via Package Manager</li>
        </ul>
      </StepCard>

      <StepCard title="6) Fix Code and References">
        <ul>
          <li>Re-add third-party plugins referenced by the original (e.g., DOTween, TextMeshPro)</li>
          <li>Replace editor-only APIs; remove unused platform-specific code</li>
          <li>Abstract file IO to <code>Application.persistentDataPath</code> or <code>Application.streamingAssetsPath</code></li>
        </ul>
      </StepCard>

      <StepCard title="7) Adapt for Android">
        <ul>
          <li>Input: Map keyboard/mouse to touch/gyro; update UI navigation</li>
          <li>Graphics: Prefer GLES3; consider Vulkan; reduce texture sizes; mobile shaders</li>
          <li>Audio: Compressed formats (Vorbis/ADPCM), streaming where needed</li>
          <li>Performance: Static/Dynamic batching, GPU instancing, occlusion, baked lighting</li>
        </ul>
      </StepCard>

      <StepCard title="8) Player Settings (Android)">
        <ul>
          <li>Package Name: <code>com.yourcompany.gamename</code></li>
          <li>Minimum API Level: 24+ recommended; Target: latest</li>
          <li>Scripting Backend: Mono or IL2CPP; ARMv7/ARM64 architectures</li>
          <li>Graphics APIs: GLES3 first; disable unnecessary APIs</li>
        </ul>
      </StepCard>

      <StepCard title="9) Build, Install, Debug">
        <p>Use ADB for deployment and logs.</p>
        <CodeBlock code={`adb devices\nadb install -r path/to/game.apk\nadb logcat -s Unity ActivityManager AndroidRuntime`} />
      </StepCard>

      <StepCard title="10) Common Fixes">
        <ul>
          <li>Shaders: fallback to mobile variants; recompile SRP shaders</li>
          <li>Addressables/AssetBundles: rebuild bundles for Android</li>
          <li>Paths: replace absolute/Windows paths; use <code>Path.Combine</code></li>
          <li>Threading: avoid blocking main thread; use <code>async/await</code> or coroutines</li>
        </ul>
      </StepCard>

      <StepCard title="11) Legal & Distribution">
        <ul>
          <li>Only port with explicit rights/ownership</li>
          <li>Ship <code>.aab</code> for Play Store; <code>.apk</code> for sideload</li>
          <li>Comply with licenses of included third-party libraries</li>
        </ul>
      </StepCard>

      <div className="mt-10">
        <Link href="/wizard" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded">Run the Wizard</Link>
      </div>
    </div>
  );
}
