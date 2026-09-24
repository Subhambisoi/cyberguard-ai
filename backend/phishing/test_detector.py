from detector import detect_phishing


def run_test(name, result):
    print("\n" + "=" * 50)
    print(name)
    print("=" * 50)

    print("Is Threat :", result["is_threat"])
    print("Threat Type:", result["threat_type"])
    print("Risk Level:", result["risk_level"])
    print("Risk Score:", result["risk_score"])
    print("Confidence:", result["confidence"])
    print("Evidence:")

    for item in result["evidence"]:
        print("-", item)


# Test 1: Safe URL
safe_url = detect_phishing(
    url="https://www.google.com"
)

run_test("TEST 1 - Safe URL", safe_url)


# Test 2: Suspicious URL
suspicious_url = detect_phishing(
    url="http://example-login-verify.com/account"
)

run_test("TEST 2 - Suspicious URL", suspicious_url)


# Test 3: IP address based URL
ip_url = detect_phishing(
    url="http://192.168.1.100/login"
)

run_test("TEST 3 - IP Address URL", ip_url)


# Test 4: Suspicious message
phishing_message = detect_phishing(
    message="Urgent! Verify your account and reset your password. Click here."
)

run_test("TEST 4 - Phishing Message", phishing_message)


# Test 5: URL + suspicious message
combined_test = detect_phishing(
    url="http://192.168.1.100/login",
    message="Urgent! Verify your account and password immediately."
)

run_test("TEST 5 - URL + Message", combined_test)

# Test 6: Safe message
safe_message = detect_phishing(
    message="Please bring your laptop to the lab tomorrow for the Python practical."
)

run_test("TEST 6 - Safe Message", safe_message)


# Test 7: Phishing message with bank request
bank_phishing = detect_phishing(
    message="Urgent! Your bank account is blocked. Click here to verify your password."
)

run_test("TEST 7 - Bank Phishing Message", bank_phishing)


# Test 8: Normal conversation
normal_message = detect_phishing(
    message="Can you send me the project file after the class?"
)

run_test("TEST 8 - Normal Message", normal_message)