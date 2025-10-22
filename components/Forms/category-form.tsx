"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Category } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FormHeader from "./FormHeader";
import TextInput from "../FormInputs/TextInput";
import FormFooter from "./FormFooter";

// 👉 Adjust these imports to your actual actions path
import { createCategory, updateCategory } from "@/actions/categories";

type CategoryFormProps = {
  editingId?: string;
  initialData?: Category | null;
};

// Only the fields present in your model
type CategoryFormData = Pick<Category, "name" | "slug">;

// Simple slugify helper (unicode-safe)
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // remove non letters/numbers/spaces/hyphens
    .replace(/\s+/g, "-")              // spaces → hyphens
    .replace(/-+/g, "-");              // collapse multiple hyphens
}

export default function CategoryForm({ editingId, initialData }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
    },
  });

  const nameWatch = watch("name");
  const slugWatch = watch("slug");

  // Auto-fill slug from name while slug is empty (and not editing an existing slug)
  useEffect(() => {
    if (!editingId && (!slugWatch || slugWatch.trim() === "")) {
      setValue("slug", slugify(nameWatch ?? ""), { shouldValidate: true });
    }
  }, [nameWatch, slugWatch, editingId, setValue]);

  async function onSubmit(data: CategoryFormData) {
    try {
      setLoading(true);

      // Ensure we always send a slug (fallback to slugified name)
      const payload: CategoryFormData = {
        name: data.name.trim(),
        slug: (data.slug || slugify(data.name)).trim(),
      };

      if (!payload.name) {
        toast.error("Name is required.");
        return;
      }
      if (!payload.slug) {
        toast.error("Slug is required.");
        return;
      }

      if (editingId) {
        const updated = await updateCategory(editingId, payload);
        if (!updated) {
          toast.error("Category update failed (maybe slug already exists).");
        } else {
          toast.success("Category updated successfully!");
        }
      } else {
        const created = await createCategory(payload);
        if (!created) {
          toast.error("Category creation failed (maybe slug already exists).");
        } else {
          toast.success("Category created successfully!");
        }
      }

      reset();
      router.push("/dashboard/categories");
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
        href="/dashboard/categories"
        parent=""
        title={editingId ? "Edit Category" : "New Category"}
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="col-span-full lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Category Details</CardTitle>
              <CardDescription>
                Create or update a category. Slug is used in URLs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Name"
                  name="name"
                  placeholder="e.g., Health"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FormFooter
        href="/dashboard/categories"
        editingId={editingId}
        loading={loading}
        title="Category"
        parent=""
      />
    </form>
  );
}
