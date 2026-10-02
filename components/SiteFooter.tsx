import Link from "next/link";
import { SgaLogo } from "@/components/SgaLogo";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <SgaLogo variant="horizontal" size="sm" />
          <p className="site-footer__slogan">{BRAND.slogan}</p>
        </div>
        <nav className="site-footer__links" aria-label="Footer">
          <Link href="/#tests">Tests</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Sign in</Link>
          <Link href="/admin/login">Staff</Link>
        </nav>
        <p className="site-footer__legal">
          © {new Date().getFullYear()} {BRAND.legal}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
