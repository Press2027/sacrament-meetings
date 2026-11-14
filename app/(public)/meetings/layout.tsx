import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 py-8">
      <nav
        aria-label="Meetings navigation"
        className="mb-8 flex flex-wrap gap-4 border-b border-gray-200 pb-4"
      >
        <Link
          href="/meetings"
          className="font-medium text-blue-800 hover:text-blue-600"
        >
          All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="font-medium text-blue-800 hover:text-blue-600"
        >
          Current Sunday
        </Link>
      </nav>
      {children}
    </section>
  );
}
