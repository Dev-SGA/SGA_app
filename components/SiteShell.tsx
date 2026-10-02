import Link from "next/link";
import { SgaBrand } from "@/components/SgaBrand";
import { SgaCornerBrand } from "@/components/SgaCornerBrand";
import { BRAND } from "@/lib/brand";

type SiteShellProps = {
  eyebrow?: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
};

export function SiteShell({ eyebrow, title, meta, children }: SiteShellProps) {
  return (
    <>
      <div className="shell">
        <header className="report-header">
          <Link href="/" className="report-header__logo-link" aria-label={`${BRAND.name} — home`}>
            <SgaBrand />
          </Link>
          <div className="report-header__intro">
            {eyebrow ? <p className="report-header__eyebrow">{eyebrow}</p> : null}
            <h1 className="report-header__title">{title}</h1>
            {meta ? <p className="report-header__meta">{meta}</p> : null}
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <p className="footer__slogan">{BRAND.slogan}</p>
          <p className="footer__rights">© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</p>
        </footer>
      </div>
      <SgaCornerBrand />
    </>
  );
}
