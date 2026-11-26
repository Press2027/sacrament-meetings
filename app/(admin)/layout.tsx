import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export const instant = false;

export const metadata: Metadata = {
  title: "Meeting Administration",
  description: "Secure administration of sacrament meeting schedules.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 py-8">
      <header className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Meeting Administration
          </h1>
          <p className="mt-2 text-gray-600">
            Signed in as {session.user.email}
          </p>
          <Link
            href="/meetings"
            className="mt-3 inline-block text-blue-700 hover:underline"
          >
            Return to public meetings
          </Link>
        </div>

        <SignOutButton />
      </header>

      {children}
    </section>
  );
}
