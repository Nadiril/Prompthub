"use client";

import Link from "next/link";
import { useLang } from "../lib/i18n";

export default function FooterClient() {
  const { t } = useLang();

  const navLinks = [
    { href: "/",       label: t.nav.home   },
    { href: "/browse", label: t.nav.browse },
    { href: "/submit", label: t.nav.submit },
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="flex flex-col items-center gap-1 sm:items-start">
        <Link href="/" className="text-lg font-bold text-white">
          Prompt<span className="text-violet-400">Hub</span>
        </Link>
        <p className="text-xs text-zinc-600">{t.footer.tagline}</p>
      </div>

      <nav className="flex items-center gap-6 text-sm text-zinc-500">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="transition-colors hover:text-zinc-200">
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
