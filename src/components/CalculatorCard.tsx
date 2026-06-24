type CalculatorCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function CalculatorCard({ title, subtitle, children }: CalculatorCardProps) {
  return (
    <section className="calculator-card">
      <div className="section-heading compact">
        <p>{subtitle}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
