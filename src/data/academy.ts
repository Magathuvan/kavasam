export type Guide = { slug: string; title: string; category: string; level: "Beginner" | "Intermediate"; minutes: number; intro: string; sections: { h: string; items: string[] }[] };

export const academyCategories = ["Cybersecurity Fundamentals", "Ethical Hacking", "Bug Bounty", "Web Security", "Network Security", "Digital Safety", "Cyber Law", "AI Security", "Security Awareness"];

export const guides: Guide[] = [
  { slug: "cia-triad", title: "The CIA triad: the foundation of security", category: "Cybersecurity Fundamentals", level: "Beginner", minutes: 5, intro: "Almost every security decision protects one of three properties: confidentiality, integrity and availability.", sections: [
    { h: "Confidentiality", items: ["Only authorised people can read information.", "Controls: encryption, access control, multi-factor authentication."] },
    { h: "Integrity", items: ["Information is accurate and has not been tampered with.", "Controls: hashing, digital signatures, change logs, backups."] },
    { h: "Availability", items: ["Systems and data are usable when needed.", "Controls: redundancy, DDoS protection, patching, tested recovery plans."] },
  ] },
  { slug: "spot-phishing", title: "How to spot a phishing message", category: "Digital Safety", level: "Beginner", minutes: 6, intro: "Phishing tricks you into clicking a link, sharing an OTP or paying money. These signs catch most attempts.", sections: [
    { h: "Warning signs", items: ["Urgency or fear: 'account blocked', 'KYC expires today'.", "Sender address or link domain that doesn't match the real organisation.", "Requests for OTP, PIN, password or remote-access app installation.", "Offers that are too good: prizes, refunds, high-return investments."] },
    { h: "What to do", items: ["Don't click — open the official app or type the website yourself.", "Banks and government agencies never ask for your OTP.", "Check suspicious messages with the KAVASAM Scam Detector.", "If money was lost, call 1930 immediately."] },
  ] },
  { slug: "passwords-and-mfa", title: "Passwords and multi-factor authentication", category: "Security Awareness", level: "Beginner", minutes: 5, intro: "Reused passwords are one of the most common ways accounts get taken over.", sections: [
    { h: "Good habits", items: ["Use a unique password for every important account.", "Prefer long passphrases (four or more random words).", "Use a reputable password manager.", "Check whether a password has appeared in known breaches with the KAVASAM Password Checker."] },
    { h: "Turn on MFA", items: ["Authenticator apps or passkeys are stronger than SMS codes.", "Enable MFA first on email, banking and social media — email is the key to resetting everything else."] },
  ] },
  { slug: "owasp-top-10", title: "Introduction to the OWASP Top 10", category: "Web Security", level: "Intermediate", minutes: 8, intro: "The OWASP Top 10 is a widely used awareness document listing the most critical web application security risks.", sections: [
    { h: "Key risk areas", items: ["Broken access control — users acting outside their permissions.", "Cryptographic failures — sensitive data exposed due to weak or missing encryption.", "Injection — untrusted input interpreted as code or queries.", "Insecure design and security misconfiguration.", "Vulnerable and outdated components.", "Identification and authentication failures."] },
    { h: "Where to start", items: ["Enforce authorisation on the server for every request.", "Use parameterised queries and framework-safe output encoding.", "Keep dependencies updated and monitored.", "Read the current edition at owasp.org."] },
  ] },
  { slug: "ethical-hacking-basics", title: "Ethical hacking: rules before tools", category: "Ethical Hacking", level: "Beginner", minutes: 6, intro: "Ethical hacking means testing systems with explicit permission to find weaknesses before criminals do.", sections: [
    { h: "The non-negotiables", items: ["Always have written authorisation and a defined scope.", "Testing without permission can be an offence under Sections 43 and 66 of the IT Act, 2000.", "Protect any data you encounter and report findings responsibly."] },
    { h: "Learning legally", items: ["Practise on intentionally vulnerable labs and CTF platforms.", "Learn networking, Linux and web fundamentals first.", "Study the methodology: reconnaissance, scanning, exploitation, reporting."] },
  ] },
  { slug: "bug-bounty-start", title: "Getting started with bug bounty", category: "Bug Bounty", level: "Intermediate", minutes: 7, intro: "Bug bounty programmes invite researchers to report vulnerabilities, sometimes for rewards, under published rules.", sections: [
    { h: "Before you begin", items: ["Read each programme's scope and rules carefully — out-of-scope testing is not authorised.", "Never access, modify or keep other users' data beyond what is needed to prove an issue.", "Avoid denial-of-service and social engineering unless explicitly allowed."] },
    { h: "Writing a good report", items: ["Clear title and affected asset.", "Step-by-step reproduction.", "Impact explained in business terms.", "Suggested fix."] },
  ] },
  { slug: "home-network", title: "Securing your home and small-office network", category: "Network Security", level: "Beginner", minutes: 5, intro: "A few router settings dramatically reduce your risk.", sections: [
    { h: "Checklist", items: ["Change the router's default admin password.", "Use WPA3 (or WPA2-AES) with a strong Wi-Fi password.", "Update router firmware regularly.", "Disable WPS and remote administration if not needed.", "Put smart-home devices on a separate guest network."] },
  ] },
  { slug: "ai-security-intro", title: "AI security: new risks to understand", category: "AI Security", level: "Intermediate", minutes: 6, intro: "AI systems bring new attack surfaces alongside traditional ones.", sections: [
    { h: "Common risks", items: ["Prompt injection — hidden instructions in content that manipulate an AI system.", "Sensitive data leakage through prompts or outputs.", "Over-trusting AI output without verification.", "Deepfake voice and video used in fraud."] },
    { h: "Good practice", items: ["Never paste secrets, passwords or confidential data into public AI tools.", "Verify unusual requests from 'executives' or 'family' through a second channel.", "Restrict what actions AI agents can take automatically."] },
  ] },
  { slug: "know-your-cyber-rights", title: "Know your digital rights in India", category: "Cyber Law", level: "Beginner", minutes: 5, intro: "Indian law gives you protections against online fraud, identity misuse and misuse of personal data.", sections: [
    { h: "Key protections", items: ["IT Act Sections 66C and 66D cover identity theft and online impersonation.", "The DPDP Act, 2023 gives you rights over your personal data, including access, correction and erasure.", "Platforms must act on complaints of impersonation and intimate images within 24 hours under the IT Rules, 2021."] },
    { h: "Learn more", items: ["Explore the KAVASAM Cyber Law Hub for plain-language explanations and official sources."] },
  ] },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
