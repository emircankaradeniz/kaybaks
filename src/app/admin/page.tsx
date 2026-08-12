"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  cropX: number;
  cropY: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
type MediaItem = {
  id: string;
  objectKey: string;
  filename: string;
  contentType: string;
  size: number;
  createdAt: string;
  url: string;
};
type Settings = Record<string, string>;
type Tab = "dashboard" | "products" | "settings" | "media";

const emptyProduct: Product = {
  id: "",
  slug: "",
  name: "",
  category: "Kutu Çözümleri",
  shortDescription: "",
  description: "",
  imageUrl: "",
  cropX: 67,
  cropY: 728,
  sortOrder: 0,
  isActive: true,
  createdAt: "",
  updatedAt: "",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<Settings>({});
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const activeProducts = useMemo(
    () => products.filter((p) => p.isActive).length,
    [products],
  );
  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((d) => {
        setAuthenticated(d.authenticated);
        if (d.authenticated) loadContent();
      })
      .catch(() => setAuthenticated(false));
  }, []);

  async function loadContent() {
    const r = await fetch("/api/admin/content", { cache: "no-store" });
    if (r.status === 401) {
      setAuthenticated(false);
      return;
    }
    const d = await r.json();
    setProducts(d.products ?? []);
    setSettings(d.settings ?? {});
    setMedia(d.media ?? []);
  }
  async function action(payload: Record<string, unknown>) {
    setBusy(true);
    setNotice("");
    const r = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) throw new Error(d.error || "İşlem başarısız.");
    return d;
  }
  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }
  async function login(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setLoginError("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) {
      setLoginError(d.error || "Giriş yapılamadı.");
      return;
    }
    setAuthenticated(true);
    setPassword("");
    await loadContent();
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }
  async function saveProduct(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    try {
      await action({ action: "saveProduct", product: editing });
      setEditing(null);
      await loadContent();
      flash("Ürün başarıyla kaydedildi.");
    } catch (error) {
      flash(error instanceof Error ? error.message : "Kaydedilemedi.");
    }
  }
  async function deleteProduct(product: Product) {
    if (
      !window.confirm(
        `“${product.name}” ürününü silmek istediğinize emin misiniz?`,
      )
    )
      return;
    try {
      await action({ action: "deleteProduct", id: product.id });
      await loadContent();
      flash("Ürün silindi.");
    } catch (error) {
      flash(error instanceof Error ? error.message : "Silinemedi.");
    }
  }
  async function saveSettings(e: FormEvent) {
    e.preventDefault();
    try {
      await action({ action: "saveSettings", settings });
      await loadContent();
      flash("Site bilgileri güncellendi.");
    } catch (error) {
      flash(error instanceof Error ? error.message : "Kaydedilemedi.");
    }
  }
  async function uploadFile(file: File) {
    setBusy(true);
    const form = new FormData();
    form.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: form });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) {
      flash(d.error || "Yüklenemedi.");
      return;
    }
    await loadContent();
    flash("Görsel medya kütüphanesine eklendi.");
  }
  async function deleteMedia(item: MediaItem) {
    if (
      !window.confirm(
        `“${item.filename}” görselini silmek istediğinize emin misiniz?`,
      )
    )
      return;
    await action({ action: "deleteMedia", objectKey: item.objectKey });
    await loadContent();
    flash("Görsel silindi.");
  }

  if (authenticated === null)
    return (
      <div className="admin-app admin-loading">
        <div className="admin-spinner" />
        <p>Yönetim paneli hazırlanıyor…</p>
      </div>
    );
  if (!authenticated)
    return (
      <div className="admin-app admin-login">
        <div className="admin-login-card">
          <div className="admin-brand">
            KAY<span>BAKS</span>
            <small>YÖNETİM PANELİ</small>
          </div>
          <h1>Yönetici Girişi</h1>
          <p>Site içeriklerini düzenlemek için şifrenizle giriş yapın.</p>
          <form onSubmit={login}>
            <label>Yönetici şifresi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              autoFocus
              required
            />
            {loginError && <div className="admin-error">{loginError}</div>}
            <button className="admin-primary" disabled={busy}>
              {busy ? "Giriş yapılıyor…" : "Giriş Yap"}
            </button>
          </form>
          <Link href="/">← Siteye dön</Link>
        </div>
      </div>
    );

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          KAY<span>BAKS</span>
          <small>YÖNETİM PANELİ</small>
        </div>
        <nav>
          {[
            ["dashboard", "▦", "Genel Bakış"],
            ["products", "▣", "Ürünler"],
            ["settings", "⚙", "Site Bilgileri"],
            ["media", "▧", "Medya Kütüphanesi"],
          ].map(([key, icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key as Tab)}
              className={tab === key ? "active" : ""}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <a href="/" target="_blank">
            ↗ Siteyi Görüntüle
          </a>
          <button onClick={logout}>⇥ Çıkış Yap</button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-breadcrumb">KAYBAKS / Yönetim</span>
            <h1>
              {
                {
                  dashboard: "Genel Bakış",
                  products: "Ürün Yönetimi",
                  settings: "Site Bilgileri",
                  media: "Medya Kütüphanesi",
                }[tab]
              }
            </h1>
          </div>
          <div className="admin-user">
            <span>KA</span>
            <div>
              <strong>Yönetici</strong>
              <small>Tam yetkili</small>
            </div>
          </div>
        </header>
        {notice && <div className="admin-toast">✓ {notice}</div>}
        <div className="admin-content">
          {tab === "dashboard" && (
            <>
              <div className="admin-stats">
                <Stat
                  label="Toplam Ürün"
                  value={String(products.length)}
                  note={`${activeProducts} aktif ürün`}
                  icon="▣"
                />
                <Stat
                  label="Medya Dosyası"
                  value={String(media.length)}
                  note="Yüklenmiş görsel"
                  icon="▧"
                />
                <Stat
                  label="İletişim"
                  value={settings.phone || "—"}
                  note={settings.email || ""}
                  icon="☎"
                />
                <Stat
                  label="Site Durumu"
                  value="Yayında"
                  note="Tüm sistemler çalışıyor"
                  icon="●"
                />
              </div>
              <div className="admin-grid-2">
                <section className="admin-panel">
                  <div className="admin-panel-head">
                    <div>
                      <h2>Son Ürünler</h2>
                      <p>Yakın zamanda güncellenen içerikler</p>
                    </div>
                    <button onClick={() => setTab("products")}>
                      Tümünü Gör
                    </button>
                  </div>
                  <div className="admin-list">
                    {products.slice(0, 5).map((p) => (
                      <div className="admin-list-row" key={p.id}>
                        <ProductThumb product={p} />
                        <div>
                          <strong>{p.name}</strong>
                          <small>{p.category}</small>
                        </div>
                        <span
                          className={
                            p.isActive ? "status-active" : "status-passive"
                          }
                        >
                          {p.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="admin-panel">
                  <div className="admin-panel-head">
                    <div>
                      <h2>Hızlı İşlemler</h2>
                      <p>Sık kullanılan yönetim araçları</p>
                    </div>
                  </div>
                  <div className="quick-actions">
                    <button
                      onClick={() => {
                        setEditing({
                          ...emptyProduct,
                          sortOrder: products.length,
                        });
                        setTab("products");
                      }}
                    >
                      <b>＋</b>
                      <span>
                        <strong>Yeni Ürün Ekle</strong>
                        <small>Ürün kataloğuna yeni kayıt</small>
                      </span>
                    </button>
                    <button onClick={() => setTab("media")}>
                      <b>↑</b>
                      <span>
                        <strong>Görsel Yükle</strong>
                        <small>Medya kütüphanesini yönet</small>
                      </span>
                    </button>
                    <button onClick={() => setTab("settings")}>
                      <b>⚙</b>
                      <span>
                        <strong>İletişim Bilgileri</strong>
                        <small>Telefon ve adresi güncelle</small>
                      </span>
                    </button>
                  </div>
                </section>
              </div>
            </>
          )}
          {tab === "products" && (
            <section className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>Ürünler</h2>
                  <p>Ürün ekleyin, düzenleyin, yayından kaldırın veya silin.</p>
                </div>
                <button
                  className="admin-primary compact"
                  onClick={() =>
                    setEditing({ ...emptyProduct, sortOrder: products.length })
                  }
                >
                  ＋ Yeni Ürün
                </button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ürün</th>
                      <th>Kategori</th>
                      <th>Sıra</th>
                      <th>Durum</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="product-cell">
                            <ProductThumb product={p} />
                            <div>
                              <strong>{p.name}</strong>
                              <small>/{p.slug}</small>
                            </div>
                          </div>
                        </td>
                        <td>{p.category}</td>
                        <td>{p.sortOrder}</td>
                        <td>
                          <span
                            className={
                              p.isActive ? "status-active" : "status-passive"
                            }
                          >
                            {p.isActive ? "Yayında" : "Gizli"}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button onClick={() => setEditing({ ...p })}>
                              Düzenle
                            </button>
                            <button
                              className="danger"
                              onClick={() => deleteProduct(p)}
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {tab === "settings" && (
            <form className="admin-settings" onSubmit={saveSettings}>
              <section className="admin-panel">
                <div className="admin-panel-head">
                  <div>
                    <h2>İletişim Bilgileri</h2>
                    <p>Sitenin her yerinde kullanılan iletişim bilgileri.</p>
                  </div>
                </div>
                <div className="admin-form-grid">
                  <Field
                    label="Firma Adı"
                    value={settings.company_name}
                    onChange={(v) =>
                      setSettings({ ...settings, company_name: v })
                    }
                  />
                  <Field
                    label="Telefon"
                    value={settings.phone}
                    onChange={(v) => setSettings({ ...settings, phone: v })}
                  />
                  <Field
                    label="Telefon Bağlantısı"
                    value={settings.phone_href}
                    onChange={(v) =>
                      setSettings({ ...settings, phone_href: v })
                    }
                  />
                  <Field
                    label="E-posta"
                    value={settings.email}
                    onChange={(v) => setSettings({ ...settings, email: v })}
                  />
                  <Field
                    className="wide"
                    label="Adres"
                    value={settings.address}
                    onChange={(v) => setSettings({ ...settings, address: v })}
                  />
                </div>
              </section>
              <section className="admin-panel">
                <div className="admin-panel-head">
                  <div>
                    <h2>Ana Sayfa</h2>
                    <p>Hero metinlerini, sayıları ve ana görseli düzenleyin.</p>
                  </div>
                </div>
                <div className="admin-form-grid">
                  <Field
                    className="wide"
                    label="Üst Başlık"
                    value={settings.hero_eyebrow}
                    onChange={(v) =>
                      setSettings({ ...settings, hero_eyebrow: v })
                    }
                  />
                  <Field
                    className="wide"
                    label="Ana Başlık"
                    value={settings.hero_title}
                    onChange={(v) =>
                      setSettings({ ...settings, hero_title: v })
                    }
                  />
                  <Field
                    className="wide"
                    multiline
                    label="Açıklama"
                    value={settings.hero_description}
                    onChange={(v) =>
                      setSettings({ ...settings, hero_description: v })
                    }
                  />
                  <MediaPicker
                    label="Ana Görsel"
                    value={settings.hero_image}
                    media={media}
                    onChange={(v) =>
                      setSettings({ ...settings, hero_image: v })
                    }
                  />
                  <Field
                    label="Mutlu Müşteri"
                    value={settings.customer_count}
                    onChange={(v) =>
                      setSettings({ ...settings, customer_count: v })
                    }
                  />
                  <Field
                    label="Yıllık Deneyim"
                    value={settings.experience_years}
                    onChange={(v) =>
                      setSettings({ ...settings, experience_years: v })
                    }
                  />
                  <Field
                    label="Üretim Alanı"
                    value={settings.production_area}
                    onChange={(v) =>
                      setSettings({ ...settings, production_area: v })
                    }
                  />
                  <Field
                    label="Proje Sayısı"
                    value={settings.project_count}
                    onChange={(v) =>
                      setSettings({ ...settings, project_count: v })
                    }
                  />
                </div>
              </section>
              <button className="admin-primary save-settings" disabled={busy}>
                {busy ? "Kaydediliyor…" : "Değişiklikleri Kaydet"}
              </button>
            </form>
          )}
          {tab === "media" && (
            <section className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>Medya Kütüphanesi</h2>
                  <p>Ürünlerde ve sayfalarda kullanacağınız görseller.</p>
                </div>
                <label className="admin-primary compact upload-button">
                  ↑ Görsel Yükle
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files?.[0] && uploadFile(e.target.files[0])
                    }
                  />
                </label>
              </div>
              <label className="drop-zone">
                ↑<strong>Görsel yüklemek için tıklayın</strong>
                <small>PNG, JPG, WEBP — en fazla 8 MB</small>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && uploadFile(e.target.files[0])
                  }
                />
              </label>
              {media.length === 0 ? (
                <div className="empty-state">
                  <b>▧</b>
                  <h3>Henüz görsel yüklenmedi</h3>
                  <p>
                    İlk görselinizi yükleyerek medya kütüphanesini oluşturun.
                  </p>
                </div>
              ) : (
                <div className="media-grid">
                  {media.map((item) => (
                    <article key={item.id}>
                      <img src={item.url} alt={item.filename} />
                      <div>
                        <strong title={item.filename}>{item.filename}</strong>
                        <small>{(item.size / 1024).toFixed(0)} KB</small>
                        <button onClick={() => deleteMedia(item)}>Sil</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      {editing && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setEditing(null);
          }}
        >
          <form className="admin-modal" onSubmit={saveProduct}>
            <header>
              <div>
                <span>ÜRÜN YÖNETİMİ</span>
                <h2>{editing.id ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>
              </div>
              <button type="button" onClick={() => setEditing(null)}>
                ×
              </button>
            </header>
            <div className="admin-modal-body">
              <div className="admin-form-grid">
                <Field
                  label="Ürün Adı"
                  value={editing.name}
                  onChange={(v) =>
                    setEditing({
                      ...editing,
                      name: v,
                      slug: editing.id ? editing.slug : slugify(v),
                    })
                  }
                />
                <Field
                  label="Bağlantı Adı"
                  value={editing.slug}
                  onChange={(v) => setEditing({ ...editing, slug: slugify(v) })}
                />
                <label>
                  <span>Kategori</span>
                  <select
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({ ...editing, category: e.target.value })
                    }
                  >
                    {[
                      "Kutu Çözümleri",
                      "Levha & Mukavva",
                      "Özel Tasarım",
                      "Demonte & Mobilya",
                      "Koruyucu Ürünler",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <Field
                  label="Sıralama"
                  type="number"
                  value={String(editing.sortOrder)}
                  onChange={(v) =>
                    setEditing({ ...editing, sortOrder: Number(v) })
                  }
                />
                <Field
                  className="wide"
                  label="Kısa Açıklama"
                  value={editing.shortDescription}
                  onChange={(v) =>
                    setEditing({ ...editing, shortDescription: v })
                  }
                />
                <Field
                  className="wide"
                  multiline
                  label="Detaylı Açıklama"
                  value={editing.description}
                  onChange={(v) => setEditing({ ...editing, description: v })}
                />
                <MediaPicker
                  label="Ürün Görseli"
                  value={editing.imageUrl}
                  media={media}
                  onChange={(v) => setEditing({ ...editing, imageUrl: v })}
                />
                <label className="switch-field">
                  <span>Yayın Durumu</span>
                  <button
                    type="button"
                    className={editing.isActive ? "switch on" : "switch"}
                    onClick={() =>
                      setEditing({ ...editing, isActive: !editing.isActive })
                    }
                  >
                    <i />
                    {editing.isActive ? "Yayında" : "Gizli"}
                  </button>
                </label>
              </div>
            </div>
            <footer>
              <button type="button" onClick={() => setEditing(null)}>
                Vazgeç
              </button>
              <button className="admin-primary" disabled={busy}>
                {busy ? "Kaydediliyor…" : "Ürünü Kaydet"}
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  icon,
}: {
  label: string;
  value: string;
  note: string;
  icon: string;
}) {
  return (
    <article className="admin-stat">
      <div className="admin-stat-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}
function ProductThumb({ product }: { product: Product }) {
  return product.imageUrl ? (
    <img className="admin-thumb" src={product.imageUrl} alt="" />
  ) : (
    <div
      className="admin-thumb product-sprite"
      style={{ backgroundPosition: `-${product.cropX}px -${product.cropY}px` }}
    />
  );
}
function Field({
  label,
  value,
  onChange,
  className = "",
  multiline = false,
  type = "text",
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  className?: string;
  multiline?: boolean;
  type?: string;
}) {
  return (
    <label className={className}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
function MediaPicker({
  label,
  value,
  media,
  onChange,
}: {
  label: string;
  value?: string;
  media: MediaItem[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="wide">
      <span>{label}</span>
      <div className="media-picker">
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Varsayılan görseli kullan</option>
          {media.map((item) => (
            <option key={item.id} value={item.url}>
              {item.filename}
            </option>
          ))}
        </select>
        {value && <img src={value} alt="Seçili görsel" />}
      </div>
    </label>
  );
}
function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
