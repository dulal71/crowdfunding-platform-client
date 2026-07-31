"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

const roleOptions = [
  { label: "Supporter", value: "supporter" },
  { label: "Creator", value: "creator" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "supporter" as "supporter" | "creator",
    profilePictureUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }
    if (!form.role) nextErrors.role = "Please select a role.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.profilePictureUrl || undefined,
        callbackURL: "http://localhost:3000/dashboard",
        fetchOptions: {
          body: {
            role: form.role,
            credits: form.role === "creator" ? 20 : 50,
            profilePictureUrl: form.profilePictureUrl,
          },
        },
      });

      if (error) {
        setErrors({ form: error.message || "Registration failed." });
        setLoading(false);
        return;
      }

      setMessage(
        `Registration successful. ${data?.user?.role === "creator" ? "Creator" : "Supporter"} account created with ${data?.user?.credits ?? (form.role === "creator" ? 20 : 50)} credits.`
      );
      setForm({ name: "", email: "", password: "", role: "supporter", profilePictureUrl: "" });
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
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Create account</p>
          <h1 className="mt-2 text-2xl font-semibold">Register for the platform</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Supporters receive 50 credits and creators receive 20 credits on registration.
          </p>
        </div>

        {errors.form ? <p className="mb-4 text-sm text-rose-400">{errors.form}</p> : null}
        {message ? <p className="mb-4 text-sm text-emerald-400">{message}</p> : null}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Name</label>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none ring-0"
              placeholder="Enter your full name"
            />
            {errors.name ? <p className="mt-1 text-sm text-rose-400">{errors.name}</p> : null}
          </div>

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
            <label className="mb-1 block text-sm text-zinc-300">Profile Picture URL</label>
            <input
              value={form.profilePictureUrl}
              onChange={(event) => setForm({ ...form, profilePictureUrl: event.target.value })}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none ring-0"
              placeholder="https://example.com/avatar.png"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none ring-0"
              placeholder="At least 8 characters"
            />
            {errors.password ? <p className="mt-1 text-sm text-rose-400">{errors.password}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Role</label>
            <select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value as "supporter" | "creator" })}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none ring-0"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role ? <p className="mt-1 text-sm text-rose-400">{errors.role}</p> : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-cyan-500 px-4 py-2 font-medium text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </main>
  );
}
