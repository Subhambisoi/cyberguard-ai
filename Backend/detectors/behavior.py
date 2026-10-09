def detect_behavior(login_attempts, failed_attempts):
    if failed_attempts >= 5:
        return {
            "threat_type": "Suspicious Account Behavior",
            "confidence": 0.90,
            "evidence": [
                "Multiple failed login attempts",
                "Possible account takeover behavior"
            ]
        }

    return {
        "threat_type": "Normal Account Behavior",
        "confidence": 0.10,
        "evidence": [
            "No major suspicious behavior detected"
        ]
    }