import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function pageUrl(page: number) {
    const params = new URLSearchParams();

    if (query) {
      params.set('query', query);
    }

    params.set('page', String(page));

    return `/meetings?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Meetings pagination"
      className="mt-8 flex flex-wrap items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={pageUrl(currentPage - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400"
        >
          Previous
        </span>
      )}

      <span className="text-sm text-gray-700" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={pageUrl(currentPage + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Next
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400"
        >
          Next
        </span>
      )}
    </nav>
  );
}
