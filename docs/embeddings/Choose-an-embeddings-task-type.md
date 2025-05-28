---
source: https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/choose-task-type
title: Choose An Embeddings Task Type
---

### REST

```python
PROJECT_ID="your-project-id"

curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1/projects/$PROJECT_ID/locations/us-central1/publishers/google/models/text-embedding-005:predict -d \
$'{\n "instances": [\n {\n "task_type": "CODE_RETRIEVAL_QUERY",\n "content": "Function to add two numbers"\n }\n ],\n}'

```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
from vertexai.language_models import TextEmbeddingInput, TextEmbeddingModel

MODEL_NAME = "text-embedding-005"
DIMENSIONALITY = 256

def embed_text(
 texts: list[str] = ["Retrieve a function that adds two numbers"],
 task: str = "CODE_RETRIEVAL_QUERY",
 model_name: str = "text-embedding-005",
 dimensionality: int | None = 256,
) -> list[list[float]]:
 """Embeds texts with a pre-trained, foundational model."""
 model = TextEmbeddingModel.from_pretrained(model_name)
 inputs = [TextEmbeddingInput(text, task) for text in texts]
 kwargs = dict(output_dimensionality=dimensionality) if dimensionality else {}
 embeddings = model.get_embeddings(inputs, **kwargs)
 # Example response:
 # [[0.025890009477734566, -0.05553026497364044, 0.006374752148985863,...],
 return [embedding.values for embedding in embeddings]

if __name__ == "__main__":
    # Example for embedding a code retrieval query
    query_texts = ["Retrieve a function that adds two numbers"]
    query_task = "CODE_RETRIEVAL_QUERY"
    retrieval_query_embeddings = embed_text(
        texts=query_texts, task=query_task, model_name=MODEL_NAME, dimensionality=DIMENSIONALITY
    )
    print(f"Calculated {len(retrieval_query_embeddings)} embedding(s) for the query.")

    # Example for embedding code documents (for a corpus)
    document_texts = [
        "def func(a, b): return a + b",
        "def func(a, b): return a - b",
        "def func(a, b): return (a ** 2 + b ** 2) ** 0.5",
    ]
    document_task = "RETRIEVAL_DOCUMENT"
    retrieval_document_embeddings = embed_text(
        texts=document_texts, task=document_task, model_name=MODEL_NAME, dimensionality=DIMENSIONALITY
    )
    print(f"Calculated {len(retrieval_document_embeddings)} embedding(s) for the documents.")

```

The following limitations apply when using these models:

- Don't use these preview models on mission critical or production systems.
- These models are available in `us-central1` only.
- Batch predictions are not supported.
- Customization is not supported.

## What's next

- Learn how to
 [get text embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings).
