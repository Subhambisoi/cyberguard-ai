import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.phishing.detector import detect_phishing
from backend.account_takeover.detector import detect_account_takeover
from backend.deepfake.detector import detect_media
# ==================================================
# FASTAPI APPLICATION
# ==================================================

app = FastAPI(
    title="CyberGuard AI API",
    description="AI-powered cybersecurity threat analysis API",
    version="1.0.0",
)


# ==================================================
# CORS CONFIGURATION
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# REQUEST MODEL
# ==================================================

class AnalysisRequest(BaseModel):
    analysis_type: str = Field(
        ...,
        description=(
            "Analysis type: phishing, text, url, "
            "deepfake, or account_takeover"
        ),
    )

    content: str = Field(
        ...,
        min_length=1,
        description="Content to analyze",
    )


# ==================================================
# HOME ENDPOINT
# ==================================================

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "CyberGuard AI Backend is running",
        "version": "1.0.0",
    }


# ==================================================
# HEALTH CHECK
# ==================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "CyberGuard AI API",
    }


# ==================================================
# HELPER: RUN PHISHING DETECTOR
# ==================================================

def run_phishing_detection(
    content: str,
    analysis_type: str,
):
    """
    Run the existing phishing detector and return
    a consistent response for the frontend.
    """

    try:
        # URL analysis uses URL feature extraction.
        if analysis_type == "url":
            result = detect_phishing(
                url=content,
            )

        # Text and phishing analysis use the ML model.
        else:
            result = detect_phishing(
                message=content,
            )

        if not isinstance(result, dict):
            raise ValueError(
                "The phishing detector returned an invalid result."
            )

        # Ensure the detector supplies a valid risk score.
        raw_score = result.get("risk_score")

        if raw_score is None:
            raise ValueError(
                "The detector did not return a risk score."
            )

        score = float(raw_score)

        if not 0 <= score <= 100:
            raise ValueError(
                "The detector risk score must be between 0 and 100."
            )

        score = round(score)

        # Preserve the detector's own risk classification.
        risk_level = result.get("risk_level")

        if risk_level not in {"Low", "Medium", "High"}:
            if score >= 70:
                risk_level = "High"
            elif score >= 40:
                risk_level = "Medium"
            else:
                risk_level = "Low"

        # Keep existing detector results while providing
        # consistent field names for the React frontend.
        response = {
            **result,
            "status": "success",
            "analysis_type": analysis_type,
            "detector_integrated": True,
            "score_source": "phishing_detector",
            "score": score,
            "risk_score": score,
            "level": risk_level,
            "risk_level": risk_level,
        }

        # Explain which detection method was used.
        if analysis_type == "url":
            response["detector_mode"] = "url_features"
            response["notice"] = (
                "This URL was analyzed using URL-based "
                "heuristic features. The score is a risk "
                "signal, not a calibrated probability."
            )

        elif analysis_type in {"phishing", "text"}:
            response["detector_mode"] = "message_ml"

        return response

    except (TypeError, ValueError) as error:
        print(
            "Invalid phishing detector result:",
            repr(error),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "The phishing detector returned an "
                "invalid result."
            ),
        )

    except HTTPException:
        raise

    except Exception as error:
        # Keep technical details in the backend terminal.
        print(
            "Phishing detector error:",
            repr(error),
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "The phishing detector could not "
                "complete the analysis."
            ),
        )


# ==================================================
# MAIN ANALYSIS ENDPOINT
# ==================================================

@app.post("/analyze")
def analyze(request: AnalysisRequest):

    content = request.content.strip()
    analysis_type = request.analysis_type.strip().lower()

    # ----------------------------------------------
    # VALIDATE CONTENT
    # ----------------------------------------------

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Please provide content to analyze.",
        )

    # ----------------------------------------------
    # VALIDATE ANALYSIS TYPE
    # ----------------------------------------------

    allowed_types = {
        "phishing",
        "text",
        "url",
        "deepfake",
        "account_takeover",
    }

    if analysis_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Unsupported analysis type.",
                "supported_types": sorted(allowed_types),
            },
        )

    # ----------------------------------------------
    # PHISHING MESSAGE ANALYSIS
    # ----------------------------------------------

    if analysis_type == "phishing":
        return run_phishing_detection(
            content=content,
            analysis_type="phishing",
        )

    # ----------------------------------------------
    # GENERAL TEXT ANALYSIS
    # ----------------------------------------------

    if analysis_type == "text":
        return run_phishing_detection(
            content=content,
            analysis_type="text",
        )

    # ----------------------------------------------
    # URL ANALYSIS
    # ----------------------------------------------

    if analysis_type == "url":
        return run_phishing_detection(
            content=content,
            analysis_type="url",
        )

    # ----------------------------------------------
    # DEEPFAKE DETECTION
    # ----------------------------------------------
    if analysis_type == "deepfake":
        try:
            media = json.loads(content)

            if not isinstance(media, dict):
                raise ValueError("Content must be a JSON object.")

            result = detect_media(media)

            return {
                "status": "success",
                "analysis_type": "deepfake",
                "detector_integrated": True,
                "notice": (
                    "This detector evaluates supplied media metadata "
                    "and indicators. It does not inspect actual "
                    "image, video, or audio file contents."
                ),
                "result": result,
            }

        except (ValueError, TypeError) as exc:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid deepfake analysis input: {exc}",
            ) from exc

        except Exception as exc:
            print("Deepfake detector error:", repr(exc))
            raise HTTPException(
                status_code=500,
                detail="Deepfake analysis failed.",
            ) from exc
    # ----------------------------------------------
    # ACCOUNT TAKEOVER DETECTION
    # ----------------------------------------------

    if analysis_type == "account_takeover":
        try:
            event = json.loads(content)

            if not isinstance(event, dict):
                raise ValueError("Content must be a JSON object.")

            result = detect_account_takeover(event)

            return {
                "status": "success",
                "analysis_type": "account_takeover",
                "result": result,
            }

        except (ValueError, TypeError) as exc:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid account takeover event: {exc}",
            ) from exc

        except Exception as exc:
            print("Account takeover detector error:", repr(exc))
            raise HTTPException(
                status_code=500,
                detail="Account takeover analysis failed.",
            ) from exc

    # ----------------------------------------------
    # FALLBACK
    # ----------------------------------------------

    raise HTTPException(
        status_code=400,
        detail="Unable to process this analysis request.",
    )