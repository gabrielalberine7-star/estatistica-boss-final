import { Sparkles } from "lucide-react";

type MaceteBoxProps = {
  children: React.ReactNode;
};

export default function MaceteBox({ children }: MaceteBoxProps) {
  return (
    <section className="callout macete-box">
      <div className="callout-title">
        <Sparkles size={18} aria-hidden="true" />
        <span>MACETE</span>
      </div>
      <div>{children}</div>
    </section>
  );
}
