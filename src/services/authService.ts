import { requireSupabaseConfig, supabase } from "../lib/supabase";

function friendlyAuthError(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("invalid email")) return "E-mail inválido. Confira se ele está escrito completo.";
  if (lower.includes("password") && lower.includes("weak")) return "Senha fraca. Use pelo menos 6 caracteres.";
  if (lower.includes("already") || lower.includes("registered")) return "Essa conta já existe. Tente entrar ou recuperar a senha.";
  if (lower.includes("invalid login") || lower.includes("credentials")) return "Login incorreto. Confira e-mail e senha.";
  if (lower.includes("fetch") || lower.includes("network")) return "Sem conexão com o Supabase. Tente novamente em instantes.";

  return message || "Não consegui completar a ação. Tente novamente.";
}

export async function signUp(email: string, password: string) {
  requireSupabaseConfig();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(friendlyAuthError(error.message));
  return data;
}

export async function signIn(email: string, password: string) {
  requireSupabaseConfig();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(friendlyAuthError(error.message));
  return data;
}

export async function signOut() {
  requireSupabaseConfig();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(friendlyAuthError(error.message));
}

export async function getCurrentUser() {
  requireSupabaseConfig();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(friendlyAuthError(error.message));
  return data.user;
}

export async function resetPassword(email: string) {
  requireSupabaseConfig();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`
  });
  if (error) throw new Error(friendlyAuthError(error.message));
  return data;
}
