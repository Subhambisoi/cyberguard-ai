from fastapi import FastAPI
from pydantic import BaseModel
from phishing.detector import detect_phishing
from deepfake.detector import detect_media
from account_takeover.detector import detect_account_takeover
from risk_engine import calculate_risk
from database import create_table, save_analysis

app = FastAPI(title="CyberGuard API")


class DetectorResult(BaseModel):
    threat_type: str
    confidence: float
    evidence: list[str]


class AnalysisRequest(BaseModel):
    detector_results: list[DetectorResult]


create_table()


@app.get("/")
def home():
    return {
        "message": "CyberGuard API is running"
    }


@app.post("/analyze/phishing")
def analyze_phishing(url: str):

    detector_result = detect_phishing(url)

    risk_result = calculate_risk([{
        "threat_type": detector_result.get("threat_type", "Unknown"),
        "confidence": detector_result.get("phishing_probability", 0.0),
        "evidence": detector_result.get("evidence", [])
    }])

    evidence = ", ".join(
        detector_result.get("evidence", [])
    )

    analysis_id = save_analysis(
        threat_type=detector_result.get("threat_type", "Unknown"),
        confidence=detector_result.get("phishing_probability", 0.0),
        risk_score=risk_result["risk_score"],
        risk_level=risk_result["risk_level"],
        evidence=evidence,
        explanation=risk_result["explanation"]
    )

    return {
        "analysis_id": analysis_id,
        "threat_type": detector_result.get("threat_type"),
        "confidence": detector_result.get("phishing_probability", 0.0),
        "evidence": detector_result.get("evidence"),
        "risk_score": risk_result["risk_score"],
        "risk_level": risk_result["risk_level"],
        "explanation": risk_result["explanation"]
    }


@app.post("/analyze")
def analyze(request: AnalysisRequest):

    detector_results = [
        result.model_dump()
        for result in request.detector_results
    ]

    risk_result = calculate_risk(detector_results)

    highest_result = max(
        detector_results,
        key=lambda result: result.get("confidence", 0.0)
    )

    all_evidence = []

    for result in detector_results:
        all_evidence.extend(
            result.get("evidence", [])
        )

    evidence = ", ".join(all_evidence)

    analysis_id = save_analysis(
        threat_type=highest_result.get("threat_type", "Unknown"),
        confidence=highest_result.get("confidence", 0.0),
        risk_score=risk_result["risk_score"],
        risk_level=risk_result["risk_level"],
        evidence=evidence,
        explanation=risk_result["explanation"]
    )

    return {
        "analysis_id": analysis_id,
        "detector_results": request.detector_results,
        "risk_score": risk_result["risk_score"],
        "risk_level": risk_result["risk_level"],
        "explanation": risk_result["explanation"]
    }


@app.post("/analyze/deepfake")
def analyze_deepfake(media_type: str):

    detector_result = detect_media({
        "media_type": media_type
    })

    normalized_result = {
        "threat_type": detector_result.get("threat_type", "Unknown"),
        "confidence": detector_result.get("confidence", 0.0),
        "evidence": detector_result.get("evidence", [])
    }

    risk_result = calculate_risk([normalized_result])

    evidence = ", ".join(
        normalized_result.get("evidence", [])
    )

    analysis_id = save_analysis(
        threat_type=normalized_result["threat_type"],
        confidence=normalized_result["confidence"],
        risk_score=risk_result["risk_score"],
        risk_level=risk_result["risk_level"],
        evidence=evidence,
        explanation=risk_result["explanation"]
    )

    return {
        "analysis_id": analysis_id,
        "threat_type": normalized_result["threat_type"],
        "confidence": normalized_result["confidence"],
        "evidence": normalized_result["evidence"],
        "risk_score": risk_result["risk_score"],
        "risk_level": risk_result["risk_level"],
        "explanation": risk_result["explanation"]
    }


@app.post("/analyze/account-takeover")
def analyze_account_takeover(event: dict):

    detector_result = detect_account_takeover(event)

    normalized_result = {
        "threat_type": detector_result.get("threat_type", "Unknown"),
        "confidence": detector_result.get("confidence", 0.0),
        "evidence": detector_result.get("evidence", [])
    }

    risk_result = calculate_risk([normalized_result])

    evidence = ", ".join(
        normalized_result.get("evidence", [])
    )

    analysis_id = save_analysis(
        threat_type=normalized_result["threat_type"],
        confidence=normalized_result["confidence"],
        risk_score=risk_result["risk_score"],
        risk_level=risk_result["risk_level"],
        evidence=evidence,
        explanation=risk_result["explanation"]
    )

    return {
        "analysis_id": analysis_id,
        "threat_type": normalized_result["threat_type"],
        "confidence": normalized_result["confidence"],
        "evidence": normalized_result["evidence"],
        "risk_score": risk_result["risk_score"],
        "risk_level": risk_result["risk_level"],
        "explanation": risk_result["explanation"]
    }