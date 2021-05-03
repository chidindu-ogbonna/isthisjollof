gcloud functions deploy index \
  --region=us-central1 \
  --source=functions \
  --runtime=python37 \
  --memory=2048MB \
  --trigger-http \
  --allow-unauthenticated