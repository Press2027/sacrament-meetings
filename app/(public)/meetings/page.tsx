import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import {
  getMeetings,
  getMeetingsTotalPages,
} from '@/lib/meetings-db';

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query?.trim() ?? '';
  const requestedPage = Number(params.page ?? '1');

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

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

      <Suspense
        fallback={
          <div className="mb-6 h-24 animate-pulse rounded-lg bg-gray-100" />
        }
      >
        <MeetingSearch key={query} initialQuery={query} />
      </Suspense>

      <div>
        {meetings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-white p-6 text-gray-600">
            {query
              ? `No meetings found matching "${query}".`
              : 'No sacrament meetings have been scheduled.'}
          </p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        query={query}
      />
    </div>
  );
}
