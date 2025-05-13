---
title: Examples
source: https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/openai/examples#multimodal-input-examples
date_scraped: 2025-05-12
---

# Examples 

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

To see an example of using the Chat Completions API,
run the "Call Gemini with the OpenAI Library" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb)

## Call Gemini with the Chat Completions API

The following sample shows you how to send non-streaming requests:

### REST

```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/openapi/chat/completions \
 -d '{
 "model": "google/${MODEL_ID}",
 "messages": [{
 "role": "user",
 "content": "Write a story about a magic backpack."
 }]
 }'
 
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
from google.auth import default
import google.auth.transport.requests

import openai

# TODO(developer): Update and un-comment below lines
# project_id = "PROJECT_ID"
# location = "us-central1"

# Programmatically get an access token
credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
credentials.refresh(google.auth.transport.requests.Request())

# OpenAI Client
client = openai.OpenAI(
 base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
 api_key=credentials.token,
)

response = client.chat.completions.create(
 model="google/gemini-2.0-flash-001",
 messages=[{"role": "user", "content": "Why is the sky blue?"}],
)

print(response)
```

The following sample shows you how to send streaming requests to a
Gemini model by using the Chat Completions API:

### REST

```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/openapi/chat/completions \
 -d '{
 "model": "google/${MODEL_ID}",
 "stream": true,
 "messages": [{
 "role": "user",
 "content": "Write a story about a magic backpack."
 }]
 }'
 
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
from google.auth import default
import google.auth.transport.requests

import openai

# TODO(developer): Update and un-comment below lines
# project_id = "PROJECT_ID"
# location = "us-central1"

# Programmatically get an access token
credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
credentials.refresh(google.auth.transport.requests.Request())

# OpenAI Client
client = openai.OpenAI(
 base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
 api_key=credentials.token,
)

response = client.chat.completions.create(
 model="google/gemini-2.0-flash-001",
 messages=[{"role": "user", "content": "Why is the sky blue?"}],
 stream=True,
)
for chunk in response:
 print(chunk)
```

## Call a self-deployed model with the Chat Completions API

The following sample shows you how to send non-streaming requests:

### REST

```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/endpoints/${ENDPOINT}/chat/completions \
 -d '{
 "messages": [{
 "role": "user",
 "content": "Write a story about a magic backpack."
 }]
 }'
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
from google.auth import default
import google.auth.transport.requests

import openai

# TODO(developer): Update and un-comment below lines
# project_id = "PROJECT_ID"
# location = "us-central1"
# model_id = "gemma-2-9b-it"
# endpoint_id = "YOUR_ENDPOINT_ID"

# Programmatically get an access token
credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
credentials.refresh(google.auth.transport.requests.Request())

# OpenAI Client
client = openai.OpenAI(
 base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/{endpoint_id}",
 api_key=credentials.token,
)

response = client.chat.completions.create(
 model=model_id,
 messages=[{"role": "user", "content": "Why is the sky blue?"}],
)
print(response)

```

The following sample shows you how to send streaming requests to a
self-deployed model by using the Chat Completions API:

### REST

```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/global/endpoints/${ENDPOINT}/chat/completions \
 -d '{
 "stream": true,
 "messages": [{
 "role": "user",
 "content": "Write a story about a magic backpack."
 }]
 }'
 
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
from google.auth import default
import google.auth.transport.requests

import openai

# TODO(developer): Update and un-comment below lines
# project_id = "PROJECT_ID"
# location = "us-central1"
# model_id = "gemma-2-9b-it"
# endpoint_id = "YOUR_ENDPOINT_ID"

# Programmatically get an access token
credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
credentials.refresh(google.auth.transport.requests.Request())

# OpenAI Client
client = openai.OpenAI(
 base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/{endpoint_id}",
 api_key=credentials.token,
)

response = client.chat.completions.create(
 model=model_id,
 messages=[{"role": "user", "content": "Why is the sky blue?"}],
 stream=True,
)
for chunk in response:
 print(chunk)

```

## `extra_body` examples

You can use either the SDK or the REST API to pass in `extra_body`.

### Add `thought_tag_marker`

```python
{
 ...,
 "extra_body": {
 "google": {
 ...,
 "thought_tag_marker": "..."
 }
 }
}

```

### Add `extra_body` using the SDK

```python
client.chat.completions.create(
 ...,
 extra_body = {
 'extra_body': { 'google': { ... } }
 },
)

```

## `extra_content` examples

You can populate this field by using the REST API directly.

### `extra_content` with string `content`

```python
{
 "messages": [
 { "role": "...", "content": "...", "extra_content": { "google": { ... } } }
 ]
}

```

### Per-message `extra_content`

```python
{
 "messages": [
 {
 "role": "...",
 "content": [
 { "type": "...", ..., "extra_content": { "google": { ... } } }
 ]
 }
}

```

### Per-tool call `extra_content`

```python
{
 "messages": [
 {
 "role": "...",
 "tool_calls": [
 {
 ...,
 "extra_content": { "google": { ... } }
 }
 ]
 }
 ]
}

```

## Sample `curl` requests

You can use these `curl` requests directly, rather than going through the SDK.

### Multimodal requests

The Chat Completions API supports a variety of multimodal input, including both
audio and video.

#### Use `image_url` to pass in image data

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/endpoints/openapi/chat/completions \
 -d '{ \
 "model": "google/gemini-2.0-flash-001", \
 "messages": [{ "role": "user", "content": [ \
 { "type": "text", "text": "Describe this image" }, \
 { "type": "image_url", "image_url": "gs://cloud-samples-data/generative-ai/image/scones.jpg" }] }] }'

```

#### Use `input_audio` to pass in audio data

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/endpoints/openapi/chat/completions \
 -d '{ \
 "model": "google/gemini-2.0-flash-001", \
 "messages": [ \
 { "role": "user", \
 "content": [ \
 { "type": "text", "text": "Describe this: " }, \
 { "type": "input_audio", "input_audio": { \
 "format": "audio/mp3", \
 "data": "gs://cloud-samples-data/generative-ai/audio/pixel.mp3" } }] }] }'

```

## Structured output

You can use the `response_format` parameter to get structured output.

### Example using SDK

```python
from pydantic import BaseModel
from openai import OpenAI

client = OpenAI()

class CalendarEvent(BaseModel):
 name: str
 date: str
 participants: list[str]

completion = client.beta.chat.completions.parse(
 model="google/gemini-2.5-flash-preview-04-17",
 messages=[
 {"role": "system", "content": "Extract the event information."},
 {"role": "user", "content": "Alice and Bob are going to a science fair on Friday."},
 ],
 response_format=CalendarEvent,
)

print(completion.choices[0].message.parsed)

```

## What's next

- See examples of calling the
 [Inference API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#examples)
 with the OpenAI-compatible syntax.
- See examples of calling the
 [Function Calling API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/function-calling#examples)
 with OpenAI-compatible syntax.
- Learn more about the [Gemini API](../../code/code-models-overview.md).
- Learn more about [migrating from Azure OpenAI to the Gemini API](https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-from-azure-to-gemini).