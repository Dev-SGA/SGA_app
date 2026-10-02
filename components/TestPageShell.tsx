import Link from "next/link";
import { SgaLogo } from "@/components/SgaLogo";
import { BRAND } from "@/lib/brand";

type TestPageShellProps = {
  title: string;
  children: React.ReactNode;
};

export function TestPageShell({ title, children }: TestPageShellProps) {
  return (
    <div className="test-layout">
      <header className="test-topbar">
        <div className="container test-topbar__inner">
          <Link href="/" className="test-topbar__logo" aria-label={`${BRAND.name} — home`}>
            <SgaLogo variant="horizontal" size="xs" />
          </Link>
          <p className="test-topbar__title">{title}</p>
          <Link href="/" className="test-topbar__exit">
            Exit
          </Link>
        </div>
      </header>
      <main className="container test-main">{children}</main>
    </div>
  );
}
