import { useState } from "react";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import type { MiniQuizQuestion } from "../data/types";

type QuizCardProps = {
  question: MiniQuizQuestion;
};

export default function QuizCard({ question }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <article className="quiz-card">
      <h3>{question.question}</h3>
      <div className="choice-grid">
        {question.choices.map((choice, index) => {
          const isCorrect = index === question.answerIndex;
          const isSelected = selected === index;
          const className = answered
            ? isCorrect
              ? "choice choice-correct"
              : isSelected
                ? "choice choice-wrong"
                : "choice"
            : "choice";

          return (
            <button key={choice} className={className} type="button" onClick={() => setSelected(index)}>
              {answered && isCorrect ? <CheckCircle2 size={18} /> : answered && isSelected ? <XCircle size={18} /> : <Circle size={18} />}
              <span>{choice}</span>
            </button>
          );
        })}
      </div>
      {answered ? <p className="feedback-text">{question.explanation}</p> : null}
    </article>
  );
}
