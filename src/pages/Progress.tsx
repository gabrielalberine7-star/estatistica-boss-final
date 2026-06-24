import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { modules } from "../data/modules";
import { useAuth } from "../lib/AuthContext";
import { getUserProgress, getUserStats, type UserProgress, type UserStats } from "../services/progressService";
import { getQuizHistory, type QuizScore } from "../services/quizService";

export default function Progress() {
  const { user } = useAuth();
  const [progressRows, setProgressRows] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [history, setHistory] = useState<QuizScore[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    Promise.all([getUserProgress(user.id), getUserStats(user.id), getQuizHistory(user.id)])
      .then(([progress, userStats, quizHistory]) => {
        setProgressRows(progress);
        setStats(userStats);
        setHistory(quizHistory);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Erro ao carregar perfil."));
  }, [user]);

  const progressMap = useMemo(() => new Map(progressRows.map((row) => [row.module_id, row])), [progressRows]);
  const completed = modules.filter((module) => progressMap.get(module.id)?.completed);
  const pending = modules.filter((module) => !progressMap.get(module.id)?.completed);
  const totalProgress = Math.round(modules.reduce((sum, module) => sum + (progressMap.get(module.id)?.progress_percent ?? 0), 0) / modules.length);
  const lastModule = modules.find((module) => module.id === stats?.last_accessed_module) ?? modules[0];

  return (
    <section className="page-section">
      <div className="section-heading">
        <p>Perfil de estudo</p>
        <h1>Progresso</h1>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="profile-grid">
        <article className="profile-card wide">
          <span>E-mail</span>
          <strong>{user?.email}</strong>
          <ProgressBar value={totalProgress} label="Progresso total" />
          <Link className="button button-primary" to={`/modulos/${lastModule.id}`}>
            Continuar estudando
          </Link>
        </article>
        <article className="profile-card">
          <span>Módulos concluídos</span>
          <strong>{completed.length}</strong>
        </article>
        <article className="profile-card">
          <span>Módulos pendentes</span>
          <strong>{pending.length}</strong>
        </article>
        <article className="profile-card">
          <span>Exercícios acertados</span>
          <strong>{stats?.total_exercises_correct ?? 0}</strong>
        </article>
        <article className="profile-card">
          <span>Exercícios errados</span>
          <strong>{stats?.total_exercises_wrong ?? 0}</strong>
        </article>
        <article className="profile-card">
          <span>Melhor Boss Final</span>
          <strong>{stats?.best_boss_score ?? 0}/10</strong>
        </article>
        <article className="profile-card">
          <span>Último módulo acessado</span>
          <strong>{lastModule.title}</strong>
        </article>
      </div>

      <div className="two-column">
        <section className="content-panel">
          <h2>Módulos concluídos</h2>
          <ul className="clean-list">
            {completed.length ? completed.map((module) => <li key={module.id}>{module.title}</li>) : <li>Nenhum módulo concluído ainda.</li>}
          </ul>
        </section>
        <section className="content-panel">
          <h2>Módulos pendentes</h2>
          <ul className="clean-list">
            {pending.map((module) => (
              <li key={module.id}>{module.title}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="section-heading align-left">
        <p>Histórico</p>
        <h2>Simulados Boss Final</h2>
      </div>
      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Pontuação</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {history.length ? (
              history.map((score) => (
                <tr key={score.id}>
                  <td>{new Date(score.created_at).toLocaleString("pt-BR")}</td>
                  <td>{score.score}</td>
                  <td>{score.max_score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Nenhum simulado feito ainda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
