---
date_scraped: 2025-05-12
title: Get Information About A Context Cache
---

# Get information about a context cache 

You can learn about the time a context cache was created, the time it was most
recently updated, and the time it expires. To get information about every
context cache associated with a Google Cloud project, including their cache IDs,
use the command to list context caches. If you know the cache ID of a context
cache, you can get information about just that context cache.

## Get a list of context caches

To get a list of the context caches associated with a Google Cloud project, you need
the region where you created and the ID of your Google Cloud project. The following
shows you how to get a list of context caches for a Google Cloud project.

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
from google.genai.types import HttpOptions

client = genai.Client(http_options=HttpOptions(api_version="v1beta1"))

content_cache_list = client.caches.list()

# Access individual properties of a ContentCache object(s)
for content_cache in content_cache_list:
 print(f"Cache `{content_cache.name}` for model `{content_cache.model}`")
 print(f"Last updated at: {content_cache.update_time}")
 print(f"Expires at: {content_cache.expire_time}")

# Example response:
# * Cache `projects/111111111111/locations/us-central1/cachedContents/1111111111111111111` for
# model `projects/111111111111/locations/us-central1/publishers/google/models/gemini-XXX-pro-XXX`
# * Last updated at: 2025-02-13 14:46:42.620490+00:00
# * CachedContentUsageMetadata(audio_duration_seconds=None, image_count=167, text_count=153, total_token_count=43130, video_duration_seconds=None)
# ...
```

### REST

The following shows how to use REST to list the context caches associated with
a Google Cloud project by sending a GET request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region where the requests to
 [create the context caches](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create)
 were processed.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents
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

Execute the following command:

```python
curl -X GET \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
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

Execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method GET ` 
 -Headers $headers ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```python
{
 "cachedContents": [
 {
 "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID_1",
 "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
 "createTime": "2024-05-31T19:04:35.380412Z",
 "updateTime": "2024-05-31T19:04:35.380412Z",
 "expireTime": "2024-05-31T20:04:35.349680Z"
 },
 {
 "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID_2",
 "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
 "createTime": "2024-05-30T21:14:39.880235Z",
 "updateTime": "2024-05-31T00:21:15.350969Z",
 "expireTime": "2024-05-31T01:21:15.348014Z"
 },
 {
 "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID_N",
 "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
 "createTime": "2024-05-30T21:14:39.880235Z",
 "updateTime": "2024-05-31T00:21:15.350969Z",
 "expireTime": "2024-05-31T01:21:15.348014Z"
 }
 ]
}

```

### Example curl command

```python
LOCATION="us-central1"
PROJECT_ID="PROJECT_ID"

curl \
-X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/cachedContents

```

## Get information about a context cache

To get information about one context cache, you need its cache ID, the
Google Cloud project ID with which the context cache is associated, and the region
where the request to
[create the context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create)
was processed. The cache ID of a context cache is returned when you create the
context cache. You can also get the cache ID of each context cache associated
with a project using the [context cache list command](#get-context-cache-list).

The following shows you how to get information about one context cache.

### Go

Before trying this sample, follow the Go setup instructions in the [Vertex AI
quickstart.](https://cloud.google.com/vertex-ai/docs/start/client-libraries) For more information, see the [Vertex AI
Go SDK for Gemini reference documentation](/go/docs/reference/cloud.google.com/go/vertexai/latest).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see [Set up ADC for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

### Streaming and non-streaming responses

You can choose whether the model generates *streaming* responses or
*non-streaming* responses. For streaming responses, you receive each response
as soon as its output token is generated. For non-streaming responses, you receive
all responses after all of the output tokens are generated.

For a streaming response, use the [`GenerateContentStream`](https://pkg.go.dev/cloud.google.com/go/vertexai/genai#GenerativeModel.GenerateContentStream) method.

```python
 iter := model.GenerateContentStream(ctx, genai.Text("Tell me a story about a lumberjack and his giant ox. Keep it very short."))
 
```

For a non-streaming response, use the [`GenerateContent`](https://pkg.go.dev/cloud.google.com/go/vertexai/genai#GenerativeModel.GenerateContent) method.

```python
 resp, err := model.GenerateContent(ctx, genai.Text("What is the average size of a swallow?"))
 
```

### Sample code

```python
import (
 "context"
 "fmt"
 "io"

 "cloud.google.com/go/vertexai/genai"
)

// getContextCache shows how to retrieve the metadata of a cached content
// contentName is the ID of the cached content to retrieve
func getContextCache(w io.Writer, contentName string, projectID, location string) error {
 // location := "us-central1"
 ctx := context.Background()

 client, err := genai.NewClient(ctx, projectID, location)
 if err != nil {
 return fmt.Errorf("unable to create client: %w", err)
 }
 defer client.Close()

 cachedContent, err := client.GetCachedContent(ctx, contentName)
 if err != nil {
 return fmt.Errorf("GetCachedContent: %w", err)
 }
 fmt.Fprintf(w, "Retrieved cached content %q", cachedContent.Name)
 return nil
}

```

### REST

The following shows how to use REST to list the context caches associated with
a Google Cloud project by sending a GET request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region where the request to
 [create the context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create)
 was processed.
- CACHE\_ID: The ID of the context cache. The context cache ID is returned when you create the context cache. You
 can also find context cache IDs by listing the context caches for a Google Cloud project using. For more information, see
 [create a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create) and
 [list context caches](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-getinfo#get-context-cache-list).

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID
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

Execute the following command:

```python
curl -X GET \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID"
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

Execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method GET ` 
 -Headers $headers ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```python
{
 "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID",
 "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
 "createTime": "2024-05-31T19:04:35.380412Z",
 "updateTime": "2024-05-31T19:04:35.380412Z",
 "expireTime": "2024-05-31T20:04:35.349680Z"
}

```

### Example curl command

```python
LOCATION="us-central1"
PROJECT_ID="PROJECT_ID"
CACHE_ID="CACHE_ID"

curl \
-X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${CACHE_ID}

```

- Learn how to [use a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-use).
- Learn how to [update the expiration time of a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-update).
- Learn how to [delete a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-delete).