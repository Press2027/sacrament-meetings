import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export const instant = false;

export const metadata: Metadata = {
  title: "Bishopric Login",
  description: "Secure sign-in for sacrament meeting administrators.",
  robots: {
    index: false,
    follow: false,
  },
};

function safeCallbackUrl(value?: string) {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  return "/meetings/new";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl);

  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-7 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Sacrament Meeting Planner
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            Bishopric Sign In
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to create, update, and manage meeting schedules.
          </p>
        </div>

        <LoginForm callbackUrl={callbackUrl} />
      </section>
    </main>
  );
}
