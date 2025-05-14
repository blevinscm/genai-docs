---
date_scraped: 2025-05-12
title: Generative AI On Vertex AI Release Notes
---

# Generative AI on Vertex AI release notes 

This page documents production updates to Generative AI on Vertex AI and
Vertex AI Model Garden. You can periodically check this page for
announcements about new or updated features, bug fixes, known issues, and
deprecated functionality.

## March 29, 2024

The MedLM-large model infrastructure has been upgraded to improve
latency and stability. Responses from the model might be slightly different.

## March 22, 2024

PDFs are now supported as an input to Gemini 1.0 Pro Vision multimodal
language model. You can call the APIs with PDFs directly or try it out in the Vertex AI Studio. To learn
more, see [Send multimodal prompt requests with images or PDF](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-multimodal-prompts#send-images).

## March 19, 2024

**Anthropic's Claude 3 Sonnet and Claude 3 Haiku models on
Vertex AI are generally available in Vertex AI.**

The managed models Claude 3 Haiku and Claude 3 Sonnet
from Anthropic are available on Vertex AI. To use a Claude model on
Vertex AI, send a request directly to the Vertex AI
API endpoint. For more information, see
[Use the Claude models from Anthropic](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude)
and the Claude model cards in Model Garden:

- [Claude 3 Haiku model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-haiku)
- [Claude 3 Sonnet model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-sonnet)

## February 21, 2024

**Gemma open models are available.**

Gemma models, a family of lightweight, open models built from the
same research and technology used to create the Gemini models, are available to
run on your hardware, mobile devices, or hosted services. To learn more, see
[Use Gemma open models](https://cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-gemma) and
the [Gemma Model Garden card](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/335).

## February 15, 2024

**Vertex AI Gemini 1.0 Pro and Gemini 1.0 Pro Vision models**

The Vertex AI Gemini 1.0 Pro and
Gemini 1.0 Pro Vision multimodal language models are
Generally Available (GA). They have also been made available in the following
regions: europe-west1, europe-west2, europe-west3, europe-west4, and
europe-west9.

For more information, see the following topics:

- [Overview of the Gemini API](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/overview)
- [Multimodal prompt design](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts)
- [Vertex AI Gemini API reference](model-reference/gemini.md)
- [Gemini Python SDK reference](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/sdk-for-gemini/gemini-sdk-overview)
- [Migrate from PaLM API to Gemini API](https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-palm-to-gemini)

## February 9, 2024

**Multimodal embeddings video support is Generally Available**

Embeddings for video data is now Generally available using the multimodal
embedding model (`multimodalembedding`). For more information, see the
[product documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#vid-img-txt-request).

This features incurs pricing based on the mode you use. For more information,
see [pricing](https://cloud.google.com/vertex-ai/pricing#generative_ai_models).

## February 7, 2024

**[Model Garden](https://console.cloud.google.com/vertex-ai/model-garden) updates:**

#### Feature

The following models have been added:

- Stable Diffusion XL LCM: The Latent Consistency Model (LCM) enhances
 text-to-image generation in Latent Diffusion Models by enabling faster
 and high-quality image creation with fewer steps.
- LLaVA 1.5: Deploy LLaVA 1.5 models.
- PyTorch-ZipNeRF: The Pytorch-ZipNeRF model is a state-of-the-art
 implementation of the ZipNeRF algorithm in the Pytorch framework,
 designed for efficient and accurate 3D reconstruction from 2D images.
- LLaMA 2 (Quantized): A quantized version of Meta's Llama 2 models.
- WizardLM: WizardLM is a large language model (LLM) developed by Microsoft,
 fine-tuned on complex instructions by adapting the Evol-Instruct method.
- WizardCoder: WizardCoder is a large language model (LLM) developed by
 Microsoft, fine-tuned on complex instructions by adapting the Evol-Instruct
 method to the domain of code.
- AutoGluon: With AutoGluon you can train and deploy high-accuracy machine
 learning and deep learning models for tabular data.
- Lama (Large mask inpainting): Use Large Mask Inpainting with fast Fourier
 convolutions (FFCs), a high receptive field perceptual loss, and large
 training masks for resolution-robust image inpainting.

#### Changed

- Added one-click tuning button, and dedicated
 deployment, tuning, quantization, and evaluation notebooks for Llama 2.
- Added one-click deployment button for more than 20 models with pre-trained
 OSS artifacts, including `Salesforce/blip-image-captioning-base` and
 `timbrooks/instruct-pix2pix`.
- Supported CodeLlaMA70b with notebooks and the one-click deployment button.
- Added tuning notebooks for Mistral models.
- Added serving notebooks for Stable Video Diffusion Img2Vid XT
 (for research purposes).

## January 12, 2024

Model tuning for the `textembedding-gecko` and `textembedding-gecko-multilingual`
models is available in [GA](https://cloud.google.com/products#product-launch-stages).
You can use supervised fine-tuning to tune the `textembedding-gecko` model.
For more information, see [Tune text embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-embeddings).

## January 8, 2024

**AutoSxS evaluates LLMs side by side**

The [automatic side-by-side (AutoSxS) evaluation
tool](https://cloud.google.com/vertex-ai/generative-ai/docs/models/side-by-side-eval)
is available in Preview to A/B test the performance of your LLMs or pre-generated
predictions. It's comparable to human evaluators, yet faster, available
on-demand, and more cost-efficient.

## January 5, 2024

**Generative AI on Vertex AI regional expansion**

Generative AI on Vertex AI features for Batch Prediction and Model Evaluation are
available in
[12 additional Google Cloud regions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#available-regions).

## December 18, 2023

**[Model Garden](https://console.cloud.google.com/vertex-ai/model-garden) updates:**

- Support for [hyperparameter tuning](https://cloud.google.com/vertex-ai/docs/training/hyperparameter-tuning-overview) and customized datasets for [OpenLLaMA models](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_openllama_peft.ipynb) using the [dataset format used by supervised tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-text-models-supervised#dataset-format) in Vertex AI.
- Support for GPTQ conversions for [falcon-instruct models](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_falcon_instruct_peft.ipynb).
- Add [Latent Consistent Models](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_stable_diffusion_xl_lcm.ipynb), and [research purpose only SDXL-Turbo models](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_stable_diffusion_xl_1_0.ipynb) to stable diffusion XL notebooks.
- Add Mixtral 8x7B models in the [Mistral notebook](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_pytorch_mistral_deployment.ipynb).

## December 13, 2023

### Vertex AI Gemini Pro and Gemini Pro Vision models

The Vertex AI Gemini Pro and Gemini Pro Vision multimodal language models are available in
[Preview](https://cloud.google.com/products#product-launch-stages). For more
information, see the following topics:

- [Overview of the Gemini API](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/overview)
- [Multimodal prompt design](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts)
- [Vertex AI Gemini API reference](model-reference/gemini.md)
- [Gemini Python SDK reference](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/sdk-for-gemini/gemini-sdk-overview)
- [Migrate from PaLM API to Gemini API](https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-palm-to-gemini)

### Imagen 2 General Availability

The 005 version of Imagen's image generation model (`imagegeneration@005`) is
generally available for image generation tasks. This model version is the
default for image generation tasks. For more information, see the [product
documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images).

For general information about Imagen models and versions, see [Imagen model
versions and lifecycle](image/model-versioning.md).

## December 12, 2023

### Text embedding model 003 (`textembedding-gecko@003`) available

The updated stable version of the text embedding foundation model,
`textembedding-gecko@003`, is available. `textembedding-gecko@003`
features improved quality compared to the previous stable versions,
`textembedding-gecko@001` and `textembedding-gecko@002`.
For more information on model versions, see [Model versions and lifecycle](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versioning).

## December 8, 2023

### Generative AI on Vertex AI security control update

The [Access Transparency (AXT) security control](https://cloud.google.com/vertex-ai/generative-ai/docs/genai-security-controls)
is available for the following features:

- Embeddings for Multimodal online prediction
- Imagen on Vertex AI online prediction
- Imagen on Vertex AI tuning

## December 6, 2023

### Updated text models

Version `@002` of the models for text, chat, code, and code chat are
available. The `@002` model versions include improved prompt responses.
The `@002` models are:

- `text-bison@002`
- `chat-bison@002`
- `code-bison@002`
- `codechat-bison@002`

To ensure that you always use the *stable* model version, specify the model
identifier with the version number. For example, `text-bison@002`. For more
information, see [Model versions and lifecycle](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versioning).

## December 5, 2023

### Feature

Model grounding is available in [Preview](https://cloud.google.com/products#product-launch-stages). Use grounding to
connect the `text-bison` and `chat-bison` models to unstructured data stores in Vertex AI Search.
Grounding lets models access and use the information in the data repositories to generate more enhanced and nuanced responses.
For more information, see [Grounding Overview](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview).

## December 1, 2023

### Change

The following
[model\_garden\_name](https://console.cloud.google.com/vertex-ai/model-garden) updates
are available:

- Updated default model deployment settings with L4 GPUs, such as LLaMA2,
 falcon-instruct, openllama, Stable Diffusion 1.5, 2.1, and XL models.
- Support for
 [hyperparameter tuning](https://cloud.google.com/vertex-ai/docs/training/hyperparameter-tuning-overview)
 and customized datasets for LLaMA2 models using the
 [dataset format used by supervised tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-text-models-supervised#dataset-format)
 in Vertex AI.
- Recommended LoRA and QLoRA settings for large language model tuning in
 Vertex AI. For details, see [LoRA and QLoRA recommendations for
 LLMs](https://cloud.google.com/vertex-ai/docs/model-garden/lora-qlora).
- Support for AWQ and GPTQ conversions for LLaMA2 and OpenLLaMA models.
- Benchmark reports for
 [ViT pytorch and JAX training](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/benchmarking_reports/jax_vit_benchmarking_report.md),
 [OpenLLaMA 3b/7b/13b hyperparameter tuning](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/benchmarking_reports/pytorch_openllama_hyperparameter_tuning_benchmark_report.md), and
 [Stable Diffusion 1.5 tuning and serving](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/benchmarking_reports/stable_diffusion_v1-5_benchmarking_report.md).

## November 30, 2023

### Feature

A model size for PaLM 2 for Text is generally available
([GA](https://cloud.google.com/products#product-launch-stages)). The `text-unicorn` model provides
improved response quality for a set of complex reasoning tasks compared to
the `text-bison` model. For details, see
[Model information](learn/models.md).

## November 17th, 2023

### ComputeToken API is available in Preview

The ComputeToken API is available in ([Preview](https://cloud.google.com/products#product-launch-stages)).
You can use this API to get a list of tokens for a given prompt. A token is a
way to represent a common sequence of characters found in a text input. To
learn more, see [Get a list of tokens](https://cloud.google.com/vertex-ai/generative-ai/docs/compute-token).

## November 10, 2023

#### Generative AI on Vertex AI

[Security controls](https://cloud.google.com/vertex-ai/generative-ai/docs/genai-security-controls) are available
for additional Generative AI on Vertex AI features.

## November 3, 2023

### Model Garden updates

#### Feature

The following models have been added to [Model Garden](https://console.cloud.google.com/vertex-ai/model-garden):

- ImageBind: Multimodal embedding model.
- Vicuna v1.5: LLM finetuned based on llama2.
- OWL-ViT v2: SoTA Open Vocabulary Object Detection model.
- DITO: SoTA Open Vocabulary Object Detection model.
- NLLB: Multi-language translation model.
- Mistral-7B: SoTA LLM at small size.
- BioGPT: LLM finetuned for biomedical domain.
- BiomedCILP: Multimodal foundational model finetuned for biomedical domain.

To see a list of all available models, see [Explore models in Model Garden](https://cloud.google.com/vertex-ai/docs/start/explore-models).

#### Changed

- Improved language model serving throughput. For details, see
 [Serving open source large language models efficiently on Model Garden](/blog/products/ai-machine-learning/serve-open-source-llms-on-google-cloud).
 Notebooks in the relevant model cards have been updated accordingly.
- Inference speed up to 2 times faster compared with original implementation
 for Stable Diffusion 1.5, 2.1, and XL models.
- Improved the workflow of the **Deploy** button in all supported model cards.
- Updated notebooks for Llama2, OpenLlama, and Falcon Instruct with suggested
 machine specs for model serving, and
 [EleutherAI's evaluation harness](https://github.com/EleutherAI/lm-evaluation-harness)
 dockers for model evaluation.

### New `textembedding-gecko` and `textembedding-gecko-multilingual` stable model versions

The following stable model versions are available in Generative AI on Vertex AI:

- `textembedding-gecko@002`
- `textembedding-gecko-multilingual@001`

For more information on model versions, see [Model versions and lifecycle](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versioning).

## November 2, 2023

Generative AI on Vertex AI can be accessed through [12 regional
APIs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai) in North America,
Europe, and Asia. Regional APIs let customers control where data
is stored at-rest.

## November 3, 2023

### Model tuning for `chat-bison@001` is generally available ([GA](https://cloud.google.com/products#product-launch-stages)).

Tuning `chat-bison@001` supports tensorboard metrics visualizations. For
details, see
[Tuning and evaluation metrics](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-text-models-supervised#tuning-and-evaluation-metrics).

## October 4, 2023

### Model tuning for `textembedding-gecko` is available in Preview

You can use supervised tuning to tune the `textembedding-gecko` model. This feature is in ([Preview](https://cloud.google.com/products#product-launch-stages)).
For more information, see [Tune text embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-embeddings).

## September 1, 2023

### Pricing update

The pricing for `text-bison` has been reduced to $0.0005 per 1,000 input and
output characters. For details, see [Vertex AI pricing](https://cloud.google.com/vertex-ai/pricing#generative_ai_models).

## August 29, 2023

### New Generative AI on Vertex AI models and expanded language support

Generative AI on Vertex AI has been updated to include new language
model candidates (*latest* models), language models that support input and
output tokens up to 32k, and more supported languages. For details,
see [Available models](learn/models.md)
and [Model versions and lifecycle](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versioning).

### Stream responses from Generative AI models

Generative AI model streaming support is Generally Available ([GA](https://cloud.google.com/products#product-launch-stages)).
After you send a prompt, the model returns response tokens as they're generated
instead of waiting for the entire output to be available.

Supported models are:

- `text-bison`
- `chat-bison`
- `code-bison`
- `codechat-bison`

To learn more, see [Stream responses from Generative AI models](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/streaming).

### Supervised tuning for the `text-bison` model is Generally Available (GA)

[Supervised tuning for the `text-bison` model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-text-models-supervised)
is Generally Available ([GA](https://cloud.google.com/products#product-launch-stages)).

### Model tuning for the `chat-bison` model is available in Preview

You can use supervised tuning to tune the `chat-bison` model. This feature is in ([Preview](https://cloud.google.com/products#product-launch-stages)).
For more information, see [Tune text models](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-text-models).

### New embedding model available in Preview

Generative AI on Vertex AI users can create embeddings using a new model trained on a wide
range of non-English languages. The model is in ([Preview](https://cloud.google.com/products#product-launch-stages)).

- `textembedding-gecko-multilingual`

To learn more, see [Get text embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings).

### Imagen subject tuning and style tuning is Generally Available (GA)

Imagen on Vertex AI offers the following [GA](https://cloud.google.com/products#product-launch-stages) features:

- Subject model tuning (standard tuning)\*
- Style model tuning\*

\* Restricted access feature.

For more information about Imagen on Vertex AI or how to get access to restricted GA,
see the [Imagen on Vertex AI overview](image/Imagen-on-Vertex-AI.md).

### Reinforcement learning from human feedback (RLHF) tuning for `text-bison`

The Generative AI on Vertex AI text generation foundation model (`text-bison`) supports RLHF
tuning. The RLHF tuning feature is in ([Preview](https://cloud.google.com/products#product-launch-stages)).
For more information, see [Use RLHF model tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models#genai-rlhf-tuning).

### Vertex AI Codey APIs language support

Vertex AI Codey APIs support additional programming languages. For more
information, see [Supported coding languages](code/code-models-overview.md).

### Vertex AI Codey APIs support supervised tuning

The code chat (`codechat-bison`) and code generation (`code-bison`)
Vertex AI Codey APIs models support supervised tuning. The supervised tuning
for Vertex AI Codey APIs models feature is in
([Preview](https://cloud.google.com/products#product-launch-stages)). For more information, see [Tune
code models](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-code-models).

### Metrics-based model evaluation

You can evaluate the performance of foundation models and tuned models
against an evaluation dataset for classification, summarization, question answering,
and general text generation. This feature is available in ([Preview](https://cloud.google.com/products#product-launch-stages))

To learn more, see [Evaluate model performance](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluate-models).

### CountToken API available in Preview

The CountToken API is available in ([Preview](https://cloud.google.com/products#product-launch-stages)).
You can use this API to get the token count and the number of
billable characters for a prompt. To learn more, see [Get token count](https://cloud.google.com/vertex-ai/generative-ai/docs/get-token-count).

## August 9, 2023

### Imagen Multimodal embeddings available in GA

Imagen on Vertex AI offers the following
[GA](https://cloud.google.com/products#product-launch-stages) feature:

- Multimodal embeddings

This feature incurs different [pricing](https://cloud.google.com/vertex-ai/pricing#generative_ai_models)
based on if you use image input or text input. For more information, see the
[multimodal embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings)
feature page.

## August 21, 2023

### Model tuning parameter update

Model tuning jobs accept optional parameters for model evaluation and
[Vertex AI TensorBoard](https://cloud.google.com/vertex-ai/docs/experiments/tensorboard-overview)
integration. This lets you evaluate your model and generate visualizations with
a single command. For more information, see
[Create a model tuning job](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models#create_a_model_tuning_job).

## July 28, 2023

### Model tuning parameter update

The `learning_rate` parameter in model tuning is `learning_rate_multiplier`.
To use the model's or tuning method's default learning rate, use the default
`learning_rate_multiplier` value of `1.0`.

If you haven't configured `learning_rate` before, no action is needed.
If using `tuning_method=tune_v2` with the v2.0.0 pipeline template
(Python SDK v1.28.1+), the recommended learning rate is 0.0002. To convert your
custom `learning_rate` to `learning_rate_multiplier`, calculate as follows:

```python
learing_rate_multiplier = custom_learning_rate_value / 0.0002

```

## July 18, 2023

### Model tuning updates for text-bison

- Upgraded tuning pipeline offers more efficient tuning and better
 performance on text-bison.
- New tuning region (`us-central1`) available with GPU support.
- New `learning_rate` parameter lets you adjust the step size at each
 iteration.

For details, see
[Tune language foundation models](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models).

### Chirp GA

Chirp is [Generally Available (GA)](https://cloud.google.com/products#product-launch-stages). For
details, see the following pages:

- [Convert text to speech](https://cloud.google.com/vertex-ai/generative-ai/docs/speech/text-to-speech)
- [Convert speech to text](https://cloud.google.com/vertex-ai/generative-ai/docs/speech/speech-to-text)

## July 17, 2023

### Imagen on Vertex AI Generally Available features

Imagen on Vertex AI offers the following
[GA](https://cloud.google.com/products#product-launch-stages) features:

- [Image generation (text-to-image generation)](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images)\*
- [Image editing](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-images)\*
- [Image visual captioning](https://cloud.google.com/vertex-ai/generative-ai/docs/image/image-captioning)
- [Visual Question Answering (VQA)](https://cloud.google.com/vertex-ai/generative-ai/docs/image/visual-question-answering)

\* Restricted access feature.

For more information about Imagen or how to get access to
restricted GA or Preview features, see the
[Imagen on Vertex AI overview](image/Imagen-on-Vertex-AI.md).

### Human face generation supported

Imagen supports human face generation for the following
features:

- [Image generation (text-to-image generation)](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images)\*
- [Image editing](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-images)\*

\* Restricted access feature.

Human face generation is enabled by default, except for images with children
or celebrities. For more information, see the
[usage guidelines](https://cloud.google.com/vertex-ai/generative-ai/docs/image/usage-guidelines).

### Additional language support

The Vertex AI PaLM API has added support for the following languages:

- Spanish (es)
- Korean (ko)
- Hindi (hi)
- Chinese (zh)

For the complete list of supported languages, see
[Supported languages](learn/models.md).

## July 13, 2023

### Batch support for PaLM 2 for Text

Support for [batch text (`text-bison`) requests](https://cloud.google.com/vertex-ai/generative-ai/docs/text/batch-prediction-genai)
is available in ([GA](https://cloud.google.com/products#product-launch-stages)).
You can review pricing for the `chat-bison` model at
[Vertex AI pricing page](https://cloud.google.com/vertex-ai/pricing#generative_ai_models).

## July 10, 2023

### PaLM 2 for Chat

Support for [Chat (`chat-bison`)](https://cloud.google.com/vertex-ai/generative-ai/docs/chat/chat-prompts)
is available in ([GA](https://cloud.google.com/products#product-launch-stages)).
You can review pricing for the `chat-bison` model at
[Vertex AI pricing page](https://cloud.google.com/vertex-ai/pricing#generative_ai_models).

## June 29, 2023

### Vertex AI Codey APIs

Vertex AI Codey APIs are generally available
([GA](https://cloud.google.com/products#product-launch-stages)). Use the Vertex AI Codey APIs to create
solutions with code generation, code completion, and code chat. Because the
Vertex AI Codey APIs are GA, you incur usage costs if you use them. To learn about
pricing, see
the [Generative AI on Vertex AI pricing page](https://cloud.google.com/vertex-ai/pricing#generative_ai_models).

The models in this release include:

- `code-bison` (code generation)
- `codechat-bison` (code chat)
- `code-gecko` (code completion)

The maximum tokens for input was increased from 4,096 to 6,144 tokens for
`code-bison` and `codechat-bison` to allow longer prompts and chat history. The
maximum tokens for output was increased from 1,024 to 2,048 for `code-bison` and
`codechat-bison` to allow for longer responses.

Additional programming languages are supported. For more information, see
[Supported coding languages](code/code-models-overview.md).

Several fine-tuning datasets were removed from the `code-bison` and
`codechat-bison` models to implement the following improvements:

- Excessive chattiness.
- Artifacting, such as NBSP (non-breaking space) characters.
- Low quality code responses.

To learn about cloud horizontals, see
[Vertex AI certifications](https://cloud.google.com/vertex-ai/docs/general/vertexai-compliance).

## June 15, 2023

### PaLM 2 for Chat

The `chat-bison` model has been updated to better follow instructions in the
`context` field. For details, on how to create chat prompts for
`chat-bison`, see
[Design chat prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/chat/chat-prompts).

## June 7, 2023

### PaLM Text and Embeddings APIs, and Vertex AI Studio

Generative AI on Vertex AI is available in ([GA](https://cloud.google.com/products#product-launch-stages)).
With this feature launch, you can use the Vertex AI PaLM API to generate
AI models that you can test, tune, and deploy in your AI-powered applications.
Because these features are GA, you incur usage costs if you use the
`text-bison` and `textembedding-gecko` PaLM API. To learn about pricing, see
the [Vertex AI pricing page](https://cloud.google.com/vertex-ai/pricing#generative_ai_models).

Features and models in this release include:

- PaLM 2 for Text: `text-bison`
- Embedding for Text: `textembedding-gecko`
- Vertex AI Studio for Language

**Important:** With this GA launch, standard security and compliance for
Vertex AI is not yet available to Generative AI on Vertex AI. To learn more, see
[Vertex AI certifications](https://cloud.google.com/vertex-ai/docs/general/vertexai-compliance).

### Model Garden

Model Garden is is available in ([GA](https://cloud.google.com/products#product-launch-stages)).
Model Garden is a platform that helps you discover, test, customize,
and deploy Vertex AI and select OSS models. These models range from tunable
to task-specific and are all available on Model Garden page in the
Google Cloud console.

To get started, see [Explore AI models and APIs in Model Garden](https://cloud.google.com/vertex-ai/docs/start/explore-models).

### Vertex AI Codey APIs

The Vertex AI Codey APIs are in ([Preview](https://cloud.google.com/products#product-launch-stages)).
With the Codey APIs, code generation, code completion, and code chat APIs can be used from any
Google Cloud project without allowlisting. The APIs can be accessed from the
`us-central1` region. The Codey APIs can be used in the Vertex AI Studio or
programmatically in REST commands.

To get started, see the [Code models overview](code/code-models-overview.md).

## May 10, 2023

### Generative AI on Vertex AI

Generative AI on Vertex AI is available in
([Preview](https://cloud.google.com/products#product-launch-stages)). With this feature launch, you can
use the Vertex AI PaLM API to generate AI models that you can test, tune,
and deploy in your AI-powered applications.

Features and models in this release include:

- PaLM 2 for Text: `text-bison`
- PaLM 2 for Chat: `chat-bison`
- Embedding for Text: `textembedding-gecko`
- Vertex AI Studio for Language
- Tuning for PaLM 2
- Vertex AI SDK v1.25, which includes new features, such as
 TextGenerationModel (`text-bison`), ChatModel (`chat-bison`),
 TextEmbeddingModel (`textembedding-gecko@001`)

You can interact with the generative AI features on Vertex AI by using
Vertex AI Studio in the Google Cloud console, the Vertex AI API, and the
Vertex AI SDK for Python.

- Learn more about [Generative AI on Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview).
- See an [Introduction to Vertex AI Studio](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview#gen-ai-studio).
- Get started with a [Vertex AI Studio quickstart](start/quickstarts/quickstart.md).

### Model Garden

Model Garden is available in
([Preview](https://cloud.google.com/products#product-launch-stages)). The Model Garden
is a platform that helps you discover, test, customize, and deploy
Vertex AI and select OSS models. These models range from tunable to
task-specific - all available on the Model Garden page in the
Google Cloud console.