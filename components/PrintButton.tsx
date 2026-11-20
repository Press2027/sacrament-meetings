'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 print:hidden"
    >
      Print / Download PDF
    </button>
  );
}
