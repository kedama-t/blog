import { ReactNode } from 'react';

export default function GridWithHeader(props: {
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="my-4 border-b border-primary text-left text-2xl font-bold text-on-primary-50">
        {props.header}
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {props.children}
      </div>
    </section>
  );
}
