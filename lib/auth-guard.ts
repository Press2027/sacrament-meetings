import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireBishopric() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}
