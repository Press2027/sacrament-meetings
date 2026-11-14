import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 py-8">
      <header className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">
          Meeting Administration
        </h1>
        <p className="mt-2 text-gray-600">
          Leader-facing meeting management.
        </p>
        <Link
          href="/meetings"
          className="mt-3 inline-block text-blue-700 hover:underline"
        >
          Return to public meetings
        </Link>
      </header>
      {children}
    </section>
  );
}
