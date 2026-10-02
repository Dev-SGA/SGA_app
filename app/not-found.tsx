import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell title="Page not found" meta="The test or URL you requested does not exist.">
      <Link href="/" className="btn btn--primary">
        Back to tests
      </Link>
    </SiteShell>
  );
}
