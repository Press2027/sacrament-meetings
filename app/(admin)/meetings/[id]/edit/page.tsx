import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

async function EditMeetingContent({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const updateAction = updateMeeting.bind(null, meetingId);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <Link
          href={`/meetings/${meetingId}`}
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          Back to meeting details
        </Link>

        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Edit Sacrament Meeting
        </h1>

        <p className="mt-2 text-gray-600">
          Update the meeting information and save your changes.
        </p>
      </div>

      <MeetingForm
        action={updateAction}
        initialData={meeting}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl p-8" role="status">
          Loading meeting editor...
        </div>
      }
    >
      <EditMeetingContent params={params} />
    </Suspense>
  );
}
