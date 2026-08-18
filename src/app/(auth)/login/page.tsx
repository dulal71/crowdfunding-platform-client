"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: "/",
      });

      if (error) {
        const errorMessage = error.message || "Login failed.";
        setErrors({ form: errorMessage });
        toast.error(errorMessage);
        setLoading(false);
        return;
      }

      const successMessage = "Login successful. Redirecting to the home page...";
      setMessage(successMessage);
      toast.success(successMessage);
      setForm({ email: "", password: "" });
      router.replace("/");
    } catch {
      const errorMessage = "Something went wrong. Please try again.";
      setErrors({ form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"
      >
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Welcome back</p>
          <h1 className="mt-2 text-2xl font-semibold text-primary">Sign in to your account</h1>
          <p className="mt-2 text-sm text-zinc-700">
            Access your dashboard, campaigns, and credits securely.
          </p>
        </div>

        {errors.form ? <p className="mb-4 text-sm text-rose-400">{errors.form}</p> : null}
        {message ? <p className="mb-4 text-sm text-emerald-400">{message}</p> : null}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-md text-primary-light">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none ring-0"
              placeholder="you@example.com"
            />
            {errors.email ? <p className="mt-1 text-sm text-rose-400">{errors.email}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-md text-primary-light">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none ring-0"
              placeholder="Enter your password"
            />
            {errors.password ? <p className="mt-1 text-sm text-rose-400">{errors.password}</p> : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
