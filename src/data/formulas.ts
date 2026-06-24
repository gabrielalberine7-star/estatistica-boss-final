export type FormulaReference = {
  name: string;
  formula: string;
  useWhen: string;
  watchOut: string;
};

export const formulaReferences: FormulaReference[] = [
  {
    name: "Probabilidade básica",
    formula: "P(A) = casos favoráveis / casos possíveis",
    useWhen: "Os resultados são igualmente prováveis e dá para contar casos.",
    watchOut: "Confira se todos os casos têm a mesma chance."
  },
  {
    name: "Complementar",
    formula: "P(Ac) = 1 - P(A)",
    useWhen: "A frase tem 'pelo menos um', 'algum' ou muitos casos para somar.",
    watchOut: "Defina exatamente o que é o contrário do evento."
  },
  {
    name: "Condicional",
    formula: "P(A|B) = P(A ∩ B) / P(B)",
    useWhen: "Aparece 'dado que' ou 'sabendo que'.",
    watchOut: "A ordem da barra muda tudo."
  },
  {
    name: "Bayes",
    formula: "P(A|B) = P(B|A)P(A) / P(B)",
    useWhen: "A questão pede a causa provável depois de observar um resultado.",
    watchOut: "Calcule P(B) somando todos os caminhos que geram B."
  },
  {
    name: "Valor esperado",
    formula: "E(X) = ∑ x p(x)",
    useWhen: "A questão pede média, lucro esperado ou ganho médio.",
    watchOut: "Use lucro líquido quando houver custo."
  },
  {
    name: "Variância",
    formula: "V(X) = E(X²) - [E(X)]²",
    useWhen: "A questão pede risco, dispersão ou desvio padrão.",
    watchOut: "Desvio padrão é √V(X)."
  },
  {
    name: "Bernoulli",
    formula: "P(X=1)=p; P(X=0)=1-p",
    useWhen: "Uma única tentativa com sucesso ou fracasso.",
    watchOut: "Sucesso é o evento que você está contando."
  },
  {
    name: "Binomial",
    formula: "P(X=k)=C(n,k)p^k(1-p)^(n-k)",
    useWhen: "n tentativas independentes, sucesso/fracasso e p constante.",
    watchOut: "Sem reposição em população pequena geralmente não é Binomial."
  },
  {
    name: "Poisson",
    formula: "P(X=k)=e^-λ λ^k/k!",
    useWhen: "Média por tempo, área, espaço ou intervalo.",
    watchOut: "Ajuste λ para o intervalo pedido."
  },
  {
    name: "Hipergeométrica",
    formula: "P(X=k)=C(K,k)C(N-K,n-k)/C(N,n)",
    useWhen: "Amostragem sem reposição em população limitada.",
    watchOut: "N é população, n é amostra."
  }
];
