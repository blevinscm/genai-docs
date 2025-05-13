---
title: Choose an embeddings task type
source: https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/choose-task-type # Assumed source
date_scraped: 2025-05-12 # Kept original date
---

### REST

```python
PROJECT_ID=PROJECT_ID

curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/text-embedding-005:predict -d \
$'{
 "instances": [
 {
 "task_type": "CODE_RETRIEVAL_QUERY",
 "content": "Function to add two numbers"
 }
 ],
}'

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
 # Embeds code block with a pre-trained, foundational model.
 # Using this function to calculate the embedding for corpus.
 texts = ["Retrieve a function that adds two numbers"]
 task = "CODE_RETRIEVAL_QUERY"
 code_block_embeddings = embed_text(
 texts=texts, task=task, model_name=MODEL_NAME, dimensionality=DIMENSIONALITY
 )

 # Embeds code retrieval with a pre-trained, foundational model.
 # Using this function to calculate the embedding for query.
 texts = [
 "def func(a, b): return a + b",
 "def func(a, b): return a - b",
 "def func(a, b): return (a ** 2 + b ** 2) ** 0.5",
 ]
 task = "RETRIEVAL_DOCUMENT"
 code_query_embeddings = embed_text(
 texts=texts, task=task, model_name=MODEL_NAME, dimensionality=DIMENSIONALITY
 )

```

The following limitations apply when using these models:

- Don't use these preview models on mission critical or production systems.
- These models are available in `us-central1` only.
- Batch predictions are not supported.
- Customization is not supported.

## What's next

- Learn how to
 [get text embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings).