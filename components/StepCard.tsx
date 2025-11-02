import { ReactNode } from 'react';

export default function StepCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border rounded-lg p-5 mb-6">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="prose prose-slate max-w-none">
        {children}
      </div>
    </section>
  );
}
