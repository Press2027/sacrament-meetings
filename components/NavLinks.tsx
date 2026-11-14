
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/meetings/current', label: 'Current Meeting' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="bg-blue-800">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 py-3">
        {links.map((link) => {
          let isActive = false;

          if (link.href === '/') {
            isActive = pathname === '/';
          } else if (link.href === '/meetings') {
            isActive =
              pathname === '/meetings' ||
              (pathname.startsWith('/meetings/') &&
                pathname !== '/meetings/current');
          } else {
            isActive = pathname === link.href;
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-blue-900'
                  : 'text-white hover:bg-blue-700'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
