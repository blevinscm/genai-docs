---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/use-vertexai-search
title: Use Vertex Ai Search As A Retrieval Backend Using Vertex Ai Rag Enginestay
  Organized With Collection
---

# Use Vertex AI Search as a retrieval backend using Vertex AI RAG Engine 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

To see an example of using RAG Engine with Vertex AI Search,
run the "RAG Engine with Vertex AI Search" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/rag-engine/rag_engine_vertex_ai_search.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Frag-engine%2Frag_engine_vertex_ai_search.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Frag-engine%2Frag_engine_vertex_ai_search.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/rag-engine/rag_engine_vertex_ai_search.ipynb)

This page introduces Vertex AI Search integration with the
Vertex AI RAG Engine.

Vertex AI Search provides a solution for retrieving and managing
data within your Vertex AI RAG applications. By using
Vertex AI Search as your retrieval backend, you can improve
performance, scalability, and ease of integration.

- **Enhanced performance and scalability**: Vertex AI Search is
 designed to handle large volumes of data with exceptionally low latency. This
 translates to faster response times and improved performance for your RAG
 applications, especially when dealing with complex or extensive knowledge
 bases.
- **Simplified data management**: Import your data from various sources, such as
 websites, BigQuery datasets, and Cloud Storage buckets, that
 can streamline your [data ingestion process](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview).
- **Seamless integration**: Vertex AI provides built-in
 integration with Vertex AI Search, which lets you select
 Vertex AI Search as the corpus backend for your RAG
 application. This simplifies the integration process and helps to ensure
 optimal compatibility between components.
- **Improved LLM output quality**: By using the retrieval capabilities of
 Vertex AI Search, you can help to ensure that your RAG
 application retrieves the most relevant information from your corpus, which
 leads to more accurate and informative LLM-generated outputs.

## Vertex AI Search

[Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction)
brings together deep information retrieval, natural-language processing, and the
latest features in large language model (LLM) processing, which helps to
understand user intent and to return the most relevant results for the user.

With Vertex AI Search, you can build a Google-quality search
application using data that you control.

### Configure Vertex AI Search

To set up a Vertex AI Search, do the following:

1. [Create a search data store](https://cloud.google.com/generative-ai-app-builder/docs/create-data-store-es).
2. [Create a search application](https://cloud.google.com/generative-ai-app-builder/docs/create-engine-es).

## Use the Vertex AI Search as a retrieval backend for Vertex AI RAG Engine

Once the Vertex AI Search is set up, follow these steps to set it
as the retrieval backend for the RAG application.

### Set the Vertex AI Search as the retrieval backend to create a RAG corpus

These code samples show you how to configure Vertex AI Search as
the retrieval backend for a RAG corpus.

### REST

To use the command line to create a RAG corpus, do the following:

1. Create a RAG corpus

 Replace the following variables used in the code sample:

 - **PROJECT\_ID**: The ID of your Google Cloud project.
 - **LOCATION**: The region to process the request.
 - **DISPLAY\_NAME**: The display name of the RAG corpus
 that you want to create.
 - **ENGINE\_NAME**: The full resource name of the
 Vertex AI Search engine or
 Vertex AI Search Datastore.

 ```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/ragCorpora" \
 -d '{
 "display_name" : "DISPLAY_NAME",
 "vertex_ai_search_config" : {
 "serving_config": "ENGINE_NAME/servingConfigs/default_search"
 }
 }'

 ```
2. Monitor progress

 Replace the following variables used in the code sample:

 - **PROJECT\_ID**: The ID of your Google Cloud project.
 - **LOCATION**: The region to process the request.
 - **OPERATION\_ID**: The ID of the RAG corpus create
 operation.

 ```python
 curl -X GET \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID"

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

from vertexai import rag
import vertexai

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# vertex_ai_search_engine_name = "projects/{PROJECT_ID}/locations/{LOCATION}/collections/default_collection/engines/{ENGINE_ID}"
# display_name = "test_corpus"
# description = "Corpus Description"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

# Configure Search
vertex_ai_search_config = rag.VertexAiSearchConfig(
 serving_config=f"{vertex_ai_search_engine_name}/servingConfigs/default_search",
)

corpus = rag.create_corpus(
 display_name=display_name,
 description=description,
 vertex_ai_search_config=vertex_ai_search_config,
)
print(corpus)
# Example response:
# RagCorpus(name='projects/1234567890/locations/us-central1/ragCorpora/1234567890',
# display_name='test_corpus', description='Corpus Description'.
# ...

```

### Retrieve contexts using the RAG API

After the RAG corpus creation, relevant contexts can be retrieved from
Vertex AI Search through the `RetrieveContexts` API.

### REST

This code sample demonstrates how to retrieve contexts using REST.

Replace the following variables used in the code sample:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process the request.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource.

 Format:
 `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}.`
- **TEXT**: The query text to get relevant contexts.

```python
curl -X POST \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts" \
 -d '{
 "vertex_rag_store": {
 "rag_resources": {
 "rag_corpus": "RAG_CORPUS_RESOURCE"
 }
 },
 "query": {
 "text": "TEXT"
 }
 }'

```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python

from vertexai import rag
import vertexai

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/[PROJECT_ID]/locations/us-central1/ragCorpora/[rag_corpus_id]"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

response = rag.retrieval_query(
 rag_resources=[
 rag.RagResource(
 rag_corpus=corpus_name,
 # Optional: supply IDs from `rag.list_files()`.
 # rag_file_ids=["rag-file-1", "rag-file-2", ...],
 )
 ],
 text="Hello World!",
 rag_retrieval_config=rag.RagRetrievalConfig(
 top_k=10,
 filter=rag.utils.resources.Filter(vector_distance_threshold=0.5),
 ),
)
print(response)
# Example response:
# contexts {
# contexts {
# source_uri: "gs://your-bucket-name/file.txt"
# text: "....
# ....

```

### Generate content using Vertex AI Gemini API

### REST

To generate content using Gemini models, make a call to the
Vertex AI `GenerateContent` API. By specifying the
`RAG_CORPUS_RESOURCE` in the request, it automatically retrieves data from
Vertex AI Search.

Replace the following variables used in the sample code:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process the request.
- **MODEL\_ID**: LLM model for content generation. For
 example, `gemini-2.0-flash`.
- **GENERATION\_METHOD**: LLM method for content generation.
 For example, `generateContent`, `streamGenerateContent`.
- **INPUT\_PROMPT**: The text that is sent to the LLM for
 content generation. Try to use a prompt relevant to the documents in Vertex AI Search.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource. Format:
 `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **SIMILARITY\_TOP\_K**: Optional: The number of top contexts
 to retrieve.

 ```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATION_METHOD" \
 -d '{
 "contents": {
 "role": "user",
 "parts": {
 "text": "INPUT_PROMPT"
 }
 },
 "tools": {
 "retrieval": {
 "disable_attribution": false,
 "vertex_rag_store": {
 "rag_resources": {
 "rag_corpus": "RAG_CORPUS_RESOURCE"
 },
 "similarity_top_k": SIMILARITY_TOP_K
 }
 }
 }
 }'

 ```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python

from vertexai import rag
from vertexai.generative_models import GenerativeModel, Tool
import vertexai

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

rag_retrieval_tool = Tool.from_retrieval(
 retrieval=rag.Retrieval(
 source=rag.VertexRagStore(
 rag_resources=[
 rag.RagResource(
 rag_corpus=corpus_name,
 # Optional: supply IDs from `rag.list_files()`.
 # rag_file_ids=["rag-file-1", "rag-file-2", ...],
 )
 ],
 rag_retrieval_config=rag.RagRetrievalConfig(
 top_k=10,
 filter=rag.utils.resources.Filter(vector_distance_threshold=0.5),
 ),
 ),
 )
)

rag_model = GenerativeModel(
 model_name="gemini-2.0-flash-001", tools=[rag_retrieval_tool]
)
response = rag_model.generate_content("Why is the sky blue?")
print(response.text)
# Example response:
# The sky appears blue due to a phenomenon called Rayleigh scattering.
# Sunlight, which contains all colors of the rainbow, is scattered
# by the tiny particles in the Earth's atmosphere....
# ...

```

## What's next

- [Retrieval and ranking](https://cloud.google.com/vertex-ai/generative-ai/docs/retrieval-and-ranking)