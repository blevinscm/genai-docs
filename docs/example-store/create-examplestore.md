---
title: Create or reuse an Example Store instance bookmark borderbookmark
source: https://cloud.google.com/vertex-ai/generative-ai/docs/example-store/create-examplestore
date_scraped: 2025-05-12
---

# Create or reuse an Example Store instance bookmark\_borderbookmark 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This page shows you how to create a new Example Store instance or reuse an
existing Example Store instance. You can store your examples in an Example Store
when developing your LLM application and dynamically retrieve them to use in
your LLM prompts.

To teach an LLM or an agent using few-shot examples, you must
first create or reuse an Example Store instance for your project and location,
and then upload examples to it.

For each project and location, you can have a
maximum of 50 Example Store instances. After you create an Example Store instance, you
can share it across multiple LLM applications and agents.

There are two ways to provision an Example Store instance:

- **Create a new Example Store instance**: When you create a new Example Store
 instance, you need to specify the embedding model, which Example Store uses to
 determine which examples are relevant to users' queries. Example Store
 supports the following embedding models:

 - `text-embedding-005`
 - `text-multilingual-embedding-002`

 You can't change an embedding model after you create the Example Store
 instance. If you want to use a different embedding model, you must create
 another example store. For more information about text embeddings, see
 [Get text embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings).
- **Reuse an existing Example Store instance**: Example Store instances are designed to be used by
 multiple agents, so you can access the stored examples across LLM applications.
 You can't change the embedding model when you reuse an existing Example Store
 instance.

## Prerequisites

Before you use the Python samples on this page, install and initialize the
Vertex AI SDK for Python in your local Python environment.

1. Run the following command to install the Vertex AI SDK for Python for Example Store.

 ```python
 pip install --upgrade google-cloud-aiplatform>=1.87.0
 ```
2. Use the following code sample to import and initialize the SDK for Example Store.

 ```python
 import vertexai
 from vertexai.preview import example_stores

 vertexai.init(
 project="PROJECT_ID",
 location="LOCATION"
 )

 ```

 Replace the following:

 - PROJECT\_ID: Your project ID.
 - LOCATION: Your region. Only `us-central1` is supported.

## Create an Example Store instance

Use the following samples to create an Example Store instance for a specified project
and location. Note that creating an Example Store instance takes a few minutes.

[Python](#python)[REST](#rest)
More

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
from vertexai.preview import example_stores

vertexai.init(
 project="PROJECT_ID",
 location="LOCATION"
)

my_example_store = example_stores.ExampleStore.create(
 example_store_config=example_stores.ExampleStoreConfig(
 vertex_embedding_model="EMBEDDING_MODEL"
 )
)

```

Replace the following:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you want to create the example
 store. The only region supported is `us-central1`.
- EMBEDDING\_MODEL: Embedding model that the
 Example Store instance uses to determine which examples are relevant to users' queries. Example Store
 supports the following embedding models:
 - `textembedding-gecko@003`
 - `text-embedding-004`
 - `text-multilingual-embedding-002`

To create an [`ExampleStore`](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-api/reference/rest/v1beta1/projects.locations.exampleStores#ExampleStore)
resource, send a `POST` request by using the
[`exampleStores.create`](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-api/reference/rest/v1beta1/projects.locations.exampleStores/create)
method.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you want to create the Example
 Store instance. The only region supported is `us-central1`.
- DISPLAY\_NAME: The name of the Example Store instance.
- EMBEDDING\_MODEL: Embedding model that the
 Example Store instance uses to determine which examples are relevant to users' queries. Example Store
 supports the following embedding models:
 - `textembedding-gecko@003`
 - `text-embedding-004`
 - `text-multilingual-embedding-002`

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores
```

Request JSON body:

```python
{
 "display_name": "DISPLAY_NAME",
 "example_store_config": {"vertex_embedding_model": EMBEDDING_MODEL}
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following, where EXAMPLE\_STORE\_ID
represents the ID of the Example Store instance.

#### Response

```python
{
 "name": "projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID/operations/",
 "metadata": {
 "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.CreateExampleStoreOperationMetadata",
 "genericMetadata": {
 "createTime": "2024-10-10T02:06:10.417111Z",
 "updateTime": "2024-10-10T02:06:10.417111Z"
 }
 }
}

```

## Reuse an existing Example Store instance

Use the following sample to reuse an existing Example Store instance for a specified
project and location.

[Python](#python)
More

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
from vertexai.preview import example_stores

vertexai.init(
 project="PROJECT_ID",
 location="LOCATION"
)

example_store = example_stores.ExampleStore(
 "EXAMPLE_STORE_NAME")

```

Replace the following:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you want to create the example
 store. The only region supported is `us-central1`.
- EXAMPLE\_STORE\_NAME:
 Name of the Example Store instance you want to reuse.

## What's next

- [Upload examples to the Example Store instance.](upload-examples_1.md)

Was this helpful?