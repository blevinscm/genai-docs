---
title: Retrieval-and-rankinggoogle.com/vertex-ai/generative-ai/docs/rag-engine/retrieval-and-ranking
date_scraped: 2025-05-12
---

# Retrieval and ranking 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

This page explains reranking and shows you how to use the API to rerank your
retrieved responses.

Post-retrieval reranking is a technique that enhances the relevance of retrieval
results. Vertex AI RAG Engine offers optional rerankers that
enhance the relevance of retrieved results during queries. Rerankers assess the
relevance of chunks from a query and reorder results accordingly. The new order
leads to responses that are more suitable in response to the query or can be
included in prompts for model inference to generate more relevant and accurate
responses.

## Available Rerankers

This section explores the types of rerankers.

### LLM reranker

LLM reranker is the reranker that uses an LLM to assess the relevance of chunks
to a query and reorder results accordingly, leading to more suitable responses
or improved prompts for model inference.

### Vertex AI rank service reranker

Rank service reranker is based on the rank API that takes a list of documents
and reranks those documents based on how relevant the documents are to a query.
Compared to embeddings, which look only at the semantic similarity of a document
and a query, this can give you precise scores for how well a document answers a
given query.

### Considerations when choosing a reranker

Consider the following when choosing a reranker:

- The LLM and Rank service rerankers use reordering to improve the relevance of retrieved contexts, which enables the model to provide improved responses.
- Rerankers introduce latency, which increases with the number of processed contexts.
- The cost of an LLM reranker depends on the number of tokens processed, but the cost to use the Rank service reranker is fixed per query.

## How to use rerankers

This section presents the prerequisites and code samples for using rerankers.

### Prerequisites for using the LLM reranker

The LLM reranker supports only Gemini models, which are accessible when
the RAG API is enabled. To view the list of supported models, see
[Gemini
models](https://cloud.google.com/vertex-ai/generative-ai/docs/supported-rag-models#supported-gemini-models).

#### Retrieve relevant contexts using the RAG API

This code sample demonstrates how to retrieve relevant contexts using the RAG
API.

### REST

Replace the following variables used in the code sample:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process the request.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource. Format:
 `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **TEXT**: The query text to get relevant contexts.
- **MODEL\_NAME**: The name of the model used for reranking.

```python
curl -X POST \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts" \
 -d '{
 "vertex_rag_store": {
 "rag_resources": {
 "rag_corpus": """RAG_CORPUS_RESOURCE"
 }
 },
 "query": {
 "text": "TEXT",
 "rag_retrieval_config": {
 "top_k": 10,
 "ranking": {
 "llm_ranker": {
 "model_name": "MODEL_NAME"
 }
 }
 }
 }
 }'

```

### Python

To learn how to install or update the Vertex AI SDK for Python, see
[Install the Vertex AI SDK for
Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk). For more information,
see the [Python API reference
documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

Replace the following variables used in the code sample:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process the request.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource. Format:
 `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **TEXT**: The query text to get relevant contexts.
- **MODEL\_NAME**: The name of the model used for reranking.

```python
from vertexai import rag
import vertexai

PROJECT_ID = "PROJECT_ID"
CORPUS_NAME = "projects/[PROJECT_ID]/locations/LOCATION/ragCorpora/[RAG_CORPUS_ID]"
MODEL_NAME= "MODEL_NAME"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="LOCATION")

rag_retrieval_config = rag.RagRetrievalConfig(
 top_k=10,
 ranking=rag.Ranking(
 llm_ranker=rag.LlmRanker(
 model_name=MODEL_NAME
 )
 )
)

response = rag.retrieval_query(
 rag_resources=[
 rag.RagResource(
 rag_corpus=CORPUS_NAME,
 )
 ],
 text="TEXT",
 rag_retrieval_config=rag_retrieval_config,
)
print(response)
# Example response:
# contexts {
# contexts {
# source_uri: "gs://your-bucket-name/file.txt"
# text: "....
# ....

```

#### Generate content using the RAG API

### REST

To generate content using Gemini models, make a call to the
Vertex AI `GenerateContent` API.

Replace the following variables used in the sample code:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process the request.
- **MODEL\_ID**: LLM model for content generation. For
 example, `gemini-2.0-flash-001`.
- **GENERATION\_METHOD**: LLM method for content generation.
 Options are `generateContent` and `streamGenerateContent`.
- **INPUT\_PROMPT**: The text sent to the LLM for content
 generation.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource. 
 Format:
 `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **SIMILARITY\_TOP\_K**: Optional: The number of top contexts
 to retrieve.
- **MODEL\_NAME**: The name of the model used for reranking.

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
 "rag_retrieval_config": {
 "top_k": 10,
 "ranking": {
 "llm_ranker": {
 "model_name": "MODEL_NAME"
 }
 }
 }
 }
 }
 }
}'

```

### Python

To learn how to install or update the Vertex AI SDK for Python,
see [Install the Vertex AI SDK for
Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk). For more information,
see the [Python API reference
documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

Replace the following variables used in the sample code:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process the request.
- **MODEL\_ID**: LLM model for content generation. For
 example, `gemini-2.0-flash-001`.
- **GENERATION\_METHOD**: LLM method for content generation.
 Options are `generateContent` and `streamGenerateContent`.
- **INPUT\_PROMPT**: The text sent to the LLM for content
 generation.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource. 
 Format:
 `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **SIMILARITY\_TOP\_K**: Optional: The number of top contexts
 to retrieve.
- **MODEL\_NAME**: The name of the model used for reranking.

```python
from vertexai import rag
from vertexai.generative_models import GenerativeModel, Tool
import vertexai

PROJECT_ID = "PROJECT_ID"
CORPUS_NAME = "projects/{PROJECT_ID}/locations/LOCATION/ragCorpora/RAG_CORPUS_RESOURCE"
MODEL_NAME= "MODEL_NAME"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="LOCATION")

config = rag.RagRetrievalConfig(
 top_k=10,
 ranking=rag.Ranking(
 llm_ranker=rag.LlmRanker(
 model_name=MODEL_NAME
 )
 )
)

rag_retrieval_tool = Tool.from_retrieval(
 retrieval=rag.Retrieval(
 source=rag.VertexRagStore(
 rag_resources=[
 rag.RagResource(
 rag_corpus=CORPUS_NAME,
 )
 ],
 rag_retrieval_config=config
 ),
 )
)

rag_model = GenerativeModel(
 model_name=MODEL_NAME, tools=[rag_retrieval_tool]
)
response = rag_model.generate_content("Why is the sky blue?")
print(response.text)
# Example response:
# The sky appears blue due to a phenomenon called Rayleigh scattering.
# Sunlight, which contains all colors of the rainbow, is scattered
# by the tiny particles in the Earth's atmosphere....
# ...

```

### Vertex rank service reranker prerequisites

To use Vertex AI rank service reranker, Discovery Engine
API must be enabled. All supported models can be found in the [document](https://cloud.google.com/generative-ai-app-builder/docs/ranking)

#### Retrieve relevant contexts using the RAG API

After you create your RAG corpus, relevant contexts can be retrieved from the
Vertex AI RAG Engine through the `RetrieveContexts` API.

These code samples demonstrate how to use the API to retrieve contexts from
Vertex AI RAG Engine.

### REST

Replace the following variables used in the sample code:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process your request.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus resource.
 Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **TEXT**: The query text to get relevant contexts.
- **MODEL\_NAME**: The name of the model used for reranking.

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
 "text": "TEXT",
 "rag_retrieval_config": {
 "top_k": 5,
 "ranking": {
 "rank_service": {
 "model_name": "MODEL_NAME"
 }
 }
 }
 }
 }'

```

### Python

To learn how to install or update the Vertex AI SDK for Python,
see [Install the Vertex AI SDK for
Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk). For more information,
see the [Python API reference
documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

Replace the following variables used in the sample code:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process your request.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource. 
 Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **TEXT**: The query text to get relevant contexts.
- **MODEL\_NAME**: The name of the model used for reranking.

```python
from vertexai import rag
import vertexai

PROJECT_ID = "PROJECT_ID"
CORPUS_NAME = "projects/[PROJECT_ID]/locations/LOCATION/ragCorpora/RAG_CORPUS_RESOURCE"
MODEL_NAME= "MODEL_NAME"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="LOCATION")

rag_retrieval_config = rag.RagRetrievalConfig(
 top_k=10,
 ranking=rag.Ranking(
 rank_service=rag.RankService(
 model_name=MODEL_NAME
 )
 )
)
response = rag.retrieval_query(
 rag_resources=[
 rag.RagResource(
 rag_corpus=CORPUS_NAME,
 )
 ],
 text="TEXT",
 rag_retrieval_config=rag_retrieval_config,
)
print(response)
# Example response:
# contexts {
# contexts {
# source_uri: "gs://your-bucket-name/file.txt"
# text: "....
# ....

```

#### Generate content using the RAG API

### REST

To generate content using Gemini models, make a call to the
Vertex AI `GenerateContent` API. By specifying the
`RAG_CORPUS_RESOURCE` in the request, the model automatically retrieves data
from the Vertex AI RAG Engine.

Replace the following variables used in the sample code:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process the request.
- **MODEL\_ID**: LLM model for content generation. For
 example, `gemini-2.0-flash-001`.
- **GENERATION\_METHOD**: LLM method for content generation.
 Options include `generateContent` and `streamGenerateContent`.
- **INPUT\_PROMPT**: The text sent to the LLM for content
 generation.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource. 
 Format:
 `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **SIMILARITY\_TOP\_K**: Optional: The number of top contexts
 to retrieve.
- **MODEL\_NAME**: The name of the model used for reranking.

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
 "rag_retrieval_config": {
 "top_k": 10,
 "ranking": {
 "rank_service": {
 "model_name": "MODEL_NAME"
 }
 }
 }
 }
 }
 }
}'

```

### Python

To learn how to install or update the Vertex AI SDK for Python, see
[Install the Vertex AI SDK for
Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk). For more information,
see the [Python API reference
documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

Replace the following variables used in the sample code:

- **PROJECT\_ID**: The ID of your Google Cloud project.
- **LOCATION**: The region to process the request.
- **MODEL\_ID**: LLM model for content generation. For
 example, `gemini-2.0-flash-001`.
- **GENERATION\_METHOD**: LLM method for content generation.
 Options include `generateContent` and `streamGenerateContent`.
- **INPUT\_PROMPT**: The text sent to the LLM for content
 generation.
- **RAG\_CORPUS\_RESOURCE**: The name of the RAG corpus
 resource. 
 Format:
 `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **SIMILARITY\_TOP\_K**: Optional: The number of top contexts
 to retrieve.
- **MODEL\_NAME**: The name of the model used for reranking.

```python
from vertexai import rag
from vertexai.generative_models import GenerativeModel, Tool
import vertexai

PROJECT_ID = "PROJECT_ID"
CORPUS_NAME = "projects/{PROJECT_ID}/locations/LOCATION/ragCorpora/RAG_CORPUS_RESOURCE"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="LOCATION")

config = rag.RagRetrievalConfig(
 top_k=10,
 ranking=rag.Ranking(
 rank_service=rag.RankService(
 model_name=MODEL_NAME
 )
 )
)

rag_retrieval_tool = Tool.from_retrieval(
 retrieval=rag.Retrieval(
 source=rag.VertexRagStore(
 rag_resources=[
 rag.RagResource(
 rag_corpus=CORPUS_NAME,
 )
 ],
 rag_retrieval_config=config
 ),
 )
)

rag_model = GenerativeModel(
 model_name="MODEL_NAME", tools=[rag_retrieval_tool]
)
response = rag_model.generate_content("INPUT_PROMPT")
print(response.text)
# Example response:
# The sky appears blue due to a phenomenon called Rayleigh scattering.
# Sunlight, which contains all colors of the rainbow, is scattered
# by the tiny particles in the Earth's atmosphere....
# ...

```

## What's next

- To learn more about the responses from RAG, see [Retrieval and Generation Output of Vertex AI RAG Engine](../model-reference/rag-output-explained.md).
- [Manage your RAG knowledge base (corpus)](https://cloud.google.com/vertex-ai/generative-ai/docs/manage-your-rag-corpus)