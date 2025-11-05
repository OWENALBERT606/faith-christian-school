// app/dashboard/volunteers/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { getVolunteerById } from "@/actions/volunteers";
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
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";
import VolunteerStatusForm from "./VolunteerStatusForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function VolunteerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const {id} = await params;
  const volunteer = await getVolunteerById(id);

  if (!volunteer) {
    notFound();
  }

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
          href="/dashboard/volunteers"
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Volunteers
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {volunteer.fullName}
            </h1>
            <p className="text-gray-500 mt-1">Volunteer Application Details</p>
          </div>
          <Badge
            className={`${
              statusColors[volunteer.status] ??
              "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {volunteer.status.charAt(0).toUpperCase() +
              volunteer.status.slice(1)}
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
                Details about the volunteer applicant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <a
                    href={`mailto:${volunteer.email}`}
                    className="text-base font-medium text-blue-600 hover:underline"
                  >
                    {volunteer.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <a
                    href={`tel:${volunteer.phone}`}
                    className="text-base font-medium text-blue-600 hover:underline"
                  >
                    {volunteer.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-base font-medium">{volunteer.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Areas of Interest */}
          <Card>
            <CardHeader>
              <CardTitle>Areas of Interest</CardTitle>
              <CardDescription>
                Volunteer interests and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {volunteer.interests?.length ? (
                  volunteer.interests.map((interest: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {interest}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No interests listed</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills & Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Experience</CardTitle>
              <CardDescription>
                Relevant skills and background
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {volunteer.skills || "No skills information provided."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>When they can volunteer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {volunteer.availability || "No availability specified."}
                </p>
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
                <a href={`mailto:${volunteer.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${volunteer.phone}`}>
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
              <CardDescription>Update volunteer status</CardDescription>
            </CardHeader>
            <CardContent>
              <VolunteerStatusForm
                volunteerId={volunteer.id}
                currentStatus={volunteer.status}
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
                  <p className="font-medium">Applied</p>
                  <p className="text-xs">
                    {new Date(volunteer.createdAt).toLocaleDateString("en-US", {
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
                    {new Date(volunteer.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500">
                  Volunteer ID: {volunteer.id}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
