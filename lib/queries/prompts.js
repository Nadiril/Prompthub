import { supabase } from "../supabase";

export async function getPrompts() {
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function getPrompt(id) {
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function createPrompt(prompt) {
  const { data, error } = await supabase
    .from("prompts")
    .insert(prompt)
    .select()
    .single();
  return { data, error };
}

export async function updatePrompt(id, updates) {
  const { data, error } = await supabase
    .from("prompts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function deletePrompt(id) {
  const { error } = await supabase.from("prompts").delete().eq("id", id);
  return { error };
}
