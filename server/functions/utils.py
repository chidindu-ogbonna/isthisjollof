import os
import tempfile
import tensorflow as tf

from werkzeug.utils import secure_filename


def get_filepath(filename: str):
    filename = secure_filename(filename)
    return os.path.join(tempfile.gettempdir(), filename)


def delete_file(filename: str):
    filepath = get_filepath(filename)
    return os.remove(filepath)


def load_image(filename: str):
    path_image = get_filepath(filename)
    image = tf.io.read_file(path_image)
    image = tf.image.decode_image(image, channels=3)
    image = tf.expand_dims(image, 0)
    return image


def load_model(version="v1"):
    path = f"./models/{version}"
    model = tf.keras.models.load_model(path)
    return model
