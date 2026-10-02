import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell title="Página não encontrada" meta="O teste ou endereço solicitado não existe.">
      <Link href="/" className="btn btn--primary">
        Voltar aos testes
      </Link>
    </SiteShell>
  );
}
