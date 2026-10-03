export type ToolId = "assistant" | "health-check" | "scam-detector" | "url-analyzer" | "legal-analyzer" | "report-analyzer";

export type ToolDef = {
  id: ToolId;
  title: string;
  summary: string;
  heading: string;
  placeholder: string;
  inputType: "text" | "url";
  disclaimer: string;
};

const general = "KAVASAM AI provides general security guidance. Verify important decisions with a qualified professional.";
const legal =
  "This content is provided for general informational and educational purposes and does not constitute legal advice.";

export const tools: ToolDef[] = [
  {
    id: "assistant",
    title: "AI Cyber Assistant",
    summary: "Ask cybersecurity questions and receive practical AI-powered guidance.",
    heading: "What would you like to secure?",
    placeholder: "Ask a cybersecurity question, analyze a suspicious message, URL, email, or security concern...",
    inputType: "text",
    disclaimer: general,
  },
  {
    id: "health-check",
    title: "AI Cyber Health Check",
    summary: "Describe your devices, accounts and habits to get a security risk review with actionable steps.",
    heading: "Describe your current setup",
    placeholder: "e.g. I use the same password on a few sites, my phone has no screen lock, I run a small shop with 3 laptops on home Wi-Fi...",
    inputType: "text",
    disclaimer: general,
  },
  {
    id: "scam-detector",
    title: "Scam Detector",
    summary: "Paste a suspicious message, email or offer to check for scam warning signs.",
    heading: "Paste the suspicious message",
    placeholder: "Paste the SMS, WhatsApp message, email or offer text here. Remove your own personal details first.",
    inputType: "text",
    disclaimer: general + " Never share OTPs, passwords or bank details with anyone.",
  },
  {
    id: "url-analyzer",
    title: "URL Analyzer",
    summary: "Check a link’s structure, redirects, HTTPS and security headers before you open it.",
    heading: "Enter a link to analyze",
    placeholder: "https://example.com/login",
    inputType: "url",
    disclaimer: "KAVASAM checks the link from its servers — your device never visits it. " + general,
  },
  {
    id: "legal-analyzer",
    title: "AI Legal Analyzer",
    summary: "Describe a cyber incident to understand relevant legal topics and reporting options in India.",
    heading: "Describe your cyber incident",
    placeholder: "Someone used my personal information without permission...",
    inputType: "text",
    disclaimer: legal + " KAVASAM is not a law firm and does not provide legal representation.",
  },
  {
    id: "report-analyzer",
    title: "Security Report Analyzer",
    summary: "Paste a scan or audit report to get a plain-language summary and prioritised fixes.",
    heading: "Paste your security report",
    placeholder: "Paste findings from a vulnerability scan, pentest report or audit (remove secrets and credentials first)...",
    inputType: "text",
    disclaimer: general,
  },
];

export const getTool = (id: string) => tools.find((t) => t.id === id);
