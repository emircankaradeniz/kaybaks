import { ArrowUpRight, Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { getSettings } from "@/lib/content-store";
import { KraftImage } from "@/components/ui/kraft";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "İletişim ve Ambalaj Teklifi",
  description: "Kayseri oluklu mukavva ve karton kutu üretimi için KAYBAKS'a ulaşın. Ölçü, adet ve kullanım bilgilerinizi paylaşarak teklif alın.",
  path: "/iletisim",
  image: "/media/enhanced/kaybaks-factory-hd.jpg",
  keywords: ["Kayseri kutu fabrikası iletişim", "oluklu mukavva teklifi", "karton kutu fiyat teklifi"],
});

export const dynamic = "force-dynamic";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ urun?: string }> }) {
  const [settings, query] = await Promise.all([getSettings(), searchParams]);
  const selectedProduct = query.urun || "";

  return <>
    <section className="kb3-page-hero kb3-contact-hero"><div className="kp-container kb3-page-hero-grid"><div><p className="kb3-eyebrow">İLETİŞİM</p><h1>Üretim ihtiyacınızı doğrudan konuşalım.</h1><p>Ölçü, kullanım alanı, adet ve teslim planını paylaşın; ekibimiz uygun ambalaj çözümü için sizinle iletişime geçsin.</p><div className="kb3-direct-links"><a href={`tel:${settings.phone_href}`}><Phone />{settings.phone}</a><a href="tel:+903523222803"><Phone />+90 352 322 28 03</a><a href={`mailto:${settings.email}`}><Mail />{settings.email}</a></div></div><figure><KraftImage src="/media/enhanced/kaybaks-factory-hd.jpg" alt="KAYBAKS Kayseri fabrika binası" width={1446} height={1087} priority /><figcaption>1. Organize Sanayi Bölgesi · Melikgazi / Kayseri</figcaption></figure></div></section>

    <section className="kp-section kb3-contact" id="teklif"><div className="kp-container kb3-contact-grid"><form className="kb3-form" action={`mailto:${settings.email}`} method="post" encType="text/plain"><header><small>TEKLİF FORMU / 01</small><h2>Talebinizi gönderin</h2><p>Ürün ölçüsü, kullanım amacı ve tahmini adet teklif hazırlığımızı hızlandırır.</p></header><div className="kb3-form-grid"><label>Ad Soyad<input name="ad_soyad" autoComplete="name" required /></label><label>Firma Adı<input name="firma" autoComplete="organization" required /></label><label>Telefon<input name="telefon" type="tel" autoComplete="tel" required /></label><label>E-posta<input name="email" type="email" autoComplete="email" required /></label><label>İlgilendiğiniz Ürün<select name="urun" defaultValue={selectedProduct}><option value="">Ürün seçin</option><option>Oluklu Mukavva Levha</option><option>Normal Kutu</option><option>Teleskopik Kutu</option><option>Kalıp Kesim Kutu</option><option>Ondüle Ürünler</option><option>Demonte Mobilya Kutuları</option><option>Özel Ölçü Kutu</option><option>Özel Tasarım Ambalaj</option></select></label><label>Tahmini Adet<input name="adet" inputMode="numeric" /></label><label className="kb3-field-full">Mesajınız<textarea name="mesaj" rows={6} placeholder="Ölçü, kullanım amacı, baskı ve teslim detayları..." required /></label><label className="kb3-consent kb3-field-full"><input type="checkbox" required />KVKK metnini okudum ve kabul ediyorum.</label><button className="kp-button kp-button-yellow kb3-field-full" type="submit">Teklif Talebi Gönder<Send size={17} /></button></div></form>

      <aside className="kb3-contact-info"><small>FABRİKA &amp; İLETİŞİM / 02</small><h2>Bize ulaşın</h2><div><p><MapPin /><span><b>Açık adres</b>1. Organize Sanayi Bölgesi, Karpuzsekisi Mah. 22. Cadde No:22, Melikgazi / Kayseri</span></p><p><Phone /><span><b>Telefon</b><a href={`tel:${settings.phone_href}`}>{settings.phone}</a><br /><a href="tel:+903523222803">+90 352 322 28 03</a></span></p><p><Mail /><span><b>E-posta</b><a href={`mailto:${settings.email}`}>{settings.email}</a></span></p><p><Clock3 /><span><b>Çalışma saatleri</b>Hafta içi 08:30 – 18:00<br />Cumartesi 08:30 – 13:00<br />Pazar kapalı</span></p></div><a className="kp-button kp-button-outline" href="https://www.google.com/maps/search/?api=1&query=KAYBAKS+Oluklu+Mukavva+Kayseri" target="_blank" rel="noreferrer">Yol Tarifi<ArrowUpRight size={17} /></a></aside></div></section>
  </>;
}
