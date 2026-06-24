import { useMemo, useState } from "react";
import CalculatorCard from "../components/CalculatorCard";
import PegadinhaBox from "../components/PegadinhaBox";
import {
  cumulativeBinomial,
  cumulativePoisson,
  expectedValue,
  formatNumber,
  formatProbability,
  standardDeviation,
  variance,
  type ProbabilityMode,
  type ValueProbabilityPair
} from "../utils/math";

const modeLabels: Record<ProbabilityMode, string> = {
  eq: "P(X = k)",
  lte: "P(X ≤ k)",
  gte: "P(X ≥ k)",
  gt: "P(X > k)",
  lt: "P(X < k)"
};

type PairRow = ValueProbabilityPair & { id: string };

function numberValue(value: string) {
  return Number(value.replace(",", "."));
}

export default function Calculators() {
  const [binomial, setBinomial] = useState({ n: "10", p: "0.05", k: "1", mode: "eq" as ProbabilityMode });
  const [poisson, setPoisson] = useState({ lambda: "4", k: "2", mode: "eq" as ProbabilityMode });
  const [pairs, setPairs] = useState<PairRow[]>([
    { id: "a", x: 0, p: 0.5 },
    { id: "b", x: 10, p: 0.5 }
  ]);
  const [sumCalc, setSumCalc] = useState({ mean1: "100", sd1: "4", mean2: "20", sd2: "2", op: "soma" });

  const binomialResult = useMemo(() => {
    const n = Math.max(0, Math.floor(numberValue(binomial.n)));
    const p = numberValue(binomial.p);
    const k = Math.max(0, Math.floor(numberValue(binomial.k)));
    return cumulativeBinomial(n, p, k, binomial.mode);
  }, [binomial]);

  const poissonResult = useMemo(() => {
    const lambda = numberValue(poisson.lambda);
    const k = Math.max(0, Math.floor(numberValue(poisson.k)));
    return cumulativePoisson(lambda, k, poisson.mode);
  }, [poisson]);

  const expectedStats = useMemo(() => {
    const cleanPairs = pairs.map(({ x, p }) => ({ x: Number(x), p: Number(p) }));
    const ex = expectedValue(cleanPairs);
    const secondMoment = cleanPairs.reduce((sum, pair) => sum + pair.x ** 2 * pair.p, 0);
    const varX = variance(cleanPairs);
    const sd = standardDeviation(cleanPairs);
    const pSum = cleanPairs.reduce((sum, pair) => sum + pair.p, 0);
    return { ex, secondMoment, varX, sd, pSum };
  }, [pairs]);

  const independentResult = useMemo(() => {
    const mean1 = numberValue(sumCalc.mean1);
    const mean2 = numberValue(sumCalc.mean2);
    const sd1 = numberValue(sumCalc.sd1);
    const sd2 = numberValue(sumCalc.sd2);
    const mean = sumCalc.op === "soma" ? mean1 + mean2 : mean1 - mean2;
    const varResult = sd1 ** 2 + sd2 ** 2;
    return { mean, variance: varResult, sd: Math.sqrt(varResult) };
  }, [sumCalc]);

  function updatePair(id: string, key: "x" | "p", value: string) {
    setPairs((current) => current.map((pair) => (pair.id === id ? { ...pair, [key]: numberValue(value) } : pair)));
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p>Ferramentas rápidas</p>
        <h1>Calculadoras rápidas</h1>
      </div>

      <div className="calculator-grid">
        <CalculatorCard title="Calculadora Binomial" subtitle="n tentativas, p constante">
          <div className="form-grid">
            <label>n<input value={binomial.n} onChange={(event) => setBinomial((current) => ({ ...current, n: event.target.value }))} /></label>
            <label>p<input value={binomial.p} onChange={(event) => setBinomial((current) => ({ ...current, p: event.target.value }))} /></label>
            <label>k<input value={binomial.k} onChange={(event) => setBinomial((current) => ({ ...current, k: event.target.value }))} /></label>
            <label>
              Tipo
              <select value={binomial.mode} onChange={(event) => setBinomial((current) => ({ ...current, mode: event.target.value as ProbabilityMode }))}>
                {Object.entries(modeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="result-box">
            <strong>{modeLabels[binomial.mode]} = {formatNumber(binomialResult)} = {formatProbability(binomialResult)}</strong>
            <p>Fórmula base: C(n,k)p^k(1-p)^(n-k). Interpretação: chance do evento pedido acontecer nas {binomial.n} tentativas.</p>
          </div>
        </CalculatorCard>

        <CalculatorCard title="Calculadora Poisson" subtitle="média por intervalo">
          <div className="form-grid">
            <label>λ<input value={poisson.lambda} onChange={(event) => setPoisson((current) => ({ ...current, lambda: event.target.value }))} /></label>
            <label>k<input value={poisson.k} onChange={(event) => setPoisson((current) => ({ ...current, k: event.target.value }))} /></label>
            <label>
              Tipo
              <select value={poisson.mode} onChange={(event) => setPoisson((current) => ({ ...current, mode: event.target.value as ProbabilityMode }))}>
                {Object.entries(modeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="result-box">
            <strong>{modeLabels[poisson.mode]} = {formatNumber(poissonResult)} = {formatProbability(poissonResult)}</strong>
            <p>Fórmula base: e^-λ λ^k/k!. Interpretação: chance de observar essa quantidade no intervalo com média λ.</p>
          </div>
        </CalculatorCard>

        <CalculatorCard title="Valor esperado, variância e σ" subtitle="pares x e p(x)">
          <div className="pairs-table">
            {pairs.map((pair) => (
              <div className="pair-row" key={pair.id}>
                <label>x<input value={pair.x} onChange={(event) => updatePair(pair.id, "x", event.target.value)} /></label>
                <label>p(x)<input value={pair.p} onChange={(event) => updatePair(pair.id, "p", event.target.value)} /></label>
                <button className="icon-button" type="button" onClick={() => setPairs((current) => current.filter((item) => item.id !== pair.id))} aria-label="Remover linha">
                  ×
                </button>
              </div>
            ))}
          </div>
          <button className="button button-ghost" type="button" onClick={() => setPairs((current) => [...current, { id: crypto.randomUUID(), x: 0, p: 0 }])}>
            Adicionar par
          </button>
          <div className="result-box">
            <strong>E(X) = {formatNumber(expectedStats.ex)}</strong>
            <span>E(X²) = {formatNumber(expectedStats.secondMoment)}</span>
            <span>V(X) = {formatNumber(expectedStats.varX)}</span>
            <span>σ = {formatNumber(expectedStats.sd)}</span>
            {Math.abs(expectedStats.pSum - 1) > 0.001 ? <p>Atenção: as probabilidades somam {formatNumber(expectedStats.pSum)}, não 1.</p> : null}
          </div>
        </CalculatorCard>

        <CalculatorCard title="Soma/subtração independente" subtitle="médias e desvios">
          <div className="form-grid">
            <label>Média 1<input value={sumCalc.mean1} onChange={(event) => setSumCalc((current) => ({ ...current, mean1: event.target.value }))} /></label>
            <label>Desvio 1<input value={sumCalc.sd1} onChange={(event) => setSumCalc((current) => ({ ...current, sd1: event.target.value }))} /></label>
            <label>Média 2<input value={sumCalc.mean2} onChange={(event) => setSumCalc((current) => ({ ...current, mean2: event.target.value }))} /></label>
            <label>Desvio 2<input value={sumCalc.sd2} onChange={(event) => setSumCalc((current) => ({ ...current, sd2: event.target.value }))} /></label>
            <label>
              Operação
              <select value={sumCalc.op} onChange={(event) => setSumCalc((current) => ({ ...current, op: event.target.value }))}>
                <option value="soma">soma</option>
                <option value="subtracao">subtração</option>
              </select>
            </label>
          </div>
          <div className="result-box">
            <strong>Média resultante = {formatNumber(independentResult.mean)}</strong>
            <span>Variância resultante = {formatNumber(independentResult.variance)}</span>
            <span>Desvio padrão resultante = {formatNumber(independentResult.sd)}</span>
          </div>
          <PegadinhaBox>Na subtração, a média subtrai, mas a variância soma se as variáveis forem independentes.</PegadinhaBox>
        </CalculatorCard>
      </div>
    </section>
  );
}
