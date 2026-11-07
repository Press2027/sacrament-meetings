
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-700">
            Welcome to your ward
          </p>

          <h1 className="text-4xl font-bold leading-tight text-blue-950 md:text-5xl">
            Sacrament Meeting Planner
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Organize sacrament meetings, manage agendas, coordinate speakers,
            and keep important meeting details in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              View All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-lg border border-blue-800 px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Current Sunday
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/meeting-illustration.svg"
            alt="Illustration of a chapel and congregation gathered for a meeting"
            width={900}
            height={600}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-950">
            Meeting Agendas
          </h2>
          <p className="mt-3 text-gray-600">
            View opening and closing hymns, prayers, speakers, and meeting
            activities.
          </p>
        </article>

        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-950">
            Meeting Schedule
          </h2>
          <p className="mt-3 text-gray-600">
            Browse scheduled meetings and find the most recent Sunday meeting.
          </p>
        </article>

        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-blue-950">
            Meeting Details
          </h2>
          <p className="mt-3 text-gray-600">
            Access information about presiding leaders, conducting leaders,
            and speakers.
          </p>
        </article>
      </section>
    </main>
  );
}
