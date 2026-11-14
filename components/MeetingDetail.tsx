
import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const speakers = meeting.speakers.filter(
    (item) => item.type === 'speaker'
  );

  const musicalNumbers = meeting.speakers.filter(
    (item) => item.type === 'musical-number'
  );

  return (
    <article className="mx-auto max-w-4xl space-y-8">

      {/* Meeting Header */}
      <header className="rounded-xl bg-blue-900 p-8 text-white shadow-md">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
          {meeting.meetingType} meeting
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Sacrament Meeting Agenda
        </h1>

        <p className="mt-3 text-blue-100">
          {formattedDate}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-blue-200">Presiding</p>
            <p className="font-semibold">{meeting.presiding}</p>
          </div>

          <div>
            <p className="text-sm text-blue-200">Conducting</p>
            <p className="font-semibold">{meeting.conducting}</p>
          </div>
        </div>
      </header>

      {/* Announcements */}
      {meeting.announcements &&
        meeting.announcements.length > 0 && (
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="mb-3 text-xl font-bold text-blue-900">
              Announcements
            </h2>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}

      {/* Opening Hymn */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Opening Hymn
        </h2>

        <p className="mt-3 text-gray-700">
          Hymn #{meeting.openingHymn.number} –{' '}
          {meeting.openingHymn.title}
        </p>
      </section>

      {/* Opening Prayer */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Opening Prayer
        </h2>

        <p className="mt-3 text-gray-700">
          {meeting.openingPrayer}
        </p>
      </section>

      {/* Ward Business */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Ward Business
        </h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-gray-500">
            No ward business recorded.
          </p>
        )}

        <p className="mt-4 font-medium text-gray-700">
          Stake Business: {meeting.stakeBusiness ? 'Yes' : 'No'}
        </p>
      </section>

      {/* Sacrament Hymn */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Sacrament Hymn
        </h2>

        <p className="mt-3 text-gray-700">
          Hymn #{meeting.sacramentHymn.number} –{' '}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      {/* Speakers */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Speakers
        </h2>

        {speakers.length > 0 ? (
          <div className="mt-4 space-y-4">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-700 pl-4"
              >
                <h3 className="font-semibold text-gray-900">
                  {speaker.name}
                </h3>

                <p className="text-gray-600">
                  Topic: {speaker.topic}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-500">
            No speakers recorded.
          </p>
        )}
      </section>

      {/* Musical Numbers */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Musical Numbers
        </h2>

        {musicalNumbers.length > 0 ? (
          <div className="mt-4 space-y-3">
            {musicalNumbers.map((item, index) => (
              <div key={index}>
                <p className="font-semibold text-gray-900">
                  {item.name}
                </p>

                <p className="text-gray-600">
                  {item.topic}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-500">
            No musical numbers recorded.
          </p>
        )}
      </section>

      {/* Closing Hymn */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Closing Hymn
        </h2>

        <p className="mt-3 text-gray-700">
          Hymn #{meeting.closingHymn.number} –{' '}
          {meeting.closingHymn.title}
        </p>
      </section>

      {/* Closing Prayer */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Closing Prayer
        </h2>

        <p className="mt-3 text-gray-700">
          {meeting.closingPrayer}
        </p>
      </section>

    </article>
  );
}
