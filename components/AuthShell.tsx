import Link from "next/link";
import { SgaLogo } from "@/components/SgaLogo";
import { BRAND } from "@/lib/brand";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  wide?: boolean;
  children: React.ReactNode;
};

export function AuthShell({ title, subtitle, wide, children }: AuthShellProps) {
  return (
    <div className="auth-page">
      <div className="auth-page__top">
        <Link href="/" className="auth-page__logo" aria-label={`${BRAND.name} — home`}>
          <SgaLogo variant="horizontal" size="lg" priority />
        </Link>
      </div>
      <div className={`auth-card card${wide ? " auth-card--wide" : ""}`}>
        <h1 className="auth-card__title">{title}</h1>
        {subtitle ? <p className="auth-card__subtitle">{subtitle}</p> : null}
        {children}
      </div>
    </div>
  );
}
