import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getSettings } from "@/lib/content-store";

export async function SiteFooter() {
  const settings = await getSettings();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand footer-brand"><span className="brand-main">KAY<span>BAKS</span></span><small>OLUKLU MUKAVVA & KUTU</small></Link>
          <p>Kayseri’de oluklu mukavva ve ambalaj çözümlerinde kaliteli, güvenilir ve sürdürülebilir üretim anlayışıyla hizmet veriyoruz.</p>
          <div className="socials"><span>in</span><span>◎</span><span>▶</span></div>
        </div>
        <div><h3>Kurumsal</h3><Link href="/kurumsal">Hakkımızda</Link><Link href="/kurumsal#vizyon">Vizyon & Misyon</Link><Link href="/uretim-kalite">Kalite Politikamız</Link><Link href="/iletisim">İnsan Kaynakları</Link></div>
        <div><h3>Ürünler</h3><Link href="/urunler/oluklu-mukavva-levha">Oluklu Mukavva Levha</Link><Link href="/urunler">Kutu Çeşitleri</Link><Link href="/urunler/ozel-tasarim-ambalaj">Özel Tasarım Ambalaj</Link><Link href="/urunler">Tüm Ürünler</Link></div>
        <div><h3>Sektörler</h3><Link href="/sektorel-cozumler">E-Ticaret</Link><Link href="/sektorel-cozumler">Mobilya</Link><Link href="/sektorel-cozumler">Gıda</Link><Link href="/sektorel-cozumler">Sanayi</Link><Link href="/sektorel-cozumler">Perakende</Link></div>
        <div><h3>İletişim</h3><p className="contact-row"><MapPin /> {settings.address}</p><a className="contact-row" href={`tel:${settings.phone_href}`}><Phone /> {settings.phone}</a><a className="contact-row" href={`mailto:${settings.email}`}><Mail /> {settings.email}</a></div>
      </div>
      <div className="container footer-bottom"><span>© 2024 KAYBAKS. Tüm hakları saklıdır.</span><div><a href="#">KVKK</a><a href="#">Gizlilik Politikası</a><a href="#">Çerez Politikası</a></div></div>
    </footer>
  );
}
