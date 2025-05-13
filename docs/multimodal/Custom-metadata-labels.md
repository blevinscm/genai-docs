---
title: Custom-metadata-labelsgoogle.com/vertex-ai/generative-ai/docs/multimodal/add-labels-to-api-calls
date_scraped: 2025-05-12
---

# Custom metadata labels 

You can add custom metadata to `generateContent` and `streamGenerateContent` API
calls by using labels. This page explains what labels are, and shows you how to
use them to break down your billed charges.

## What are labels?

A label is a key-value pair that you can assign to `generateContent` and
`streamGenerateContent` API calls. They help you organize these calls and manage
your costs at scale, with the granularity you need. You can attach a label to
each call, then filter the calls based on their labels. Information about labels
is forwarded to the billing system that lets you break down your billed charges
by label. With built-in
[billing reports](https://cloud.google.com/billing/docs/how-to/reports),
you can filter and group costs by labels. You can also use labels to
query
[billing data exports](https://cloud.google.com/billing/docs/how-to/bq-examples).
For information on how to use labels after creation, see [an example from the
labels overview](https://cloud.google.com/resource-manager/docs/labels-overview#example).

## Requirements for labels

The labels applied to an API call must meet the following
requirements:

- Each API call can have up to 64 labels.
- Each label must be a key-value pair.
- Keys have a minimum length of 1 character and a maximum length of 63
 characters, and cannot be empty. Values can be empty, and have a maximum length
 of 63 characters.
- Keys and values can contain only lowercase letters, numeric characters,
 underscores, and dashes. All characters must use UTF-8 encoding, and
 international characters are allowed. Keys must start with a lowercase letter or
 international character.
- The key portion of a label must be unique within a single API call.
 However, you can use the same key with multiple calls.

These limits apply to the key and value for each label, and to the
individual API call that have labels. There
is no limit on how many labels you can apply across all API calls
within a project.

## Common uses of labels

Here are some common use cases for labels:

- **Team or cost center labels**: Add labels based on team or
 cost center to distinguish API calls owned by different
 teams (for example, `team:research` and `team:analytics`). You can use this
 type of label for cost accounting or budgeting.
- **Component labels**: For example, `component:redis`,
 `component:frontend`, `component:ingest`, and `component:dashboard`.
- **Environment or stage labels**: For example,
 `environment:production` and `environment:test`.
- **Ownership labels**: Used to identify the teams that are
 responsible for operations, for example: `team:shopping-cart`.

**Note:** Don't include sensitive information in labels, including personally
identifiable information, such as an individual's name or title. Labels are
not designed to handle sensitive information.

We don't recommend creating large numbers of unique labels, such as for
timestamps or individual values for every API call. The problem with this
approach is that when the values change frequently or with keys that clutter the
catalog, this makes it difficult to effectively filter and report on API calls.

## Add a label to an API call

To add a label to a `generateContent` or `streamGenerateContent` API call, do
the following:

### REST

Before using any of the request data,
make the following replacements:

- `GENERATE_RESPONSE_METHOD`: The type of response that you want the model to generate.
 Choose a method that generates how you want the model's response to be returned:
 - `streamGenerateContent`: The response is streamed as it's being generated to reduce the perception of latency to a human audience.
 - `generateContent`: The response is returned after it's fully generated.
- `LOCATION`: The region to process the request. Available
 options include the following:

 **Click to expand a partial list of available regions**

 - `us-central1`
 - `us-west4`
 - `northamerica-northeast1`
 - `us-east4`
 - `us-west1`
 - `asia-northeast3`
 - `asia-southeast1`
 - `asia-northeast1`
- `PROJECT_ID`: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- `MODEL_ID`: The model ID of the model
 that you want to use.
- `ROLE`:
 The role in a conversation associated with the content. Specifying a role is required even in
 singleturn use cases.
 Acceptable values include the following:
 - `USER`: Specifies content that's sent by you.
 - `MODEL`: Specifies the model's response.
- ```python
 PROMPT_TEXT
 ```

 The text instructions to include in the prompt.
 JSON
- `LABEL_KEY`: The label metadata that you want to
 associate with this API call.
- `LABEL_VALUE`: The value of the label.

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
cat > request.json << 'EOF'
{
 "contents": {
 "role": "ROLE",
 "parts": { "text": "PROMPT_TEXT" }
 },
 "labels": {
 "LABEL_KEY": "LABEL_VALUE"
 },
}
EOF
```

Then execute the following command to send your REST request:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
@'
{
 "contents": {
 "role": "ROLE",
 "parts": { "text": "PROMPT_TEXT" }
 },
 "labels": {
 "LABEL_KEY": "LABEL_VALUE"
 },
}
'@ | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": Generative AI is a type of artificial intelligence (AI) that can **create new
 content**, like text, images, audio, video, and even code.
 }
 ]
 },
 "finishReason": "STOP",
 "safetyRatings": [
 {
 "category": "HARM_CATEGORY_HATE_SPEECH",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.037841797,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.06347656
 },
 {
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.053466797,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.08496094
 },
 {
 "category": "HARM_CATEGORY_HARASSMENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.08154297,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.033203125
 },
 {
 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.071777344,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.083984375
 }
 ],
 "avgLogprobs": -0.40486351219383448
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 5,
 "candidatesTokenCount": 555,
 "totalTokenCount": 560
 }
}

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
import vertexai

from vertexai.generative_models import GenerativeModel

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

model = GenerativeModel("gemini-2.0-flash-001")

prompt = "What is Generative AI?"
response = model.generate_content(
 prompt,
 # Example Labels
 labels={
 "team": "research",
 "component": "frontend",
 "environment": "production",
 },
)

print(response.text)
# Example response:
# Generative AI is a type of Artificial Intelligence focused on **creating new content** based on existing data.

```

Google Cloud products report usage and cost data to Cloud Billing processes
at varying intervals. As a result, you might see a delay between your use of
Google Cloud services, and the usage and costs being available to view in
Cloud Billing. Typically, your costs are available within a day, but can
sometimes take more than 24 hours.