
import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        Meeting Not Found
      </h2>

      <p className="mt-3 text-gray-600">
        The meeting you are trying to edit does not exist or may have been deleted.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
      >
        Return to Meetings
      </Link>
    </div>
  );
}
