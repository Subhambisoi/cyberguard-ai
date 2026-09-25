import ipaddress
import re
from urllib.parse import urlparse


def extract_url_features(url):
    features = {
        "has_ip_address": False,
        "has_https": False,
        "has_suspicious_keyword": False,
        "has_url_shortener": False,
        "has_at_symbol": False,
        "has_excessive_hyphens": False,
        "has_long_url": False,
        "has_suspicious_subdomain": False,
        "has_malformed_url": False,
        "has_unusual_pattern": False,
        "evidence": []
    }

    if not isinstance(url, str) or not url.strip():
        features["has_malformed_url"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append("URL is empty or invalid")
        return features

    url = url.strip()

    # Basic malformed URL checks
    if any(char.isspace() for char in url):
        features["has_malformed_url"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append("URL contains whitespace")
        return features

    parsed_url = urlparse(
        url if "://" in url else "http://" + url
    )

    hostname = parsed_url.hostname or ""

    if not hostname:
        features["has_malformed_url"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append("URL does not contain a valid hostname")
        return features

    hostname = hostname.lower()

    # Only HTTP/HTTPS URLs are expected
    if parsed_url.scheme.lower() not in {"http", "https"}:
        features["has_malformed_url"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "URL uses an unsupported protocol"
        )

    # HTTPS detection
    if parsed_url.scheme.lower() == "https":
        features["has_https"] = True

    # IP address detection
    try:
        ipaddress.ip_address(hostname)
        features["has_ip_address"] = True
        features["evidence"].append(
            "URL uses an IP address instead of a domain name"
        )
    except ValueError:
        pass

    # Suspicious keywords
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
        "urgent",
        "otp",
        "payment",
        "refund",
        "suspended"
    ]

    url_lower = url.lower()

    found_keywords = [
        keyword
        for keyword in suspicious_keywords
        if re.search(rf"\b{re.escape(keyword)}\b", url_lower)
    ]

    if found_keywords:
        features["has_suspicious_keyword"] = True
        features["evidence"].append(
            "Suspicious keywords found: "
            + ", ".join(found_keywords)
        )

    # Known URL shorteners
    shortener_domains = {
        "bit.ly",
        "tinyurl.com",
        "t.co",
        "goo.gl",
        "is.gd",
        "cutt.ly",
        "shorturl.at",
        "ow.ly"
    }

    if hostname in shortener_domains:
        features["has_url_shortener"] = True
        features["evidence"].append(
            "URL uses a known URL shortening service"
        )

    # @ symbol / user information in URL
    if "@" in parsed_url.netloc:
        features["has_at_symbol"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "URL contains @ symbol before the hostname"
        )

    # Excessive hyphens
    hostname_parts = hostname.split(".")

    if hostname.count("-") >= 2:
        features["has_excessive_hyphens"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "Domain contains multiple hyphens"
        )

    # Very long URL
    if len(url) > 120:
        features["has_long_url"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "URL is unusually long"
        )

    # Suspicious subdomain/domain patterns
    if len(hostname_parts) >= 4:
        features["has_suspicious_subdomain"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "URL contains an unusually deep subdomain structure"
        )

    # Punycode domains can represent internationalized domains
    if any(part.startswith("xn--") for part in hostname_parts):
        features["has_suspicious_subdomain"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "Domain contains encoded/punycode hostname"
        )

    # Very long hostname
    if len(hostname) > 60:
        features["has_suspicious_subdomain"] = True
        features["has_unusual_pattern"] = True
        features["evidence"].append(
            "Hostname is unusually long"
        )

    return features