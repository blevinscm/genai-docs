---
date_scraped: 2025-05-12
title: Deployments And Endpoints
---

# Deployments and endpoints 

Google and Partner models and generative AI features on Vertex AI are
exposed as specific [regional endpoints](/about/locations) and a global
endpoint. Global endpoints cover the entire world and provide higher
availability and reliability than single regions.

Note that model endpoints don't guarantee region availability or in-region ML
processing. For information about data residency, see
[Data residency](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/data-residency).

## Global endpoint

Selecting a global endpoint for your requests can improve overall availability
while reducing resource exhausted (429) errors. Don't use the global endpoint if
you have ML processing requirements, because you can't control or know which
region your ML processing requests are sent to when a request is made.

### Supported models

Usage of the global endpoint is supported for the following models:

- [Gemini 2.0 Flash with Live API](../models/gemini/2-0-flash.md)
- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](../models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)
- [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite)

### Use the global endpoint

To use the global endpoint, exclude the location from the endpoint name and
configure the location of the resource to `global`. For example, the following
is global endpoint URL:

```python
https://aiplatform.googleapis.com/v1/projects/test-project/locations/global/publishers/google/models/gemini-2.0-flash-001:generateContent

```

For the Google Gen AI SDK, create a client that uses the `global` location:

```python
client = genai.Client(
 vertexai=True, project='your-project-id', location='global'
)

```

### Limitations

The following capabilities are not available when using the global endpoint:

- Tuning
- Batch prediction
- Context caching
- Retrieval-augmented generation (RAG) corpus (RAG requests are supported)
- Provisioned Throughput

## Google model endpoint locations

Google model endpoints for Generative AI on Vertex AI are available
in the following regions.

**Important:** Starting April 29, 2025, Gemini 1.5 Pro and
Gemini 1.5 Flash are not available in projects that have no
prior usage of these models, including new projects. For details, see
[Model versions and lifecycle](model-versions.md).

### United States

| | Columbus, Ohio (us-east5) | Dallas, Texas (us-south1) | Iowa (us-central1) | Las Vegas, Nevada (us-west4) | Moncks Corner, South Carolina (us-east1) | Northern Virginia (us-east4) | Oregon (us-west1) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Gemini 2.5 Flash (`gemini-2.5-flash-preview-04-17`) | | | ✔ | | | | |
| Gemini 2.5 Pro (`gemini-2.5-pro-preview-05-06`) | | | ✔ | | | | |
| Gemini 2.0 Flash (`gemini-2.0-flash-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Gemini 1.5 Pro (`gemini-1.5-pro-002`, `gemini-1.5-pro-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Gemini 1.5 Flash (`gemini-1.5-flash-002`, `gemini-1.5-flash-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Embeddings for Text | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Embeddings for Multimodal | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen for Captioning & VQA | | | ✔ | ✔ | | ✔ | ✔ |
| Imagen (`imagegeneration@002`) | | | ✔ | ✔ | | ✔ | ✔ |
| Imagen 2 (`imagegeneration@005`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 2 (`imagegeneration@006`) | | | ✔ | ✔ | | ✔ | ✔ |
| Imagen 3 (`imagen-3.0-generate-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 Fast (`imagen-3.0-fast-generate-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 Editing and Customization (`imagen-3.0-capability-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 (`imagen-3.0-generate-002`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

### Canada

| | Montréal (northamerica-northeast1) |
| --- | --- |
| Gemini 2.5 Flash (`gemini-2.5-flash-preview-04-17`) | |
| Gemini 2.5 Pro (`gemini-2.5-pro-preview-05-06`) | |
| Gemini 2.0 Flash (`gemini-2.0-flash-001`) | |
| Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite-001`) | |
| Gemini 1.5 Pro (`gemini-1.5-pro-002`, `gemini-1.5-pro-001`) | ✔ |
| Gemini 1.5 Flash (`gemini-1.5-flash-002`, `gemini-1.5-flash-001`) | ✔ |
| Embeddings for Text | ✔ |
| Embeddings for Multimodal | ✔ |
| Imagen for Captioning & VQA | ✔ |
| Imagen (`imagegeneration@002`) | ✔ |
| Imagen 2 (`imagegeneration@005`) | ✔ |
| Imagen 2 (`imagegeneration@006`) | ✔ |
| Imagen 3 (`imagen-3.0-generate-001`) | ✔ |
| Imagen 3 Fast (`imagen-3.0-fast-generate-001`) | ✔ |
| Imagen 3 Editing and Customization (`imagen-3.0-capability-001`) | ✔ |
| Imagen 3 (`imagen-3.0-generate-002`) | ✔ |

### South America

| | São Paulo, Brazil (southamerica-east1) |
| --- | --- |
| Gemini 2.5 Flash (`gemini-2.5-flash-preview-04-17`) | |
| Gemini 2.5 Pro (`gemini-2.5-pro-preview-05-06`) | |
| Gemini 2.0 Flash (`gemini-2.0-flash-001`) | |
| Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite-001`) | |
| Gemini 1.5 Pro (`gemini-1.5-pro-002`, `gemini-1.5-pro-001`) | ✔ |
| Gemini 1.5 Flash (`gemini-1.5-flash-002`, `gemini-1.5-flash-001`) | ✔ |
| Embeddings for Text | ✔ |
| Embeddings for Multimodal | ✔ |
| Imagen for Captioning & VQA | |
| Imagen (`imagegeneration@002`) | |
| Imagen 2 (`imagegeneration@005`) | ✔ |
| Imagen 2 (`imagegeneration@006`) | |
| Imagen 3 (`imagen-3.0-generate-001`) | ✔ |
| Imagen 3 Fast (`imagen-3.0-fast-generate-001`) | ✔ |
| Imagen 3 Editing and Customization (`imagen-3.0-capability-001`) | ✔ |
| Imagen 3 (`imagen-3.0-generate-002`) | ✔ |

### Europe

| | Netherlands (europe-west4) | Paris, France (europe-west9) | London, United Kingdom (europe-west2) | Frankfurt, Germany (europe-west3) | Belgium (europe-west1) | Zürich, Switzerland (europe-west6) | Madrid, Spain (europe-southwest1) | Milan, Italy (europe-west8) | Finland (europe-north1) | Warsaw, Poland (europe-central2) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Gemini 2.5 Flash (`gemini-2.5-flash-preview-04-17`) | | | | | | | | | | |
| Gemini 2.5 Pro (`gemini-2.5-pro-preview-05-06`) | | | | | | | | | | |
| Gemini 2.0 Flash (`gemini-2.0-flash-001`) | ✔ | ✔ | | | ✔ | | ✔ | ✔ | ✔ | ✔ |
| Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite-001`) | ✔ | ✔ | | | ✔ | | ✔ | ✔ | ✔ | ✔ |
| Gemini 1.5 Pro (`gemini-1.5-pro-002`, `gemini-1.5-pro-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Gemini 1.5 Flash (`gemini-1.5-flash-002`, `gemini-1.5-flash-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Embeddings for Text | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Embeddings for Multimodal | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen for Captioning & VQA | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen (`imagegeneration@002`) | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 2 (`imagegeneration@005`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 2 (`imagegeneration@006`) | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 (`imagen-3.0-generate-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 Fast (`imagen-3.0-fast-generate-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 Editing and Customization (`imagen-3.0-capability-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 `imagen-3.0-generate-002`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

### Asia Pacific

| | Tokyo, Japan (asia-northeast1) | Sydney, Australia (australia-southeast1) | Singapore (asia-southeast1) | Seoul, Korea (asia-northeast3) | Taiwan (asia-east1) | Hong Kong, China (asia-east2) | Mumbai, India (asia-south1) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Gemini 2.5 Flash (`gemini-2.5-flash-preview-04-17`) | | | | | | | |
| Gemini 2.5 Pro (`gemini-2.5-pro-preview-05-06`) | | | | | | | |
| Gemini 2.0 Flash (`gemini-2.0-flash-001`) | | | | | | | |
| Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite-001`) | | | | | | | |
| Gemini 1.5 Pro (`gemini-1.5-pro-002`, `gemini-1.5-pro-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Gemini 1.5 Flash (`gemini-1.5-flash-002`, `gemini-1.5-flash-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Embeddings for Text | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Embeddings for Multimodal | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen for Captioning & VQA | ✔ | | ✔ | ✔ |
| Imagen (`imagegeneration@002`) | ✔ | | ✔ | ✔ |
| Imagen 2 (`imagegeneration@005`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 2 (`imagegeneration@006`) | ✔ | | ✔ | ✔ |
| Imagen 3 (`imagen-3.0-generate-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 Fast (`imagen-3.0-fast-generate-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 Editing and Customization (`imagen-3.0-capability-001`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Imagen 3 (`imagen-3.0-generate-002`) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |

### Middle East

| | Dammam, Saudi Arabia (me-central2) | Doha, Qatar (me-central1) | Tel Aviv, Israel (me-west1) |
| --- | --- | --- | --- |
| Gemini 2.5 Flash (`gemini-2.5-flash-preview-04-17`) | | | |
| Gemini 2.5 Pro (`gemini-2.5-pro-preview-05-06`) | | | |
| Gemini 2.0 Flash (`gemini-2.0-flash-001`) | | | |
| Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite-001`) | | | |
| Gemini 1.5 Pro (`gemini-1.5-pro-002`, `gemini-1.5-pro-001`) | ✔ | ✔ | ✔ |
| Gemini 1.5 Flash (`gemini-1.5-flash-002`, `gemini-1.5-flash-001`) | ✔ | ✔ | ✔ |
| Embeddings for Text | ✔ | ✔ | ✔ |
| Embeddings for Multimodal | ✔ | ✔ | ✔ |
| Imagen for Captioning & VQA |
| Imagen (`imagegeneration@002`) |
| Imagen 2 (`imagegeneration@005`) | ✔ | ✔ | ✔ |
| Imagen 2 (`imagegeneration@006`) |
| Imagen 3 (`imagen-3.0-generate-001`) | ✔ | ✔ | ✔ |
| Imagen 3 Fast (`imagen-3.0-fast-generate-001`) | ✔ | ✔ | ✔ |
| Imagen 3 Editing and Customization (`imagen-3.0-capability-001`) | ✔ | ✔ | ✔ |
| Imagen 3 (`imagen-3.0-generate-002`) | ✔ | ✔ | ✔ |

### Global

| | Global (global) |
| --- | --- |
| Gemini 2.5 Flash (`gemini-2.5-flash-preview-04-17`) | ✔ |
| Gemini 2.5 Pro (`gemini-2.5-pro-preview-05-06`) | ✔ |
| Gemini 2.0 Flash (`gemini-2.0-flash-001`) | ✔ |
| Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite-001`) | ✔ |
| Gemini 1.5 Pro (`gemini-1.5-pro-002`, `gemini-1.5-pro-001`) | |
| Gemini 1.5 Flash (`gemini-1.5-flash-002`, `gemini-1.5-flash-001`) | |
| Embeddings for Text | |
| Embeddings for Multimodal | |
| Imagen for Captioning & VQA | |
| Imagen (`imagegeneration@002`) | |
| Imagen 2 (`imagegeneration@005`) | |
| Imagen 2 (`imagegeneration@006`) | |
| Imagen 3 (`imagen-3.0-generate-001`) | |
| Imagen 3 Fast (`imagen-3.0-fast-generate-001`) | |
| Imagen 3 Editing and Customization (`imagen-3.0-capability-001`) | |
| Imagen 3 (`imagen-3.0-generate-002`) | |

## Google Cloud partner model endpoint locations

Partner model endpoints for Generative AI on Vertex AI are available in the
following regions:

### United States

| | Columbus, Ohio (us-east5) | Dallas, Texas (us-south1) | Iowa (us-central1) | Las Vegas, Nevada (us-west4) | Moncks Corner, South Carolina (us-east1) | Northern Virginia (us-east4) | Oregon (us-west1) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Anthropic's Claude 3.7 Sonnet | ✔ |
| Anthropic's Claude 3.5 Sonnet v2 | ✔ |
| Anthropic's Claude 3.5 Sonnet | ✔ |
| Anthropic's Claude 3.5 Haiku | ✔ |
| Anthropic's Claude 3 Opus | ✔ |
| Anthropic's Claude 3 Haiku | ✔ |
| Llama 4 Maverick 17B-128E (Preview) | ✔ |
| Llama 4 Scout 17B-16E (Preview) | ✔ |
| Llama 3.3 70B (Preview) | | | ✔ | | | | |
| Llama 3.2 90B (Preview) | | | ✔ | | | | |
| Llama 3.1 405B | | | ✔ | | | | |
| Llama 3.1 70B (Preview) | | | ✔ | | | | |
| Llama 3.1 8B (Preview) | | | ✔ | | | | |
| Mistral Small 3.1 (25.03) | | | ✔ |
| Mistral Large | | | ✔ |
| Mistral Nemo | | | ✔ |
| Codestral | | | ✔ |
| Jamba 1.5 Large (Preview) | | | ✔ |
| Jamba 1.5 Mini (Preview) | | | ✔ |

### Europe

| | Netherlands (europe-west4) | Belgium (europe-west1) |
| --- | --- | --- |
| Anthropic's Claude 3.7 Sonnet | | ✔ |
| Anthropic's Claude 3.5 Sonnet v2 | | ✔ |
| Anthropic's Claude 3.5 Sonnet | | ✔ |
| Anthropic's Claude 3.5 Haiku | | |
| Anthropic's Claude 3 Opus | | |
| Anthropic's Claude 3 Haiku | | ✔ |
| Llama 4 Maverick 17B-128E (Preview) | |
| Llama 4 Scout 17B-16E (Preview) | |
| Llama 3.3 70B (Preview) | | | |
| Llama 3.2 90B (Preview) | | | |
| Llama 3.1 405B | | | |
| Llama 3.1 70B (Preview) | | | |
| Llama 3.1 8B (Preview) | | | |
| Mistral Small 3.1 (25.03) | ✔ | |
| Mistral Large | ✔ | |
| Mistral Nemo | ✔ | |
| Codestral | ✔ | |
| Jamba 1.5 Large (Preview) | ✔ | |
| Jamba 1.5 Mini (Preview) | ✔ | |

### Asia Pacific

| | Singapore (asia-southeast1) |
| --- | --- |
| Anthropic's Claude 3.7 Sonnet | |
| Anthropic's Claude 3.5 Sonnet v2 | |
| Anthropic's Claude 3.5 Sonnet | ✔ |
| Anthropic's Claude 3.5 Haiku | |
| Anthropic's Claude 3 Opus | |
| Anthropic's Claude 3 Haiku | ✔ |
| Llama 4 Maverick 17B-128E (Preview) | |
| Llama 4 Scout 17B-16E (Preview) | |
| Llama 3.3 70B (Preview) | |
| Llama 3.2 90B (Preview) | |
| Llama 3.1 405B | |
| Llama 3.1 70B (Preview) | |
| Llama 3.1 8B (Preview) | |
| Mistral Small 3.1 (25.03) | |
| Mistral Large | |
| Mistral Nemo | |
| Codestral | |
| Jamba 1.5 Large (Preview) | |
| Jamba 1.5 Mini (Preview) | |

## What's next

- For a notebook tutorial that demonstrates the global endpoint, see [Intro to
 the Vertex AI global
 endpoint](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/global-endpoint/intro_global_endpoint.ipynb).
- Learn more about Generative AI on Vertex AI [data
 residency](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/data-residency).
- Learn about [Google Cloud regions](https://cloud.google.com/docs/geography-and-regions).
- Learn more about [security controls by
 feature](https://cloud.google.com/vertex-ai/generative-ai/docs/genai-security-controls).
- Learn about the models that provide Generative AI on Vertex AI support. See
 [Generative AI foundational model
 reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/overview).
- Learn about [Vertex AI locations](https://cloud.google.com/vertex-ai/docs/general/locations).