"use client";

import { motion } from "framer-motion";
import { useLang } from "../lib/i18n";

export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 p-0.5">
      {["en", "id"].map((l) => (
        <motion.button
          key={l}
          onClick={() => setLang(l)}
          whileTap={{ scale: 0.93 }}
          className={`relative rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
            lang === l
              ? "text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-md bg-violet-600"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{l}</span>
        </motion.button>
      ))}
    </div>
  );
}
