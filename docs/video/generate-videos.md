---
title: Veo
source: https://cloud.google.com/vertex-ai/generative-ai/docs/video/generate-videos
date_scraped: 2025-05-12
---

# Veo | AI Video Generator 

**API reference overview**: To view an overview of the API options for video generation, see the
[Veo model API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/veo-video-generation).

To see an example of Veo 2 Video Generation,
run the "Veo 2 Video Generation" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo2_video_generation.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fveo2_video_generation.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fveo2_video_generation.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo2_video_generation.ipynb)

You can use Veo on Vertex AI to generate new videos from a text prompt or an image
prompt that you provide in the Google Cloud console or send in a request to the
Vertex AI API.

[Try Veo on Vertex AI (Vertex AI Studio)](https://console.cloud.google.com/vertex-ai/studio/media)

[Try Veo in a Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo2_video_generation.ipynb)

[Request access: Experimental features](https://forms.gle/3MzcT3ibSJgk9D1U9)

## Veo 2 features and launch stage

Veo 2 offers several video generative AI features. These features
are available at different launch stages.

The following table describes features that are [Generally Available
(GA)](https://cloud.google.com/products#product-launch-stages) to all users:

| Feature | Description | Launch stage |
| --- | --- | --- |
| [Generate videos from text](#text-video-gen) | Generate videos from descriptive text input. | General Availability |

The following table describes features that are [Generally Available
(GA)](https://cloud.google.com/products#product-launch-stages), but require approval to use:

| Feature | Description | Launch stage |
| --- | --- | --- |
| [Generate videos from images](generate-videos.md) | Generate videos from an input image. | General Availability (approved users) |

## Locations

A location is a [region](/about/locations) you can specify in a request to
control where data is stored at rest. For a list of available regions, see
[Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).

## Performance and limitations

| Limits | Value |
| --- | --- |
| Modalities | - text-to-video generation - image-to-video generation |
| API calls (prompts per project per minute) | 10 |
| Request latency | Videos are typically generated within a few minutes, but may take longer during peak usage. |
| Maximum number of videos returned per request | 4 |
| Maximum video length | 8 seconds |
| Supported returned video resolution (pixels) | 720p |
| Frame rate | 24 frames per second (FPS) |
| Aspect ratio | - 16:9 - landscape - 9:16 - portrait |
| Maximum image size uploaded or sent in a request (image-to-video generation) | 20 MB |

## Responsible AI

Veo 2 generates realistic and high quality videos from natural
language text and image prompts, including images of people of all ages.
Veo 2 may provide you an error that indicates that your
Google Cloud project needs to be approved for person or child generation,
depending on the context of your text or image prompt.

If you require approval, please contact your Google account representative.

## Veo Vertex AI model versions and lifecycle

The veo model and version are the following:

| **Model name** | **Version** |
| --- | --- |
| Veo 2 | `veo-2.0-generate-001` |

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
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
1. Set up authentication for your environment.

 Select the tab for how you plan to use the samples on this page:

 ### Console

 When you use the Google Cloud console to access Google Cloud services and
 APIs, you don't need to set up authentication.

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

## Generate videos from text

To see an example of Veo 2 Video Generation,
run the "Veo 2 Video Generation" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo2_video_generation.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fveo2_video_generation.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fveo2_video_generation.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo2_video_generation.ipynb)

You can generate novel videos using only descriptive text as an input. The
following samples show you basic instructions to generate videos.

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
import time
from google import genai
from google.genai.types import GenerateVideosConfig

client = genai.Client()

# TODO(developer): Update and un-comment below line
# output_gcs_uri = "gs://your-bucket/your-prefix"

operation = client.models.generate_videos(
 model="veo-2.0-generate-001",
 prompt="a cat reading a book",
 config=GenerateVideosConfig(
 aspect_ratio="16:9",
 output_gcs_uri=output_gcs_uri,
 ),
)

while not operation.done:
 time.sleep(15)
 operation = client.operations.get(operation)
 print(operation)

if operation.response:
 print(operation.result.generated_videos[0].video.uri)

# Example response:
# gs://your-bucket/your-prefix
```

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

For more information about `veo-2.0-generate-001` model requests, see the
[`veo-2.0-generate-001` model API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/veo-video-generation).

1. Use the following command to send a video generation request. This
 request begins a long-running operation and stores output to a
 Cloud Storage bucket you specify.

 Before using any of the request data,
 make the following replacements:

 - PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
 - MODEL\_ID: The model ID to use. Available values:
 - `veo-2.0-generate-001` (GA allowlist)
 - TEXT\_PROMPT: The text prompt used to guide video generation.
 - OUTPUT\_STORAGE\_URI: Optional: The Cloud Storage bucket to store the output
 videos. If not provided, video bytes are returned in the response. For example:
 `gs://video-bucket/output/`.
 - RESPONSE\_COUNT: The number of video files you want to generate. Accepted integer
 values: 1-4.
 - DURATION: The length of video files that you want to generate. Accepted integer
 values are 5-8.
 - **Additional optional parameters**

 Use the following optional variables depending on your use
 case. Add some or all of the following parameters in the `"parameters": {}` object.

 ```python
 "parameters": {
 "aspectRatio": "ASPECT_RATIO",
 "negativePrompt": "NEGATIVE_PROMPT",
 "personGeneration": "PERSON_SAFETY_SETTING",
 "sampleCount": RESPONSE_COUNT,
 "seed": SEED_NUMBER
 }
 ```

 - ASPECT\_RATIO: string. Optional. Defines the aspect ratio of the generated
 videos. Values: `16:9` (default, landscape) or `9:16` (portrait).
 - NEGATIVE\_PROMPT: string. Optional. A text string that describes what you want
 to discourage the model from generating.
 - PERSON\_SAFETY\_SETTING: string. Optional. The safety setting that controls
 whether people or face generation is allowed. Values:
 - `allow_adult` (default value): Allow generation of adults only.
 - `disallow`: Disallows inclusion of people or faces in images.
 - RESPONSE\_COUNT: int. Optional. The number of output images requested. Values:
 `1`-`4`.
 - SEED\_NUMBER: uint32. Optional. A number to make generated videos deterministic.
 Specifying a seed number with your request without changing other parameters guides the
 model to produce the same videos. Values: `0` - `4294967295`.

 HTTP method and URL:

 ```python
 POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning
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
 "storageUri": "OUTPUT_STORAGE_URI",
 "sampleCount": "RESPONSE_COUNT"
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
 "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning" | Select-Object -Expand Content
 ```

 This request returns a full operation name with a unique operation ID. Use this full operation
 name to poll that status of the video generation request.

 ```python
 {
 "name": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/a1b07c8e-7b5a-4aba-bb34-3e1ccb8afcc8"
 }

 ```
2. Optional: Check the status of the video generation long-running
 operation.

 Before using any of the request data,
 make the following replacements:

 - PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
 - MODEL\_ID: The model ID to use. Available values:
 - `veo-2.0-generate-001` (GA allowlist)
 - OPERATION\_ID: The unique operation ID returned in the original generate video
 request.

 HTTP method and URL:

 ```python
 POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:fetchPredictOperation
 ```

 Request JSON body:

 ```python
 {
 "operationName": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/OPERATION_ID"
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
 "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:fetchPredictOperation"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:fetchPredictOperation" | Select-Object -Expand Content
 ```

 This request returns information about the operation, including if the operation is still running
 or is done.

 #### Response

 ```python
 {
 "name": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/OPERATION_ID",
 "done": true,
 "response": {
 "@type": "type.googleapis.com/cloud.ai.large_models.vision.GenerateVideoResponse",
 "videos": [
 {
 "gcsUri":"gs://BUCKET_NAME/TIMESTAMPED_FOLDER/sample_0.mp4",
 "mimeType": "video/mp4"
 }
 ]
 }
 }

 ```

### Console

1. In the Google Cloud console, go to the **Vertex AI Studio > Media
 Studio** page.

 [Media Studio](https://console.cloud.google.com/vertex-ai/studio/media)
2. Click **Video**.
3. Optional: In the **Settings** pane, configure the following settings:

 - **Model**: choose a model from the available options.
 - **Aspect ratio**: choose either **16:9** or **9:16**.
 - **Number of results**: adjust the slider or enter a value between **1**
 and **4**.
 - **Video length**: select a length between **5 seconds** and **8
 seconds**.
 - **Output directory**: click **Browse** to create or select a
 [Cloud Storage bucket](https://cloud.google.com/storage/docs/buckets) to store output files.
4. Optional: In the **Safety** section, select one of the following **Person
 generation** settings:

 - **Allow (Adults only)**: default value. Generate adult people or faces
 only. Don't generate youth or children people or faces.
 - **Don't allow**: don't generate people or faces.
5. Optional: In the **Advanced options** section, enter a **Seed** value for
 randomizing video generation.
6. In the **Write your prompt** box, enter your text prompt that describes the
 videos to generate.
7. Click send **Generate**.

## Generate videos from an image

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

| Sample input | Sample output |
| --- | --- |
| 1. Input image\* 2. Text prompt: *the elephant moves around naturally* | |

\* Image generated using Imagen on Vertex AI from the prompt:
*A Crochet elephant in intricate patterns walking on the savanna*

You can generate novel videos using only an image as an input, or and image and
descriptive text as the inputs. The following samples show you basic
instructions to generate videos from image and text.

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
import time
from google import genai
from google.genai.types import GenerateVideosConfig, Image

client = genai.Client()

# TODO(developer): Update and un-comment below line
# output_gcs_uri = "gs://your-bucket/your-prefix"

operation = client.models.generate_videos(
 model="veo-2.0-generate-001",
 image=Image(
 gcs_uri="gs://cloud-samples-data/generative-ai/image/flowers.png",
 mime_type="image/png",
 ),
 config=GenerateVideosConfig(
 aspect_ratio="16:9",
 output_gcs_uri=output_gcs_uri,
 ),
)

while not operation.done:
 time.sleep(15)
 operation = client.operations.get(operation)
 print(operation)

if operation.response:
 print(operation.result.generated_videos[0].video.uri)

# Example response:
# gs://your-bucket/your-prefix
```

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

For more information about `veo-2.0-generate-001` model requests, see the
[`veo-2.0-generate-001` model API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/veo-video-generation).

1. Use the following command to send a video generation request. This
 request begins a long-running operation and stores output to a
 Cloud Storage bucket you specify.

 Before using any of the request data,
 make the following replacements:

 - PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
 - MODEL\_ID: The model ID to use. Available values:
 - `veo-2.0-generate-001` (GA allowlist)
 - TEXT\_PROMPT: The text prompt used to guide video generation.
 - INPUT\_IMAGE: Base64-encoded bytes string representing the input image. To ensure
 quality, the input image should be 720p or higher (1280 x 720 pixels) and have a 16:9 or 9:16
 aspect ratio. Images of other aspect ratios or sizes may be resized or centrally cropped during
 the upload process.
 - MIME\_TYPE: The MIME type of the input image. Only the images of the following
 MIME types are supported: `image/jpeg` or `image/png`.
 - OUTPUT\_STORAGE\_URI: Optional: The Cloud Storage bucket to store the output
 videos. If not provided, video bytes are returned in the response. For example:
 `gs://video-bucket/output/`.
 - RESPONSE\_COUNT: The number of video files you want to generate. Accepted integer
 values: 1-4.
 - DURATION: The length of video files that you want to generate. Accepted integer
 values are 5-8.
 - **Additional optional parameters**

 Use the following optional variables depending on your use
 case. Add some or all of the following parameters in the `"parameters": {}` object.

 ```python
 "parameters": {
 "aspectRatio": "ASPECT_RATIO",
 "negativePrompt": "NEGATIVE_PROMPT",
 "personGeneration": "PERSON_SAFETY_SETTING",
 "sampleCount": RESPONSE_COUNT,
 "seed": SEED_NUMBER
 }
 ```

 - ASPECT\_RATIO: string. Optional. Defines the aspect ratio of the generated
 videos. Values: `16:9` (default, landscape) or `9:16` (portrait).
 - NEGATIVE\_PROMPT: string. Optional. A text string that describes what you want
 to discourage the model from generating.
 - PERSON\_SAFETY\_SETTING: string. Optional. The safety setting that controls
 whether people or face generation is allowed. Values:
 - `allow_adult` (default value): Allow generation of adults only.
 - `disallow`: Disallows inclusion of people or faces in images.
 - RESPONSE\_COUNT: int. Optional. The number of output images requested. Values:
 `1`-`4`.
 - SEED\_NUMBER: uint32. Optional. A number to make generated videos deterministic.
 Specifying a seed number with your request without changing other parameters guides the
 model to produce the same videos. Values: `0` - `4294967295`.

 HTTP method and URL:

 ```python
 POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning
 ```

 Request JSON body:

 ```python
 {
 "instances": [
 {
 "prompt": "TEXT_PROMPT",
 "image": {
 "bytesBase64Encoded": "INPUT_IMAGE",
 "mimeType": "MIME_TYPE"
 }
 }
 ],
 "parameters": {
 "storageUri": "OUTPUT_STORAGE_URI",
 "sampleCount": RESPONSE_COUNT
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
 "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning" | Select-Object -Expand Content
 ```

 This request returns a full operation name with a unique operation ID. Use this full operation
 name to poll that status of the video generation request.

 ```python
 {
 "name": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/a1b07c8e-7b5a-4aba-bb34-3e1ccb8afcc8"
 }

 ```
2. Optional: Check the status of the video generation long-running
 operation.

 Before using any of the request data,
 make the following replacements:

 - PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
 - MODEL\_ID: The model ID to use. Available values:
 - `veo-2.0-generate-001`
 - TEXT\_PROMPT: The text prompt used to guide video generation.
 - OUTPUT\_STORAGE\_URI: Optional: The Cloud Storage bucket to store the output
 videos. If not provided, video bytes are returned in the response. For example:
 `gs://video-bucket/output/`.
 - RESPONSE\_COUNT: The number of video files you want to generate. Accepted integer
 values: 1-4.
 - **Additional optional parameters**

 Use the following optional variables depending on your use
 case. Add some or all of the following parameters in the `"parameters": {}` object.

 ```python
 "parameters": {
 "aspectRatio": "ASPECT_RATIO",
 "negativePrompt": "NEGATIVE_PROMPT",
 "personGeneration": "PERSON_SAFETY_SETTING",
 "sampleCount": RESPONSE_COUNT,
 "seed": SEED_NUMBER
 }
 ```

 - ASPECT\_RATIO: string. Optional. Defines the aspect ratio of the generated
 videos. Values: `16:9` (default, landscape) or `9:16` (portrait).
 - NEGATIVE\_PROMPT: string. Optional. A text string that describes what you want
 to discourage the model from generating.
 - PERSON\_SAFETY\_SETTING: string. Optional. The safety setting that controls
 whether people or face generation is allowed. Values:
 - `allow_adult` (default value): Allow generation of adults only.
 - `disallow`: Disallows inclusion of people or faces in images.
 - RESPONSE\_COUNT: int. Optional. The number of output images requested. Values:
 `1`-`4`.
 - SEED\_NUMBER: uint32. Optional. A number to make generated videos deterministic.
 Specifying a seed number with your request without changing other parameters guides the
 model to produce the same videos. Values: `0` - `4294967295`.

 HTTP method and URL:

 ```python
 POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning
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
 "storageUri": "OUTPUT_STORAGE_URI",
 "sampleCount": "RESPONSE_COUNT"
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
 "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning" | Select-Object -Expand Content
 ```

 This request returns a full operation name with a unique operation ID. Use this full operation
 name to poll that status of the video generation request.

 ```python
 {
 "name": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/a1b07c8e-7b5a-4aba-bb34-3e1ccb8afcc8"
 }

 ```

### Console

1. In the Google Cloud console, go to the **Vertex AI >
 Media Studio** page.

 [Media Studio](https://console.cloud.google.com/vertex-ai/studio/media/generate)
2. In the lower panel, select the videocam**Generate videos**
 button.
3. Optional: In the **Settings** pane, choose a **Model** from the
 available options.
4. In the **Aspect ratio** section, choose an aspect ratio for the output
 videos.
5. In the **Number of results** section, accept the default value or modify the number of generated videos.
6. In the **Output directory** field, click **Browse** to create or select a Cloud Storage bucket to store output files.
7. Optional: modify the **Safety settings** or **Advanced options**.
8. In the **Prompt** field (*Write your prompt…*), click
 upload**Upload**.
9. Choose a local image to upload and click **Select**.
10. In the **Prompt** field (*Write your prompt…*), add the text prompt that describes the videos to generate.
11. Click **Generate**.

## Prompt enhancements

The Veo 2 model offers the option to rewrite your prompts to add
aesthetic and cinematographic details to your prompt. More detailed prompts
result in higher quality videos.

## What's next

- Read Google DeepMind's information on the [Veo
 model](https://deepmind.google/technologies/veo/).
- Read the blog post ["Veo and Imagen 3: Announcing new video and image
 generation models on Vertex AI"](https://cloud.google.com/blog/products/ai-machine-learning/introducing-veo-and-imagen-3-on-vertex-ai).
- Read the blog post ["New generative media models and tools, built with and
 for creators"](https://blog.google/technology/ai/google-generative-ai-veo-imagen-3/).