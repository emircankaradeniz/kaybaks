import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const kaybaksLocation = {
  latitude: 38.716296,
  longitude: 35.3516,
};

export default async function ContactPage() {
  const settings = await getSettings();
  const metrics = [
    [Users, settings.customer_count || "500+", "Mutlu Müşteri"],
    [ShieldCheck, "Yüksek Kalite", "Güvenilir Üretim"],
    [Clock3, "Zamanında Teslimat", "Planlı ve Hızlı Sevkiyat"],
    [Phone, "7/24 Destek", "Her Zaman Yanınızdayız"],
  ] as const;

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <span className="eyebrow">Ana Sayfa / İletişim</span>
          <h1>
            Bizimle İletişime Geçin
            <br />
            <span className="yellow">Çözümünüzü Birlikte Planlayalım</span>
          </h1>
          <p style={{ color: "#626873", maxWidth: 420, lineHeight: 1.8 }}>
            Oluklu mukavva, kutu ve ambalaj ihtiyaçlarınız için uzman ekibimizle
            yanınızdayız.
          </p>
        </div>
      </section>

      <section className="section-sm" id="teklif">
        <div className="container contact-panel">
          <div>
            <h2>İletişim Bilgilerimiz</h2>
            <div className="contact-box">
              <div className="icon-circle">
                <Phone size={20} />
              </div>
              <div>
                <strong>Telefon</strong>
                <a href={`tel:${settings.phone_href}`}>{settings.phone}</a>
                <p>Hafta içi 08:30 - 18:00</p>
              </div>
            </div>
            <div className="contact-box">
              <div className="icon-circle">
                <Mail size={20} />
              </div>
              <div>
                <strong>E-posta</strong>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
                <p>7/24 bize yazabilirsiniz.</p>
              </div>
            </div>
            <div className="contact-box">
              <div className="icon-circle">
                <MapPin size={20} />
              </div>
              <div>
                <strong>Adres</strong>
                <p>{settings.address}</p>
              </div>
            </div>
          </div>

          <div>
            <h2>Bize Mesaj Gönderin</h2>
            <p style={{ fontSize: 10, color: "#626873", lineHeight: 1.7 }}>
              Aşağıdaki formu doldurarak bizimle hızlıca iletişime
              geçebilirsiniz. Ekibimiz en kısa sürede size dönüş sağlayacaktır.
            </p>
            <form
              className="form-grid"
              action={`mailto:${settings.email}`}
              method="post"
              encType="text/plain"
            >
              <input name="ad_soyad" placeholder="Adınız Soyadınız" required />
              <input
                type="email"
                name="email"
                placeholder="E-posta Adresiniz"
                required
              />
              <input name="telefon" placeholder="Telefon Numaranız" required />
              <input name="konu" placeholder="Konu" />
              <select className="full" name="talep">
                <option>Talep Türü Seçiniz</option>
                <option>Teklif Talebi</option>
                <option>Ürün Bilgisi</option>
                <option>Kurumsal İş Birliği</option>
              </select>
              <textarea
                className="full"
                name="mesaj"
                placeholder="Mesajınız"
                required
              />
              <label
                className="full"
                style={{ fontSize: 9, display: "flex", gap: 8 }}
              >
                <input type="checkbox" required style={{ width: 14 }} /> Kişisel
                verilerimin işlenmesini kabul ediyorum.
              </label>
              <button className="btn btn-primary full" type="submit">
                Gönder <Send size={15} />
              </button>
            </form>
          </div>

          <aside className="quote-aside">
            <h2>Hızlı Teklif Talebi</h2>
            <p>
              İhtiyacınızı kısaca belirtin, sizi arayalım ve en uygun çözümü
              birlikte planlayalım.
            </p>
            {[
              [Clock3, "Hızlı Geri Dönüş", "En kısa sürede size ulaşalım."],
              [
                Users,
                "Profesyonel Destek",
                "Uzman ekibimizle ihtiyacınıza yönelik çözüm.",
              ],
              [
                ShieldCheck,
                "Özel Fiyatlandırma",
                "İhtiyacınıza özel rekabetçi teklif avantajı.",
              ],
            ].map(([Icon, title, text]) => (
              <div className="benefit-row" key={title as string}>
                <div className="icon-circle">
                  <Icon size={17} />
                </div>
                <div>
                  <h3>{title as string}</h3>
                  <p>{text as string}</p>
                </div>
              </div>
            ))}
            <a
              href={`tel:${settings.phone_href}`}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 15 }}
            >
              Teklif Al <Phone size={14} />
            </a>
          </aside>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="map-card">
            <iframe
              title="KAYBAKS konumu"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=35.3336%2C38.7075%2C35.3696%2C38.7251&layer=mapnik&marker=${kaybaksLocation.latitude}%2C${kaybaksLocation.longitude}`}
            />
            <div
              style={{
                position: "absolute",
                left: 25,
                top: 25,
                background: "#fff",
                padding: 18,
                borderRadius: 10,
                boxShadow: "var(--shadow)",
              }}
            >
              <strong>
                KAY<span className="yellow">BAKS</span>
                <br />
                Oluklu Mukavva &amp; Kutu
              </strong>
              <p style={{ fontSize: 9, color: "#626873", maxWidth: 190 }}>
                {settings.address}
              </p>
              <a
                className="arrow-link yellow"
                href={`https://www.google.com/maps/dir/?api=1&destination=${kaybaksLocation.latitude}%2C${kaybaksLocation.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                Yol Tarifi Al
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm soft-section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Sizi Arayalım</h2>
              <p>Bilgilerinizi bırakın, size en kısa sürede ulaşalım.</p>
            </div>
            <input
              placeholder="Adınız Soyadınız"
              style={{
                padding: 13,
                border: "1px solid #dfe3e8",
                borderRadius: 8,
              }}
            />
            <a className="btn btn-primary" href={`tel:${settings.phone_href}`}>
              Sizi Arayalım <Phone size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container feature-strip-grid">
          {metrics.map(([Icon, number, text]) => (
            <div className="mini-feature" key={number}>
              <div className="icon-circle">
                <Icon size={20} />
              </div>
              <div>
                <h3>{number}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
