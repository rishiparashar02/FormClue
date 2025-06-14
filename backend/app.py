from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if not OPENROUTER_API_KEY:
    raise EnvironmentError("OPENROUTER_API_KEY not found in .env file.")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
HEADERS = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}

@app.route("/suggest", methods=["POST"])
def suggest_answer():
    try:
        data = request.get_json()
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"error": "Empty question received"}), 400

        # Build prompt for generic suggestions
        prompt = (
    f"The user is filling out a Google Form. The question is:\n"
    f"'{question}'\n"
    "Respond with a shrot and crisp answer that is suitable for a Google Form response.\n"
)


        payload = {
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are an assistant that helps users by suggesting generic answers for Google Forms."},
                {"role": "user", "content": prompt}
            ]
        }

        response = requests.post(OPENROUTER_URL, headers=HEADERS, json=payload, timeout=15)
        response.raise_for_status()

        ai_response = response.json()
        suggestion = ai_response["choices"][0]["message"]["content"].strip()

        return jsonify({"suggestion": suggestion})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)
