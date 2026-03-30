import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load data
df = pd.read_csv("data.csv")

# Convert text → numbers
df["healthStatus"] = df["healthStatus"].map({"healthy": 0, "sick": 1})
df["label"] = df["label"].map({"low": 0, "medium": 1, "high": 2})

X = df[["temperature", "healthStatus"]]
y = df["label"]

# Train model
model = RandomForestClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, "model.pkl")

print("Model trained and saved ✅")