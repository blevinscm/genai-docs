---
title: Ground-responses-using-RAGgoogle.com/vertex-ai/generative-ai/docs/grounding/ground-responses-using-rag
date_scraped: 2025-05-12
---

# Ground responses using RAG 

Grounding is a technique that you can use to help produce model responses that
are more trustworthy, helpful, and factual. When you ground generative AI model
responses, you connect them to verifiable sources of information. To implement
grounding, usually, you must retrieve relevant source data. The
recommended best practice is to use the retrieval-augmented generation (RAG)
technique. Retrieval is usually done using a search engine, which uses an index
that's embedded with the semantic meanings of the source text.

There are also services and component APIs that implement the RAG lifecycle,
such as the Vertex AI Search Builder API, which allows for mix-and-match
building. With mix-and-match building, you can implement a RAG solution using
any of the following services or APIs:

- **Grounding generation API**: You can use it to implement grounding, or link
 to a retrieval provider for the complete RAG lifecycle.
- **Document layout parser**: This parser represents the best of
 Document AI and Gemini for document understanding.
- **Vertex AI Vector Search**: This search service is
 highly performant and uses a high-quality vector database.
- **Check grounding API**: This API compares RAG output with the retrieved facts
 and helps to ensure that all statements are grounded before returning the
 response to the user.

## What's next

- To learn more about responsible AI and safety filters, see
 [responsible AI best practices and Vertex AI's safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).
- To learn more about how RAG is implemented by RAG Engine, see
 [RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview).