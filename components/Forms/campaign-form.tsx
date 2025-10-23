// components/forms/CampaignForm.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import type { Category, Campaign as CampaignModel } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import FormFooter from "./FormFooter";

// 👉 adjust import path if your actions live elsewhere
import { createCampaign, updateCampaign } from "@/actions/campaigns";

/* ── Types ─────────────────────────────────────────────────────────────── */
const CAMPAIGN_STATUSES = ["ACTIVE", "COMPLETED", "CANCELLED", "PAUSED"] as const;
type CampaignStatusType = (typeof CAMPAIGN_STATUSES)[number];

type UpdateItem = { date: string; title: string; content: string };

export type CampaignFormData = {
  title: string;
  categoryId: string;
  image: string; // from ImageInput state
  description: string;
  longDescription: string;

  goal: number;
  raised: number;
  supporters: number;
  daysLeft: number;

  startDate: string; // display label like "January 15, 2025"
  endDate: string;   // display label like "April 30, 2025"

  status: CampaignStatusType;
};

type CampaignFormProps = {
  editingId?: string;
  initialData?: CampaignModel | null; // you can pass the relation separately if needed
  categories: Category[];             // provided by parent (server) component
};

export default function CampaignForm({ editingId, initialData, categories }: CampaignFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  /* ── RHF setup ───────────────────────────────────────────────────────── */
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CampaignFormData>({
    defaultValues: {
      title: initialData?.title ?? "",
      categoryId: initialData?.categoryId ?? (categories[0]?.id ?? ""),

      image: initialData?.image ?? "",
      description: initialData?.description ?? "",
      longDescription: initialData?.longDescription ?? "",

      goal: (initialData?.goal as number) ?? 0,
      raised: (initialData?.raised as number) ?? 0,
      supporters: (initialData?.supporters as number) ?? 0,
      daysLeft: (initialData?.daysLeft as number) ?? 0,

      startDate: initialData?.startDate ?? "",
      endDate: initialData?.endDate ?? "",

      status: (initialData?.status as CampaignStatusType) ?? "ACTIVE",
    },
  });

  /* ── Image state ─────────────────────────────────────────────────────── */
  const [imageUrl, setImageUrl] = useState(initialData?.image || "/placeholder.svg");
  useEffect(() => {
    setValue("image", imageUrl, { shouldValidate: false });
  }, [imageUrl, setValue]);

  /* ── Impact: one per line ────────────────────────────────────────────── */
  const [impactText, setImpactText] = useState(
    Array.isArray((initialData as any)?.impact)
      ? ((initialData as any).impact as string[]).join("\n")
      : ""
  );

  /* ── Updates: dynamic rows { date, title, content } ──────────────────── */
  const initialUpdates: UpdateItem[] = useMemo(() => {
    const raw = (initialData as any)?.updates as UpdateItem[] | undefined;
    return Array.isArray(raw) && raw.length
      ? raw.map((u) => ({ date: u.date ?? "", title: u.title ?? "", content: u.content ?? "" }))
      : [{ date: "", title: "", content: "" }];
  }, [initialData]);

  const [updates, setUpdates] = useState<UpdateItem[]>(initialUpdates);

  const addUpdateRow = () => setUpdates((s) => [...s, { date: "", title: "", content: "" }]);
  const removeUpdateRow = (idx: number) =>
    setUpdates((s) => (s.length > 1 ? s.filter((_, i) => i !== idx) : s));
  const updateUpdateRow = (idx: number, field: keyof UpdateItem, value: string) =>
    setUpdates((s) => s.map((row, i) => (i === idx ? { ...row, [field]: value } : row)));

  /* ── Submit ──────────────────────────────────────────────────────────── */
  async function onSubmit(data: CampaignFormData) {
    try {
      setLoading(true);

      const impact = impactText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const updatesClean = updates
        .map((u) => ({
          date: (u.date || "").trim(),
          title: (u.title || "").trim(),
          content: (u.content || "").trim(),
        }))
        .filter((u) => u.date || u.title || u.content);

      // numbers can arrive as strings through wrappers; normalize
      const goal = Number(data.goal);
      const raised = Number(data.raised);
      const supporters = Number(data.supporters);
      const daysLeft = Number(data.daysLeft);

      const payload = {
        title: data.title.trim(),
        categoryId: data.categoryId,
        image: imageUrl,
        description: data.description.trim(),
        longDescription: data.longDescription.trim(),
        goal: Number.isFinite(goal) ? goal : 0,
        raised: Number.isFinite(raised) ? raised : 0,
        supporters: Number.isFinite(supporters) ? supporters : 0,
        daysLeft: Number.isFinite(daysLeft) ? daysLeft : 0,
        startDate: data.startDate.trim(),
        endDate: data.endDate.trim(),
        impact,
        updates: updatesClean,
        status: data.status,
      };

      if (editingId) {
        await updateCampaign(editingId, payload);
        toast.success("Campaign updated successfully!");
      } else {
        await createCampaign(payload);
        toast.success("Campaign created successfully!");
      }

      reset();
      setImageUrl("/placeholder.svg");
      setImpactText("");
      setUpdates([{ date: "", title: "", content: "" }]);
      router.push("/dashboard/campaigns");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ── UI ──────────────────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/dashboard/campaigns"
        parent=""
        title={editingId ? "Edit Campaign" : "New Campaign"}
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        {/* Left column */}
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>Fill in the campaign information below.</CardDescription>
            </CardHeader>

            <CardContent>
              {/* Basic fields */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Title"
                  name="title"
                  placeholder="Clean Water for Rural Communities"
                />

                {/* Category select */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select
                    {...register("categoryId", { required: true })}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    defaultValue={initialData?.categoryId ?? categories[0]?.id ?? ""}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Money + counters */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Goal (USD)"
                  name="goal"
                  type="number"
                  placeholder="100000"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Raised (USD)"
                  name="raised"
                  type="number"
                  placeholder="67500"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Supporters"
                  name="supporters"
                  type="number"
                  placeholder="1250"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Days Left"
                  name="daysLeft"
                  type="number"
                  placeholder="45"
                />

                {/* Dates (labels) */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Start Date (label)"
                  name="startDate"
                  placeholder="January 15, 2025"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="End Date (label)"
                  name="endDate"
                  placeholder="April 30, 2025"
                />

                {/* Status select */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <select
                    {...register("status", { required: true })}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    defaultValue={(initialData?.status as CampaignStatusType) ?? "ACTIVE"}
                  >
                    {CAMPAIGN_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div className="mt-6 grid grid-cols-1 gap-6">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Short Description"
                  name="description"
                />

                <TextArea
                  register={register}
                  errors={errors}
                  label="Long Description"
                  name="longDescription"
                
                />
              </div>

              {/* Impact */}
              <div className="mt-6 grid grid-cols-1 gap-2">
                <label className="text-sm font-medium text-foreground">Impact (one per line)</label>
                <textarea
                  value={impactText}
                  onChange={(e) => setImpactText(e.target.value)}
                  className="min-h-[120px] w-full rounded-md border bg-background p-3 text-sm"
                  placeholder={`50 villages will receive clean water access
25,000 people will benefit directly
80% reduction in waterborne diseases expected
15 local technicians trained for maintenance
Sustainable water management systems established`}
                />
                <p className="text-xs text-muted-foreground">
                  Each line will be saved as a separate impact item.
                </p>
              </div>

              {/* Updates */}
              <div className="mt-6">
                <div className="mb-2 text-sm font-medium text-foreground">Campaign Updates</div>
                <div className="space-y-4">
                  {updates.map((u, idx) => (
                    <div key={idx} className="grid grid-cols-1 gap-3 md:grid-cols-12">
                      <input
                        value={u.date}
                        onChange={(e) => updateUpdateRow(idx, "date", e.target.value)}
                        className="md:col-span-3 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        placeholder="March 1, 2025"
                      />
                      <input
                        value={u.title}
                        onChange={(e) => updateUpdateRow(idx, "title", e.target.value)}
                        className="md:col-span-4 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        placeholder="First 10 Wells Completed!"
                      />
                      <input
                        value={u.content}
                        onChange={(e) => updateUpdateRow(idx, "content", e.target.value)}
                        className="md:col-span-4 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        placeholder="Short update content..."
                      />
                      <button
                        type="button"
                        onClick={() => removeUpdateRow(idx)}
                        className="md:col-span-1 rounded-md border px-3 py-2 text-sm hover:bg-muted"
                        aria-label="Remove row"
                        title="Remove row"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addUpdateRow}
                  className="mt-3 rounded-md border px-3 py-2 text-sm hover:bg-muted"
                >
                  + Add Update
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="col-span-full lg:col-span-4">
          <div className="grid auto-rows-max items-start gap-4">
            <ImageInput
              title="Campaign Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="campaignImage" // 👈 ensure this matches your UploadThing endpoint
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/dashboard/campaigns"
        editingId={editingId}
        loading={loading}
        title="Campaign"
        parent=""
      />
    </form>
  );
}
