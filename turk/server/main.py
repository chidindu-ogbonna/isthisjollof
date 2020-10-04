# from typing import List
import firebase_admin
from firebase_admin import credentials, firestore
from instaloader import Hashtag, Instaloader, exceptions


def init_db():
    cred = credentials.Certificate("./service-account/service-account.json")
    firebase_admin.initialize_app(cred)
    return firestore.client()


def make_post(item):
    hashtags = item.caption_hashtags
    mentions = item.caption_mentions
    tagged_users = item.tagged_users
    no_of_mentions = len(mentions)
    no_of_hashtags = len(hashtags)
    no_of_tagged_users = len(tagged_users)

    return {
        "id": item.shortcode,
        "url": item.url,
        "caption": item.caption,
        "likes": item.likes,
        "comments": item.comments,
        "is_sponsored": item.is_sponsored,
        "location": item.location,
        "hashtags": hashtags,
        "no_of_hashtags": no_of_hashtags,
        "no_of_mentions": no_of_mentions,
        "no_of_tagged_users": no_of_tagged_users,
    }


L = Instaloader()
query = "jollofrice"


if __name__ == "__main__":
    db = init_db()
    temp_ref = db.collection("temp")

    count = 0

    hashtag = Hashtag.from_name(L.context, query)
    for item in hashtag.get_all_posts():
        try:
            if count < 1000:
                if item.typename == "GraphImage" and not item.is_video:
                    post = make_post(item)
                    temp_ref.document(post["id"]).set(post)
                    print(f"{count + 1} Added: ", post["id"])
                    count = count + 1
            else:
                break
        except exceptions.BadResponseException as e:
            print("BAD_RESPONSE: ", e)
        except exceptions.ConnectionException as e:
            print("CONNECTION_ERROR: ", e)
        except exceptions.TooManyRequestsException as e:
            # Do some cooling off
            print("TOO_MANY_REQUESTS: ", e)
            print("Cool Down !!")
        except AttributeError as e:
            print("ATTRIBUTE: ", e)

    print("Done !")
