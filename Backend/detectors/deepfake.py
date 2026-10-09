def detect_deepfake(media_name, confidence_score):
    if confidence_score >= 0.80:
        return {
            "threat_type": "Possible Deepfake",
            "confidence": confidence_score,
            "evidence": [
                "High manipulation score detected",
                "Media may contain AI-generated or manipulated content"
            ]
        }

    return {
        "threat_type": "Likely Authentic Media",
        "confidence": confidence_score,
        "evidence": [
            "No major manipulation pattern detected"
        ]
    }