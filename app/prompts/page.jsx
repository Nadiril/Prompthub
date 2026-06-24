"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getPrompts, createPrompt, updatePrompt, deletePrompt } from "../../lib/queries/prompts";
import PromptsTable from "../../components/PromptsTable";
import { useLang } from "../../lib/i18n";

const emptyForm = {
  title: "",
  content: "",
  ai_tool: "",
  user_id: "",
};

export default function PromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const { t } = useLang();

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = async () => {
    setLoading(true);
    const { data } = await getPrompts();
    if (data) setPrompts(data);
    setLoading(false);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const payload = {
        title: formData.title,
        content: formData.content,
        ai_tool: formData.ai_tool,
        user_id: formData.user_id || null,
      };

      let result;
      if (editingPrompt) {
        result = await updatePrompt(editingPrompt.id, payload);
        if (result.data) {
          setPrompts((prev) => prev.map((p) => (p.id === result.data.id ? result.data : p)));
        }
      } else {
        result = await createPrompt(payload);
        if (result.data) {
          setPrompts((prev) => [result.data, ...prev]);
        }
      }
      setFormData(emptyForm);
      setEditingPrompt(null);
    },
    [editingPrompt, formData]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (typeof window !== "undefined" && confirm("Are you sure you want to delete this prompt?")) {
        await deletePrompt(id);
        setPrompts((prev) => prev.filter((p) => p.id !== id));
        if (editingPrompt?.id === id) {
          setEditingPrompt(null);
          setFormData(emptyForm);
        }
      }
    },
    [editingPrompt]
  );

  const handleEdit = useCallback((prompt) => {
    setEditingPrompt(prompt);
    setFormData({
      title: prompt.title || "",
      content: prompt.content || "",
      ai_tool: prompt.ai_tool || "",
      user_id: prompt.user_id || "",
    });
  }, []);

  const handleCancel = () => {
    setEditingPrompt(null);
    setFormData(emptyForm);
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-3xl font-bold text-white"
        >
          Prompts Management
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-violet-500/50 focus:outline-none"
                placeholder="Enter prompt title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">AI Tool</label>
              <input
                type="text"
                required
                value={formData.ai_tool}
                onChange={(e) => setFormData({ ...formData, ai_tool: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-violet-500/50 focus:outline-none"
                placeholder="e.g. ChatGPT, Claude"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">User ID (optional)</label>
              <input
                type="text"
                value={formData.user_id}
                onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-violet-500/50 focus:outline-none"
                placeholder="UUID from profiles"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Content</label>
              <textarea
                required
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-violet-500/50 focus:outline-none"
                placeholder="Enter prompt content"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
            >
              {editingPrompt ? "Update Prompt" : "Create Prompt"}
            </button>
            {editingPrompt && (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/10"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.form>

        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-r-transparent" />
          </div>
        ) : (
          <PromptsTable prompts={prompts} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
