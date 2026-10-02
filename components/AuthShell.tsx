import Link from "next/link";
import { PitchGraphic } from "@/components/PitchGraphic";
import { SgaLogo } from "@/components/SgaLogo";
import { BRAND } from "@/lib/brand";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const BENEFITS = [
  "Free scenario-based tactical tests",
  "Your score and player profile in minutes",
  "Direct follow-up from SGA analysts",
];

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="auth">
      <aside className="auth__aside">
        <Link href="/" className="auth__logo" aria-label={`${BRAND.name} — home`}>
          <SgaLogo variant="horizontal" size="md" priority />
        </Link>
        <div className="auth__pitch">
          <PitchGraphic variant="pocket" label="Receiving between the lines" />
        </div>
        <div>
          <h2 className="auth__aside-title">Get seen by SGA Performance.</h2>
          <ul className="auth__benefits" role="list">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <p className="auth__slogan">{BRAND.slogan}</p>
      </aside>

      <main className="auth__main">
        <Link href="/" className="auth__mobile-logo" aria-label={`${BRAND.name} — home`}>
          <SgaLogo variant="horizontal" size="sm" />
        </Link>
        <div className="auth__panel">
          <h1 className="auth__title">{title}</h1>
          {subtitle ? <p className="auth__subtitle">{subtitle}</p> : null}
          {children}
        </div>
      </main>
    </div>
  );
}
