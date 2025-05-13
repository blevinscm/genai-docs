---
title: Count-tokens-for-Claude-modelsbookmark_borderbookmarkStay-organized-with-collectionsSave-and-categor
source: https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude-count-tokens
date_scraped: 2025-05-12
---

# Count tokens for Claude models bookmark\_borderbookmark 

The `count-tokens` endpoint lets you determine the number of tokens in a
message before sending it to Claude, helping you make informed decisions about
your prompts and usage.

There is no cost for using the `count-tokens` endpoint.

## Supported Claude models

The following models support count tokens:

- Claude 3.7 Sonnet: `claude-3-7-sonnet@20250219`.
- Claude 3.5 Sonnet v2: `claude-3-5-sonnet-v2@20241022`.
- Claude 3.5 Haiku: `claude-3-5-haiku@20241022`.
- Claude 3 Opus: `claude-3-opus@20240229`.
- Claude 3.5 Sonnet: `claude-3-5-sonnet@20240620`.
- Claude 3 Haiku: `claude-3-haiku@20240307`.

## Supported regions

The following regions support count tokens:

- `us-east5`
- `europe-west1`
- `asia-southeast1`
- `us-central1`
- `europe-west4`

## Count tokens in basic messages

To count tokens, send a `rawPredict` request to the `count-tokens` endpoint. The
body of the request must contain the model ID of the model you want to count
tokens against.

[REST](#rest)
More

Before using any of the request data,
make the following replacements:

- LOCATION: A supported [region](#regions).
- MODEL: The [model](#model-list) to count tokens against.
- ROLE: The role associated with a
 message. You can specify a `user` or an `assistant`.
 The first message must use the `user` role. Claude models
 operate with alternating `user` and `assistant` turns.
 If the final message uses the `assistant` role, then the response
 content continues immediately from the content in that message. You can use
 this to constrain part of the model's response.
- CONTENT: The content, such as text, of the `user` or
 `assistant` message.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/count-tokens:rawPredict
```

Request JSON body:

```python
{
 "model": "claude-3-haiku@20240307",
 "messages": [
 {
 "role": "user",
 "content":"how many tokens are in this request?"
 }
 ],
}

```

To send your request, choose one of these options:

[curl](#curl)[PowerShell](#powershell)
More

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

Save the request body in a file named `request.json`,
and execute the following command:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/count-tokens:rawPredict"
```

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/count-tokens:rawPredict" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{ "input_tokens": 14 }

```

For information on how to count tokens in messages with tools, images, and PDFs,
see [Anthropic's documentation](https://docs.anthropic.com/en/docs/build-with-claude/token-counting).

## Quotas

By default, the quota for the `count-tokens` endpoint is 2000 requests per
minute.

Was this helpful?