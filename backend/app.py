from flask import Flask, request, jsonify
from datetime import datetime
from pathlib import Path
import json

app = Flask(__name__)

DATA_DIR = Path.home() / "kaden-home-supply" / "backend" / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

QUOTE_FILE = DATA_DIR / "quote_requests.jsonl"


@app.route("/")
def home():
    return "Kaden Home Supply backend is running"


@app.route("/health")
def health():
    return {"status": "ok"}


@app.route("/api/quote-request", methods=["POST"])
def quote_request():
    data = request.get_json(silent=True) or {}

    required_fields = ["name", "email", "projectType"]
    missing = [field for field in required_fields if not str(data.get(field, "")).strip()]

    if missing:
        return jsonify({
            "ok": False,
            "error": f"Missing required fields: {', '.join(missing)}"
        }), 400

    record = {
        "submittedAt": datetime.utcnow().isoformat() + "Z",
        "name": str(data.get("name", "")).strip(),
        "email": str(data.get("email", "")).strip(),
        "phone": str(data.get("phone", "")).strip(),
        "projectType": str(data.get("projectType", "")).strip(),
        "address": str(data.get("address", "")).strip(),
        "city": str(data.get("city", "")).strip(),
        "state": str(data.get("state", "")).strip(),
        "zip": str(data.get("zip", "")).strip(),
        "width": str(data.get("width", "")).strip(),
        "height": str(data.get("height", "")).strip(),
        "quantity": str(data.get("quantity", "")).strip(),
        "room": str(data.get("room", "")).strip(),
        "facingDirection": str(data.get("facingDirection", "")).strip(),
        "measurementMethod": str(data.get("measurementMethod", "")).strip(),
        "notes": str(data.get("notes", "")).strip(),
    }

    with QUOTE_FILE.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record) + "\n")

    return jsonify({
        "ok": True,
        "message": "Quote request received"
    })
