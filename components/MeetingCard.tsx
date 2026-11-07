
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            {meeting.meetingType} meeting
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900">
            {formattedDate}
          </h2>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Presiding:</span>{' '}
              {meeting.presiding}
            </p>

            <p>
              <span className="font-semibold text-gray-800">Conducting:</span>{' '}
              {meeting.conducting}
            </p>

            <p>
              <span className="font-semibold text-gray-800">Speakers:</span>{' '}
              {meeting.speakers.length}
            </p>
          </div>
        </div>

        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
