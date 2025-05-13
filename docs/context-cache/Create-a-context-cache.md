---
title: Create-a-context-cachegoogle.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create
date_scraped: 2025-05-12
---

# Create a context cache 

You must create a context cache before you can use it. The context cache you
create contains a large amount of data that you can use in multiple requests to
a Gemini model. The cached content is stored in the region where you make the
request to create the cache.

Cached content can be any of the MIME types supported by Gemini multimodal
models. For example, you can cache a large amount of text, audio, or video. You
can specify more than one file to cache. For more information, see the following
media requirements:

- [Image requirements](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#image-requirements)
- [Video requirements](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/video-understanding#video_requirements)
- [Audio requirements](../multimodal/audio-understanding.md)

You specify the content to cache using a blob, text, or a path to a file that's
stored in a Cloud Storage bucket. If the size of the content you're caching
is greater than 10 MB, then you must specify it using the URI of a file that's
stored in a Cloud Storage bucket.

Cached content has a finite lifespan. The default expiration time of a context
cache is 60 minutes after it's created. If you want a different expiration time,
you can specify a different expiration time using the `ttl` or the `expire_time`
property when you create a context cache. You can also update the expiration
time for an unexpired context cache. For information about how to specify
`ttl` and `expire_time`, see
[Update the expiration time](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-update).

After a context cache expires, it's no longer available. If you want to
reference the content in an expired context cache in future prompt requests,
then you need to recreate the context cache.

## Limits

The content that you cache must adhere to the limits shown in the following
table:

| Context caching limits | |
| --- | --- |
| Minimum size of a cache | 4,096 tokens |
| Maximum size of content you can cache using a blob or text | 10 MB |
| Minimum time before a cache expires after it's created | 1 minute |
| Maximum time before a cache expires after it's created | There isn't a maximum cache duration |

**Important:** When caching objects that are stored in a Cloud Storage bucket,
don't make changes to objects until the cached contents are expired or deleted.
Updates to Cloud Storage objects can cause the associated cached contents to
be unusable.

### Location support

Context caching isn't supported in the Sydney, Australia
(`australia-southeast1`) region.

### Encryption key support

Context caching doesn't support customer-managed encryption keys (CMEK).

### Access Transparency support

Context caching supports Access Transparency.

## Create context cache example

The following examples show how to create a context cache.

### Gen AI SDK for Python

#### Install

```python
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
from google import genai
from google.genai.types import Content, CreateCachedContentConfig, HttpOptions, Part

client = genai.Client(http_options=HttpOptions(api_version="v1beta1"))

system_instruction = """
You are an expert researcher. You always stick to the facts in the sources provided, and never make up new facts.
Now look at these research papers, and answer the following questions.
"""

contents = [
 Content(
 role="user",
 parts=[
 Part.from_uri(
 file_uri="gs://cloud-samples-data/generative-ai/pdf/2312.11805v3.pdf",
 mime_type="application/pdf",
 ),
 Part.from_uri(
 file_uri="gs://cloud-samples-data/generative-ai/pdf/2403.05530.pdf",
 mime_type="application/pdf",
 ),
 ],
 )
]

content_cache = client.caches.create(
 model="gemini-2.0-flash-001",
 config=CreateCachedContentConfig(
 contents=contents,
 system_instruction=system_instruction,
 display_name="example-cache",
 ttl="86400s",
 ),
)

print(content_cache.name)
print(content_cache.usage_metadata)
# Example response:
# projects/111111111111/locations/us-central1/cachedContents/1111111111111111111
# CachedContentUsageMetadata(audio_duration_seconds=None, image_count=167,
# text_count=153, total_token_count=43130, video_duration_seconds=None)
```

### Gen AI SDK for Go

Learn how to install or update the [Gen AI SDK for Go](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
import (
 "context"
 "encoding/json"
 "fmt"
 "io"

 genai "google.golang.org/genai"
)

// createContentCache shows how to create a content cache with an expiration parameter.
func createContentCache(w io.Writer) (string, error) {
 ctx := context.Background()

 client, err := genai.NewClient(ctx, &genai.ClientConfig{
 HTTPOptions: genai.HTTPOptions{APIVersion: "v1beta1"},
 })
 if err != nil {
 return "", fmt.Errorf("failed to create genai client: %w", err)
 }

 modelName := "gemini-2.0-flash-001"

 systemInstruction := "You are an expert researcher. You always stick to the facts " +
 "in the sources provided, and never make up new facts. " +
 "Now look at these research papers, and answer the following questions."

 cacheContents := []*genai.Content{
 {
 Parts: []*genai.Part{
 {FileData: &genai.FileData{
 FileURI: "gs://cloud-samples-data/generative-ai/pdf/2312.11805v3.pdf",
 MIMEType: "application/pdf",
 }},
 {FileData: &genai.FileData{
 FileURI: "gs://cloud-samples-data/generative-ai/pdf/2403.05530.pdf",
 MIMEType: "application/pdf",
 }},
 },
 Role: "user",
 },
 }
 config := &genai.CreateCachedContentConfig{
 Contents: cacheContents,
 SystemInstruction: &genai.Content{
 Parts: []*genai.Part{
 {Text: systemInstruction},
 },
 },
 DisplayName: "example-cache",
 TTL: "86400s",
 }

 res, err := client.Caches.Create(ctx, modelName, config)
 if err != nil {
 return "", fmt.Errorf("failed to create content cache: %w", err)
 }

 cachedContent, err := json.MarshalIndent(res, "", " ")
 if err != nil {
 return "", fmt.Errorf("failed to marshal cache info: %w", err)
 }

 // See the documentation: https://pkg.go.dev/google.golang.org/genai#CachedContent
 fmt.Fprintln(w, string(cachedContent))

 // Example response:
 // {
 // "name": "projects/111111111111/locations/us-central1/cachedContents/1111111111111111111",
 // "displayName": "example-cache",
 // "model": "projects/111111111111/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
 // "createTime": "2025-02-18T15:05:08.29468Z",
 // "updateTime": "2025-02-18T15:05:08.29468Z",
 // "expireTime": "2025-02-19T15:05:08.280828Z",
 // "usageMetadata": {
 // "imageCount": 167,
 // "textCount": 153,
 // "totalTokenCount": 43125
 // }
 // }

 return res.Name, nil
}

```

### REST

You can use REST to create a context cache by using the Vertex AI API to send a
POST request to the publisher model endpoint. The following example shows
how to create a context cache using a file stored in a Cloud Storage
bucket.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request and where the cached content is stored.
 For a list of supported regions, see [Available regions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations).
- CACHE\_DISPLAY\_NAME: A
 meaningful display name to describe and to help you identify each context
 cache.
- MIME\_TYPE: The MIME type of the content to cache.
- CONTENT\_TO\_CACHE\_URI: The Cloud Storage URI of the content to cache.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents
```

Request JSON body:

```python
{
 "model": "projects/PROJECT_ID/locations/LOCATION/publishers/google/models/gemini-2.0-flash-001",
 "displayName": "CACHE_DISPLAY_NAME",
 "contents": [{
 "role": "user",
 "parts": [{
 "fileData": {
 "mimeType": "MIME_TYPE",
 "fileUri": "CONTENT_TO_CACHE_URI"
 }
 }]
 },
 {
 "role": "model",
 "parts": [{
 "text": "This is sample text to demonstrate explicit caching."
 }]
 }]
}

```

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

Save the request body in a file named `request.json`,
and execute the following command:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```python
{
 "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID",
 "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
 "createTime": "2024-06-04T01:11:50.808236Z",
 "updateTime": "2024-06-04T01:11:50.808236Z",
 "expireTime": "2024-06-04T02:11:50.794542Z"
}

```

### Example curl command

```python
LOCATION="us-central1"
MODEL_ID="gemini-2.0-flash-001"
PROJECT_ID="test-project"
MIME_TYPE="video/mp4"
CACHED_CONTENT_URI="gs://path-to-bucket/video-file-name.mp4"

curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/cachedContents -d \
'{
 "model":"projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}",
 "contents": [
 {
 "role": "user",
 "parts": [
 {
 "fileData": {
 "mimeType": "${MIME_TYPE}",
 "fileUri": "${CACHED_CONTENT_URI}"
 }
 }
 ]
 }
 ]
}'

```

## What's next

- Learn how to [use a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-use).
- Learn how to [update the expiration time of a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-update).