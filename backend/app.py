from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.environ.get("FRONTEND_ORIGIN", "*")}})

@app.route("/api/hello")
def hello():
    name = request.args.get("name", "world")
    return jsonify({"message": f"Hello, {name} from Flask!"})

@app.route("/api/process", methods=['POST'])
def process_data():
    if not request.is_json:
        return jsonify({"error": "Content type must be application/json"}), 400
    
    data = request.json.get('data')
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Process the data here
    result = f"Received: {data}"
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
