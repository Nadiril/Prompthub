"use client";

import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const rowFade = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function PromptsTable({ prompts, onEdit, onDelete }) {
  if (!prompts || prompts.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-zinc-400">No prompts found</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-xl"
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/10">
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-violet-300">Title</th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-violet-300">AI Tool</th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-violet-300">User ID</th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-violet-300">Created At</th>
            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-violet-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prompts.map((prompt, index) => (
            <motion.tr
              key={prompt.id}
              variants={rowFade}
              className="group border-b border-white/5 last:border-0 transition-colors duration-200 hover:bg-violet-500/10"
              style={{ transitionDelay: `${index * 5}ms` }}
            >
              <td className="px-5 py-4 text-sm font-medium text-white">{prompt.title}</td>
              <td className="px-5 py-4 text-sm text-zinc-300">{prompt.ai_tool}</td>
              <td className="px-5 py-4 font-mono text-xs text-zinc-400">
                {prompt.user_id ? prompt.user_id.slice(0, 8) : "-"}
              </td>
              <td className="px-5 py-4 text-sm text-zinc-400">
                {new Date(prompt.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <button
                    onClick={() => onEdit?.(prompt)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-violet-300 transition hover:bg-violet-500/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(prompt.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
