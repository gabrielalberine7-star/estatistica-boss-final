import { requireSupabaseConfig, supabase } from "../lib/supabase";
import { recomputeLearningStats } from "./progressService";

export type ExerciseAttempt = {
  id: string;
  user_id: string;
  exercise_id: string;
  is_correct: boolean;
  attempts: number;
  updated_at: string;
};

export async function getExerciseAttempts(userId: string) {
  requireSupabaseConfig();
  const { data, error } = await supabase
    .from("exercise_attempts")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw new Error("Erro ao carregar tentativas.");
  return (data ?? []) as ExerciseAttempt[];
}

export async function saveExerciseAttempt(userId: string, exerciseId: string, isCorrect: boolean) {
  requireSupabaseConfig();

  const { data: existing, error: existingError } = await supabase
    .from("exercise_attempts")
    .select("attempts")
    .eq("user_id", userId)
    .eq("exercise_id", exerciseId)
    .maybeSingle();

  if (existingError) throw new Error("Erro ao salvar exercício.");

  const { error } = await supabase.from("exercise_attempts").upsert(
    {
      user_id: userId,
      exercise_id: exerciseId,
      is_correct: isCorrect,
      attempts: (existing?.attempts ?? 0) + 1,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,exercise_id" }
  );

  if (error) throw new Error("Erro ao salvar exercício.");
  return recomputeLearningStats(userId);
}
