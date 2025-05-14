---
date_scraped: 2025-05-12
title: Manage Your Rag Knowledge Base Corpus
---

# Manage your RAG knowledge base (corpus) 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

This page describes how you can manage your corpus for RAG tasks by performing
corpus management and file management.

## Corpus management

A corpus, also referred to as an index, is a collection of documents or source
of information. The corpus can be queried to retrieve relevant contexts for
response generation. When creating a corpus for the first time, the process
might take an additional minute.

The following corpus operations are supported:

| Operation | Description | Parameters | Examples |
| --- | --- | --- | --- |
| Create a RAG corpus. | Create an index to import or upload documents. | [Create parameters v1beta1](model-reference/rag-api.md) [Create parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#create-a-rag-corpus-params-api) | [Create example v1beta1](model-reference/rag-api.md) [Create example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#create-a-rag-corpus-example-api) |
| Update a RAG corpus. | Update a previously-created index to import or upload documents. | [Update parameters v1beta1](model-reference/rag-api.md) [Update parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#update-a-rag-corpus-params-api) | [Update example v1beta1](model-reference/rag-api.md) [Update example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#update-a-rag-corpus-example-api) |
| List a RAG corpus. | List all of the indexes. | [List parameters v1beta1](model-reference/rag-api.md) [List parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#list-rag-corpora-params-api) | [List example v1beta1](model-reference/rag-api.md) [List example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#list-rag-corpora-example-api) |
| Get a RAG corpus. | Get the metadata describing the index. | [Get parameters v1beta1](model-reference/rag-api.md) [Get parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#get-a-rag-corpus-params-api) | [Get example v1beta1](model-reference/rag-api.md) [Get example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#get-a-rag-corpus-example-api) |
| Delete a RAG corpus. | Delete the index. | [Delete parameters v1beta1](model-reference/rag-api.md) [Delete parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#delete-a-rag-corpus-params-api) | [Delete example v1beta1](model-reference/rag-api.md) [Delete example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#delete-a-rag-corpus-example-api) |

Concurrent operations on corpora aren't supported. For more information, see the
[RAG API reference for v1beta1](model-reference/rag-api.md) or [RAG API reference for v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1).

### File management

The following file operations are supported:

| Operation | Description | Parameters | Examples |
| --- | --- | --- | --- |
| Upload a RAG file. | Upload a file from local storage with additional information that provides context to the LLM to generate more accurate responses. | [Upload parameters v1beta1](model-reference/rag-api.md) [Upload parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#upload-a-rag-file-params-api) | [Upload example v1beta1](model-reference/rag-api.md) [Upload example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#upload-a-rag-file-example-api) |
| Import RAG files. | Import a set of files from some other storage into a storage location. | [Import parameters v1beta1](model-reference/rag-api.md) [Import parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#import-rag-files-params-api) | [Import example v1beta1](model-reference/rag-api.md) [Import example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#import-rag-files-example-api) |
| Get a RAG file. | Get details about a RAG file for use by the LLM. | [Get parameters v1beta1](model-reference/rag-api.md) [Get parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#get-a-rag-file-params-api) | [Get example v1beta1](model-reference/rag-api.md) [Get example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#get-a-rag-file-example-api) |
| Delete a RAG file. | Delete a file from the index. | [Delete parameters v1beta1](model-reference/rag-api.md) [Delete parameters v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#delete-a-rag-file-params-api) | [Delete example v1beta1](model-reference/rag-api.md) [Delete example v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1#delete-a-rag-file-example-api) |

For more information, see the
[RAG API reference for v1beta1](model-reference/rag-api.md) or [RAG API reference for v1](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/rag-api-v1).

## What's next

- [Vertex AI RAG Engine quotas](quotas.md)