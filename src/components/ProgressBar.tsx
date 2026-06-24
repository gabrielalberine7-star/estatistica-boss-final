type ProgressBarProps = {
  value: number;
  label?: string;
};

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const normalized = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="progress-wrap" aria-label={label ?? `Progresso ${normalized}%`}>
      <div className="progress-meta">
        {label ? <span>{label}</span> : <span>Progresso</span>}
        <strong>{normalized}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}
