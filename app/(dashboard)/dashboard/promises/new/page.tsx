import { getParishes } from "@/actions/parishes";
import NewParishForm from "@/components/Forms/new-parsih-form";
import NewPromiseForm from "@/components/Forms/newpromiseform";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page() {

  return (
    <div>
      <NewPromiseForm/>
    </div>
  );
}
