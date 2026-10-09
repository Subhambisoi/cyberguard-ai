import sqlite3


DATABASE_NAME = "cyberguard.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_NAME)
    connection.row_factory = sqlite3.Row
    return connection


def create_table():
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            threat_type TEXT NOT NULL,
            confidence REAL NOT NULL,
            risk_score REAL NOT NULL,
            risk_level TEXT NOT NULL,
            evidence TEXT,
            explanation TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    connection.close()


def save_analysis(
    threat_type,
    confidence,
    risk_score,
    risk_level,
    evidence,
    explanation
):
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO analyses (
            threat_type,
            confidence,
            risk_score,
            risk_level,
            evidence,
            explanation
        )
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        threat_type,
        confidence,
        risk_score,
        risk_level,
        evidence,
        explanation
    ))

    connection.commit()

    analysis_id = cursor.lastrowid

    connection.close()

    return analysis_id