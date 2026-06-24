import FormulaBox from "../components/FormulaBox";
import MaceteBox from "../components/MaceteBox";
import PegadinhaBox from "../components/PegadinhaBox";
import { formulaReferences } from "../data/formulas";

const fastCards = [
  { title: "Pelo menos um", body: "Use: 1 - P(nenhum)" },
  { title: "Mais de 2", body: "Use: P(X > 2) = P(X ≥ 3)" },
  { title: "No máximo 2", body: "Use: P(X ≤ 2) = P(0) + P(1) + P(2)" },
  { title: "Poisson", body: "Usar quando tiver média por tempo, área ou espaço." },
  { title: "Binomial", body: "Usar quando tiver n tentativas, sucesso/fracasso e p constante." },
  { title: "Hipergeométrica", body: "Usar quando tiver amostragem sem reposição de população limitada." },
  { title: "Desvio padrão", body: "Não soma direto. Primeiro transforma em variância." }
];

export default function QuickReview() {
  return (
    <section className="page-section">
      <div className="section-heading">
        <p>Antes da prova</p>
        <h1>Revisão de 10 minutos antes da prova</h1>
      </div>

      <div className="review-grid">
        {fastCards.map((card) => (
          <article className="review-card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </div>

      <div className="section-heading align-left">
        <p>Fórmulas essenciais</p>
        <h2>Escolha rápida</h2>
      </div>
      <div className="formula-reference-grid">
        {formulaReferences.map((item) => (
          <FormulaBox key={item.name} title={item.name}>
            <p className="formula-line">{item.formula}</p>
            <p><strong>Quando usar:</strong> {item.useWhen}</p>
            <p><strong>Atenção:</strong> {item.watchOut}</p>
          </FormulaBox>
        ))}
      </div>

      <div className="two-column">
        <MaceteBox>
          Antes de calcular, descubra o tipo da questão. Quando aparecer “pelo menos um”, pense no complementar.
        </MaceteBox>
        <PegadinhaBox>
          Mais de 2 não inclui o 2. No máximo 2 inclui o 2. Desvio padrão não soma direto.
        </PegadinhaBox>
      </div>
    </section>
  );
}
