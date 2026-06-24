export type ProbabilityMode = "eq" | "lte" | "gte" | "gt" | "lt";

export type ValueProbabilityPair = {
  x: number;
  p: number;
};

export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new Error("Use um inteiro maior ou igual a zero.");
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

export function combination(n: number, k: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) return 0;
  const smallerK = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= smallerK; i += 1) {
    result = (result * (n - smallerK + i)) / i;
  }
  return result;
}

export function binomialProbability(n: number, p: number, k: number): number {
  if (p < 0 || p > 1 || k < 0 || k > n) return 0;
  return combination(n, k) * p ** k * (1 - p) ** (n - k);
}

export function poissonProbability(lambda: number, k: number): number {
  if (lambda < 0 || k < 0 || !Number.isInteger(k)) return 0;
  return (Math.E ** -lambda * lambda ** k) / factorial(k);
}

export function cumulativeBinomial(n: number, p: number, k: number, mode: ProbabilityMode): number {
  const floorK = Math.floor(k);
  const sumUntil = (limit: number) => {
    let total = 0;
    for (let i = 0; i <= Math.min(n, limit); i += 1) total += binomialProbability(n, p, i);
    return total;
  };

  if (mode === "eq") return binomialProbability(n, p, floorK);
  if (mode === "lte") return sumUntil(floorK);
  if (mode === "lt") return sumUntil(floorK - 1);
  if (mode === "gte") return 1 - sumUntil(floorK - 1);
  return 1 - sumUntil(floorK);
}

export function cumulativePoisson(lambda: number, k: number, mode: ProbabilityMode): number {
  const floorK = Math.floor(k);
  const sumUntil = (limit: number) => {
    let total = 0;
    for (let i = 0; i <= limit; i += 1) total += poissonProbability(lambda, i);
    return total;
  };

  if (mode === "eq") return poissonProbability(lambda, floorK);
  if (mode === "lte") return sumUntil(floorK);
  if (mode === "lt") return sumUntil(floorK - 1);
  if (mode === "gte") return 1 - sumUntil(floorK - 1);
  return 1 - sumUntil(floorK);
}

export function expectedValue(pairs: ValueProbabilityPair[]): number {
  return pairs.reduce((sum, pair) => sum + pair.x * pair.p, 0);
}

export function variance(pairs: ValueProbabilityPair[]): number {
  const mean = expectedValue(pairs);
  const secondMoment = pairs.reduce((sum, pair) => sum + pair.x ** 2 * pair.p, 0);
  return secondMoment - mean ** 2;
}

export function standardDeviation(pairs: ValueProbabilityPair[]): number {
  return Math.sqrt(Math.max(variance(pairs), 0));
}

export function formatProbability(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

export function formatNumber(value: number, digits = 4) {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString("pt-BR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: value % 1 === 0 ? 0 : Math.min(2, digits)
  });
}
