import { getParishes } from "@/actions/parishes";
import NewParishForm from "@/components/Forms/new-parsih-form";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React from "react";
// import ParishForm from "@/components/Forms/ParishForm";

export default async function Page() {
  // const parishes = (await getParishes()) || [];

  // const parishOptions = parishes.map((item) => {
  //   return {
  //     label: item.name,
  //     value: item.id,
  //   };
  // });

  // const session = await getServerSession(authOptions);
  // const userId = session?.user.id ?? "";

  return (
    <div>
      <NewParishForm/>
      {/* <ParishForm userId={userId} parishOptions={parishOptions} /> */}
    </div>
  );
}
