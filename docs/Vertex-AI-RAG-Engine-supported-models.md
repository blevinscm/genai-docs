---
date_scraped: 2025-05-12
title: Vertex AI Rag Engine Supported Models
---

# Vertex AI RAG Engine supported models 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

This page lists Gemini models, self-deployed models, and models with
managed APIs on Vertex AI that support Vertex AI RAG Engine.

## Gemini models

The following table lists the Gemini models and their versions that
support Vertex AI RAG Engine:

- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](models/gemini/2-0-flash.md)

## Self-deployed models

Vertex AI RAG Engine supports all models in
[Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models).

Use Vertex AI RAG Engine with your self-deployed open model endpoints.

Replace the variables used in the code sample:

- **PROJECT\_ID**: Your project ID.
- **LOCATION**: The region to process your request.
- **ENDPOINT\_ID**: Your endpoint ID.

 ```python
 # Create a model instance with your self-deployed open model endpoint
 rag_model = GenerativeModel(
 "projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID",
 tools=[rag_retrieval_tool]
 )

 ```

## Models with managed APIs on Vertex AI

The models with managed APIs on Vertex AI that support
Vertex AI RAG Engine include the following:

- [Mistral on Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/mistral)
- [Llama 3.1 and 3.2](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/llama)

The following code sample demonstrates how to use the Gemini
`GenerateContent` API to create a generative model instance. The model ID,
`/publisher/meta/models/llama-3.1-405B-instruct-maas`, is found in the
[model card](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models).

Replace the variables used in the code sample:

- **PROJECT\_ID**: Your project ID.
- **LOCATION**: The region to process your request.
- **RAG\_RETRIEVAL\_TOOL**: Your RAG retrieval tool.

 ```python
 # Create a model instance with Llama 3.1 MaaS endpoint
 rag_model = GenerativeModel(
 "projects/PROJECT_ID/locations/LOCATION/publisher/meta/models/llama-3.1-405B-instruct-maas",
 tools=RAG_RETRIEVAL_TOOL
 )

 ```

The following code sample demonstrates how to use the OpenAI compatible
`ChatCompletions` API to generate a model response.

Replace the variables used in the code sample:

- **PROJECT\_ID**: Your project ID.
- **LOCATION**: The region to process your request.
- **MODEL\_ID**: LLM model for content generation. For
 example, `meta/llama-3.1-405b-instruct-maas`.
- **INPUT\_PROMPT**: The text sent to the LLM for content
 generation. Use a prompt relevant to the documents in
 Vertex AI Search.
- **RAG\_CORPUS\_ID**: The ID of the RAG corpus resource.
- **ROLE**: Your role.
- **USER**: Your username.
- **CONTENT**: Your content.

 ```python
 # Generate a response with Llama 3.1 MaaS endpoint
 response = client.chat.completions.create(
 model="MODEL_ID",
 messages=[{"ROLE": "USER", "content": "CONTENT"}],
 extra_body={
 "extra_body": {
 "google": {
 "vertex_rag_store": {
 "rag_resources": {
 "rag_corpus": "RAG_CORPUS_ID"
 },
 "similarity_top_k": 10
 }
 }
 }
 },
 )

 ```

## What's next

- [Use Embedding models with Vertex AI RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/use-embedding-models).