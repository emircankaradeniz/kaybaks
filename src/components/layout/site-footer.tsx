import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getSettings } from "@/lib/content-store";
import { Brand } from "@/components/layout/site-header";

export async function SiteFooter() {
  const settings = await getSettings();
  return (
    <footer className="kp-footer">
      <div className="kp-container kp-footer-grid">
        <div className="kp-footer-intro"><Link href="/"><Brand /></Link><p>Doğru form, doğru dayanım. Farklı sektörlerin ihtiyaçlarına uygun, güvenilir ve sürdürülebilir ambalaj çözümleri.</p></div>
        <div><h3>Kurumsal</h3><Link href="/kurumsal">Hakkımızda</Link><Link href="/uretim-kalite">Üretim & Kalite</Link><Link href="/sektorel-cozumler">Sektörel Çözümler</Link></div>
        <div><h3>Ürünler</h3><Link href="/urunler/oluklu-mukavva-levha">Oluklu Mukavva Levha</Link><Link href="/urunler/normal-kutu">Normal Kutu</Link><Link href="/urunler/kalip-kesim-kutu">Kalıp Kesim Kutu</Link></div>
        <div className="kp-footer-contact"><h3>İletişim</h3><p><MapPin />{settings.address}</p><a href={`tel:${settings.phone_href}`}><Phone />{settings.phone}</a><a href={`mailto:${settings.email}`}><Mail />{settings.email}</a></div>
      </div>
      <div className="kp-container kp-footer-bottom"><span>© {new Date().getFullYear()} KAYBAKS. Tüm hakları saklıdır.</span><span>Kayseri · Türkiye</span></div>
    </footer>
  );
}
