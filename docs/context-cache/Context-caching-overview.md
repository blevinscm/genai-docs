---
date_scraped: 2025-05-12
title: Context Caching Overview
---

# Context caching overview 

To see an example of context caching,
run the "Intro to context caching" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/context-caching/intro_context_caching.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fcontext-caching%2Fintro_context_caching.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fcontext-caching%2Fintro_context_caching.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/context-caching/intro_context_caching.ipynb)

Use *context caching* to reduce the cost of requests that contain repeat content
with high input token counts. Cached context items, such as a large amount of
text, an audio file, or a video file, can be used in prompt requests to the
Gemini API to generate output. Requests that use the same cache in the
prompt also include text unique to each prompt. For example, each prompt request
that composes a chat conversation might include the same context cache that
references a video along with unique text that comprises each turn in the chat.
The minimum size of a context cache is 4,096 tokens.

**Important:** Using the same context cache and prompt doesn't guarantee consistent
model responses because the responses from LLMs are nondeterministic. A context
cache doesn't cache any output.**Note:** Context caching is now supported by both base and fine-tuned Gemini models(see [Context cache for fine-tuned Gemini models](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-for-tuned-gemini)).

## Caching disambiguation

By default, Google caches inputs for Gemini models to reduce latency
and accelerate responses to subsequent prompts. For details on this type of
caching and to learn how to disable it, see
[Generative AI and data governance](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance#customer_data_retention_and_achieving_zero_data_retention).

The context caching described in this page refers to the caching of specific
prompt content that the user controls by using the Vertex AI API.

## Supported models

The following Gemini models support context caching:

- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](../models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)
- [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite)

For more information, see
[Available Gemini *stable* model versions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versioning#stable-versions-available).

Context caching is available in regions where Generative AI on Vertex AI is
available. For more information, see
[Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations).

## Supported MIME types

Context caching supports the following MIME types:

- `application/pdf`
- `audio/mp3`
- `audio/mpeg`
- `audio/wav`
- `image/jpeg`
- `image/png`
- `text/plain`
- `video/avi`
- `video/flv`
- `video/mov`
- `video/mp4`
- `video/mpeg`
- `video/mpegps`
- `video/mpg`
- `video/wmv`

## When to use context caching

Context caching is particularly well suited to scenarios where a substantial
initial context is referenced repeatedly by shorter requests. Consider using
context caching for use cases such as:

- Chatbots with extensive system instructions
- Repetitive analysis of lengthy video files
- Recurring queries against large document sets
- Frequent code repository analysis or bug fixing

## Cost-efficiency through caching

Context caching is a paid feature designed to reduce overall operational costs.
Billing is based on the following factors:

- **Cache token count:** The number of input tokens cached, billed at a
 reduced rate when included in subsequent prompts.
- **Storage duration:** The amount of time cached tokens are stored, billed
 hourly. The cached tokens are deleted when a context cache expires.
- **Other factors:** Other charges apply, such as for non-cached input tokens
 and output tokens.

**Note:** When you create the cached contents, the first call allocates the cache
storage. For this initial call, you are charged at the normal rate based on the
number of input tokens. Subsequent calls that refer to the cached contents are
charged at the reduced rate. For pricing details, see Gemini and
context caching on the [Gemini pricing page](https://cloud.google.com/vertex-ai/generative-ai/pricing).

Context caching doesn't support Provisioned Throughput.
Provisioned Throughput requests that use context caching are treated
as [pay-as-you-go](https://cloud.google.com/vertex-ai/generative-ai/docs/use-provisioned-throughput#only-pay-as-you-go).

## How to use a context cache

To use context caching, you first create the context cache. To reference the
contents of the context cache in a prompt request, use its resource name. You can
locate the resource name of a context cache in the response of the command used to
create it.

Each context cache has a default expiration time that's 60 minutes
after its creation time. If needed, you can specify a different expiration time
when you create the context cache or update the expiration time of an unexpired
context cache.

The following topics include details and samples that help you
create, use, update, get information about, and delete a context cache:

- [Create a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-create)
- [Use a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-use)
- [Get information about a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-getinfo)
- [Update the expiration time of a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-update)
- [Delete a context cache](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-delete)

## VPC Service Controls support

Context caching supports VPC Service Controls, meaning your cache cannot be
exfiltrated beyond your service perimeter. If you use Cloud Storage to
build your cache, include your bucket in your service perimeter as well to
protect your cache content.

For more information, see [VPC Service Controls with
Vertex AI](https://cloud.google.com/vertex-ai/docs/general/vpc-service-controls) in the
Vertex AI documentation.

## What's next

- Learn about [the Gemini API](../code/code-models-overview.md).
- Learn how to [use multimodal prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-multimodal-prompts).