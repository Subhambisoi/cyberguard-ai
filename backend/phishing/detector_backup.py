from features import extract_url_features


def detect_phishing(url=None, message=None):
    """
    Detect phishing indicators from a URL or message/email.
    Returns a structured and explainable result.
    """

    risk_score = 0
    evidence = []

    # -----------------------------
    # URL ANALYSIS
    # -----------------------------
    if url:
        url_features = extract_url_features(url)

        if url_features["has_ip_address"]:
            risk_score += 30

        if url_features["has_suspicious_keyword"]:
            risk_score += 20

        if url_features["has_url_shortener"]:
            risk_score += 15

        if url_features["has_unusual_pattern"]:
            risk_score += 20

        evidence.extend(url_features["evidence"])

    # -----------------------------
    # MESSAGE / EMAIL ANALYSIS
    # -----------------------------
    if message:
        message_lower = message.lower()

        suspicious_keywords = [
            "verify your account",
            "verify account",
            "confirm your account",
            "reset password",
            "click here",
            "urgent",
            "winner",
            "free money",
            "bank account",
            "login",
            "password",
            "otp",
            "credit card"
        ]

        found_keywords = []

        for keyword in suspicious_keywords:
            if keyword in message_lower:
                found_keywords.append(keyword)

        if found_keywords:
            risk_score += min(len(found_keywords) * 10, 40)

            evidence.append(
                "Suspicious message keywords found: "
                + ", ".join(found_keywords)
            )

    # -----------------------------
    # LIMIT SCORE TO 100
    # -----------------------------
    risk_score = min(risk_score, 100)

    # -----------------------------
    # RISK LEVEL
    # -----------------------------
    if risk_score >= 70:
        risk_level = "High"
    elif risk_score >= 40:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # -----------------------------
    # THREAT TYPE
    # -----------------------------
    if risk_score >= 40:
        is_threat = True
        threat_type = "Phishing"
    else:
        is_threat = False
        threat_type = "Safe"

    # -----------------------------
    # FINAL STRUCTURED OUTPUT
    # -----------------------------
    return {
        "is_threat": is_threat,
        "threat_type": threat_type,
        "risk_level": risk_level,
        "risk_score": risk_score,
        "evidence": evidence
    }