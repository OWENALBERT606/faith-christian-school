// import { Card, CardContent } from "@/components/ui/card"
// import { Heart, Users, Home, Utensils, BookOpen, Shirt } from "lucide-react"

// export function ProgramsSection() {
//   const programs = [
//     {
//       icon: Heart,
//       title: "Healthcare Support",
//       description: "Providing medical assistance and health education to underserved communities",
//       color: "bg-primary/10 text-primary",
//     },
//     {
//       icon: Utensils,
//       title: "Food Security",
//       description: "Fighting hunger through food distribution and nutrition programs",
//       color: "bg-secondary/10 text-secondary",
//     },
//     {
//       icon: BookOpen,
//       title: "Education Access",
//       description: "Empowering children and adults through educational opportunities and resources",
//       color: "bg-accent/10 text-accent-foreground",
//     },
//     {
//       icon: Home,
//       title: "Shelter & Housing",
//       description: "Supporting families with safe housing and emergency shelter services",
//       color: "bg-primary/10 text-primary",
//     },
//     {
//       icon: Users,
//       title: "Family Support",
//       description: "Strengthening families through counseling, mentorship, and community programs",
//       color: "bg-secondary/10 text-secondary",
//     },
//     {
//       icon: Shirt,
//       title: "Basic Needs",
//       description: "Providing clothing, supplies, and essential resources to those in need",
//       color: "bg-accent/10 text-accent-foreground",
//     },
//   ]

//   return (
//     <section id="programs" className="py-4 sm:py-8 bg-muted/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
//             <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Causes</span>
//           </div>

//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
//             Making a Difference in <span className="text-secondary">Every Life We Touch</span>
//           </h2>

//           <p className="text-lg text-muted-foreground leading-relaxed">
//             Our comprehensive programs address critical needs in our communities, bringing hope and practical support to
//             those who need it most.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {programs.map((program, index) => (
//             <Card
//               key={index}
//               className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-secondary/50"
//             >
//               <CardContent className="p-6 sm:p-8">
//                 <div
//                   className={`w-14 h-14 rounded-xl ${program.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
//                 >
//                   <program.icon className="w-7 h-7" />
//                 </div>

//                 <h3 className="text-xl font-bold text-foreground mb-3">{program.title}</h3>

//                 <p className="text-muted-foreground leading-relaxed">{program.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }



import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Home, Utensils, BookOpen, Shirt } from "lucide-react";

export function ProgramsSection() {
  const programs = [
    {
      icon: Heart,
      title: "Healthcare Support",
      description:
        "Providing medical assistance, mobile clinics, and health education to underserved communities.",
      color: "bg-primary/10 text-primary",
      image: "/closeup-shot-boy-doctor-wearing-sanitary-mask.jpg",
      alt: "Healthcare worker checking a patient's vitals",
    },
    {
      icon: Utensils,
      title: "Food Security",
      description:
        "Fighting hunger through food distribution, kitchen partnerships, and nutrition programs.",
      color: "bg-secondary/10 text-secondary",
      image: "/Ending-Hunger-and-Achieving-Food-Security.jpg",
      alt: "Volunteers preparing food packages",
    },
    {
      icon: BookOpen,
      title: "Education Access",
      description:
        "Empowering children and adults with scholarships, school kits, and literacy resources.",
      color: "bg-accent/10 text-accent-foreground",
      image: "/jpegmini_optimized/20251016_155253.jpg",
      alt: "Children studying with books in a classroom",
    },
    {
      icon: Home,
      title: "Shelter & Housing",
      description:
        "Supporting families with safe housing, emergency shelter, and rebuilding initiatives.",
      color: "bg-primary/10 text-primary",
      image: "/2-870x653.jpeg",
      alt: "Newly built small homes in a community",
    },
    {
      icon: Users,
      title: "Family Support",
      description:
        "Strengthening families via counseling, mentorship, childcare, and community programs.",
      color: "bg-secondary/10 text-secondary",
      image: "/close-up-women-holding-each-other.jpg",
      alt: "Family smiling together",
    },
    {
      icon: Shirt,
      title: "Basic Needs",
      description:
        "Providing clothing, hygiene supplies, and essential resources to those most in need.",
      color: "bg-accent/10 text-accent-foreground",
      image: "/jpegmini_optimized/20251016_154735.jpg",
      alt: "Clothing and supplies neatly arranged for donation",
    },
  ];

  return (
    <section id="programs" className="bg-muted/30 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-block rounded-full bg-secondary/10 px-4 py-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Our Causes
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Making a Difference in{" "}
            <span className="text-secondary">Every Life We Touch</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Our comprehensive programs address critical needs across the
            community—bringing hope and practical support to those who need it
            most.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, idx) => (
            <Card
              key={idx}
              className="group overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:border-secondary/50 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.alt || program.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                {/* top-left label on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-80 transition group-hover:opacity-90" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                  {program.title}
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6 sm:p-7">
                

                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {program.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {program.description}
                </p>

                {/* <div className="mt-5">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
