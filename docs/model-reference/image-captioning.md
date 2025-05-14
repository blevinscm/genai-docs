---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/image-captioning
title: Image Captions
---

# Image captions 

`imagetext` is the name of the model that supports image captioning. `imagetext`
generates a caption from an image you provide based on the language that you
specify. The model supports the following languages: English (`en`), German
(`de`), French (`fr`), Spanish (`es`) and Italian (`it`).

To explore this model in the console, see the `Image Captioning` model card in
the Model Garden.

[View Imagen for Captioning & VQA model card](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/imagetext)

## Use cases

Some common use cases for image captioning include:

- Creators can generate captions for uploaded images and videos (for example,
 a short description of a video sequence)
- Generate captions to describe products
- Integrate captioning with an app using the API to create new experiences

## HTTP request

```python
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/imagetext:predict

```

## Request body

```python
{
 "instances": [
 {
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
 "sampleCount": integer,
 "storageUri": string,
 "language": string,
 "seed": integer
 }
}

```

Use the following parameters for the Imagen model `imagetext`.
For more information, see
[Get image descriptions using visual captioning](https://cloud.google.com/vertex-ai/generative-ai/docs/image/image-captioning).

| Parameter | Description | Acceptable values |
| --- | --- | --- |
| `instances` | An array that contains the object with image details to get information about. | array (**1 image object allowed**) |
| `bytesBase64Encoded` | The image to caption. | Base64-encoded image string (PNG or JPEG, 20 MB max) |
| `gcsUri` | The Cloud Storage URI of the image to caption. | string URI of the image file in Cloud Storage (PNG or JPEG, 20 MB max) |
| `mimeType` | Optional. The MIME type of the image you specify. | string (`image/jpeg` or `image/png`) |
| `sampleCount` | Number of generated text strings. | Int value: 1-3 |
| `seed` | Optional. The seed for random number generator (RNG). If RNG seed is the same for requests with the inputs, the prediction results will be the same. | integer |
| `storageUri` | Optional. The Cloud Storage location to save the generated text responses. | string |
| `language` | Optional. The text prompt for guiding the response. | string: `en` (default), `de`, `fr`, `it`, `es` |

## Sample request

### REST

To test a text prompt by using the Vertex AI API, send a POST request to the
publisher model endpoint.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: Your project's region. For example,
 `us-central1`, `europe-west2`, or `asia-northeast3`. For a list
 of available regions, see
 [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).
- B64\_IMAGE: The image to get captions for. The image must be
 specified as a [base64-encoded](https://cloud.google.com/vertex-ai/generative-ai/docs/image/base64-encode) byte string. Size limit:
 10 MB.
- RESPONSE\_COUNT: The number of image captions you want to generate. Accepted integer
 values: 1-3.
- LANGUAGE\_CODE: One of the supported language codes. Languages supported:
 - English (`en`)
 - French (`fr`)
 - German (`de`)
 - Italian (`it`)
 - Spanish (`es`)

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagetext:predict
```

Request JSON body:

```python
{
 "instances": [
 {
 "image": {
 "bytesBase64Encoded": "B64_IMAGE"
 }
 }
 ],
 "parameters": {
 "sampleCount": RESPONSE_COUNT,
 "language": "LANGUAGE_CODE"
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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagetext:predict"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/imagetext:predict" | Select-Object -Expand Content
```

The following sample responses are for a request with
`"sampleCount": 2`. The response returns two prediction strings.

**English (`en`):**

```python
{
 "predictions": [
 "a yellow mug with a sheep on it sits next to a slice of cake",
 "a cup of coffee with a heart shaped latte art next to a slice of cake"
 ],
 "deployedModelId": "DEPLOYED_MODEL_ID",
 "model": "projects/PROJECT_ID/locations/LOCATION/models/MODEL_ID",
 "modelDisplayName": "MODEL_DISPLAYNAME",
 "modelVersionId": "1"
}
```

**Spanish (`es`):**

```python
{
 "predictions": [
 "una taza de café junto a un plato de pastel de chocolate",
 "una taza de café con una forma de corazón en la espuma"
 ]
}

```

## Response body

```python
{
 "predictions": [ string ]
}

```

| Response element | Description |
| --- | --- |
| `predictions` | List of text strings representing captions, sorted by confidence. |

## Sample response

```python
{
 "predictions": [
 "text1",
 "text2"
 ]
}

```