import { SgaLogo } from "@/components/SgaLogo";

export function SgaCornerBrand() {
  return (
    <aside className="brand-corner" aria-hidden="true">
      <span className="brand-corner__stripe" />
      <SgaLogo variant="vertical" size="corner" />
    </aside>
  );
}
