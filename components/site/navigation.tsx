// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Link, Menu, X } from "lucide-react"
// import Image from "next/image"

// export function Navigation() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Events", href: "/events" },
//     { name: "Campaigns", href: "/campaigns" },
//     { name: "Stories", href: "/stories" },
//     { name: "Contact", href: "/contacts" },
//     { name: "Donate", href: "/donate" },
    
//   ]

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           <div className="flex items-center gap-3">
//             <Image
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vIf0uiftYC8v3B5MyvUCDVhpR3Vdgd.png"
//               alt="Faith Christian School Foundation"
//               width={60}
//               height={60}
//               className="w-12 h-12 sm:w-14 sm:h-14"
//             />
//             <div className="flex flex-col">
//               <span className="font-bold text-sm sm:text-base text-primary leading-tight">Faith Christian School</span>
//               <span className="text-xs text-muted-foreground">Foundation</span>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>

//           <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6 text-foreground" />
//             ) : (
//               <Menu className="w-6 h-6 text-foreground" />
//             )}
//           </button>
//         </div>
//       </div>

//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-background border-t border-border">
//           <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="text-sm font-medium text-foreground hover:text-secondary transition-colors py-2"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </a>
//             ))}
//             <Link href="/donate" className="w-full">
//               <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full">Donate</Button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  X,
  Bell,
  ChevronDown,
  LogIn,
  User as UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Campaigns", href: "/campaigns" },
    { name: "Stories", href: "/stories" },
    { name: "Contact", href: "/contacts" },
    // { name: "Donate", href: "/donate" },
  ];

  const userName =
    (session?.user?.name && session.user.name.split(" ")[0]) || "You";
  const avatarUrl = session?.user?.image || "";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vIf0uiftYC8v3B5MyvUCDVhpR3Vdgd.png"
              alt="Faith Christian School Foundation"
              width={60}
              height={60}
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
            <div className="flex flex-col">
              <span className="leading-tight text-sm font-bold text-primary sm:text-base">
                Faith Christian School
              </span>
              <span className="text-xs text-muted-foreground">Ministries</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NextLink
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-secondary"
              >
                {link.name}
              </NextLink>
            ))}
          </div>

          {/* Right: Auth / Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {status === "authenticated" ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-muted"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-muted/60">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl} alt={userName} />
                        <AvatarFallback>
                          <UserIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden text-sm font-medium sm:inline">
                        {userName}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <NextLink href="/dashboard">Dashboard</NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NextLink href="/profile">Profile</NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  asChild
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <NextLink href="/donate">Donate</NextLink>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => signIn()}
                >
                  <LogIn className="h-4 w-4" />
                  Log in
                </Button>
                <Button
                  asChild
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <NextLink href="/donate">Donate</NextLink>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {/* Mobile: user strip when logged in */}
            {status === "authenticated" && (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={avatarUrl} alt={userName} />
                  <AvatarFallback>
                    <UserIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-muted-foreground">
                    {session?.user?.email}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Notifications"
                  className="text-foreground"
                >
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Links */}
            {navLinks.map((link) => (
              <NextLink
                key={link.name}
                href={link.href}
                className="py-2 text-sm font-medium text-foreground transition-colors hover:text-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NextLink>
            ))}

            {/* Auth actions for mobile */}
            {status !== "authenticated" ? (
              <>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signIn();
                  }}
                >
                  <LogIn className="h-4 w-4" />
                  Log in
                </Button>
                <Button
                  asChild
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <NextLink href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                    Donate
                  </NextLink>
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <NextLink href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </NextLink>
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Sign out
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
