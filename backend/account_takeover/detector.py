
from typing import Any


def detect_account_takeover(event: dict[str, Any]) -> dict[str, Any]:
    """
    Analyze one login event and return an explainable ATO risk assessment.

    This is a rule-based prototype. It does not automatically block users.
    """

    risk_score = 0
    evidence = []
    indicators = []

    user_id = event.get("user_id", "unknown")
    ip_address = event.get("ip_address", "unknown")

    failed_attempts = event.get("failed_attempts", 0)
    location = event.get("location", "")
    previous_location = event.get("previous_location", "")
    login_time = event.get("login_time", "")
    device_known = event.get("device_known", True)
    session_duration = event.get("session_duration", 0)

    # 1. Failed login attempts
    if failed_attempts >= 6:
        risk_score += 45
        evidence.append(f"{failed_attempts} failed login attempts")
        indicators.append("BRUTE_FORCE_ATTEMPT")
        
        
        

    elif failed_attempts >= 3:
        risk_score += 15
        evidence.append(f"{failed_attempts} failed login attempts")

    # 2. Unknown device
    if device_known is False:
        risk_score += 25
        evidence.append("Login from an unknown device")
        indicators.append("UNKNOWN_DEVICE_ACTIVITY")

    # 3. Unusual location
    if (
        location
        and previous_location
        and location.strip().casefold()
        != previous_location.strip().casefold()
    ):
        risk_score += 25
        evidence.append(
            f"Login location changed from {previous_location} to {location}"
        )
        indicators.append("UNUSUAL_LOCATION")

    # 4. Unusual login time (midnight to 5 AM)
    try:
        hour, minute = map(int, login_time.split(":"))

        if not (0 <= hour <= 23 and 0 <= minute <= 59):
            raise ValueError

        if 0 <= hour < 5:
            risk_score += 15
            evidence.append(f"Unusual login time: {login_time}")

    except (ValueError, AttributeError):
        evidence.append("Login time is missing or invalid")

    # 5. Suspicious session duration
    if session_duration < 1 or session_duration > 720:
        risk_score += 10
        evidence.append(
            f"Unusual session duration: {session_duration} minutes"
        )
        indicators.append("SUSPICIOUS_SESSION")

    risk_score = min(risk_score, 100)

    # Risk classification
    if risk_score <= 20:
        risk_level = "SAFE"
    elif risk_score <= 40:
        risk_level = "LOW"
    elif risk_score <= 60:
        risk_level = "MEDIUM"
    elif risk_score <= 80:
        risk_level = "HIGH"
    else:
        risk_level = "CRITICAL"

    # Threat classification
    if risk_score >= 81 and len(evidence) >= 3:
        threat_type = "ACCOUNT_TAKEOVER"
    elif "BRUTE_FORCE_ATTEMPT" in indicators:
        threat_type = "BRUTE_FORCE_ATTEMPT"
    elif "UNKNOWN_DEVICE_ACTIVITY" in indicators:
        threat_type = "UNKNOWN_DEVICE_ACTIVITY"
    elif "UNUSUAL_LOCATION" in indicators:
        threat_type = "UNUSUAL_LOCATION"
    elif "SUSPICIOUS_SESSION" in indicators:
        threat_type = "SUSPICIOUS_SESSION"
    elif evidence:
        threat_type = "SUSPICIOUS_LOGIN"
    else:
        threat_type = "NORMAL_LOGIN"

    is_threat = risk_score >= 21

    # Explanation from actual evidence
    if not evidence:
        explanation = (
            "Safe Login: No significant suspicious indicators were detected."
        )
    else:
        explanation = (
            f"{risk_level} Risk: "
            + "; ".join(evidence)
            + ". These indicators may suggest suspicious account activity."
        )

    # Recommended responses
    if risk_level == "SAFE":
        recommended_actions = [
            "No immediate action required"
        ]

    elif risk_level == "LOW":
        recommended_actions = [
            "Monitor the account"
        ]

    elif risk_level == "MEDIUM":
        recommended_actions = [
            "Warn the user",
            "Require additional authentication",
            "Monitor recent login activity"
        ]

    elif risk_level == "HIGH":
        recommended_actions = [
            "Require MFA",
            "Terminate suspicious sessions",
            "Notify administrator/SOC"
        ]

    else:
        recommended_actions = [
            "Temporarily block the suspicious session/device",
            "Revoke active sessions",
            "Require password reset and MFA",
            "Notify security administrator/SOC",
            "Escalate incident for investigation"
        ]

    # Deterministic prototype confidence
    confidence = round(risk_score / 100, 2)

    return {
        "threat_type": threat_type,
        "is_threat": is_threat,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "confidence": confidence,
        "evidence": evidence,
        "explanation": explanation,
        "recommended_actions": recommended_actions,
        "metadata": {
            "user_id": user_id,
            "ip_address": ip_address
        }
    }