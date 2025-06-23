# ml_api.py
from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "model_rf1-2.pkl")
vectorizer_path = os.path.join(BASE_DIR, "tfidf_vectorizer1.pkl")

try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    print("Model and vectorizer loaded successfully.")
except FileNotFoundError as e:
    print(f"Error loading files: {e}")
    print("Please ensure model_rf1-2.pkl and tfidf_vectorizer1.pkl are in the same directory as ml_api.py")
    # Keluar atau tangani error jika file tidak ditemukan saat startup
    exit()


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    note = data.get("text")

    if not note:
        return jsonify({"error": "No note content provided"}), 400

    vec = vectorizer.transform([note])

    # Dapatkan probabilitas untuk setiap kelas
    probabilities = model.predict_proba(vec)[0]

    # Dapatkan nama kelas/label dari modelnya
    classes = model.classes_

    # Cari probabilitas tertinggi dan labelnya
    max_prob = probabilities.max()
    pred_label = classes[probabilities.argmax()]

    return jsonify({
        "label": str(pred_label),
        "confidence": float(max_prob)
    })


if __name__ == "__main__":
    
    app.run(host='0.0.0.0', port=5001, debug=True)