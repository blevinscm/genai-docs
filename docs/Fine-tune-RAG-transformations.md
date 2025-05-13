---
title: Fine-tune-RAG-transformationsgoogle.com/vertex-ai/generative-ai/docs/fine-tune-rag-transformations
date_scraped: 2025-05-12
---

# Fine-tune RAG transformations 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

After a document is ingested, Vertex AI RAG Engine runs a set of transformations to
prepare the data for indexing. You can control your use cases using the
following parameters:

| Parameter | Description |
| --- | --- |
| `chunk_size` | When documents are ingested into an index, they are split into chunks. The `chunk_size` parameter (in tokens) specifies the size of the chunk. The default chunk size is 1,024 tokens. |
| `chunk_overlap` | By default, documents are split into chunks with a certain amount of overlap to improve relevance and retrieval quality. The default chunk overlap is 200 tokens. |

A smaller chunk size means the embeddings are more precise. A larger chunk size
means that the embeddings might be more general but might miss specific details.

For example, if you convert 1,000 words into an embedding array that was meant
for 200 words, you might lose details. The embedding capacity is fixed for each
chunk. A large chunk of text might not fit into a small-window model.

## What's next

- Use [Document AI layout parser with Vertex AI RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/layout-parser-integration).