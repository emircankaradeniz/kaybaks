import Link from "next/link";
import { ArrowRight, Handshake, PackageCheck, Truck } from "lucide-react";
import { KraftImage, QuoteBand } from "@/components/ui/kraft";

const sectors = ["Mobilya", "Gıda", "Tekstil", "Beyaz eşya", "Çelik eşya", "Kimya"];

export default function CorporatePage() {
  return <>
    <section className="kb3-page-hero">
      <div className="kp-container kb3-page-hero-grid">
        <div><p className="kb3-eyebrow">KURUMSAL</p><h1>Üretim tecrübesi, hizmet sorumluluğuyla tamamlanır.</h1><p>1999’da başlayan oluklu mukavva üretim deneyimimizi 2010’dan beri KAYBAKS markasıyla sürdürüyoruz.</p><Link className="kp-button kp-button-yellow" href="/iletisim">Bizimle İletişime Geçin<ArrowRight size={17} /></Link></div>
        <figure><KraftImage src="/media/enhanced/kaybaks-factory-hd.jpg" alt="KAYBAKS Kayseri üretim tesisi" width={1446} height={1087} priority /><figcaption>Karpuzsekisi Mahallesi · Melikgazi / Kayseri</figcaption></figure>
      </div>
    </section>

    <section className="kp-section kb3-story">
      <div className="kp-container kb3-story-grid">
        <div><p className="kb3-eyebrow">HAKKIMIZDA / 01</p><h2>KAYBAKS’ın hikâyesi</h2></div>
        <div className="kb3-story-copy"><p>Oluklu mukavva sektöründe 1999 yılında üretime başlayan şirketimiz, ortaklık yapısındaki değişimin ardından 2010’dan beri KAYBAKS markasıyla faaliyet gösteriyor.</p><p>Kurulduğumuz günden bu yana kalite ve müşteri memnuniyetini merkeze alan üretim politikamızı koruyor; değişen teknolojiyi takip ederek ürün ve hizmet kabiliyetimizi geliştiriyoruz.</p><p>Normal kutu, mukavva levha, teleskopik ve kalıp kesim kutular, ondüle ürünler, mobilya sektörüne yönelik demonte kutular ve özel tasarım ambalajları istenen gramajlarda üretiyoruz.</p></div>
        <ol className="kb3-timeline"><li><b>1999</b><span>Oluklu mukavva üretimine başlangıç</span></li><li><b>2010</b><span>KAYBAKS markasıyla yeni dönem</span></li><li><b>Bugün</b><span>Farklı sektörlere üretim ve hizmet</span></li></ol>
      </div>
    </section>

    <section className="kp-section kb3-service-model">
      <div className="kp-container"><header className="kb3-section-head kb3-section-head-light"><div><small>HİZMET ANLAYIŞI / 02</small><h2>Satıştan sonra da yanınızdayız</h2></div><p>Müşteri temsilcilerimizi yalnızca satış ekibi değil, ambalaj ürün ve hizmet danışmanı olarak konumlandırıyoruz.</p></header>
        <div className="kb3-service-grid"><article><Handshake /><h3>Yakın iletişim</h3><p>İhtiyacın belirlenmesinden satış sonrası desteğe kadar aynı ekip yaklaşımı.</p></article><article><PackageCheck /><h3>İstenen kalite</h3><p>Ürüne, kullanım biçimine ve bütçeye uygun ambalaj planlaması.</p></article><article><Truck /><h3>Kendi araç filomuz</h3><p>Kayseri içi teslimatlarda hasar ve gecikme riskini azaltan şirket içi sevkiyat.</p></article></div>
      </div>
    </section>

    <section className="kp-section kb3-sector-proof">
      <div className="kp-container kb3-sector-proof-grid"><div><p className="kb3-eyebrow">ÇALIŞTIĞIMIZ ALANLAR / 03</p><h2>Farklı sektörlerin farklı ihtiyaçlarına üretim</h2><p>Ambalaj yapısını sektör adından önce ürünün ölçüsü, ağırlığı, hassasiyeti ve sevkiyat koşulları belirler.</p><div className="kb3-sector-list">{sectors.map((sector, index) => <span key={sector}><b>0{index + 1}</b>{sector}</span>)}</div></div><figure><KraftImage src="/media/enhanced/box-types-hd.jpg" alt="Farklı ölçü ve biçimlerde karton kutu çeşitleri" width={1536} height={1024} /><figcaption>Farklı ölçü ve kullanım biçimleri için kutu seçenekleri</figcaption></figure></div>
    </section>
    <QuoteBand />
  </>;
}
