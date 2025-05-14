---
date_scraped: 2025-05-12
title: Using Openai Libraries With Vertex Ai
---

# Using OpenAI libraries with Vertex AI 

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

To see an example of using the Chat Completions API,
run the "Call Gemini with the OpenAI Library" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fchat-completions%2Fintro_chat_completions_api.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/chat-completions/intro_chat_completions_api.ipynb)

The Chat Completions API works as an Open AI-compatible endpoint, designed to
make it easier to interface with Gemini on Vertex AI by
using the OpenAI libraries for Python and REST. If you're already using the
OpenAI libraries, you can use this API as a low-cost way to switch between
calling OpenAI models and Vertex AI hosted models to compare
output, cost, and scalability, without changing your existing code.
If you aren't already using the OpenAI libraries, we recommend that you
[use the Google Gen AI SDK](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal).

## Supported models

The Chat Completions API supports both Gemini models and select
self-deployed models from Model Garden.

### Gemini models

The following models provide support for the Chat Completions API:

- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](../../models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](../../models/gemini/2-0-flash.md)
- [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite)

### Self-deployed models from Model Garden

The
[Hugging Face Text Generation Interface (HF TGI)](https://huggingface.co/docs/text-generation-inference/en/index)
and
[Vertex AI Model Garden prebuilt vLLM](http://us-docker.pkg.dev/vertex-ai/vertex-vision-model-garden-dockers/pytorch-vllm-serve)
containers support the Chat Completions API. However,
not every model deployed to these containers supports the Chat Completions API.
The following table includes the most popular supported models by container:

| HF TGI | vLLM |
| --- | --- |
| - [`gemma-2-9b-it`](https://huggingface.co/google/gemma-2-9b-it) - [`gemma-2-27b-it`](https://huggingface.co/google/gemma-2-27b-it) - [`Meta-Llama-3.1-8B-Instruct`](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct) - [`Meta-Llama-3-8B-Instruct`](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct) - [`Mistral-7B-Instruct-v0.3`](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3) - [`Mistral-Nemo-Instruct-2407`](https://huggingface.co/mistralai/Mistral-Nemo-Instruct-2407) | - [Gemma](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/335) - [Llama 2](https://console.cloud.google.com/vertex-ai/publishers/meta/model-garden/llama2) - [Llama 3](https://console.cloud.google.com/vertex-ai/publishers/meta/model-garden/llama3) - [Mistral-7B](https://console.cloud.google.com/vertex-ai/publishers/mistral-ai/model-garden/mistral-7b) - [Mistral Nemo](https://console.cloud.google.com/vertex-ai/publishers/mistralai/model-garden/mistral-nemo) |

## Supported parameters

For Google models, the Chat Completions API supports the following OpenAI
parameters. For a description of each parameter, see OpenAI's documentation on
[Creating chat completions](https://platform.openai.com/docs/api-reference/chat/create).
Parameter support for third-party models varies by model. To see which parameters
are supported, consult the model's documentation.

| | |
| --- | --- |
| `messages` | - `System message` - `User message`: The `text` and `image_url` types are supported. The `image_url` type supports images stored a Cloud Storage URI or a base64 encoding in the form `"data:<MIME-TYPE>;base64,<BASE64-ENCODED-BYTES>"`. To learn how to create a Cloud Storage bucket and upload a file to it, see [Discover object storage](https://cloud.google.com/storage/docs/discover-object-storage-console). The `detail` option is not supported. - `Assistant message` - `Tool message` - `Function message`: This field is deprecated, but supported for backwards compatibility. |
| `model` | |
| `max_tokens` | |
| `n` | |
| `frequency_penalty` | |
| `presence_penalty` | |
| `response_format` | - `json_object`: Interpreted as passing "application/json" to the Gemini API. - `text`: Interpreted as passing "text/plain" to the Gemini API. - Any other MIME type is passed as is to the model, such as passing "application/json" directly. |
| `stop` | |
| `stream` | |
| `temperature` | |
| `top_p` | |
| `tools` | - `type` - `function` - `name` - `description` - `parameters`: Specify parameters by using the [OpenAPI specification](https://spec.openapis.org/oas/v3.0.3#openapi-specification). This differs from the OpenAI parameters field, which is described as a JSON Schema object. To learn about keyword differences between OpenAPI and JSON Schema, see the [OpenAPI guide](https://swagger.io/docs/specification/data-models/keywords/). |
| `tool_choice` | - `none` - `auto` - `required`: Corresponds to the mode `ANY` in the `FunctionCallingConfig`. |
| `function_call` | This field is deprecated, but supported for backwards compatibility. |
| `functions` | This field is deprecated, but supported for backwards compatibility. |

If you pass any unsupported parameter, it is ignored.

### Multimodal input parameters

The Chat Completions API supports select multimodal inputs.

| | |
| --- | --- |
| `input_audio` | - `data:` Any URI or valid blob format. We support all blob types, including image, audio, and video. Anything supported by `GenerateContent` is supported (HTTP, Cloud Storage, etc.). - `format:` OpenAI supports both `wav` (audio/wav) and `mp3` (audio/mp3). Using Gemini, all valid MIME types are supported. |
| `image_url` | - `data:` Like `input_audio`, any URI or valid blob format is supported. Note that `image_url` as a URL will default to the image/\* MIME-type and `image_url` as blob data can be used as any multimodal input. - `detail:` Similar to [media resolution](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#supported_models), this determines the maximum tokens per image for the request. Note that while OpenAI's field is per-image, Gemini enforces the same detail across the request, and passing multiple detail types in one request will throw an error. |

In general, the `data` parameter can be a URI or a combination of MIME type and
base64 encoded bytes in the form `"data:<MIME-TYPE>;base64,<BASE64-ENCODED-BYTES>"`.
For a full list of MIME types, see [`GenerateContent`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#blob).
For more information on OpenAI's base64 encoding, see [their documentation](https://platform.openai.com/docs/guides/images-vision#giving-a-model-images-as-input).

For usage, see our [multimodal input examples](examples_1.md).

### Gemini-specific parameters

There are several features supported by Gemini that are not available in OpenAI models.
These features can still be passed in as parameters, but must be contained within an
`extra_content` or `extra_body` or they will be ignored.

### `extra_body` features

| | |
| --- | --- |
| `safety_settings` | This corresponds to Gemini's `SafetySetting`. |
| `cached_content` | This corresponds to Gemini's `GenerateContentRequest.cached_content`. |
| `thought_tag_marker` | Used to separate a model's thoughts from its responses for models with Thinking available. If not specified, no tags will be returned around the model's thoughts. If present, subsequent queries will strip the thought tags and mark the thoughts appropriately for context. This helps preserve the appropriate context for subsequent queries. |

## What's next

- Learn more about
 [authentication and credentialing](auth-and-credentials.md)
 with the OpenAI-compatible syntax.
- See examples of calling the
 [Chat Completions API](examples_1.md)
 with the OpenAI-compatible syntax.
- See examples of calling the
 [Inference API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#examples)
 with the OpenAI-compatible syntax.
- See examples of calling the
 [Function Calling API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/function-calling#examples)
 with OpenAI-compatible syntax.
- Learn more about the [Gemini API](../../code/code-models-overview.md).
- Learn more about [migrating from Azure OpenAI to the Gemini API](https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-from-azure-to-gemini).