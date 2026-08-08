import Link from "next/link";
import { company, footerGroups, primaryNav } from "@/data/company";
import { LogoMark } from "@/components/ui/logo-mark";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-space border-t border-white/8 pb-10">
      <div className="container-shell">
        <div className="grid gap-8 rounded-[1.8rem] border border-white/10 bg-white/4 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr]">
          <div>
            <LogoMark />
            <p className="mt-5 max-w-sm text-sm leading-7 text-stone-300/75">
              Kayseri merkezli oluklu mukavva, karton kutu ve özel ölçü ambalaj
              çözümlerini kurumsal, modern ve güven veren bir dille sunan üretim odaklı web
              deneyimi.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="heading-display text-2xl uppercase text-white">{group.title}</h2>
              <div className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-stone-300/75 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h2 className="heading-display text-2xl uppercase text-white">İletişim</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-stone-300/78">
              <p>{company.addressLine}</p>
              <p>{company.locality}</p>
              <p>
                <a href={`tel:${company.phoneHref}`} className="hover:text-white">
                  {company.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </p>
              <p>
                <a href={company.youtube} target="_blank" rel="noreferrer" className="hover:text-white">
                  YouTube
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <p>© {currentYear} KAYBAKS. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
