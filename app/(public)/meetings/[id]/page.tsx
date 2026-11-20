import { Suspense } from 'react';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

async function MeetingContent({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      <Link
        href="/meetings"
        className="inline-block text-blue-700 hover:underline"
      >
        ? Back to meetings
      </Link>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl p-8" role="status">
          Loading meeting details...
        </div>
      }
    >
      <MeetingContent params={params} />
    </Suspense>
  );
}
