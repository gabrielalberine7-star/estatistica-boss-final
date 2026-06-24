import { ArrowRight, BookOpen, Calculator, CheckCircle2, Gauge, Swords } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const learningCards = [
  "Probabilidade básica",
  "Sinais e símbolos",
  "Condicional e Bayes",
  "Variáveis aleatórias",
  "Valor esperado",
  "Variância",
  "Binomial",
  "Poisson",
  "Hipergeométrica",
  "Exercícios de prova"
];

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <section className="hero-section">
        <div className="hero-bg" aria-hidden="true">
          <span>P(X ≥ 2)</span>
          <span>∑x p(x)</span>
          <span>λ</span>
          <span>σ²</span>
          <span>C(n,k)</span>
        </div>
        <div className="hero-content">
          <p className="eyebrow">Curso intensivo em modo sobrevivência</p>
          <h1>Estatística: Boss Final</h1>
          <p className="hero-subtitle">Aprenda do zero, entenda os sinais e treine para gabaritar.</p>
          <div className="hero-actions">
            <Link className="button button-primary button-large" to={user ? "/dashboard" : "/cadastro"}>
              <Swords size={20} />
              Começar curso
            </Link>
            <Link className="button button-secondary button-large" to="/login">
              Entrar na minha conta
            </Link>
            <Link className="button button-ghost button-large" to="/revisao">
              Ir para revisão rápida
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="Painel visual do curso">
          <div className="boss-panel">
            <div className="boss-panel-header">
              <Gauge size={20} />
              <span>Plano de prova</span>
            </div>
            <div className="boss-meter">
              <span style={{ width: "72%" }} />
            </div>
            <div className="formula-tiles">
              <strong>Binomial</strong>
              <strong>Poisson</strong>
              <strong>Bayes</strong>
              <strong>Esperança</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p>Mapa da jornada</p>
          <h2>O que você vai aprender</h2>
        </div>
        <div className="learning-grid">
          {learningCards.map((item) => (
            <article className="learning-card" key={item}>
              <CheckCircle2 size={20} />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section split-section">
        <div>
          <div className="section-heading align-left">
            <p>Para quem é esse curso?</p>
            <h2>Para quem quer parar de brigar com os símbolos</h2>
          </div>
          <p className="large-text">
            Para quem olha para P(X ≥ 2), ∑x p(x), λ, σ² e acha que foi amaldiçoado por um mago estatístico.
            Aqui você aprende do zero, com tradução, exemplos, treino e revisão rápida.
          </p>
        </div>
        <div className="feature-list">
          <div>
            <BookOpen size={22} />
            <span>Explicação em português direto, começando pelo fácil.</span>
          </div>
          <div>
            <Calculator size={22} />
            <span>Calculadoras para conferir Binomial, Poisson, esperança e variância.</span>
          </div>
          <div>
            <ArrowRight size={22} />
            <span>Progresso salvo para sair, voltar e continuar de onde parou.</span>
          </div>
        </div>
      </section>
    </>
  );
}
