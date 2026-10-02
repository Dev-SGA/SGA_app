import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type SiteShellProps = {
  eyebrow?: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
};

export function SiteShell({ eyebrow, title, meta, children }: SiteShellProps) {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="container">
          <header className="page-head">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1 className="page-head__title">{title}</h1>
            {meta ? <p className="page-head__meta">{meta}</p> : null}
          </header>
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
