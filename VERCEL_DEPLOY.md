# KAYBAKS — Vercel yayınlama

## Vercel panelinde

1. **Add New → Project** ile GitHub deposunu içe aktarın.
2. Root Directory olarak uygulamanın bulunduğu klasörü seçin (`package.json` bu klasörde olmalı).
3. Framework Preset: **Next.js**. Build ve Output ayarlarını değiştirmeyin.
4. Storage bölümünden **Blob** deposu oluşturun ve projeye bağlayın. Erişim türü **Private** olmalıdır. Vercel `BLOB_READ_WRITE_TOKEN` değişkenini otomatik ekler.
5. Settings → Environment Variables bölümüne aşağıdaki değişkenleri Production, Preview ve Development için ekleyin:

   - `ADMIN_PASSWORD`: yönetim panelinde kullanacağınız güçlü şifre
   - `ADMIN_SESSION_SECRET`: en az 32 karakterlik rastgele bir değer
   - `NEXT_PUBLIC_SITE_URL`: yayın adresiniz (ör. `https://www.kaybaks.com.tr`)

6. Deploy düğmesine basın.

## Önemli

- Yönetim panelindeki ürünler, site ayarları ve yüklenen görseller Vercel Blob üzerinde kalıcı saklanır.
- Vercel sunucu yüklemeleri için görsel sınırı 4 MB'tır.
- Alan adı bağlandıktan sonra ek kod değişikliği gerekmez.
