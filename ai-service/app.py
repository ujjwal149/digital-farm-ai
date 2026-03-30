from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

# Load trained model
model = joblib.load("model.pkl")

class Animal(BaseModel):
    temperature: float
    healthStatus: str

@app.get("/")
def home():
    return {"message": "AI ML Service Running 🚀"}

@app.post("/predict")
def predict(animal: Animal):
    # Convert text → number
    hs = 1 if animal.healthStatus == "sick" else 0

    # Predict
    pred = model.predict([[animal.temperature, hs]])[0]

    if pred == 2:
        return {"risk": "High Risk 🚨", "score": 90}
    elif pred == 1:
        return {"risk": "Medium Risk ⚠️", "score": 60}
    else:
        return {"risk": "Healthy ✅", "score": 20}