---
date_scraped: 2025-05-12
title: List And Count Tokensbookmark_borderbookmark
---

# List and count tokens bookmark\_borderbookmark 

Release Notes

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This page shows you how to list the tokens and their token IDs of a prompt
and how to get a total token count of a prompt by using the Google Gen AI SDK.

## Tokens and the importance of token listing and counting

Generative AI models break down text and other data in a prompt into units called
tokens for processing. The way that data is converted into tokens depends on the
tokenizer used. A token can be characters, words, or phrases.

Each model has a maximum number of tokens that it can handle in a prompt and
response. Knowing the token count of your prompt lets you know whether you've
exceeded this limit or not. Additionally, counting tokens also returns the billable
characters for the prompt, which helps you estimate cost.

Listing tokens returns a list of the tokens that your prompt is broken down into.
Each listed token is associated with a token ID, which helps you perform
troubleshooting and analyze model behavior.

## Supported models

The following table shows you the models that support token listing and token
counting:

- [Vertex AI Model Optimizer](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/vertex-ai-model-optimizer)
- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](../models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)
- [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite)

## Get a list of tokens and token IDs for a prompt

The following code sample shows you how to get a list of tokens and token IDs for
a prompt. The prompt must contain only text. Multimodal prompts are not supported.

### Using the Gen AI SDK for Python {#gen-ai-sdk-for-python}

#### Install

See more code actions.

Light code theme

Dark code theme

```python
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

See more code actions.

Light code theme

Dark code theme

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

See more code actions.

[View on GitHub](https://github.com/GoogleCloudPlatform/python-docs-samples/blob/HEAD/genai/count_tokens/counttoken_compute_with_txt.py)

Light code theme

Dark code theme

### Using the Gen AI SDK for Go {#gen-ai-sdk-for-go}

More

#### Install

See more code actions.

Light code theme

Dark code theme

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

See more code actions.

[View on GitHub](https://github.com/GoogleCloudPlatform/python-docs-samples/blob/HEAD/genai/count_tokens/counttoken_compute_with_txt.py)

Light code theme

Dark code theme