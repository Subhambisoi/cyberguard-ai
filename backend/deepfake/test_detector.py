import unittest

from backend.deepfake.detector import detect_media


class DetectMediaTests(unittest.TestCase):
    def test_safe_normal_image(self):
        result = detect_media({"media_type": "image", "metadata": {"format": "JPEG"}})
        self.assertFalse(result["is_threat"])
        self.assertEqual(result["risk_level"], "SAFE")
        self.assertEqual(result["risk_score"], 0)
        self.assertEqual(result["media_type"], "image")

    def test_suspicious_image(self):
        result = detect_media(
            {"media_type": "image", "indicators": ["face warp", "lighting inconsistency"]}
        )
        self.assertTrue(result["is_threat"])
        self.assertEqual(result["risk_level"], "HIGH")
        self.assertGreaterEqual(len(result["evidence"]), 2)

    def test_suspicious_video(self):
        result = detect_media(
            {"media_type": "video", "indicators": ["lip-sync mismatch", "frame inconsistency"]}
        )
        self.assertTrue(result["is_threat"])
        self.assertEqual(result["risk_level"], "HIGH")
        self.assertEqual(result["media_type"], "video")

    def test_suspicious_audio_voice(self):
        result = detect_media(
            {"media_type": "audio", "indicators": ["voice clone", "unnatural prosody"]}
        )
        self.assertTrue(result["is_threat"])
        self.assertEqual(result["risk_level"], "HIGH")
        self.assertIn("voice", " ".join(result["evidence"]).lower())

    def test_multiple_indicators_escalate_to_critical(self):
        result = detect_media(
            {
                "media_type": "video",
                "indicators": [
                    "face warp",
                    "lip-sync mismatch",
                    "frame inconsistency",
                    "voice clone",
                    "AI-generated",
                ],
            }
        )
        self.assertEqual(result["risk_level"], "CRITICAL")
        self.assertEqual(result["risk_score"], 100)
        self.assertTrue(result["is_threat"])

    def test_result_contains_required_fields(self):
        result = detect_media({"media_type": "audio"})
        self.assertEqual(
            set(result),
            {
                "threat_type", "is_threat", "media_type", "confidence", "risk_score",
                "risk_level", "evidence", "explanation", "recommended_actions", "metadata",
            },
        )

    def test_rejects_unsupported_media_type(self):
        with self.assertRaises(ValueError):
            detect_media({"media_type": "document"})


if __name__ == "__main__":
    unittest.main()
