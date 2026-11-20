
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-white p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        Something went wrong
      </h2>

      <p className="mt-3 text-gray-600">
        We could not load the meetings. Please try again.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
        >
          Return to Meetings
        </Link>
      </div>
    </div>
  );
}
