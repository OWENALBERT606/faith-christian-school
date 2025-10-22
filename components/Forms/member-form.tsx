// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import FormHeader from "./FormHeader";
// import TextInput from "../FormInputs/TextInput";
// import TextArea from "../FormInputs/TextAreaInput";
// import ImageInput from "../FormInputs/ImageInput";
// import FormFooter from "./FormFooter";
// import VideoInput from "../FormInputs/VideoInput";
// import { Member } from "@prisma/client";

// // ✅ Props
// type MpomurroFormProps = {
//   editingId?: string;
//   initialData?: Member | null;
// };

// // ✅ Form component
// export default function NewMemberForm({ editingId, initialData }: MpomurroFormProps) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<Member>({
//     defaultValues: {
//       name: initialData?.name ?? "",
//       position: initialData?.position ?? "",
//       photo: initialData?.photo ?? "",
//       description: initialData?.description ?? "",
//     },
//   });

//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const initialImage = initialData?.photo || "/placeholder.svg";
//   const [imageUrl, setImageUrl] = useState(initialImage);

//   // ✅ Handle form submit
//   async function saveMpomurro(data: any) {
//     try {
//       setLoading(true);
//       data. = imageUrl;
//       data.videoUrl = videoUrl;

//       if (editingId) {
//         await updateMpomurro(editingId, data);
//         toast.success("Mpomurro updated successfully!");
//         router.push("/dashboard/mpomurro");
//       } else {
//         await createMpomurro(data);
//         toast.success("Mpomurro registered successfully!");
//         router.push("/dashboard/mpomurro");
//       }

//       reset();
//       setImageUrl("/placeholder.svg");
//       setVideoUrl("");
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(saveMpomurro)}>
//       <FormHeader
//         href="/dashboard/mpomurro"
//         parent=""
//         title="Mpomurro"
//         editingId={editingId}
//         loading={loading}
//       />

//       <div className="grid grid-cols-12 gap-6 py-8">
//         <div className="lg:col-span-8 col-span-full space-y-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Mpomurro Details</CardTitle>
//               <CardDescription>
//                 Add and manage your Mpomurro content here.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-6">
//                 <TextInput
//                   register={register}
//                   errors={errors}
//                   label="Mpomurro Title"
//                   name="title"
//                 />
//                 <TextArea
//                   register={register}
//                   errors={errors}
//                   label="Mpomurro Description"
//                   name="description"
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="lg:col-span-4 col-span-full">
//           <div className="grid auto-rows-max items-start gap-4">
//             <ImageInput
//               title="Mpomurro Thumbnail"
//               imageUrl={imageUrl}
//               setImageUrl={setImageUrl}
//               endpoint="mpomurroThumbnail"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="w-2/3">
//         <VideoInput
//           title="Upload Mpomurro Video"
//           videoUrl={videoUrl}
//           setVideoUrl={setVideoUrl}
//           endpoint="mpomurroVideo" // 👈 must match your Uploadthing endpoint
//         />
//       </div>

//       <FormFooter
//         href="/dashboard/mpomurro"
//         editingId={editingId}
//         loading={loading}
//         title="Mpomurro"
//         parent=""
//       />
//     </form>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Member } from "@prisma/client";

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
import { createMember, updateMember } from "@/actions/members";

// ✅ actions (adjust the path if needed)
// Props
type NewMemberFormProps = {
  editingId?: string;
  initialData?: Member | null;
};

// Narrow form data to the fields your model needs
type MemberFormData = Pick<Member, "name" | "position" | "photo" | "description">;

export default function NewMemberForm({ editingId, initialData }: NewMemberFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemberFormData>({
    defaultValues: {
      name: initialData?.name ?? "",
      position: initialData?.position ?? "",
      photo: initialData?.photo ?? "",
      description: initialData?.description ?? "",
    },
  });

  // image state mirrors <ImageInput />
  const [imageUrl, setImageUrl] = useState(initialData?.photo || "/placeholder.svg");

  // ✅ submit
  async function onSubmit(data: MemberFormData) {
    try {
      setLoading(true);

      const payload: MemberFormData = {
        ...data,
        photo: imageUrl, // ensure photo uses the latest uploaded URL
      };

      if (editingId) {
        await updateMember(editingId, payload);
        toast.success("Member updated successfully!");
      } else {
        await createMember(payload);
        toast.success("Member created successfully!");
      }

      // reset + redirect
      reset();
      setImageUrl("/placeholder.svg");
      router.push("/dashboard/team");
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
        href="/dashboard/members"
        parent=""
        title={editingId ? "Edit Member" : "New Member"}
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        {/* Left column */}
        <div className="col-span-full space-y-3 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Member Details</CardTitle>
              <CardDescription>Manage a member’s profile information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Full Name"
                  name="name"
                  placeholder="e.g., Jane Doe"
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="Position / Role"
                  name="position"
                  placeholder="e.g., Coordinator"
                />
              </div>

              <div className="mt-6">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Description / Bio"
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
              title="Member Photo"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="memberImage" // 👈 make sure this matches your UploadThing endpoint
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/dashboard/members"
        editingId={editingId}
        loading={loading}
        title="Member"
        parent=""
      />
    </form>
  );
}
