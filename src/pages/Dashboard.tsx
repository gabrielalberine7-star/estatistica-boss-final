import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";
import { modules } from "../data/modules";
import { useAuth } from "../lib/AuthContext";
import { getUserProgress, getUserStats, type UserProgress, type UserStats } from "../services/progressService";

export default function Dashboard() {
  const { user } = useAuth();
  const [progressRows, setProgressRows] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    let active = true;
    setLoading(true);
    Promise.all([getUserProgress(user.id), getUserStats(user.id)])
      .then(([progress, userStats]) => {
        if (!active) return;
        setProgressRows(progress);
        setStats(userStats);
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Erro ao carregar dashboard.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const progressMap = useMemo(
    () => new Map(progressRows.map((row) => [row.module_id, row.progress_percent])),
    [progressRows]
  );
  const totalProgress = Math.round(modules.reduce((sum, module) => sum + (progressMap.get(module.id) ?? 0), 0) / modules.length);
  const completedModules = progressRows.filter((row) => row.completed).length;
  const continueModuleId = stats?.last_accessed_module ?? modules.find((module) => (progressMap.get(module.id) ?? 0) < 100)?.id ?? modules[0].id;

  return (
    <section className="page-section">
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Dashboard do curso</p>
          <h1>Olá, {user?.email}</h1>
          <p>Calma, isso parece feitiçaria, mas é só tradução. Antes de calcular, descubra o tipo da questão.</p>
        </div>
        <div className="dashboard-actions">
          <Link className="button button-primary" to={`/modulos/${continueModuleId}`}>
            Continuar de onde parei
          </Link>
          <Link className="button button-secondary" to="/revisao">
            Revisão de 10 minutos
          </Link>
          <Link className="button button-ghost" to="/simulado">
            Simulado Boss Final
          </Link>
        </div>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      {loading ? <div className="loading-card">Carregando progresso...</div> : null}

      <div className="stats-grid">
        <article className="stat-card wide">
          <span>Porcentagem total do curso</span>
          <strong>{totalProgress}%</strong>
          <ProgressBar value={totalProgress} label="Curso total" />
        </article>
        <article className="stat-card">
          <span>Módulos concluídos</span>
          <strong>{completedModules}</strong>
        </article>
        <article className="stat-card">
          <span>Exercícios acertados</span>
          <strong>{stats?.total_exercises_correct ?? 0}</strong>
        </article>
        <article className="stat-card">
          <span>Exercícios errados</span>
          <strong>{stats?.total_exercises_wrong ?? 0}</strong>
        </article>
        <article className="stat-card">
          <span>Melhor Boss Final</span>
          <strong>{stats?.best_boss_score ?? 0}/10</strong>
        </article>
        <article className="stat-card">
          <span>Último módulo</span>
          <strong>{modules.find((module) => module.id === stats?.last_accessed_module)?.title ?? "Comece a jornada"}</strong>
        </article>
      </div>

      <div className="section-heading align-left">
        <p>20 fases</p>
        <h2>Módulos do curso</h2>
      </div>
      <div className="course-grid">
        {modules.map((module) => (
          <CourseCard key={module.id} module={module} progress={progressMap.get(module.id) ?? 0} />
        ))}
      </div>
    </section>
  );
}
