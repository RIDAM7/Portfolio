import { GradientText } from "@/components/GradientText";
import { MonoLabel } from "@/components/MonoLabel";

export default function Home() {
  return (
    <main className="gradient-mesh flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <MonoLabel>Portfolio · In progress</MonoLabel>
      <h1 className="mt-5 font-display text-fluid-3xl font-bold tracking-tight">
        Ridam <GradientText>Agrawal</GradientText>
      </h1>
      <p className="mt-3 max-w-md text-fluid-base text-fg-muted">
        Full-Stack Developer · Backend &amp; AI Engineer
      </p>
      <p className="mt-6 font-mono text-fluid-xs uppercase tracking-[0.2em] text-fg-subtle">
        Coming soon
      </p>
    </main>
  );
}
