---
date_scraped: 2025-05-12
title: Generate Images With Gemini
---

# Generate images with Gemini 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

Gemini 2.0 Flash supports response generation in multiple
modalities, including text and images.

**Note:** Multimodal response generation is only supported in
`gemini-2.0-flash-exp` and `gemini-2.0-flash-preview-image-generation`, not
`gemini-2.0-flash`.

## Image generation

To see an example of image generation with Gemini,
run the "Gemini 2.0 Flash Image Generation in Vertex AI" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_2_0_image_gen.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_2_0_image_gen.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_2_0_image_gen.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_2_0_image_gen.ipynb)

Gemini 2.0 Flash's public preview for image generation
(`gemini-2.0-flash-preview-image-generation`) supports the ability to generate
images in addition to text. This expands Gemini's capabilities to include the
following:

- Iteratively generate images through conversation with natural language,
 adjusting images while maintaining consistency and context.
- Generate images with high-quality long text rendering.
- Generate interleaved text-image output. For example, a blog post with
 text and images in a single turn. Previously, this required stringing
 together multiple models.
- Generate images using Gemini's world knowledge and reasoning capabilities.

With this public experimental release, Gemini 2.0 Flash can generate images in
1024px, supports generating and editing images of people, and contains updated
safety filters that provide a more flexible and less restrictive user
experience.

It supports the following modalities and capabilities:

- Text to image

 - **Example prompt:** "Generate an image of the Eiffel tower with
 fireworks in the background."
- Text to image (text rendering)

 - **Example prompt:** "generate a cinematic photo of a large
 building with this giant text projection mapped on the front of the
 building: "Gemini 2.0 can now generate long form text""
- Text to image(s) and text (interleaved)

 - **Example prompt:** "Generate an illustrated recipe for a
 paella. Create images alongside the text as you generate the recipe."
 - **Example prompt:** "Generate a story about a dog in a 3D
 cartoon animation style. For each scene, generate an image"
- Image(s) and text to image(s) and text (interleaved)

 - **Example prompt:** (With an image of a furnished room) "What
 other color sofas would work in my space? Can you update the image?"
- Image editing (text and image to image)

 - **Example prompt:** "Edit this image to make it look like a cartoon"
 - **Example prompt:** [image of a cat] + [image of a pillow] +
 "Create a cross stitch of my cat on this pillow."
- Multi-turn image editing (chat)

 - **Example prompts:** [upload an image of a blue car.] "Turn
 this car into a convertible." "Now change the color to yellow."

**Limitations:**

- For best performance, use the following languages: EN, es-MX, ja-JP,
 zh-CN, hi-IN.
- Image generation does not support audio or video inputs.
- Image generation may not always trigger:
 - The model may output text only. Try asking for image outputs
 explicitly. For example, "provide images as you go along."
 - The model may generate text as an image. Try asking for text
 outputs explicitly. For example, "generate narrative text along with
 illustrations."
 - The model may stop generating partway through. Try again or try
 a different prompt.

## Generate images

The following sections cover how to generate images using either
Vertex AI Studio or using the API.

For guidance and best practices for prompting, see [Design multimodal
prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts#fundamentals).

### Console

To use image generation:

1. Open [**Vertex AI Studio > Create prompt**](https://console.cloud.google.com/vertex-ai/studio/multimodal).
2. Click **Switch model** and select **`gemini-2.0-flash-preview-image-generation`**
 from the menu.
3. In the **Outputs** panel, select **Image and text** from the
 drop-down menu.
4. Write a description of the image you want to generate in the text area of
 the **Write a prompt** text area.
5. Click the **Prompt** (send) button.

Gemini will generate an image based on your description. This
process should take a few seconds, but may be comparatively slower depending on
capacity.

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
from google.genai.types import GenerateContentConfig, Modality
from PIL import Image
from io import BytesIO

client = genai.Client()

response = client.models.generate_content(
 model="gemini-2.0-flash-exp",
 contents=(
 "Generate an image of the Eiffel tower with fireworks in the background."
 ),
 config=GenerateContentConfig(response_modalities=[Modality.TEXT, Modality.IMAGE]),
)
for part in response.candidates[0].content.parts:
 if part.text:
 print(part.text)
 elif part.inline_data:
 image = Image.open(BytesIO((part.inline_data.data)))
 image.save("example-image.png")
# Example response:
# A beautiful photograph captures the iconic Eiffel Tower in Paris, France,
# against a backdrop of a vibrant and dynamic fireworks display. The tower itself...
```

### REST

Run the following command in the terminal to create or overwrite this file in
the current directory:

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${API_ENDPOINT}:generateContent \
 -d '{
 "contents": {
 "role": "USER",
 "parts": { "text": "Create a tutorial explaining how to make a peanut butter and jelly sandwich in three easy steps."},
 },
 "generation_config": {
 "response_modalities": ["TEXT", "IMAGE"],
 },
 "safetySettings": {
 "method": "PROBABILITY",
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
 },
 }' 2>/dev/null >response.json

```

**Note:** You **must** include `responseModalities: ["TEXT", "IMAGE"]`
in your configuration. Image-only output is not supported with these models.

Gemini will generate an image based on your description. This
process should take a few seconds, but may be comparatively slower depending on
capacity.

## Edit an image

### Console

To edit images:

1. Open [**Vertex AI Studio > Create prompt**](https://console.cloud.google.com/vertex-ai/studio/multimodal).
2. Click **Switch model** and select **`gemini-2.0-flash-preview-image-generation`**
 from the menu.
3. In the **Outputs** panel, select **Image and text** from the
 drop-down menu.
4. Click **Insert media** (add\_photo\_alternate) and
 select a source from the menu, then follow the dialog's instructions.
5. Write what edits you want to make to the image in the **Write a prompt**
 text area.
6. Click the **Prompt** (send) button.

Gemini will generate an edited version of the provided image based on
your description. This process should take a few seconds, but may be
comparatively slower depending on capacity.

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
from google.genai.types import GenerateContentConfig, Modality
from PIL import Image
from io import BytesIO

client = genai.Client()

# Using an image of Eiffel tower, with fireworks in the background.
image = Image.open("example-image.png")

response = client.models.generate_content(
 model="gemini-2.0-flash-exp",
 contents=[image, "Edit this image to make it look like a cartoon."],
 config=GenerateContentConfig(response_modalities=[Modality.TEXT, Modality.IMAGE]),
)
for part in response.candidates[0].content.parts:
 if part.text:
 print(part.text)
 elif part.inline_data:
 image = Image.open(BytesIO((part.inline_data.data)))
 image.save("bw-example-image.png")
# Example response:
# Here's the cartoon-style edit of the image:
# Cartoon-style edit:
# - Simplified the Eiffel Tower with bolder lines and slightly exaggerated proportions.
# - Brightened and saturated the colors of the sky, fireworks, and foliage for a more vibrant, cartoonish look.
# ....
```

### REST

Run the following command in the terminal to create or overwrite this file in
the current directory:

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${API_ENDPOINT}:generateContent \
 -d '{
 "contents": {
 "role": "USER",
 "parts": [
 {"file_data": {
 "mime_type": "image/jpg",
 "file_uri": "<var>FILE_NAME</var>"
 }
 },
 {"text": "Convert this photo to black and white, in a cartoonish style."},
 ]

 },
 "generation_config": {
 "response_modalities": ["TEXT", "IMAGE"],
 },
 "safetySettings": {
 "method": "PROBABILITY",
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
 },
 }' 2>/dev/null >response.json

```

**Note:** You **must** include `responseModalities: ["TEXT", "IMAGE"]`
in your configuration. Image-only output is not supported with these models.

Gemini will generate an image based on your description. This
process should take a few seconds, but may be comparatively slower depending on
capacity.

## Generate interleaved images and text

Gemini 2.0 Flash can generate interleaved images with its
text responses. For example, you can generate images of what each step of a
generated recipe might look like to go along with the text of that step, without
having to make separate requests to the model to do so.

### Console

To generate interleaved images with text responses:

1. Open [**Vertex AI Studio > Create prompt**](https://console.cloud.google.com/vertex-ai/studio/multimodal).
2. Click **Switch model** and select **`gemini-2.0-flash-preview-image-generation`**
 from the menu.
3. In the **Outputs** panel, select **Image and text** from the
 drop-down menu.
4. Write a description of the image you want to generate in the text area of
 the **Write a prompt** text area. For example, "Create a tutorial
 explaining how to make a peanut butter and jelly sandwich in three easy
 steps. For each step, provide a title with the number of the step, an
 explanation, and also generate an image, generate each image in a 1:1 aspect
 ratio."
5. Click the **Prompt** (send) button.

Gemini will generate a response based on your description. This
process should take a few seconds, but may be comparatively slower depending on
capacity.

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
from google.genai.types import GenerateContentConfig, Modality
from PIL import Image
from io import BytesIO

client = genai.Client()

response = client.models.generate_content(
 model="gemini-2.0-flash-exp",
 contents=(
 "Generate an illustrated recipe for a paella."
 "Create images to go alongside the text as you generate the recipe"
 ),
 config=GenerateContentConfig(response_modalities=[Modality.TEXT, Modality.IMAGE]),
)
with open("paella-recipe.md", "w") as fp:
 for i, part in enumerate(response.candidates[0].content.parts):
 if part.text is not None:
 fp.write(part.text)
 elif part.inline_data is not None:
 image = Image.open(BytesIO((part.inline_data.data)))
 image.save(f"example-image-{i+1}.png")
 fp.write(f"![image](./example-image-{i+1}.png)")
# Example response:
# A markdown page for a Paella recipe(`paella-recipe.md`) has been generated.
# It includes detailed steps and several images illustrating the cooking process.
```

### REST

Run the following command in the terminal to create or overwrite this file in
the current directory:

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${API_ENDPOINT}:generateContent \
 -d '{
 "contents": {
 "role": "USER",
 "parts": { "text": "Create a tutorial explaining how to make a peanut butter and jelly sandwich in three easy steps. For each step, provide a title with the number of the step, an explanation, and also generate an image, generate each image in a 1:1 aspect ratio."},
 },
 "generation_config": {
 "response_modalities": ["TEXT", "IMAGE"],
 },
 "safetySettings": {
 "method": "PROBABILITY",
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "threshold": "BLOCK_MEDIUM_AND_ABOVE"
 },
 }' 2>/dev/null >response.json

```

**Note:** You **must** include `responseModalities: ["TEXT", "IMAGE"]`
in your configuration. Image-only output is not supported with these models.

Gemini will generate an image based on your description. This
process should take a few seconds, but may be comparatively slower depending on
capacity.