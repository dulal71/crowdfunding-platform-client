"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const { data, error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: "http://localhost:3000/dashboard",
      });

      if (error) {
        setErrors({ form: error.message || "Login failed." });
        setLoading(false);
        return;
      }

      setMessage("Login successful. Redirecting to your dashboard...");
      setForm({ email: "", password: "" });
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10 text-zinc-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"
      >
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Welcome back</p>
          <h1 className="mt-2 text-2xl font-semibold">Sign in to your account</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Access your dashboard, campaigns, and credits securely.
          </p>
        </div>

        {errors.form ? <p className="mb-4 text-sm text-rose-400">{errors.form}</p> : null}
        {message ? <p className="mb-4 text-sm text-emerald-400">{message}</p> : null}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Email</label>
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
            <label className="mb-1 block text-sm text-zinc-300">Password</label>
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
          className="mt-6 w-full rounded-lg bg-cyan-500 px-4 py-2 font-medium text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
