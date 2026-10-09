import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDocument } from "@/components/LegalDocument";
import { meta } from "@/components/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => meta("Terms of Use", "Terms governing access to KAVASAM's website, cybersecurity information, AI analysis and security tools."),
  component: Terms,
});

function Terms() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of Use"
      intro="These terms govern your use of KAVASAM’s public website, educational material, threat intelligence and online security tools."
      effectiveDate="October 9, 2026"
      sections={[
        { title: "Acceptance and eligibility", content: <><p>By accessing or using KAVASAM, you agree to these terms and the <Link to="/privacy">Privacy Policy</Link>. If you do not agree, do not use the services.</p><p>You must be legally able to enter this agreement. If you use KAVASAM for an organization, you confirm you have authority to act for it.</p></> },
        { title: "Permitted use", content: <><p>You may use KAVASAM for lawful cybersecurity education, defensive analysis, risk assessment and authorized research. You are responsible for information you submit and for ensuring you have permission to analyze any domain, URL, system, message or report.</p><p>Tool outputs are provided for your use in context; they should be independently verified before consequential decisions.</p></> },
        { title: "Prohibited use", content: <ul><li>Do not use KAVASAM to attack, disrupt, scan without authorization, exploit or gain access to systems or data.</li><li>Do not upload malware, illegal content, personal secrets or content that violates another person’s rights.</li><li>Do not evade usage limits, automate abusive traffic, reverse engineer protected parts of the service or misrepresent KAVASAM outputs.</li><li>Do not use threat data or tools to facilitate harassment, fraud, surveillance or other harm.</li></ul> },
        { title: "AI, threat and legal information", content: <><p>AI-generated analysis can be incomplete, inaccurate or outdated. Threat feeds may contain errors or false positives and can change without notice. Cyber Law Hub content is general educational information, not legal advice, and KAVASAM is not a law firm.</p><p>For urgent incidents, legal decisions or high-risk security work, consult an appropriately qualified professional and verify information against authoritative sources.</p></> },
        { title: "Third-party services and links", content: <><p>KAVASAM uses and links to third-party sources and services, including public threat feeds, government resources, DNS data and breach-checking services. Their availability, content and practices are controlled by their respective operators.</p><p>A link or reference does not imply endorsement. Your use of a third-party service may be subject to separate terms.</p></> },
        { title: "Intellectual property", content: <><p>KAVASAM’s brand, website design, original text, software and other original materials are protected by applicable intellectual-property laws. Except where a source or licence says otherwise, you may not reproduce, sell or present them as your own without permission.</p><p>Official-source material and third-party feed data remain subject to their respective rights and terms.</p></> },
        { title: "Availability and disclaimers", content: <><p>Services may change, be limited, suspended or withdrawn. We do not promise uninterrupted access or that every result will detect every threat.</p><p>To the fullest extent permitted by law, the services are provided “as is” and “as available,” without warranties of accuracy, fitness for a particular purpose, non-infringement or security.</p></> },
        { title: "Liability and indemnity", content: <><p>To the fullest extent permitted by law, KAVASAM will not be liable for indirect, incidental, special, consequential or punitive loss, or for lost profits, data, goodwill or business arising from use of the public services.</p><p>You are responsible for unlawful or unauthorized use and agree to indemnify KAVASAM against claims arising from your breach of these terms, where permitted by law. Nothing here excludes liability that cannot lawfully be excluded.</p></> },
        { title: "Changes and contact", content: <><p>We may update these terms as services or legal requirements change. The effective date identifies the current version. Continued use after an update means you accept the revised terms.</p><p>Questions about these terms can be submitted through the <Link to="/contact">contact form</Link>.</p></> },
      ]}
    />
  );
}