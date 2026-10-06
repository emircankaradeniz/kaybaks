export default function Loading() {
  return (
    <main className="kp-main" aria-busy="true" aria-live="polite">
      <section className="kp-section kp-paper-grid">
        <div className="kp-container kp-empty-state">
          <span className="kp-kicker">Kraft Precision</span>
          <h1 className="kp-display">Yükleniyor…</h1>
        </div>
      </section>
    </main>
  );
}
