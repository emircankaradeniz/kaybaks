"use client";

import { z } from "zod";
import { useState } from "react";

const quoteSchema = z.object({
  fullName: z.string().min(2, "Ad Soyad alanı zorunludur."),
  companyName: z.string().min(2, "Firma adı alanı zorunludur."),
  phone: z.string().min(10, "Telefon numarası giriniz."),
  email: z.email("Geçerli bir e-posta adresi giriniz."),
  product: z.string().min(2, "İlgilenilen ürünü seçiniz."),
  quantity: z.string().min(1, "Tahmini adet bilgisini giriniz."),
  message: z.string().min(10, "Mesaj alanına kısa bir ihtiyaç özeti yazınız."),
  kvkk: z.boolean().refine((value) => value, "KVKK onayı gereklidir."),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const initialValues: QuoteFormData = {
  fullName: "",
  companyName: "",
  phone: "",
  email: "",
  product: "",
  quantity: "",
  message: "",
  kvkk: false,
};

type ContactFormProps = {
  productOptions: string[];
};

export function ContactForm({ productOptions }: ContactFormProps) {
  const [values, setValues] = useState<QuoteFormData>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "ready">("idle");

  function updateField<K extends keyof QuoteFormData>(field: K, value: QuoteFormData[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = quoteSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        fullName: fieldErrors.fullName?.[0],
        companyName: fieldErrors.companyName?.[0],
        phone: fieldErrors.phone?.[0],
        email: fieldErrors.email?.[0],
        product: fieldErrors.product?.[0],
        quantity: fieldErrors.quantity?.[0],
        message: fieldErrors.message?.[0],
        kvkk: fieldErrors.kvkk?.[0],
      });
      setStatus("invalid");
      return;
    }

    setErrors({});
    setStatus("ready");
  }

  return (
    <form id="teklif" onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <Field
          label="Ad Soyad"
          name="fullName"
          value={values.fullName}
          onChange={(value) => updateField("fullName", value)}
          error={errors.fullName}
        />
        <Field
          label="Firma Adı"
          name="companyName"
          value={values.companyName}
          onChange={(value) => updateField("companyName", value)}
          error={errors.companyName}
        />
        <Field
          label="Telefon"
          name="phone"
          value={values.phone}
          onChange={(value) => updateField("phone", value)}
          error={errors.phone}
        />
        <Field
          label="E-posta"
          name="email"
          type="email"
          value={values.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
        />
        <div>
          <label htmlFor="product" className="mb-2 block text-sm font-semibold text-white">
            İlgilendiğiniz Ürün
          </label>
          <select
            id="product"
            name="product"
            value={values.product}
            onChange={(event) => updateField("product", event.target.value)}
            className="h-13 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white"
          >
            <option value="">Ürün seçiniz</option>
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.product ? <p className="mt-2 text-sm text-rose-300">{errors.product}</p> : null}
        </div>
        <Field
          label="Tahmini Adet"
          name="quantity"
          value={values.quantity}
          onChange={(value) => updateField("quantity", value)}
          error={errors.quantity}
        />
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white">
            Mesajınız
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
          />
          {errors.message ? <p className="mt-2 text-sm text-rose-300">{errors.message}</p> : null}
        </div>
      </div>
      <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/4 p-4 text-sm text-stone-200">
        <input
          type="checkbox"
          checked={values.kvkk}
          onChange={(event) => updateField("kvkk", event.target.checked)}
          className="mt-1 h-4 w-4 accent-amber-300"
        />
        <span>KVKK metnini okudum ve kabul ediyorum.</span>
      </label>
      {errors.kvkk ? <p className="text-sm text-rose-300">{errors.kvkk}</p> : null}
      <button
        type="submit"
        className="inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-amber-300 px-5 text-sm font-bold uppercase tracking-[0.18em] text-stone-950"
      >
        Teklif Talebi Gönder
      </button>
      {status === "invalid" ? (
        <p className="text-sm text-stone-300/78">
          Form alanlarını kontrol ederek eksik veya hatalı bilgileri düzeltin.
        </p>
      ) : null}
      {status === "ready" ? (
        <p className="text-sm text-stone-300/78">
          Form doğrulaması tamamlandı. Bu projede henüz arka uç ve e-posta servisi
          tanımlanmadığı için veri gönderimi yapılmıyor.
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
};

function Field({ label, name, value, onChange, error, type = "text" }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-white">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-13 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white"
      />
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
