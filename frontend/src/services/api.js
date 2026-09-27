import { mockIncidents } from "../data/mockIncidents";

const API_BASE_URL = "http://localhost:8000/api";

export async function getDashboardStats() {
  return {
    totalEvents: 12847,
    threatsDetected: 342,
    criticalThreats: 27,
    blockedThreats: 296
  };
}

export async function getIncidents() {
  return mockIncidents;
}

export async function analyzeThreat(type, input) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1200);
  });

  const results = {
    email: {
      threat: true,
      type: "Phishing",
      confidence: 94,
      severity: "High",
      explanation:
        "The message contains suspicious links and credential harvesting patterns."
    },

    url: {
      threat: true,
      type: "Malicious URL",
      confidence: 91,
      severity: "High",
      explanation:
        "The URL contains suspicious domain and redirection characteristics."
    },

    image: {
      threat: true,
      type: "Possible Deepfake",
      confidence: 86,
      severity: "Medium",
      explanation:
        "The uploaded image contains visual inconsistencies that may indicate manipulation."
    },

    audio: {
      threat: true,
      type: "Possible Voice Impersonation",
      confidence: 81,
      severity: "Medium",
      explanation:
        "The audio contains characteristics commonly associated with synthetic or manipulated speech."
    }
  };

  return (
    results[type] || {
      threat: false,
      type: "Unknown",
      confidence: 0,
      severity: "Low",
      explanation: "No analysis result available."
    }
  );
}

export async function getAnalytics() {
  return {
    totalScans: 12847,
    threatsDetected: 342,
    averageConfidence: 91,
    blockedThreats: 296
  };
}