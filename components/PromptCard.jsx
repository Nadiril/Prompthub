"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { truncate } from "../lib/utils";
import { useLang } from "../lib/i18n";

export default function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLang();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
    } catch {
      const el = document.createElement("textarea");
      el.value = prompt.content;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryLabel = t.categories[prompt.category] ?? prompt.category;

  return (
    <motion.article
      layout
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      className="group relative flex flex-col rounded-2xl border border-white/5 bg-white/3 p-5 transition hover:border-violet-500/25 hover:bg-violet-500/5"
    >
      {prompt.featured && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 400 }}
          className="absolute right-4 top-4 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400"
        >
          {t.card.featured}
        </motion.span>
      )}

      <span className="mb-3 inline-flex w-fit items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400">
        {categoryLabel}
      </span>

      <h3 className="mb-2 text-base font-semibold text-white">
        {prompt.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500">
        {truncate(prompt.description, 110)}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-xs text-zinc-500"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            {prompt.likes}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {prompt.uses.toLocaleString("en-US")} {t.card.uses}
          </span>
        </div>

        <motion.button
          onClick={handleCopy}
          aria-label="Copy prompt"
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            copied
              ? "border border-green-500/20 bg-green-500/10 text-green-400"
              : "border border-white/5 bg-white/5 text-zinc-400 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-1.5"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.card.copied}
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-1.5"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t.card.copy}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.article>
  );
}
