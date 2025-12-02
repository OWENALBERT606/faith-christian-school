import { getBannerById } from "@/actions/banners";
import BannerForm from "@/components/Forms/banner-form";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const banner = await getBannerById(id);

  return (
    <div className="p-8">
      <BannerForm initialData={banner} />
    </div>
  );
}
