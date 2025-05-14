---
date_scraped: 2025-05-12
title: Use Pinecone With Vertex AI Rag Engine
---

# Use Pinecone with Vertex AI RAG Engine 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

To see an example of using RAG Engine with Pinecone,
run the "RAG Engine with Pinecone" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/rag-engine/rag_engine_pinecone.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Frag-engine%2Frag_engine_pinecone.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Frag-engine%2Frag_engine_pinecone.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/rag-engine/rag_engine_pinecone.ipynb)

This page shows you how to connect your RAG corpus to your [Pinecone](https://www.pinecone.io/)
database.

You can also follow along using this notebook [Vertex AI RAG Engine with Pinecone](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/rag-engine/rag_engine_pinecone.ipynb).

You can use your Pinecone database instance with Vertex AI RAG Engine to index, and
conduct a vector-based similarity search. A similarity search is a way to find
pieces of text that are similar to the text that you're looking for, which
requires the use of an [embedding model](https://cloud.google.com/vertex-ai/generative-ai/docs/use-embedding-models). The embedding model produces vector data
for each piece of text being compared. The similarity search is used to retrieve
semantic contexts for [grounding](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview) to return the
most accurate content from your LLM.

With Vertex AI RAG Engine, you can continue to use your fully-managed vector database
instance, which you're responsible for provisioning. Vertex AI RAG Engine uses your
vector database for storage, index management, and search.

## Consider whether to use Pinecone with Vertex AI RAG Engine

Consider whether using the Pinecone database is the best choice for your RAG
application by reviewing the following:

- You must create, configure, and manage the scaling of your Pinecone database
 instance.
- Vertex AI RAG Engine uses the default namespace on your index. Ensure that this
 namespace isn't modifiable by anything else.
- You must provide a Pinecone API key, which allows Vertex AI RAG Engine to interact
 with the Pinecone database. Vertex AI RAG Engine doesn't store and manage your
 Pinecone API key. Instead, you must do the following:

 - Store your key in the Google Cloud Secret Manager.
 - Grant your project's service account permissions to access your secret.
 - Provide Vertex AI RAG Engine access to your secret's resource name.
 - When you interact with your RAG corpus, Vertex AI RAG Engine accesses your
 secret resource using your service account.
- RAG corpus and the Pinecone index have a one-to-one mapping. This
 association is made as part of the [`CreateRagCorpus` API
 call](model-reference/rag-api.md) or the
 [`UpdateRagCorpus` API call](model-reference/rag-api.md).

## Create your Pinecone index

To create your Pinecone index, you must follow these steps:

1. See the [Pinecone quickstart
 guide](https://docs.pinecone.io/guides/get-started/quickstart) to get the
 index configurations that must be specified on your index to make the index
 compatible with RAG corpus.
2. You want to ensure that the location of the [Pinecone
 index](https://docs.pinecone.io/guides/indexes/understanding-indexes) is the
 same as or close to where you use Vertex AI RAG Engine for the following reasons:

 - You want to maintain reduced latencies.
 - You want to meet your data residency requirements that are set by
 applicable laws.
3. During Pinecone index creation, specify the embedding dimension to use with
 Vertex AI RAG Engine. This table provides the dimension sizes or location of the
 dimension sizes:

 | Model | Dimension size |
 | --- | --- |
 | First-party Gecko | 768 |
 | Fine-tuned first-party Gecko | 768 |
 | E5 | See [Use OSS embedding models](https://cloud.google.com/vertex-ai/generative-ai/docs/use-embedding-models#use-oss-embedding-models). |
4. Choose one of the following supported distance metrics:

 - `cosine`
 - `dotproduct`
 - `euclidean`
5. Optional: When you create a pod-based index, you must specify the `file_id`
 on the `pod.metadata_config.indexed` field. For more information, see
 [Selective metadata
 indexing](https://docs.pinecone.io/guides/indexes/configure-pod-based-indexes#selective-metadata-indexing).

## Create your Pinecone API key

Vertex AI RAG Engine can only connect to your Pinecone index by using your API key
for authentication and authorization. You must follow the
[Pinecone official guide](https://docs.pinecone.io/guides/get-started/authentication)
to authentication to configure the API key-based authentication in your Pinecone
project.

## Store your API key in Secret Manager

An API key holds Sensitive Personally Identifiable Information (SPII), which is
subject to legal requirements. If the SPII data is compromised or misused, an
individual might experience a significant risk or harm. To minimize risks to an
individual while using Vertex AI RAG Engine, don't store and manage your API key, and
avoid sharing the unencrypted API key.

To protect SPII, you must do the following:

1. Store your API key in [Secret Manager](https://cloud.google.com/security/products/secret-manager).
2. Grant your Vertex AI RAG Engine service account the permissions to your secret(s),
 and manage the access control at the secret resource level.

 1. Navigate to your [project's permissions](https://console.cloud.google.com/iam-admin/iam?_ga=2.174137698.1529967577.1726609616-1380734187.1726608127).
 2. Enable the option **Include Google-provided role grants**.
 3. Find the service account, which has the format:

 `service-{project number}@gcp-sa-vertex-rag.iam.gserviceaccount.com`
 4. Edit the service account's principals.
 5. Add the `Secret Manager Secret Accessor` role to the service
 account.
3. During the creation or update of the RAG corpus, pass the secret resource
 name to Vertex AI RAG Engine, and store the secret resource name.

When making API requests to your Pinecone index(es), Vertex AI RAG Engine uses each
service account to read the API key that corresponds to your secret resources in
Secret Manager from your project(s).

## Provision your Vertex AI RAG Engine service account

When you create the first RAG corpus in your project, Vertex AI RAG Engine creates a
dedicated service account. You can find your service account from your project's
[Identity and Access Management page](https://console.cloud.google.com/iam-admin/iam).

The service account follows this fixed format:

`service-{project number}@gcp-sa-vertex-rag.iam.gserviceaccount.com`

For example,

`service-123456789@gcp-sa-vertex-rag.iam.gserviceaccount.com`

## Prepare your RAG corpus

To use your Pinecone index with Vertex AI RAG Engine, you must associate the index
with a RAG corpus during its creation stage. After the association is made, this
binding is permanent for the lifetime of the RAG corpus. The association can be
done using either the `CreateRagCorpus` or the `UpdateRagCorpus` API.

For the association to be considered complete, you must set three key fields on
the RAG corpus:

- **`rag_vector_db_config.pinecone`**: This field helps you to set the choice of
 a vector database that you would like to associate with your RAG corpus, and
 it must be set during the `CreateRagCorpus` API call. If it isn't set, then
 the default vector database choice `RagManagedDb` is assigned to your RAG
 corpus.
- **`rag_vector_db_config.pinecone.index_name`**: This is the name used to
 create the Pinecone index that's used with the RAG corpus. You can set the
 name during the `CreateRagCorpus` call, or you can specify the name when you
 call the `UpdateRagCorpus` API.
- **`rag_vector_db_config.api_auth.api_key_config.api_key_secret_version`**:
 This the full resource name of the secret that is stored in
 Secret Manager, which contains your Pinecone API key. You can set the
 name during the `CreateRagCorpus` call, or you can specify the name when you
 call the `UpdateRagCorpus` API. Until you specify this field, you can't import
 data into the RAG corpus. 
 This field should have the format: 
 `projects/{PROJECT_NUMBER}/secrets/{SECRET_ID}/versions/{VERSION_ID}`

## Create your RAG corpus

If you have access to your Pinecone index name and the secret resource name with
[your permissions set](https://cloud.google.com/vertex-ai/generative-ai/docs/use-pinecone#store-api-key-in-secret-manager),
then you can create your RAG corpus, and associate it with your Pinecone index,
which is demonstrated in this sample code.

When it's your first time creating a RAG corpus, you won't have the service
account information ready. However, the fields are optional and can be
associated with the RAG corpus using the `UpdateRagCorpus` API.

For an example on how to create the RAG corpus without providing the service
account information, see [Create RAG corpus without an index name or an API
key](#create-corpus-without-name-or-key).

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
# pinecone_index_name = "pinecone-index-name"
# pinecone_api_key_secret_manager_version = "projects/{PROJECT_ID}/secrets/{SECRET_NAME}/versions/latest"
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
vector_db = rag.Pinecone(
 index_name=pinecone_index_name,
 api_key=pinecone_api_key_secret_manager_version,
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
 # Set your project ID under which you want to create the corpus
 PROJECT_ID = "YOUR_PROJECT_ID"

 # Choose a display name for your corpus
 CORPUS_DISPLAY_NAME=YOUR_CORPUS_DISPLAY_NAME

 # Set your Pinecone index name
 PINECONE_INDEX_NAME=YOUR_INDEX_NAME

 # Set the full resource name of your secret. Follows the format
 # projects/{PROJECT_NUMER}/secrets/{SECRET_ID}/versions/{VERSION_ID}
 SECRET_RESOURCE_NAME=YOUR_SECRET_RESOURCE_NAME

 # Call CreateRagCorpus API with all the Vector DB information.
 # You can also add the embedding model choice or set other RAG corpus parameters on
 # this call per your choice.
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://us-central1-aiplatform.googleapis.com}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora -d '{
 "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
 "rag_vector_db_config" : {
 "pinecone": {"index_name": '\""${PINECONE_INDEX_NAME}"\"'},
 "api_auth": {"api_key_config":
 {"api_key_secret_version": '\""${SECRET_RESOURCE_NAME}"\"'}
 }
 }
 }'

 # To poll the status of your RAG corpus creation, get the operation_id returned in
 # response of your CreateRagCorpus call.
 OPERATION_ID="YOUR_OPERATION_ID"

 # Poll Operation status until done = true in the response.
 # The response to this call will contain the ID for your created RAG corpus
 curl -X GET \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}

```

## Create RAG corpus without an index name or an API key

If this is your first RAG corpus and you don't have access to your service
account details, or you haven't completed the [provisioning steps](#provision-service-account)
for your Pinecone index, you can still create your RAG corpus. You can then
associate the RAG corpus with an empty Pinecone configuration, and add the details later.

The following must be taken into consideration:

- When you don't provide the index name and API key secret name, files can't be
 imported into the RAG corpus.
- If you choose Pinecone as your vector database for your RAG corpus, it can't
 be switched later to a different database.

This code example demonstrates how to create a RAG corpus with Pinecone without
providing a Pinecone index name or API secret name. Use the `UpdateRagCorpus`
API to specify later the missing information.

### Python

```python
import vertexai
from vertexai.preview import rag

# Set Project
PROJECT_ID = "YOUR_PROJECT_ID"
vertexai.init(project=PROJECT_ID, location="us-central1")

# Configure the Pinecone vector DB information
vector_db = rag.Pinecone()

# Name your corpus
DISPLAY_NAME = "YOUR_CORPUS_NAME"

rag_corpus = rag.create_corpus(display_name=DISPLAY_NAME, vector_db=vector_db)

```

### REST

```python
# Set your project ID under which you want to create the corpus
PROJECT_ID = "YOUR_PROJECT_ID"

# Choose a display name for your corpus
CORPUS_DISPLAY_NAME=YOUR_CORPUS_DISPLAY_NAME

# Call CreateRagCorpus API with all the Vector DB information.
# You can also add the embedding model choice or set other RAG corpus parameters on
# this call per your choice.
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora -d '{
 "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
 "rag_vector_db_config" : {
 "pinecone": {}
 }
 }'

# To poll the status of your RAG corpus creation, get the operation_id returned in
# response of your CreateRagCorpus call.
OPERATION_ID="YOUR_OPERATION_ID"

# Poll Operation status until done = true in the response.
# The response to this call will contain the ID for your created RAG corpus
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}

```

## Update your RAG corpus

The `UpdateRagCorpus` API lets you update the vector database configuration.
If the Pinecone index name and the API key secret version aren't previously set,
you can use the Pinecone API to update the fields. The choice of a vector
database can't be updated. It's optional to provide the API key secret. However,
if you don't specify the API key secret, you can import data into the RAG
corpus.

| Field | Mutability | Required or Optional |
| --- | --- | --- |
| `rag_vector_db_config.vector_db` | Immutable after you make a choice. | Required |
| `rag_vector_db_config.pinecone.index_name` | Immutable after you set the field on the RAG corpus. | Required |
| `rag_vector_db_config.api_auth.api_key_config.api_key_secret_version` | Mutable. After you set the API key, you can't drop the key. | Optional |

### Python

```python
import vertexai
from vertexai.preview import rag

# Set Project
PROJECT_ID = "YOUR_PROJECT_ID"
vertexai.init(project=PROJECT_ID, location="us-central1")

# Configure the Pinecone vector DB information
vector_db = rag.Pinecone(index_name=)

# Name your corpus
DISPLAY_NAME = "YOUR_CORPUS_NAME"

rag_corpus = rag.create_corpus(display_name=DISPLAY_NAME, vector_db=vector_db)

```

### REST

```python
# Set your project ID for the corpus that you want to create.
PROJECT_ID = "YOUR_PROJECT_ID"

# Set your Pinecone index name
PINECONE_INDEX_NAME=YOUR_INDEX_NAME

# Set the full resource name of your secret. Follows the format
# projects/{PROJECT_NUMER}/secrets/{SECRET_ID}/versions/{VERSION_ID}
SECRET_RESOURCE_NAME=YOUR_SECRET_RESOURCE_NAME

# Call UpdateRagCorpus API with the Vector DB information.
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora -d '{
 "rag_vector_db_config" : {
 "pinecone": {"index_name": '\""${PINECONE_INDEX_NAME}"\"'},
 "api_auth": {"api_key_config":
 {"api_key_secret_version": '\""${SECRET_RESOURCE_NAME}"\"'}
 }
 }
 }'

# To poll the status of your RAG corpus creation, get the operation_id returned in
# response of your CreateRagCorpus call.
OPERATION_ID="YOUR_OPERATION_ID"

# Poll Operation status until done = true in the response.
# The response to this call will contain the ID for your created RAG corpus
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/us-central1/operations/${OPERATION_ID}

```

## What's next

- [Use Vertex AI Vector Search with
 Vertex AI RAG Engine](rag-engine/use-vertexai-vector-search.md)