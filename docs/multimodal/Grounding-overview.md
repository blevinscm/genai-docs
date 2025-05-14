---
date_scraped: 2025-05-12
title: Grounding Overview
---

# Grounding overview 

To see an example of grounding,
run the "Intro to grounding" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/grounding/intro-grounding-gemini.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgrounding%2Fintro-grounding-gemini.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgrounding%2Fintro-grounding-gemini.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/grounding/intro-grounding-gemini.ipynb)

In generative AI, grounding is the ability to connect model output to verifiable
sources of information. If you provide models with access to specific data
sources, then grounding tethers their output to these data and reduces the
chances of inventing content. This is particularly important in situations where
accuracy and reliability are significant.

Grounding provides the following benefits:

- Reduces model hallucinations, which are instances where the model generates
 content that isn't factual.
- Anchors model responses to your data sources.
- Provides auditability by
 providing grounding support (citations) and confidence scores.

You can ground supported-model output in Vertex AI in the following ways:

| **Grounding type** | **Description** |
| --- | --- |
| [Grounding with Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search) | You want to connect your model to world knowledge and a wide possible range of topics. |
| [Grounding with Google Maps](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-maps) | You want to use Google Maps data with your model to provide more accurate and context-aware responses to your prompts. |
| [Grounding Gemini to your data](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-your-data) | You want to use retrieval-augmented generation (RAG) to connect your model to your website data or your sets of documents. |
| [Grounding Gemini with Elasticsearch](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-elasticsearch) | You want to use retrieval-augmented generation with your existing Elasticsearch indexes and Gemini. |
| [Web Grounding for Enterprise](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/web-grounding-enterprise) | You want to use a web index to generate grounded responses. |

For language support, see
[Supported languages for prompts](https://cloud.google.com/gemini/docs/codeassist/supported-languages#supported_languages_for_prompts).

## What's next

- To learn more about responsible AI best practices and Vertex AI's
 safety filters, see [Responsible AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).