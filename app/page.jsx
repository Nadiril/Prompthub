"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PromptCard from "../components/PromptCard";
import { prompts, features } from "../data/prompts";
import { useLang } from "../lib/i18n";
import { useSupabaseConnection } from "../lib/supabase-client";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerFast,
} from "../components/AnimationVariants";

/* ─── Trending tags ─── */
const trendingTags = ["#NextJS", "#ChatGPT", "#Marketing", "#Midjourney", "#UIUX", "#Automation"];

/* ─── Star positions — module level to avoid impure render ─── */
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 17 + 3) % 100,
  y: (i * 13 + 7) % 100,
  size: (i % 3) * 0.5 + 0.5,
  delay: (i % 8) * 0.5,
  duration: (i % 5) * 0.6 + 2,
}));

function Section({ children, className = "" }) {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function StarField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          animate={{ opacity: [0.05, 0.6, 0.05] }}
          transition={{ repeat: Infinity, duration: star.duration, delay: star.delay, ease: "easeInOut" }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  useSupabaseConnection();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { t } = useLang();
  const featuredPrompts = prompts.filter((p) => p.featured);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/browse?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/browse");
    }
  }

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[#0a0a12] flex items-center">
        <StarField />

        {/* Gradient orbs */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-indigo-700/15 blur-[100px]" />
          <div className="absolute -right-20 top-10 h-[300px] w-[300px] rounded-full bg-purple-700/10 blur-[80px]" />
        </motion.div>

        {/* Hero content — two column layout */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

            {/* ── Left: text ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-1 flex-col items-start gap-6"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-1.5 w-1.5 rounded-full bg-violet-400"
                  />
                  {t.home.badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
              >
                {t.home.headline1}{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {t.home.headline2}
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeUp}
                className="max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg"
              >
                {t.home.subheading}
              </motion.p>

              {/* Search Bar */}
              <motion.div variants={fadeUp} className="w-full max-w-lg">
                <form
                  onSubmit={handleSearch}
                  className="group relative flex items-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all focus-within:border-violet-500/60 focus-within:shadow-violet-500/10"
                >
                  <span className="pointer-events-none absolute left-5 text-zinc-400 transition-colors group-focus-within:text-violet-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.home.searchPlaceholder}
                    className="w-full bg-transparent py-4 pl-14 pr-24 text-base text-white placeholder:text-zinc-500 focus:outline-none"
                    aria-label="Search prompts"
                  />
                  <span className="absolute right-4 hidden items-center gap-1 sm:flex">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] font-mono text-zinc-500">⌘</kbd>
                    <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] font-mono text-zinc-500">K</kbd>
                  </span>
                  <button
                    type="submit"
                    aria-label="Search"
                    className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700 sm:hidden"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </button>
                </form>
              </motion.div>

              {/* Trending tags */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-start gap-2">
                {trendingTags.map((tag) => (
                  <motion.button
                    key={tag}
                    onClick={() => router.push(`/browse?q=${encodeURIComponent(tag.replace("#", ""))}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
                  >
                    {tag}
                  </motion.button>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-col items-start gap-3 sm:flex-row">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/browse"
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-violet-600 px-7 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:bg-violet-700"
                  >
                    {t.home.exploreBtn}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/submit"
                    className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
                  >
                    {t.home.submitBtn}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── Right: Hero image ── */}
            <motion.div
              initial={{ opacity: 0, x: 48, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full flex-1 lg:max-w-none"
            >
              {/* Glow behind image */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-violet-600/20 blur-[60px]"
              />
              {/* Image frame */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
                <Image
                  src="/Hero.png"
                  alt="PromptHub dashboard preview"
                  width={720}
                  height={500}
                  priority
                  className="h-auto w-full object-cover"
                />
                {/* Bottom fade blending into section */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a12]/60 to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PROMPTS
      ══════════════════════════════════════════ */}
      <Section className="bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10 flex items-end justify-between"
          >
            <motion.div variants={fadeUp}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-violet-400">
                {t.home.featuredLabel}
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {t.home.featuredTitle}
              </h2>
              <p className="mt-1.5 text-sm text-zinc-500">
                {t.home.featuredSub}
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                href="/browse"
                className="hidden items-center gap-1 text-sm font-medium text-violet-400 transition hover:text-violet-300 sm:inline-flex"
              >
                {t.home.viewAll}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredPrompts.map((prompt) => (
              <motion.div key={prompt.id} variants={fadeUp}>
                <PromptCard prompt={prompt} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 text-center sm:hidden"
          >
            <Link href="/browse" className="text-sm font-medium text-violet-400 hover:text-violet-300">
              {t.home.viewAllPrompts}
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <Section className="bg-[#0a0a12] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
              {t.home.whyLabel}
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t.home.whyTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map(({ icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group rounded-2xl border border-white/5 bg-white/3 p-6 transition hover:border-violet-500/30 hover:bg-violet-500/5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-xl transition group-hover:bg-violet-500/20">
                  {icon}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <Section className="bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 px-8 py-16 text-center shadow-2xl shadow-violet-900/40"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white"
            />
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.14, 0.06] }}
              transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1 }}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white"
            />
            <div className="relative">
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-200"
              >
                {t.home.ctaLabel}
              </motion.p>
              <motion.h2
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mb-4 text-3xl font-extrabold text-white sm:text-4xl"
              >
                {t.home.ctaTitle}
              </motion.h2>
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mb-8 text-base text-violet-100 sm:text-lg"
              >
                {t.home.ctaSub}
              </motion.p>
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/submit"
                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-sm font-semibold text-violet-700 shadow-lg transition hover:bg-violet-50"
                  >
                    {t.home.ctaSubmit}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/browse"
                    className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/15 px-8 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
                  >
                    {t.home.ctaBrowse}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
