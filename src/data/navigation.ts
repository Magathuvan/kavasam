export type NavItem = { label: string; href: string; children?: (string | [string, string])[] };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      ["Penetration Testing", "/solutions#penetration-testing"], ["Vulnerability Assessment", "/solutions#vulnerability-assessment"],
      ["Web Security", "/solutions#web-application-security"], ["API Security", "/solutions#api-security"],
      ["Mobile Security", "/solutions#mobile-application-security"], ["Network Security", "/solutions#network-security"],
      ["Cloud Security", "/solutions#cloud-security"], ["Security Consulting", "/solutions#security-consulting"],
      ["Security Training", "/solutions#security-awareness-training"],
    ],
  },
  {
    label: "AI Tools",
    href: "/tools",
    children: [["AI Cyber Assistant", "/tools/assistant"], ["AI Cyber Health Check", "/tools/health-check"], ["Scam Detector", "/tools/scam-detector"], ["URL Analyzer", "/tools/url-analyzer"], ["AI Legal Analyzer", "/tools/legal-analyzer"], ["Security Tools", "/security-tools"]],
  },
  {
    label: "Cyber Law",
    href: "/cyber-law",
    children: [["India Cyber Laws", "/cyber-law/it-act-overview"], ["Cybercrime Information", "/cyber-law/online-fraud-bns"], ["Data Protection", "/cyber-law/dpdp-act"], ["Legal Analyzer", "/tools/legal-analyzer"], ["Reporting Resources", "/cyber-law/how-to-report"]],
  },
  { label: "Threat Intelligence", href: "/threat-intelligence" },
  { label: "Learning", href: "/academy", children: [["KAVASAM Academy", "/academy"], ["Research", "/research"]] },
  { label: "About", href: "/about", children: [["About KAVASAM", "/about"], ["Team", "/team"], ["Contact", "/contact"], ["Responsible Disclosure", "/responsible-disclosure"]] },
];
