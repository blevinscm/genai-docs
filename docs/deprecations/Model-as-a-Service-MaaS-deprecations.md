---
date_scraped: 2025-05-12
title: Model As A Service Maas Deprecations
---

# Model as a Service (MaaS) deprecations 

After a period of time, [MaaS
models](../partner-models/use-partner-models.md) are
deprecated and typically replaced with newer model versions. To provide you with
time to test and migrate to newer models, this page lists all models that are
deprecated along with their shutdown date.

## Anthropic's Claude 3 Sonnet

Anthropic's Claude 3 Sonnet is **deprecated as of January 21, 2025** and will be
**shutdown on July 21, 2025**. Claude 3 Sonnet is available to
existing customers only.

Claude 3 Sonnet is engineered to be dependable for scaled AI
deployments across a variety of use cases. Claude 3 Sonnet is
optimized for the following use cases:

- Data processing, including retrieval-augmented generation (RAG) and search
 retrieval.
- Sales tasks, such as product recommendations, forecasting, and targeted
 marketing.
- Time-saving tasks, such as code generation, quality control, and optical
 character recognition (OCR) in images.
- Vision tasks, such as processing images to return text output. Also, analysis
 of charts, graphs, technical diagrams, reports, and other visual content.

The following table shows the maximum quotas and supported context length for
**Claude 3 Sonnet** in each region.

| Region | Quotas | Supported context length |
| --- | --- | --- |
| `us-east5 (Ohio)` | Up to 10 QPM, 30,000 TPM | 200,000 tokens |

### Using Claude 3 Sonnet

For SDK and curl commands, use `claude-3-sonnet@20240229` as the model name.

### Pricing

For existing Anthropic's Claude 3 Sonnet users, pricing remains the same. For
details, see the [Pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing#partner-models) page.