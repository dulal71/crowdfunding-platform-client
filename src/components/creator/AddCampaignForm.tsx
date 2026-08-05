"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import uploadToImgBB from "@/app/lib/service/ImageUpload";
import {
  buildCampaignPayload,
  campaignCategories,
  initialCampaignForm,
  validateCampaignForm,
  type CampaignErrors,
  type CampaignFormValues,
} from "@/components/creator/campaignForm";

const fieldClasses =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none ring-0 focus:border-cyan-500";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-sm text-rose-500">{message}</p> : null;
}

export function AddCampaignForm() {
  const [form, setForm] = useState<CampaignFormValues>(initialCampaignForm);
  const [errors, setErrors] = useState<CampaignErrors>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const updateField = (field: keyof CampaignFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setSelectedFileName(file.name);
    setErrors((prev) => ({ ...prev, campaign_image_url: undefined }));

    try {
      const url = await uploadToImgBB(file);
      setForm((prev) => ({ ...prev, campaign_image_url: url }));
      toast.success("Campaign image uploaded successfully.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed.";
      setErrors((prev) => ({ ...prev, campaign_image_url: errorMessage }));
      setSelectedFileName("");
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateCampaignForm(form, Boolean(selectedFileName));
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const payload = buildCampaignPayload(form);

    setLoading(true);

    try {
      // Replace with the backend API call once available.
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log("New campaign payload:", payload);

      toast.success("Campaign submitted for review. It will go live after admin approval.");
      setForm(initialCampaignForm);
      setSelectedFileName("");
      setErrors({});
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Creator</p>
      <h1 className="mt-3 text-2xl font-semibold text-zinc-900">Add New Campaign</h1>
      <p className="mt-3 text-zinc-600">
        Fill in the details below to launch a new fundraising campaign. Campaigns go live only after
        admin approval.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700">Campaign title</label>
            <input
              value={form.campaign_title}
              onChange={(event) => updateField("campaign_title", event.target.value)}
              className={fieldClasses}
              placeholder="Help us build a solar-powered water pump"
            />
            <FieldError message={errors.campaign_title} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700">Campaign story</label>
            <textarea
              value={form.campaign_story}
              onChange={(event) => updateField("campaign_story", event.target.value)}
              rows={6}
              className={fieldClasses}
              placeholder="Tell supporters why this campaign matters and what you plan to do..."
            />
            <FieldError message={errors.campaign_story} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Category</label>
            <select
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              className={fieldClasses}
            >
              <option value="">Select a category</option>
              {campaignCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.category} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Deadline</label>
            <input
              type="date"
              value={form.deadline}
              onChange={(event) => updateField("deadline", event.target.value)}
              className={fieldClasses}
            />
            <FieldError message={errors.deadline} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Funding goal (credits)</label>
            <input
              type="number"
              min="0"
              value={form.funding_goal}
              onChange={(event) => updateField("funding_goal", event.target.value)}
              className={fieldClasses}
              placeholder="e.g. 10000"
            />
            <FieldError message={errors.funding_goal} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Minimum contribution (credits)
            </label>
            <input
              type="number"
              min="0"
              value={form.minimum_Contribution}
              onChange={(event) => updateField("minimum_Contribution", event.target.value)}
              className={fieldClasses}
              placeholder="e.g. 5"
            />
            <FieldError message={errors.minimum_Contribution} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700">Reward info</label>
            <textarea
              value={form.reward_info}
              onChange={(event) => updateField("reward_info", event.target.value)}
              rows={3}
              className={fieldClasses}
              placeholder="What do supporters receive for pledging? e.g. early access, merch, shoutouts..."
            />
            <FieldError message={errors.reward_info} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700">Campaign image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={fieldClasses}
            />
            {selectedFileName ? (
              <p className="mt-2 text-sm text-zinc-600">Selected file: {selectedFileName}</p>
            ) : null}
            {uploading ? <p className="mt-2 text-sm text-cyan-600">Uploading image...</p> : null}
            {form.campaign_image_url ? (
              <Image
                src={form.campaign_image_url}
                alt="Campaign cover preview"
                width={1200}
                height={400}
                className="mt-3 h-40 w-full rounded-xl border border-zinc-200 object-cover"
              />
            ) : null}
            <FieldError message={errors.campaign_image_url} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-100 pt-6">
          <p className="text-sm text-zinc-500">
            Campaigns are saved with a <span className="font-medium text-amber-600">pending</span> status
            until approved by an admin.
          </p>
          <button
            type="submit"
            disabled={loading || uploading}
            className="rounded-lg bg-cyan-500 px-6 py-2.5 font-medium text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : uploading ? "Uploading image..." : "Add Campaign"}
          </button>
        </div>
      </form>
    </section>
  );
}
