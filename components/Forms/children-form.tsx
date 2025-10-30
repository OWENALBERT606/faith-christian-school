// components/Forms/child-form.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import type { Child as ChildModel } from "@prisma/client";

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
import { createChild, updateChild } from "@/actions/sponsor";

// 👉 make sure these exist per your earlier server-actions

/* ── Types ─────────────────────────────────────────────────────────────── */
export type ChildFormData = {
  name: string;
  age: number;
  location: string;
  imageUrl: string;       // from ImageInput state
  background: string;  // long text
};

type ChildFormProps = {
  editingId?: string;
  initialData?: ChildModel | null;
};

export default function ChildForm({ editingId, initialData }: ChildFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  /* ── RHF setup ───────────────────────────────────────────────────────── */
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ChildFormData>({
    defaultValues: {
      name: initialData?.name ?? "",
      age: Number(initialData?.age ?? 0),
      location: initialData?.location ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      background: initialData?.background ?? "",
    },
  });

  /* ── Image state ─────────────────────────────────────────────────────── */
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "/placeholder.svg");
  useEffect(() => {
    setValue("imageUrl", imageUrl, { shouldValidate: false });
  }, [imageUrl, setValue]);

  /* ── Submit ──────────────────────────────────────────────────────────── */
  async function onSubmit(data: ChildFormData) {
    try {
      setLoading(true);

      const payload: ChildFormData = {
        name: data.name.trim(),
        age: Number.isFinite(Number(data.age)) ? Number(data.age) : 0,
        location: data.location.trim(),
        imageUrl: imageUrl,
        background: data.background.trim(),
      };

      if (editingId) {
        const ok = await updateChild(editingId, payload);
        if (!ok) throw new Error("Failed to update child");
        toast.success("Child updated successfully!");
      } else {
        const created = await createChild(payload);
        if (!created) throw new Error("Failed to create child");
        toast.success("Child created successfully!");
      }

      reset({
        name: "",
        age: 0,
        location: "",
        imageUrl: "",
        background: "",
      });
      setImageUrl("/placeholder.svg");
      router.push("/dashboard/children");
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
        href="/dashboard/children"
        parent=""
        title={editingId ? "Edit Child" : "New Child"}
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        {/* Left column */}
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Child Details</CardTitle>
              <CardDescription>Fill in the child’s information below.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Name */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Full Name"
                  name="name"
                  placeholder="Emmanuel Osei"
                />

                {/* Age */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Age"
                  name="age"
                  type="number"
                  placeholder="9"
                />

                {/* Location */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Location"
                  name="location"
                  placeholder="Ghana"
                />
              </div>

              {/* Background / Story */}
              <div className="mt-6 grid grid-cols-1 gap-6">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Background / Story"
                  name="background"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="col-span-full lg:col-span-4">
          <div className="grid auto-rows-max items-start gap-4">
            <ImageInput
              title="Child Photo"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="childImage" // 👈 ensure this matches your UploadThing endpoint
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/dashboard/children"
        editingId={editingId}
        loading={loading}
        title="Child"
        parent=""
      />
    </form>
  );
}
