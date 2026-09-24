import re
from urllib.parse import urlparse


def extract_url_features(url):
    """
    Extract simple and explainable features from a URL.
    """

    features = {
        "has_ip_address": False,
        "has_https": False,
        "has_suspicious_keyword": False,
        "has_url_shortener": False,
        "has_unusual_pattern": False,
        "evidence": []
    }

    # Remove spaces
    url = url.strip()

    # Add scheme if missing
    parsed_url = urlparse(url if "://" in url else "http://" + url)
    hostname = parsed_url.hostname or ""

    # 1. Check IP-address based URL
    ip_pattern = r"^(?:\d{1,3}\.){3}\d{1,3}$"

    if re.match(ip_pattern, hostname):
        features["has_ip_address"] = True
        features["evidence"].append(
            "URL uses an IP address instead of a domain name"
        )

    # 2. Check HTTPS
    if parsed_url.scheme.lower() == "https":
        features["has_https"] = True

    # 3. Suspicious keywords
    suspicious_keywords = [
        "login",
        "verify",
        "verification",
        "password",
        "update",
        "account",
        "secure",
        "bank",
        "confirm",
        "signin",
        "free",
        "winner",
        "urgent"
    ]

    url_lower = url.lower()

    found_keywords = [
        keyword for keyword in suspicious_keywords
        if keyword in url_lower
    ]

    if found_keywords:
        features["has_suspicious_keyword"] = True
        features["evidence"].append(
            "Suspicious keywords found: " + ", ".join(found_keywords)
        )

    # 4. URL shortener detection
    shortener_domains = [
        "bit.ly",
        "tinyurl.com",
        "t.co",
        "goo.gl",
        "is.gd",
        "cutt.ly"
    ]

    if hostname.lower() in shortener_domains:
        features["has_url_shortener"] = True
        features["evidence"].append(
            "URL uses a known URL shortening service"
        )

    # 5. Unusual URL patterns
    if "@" in url:
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "URL contains @ symbol"
        )

    if hostname.count("-") >= 2:
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "Domain contains multiple hyphens"
        )

    if len(url) > 100:
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "URL is unusually long"
        )

    return features