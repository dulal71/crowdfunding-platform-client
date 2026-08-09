"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";
import uploadToImgBB from "@/app/lib/service/ImageUpload";

const roleOptions = [
  { label: "Supporter", value: "supporter" },
  { label: "Creator", value: "creator" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    image:'',
    password: "",
    role: "supporter" as "supporter" | "creator",
   
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const router = useRouter();

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

 const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setUploading(true);
  setSelectedFileName(file.name);
  setErrors((prev) => ({ ...prev, image: "" }));
  setMessage("");

  try {
    const url = await uploadToImgBB(file);
    setForm((prev) => ({ ...prev, image: url }));
    setMessage("Profile image uploaded successfully.");
    toast.success("Profile image uploaded successfully.");
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Upload failed.";
    setErrors((prev) => ({
      ...prev,
      image: errorMessage,
    }));
    setSelectedFileName("");
    toast.error(errorMessage);
  } finally {
    setUploading(false);
  }
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
        image: form.image,
        callbackURL: "/",
        fetchOptions: {
          body: {
            role: form.role,
            credits: form.role === "creator" ? 20 : 50,

          },
        },
      });

      if (error) {
        const errorMessage = error.message || "Registration failed.";
        setErrors({ form: errorMessage });
        toast.error(errorMessage);
        setLoading(false);
        return;
      }

      const successMessage = `Registration successful. ${data?.user?.role === "creator" ? "Creator" : "Supporter"} account created with ${data?.user?.credits ?? (form.role === "creator" ? 20 : 50)} credits.`;
      setMessage(successMessage);
      toast.success(successMessage);
      setForm({ name: "", email: "", password: "", role: "supporter", profilePictureUrl: "" });
      setSelectedFileName("");
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
    <main className="flex min-h-screen items-center justify-center px-4 py-10 text-zinc-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/80 p-6 shadow-2xl backdrop-blur"
      >
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Create account</p>
          <h1 className="mt-2 text-2xl font-semibold text-black">Register for the platform</h1>
          <p className="mt-2 text-sm text-zinc-700">
            Supporters receive 50 credits and creators receive 20 credits on registration.
          </p>
        </div>

        {errors.form ? <p className="mb-4 text-sm text-rose-500">{errors.form}</p> : null}
        {message ? <p className="mb-4 text-sm text-emerald-600">{message}</p> : null}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Name</label>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none ring-0"
              placeholder="Enter your full name"
            />
            {errors.name ? <p className="mt-1 text-sm text-rose-500">{errors.name}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none ring-0"
              placeholder="you@example.com"
            />
            {errors.email ? <p className="mt-1 text-sm text-rose-500">{errors.email}</p> : null}
          </div>

          <div>
  <label className="mb-1 block text-sm font-medium text-zinc-700">Profile picture</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none ring-0"
  />
  {selectedFileName ? (
    <p className="mt-2 text-sm text-zinc-600">Selected file: {selectedFileName}</p>
  ) : null}
  {uploading ? <p className="mt-2 text-sm text-cyan-600">Uploading image...</p> : null}
  {errors.image ? <p className="mt-1 text-sm text-rose-500">{errors.image}</p> : null}
</div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none ring-0"
              placeholder="At least 8 characters"
            />
            {errors.password ? <p className="mt-1 text-sm text-rose-500">{errors.password}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Role</label>
            <select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value as "supporter" | "creator" })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none ring-0"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role ? <p className="mt-1 text-sm text-rose-500">{errors.role}</p> : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="mt-6 w-full rounded-lg bg-cyan-500 px-4 py-2 font-medium text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating account..." : uploading ? "Uploading image..." : "Register"}
        </button>
      </form>
    </main>
  );
}
