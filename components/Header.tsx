
import { Suspense } from 'react';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <>
      <header className="bg-blue-900 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Sacrament Meeting Planner
            </h1>
            <p className="mt-1 text-sm text-blue-200">
              Organizing worship and strengthening faith
            </p>
          </div>

          <div className="text-sm text-blue-100">
            <p className="font-medium">Your Ward</p>
            <p className="text-blue-200">
              Meeting planning and coordination
            </p>
          </div>
        </div>
      </header>

      <Suspense
        fallback={
          <nav
            aria-label="Main navigation"
            className="min-h-12 bg-blue-800"
          />
        }
      >
        <NavLinks />
      </Suspense>
    </>
  );
}
