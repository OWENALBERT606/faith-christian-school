// // app/dashboard/partnerships/[id]/page.tsx
// import React from "react";
// import { notFound } from "next/navigation";
// import { getPartnershipById, updatePartnership } from "@/actions/partnerships";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Mail, Phone, Building2, Calendar, Clock } from "lucide-react";
// import Link from "next/link";

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function PartnershipDetailPage({ params }: PageProps) {
//   const partnership = await getPartnershipById(params.id);

//   if (!partnership) {
//     notFound();
//   }

//   const typeLabels: Record<string, string> = {
//     corporate: "Corporate Sponsorship",
//     foundation: "Foundation Grant",
//     community: "Community Organization",
//     educational: "Educational Institution",
//     other: "Other",
//   };

//   const statusColors: Record<string, string> = {
//     pending: "bg-amber-100 text-amber-700 border-amber-300",
//     approved: "bg-green-100 text-green-700 border-green-300",
//     rejected: "bg-red-100 text-red-700 border-red-300",
//     contacted: "bg-blue-100 text-blue-700 border-blue-300",
//   };

//   return (
//     <div className="container mx-auto p-8 max-w-5xl">
//       {/* Header */}
//       <div className="mb-6">
//         <Link
//           href="/dashboard/partnerships"
//           className="text-sm text-blue-600 hover:underline mb-4 inline-block"
//         >
//           ← Back to Partnerships
//         </Link>
//         <div className="flex items-start justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {partnership.organizationName}
//             </h1>
//             <p className="text-gray-500 mt-1">Partnership Request Details</p>
//           </div>
//           <Badge
//             className={`${
//               statusColors[partnership.status] ?? "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {partnership.status.charAt(0).toUpperCase() +
//               partnership.status.slice(1)}
//           </Badge>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Contact Information */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Contact Information</CardTitle>
//               <CardDescription>
//                 Details about the partnership contact person
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <Building2 className="h-5 w-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">
//                     Contact Person
//                   </p>
//                   <p className="text-base font-medium">{partnership.contactName}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Mail className="h-5 w-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Email</p>
//                   <a>
                  
//                     href={`mailto:${partnership.email}`}
//                     className="text-base font-medium text-blue-600 hover:underline"
            
//                     {partnership.email}
//                   </a>
//                 </div>
            
//               <CardContent/>
//            </Card>
//               <div className="flex items-center gap-3">
//                 <Phone className="h-5 w-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Phone</p>
                  
//                     href={`tel:${partnership.phone}`}
//                     className="text-base font-medium text-blue-600 hover:underline"
//                   >
//                     {partnership.phone}
//                   </a>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Partnership Details */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Partnership Details</CardTitle>
//               <CardDescription>
//                 Information about the partnership request
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500 mb-1">
//                   Partnership Type
//                 </p>
//                 <Badge variant="outline" className="bg-blue-50">
//                   {typeLabels[partnership.partnershipType] ??
//                     partnership.partnershipType}
//                 </Badge>
//               </div>

//               <div>
//                 <p className="text-sm font-medium text-gray-500 mb-2">
//                   Message
//                 </p>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                   <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                     {partnership.message}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-wrap gap-3">
//               <Button asChild variant="default">
//                 <a href={`mailto:${partnership.email}`}>
//                   <Mail className="h-4 w-4 mr-2" />
//                   Send Email
//                 </a>
//               </Button>
//               <Button asChild variant="outline">
//                 <a href={`tel:${partnership.phone}`}>
//                   <Phone className="h-4 w-4 mr-2" />
//                   Call
//                 </a>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Status Management */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Status Management</CardTitle>
//               <CardDescription>Update partnership status</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <PartnershipStatusForm
//                 partnershipId={partnership.id}
//                 currentStatus={partnership.status}
//               />
//             </CardContent>
//           </Card>

//           {/* Metadata */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Metadata</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-sm">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Calendar className="h-4 w-4" />
//                 <div>
//                   <p className="font-medium">Submitted</p>
//                   <p className="text-xs">
//                     {new Date(partnership.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 text-gray-600">
//                 <Clock className="h-4 w-4" />
//                 <div>
//                   <p className="font-medium">Last Updated</p>
//                   <p className="text-xs">
//                     {new Date(partnership.updatedAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>

//               <div className="pt-3 border-t">
//                 <p className="text-xs text-gray-500">
//                   Partnership ID: {partnership.id}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/dashboard/partnerships/[id]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPartnershipById } from "@/actions/partnerships";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
} from "lucide-react";
import PartnershipStatusForm from "./partnershipStatusForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PartnershipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const {id} = await params;
  const partnership = await getPartnershipById(id);

  if (!partnership) {
    notFound();
  }

  const typeLabels: Record<string, string> = {
    corporate: "Corporate Sponsorship",
    foundation: "Foundation Grant",
    community: "Community Organization",
    educational: "Educational Institution",
    other: "Other",
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-300",
    approved: "bg-green-100 text-green-700 border-green-300",
    rejected: "bg-red-100 text-red-700 border-red-300",
    contacted: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/partnerships"
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Partnerships
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {partnership.organizationName}
            </h1>
            <p className="text-gray-500 mt-1">Partnership Request Details</p>
          </div>
          <Badge
            className={`${
              statusColors[partnership.status] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {partnership.status.charAt(0).toUpperCase() +
              partnership.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Details about the partnership contact person
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Contact Person
                  </p>
                  <p className="text-base font-medium">
                    {partnership.contactName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <a
                    href={`mailto:${partnership.email}`}
                    className="text-base font-medium text-blue-600 hover:underline"
                  >
                    {partnership.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <a
                    href={`tel:${partnership.phone}`}
                    className="text-base font-medium text-blue-600 hover:underline"
                  >
                    {partnership.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partnership Details */}
          <Card>
            <CardHeader>
              <CardTitle>Partnership Details</CardTitle>
              <CardDescription>
                Information about the partnership request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Partnership Type
                </p>
                <Badge variant="outline" className="bg-blue-50">
                  {typeLabels[partnership.partnershipType] ??
                    partnership.partnershipType}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Message
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {partnership.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild variant="default">
                <a href={`mailto:${partnership.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${partnership.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle>Status Management</CardTitle>
              <CardDescription>Update partnership status</CardDescription>
            </CardHeader>
            <CardContent>
              <PartnershipStatusForm
                partnershipId={partnership.id}
                currentStatus={partnership.status}
              />
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium">Submitted</p>
                  <p className="text-xs">
                    {new Date(partnership.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-xs">
                    {new Date(partnership.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500">
                  Partnership ID: {partnership.id}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
