---
date_scraped: 2025-05-12
title: Vector Database Choices In Vertex Ai Rag Engine
---

# Vector database choices in Vertex AI RAG Engine 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

This page introduces you to your choices of a supported vector database on
Vertex AI RAG Engine. You can also see how to connect a vector database (vector
store) to your RAG corpus.

A common problem with LLMs is that they don't understand private knowledge, that
is, your organization's data. With Vertex AI RAG Engine, you can enrich the LLM
context with additional private information, because the model can reduce
hallucination and answer questions more accurately.

Vector databases play a crucial role in enabling retrieval for RAG applications.
Vector databases offer a specialized way to store and query vector embeddings,
which are mathematical representations of text or other data that capture
semantic meaning and relationships. Vector embeddings allow RAG systems to
quickly and accurately find the most relevant information within a vast
knowledge base, even when dealing with complex or nuanced queries. When combined
with an embedding model, vector databases can help overcome the limitations of
LLMs, and provide more accurate, relevant, and comprehensive responses.

## Supported vector databases

When creating a RAG corpus, Vertex AI RAG Engine offers `RagManagedDb` as the default
choice of a vector database, which requires no additional provisioning or
managing. For Vertex AI RAG Engine to automatically create and manage the vector
database for you, see [Create a RAG
corpus](model-reference/rag-api.md).

In addition to the default `RagManagedDb`, Vertex AI RAG Engine lets you provision
and bring your vector database for use within your RAG corpus. In this case,
you are responsible for the lifecycle and scalability of your vector database.

## Compare vector database options

This table lists your choices of vector databases that are supported within
Vertex AI RAG Engine and provides links to pages that explain how to use the vector
databases within your RAG corpus.

To identify which vector database meets your needs, use this table to compare
the vector-database options:

| Vector database | Description | Benefits | Disadvantages | Supported distance metrics in Vertex AI RAG Engine | Search type | Launch stage in Vertex AI RAG Engine | Production ready | Best for |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `RagManagedDb (default)` | `RagManagedDb` is a regionally-distributed scalable database service that offers consistency and high availability. `RagManagedDb` can be used for a vector search. | - No setup required. Good for a quickstart and small-scale use cases. - Consistent and high availability. - Low latency. - Excellent for transactional workloads. | - Capacity is intentionally limited. - Not recommended for large-scale use cases. | `cosine` | KNN | Preview | | - Quick PoC - ChatBots - RAG apps |
| [Vector Search](rag-engine/use-vertexai-vector-search.md) | Vector Search is the vector database service within Vertex AI. Vector Search is optimized for machine-learning tasks and integrates with other Google Cloud services. | - Vector Search integrates with Vertex AI and other Google Cloud services. - Scalability and reliability are supported by Google Cloud infrastructure. - Uses pay-as-you-go pricing. | - Eventually consistent, which means that updates don't reflect immediately. - New service with evolving features. - Vendor lock-in with Google Cloud. - Can be costly depending on your use cases. | `cosine` `dot-product` | ANN | GA | | - High-volume documents - Enterprise-scale RAG - Managing vector database infrastructure - Existing Google Cloud customers or anyone looking to use multiple Google Cloud services |
| [Vertex AI Feature Store](https://cloud.google.com/vertex-ai/generative-ai/docs/use-feature-store-with-rag) | Vertex AI Feature Store is a managed service for organizing, storing, and serving machine-learning features. Vertex AI Feature Store is optimized for machine-learning tasks and integrates with other Google Cloud services. | - Vertex AI Feature Store integrates with Vertex AI and other Google Cloud services. - Scalability and reliability are supported by Google Cloud infrastructure. - Leverages existing BigQuery infrastructure as the Vertex AI Feature Store, which provides a cost-effective and scalable solution. | - Only after the manual synchronization is performed, the changes are available in the online store. - Vendor lock-in with Google Cloud. | `cosine` `dot-product` `L2 squared` | ANN | Preview | | - High-volume documents - Enterprise-scale RAG - Managing vector database infrastructure - Existing Google Cloud customers or customers looking to use multiple Google Cloud services |
| [Weaviate](https://cloud.google.com/vertex-ai/generative-ai/docs/use-weaviate-db) | Weaviate is an open-source vector database with a focus on flexibility and modularity. Weaviate supports various data types and offers built-in graph capabilities. | - Weaviate provides open source and a vibrant community. - Highly flexible and customizable. - Supports diverse data types and modules for different modalities, such as text and images. - Can choose among Cloud providers, such as Google Cloud, AWS, and Azure. | - Eventually consistent, which means that updates don't reflect immediately. - Can be more complex to set up and manage. - Performance can vary depending on the configuration. | `cosine` `dot-product` `L2 squared` `hamming` `manhattan` | ANN + Hybrid search support | Preview | | - High-volume documents - Enterprise-scale RAG - Managing vector database infrastructure - Existing Weaviate customers |
| [Pinecone](https://cloud.google.com/vertex-ai/generative-ai/docs/use-pinecone) | Pinecone is a fully-managed cloud-native vector database designed for a high-performance similarity search. | - Get started quickly. - Excellent scalability and performance. - Focus on vector search with advanced features like filtering and a metadata search. - Can choose among Cloud providers, such as Google Cloud, AWS, and Azure. | - Eventually consistent, which means that updates don't reflect immediately. - Can be more expensive than other options. - Quotas and limits restrict scale and performance. - Limited control over the underlying infrastructure. | `cosine` `euclidean` `dot-product` | ANN | GA | | - High-volume documents - Enterprise scale RAG - Managing vector database infrastructure - Existing Pinecone customers |

## What's next

- [Use Vertex AI Feature Store](https://cloud.google.com/vertex-ai/generative-ai/docs/use-feature-store-with-rag)