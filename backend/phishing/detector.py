import os
import joblib

from features import extract_url_features


# Load trained ML model and TF-IDF vectorizer
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "phishing_model.pkl"
)

VECTORIZER_PATH = os.path.join(
    os.path.dirname(__file__),
    "tfidf_vectorizer.pkl"
)

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)


def detect_phishing(url=None, message=None):
    """
    Detect phishing indicators from a URL or message/email.
    Uses rule-based URL analysis and ML-based message analysis.
    """

    risk_score = 0
    evidence = []
    ml_probability = 0.0

    # --------------------------------------------------
    # 1. URL ANALYSIS
    # --------------------------------------------------
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

    # --------------------------------------------------
    # 2. ML MESSAGE / EMAIL ANALYSIS
    # --------------------------------------------------
    if message:
        message_vector = vectorizer.transform([message])

        probabilities = model.predict_proba(message_vector)[0]

        phishing_index = list(model.classes_).index(1)

        ml_probability = probabilities[phishing_index]

        # Convert phishing probability into risk points
        ml_score = int(ml_probability * 60)

        risk_score += ml_score

        if ml_probability >= 0.50:
            evidence.append(
                f"ML model detected suspicious message "
                f"(phishing probability: {ml_probability:.2f})"
            )

    # --------------------------------------------------
    # 3. LIMIT SCORE TO 100
    # --------------------------------------------------
    risk_score = min(risk_score, 100)

    # --------------------------------------------------
    # 4. RISK LEVEL
    # --------------------------------------------------
    if risk_score >= 70:
        risk_level = "High"
    elif risk_score >= 40:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # --------------------------------------------------
    # 5. FINAL THREAT DECISION
    # --------------------------------------------------
    if risk_score >= 40:
        is_threat = True
        threat_type = "Phishing"
    else:
        is_threat = False
        threat_type = "Safe"

    # --------------------------------------------------
    # 6. FINAL STRUCTURED OUTPUT
    # --------------------------------------------------
    return {
        "is_threat": is_threat,
        "threat_type": threat_type,
        "risk_level": risk_level,
        "risk_score": risk_score,
        "confidence": round(ml_probability, 2),
        "evidence": evidence
    }