---
date_scraped: 2025-05-12
title: Delete A Context Cache
---

# Delete a context cache 

To delete a context cache, you need its cache ID, the Google Cloud project ID with
which the context cache is associated, and the region where the request to
[create the context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create)
was processed. The cache ID of a context cache is returned when you create the
context cache. You can also get the cache ID of each context cache associated
with a project using the
[context cache list command](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-getinfo#get-context-cache-list).

## Delete context cache example

The following example shows you how to delete a context cache.

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

# Delete content cache using name
# E.g cache_name = 'projects/111111111111/locations/us-central1/cachedContents/1111111111111111111'
client.caches.delete(name=cache_name)
print("Deleted Cache", cache_name)
# Example response
# Deleted Cache projects/111111111111/locations/us-central1/cachedContents/1111111111111111111
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
 "fmt"
 "io"

 genai "google.golang.org/genai"
)

// deleteContentCache shows how to delete content cache.
func deleteContentCache(w io.Writer, cacheName string) error {
 ctx := context.Background()

 client, err := genai.NewClient(ctx, &genai.ClientConfig{
 HTTPOptions: genai.HTTPOptions{APIVersion: "v1beta1"},
 })
 if err != nil {
 return fmt.Errorf("failed to create genai client: %w", err)
 }

 _, err = client.Caches.Delete(ctx, cacheName, &genai.DeleteCachedContentConfig{})
 if err != nil {
 return fmt.Errorf("failed to delete content cache: %w", err)
 }

 fmt.Fprintf(w, "Deleted cache %q\n", cacheName)

 // Example response:
 // Deleted cache "projects/111111111111/locations/us-central1/cachedContents/1111111111111111111"

 return nil
}

```

### REST

The following shows how to use REST to delete a context cache associated with
a Google Cloud project by sending a DELETE request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region where the request to
 [create the context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create)
 was processed and where the cached content is stored.
- CACHE\_ID: The ID of the context cache to delete. The context cache ID is returned when you
 create the context cache. You can also find context cache IDs by listing the context caches for a Google Cloud project using. For more information, see
 [create a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create) and
 [list context caches](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-getinfo#get-context-cache-list).

HTTP method and URL:

```python
DELETE https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID
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
curl -X DELETE \ 
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
 -Method DELETE ` 
 -Headers $headers ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID" | Select-Object -Expand Content
```

If the delete operation succeeds, the response is empty:

#### Response

```python
{ }

```

### Example curl command

```python
LOCATION="us-central1"
PROJECT_ID="PROJECT_ID"
CACHE_ID="CACHE_ID"

curl \
-X DELETE \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${CACHE_ID}

```

## What's next

- Learn how to [create a new context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create).
- Learn how to [get information about all context caches associated with a Google Cloud project](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-getinfo).