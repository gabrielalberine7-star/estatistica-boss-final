import type { QuizQuestion } from "./types";

export const bossQuiz: QuizQuestion[] = [
  {
    id: "q1-probabilidade",
    topic: "Probabilidade básica",
    statement: "Em um dado justo, qual a probabilidade de sair número par?",
    choices: ["1/6", "1/3", "1/2", "2/3"],
    answerIndex: 2,
    explanation: "Os pares são 2, 4 e 6: 3 casos em 6, então 3/6=1/2."
  },
  {
    id: "q2-condicional",
    topic: "Condicional",
    statement: "Em P(A|B), o que significa B?",
    choices: ["O evento que será ignorado", "O universo depois da informação dada", "O complementar de A", "A resposta final"],
    answerIndex: 1,
    explanation: "P(A|B) se lê probabilidade de A dado B. Você fica dentro dos casos em que B aconteceu."
  },
  {
    id: "q3-bayes",
    topic: "Bayes",
    statement: "Bayes é mais útil quando a questão pede...",
    choices: ["A média de X", "A causa provável depois de observar um resultado", "O número de combinações", "A raiz da variância"],
    answerIndex: 1,
    explanation: "Bayes inverte a condicional: de efeito dado causa para causa dado efeito."
  },
  {
    id: "q4-va",
    topic: "Variável aleatória",
    statement: "Se X é o número de caras em duas moedas, quais valores X pode assumir?",
    choices: ["0 e 1", "1 e 2", "0, 1 e 2", "Qualquer número real"],
    answerIndex: 2,
    explanation: "Com duas moedas, podem aparecer 0, 1 ou 2 caras."
  },
  {
    id: "q5-fp",
    topic: "Função de probabilidade",
    statement: "Em uma função de probabilidade discreta válida, a soma de todas as probabilidades deve ser...",
    choices: ["0", "0,5", "1", "Depende do n"],
    answerIndex: 2,
    explanation: "Todos os valores possíveis juntos formam 100%, ou 1 em decimal."
  },
  {
    id: "q6-acumulada",
    topic: "Função acumulada",
    statement: "F(2) significa...",
    choices: ["P(X=2)", "P(X≤2)", "P(X>2)", "P(X≠2)"],
    answerIndex: 1,
    explanation: "Função acumulada soma a probabilidade até o ponto: P(X≤2)."
  },
  {
    id: "q7-esperanca",
    topic: "Valor esperado",
    statement: "Um jogo paga R$ 10 com chance 0,2 e R$ 0 com chance 0,8. O valor esperado é...",
    choices: ["R$ 0", "R$ 2", "R$ 8", "R$ 10"],
    answerIndex: 1,
    explanation: "E(X)=10*0,2 + 0*0,8 = 2."
  },
  {
    id: "q8-variancia",
    topic: "Variância",
    statement: "Para somar variáveis independentes, o que você soma para obter a dispersão?",
    choices: ["Desvios padrão", "Variâncias", "Médias ao quadrado", "Probabilidades acumuladas"],
    answerIndex: 1,
    explanation: "Variâncias somam. O desvio padrão vem depois da raiz."
  },
  {
    id: "q9-binomial",
    topic: "Binomial",
    statement: "10 itens independentes têm chance 5% de defeito. A probabilidade de nenhum defeito é...",
    choices: ["0,05^10", "0,95^10", "10*0,05", "1-0,95"],
    answerIndex: 1,
    explanation: "Nenhum defeito quer dizer todos perfeitos: 0,95^10."
  },
  {
    id: "q10-poisson",
    topic: "Poisson ou Hipergeométrica",
    statement: "A questão fala em média de 4 chamadas por minuto. A distribuição mais provável é...",
    choices: ["Binomial", "Poisson", "Hipergeométrica", "Bernoulli"],
    answerIndex: 1,
    explanation: "Média por intervalo de tempo é pista clássica de Poisson."
  }
];
