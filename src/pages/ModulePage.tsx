import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AtencaoBox from "../components/AtencaoBox";
import Badge from "../components/Badge";
import ExampleCard from "../components/ExampleCard";
import FormulaBox from "../components/FormulaBox";
import MaceteBox from "../components/MaceteBox";
import PegadinhaBox from "../components/PegadinhaBox";
import QuizCard from "../components/QuizCard";
import { getModuleById, modules } from "../data/modules";
import { useAuth } from "../lib/AuthContext";
import { markModuleCompleted, updateLastAccessedModule } from "../services/progressService";

type StudyMode = "zero" | "macete" | "completa";

export default function ModulePage() {
  const { moduleId } = useParams();
  const { user } = useAuth();
  const [mode, setMode] = useState<StudyMode>("zero");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const module = moduleId ? getModuleById(moduleId) : undefined;

  useEffect(() => {
    if (!user || !module) return;
    updateLastAccessedModule(user.id, module.id).catch(() => undefined);
  }, [module, user]);

  if (!module) return <Navigate to="/dashboard" replace />;

  const currentModule = module;
  const currentIndex = modules.findIndex((item) => item.id === module.id);
  const nextModule = modules[currentIndex + 1];

  async function handleComplete() {
    if (!user) return;
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await markModuleCompleted(user.id, currentModule.id);
      setMessage("Módulo marcado como concluído. Seu progresso foi salvo no Supabase.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar progresso.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-section module-page">
      <div className="module-header">
        <div>
          <p className="eyebrow">Módulo {currentIndex + 1} de {modules.length}</p>
          <h1>{module.title}</h1>
          <p>{module.objective}</p>
          <div className="inline-badges">
            <Badge tone="blue">{module.estimatedTime}</Badge>
            <Badge tone={module.difficulty === "Boss" ? "gold" : "purple"}>{module.difficulty}</Badge>
          </div>
        </div>
        <div className="mode-switcher" aria-label="Modo de estudo">
          <button className={mode === "zero" ? "active" : ""} type="button" onClick={() => setMode("zero")}>
            Me explica do zero
          </button>
          <button className={mode === "macete" ? "active" : ""} type="button" onClick={() => setMode("macete")}>
            Ver só o macete
          </button>
          <button className={mode === "completa" ? "active" : ""} type="button" onClick={() => setMode("completa")}>
            Ver resolução completa
          </button>
        </div>
      </div>

      {mode !== "macete" ? (
        <div className="content-panel">
          <h2>Explicação simples</h2>
          {module.explanation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      <div className="two-column">
        <FormulaBox title="Fórmulas principais">
          <ul className="clean-list">
            {module.formulas.map((formula) => (
              <li key={formula}>{formula}</li>
            ))}
          </ul>
        </FormulaBox>
        <AtencaoBox>
          <strong>Tradução dos símbolos:</strong>
          <div className="symbol-row">
            {module.symbols.map((symbol) => (
              <span key={symbol}>{symbol}</span>
            ))}
          </div>
        </AtencaoBox>
      </div>

      <div className="two-column">
        <MaceteBox>
          <ul className="clean-list">
            {module.macetes.map((macete) => (
              <li key={macete}>{macete}</li>
            ))}
          </ul>
        </MaceteBox>
        <PegadinhaBox>
          <ul className="clean-list">
            {module.pegadinhas.map((pegadinha) => (
              <li key={pegadinha}>{pegadinha}</li>
            ))}
          </ul>
        </PegadinhaBox>
      </div>

      {mode !== "macete" ? (
        <>
          <div className="section-heading align-left">
            <p>Exemplos graduais</p>
            <h2>Do fácil ao difícil</h2>
          </div>
          <div className="example-grid">
            {module.examples.map((example) => (
              <ExampleCard key={`${example.level}-${example.title}`} example={example} />
            ))}
          </div>
        </>
      ) : null}

      {mode === "completa" ? (
        <>
          <div className="section-heading align-left">
            <p>Mini quiz</p>
            <h2>Teste rápido</h2>
          </div>
          <div className="quiz-grid">
            {module.quiz.map((question) => (
              <QuizCard key={question.question} question={question} />
            ))}
          </div>
        </>
      ) : null}

      {message ? <p className="form-success">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      <div className="module-footer-actions">
        <button className="button button-primary" type="button" onClick={handleComplete} disabled={saving}>
          {saving ? "Salvando..." : "Marcar como concluído"}
        </button>
        {nextModule ? (
          <Link className="button button-secondary" to={`/modulos/${nextModule.id}`}>
            Próximo passo
          </Link>
        ) : (
          <Link className="button button-secondary" to="/simulado">
            Ir para o Boss Final
          </Link>
        )}
        <Link className="button button-ghost" to="/dashboard">
          Voltar ao dashboard
        </Link>
      </div>
    </section>
  );
}
