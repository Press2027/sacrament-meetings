
import MeetingCard from '@/components/MeetingCard';


export default async function MeetingsPage() {
  // Retrieve meetings through the collection API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(
    `${baseUrl || 'http://localhost:3000'}/api/meetings`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch meetings.');
  }

  const meetings = await response.json();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">
          Sacrament Meetings
        </h1>

        <p className="mt-2 text-gray-600">
          View and organize your ward sacrament meetings.
        </p>
      </header>

      {meetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting: import('@/lib/types').SacramentMeeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-white p-6 text-gray-600">
          No sacrament meetings have been scheduled.
        </p>
      )}
    </div>
  );
}
