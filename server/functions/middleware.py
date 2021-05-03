import flask
from typing import Dict
from utils import get_filepath


def cors(request: flask.Request) -> Dict:

    if request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }

        return ("", 204, headers)

    # Set CORS headers for the main request
    headers = {"Access-Control-Allow-Origin": "*"}

    return headers


def parse_multipart(request: flask.Request) -> Dict:
    """Parses a 'multipart/form-data' upload request
    Args:
        request (flask.Request): The request object.
    Returns:
        Dict containing files and
    """
    formResult = {"files": []}

    # This code will process each non-file field in the form
    data = request.form.to_dict()
    for field in data:
        formResult[field] = data[field]

    # This code will process each file uploaded
    files = request.files.to_dict()
    for item in files.items():
        filename, file = item
        file.save(get_filepath(filename))
        formResult["files"].append(item)

    return formResult
