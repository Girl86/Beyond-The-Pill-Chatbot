from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows frontend to call backend

# Simple chatbot logic
def chatbot_response(user_input):
    user_input = user_input.lower()
    if "hello" in user_input or "hi" in user_input:
        return "Hello! I’m your Beyond The Pill assistant. How can I help you today?"
    elif "pill" in user_input:
        return "Remember, always take your medication as prescribed and consult your doctor if unsure."
    else:
        return "Sorry, I didn’t understand that. Can you rephrase?"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    response = chatbot_response(user_message)
    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run(debug=True)
    