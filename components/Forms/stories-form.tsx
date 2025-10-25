// components/forms/StoryForm.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import type { Category, Story as StoryModel } from "@prisma/client";

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

import { createStory, updateStory } from "@/actions/stories";

/* ── Types ─────────────────────────────────────────────────────────────── */
export type StoryFormData = {
  title: string;
  slug?: string;
  categoryId: string;

  authorName: string;
  authorImage: string; // controlled by ImageInput state
  authorBio: string;

  date: string;     // e.g., "March 5, 2025"
  readTime: string; // e.g., "5 min read"

  image: string;    // main story image (ImageInput state)
  content: string;

  // we edit tags via a textarea; they’ll be parsed to string[]
  // likes/comments are counters -> not exposed here
};

type StoryFormProps = {
  editingId?: string;
  initialData?: StoryModel | null;
  categories: Category[];
};

/* ── Component ──────────────────────────────────────────────────────────── */
export default function StoryForm({ editingId, initialData, categories }: StoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  /* RHF setup */
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StoryFormData>({
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      categoryId: initialData?.categoryId ?? (categories[0]?.id ?? ""),

      authorName: initialData?.authorName ?? "",
      authorImage: initialData?.authorImage ?? "",
      authorBio: initialData?.authorBio ?? "",

      date: initialData?.date ?? "",
      readTime: initialData?.readTime ?? "",

      image: initialData?.image ?? "",
      content: initialData?.content ?? "",
    },
  });

  /* Images state (cover + author avatar) */
  const [coverUrl, setCoverUrl] = useState(initialData?.image || "/placeholder.svg");
  const [authorUrl, setAuthorUrl] = useState(initialData?.authorImage || "/placeholder.svg");

  useEffect(() => {
    setValue("image", coverUrl, { shouldValidate: false });
  }, [coverUrl, setValue]);

  useEffect(() => {
    setValue("authorImage", authorUrl, { shouldValidate: false });
  }, [authorUrl, setValue]);

  /* Tags (text area) */
  const [tagsText, setTagsText] = useState(
    Array.isArray((initialData as any)?.tags)
      ? ((initialData as any).tags as string[]).join(", ")
      : ""
  );

  const parseTags = (txt: string) =>
    txt
      .split(/[\n,]/g)
      .map((t) => t.trim())
      .filter(Boolean);

  /* Submit */
  async function onSubmit(data: StoryFormData) {
    try {
      setLoading(true);

      const payload = {
        title: data.title.trim(),
        slug: data.slug?.trim() || undefined, // server will ensure uniqueness / generate if missing
        categoryId: data.categoryId,

        authorName: data.authorName.trim(),
        authorImage: authorUrl,
        authorBio: data.authorBio.trim(),

        date: data.date.trim(),
        readTime: data.readTime.trim(),

        image: coverUrl,
        content: data.content.trim(),

        tags: parseTags(tagsText),
      };

      if (editingId) {
        await updateStory(editingId, payload);
        toast.success("Story updated successfully!");
      } else {
        await createStory(payload);
        toast.success("Story created successfully!");
      }

      reset();
      setCoverUrl("/placeholder.svg");
      setAuthorUrl("/placeholder.svg");
      setTagsText("");
      router.push("/dashboard/stories");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* UI */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/dashboard/stories"
        parent=""
        title={editingId ? "Edit Story" : "New Story"}
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        {/* Left column */}
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Story Details</CardTitle>
              <CardDescription>Fill in the story information below.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Title */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Title"
                  name="title"
              
                />

                {/* Slug (optional; server ensures uniqueness if blank) */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Slug (optional)"
                  name="slug"
                />

                {/* Category */}
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

                {/* Date & read time (labels) */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Date (label)"
                  name="date"
                  placeholder="March 5, 2025"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Read Time"
                  name="readTime"
                  placeholder="5 min read"
                />

                {/* Author */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Author Name"
                  name="authorName"
                  placeholder="Maria Rodriguez"
                />
              </div>

              {/* Author Bio */}
              <div className="mt-6">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Author Bio"
                  name="authorBio"
                />
              </div>

              {/* Content */}
              <div className="mt-6">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Content"
                  name="content"
                />
              </div>

              {/* Tags */}
              <div className="mt-6 grid grid-cols-1 gap-2">
                <label className="text-sm font-medium text-foreground">Tags (comma or new line)</label>
                <textarea
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  className="min-h-[100px] w-full rounded-md border bg-background p-3 text-sm"
                  placeholder={`Education, Scholarship, Success Story, Community Impact`}
                />
                <p className="text-xs text-muted-foreground">
                  Example: <em>Education, Scholarship, Success Story</em>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column (images) */}
        <div className="col-span-full lg:col-span-4">
          <div className="grid auto-rows-max items-start gap-4">
            <ImageInput
              title="Story Cover Image"
              imageUrl={coverUrl}
              setImageUrl={setCoverUrl}
              endpoint="storyImage" // ensure this matches your UploadThing endpoint
            />
            <ImageInput
              title="Author Avatar"
              imageUrl={authorUrl}
              setImageUrl={setAuthorUrl}
              endpoint="authorImage" // ensure this matches your UploadThing endpoint
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/dashboard/stories"
        editingId={editingId}
        loading={loading}
        title="Story"
        parent=""
      />
    </form>
  );
}
