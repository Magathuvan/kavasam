export type NavItem = { label: string; href: string; children?: (string | [string, string])[] };

export const navItems: NavItem[] = [
  { label: "Home", href: "/#top" },
  {
    label: "Solutions",
    href: "/#pathways",
    children: [
      "Penetration Testing", "Vulnerability Assessment", "Web Security", "API Security",
      "Mobile Security", "Network Security", "Cloud Security", "Security Consulting", "Security Training",
    ],
  },
  {
    label: "AI Tools",
    href: "/tools",
    children: [["AI Cyber Assistant", "/tools/assistant"], ["AI Cyber Health Check", "/tools/health-check"], ["Scam Detector", "/tools/scam-detector"], ["URL Analyzer", "/tools/url-analyzer"], ["AI Legal Analyzer", "/tools/legal-analyzer"], ["Security Report Analyzer", "/tools/report-analyzer"]],
  },
  {
    label: "Cyber Law",
    href: "/#ecosystem",
    children: ["India Cyber Laws", "Cybercrime Information", "Data Protection", ["Legal Analyzer", "/tools/legal-analyzer"], "Reporting Resources"],
  },
  { label: "Threat Intelligence", href: "/#ecosystem" },
  { label: "Learning", href: "/#ecosystem" },
  { label: "About", href: "/#contact" },
];
