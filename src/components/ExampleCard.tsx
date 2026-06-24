import Badge from "./Badge";
import type { ModuleExample } from "../data/types";

type ExampleCardProps = {
  example: ModuleExample;
};

export default function ExampleCard({ example }: ExampleCardProps) {
  const tone = example.level === "Fácil" ? "green" : example.level === "Médio" ? "blue" : "danger";

  return (
    <article className="example-card">
      <div className="card-topline">
        <Badge tone={tone}>{example.level}</Badge>
        <h3>{example.title}</h3>
      </div>
      <p>{example.problem}</p>
      <div className="solution-strip">
        <strong>Como pensar:</strong>
        <span>{example.solution}</span>
      </div>
    </article>
  );
}
