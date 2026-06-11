"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getProfiles, createProfile, updateProfile, deleteProfile } from "../../lib/queries/profiles";
import ProfilesTable from "../../components/ProfilesTable";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    getProfiles().then(({ data }) => {
      if (data) setProfiles(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (editingProfile) {
      const { data } = await updateProfile(editingProfile.id, formData);
      if (data) setProfiles((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    } else {
      const { data } = await createProfile(formData);
      if (data) setProfiles((prev) => [data, ...prev]);
    }
    setFormData({ username: "", email: "" });
    setEditingProfile(null);
  }, [editingProfile, formData]);

  const handleDelete = useCallback(async (id) => {
    if (confirm("Are you sure?")) {
      await deleteProfile(id);
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    }
  }, []);

  const handleEdit = useCallback((profile) => {
    setEditingProfile(profile);
    setFormData({ username: profile.username || "", email: profile.email || "" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a12] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-3xl font-bold text-white"
        >
          Profiles Management
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-violet-500/50 focus:outline-none"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-violet-500/50 focus:outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
          >
            {editingProfile ? "Update Profile" : "Create Profile"}
          </button>
          {editingProfile && (
            <button
              type="button"
              onClick={() => {
                setEditingProfile(null);
                setFormData({ username: "", email: "" });
              }}
              className="ml-3 rounded-lg border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/10"
            >
              Cancel
            </button>
          )}
        </motion.form>

        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-r-transparent" />
          </div>
        ) : (
          <ProfilesTable profiles={profiles} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}