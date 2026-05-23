from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import joblib

# --- FastAPI app ---
app = FastAPI()

# --- Load GRU model and tokenizer ---
gru_model = load_model("sms_gru_model.h5")
tokenizer = joblib.load("sms_tokenizer.pkl")   # save your tokenizer earlier with joblib.dump(tokenizer, "sms_tokenizer.pkl")

# --- Request schema ---
class TextRequest(BaseModel):
    message: str

# --- Endpoint ---
@app.post("/scan_text")
def scan_text(req: TextRequest):
    # Preprocess: tokenize + pad
    seq = tokenizer.texts_to_sequences([req.message])
    padded = pad_sequences(seq, maxlen=150, padding="post")
    
    # Predict
    proba = gru_model.predict(padded)[0][0]
    verdict = "Spam/Phishing" if proba > 0.3 else "Safe"
    
    return {
        "message": req.message,
        "threat_score": round(float(proba) * 100, 2),
        "verdict": verdict
    }
