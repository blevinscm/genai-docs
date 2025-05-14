---
date_scraped: 2025-05-12
title: Upscale A Generated Edited Or Existing Image
---

# Upscale a generated, edited, or existing image 

You can use Imagen on Vertex AI's upscaling feature to increase the size of an
image without losing quality.

## Model versions

Upscaling availability is based on model version:

| Feature | Imagen (v.002) | Imagen 2 (v.005) | Imagen 2 (v.006) |
| --- | --- | --- | --- |
| Upscaling | ✔ | Not supported | Not supported |

## Upscale an image

Use the following code samples to upscale an existing, generated, or edited
image.

### Console

1. Follow the [generate image with text](https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images)
 instructions to generate images.
2. Select the image to upscale.
3. Click
 download**Upscale/export**.
4. Select **Upscale images**.
5. Choose a value from the **Scale factor** (`2x` or `4x`).
6. Click
 download**Export** to save the
 upscaled image.

### REST

For more information about `imagegeneration` model requests, see the
[`imagegeneration` model API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/image-generation).

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