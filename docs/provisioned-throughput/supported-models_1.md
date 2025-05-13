---
title: Supported-models
source: https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/supported-models#google-models
date_scraped: 2025-05-12
---

# Supported models 

The following tables show the models that support
Provisioned Throughput, the throughput for each
[generative AI scale unit (GSU) and the burndown
rates](https://cloud.google.com/vertex-ai/generative-ai/docs/measure-provisioned-throughput#gsu-burndown-rate) for each
model.

### Google models

Provisioned Throughput only supports models that you call directly
from your project using the specific model ID and not a model alias. To use
Provisioned Throughput to make API calls to a model, you must use the
specific model version ID (for example, `gemini-2.0-flash-001`) and not a
[model version alias](https://cloud.google.com/vertex-ai/docs/model-registry/model-alias).

Moreover, Provisioned Throughput doesn't support
models that are called by by other Vertex AI products, such as
Vertex AI Agents and Vertex AI Search. For example, if you make
API calls to Gemini 2.0 Flash while using Vertex AI Search,
your Provisioned Throughput order for Gemini 2.0 Flash
won't guarantee the calls made by Vertex AI Search.

The following table shows the throughput, purchase increment, and burndown rates
for Google models that support Provisioned Throughput. Your *per-second
throughput* is defined as your prompt input and generated output across all
requests per second.

To find out how many tokens your workload requires, refer to the [SDK
tokenizer](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/list-token) or the
[countTokens API](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/get-token-count).

| **Model** | **Per-second throughput per GSU** | **Units** | **Minimum GSU purchase increment** | **Burndown rates** |
| --- | --- | --- | --- | --- |
| Gemini 2.5 Pro | 540 | Tokens | 1 | **Less than or equal to 200,000 input tokens:** 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 1 token 1 output response text token = 8 tokens 1 output reasoning text token = 8 tokens **Greater than 200,000 input tokens:** 1 input text token = 2 tokens 1 input image token = 2 tokens 1 input video token = 2 tokens 1 input audio token = 2 tokens 1 output response text token = 12 tokens 1 output reasoning text token = 12 tokens |
| Gemini 2.5 Flash | 4480 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 7 tokens 1 output response text token = 4 tokens 1 output thinking response text token = 24 tokens 1 output reasoning text token = 24 tokens |
| Gemini 2.0 Flash | 3360 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 7 tokens 1 output text token = 4 tokens |
| Gemini 2.0 Flash-Lite | 6720 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 1 token 1 output text token = 4 tokens |
| Imagen 3 | 0.025 | Images | 1 | Only output images count toward your Provisioned Throughput quota. |
| Imagen 3 Fast | 0.05 | Images | 1 | Only output images count toward your Provisioned Throughput quota. |
| Imagen 2 | 0.05 | Images | 1 | Only output images count toward your Provisioned Throughput quota. |
| Imagen 2 Edit | 0.05 | Images | 1 | Only output images count toward your Provisioned Throughput quota. |
| MedLM medium | 2,000 | Characters | 1 | 1 input char = 1 char 1 output char = 2 chars |
| MedLM large | 200 | Characters | 1 | 1 input char = 1 char 1 output char = 3 chars |
| MedLM large 1.5 | 200 | Characters | 1 | 1 input char = 1 char 1 output char = 3 chars |

For more information about supported locations, see
[Available locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#available-regions).

You can upgrade to new models as they are made available. For information about
model availability and discontinuation dates, see [Google
models](../learn/models.md).

### Supervised fine-tuned model support

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

The following is supported for Google models that support
[supervised fine-tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-use-supervised-tuning):

- Provisioned Throughput can be applied to both base models and
 supervised fine-tuned versions of those base models.
- Supervised fine-tuned model endpoints and their corresponding base model count
 towards the same Provisioned Throughput quota.

 For example, Provisioned Throughput purchased for
 `gemini-2.0-flash-lite-001` for a specific project
 prioritizes requests that are made from supervised fine-tuned versions of
 `gemini-2.0-flash-lite-001` created within that project. [Use the
 appropriate header](https://cloud.google.com/vertex-ai/generative-ai/docs/use-provisioned-throughput#use-rest-api) to control traffic behavior.

### Partner models

The following table shows the throughput, purchase increment, and burndown rates
for [partner models](../partner-models/use-partner-models.md) that
support Provisioned Throughput. [Claude models](#partner-models) are
measured in tokens per second, which is defined as a total of input and output
tokens across all requests per second.

| **Model** | **Throughput per GSU (tokens/sec)** | **Minimum GSU purchase** | **GSU purchase increment** | **Burndown rates** |
| --- | --- | --- | --- | --- |
| Anthropic's Claude 3.7 Sonnet | 350 | 25 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write token = 1.25 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3.5 Sonnet v2 | 350 | 25 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write token = 1.25 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3.5 Haiku | 2,000 | 10 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write token = 1.25 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3 Opus | 70 | 35 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write token = 1.25 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3 Haiku | 4,200 | 5 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write token = 1.25 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3.5 Sonnet | 350 | 25 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write token = 1.25 tokens 1 cache hit token = 0.1 token |

For information about supported locations, see [Anthropic Claude region
availability](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude#regions). To order
Provisioned Throughput for Anthropic models, contact your
[Google Cloud account representative](https://cloud.google.com/contact).

## What's next

- [Calculate Provisioned Throughput requirements](https://cloud.google.com/vertex-ai/generative-ai/docs/measure-provisioned-throughput).