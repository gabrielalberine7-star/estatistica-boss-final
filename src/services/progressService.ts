import { modules } from "../data/modules";
import { requireSupabaseConfig, supabase } from "../lib/supabase";

export type UserProgress = {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  progress_percent: number;
  updated_at: string;
};

export type UserStats = {
  id: string;
  user_id: string;
  total_modules_completed: number;
  total_exercises_correct: number;
  total_exercises_wrong: number;
  best_boss_score: number;
  last_accessed_module: string | null;
  updated_at: string;
};

type StatsPatch = Partial<
  Pick<
    UserStats,
    | "total_modules_completed"
    | "total_exercises_correct"
    | "total_exercises_wrong"
    | "best_boss_score"
    | "last_accessed_module"
  >
>;

export async function getUserProgress(userId: string) {
  requireSupabaseConfig();
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw new Error("Erro ao carregar progresso.");
  return (data ?? []) as UserProgress[];
}

export async function getUserStats(userId: string) {
  requireSupabaseConfig();
  const { data, error } = await supabase.from("user_stats").select("*").eq("user_id", userId).maybeSingle();

  if (error) throw new Error("Erro ao carregar estatísticas.");
  if (data) return data as UserStats;

  const { data: created, error: createError } = await supabase
    .from("user_stats")
    .insert({ user_id: userId })
    .select("*")
    .single();

  if (createError || !created) throw new Error("Erro ao criar estatísticas do usuário.");
  return created as UserStats;
}

async function saveStats(userId: string, patch: StatsPatch) {
  const payload = {
    user_id: userId,
    ...patch,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from("user_stats").upsert(payload, { onConflict: "user_id" }).select("*").single();
  if (error || !data) throw new Error("Erro ao salvar estatísticas.");
  return data as UserStats;
}

export async function recomputeLearningStats(userId: string, patch: StatsPatch = {}) {
  requireSupabaseConfig();

  const [progressResult, attemptsResult] = await Promise.all([
    supabase.from("user_progress").select("completed").eq("user_id", userId),
    supabase.from("exercise_attempts").select("is_correct").eq("user_id", userId)
  ]);

  if (progressResult.error || attemptsResult.error) throw new Error("Erro ao atualizar estatísticas.");

  const totalModulesCompleted = (progressResult.data ?? []).filter((row) => row.completed).length;
  const totalExercisesCorrect = (attemptsResult.data ?? []).filter((row) => row.is_correct).length;
  const totalExercisesWrong = (attemptsResult.data ?? []).filter((row) => !row.is_correct).length;

  return saveStats(userId, {
    total_modules_completed: totalModulesCompleted,
    total_exercises_correct: totalExercisesCorrect,
    total_exercises_wrong: totalExercisesWrong,
    ...patch
  });
}

export async function updateModuleProgress(userId: string, moduleId: string, progressPercent: number) {
  requireSupabaseConfig();
  const normalizedProgress = Math.max(0, Math.min(100, Math.round(progressPercent)));

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      module_id: moduleId,
      progress_percent: normalizedProgress,
      completed: normalizedProgress >= 100,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,module_id" }
  );

  if (error) throw new Error("Erro ao salvar progresso.");
  return recomputeLearningStats(userId, { last_accessed_module: moduleId });
}

export async function markModuleCompleted(userId: string, moduleId: string) {
  return updateModuleProgress(userId, moduleId, 100);
}

export async function updateLastAccessedModule(userId: string, moduleId: string) {
  requireSupabaseConfig();
  const exists = modules.some((module) => module.id === moduleId);
  if (!exists) return getUserStats(userId);

  return saveStats(userId, { last_accessed_module: moduleId });
}
