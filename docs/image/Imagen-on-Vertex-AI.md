---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview#request-access
title: Imagen On Vertex Ai
---

# Imagen on Vertex AI | AI Image Generator 

**API reference overview**: To view an overview of the API options for image generation and
editing, see the [`imagegeneration` model API reference](../model-reference/imagen-api.md).

Imagen on Vertex AI brings Google's state of the art image generative AI
capabilities to application developers. With Imagen on Vertex AI,
application developers can build next-generation AI products that transform
their user's imagination into high quality visual assets using AI generation,
in seconds.

[Try image generation (Vertex AI Studio)](https://console.cloud.google.com/vertex-ai/generative/vision)

[Request access: Imagen 3 Customization and Editing](https://docs.google.com/forms/d/e/1FAIpQLScN9KOtbuwnEh6pV7xjxib5up5kG_uPqnBtJ8GcubZ6M3i5Cw/viewform)

[Request access: Person and face generation](https://docs.google.com/forms/u/0/d/1jqvREbPZ2z_LpNYxiEiK60Y-1YkZDptk2n1cp1nvEdg/viewform)

With Imagen, you can do the following:

- Generate novel images using only a text prompt (text-to-image AI
 generation).
- Edit or expand an uploaded or generated image using a mask area you define.
- Generate new backgrounds for product images.
- Use your images of a concept (subject or style) to customize image
 generation preserving the appearance of a person, product, pet, or style.
- Edit an entire image or part of an image using a text prompt without using a
 mask.
- Upscale existing, generated, or edited images.
- Fine-tune a model with a specific subject (for example, a specific handbag
 or shoe) for image generation.

#### Prompts for preceding images

These images are generated using the general Imagen 3
image generation model (`imagen-3.0-generate-002`) and the
following prompts:

1. *Claymation scene. A medium wide shot of an elderly woman. She is
 wearing flowing clothing. She is standing in a lush garden watering
 the plants with an orange watering can*
2. *Shot in the style of DSLR camera with the polarizing filter. A
 photo of two hot air balloons over the unique rock formations in
 Cappadocia, Turkey. The colors and patterns on these balloons contrast
 beautifully against the earthy tones of the landscape below. This shot
 captures the sense of adventure that comes with enjoying such an
 experience.*
3. *A weathered, wooden mech robot covered in flowering vines stands
 peacefully in a field of tall wildflowers, with a a small blue bird
 resting on its outstrecteched hand. Digital Cartoon, with warm colors
 and soft lines. A large cliff with a waterfall looms behind.*
4. *A view of a person's hand as they hold a little clay figurine of
 a bird in their hand and sculpt it with a modeling tool in their other
 hand. You can see the sculptor's scarf. Their hands are covered in
 clay dust. A macro DSLR image highlighting the texture and
 craftsmanship.*
5. *A large, colorful bouquet of flowers in an old blue glass vase
 on the table. In front is one beautiful peony flower surrounded by
 various other blossoms like roses, lilies, daisies, orchids, fruits,
 berries, green leaves. The background is dark gray. Oil painting in
 the style of the Dutch Golden Age.*
6. *A single comic book panel of a boy and his father on a grassy
 hill, staring at the sunset. A speech bubble points from the boy's
 mouth and says: The sun will rise again. Muted, late 1990s coloring
 style*

## Product usage

To view usage standards and content restrictions associated with
Imagen on Vertex AI, see the
[usage guidelines](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#imagen-guidelines).

## Person and face generation

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

## Restricted GA and Preview features

Imagen on Vertex AI offers limited access GA features and Preview features
available under our Trusted Tester Program.

To request access to use these restricted Imagen features,
fill out the [Imagen on Vertex AI access request form](https://docs.google.com/forms/d/e/1FAIpQLScN9KOtbuwnEh6pV7xjxib5up5kG_uPqnBtJ8GcubZ6M3i5Cw/viewform). If
approved, you will be provided with instructions on how to get started.

To opt out of the Trusted Tester Program after you've joined it, see
[Opt out of the Trusted Tester Program](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance#opt_out_of_the_trusted_tester_program).

## Imagen on Vertex AI features and launch stage

Imagen on Vertex AI offers several image generative AI features. These features
are available at different launch stages.

The following features are Generally Available (GA) to all users:

| Feature | Description | Links | Launch stage |
| --- | --- | --- | --- |
| Image generation (Imagen 3 and Imagen 3 Fast) | Generate novel images using text prompts. | - [Generate images using text prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images) - [Imagen API reference - Generate images](../model-reference/imagen-api.md) | General Availability |
| Digital watermarking and verification (image generation) | Add a digital (non-visible) watermark - called [SynthID](https://deepmind.google/technologies/synthid/) - to a generated image and verify the presence of a watermark on an image. | - [Add or verify an image watermark](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images#watermark) - [Imagen API reference - Generate images](../model-reference/imagen-api.md) | General Availability |
| User-configurable safety settings (image generation) | Get information about blocked input and output, control the level of safety filtering, and enable person and face generation (approved users only). | - [Responsible AI and usage guidelines for Imagen](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen) - [Configure Responsible AI (RAI) safety settings](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images#safety-filters) - [Imagen API reference - Generate images](../model-reference/imagen-api.md) | General Availability |

The following features are Generally Available (GA), but require approval to
use. Documentation for these features is accessible only by approved users:

[Request access: Imagen 3 Customization and Editing](https://docs.google.com/forms/d/e/1FAIpQLScN9KOtbuwnEh6pV7xjxib5up5kG_uPqnBtJ8GcubZ6M3i5Cw/viewform)

| Feature | Description | Links verified\_user | Launch stage |
| --- | --- | --- | --- |
| Imagen 3 Editing | Use the Imagen 3 model for mask-based image editing. Imagen 3 mask-based image editing offers the following features: - **Inpainting insert or remove** - Insert or remove content from a base image based on a mask area you define. - **Outpainting** - Realistically expand the content of a base image to a specific aspect ratio. - **Product image editing** - Edit product images using automatic background detection and masking. | - [Edit using inpainting (insert or remove objects)](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-inpainting) - [Edit using outpainting](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-outpainting) - [Product image editing](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-product-image) - [Imagen API reference - Edit images](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api-edit) | General Availability (approved users) |
| Imagen 3 Customization (few-shot learning) | Use few-shot learning to customize image generation. You can provide reference images to guide image generation for the following categories: - **Subject customization** - Provide reference images of specific subject types to guide image generation: product, person, and animal companion. - **Style customization** - Provide reference images of a style to replicate in generated images. - **Controlled customization** - Provide a base control image (scribble or canny edge) to guide image generation. - **Instruct customization** - Provide reference images to transfer the style of the reference images to the generated images. | - [Subject customization](https://cloud.google.com/vertex-ai/generative-ai/docs/image/subject-customization) - [Style customization](https://cloud.google.com/vertex-ai/generative-ai/docs/image/style-customization) - [Controlled customization](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-controlled) - [Instruct customization](https://cloud.google.com/vertex-ai/generative-ai/docs/image/instruct-customization) - [Imagen API reference - Customize images](../model-reference/imagen-api-customization.md) | General Availability (approved users) |
| Imagen Editing | Edit images using the Imagen v.002 model without specifying a mask area to modify. | - [Edit images using only text prompts (mask-free)](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-images) - [Imagen API reference - Edit images](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api-edit) | General Availability (approved users) |
| Image generation (Imagen 2 and Imagen) | Generate novel images using text prompts with Imagen 2 (v.006 and v.005) and Imagen (v.002) models . | - [Generate images using text prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images) - [Imagen API reference - Generate images](../model-reference/imagen-api.md) | General Availability (approved users) |
| Subject model fine-tuning (standard tuning) | Fine tune an existing model using sample images of a subject and generate images using the fine-tuned model. | - [Tune a custom subject model (standard and instant tuning)](fine-tune-model.md) | General Availability (approved users) |
| Style model fine-tuning | Fine tune an existing model using sample images of a style and generate images using the fine-tuned model. | - [Tune a custom style model](https://cloud.google.com/vertex-ai/generative-ai/docs/image/fine-tune-style) | General Availability (approved users) |

The following features are in Preview and require approval to use. Documentation
for these features is accessible only by approved users:

| Feature | Description | Links experiment | Launch stage |
| --- | --- | --- | --- |
| Edit using Imagen 2 Personalization | Provide an image of a person's face and generate a stylistic (non-photorealistic) image of the person in one of four defined styles: watercolor, hand drawing, illustration, and 3D character. | - [Edit using Imagen 2 Personalization](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-personalization) | Preview |
| Edit using Imagen 2 Controlled Customization | Guide image generation using a source image or a source image signal (canny edge or scribble) and the Imagen 2 model. | - [Controlled Customization](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-controlled) | Preview |
| Subject model fine-tuning (instant tuning) | Fine tune an existing model using sample images of a subject and generate images using the fine-tuned model. This type of fine-tuning takes less time to complete than standard tuning. | - [Tune a custom subject model (instant tuning)](fine-tune-model.md) | Preview |
| Text-to-live images† | Generate live images from text. Live images are up to four seconds long. | - [Create live images from text](https://cloud.google.com/vertex-ai/generative-ai/docs/image/text-to-live-images) | Preview |
| Video descriptions | Get text descriptions of a video's content. | - [Get video descriptions](https://cloud.google.com/vertex-ai/generative-ai/docs/video/video-descriptions) | Preview |

†
Contact your account representative about gaining access to this feature.

The following features are available to users, but newer
Generative AI on Vertex AI models are available that offer the same
capabilities:

| Feature | Description | Links | Launch stage |
| --- | --- | --- | --- |
| Visual captioning | Get a text description of an image's content. | - [Get image descriptions using visual captioning](https://cloud.google.com/vertex-ai/generative-ai/docs/image/image-captioning) - [Imagen API reference - Image captions](../model-reference/image-captioning.md) | General Availability |
| Visual Question Answering (VQA) | Ask a question and get information about an image. | - [Use Visual Question Answering (VQA)](https://cloud.google.com/vertex-ai/generative-ai/docs/image/visual-question-answering) - [Imagen API reference - Visual Question Answering (VQA)](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/visual-question-answering) | General Availability |

## List of articles with samples

To learn more,
run the following Jupyter notebooks in the environment of your choice:

- "Create High Quality Visual Assets with Imagen and Gemini":

 [Open
 in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/use-cases/creating_high_quality_visual_assets_with_gemini_and_imagen.ipynb)
 |
 [Open
 in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fuse-cases%2Fcreating_high_quality_visual_assets_with_gemini_and_imagen.ipynb)
 |
 [Open
 in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fuse-cases%2Fcreating_high_quality_visual_assets_with_gemini_and_imagen.ipynb)
 |
 [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/use-cases/creating_high_quality_visual_assets_with_gemini_and_imagen.ipynb)
- "Imagen 3 Image Generation":

 [Open
 in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/imagen3_image_generation.ipynb)
 |
 [Open
 in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fimagen3_image_generation.ipynb)
 |
 [Open
 in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fimagen3_image_generation.ipynb)
 |
 [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/imagen3_image_generation.ipynb)
- "Imagen 3 Image Editing":

 [Open
 in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/imagen3_editing.ipynb)
 |
 [Open
 in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fimagen3_editing.ipynb)
 |
 [Open
 in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fimagen3_editing.ipynb)
 |
 [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/imagen3_editing.ipynb)

Use the following articles to understand Imagen on Vertex AI use cases.

For a full list of Jupyter notebook tutorials using Imagen,
see the [Generative AI on Vertex AI cookbook](https://cloud.google.com/vertex-ai/generative-ai/docs/cookbook).

| Features | Description | Links |
| --- | --- | --- |
| Image generation (Imagen 3) | **A developer's guide to getting started with Imagen 3 on Vertex AI**. Read about new Imagen 3 model features. Learn more about Imagen's [image generation](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images) feature. | [Article link](https://cloud.google.com/blog/products/ai-machine-learning/a-developers-guide-to-imagen-3-on-vertex-ai) |
| Image generation (Imagen 3) | **Do It Yourself Imagen 3 - Practical Demo with Vertex AI**. Run a Colab that uses new Imagen 3 and Imagen 3 Fast model features. Learn more about Imagen's [image generation](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images) feature. | [Article link](https://colab.research.google.com/drive/1TSNDfzGCbH2ymaSmwhokvyFVtkno3jOv) |
| Image generation (Imagen 2) Image editing (Imagen) | **Image generation with Imagen and LangChain4j (Java)**. In this article, we will explore how you can generate and edit images with Imagen in LangChain4j. Learn more about Imagen's [image generation](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images) and [image editing](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-images) features. | [Article link](https://glaforge.dev/posts/2024/02/01/image-generation-with-imagen-and-langchain4j/) |

## What's next

Use the following links to view the feature documentation.

[Prompt guide

See how to write effective prompts to generate images.](https://cloud.google.com/vertex-ai/generative-ai/docs/image/img-gen-prompt-guide)

[How-to: Generate images

Learn how to generate images with Imagen on Vertex AI.](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images)

[API reference: Generate images

Learn about optional and required fields when sending an Imagen image generation request.](../model-reference/imagen-api.md)

Image credit: All images generated using Imagen on Vertex AI.

[Next

Responsible AI and usage guidelines for Imagen

arrow\_forward](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen)