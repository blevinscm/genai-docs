---
title: Generate-images
source: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/imagen-api
date_scraped: 2025-05-12
---

# Generate images 

The Imagen API lets you create high quality images in seconds,
using text prompt to guide the generation. You can also upscale images using
Imagen API.

[View Imagen for Generation model card](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/imagen-3.0-generate-002)

#### Supported Models

| Model | Code |
| --- | --- |
| Image Generation | `imagen-3.0-generate-002` `imagen-3.0-generate-001` `imagen-3.0-fast-generate-001` `imagegeneration@006` `imagegeneration@005` `imagegeneration@002` |

For more information about the features that each model supports, see
[Imagen
models](../supported-models_1.md).

## Example syntax

Syntax to create an image from a text prompt.

### Syntax

Syntax to generate an image.

### REST

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \

https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_VERSION}:predict \
-d '{
 "instances": [
 {
 "prompt": "..."
 }
 ],
 "parameters": {
 "sampleCount": ...
 }
}'
```

### Python

```python
generation_model = ImageGenerationModel.from_pretrained("MODEL_VERSION")

response = generation_model.generate_images(
 prompt="...",
 negative_prompt="...",
 aspect_ratio=...,
)
response.images[0].show()
```

## Parameter list

See [examples](#examples) for implementation details.

#### Generate images

### REST

| Parameters | |
| --- | --- |
| `prompt` | Required: `string` The text prompt for the image. The `imagen-3.0-generate-002` model supports up to 480 tokens. The `imagen-3.0-generate-001` model supports up to 480 tokens. The `imagen-3.0-fast-generate-001` model supports up to 480 tokens. The `imagegeneration@006` model supports up to 128 tokens. The `imagegeneration@005` model supports up to 128 tokens. The `imagegeneration@002` model supports up to 64 tokens. |
| `sampleCount` | Required: `int` The number of images to generate. The default value is 4. The `imagen-3.0-generate-002` model supports values 1 through 4. The `imagen-3.0-generate-001` model supports values 1 through 4. The `imagen-3.0-fast-generate-001` model supports values 1 through 4. The `imagegeneration@006` model supports values 1 through 4. The `imagegeneration@005` model supports values 1 through 4. The `imagegeneration@002` model supports values 1 through 8. |
| `seed` | Optional: `Uint32` The random seed for image generation. This isn't available when `addWatermark` is set to `true`. If `enhancePrompt` is set to `true`, the `seed` parameter won't work, because `enhancePrompt` generates a new prompt, which results in a new or different image. |
| `enhancePrompt` | Optional: `boolean` An optional parameter to use an LLM-based prompt rewriting feature to deliver higher quality images that better reflect the original prompt's intent. Disabling this feature may impact image quality and prompt adherence. The `imagen-3.0-generate-002` supports this field. Default value: `true`. The `imagen-3.0-generate-001` doesn't support this field. The `imagen-3.0-fast-generate-001` doesn't support this field. The `imagegeneration@006` doesn't support this field. The `imagegeneration@005` doesn't support this field. The `imagegeneration@002` doesn't support this field. |
| `negativePrompt` | Optional: `string` A description of what to discourage in the generated images. The `imagen-3.0-generate-002` doesn't support this field. The `imagen-3.0-generate-001` model supports up to 480 tokens. The `imagen-3.0-fast-generate-001` model supports up to 480 tokens. The `imagegeneration@006` model supports up to 128 tokens. The `imagegeneration@005` model supports up to 128 tokens. The `imagegeneration@002` model supports up to 64 tokens. |
| `aspectRatio` | Optional: `string` The aspect ratio for the image. The default value is "1:1". The `imagen-3.0-generate-002` model supports "1:1", "9:16", "16:9", "3:4", or "4:3". The `imagen-3.0-generate-001` model supports "1:1", "9:16", "16:9", "3:4", or "4:3". The `imagen-3.0-fast-generate-001` model supports "1:1", "9:16", "16:9", "3:4", or "4:3". The `imagegeneration@006` model supports "1:1", "9:16", "16:9", "3:4", or "4:3". The `imagegeneration@005` model supports "1:1" or "9:16". The `imagegeneration@002` model supports "1:1". |
| `outputOptions` | Optional: `outputOptions` Describes the output image format in an [`outputOptions` object](#output-options). |
| `sampleImageStyle` | Optional: `string` (`imagegeneration@002` only) Describes the style for the generated images. The following values are supported: - `"photograph"` - `"digital_art"` - `"landscape"` - `"sketch"` - `"watercolor"` - `"cyberpunk"` - `"pop_art"` |
| `personGeneration` | Optional: `string` (`imagen-3.0-generate-002`, `imagen-3.0-generate-001`, `imagen-3.0-fast-generate-001`, and `imagegeneration@006` only) Allow generation of people by the model. The following values are supported: - `"dont_allow"`: Disallow the inclusion of people or faces in images. - `"allow_adult"`: Allow generation of adults only. - `"allow_all"`: Allow generation of people of all ages. The default value is `"allow_adult"`. |
| `language` | Optional: `string` (`imagen-3.0-capability-001`, `imagen-3.0-generate-001`, and `imagegeneration@006` only) The language code that corresponds to your text prompt language. The following values are supported: - `auto`: Automatic detection. If Imagen detects a supported language, the prompt and an optional negative prompt are translated to English. If the language detected isn't supported, Imagen uses the input text verbatim, which might result in an unexpected output. No error code is returned. `en`: English (if omitted, the default value)- `es`: Spanish - `hi`: Hindi - `ja`: Japanese - `ko`: Korean - `pt`: Portuguese - `zh-TW`: Chinese (traditional) - `zh` or `zh-CN`: Chinese (simplified) |
| `safetySetting` | Optional: `string` (`imagen-3.0-generate-002`, `imagen-3.0-generate-001`, `imagen-3.0-fast-generate-001`, and `imagegeneration@006` only) Adds a filter level to safety filtering. The following values are supported: - `"block_low_and_above"`: Strongest filtering level, most strict blocking. Deprecated value: `"block_most"`. - `"block_medium_and_above"`: Block some problematic prompts and responses. Deprecated value: `"block_some"`. - `"block_only_high"`: Reduces the number of requests blocked due to safety filters. May increase objectionable content generated by Imagen. Deprecated value: `"block_few"`. - `"block_none"`: Block very few problematic prompts and responses. Access to this feature is restricted. Previous field value: `"block_fewest"`. The default value is `"block_medium_and_above"`. |
| `addWatermark` | Optional: `bool` Add an invisible watermark to the generated images. The default value is `false` for the `imagegeneration@002` and `imagegeneration@005` models, and `true` for the `imagen-3.0-generate-002`, `imagen-3.0-generate-001`, `imagen-3.0-fast-generate-001`, `imagegeneration@006`, and `imagegeneration@006` models. |
| `storageUri` | Optional: `string` Cloud Storage URI to store the generated images. |

### Output options object

The `outputOptions` object describes the image output.

| Parameters | |
| --- | --- |
| `outputOptions.mimeType` | Optional: `string` The image format that the output should be saved as. The following values are supported: - `"image/png"`: Save as a PNG image - `"image/jpeg"`: Save as a JPEG image The default value is `"image/png"`. |
| `outputOptions.compressionQuality` | Optional: `int` The level of compression if the output type is `"image/jpeg"`. Accepted values are 0 through 100. The default value is 75. |

#### Response

The response body from the REST request.

| Parameter | |
| --- | --- |
| `predictions` | An array of [`VisionGenerativeModelResult` objects](#model-results), one for each requested `sampleCount`. If any images are filtered by responsible AI, they are not included, unless `includeRaiReason` is set to `true`. |

### Vision generative model result object

Information about the model result.

| Parameter | |
| --- | --- |
| `bytesBase64Encoded` | The base64 encoded generated image. Not present if the output image did not pass responsible AI filters. |
| `mimeType` | The type of the generated image. Not present if the output image did not pass responsible AI filters. |
| `raiFilteredReason` | The responsible AI filter reason. Only returned if `includeRaiReason` is enabled and this image was filtered out. |
| `safetyAttributes.categories` | The safety attribute name. Only returned if `includeSafetyAttributes` is enabled, and the output image passed responsible AI filters. |
| `safetyAttributes.scores` | The safety attribute score. Only returned if `includeSafetyAttributes` is enabled, and the output image passed responsible AI filters. |

### Python

| Parameters | |
| --- | --- |
| `prompt` | Required: `string` The text prompt for the image. The `imagen-3.0-generate-001` model supports up to 480 tokens. The `imagen-3.0-fast-generate-001` model supports up to 480 tokens. The `imagegeneration@006` model supports up to 128 tokens. The `imagegeneration@005` model supports up to 128 tokens. The `imagegeneration@002` model supports up to 64 tokens. |
| `number_of_images` | Required: `int` The number of images to generate. The default value is 1. The `imagen-3.0-generate-001` model supports values 1 through 8. The `imagen-3.0-fast-generate-001` model supports values 1 through 8. The `imagegeneration@006` model supports values 1 through 4. The `imagegeneration@005` model supports values 1 through 4. The `imagegeneration@002` model supports values 1 through 8. |
| `seed` | Optional: `int` The random seed for image generation. This isn't available when `addWatermark` is set to `true`. If `enhancePrompt` is set to `true`, the `seed` won't work, because `enhancePrompt` generates a new prompt, which results in a new or different image. |
| `negative_prompt` | Optional: `string` A description of what to discourage in the generated images. The `imagen-3.0-generate-001` model supports up to 480 tokens. The `imagen-3.0-fast-generate-001` model supports up to 480 tokens. The `imagegeneration@006` model supports up to 128 tokens. The `imagegeneration@005` model supports up to 128 tokens. The `imagegeneration@002` model supports up to 64 tokens. |
| `aspect_ratio` | Optional: `string` The aspect ratio for the image. The default value is "1:1". The `imagen-3.0-generate-001` model supports "1:1", "9:16", "16:9", "3:4", or "4:3". The `imagen-3.0-fast-generate-001` model supports "1:1", "9:16", "16:9", "3:4", or "4:3". The `imagegeneration@006` model supports "1:1", "9:16", "16:9", "3:4", or "4:3". |
| `output_mime_type` | Optional: `string` (`imagen-3.0-generate-001`, `imagen-3.0-fast-generate-001`, and `imagegeneration@006` only) The image format that the output should be saved as. The following values are supported: - `"image/png"`: Save as a PNG image - `"image/jpeg"`: Save as a JPEG image The default value is `"image/png"`. |
| `compression_quality` | Optional: `int` The level of compression if the output mime type is `"image/jpeg"`. The default value is 75. |
| `language` | Optional: `string` The language of the text prompt for the image. The following values are supported: - `"en"`: English - `"hi"`: Hindi - `"ja"`: Japanese - `"ko"`: Korean - `"auto"`: Automatic language detection The default value is `"auto"`. |
| `output_gcs_uri` | Optional: `string` Cloud Storage URI to store the generated images. |
| `add_watermark` | Optional: `bool` Add a watermark to the generated image. The default value is `false` for the `imagegeneration@002` and `imagegeneration@005` models, and `true` for the `imagen-3.0-fast-generate-001`, `imagen-3.0-generate-001`, and `imagegeneration@006` models. |
| `safety_filter_level` | Optional: `string` Adds a filter level to safety filtering. The following values are supported: - `"block_low_and_above"`: The strongest filtering level, resulting in the most strict blocking. Deprecated value: `"block_most"`. - `"block_medium_and_above"`: Block some problematic prompts and responses. Deprecated value: `"block_some"`. - `"block_only_high"`: Block fewer problematic prompts and responses. Deprecated value: `"block_few"`. - `"block_none"`: Block very few problematic prompts and responses. Deprecated value: `"block_fewest"`. The default value is `"block_medium_and_above"`. |
| `person_generation` | Optional: `string` (`imagen-3.0-generate-001`, `imagen-3.0-fast-generate-001`, and `imagegeneration@006` only) Allow generation of people by the model. The following values are supported: - `"dont_allow"`: Block generation of people - `"allow_adult"`: Generate adults, but not children - `"allow_all"`: Generate adults and children The default value is `"allow_adult"`. |

#### Upscale images

### REST

| Parameter | |
| --- | --- |
| `mode` | Required: `string` Must be set to `"upscale"` for upscaling requests. |
| `upscaleConfig` | Required: `UpscaleConfig` An [`UpscaleConfig` object](#upscale-config). |
| `outputOptions` | Optional: `OutputOptions` Describes the output image format in an [`outputOptions` object](#output-options). |
| `storageUri` | Optional: `string` Cloud Storage URI for where to store the generated images. |

#### Upscale config object

| Parameter | |
| --- | --- |
| `upscaleConfig.upscaleFactor` | Required: `string` The upscale factor. The supported values are `"x2"` and `"x4"`. |

#### Response

The response body from the REST request.

| Parameter | |
| --- | --- |
| `predictions` | An array of [`VisionGenerativeModelResult` objects](#model-results), one for each requested `sampleCount`. If any images are filtered by responsible AI, they are not included, unless `includeRaiReason` is set to `true`. |

## Examples

The following examples show how to use the Imagen models
to generate images.

### Generate images

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_VERSION: The `imagegeneration` model version to use. Available
 values:
 - Imagen 3:
 - `imagen-3.0-generate-002` (newest model)
 - `imagen-3.0-generate-001`
 - `imagen-3.0-fast-generate-001` - Low latency model version.
 - Default model version:
 - `imagegeneration` - Uses the default model version v.006. As a best practice,
 you should always specify a model version, especially in production environments.

 For more information about model versions and features, see [model
 versions](#model-versions).
- LOCATION: Your project's region. For example,
 `us-central1`, `europe-west2`, or `asia-northeast3`. For a list
 of available regions, see
 [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).
- TEXT\_PROMPT: The text prompt that guides what images the model
 generates. This field is required for both generation and editing.
- IMAGE\_COUNT: The number of generated images.
 Accepted integer values: 1-8 (`imagegeneration@002`), 1-4 (all other model versions).
 Default value: 4.

**Additional optional parameters**

Use the following optional variables depending on your use
case. Add some or all of the following parameters in the `"parameters": {}` object.
This list shows common optional parameters and isn't meant to be exhaustive. For more
information about optional parameters,
see [Imagen API reference: Generate images](imagen-api.md).

```python
"parameters": {
 "sampleCount": IMAGE_COUNT,
 "addWatermark": ADD_WATERMARK,
 "aspectRatio": "ASPECT_RATIO",
 "enhancePrompt": ENABLE_PROMPT_REWRITING,
 "includeRaiReason": INCLUDE_RAI_REASON,
 "includeSafetyAttributes": INCLUDE_SAFETY_ATTRIBUTES,
 "outputOptions": {
 "mimeType": "MIME_TYPE",
 "compressionQuality": COMPRESSION_QUALITY
 },
 "personGeneration": "PERSON_SETTING",
 "safetySetting": "SAFETY_SETTING",
 "seed": SEED_NUMBER,
 "storageUri": "OUTPUT_STORAGE_URI"
}

```

- ADD\_WATERMARK: boolean. Optional. Whether to enable a watermark for generated images.
 Any image generated when the field is set to `true` contains a digital
 [SynthID](https://deepmind.google/technologies/synthid/) that you can use to verify
 a watermarked image.
 If you omit this field, the default value of `true` is used; you must set the value
 to `false` to disable this feature. You can use the `seed` field to get
 deterministic output only when this field is set to `false`.
- ASPECT\_RATIO: string. Optional. A generation mode parameter that controls aspect
 ratio. Supported ratio values and their intended use:
 - `1:1` (default, square)
 - `3:4` (Ads, social media)
 - `4:3` (TV, photography)
 - `16:9` (landscape)
 - `9:16` (portrait)
- ENABLE\_PROMPT\_REWRITING: boolean. Optional. A parameter to use an LLM-based prompt
 rewriting feature to deliver higher quality images that better reflect the original
 prompt's intent. Disabling this feature may impact image quality and
 prompt adherence. Default value: `true`.
- INCLUDE\_RAI\_REASON: boolean. Optional. Whether to enable the
 [Responsible AI
 filtered reason code](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-categories) in responses with blocked input or output. Default value:
 `false`.
- INCLUDE\_SAFETY\_ATTRIBUTES: boolean. Optional. Whether to enable rounded
 Responsible AI scores for a list of safety attributes in responses for unfiltered input and
 output. Safety attribute categories: `"Death, Harm & Tragedy"`,
 `"Firearms & Weapons"`, `"Hate"`, `"Health"`,
 `"Illicit Drugs"`, `"Politics"`, `"Porn"`,
 `"Religion & Belief"`, `"Toxic"`, `"Violence"`,
 `"Vulgarity"`, `"War & Conflict"`. Default value: `false`.
- MIME\_TYPE: string. Optional. The MIME type of the content of the image. Available
 values:
 - `image/jpeg`
 - `image/gif`
 - `image/png`
 - `image/webp`
 - `image/bmp`
 - `image/tiff`
 - `image/vnd.microsoft.icon`
- COMPRESSION\_QUALITY: integer. Optional. Only applies to JPEG output
 files. The level of detail the model preserves for images generated in JPEG file format. Values:
 `0` to `100`, where a higher number means more compression. Default:
 `75`.
- PERSON\_SETTING: string. Optional. The safety setting that controls the type of
 people or face generation the model allows. Available values:
 - `allow_adult` (default): Allow generation of adults only, except for celebrity
 generation. Celebrity generation is not allowed for any setting.
 - `dont_allow`: Disable the inclusion of people or faces in generated images.
- SAFETY\_SETTING: string. Optional. A setting that controls safety filter thresholds
 for generated images. Available values:
 - `block_low_and_above`: The highest safety threshold, resulting in the largest
 amount of
 generated images that are filtered. Previous value: `block_most`.
 - `block_medium_and_above` (default): A medium safety threshold that balances
 filtering for
 potentially harmful and safe content. Previous value: `block_some`.
 - `block_only_high`: A safety threshold that reduces the number of
 requests blocked
 due to safety filters. This setting might increase objectionable content generated by
 Imagen. Previous value: `block_few`.
- SEED\_NUMBER: integer. Optional. Any non-negative integer you provide to make output
 images deterministic. Providing the same seed number always results in the same output images. If
 the model you're using supports digital watermarking, you must set
 `"addWatermark": false` to use this field.
 Accepted integer values: `1` - `2147483647`.
- OUTPUT\_STORAGE\_URI: string. Optional. The Cloud Storage bucket to store the output
 images. If not provided, base64-encoded image bytes are returned in the response. Sample value:
 `gs://image-bucket/output/`.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_VERSION:predict
```

Request JSON body:

```python
{
 "instances": [
 {
 "prompt": "TEXT_PROMPT"
 }
 ],
 "parameters": {
 "sampleCount": IMAGE_COUNT
 }
}

```

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_VERSION:predict"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_VERSION:predict" | Select-Object -Expand Content
```

The following sample response is for a request with
`"sampleCount": 2`. The response returns two prediction objects, with
the generated image bytes base64-encoded.

```python
{
 "predictions": [
 {
 "bytesBase64Encoded": "BASE64_IMG_BYTES",
 "mimeType": "image/png"
 },
 {
 "mimeType": "image/png",
 "bytesBase64Encoded": "BASE64_IMG_BYTES"
 }
 ]
}
```

If you use a model that supports prompt enhancement, the response includes an additional
`prompt` field with the enhanced prompt used for generation:

```python
{
 "predictions": [
 {
 "mimeType": "MIME_TYPE",
 "prompt": "ENHANCED_PROMPT_1",
 "bytesBase64Encoded": "BASE64_IMG_BYTES_1"
 },
 {
 "mimeType": "MIME_TYPE",
 "prompt": "ENHANCED_PROMPT_2",
 "bytesBase64Encoded": "BASE64_IMG_BYTES_2"
 }
 ]
}

```

### Python

Before trying this sample, follow the Python setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Python API
reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

In this sample you call the [`generate_images`](https://cloud.google.com/python/docs/reference/aiplatform/latest/vertexai.preview.vision_models.ImageGenerationModel#vertexai_preview_vision_models_ImageGenerationModel_generate_images) method on the
[`ImageGenerationModel`](https://cloud.google.com/python/docs/reference/aiplatform/latest/vertexai.preview.vision_models.ImageGenerationModel) (`@006` version) and save generated
images locally. You then can optionally use the [`show()`](https://cloud.google.com/python/docs/reference/aiplatform/latest/vertexai.preview.vision_models.Image#vertexai_preview_vision_models_Image_show)
method in a notebook to show you the generated images. For more information on
model versions and features, see [model versions](#model-versions).

```python

import vertexai
from vertexai.preview.vision_models import ImageGenerationModel

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# output_file = "input-image.png"
# prompt = "" # The text prompt describing what you want to see.

vertexai.init(project=PROJECT_ID, location="us-central1")

model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")

images = model.generate_images(
 prompt=prompt,
 # Optional parameters
 number_of_images=1,
 language="en",
 # You can't use a seed value and watermark at the same time.
 # add_watermark=False,
 # seed=100,
 aspect_ratio="1:1",
 safety_filter_level="block_some",
 person_generation="allow_adult",
)

images[0].save(location=output_file, include_generation_parameters=False)

# Optional. View the generated image in a notebook.
# images[0].show()

print(f"Created output image using {len(images[0]._image_bytes)} bytes")
# Example response:
# Created output image using 1234567 bytes

```

### Upscale images

### REST

Before using any of the request data,
make the following replacements:

- LOCATION: Your project's region. For example,
 `us-central1`, `europe-west2`, or `asia-northeast3`. For a list
 of available regions, see
 [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).
- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- B64\_BASE\_IMAGE: The base image to edit or upscale. The
 image must be specified as a [base64-encoded](https://cloud.google.com/vertex-ai/generative-ai/docs/image/base64-encode) byte
 string. Size limit: 10 MB.
- IMAGE\_SOURCE: The Cloud Storage location of the image you
 want to edit or upscale. For example: `gs://output-bucket/source-photos/photo.png`.
- UPSCALE\_FACTOR: Optional. The factor to which the image will be upscaled. If not
 specified, the upscale factor will be determined from the longer side of the input image and
 `sampleImageSize`. Available values: `x2` or `x4` .

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagegeneration@002:predict
```

Request JSON body:

```python
{
 "instances": [
 {
 "prompt": "",
 "image": {
 // use one of the following to specify the image to upscale
 "bytesBase64Encoded": "B64_BASE_IMAGE"
 "gcsUri": "IMAGE_SOURCE"
 // end of base image input options
 },
 }
 ],
 "parameters": {
 "sampleCount": 1,
 "mode": "upscale",
 "upscaleConfig": {
 "upscaleFactor": "UPSCALE_FACTOR"
 }
 }
}

```

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagegeneration@002:predict"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagegeneration@002:predict" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```python
{
 "predictions": [
 {
 "mimeType": "image/png",
 "bytesBase64Encoded": "iVBOR..[base64-encoded-upscaled-image]...YII="
 }
 ]
}

```

## What's next

- For more information, see [Imagen on Vertex AI
 overview](../image/Imagen-on-Vertex-AI.md) and [Generate images using text prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images).

[Previous

arrow\_back

Generate images using text prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images)