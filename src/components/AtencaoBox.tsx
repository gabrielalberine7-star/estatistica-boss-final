import { AlertCircle } from "lucide-react";

type AtencaoBoxProps = {
  children: React.ReactNode;
};

export default function AtencaoBox({ children }: AtencaoBoxProps) {
  return (
    <section className="callout atencao-box">
      <div className="callout-title">
        <AlertCircle size={18} aria-hidden="true" />
        <span>ATENÇÃO</span>
      </div>
      <div>{children}</div>
    </section>
  );
}
