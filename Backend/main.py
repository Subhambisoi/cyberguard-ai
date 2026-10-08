from fastapi import FastAPI
from pydantic import BaseModel
from detectors.phishing import detect_phishing
from risk_engine import calculate_risk
from database import create_table, save_analysis

app = FastAPI(title="CyberGuard API")


class DetectorResult(BaseModel):
    threat_type: str
    confidence: float
    evidence: list[str]


class AnalysisRequest(BaseModel):
    detector_results: list[DetectorResult]

# Create the database table when the application starts
create_table()


@app.get("/")
def home():
    return {
        "message": "CyberGuard API is running"
    }


@app.post("/analyze/phishing")
def analyze_phishing(url: str):

    # Run the detector
    detector_result = detect_phishing(url)

    # Calculate overall risk
    risk_result = calculate_risk([detector_result])

    # Convert evidence list into text for SQLite
    evidence = ", ".join(detector_result.get("evidence", []))

    # Save the analysis
    analysis_id = save_analysis(
        threat_type=detector_result.get("threat_type", "Unknown"),
        confidence=detector_result.get("confidence", 0.0),
        risk_score=risk_result["risk_score"],
        risk_level=risk_result["risk_level"],
        evidence=evidence,
        explanation=risk_result["explanation"]
    )

    return {
        "analysis_id": analysis_id,
        "threat_type": detector_result.get("threat_type"),
        "confidence": detector_result.get("confidence"),
        "evidence": detector_result.get("evidence"),
        "risk_score": risk_result["risk_score"],
        "risk_level": risk_result["risk_level"],
        "explanation": risk_result["explanation"]
    }
    
@app.post("/analyze")
def analyze(request: AnalysisRequest):

    # Convert detector results to dictionaries
    detector_results = [
        result.model_dump()
        for result in request.detector_results
    ]

    # Calculate overall risk
    risk_result = calculate_risk(detector_results)

    # Select the result with the highest confidence
    highest_result = max(
        detector_results,
        key=lambda result: result.get("confidence", 0.0)
    )

    # Combine evidence from all detectors
    all_evidence = []
    for result in detector_results:
        all_evidence.extend(result.get("evidence", []))

    evidence = ", ".join(all_evidence)
    # Save the combined analysis in the database
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