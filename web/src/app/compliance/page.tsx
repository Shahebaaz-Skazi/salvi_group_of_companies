import { siteContent, t } from "@/content/site";
import FadeIn from "@/components/ui/FadeIn";

export default function CompliancePage() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <h1 className="text-5xl font-heading font-bold mb-8">{t("Statutory Compliance")}</h1>
          <p className="text-xl text-muted-foreground mb-12">
            {t("We strictly adhere to all statutory obligations to ensure complete transparency and peace of mind for our clients.")}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FadeIn delay={0.1}>
            <div className="p-8 bg-secondary/30 rounded-xl border border-border h-full">
              <h2 className="text-2xl font-heading font-bold mb-6 text-primary">{t("Company Details")}</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">{t("Registered Entity Name")}</div>
                  <div className="font-semibold">{siteContent.compliance.llpName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("Registered Address")}</div>
                  <div className="font-semibold max-w-xs">{siteContent.contact.address}</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-8 bg-secondary/30 rounded-xl border border-border h-full">
              <h2 className="text-2xl font-heading font-bold mb-6 text-primary">{t("Registrations")}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">{t("GST No.")}</span>
                  <span className="font-mono font-semibold">{siteContent.compliance.gst}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">{t("Udyam Registration")}</span>
                  <span className="font-mono font-semibold">{siteContent.compliance.udyam}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">{t("PAN")}</span>
                  <span className="font-mono font-semibold">{siteContent.compliance.pan}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        
        <FadeIn delay={0.3}>
          <div className="p-6 bg-secondary/20 rounded border border-border text-center text-sm text-muted-foreground">
            {/* TODO_CONFIRM: Any other public certificates to list? */}
            {t("Copies of registration certificates (Shop Act, Udyam, etc.) can be provided to verified clients upon request.")}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
