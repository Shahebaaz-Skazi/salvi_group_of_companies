import { t } from "@/content/site";

/**
 * PrivacyNotice — shown on the contact form.
 * TODO_CONFIRM: Have a qualified legal professional review and approve this
 * notice before going live. The wording below is a placeholder only.
 */
export default function PrivacyNotice() {
  return (
    <div className="text-xs text-muted-foreground/70 leading-relaxed p-4 bg-secondary/30 rounded-md border border-border/50">
      <p className="font-semibold mb-1">{t("How we use your information")}</p>
      <p className="mb-2">
        {t(
          "When you submit this form, we collect your name, phone number, and optionally your email address and message. This data is used solely to respond to your enquiry and is not shared with third parties except as necessary to send you a reply."
        )}
        {/* TODO_CONFIRM: Legal review required — add retention period, data controller name, and DPO contact */}
      </p>
      <p>
        {t("To request access to, correction of, or deletion of your data, email us at")}{" "}
        <a
          href="mailto:primeworkforcesolutionsllp@gmail.com"
          className="underline hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-primary"
        >
          primeworkforcesolutionsllp@gmail.com
        </a>
        .{" "}
        {/* TODO_CONFIRM: Replace with a dedicated privacy@ address */}
      </p>
    </div>
  );
}
