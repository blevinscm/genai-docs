---
title: RAG-Engine-API
source: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api#delete-a-rag-corpus-example-api
date_scraped: 2025-05-12
---

# RAG Engine API 

**Preview**

Some of the RAG features are Preview offerings, subject to the "Pre-GA Offerings Terms"
of the [Google Cloud Service Specific
Terms](https://cloud.google.com/terms/service-terms). Pre-GA products and features may have limited support, and changes to Pre-GA products
and features may not be compatible with other Pre-GA versions. For more information, see the [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).
Further, by using the Gemini API on Vertex AI, you agree to the Generative AI Preview [terms and conditions](https://cloud.google.com/trustedtester/aitos) (Preview
Terms).

The Vertex AI RAG Engine is a component of the
Vertex AI platform, which facilitates Retrieval-Augmented
Generation (RAG). RAG Engine enables Large Language Models (LLMs) to access
and incorporate data from external knowledge sources, such as documents and
databases. By using RAG, LLMs can generate more accurate and informative LLM
responses.

## Parameters list

This section lists the following:

| Parameters | Examples |
| --- | --- |
| See [Corpus management parameters](#corpus-management-params-api). | See [Corpus management examples](#corpus-management-examples-api). |
| See [File management parameters](#file-management-params-api). | See [File management examples](#file-management-examples-api). |

### Corpus management parameters

For information about a RAG corpus, see
[Corpus management](https://cloud.google.com/vertex-ai/generative-ai/docs/manage-your-rag-corpus#corpus-management).

#### Create a RAG corpus

This table lists the parameters used to create a RAG corpus.

##### Body Request

| Parameters | |
| --- | --- |
| `display_name` | Required: `string` The display name of the RAG corpus. |
| `description` | Optional: `string` The description of the RAG corpus. |
| `vector_db_config` | Optional: Immutable: `RagVectorDbConfig` The configuration for the Vector DBs. |
| `vertex_ai_search_config.serving_config` | Optional: `string` The configuration for the Vertex AI Search. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/servingConfigs/{serving_config}` or `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/servingConfigs/{serving_config}` |

##### `RagVectorDbConfig`

| Parameters | |
| --- | --- |
| `rag_managed_db` | `oneof` `vector_db`: `RagVectorDbConfig.RagManagedDb` If no vector database is specified, `rag_managed_db` is the default vector database. |
| `weaviate` | `oneof` `vector_db`: `RagVectorDbConfig.Weaviate` Specifies your Weaviate instance. |
| `weaviate.http_endpoint` | `string` The Weaviate instance's HTTP endpoint. This value can't be changed after it's set. You can leave it empty in the `CreateRagCorpus` API call, and set it with a non-empty value in a follow up `UpdateRagCorpus` API call. |
| `weaviate.collection_name` | `string` The Weaviate collection that the RAG corpus maps to. This value can't be changed after it's set. You can leave it empty in the `CreateRagCorpus` API call, and set it with a non-empty value in a follow up `UpdateRagCorpus` API call. |
| `pinecone` | `oneof` `vector_db`: `RagVectorDbConfig.Pinecone` Specifies your Pinecone instance. |
| `pinecone.index_name` | `string` This is the name used to create the Pinecone index that's used with the RAG corpus. This value can't be changed after it's set. You can leave it empty in the `CreateRagCorpus` API call, and set it with a non-empty value in a follow up `UpdateRagCorpus` API call. |
| `vertex_feature_store` | `oneof` `vector_db`: `RagVectorDbConfig.VertexFeatureStore` Specifies your Vertex AI Feature Store instance. |
| `vertex_feature_store.feature_view_resource_name` | `string` The Vertex AI Feature Store `FeatureView` that the RAG corpus maps to. Format: `projects/{project}/locations/{location}/featureOnlineStores/{feature_online_store}/featureViews/{feature_view}` This value can't be changed after it's set. You can leave it empty in the `CreateRagCorpus` API call, and set it with a non-empty value in a follow up `UpdateRagCorpus` API call. |
| `vertex_vector_search` | `oneof` `vector_db`: `RagVectorDbConfig.VertexVectorSearch` Specifies your Vertex Vector Search instance. |
| `vertex_vector_search.index` | `string` This is the resource name of the Vector Search index that's used with the RAG corpus. Format: `projects/{project}/locations/{location}/indexEndpoints/{index_endpoint}` This value can't be changed after it's set. You can leave it empty in the `CreateRagCorpus` API call, and set it with a non-empty value in a follow up `UpdateRagCorpus` API call. |
| `vertex_vector_search.index_endpoint` | `string` This is the resource name of the Vector Search index endpoint that's used with the RAG corpus. Format: `projects/{project}/locations/{location}/indexes/{index}` This value can't be changed after it's set. You can leave it empty in the `CreateRagCorpus` API call, and set it with a non-empty value in a follow up `UpdateRagCorpus` API call. |
| `api_auth.api_key_config.api_key_secret_version` | `string` This the full resource name of the secret that is stored in Secret Manager, which contains your Weaviate or Pinecone API key that depends on your choice of vector database. Format: `projects/{PROJECT_NUMBER}/secrets/{SECRET_ID}/versions/{VERSION_ID}` You can leave it empty in the `CreateRagCorpus` API call, and set it with a non-empty value in a follow up `UpdateRagCorpus` API call. |
| `rag_embedding_model_config.vertex_prediction_endpoint.endpoint` | Optional: Immutable: `string` The embedding model to use for the RAG corpus. This value can't be changed after it's set. If you leave it empty, we use [text-embedding-004](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api) as the embedding model. |

#### Update a RAG corpus

This table lists the parameters used to update a RAG corpus.

##### Body Request

| Parameters | |
| --- | --- |
| `display_name` | Optional: `string` The display name of the RAG corpus. |
| `description` | Optional: `string` The description of the RAG corpus. |
| `rag_vector_db.weaviate.http_endpoint` | `string` The Weaviate instance's HTTP endpoint. If your `RagCorpus` was created with a `Weaviate` configuration, and this field has never been set before, then you can update the Weaviate instance's HTTP endpoint. |
| `rag_vector_db.weaviate.collection_name` | `string` The Weaviate collection that the RAG corpus maps to. If your `RagCorpus` was created with a `Weaviate` configuration, and this field has never been set before, then you can update the Weaviate instance's collection name. |
| `rag_vector_db.pinecone.index_name` | `string` This is the name used to create the Pinecone index that's used with the RAG corpus. If your `RagCorpus` was created with a `Pinecone` configuration, and this field has never been set before, then you can update the Pinecone instance's index name. |
| `rag_vector_db.vertex_feature_store.feature_view_resource_name` | `string` The Vertex AI Feature Store `FeatureView` that the RAG corpus maps to. Format: `projects/{project}/locations/{location}/featureOnlineStores/{feature_online_store}/featureViews/{feature_view}` If your `RagCorpus` was created with a `Vertex AI Feature Store` configuration, and this field has never been set before, then you can update it. |
| `rag_vector_db.vertex_vector_search.index` | `string` This is the resource name of the Vector Search index that's used with the RAG corpus. Format: `projects/{project}/locations/{location}/indexEndpoints/{index_endpoint}` If your `RagCorpus` was created with a `Vector Search` configuration, and this field has never been set before, then you can update it. |
| `rag_vector_db.vertex_vector_search.index_endpoint` | `string` This is the resource name of the Vector Search index endpoint that's used with the RAG corpus. Format: `projects/{project}/locations/{location}/indexes/{index}` If your `RagCorpus` was created with a `Vector Search` configuration, and this field has never been set before, then you can update it. |
| `rag_vector_db.api_auth.api_key_config.api_key_secret_version` | `string` The full resource name of the secret that is stored in Secret Manager, which contains your Weaviate or Pinecone API key depends on your choice of vector database. Format: `projects/{PROJECT_NUMBER}/secrets/{SECRET_ID}/versions/{VERSION_ID}` |

#### List RAG corpora

This table lists the parameters used to list RAG corpora.

| Parameters | |
| --- | --- |
| `page_size` | Optional: `int` The standard list page size. |
| `page_token` | Optional: `string` The standard list page token. Typically obtained from `[ListRagCorporaResponse.next_page_token][]` of the previous `[VertexRagDataService.ListRagCorpora][]` call. |

#### Get a RAG corpus

This table lists parameters used to get a RAG corpus.

| Parameters | |
| --- | --- |
| `name` | `string` The name of the `RagCorpus` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus_id}` |

#### Delete a RAG corpus

This table lists parameters used to delete a RAG corpus.

| Parameters | |
| --- | --- |
| `name` | `string` The name of the `RagCorpus` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus_id}` |

### File management parameters

For information about a RAG file, see
[File management](https://cloud.google.com/vertex-ai/generative-ai/docs/manage-your-rag-corpus#file-management).

#### Upload a RAG file

This table lists parameters used to upload a RAG file.

##### Body Request

| Parameters | |
| --- | --- |
| `parent` | `string` The name of the `RagCorpus` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus_id}` |
| `rag_file` | Required: `RagFile` The file to upload. |
| `upload_rag_file_config` | Required: `UploadRagFileConfig` The configuration for the `RagFile` to be uploaded into the `RagCorpus`. |

| `RagFile` | |
| --- | --- |
| `display_name` | Required: `string` The display name of the RAG file. |
| `description` | Optional: `string` The description of the RAG file. |

| `UploadRagFileConfig` | |
| --- | --- |
| `rag_file_transformation_config.rag_file_chunking_config.fixed_length_chunking.chunk_size` | `int32` Number of tokens each chunk has. |
| `rag_file_transformation_config.rag_file_chunking_config.fixed_length_chunking.chunk_overlap` | `int32` The overlap between chunks. |

#### Import RAG files

This table lists parameters used to import a RAG file.

| Parameters | |
| --- | --- |
| `parent` | Required: `string` The name of the `RagCorpus` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus_id}` |
| `gcs_source` | `oneof` `import_source`: `GcsSource` Cloud Storage location. Supports importing individual files as well as entire Cloud Storage directories. |
| `gcs_source.uris` | `list` of `string` Cloud Storage URI that contains the upload file. |
| `google_drive_source` | `oneof` `import_source`: `GoogleDriveSource` Google Drive location. Supports importing individual files as well as Google Drive folders. |
| `slack_source` | `oneof` `import_source`: `SlackSource` The slack channel where the file is uploaded. |
| `jira_source` | `oneof` `import_source`: `JiraSource` The Jira query where the file is uploaded. |
| `share_point_sources` | `oneof` `import_source`: `SharePointSources` The SharePoint sources where the file is uploaded. |
| `rag_file_transformation_config.rag_file_chunking_config.fixed_length_chunking.chunk_size` | `int32` Number of tokens each chunk has. |
| `rag_file_transformation_config.rag_file_chunking_config.fixed_length_chunking.chunk_overlap` | `int32` The overlap between chunks. |
| `rag_file_parsing_config` | Optional: `RagFileParsingConfig` Specifies the parsing configuration for `RagFiles`. If this field isn't set, RAG uses the default parser. |
| `max_embedding_requests_per_min` | Optional: `int32` The maximum number of queries per minute that this job is allowed to make to the embedding model specified on the corpus. This value is specific to this job and not shared across other import jobs. Consult the Quotas page on the project to set an appropriate value. If unspecified, a default value of 1,000 QPM is used. |

| `GoogleDriveSource` | |
| --- | --- |
| `resource_ids.resource_id` | Required: `string` The ID of the Google Drive resource. |
| `resource_ids.resource_type` | Required: `string` The type of the Google Drive resource. |

| `SlackSource` | |
| --- | --- |
| `channels.channels` | Repeated: `SlackSource.SlackChannels.SlackChannel` Slack channel information, include ID and time range to import. |
| `channels.channels.channel_id` | Required: `string` The Slack channel ID. |
| `channels.channels.start_time` | Optional: `google.protobuf.Timestamp` The starting timestamp for messages to import. |
| `channels.channels.end_time` | Optional: `google.protobuf.Timestamp` The ending timestamp for messages to import. |
| `channels.api_key_config.api_key_secret_version` | Required: `string` The full resource name of the secret that is stored in Secret Manager, which contains a Slack channel access token that has access to the slack channel IDs. See: https://api.slack.com/tutorials/tracks/getting-a-token. Format: `projects/{PROJECT_NUMBER}/secrets/{SECRET_ID}/versions/{VERSION_ID}` |

| `JiraSource` | |
| --- | --- |
| `jira_queries.projects` | Repeated: `string` A list of Jira projects to import in their entirety. |
| `jira_queries.custom_queries` | Repeated: `string` A list of custom Jira queries to import. For information about JQL (Jira Query Language), see [Jira Support](https://support.atlassian.com/jira-service-management-cloud/docs/use-advanced-search-with-jira-query-language-jql/) |
| `jira_queries.email` | Required: `string` The Jira email address. |
| `jira_queries.server_uri` | Required: `string` The Jira server URI. |
| `jira_queries.api_key_config.api_key_secret_version` | Required: `string` The full resource name of the secret that is stored in Secret Manager, which contains Jira API key that has access to the slack channel IDs. See: https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/ Format: `projects/{PROJECT_NUMBER}/secrets/{SECRET_ID}/versions/{VERSION_ID}` |

| `SharePointSources` | |
| --- | --- |
| `share_point_sources.sharepoint_folder_path` | `oneof` in `folder_source`: `string` The path of the SharePoint folder to download from. |
| `share_point_sources.sharepoint_folder_id` | `oneof` in `folder_source`: `string` The ID of the SharePoint folder to download from. |
| `share_point_sources.drive_name` | `oneof` in `drive_source`: `string` The name of the drive to download from. |
| `share_point_sources.drive_id` | `oneof` in `drive_source`: `string` The ID of the drive to download from. |
| `share_point_sources.client_id` | `string` The Application ID for the app registered in Microsoft Azure Portal. The application must also be configured with MS Graph permissions "Files.ReadAll", "Sites.ReadAll" and BrowserSiteLists.Read.All. |
| `share_point_sources.client_secret.api_key_secret_version` | Required: `string` The full resource name of the secret that is stored in Secret Manager, which contains the application secret for the app registered in Azure. Format: `projects/{PROJECT_NUMBER}/secrets/{SECRET_ID}/versions/{VERSION_ID}` |
| `share_point_sources.tenant_id` | `string` Unique identifier of the Azure Active Directory Instance. |
| `share_point_sources.sharepoint_site_name` | `string` The name of the SharePoint site to download from. This can be the site name or the site id. |

| `RagFileParsingConfig` | |
| --- | --- |
| `layout_parser` | `oneof` `parser`: `RagFileParsingConfig.LayoutParser` The Layout Parser to use for `RagFile`s. |
| `layout_parser.processor_name` | `string` The full resource name of a Document AI processor or processor version. Format: `projects/{project_id}/locations/{location}/processors/{processor_id}` `projects/{project_id}/locations/{location}/processors/{processor_id}/processorVersions/{processor_version_id}` |
| `layout_parser.max_parsing_requests_per_min` | `string` The maximum number of requests the job is allowed to make to the Document AI processor per minute. Consult https://cloud.google.com/document-ai/quotas and the Quota page for your project to set an appropriate value here. If unspecified, a default value of 120 QPM is used. |

#### Get a RAG file

This table lists parameters used to get a RAG file.

| Parameters | |
| --- | --- |
| `name` | `string` The name of the `RagFile` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_file_id}` |

#### Delete a RAG file

This table lists parameters used to delete a RAG file.

| Parameters | |
| --- | --- |
| `name` | `string` The name of the `RagFile` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_file_id}` |

### Retrieval and prediction

This section lists the retrieval and prediction parameters.

#### Retrieval parameters

This table lists parameters for `retrieveContexts` API.

| Parameters | |
| --- | --- |
| `parent` | Required: `string` The resource name of the Location to retrieve `RagContexts`. The users must have permission to make a call in the project. Format: `projects/{project}/locations/{location}` |
| `vertex_rag_store` | `VertexRagStore` The data source for Vertex RagStore. |
| `query` | Required: `RagQuery` Single RAG retrieve query. |

##### `VertexRagStore`

| `VertexRagStore` | |
| --- | --- |
| `rag_resources` | list: `RagResource` The representation of the RAG source. It can be used to specify the corpus only or `RagFile`s. Only support one corpus or multiple files from one corpus. |
| `rag_resources.rag_corpus` | Optional: `string` `RagCorpora` resource name. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}` |
| `rag_resources.rag_file_ids` | list: `string` A list of `RagFile` resources. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}/ragFiles/{rag_file}` |

| `RagQuery` | |
| --- | --- |
| `text` | `string` The query in text format to get relevant contexts. |
| `rag_retrieval_config` | Optional: `RagRetrievalConfig` The retrieval configuration for the query. |

| `RagRetrievalConfig` | |
| --- | --- |
| `top_k` | Optional: `int32` The number of contexts to retrieve. |
| `hybrid_search.alpha` | Optional: `float` Alpha value controls the weight between dense and sparse vector search results. The range is [0, 1], where 0 means sparse vector search only and 1 means dense vector search only. The default value is 0.5, which balances sparse and dense vector search equally. Hybrid Search is only available for Weaviate. |
| `filter.vector_distance_threshold` | `oneof vector_db_threshold`: `double` Only returns contexts with a vector distance smaller than the threshold. |
| `filter.vector_similarity_threshold` | `oneof vector_db_threshold`: `double` Only returns contexts with vector similarity larger than the threshold. |
| `ranking.rank_service.model_name` | Optional: `string` The model name of the rank service. Example: `semantic-ranker-512@latest` |
| `ranking.llm_ranker.model_name` | Optional: `string` The model name used for ranking. Example: `gemini-2.0-flash` |

#### Prediction parameters

This table lists prediction parameters.

| `GenerateContentRequest` | |
| --- | --- |
| `tools.retrieval.vertex_rag_store` | `VertexRagStore` Set to use a data source powered by Vertex AI RAG store. |

See [VertexRagStore](#vertex-rag-store) for details.

## Corpus management examples

This section provides examples of how to use the API to manage your RAG corpus.

### Create a RAG corpus example

This code sample demonstrates how to create a RAG corpus.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- CORPUS\_DISPLAY\_NAME: The display name of the `RagCorpus`.
- CORPUS\_DESCRIPTION: The description of the `RagCorpus`.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora
```

Request JSON body:

```python
{
 "display_name" : "CORPUS_DISPLAY_NAME",
 "description": "CORPUS_DESCRIPTION",
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora" | Select-Object -Expand Content
```

You should receive a successful status code (2xx).

The following example demonstrates how to create a RAG corpus by using the REST
API.

```python
 PROJECT_ID: Your project ID.
 LOCATION: The region to process the request.
 CORPUS_DISPLAY_NAME: The display name of the <code>RagCorpus</code>.

```

```python
 // CreateRagCorpus
 // Input: LOCATION, PROJECT_ID, CORPUS_DISPLAY_NAME
 // Output: CreateRagCorpusOperationMetadata
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora \
 -d '{
 "display_name" : "CORPUS_DISPLAY_NAME"
 }'

```

### Update a RAG corpus example

You can update your RAG corpus with a new display name, description, and vector
database configuration. However, you can't change the following
[parameters](#update-a-rag-corpus-params-api) in your RAG corpus:

- The vector database type. For example, you can't change the vector database
 from Weaviate to Vertex AI Feature Store.
- If you're using the managed database option, you can't update the vector
 database configuration.

These examples demonstrate how to update a RAG corpus.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- CORPUS\_ID: The corpus ID of your RAG corpus.
- CORPUS\_DISPLAY\_NAME: The display name of the `RagCorpus`.
- CORPUS\_DESCRIPTION: The description of the `RagCorpus`.
- INDEX\_NAME: The resource name of the `Vector Search Index`. Format: `projects/{project}/locations/{location}/indexes/{index}`
- INDEX\_ENDPOINT\_NAME: The resource name of the `Vector Search Index Endpoint`. Format: `projects/{project}/locations/{location}/indexEndpoints/{index_endpoint}`

HTTP method and URL:

```python
PATCH https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/CORPUS_ID
```

Request JSON body:

```python
{
 "display_name" : "CORPUS_DISPLAY_NAME",
 "description": "CORPUS_DESCRIPTION",
 "rag_vector_db_config": {
 "vertex_vector_search": {
 "index": "INDEX_NAME",
 "index_endpoint": "INDEX_ENDPOINT_NAME",
 }
 }
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
curl -X PATCH \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/CORPUS_ID"
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
 -Method PATCH ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/CORPUS_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx).

### List RAG corpora example

This code sample demonstrates how to list all of the RAG corpora.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- PAGE\_SIZE: The standard list page size. You may adjust the number of `RagCorpora` to return per page by updating the `page_size` parameter.
- PAGE\_TOKEN: The standard list page token. Obtained typically using `ListRagCorporaResponse.next_page_token` of the previous `VertexRagDataService.ListRagCorpora` call.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora?page_size=PAGE_SIZE&page_token=PAGE_TOKEN
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora?page_size=PAGE_SIZE&page_token=PAGE_TOKEN"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora?page_size=PAGE_SIZE&page_token=PAGE_TOKEN" | Select-Object -Expand Content
```

You should receive a successful status code (`2xx`) and a list of `RagCorpora` under the given `PROJECT_ID`.

### Get a RAG corpus example

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- RAG\_CORPUS\_ID: The ID of the `RagCorpus` resource.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID" | Select-Object -Expand Content
```

A successful response returns the `RagCorpus` resource.

The `get` and `list` commands are used in an example to demonstrate how
`RagCorpus` uses the `rag_embedding_model_config` field with in the `vector_db_config`, which points to the
embedding model you have chosen.

```python
 PROJECT_ID: Your project ID.
 LOCATION: The region to process the request.
 RAG_CORPUS_ID: The corpus ID of your RAG corpus.

```

```python
// GetRagCorpus
// Input: LOCATION, PROJECT_ID, RAG_CORPUS_ID
// Output: RagCorpus
curl -X GET \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID

// ListRagCorpora
curl -sS -X GET \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/

```

### Delete a RAG corpus example

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- RAG\_CORPUS\_ID: The ID of the `RagCorpus` resource.

HTTP method and URL:

```python
DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID" | Select-Object -Expand Content
```

A successful response returns the `DeleteOperationMetadata`.

## File management examples

This section provides examples of how to use the API to manage RAG files.

### Upload a RAG file example

### REST

Before using any of the request data, make the following replacements:

```python
 PROJECT_ID: Your project ID.
 LOCATION: The region to process the request.
 RAG_CORPUS_ID: The corpus ID of your RAG corpus.
 LOCAL_FILE_PATH: The local path to the file to be uploaded.
 DISPLAY_NAME: The display name of the RAG file.
 DESCRIPTION: The description of the RAG file.

```

To send your request, use the following command:

```python
 curl -X POST \
 -H "X-Goog-Upload-Protocol: multipart" \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -F metadata="{'rag_file': {'display_name':' DISPLAY_NAME', 'description':'DESCRIPTION'}}" \
 -F file=@LOCAL_FILE_PATH \
 "https://LOCATION-aiplatform.googleapis.com/upload/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:upload"

```

### Import RAG files example

Files and folders can be imported from Drive or
Cloud Storage.

The `response.skipped_rag_files_count` refers to the number of files that
were skipped during import. A file is skipped when the following conditions are
met:

1. The file has already been imported.
2. The file hasn't changed.
3. The chunking configuration for the file hasn't changed.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- RAG\_CORPUS\_ID: The ID of the `RagCorpus` resource.
- GCS\_URIS: A list of Cloud Storage locations. Example: `gs://my-bucket1, gs://my-bucket2`.
- CHUNK\_SIZE: Optional: Number of tokens each chunk should have.
- CHUNK\_OVERLAP: Optional: Number of tokens overlap between chunks.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import
```

Request JSON body:

```python
{
 "import_rag_files_config": {
 "gcs_source": {
 "uris": "GCS_URIS"
 },
 "rag_file_chunking_config": {
 "chunk_size": CHUNK_SIZE,
 "chunk_overlap": CHUNK_OVERLAP
 }
 }
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import" | Select-Object -Expand Content
```

A successful response returns the `ImportRagFilesOperationMetadata` resource.

The following sample demonstrates how to import a file from
Cloud Storage. Use the `max_embedding_requests_per_min` control field
to limit the rate at which RAG Engine calls the embedding model during the
`ImportRagFiles` indexing process. The field has a default value of `1000` calls
per minute.

```python
 PROJECT_ID: Your project ID.
 LOCATION: The region to process the request.
 RAG_CORPUS_ID: The corpus ID of your RAG corpus.
 GCS_URIS: A list of Cloud Storage locations. Example: gs://my-bucket1.
 CHUNK_SIZE: Number of tokens each chunk should have.
 CHUNK_OVERLAP: Number of tokens overlap between chunks.
 EMBEDDING_MODEL_QPM_RATE: The QPM rate to limit RAGs access to your embedding model. Example: 1000.

```

```python
// ImportRagFiles
// Import a single Cloud Storage file or all files in a Cloud Storage bucket.
// Input: LOCATION, PROJECT_ID, RAG_CORPUS_ID, GCS_URIS
// Output: ImportRagFilesOperationMetadataNumber
// Use ListRagFiles to find the server-generated rag_file_id.
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import \
-d '{
 "import_rag_files_config": {
 "gcs_source": {
 "uris": "GCS_URIS"
 },
 "rag_file_chunking_config": {
 "chunk_size": CHUNK_SIZE,
 "chunk_overlap": CHUNK_OVERLAP
 },
 "max_embedding_requests_per_min": EMBEDDING_MODEL_QPM_RATE
 }
}'

// Poll the operation status.
// The response contains the number of files imported.
OPERATION_ID: The operation ID you get from the response of the previous command.
poll_op_wait OPERATION_ID

```

The following sample demonstrates how to import a file from
Drive. Use the `max_embedding_requests_per_min` control field to
limit the rate at which RAG Engine calls the embedding model during the
`ImportRagFiles` indexing process. The field has a default value of `1000` calls
per minute.

```python
 PROJECT_ID: Your project ID.
 LOCATION: The region to process the request.
 RAG_CORPUS_ID: The corpus ID of your RAG corpus.
 FOLDER_RESOURCE_ID: The resource ID of your Google Drive folder.
 CHUNK_SIZE: Number of tokens each chunk should have.
 CHUNK_OVERLAP: Number of tokens overlap between chunks.
 EMBEDDING_MODEL_QPM_RATE: The QPM rate to limit RAGs access to your embedding model. Example: 1000.

```

```python
// ImportRagFiles
// Import all files in a Google Drive folder.
// Input: LOCATION, PROJECT_ID, RAG_CORPUS_ID, FOLDER_RESOURCE_ID
// Output: ImportRagFilesOperationMetadataNumber
// Use ListRagFiles to find the server-generated rag_file_id.
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles:import \
-d '{
 "import_rag_files_config": {
 "google_drive_source": {
 "resource_ids": {
 "resource_id": "FOLDER_RESOURCE_ID",
 "resource_type": "RESOURCE_TYPE_FOLDER"
 }
 },
 "max_embedding_requests_per_min": EMBEDDING_MODEL_QPM_RATE
 }
}'

// Poll the operation status.
// The response contains the number of files imported.
OPERATION_ID: The operation ID you get from the response of the previous command.
poll_op_wait OPERATION_ID

```

### List RAG files example

This code sample demonstrates how to list RAG files.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- RAG\_CORPUS\_ID: The ID of the `RagCorpus` resource.
- PAGE\_SIZE: The standard list page size. You may adjust the number of `RagFiles` to return per page by updating the `page_size` parameter.
- PAGE\_TOKEN: The standard list page token. Obtained typically using `ListRagFilesResponse.next_page_token` of the previous `VertexRagDataService.ListRagFiles` call.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles?page_size=PAGE_SIZE&page_token=PAGE_TOKEN
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles?page_size=PAGE_SIZE&page_token=PAGE_TOKEN"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles?page_size=PAGE_SIZE&page_token=PAGE_TOKEN" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) along with a list of `RagFiles` under the given `RAG_CORPUS_ID`.

### Get a RAG file example

This code sample demonstrates how to get a RAG file.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- RAG\_CORPUS\_ID: The ID of the `RagCorpus` resource.
- RAG\_FILE\_ID: The ID of the `RagFile` resource.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID" | Select-Object -Expand Content
```

A successful response returns the `RagFile` resource.

### Delete a RAG file example

This code sample demonstrates how to delete a RAG file.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- RAG\_CORPUS\_ID: The ID of the `RagCorpus` resource.
- RAG\_FILE\_ID: The ID of the `RagFile` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}/ragFiles/{rag_file_id}`.

HTTP method and URL:

```python
DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_ID/ragFiles/RAG_FILE_ID" | Select-Object -Expand Content
```

A successful response returns the `DeleteOperationMetadata` resource.

### Retrieval query

When a user asks a question or provides a prompt, the retrieval component in RAG searches through its knowledge base to find information that is relevant to the query.

### REST

Before using any of the request data,
make the following replacements:

- LOCATION: The region to process the request.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- RAG\_CORPUS\_RESOURCE: The name of the `RagCorpus` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- VECTOR\_DISTANCE\_THRESHOLD: Only contexts with a vector distance smaller than the threshold are returned.
- TEXT: The query text to get relevant contexts.
- SIMILARITY\_TOP\_K: The number of top contexts to retrieve.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts
```

Request JSON body:

```python
{
 "vertex_rag_store": {
 "rag_resources": {
 "rag_corpus": "RAG_CORPUS_RESOURCE"
 },
 "vector_distance_threshold": VECTOR_DISTANCE_THRESHOLD
 },
 "query": {
 "text": "TEXT",
 "similarity_top_k": SIMILARITY_TOP_K
 }
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and a list of related `RagFiles`.

### Generation

The LLM generates a grounded response using the retrieved contexts.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- MODEL\_ID: LLM model for content generation. Example: `gemini-2.0-flash-001`
- GENERATION\_METHOD: LLM method for content generation. Options: `generateContent`, `streamGenerateContent`
- INPUT\_PROMPT: The text sent to the LLM for content generation. Try to use a prompt relevant to the uploaded rag Files.
- RAG\_CORPUS\_RESOURCE: The name of the `RagCorpus` resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- SIMILARITY\_TOP\_K: Optional: The number of top contexts to retrieve.
- VECTOR\_DISTANCE\_THRESHOLD: Optional: Contexts with a vector distance smaller than the threshold are returned.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATION_METHOD
```

Request JSON body:

```python
{
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
 "similarity_top_k": SIMILARITY_TOP_K,
 "vector_distance_threshold": VECTOR_DISTANCE_THRESHOLD
 }
 }
 }
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATION_METHOD"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATION_METHOD" | Select-Object -Expand Content
```

A successful response returns the generated content with citations.

## What's next

- To learn more about supported generation models, see
 [Generative AI models that support RAG](https://cloud.google.com/vertex-ai/generative-ai/docs/supported-rag-models).
- To learn more about supported embedding models,
 see [Embedding models](https://cloud.google.com/vertex-ai/generative-ai/docs/use-embedding-models#supported-embedding-models).
- To learn more about open models, see
 [Open models](https://cloud.google.com/vertex-ai/generative-ai/docs/use-embedding-models#use-oss-embedding-models).
- To learn more about RAG Engine, see
 [RAG Engine overview](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview).