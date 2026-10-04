export type LawTopic = {
  slug: string;
  title: string;
  category: "Information Technology Act, 2000" | "Data Protection" | "Bharatiya Nyaya Sanhita, 2023" | "Rules & Directions" | "Reporting";
  summary: string;
  points: string[];
  related: string[];
  source: { label: string; url: string };
};

const IT_ACT = { label: "India Code — Information Technology Act, 2000", url: "https://www.indiacode.nic.in/handle/123456789/1999" };
const DPDP = { label: "MeitY — DPDP Act 2023 & Rules 2025", url: "https://www.meity.gov.in/data-protection-framework" };
const BNS = { label: "India Code — Bharatiya Nyaya Sanhita, 2023", url: "https://www.indiacode.nic.in/handle/123456789/20062" };

export const lawTopics: LawTopic[] = [
  {
    slug: "it-act-overview",
    title: "Information Technology Act, 2000 — overview",
    category: "Information Technology Act, 2000",
    summary: "India's primary law on electronic records, cybersecurity and cyber offences, substantially amended in 2008.",
    points: [
      "Gives legal recognition to electronic records and digital/electronic signatures.",
      "Chapter IX (Section 43 onwards) sets civil penalties and compensation for unauthorised access and damage to computer systems.",
      "Chapter XI (Section 65 onwards) defines criminal cyber offences.",
      "Section 70B designates CERT-In as the national agency for cyber incident response.",
      "Section 79 gives intermediaries (platforms) conditional 'safe harbour' if they follow due-diligence rules.",
      "Section 66A was struck down by the Supreme Court in Shreya Singhal v. Union of India (2015) and is no longer valid law.",
    ],
    related: ["unauthorised-access", "identity-theft", "intermediary-rules"],
    source: IT_ACT,
  },
  {
    slug: "unauthorised-access",
    title: "Unauthorised access, hacking and data damage",
    category: "Information Technology Act, 2000",
    summary: "Accessing, copying, damaging or disrupting a computer system without permission.",
    points: [
      "Section 43: civil liability to pay compensation for acts such as unauthorised access, downloading data, introducing viruses, or disrupting a system without the owner's permission.",
      "Section 66: when any act in Section 43 is done dishonestly or fraudulently it becomes a criminal offence — imprisonment up to 3 years, fine up to ₹5 lakh, or both.",
      "Section 65: tampering with computer source code that is required to be maintained by law.",
      "Section 66B: dishonestly receiving or retaining a stolen computer resource or communication device.",
      "Section 66F: cyber terrorism — the most serious category, punishable with up to life imprisonment.",
    ],
    related: ["it-act-overview", "cert-in-directions", "how-to-report"],
    source: IT_ACT,
  },
  {
    slug: "identity-theft",
    title: "Identity theft and online impersonation",
    category: "Information Technology Act, 2000",
    summary: "Misusing someone's password, digital signature or identity, or cheating by pretending to be someone else online.",
    points: [
      "Section 66C: fraudulently or dishonestly using another person's electronic signature, password or other unique identification feature — imprisonment up to 3 years and fine up to ₹1 lakh.",
      "Section 66D: cheating by personation using a computer resource or communication device (e.g. fake profiles, fake bank officials) — imprisonment up to 3 years and fine up to ₹1 lakh.",
      "The same conduct can also attract offences under the Bharatiya Nyaya Sanhita, such as cheating by personation (Section 319).",
    ],
    related: ["online-fraud-bns", "how-to-report", "unauthorised-access"],
    source: IT_ACT,
  },
  {
    slug: "privacy-and-obscene-content",
    title: "Privacy violations and harmful content",
    category: "Information Technology Act, 2000",
    summary: "Capturing or sharing private images without consent, and publishing obscene or sexually explicit material.",
    points: [
      "Section 66E: intentionally capturing, publishing or transmitting images of a person's private area without consent — imprisonment up to 3 years or fine up to ₹2 lakh.",
      "Section 67: publishing or transmitting obscene material electronically.",
      "Section 67A: publishing or transmitting sexually explicit material.",
      "Section 67B: material depicting children in sexually explicit acts — treated with heightened seriousness; also covered by the POCSO Act, 2012.",
      "Section 72 and 72A: breach of confidentiality and disclosure of personal information in breach of a lawful contract.",
    ],
    related: ["cyber-harassment", "how-to-report", "dpdp-act"],
    source: IT_ACT,
  },
  {
    slug: "dpdp-act",
    title: "Digital Personal Data Protection Act, 2023",
    category: "Data Protection",
    summary: "India's comprehensive personal data protection law, enacted 11 August 2023 and operationalised by the DPDP Rules, 2025.",
    points: [
      "Applies to processing of digital personal data within India, and to processing outside India when it relates to offering goods or services to people in India.",
      "Organisations that decide how data is used are 'Data Fiduciaries'; individuals are 'Data Principals'.",
      "Processing generally requires a clear notice and free, specific, informed consent, or a recognised 'legitimate use'.",
      "Data Principals have rights to access information, correction and erasure, grievance redressal and to nominate someone.",
      "Fiduciaries must take reasonable security safeguards and notify the Data Protection Board and affected individuals of a personal data breach.",
      "Penalties are civil and can reach up to ₹250 crore for failing to take reasonable security safeguards.",
    ],
    related: ["dpdp-rules-2025", "data-breach-obligations", "it-act-overview"],
    source: DPDP,
  },
  {
    slug: "dpdp-rules-2025",
    title: "DPDP Rules, 2025 — implementation timeline",
    category: "Data Protection",
    summary: "Rules notified by MeitY on 13–14 November 2025 with a phased compliance schedule of up to 18 months.",
    points: [
      "Phase 1 (immediate): constitution and functioning of the Data Protection Board of India, which operates as a digital office.",
      "Phase 2 (12 months from notification): provisions relating to registration and obligations of Consent Managers, which must be Indian companies.",
      "Phase 3 (18 months from notification): most obligations of Data Fiduciaries — notices, consent, security safeguards, breach notification, data retention and children's data.",
      "Consent notices must be standalone, clear and explain the specific purpose of data use.",
      "Organisations should use the transition period to map personal data, update notices and prepare breach-response processes.",
    ],
    related: ["dpdp-act", "data-breach-obligations"],
    source: { label: "PIB — Government notifies DPDP Rules (14 Nov 2025)", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014" },
  },
  {
    slug: "data-breach-obligations",
    title: "Data breach and incident reporting obligations",
    category: "Rules & Directions",
    summary: "What organisations must do when a cyber incident or personal data breach occurs.",
    points: [
      "CERT-In Directions of 28 April 2022 (under Section 70B(6) of the IT Act) require specified cyber incidents to be reported to CERT-In within 6 hours of noticing them.",
      "The same Directions require ICT system logs to be maintained securely for a rolling period of 180 days within India.",
      "Under the DPDP framework, Data Fiduciaries must inform affected Data Principals and the Data Protection Board of a personal data breach.",
      "Sector regulators (for example RBI, SEBI, IRDAI) may impose additional reporting requirements on regulated entities.",
    ],
    related: ["cert-in-directions", "dpdp-act", "dpdp-rules-2025"],
    source: { label: "CERT-In — Directions under Section 70B(6)", url: "https://www.cert-in.org.in/Directions70B.jsp" },
  },
  {
    slug: "cert-in-directions",
    title: "CERT-In and its 2022 Directions",
    category: "Rules & Directions",
    summary: "The Indian Computer Emergency Response Team is the national nodal agency for cybersecurity incident response.",
    points: [
      "CERT-In issues advisories and vulnerability notes for Indian organisations and users.",
      "Service providers, intermediaries, data centres, body corporates and government organisations must report specified incidents within 6 hours.",
      "Examples of reportable incidents include targeted scanning, compromise of critical systems, unauthorised access, website defacement, ransomware, and data breaches.",
      "Incidents can be reported to incident@cert-in.org.in.",
    ],
    related: ["data-breach-obligations", "unauthorised-access"],
    source: { label: "CERT-In", url: "https://www.cert-in.org.in/" },
  },
  {
    slug: "intermediary-rules",
    title: "Intermediary Guidelines and Digital Media Ethics Code Rules, 2021",
    category: "Rules & Directions",
    summary: "Due-diligence and grievance obligations for social media platforms and other intermediaries.",
    points: [
      "Intermediaries must publish rules and privacy policies and inform users not to share unlawful content.",
      "They must appoint a Grievance Officer and acknowledge complaints within 24 hours.",
      "Content that exposes a person's private areas or is in the nature of impersonation must be removed within 24 hours of a complaint by the affected person.",
      "Users dissatisfied with a platform's grievance decision can appeal to a Grievance Appellate Committee.",
    ],
    related: ["cyber-harassment", "privacy-and-obscene-content"],
    source: { label: "MeitY — IT Rules 2021", url: "https://www.meity.gov.in/" },
  },
  {
    slug: "online-fraud-bns",
    title: "Online fraud under the Bharatiya Nyaya Sanhita",
    category: "Bharatiya Nyaya Sanhita, 2023",
    summary: "The BNS replaced the Indian Penal Code from 1 July 2024 and covers fraud offences committed online.",
    points: [
      "Section 318: cheating.",
      "Section 319: cheating by personation.",
      "Section 111: organised crime, which expressly includes cyber-crimes committed by organised groups.",
      "These provisions are often applied together with Sections 66C and 66D of the IT Act.",
      "Offences committed before 1 July 2024 continue to be dealt with under the IPC.",
    ],
    related: ["identity-theft", "how-to-report"],
    source: BNS,
  },
  {
    slug: "cyber-harassment",
    title: "Cyber harassment and stalking",
    category: "Bharatiya Nyaya Sanhita, 2023",
    summary: "Repeated unwanted contact, monitoring, threats or humiliation online.",
    points: [
      "BNS Section 78 (stalking) covers monitoring a woman's use of the internet, email or other electronic communication.",
      "BNS Section 356 covers defamation, including through electronic means.",
      "IT Act Sections 66E, 67 and 67A may apply where private or sexual images are involved.",
      "Platforms must act on complaints under the IT Rules, 2021; keep screenshots and links as evidence before reporting.",
    ],
    related: ["privacy-and-obscene-content", "intermediary-rules", "how-to-report"],
    source: BNS,
  },
  {
    slug: "how-to-report",
    title: "How to report a cybercrime in India",
    category: "Reporting",
    summary: "Official channels for individuals and organisations to report cyber incidents.",
    points: [
      "National Cyber Crime Reporting Portal: cybercrime.gov.in — for all cybercrimes, with a dedicated option for crimes against women and children.",
      "Helpline 1930: call immediately for financial fraud — fast reporting improves the chance of freezing transferred money.",
      "Sanchar Saathi (sancharsaathi.gov.in): report suspected fraud calls and messages through the 'Chakshu' facility.",
      "Your bank: call the official number on your card or the bank's website to block cards and dispute transactions.",
      "RBI Complaint Management System (cms.rbi.org.in) if your bank does not resolve a complaint.",
      "Organisations: report specified incidents to CERT-In at incident@cert-in.org.in within 6 hours.",
      "Preserve evidence: screenshots, transaction IDs, URLs, phone numbers, email headers.",
    ],
    related: ["online-fraud-bns", "identity-theft", "cert-in-directions"],
    source: { label: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in/" },
  },
];

export const lawCategories = Array.from(new Set(lawTopics.map((t) => t.category)));
export const getLawTopic = (slug: string) => lawTopics.find((t) => t.slug === slug);
export const LAW_REVIEWED = "October 2026";
