import { useMemo, useState } from "react";
import FormulaBox from "../components/FormulaBox";
import MaceteBox from "../components/MaceteBox";
import PegadinhaBox from "../components/PegadinhaBox";

const detectorQuestions = [
  { id: "sucesso", text: "A questão fala de sucesso ou fracasso?" },
  { id: "nFixo", text: "Tem número fixo de tentativas?" },
  { id: "pConstante", text: "A probabilidade é constante?" },
  { id: "independentes", text: "As tentativas são independentes?" },
  { id: "mediaIntervalo", text: "Fala em média por tempo, área, espaço ou intervalo?" },
  { id: "semReposicao", text: "Tem amostragem sem reposição?" },
  { id: "popLimitada", text: "Tem população pequena ou limitada?" },
  { id: "dadoQue", text: "Tem 'dado que' ou 'sabendo que'?" },
  { id: "esperanca", text: "Pede 'em média', 'lucro esperado' ou 'valor esperado'?" },
  { id: "variancia", text: "Pede variância, desvio padrão, risco ou dispersão?" }
];

type AnswerValue = "sim" | "nao" | "talvez";
type DetectorResult = {
  name: string;
  why: string;
  formula: string;
  example: string;
  trap: string;
};

const resultInfo: Record<string, DetectorResult> = {
  Bernoulli: {
    name: "Bernoulli",
    why: "Há uma única tentativa com sucesso ou fracasso.",
    formula: "P(X=1)=p; P(X=0)=1-p",
    example: "Uma peça é defeituosa ou perfeita.",
    trap: "Sucesso é o evento de interesse, mesmo que seja algo ruim."
  },
  Binomial: {
    name: "Binomial",
    why: "Tem n tentativas, sucesso/fracasso, independência e p constante.",
    formula: "P(X=k)=C(n,k)p^k(1-p)^(n-k)",
    example: "20 itens, cada um com 5% de chance de defeito.",
    trap: "Se for sem reposição em população pequena, desconfie."
  },
  Poisson: {
    name: "Poisson",
    why: "A questão dá uma média por intervalo de tempo, área ou espaço.",
    formula: "P(X=k)=e^-λ λ^k/k!",
    example: "4 mensagens por minuto no servidor.",
    trap: "Ajuste λ para o intervalo pedido antes da conta."
  },
  Hipergeométrica: {
    name: "Hipergeométrica",
    why: "A amostra é sem reposição em população limitada.",
    formula: "P(X=k)=C(K,k)C(N-K,n-k)/C(N,n)",
    example: "Escolher 3 placas de um lote de 12 sem devolver.",
    trap: "Não trate p como constante depois que os itens saem do lote."
  },
  "Condicional/Bayes": {
    name: "Condicional/Bayes",
    why: "Aparece informação do tipo 'dado que' ou 'sabendo que'.",
    formula: "P(A|B)=P(A∩B)/P(B); Bayes inverte a condicional",
    example: "Probabilidade de ser da caixa B sabendo que a peça é defeituosa.",
    trap: "P(A|B) não é a mesma coisa que P(B|A)."
  },
  "Valor esperado": {
    name: "Valor esperado",
    why: "A questão pede média de longo prazo, lucro esperado ou ganho médio.",
    formula: "E(X)=∑x p(x)",
    example: "Comparar propostas comerciais com ganhos e perdas.",
    trap: "Use lucro líquido se houver custo."
  },
  "Variância/Desvio padrão": {
    name: "Variância/Desvio padrão",
    why: "A questão pede risco, dispersão ou quanto os valores espalham.",
    formula: "V(X)=E(X²)-[E(X)]²; σ=√V(X)",
    example: "Comparar duas propostas com mesma esperança e riscos diferentes.",
    trap: "Desvio padrão não soma direto."
  },
  "Probabilidade básica": {
    name: "Probabilidade básica",
    why: "As pistas especiais ainda não apareceram; comece por espaço amostral, evento e complementar.",
    formula: "P(A)=casos favoráveis/casos possíveis",
    example: "Número par em um dado justo.",
    trap: "Confira se os casos são igualmente prováveis."
  }
};

export default function DistributionDetector() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});

  const recommendations = useMemo(() => {
    const yes = (id: string) => answers[id] === "sim";
    const list: DetectorResult[] = [];

    if (yes("dadoQue")) list.push(resultInfo["Condicional/Bayes"]);
    if (yes("esperanca")) list.push(resultInfo["Valor esperado"]);
    if (yes("variancia")) list.push(resultInfo["Variância/Desvio padrão"]);
    if (yes("semReposicao") && yes("popLimitada")) list.push(resultInfo.Hipergeométrica);
    if (yes("mediaIntervalo")) list.push(resultInfo.Poisson);
    if (yes("sucesso") && yes("nFixo") && yes("pConstante") && yes("independentes")) list.push(resultInfo.Binomial);
    if (yes("sucesso") && !yes("nFixo") && !yes("mediaIntervalo") && !yes("semReposicao")) list.push(resultInfo.Bernoulli);

    return list.length ? list : [resultInfo["Probabilidade básica"]];
  }, [answers]);

  return (
    <section className="page-section">
      <div className="section-heading">
        <p>Assistente de diagnóstico</p>
        <h1>Detector de Distribuição</h1>
      </div>

      <div className="detector-layout">
        <div className="detector-questions">
          {detectorQuestions.map((question, index) => (
            <article className="detector-question" key={question.id}>
              <span>{index + 1}</span>
              <h2>{question.text}</h2>
              <div className="segmented-control">
                {(["sim", "nao", "talvez"] as AnswerValue[]).map((value) => (
                  <button
                    key={value}
                    className={answers[question.id] === value ? "active" : ""}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: value }))}
                  >
                    {value === "sim" ? "Sim" : value === "nao" ? "Não" : "Talvez"}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="detector-result">
          <p className="eyebrow">Resultado provável</p>
          {recommendations.map((result) => (
            <article className="result-card" key={result.name}>
              <h2>{result.name}</h2>
              <p>{result.why}</p>
              <FormulaBox>{result.formula}</FormulaBox>
              <MaceteBox>{result.example}</MaceteBox>
              <PegadinhaBox>{result.trap}</PegadinhaBox>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}
