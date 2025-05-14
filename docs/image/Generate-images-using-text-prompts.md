---
date_scraped: 2025-05-12
title: Generate Images Using Text Prompts
---

# Generate images using text prompts 

**API reference overview**: To view an overview of the API options for image generation and
editing, see the [`imagegeneration` model API reference](../model-reference/imagen-api.md).

You can use Imagen on Vertex AI to generate new images from a text prompt you
provide in the Google Cloud console or send in a request to the
Vertex AI API .

For more information about writing text prompts for image generation and editing,
see the [prompt guide](https://cloud.google.com/vertex-ai/generative-ai/docs/image/img-gen-prompt-guide).

[View Imagen for Generation model card](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/imagen-3.0-generate-002)

[Try image generation (Vertex AI Studio)](https://console.cloud.google.com/vertex-ai/generative/vision)

## Locations

A location is a [region](/about/locations) you can specify in a request to
control where data is stored at rest. For a list of available regions, see [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).

## Safety filtering

Both input data and output content are checked for offensive material when
you send an image generation request to Imagen. This means a text
prompt input that's offensive can be blocked. Similarly, offensive output images
might also be blocked, affecting the number of generated images you get in a
response.

For more information about safety filtering and blocked content handling, see
[Responsible AI and usage guidelines for
Imagen](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-filters).

## Performance and limitations

The following limits apply when you use an Imagen model
for image generation:

| Limits | Value (Imagen 3) |
| --- | --- |
| Maximum number of API requests per minute per project | Imagen 3: 20 Imagen 3 Fast: 200 |
| Maximum number of images returned per request (text-to-image generation) | 4 |
| Maximum image size uploaded or sent in a request (MB) | 10 MB |
| Supported returned image resolution (pixels) | - 1024x1024 pixels (1:1 aspect ratio) - 896x1280 (3:4 aspect ratio) - 1280x896 (4:3 aspect ratio) - 768x1408 (9:16 aspect ratio) - 1408x768 (16:9 aspect ratio) |
| Maximum number of input tokens (text-to-image generation prompt text) | 480 tokens |

## Model versions

There are multiple image generation models that you can use. For more
information, see [Imagen
models](../supported-models_1.md).

## Before you begin

- Sign in to your Google Cloud account. If you're new to
 Google Cloud, [create an account](https://console.cloud.google.com/freetrial) to evaluate how our products perform in
 real-world scenarios. New customers also get $300 in free credits to
 run, test, and deploy workloads.
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
1. Set up authentication for your environment.

 Select the tab for how you plan to use the samples on this page:

 ### Console

 When you use the Google Cloud console to access Google Cloud services and
 APIs, you don't need to set up authentication.

 ### Java

 To use the Java samples on this page in a local
 development environment, install and initialize the gcloud CLI, and
 then set up Application Default Credentials with your user credentials.

 1. [Install](https://cloud.google.com/sdk/docs/install) the Google Cloud CLI.
 2. If you're using an external identity provider (IdP), you must first
 [sign in to the gcloud CLI with your federated identity](https://cloud.google.com/iam/docs/workforce-log-in-gcloud).
 3. To [initialize](https://cloud.google.com/sdk/docs/initializing) the gcloud CLI, run the following command:

 ```python
 gcloud init
 ```
 4. If you're using a local shell, then create local authentication credentials for your user
 account:

 ```python
 gcloud auth application-default login
 ```

 You don't need to do this if you're using Cloud Shell.

 If an authentication error is returned, and you are using an external identity provider
 (IdP), confirm that you have
 [signed in to the gcloud CLI with your federated identity](https://cloud.google.com/iam/docs/workforce-log-in-gcloud).

 For more information, see
 [Set up ADC for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)
 in the Google Cloud authentication documentation.

 ### Node.js

 To use the Node.js samples on this page in a local
 development environment, install and initialize the gcloud CLI, and
 then set up Application Default Credentials with your user credentials.

 1. [Install](https://cloud.google.com/sdk/docs/install) the Google Cloud CLI.
 2. If you're using an external identity provider (IdP), you must first
 [sign in to the gcloud CLI with your federated identity](https://cloud.google.com/iam/docs/workforce-log-in-gcloud).
 3. To [initialize](https://cloud.google.com/sdk/docs/initializing) the gcloud CLI, run the following command:

 ```python
 gcloud init
 ```
 4. If you're using a local shell, then create local authentication credentials for your user
 account:

 ```python
 gcloud auth application-default login
 ```

 You don't need to do this if you're using Cloud Shell.

 If an authentication error is returned, and you are using an external identity provider
 (IdP), confirm that you have
 [signed in to the gcloud CLI with your federated identity](https://cloud.google.com/iam/docs/workforce-log-in-gcloud).

 For more information, see
 [Set up ADC for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)
 in the Google Cloud authentication documentation.

 ### Python

 To use the Python samples on this page in a local
 development environment, install and initialize the gcloud CLI, and
 then set up Application Default Credentials with your user credentials.

 1. [Install](https://cloud.google.com/sdk/docs/install) the Google Cloud CLI.
 2. If you're using an external identity provider (IdP), you must first
 [sign in to the gcloud CLI with your federated identity](https://cloud.google.com/iam/docs/workforce-log-in-gcloud).
 3. To [initialize](https://cloud.google.com/sdk/docs/initializing) the gcloud CLI, run the following command:

 ```python
 gcloud init
 ```
 4. If you're using a local shell, then create local authentication credentials for your user
 account:

 ```python
 gcloud auth application-default login
 ```

 You don't need to do this if you're using Cloud Shell.

 If an authentication error is returned, and you are using an external identity provider
 (IdP), confirm that you have
 [signed in to the gcloud CLI with your federated identity](https://cloud.google.com/iam/docs/workforce-log-in-gcloud).

 For more information, see
 [Set up ADC for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)
 in the Google Cloud authentication documentation.

 ### REST

 To use the REST API samples on this page in a local development environment,
 you use the credentials you provide to the gcloud CLI.

 After [installing](https://cloud.google.com/sdk/docs/install) the Google Cloud CLI,
 [initialize](https://cloud.google.com/sdk/docs/initializing) it by running the following command:

 ```python
 gcloud init
 ```

 If you're using an external identity provider (IdP), you must first
 [sign in to the gcloud CLI with your federated identity](https://cloud.google.com/iam/docs/workforce-log-in-gcloud).

 For more information, see
 [Authenticate for using REST](https://cloud.google.com/docs/authentication/rest)
 in the Google Cloud authentication documentation.

## Generate images with text

To see examples of image generation using Imagen,
run the following Jupyter notebooks in the environment of your choice:

- "Image Generation with Imagen on Vertex AI":

 [Open
 in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/image_generation.ipynb)
 |
 [Open
 in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fimage_generation.ipynb)
 |
 [Open
 in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fimage_generation.ipynb)
 |
 [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/image_generation.ipynb)
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

You can generate novel images using only descriptive text as an input. The following samples show
you basic instructions to generate images, but you can also use
[additional parameters](#use-params) depending on your use case.

### Console

1. In the Google Cloud console, open the **Vertex AI Studio > Media** tab in the
 Vertex AI dashboard.

 [Go to the Vertex AI Studio tab](https://console.cloud.google.com/vertex-ai/generative/vision)
2. In the **Write your prompt** field, enter a description for the
 images you want to generate. For details about writing effective prompts, see the
 [prompt guide](https://cloud.google.com/vertex-ai/generative-ai/docs/image/img-gen-prompt-guide).

 - For example: *small boat on water in the morning watercolor
 illustration*
3. Optional. In the **Model options** box in the **Parameters** panel, select the model
 version to use. For more information, see [model versions](#model-versions).
4. Optional. Change [standard and advanced parameters](#use-params).

 These features are subject to model availability. For more information,
 see [model versions](#model-versions).
5. To generate images, click play\_arrow**Generate**.

 **Image generation** view of images generated with
 Imagen on Vertex AI from the prompt: *small red boat on water in the morning watercolor
 illustration muted colors*.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

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
see [Imagen API reference: Generate images](../model-reference/imagen-api.md).

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
[`ImageGenerationModel`](https://cloud.google.com/python/docs/reference/aiplatform/latest/vertexai.preview.vision_models.ImageGenerationModel) and save generated
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

### Java

Before trying this sample, follow the Java setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Java API
reference documentation](/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

In this sample, you specify the `imagen-3.0-generate-001` model as part of
an [`EndpointName`](/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.EndpointName). The [`EndpointName`](/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.EndpointName)
is passed to the [`predict`](/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient#com_google_cloud_aiplatform_v1_PredictionServiceClient_predict_com_google_cloud_aiplatform_v1_EndpointName_java_util_List_com_google_protobuf_Value__com_google_protobuf_Value_) method which is called on a
[`PredictionServiceClient`](/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient). The service generates
images which are then saved locally. For more information on model versions and
features, see [model versions](#model-versions).

```python

import com.google.api.gax.rpc.ApiException;
import com.google.cloud.aiplatform.v1.EndpointName;
import com.google.cloud.aiplatform.v1.PredictResponse;
import com.google.cloud.aiplatform.v1.PredictionServiceClient;
import com.google.cloud.aiplatform.v1.PredictionServiceSettings;
import com.google.gson.Gson;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Value;
import com.google.protobuf.util.JsonFormat;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class GenerateImageSample {

 public static void main(String[] args) throws IOException {
 // TODO(developer): Replace these variables before running the sample.
 String projectId = "my-project-id";
 String location = "us-central1";
 String prompt = ""; // The text prompt describing what you want to see.

 generateImage(projectId, location, prompt);
 }

 // Generate an image using a text prompt using an Imagen model
 public static PredictResponse generateImage(String projectId, String location, String prompt)
 throws ApiException, IOException {
 final String endpoint = String.format("%s-aiplatform.googleapis.com:443", location);
 PredictionServiceSettings predictionServiceSettings =
 PredictionServiceSettings.newBuilder().setEndpoint(endpoint).build();

 // Initialize client that will be used to send requests. This client only needs to be created
 // once, and can be reused for multiple requests.
 try (PredictionServiceClient predictionServiceClient =
 PredictionServiceClient.create(predictionServiceSettings)) {

 final EndpointName endpointName =
 EndpointName.ofProjectLocationPublisherModelName(
 projectId, location, "google", "imagen-3.0-generate-001");

 Map<String, Object> instancesMap = new HashMap<>();
 instancesMap.put("prompt", prompt);
 Value instances = mapToValue(instancesMap);

 Map<String, Object> paramsMap = new HashMap<>();
 paramsMap.put("sampleCount", 1);
 // You can't use a seed value and watermark at the same time.
 // paramsMap.put("seed", 100);
 // paramsMap.put("addWatermark", false);
 paramsMap.put("aspectRatio", "1:1");
 paramsMap.put("safetyFilterLevel", "block_some");
 paramsMap.put("personGeneration", "allow_adult");
 Value parameters = mapToValue(paramsMap);

 PredictResponse predictResponse =
 predictionServiceClient.predict(
 endpointName, Collections.singletonList(instances), parameters);

 for (Value prediction : predictResponse.getPredictionsList()) {
 Map<String, Value> fieldsMap = prediction.getStructValue().getFieldsMap();
 if (fieldsMap.containsKey("bytesBase64Encoded")) {
 String bytesBase64Encoded = fieldsMap.get("bytesBase64Encoded").getStringValue();
 Path tmpPath = Files.createTempFile("imagen-", ".png");
 Files.write(tmpPath, Base64.getDecoder().decode(bytesBase64Encoded));
 System.out.format("Image file written to: %s\n", tmpPath.toUri());
 }
 }
 return predictResponse;
 }
 }

 private static Value mapToValue(Map<String, Object> map) throws InvalidProtocolBufferException {
 Gson gson = new Gson();
 String json = gson.toJson(map);
 Value.Builder builder = Value.newBuilder();
 JsonFormat.parser().merge(json, builder);
 return builder.build();
 }
}

```

### Node.js

Before trying this sample, follow the Node.js setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Node.js API
reference documentation](/nodejs/docs/reference/aiplatform/latest).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

In this sample, you call the [`predict`](/nodejs/docs/reference/aiplatform/latest/aiplatform/v1.predictionserviceclient#_google_cloud_aiplatform_v1_PredictionServiceClient_predict_member_1_)
method on a
[`PredictionServiceClient`](/nodejs/docs/reference/aiplatform/latest/aiplatform/v1.predictionserviceclient).
The service generates images which are
then saved locally. For more information on model versions and features, see
[model versions](#model-versions).

```python
/**
 * TODO(developer): Update these variables before running the sample.
 */
const projectId = process.env.CAIP_PROJECT_ID;
const location = 'us-central1';
const prompt = 'a dog reading a newspaper';

const aiplatform = require('@google-cloud/aiplatform');

// Imports the Google Cloud Prediction Service Client library
const {PredictionServiceClient} = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects
const {helpers} = aiplatform;

// Specifies the location of the api endpoint
const clientOptions = {
 apiEndpoint: `${location}-aiplatform.googleapis.com`,
};

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function generateImage() {
 const fs = require('fs');
 const util = require('util');
 // Configure the parent resource
 const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001`;

 const promptText = {
 prompt: prompt, // The text prompt describing what you want to see
 };
 const instanceValue = helpers.toValue(promptText);
 const instances = [instanceValue];

 const parameter = {
 sampleCount: 1,
 // You can't use a seed value and watermark at the same time.
 // seed: 100,
 // addWatermark: false,
 aspectRatio: '1:1',
 safetyFilterLevel: 'block_some',
 personGeneration: 'allow_adult',
 };
 const parameters = helpers.toValue(parameter);

 const request = {
 endpoint,
 instances,
 parameters,
 };

 // Predict request
 const [response] = await predictionServiceClient.predict(request);
 const predictions = response.predictions;
 if (predictions.length === 0) {
 console.log(
 'No image was generated. Check the request parameters and prompt.'
 );
 } else {
 let i = 1;
 for (const prediction of predictions) {
 const buff = Buffer.from(
 prediction.structValue.fields.bytesBase64Encoded.stringValue,
 'base64'
 );
 // Write image content to the output file
 const writeFile = util.promisify(fs.writeFile);
 const filename = `output${i}.png`;
 await writeFile(filename, buff);
 console.log(`Saved image ${filename}`);
 i++;
 }
 }
}
await generateImage();
```

## Use parameters to generate images

When you generate images there are several standard and advanced parameters you
can set depending on your use case.

### Add or verify an image watermark

By default, a digital watermark is added to any images generated by a
[model version](#model-versions) that supports watermark generation. This
features adds a non-visible digital watermark—called a
[SynthID](https://deepmind.google/technologies/synthid/)—to images. You can then verify if an image
contains a digital watermark or not.

#### Generate watermarked images

Use the following samples to generate images with a digital watermark.

### Console

Model versions 006 and greater automatically add a digital watermark when
you [Generate images](#text-image-gen). You can't disable digital watermark
for image generation using the Google Cloud console.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_VERSION: The `imagegeneration` model version to use. Available
 values:
 - `imagen-3.0-generate-002` (newest model)
 - `imagen-3.0-generate-001`
 - `imagen-3.0-fast-generate-001` - Low latency model version.
 - `imagegeneration@006`

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
- ADD\_WATERMARK: boolean. Optional. Whether to enable a watermark for generated images.
 Any image generated when the field is set to `true` contains a digital
 [SynthID](https://deepmind.google/technologies/synthid/) that you can use to verify
 a watermarked image.
 If you omit this field, the default value of `true` is used; you must set the value
 to `false` to disable this feature. You can use the `seed` field to get
 deterministic output only when this field is set to `false`.

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
 "sampleCount": IMAGE_COUNT,
 "addWatermark": ADD_WATERMARK
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
the generated image bytes base64-encoded. The digital watermark is automatically added to images,
so the response is the same as a non-watermarked response.

```python
{
 "predictions": [
 {
 "mimeType": "image/png",
 "bytesBase64Encoded": "BASE64_IMG_BYTES"
 },
 {
 "bytesBase64Encoded": "BASE64_IMG_BYTES",
 "mimeType": "image/png"
 }
 ]
}

```

### Vertex AI SDK for Python

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

### Node.js

```python
/**
 * TODO(developer): Update these variables before running the sample.
 */
const projectId = process.env.CAIP_PROJECT_ID;
const location = 'us-central1';
const prompt = 'a dog reading a newspaper';

const aiplatform = require('@google-cloud/aiplatform');

// Imports the Google Cloud Prediction Service Client library
const {PredictionServiceClient} = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects
const {helpers} = aiplatform;

// Specifies the location of the api endpoint
const clientOptions = {
 apiEndpoint: `${location}-aiplatform.googleapis.com`,
};

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function generateImage() {
 const fs = require('fs');
 const util = require('util');
 // Configure the parent resource
 const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001`;

 const promptText = {
 prompt: prompt, // The text prompt describing what you want to see
 };
 const instanceValue = helpers.toValue(promptText);
 const instances = [instanceValue];

 const parameter = {
 sampleCount: 1,
 // You can't use a seed value and watermark at the same time.
 // seed: 100,
 // addWatermark: false,
 aspectRatio: '1:1',
 safetyFilterLevel: 'block_some',
 personGeneration: 'allow_adult',
 };
 const parameters = helpers.toValue(parameter);

 const request = {
 endpoint,
 instances,
 parameters,
 };

 // Predict request
 const [response] = await predictionServiceClient.predict(request);
 const predictions = response.predictions;
 if (predictions.length === 0) {
 console.log(
 'No image was generated. Check the request parameters and prompt.'
 );
 } else {
 let i = 1;
 for (const prediction of predictions) {
 const buff = Buffer.from(
 prediction.structValue.fields.bytesBase64Encoded.stringValue,
 'base64'
 );
 // Write image content to the output file
 const writeFile = util.promisify(fs.writeFile);
 const filename = `output${i}.png`;
 await writeFile(filename, buff);
 console.log(`Saved image ${filename}`);
 i++;
 }
 }
}
await generateImage();
```

#### Verify a watermarked image

Do the following:

1. In the Google Cloud console, open the **Vertex AI Studio > Media** tab in the
 Vertex AI dashboard.

 [Go to the Vertex AI Studio tab](https://console.cloud.google.com/vertex-ai/generative/vision)
2. In the lower panel, click local\_police**Verify**.
3. Click **Upload image**.
4. Select a locally-saved generated image.

 Watermarked images display a local\_police**SynthID detected**
 badge.

### Configure Responsible AI (RAI) safety settings

**Note:** The available settings depend on the model version that you use.
For more information, see [Imagen
models](../supported-models_1.md) and the [API
reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/image-generation).

There are several [Responsible AI (RAI) filtering](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-filters) parameters you can
use with an image generation model. For example, you can let the model report
RAI filter codes for blocked content, disable people or face generation using
RAI filters, set the level of content filtering, or return rounded RAI scores of
list of safety attributes for input and output.

For more detailed information about Responsible AI (RAI), its associated
parameters, and their sample output, see [Understand and configure Responsible
AI for Imagen](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-filters).

The following samples show you how to set available RAI parameters for
image generation.

### Console

1. In the Google Cloud console, open the **Vertex AI Studio > Media** tab in the
 Vertex AI dashboard.

 [Go to the Vertex AI Studio tab](https://console.cloud.google.com/vertex-ai/generative/vision)
2. Add your text prompt and choose your input parameters.
3. If not expanded, click **Advanced options**.
4. Click **Safety settings**.
5. Choose your safety settings:

 - **Person/face generation**: Choose a setting:
 - `Allow (All ages)`
 - `Allow (Adults only)`
 - `Don't allow`
 - **Safety filter threshold**: Choose a setting:
 - `Block low and above`
 - `Block medium and above`
 - `Block only high`
6. Click **Save**.
7. Click play\_arrow**Generate**.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: Your project's region. For example,
 `us-central1`, `europe-west2`, or `asia-northeast3`. For a list
 of available regions, see
 [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).
- TEXT\_PROMPT: The text prompt that guides what images the model
 generates. This field is required for both generation and editing.
- IMAGE\_COUNT: The number of generated images.
 Accepted integer values: 1-8 (`imagegeneration@002`), 1-4 (all other model versions).
 Default value: 4.
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
- PERSON\_SETTING: string. Optional. The safety setting that controls the type of
 people or face generation the model allows. Available values:
 - `allow_adult` (default): Allow generation of adults only, except for celebrity
 generation. Celebrity generation is not allowed for any setting.
 - `dont_allow`: Disable the inclusion of people or faces in generated images.
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

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagegeneration@006:predict
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
 "sampleCount": IMAGE_COUNT,
 "safetySetting": "SAFETY_SETTING",
 "personGeneration": "PERSON_SETTING",
 "includeRaiReason": INCLUDE_RAI_REASON,
 "includeSafetyAttributes": INCLUDE_SAFETY_ATTRIBUTES
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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagegeneration@006:predict"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagegeneration@006:predict" | Select-Object -Expand Content
```

The response you get depends on the safety settings you set.
For more information, see [Understand and configure
Responsible AI (RAI) for Imagen](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen).

### Prompt enhancement using prompt rewriter

**Feature availability**: This feature is available only for
the Imagen 3 model version 002
(`imagen-3.0-generate-002`).

The Imagen 3 model version 002 includes a prompt rewriter
feature that uses an LLM-based prompt rewriting tool. This tool generally adds
more detail to the provided prompt to deliver higher quality images that better
reflect the prompt provided. If you disable this feature, the quality and
prompt-adherence of the images you receive may be impacted. This feature is
enabled by default.

The rewritten prompt is only delivered by API response if the original prompt
is fewer than 30 words long.

### Console

1. In the Google Cloud console, open the **Vertex AI Studio > Media** tab in the
 Vertex AI dashboard.

 [Go to the Vertex AI Studio tab](https://console.cloud.google.com/vertex-ai/generative/vision)
2. Add your text prompt and choose your input parameters.
3. In the **Parameters** panel, use the
 toggle\_on**Enable prompt enhancement**
 toggle option to leave prompt enhancement enabled or to disable this
 feature.
4. Click play\_arrow**Generate**.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_VERSION: The image generation model version to use. Available
 values that support prompt enhancement:
 - `imagen-3.0-generate-002`

 For more information about model versions and features, see [model
 versions](#model-versions).
- LOCATION: Your project's region. For example,
 `us-central1`, `europe-west2`, or `asia-northeast3`. For a list
 of available regions, see
 [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).
- TEXT\_PROMPT: The text prompt that guides what images the model
 generates. Before images are generated, this base prompt is enhanced with more detail and
 descripitive language using the LLM-based prompt rewriting tool.
- IMAGE\_COUNT: The number of generated images.
 Accepted integer values: 1-4. Default value: 4.
- `enhancePrompt` - A boolean to enable LLM-based prompt enhancement. By default,
 this value is set to `true`.

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
 "sampleCount": IMAGE_COUNT,
 "enhancePrompt": true
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

With prompt enhancement enabled, the response includes an additional `prompt` field that
shows the enhanced prompt and its associated generated image:

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

For example, the following sample response is for a request with
`"sampleCount": 2` and `"prompt": "A raccoon wearing formal clothes, wearing a top
hat. Oil painting in the style of Vincent Van Gogh."`. The response returns two prediction
objects, each with their enhanced prompt and the generated image bytes base64-encoded.

```python
{
 "predictions": [
 {
 "mimeType": "image/png",
 "prompt": "An oil painting in the style of Vincent van Gogh, depicting a raccoon adorned
 in a finely tailored tuxedo, complete with a crisp white shirt and a bow tie. The raccoon
 also sports a classic top hat, perched jauntily on its head. The painting uses thick,
 swirling brushstrokes characteristic of van Gogh, with vibrant hues of blue, yellow, and
 green in the background, contrasting with the dark tones of the raccoon's attire. The light
 source is subtly placed, casting a dramatic shadow of the raccoon's attire onto the surface
 it sits upon, further enhancing the depth and dimensionality of the composition. The
 overall impression is one of a whimsical and sophisticated character, a raccoon elevated to
 a higher class through its formal attire, rendered in van Gogh's iconic style.",
 "bytesBase64Encoded": "BASE64_IMG_BYTES"
 },
 {
 "mimeType": "image/png",
 "prompt": "An oil painting in the style of Vincent van Gogh featuring a raccoon in a
 dapper suit, complete with a black jacket, crisp white shirt, and a black bow tie. The
 raccoon is wearing a black top hat, adding a touch of elegance to its ensemble. The
 painting is rendered with characteristic van Gogh brushwork, utilizing thick, impasto
 strokes of color. The background is a swirl of blues, greens, and yellows, creating a
 vibrant yet slightly chaotic atmosphere that contrasts with the raccoon's formal attire.
 The lighting is dramatic, casting sharp shadows and highlighting the textures of the fabric
 and the raccoon's fur, enhancing the sense of realism within the fantastical scene. The
 composition focuses on the raccoon's proud posture, highlighting the whimsical contrast of
 a wild animal dressed in formal attire, captured in the unique artistic language of van
 Gogh. ",
 "bytesBase64Encoded": "BASE64_IMG_BYTES"
 }
 ]
}

```

### Text prompt language

**Preview**

This Imagen feature is a Preview offering, subject to the
"Pre-GA Offerings Terms" of the
[Google Cloud Service Specific Terms](https://cloud.google.com/terms/service-terms). Pre-GA products and
features may have limited support, and changes to pre-GA products and features may not be
compatible with other pre-GA versions. For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages). Further, by using
this Imagen feature, you agree to the Generative AI Preview
[terms and conditions](/trustedtester/aitos) ("Preview Terms").

This optional parameter lets you set the language of the input text for image
generation or image editing.

| | |
| --- | --- |
| Image generated from prompt: ऊपर से देखा गया किताबों का ढेर। सबसे ऊपरी पुस्तक में एक पक्षी का जलरंग चित्रण है। किताब पर VERTEX AI मोटे अक्षरों में लिखा हुआ है 1 1 *A pile of books seen from above. The topmost book contains a watercolor illustration of a bird. **VERTEX AI** is written in bold letters on the book.* | Image generated from prompt: 어두운 노란색과 청록색으로 이루어진 밝은 색의 옷을입고 귀걸이를 끼고있는 여자 포스트 모던 패션 사진 2 2 *Woman wearing bright colors, in the style of dark yellow and dark cyan, wearing earrings, postmodern fashion photography.* |

#### Before you begin

Before you use this feature, complete the following steps:

1. To create a service identity for Vertex AI to use in your project,
 use the [following
 command](https://cloud.google.com/sdk/gcloud/reference/beta/services/identity/create):

 ```python
 gcloud beta services identity create --service=aiplatform.googleapis.com --project=PROJECT_ID

 ```
2. Request feature access. To request access, send an email to the
 [Google Cloud Trusted Testers Access: GenApp
 Builder](mailto:cloud-trusted-tester-access-genapp@google.com) group.
 Reference **Multi-Lingual Prompts** in your message, and include your
 **project number**. The approval process usually takes several hours.

#### Set text prompt language

The following input values are supported for the text-prompt lanague:

- Chinese (simplified) (`zh`/`zh-CN`)
- Chinese (traditional) (`zh-TW`)
- English (`en`, default value)
- Hindi (`hi`)
- Japanese (`ja`)
- Korean (`ko`)
- Portuguese (`pt`)
- Spanish (`es`)

### Console

If your prompt is in one of the supported languages,
Imagen detects and translates your text and
returns your generated or edited images.

If your prompt is in an unsupported language, Imagen uses
the text verbatim for the request. This might result in unexpected output.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

**Important:** `imagen-3.0-generate-002` doesn't support the text prmopt
language feature.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TEXT\_PROMPT: The text prompt that guides what images the model
 generates. This field is required for both generation and editing.
- PROMPT\_LANGUAGE: string. Optional. The language code that corresponds to your text
 prompt language.
 In this example it would be `hi`. Available values:
 - `auto` - Automatic detection. If Imagen detects a
 supported language, the prompt (and optionally, a negative prompt), are
 translated to English. If the language detected is not supported,
 Imagen uses the input text verbatim, which might result in unexpected
 output. No error code is returned.
 - `en` - English (default value if omitted)
 - `es` - Spanish
 - `hi` - Hindi
 - `ja` - Japanese
 - `ko` - Korean
 - `pt` - Portuguese
 - `zh-TW` - Chinese (traditional)
 - `zh` or `zh-CN` - Chinese (simplified)

HTTP method and URL:

```python
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/imagegeneration@005:predict
```

Request JSON body:

```python
{
 "instances": [
 {
 "prompt": "सूर्यास्त के समय एक समुद्र तट। उड़ते पक्षी, हवा में लहराते नारियल के पेड़। लोग समुद्र तट पर सैर का आनंद ले रहे हैं।"
 }
 ],
 "parameters": {
 "language": "PROMPT_LANGUAGE"
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
 "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/imagegeneration@005:predict"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/imagegeneration@005:predict" | Select-Object -Expand Content
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

### Aspect ratio

**Note:** You can only set certain aspect ratios using specific model versions. For
aspect ratio availability by version, see the [model
versions](#model-versions) section.

Depending on how you plan to use your generated images, some aspect ratios may
work better than others. Choose the aspect ratio that best suits your use case.

Supported aspect ratios and their intended use:

| Aspect ratio | Intended use | Image resolution (pixels) | Sample image |
| --- | --- | --- | --- |
| `1:1` | default, square, general use | 1024x1024 (Imagen v.002) 1536x1536 (Imagen 2 v.005, v.006) 1024x1024 (Imagen 3) | Prompt: *overhead shot of a pasta dinner, studio photo in the style of food magazine cover*. |
| `3:4` | TV, media, film | 1344x1792 (Imagen 2 v.006) 896x1280 (Imagen 3) | Prompt: *commercial photoshoot, fragrance ad, lavender vanilla scented bottle on a light colored background*. |
| `4:3` | TV, media, film | 1792x1344 (Imagen 2 v.006) 1280x896 (Imagen 3) | Prompt: *commercial photoshoot, green and gray high top sneakers, 4k, dramatic angles*. |
| `9:16` | portrait, tall objects, mobile devices | 1134x2016 (Imagen 2 v.005, v.006) 768x1408 (Imagen 3) | Prompt: *skyscrapers in new york city, futuristic rendering, concept, digital art*. |
| `16:9` | landscape | 2016x1134 (Imagen 2 v.006) 1408x768 (Imagen 3) | Prompt: *nature photography, a beach in hawaii with the ocean in the background, lens flare, sunset*. |

### Console

1. Follow the [generate image with text](#text-image-gen) instructions to
 open the Vertex AI Studio and enter your text prompt.
2. In the **Parameters** panel, select an aspect ratio from the
 **Aspect ratio** menu.
3. Click play\_arrow**Generate**.

### REST

Aspect ratio is an optional field in the `parameters` object of a JSON
request body.

1. Follow the [generate image with text](#text-image-gen) instructions to
 replace other request body variables.
2. Replace the following:

 - ASPECT\_RATIO: string. Optional. A generation mode parameter that controls aspect
 ratio. Supported ratio values and their intended use:
 - `1:1` (default, square)
 - `3:4` (Ads, social media)
 - `4:3` (TV, photography)
 - `16:9` (landscape)
 - `9:16` (portrait)

 ```python
 {
 "instances": [
 ...
 ],
 "parameters": {
 "sampleCount": IMAGE_COUNT,
 "aspectRatio": "ASPECT_RATIO"
 }
 }

 ```
3. Follow the [generate image with text](#text-image-gen) instructions to
 send your REST request.

### Number of results

Use the number of results parameter to limit the amount of images returned
for each request (generate or edit) you send.

### Console

1. Follow the [generate image with text](#text-image-gen) instructions to
 open the Vertex AI Studio and enter your text prompt.
2. In the **Parameters** panel, select a valid integer value in the
 **Number of results** field.
3. Click play\_arrow**Generate**.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

Number of results is a field in the `parameters` object of a JSON
request body.

1. Follow the [generate image with text](#text-image-gen) instructions to
 replace other request body variables.
2. Replace the following:

 - IMAGE\_COUNT: The number of generated images.
 Accepted integer values: 1-8 (`imagegeneration@002`), 1-4 (all other model versions).
 Default value: 4.

 ```python
 {
 "instances": [
 ...
 ],
 "parameters": { 
 "sampleCount": IMAGE_COUNT
 }
 }

 ```
3. Follow the [generate image with text](#text-image-gen) instructions to
 send your REST request.

### Negative prompt

**Caution:** Negative prompt isn't supported with the `imagen-3.0-generate-002`
model.

A negative prompt is a description of what you want to omit in generated images.
For example, consider the prompt *"a rainy city street at night
with no people"*. The model may interpret "people" as a directive of what
include instead of omit. To generate better results, you could
use the prompt *"a rainy city street at night"* with a negative
prompt *"people"*.

Imagen generates these images with and without a negative
prompt:

**Text prompt only**

- Text prompt: "*a pizza*"

**Text prompt and negative prompt**

- Text prompt: "*a pizza*"
- Negative prompt: "*pepperoni*"

### Console

1. Follow the [generate image with text](#text-image-gen) instructions to
 open the Vertex AI Studio and enter your text prompt.
2. In the **Parameters** panel, enter a negative prompt in the
 **Negative prompt** field.
3. Click play\_arrow**Generate**.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

Negative prompt is an optional field in the `parameters` object of a JSON
request body.

1. Follow the [generate image with text](#text-image-gen) instructions to
 replace other request body variables.
2. Replace the following:

 - NEGATIVE\_PROMPT: A negative prompt to help generate the images. For example:
 "animals" (removes animals), "blurry" (makes the image clearer), "text" (removes text), or
 "cropped" (removes cropped images).

 ```python
 {
 "instances": [
 ...
 ],
 "parameters": {
 "sampleCount": IMAGE_COUNT,
 "negativePrompt": "NEGATIVE_PROMPT"
 }
 }

 ```
3. Follow the [generate image with text](#text-image-gen) instructions to
 send your REST request.

### Seed number

**Caution:** Model version 006 and greater only. To use the `seed` field, you must
also disable the watermark feature using `"addWatermark": false`.

A seed number is a number you add to a request to make generated images
deterministic. Adding a seed number with your request is a way to assure you get
the same generated images each time. For example, you can provide a prompt, set
the number of results to 1, and use a seed number to get the same image each
time you use all those same input values. If you send the same request with the
number of results set to 8, you will get the same eight images. However, the
images aren't necessarily returned in the same order.

### Console

1. Follow the [generate image with text](#text-image-gen) instructions to
 open the Vertex AI Studio and enter your text prompt.
2. In the **Parameters** panel, click the
 expand\_more**Advanced options**
 expandable section.
3. In the **Seed** field, enter a seed number.
4. Click play\_arrow**Generate**.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

Seed number is an optional field in the `parameters` object of a JSON
request body.

1. Follow the [generate image with text](#text-image-gen) instructions to
 replace other request body variables.
2. Replace the following:

 - SEED\_NUMBER: integer. Optional. Any non-negative integer you provide to make output
 images deterministic. Providing the same seed number always results in the same output images. If
 the model you're using supports digital watermarking, you must set
 `"addWatermark": false` to use this field.
 Accepted integer values: `1` - `2147483647`.

 ```python
 {
 "instances": [
 ...
 ],
 "parameters": {
 "sampleCount": IMAGE_COUNT,
 "seed": SEED_NUMBER,
 // required for model version 006 and greater only when using a seed number
 "addWatermark": false
 }
 }

 ```
3. Follow the [generate image with text](#text-image-gen) instructions to
 send your REST request.

### Predefined style

**Feature availability:** This feature is available only
for model version 002 (`imagegeneration@002`).

The style of image you are looking to generate. You can use this feature to
create images in popular styles such as digital art, watercolor, or
cyberpunk.

### Console

1. Follow the [generate image with text](#text-image-gen) instructions to
 open the Vertex AI Studio and enter your text prompt.
2. In **Style** section of the **Parameters** panel, chose a style from the
 menu.
3. Click play\_arrow**Generate**.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

Predefined style is an optional field in the `parameters` object of a JSON
request body.

1. Follow the [generate image with text](#text-image-gen) instructions to
 replace other request body variables.
2. Replace the following:

 - IMAGE\_STYLE: One of the available predefined styles:
 - `photograph`
 - `digital_art`
 - `landscape`
 - `sketch`
 - `watercolor`
 - `cyberpunk`
 - `pop_art`

 ```python
 {
 "instances": [
 ...
 ],
 "parameters": {
 "sampleCount": IMAGE_COUNT,
 "sampleImageStyle": "IMAGE_STYLE"
 }
 }

 ```
3. Follow the [generate image with text](#text-image-gen) instructions to
 send your REST request.

## Upscale an image

Use upscaling to increase the size of existing, generated, or edited images
without losing quality.

### Console

1. Follow the [generate image with text](#text-image-gen) instructions to
 generate images.
2. Select the image to upscale.
3. Click
 download**Export**.
4. Select **Upscale images**.
5. Choose a value from the **Scale factor**.
6. Click
 download**Export** to save the
 upscaled image.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](../model-reference/imagen-api.md).

Upscaling mode is an optional field in the `parameters` object of a JSON
request body. When you upscale an image using the API, specify
`"mode": "upscale"` and `upscaleConfig`.

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

Read articles about Imagen and other Generative AI on Vertex AI
products:

- [A developer's guide to getting started with Imagen 3 on
 Vertex AI](https://cloud.google.com/blog/products/ai-machine-learning/a-developers-guide-to-imagen-3-on-vertex-ai?e=0?utm_source%3Dlinkedin)
- [New generative media models and tools, built with and for creators](https://blog.google/technology/ai/google-generative-ai-veo-imagen-3/#veo)
- [New in Gemini: Custom Gems and improved image generation with
 Imagen 3](https://blog.google/products/gemini/google-gemini-update-august-2024/)
- [Google DeepMind: Imagen 3 - Our highest quality
 text-to-image model](https://deepmind.google/technologies/imagen-3/)

[Previous

arrow\_back

Design image generation prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/image/img-gen-prompt-guide)

[Next

Generate images

arrow\_forward](../model-reference/imagen-api.md)