from .detector import detect_phishing


REQUIRED_KEYS = {
    "is_threat",
    "threat_type",
    "risk_level",
    "risk_score",
    "phishing_probability",
    "evidence"
}


def run_test(test_name, url=None, message=None):
    print("\n" + "=" * 60)
    print(test_name)
    print("=" * 60)

    result = detect_phishing(url=url, message=message)

    print("Is Threat           :", result["is_threat"])
    print("Threat Type         :", result["threat_type"])
    print("Risk Level          :", result["risk_level"])
    print("Risk Score          :", result["risk_score"])
    print("Phishing Probability:", result["phishing_probability"])
    print("Evidence            :", result["evidence"])

    # Check required output structure
    missing_keys = REQUIRED_KEYS - result.keys()

    if missing_keys:
        print("❌ Missing keys:", missing_keys)
    else:
        print("✅ Output structure OK")


# 1. Safe URL
run_test(
    "TEST 1 - Safe URL",
    url="https://www.google.com"
)


# 2. Suspicious URL
run_test(
    "TEST 2 - Suspicious URL",
    url="http://secure-login-account-verify.com"
)


# 3. IP address URL
run_test(
    "TEST 3 - IP Address URL",
    url="http://192.168.1.100/login"
)


# 4. Shortened URL
run_test(
    "TEST 4 - Shortened URL",
    url="https://bit.ly/verify-account"
)


# 5. Long URL
long_url = (
    "https://example.com/"
    + "verify-account-" * 15
)

run_test(
    "TEST 5 - Long URL",
    url=long_url
)


# 6. Suspicious phishing message
run_test(
    "TEST 6 - Suspicious Message",
    message=(
        "URGENT! Your bank account will be suspended. "
        "Verify your password immediately using the link provided."
    )
)


# 7. Safe message
run_test(
    "TEST 7 - Safe Message",
    message=(
        "Hi, the college placement meeting is scheduled "
        "for tomorrow at 10 AM in the seminar hall."
    )
)


# 8. Bank phishing
run_test(
    "TEST 8 - Bank Phishing",
    message=(
        "Your bank account has been suspended. "
        "Confirm your account details and OTP immediately "
        "to restore access."
    )
)


# 9. OTP phishing
run_test(
    "TEST 9 - OTP Phishing",
    message=(
        "Your OTP is required to complete the refund. "
        "Share the OTP now to receive your payment."
    )
)


# 10. Delivery phishing
run_test(
    "TEST 10 - Delivery Phishing",
    message=(
        "Your parcel could not be delivered. "
        "Pay the small delivery fee immediately "
        "using the verification link."
    )
)


# 11. Job phishing
run_test(
    "TEST 11 - Job Phishing",
    message=(
        "Congratulations! You have been selected for a job. "
        "Pay the registration fee and send your bank details "
        "to confirm your offer."
    )
)


# 12. Combined URL + phishing message
run_test(
    "TEST 12 - Combined URL + Message",
    url="http://192.168.10.25/login/verify",
    message=(
        "URGENT security alert! Your account will be locked. "
        "Verify your password and OTP immediately."
    )
)


# 13. Legitimate false-positive check
run_test(
    "TEST 13 - Legitimate Security Message",
    message=(
        "Your password was successfully changed. "
        "If you made this change, no further action is required."
    )
)