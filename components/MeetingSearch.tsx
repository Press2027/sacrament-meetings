'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface MeetingSearchProps {
  initialQuery: string;
}

export default function MeetingSearch({
  initialQuery,
}: MeetingSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term.trim()) {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }

    params.set('page', '1');

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-6">
      <label
        htmlFor="meeting-search"
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        Search meetings
      </label>

      <input
        id="meeting-search"
        type="search"
        aria-label="Search meetings by speaker, presiding, conducting, or meeting type"
        placeholder="Search by speaker, presiding, conducting, or meeting type..."
        defaultValue={initialQuery}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
      />
      <p className="mt-2 text-sm text-gray-500">
        Results update as you type.
      </p>
    </div>
  );
}

