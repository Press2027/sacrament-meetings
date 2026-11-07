
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const response = await fetch(
    `${baseUrl}/api/meetings/${meetingId}`,
    { cache: 'no-store' }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error('Failed to retrieve meeting details.');
  }

  const meeting: SacramentMeeting = await response.json();

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      <Link
        href="/meetings"
        className="inline-block text-blue-700 hover:underline"
      >
        ← Back to Meetings
      </Link>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}
