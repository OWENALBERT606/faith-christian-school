import { getParishes } from "@/actions/parishes";
import NewMpomurroForm from "@/components/Forms/mpomurro-form";
import NewParishForm from "@/components/Forms/new-parsih-form";
import NewNosigakiForm from "@/components/Forms/nosigaki-form";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";
// import ParishForm from "@/components/Forms/ParishForm";

export default async function Page() {


  return (
    <div>
      <NewMpomurroForm/>
    </div>
  );
}
