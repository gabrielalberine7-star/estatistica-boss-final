import { useEffect, useMemo, useState } from "react";
import Badge from "../components/Badge";
import { exerciseCategories, exercises } from "../data/exercises";
import type { Difficulty, ExerciseCategory } from "../data/types";
import { useAuth } from "../lib/AuthContext";
import { getExerciseAttempts, saveExerciseAttempt, type ExerciseAttempt } from "../services/exerciseService";

type DifficultyFilter = "Todos" | Exclude<Difficulty, "Boss">;
type CategoryFilter = "Todos" | ExerciseCategory;

export default function Exercises() {
  const { user } = useAuth();
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("Todos");
  const [category, setCategory] = useState<CategoryFilter>("Todos");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visibleHints, setVisibleHints] = useState<Record<string, boolean>>({});
  const [visibleSolutions, setVisibleSolutions] = useState<Record<string, boolean>>({});
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    getExerciseAttempts(user.id)
      .then(setAttempts)
      .catch((err) => setError(err instanceof Error ? err.message : "Erro ao carregar exercícios."));
  }, [user]);

  const attemptMap = useMemo(() => new Map(attempts.map((attempt) => [attempt.exercise_id, attempt])), [attempts]);
  const filteredExercises = exercises.filter((exercise) => {
    const difficultyMatch = difficulty === "Todos" || exercise.difficulty === difficulty;
    const categoryMatch = category === "Todos" || exercise.category === category;
    return difficultyMatch && categoryMatch;
  });

  async function markAttempt(exerciseId: string, isCorrect: boolean) {
    if (!user) return;
    setMessage("");
    setError("");

    try {
      await saveExerciseAttempt(user.id, exerciseId, isCorrect);
      const nextAttempts = await getExerciseAttempts(user.id);
      setAttempts(nextAttempts);
      setMessage(isCorrect ? "Acerto salvo no Supabase." : "Erro salvo. Esse ponto entrou na sua revisão.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar exercício.");
    }
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p>Treino guiado</p>
        <h1>Exercícios interativos</h1>
      </div>

      <div className="filters-bar">
        <label>
          Dificuldade
          <select value={difficulty} onChange={(event) => setDifficulty(event.target.value as DifficultyFilter)}>
            <option>Todos</option>
            <option>Fácil</option>
            <option>Médio</option>
            <option>Difícil</option>
          </select>
        </label>
        <label>
          Assunto
          <select value={category} onChange={(event) => setCategory(event.target.value as CategoryFilter)}>
            <option>Todos</option>
            {exerciseCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      {message ? <p className="form-success">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      <div className="exercise-list">
        {filteredExercises.map((exercise) => {
          const attempt = attemptMap.get(exercise.id);
          return (
            <article className="exercise-card" key={exercise.id}>
              <div className="card-topline">
                <Badge tone={exercise.difficulty === "Fácil" ? "green" : exercise.difficulty === "Médio" ? "blue" : "danger"}>
                  {exercise.difficulty}
                </Badge>
                <Badge tone="purple">{exercise.category}</Badge>
                {attempt ? <Badge tone={attempt.is_correct ? "green" : "danger"}>{attempt.is_correct ? "Você acertou" : "Você errou"}</Badge> : null}
              </div>
              <h2>{exercise.title}</h2>
              <p>{exercise.statement}</p>
              <label>
                Sua resposta
                <input
                  value={answers[exercise.id] ?? ""}
                  onChange={(event) => setAnswers((current) => ({ ...current, [exercise.id]: event.target.value }))}
                  placeholder="Digite sua conta ou resposta final"
                />
              </label>
              <div className="button-row">
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => setVisibleHints((current) => ({ ...current, [exercise.id]: !current[exercise.id] }))}
                >
                  Ver dica
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => setVisibleSolutions((current) => ({ ...current, [exercise.id]: !current[exercise.id] }))}
                >
                  Ver resolução
                </button>
                <button className="button button-primary" type="button" onClick={() => markAttempt(exercise.id, true)}>
                  Marcar como acertei
                </button>
                <button className="button button-danger" type="button" onClick={() => markAttempt(exercise.id, false)}>
                  Marcar como errei
                </button>
              </div>
              {visibleHints[exercise.id] ? <p className="hint-box">{exercise.hint}</p> : null}
              {visibleSolutions[exercise.id] ? (
                <div className="solution-box">
                  <h3>Resolução completa</h3>
                  <ol>
                    <li><strong>Assunto:</strong> {exercise.solution.subject}</li>
                    <li><strong>Tradução:</strong> {exercise.solution.translation}</li>
                    <li><strong>Fórmula:</strong> {exercise.solution.formula}</li>
                    <li><strong>Por que serve:</strong> {exercise.solution.why}</li>
                    <li><strong>Substituição:</strong> {exercise.solution.substitution}</li>
                    <li><strong>Conta:</strong> {exercise.solution.calculation}</li>
                    <li><strong>Resposta final:</strong> {exercise.solution.finalAnswer}</li>
                    <li><strong>Pegadinha:</strong> {exercise.solution.trap}</li>
                  </ol>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
