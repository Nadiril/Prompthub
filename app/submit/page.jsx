"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data/prompts";
import { useLang } from "../../lib/i18n";
import { fadeUp, staggerContainer, scaleIn, pageTransition } from "../../components/AnimationVariants";
import { supabase } from "../../lib/supabase";

const categoryOptions = categories.filter((c) => c !== "All");

const initialForm = {
  title: "",
  category: "",
  description: "",
  content: "",
  tags: "",
  author: "",
};

export default function SubmitPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dbError, setDbError] = useState(null);
  const { t } = useLang();
  const s = t.submit;

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = s.errors.titleRequired;
    if (!form.category) e.category = s.errors.categoryRequired;
    if (!form.description.trim()) e.description = s.errors.descriptionRequired;
    if (form.description.trim().length < 20) e.description = s.errors.descriptionShort;
    if (!form.content.trim()) e.content = s.errors.contentRequired;
    if (form.content.trim().length < 30) e.content = s.errors.contentShort;
    if (!form.author.trim()) e.author = s.errors.authorRequired;
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (dbError) setDbError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setSubmitting(true);
    setDbError(null);
    const { error: insertError } = await supabase
      .from("prompts")
      .insert({
        title: form.title,
        description: form.description,
        content: form.content,
        ai_tool: form.category,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      })
      .select()
      .single();
    setSubmitting(false);
    if (insertError) {
      setDbError(insertError.message);
      console.error("Insert error:", insertError);
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setDbError(null);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-[#0a0a12]"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          /* ── Success state ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="flex min-h-[70vh] items-center justify-center px-4"
          >
            <div className="w-full max-w-md rounded-3xl border border-white/5 bg-white/3 p-10 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl"
              >
                ✅
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-3 text-2xl font-bold text-white"
              >
                {s.successTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8 text-zinc-400"
              >
                {s.successMsg(form.title)}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3 sm:flex-row sm:justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleReset}
                  className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  {s.submitAnother}
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="/browse"
                  className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/10"
                >
                  {s.browsePrompts}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Header */}
            <div className="border-b border-white/5 bg-[#0a0a12]">
              <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  <motion.h1 variants={fadeUp} className="mb-2 text-4xl font-extrabold text-white">
                    {s.title}
                  </motion.h1>
                  <motion.p variants={fadeUp} className="text-zinc-500">
                    {s.subtitle}
                  </motion.p>
                </motion.div>
              </div>
            </div>

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
              {dbError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
                >
                  <strong>Database error:</strong> {dbError}
                </motion.div>
              )}

              <motion.form
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-white/5 bg-white/3 p-8"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={fadeUp}>
                    <Field label={s.fields.title} error={errors.title} required>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder={s.fields.titlePlaceholder}
                        className={inputClass(errors.title)}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Field label={s.fields.category} error={errors.category} required>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className={inputClass(errors.category)}
                      >
                        <option value="">{s.fields.categoryPlaceholder}</option>
                        {categoryOptions.map((cat) => (
                          <option key={cat} value={cat}>
                            {t.categories[cat] ?? cat}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Field label={s.fields.description} error={errors.description} required>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder={s.fields.descriptionPlaceholder}
                        className={inputClass(errors.description)}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Field label={s.fields.content} error={errors.content} required>
                      <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        rows={6}
                        placeholder={s.fields.contentPlaceholder}
                        className={`font-mono text-sm ${inputClass(errors.content)}`}
                      />
                      <p className="mt-1.5 text-xs text-zinc-500">
                        {s.fields.contentHint}
                      </p>
                    </Field>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Field label={s.fields.tags} hint={s.fields.tagsHint}>
                      <input
                        type="text"
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder={s.fields.tagsPlaceholder}
                        className={inputClass()}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Field label={s.fields.author} error={errors.author} required>
                      <input
                        type="text"
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        placeholder={s.fields.authorPlaceholder}
                        className={inputClass(errors.author)}
                      />
                    </Field>
                  </motion.div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end"
                >
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/10"
                  >
                    {s.clear}
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.03 }}
                    whileTap={{ scale: submitting ? 1 : 0.97 }}
                    className="rounded-xl bg-violet-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : s.submitBtn}
                  </motion.button>
                </motion.div>
              </motion.form>

              {/* Tips */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6"
              >
                <h3 className="mb-3 text-sm font-semibold text-violet-300">
                  {s.tipsTitle}
                </h3>
                <ul className="space-y-1.5 text-sm text-violet-400/80">
                  {s.tips.map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Helpers ── */

function inputClass(error) {
  return [
    "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition",
    "bg-white/5 text-white placeholder-zinc-500",
    "focus:bg-white/8 focus:ring-2",
    error
      ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
      : "border-white/10 focus:border-violet-500/60 focus:ring-violet-500/20",
  ].join(" ");
}

function Field({ label, children, error, hint, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-300">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
