import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AtencaoBox from "../components/AtencaoBox";
import { useAuth } from "../lib/AuthContext";
import { signIn } from "../services/authService";

type LocationState = {
  from?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const from = (location.state as LocationState | null)?.from ?? "/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login incorreto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Entrar</p>
        <h1>Voltar para a campanha</h1>
        <p>Entre para carregar módulos, exercícios e simulado salvos no Supabase.</p>

        {!configured ? (
          <AtencaoBox>Configure o `.env` com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY antes de usar login real.</AtencaoBox>
        ) : null}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" required />
          </label>
          <label>
            Senha
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Sua senha" required />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="button button-primary full" type="submit" disabled={loading || !configured}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/recuperar-senha">Esqueci minha senha</Link>
          <Link to="/cadastro">Criar conta</Link>
        </div>
      </div>
    </section>
  );
}
