import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AtencaoBox from "../components/AtencaoBox";
import { useAuth } from "../lib/AuthContext";
import { resetPassword } from "../services/authService";

export default function ForgotPassword() {
  const { configured } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage("Se esse e-mail existir no Supabase, você receberá um link de recuperação.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não consegui enviar a recuperação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Recuperar senha</p>
        <h1>Reabrir o portal</h1>
        <p>Digite o e-mail da conta para receber o link de redefinição.</p>

        {!configured ? <AtencaoBox>Configure o Supabase no `.env` para enviar e-mails de recuperação.</AtencaoBox> : null}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" required />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}
          <button className="button button-primary full" type="submit" disabled={loading || !configured}>
            {loading ? "Enviando..." : "Enviar recuperação"}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">Voltar para login</Link>
        </div>
      </div>
    </section>
  );
}
