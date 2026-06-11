"use client";

import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const rowFade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ProfilesTable({ profiles, onEdit, onDelete }) {
  if (!profiles || profiles.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-zinc-400">No profiles found</p>
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
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-violet-300">ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-violet-300">Username</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-violet-300">Email</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-violet-300">Created At</th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-violet-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <motion.tr
              key={profile.id}
              variants={rowFade}
              className="group border-b border-white/5 last:border-0 transition-colors hover:bg-violet-500/10"
              style={{ transitionDelay: `${index * 5}ms` }}
            >
              <td className="px-6 py-4 font-mono text-sm text-zinc-300">{profile.id.slice(0, 8)}...</td>
              <td className="px-6 py-4 text-sm text-white">{profile.username || "-"}</td>
              <td className="px-6 py-4 text-sm text-zinc-300">{profile.email || "-"}</td>
              <td className="px-6 py-4 text-sm text-zinc-400">
                {new Date(profile.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => onEdit?.(profile)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-violet-300 hover:bg-violet-500/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(profile.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20"
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