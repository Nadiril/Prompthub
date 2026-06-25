"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LangToggle from "./LangToggle";
import { useLang } from "../lib/i18n";
import { useAuth } from "../lib/auth-context";

const navHrefs = [
  { href: "/",       key: "home"   },
  { href: "/browse", key: "browse" },
  { href: "/prompts", key: "prompts" },
  { href: "/profiles", key: "profiles" },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();
  const { user, loading, signOut } = useAuth();

  const navLinks = navHrefs.map(({ href, key }) => ({
    href,
    label: t.nav[key],
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a12]/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white shadow-lg shadow-violet-900/50 tracking-tight">
              &gt;_
            </span>
            Prompt<span className="text-violet-400">Hub</span>
          </Link>
        </motion.div>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg border border-violet-500/30 bg-violet-500/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <LangToggle />

          {!loading && user && (
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-sm text-zinc-400">{user.email}</span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => signOut()}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-white/10"
              >
                {t.nav.logout}
              </motion.button>
            </div>
          )}

          {!loading && !user && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-900/40 transition hover:bg-violet-700"
            >
              <Link href="/login">{t.nav.login}</Link>
            </motion.button>
          )}

          {/* Hamburger */}
          <motion.button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden border-t border-white/5 bg-[#0a0a12]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
              {navLinks.map(({ href, label }, i) => {
                const isActive = pathname === href;
                return (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "border border-violet-500/20 bg-violet-500/10 text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
              {!loading && user && (
                <motion.div
                  custom={navLinks.length}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="mt-2 block rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-zinc-300 hover:bg-white/10"
                  >
                    {t.nav.logout} ({user.email})
                  </button>
                </motion.div>
              )}
              {!loading && !user && (
                <motion.div
                  custom={navLinks.length}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 block rounded-lg bg-violet-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-violet-700"
                  >
                    {t.nav.login}
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}