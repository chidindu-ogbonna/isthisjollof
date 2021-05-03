import flask
import tensorflow as tf
from flask import jsonify

from logger import log_event
from middleware import cors, parse_multipart
from utils import load_image, load_model, delete_file

THRESHOLD = 0.5
MODEL = ""


def index(request: flask.Request):
    """HTTP Cloud Function
    Args:
        request (flask.Request): The request object.
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
    """
    # nonlocal MODEL

    try:

        if request.method == "GET":
            raise NotImplementedError("GET method not supported")

        headers = cors(request)
        form_result = parse_multipart(request)

        # Load image
        image_file = form_result["files"][0]
        filename, *args = image_file
        image = load_image(filename)

        # Load Model
        model = load_model("v1")
        score = model.predict(image).flatten()
        prediction = tf.where(score < THRESHOLD, 0, 1).numpy()

        prediction = prediction[0].item()
        score = score[0].item()
        prob_is_jollof = f"{round((1 - score) * 100, 2)}%"

        is_jollof = True if prediction == 0 else False

        delete_file(filename)

        return (
            jsonify(
                data=dict(
                    prediction=prediction,
                    score=score,
                    is_jollof=is_jollof,
                    probability_is_jollof=prob_is_jollof,
                ),
                status="success",
            ),
            200,
            headers,
        )
    except Exception as e:
        print("Error: ", e)
        errorMessage = e.__str__()
        log_event(request, "error", errorMessage)
        return (
            jsonify(error=errorMessage, status="error"),
            500,
        )
