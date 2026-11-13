"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Arrow, buttonClasses } from "@/components/ui/button";
import { features, type FeatureSlug } from "@/content/features";
import { cn } from "@/lib/utils";
import {
  FIELD_ORDER,
  LIMITS,
  companyTypes,
  contactPlainText,
  hasErrors,
  normalizeContact,
  teamSizes,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "./validation";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "fallback"; mailto: string }
  | { kind: "error"; message: string; mailto?: string };

const EMPTY: ContactInput = {
  name: "",
  email: "",
  company: "",
  phone: "",
  companyType: "",
  teamSize: "",
  modules: [],
  message: "",
  consent: false,
  website: "",
};

function buildMailto(to: string, input: ContactInput) {
  const subject = `Demo talebi: ${input.company}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(contactPlainText(input))}`;
}

const inputCls =
  "block w-full rounded-sm border border-line-strong bg-white px-3.5 text-[0.9375rem] text-ink-950 placeholder:text-ink-400 transition-colors duration-150 hover:border-ink-400 focus:border-brand-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-600 aria-[invalid=true]:border-risk";

export function ContactForm({ supportEmail }: { supportEmail: string }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // İlk gönderim denemesinden sonra hatalar yazdıkça güncellenir
    if (attempted) setErrors(validateContact(normalizeContact(next)));
  };

  const toggleModule = (slug: FeatureSlug, checked: boolean) =>
    update("modules", checked ? [...values.modules, slug] : values.modules.filter((m) => m !== slug));

  const focusFirstError = (errs: ContactErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    el?.focus();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setAttempted(true);

    const input = normalizeContact(values);
    const errs = validateContact(input);
    setErrors(errs);
    if (hasErrors(errs)) {
      setStatus({ kind: "idle" });
      focusFirstError(errs);
      return;
    }

    setStatus({ kind: "submitting" });
    const mailto = buildMailto(supportEmail, input);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: ContactErrors;
        fallback?: string;
      };

      if (res.ok && data.ok) {
        setStatus({ kind: "success" });
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (data.fallback === "mailto") {
        setStatus({ kind: "fallback", mailto });
        return;
      }
      if (res.status === 400 && data.errors && hasErrors(data.errors)) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
        focusFirstError(data.errors);
        return;
      }
      setStatus({ kind: "error", message: data.error ?? "Talebiniz gönderilemedi. Lütfen tekrar deneyin.", mailto });
    } catch {
      setStatus({ kind: "error", message: "Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.", mailto });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-5 py-6 focus:outline-none"
      >
        <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ok">Talep alındı</span>
        <h3 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-ink-950">
          Teşekkürler, demo talebiniz bize ulaştı.
        </h3>
        <p className="max-w-lg text-pretty leading-relaxed text-ink-600">
          Görüşme zamanını planlamak için <strong className="font-medium text-ink-950">{values.email.trim()}</strong>{" "}
          adresinden size dönüş yapacağız. Bu arada eklemek istediğiniz bir şey olursa{" "}
          <a href={`mailto:${supportEmail}`} className="text-brand-700 underline underline-offset-4">
            {supportEmail}
          </a>{" "}
          adresine yazabilirsiniz.
        </p>
        <Link href="/ozellikler" className={buttonClasses({ variant: "secondary" })}>
          Modülleri inceleyin
          <Arrow />
        </Link>
      </div>
    );
  }

  const errorIds = (f: ContactField, hint?: boolean) =>
    cn(hint && id(`${f}-hint`), errors[f] && id(`${f}-error`)) || undefined;

  const errorCount = FIELD_ORDER.filter((f) => errors[f]).length;
  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id("required-note")} className="relative space-y-7">
      <p id={id("required-note")} className="text-sm text-ink-500">
        <span aria-hidden className="text-risk">*</span> ile işaretli alanlar zorunludur.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Ad soyad" required htmlFor={id("name")} error={errors.name} errorId={id("name-error")}>
          <input
            id={id("name")}
            data-field="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name.max}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errorIds("name")}
            className={cn(inputCls, "h-11")}
          />
        </Field>

        <Field label="İş e-postası" required htmlFor={id("email")} error={errors.email} errorId={id("email-error")}>
          <input
            id={id("email")}
            data-field="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email.max}
            placeholder="ad.soyad@firma.com.tr"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errorIds("email")}
            className={cn(inputCls, "h-11")}
          />
        </Field>

        <Field label="Firma" required htmlFor={id("company")} error={errors.company} errorId={id("company-error")}>
          <input
            id={id("company")}
            data-field="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            maxLength={LIMITS.company.max}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errorIds("company")}
            className={cn(inputCls, "h-11")}
          />
        </Field>

        <Field label="Telefon" htmlFor={id("phone")} error={errors.phone} errorId={id("phone-error")}>
          <input
            id={id("phone")}
            data-field="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone.max}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errorIds("phone")}
            className={cn(inputCls, "h-11")}
          />
        </Field>

        <Field label="Firma tipi" htmlFor={id("companyType")} error={errors.companyType} errorId={id("companyType-error")}>
          <Select
            id={id("companyType")}
            field="companyType"
            value={values.companyType}
            options={companyTypes}
            onChange={(v) => update("companyType", v)}
            invalid={!!errors.companyType}
            describedBy={errorIds("companyType")}
          />
        </Field>

        <Field label="Ekip büyüklüğü" htmlFor={id("teamSize")} error={errors.teamSize} errorId={id("teamSize-error")}>
          <Select
            id={id("teamSize")}
            field="teamSize"
            value={values.teamSize}
            options={teamSizes}
            optionLabel={(o) => `${o} kişi`}
            onChange={(v) => update("teamSize", v)}
            invalid={!!errors.teamSize}
            describedBy={errorIds("teamSize")}
          />
        </Field>
      </div>

      <fieldset aria-describedby={errorIds("modules", true)}>
        <legend className="text-[0.9375rem] font-medium text-ink-950">İlgilendiğiniz modüller</legend>
        <p id={id("modules-hint")} className="mt-1 text-sm text-ink-500">
          İsteğe bağlı; görüşmeyi bu modüllere göre hazırlarız.
        </p>
        <div className="mt-3 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {features.map((f, i) => {
            const checked = values.modules.includes(f.slug);
            return (
              <label
                key={f.slug}
                className={cn(
                  "flex cursor-pointer items-center gap-3 bg-white px-3.5 py-3 text-[0.9375rem] text-ink-800 transition-colors duration-150 hover:bg-paper",
                  checked && "bg-brand-50 text-ink-950 hover:bg-brand-50",
                  // Tek sayıda öğe: son öğe iki sütunu kaplar
                  i === features.length - 1 && features.length % 2 === 1 && "sm:col-span-2"
                )}
              >
                <input
                  type="checkbox"
                  name="modules"
                  value={f.slug}
                  data-field={i === 0 ? "modules" : undefined}
                  checked={checked}
                  onChange={(e) => toggleModule(f.slug, e.target.checked)}
                  className="size-4 shrink-0 rounded-xs accent-brand-600"
                />
                <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-ink-500">{f.code}</span>
                <span>{f.name}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field
        label="Mesaj"
        htmlFor={id("message")}
        error={errors.message}
        errorId={id("message-error")}
        hint={`Projeleriniz, saha sayınız veya özellikle görmek istedikleriniz. En fazla ${LIMITS.message.max} karakter.`}
        hintId={id("message-hint")}
      >
        <textarea
          id={id("message")}
          data-field="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errorIds("message", true)}
          className={cn(inputCls, "min-h-32 resize-y py-3 leading-relaxed")}
        />
      </Field>

      {/* Honeypot: ekran okuyuculardan ve klavyeden gizli */}
      <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Web siteniz (boş bırakın)</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            data-field="consent"
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errorIds("consent")}
            className="mt-1 size-4 shrink-0 rounded-xs accent-brand-600"
          />
          <label htmlFor={id("consent")} className="text-sm leading-relaxed text-ink-700">
            Kişisel verilerimin demo talebimin yanıtlanması amacıyla işlenmesine ilişkin{" "}
            <Link href="/kvkk" className="text-brand-700 underline underline-offset-4 hover:text-brand-800">
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum. <span aria-hidden className="text-risk">*</span>
            <span className="sr-only">(zorunlu)</span>
          </label>
        </div>
        {errors.consent && <ErrorText id={id("consent-error")}>{errors.consent}</ErrorText>}
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={submitting} aria-disabled={submitting} className={buttonClasses({ size: "lg" })}>
          {submitting ? "Gönderiliyor…" : "Demo talebini gönder"}
          {!submitting && <Arrow />}
        </button>
        <p className="text-sm text-ink-500">
          Ya da doğrudan{" "}
          <a href={`mailto:${supportEmail}`} className="text-brand-700 underline underline-offset-4">
            {supportEmail}
          </a>
        </p>
      </div>

      {/* Durum bildirimi: ekran okuyucular için canlı bölge */}
      <div aria-live="polite" role="status" className="empty:hidden">
        {attempted && errorCount > 0 && status.kind === "idle" && (
          <p className="text-sm text-risk">
            {errorCount === 1 ? "1 alanda düzeltme gerekiyor." : `${errorCount} alanda düzeltme gerekiyor.`}
          </p>
        )}
        {submitting && <p className="sr-only">Talebiniz gönderiliyor.</p>}
        {status.kind === "fallback" && (
          <Notice tone="warn" title="Form şu an e-postayla iletilemiyor">
            <p>
              Bilgileriniz hazır. Aşağıdaki bağlantı, e-posta uygulamanızda talebinizi içeren bir taslak açar; göndermeniz
              yeterli.
            </p>
            <a href={status.mailto} className={cn(buttonClasses({ variant: "secondary", size: "sm" }), "mt-3")}>
              E-posta taslağını aç
              <Arrow />
            </a>
          </Notice>
        )}
        {status.kind === "error" && (
          <Notice tone="risk" title="Talebiniz gönderilemedi">
            <p>{status.message}</p>
            {status.mailto && (
              <p className="mt-2">
                Dilerseniz{" "}
                <a href={status.mailto} className="text-brand-700 underline underline-offset-4">
                  e-posta taslağı ile gönderin
                </a>
                .
              </p>
            )}
          </Notice>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  errorId,
  hint,
  hintId,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[0.9375rem] font-medium text-ink-950">
        {label}
        {required && (
          <>
            {" "}
            <span aria-hidden className="text-risk">
              *
            </span>
            <span className="sr-only">(zorunlu)</span>
          </>
        )}
      </label>
      {children}
      {hint && (
        <p id={hintId} className="mt-2 text-sm text-ink-500">
          {hint}
        </p>
      )}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-risk">
      <svg aria-hidden viewBox="0 0 16 16" className="mt-[3px] size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 1.5 15 14H1L8 1.5Z" strokeLinejoin="round" />
        <path d="M8 6v3.5M8 11.5v.5" strokeLinecap="square" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

function Select({
  id,
  field,
  value,
  options,
  optionLabel = (o) => o,
  onChange,
  invalid,
  describedBy,
}: {
  id: string;
  field: ContactField;
  value: string;
  options: readonly string[];
  optionLabel?: (o: string) => string;
  onChange: (v: string) => void;
  invalid: boolean;
  describedBy?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        data-field={field}
        name={field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        className={cn(inputCls, "h-11 appearance-none pr-10", !value && "text-ink-500")}
      >
        <option value="">Seçin</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink-950">
            {optionLabel(o)}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="m4 6 4 4 4-4" strokeLinecap="square" />
      </svg>
    </div>
  );
}

function Notice({ tone, title, children }: { tone: "warn" | "risk"; title: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-sm border-l-2 bg-paper px-4 py-3.5 text-sm leading-relaxed text-ink-700",
        tone === "warn" ? "border-warn" : "border-risk"
      )}
    >
      <p className="mb-1 font-semibold text-ink-950">{title}</p>
      {children}
    </div>
  );
}
