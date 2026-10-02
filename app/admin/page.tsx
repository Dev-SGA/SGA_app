import Link from "next/link";
import { AdminAthletesPanel } from "@/components/AdminAthletesPanel";
import { SgaLogo } from "@/components/SgaLogo";
import { BRAND } from "@/lib/brand";

export default function AdminPage() {
  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="container admin__bar-inner">
          <Link href="/" className="admin__logo" aria-label={`${BRAND.name} — home`}>
            <SgaLogo variant="horizontal" size="sm" />
          </Link>
          <span className="chip chip--solid">Admin</span>
        </div>
      </header>
      <main className="container admin__main">
        <header className="page-head page-head--compact">
          <p className="eyebrow">Registrations</p>
          <h1 className="page-head__title">Athletes</h1>
          <p className="page-head__meta">Everyone who created an athlete profile in the tactical test app.</p>
        </header>
        <AdminAthletesPanel />
      </main>
    </div>
  );
}
