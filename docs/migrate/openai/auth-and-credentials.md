---
title: Authenticate
source: https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/openai/auth-and-credentials
date_scraped: 2025-05-12
---

# Authenticate 

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

To use the OpenAI Python libraries, install the OpenAI SDK:

```python
pip install openai

```

To authenticate with the Chat Completions API, you can
either modify your client setup or change your environment
configuration to use Google authentication and a Vertex AI
endpoint. Choose whichever method that's easier, and follow the steps for
setting up depending on whether you want to call Gemini models
or self-deployed Model Garden models.

Certain models in Model Garden and
[supported Hugging Face models](https://cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-hugging-face-models)
need to be
[deployed to a Vertex AI endpoint](https://cloud.google.com/vertex-ai/docs/general/deployment)
first before they can serve requests.
When
calling these self-deployed models from the Chat Completions API, you need to
specify the endpoint ID. To list your
existing Vertex AI endpoints, use the
[`gcloud ai endpoints list` command](https://cloud.google.com/sdk/gcloud/reference/ai/endpoints/list).

### Client setup

To programmatically get Google credentials in Python, you can use the
`google-auth` Python SDK:

```python
pip install google-auth requests

```

### Python

Before trying this sample, follow the Python setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Python API
reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

```python
import openai

from google.auth import default
import google.auth.transport.requests

# TODO(developer): Update and un-comment below lines
# project_id = "PROJECT_ID"
# location = "us-central1"

# Programmatically get an access token
credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
credentials.refresh(google.auth.transport.requests.Request())
# Note: the credential lives for 1 hour by default (https://cloud.google.com/docs/authentication/token-types#at-lifetime); after expiration, it must be refreshed.

##############################
# Choose one of the following:
##############################

# If you are calling a Gemini model, set the ENDPOINT_ID variable to use openapi.
ENDPOINT_ID = "openapi"

# If you are calling a self-deployed model from Model Garden, set the
# ENDPOINT_ID variable and set the client's base URL to use your endpoint.
# ENDPOINT_ID = "YOUR_ENDPOINT_ID"

# OpenAI Client
client = openai.OpenAI(
 base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/{ENDPOINT_ID}",
 api_key=credentials.token,
)
```

By default, access tokens last for 1 hour. You can
[extend the life of your access token](https://cloud.google.com/docs/authentication/token-types#at-lifetime)
or periodically refresh your token and update the `openai.api_key` variable.

### Environment variables

[Install](https://cloud.google.com/sdk/docs/install-sdk) the Google Cloud CLI. The OpenAI library can
read the `OPENAI_API_KEY` and `OPENAI_BASE_URL` environment
variables to change the authentication and endpoint in their default client.
Set the following variables:

```python
$ export PROJECT_ID=PROJECT_ID
$ export LOCATION=LOCATION
$ export OPENAI_API_KEY="$(gcloud auth application-default print-access-token)"

```

To call a Gemini model, set the `MODEL_ID`
variable and use the `openapi` endpoint:

```python
$ export MODEL_ID=MODEL_ID
$ export OPENAI_BASE_URL="https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/openapi"

```

To call a self-deployed model from Model Garden, set the `ENDPOINT`
variable and use that in your URL instead:

```python
$ export ENDPOINT=ENDPOINT_ID
$ export OPENAI_BASE_URL="https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT}"

```

Next, initialize the client:

```python
client = openai.OpenAI()

```

The Gemini Chat Completions API uses OAuth to authenticate
with a
[short-lived access token](https://cloud.google.com/iam/docs/create-short-lived-credentials-direct#sa-credentials-oauth).
By default, access tokens last for 1 hour. You can
[extend the life of your access token](https://cloud.google.com/docs/authentication/token-types#at-lifetime)
or periodically refresh your token and update the `OPENAI_API_KEY`
environment variable.

## Refresh your credentials

The following example shows how to refresh your credentials automatically as
needed:

### Python

```python
from typing import Any

import google.auth
import google.auth.transport.requests
import openai

class OpenAICredentialsRefresher:
 def __init__(self, **kwargs: Any) -> None:
 # Set a placeholder key here
 self.client = openai.OpenAI(**kwargs, api_key="PLACEHOLDER")
 self.creds, self.project = google.auth.default(
 scopes=["https://www.googleapis.com/auth/cloud-platform"]
 )

 def __getattr__(self, name: str) -> Any:
 if not self.creds.valid:
 self.creds.refresh(google.auth.transport.requests.Request())

 if not self.creds.valid:
 raise RuntimeError("Unable to refresh auth")

 self.client.api_key = self.creds.token
 return getattr(self.client, name)

 # TODO(developer): Update and un-comment below lines
 # project_id = "PROJECT_ID"
 # location = "us-central1"

 client = OpenAICredentialsRefresher(
 base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
 )

 response = client.chat.completions.create(
 model="google/gemini-2.0-flash-001",
 messages=[{"role": "user", "content": "Why is the sky blue?"}],
 )

 print(response)
```

## What's next

- See examples of calling the
 [Chat Completions API](examples_1.md)
 with the OpenAI-compatible syntax.
- See examples of calling the
 [Inference API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#examples)
 with the OpenAI-compatible syntax.
- See examples of calling the
 [Function Calling API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/function-calling#examples)
 with OpenAI-compatible syntax.
- Learn more about the [Gemini API](../../code/code-models-overview.md).
- Learn more about [migrating from Azure OpenAI to the Gemini API](https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-from-azure-to-gemini).