import { BookOpenCheck, Calculator, ChartNoAxesColumnIncreasing, Home, LogOut, Menu, ShieldQuestion, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { signOut } from "../services/authService";

const navItems = [
  { to: "/dashboard", label: "Curso", icon: BookOpenCheck },
  { to: "/simbolos", label: "Símbolos", icon: ShieldQuestion },
  { to: "/detector", label: "Detector", icon: ChartNoAxesColumnIncreasing },
  { to: "/exercicios", label: "Exercícios", icon: BookOpenCheck },
  { to: "/calculadoras", label: "Calculadoras", icon: Calculator },
  { to: "/progresso", label: "Progresso", icon: UserRound }
];

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/");
    } catch {
      navigate("/");
    }
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Navegação principal">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">Σ</span>
          <span>
            <strong>Estatística</strong>
            <small>Boss Final</small>
          </span>
        </Link>

        <button className="icon-button nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          <Menu size={22} />
        </button>

        <div className={`nav-links ${open ? "nav-links-open" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>
            <Home size={18} />
            Início
          </NavLink>
          {user
            ? navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })
            : null}
        </div>

        <div className="nav-actions">
          {user ? (
            <button className="button button-ghost" type="button" onClick={handleSignOut}>
              <LogOut size={17} />
              Sair
            </button>
          ) : (
            <>
              <Link className="button button-ghost" to="/login">
                Entrar
              </Link>
              <Link className="button button-primary" to="/cadastro">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
