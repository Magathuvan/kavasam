export type NavItem = { label: string; href: string; children?: string[] };

export const navItems: NavItem[] = [
  { label: "Home", href: "#top" },
  {
    label: "Solutions",
    href: "#pathways",
    children: [
      "Penetration Testing", "Vulnerability Assessment", "Web Security", "API Security",
      "Mobile Security", "Network Security", "Cloud Security", "Security Consulting", "Security Training",
    ],
  },
  {
    label: "AI Tools",
    href: "#ai",
    children: ["AI Cyber Assistant", "AI Cyber Health Check", "Scam Detector", "URL Analyzer", "AI Legal Analyzer"],
  },
  {
    label: "Cyber Law",
    href: "#ecosystem",
    children: ["India Cyber Laws", "Cybercrime Information", "Data Protection", "Legal Analyzer", "Reporting Resources"],
  },
  { label: "Threat Intelligence", href: "#ecosystem" },
  { label: "Learning", href: "#ecosystem" },
  { label: "About", href: "#contact" },
];
