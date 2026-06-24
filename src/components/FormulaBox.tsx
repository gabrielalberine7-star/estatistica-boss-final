import { Sigma } from "lucide-react";

type FormulaBoxProps = {
  title?: string;
  children: React.ReactNode;
};

export default function FormulaBox({ title = "Fórmula", children }: FormulaBoxProps) {
  return (
    <section className="callout formula-box">
      <div className="callout-title">
        <Sigma size={18} aria-hidden="true" />
        <span>{title}</span>
      </div>
      <div className="formula-content">{children}</div>
    </section>
  );
}
