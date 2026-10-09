import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDocument } from "@/components/LegalDocument";
import { meta } from "@/components/PageShell";

export const Route = createFileRoute("/cookies")({
  head: () => meta("Cookie Policy", "Learn about cookies, browser storage and similar technologies used by the KAVASAM website and security tools."),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Cookie Policy"
      intro="This policy describes cookies, local browser storage and related technologies used when KAVASAM operates its website and security tools."
      effectiveDate="October 9, 2026"
      sections={[
        { title: "What these technologies are", content: <><p>Cookies are small text files a website can place on your device. Local storage is a browser feature that stores information for a site without sending it with every request. Similar technologies may be used to keep a service secure and remember limited settings.</p></> },
        { title: "What KAVASAM uses", content: <><p>KAVASAM uses technologies that are necessary to deliver and protect the website. The false-positive reporting feature uses local storage to remember that your browser has already reported a specific indicator.</p><p>Infrastructure providers may use short-lived or essential cookies to route requests, maintain security, prevent abuse or preserve a session where a feature requires one.</p></> },
        { title: "No advertising cookies", content: <><p>KAVASAM does not currently use advertising cookies or sell browser activity for targeted advertising. If this changes, we will update this policy and provide any controls required by applicable law.</p></> },
        { title: "Your controls", content: <><p>You can inspect, block or delete cookies and local site data through your browser settings. Blocking essential technologies may stop parts of the website from working correctly. Clearing KAVASAM site data also clears locally remembered false-positive reports.</p><p>Your browser’s help documentation explains the controls available on your device.</p></> },
        { title: "Related information and changes", content: <><p>For details about information KAVASAM processes, read the <Link to="/privacy">Privacy Policy</Link>. We may update this Cookie Policy when our website or technology changes; the effective date above identifies the latest version.</p></> },
      ]}
    />
  );
}