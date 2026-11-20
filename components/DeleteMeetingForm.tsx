
'use client';

import { useFormStatus } from 'react-dom';
import { deleteMeeting } from '@/lib/actions';

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Deleting...' : 'Delete Meeting'}
    </button>
  );
}

export default function DeleteMeetingForm({
  meetingId,
}: {
  meetingId: number;
}) {
  const deleteAction = deleteMeeting.bind(null, meetingId);

  return (
    <form
      action={deleteAction}
      onSubmit={(event) => {
        if (!window.confirm('Are you sure you want to delete this meeting? This action cannot be undone.')) {
          event.preventDefault();
        }
      }}
    >
      <DeleteButton />
    </form>
  );
}
