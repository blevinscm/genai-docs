---
title: Vertex-AI-RAG-Engine-overviewgoogle.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview
date_scraped: 2025-05-12
---

# Vertex AI RAG Engine overview 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

This page describes what Vertex AI RAG Engine is and how it
works.

## Overview

Vertex AI RAG Engine, a component of the Vertex AI
Platform, facilitates Retrieval-Augmented Generation (RAG).
Vertex AI RAG Engine is also a data framework for developing
context-augmented large language model (LLM) applications. Context augmentation
occurs when you apply an LLM to your data. This implements retrieval-augmented
generation (RAG).

A common problem with LLMs is that they don't understand private knowledge, that
is, your organization's data. With Vertex AI RAG Engine, you can
enrich the LLM context with additional private information, because the model
can reduce hallucination and answer questions more accurately.

By combining additional knowledge sources with the existing knowledge that LLMs
have, a better context is provided. The improved context along with the query
enhances the quality of the LLM's response.

The following image illustrates the key concepts to understanding
Vertex AI RAG Engine.

These concepts are listed in the order of the retrieval-augmented generation
(RAG) process.

1. **Data ingestion**: Intake data from different data sources. For example,
 local files, Cloud Storage, and Google Drive.
2. [**Data transformation**](https://cloud.google.com/vertex-ai/generative-ai/docs/fine-tune-rag-transformations):
 Conversion of the data in preparation for indexing. For example, data is
 split into chunks.
3. [**Embedding**](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings): Numerical
 representations of words or pieces of text. These numbers capture the
 semantic meaning and context of the text. Similar or related words or text
 tend to have similar embeddings, which means they are closer together in the
 high-dimensional vector space.
4. **Data indexing**: Vertex AI RAG Engine creates an index called a [corpus](https://cloud.google.com/vertex-ai/generative-ai/docs/manage-your-rag-corpus#corpus-management).
 The index structures the knowledge base so it's optimized for searching. For
 example, the index is like a detailed table of contents for a massive
 reference book.
5. **Retrieval**: When a user asks a question or provides a prompt, the retrieval
 component in Vertex AI RAG Engine searches through its knowledge
 base to find information that is relevant to the query.
6. **Generation**: The retrieved information becomes the context added to the
 original user query as a guide for the generative AI model to generate
 factually [grounded](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview) and relevant responses.

## Supported regions

Vertex AI RAG Engine is supported in the following regions:

| Region | Location | Description | Launch stage |
| --- | --- | --- | --- |
| `europe-west3` | Frankfurt, Germany | `v1` and `v1beta1` versions are supported. | GA |
| `us-central1` | Iowa | `v1` and `v1beta1` versions are supported. | GA |

## Submit feedback

To chat with Google support, go to the [Vertex AI RAG Engine
support
group](https://groups.google.com/a/google.com/g/vertex-ai-rag-engine-support).

To send an email, use the email address
`vertex-ai-rag-engine-support@google.com`.

## What's next

- To learn how to use the Vertex AI SDK to run
 Vertex AI RAG Engine tasks, see [RAG quickstart for
 Python](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-quickstart).
- To learn about grounding, see [Grounding
 overview](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview).
- To learn more about the responses from RAG, see [Retrieval and Generation Output of Vertex AI RAG Engine](../model-reference/rag-output-explained.md).
- To learn about the RAG architecture:
 - [Infrastructure for a RAG-capable generative AI application using Vertex AI and Vector Search](https://cloud.google.com/architecture/gen-ai-rag-vertex-ai-vector-search)
 - [Infrastructure for a RAG-capable generative AI application using Vertex AI and AlloyDB for PostgreSQL](https://cloud.google.com/architecture/rag-capable-gen-ai-app-using-vertex-ai).