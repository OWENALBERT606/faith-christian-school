// // app/dashboard/campaigns/page.tsx
// import React from "react";
// import { columns } from "./columns"; // <-- make sure these are Campaign columns
// import DataTable from "@/components/DataTableComponents/DataTable";
// import TableHeader from "@/components/dashboard/Tables/TableHeader";
// import { getCampaigns } from "@/actions/campaigns";

// export default async function Page() {
//   const campaigns = (await getCampaigns()) ?? [];

//   return (
//     <div className="p-8">
//       <TableHeader
//         title="Campaigns"
//         linkTitle="Add Campaign"
//         href="/dashboard/campaigns/new"
//         data={campaigns}
//         model="campaign"
//       />
//       <div className="py-8">
//         <DataTable data={campaigns} columns={columns} />
//       </div>
//     </div>
//   );
// }




// app/dashboard/partnerships/page.tsx
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getPartnerships } from "@/actions/partnerships";

export default async function Page() {
  const partnerships = (await getPartnerships()) ?? [];

  return (
    <div className="p-8">
      <TableHeader
        title="Partnership Requests"
        linkTitle="View All Partners"
        href="/dashboard/partnerships"
        data={partnerships}
        model="partnership"
      />
      <div className="py-8">
        <DataTable data={partnerships} columns={columns} />
      </div>
    </div>
  );
}