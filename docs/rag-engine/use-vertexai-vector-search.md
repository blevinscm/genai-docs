---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/use-vertexai-vector-search
title: Use Vertex AI Vector Search With Vertex AI Rag Enginestay Organized With Collectionssave
  And Categor
---

# Use Vertex AI Vector Search with Vertex AI RAG Engine 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

To see an example of using RAG Engine with Vector Search,
run the "RAG Engine with Vector Search" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/rag-engine/rag_engine_vector_search.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Frag-engine%2Frag_engine_vector_search.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Frag-engine%2Frag_engine_vector_search.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/rag-engine/rag_engine_vector_search.ipynb)

This page shows you how to connect your Vertex AI RAG Engine to [Vertex AI Vector Search](https://cloud.google.com/vertex-ai/docs/vector-search/overview).

You can also follow along using this notebook [Vertex AI RAG Engine with Vertex AI Vector Search](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/rag-engine/rag_engine_vector_search.ipynb).

Vertex AI RAG Engine is a powerful tool that uses a built-in vector database powered
by Spanner to store and manage vector representations of text
documents. The vector database enables efficient retrieval of relevant documents
based on the documents' semantic similarity to a given query. By integrating
Vertex AI Vector Search as an additional vector database with
Vertex AI RAG Engine, you can use the capabilities of Vector Search to
handle data volumes with low latency to improve the performance and scalability
of your RAG applications.

## Vertex AI Vector Search setup

Vertex AI Vector Search is based on Vector Search
technology developed by Google research. With Vector Search you can use
the same infrastructure that provides a foundation for Google products such as
Google Search, YouTube, and Google Play.

To integrate with Vertex AI RAG Engine, an empty Vector Search index is
required.

### Set up Vertex AI SDK

To set up Vertex AI SDK, see [Setup](https://cloud.google.com/vertex-ai/docs/vector-search/quickstart#setup).

### Create Vector Search index

To create a Vector Search index that's compatible with your RAG
Corpus, the index has to meet the following criteria:

1. `IndexUpdateMethod` must be `STREAM_UPDATE`, see [Create stream index](https://cloud.google.com/vertex-ai/docs/vector-search/create-manage-index#create-stream-index).
2. Distance measure type must be explicitly set to one of the following:

 - `DOT_PRODUCT_DISTANCE`
 - `COSINE_DISTANCE`
3. Dimension of the vector must be consistent with the embedding model you plan
 to use in the RAG corpus. Other parameters can be tuned based on
 your choices, which determine whether the additional parameters can be
 tuned.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
def vector_search_create_streaming_index(
 project: str, location: str, display_name: str, gcs_uri: Optional[str] = None
) -> aiplatform.MatchingEngineIndex:
 """Create a vector search index.

 Args:
 project (str): Required. Project ID
 location (str): Required. The region name
 display_name (str): Required. The index display name
 gcs_uri (str): Optional. The Google Cloud Storage uri for index content

 Returns:
 The created MatchingEngineIndex.
 """
 # Initialize the Vertex AI client
 aiplatform.init(project=project, location=location)

 # Create Index
 index = aiplatform.MatchingEngineIndex.create_tree_ah_index(
 display_name=display_name,
 contents_delta_uri=gcs_uri,
 description="Matching Engine Index",
 dimensions=100,
 approximate_neighbors_count=150,
 leaf_node_embedding_count=500,
 leaf_nodes_to_search_percent=7,
 index_update_method="STREAM_UPDATE", # Options: STREAM_UPDATE, BATCH_UPDATE
 distance_measure_type=aiplatform.matching_engine.matching_engine_index_config.DistanceMeasureType.DOT_PRODUCT_DISTANCE,
 )

 return index

```

### Create Vector Search index endpoint

[Public endpoints](https://cloud.google.com/vertex-ai/docs/vector-search/deploy-index-public) are supported
by Vertex AI RAG Engine.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
def vector_search_create_index_endpoint(
 project: str, location: str, display_name: str
) -> None:
 """Create a vector search index endpoint.

 Args:
 project (str): Required. Project ID
 location (str): Required. The region name
 display_name (str): Required. The index endpoint display name
 """
 # Initialize the Vertex AI client
 aiplatform.init(project=project, location=location)

 # Create Index Endpoint
 index_endpoint = aiplatform.MatchingEngineIndexEndpoint.create(
 display_name=display_name,
 public_endpoint_enabled=True,
 description="Matching Engine Index Endpoint",
 )

 print(index_endpoint.name)

```

### Deploy an index to an index endpoint

Before we do the nearest neighbor search, the index has to be deployed to an
index endpoint.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
def vector_search_deploy_index(
 project: str,
 location: str,
 index_name: str,
 index_endpoint_name: str,
 deployed_index_id: str,
) -> None:
 """Deploy a vector search index to a vector search index endpoint.

 Args:
 project (str): Required. Project ID
 location (str): Required. The region name
 index_name (str): Required. The index to update. A fully-qualified index
 resource name or a index ID. Example:
 "projects/123/locations/us-central1/indexes/my_index_id" or
 "my_index_id".
 index_endpoint_name (str): Required. Index endpoint to deploy the index
 to.
 deployed_index_id (str): Required. The user specified ID of the
 DeployedIndex.
 """
 # Initialize the Vertex AI client
 aiplatform.init(project=project, location=location)

 # Create the index instance from an existing index
 index = aiplatform.MatchingEngineIndex(index_name=index_name)

 # Create the index endpoint instance from an existing endpoint.
 index_endpoint = aiplatform.MatchingEngineIndexEndpoint(
 index_endpoint_name=index_endpoint_name
 )

 # Deploy Index to Endpoint
 index_endpoint = index_endpoint.deploy_index(
 index=index, deployed_index_id=deployed_index_id
 )

 print(index_endpoint.deployed_indexes)

```

If it's the first time that you're deploying an index to an index endpoint, it
takes approximately 30 minutes to automatically build and initiate the backend
before the index can be stored. After the first deployment, the index is ready
in seconds. To see the status of the index deployment, open the
[**Vector Search Console**](https://console.cloud.google.com/vertex-ai/matching-engine/index-endpoints),
select the **Index endpoints** tab, and choose your index endpoint.

Identify the resource name of your index and index endpoint, which have the
following formats:

- `projects/${PROJECT_ID}/locations/${LOCATION_ID}/indexes/${INDEX_ID}`
- `projects/${PROJECT_ID}/locations/${LOCATION_ID}/indexEndpoints/${INDEX_ENDPOINT_ID}`.

## Use Vertex AI Vector Search in Vertex AI RAG Engine

After the Vector Search instance is set up, follow the steps in this
section to set the Vector Search instance as the vector database for
the RAG application.

### Set the vector database to create a RAG corpus

When you create the RAG corpus, specify only the full `INDEX_ENDPOINT_NAME` and
`INDEX_NAME`. Make sure to use the numeric ID for both index and index endpoint
resource names. The RAG corpus is created and automatically associated with the
Vector Search index. Validations are performed on the
[criteria](#create_vector-search-name). If any of the requirements aren't met,
the request is rejected.

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
# vector_search_index_name = "projects/{PROJECT_ID}/locations/{LOCATION}/indexes/{INDEX_ID}"
# vector_search_index_endpoint_name = "projects/{PROJECT_ID}/locations/{LOCATION}/indexEndpoints/{INDEX_ENDPOINT_ID}"
# display_name = "test_corpus"
# description = "Corpus Description"

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

# Configure embedding model (Optional)
embedding_model_config = rag.RagEmbeddingModelConfig(
 vertex_prediction_endpoint=rag.VertexPredictionEndpoint(
 publisher_model="publishers/google/models/text-embedding-005"
 )
)

# Configure Vector DB
vector_db = rag.VertexVectorSearch(
 index=vector_search_index_name, index_endpoint=vector_search_index_endpoint_name
)

corpus = rag.create_corpus(
 display_name=display_name,
 description=description,
 backend_config=rag.RagVectorDbConfig(
 rag_embedding_model_config=embedding_model_config,
 vector_db=vector_db,
 ),
)
print(corpus)
# Example response:
# RagCorpus(name='projects/1234567890/locations/us-central1/ragCorpora/1234567890',
# display_name='test_corpus', description='Corpus Description', embedding_model_config=...
# ...

```

### REST

```python
 # TODO(developer): Update and un-comment the following lines:
 # CORPUS_DISPLAY_NAME = "YOUR_CORPUS_DISPLAY_NAME"
 # Full index/indexEndpoint resource name
 # Index: projects/${PROJECT_ID}/locations/${LOCATION_ID}/indexes/${INDEX_ID}
 # IndexEndpoint: projects/${PROJECT_ID}/locations/${LOCATION_ID}/indexEndpoints/${INDEX_ENDPOINT_ID}
 # INDEX_RESOURCE_NAME = "YOUR_INDEX_ENDPOINT_RESOURCE_NAME"
 # INDEX_NAME = "YOUR_INDEX_RESOURCE_NAME"
 # Call CreateRagCorpus API to create a new RagCorpus
 curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" https://${LOCATION_ID}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/ragCorpora -d '{
 "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
 "rag_vector_db_config" : {
 "vertex_vector_search": {
 "index":'\""${INDEX_NAME}"\"'
 "index_endpoint":'\""${INDEX_ENDPOINT_NAME}"\"'
 }
 }
 }'

 # Call ListRagCorpora API to verify the RagCorpus is created successfully
 curl -sS -X GET \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 "https://${LOCATION_ID}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/ragCorpora"

```

### Import files using the RAG API

Use the [`ImportRagFiles` API](../model-reference/rag-api.md) to import
files from Cloud Storage or
Google Drive into the Vector Search index. The files are embedded and
stored in the Vector Search index.

### REST

```python
# TODO(developer): Update and uncomment the following lines:
# RAG_CORPUS_ID = "your-rag-corpus-id"
#
# Google Cloud Storage bucket/file location.
# For example, "gs://rag-fos-test/"
# GCS_URIS= "your-gcs-uris"

# Call ImportRagFiles API to embed files and store in the BigQuery table
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora/${RAG_CORPUS_ID}/ragFiles:import \
-d '{
 "import_rag_files_config": {
 "gcs_source": {
 "uris": '\""${GCS_URIS}"\"'
 },
 "rag_file_chunking_config": {
 "chunk_size": 512
 }
 }
}'

# Call ListRagFiles API to verify the files are imported successfully
curl -X GET \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora/${RAG_CORPUS_ID}/ragFiles

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
# corpus_name = "projects/{PROJECT_ID}/locations/us-central1/ragCorpora/{rag_corpus_id}"
# paths = ["https://drive.google.com/file/123", "gs://my_bucket/my_files_dir"] # Supports Google Cloud Storage and Google Drive Links

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

response = rag.import_files(
 corpus_name=corpus_name,
 paths=paths,
 transformation_config=rag.TransformationConfig(
 rag.ChunkingConfig(chunk_size=512, chunk_overlap=100)
 ),
 import_result_sink="gs://sample-existing-folder/sample_import_result_unique.ndjson", # Optional, this has to be an existing storage bucket folder, and file name has to be unique (non-existent).
 max_embedding_requests_per_min=900, # Optional
)
print(f"Imported {response.imported_rag_files_count} files.")
# Example response:
# Imported 2 files.

```

### Retrieve relevant contexts using the RAG API

After completion of the file imports, the relevant context can be retrieved from
the Vector Search index by using the `RetrieveContexts` API.

### REST

```python
# TODO(developer): Update and uncomment the following lines:
# RETRIEVAL_QUERY="your-retrieval-query"
#
# Full RAG corpus resource name
# Format:
# "projects/${PROJECT_ID}/locations/us-central1/ragCorpora/${RAG_CORPUS_ID}"
# RAG_CORPUS_RESOURCE="your-rag-corpus-resource"

# Call RetrieveContexts API to retrieve relevant contexts
curl -X POST \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1:retrieveContexts \
 -d '{
 "vertex_rag_store": {
 "rag_resources": {
 "rag_corpus": '\""${RAG_CORPUS_RESOURCE}"\"',
 },
 },
 "query": {
 "text": '\""${RETRIEVAL_QUERY}"\"',
 "similarity_top_k": 10
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

To generate content using Gemini models, make a call to the
Vertex AI `GenerateContent` API. By specifying the
`RAG_CORPUS_RESOURCE` in the request, the API automatically retrieves data from
the Vector Search index.

### REST

```python
# TODO(developer): Update and uncomment the following lines:
# MODEL_ID=gemini-2.0-flash
# GENERATE_CONTENT_PROMPT="your-generate-content-prompt"

# GenerateContent with contexts retrieved from the FeatureStoreOnline index
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:generateContent \
-d '{
 "contents": {
 "role": "user",
 "parts": {
 "text": '\""${GENERATE_CONTENT_PROMPT}"\"'
 }
 },
 "tools": {
 "retrieval": {
 "vertex_rag_store": {
 "rag_resources": {
 "rag_corpus": '\""${RAG_CORPUS_RESOURCE}"\"',
 },
 "similarity_top_k": 8,
 "vector_distance_threshold": 0.32
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

- [Use Vertex AI Search as a retrieval backend using
 Vertex AI RAG Engine](../use-vertexai-search.md)