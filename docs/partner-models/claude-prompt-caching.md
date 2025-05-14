---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude-prompt-caching
title: Prompt Caching
---

# Prompt caching 

The Anthropic Claude models offer prompt caching to reduce latency and costs
when reusing the same content in multiple requests. When you send a query, you
can cache all or specific parts of your input so that subsequent queries can
use the cached results from the previous request. This avoids additional compute
and network costs. Caches are unique to your Google Cloud project and
cannot be used by other projects.

For details about how to structure your prompts, see the Anthropic [Prompt
caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) documentation.

## Supported Anthropic Claude models

Vertex AI supports prompt caching for the following Anthropic Claude
models:

- Claude 3.7 Sonnet (`claude-3-7-sonnet@20250219`)
- Claude 3.5 Sonnet v2 (`claude-3-5-sonnet-v2@20241022`)
- Claude 3.5 Sonnet (`claude-3-5-sonnet@20240620`)
- Claude 3.5 Haiku (`claude-3-5-haiku@20241022`)
- Claude 3 Haiku (`claude-3-haiku@20240307`)
- Claude 3 Opus (`claude-3-opus@20240229`)

## Data processing

Anthropic explicit prompt caching is a feature of Anthropic Claude models. The
Vertex AI offering of these Anthropic models behaves as described in
the [Anthropic documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching).

Prompt caching is an optional feature. Claude computes the hashes (fingerprints)
of requests for caching keys. These hashes are only computed for requests that
have caching enabled.

Although prompt caching is a feature implemented by the Claude models, from a
data handling perspective, Google considers these hashes to be a type of "User
Metadata". They are treated as customer "Service Data" under the [Google Cloud
Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice) and not as
"Customer Data" under the [Cloud Data Processing Addendum (Customers)](https://cloud.google.com/terms/data-processing-addendum).
In particular, additional protections for "Customer Data" don't apply to these
hashes. Google does not use these hashes for any other purpose.

If you want to completely disable this prompt caching feature and make it
unavailable in particular Google Cloud projects, you can request this by
contacting [customer support](https://console.cloud.google.com/support/createcase/v2)
and providing the relevant project numbers. After explicit caching is disabled
for a project, requests from the project with prompt caching enabled are
rejected.

## Use prompt caching

You can use the [Anthropic Claude SDK](https://pypi.org/project/anthropic/) or
the Vertex AI REST API to send requests to the Vertex AI endpoint.

For more information, see [How prompt caching works](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#how-prompt-caching-works).

For additional examples, see the [Prompt caching examples](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching#prompt-caching-examples) in
the Anthropic documentation.

Caching automatically occurs when subsequent requests contain the identical
text, images, and `cache_control` parameter as the first request. All requests
must also include the `cache_control` parameter in the same blocks.

The cache has a five minute lifetime. It is refreshed each time the cached
content is accessed.

## Pricing

Prompt caching can affect billing costs. Note that:

- Cache write tokens are 25% more expensive than base input tokens
- Cache read tokens are 90% cheaper than base input tokens
- Regular input and output tokens are priced at standard rates

For more information, see the [Pricing page](https://cloud.google.com/vertex-ai/generative-ai/pricing#claude-models).