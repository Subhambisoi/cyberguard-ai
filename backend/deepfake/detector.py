"""Basic, explainable multimedia impersonation risk assessment.

This prototype evaluates metadata and caller-supplied observations. It does not
decode media or prove that a file is authentic or manipulated.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
from typing import Any


_RISK_LEVELS = ((15, "LOW"), (35, "MEDIUM"), (60, "HIGH"), (101, "CRITICAL"))

# Keywords map plain-language observations to points. Matching is intentionally
# transparent and conservative; a real detector should provide these findings.
_INDICATOR_RULES: tuple[tuple[tuple[str, ...], int, str], ...] = (
    (("face mismatch", "identity mismatch", " 얼굴 mismatch"), 30, "Possible face or identity mismatch"),
    (("lip sync", "lip-sync", "audio video mismatch", "audio-video mismatch"), 25, "Audio and visible speech may not match"),
    (("voice clone", "cloned voice", "synthetic voice", "voice conversion"), 30, "Possible synthetic or converted voice"),
    (("face warp", "warped face", "facial artifact", "blended face"), 25, "Possible facial blending or warping artifacts"),
    (("frame inconsistency", "flicker", "temporal inconsistency", "frame splice"), 20, "Possible video frame inconsistency or editing"),
    (("lighting inconsistency", "shadow mismatch", "reflection mismatch"), 15, "Lighting, shadow, or reflection inconsistency reported"),
    (("metadata edited", "metadata manipulation", "editing software", "synthetic metadata"), 10, "Metadata suggests editing or synthetic generation"),
    (("generation marker", "ai generated", "ai-generated", "synthetic media"), 20, "AI-generation marker or synthetic-media clue reported"),
    (("background noise mismatch", "audio splice", "unnatural prosody", "unnatural pause"), 15, "Possible audio splice or unnatural speech pattern"),
)

_MEDIA_TYPES = {"image", "video", "audio"}


def _strings(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, str):
        return [value]
    if isinstance(value, Iterable) and not isinstance(value, (bytes, Mapping)):
        return [str(item) for item in value]
    return [str(value)]


def _risk_level(score: int) -> str:
    if score == 0:
        return "SAFE"
    for upper_bound, level in _RISK_LEVELS:
        if score < upper_bound:
            return level
    return "CRITICAL"


def detect_media(media: Mapping[str, Any]) -> dict[str, Any]:
    """Assess a media description and return the required normalized result.

    Args:
        media: Mapping with ``media_type`` (image/video/audio), optional
            ``metadata`` mapping, and optional ``indicators`` list/string.
            Metadata flags such as ``ai_generated=True``, ``edited=True``, or
            ``identity_mismatch=True`` are also interpreted.

    Returns:
        A stable result dictionary with threat, risk, evidence, explanation,
        recommended actions, and metadata fields.
    """
    if not isinstance(media, Mapping):
        raise TypeError("media must be a mapping")

    media_type = str(media.get("media_type", "unknown")).strip().lower()
    if media_type not in _MEDIA_TYPES:
        raise ValueError("media_type must be one of: image, video, audio")

    metadata = media.get("metadata") or {}
    if not isinstance(metadata, Mapping):
        raise TypeError("metadata must be a mapping")

    raw_indicators = _strings(media.get("indicators"))
    # Convert explicit structured flags into the same explainable rule path.
    flag_phrases = {
        "ai_generated": "AI-generated",
        "edited": "metadata edited",
        "identity_mismatch": "identity mismatch",
        "lip_sync_mismatch": "lip-sync mismatch",
        "voice_clone_suspected": "voice clone",
        "facial_artifacts": "facial artifact",
        "frame_inconsistency": "frame inconsistency",
        "lighting_inconsistency": "lighting inconsistency",
        "audio_splice_suspected": "audio splice",
    }
    for key, phrase in flag_phrases.items():
        if metadata.get(key) is True:
            raw_indicators.append(phrase)

    evidence: list[str] = []
    score = 0
    combined = " ".join(raw_indicators).lower()
    for keywords, points, description in _INDICATOR_RULES:
        if any(keyword in combined for keyword in keywords):
            evidence.append(description)
            score += points

    # Cap the score so the output remains a percentage-like risk measure.
    risk_score = min(score, 100)
    risk_level = _risk_level(risk_score)
    is_threat = risk_level in {"MEDIUM", "HIGH", "CRITICAL"}
    threat_type = "digital_impersonation_or_manipulation" if is_threat else "none_detected"

    if evidence:
        explanation = (
            f"{len(evidence)} rule-based indicator group(s) were reported for this "
            f"{media_type}. The score is a triage signal, not proof of manipulation."
        )
    else:
        explanation = (
            f"No supported manipulation indicators were supplied for this {media_type}. "
            "This basic prototype cannot confirm that the media is authentic."
        )

    actions = (
        [
            "Do not rely on this media alone for identity or financial decisions.",
            "Verify the source through a separate trusted channel.",
            "Preserve the original file and seek a qualified forensic review.",
        ]
        if is_threat
        else [
            "Treat this result as an initial screen, not proof of authenticity.",
            "Verify the source independently when identity or safety matters.",
        ]
    )

    return {
        "threat_type": threat_type,
        "is_threat": is_threat,
        "media_type": media_type,
        "confidence": round(min(risk_score / 100, 1.0), 2),
        "risk_score": risk_score,
        "risk_level": risk_level,
        "evidence": evidence,
        "explanation": explanation,
        "recommended_actions": actions,
        "metadata": dict(metadata),
    }
