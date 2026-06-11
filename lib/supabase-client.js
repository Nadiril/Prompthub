"use client";

import { useEffect } from "react";
import { supabase } from "./supabase";

export function useSupabaseConnection() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (!error) {
          console.log("✓ Next.js connected to Supabase successfully");
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
      }
    };
    testConnection();
  }, []);
}

export { supabase };