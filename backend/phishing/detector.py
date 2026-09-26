import os
import joblib

from .features import extract_url_features


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "phishing_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "tfidf_vectorizer.pkl")

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)


def detect_phishing(url=None, message=None):
    risk_score = 0
    evidence = []

    ml_probability = 0.0
    url_probability = 0.0

    # ==============================
    # URL DETECTION
    # ==============================

    if url:
        url_features = extract_url_features(url)

        if url_features["has_ip_address"]:
            risk_score += 30

        if url_features["has_suspicious_keyword"]:
            risk_score += 15

        if url_features["has_url_shortener"]:
            risk_score += 15

        if url_features["has_at_symbol"]:
            risk_score += 25

        if url_features["has_excessive_hyphens"]:
            risk_score += 10

        if url_features["has_long_url"]:
            risk_score += 10

        if url_features["has_suspicious_subdomain"]:
            risk_score += 15

        if url_features["has_malformed_url"]:
            risk_score += 25

        evidence.extend(url_features["evidence"])

        url_probability = min(risk_score / 100, 1.0)

    # ==============================
    # MESSAGE / ML DETECTION
    # ==============================

    if message:
        message_vector = vectorizer.transform([message])

        probabilities = model.predict_proba(message_vector)[0]

        phishing_index = list(model.classes_).index(1)

        ml_probability = float(
            probabilities[phishing_index]
        )

        # ML contribution to risk score
        ml_score = int(ml_probability * 100)

        risk_score += ml_score

        # Add evidence when model probability is meaningful
        if ml_probability >= 0.50:
            evidence.append(
                f"ML model detected suspicious message "
                f"(phishing probability: {ml_probability:.2f})"
            )

    # ==============================
    # COMBINED PROBABILITY
    # ==============================

    if url and message:
        phishing_probability = max(
            ml_probability,
            url_probability
        )
    elif message:
        phishing_probability = ml_probability
    elif url:
        phishing_probability = url_probability
    else:
        phishing_probability = 0.0

    phishing_probability = round(
        min(phishing_probability, 1.0),
        2
    )

    # ==============================
    # THREAT DECISION
    # ==============================

    # High-confidence ML detection
    high_ml_threat = (
        message is not None
        and ml_probability >= 0.55
    )

    # Strong URL detection
    strong_url_threat = (
        url is not None
        and url_probability >= 0.50
    )

    # Combined evidence
    combined_threat = (
        url is not None
        and message is not None
        and (
            ml_probability >= 0.55
            or url_probability >= 0.40
        )
    )

    if high_ml_threat or strong_url_threat or combined_threat:
        is_threat = True
        threat_type = "Phishing"
    else:
        is_threat = False
        threat_type = "Safe"

    # ==============================
    # RISK LEVEL
    # ==============================

    if risk_score >= 70:
        risk_level = "High"
    elif risk_score >= 55:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # ==============================
    # FINAL OUTPUT
    # ==============================

    return {
        "is_threat": is_threat,
        "threat_type": threat_type,
        "risk_level": risk_level,
        "risk_score": min(risk_score, 100),
        "phishing_probability": phishing_probability,
        "evidence": evidence
    }