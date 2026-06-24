import { ShieldAlert } from "lucide-react";

type PegadinhaBoxProps = {
  children: React.ReactNode;
};

export default function PegadinhaBox({ children }: PegadinhaBoxProps) {
  return (
    <section className="callout pegadinha-box">
      <div className="callout-title">
        <ShieldAlert size={18} aria-hidden="true" />
        <span>PEGADINHA</span>
      </div>
      <div>{children}</div>
    </section>
  );
}
