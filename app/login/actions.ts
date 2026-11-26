"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export interface LoginState {
  error?: string;
}

export async function authenticate(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const requestedCallback = String(formData.get("callbackUrl") ?? "/meetings/new");

  const callbackUrl =
    requestedCallback.startsWith("/") &&
    !requestedCallback.startsWith("//")
      ? requestedCallback
      : "/meetings/new";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password. Please try again." };
    }

    throw error;
  }

  return {};
}
