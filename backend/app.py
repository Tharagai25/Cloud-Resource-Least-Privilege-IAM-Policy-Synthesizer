from flask import Flask, request, jsonify
from flask_cors import CORS

from policy_engine import generate_policy

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "Cloud IAM Policy Synthesizer Backend is running!"
    })


@app.route("/generate-policy", methods=["POST"])
def generate_iam_policy():

    data = request.get_json()

    service = data.get("service")
    resource = data.get("resource")
    permission = data.get("permission")

    if not service or not resource or not permission:
        return jsonify({
            "error": "Service, resource and permission are required"
        }), 400

    policy = generate_policy(
        service,
        resource,
        permission
    )

    if "error" in policy:
        return jsonify(policy), 400

    return jsonify({
        "message": "Least-privilege IAM policy generated successfully",
        "policy": policy
    })


if __name__ == "__main__":
    app.run(debug=True)