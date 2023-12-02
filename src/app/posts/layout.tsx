import BreadCrumbs from '@/components/BreadCrumbs';
import Script from 'next/script';

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
