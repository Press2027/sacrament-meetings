
import Link from 'next/link';
import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/meetings"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Back to meetings
        </Link>

        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Create Sacrament Meeting
        </h2>

        <p className="mt-2 text-gray-600">
          Enter the details below to schedule a sacrament meeting.
        </p>
      </div>

      <MeetingForm
        action={createMeeting}
        submitLabel="Create Meeting"
      />
    </div>
  );
}
