"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

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

// 👉 change these to your actual banner actions
import { createBanner, updateBanner } from "@/actions/banners";

export type BannerFormData = {
  title: string;
  description: string;
  subtitle: string;
  isActive: boolean;
  image: string;
};

type BannerFormProps = {
  editingId?: string;
  initialData?: any | null;
};

export default function BannerForm({ editingId, initialData }: BannerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BannerFormData>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      subtitle: initialData?.subtitle || "",
      isActive: initialData?.isActive ?? true,
      image: initialData?.imageUrl || "",
    },
  });

  // Image state
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || "/placeholder.svg"
  );

  // Sync image to RHF
  const handleImageChange = (url: string) => {
    setImageUrl(url);
    setValue("image", url, { shouldValidate: false });
  };

  async function onSubmit(data: BannerFormData) {
    try {
      setLoading(true);

      const payload = {
        title: data.title.trim(),
        description: data.description.trim(),
        subtitle: data.subtitle.trim(),
        isActive: Boolean(data.isActive),
        imageUrl: imageUrl,
      };

      if (editingId) {
        await updateBanner(editingId, payload);
        toast.success("Banner updated successfully!");
      } else {
        await createBanner(payload);
        toast.success("Banner created successfully!");
      }

      reset();
      setImageUrl("/placeholder.svg");

      router.push("/dashboard/banners");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/dashboard/banners"
        parent=""
        title={editingId ? "Edit Banner" : "New Banner"}
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        {/* Left column */}
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Banner Details</CardTitle>
              <CardDescription>Fill in the banner details below.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Title"
                  name="title"
                  placeholder="Welcome to our website"
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="subtitle"
                  name="subtitle"
                  placeholder="Your subtitle here"
                />

                {/* Status toggle */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">
                    Active Status
                  </label>
                  <select
                    {...register("isActive")}
                    className="rounded-md border bg-background px-3 py-2 text-sm"
                    defaultValue={initialData?.isActive ?? true}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Description"
                  name="description"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="col-span-full lg:col-span-4">
          <div className="grid auto-rows-max items-start gap-4">
            <ImageInput
              title="Banner Image"
              imageUrl={imageUrl}
              setImageUrl={handleImageChange}
              endpoint="bannerImage" // change if you use a different upload endpoint
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/dashboard/banners"
        editingId={editingId}
        loading={loading}
        title="Banner"
        parent=""
      />
    </form>
  );
}
