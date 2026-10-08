def calculate_risk(results):
    """
    Calculate an overall cybersecurity risk score
    from detector results.

    Each detector result should contain:
    - threat_type
    - confidence
    - evidence
    """

    if not results:
        return {
            "risk_score": 0.0,
            "risk_level": "LOW",
            "explanation": "No detector results available."
        }

    confidences = []

    for result in results:
        confidence = result.get("confidence", 0.0)
        confidences.append(float(confidence))

    # Use the highest detector confidence
    risk_score = max(confidences)

    if risk_score >= 0.80:
        risk_level = "HIGH"
    elif risk_score >= 0.50:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "risk_score": round(risk_score, 2),
        "risk_level": risk_level,
        "explanation": f"Overall risk is {risk_level} because the highest detector confidence is {risk_score:.0%}."
    }