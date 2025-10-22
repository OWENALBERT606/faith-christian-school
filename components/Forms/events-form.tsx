"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import type { Category, Event as EventModel } from "@prisma/client";

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

// 👉 adjust if your actions live elsewhere
import { createEvent, updateEvent } from "@/actions/events";

// --- Types for the form ---
type ScheduleItem = { time: string; activity: string };

const EVENT_STATUSES = ["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"] as const;
type EventStatusType = (typeof EVENT_STATUSES)[number];

export type EventFormData = {
  title: string;
  date: string;      // display label like "March 15, 2025"
  time: string;      // display label like "10:00 AM - 4:00 PM"
  location: string;
  address: string;
  attendees: number;
  categoryId: string;
  image: string;     // from ImageInput state
  description: string;
  longDescription: string;
  status: EventStatusType;
  // highlights & schedule are managed via local state and mapped on submit
};

type EventFormProps = {
  editingId?: string;
  initialData?: EventModel | null;
  categories: Category[]; // provide from parent
};

export default function EventForm({ editingId, initialData, categories }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ----- RHF setup -----
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: {
      title: initialData?.title ?? "",
      date: initialData?.date ?? "",
      time: initialData?.time ?? "",
      location: initialData?.location ?? "",
      address: initialData?.address ?? "",
      attendees: initialData?.attendees ?? 0,
      categoryId: initialData?.categoryId ?? (categories[0]?.id ?? ""),
      image: initialData?.image ?? "",
      description: initialData?.description ?? "",
      longDescription: initialData?.longDescription ?? "",
      status: (initialData?.status as EventStatusType) ?? "UPCOMING",
    },
  });

  // ----- Image state -----
  const [imageUrl, setImageUrl] = useState(initialData?.image || "/placeholder.svg");

  // ----- Highlights: one per line -----
  const [highlightsText, setHighlightsText] = useState(
    Array.isArray(initialData?.highlights) ? initialData!.highlights.join("\n") : ""
  );

  // ----- Schedule: dynamic rows {time, activity} -----
  const initialSchedule: ScheduleItem[] = useMemo(() => {
    const raw = (initialData as any)?.schedule as ScheduleItem[] | undefined;
    return Array.isArray(raw) && raw.length ? raw : [{ time: "", activity: "" }];
  }, [initialData]);

  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);

  const addScheduleRow = () => setSchedule((s) => [...s, { time: "", activity: "" }]);
  const removeScheduleRow = (idx: number) =>
    setSchedule((s) => (s.length > 1 ? s.filter((_, i) => i !== idx) : s));
  const updateScheduleRow = (idx: number, field: keyof ScheduleItem, value: string) =>
    setSchedule((s) => s.map((row, i) => (i === idx ? { ...row, [field]: value } : row)));

  // ensure RHF tracks the image field (if you need it)
  useEffect(() => {
    setValue("image", imageUrl, { shouldValidate: false });
  }, [imageUrl, setValue]);

  // ----- Submit -----
  async function onSubmit(data: EventFormData) {
    try {
      setLoading(true);

      const highlights = highlightsText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const scheduleClean = schedule
        .map((r) => ({ time: r.time.trim(), activity: r.activity.trim() }))
        .filter((r) => r.time || r.activity);

      const payload = {
        title: data.title.trim(),
        date: data.date.trim(),
        time: data.time.trim(),
        location: data.location.trim(),
        address: data.address.trim(),
        attendees: Number.isFinite(data.attendees) ? data.attendees : 0,
        categoryId: data.categoryId,
        image: imageUrl,
        description: data.description.trim(),
        longDescription: data.longDescription.trim(),
        highlights,
        schedule: scheduleClean,
        status: data.status,
      };

      if (editingId) {
        await updateEvent(editingId, payload);
        toast.success("Event updated successfully!");
      } else {
        await createEvent(payload);
        toast.success("Event created successfully!");
      }

      reset();
      setImageUrl("/placeholder.svg");
      setHighlightsText("");
      setSchedule([{ time: "", activity: "" }]);

      router.push("/dashboard/events");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/dashboard/events"
        parent=""
        title={editingId ? "Edit Event" : "New Event"}
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        {/* Left column */}
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Fill in the event information below.</CardDescription>
            </CardHeader>

            <CardContent>
              {/* Basic fields */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Title"
                  name="title"
                  placeholder="Community Health Fair"
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

                <TextInput
                  register={register}
                  errors={errors}
                  label="Date (label)"
                  name="date"
                  placeholder="March 15, 2025"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Time (label)"
                  name="time"
                  placeholder="10:00 AM - 4:00 PM"
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="Location (venue)"
                  name="location"
                  placeholder="Central Park Community Center"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Address"
                  name="address"
                  placeholder="456 Park Avenue, City, State 12345"
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="Attendees (expected)"
                  name="attendees"
                  type="number"
                  placeholder="250"
                />

                {/* Status select */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <select
                    {...register("status", { required: true })}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    defaultValue={(initialData?.status as EventStatusType) ?? "UPCOMING"}
                  >
                    {EVENT_STATUSES.map((s) => (
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

              {/* Highlights */}
              <div className="mt-6 grid grid-cols-1 gap-2">
                <label className="text-sm font-medium text-foreground">Highlights (one per line)</label>
                <textarea
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="min-h-[120px] w-full rounded-md border bg-background p-3 text-sm"
                  placeholder={`Free health screenings and consultations
Wellness workshops and seminars
Mental health resources
Nutrition and fitness guidance
Children's health activities
Free healthy meals`}
                />
                <p className="text-xs text-muted-foreground">
                  Each line will be saved as a separate highlight.
                </p>
              </div>

              {/* Schedule */}
              <div className="mt-6">
                <div className="mb-2 text-sm font-medium text-foreground">Schedule</div>
                <div className="space-y-3">
                  {schedule.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-1 gap-3 md:grid-cols-12">
                      <input
                        value={row.time}
                        onChange={(e) => updateScheduleRow(idx, "time", e.target.value)}
                        className="md:col-span-4 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        placeholder="10:00 AM"
                      />
                      <input
                        value={row.activity}
                        onChange={(e) => updateScheduleRow(idx, "activity", e.target.value)}
                        className="md:col-span-7 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        placeholder="Registration & Health Screenings"
                      />
                      <button
                        type="button"
                        onClick={() => removeScheduleRow(idx)}
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
                  onClick={addScheduleRow}
                  className="mt-3 rounded-md border px-3 py-2 text-sm hover:bg-muted"
                >
                  + Add Row
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="col-span-full lg:col-span-4">
          <div className="grid auto-rows-max items-start gap-4">
            <ImageInput
              title="Event Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="eventImage" // 👈 match your UploadThing endpoint
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/dashboard/events"
        editingId={editingId}
        loading={loading}
        title="Event"
        parent=""
      />
    </form>
  );
}
