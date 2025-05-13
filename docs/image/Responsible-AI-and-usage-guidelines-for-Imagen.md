---
title: Responsible-AI-and-usage-guidelines-for-Imagengoogle.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-categories
date_scraped: 2025-05-12
---

# Responsible AI and usage guidelines for Imagen 

Imagen on Vertex AI brings Google's state of the art generative AI capabilities
to application developers. As an early-stage technology, Imagen on Vertex AI's
evolving capabilities and uses create potential for misapplication, misuse, and
unintended or unforeseen consequences. For example, Imagen on Vertex AI could
generate output that you don't expect, such as images that are offensive,
insensitive, or contextually incorrect.

Given these risks and complexities,
Imagen on Vertex AI is designed with Google's [AI Principles](https://ai.google/principles/) in mind.
However, it is important for developers to understand and test their models to
deploy them safely and responsibly. To aid developers, Imagen on Vertex AI has
built-in safety filters to help customers block potentially harmful outputs
within their use case. See the [safety filters](#safety-filters) section
for more.

When Imagen on Vertex AI is integrated into a customer's unique use
case and context, additional responsible AI considerations and model limitations
may need to be considered. We encourage customers to use fairness,
interpretability, privacy, and security [recommended practices](https://ai.google/responsibilities/responsible-ai-practices/).

[View Imagen for Generation model card](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/imagen-3.0-generate-002)

[View Imagen for Editing and Customization model card](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/imagen-3.0-capability-001)

## Imagen usage guidelines

Read the following general product attributes and legal considerations before
you use Imagen on Vertex AI.

- **People (adult or child) generation supported for approved users:**
 Imagen offers the following human generation options. Due
 to the sensitive nature of human generation, these options are subject to
 approval distinct from model usage approval:

 - **Adult generation**: The generation of photorealistic, synthetic adult
 faces, but does not support the generation of celebrities. Be aware that
 in some cases, synthetic faces may look similar to individuals. In the
 event you think this feature is generating bad outputs, see the
 following point: **Report suspected abuse**.
 - **Child generation**: This feature lets approved users generate
 photorealistic, synthetic faces of children.

 For more detailed information about human generation and requesting access
 to these features, see [Person and face generation](#person-face-gen).
- **Image and text filters and outputs:** Images (generated or uploaded)
 through Imagen on Vertex AI are assessed against safety filters.
 Imagen aims to filter out (generated or uploaded) that
 violate our acceptable use policy (AUP) or additional Generative AI product
 restrictions. In addition, our generative imagery models are intended to
 generate original content and not replicate existing content. We've designed
 our systems to limit the chances of this occurring, and we will continue to
 improve how these systems function. Like all cloud service providers, Google
 maintains an Acceptable Use Policy that prohibits customers from using our
 services in ways that infringe third-party IP rights.
- **Configurable safety filter thresholds:** Google blocks model responses
 that exceed the designated confidence scores for certain safety attributes.
 To request the ability to modify a safety threshold, contact your
 Google Cloud account team.
- **Text addition supported on certain model versions:**
 Imagen does not support adding text to images (uploaded
 or generated) using a text prompt when using the `imagegeneration@004` or
 lower model versions.
- **Report suspected abuse:**
 You can report suspected abuse of Imagen on Vertex AI or any generated output that
 contains inappropriate material or inaccurate information using the
 [Report suspected abuse on Google Cloud form](https://support.google.com/code/contact/cloud_platform_report).
- **Trusted Tester Program opt-out**: If you previously opted in to permit Google to use your data
 to improve pre-GA AI/ML services as part of the Trusted Tester Program terms, you can opt out
 using the
 [Trusted Tester Program - Opt Out Request form](https://docs.google.com/forms/d/e/1FAIpQLSdUwCF62JRg8rVYh5IaN7VWwIrLtWbxtcQDRC97zbzoq54bfg/viewform).

## Person and face generation

[Request access: Person and face generation](https://docs.google.com/forms/u/0/d/1jqvREbPZ2z_LpNYxiEiK60Y-1YkZDptk2n1cp1nvEdg/viewform)

Imagen 3 generates the most realistic and highest quality
images from natural language text prompts, including images of people of all
ages. These person generation features, including the generation of adult and
child images, may require your use case to be reviewed and approved.

Imagen 3 may provide you an error that indicates that your
Google Cloud project needs to be approved for either adult generation or child
generation, depending on the person or face generation parameter that you choose
and the context of your text prompt.

If you require approval, fill out the [request form](https://docs.google.com/forms/u/0/d/1jqvREbPZ2z_LpNYxiEiK60Y-1YkZDptk2n1cp1nvEdg/viewform),
and a Google representative will follow up on your request.

## Safety filters

Text prompts provided as inputs and images (generated or uploaded) through
Imagen on Vertex AI are assessed against a list of safety filters, which
include 'harmful categories' (for example, `violence`, `sexual`, `derogatory`,
and `toxic`).
These safety filters aim to filter out (generated or uploaded) content that
violates our [Acceptable Use Policy (AUP)](https://cloud.google.com/terms/aup),
[Generative AI Prohibited Use Policy](https://policies.google.com/terms/generative-ai/use-policy) or our
[AI Principles](https://ai.google/principles/).

If the model responds to a request with an error message such as "The prompt
couldn't be submitted" or "it might violate our policies", then the input is
triggering a safety filter. If fewer images than requested are returned, then
some generated output are blocked for not meeting safety requirements.

You can choose how aggressively to filter sensitive content by adjusting the
`safetySetting` parameter.

## Safety attributes

Safety attributes and safety filters don't have a one-to-one mapping
relationship. Safety attributes are the set of attributes that we return to user
when `includeSafetyAttributes` is set. Safety filters are the set of filters we
use to filter content. We don't filter on all safety attribute categories. For
example, for the safety attribute category "Health", we don't filter content
based on the health confidence score. Also, we don't expose the confidence
scores for some of our internal sensitive safety filters.

## Configure safety filters

There are several [safety filtering](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-filters) parameters you can use with the
image generation models. For example, you can let the model report safety filter
codes for blocked content, disable people or face generation, adjust the
sensitivity of content filtering, or return rounded safety scores of list of
safety attributes for input and output. For more technical information about individual fields, see the
[image generation model API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/image-generation).

The response varies depending on which parameters you set; some parameters
affect the content produced, while others affect content filtering and how
filtering is reported to you. Additionally, the output format depends on if the
input data is filtered, or if the generated image output is filtered.

### Parameters that filter content

The following optional parameters affect content filtering or how filtering is
reported to you:

- `safetySetting` - Lets you set how aggressively to filter for
 potentially sensitive output content.
- `includeRaiReason` - Provides more verbose information on filtered output.
- `personGeneration` - A setting that allows you more control over the
 generation of people, faces, and children.
- `disablePersonFace` - Deprecated. A choice to allow person and face
 generation or not. Users should set `personGeneration` instead.
- `includeSafetyAttributes` - Gives you full safety attribute information for
 input text, input image (for editing), and all generated images. This
 information includes safety category (for example, `"Firearms & Weapons"`,
 `"Illicit Drugs"`, or `"Violence"`) and the confidence scores.

#### Filtered input

If your text input or input image (for editing) is filtered, you get a response
with a `400` error code. A request with RAI-filtered input returns this output
format if you set either `includeRaiReason` or `includeSafetyAttributes`.

Output depends on the model version you use. The following shows output when the
input is filtered for different model versions:

### Model

```python
{
 "error": {
 "code": 400,
 "message": "Image generation failed with the following error: The prompt could not be submitted. This prompt contains sensitive words that violate Google's Responsible AI practices. Try rephrasing the prompt. If you think this was an error,