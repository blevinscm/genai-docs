---
date_scraped: 2025-05-12
title: Veo On Vertex AI Api
---

# Veo on Vertex AI API 

Veo is the name of the model that supports video generation.
Veo generates a video from a text prompt or an image
prompt (/products#product-launch-stages) that you provide.

To explore this model in the console, see the `Video Generation` model card in
the Model Garden.

[Try Veo on Vertex AI (Vertex AI Studio)](https://console.cloud.google.com/vertex-ai/studio/media)

[Try Veo in a Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo2_video_generation.ipynb)

[Request access: Experimental features](https://forms.gle/3MzcT3ibSJgk9D1U9)

#### Supported Models

| Model | Model ID |
| --- | --- |
| Video Generation | `veo-2.0-generate-001` |

## HTTP request

```python
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning

```

## Request body

```python
{
 "instances": [
 {
 "prompt": string,
 // Optional. An image to guide video generation.
 "image": {
 // Union field can be only one of the following:
 "bytesBase64Encoded": string,
 "gcsUri": string,
 // End of list of possible types for union field.
 "mimeType": string
 }
 }
 ],
 "parameters": {
 "aspectRatio": string,
 "negativePrompt": string,
 "personGeneration": string,
 "sampleCount": integer,
 "seed": uint32,
 "storageUri": string,
 "durationSeconds": integer,
 "enhancePrompt": boolean
 }
}

```

Use the following parameters for the Veo model. For more
information, see [Generate videos using text and image prompts using
Veo](../video/generate-videos.md).

∏

| Parameter | Description | | Type | Acceptable values and description |
| --- | --- | --- | --- | --- |
| image | Mandatory (image-to-video) Optional if a text prompt is provided (text-to-video) Image input for guiding video generation. | | string | 1. Base64-encoded image byte string, or 1. Cloud Storage bucket URI Recommended: 1280 x 720 pixels or 720 x 1280 pixels If the aspect ratio of the image is different, the image is cropped using a center crop tool. If the aspect ratio of the image is the same but the resolution is larger, the image is resized. |
| prompt | Mandatory (text-to-video) Optional if an input image prompt is provided (image-to-video) A text string to guide the first eight seconds (`veo-2.0-generate-001`) in the video. | | string | Any text string to guide video generation. For example: - *A fast-tracking shot through a bustling dystopian sprawl with bright neon signs, flying cars and mist, night, lens flare, volumetric lighting* - *A neon hologram of a car driving at top speed, speed of light, cinematic, incredible details, volumetric lighting* - *Many spotted jellyfish pulsating under water. Their bodies are transparent and glowing in deep ocean* - *extreme close-up with a shallow depth of field of a puddle in a street. reflecting a busy futuristic Tokyo city with bright neon signs, night, lens flare* - *Timelapse of the northern lights dancing across the Arctic sky, stars twinkling, snow-covered landscape* - *A lone cowboy rides his horse across an open plain at beautiful sunset, soft light, warm colors* |
| durationSeconds | Required The length of video files that you want to generate. | | integer | Accepted integer values are 5-8. The default is 8. |
| negativePrompt | Optional A text string that describes anything you want to discourage the model from generating. | | string | Any text string to instruct the model to omit from generated videos. For example: - *overhead lighting, bright colors* - *people, animals* - *multiple cars, wind* |
| enhancePrompt | Optional Use gemini to enhance your prompts. | | boolean | Accepted values are `yes` or `no`. The default is `yes`. |
| seed | Optional A number to request to make generated videos deterministic. Adding a seed number with your request without changing other parameters will cause the model to produce the same videos. | | uint32 | 0 - 4,294,967,295 |
| storageURI | Optional A Cloud Storage bucket URI to store the output video. If not provided, base64-encoded video bytes are returned in the response. | | string | The Cloud Storage location for saving the generated videos. Pattern: gs://BUCKET\_NAME/SUBDIRECTORY |
| sampleCount | Optional The number of output images requested. | | int | 1-4 |
| aspectRatio | Optional Defines the aspect ratio of the generated video. | | string | 16:9 (default, landscape) 9:16 (portrait) |
| personGeneration | Optional The safety setting that controls whether people or face generation is allowed. | | string | **allow\_adult** (default value): allow generation of adults only **dont\_allow**: disallows inclusion of people/faces in images |

## Sample request

Use the following requests to send a text-to-video request or an image-to-video
request:

### Text-to-video generation request

### REST

To test a text prompt by using the Vertex AI Veo API, send a POST request to
the publisher model endpoint.

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

### Image-to-video generation request

### REST

To test a text prompt by using the Vertex AI Veo API, send a POST request to
the publisher model endpoint.

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

### Poll the status of the video generation long-running operation

Check the status of the video generation long-running
operation.

### REST

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

## Response body (generate video request)

Sending a text-to-video or image-to-video request returns the following
response:

```python
{
 "name": string
}

```

| Response element | Description |
| --- | --- |
| `name` | The full operation name of the long-running operation that begins after a video generation request is sent. |

### Sample response (generate video request)

```python
{
 "name": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/OPERATION_ID"
}

```

## Response body (poll long-running operation)

Polling the status of the original video generation long-running operation
returns the following response:

```python
{
 "name": string,
 "done": boolean,
 "response":{
 "@type":"type.googleapis.com/cloud.ai.large_models.vision.GenerateVideoResponse",
 "generatedSamples":[
 {
 "video":
 {
 "uri": string,
 "encoding": string
 }
 },
 {
 "video":
 {
 "uri": string,
 "encoding": string
 }
 },
 {
 "video":
 {
 "uri": string,
 "encoding": string
 }
 },
 {
 "video":
 {
 "uri": string,
 "encoding": string
 }
 },
 ]
 }
}

```

| Response element | Description |
| --- | --- |
| `name` | The full operation name of the long-running operation that begins after a video generation request is sent. |
| `done` | A boolean value that indicates whether the operation is complete. |
| `response` | The response body of the long-running operation. |
| `generatedSamples` | An array of the generated video sample objects. |
| `video` | The generated video. |
| `uri` | The Cloud Storage URI of the generated video. |
| `encoding` | The video encoding type. |

### Sample response (poll long-running operation)

```python
{
 "name": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/OPERATION_ID",
 "done":true,
 "response":{
 "@type":"type.googleapis.com/cloud.ai.large_models.vision.GenerateVideoResponse",
 "generatedSamples":[
 {
 "video":{
 "uri":"gs://STORAGE_BUCKET/TIMESTAMPED_SUBDIRECTORY/sample_0.mp4",
 "encoding":"video/mp4"
 }
 },
 {
 "video":{
 "uri":"gs://STORAGE_BUCKET/TIMESTAMPED_SUBDIRECTORY/sample_1.mp4",
 "encoding":"video/mp4"
 }
 },
 {
 "video":{
 "uri":"gs://STORAGE_BUCKET/TIMESTAMPED_SUBDIRECTORY/sample_2.mp4",
 "encoding":"video/mp4"
 }
 },
 {
 "video":{
 "uri":"gs://STORAGE_BUCKET/TIMESTAMPED_SUBDIRECTORY/sample_3.mp4",
 "encoding":"video/mp4"
 }
 }
 ]
 }
}

```

## More information

- For more information about using Veo on Vertex AI, see [Generate videos using
 text and image prompts using Veo](../video/generate-videos.md).

## What's next

- Read Google DeepMind's information on the [Veo
 model](https://deepmind.google/technologies/veo/).
- Read the blog post ["Veo and Imagen 3: Announcing new video and image
 generation models on Vertex AI"](https://cloud.google.com/blog/products/ai-machine-learning/introducing-veo-and-imagen-3-on-vertex-ai).
- Read the blog post ["New generative media models and tools, built with and
 for creators"](https://blog.google/technology/ai/google-generative-ai-veo-imagen-3/).