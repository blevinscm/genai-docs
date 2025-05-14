---
date_scraped: 2025-05-12
title: About Supervised Fine Tuning For Gemini Models
---

# About supervised fine-tuning for Gemini models 

To see an example of supervised fine tuning,
run the "Supervised Fine Tuning with Gemini 2.0 Flash for Article Summarization" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/tuning/sft_gemini_summarization.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Ftuning%2Fsft_gemini_summarization.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Ftuning%2Fsft_gemini_summarization.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/tuning/sft_gemini_summarization.ipynb)

Supervised fine-tuning is a good option when you have a well-defined task with
available labeled data. It's particularly effective for domain-specific
applications where the language or content significantly differs from the data
the large model was originally trained on. You can tune [text](tune_gemini/text_tune.md), [image](tune_gemini/image_tune.md), [audio](tune_gemini/audio_tune.md), and [document](tune_gemini/doc_tune.md) data types.

Supervised fine-tuning adapts model behavior with a labeled dataset. This process
adjusts the model's weights to minimize the difference between its predictions
and the actual labels. For example, it can improve model performance for the
following types of tasks:

- Classification
- Summarization
- Extractive question answering
- Chat

For a discussion of the top tuning use cases, check out the blog post
[Hundreds of organizations are fine-tuning Gemini models. Here's their favorite use cases](https://cloud.google.com/transform/top-five-gen-ai-tuning-use-cases-gemini-hundreds-of-orgs).

To learn more, see [When to use supervised fine-tuning for Gemini](https://cloud.google.com/blog/products/ai-machine-learning/supervised-fine-tuning-for-gemini-llm?e=48754805).

## Supported models

The following Gemini models support supervised tuning:

- `Gemini 2.0 Flash-Lite`
- `Gemini 2.0 Flash`

## Limitations

### Gemini 2.0 Flash-Lite

| Specification | Value |
| --- | --- |
| Maximum input and output training tokens | 131,072 |
| Maximum input and output serving tokens | Same as base Gemini model |
| Maximum validation dataset size | 5000 examples |
| Maximum training dataset file size | 1GB for JSONL |
| Maximum training dataset size | 1M text-only examples or 300K multimodal examples |
| Adapter size | Supported values are 1, 2, 4, and 8. |

### Gemini 2.0 Flash

| Specification | Value |
| --- | --- |
| Maximum input and output training tokens | 131,072 |
| Maximum input and output serving tokens | Same as base Gemini model |
| Maximum validation dataset size | 5000 examples |
| Maximum training dataset file size | 1GB for JSONL |
| Maximum training dataset size | 1M text-only examples or 300K multimodal examples |
| Adapter size | Supported values are 1, 2, 4, and 8. |

## Known issues

- A [tuned Gemini model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning#pricing)
 can't be deleted from Vertex AI Model Registry. However, as long as it's
 idle, it won't incur any inference costs.
- Applying
 [controlled generation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output)
 when submitting inference requests to tuned Gemini models can
 result in decreased model quality due to
 data misalignment during tuning and inference time. During tuning,
 controlled generation isn't applied, so the tuned model isn't able to
 handle controlled generation well at inference time. Supervised fine-tuning
 effectively customizes the model to generate structured output. Therefore
 you don't need to apply controlled generation when making inference requests
 on tuned models.

## Use cases for using supervised fine-tuning

Foundation models work well when the expected output or task can be clearly
and concisely defined in a prompt and the prompt consistently produces the
expected output. If you want a model to learn something niche or specific that
deviates from general patterns, then you might want to consider
tuning that model. For example, you can use model tuning to teach the model the
following:

- Specific structures or formats for generating output.
- Specific behaviors such as when to provide a terse or verbose output.
- Specific customized outputs for specific types of inputs.

The following examples are use cases that are difficult to capture with only
prompt instructions:

- **Classification**: The expected response is a specific word or phrase.

 | |
 | --- |
 | **Prompt:** Classify the following text into one of the following classes: [business, entertainment]. Text: Diversify your investment portfolio **Response:** business |

 Tuning the model can help prevent the model from generating verbose responses.
- **Summarization**: The summary follows a specific format. For example, you
 might need to remove personally identifiable information (PII) in a chat
 summary.

 | |
 | --- |
 | **Prompt:** Summarize: Jessica: That sounds great! See you in Times Square! Alexander: See you at 10! **Response:** #Person1 and #Person2 agree to meet at Times Square at 10:00 AM. |

 This formatting of replacing the names of the speakers with `#Person1` and
 `#Person2` is difficult to describe and the foundation model might not naturally
 produce such a response.
- **Extractive question answering**: The question is about a context and the
 answer is a substring of the context.

 | |
 | --- |
 | **Prompt:** Context: There is evidence that there have been significant changes in Amazon rainforest vegetation over the last 21,000 years through the Last Glacial Maximum (LGM) and subsequent deglaciation. Question: What does LGM stand for? **Response:** Last Glacial Maximum |

 The response "Last Glacial Maximum" is a specific phrase from the context.
- **Chat**: You need to customize model response to follow a persona, role,
 or character.

 | |
 | --- |
 | **Prompt:** User: What's the weather like today? **Response:** Assistant: As the virtual shopkeeper of Example Organization, I can only help you with the purchases and shipping. |

You can also tune a model in the following situations:

- Prompts are not producing the expected results consistently enough.
- The task is too complicated to define in a prompt. For example, you want the
 model to do behavior cloning for a behavior that's hard to articulate in a
 prompt.
- You have complex intuitions about a task that are difficult to formalize in
 a prompt.
- You want to reduce the context length by removing the few-shot examples.

## Configure a tuning job region

User data, such as the transformed dataset and the tuned model, is stored in the
tuning job region. During tuning, computation could be offloaded to other `US` or
`EU` regions for available accelerators. The offloading is transparent to users.

- If you use the Vertex AI SDK, you can specify the region at
 initialization. For example:

 ```python
 import vertexai
 vertexai.init(project='myproject', location='us-central1')

 ```
- If you create a supervised fine-tuning job by sending a POST request using
 the
 [`tuningJobs.create`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.tuningJobs/create)
 method, then you use the URL to specify the region where the tuning job
 runs. For example, in the following URL, you specify a region by
 replacing both instances of `TUNING_JOB_REGION` with the region
 where the job runs.

 ```python
 https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs

 ```
- If you use the [Google Cloud console](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-use-supervised-tuning#create_a_text_model_supervised_tuning_job),
 you can select the region name in the **Region**
 drop-down field on the **Model details** page. This is the same page
 where you select the base model and a tuned model name.

## Quota

Quota is enforced on the number of concurrent tuning jobs. Every project comes
with a default quota to run at least one tuning job. This is a global quota,
shared across all available regions and supported models. If you want to run more jobs concurrently, you need to [request additional quota](https://cloud.google.com/docs/quota_detail/view_manage#requesting_higher_quota) for `Global concurrent tuning jobs`.

## Pricing

Pricing for Gemini supervised fine-tuning
can be found here: [Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing).

The number of training tokens is calculated by multiplying the number of tokens in your training dataset
by the number of epochs. After tuning, inference (prediction request) costs
for the tuned model still apply. Inference pricing is the same for each stable version of Gemini.
For more information, see
[Available Gemini stable model versions](../learn/model-versions.md).

## What's next

- Prepare a [supervised fine-tuning dataset](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-about).
- Learn about
 [deploying a tuned Gemini model](https://cloud.google.com/vertex-ai/generative-ai/docs/deploy/overview#deploy_a_tuned_model).