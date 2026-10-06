export const demoThreatResults = [

  {
    id: 1,

    verdict: "Potential Threat",

    threatType: "Phishing",

    confidence: 91,

    riskScore: 87,

    riskLevel: "Critical",

    evidence: [

      "Urgent language requesting immediate action",

      "Suspicious shortened destination URL",

      "Request for account credentials"

    ],

    explanation:
      "Demo result only. The message contains several indicators commonly associated with credential phishing.",

    actions: [

      "Do not open the link",

      "Verify the sender independently",

      "Report the message to security"

    ]

  },


  {
    id: 2,

    verdict: "Low Risk",

    threatType: "No strong indicator",

    confidence: 84,

    riskScore: 22,

    riskLevel: "Low",

    evidence: [

      "No credential request detected",

      "No suspicious URL pattern in demo rules",

      "Normal communication structure"

    ],

    explanation:
      "Demo result only. No strong threat indicator was found by the current frontend demonstration rules.",

    actions: [

      "Continue normal verification",

      "Avoid sharing sensitive information",

      "Monitor for unusual follow-up messages"

    ]

  },


  {
    id: 3,

    verdict: "Suspicious",

    threatType: "Impersonation",

    confidence: 76,

    riskScore: 61,

    riskLevel: "Medium",

    evidence: [

      "Brand-like display name",

      "Unusual sender wording",

      "Pressure to continue conversation outside the normal channel"

    ],

    explanation:
      "Demo result only. Several characteristics resemble social-engineering impersonation patterns.",

    actions: [

      "Verify the identity",

      "Use an official contact channel",

      "Do not send credentials"

    ]

  }

];