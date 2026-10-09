import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDocument } from "@/components/LegalDocument";
import { meta } from "@/components/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy Policy", "How KAVASAM collects, uses, protects and shares information when you use its website, security tools and contact services."),
  component: Privacy,
});

const effectiveDate = "October 9, 2026";

function Privacy() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains what information KAVASAM handles when you visit the website, use a security tool, submit a report or contact us."
      effectiveDate={effectiveDate}
      sections={[
        {
          title: "Information you provide",
          content: <><p>We receive information you choose to submit, including:</p><ul><li>Your name, email address, organization, enquiry type and message in the contact form.</li><li>Text, URLs or security questions submitted to an AI-powered analysis tool.</li><li>An indicator and optional reason when you flag a threat-intelligence item as a possible false positive.</li></ul><p>Do not submit passwords, one-time codes, secret keys, full payment-card details, highly sensitive personal data or exploit material through general forms.</p></>,
        },
        {
          title: "Information handled automatically",
          content: <><p>Our website and infrastructure may process ordinary technical information such as IP address, browser type, request time, requested page and error or security logs. We use this information to deliver the service, prevent abuse, apply usage limits and diagnose problems.</p><p>The false-positive feature stores a local marker in your browser so the same browser does not repeatedly flag one indicator.</p></>,
        },
        {
          title: "Security-tool data",
          content: <><p>Different tools handle data differently:</p><ul><li><strong>Password checker:</strong> hashing happens in your browser. Only the first five characters of the SHA-1 hash are sent to Have I Been Pwned using its k-anonymity service; the password itself is not sent by KAVASAM.</li><li><strong>Domain intelligence:</strong> the domain is sent to Cloudflare’s DNS-over-HTTPS service for public DNS records.</li><li><strong>URL and header analysis:</strong> KAVASAM’s server may request the submitted public URL to inspect redirects and response headers.</li><li><strong>AI tools:</strong> submitted content is processed through KAVASAM’s AI service to produce the requested analysis.</li></ul><p>Only submit information you are authorized to analyze.</p></>,
        },
        {
          title: "How we use information",
          content: <ul><li>Provide, secure and improve KAVASAM’s website, tools and services.</li><li>Respond to enquiries and responsible-disclosure reports.</li><li>Generate requested analysis and enforce reasonable usage limits.</li><li>Investigate false-positive reports, abuse, fraud and technical incidents.</li><li>Comply with applicable law and protect legal rights.</li></ul>,
        },
        {
          title: "Sharing and service providers",
          content: <><p>We do not sell personal information. Information may be processed by providers that help us host the website, store enquiries, operate AI analysis, resolve public DNS data, check breached-password hash ranges or protect the service.</p><p>We may also disclose information when required by law, to protect users or KAVASAM, or as part of a business reorganization subject to appropriate safeguards.</p></>,
        },
        {
          title: "Retention and security",
          content: <><p>We retain information only as long as reasonably necessary for the purpose collected, including responding to enquiries, reviewing security reports, preventing abuse and meeting legal obligations. Retention periods can differ by record type.</p><p>We use reasonable technical and organizational safeguards, but no internet service can guarantee absolute security. Responsible vulnerability reports should follow our <Link to="/responsible-disclosure">Responsible Disclosure Policy</Link>.</p></>,
        },
        {
          title: "Your choices and rights",
          content: <><p>Depending on applicable law, you may have rights to request access, correction, deletion or restriction of personal information, or to object to certain processing. We may need to verify your identity and may retain information where legally permitted or required.</p><p>You can remove browser-stored markers by clearing site data. To make a privacy request, use the <Link to="/contact">contact form</Link> and select “General enquiry.”</p></>,
        },
        {
          title: "Children, international processing and changes",
          content: <><p>KAVASAM’s services are not directed to children under 13. If you believe a child submitted personal information, contact us.</p><p>Providers may process information in countries other than yours, where privacy rules may differ. We will update this page when this policy materially changes and revise the effective date above.</p></>,
        },
      ]}
    />
  );
}