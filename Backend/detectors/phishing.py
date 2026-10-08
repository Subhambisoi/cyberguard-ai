def detect_phishing(url):
    if "login" in url.lower() or "verify" in url.lower():
        return {
            "threat_type": "Phishing URL",
            "confidence": 0.90,
            "evidence": [
                "Suspicious login keyword",
                "URL requires verification"
            ]
        }

    return {
        "threat_type": "Safe URL",
        "confidence": 0.10,
        "evidence": [
            "No major suspicious pattern detected"
        ]
    }