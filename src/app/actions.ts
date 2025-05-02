"use server";

import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();
  const headerList = await headers();
  const origin = headerList.get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        email: email,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  if (user) {
    try {
      const { error: updateError } = await supabase.from("users").insert({
        id: user.id,
        name: fullName,
        full_name: fullName,
        email: email,
        user_id: user.id,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
      });

      if (updateError) {
        console.error("Error updating user profile:", updateError);
      }
    } catch (err) {
      console.error("Error in user profile creation:", err);
    }
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link."
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirect") as string) || "/dashboard";
  const supabase = await createClient();

  if (email === "yeungthott@gmail.com" && password === "@YeungThott@66") {
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking for existing admin:", checkError);
      }

      if (!existingUser) {
        const { data: newUser, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: "YEUNG THOTT Admin",
                role: "admin",
              },
            },
          });

        if (!signUpError && newUser?.user) {
          const { error: insertError } = await supabase.from("users").insert({
            id: newUser.user.id,
            email: email,
            role: "admin",
            full_name: "YEUNG THOTT Admin",
            created_at: new Date().toISOString(),
          });

          if (insertError) {
            console.error("Error creating admin in users table:", insertError);
          }
        }
      }

      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        return encodedRedirect("error", "/sign-in", signInError.message);
      }

      return redirect(redirectTo);
    } catch (err) {
      return encodedRedirect(
        "error",
        "/sign-in",
        "An unexpected error occurred. Please try again."
      );
    }
  } else {
    return encodedRedirect(
      "error",
      "/sign-in",
      "Invalid credentials. Only admin access is allowed."
    );
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const headerList = await headers();
  const origin = headerList.get("origin");
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed"
    );
  }

  return encodedRedirect(
    "success",
    "/protected/reset-password",
    "Password updated"
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
