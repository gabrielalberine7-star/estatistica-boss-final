import { useEffect, useMemo, useState } from "react";
import Badge from "../components/Badge";
import { bossQuiz } from "../data/quiz";
import { useAuth } from "../lib/AuthContext";
import { getBestQuizScore, saveQuizScore, type QuizScore } from "../services/quizService";

function getRanking(score: number) {
  if (score <= 3) return "Hollow estatístico";
  if (score <= 6) return "Sobreviveu ao tutorial";
  if (score <= 8) return "Matador de miniboss";
  return "Gabaritou o Boss Final";
}

export default function BossFinalQuiz() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [bestScore, setBestScore] = useState<QuizScore | null>(null);
  const [error, setError] = useState("");

  const score = useMemo(
    () => bossQuiz.reduce((sum, question) => sum + (answers[question.id] === question.answerIndex ? 1 : 0), 0),
    [answers]
  );

  useEffect(() => {
    if (!user) return;
    getBestQuizScore(user.id)
      .then(setBestScore)
      .catch(() => undefined);
  }, [user]);

  async function finishQuiz() {
    if (!user) return;
    setFinished(true);
    if (saved) return;

    try {
      await saveQuizScore(user.id, "boss-final", score, bossQuiz.length);
      const best = await getBestQuizScore(user.id);
      setBestScore(best);
      setSaved(true);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar simulado.");
    }
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p>Simulado</p>
        <h1>Simulado Boss Final</h1>
      </div>

      <div className="quiz-summary">
        <div>
          <span>Questões respondidas</span>
          <strong>{Object.keys(answers).length}/{bossQuiz.length}</strong>
        </div>
        <div>
          <span>Melhor pontuação</span>
          <strong>{bestScore ? `${bestScore.score}/${bestScore.max_score}` : "Sem tentativa"}</strong>
        </div>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="boss-question-list">
        {bossQuiz.map((question, index) => {
          const selected = answers[question.id];
          const answered = selected !== undefined;
          return (
            <article className="boss-question" key={question.id}>
              <div className="card-topline">
                <Badge tone="gold">Questão {index + 1}</Badge>
                <Badge tone="blue">{question.topic}</Badge>
              </div>
              <h2>{question.statement}</h2>
              <div className="choice-grid">
                {question.choices.map((choice, choiceIndex) => {
                  const isCorrect = choiceIndex === question.answerIndex;
                  const className = answered
                    ? isCorrect
                      ? "choice choice-correct"
                      : selected === choiceIndex
                        ? "choice choice-wrong"
                        : "choice"
                    : "choice";

                  return (
                    <button
                      key={choice}
                      className={className}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, [question.id]: choiceIndex }))}
                    >
                      <strong>{String.fromCharCode(65 + choiceIndex)}</strong>
                      <span>{choice}</span>
                    </button>
                  );
                })}
              </div>
              {answered ? <p className="feedback-text">{question.explanation}</p> : null}
            </article>
          );
        })}
      </div>

      <div className="final-score-panel">
        <button className="button button-primary button-large" type="button" onClick={finishQuiz}>
          Finalizar e salvar pontuação
        </button>
        {finished ? (
          <div>
            <p className="eyebrow">Pontuação final</p>
            <h2>{score}/{bossQuiz.length}</h2>
            <strong>{getRanking(score)}</strong>
            <p>{saved ? "Nota salva no Supabase." : "Se aparecer erro acima, confira conexão e policies."}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
