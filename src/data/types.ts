export type Difficulty = "Fácil" | "Médio" | "Difícil" | "Boss";

export type ModuleIconKey =
  | "map"
  | "symbols"
  | "dice"
  | "route"
  | "brain"
  | "target"
  | "table"
  | "line"
  | "coins"
  | "activity"
  | "toggle"
  | "boxes"
  | "timer"
  | "layers"
  | "merge"
  | "briefcase"
  | "radar"
  | "sword"
  | "crown"
  | "zap";

export type MiniQuizQuestion = {
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type ModuleExample = {
  title: string;
  level: "Fácil" | "Médio" | "Difícil";
  problem: string;
  solution: string;
};

export type CourseModule = {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimatedTime: string;
  iconKey: ModuleIconKey;
  objective: string;
  explanation: string[];
  formulas: string[];
  symbols: string[];
  examples: ModuleExample[];
  macetes: string[];
  pegadinhas: string[];
  quiz: MiniQuizQuestion[];
};

export type SymbolCard = {
  symbol: string;
  readAs: string;
  meaning: string;
  simpleExample: string;
  statsExample: string;
  trap: string;
};

export type PhraseTranslation = {
  phrase: string;
  math: string;
  example: string;
  trap: string;
};

export type ExerciseCategory =
  | "Probabilidade básica"
  | "Condicional"
  | "Bayes"
  | "Variável aleatória"
  | "Valor esperado"
  | "Variância"
  | "Binomial"
  | "Poisson"
  | "Hipergeométrica";

export type Exercise = {
  id: string;
  title: string;
  difficulty: Exclude<Difficulty, "Boss">;
  category: ExerciseCategory;
  statement: string;
  answer: string;
  hint: string;
  solution: {
    subject: string;
    translation: string;
    formula: string;
    why: string;
    substitution: string;
    calculation: string;
    finalAnswer: string;
    trap: string;
  };
};

export type QuizQuestion = {
  id: string;
  topic: string;
  statement: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};
