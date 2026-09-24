import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


# 1. Load dataset
data = pd.read_csv("data/dataset.csv")

# 2. Input and output
X = data["text"]
y = data["label"]

# 3. Convert text into numerical features using TF-IDF
vectorizer = TfidfVectorizer(
    lowercase=True,
    stop_words="english"
)

X_tfidf = vectorizer.fit_transform(X)

# 4. Split dataset into training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X_tfidf,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 5. Create Logistic Regression model
model = LogisticRegression()

# 6. Train model
model.fit(X_train, y_train)

# 7. Make predictions
y_pred = model.predict(X_test)

# 8. Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

print("=" * 50)
print("PHISHING DETECTION MODEL")
print("=" * 50)

print(f"Accuracy: {accuracy:.2f}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# 9. Save trained model
joblib.dump(model, "phishing_model.pkl")

# 10. Save TF-IDF vectorizer
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")

print("\nModel saved as: phishing_model.pkl")
print("Vectorizer saved as: tfidf_vectorizer.pkl")