---
title: Image-understandingbookmark_borderbookmarkgoogle.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#whats_next
date_scraped: 2025-05-12
---

# Image understanding bookmark\_borderbookmark 

Release Notes

To see an example of image understanding,
run the "Intro to Multimodal Use Cases with the Gemini API" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/intro_multimodal_use_cases.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fuse-cases%2Fintro_multimodal_use_cases.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fuse-cases%2Fintro_multimodal_use_cases.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/intro_multimodal_use_cases.ipynb)

You can add images to Gemini requests to perform tasks that involve
understanding the contents of the included images. This page shows you how to add
images to your requests to Gemini in Vertex AI by using the
Google Cloud console and the Vertex AI API.

## Supported models

The following table lists the models that support image understanding:

| **Model** | **Media details** | **MIME types** |
| --- | --- | --- |
| [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro) | - Maximum images per prompt: 3,000 - Maximum image size: 7 MB | - `image/png` - `image/jpeg` - `image/webp` |
| [Gemini 2.5 Flash](../../../models/gemini/2-5-flash.md) | - Maximum images per prompt: 3,000 - Maximum image size: 7 MB | - `image/png` - `image/jpeg` - `image/webp` |
| [Gemini 2.0 Flash](../../../models/gemini/2-0-flash.md) | - Maximum images per prompt: 3,000 - Maximum image size: 7 MB - Maximum tokens per minute (TPM) per project: - High/Medium/Default media resolution: - US/Asia: 40 M - EU: 10 M - Low media resolution: - US/Asia: 10 M - EU: 2.6 M | - `image/png` - `image/jpeg` - `image/webp` |
| [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite) | - Maximum images per prompt: 3,000 - Maximum image size: 7 MB - Maximum tokens per minute (TPM): - High/Medium/Default media resolution: - US/Asia: 6.7 M - EU: 2.6 M - Low media resolution: - US/Asia: 2.6 M - EU: 2.6 M | - `image/png` - `image/jpeg` - `image/webp` |

The quota metric is
`generate_content_video_input_per_base_model_id_and_resolution`.

For a list of languages supported by Gemini models, see model information
[Google models](../../../learn/models.md). To learn
more about how to design multimodal prompts, see
[Design multimodal prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts).
If you're looking for a way to use Gemini directly from your mobile and
web apps, see the
[Vertex AI in Firebase SDKs](https://firebase.google.com/docs/vertex-ai) for
Android, Swift, web, and Flutter apps.

## Add images to a request

You can add a single image or multiple images in your request to Gemini.

### Single image

The sample code in each of the following tabs shows a different way to identify
what's in an image. This sample works with all Gemini multimodal models.

[Console](#console)[Gen AI SDK for Python](#gen-ai-sdk-for-python)[Gen AI SDK for Go](#gen-ai-sdk-for-go)[REST](#rest)
More

To send a multimodal prompt by using the Google Cloud console, do the
following:

1. In the Vertex AI section of the Google Cloud console, go to
 the **Vertex AI Studio** page.

 [Go to Vertex AI Studio](https://console.cloud.google.com/vertex-ai/generative/multimodal)
2. Click **Open freeform**.
3. Optional: Configure the model and parameters:

 - **Model**: Select a model.
 - **Region**: Select the region that you want to use.
 - **Temperature**: Use the slider or textbox to enter a value for
 temperature.

 The temperature is used for sampling during response generation, which occurs when `topP`
 and `topK` are applied. Temperature controls the degree of randomness in token selection.
 Lower temperatures are good for prompts that require a less open-ended or creative response, while
 higher temperatures can lead to more diverse or creative results. A temperature of `0`
 means that the highest probability tokens are always selected. In this case, responses for a given
 prompt are mostly deterministic, but a small amount of variation is still possible.

 If the model returns a response that's too generic, too short, or the model gives a fallback
 response, try increasing the temperature.
 - **Output token limit**: Use the slider or textbox to enter a value for
 the max output limit.

 Maximum number of tokens that can be generated in the response. A token is
 approximately four characters. 100 tokens correspond to roughly 60-80 words.

 Specify a lower value for shorter responses and a higher value for potentially longer
 responses.
 - **Add stop sequence**: Optional. Enter a stop sequence, which is a
 series of characters that includes spaces. If the model encounters a
 stop sequence, the response generation stops. The stop sequence isn't
 included in the response, and you can add up to five stop sequences.
4. Optional: To configure advanced parameters, click **Advanced** and
 configure as follows:

 #### Click to expand advanced configurations
 - **Top-K**: Use the slider or textbox to enter a value for top-K.
 (not supported for Gemini 1.5).

 Top-K changes how the model selects tokens for output. A top-K of
 `1` means the next selected token is the most probable among all
 tokens in the model's vocabulary (also called greedy decoding), while a top-K of
 `3` means that the next token is selected from among the three most
 probable tokens by using temperature.

 For each token selection step, the top-K tokens with the highest
 probabilities are sampled. Then tokens are further filtered based on top-P with
 the final token selected using temperature sampling.

 Specify a lower value for less random responses and a higher value for more
 random responses.
 - **Top-P**: Use the slider or textbox to enter a value for top-P.
 Tokens are selected from most probable to the least until the sum of their
 probabilities equals the value of top-P. For the least variable results,
 set top-P to `0`.
 - **Max responses**: Use the slider or textbox to enter a value for
 the number of responses to generate.
 - **Streaming responses**: Enable to print responses as they're
 generated.
 - **Safety filter threshold**: Select the threshold of how likely you
 are to see responses that could be harmful.
 - **Enable Grounding**: Grounding isn't supported for multimodal
 prompts.
5. Click **Insert Media**, and select a source for your file.

 [Upload](#upload) [By URL](#by-url) [Cloud Storage](#cloud-storage) [Google Drive](#google-drive) 
 More

 Select the file that you want to upload and click **Open**.

 Enter the URL of the file that you want to use and click **Insert**.

 Select the bucket and then the file from the bucket that
 you want to import and click **Select**.

 1. Choose an account and give consent to
 Vertex AI Studio to access your account the first
 time you select this option. You can upload multiple files that
 have a total size of up to 10 MB. A single file can't exceed
 7 MB.
 2. Click the file that you want to add.
 3. Click **Select**.

 The file thumbnail displays in the **Prompt** pane. The total
 number of tokens also displays. If your prompt data exceeds the
 [token limit](../../../learn/models.md), the
 tokens are truncated and aren't included in processing your data.
6. Enter your text prompt in the **Prompt** pane.
7. Optional: To view the **Token ID to text** and **Token IDs**, click the
 **tokens count** in the **Prompt** pane.

 **Note:** Media tokens aren't supported.
8. Click **Submit**.
9. Optional: To save your prompt to **My prompts**, click save\_alt **Save**.
10. Optional: To get the Python code or a curl command for your prompt, click
 code **Get code**.

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
from google.genai.types import HttpOptions, Part

client = genai.Client(http_options=HttpOptions(api_version="v1"))
response = client.models.generate_content(
 model="gemini-2.0-flash-001",
 contents=[
 "What is shown in this image?",
 Part.from_uri(
 file_uri="gs://cloud-samples-data/generative-ai/image/scones.jpg",
 mime_type="image/jpeg",
 ),
 ],
)
print(response.text)
# Example response:
# The image shows a flat lay of blueberry scones arranged on parchment paper. There are ...
```

Learn how to install or update the [Gen AI SDK for Go](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
import (
 "context"
 "fmt"
 "io"

 genai "google.golang.org/genai"
)

// generateWithTextImage shows how to generate text using both text and image input
func generateWithTextImage(w io.Writer) error {
 ctx := context.Background()

 client, err := genai.NewClient(ctx, &genai.ClientConfig{
 HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
 })
 if err != nil {
 return fmt.Errorf("failed to create genai client: %w", err)
 }

 modelName := "gemini-2.0-flash-001"
 contents := []*genai.Content{
 {Parts: []*genai.Part{
 {Text: "What is shown in this image?"},
 {FileData: &genai.FileData{
 // Image source: https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg
 FileURI: "gs://cloud-samples-data/generative-ai/image/scones.jpg",
 MIMEType: "image/jpeg",
 }},
 }},
 }

 resp, err := client.Models.GenerateContent(ctx, modelName, contents, nil)
 if err != nil {
 return fmt.Errorf("failed to generate content: %w", err)
 }

 respText, err := resp.Text()
 if err != nil {
 return fmt.Errorf("failed to convert model response to text: %w", err)
 }
 fmt.Fprintln(w, respText)

 // Example response:
 // The image shows an overhead shot of a rustic, artistic arrangement on a surface that ...

 return nil
}

```

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

You can include images that are stored in Cloud Storage or use
base64-encoded image data.

[Image in Cloud Storage](#image-in-cloud-storage)[Base64 image data](#base64-image-data)
More

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- `FILE_URI`:
 The URI or URL of the file to include in the prompt. Acceptable values include the following:
 - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in
 the same Google Cloud project that's sending the request. For `gemini-2.0-flash`
 and `gemini-2.0-flash-lite`, the size limit is 2 GB.
 - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one
 audio file, and up to 10 image files per request. Audio files, video files, and documents can't
 exceed 15 MB.
 - **YouTube video URL:**The YouTube video must be either owned by the account that you used
 to sign in to the Google Cloud console or is public. Only one YouTube video URL is supported per
 request.

 When specifying a `fileURI`, you must also specify the media type
 (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
 URL for `fileURI` is not supported.

 If you don't have an image file in Cloud Storage, then you can use the following
 publicly available file:
 `gs://cloud-samples-data/generative-ai/image/scones.jpg` with a mime type of
 `image/jpeg`. To view this image,
 [open the sample image](https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg)
 file.
- `MIME_TYPE`:
 The media type of the file specified in the `data` or `fileUri`
 fields. Acceptable values include the following:
 **Click to expand MIME types**
 - `application/pdf`
 - `audio/mpeg`
 - `audio/mp3`
 - `audio/wav`
 - `image/png`
 - `image/jpeg`
 - `image/webp`
 - `text/plain`
 - `video/mov`
 - `video/mpeg`
 - `video/mp4`
 - `video/mpg`
 - `video/avi`
 - `video/wmv`
 - `video/mpegps`
 - `video/flv`
- `TEXT`:
 The text instructions to include in the prompt.
 For example,
 `What is shown in this image?`

To send your request, choose one of these options:

[curl](#curl)[PowerShell](#powershell)
More

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

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
cat > request.json << 'EOF'
{
 "contents": {
 "role": "USER",
 "parts": [
 {
 "fileData": {
 "fileUri": "FILE_URI",
 "mimeType": "MIME_TYPE"
 }
 },
 {
 "text": "TEXT"
 }
 ]
 }
}
EOF
```

Then execute the following command to send your REST request:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-1.5-flash:generateContent"
```

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
@'
{
 "contents": {
 "role": "USER",
 "parts": [
 {
 "fileData": {
 "fileUri": "FILE_URI",
 "mimeType": "MIME_TYPE"
 }
 },
 {
 "text": "TEXT"
 }
 ]
 }
}
'@ | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-1.5-flash:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": " The image shows a table with a cup of coffee, a bowl of blueberries, and a plate of scones with blueberries on it. There are also pink flowers on the table."
 }
 ]
 },
 "finishReason": "STOP",
 "safetyRatings": [
 {
 "category": "HARM_CATEGORY_HATE_SPEECH",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.027742893,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.07276838
 },
 {
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.026155617,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.07172113
 },
 {
 "category": "HARM_CATEGORY_HARASSMENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.04304285,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.037608635
 },
 {
 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.08803312,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.09203286
 }
 ]
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 265,
 "candidatesTokenCount": 35,
 "totalTokenCount": 300
 }
}

```

Before using any of the request data,
make the following replacements:

- `LOCATION`: The region to process the
 request.
 Enter a supported region. For the full list of supported regions, see
 [Available locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#available-regions).
 **Click to expand a partial list of available regions**
 - `us-central1`
 - `us-west4`
 - `northamerica-northeast1`
 - `us-east4`
 - `us-west1`
 - `asia-northeast3`
 - `asia-southeast1`
 - `asia-northeast1`
- `PROJECT_ID`: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- ```python
 B64_BASE_IMAGE
 ```

 The [base64 encoding](https://cloud.google.com/vertex-ai/generative-ai/docs/image/base64-encode) of the image, PDF, or video
 to include inline in the prompt. When including media inline, you must also specify the media
 type (`mimeType`) of the data.
- `MIME_TYPE`:
 The media type of the file specified in the `data` or `fileUri`
 fields. Acceptable values include the following:
 **Click to expand MIME types**
 - `application/pdf`
 - `audio/mpeg`
 - `audio/mp3`
 - `audio/wav`
 - `image/png`
 - `image/jpeg`
 - `image/webp`
 - `text/plain`
 - `video/mov`
 - `video/mpeg`
 - `video/mp4`
 - `video/mpg`
 - `video/avi`
 - `video/wmv`
 - `video/mpegps`
 - `video/flv`
- `TEXT`:
 The text instructions to include in the prompt.
 For example,
 `What is shown in this image?`.

To send your request, choose one of these options:

[curl](#curl)[PowerShell](#powershell)
More

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

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
cat > request.json << 'EOF'
{
 "contents": {
 "role": "USER",
 "parts": [
 {
 "inlineData": {
 "data": "B64_BASE_IMAGE",
 "mimeType": "MIME_TYPE"
 }
 },
 {
 "text": "TEXT"
 }
 ]
 }
}
EOF
```

Then execute the following command to send your REST request:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-1.5-flash:generateContent"
```

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
@'
{
 "contents": {
 "role": "USER",
 "parts": [
 {
 "inlineData": {
 "data": "B64_BASE_IMAGE",
 "mimeType": "MIME_TYPE"
 }
 },
 {
 "text": "TEXT"
 }
 ]
 }
}
'@ | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-1.5-flash:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": " The image shows a table with a cup of coffee, a bowl of blueberries, and a plate of scones with blueberries on it. There are also pink flowers on the table."
 }
 ]
 },
 "finishReason": "STOP",
 "safetyRatings": [
 {
 "category": "HARM_CATEGORY_HATE_SPEECH",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.027742893,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.07276838
 },
 {
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.026155617,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.07172113
 },
 {
 "category": "HARM_CATEGORY_HARASSMENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.04304285,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.037608635
 },
 {
 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.08803312,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.09203286
 }
 ]
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 265,
 "candidatesTokenCount": 35,
 "totalTokenCount": 300
 }
}

```

Note the following in the URL for this sample:

- Use the
 [`generateContent`](../../../reference/rest/v1/projectslocationspublishersmodels/generateContent.md)
 method to request that the response is returned after it's fully generated.
 To reduce the perception of latency to a human audience, stream the response as it's being
 generated by using the
 [`streamGenerateContent`](../../../reference/rest/v1/projectslocationspublishersmodels/streamGenerateContent.md)
 method.
- The multimodal model ID is located at the end of the URL before the method
 (for example, `gemini-2.0-flash`). This sample might support other
 models as well.

### Multiple images

Each of the following tabs show you a different way to include multiple images
in a prompt request. Each sample takes in two sets of the following inputs:

- An image of a popular city landmark
- The media type of the image
- Text indicating the city and landmark in the image

The sample also takes in a third image and media type, but no text. The sample
returns a text response indicating the city and landmark in the third image.

These image samples work with all Gemini multimodal models.

[Console](#console)[Gen AI SDK for Python](#gen-ai-sdk-for-python)[Gen AI SDK for Go](#gen-ai-sdk-for-go)[REST](#rest)
More

To send a multimodal prompt by using the Google Cloud console, do the
following:

1. In the Vertex AI section of the Google Cloud console, go to
 the **Vertex AI Studio** page.

 [Go to Vertex AI Studio](https://console.cloud.google.com/vertex-ai/generative/multimodal)
2. Click **Open freeform**.
3. Optional: Configure the model and parameters:

 - **Model**: Select a model.
 - **Region**: Select the region that you want to use.
 - **Temperature**: Use the slider or textbox to enter a value for
 temperature.

 The temperature is used for sampling during response generation, which occurs when `topP`
 and `topK` are applied. Temperature controls the degree of randomness in token selection.
 Lower temperatures are good for prompts that require a less open-ended or creative response, while
 higher temperatures can lead to more diverse or creative results. A temperature of `0`
 means that the highest probability tokens are always selected. In this case, responses for a given
 prompt are mostly deterministic, but a small amount of variation is still possible.

 If the model returns a response that's too generic, too short, or the model gives a fallback
 response, try increasing the temperature.
 - **Output token limit**: Use the slider or textbox to enter a value for
 the max output limit.

 Maximum number of tokens that can be generated in the response. A token is
 approximately four characters. 100 tokens correspond to roughly 60-80 words.

 Specify a lower value for shorter responses and a higher value for potentially longer
 responses.
 - **Add stop sequence**: Optional. Enter a stop sequence, which is a
 series of characters that includes spaces. If the model encounters a
 stop sequence, the response generation stops. The stop sequence isn't
 included in the response, and you can add up to five stop sequences.
4. Optional: To configure advanced parameters, click **Advanced** and
 configure as follows:

 #### Click to expand advanced configurations
 - **Top-K**: Use the slider or textbox to enter a value for top-K.
 (not supported for Gemini 1.5).

 Top-K changes how the model selects tokens for output. A top-K of
 `1` means the next selected token is the most probable among all
 tokens in the model's vocabulary (also called greedy decoding), while a top-K of
 `3` means that the next token is selected from among the three most
 probable tokens by using temperature.

 For each token selection step, the top-K tokens with the highest
 probabilities are sampled. Then tokens are further filtered based on top-P with
 the final token selected using temperature sampling.

 Specify a lower value for less random responses and a higher value for more
 random responses.
 - **Top-P**: Use the slider or textbox to enter a value for top-P.
 Tokens are selected from most probable to the least until the sum of their
 probabilities equals the value of top-P. For the least variable results,
 set top-P to `0`.
 - **Max responses**: Use the slider or textbox to enter a value for
 the number of responses to generate.
 - **Streaming responses**: Enable to print responses as they're
 generated.
 - **Safety filter threshold**: Select the threshold of how likely you
 are to see responses that could be harmful.
 - **Enable Grounding**: Grounding isn't supported for multimodal
 prompts.
5. Click **Insert Media**, and select a source for your file.

 [Upload](#upload) [By URL](#by-url) [Cloud Storage](#cloud-storage) [Google Drive](#google-drive) 
 More

 Select the file that you want to upload and click **Open**.

 Enter the URL of the file that you want to use and click **Insert**.

 Select the bucket and then the file from the bucket that
 you want to import and click **Select**.

 1. Choose an account and give consent to
 Vertex AI Studio to access your account the first
 time you select this option. You can upload multiple files that
 have a total size of up to 10 MB. A single file can't exceed
 7 MB.
 2. Click the file that you want to add.
 3. Click **Select**.

 The file thumbnail displays in the **Prompt** pane. The total
 number of tokens also displays. If your prompt data exceeds the
 [token limit](../../../learn/models.md), the
 tokens are truncated and aren't included in processing your data.
6. Enter your text prompt in the **Prompt** pane.
7. Optional: To view the **Token ID to text** and **Token IDs**, click the
 **tokens count** in the **Prompt** pane.

 **Note:** Media tokens aren't supported.
8. Click **Submit**.
9. Optional: To save your prompt to **My prompts**, click save\_alt **Save**.
10. Optional: To get the Python code or a curl command for your prompt, click
 code **Get code**.

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
from google.genai.types import HttpOptions, Part

client = genai.Client(http_options=HttpOptions(api_version="v1"))

# Read content from GCS
gcs_file_img_path = "gs://cloud-samples-data/generative-ai/image/scones.jpg"

# Read content from a local file
with open("test_data/latte.jpg", "rb") as f:
 local_file_img_bytes = f.read()

response = client.models.generate_content(
 model="gemini-2.0-flash-001",
 contents=[
 "Generate a list of all the objects contained in both images.",
 Part.from_uri(file_uri=gcs_file_img_path, mime_type="image/jpeg"),
 Part.from_bytes(data=local_file_img_bytes, mime_type="image/jpeg"),
 ],
)
print(response.text)
# Example response:
# Okay, here's the list of objects present in both images:
# ...
```

Learn how to install or update the [Gen AI SDK for Go](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
import (
 "context"
 "fmt"
 "io"
 "os"

 genai "google.golang.org/genai"
)

// generateWithMultiImg shows how to generate text using multiple image inputs.
func generateWithMultiImg(w io.Writer) error {
 ctx := context.Background()

 client, err := genai.NewClient(ctx, &genai.ClientConfig{
 HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
 })
 if err != nil {
 return fmt.Errorf("failed to create genai client: %w", err)
 }

 // TODO(Developer): Update the path to file (image source:
 // https://storage.googleapis.com/cloud-samples-data/generative-ai/image/latte.jpg )
 imageBytes, err := os.ReadFile("./latte.jpg")
 if err != nil {
 return fmt.Errorf("failed to read image: %w", err)
 }

 contents := []*genai.Content{
 {Parts: []*genai.Part{
 {Text: "Write an advertising jingle based on the items in both images."},
 {FileData: &genai.FileData{
 // Image source: https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg
 FileURI: "gs://cloud-samples-data/generative-ai/image/scones.jpg",
 MIMEType: "image/jpeg",
 }},
 {InlineData: &genai.Blob{
 Data: imageBytes,
 MIMEType: "image/jpeg",
 }},
 }},
 }
 modelName := "gemini-2.0-flash-001"

 resp, err := client.Models.GenerateContent(ctx, modelName, contents, nil)
 if err != nil {
 return fmt.Errorf("failed to generate content: %w", err)
 }

 respText, err := resp.Text()
 if err != nil {
 return fmt.Errorf("failed to convert model response to text: %w", err)
 }
 fmt.Fprintln(w, respText)

 // Example response:
 // Okay, here's an advertising jingle inspired by the blueberry scones, coffee, flowers, chocolate cake, and latte:
 //
 // (Upbeat, jazzy music)
 // ...

 return nil
}

```

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- `FILE_URI1`:
 The URI or URL of the file to include in the prompt. Acceptable values include the following:
 - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in
 the same Google Cloud project that's sending the request. For `gemini-2.0-flash`
 and `gemini-2.0-flash-lite`, the size limit is 2 GB.
 - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one
 audio file, and up to 10 image files per request. Audio files, video files, and documents can't
 exceed 15 MB.
 - **YouTube video URL:**The YouTube video must be either owned by the account that you used
 to sign in to the Google Cloud console or is public. Only one YouTube video URL is supported per
 request.

 When specifying a `fileURI`, you must also specify the media type
 (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
 URL for `fileURI` is not supported.

 If you don't have an image file in Cloud Storage, then you can use the following
 publicly available file:
 `gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png` with a mime type of
 `image/png`. To view this image,
 [open the sample image](https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark1.png)
 file.
- `MIME_TYPE`:
 The media type of the file specified in the `data` or `fileUri`
 fields. Acceptable values include the following:
 **Click to expand MIME types**
 - `application/pdf`
 - `audio/mpeg`
 - `audio/mp3`
 - `audio/wav`
 - `image/png`
 - `image/jpeg`
 - `image/webp`
 - `text/plain`
 - `video/mov`
 - `video/mpeg`
 - `video/mp4`
 - `video/mpg`
 - `video/avi`
 - `video/wmv`
 - `video/mpegps`
 - `video/flv`
 For simplicity,
 this sample uses the same media type for all three input images.
- `TEXT1`:
 The text instructions to include in the prompt.
 For example,
 `city: Rome, Landmark: the Colosseum`
- `FILE_URI2`:
 The URI or URL of the file to include in the prompt. Acceptable values include the following:
 - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in
 the same Google Cloud project that's sending the request. For `gemini-2.0-flash`
 and `gemini-2.0-flash-lite`, the size limit is 2 GB.
 - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one
 audio file, and up to 10 image files per request. Audio files, video files, and documents can't
 exceed 15 MB.
 - **YouTube video URL:**The YouTube video must be either owned by the account that you used
 to sign in to the Google Cloud console or is public. Only one YouTube video URL is supported per
 request.

 When specifying a `fileURI`, you must also specify the media type
 (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
 URL for `fileURI` is not supported.

 If you don't have an image file in Cloud Storage, then you can use the following
 publicly available file:
 `gs://cloud-samples-data/vertex-ai/llm/prompts/landmark2.png` with a mime type of
 `image/png`. To view this image,
 [open the sample image](https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark2.png)
 file.
- `TEXT2`:
 The text instructions to include in the prompt.
 For example,
 `city: Beijing, Landmark: Forbidden City`
- `FILE_URI3`:
 The URI or URL of the file to include in the prompt. Acceptable values include the following:
 - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in
 the same Google Cloud project that's sending the request. For `gemini-2.0-flash`
 and `gemini-2.0-flash-lite`, the size limit is 2 GB.
 - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one
 audio file, and up to 10 image files per request. Audio files, video files, and documents can't
 exceed 15 MB.
 - **YouTube video URL:**The YouTube video must be either owned by the account that you used
 to sign in to the Google Cloud console or is public. Only one YouTube video URL is supported per
 request.

 When specifying a `fileURI`, you must also specify the media type
 (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
 URL for `fileURI` is not supported.

 If you don't have an image file in Cloud Storage, then you can use the following
 publicly available file:
 `gs://cloud-samples-data/vertex-ai/llm/prompts/landmark3.png` with a mime type of
 `image/png`. To view this image,
 [open the sample image](https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark3.png)
 file.

To send your request, choose one of these options:

[curl](#curl)[PowerShell](#powershell)
More

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

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
cat > request.json << 'EOF'
{
 "contents": {
 "role": "USER",
 "parts": [
 {
 "fileData": {
 "fileUri": "FILE_URI1",
 "mimeType": "MIME_TYPE"
 }
 },
 {
 "text": "TEXT1"
 },
 {
 "fileData": {
 "fileUri": "FILE_URI2",
 "mimeType": "MIME_TYPE"
 }
 },
 {
 "text": "TEXT2"
 },
 {
 "fileData": {
 "fileUri": "FILE_URI3",
 "mimeType": "MIME_TYPE"
 }
 }
 ]
 }
}
EOF
```

Then execute the following command to send your REST request:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent"
```

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
@'
{
 "contents": {
 "role": "USER",
 "parts": [
 {
 "fileData": {
 "fileUri": "FILE_URI1",
 "mimeType": "MIME_TYPE"
 }
 },
 {
 "text": "TEXT1"
 },
 {
 "fileData": {
 "fileUri": "FILE_URI2",
 "mimeType": "MIME_TYPE"
 }
 },
 {
 "text": "TEXT2"
 },
 {
 "fileData": {
 "fileUri": "FILE_URI3",
 "mimeType": "MIME_TYPE"
 }
 }
 ]
 }
}
'@ | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": "city: Rio de Janeiro, Landmark: Christ the Redeemer statue \n"
 }
 ]
 },
 "finishReason": "STOP",
 "safetyRatings": [
 {
 "category": "HARM_CATEGORY_HATE_SPEECH",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.05340333,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.08740791
 },
 {
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.13050689,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.10338596
 },
 {
 "category": "HARM_CATEGORY_HARASSMENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.05399884,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.09947021
 },
 {
 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.10576342,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.066934206
 }
 ]
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 791,
 "candidatesTokenCount": 14,
 "totalTokenCount": 805
 }
}

```

Note the following in the URL for this sample:

- Use the
 [`generateContent`](../../../reference/rest/v1/projectslocationspublishersmodels/generateContent.md)
 method to request that the response is returned after it's fully generated.
 To reduce the perception of latency to a human audience, stream the response as it's being
 generated by using the
 [`streamGenerateContent`](../../../reference/rest/v1/projectslocationspublishersmodels/streamGenerateContent.md)
 method.
- The multimodal model ID is located at the end of the URL before the method
 (for example, `gemini-2.0-flash`). This sample might support other
 models as well.

## Set optional model parameters

Each model has a set of optional parameters that you can set. For more
information, see [Content generation parameters](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters).

## Image requirements

Here's how tokens are calculated for images:

- **Gemini 2.0 Flash and Gemini 2.0 Flash-Lite**:
 - If both dimensions of an image are less than or equal to 384 pixels,
 then 258 tokens are used.
 - If one dimension of an image is greater than 384 pixels, then the
 image is cropped into tiles. Each tile size defaults to the smallest
 dimension (width or height) divided by 1.5. If necessary, each tile is
 adjusted so that it's not smaller than 256 pixels and not greater than
 768 pixels. Each tile is then resized to 768x768 and uses 258 tokens.

## Best practices

When using images, use the following best practices and information for the
best results:

- If you want to detect text in an image, use prompts with a single image to
 produce better results than prompts with multiple images.
- If your prompt contains a single image, place the image before the text
 prompt in your request.
- If your prompt contains multiple images, and you want to refer to them
 later in your prompt or have the model refer to them in the model response,
 it can help to give each image an index before the image. Use
 `a` `b` `c` or
 `image 1` `image 2` `image 3`
 for your index. The following is an example of using indexed images in a
 prompt:

 ```python
 image 1 
 image 2 
 image 3 

 Write a blogpost about my day using image 1 and image 2. Then, give me ideas
 for tomorrow based on image 3.
 ```
- Use images with higher resolution; they yield better results.
- Include a few examples in the prompt.
- Rotate images to their proper orientation before adding them to the
 prompt.
- Avoid blurry images.

## Limitations

While Gemini multimodal models are powerful in many multimodal use
cases, it's important to understand the limitations of the models:

- **Content moderation**: The models refuse to provide answers
 on images that violate our safety policies.
- **Spatial reasoning**: The models aren't precise at locating
 text or objects in images. They might only return the approximated counts of
 objects.
- **Medical uses**: The models aren't suitable for interpreting
 medical images (for example, x-rays and CT scans) or providing medical
 advice.
- **People recognition**: The models aren't meant to be used to
 identify people who aren't celebrities in images.
- **Accuracy**: The models might hallucinate or make mistakes
 when interpreting low-quality, rotated, or extremely low-resolution images.
 The models might also hallucinate when interpreting handwritten text in
 images documents.

## What's next

- Start building with Gemini multimodal models - new customers [get $300 in free Google Cloud credits](https://console.cloud.google.com/freetrial?redirectPath=/vertex-ai/model-garden) to explore what they can do with Gemini.
- Learn how to [send chat prompt requests](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-chat-prompts-gemini).
- Learn about [responsible AI best practices and Vertex AI's safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).

Was this helpful?