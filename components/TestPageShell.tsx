import Link from "next/link";
import { SgaLogo } from "@/components/SgaLogo";
import { BRAND } from "@/lib/brand";

type TestPageShellProps = {
  children: React.ReactNode;
};

export function TestPageShell({ children }: TestPageShellProps) {
  return (
    <div className="test-page">
      <div className="test-page__top">
        <Link href="/" className="test-page__logo" aria-label={`${BRAND.name} — home`}>
          <SgaLogo variant="symbol" size="md" />
        </Link>
        <Link href="/" className="landing-text-link">
          Home
        </Link>
      </div>
      <div className="test-page__content">{children}</div>
    </div>
  );
}
