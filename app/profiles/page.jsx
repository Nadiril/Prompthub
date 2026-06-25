"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getMyProfile, updateProfile } from "../../lib/queries/profiles";
import { useAuth } from "../../lib/auth-context";
import { useLang } from "../../lib/i18n";

export default function ProfilesPage() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({ username: "" });

  useEffect(() => {
    if (!authLoading && user) {
      setLoading(true);
      getMyProfile(user.id).then(({ data }) => {
        if (data) setFormData({ username: data.username || "" });
        setLoading(false);
      });
    }
  }, [authLoading, user]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError("");
    setSuccess("");
    const { data } = await updateProfile(user.id, formData);
    setSaving(false);
    if (data) {
      setSuccess("Profile updated!");
    }
  }, [user, formData]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a12]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-r-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a12] px-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">My Profile</h1>
          <p className="text-zinc-400 mb-4">Please log in to view your profile.</p>
          <a href="/login" className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700">
            {t.nav.login}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] py-20">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-3xl font-bold text-white"
        >
          My Profile
        </motion.h1>

        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-r-transparent" />
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-zinc-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-violet-500/50 focus:outline-none"
                placeholder="Enter your username"
              />
            </div>

            {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
            {success && <p className="mb-4 text-sm text-green-400">{success}</p>}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}