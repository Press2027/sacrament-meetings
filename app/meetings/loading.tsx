
export default function MeetingsLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="space-y-6"
    >
      <p className="font-medium text-blue-800">
        Loading sacrament meetings...
      </p>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-xl border border-gray-200 bg-white p-6"
        >
          <div className="mb-4 h-4 w-32 rounded bg-gray-200" />
          <div className="mb-4 h-7 w-2/3 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      ))}

      <span className="sr-only">
        Please wait while meetings are loading.
      </span>
    </div>
  );
}
