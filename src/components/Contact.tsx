import { Section } from "@/components/Section";
import { GradientText } from "@/components/GradientText";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { MagneticButton } from "@/components/MagneticButton";
import { CopyEmail } from "@/components/CopyEmail";
import { ContactFormLazy } from "@/components/ContactFormLazy";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";
import { RESUME_HREF } from "@/lib/nav";

/**
 * Contact section (Phase 8): a headline CTA + direct contact actions on the
 * left, the working form on the right. Server component — only CopyEmail and
 * ContactForm (and the MagneticButton links) are client islands.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      index="05"
      label="Contact"
      title={
        <>
          Let&apos;s build <GradientText>something</GradientText>.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: pitch + direct actions. */}
        <RevealOnScroll className="flex flex-col gap-8">
          <p className="max-w-md text-fluid-base text-fg-muted">
            Have a role, a project, or just want to talk shop? The form goes
            straight to my inbox — or reach me directly below. I read every
            message.
          </p>

          <div className="flex flex-col gap-5">
            <CopyEmail />
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href={LINKEDIN_URL}
                target="_blank"
                variant="ghost"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                LinkedIn
              </MagneticButton>
              <MagneticButton
                href={GITHUB_URL}
                target="_blank"
                variant="ghost"
                aria-label="GitHub profile (opens in a new tab)"
              >
                GitHub
              </MagneticButton>
              <MagneticButton
                href={RESUME_HREF}
                target="_blank"
                variant="ghost"
                aria-label="Résumé PDF (opens in a new tab)"
              >
                Résumé
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>

        {/* Right: the form. */}
        <RevealOnScroll delay={0.1}>
          <ContactFormLazy />
        </RevealOnScroll>
      </div>
    </Section>
  );
}
