"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useLang } from "../../lib/i18n";
import Link from "next/link";

export default function RegisterPage() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Check your email for confirmation link!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a12] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/3 p-8"
      >
        <h1 className="mb-6 text-2xl font-bold text-white">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-violet-500/50 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-violet-500/50 focus:outline-none"
              placeholder="Min 6 characters"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <Link href="/login" className="mt-4 block text-center text-sm text-violet-400 hover:text-violet-300">
          Sudah punya akun? Masuk
        </Link>
      </motion.div>
    </div>
  );
}