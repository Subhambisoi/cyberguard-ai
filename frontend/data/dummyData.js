export const overview = {
  events: 1284,
  threats: 173,
  highRisk: 48,
  critical: 12
};

export const incidents = [
  { id: "INC-001", threat: "Phishing", source: "Email", risk: "High", status: "Blocked" },
  { id: "INC-002", threat: "Malicious URL", source: "Website", risk: "Critical", status: "Blocked" },
  { id: "INC-003", threat: "Deepfake", source: "Image", risk: "Medium", status: "Review" },
  { id: "INC-004", threat: "Impersonation", source: "Message", risk: "High", status: "Review" }
];

export const timelineData = [
  { time: "09:00", threats: 4 },
  { time: "10:00", threats: 9 },
  { time: "11:00", threats: 6 },
  { time: "12:00", threats: 14 },
  { time: "13:00", threats: 8 }
];

export const riskDistributionData = [
  { name: "Safe", value: 45, color: "#10b981" },
  { name: "Low", value: 30, color: "#3b82f6" },
  { name: "Medium", value: 15, color: "#f59e0b" },
  { name: "High", value: 7, color: "#f97316" },
  { name: "Critical", value: 3, color: "#ef4444" }
];

export const dummyThreatResult = {
  threatType: "PHISHING",
  riskScore: 87,
  riskLevel: "CRITICAL",
  confidence: 94,
  evidence: [
    "Suspicious sender domain mimicking internal IT",
    "Urgent language demanding immediate credential reset",
    "Credential harvest form detected in payload link",
    "URL destination mismatch (Redirect trap)"
  ],
  explanation: "This analyzed input contains multiple definitive indicators commonly associated with spear-phishing campaigns designed to bypass standard email filters.",
  recommendations: [
    "Do not click the embedded link or open attachments",
    "Verify the sender identity via secondary channels",
    "Report and quarantine the message immediately",
    "Block the suspicious destination domain on the gateway",
    "Revoke any active sessions if credentials were entered"
  ]
};