export GCP_PROJECT='t-ogbonna'
export ENDPOINT_ID='6998400306887262208'
export GOOGLE_APPLICATION_CREDENTIALS="../service-accounts/service-account.json"

functions_framework --target=index
