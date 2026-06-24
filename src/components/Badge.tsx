type BadgeProps = {
  children: React.ReactNode;
  tone?: "gold" | "blue" | "purple" | "green" | "gray" | "danger";
};

export default function Badge({ children, tone = "gray" }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
