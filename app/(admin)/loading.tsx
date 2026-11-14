export default function AdminLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-4xl p-8"
    >
      <p className="animate-pulse text-gray-600">
        Loading meeting administration...
      </p>
    </div>
  );
}
