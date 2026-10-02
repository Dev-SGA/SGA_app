import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell eyebrow="404" title="Page not found" meta="The test or page you requested does not exist.">
      <Link href="/" className="btn btn--primary">
        Back to home
      </Link>
    </SiteShell>
  );
}
