"use client";
import { useState, useRef } from "react";
import { siteContent, t } from "@/content/site";
import FadeIn from "@/components/ui/FadeIn";
import PrivacyNotice from "@/components/ui/PrivacyNotice";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917498245215";

const ENQUIRY_TYPES = [
  { value: "hire-manpower", label: "Hire Manpower (Primeworkforce)" },
  { value: "training",      label: "Forklift Training Enrolment" },
  { value: "fish-enquiry",  label: "Flins & Flora — Fish Enquiry" },
  { value: "general",       label: "General Enquiry" },
] as const;

type Status = "idle" | "loading" | "success" | "error" | "email-failed";

interface FormState {
  name: string; phone: string; email: string;
  type: string; message: string; consent: boolean;
}

const INIT: FormState = {
  name: "", phone: "", email: "", type: "general", message: "", consent: false,
};

const inputCls =
  "w-full p-3 rounded-md bg-background border border-border focus:outline-none focus:border-primary transition-colors";

export default function ContactPage() {
  const [form, setForm]         = useState<FormState>(INIT);
  const [status, setStatus]     = useState<Status>("idle");
  const isLoading               = status === "loading";
  const [fieldErr, setFieldErr] = useState<Record<string, string[]>>({});
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  // Hidden: ms timestamp when the form was first mounted (anti-spam fill-time check)
  const startTime = useRef(Date.now().toString());

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErr({});
    setWhatsappUrl(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          consent: form.consent,
          _t: startTime.current,
          // honeypot — the real `website` input is visually hidden; bots fill it
          website: (e.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value ?? "",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 422 && data.fields) {
        setFieldErr(data.fields);
        setStatus("idle");
        return;
      }
      if (data.whatsappUrl && typeof data.whatsappUrl === 'string' && data.whatsappUrl.startsWith("https://wa.me/")) {
        setWhatsappUrl(data.whatsappUrl);
        setStatus("email-failed");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h1 className="text-5xl font-heading font-bold mb-8">{t("Contact Us")}</h1>
          <p className="text-xl text-muted-foreground mb-16">{t("Get in touch with Salvi Group of Companies.")}</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* ── Left: details + map ── */}
          <FadeIn delay={0.1}>
            <div className="space-y-6 mb-8">
              <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading mb-1 text-foreground">{t("Corporate Headquarters")}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{siteContent.contact.address}</p>
                    <p className="text-xs text-primary/80 mt-1 font-medium">Landmark: The Jewel of Pimpri, near Honda BigWing Central, Kamla Cross Road</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground/70 block">{t("Phone")}</span>
                      <a href={`tel:${siteContent.contact.phone.replace(/\s/g, "")}`} className="text-sm font-semibold hover:text-primary transition-colors">
                        {siteContent.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground/70 block">{t("Email")}</span>
                      <a href={`mailto:${siteContent.contact.email}`} className="text-sm font-semibold hover:text-primary transition-colors truncate block max-w-[200px]" title={siteContent.contact.email}>
                        {siteContent.contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Interactive Google Maps Embed ── */}
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground/90 font-heading">
                    {t("Interactive Plant & Office Map")}
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/place/Honda+BigWing+PCMC+Central+-+Authorized+Main+Dealership+in+Pimpri/@18.6279068,73.8040619,825m/data=!3m1!1e3!4m6!3m5!1s0x3bc2b977fff09771:0x5fd7ef1cc71c7b37!8m2!3d18.6278408!4d73.8038852!16s%2Fg%2F11rqs2gnn9?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-white transition-colors"
                >
                  <span>{t("Open in Google Maps")}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="relative w-full h-[320px] bg-black/60">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.893116544802!2d73.80131027602353!3d18.627840782487425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b977fff09771%3A0x5fd7ef1cc71c7b37!2sHonda%20BigWing%20PCMC%20Central%20-%20Authorized%20Main%20Dealership%20in%20Pimpri!5e0!3m2!1sen!2sin!4v1729341200000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Salvi Group Office Location - The Jewel of Pimpri"
                  className="w-full h-full"
                />
              </div>
              <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] text-muted-foreground px-4">
                <span>The Jewel of Pimpri, Pune 411018</span>
                <span className="font-mono text-primary/80">18.6278° N, 73.8039° E</span>
              </div>
            </div>
          </FadeIn>

          {/* ── Right: form ── */}
          <FadeIn delay={0.2}>
            <div className="p-8 glass-card rounded-2xl">
              <h2 className="text-2xl font-heading font-bold mb-6">{t("Send an Enquiry")}</h2>

              {status === "success" && (
                <div role="status" className="p-4 bg-green-950/30 border border-green-500/50 text-green-400 rounded-md">
                  {t("Thank you! Your enquiry has been received. We will get back to you shortly.")}
                </div>
              )}

              {status === "email-failed" && whatsappUrl && (
                <div role="alert" className="p-4 bg-amber-950/30 border border-amber-500/50 text-amber-300 rounded-md space-y-3">
                  <p>{t("Email delivery failed. Please contact us directly via WhatsApp:")}</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold underline"
                  >
                    {t("Open WhatsApp Chat →")}
                  </a>
                </div>
              )}

              {status === "error" && (
                <div role="alert" className="p-4 bg-red-950/30 border border-red-500/50 text-red-400 rounded-md">
                  {t("Something went wrong. Please try again later or call us directly.")}
                </div>
              )}

              {(status === "idle" || status === "error" || isLoading) && (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* ── Honeypot (hidden from real users) ── */}
                  <div aria-hidden="true" className="hidden" tabIndex={-1}>
                    <label htmlFor="website">Leave blank</label>
                    <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
                  </div>

                  {/* ── Type ── */}
                  <div className="space-y-1">
                    <label htmlFor="type" className="text-sm font-medium">{t("Enquiry Type")} <span aria-hidden="true" className="text-primary">*</span></label>
                    <select id="type" name="type" required value={form.type} onChange={set("type")} className={inputCls}>
                      {ENQUIRY_TYPES.map(o => <option key={o.value} value={o.value}>{t(o.label)}</option>)}
                    </select>
                  </div>

                  {/* ── Name ── */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">{t("Full Name")} <span aria-hidden="true" className="text-primary">*</span></label>
                    <input id="name" name="name" required minLength={2} maxLength={80} autoComplete="name"
                      value={form.name} onChange={set("name")} className={inputCls} />
                    {fieldErr.name && <p className="text-red-400 text-xs">{fieldErr.name[0]}</p>}
                  </div>

                  {/* ── Phone ── */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-sm font-medium">{t("Mobile Number (India)")} <span aria-hidden="true" className="text-primary">*</span></label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel"
                      placeholder="+91XXXXXXXXXX" value={form.phone} onChange={set("phone")} className={inputCls} />
                    {fieldErr.phone && <p className="text-red-400 text-xs">{fieldErr.phone[0]}</p>}
                  </div>

                  {/* ── Email (optional) ── */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">{t("Email")} <span className="text-muted-foreground text-xs">({t("optional")})</span></label>
                    <input id="email" name="email" type="email" autoComplete="email"
                      value={form.email} onChange={set("email")} className={inputCls} />
                    {fieldErr.email && <p className="text-red-400 text-xs">{fieldErr.email[0]}</p>}
                  </div>

                  {/* ── Message ── */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-sm font-medium">{t("Message")}</label>
                    <textarea id="message" name="message" maxLength={1000} rows={4}
                      value={form.message} onChange={set("message")} className={`${inputCls} resize-none`} />
                    <p className="text-xs text-muted-foreground text-right">{form.message.length}/1000</p>
                    {fieldErr.message && <p className="text-red-400 text-xs">{fieldErr.message[0]}</p>}
                  </div>

                  {/* ── Privacy notice ── */}
                  <PrivacyNotice />

                  {/* ── Consent ── */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="consent" required
                      checked={form.consent} onChange={set("consent")}
                      className="mt-1 w-4 h-4 accent-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {t("I agree to my data being used to respond to this enquiry as described above.")}
                      <span aria-hidden="true" className="text-primary ml-1">*</span>
                    </span>
                  </label>
                  {fieldErr.consent && <p className="text-red-400 text-xs">{fieldErr.consent[0]}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full p-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {isLoading ? t("Sending…") : t("Send Message")}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
