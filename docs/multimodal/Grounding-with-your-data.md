---
title: Grounding-with-your-datagoogle.com/vertex-ai/generative-ai/docs/multimodal/ground-with-your-data
date_scraped: 2025-05-12
---

# Grounding with your data 

This page explains how you can ground responses by using your data from
Vertex AI Search.

## Grounding Gemini to your data

If you want to do retrieval-augmented generation (RAG), connect your model to
your website data or your sets of documents, then use [Grounding with
Vertex AI Search](#prerequisites).

Grounding to your data supports a maximum of 10 Vertex AI Search
data sources and can be combined with [Grounding with
Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/ground-with-google-search).

## Supported models

This section lists the models that support grounding with your data.

- [Vertex AI Model Optimizer](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/vertex-ai-model-optimizer)
- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)

## Prerequisites

Before you can ground model output to your data, do the following:

1. In the Google Cloud console, go to the **IAM** page, and search for the
 `discoveryengine.servingConfigs.search` permission, which is required for the
 grounding service to work.

 [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
2. [Enable AI Applications](#enable) and activate the API.
3. [Create a AI Applications data source](#create-data-store) and
 application.

See the [Introduction to Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction) for more.

### Enable AI Applications

1. In the Google Cloud console, go to the **AI Applications** page.

 [AI Applications](https://console.cloud.google.com/gen-app-builder/engines)
2. Read and agree to the terms of service, then click **Continue and activate
 the API**.

 **Important:** You must accept the discovery solutions data use terms for every
 project that you want to use AI Applications with.

AI Applications is available in the `global` location, or the `eu` and `us` multi-region. To
learn more, see [AI Applications locations](https://cloud.google.com/generative-ai-app-builder/docs/locations#multi-regions)

### Create a data store in AI Applications

To create a data store in AI Applications, you can choose to
ground with website data or documents.

### Website

1. Open the [**Create Data
 Store**](https://console.cloud.google.com/gen-app-builder/data-stores/create) page from the Google Cloud console.
2. In **Website Content** box, click **Select**. 
 **Specify the
 websites for your data store** pane displays.
3. If **Advanced website indexing** isn't checked, then select the **Advanced
 website indexing** checkbox to turn it on. 
 **Configure your data store**
 pane displays.
4. In the **Specify URL patterns to index** section, do the following:

 - Add URLs for **Sites to include**.
 - Optional: Add URLs for **Sites to exclude**.
5. Click **Continue**.
6. In the **Configure your data store** pane,

 1. Select a value from the **Location of your data store** list.
 2. Enter a name in the **Your data store name** field. The ID is
 generated. Use this ID when you generate your grounded responses with
 your data store. For more information, see [Generate grounded responses
 with your data store](#generate-grounded-responses-with-data-store).
 3. Click **Create**.

### Documents

1. Open the [**Create Data
 Store**](https://console.cloud.google.com/gen-app-builder/data-stores/create) page from the Google Cloud console.
2. In **Cloud Storage** box, click **Select**. 
 **Import data from
 Cloud Storage** pane displays.
3. In the **Unstructured documents (PDF, HTML, TXT and more)** section, select
 **Unstructured documents (PDF, HTML, TXT and more)**.
4. Select a **Synchronization frequency** option.
5. Select a **Select a folder or a file you want to import** option, and
 enter the path in the field.
6. Click **Continue**. 
 **Configure your data store** pane displays.
7. In the **Configure your data store** pane,

 1. Select a value from the **Location of your data store** list.
 2. Enter a name in the **Your data store name** field. The ID is
 generated.
 3. To select parsing and chunking options for your documents, expand the
 **Document Processing Options** section. For more information about
 different parsers, see [Parse
 documents](https://cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents#parsing).
 4. Click **Create**.
8. Click **Create**.

## Generate grounded responses with your data store

Use the following instructions to ground a model with your data. A maximum
of 10 data stores is supported.

If you don't know your data store ID, follow these steps:

1. In the Google Cloud console, go to the **AI Applications** page and
 in the navigation menu, click **Data stores**.

 [Go to the Data stores page](https://console.cloud.google.com/gen-app-builder/data-stores)
2. Click the name of your data store.
3. On the **Data** page for your data store, get the data store ID.

### Console

To ground your model output to AI Applications by using Vertex AI Studio in the
Google Cloud console, follow these steps:

1. In the Google Cloud console, go to the **Vertex AI Studio Freeform**
 page.

 [Go to
 Freeform](https://console.cloud.google.com/vertex-ai/studio/freeform)
2. To turn on grounding, click the **Grounding: your data** toggle.
3. Click **Customize**.
 1. Select **Vertex AI Search** as your source.
 2. Using this path format, replace your data store's Project ID and
 the ID of the data store: 

 projects/project\_id/locations/global/collections/default\_collection/dataStores/data\_store\_id.
4. Click **Save**.
5. Enter your prompt in the text box, and click **Submit**.

Your prompt responses are grounded to AI Applications.

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
from google import genai
from google.genai.types import (
 GenerateContentConfig,
 HttpOptions,
 Retrieval,
 Tool,
 VertexAISearch,
)

client = genai.Client(http_options=HttpOptions(api_version="v1"))

# Load Data Store ID from Vertex AI Search
# datastore = "projects/111111111111/locations/global/collections/default_collection/dataStores/data-store-id"

response = client.models.generate_content(
 model="gemini-2.0-flash-001",
 contents="How do I make an appointment to renew my driver's license?",
 config=GenerateContentConfig(
 tools=[
 # Use Vertex AI Search Tool
 Tool(
 retrieval=Retrieval(
 vertex_ai_search=VertexAISearch(
 datastore=datastore,
 )
 )
 )
 ],
 ),
)

print(response.text)
# Example response:
# 'The process for making an appointment to renew your driver's license varies depending on your location. To provide you with the most accurate instructions...'
```

### REST

To test a text prompt by using the Vertex AI API, send a POST request to the
publisher model endpoint.

Before using any of the request data,
make the following replacements:

- LOCATION: The region to process the request.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_ID: The model ID of the multimodal model.
- TEXT:
 The text instructions to include in the prompt.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent
```

Request JSON body:

```python
{
 "contents": [{
 "role": "user",
 "parts": [{
 "text": "TEXT"
 }]
 }],
 "tools": [{
 "retrieval": {
 "vertexAiSearch": {
 "datastore": projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID
 }
 }
 }],
 "model": "projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID"
}

```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"
```

#### PowerShell (Windows)

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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```python
{
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": "You can make an appointment on the website https://dmv.gov/"
 }
 ]
 },
 "finishReason": "STOP",
 "safetyRatings": [
 "..."
 ],
 "groundingMetadata": {
 "retrievalQueries": [
 "How to make appointment to renew driving license?"
 ],
 "groundingChunks": [
 {
 "retrievedContext": {
 "uri": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AXiHM.....QTN92V5ePQ==",
 "title": "dmv"
 }
 }
 ],
 "groundingSupport": [
 {
 "segment": {
 "startIndex": 25,
 "endIndex": 147
 },
 "segment_text": "ipsum lorem ...",
 "supportChunkIndices": [1, 2],
 "confidenceScore": [0.9541752, 0.97726375]
 },
 {
 "segment": {
 "startIndex": 294,
 "endIndex": 439
 },
 "segment_text": "ipsum lorem ...",
 "supportChunkIndices": [1],
 "confidenceScore": [0.9541752, 0.9325467]
 }
 ]
 }
 }
 ],
 "usageMetadata": {
 "..."
 }
}

```

## Understand your response

The response from both APIs include the LLM-generated text, which is called a
*candidate*. If your model prompt successfully grounds to your Elasticsearch
data source, then the responses include grounding metadata, which identifies the
parts of the response that were derived from your Elasticsearch data. However,
there are several reasons this metadata might not be provided, and the prompt
response won't be grounded. These reasons include low-source relevance or
incomplete information within the model's response.

The following is a breakdown of the output data:

- **Role**: Indicates the sender of the grounded answer. Because the response
 always contains grounded text, the role is always `model`.
- **Text**: The grounded answer generated by the LLM.
- **Grounding metadata**: Information about the grounding source, which contains
 the following elements:
 - **Grounding chunks**: A list of results from your Elasticsearch index that
 support the answer.
 - **Grounding supports**: Information about a specific claim within the answer
 that can be used to show citations:
 - **Segment**: The part of the model's answer that is substantiated by a
 grounding chunk.
 - **Grounding chunk index**: The index of the grounding chunks in the
 grounding chunks list that corresponds to this claim.
 - **Confidence scores**: A number from 0 to 1 that indicates how grounded
 the claim is in the provided set of grounding chunks.

## What's next

- To learn how to send chat prompt requests, see
 [Multiturn chat](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-chat-prompts-gemini).
- To learn about responsible AI best practices and Vertex AI's safety filters,
 see [Safety best practices](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).