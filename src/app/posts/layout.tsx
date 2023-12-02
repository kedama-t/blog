import BreadCrumbs from '@/components/BreadCrumbs';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl">
      <BreadCrumbs />
      {children}
    </section>
  );
}
