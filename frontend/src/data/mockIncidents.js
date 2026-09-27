export const mockIncidents = [
  {
    id: "INC-001",
    type: "Phishing",
    source: "Email",
    target: "user@company.com",
    severity: "Critical",
    confidence: 96,
    status: "Blocked",
    time: "2 min ago",
    description:
      "Suspicious email attempting to steal account credentials."
  },

  {
    id: "INC-002",
    type: "Malicious URL",
    source: "URL",
    target: "secure-login-example.com",
    severity: "High",
    confidence: 91,
    status: "Blocked",
    time: "8 min ago",
    description:
      "URL contains suspicious redirection and credential harvesting behavior."
  },

  {
    id: "INC-003",
    type: "Deepfake",
    source: "Image",
    target: "uploaded-image.jpg",
    severity: "High",
    confidence: 88,
    status: "Under Review",
    time: "16 min ago",
    description:
      "Image shows potential signs of digital manipulation."
  },

  {
    id: "INC-004",
    type: "Voice Impersonation",
    source: "Audio",
    target: "voice-message.wav",
    severity: "Medium",
    confidence: 79,
    status: "Investigating",
    time: "28 min ago",
    description:
      "Voice sample contains characteristics associated with synthetic audio."
  },

  {
    id: "INC-005",
    type: "Phishing",
    source: "Email",
    target: "admin@company.com",
    severity: "High",
    confidence: 93,
    status: "Blocked",
    time: "42 min ago",
    description:
      "Email impersonates an internal administrator."
  },

  {
    id: "INC-006",
    type: "Account Takeover",
    source: "Logs",
    target: "employee-account",
    severity: "Critical",
    confidence: 97,
    status: "Blocked",
    time: "1 hr ago",
    description:
      "Multiple abnormal login attempts detected."
  },

  {
    id: "INC-007",
    type: "Malicious URL",
    source: "URL",
    target: "verify-account-example.net",
    severity: "Medium",
    confidence: 82,
    status: "Resolved",
    time: "2 hrs ago",
    description:
      "Suspicious account verification URL detected."
  }
];