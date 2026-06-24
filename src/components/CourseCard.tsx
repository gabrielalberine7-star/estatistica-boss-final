import {
  Activity,
  Brain,
  BriefcaseBusiness,
  Crown,
  Dice5,
  GitMerge,
  Layers3,
  LineChart,
  Map,
  PackageCheck,
  Radar,
  Route,
  Sigma,
  Swords,
  Table2,
  Target,
  Timer,
  ToggleLeft,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { CourseModule, ModuleIconKey } from "../data/types";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";

type CourseCardProps = {
  module: CourseModule;
  progress: number;
};

const iconMap: Record<ModuleIconKey, LucideIcon> = {
  map: Map,
  symbols: Sigma,
  dice: Dice5,
  route: Route,
  brain: Brain,
  target: Target,
  table: Table2,
  line: LineChart,
  coins: PackageCheck,
  activity: Activity,
  toggle: ToggleLeft,
  boxes: PackageCheck,
  timer: Timer,
  layers: Layers3,
  merge: GitMerge,
  briefcase: BriefcaseBusiness,
  radar: Radar,
  sword: Swords,
  crown: Crown,
  zap: Zap
};

export default function CourseCard({ module, progress }: CourseCardProps) {
  const Icon = iconMap[module.iconKey];
  const completed = progress >= 100;
  const difficultyTone = module.difficulty === "Fácil" ? "green" : module.difficulty === "Médio" ? "blue" : module.difficulty === "Difícil" ? "purple" : "gold";

  return (
    <article className="course-card">
      <div className="course-card-head">
        <div className="module-icon">
          <Icon size={22} aria-hidden="true" />
        </div>
        <div>
          <h3>{module.title}</h3>
          <div className="inline-badges">
            <Badge tone={difficultyTone}>{module.difficulty}</Badge>
            <Badge tone={completed ? "green" : "gray"}>{completed ? "Concluído" : "Disponível"}</Badge>
          </div>
        </div>
      </div>
      <p>{module.objective}</p>
      <div className="course-meta">
        <span>{module.estimatedTime}</span>
        <span>{module.quiz.length} mini quiz</span>
      </div>
      <ProgressBar value={progress} />
      <Link className="button button-primary full" to={`/modulos/${module.id}`}>
        Estudar
      </Link>
    </article>
  );
}
