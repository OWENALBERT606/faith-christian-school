import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vIf0uiftYC8v3B5MyvUCDVhpR3Vdgd.png"
                alt="Faith Christian School Foundation"
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight">Faith Christian School</span>
                <span className="text-xs text-primary-foreground/80">Foundation</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
              Transforming lives through faith, compassion, and community support.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#causes" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Our Causes
                </a>
              </li>
              <li>
                <a href="/stories" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="/stories" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="/events" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  News & Updates/Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/donate" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Donate Now
                </a>
              </li>
              <li>
                <a href="/volunteer" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Partner With Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Annual Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">
                    <main>Mubende Central Region</main>
                  <br />
                  Mubende-Uganda
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">+256 757549225</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">faithchristianschool2@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Faith Christian School Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
