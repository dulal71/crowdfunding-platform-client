'use client'
import Link from "next/link";

import { motion } from "framer-motion";
import { Unbounded } from "next/font/google";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const footerLinks = {
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Causes", href: "/causes" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
    ],
  },
  getFunded: {
    title: "Get Funded",
    links: [
      { label: "Start a Campaign", href: "/campaigns" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Success Stories", href: "/success-stories" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help-center" },
      { label: "FAQs", href: "/faqs" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
};

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" ,Icon:FaFacebook},
  { label: "Twitter", href: "https://twitter.com",Icon:FaTwitter },
  { label: "Instagram", href: "https://instagram.com",Icon:FaInstagram },
];
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["700"],
});
const Footer = () => {
  return (
    <footer className="bg-primary text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          
          {/* Logo */}
        <div>
  <Link
    href='/'
    className={`relative inline-block overflow-hidden bg-white px-2 py-1 rounded-md`}
  >
    <motion.span
      animate={{
        backgroundPosition: [
          "0% 50%",
          "100% 50%",
          "0% 50%",
        ],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`${unbounded.className}
        bg-[linear-gradient(90deg,var(--color-primary),var(--color-primary-light),var(--color-accent))]
        bg-[length:300%_300%]
        bg-clip-text
        text-transparent
        text-xl
        font-bold`}
    >
      CROWDLAUNCH
    </motion.span>

    <motion.div
      className="absolute inset-y-0 -left-24 w-20 bg-gradient-to-r from-transparent via-black/10 to-transparent blur-md"
      animate={{
        x: ["0%", "450%"],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 1,
      }}
    />
  </Link>

  <p className="mt-3 text-sm leading-relaxed text-slate-300">
    Bringing charity closer to donors and making it easier to fund
    impactful causes.
  </p>
</div>

          {/* Link columns */}
          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                {column.title}
              </h3>

              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 md:flex-row">
          <p className="text-sm md:text-md text-slate-300">
            © {new Date().getFullYear()} CharityUp. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
  const Icon = social.Icon;
  return (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-accent transition-colors hover:bg-primary-light hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
})}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;