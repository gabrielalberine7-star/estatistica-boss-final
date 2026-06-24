import { phraseTranslations, symbolCards } from "../data/symbols";

export default function SymbolsGuide() {
  return (
    <section className="page-section">
      <div className="section-heading">
        <p>Tradução de prova</p>
        <h1>Guia de Símbolos: traduzindo o idioma dos magos</h1>
      </div>

      <div className="symbols-grid">
        {symbolCards.map((card) => (
          <article className="symbol-card" key={`${card.symbol}-${card.readAs}`}>
            <strong>{card.symbol}</strong>
            <h2>{card.readAs}</h2>
            <p>{card.meaning}</p>
            <dl>
              <dt>Exemplo simples</dt>
              <dd>{card.simpleExample}</dd>
              <dt>Em estatística</dt>
              <dd>{card.statsExample}</dd>
              <dt>Pegadinha</dt>
              <dd>{card.trap}</dd>
            </dl>
          </article>
        ))}
      </div>

      <div className="section-heading align-left">
        <p>Frases que viram matemática</p>
        <h2>Tabela de tradução rápida</h2>
      </div>
      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Frase da questão</th>
              <th>Tradução matemática</th>
              <th>Exemplo</th>
              <th>Pegadinha</th>
            </tr>
          </thead>
          <tbody>
            {phraseTranslations.map((row) => (
              <tr key={`${row.phrase}-${row.math}`}>
                <td>{row.phrase}</td>
                <td>{row.math}</td>
                <td>{row.example}</td>
                <td>{row.trap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
