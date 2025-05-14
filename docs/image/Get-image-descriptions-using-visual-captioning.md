---
date_scraped: 2025-05-12
title: Get Image Descriptions Using Visual Captioning
---

# Get image descriptions using visual captioning 

**Note:** The Gemini API can generate descriptions based on multiple image
inputs, while Imagen can process one image in each input.

Visual captioning lets you generate a relevant description for an image. You
can use this information for a variety of uses:

- Get more detailed metadata about images for storing and searching.
- Generate automated captioning to support accessibility use cases.
- Receive quick descriptions of products and visual assets.

**Image source**: [Santhosh Kumar](https://unsplash.com/photos/RqYTuWkTdEs) on [Unsplash](https://unsplash.com/) (cropped)

**Caption (short-form)**: *a blue shirt with white polka dots is hanging on a hook*

## Supported languages

Visual captioning is available in the following languages:

- English (`en`)
- French (`fr`)
- German (`de`)
- Italian (`it`)
- Spanish (`es`)

## Performance and limitations

The following limits apply when you use this model:

| Limits | Value |
| --- | --- |
| Maximum number of API requests (short-form) per minute per project | 500 |
| Maximum number of tokens returned in response (short-form) | 64 tokens |
| Maximum number of tokens accepted in request (VQA short-form only) | 80 tokens |

The following service latency estimates apply when you use this
model. These values are meant to be illustrative and are not a promise of
service:

| Latency | Value |
| --- | --- |
| API requests (short-form) | 1.5 seconds |

## Locations

A location is a [region](/about/locations) you can specify in a request to
control where data is stored at rest. For a list of available regions, see [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).

## Responsible AI safety filtering

The image captioning and Visual Question Answering (VQA) feature model doesn't
support user-configurable safety filters. However, the overall
Imagen [safety
filtering](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-filters) occurs on the
following data:

- User input
- Model output

As a result, your output may differ from the sample output if
Imagen applies these safety filters. Consider the following
examples.

#### Filtered input

If the input is filtered, the response is similar to the following:

```python
{
 "error": {
 "code": 400,
 "message": "Media reasoning failed with the following error: The response is blocked, as it may violate our policies. If you believe this is an error, please