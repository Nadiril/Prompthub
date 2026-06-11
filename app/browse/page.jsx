"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PromptCard from "../../components/PromptCard";
import { prompts, categories } from "../../data/prompts";
import { useLang } from "../../lib/i18n";
import { fadeUp, staggerFast, pageTransition } from "../../components/AnimationVariants";

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLang();

  // Translate "All" key for active category matching
  const activeCategoryKey = activeCategory;

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchesCategory = activeCategoryKey === "All" || p.category === activeCategoryKey;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryKey, searchQuery]);

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-[#0a0a12]"
    >
      {/* Page header */}
      <div className="border-b border-white/5 bg-[#0a0a12]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="mb-2 text-4xl font-extrabold text-white">
              {t.browse.title}
            </h1>
            <p className="text-zinc-500">
              {t.browse.subtitle(prompts.length, categories.length - 1)}
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="relative mt-6 max-w-xl"
          >
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="search"
              placeholder={t.browse.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
            />
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Category filter pills — use English keys for data matching, display translated */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeUp}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "text-white"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
              }`}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-violet-600"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{t.categories[cat] ?? cat}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Results count */}
        <motion.p
          key={`${activeCategory}-${searchQuery}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mb-6 text-sm text-zinc-500"
        >
          {filtered.length === 0
            ? t.browse.noPrompts
            : t.browse.showing(filtered.length)}
          {activeCategory !== "All" && t.browse.inCategory(t.categories[activeCategory] ?? activeCategory)}
          {searchQuery && t.browse.forQuery(searchQuery)}
        </motion.p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              variants={staggerFast}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filtered.map((prompt) => (
                <motion.div key={prompt.id} variants={fadeUp} layout>
                  <PromptCard prompt={prompt} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-4 text-5xl"
              >
                🔍
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {t.browse.noPrompts}
              </h3>
              <p className="mb-6 text-sm text-zinc-500">
                {t.browse.tryDifferent}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                {t.browse.clearFilters}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
