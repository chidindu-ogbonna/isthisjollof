import json

import flask

PROJECT = "t-ogbonna"


# Build structured log messages as an object.
global_log_fields = {}


def log_event(request: flask.Request, severity: str, message: str):

    # Build structured log messages as an object.
    global_log_fields = {}

    # Add log correlation to nest all log messages.
    trace_header = request.headers.get("X-Cloud-Trace-Context")

    if trace_header and PROJECT:
        trace = trace_header.split("/")
        global_log_fields[
            "logging.googleapis.com/trace"
        ] = f"projects/{PROJECT}/traces/{trace[0]}"

    entry = dict(
        severity=severity.upper(),
        message=message,
        # Log viewer accesses 'component' as jsonPayload.component'.
        component="arbitrary-property",
        **global_log_fields,
    )

    print(json.dumps(entry))
