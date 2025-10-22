
import NewMemberForm from "@/components/Forms/member-form";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";
// import ParishForm from "@/components/Forms/ParishForm";

export default async function Page() {

  return (
    <div>
      <NewMemberForm/>
    </div>
  );
}
