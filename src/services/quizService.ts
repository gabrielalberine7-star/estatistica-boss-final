import { requireSupabaseConfig, supabase } from "../lib/supabase";
import { getUserStats } from "./progressService";

export type QuizScore = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  max_score: number;
  created_at: string;
};

export async function saveQuizScore(userId: string, quizId: string, score: number, maxScore: number) {
  requireSupabaseConfig();
  const { error } = await supabase.from("quiz_scores").insert({
    user_id: userId,
    quiz_id: quizId,
    score,
    max_score: maxScore
  });

  if (error) throw new Error("Erro ao salvar pontuação do simulado.");

  const stats = await getUserStats(userId);
  if (score > stats.best_boss_score) {
    const { error: updateError } = await supabase
      .from("user_stats")
      .update({ best_boss_score: score, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (updateError) throw new Error("Pontuação salva, mas não consegui atualizar o recorde.");
  }
}

export async function getBestQuizScore(userId: string, quizId = "boss-final") {
  requireSupabaseConfig();
  const { data, error } = await supabase
    .from("quiz_scores")
    .select("*")
    .eq("user_id", userId)
    .eq("quiz_id", quizId)
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error("Erro ao carregar melhor nota.");
  return data as QuizScore | null;
}

export async function getQuizHistory(userId: string, quizId = "boss-final") {
  requireSupabaseConfig();
  const { data, error } = await supabase
    .from("quiz_scores")
    .select("*")
    .eq("user_id", userId)
    .eq("quiz_id", quizId)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Erro ao carregar histórico de simulados.");
  return (data ?? []) as QuizScore[];
}
