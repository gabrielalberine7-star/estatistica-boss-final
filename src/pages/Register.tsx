import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AtencaoBox from "../components/AtencaoBox";
import { useAuth } from "../lib/AuthContext";
import { signUp } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const { configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await signUp(email, password);
      if (data.session) {
        navigate("/dashboard", { replace: true });
      } else {
        setMessage("Conta criada. Se o Supabase pedir confirmação, confira seu e-mail antes de entrar.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não consegui criar sua conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Cadastro</p>
        <h1>Criar sua conta</h1>
        <p>Seu progresso fica salvo por usuário: módulos, acertos, erros e melhor nota no Boss Final.</p>

        {!configured ? (
          <AtencaoBox>Configure o `.env` com as chaves públicas do Supabase para habilitar cadastro real.</AtencaoBox>
        ) : null}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" required />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo de 6 caracteres"
              minLength={6}
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}
          <button className="button button-primary full" type="submit" disabled={loading || !configured}>
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Já tenho conta</Link>
        </div>
      </div>
    </section>
  );
}
