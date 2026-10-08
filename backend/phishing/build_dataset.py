import csv
import random
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"

SOURCE_FILE = DATA_DIR / "dataset.csv"
OUTPUT_FILE = DATA_DIR / "dataset.csv"


# --------------------------------------------------
# Curated phishing examples
# --------------------------------------------------

phishing_samples = [

    # Credential phishing
    ("Please verify your account login details using the secure link.", 1),
    ("Your account verification is pending. Confirm your username and password.", 1),
    ("Security verification required. Login now to keep your account active.", 1),
    ("We detected unusual login activity. Verify your account immediately.", 1),
    ("Confirm your login credentials to prevent account restrictions.", 1),

    # Bank / payment phishing
    ("Your bank account requires immediate verification to avoid suspension.", 1),
    ("A payment attempt was detected. Confirm your banking details now.", 1),
    ("Verify your debit card information to complete the pending payment.", 1),
    ("Your online banking access will be blocked unless you confirm your details.", 1),
    ("Confirm your bank account information to receive the pending payment.", 1),

    # OTP phishing
    ("Share the OTP received on your phone to complete the verification.", 1),
    ("Enter the OTP immediately to confirm your refund.", 1),
    ("Your OTP is required to activate your account.", 1),
    ("Send the verification OTP to complete the payment.", 1),
    ("Provide the OTP to cancel the unauthorized transaction.", 1),

    # Password reset phishing
    ("Your password reset request is waiting for confirmation. Click the link now.", 1),
    ("Reset your password immediately using the verification link.", 1),
    ("Your password has expired. Confirm your account before resetting it.", 1),
    ("Click the secure link to create your new password.", 1),
    ("Confirm your identity to complete the password reset.", 1),

    # Account suspension
    ("Your account will be suspended today unless you verify your information.", 1),
    ("Immediate action required. Your account has been temporarily restricted.", 1),
    ("Your account is at risk of permanent closure. Verify it now.", 1),
    ("Security policy violation detected. Confirm your account to avoid suspension.", 1),
    ("Your account access has been limited. Complete verification immediately.", 1),

    # Delivery / refund
    ("Your parcel could not be delivered. Pay the small fee to reschedule delivery.", 1),
    ("Your refund is waiting. Confirm your bank details to receive it.", 1),
    ("Delivery failed because of an unpaid charge. Update your payment details.", 1),
    ("Your package is on hold. Verify your address and payment information.", 1),
    ("A refund has been approved. Confirm your account to receive the money.", 1),

    # Job / internship
    ("Congratulations! You have been selected for the internship. Pay the registration fee to continue.", 1),
    ("Your job application has been shortlisted. Submit your bank details to confirm the offer.", 1),
    ("You have been selected for a work-from-home position. Pay the processing fee today.", 1),
    ("Complete the job verification by sending your personal banking information.", 1),
    ("Your internship offer is ready. Pay the security deposit to receive the joining letter.", 1),

    # Social media verification
    ("Your social media account needs verification. Confirm your password immediately.", 1),
    ("Your account may be disabled. Complete verification using the link provided.", 1),
    ("Verify your social media identity to prevent account removal.", 1),
    ("Unusual activity was detected on your social account. Login to verify.", 1),
    ("Your profile verification has expired. Confirm your account now.", 1),

    # Prize / reward
    ("Congratulations! You have won a cash reward. Claim it by verifying your details.", 1),
    ("You are the selected winner of a special prize. Click to claim it.", 1),
    ("Your free reward is waiting. Confirm your information to receive it.", 1),
    ("You have been chosen for a bonus payment. Verify your details today.", 1),
    ("Claim your reward before it expires by confirming your account.", 1),

    # Urgent security alerts
    ("Urgent security alert! Confirm your account immediately.", 1),
    ("Critical security warning. Verify your password to prevent account closure.", 1),
    ("Immediate action required due to suspicious activity on your account.", 1),
    ("Security alert: confirm your identity now to restore account access.", 1),
    ("Your account has triggered a security warning. Complete verification immediately.", 1),
]


# --------------------------------------------------
# Curated legitimate / safe examples
# --------------------------------------------------

safe_samples = [

    # College messages
    ("Today's Python class starts at 10 AM in the computer lab.", 0),
    ("Please submit your project report before Friday.", 0),
    ("The college has announced a holiday for tomorrow.", 0),
    ("Your internal examination timetable has been uploaded.", 0),
    ("Please bring your laptop for tomorrow's practical class.", 0),
    ("The placement training session will begin at 9 AM.", 0),
    ("The faculty has shared the assignment instructions.", 0),

    # Normal banking notifications
    ("Your monthly bank statement is now available in your banking app.", 0),
    ("Your scheduled account statement has been generated.", 0),
    ("Your recent debit card transaction was recorded successfully.", 0),
    ("Your bank has received your scheduled payment.", 0),
    ("Your account balance has been updated after the transaction.", 0),
    ("Your monthly banking summary is available for review.", 0),
    ("The bank has processed your requested account statement.", 0),

    # Genuine delivery updates
    ("Your package has been shipped and is expected to arrive tomorrow.", 0),
    ("Your delivery is out for delivery today.", 0),
    ("The courier has received your parcel for delivery.", 0),
    ("Your order has reached the local delivery center.", 0),
    ("Your package was delivered successfully.", 0),
    ("Your order tracking status has been updated.", 0),
    ("The delivery partner will attempt delivery today.", 0),

    # Normal work emails
    ("Please review the project document before our next meeting.", 0),
    ("The development team has completed the weekly report.", 0),
    ("Please share the updated presentation with the team.", 0),
    ("The project review meeting is scheduled for Monday.", 0),
    ("The team has uploaded the latest project files.", 0),
    ("Please check the work schedule for next week.", 0),
    ("The weekly team report has been shared with everyone.", 0),

    # Meeting messages
    ("Our project meeting is scheduled for tomorrow afternoon.", 0),
    ("Please join the online meeting at the scheduled time.", 0),
    ("The meeting room has been changed to Room 204.", 0),
    ("The agenda for today's meeting has been shared.", 0),
    ("Our weekly team discussion will start at 3 PM.", 0),
    ("Please bring your project notes to the meeting.", 0),
    ("The meeting has been moved to Friday morning.", 0),

    # Legitimate password/security notifications
    ("Your password was successfully changed.", 0),
    ("A new device was added to your account successfully.", 0),
    ("Your security settings were updated successfully.", 0),
    ("Two-factor authentication is enabled on your account.", 0),
    ("Your recent login was recorded successfully.", 0),
    ("Your security preferences have been saved.", 0),
    ("Your account recovery information was updated successfully.", 0),

    # Normal social media messages
    ("You have a new friend request on your social media account.", 0),
    ("Your friend shared a new photo with you.", 0),
    ("You have received a new message from a contact.", 0),
    ("Your profile notification settings were updated.", 0),
    ("You have a new comment on your recent post.", 0),
    ("Your social media feed has been updated.", 0),
    ("A contact has shared a post with you.", 0),
]


def normalize(text):
    return " ".join(text.strip().lower().split())


def load_existing_data():
    if not SOURCE_FILE.exists():
        return []

    rows = []

    with open(SOURCE_FILE, "r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)

        for row in reader:
            text = row.get("text", "").strip()
            label = row.get("label", "").strip()

            if text and label in {"0", "1"}:
                rows.append((text, int(label)))

    return rows


def remove_duplicates(samples):
    unique = {}
    for text, label in samples:
        key = (normalize(text), label)
        unique[key] = (text, label)

    return list(unique.values())


def main():
    existing = load_existing_data()

    combined = existing + phishing_samples + safe_samples

    combined = remove_duplicates(combined)

    phishing = [
        sample for sample in combined
        if sample[1] == 1
    ]

    safe = [
        sample for sample in combined
        if sample[1] == 0
    ]

    random.seed(42)

    random.shuffle(phishing)
    random.shuffle(safe)

    # Use equal numbers from both classes.
    target_per_class = min(
        len(phishing),
        len(safe),
        500
    )

    phishing = phishing[:target_per_class]
    safe = safe[:target_per_class]

    final_data = phishing + safe

    random.shuffle(final_data)

    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)

        writer.writerow(["text", "label"])

        for text, label in final_data:
            writer.writerow([text, label])

    print("=" * 60)
    print("PHISHING DATASET BUILDER")
    print("=" * 60)
    print(f"Total samples : {len(final_data)}")
    print(f"Phishing      : {sum(label == 1 for _, label in final_data)}")
    print(f"Safe          : {sum(label == 0 for _, label in final_data)}")
    print(f"Duplicates    : {len(final_data) - len(remove_duplicates(final_data))}")
    print()
    print(f"Dataset saved to:")
    print(OUTPUT_FILE)


if __name__ == "__main__":
    main()