---
title: Vertex-AI-Model-Optimizer

For more information on Model Optimizer pricing, see
[Pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing#token-based-pricing).

## Benefits

Model Optimizer lets you:

- Simplify your model selection rather than choosing a model for each application
- Optimize for cost, quality, or both, letting you balance performance and budget
- Integrate seamlessly with existing Gemini APIs and SDKs
- Track usage and identify potential for cost savings
- Efficiently handle text-based tasks without a need for manual endpoint selection

## Supported models

- Gemini 2.0 Flash (GA)
- Gemini 2.5 Pro (preview, 03-25)

## Language support

Model Optimizer supports all languages that are also supported by the Gemini models. (See Gemini Language support)

## Modality

Model Optimizer supports text use cases, including:

- Coding, including function calling and code execution
- Summarization
- Single and multi-turn chat
- Question and answering

For limitations and how to handle them, see [Handling unsupported features](#handling_unsupported_features).

## Getting started

To get started with Model Optimizer, see [our quickstart Colab notebook](https://colab.sandbox.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/model-optimizer/intro_model_optimizer.ipynb).

## Using Vertex AI Model Optimizer

### Gen AI SDK for Python

#### Install

```python
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
from google import genai
from google.genai.types import (
 FeatureSelectionPreference,
 GenerateContentConfig,
 HttpOptions,
 ModelSelectionConfig
)

client = genai.Client(http_options=HttpOptions(api_version="v1beta1"))
response = client.models.generate_content(
 model="model-optimizer-exp-04-09",
 contents="How does AI work?",
 config=GenerateContentConfig(
 model_selection_config=ModelSelectionConfig(
 feature_selection_preference=FeatureSelectionPreference.BALANCED # Options: PRIORITIZE_QUALITY, BALANCED, PRIORITIZE_COST
 ),
 ),
)
print(response.text)
# Example response:
# Okay, let's break down how AI works. It's a broad field, so I'll focus on the ...
#
# Here's a simplified overview:
# ...
```

## Handling unsupported features

Model Optimizer only supports text input and output. However, the
request could include different modalities or tools that aren't supported. The
following sections cover how Model Optimizer handles these
unsupported features.

### Multimodal requests

Requests that include prompts with multimodal data, such as video, images or audio, will throw an `INVALID_ARGUMENT` error.

### Unsupported tools

Model Optimizer only supports function declaration for requests. If a request contains other tool types including `google_maps`, `google_search`, `enterprise_web_search`, `retrieval`, or `browse`, an `INVALID_ARGUMENT` error is thrown.

##