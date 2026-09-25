import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "dataset.csv"
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "phishing_model.pkl"
)

VECTORIZER_PATH = os.path.join(
    BASE_DIR,
    "tfidf_vectorizer.pkl"
)


# ==============================
# LOAD DATASET
# ==============================

data = pd.read_csv(DATA_PATH)

X = data["text"].astype(str)
y = data["label"]


print("=" * 60)
print("PHISHING DETECTION MODEL TRAINING")
print("=" * 60)

print(f"Total samples : {len(data)}")
print(f"Phishing      : {(y == 1).sum()}")
print(f"Safe          : {(y == 0).sum()}")


# ==============================
# TRAIN / TEST SPLIT
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


print()
print(f"Training samples : {len(X_train)}")
print(f"Testing samples  : {len(X_test)}")


# ==============================
# TF-IDF
# ==============================

vectorizer = TfidfVectorizer(
    lowercase=True,
    stop_words="english",
    ngram_range=(1, 2)
)


# IMPORTANT:
# Fit TF-IDF only on training data
X_train_tfidf = vectorizer.fit_transform(X_train)

# Transform test data using the already-fitted vectorizer
X_test_tfidf = vectorizer.transform(X_test)


# ==============================
# LOGISTIC REGRESSION
# ==============================

model = LogisticRegression(
    random_state=42,
    max_iter=1000
)

model.fit(X_train_tfidf, y_train)


# ==============================
# PREDICTION
# ==============================

y_pred = model.predict(X_test_tfidf)


# ==============================
# METRICS
# ==============================

accuracy = accuracy_score(y_test, y_pred)

precision = precision_score(
    y_test,
    y_pred,
    zero_division=0
)

recall = recall_score(
    y_test,
    y_pred,
    zero_division=0
)

f1 = f1_score(
    y_test,
    y_pred,
    zero_division=0
)


print()
print("=" * 60)
print("MODEL PERFORMANCE")
print("=" * 60)

print(f"Accuracy  : {accuracy:.4f}")
print(f"Precision : {precision:.4f}")
print(f"Recall    : {recall:.4f}")
print(f"F1 Score  : {f1:.4f}")

print()
print("Classification Report:")
print(classification_report(
    y_test,
    y_pred,
    target_names=["Safe", "Phishing"],
    zero_division=0
))


# ==============================
# SAVE MODEL
# ==============================

joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)


print()
print("Model saved to:")
print(MODEL_PATH)

print()
print("Vectorizer saved to:")
print(VECTORIZER_PATH)

print()
print("Training completed successfully.")