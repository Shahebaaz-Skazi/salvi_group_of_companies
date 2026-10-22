"use client";

import { useState, useRef } from "react";
import { t } from "@/content/site";
import FadeIn from "@/components/ui/FadeIn";
import PrivacyNotice from "@/components/ui/PrivacyNotice";

interface ResumeState {
  filename: string;
  content: string; // Base64
  contentType: string;
  size: number;
}

export default function CareersPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fieldErr, setFieldErr] = useState<Record<string, string[]>>({});
  const [resume, setResume] = useState<ResumeState | null>(null);
  const [resumeErr, setResumeErr] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const startTime = useRef(Date.now().toString());

  const handleFileProcess = (file: File) => {
    // Max 5 MB validation
    if (file.size > 5 * 1024 * 1024) {
      setResumeErr("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    const validExtensions = [".pdf", ".doc", ".docx"];
    const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      setResumeErr("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      return;
    }

    setResumeErr(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      setResume({
        filename: file.name,
        content: base64,
        contentType: file.type || "application/octet-stream",
        size: file.size,
      });
    };
    reader.onerror = () => {
      setResumeErr("Error reading file. Please try another file.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleRemoveResume = () => {
    setResume(null);
    setResumeErr(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErr({});

    const formData = new FormData(e.currentTarget);
    const position = formData.get("position") as string;
    const rawMessage = formData.get("message") as string;

    // Build message with position and resume note
    const resumeNote = resume ? `\n\n[Resume attached: ${resume.filename}]` : "";
    const finalMessage = `JOB APPLICATION: ${position}\n\n${rawMessage}${resumeNote}`;

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general",
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          message: finalMessage,
          consent: formData.get("consent") === "on",
          _t: startTime.current,
          website: formData.get("website") || "",
          resume: resume
            ? {
                filename: resume.filename,
                content: resume.content,
                contentType: resume.contentType,
              }
            : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
      } else if (res.status === 422 && data.fields) {
        setFieldErr(data.fields);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full p-3 rounded-md bg-background border border-border focus:outline-none focus:border-primary transition-colors";

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <h1 className="text-5xl font-heading font-bold mb-8">{t("Careers")}</h1>
          <p className="text-xl text-muted-foreground mb-16">
            {t("Join the Salvi Group and help us bridge skills with success.")}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="p-8 glass-card rounded-2xl">
            <h2 className="text-2xl font-heading font-bold mb-6">{t("Submit your profile")}</h2>

            {status === "success" ? (
              <div
                role="status"
                className="p-6 bg-green-950/30 border border-green-500/50 text-green-400 rounded-xl space-y-2"
              >
                <div className="flex items-center gap-2 font-heading font-bold text-lg">
                  <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t("Thank you! Your application has been received.")}</span>
                </div>
                <p className="text-sm text-green-400/80">
                  Our HR recruitment team will review your qualifications and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot */}
                <div aria-hidden="true" className="hidden" tabIndex={-1}>
                  <label htmlFor="website">Leave blank</label>
                  <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
                </div>

                {/* Name & Phone */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("Full Name")} <span className="text-primary">*</span>
                    </label>
                    <input id="name" name="name" required className={inputCls} placeholder="Your full name" />
                    {fieldErr.name && <p className="text-red-400 text-xs">{fieldErr.name[0]}</p>}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-sm font-medium">
                      {t("Mobile Number")} <span className="text-primary">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className={inputCls}
                      placeholder="+91XXXXXXXXXX"
                    />
                    {fieldErr.phone && <p className="text-red-400 text-xs">{fieldErr.phone[0]}</p>}
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("Email")} <span className="text-muted-foreground text-xs">({t("optional")})</span>
                  </label>
                  <input id="email" name="email" type="email" className={inputCls} placeholder="name@example.com" />
                  {fieldErr.email && <p className="text-red-400 text-xs">{fieldErr.email[0]}</p>}
                </div>

                {/* Position Applied For */}
                <div className="space-y-1">
                  <label htmlFor="position" className="text-sm font-medium">
                    {t("Position Applied For")} <span className="text-primary">*</span>
                  </label>
                  <input
                    id="position"
                    name="position"
                    required
                    className={inputCls}
                    placeholder="e.g. Forklift Operator, HR Supervisor, CNC Machinist..."
                  />
                  {fieldErr.position && <p className="text-red-400 text-xs">{fieldErr.position[0]}</p>}
                </div>

                {/* Optional Resume / CV Upload Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="resume" className="text-sm font-medium text-foreground">
                      {t("Upload Resume / CV")}{" "}
                      <span className="text-muted-foreground text-xs font-normal">({t("optional")})</span>
                    </label>
                    <span className="text-[11px] font-mono text-muted-foreground/70">
                      PDF, DOC, DOCX • Max 5MB
                    </span>
                  </div>

                  {/* Hidden native file input */}
                  <input
                    ref={fileInputRef}
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {!resume ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`p-5 rounded-xl border border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                        isDragging
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(242,31,26,0.2)]"
                          : "border-white/15 hover:border-primary/50 bg-white/[0.02] hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2.5 text-muted-foreground group-hover:text-primary transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-foreground/90">
                        <span className="text-primary font-semibold underline underline-offset-2">Click to browse</span> or drag and drop your file here
                      </p>
                      <p className="text-[11px] text-muted-foreground/70 mt-1">
                        Optional: attach your updated resume to accelerate your application
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-primary/40 flex items-center justify-between gap-3 shadow-md">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{resume.filename}</p>
                          <p className="text-[11px] font-mono text-muted-foreground">
                            {formatFileSize(resume.size)} • <span className="text-emerald-400">Ready to submit</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveResume}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors shrink-0"
                        title="Remove file"
                        aria-label="Remove resume"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {resumeErr && <p className="text-red-400 text-xs mt-1">{resumeErr}</p>}
                </div>

                {/* Brief Cover Letter / Experience */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("Brief Cover Letter / Experience")} <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={1000}
                    className={`${inputCls} resize-none`}
                    placeholder="Describe your relevant work experience, industrial skills, or licenses..."
                  />
                  {fieldErr.message && <p className="text-red-400 text-xs">{fieldErr.message[0]}</p>}
                </div>

                <PrivacyNotice />

                {/* Consent Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 w-4 h-4 accent-primary shrink-0"
                  />
                  <span className="text-sm text-muted-foreground">
                    {t("I agree to my data being used to process this application.")} <span className="text-primary">*</span>
                  </span>
                </label>
                {fieldErr.consent && <p className="text-red-400 text-xs">{fieldErr.consent[0]}</p>}

                {status === "error" && (
                  <div className="p-4 bg-red-950/30 text-red-400 rounded-md text-sm border border-red-500/50">
                    {t("Failed to send application. Please try again.")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full p-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 shadow-[0_0_20px_rgba(242,31,26,0.35)] transition-all disabled:opacity-50"
                >
                  {status === "loading" ? t("Sending…") : t("Submit Application")}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
