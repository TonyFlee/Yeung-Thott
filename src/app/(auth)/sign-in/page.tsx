import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Login - YEUNG THOTT",
  description: "Login to access the admin dashboard.",
};

interface LoginProps {
  searchParams: Promise<Message & { redirect?: string }>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;
  const redirectPath = "redirect" in message ? message.redirect : "/dashboard";

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background dark:bg-gray-900 px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card dark:bg-gray-800 p-6 shadow-sm">
          <form className="flex flex-col space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Admin Login
              </h1>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 dark:text-gray-200"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="info@example.com"
                  required
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900 dark:text-gray-200"
                  >
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input type="hidden" name="redirect" value={redirectPath} />
              </div>
            </div>

            <SubmitButton
              className="w-full bg-cyan-400 hover:bg-blue-200 text-white"
              pendingText="Signing in..."
              formAction={signInAction}
            >
              Sign in
            </SubmitButton>

            <FormMessage message={message} />
          </form>
        </div>
      </div>
    </>
  );
}
