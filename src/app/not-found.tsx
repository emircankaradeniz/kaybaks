import Link from "next/link";

export default function NotFound() {
  return (
    <main className="kp-main">
      <section className="kp-section kp-paper-grid">
        <div className="kp-container kp-empty-state">
          <span className="kp-kicker">Hata kodu — 404</span>
          <h1 className="kp-display">Sayfa bulunamadı.</h1>
          <p className="kp-lead">
            Aradığınız sayfa taşınmış, kaldırılmış veya bağlantı hatalı olabilir.
          </p>
          <Link href="/" className="kp-button kp-button--dark">
            Ana sayfaya dön <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
