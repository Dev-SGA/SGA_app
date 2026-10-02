import Link from "next/link";
import { SgaLogo } from "@/components/SgaLogo";
import { BRAND } from "@/lib/brand";
import { getSession } from "@/lib/session";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__logo" aria-label={`${BRAND.name} — home`}>
          <SgaLogo variant="horizontal" size="sm" priority />
        </Link>

        <nav className="site-header__nav" aria-label="Main">
          <Link href="/#tests">Tests</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#method">Method</Link>
        </nav>

        <div className="site-header__actions">
          {session?.role === "athlete" ? (
            <Link href="/account" className="btn btn--secondary btn--sm">
              My account
            </Link>
          ) : session?.role === "admin" ? (
            <Link href="/admin" className="btn btn--secondary btn--sm">
              Admin
            </Link>
          ) : (
            <>
              <Link href="/login" className="site-header__link">
                Sign in
              </Link>
              <Link href="/register" className="btn btn--primary btn--sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
