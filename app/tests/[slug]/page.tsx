import { notFound } from "next/navigation";
import { TestFlow } from "@/components/TestFlow";
import { TestPageShell } from "@/components/TestPageShell";
import { getTestBySlug } from "@/lib/tests";

type TestPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TestPage({ params }: TestPageProps) {
  const { slug } = await params;
  const test = getTestBySlug(slug);
  if (!test) notFound();

  return (
    <TestPageShell title={test.title}>
      <TestFlow test={test} />
    </TestPageShell>
  );
}
