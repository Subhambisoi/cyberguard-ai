
try:
    from .detector import detect_account_takeover
except ImportError:
    from detector import detect_account_takeover


def run_test(test_name, event, expected_level):
    print("\n" + "=" * 55)
    print(test_name)
    print("=" * 55)

    result = detect_account_takeover(event)

    print("Threat Type         :", result["threat_type"])
    print("Is Threat           :", result["is_threat"])
    print("Risk Score          :", result["risk_score"])
    print("Risk Level          :", result["risk_level"])
    print("Confidence          :", result["confidence"])
    print("Evidence            :", result["evidence"])
    print("Explanation         :", result["explanation"])
    print("Recommended Actions :", result["recommended_actions"])
    print("Metadata            :", result["metadata"])

    assert result["risk_level"] == expected_level
    assert 0 <= result["risk_score"] <= 100
    assert isinstance(result["evidence"], list)
    assert isinstance(result["recommended_actions"], list)

    print("✅ TEST PASSED")


# TEST 1: Safe Login
run_test(
    "TEST 1 - Safe Login",
    {
        "user_id": "user_101",
        "failed_attempts": 1,
        "location": "Bhubaneswar",
        "previous_location": "Bhubaneswar",
        "login_time": "10:30",
        "ip_address": "192.168.1.10",
        "device_known": True,
        "session_duration": 30
    },
    "SAFE"
)


# TEST 2: Multiple Failed Logins
run_test(
    "TEST 2 - Multiple Failed Logins",
    {
        "user_id": "user_102",
        "failed_attempts": 8,
        "location": "Bhubaneswar",
        "previous_location": "Bhubaneswar",
        "login_time": "10:30",
        "ip_address": "192.168.1.20",
        "device_known": True,
        "session_duration": 30
    },
    "MEDIUM"
)


# TEST 3: Unknown Device
run_test(
    "TEST 3 - Unknown Device",
    {
        "user_id": "user_103",
        "failed_attempts": 1,
        "location": "Bhubaneswar",
        "previous_location": "Bhubaneswar",
        "login_time": "11:00",
        "ip_address": "192.168.1.30",
        "device_known": False,
        "session_duration": 30
    },
    "LOW"
)


# TEST 4: Unusual Location
run_test(
    "TEST 4 - Unusual Location",
    {
        "user_id": "user_104",
        "failed_attempts": 1,
        "location": "Mumbai",
        "previous_location": "Bhubaneswar",
        "login_time": "12:00",
        "ip_address": "192.168.1.40",
        "device_known": True,
        "session_duration": 30
    },
    "LOW"
)


# TEST 5: Combined Attack
run_test(
    "TEST 5 - Combined Account Takeover Indicators",
    {
        "user_id": "user_105",
        "failed_attempts": 8,
        "location": "Mumbai",
        "previous_location": "Bhubaneswar",
        "login_time": "02:30",
        "ip_address": "185.XX.XX.XX",
        "device_known": False,
        "session_duration": 5
    },
    "CRITICAL"
)


print("\n🎉 ALL ACCOUNT TAKEOVER TESTS COMPLETED")