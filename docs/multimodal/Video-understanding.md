---
date_scraped: 2025-05-12
title: Video Understanding
---

# Video understanding 

To see an example of video understanding,
run the "YouTube Video Analysis with Gemini" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/video-analysis/youtube_video_analysis.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fuse-cases%2Fvideo-analysis%2Fyoutube_video_analysis.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fuse-cases%2Fvideo-analysis%2Fyoutube_video_analysis.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/video-analysis/youtube_video_analysis.ipynb)

You can add videos to Gemini requests to perform tasks that involve
understanding the contents of the included videos. This page
shows you how to add videos to your requests to Gemini in
Vertex AI by using the Google Cloud console and the Vertex AI API.

## Supported models

The following table lists the models that support video understanding:

| **Model** | **Media details** | **MIME types** |
| --- | --- | --- |
| [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro) | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 | - `video/x-flv` - `video/quicktime` - `video/mpeg` - `video/mpegs` - `video/mpg` - `video/mp4` - `video/webm` - `video/wmv` - `video/3gpp` |
| [Gemini 2.5 Flash](../models/gemini/2-5-flash.md) | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 | - `video/x-flv` - `video/quicktime` - `video/mpeg` - `video/mpegs` - `video/mpg` - `video/mp4` - `video/webm` - `video/wmv` - `video/3gpp` |
| [Gemini 2.0 Flash](../models/gemini/2-0-flash.md) | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Maximum tokens per minute (TPM): - High/Medium/Default media resolution: - US/Asia: 38 M - EU: 10 M - Low media resolution: - US/Asia: 10 M - EU: 2.5 M | - `video/x-flv` - `video/quicktime` - `video/mpeg` - `video/mpegs` - `video/mpg` - `video/mp4` - `video/webm` - `video/wmv` - `video/3gpp` |
| [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite) | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Maximum tokens per minute (TPM): - High/Medium/Default media resolution: - US/Asia: 6.3 M - EU: 3.2 M - Low media resolution: - US/Asia: 3.2 M - EU: 3.2 M | - `video/x-flv` - `video/quicktime` - `video/mpeg` - `video/mpegs` - `video/mpg` - `video/mp4` - `video/webm` - `video/wmv` - `video/3gpp` |

The quota metric is
`generate_content_video_input_per_base_model_id_and_resolution`.

For a list of languages supported by Gemini models, see model information
[Google models](../learn/models.md). To learn
more about how to design multimodal prompts, see
[Design multimodal prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts).
If you're looking for a way to use Gemini directly from your mobile and
web apps, see the
[Vertex AI in Firebase SDKs](https://firebase.google.com/docs/vertex-ai) for
Android, Swift, web, and Flutter apps.

## Add videos to a request

You can add a single video or multiple videos in your request to Gemini and the
video can include audio.

### Single video

The sample code in each of the following tabs shows a different way to identify
what's in a video. This sample works with all Gemini multimodal models.

### Console

To send a multimodal prompt by using the Google Cloud console, do the
following:

1. In the Vertex AI section of the Google Cloud console, go to
 the **Vertex AI Studio** page.

 [Go to Vertex AI Studio](https://console.cloud.google.com/vertex-ai/generative/multimodal)
2. Click **Create prompt**.
3. Optional: Configure the model and parameters:

 - **Model**: Select a model.
4. Optional: To configure advanced parameters, click **Advanced** and
 configure as follows:

 #### Click to expand advanced configurations

 - **Top-K**: Use the slider or textbox to enter a value for top-K.

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
 - **Region**: Select the region that you want to use.
 - **Temperature**: Use the slider or textbox to enter a value for
 temperature.

 ```python
 
 The temperature is used for sampling during response generation, which occurs when topP
 and topK are applied. Temperature controls the degree of randomness in token selection.
 Lower temperatures are good for prompts that require a less open-ended or creative response, while
 higher temperatures can lead to more diverse or creative results. A temperature of 0
 means that the highest probability tokens are always selected. In this case, responses for a given
 prompt are mostly deterministic, but a small amount of variation is still possible.

 If the model returns a response that's too generic, too short, or the model gives a fallback
 response, try increasing the temperature.

 <li>**Output token limit**: Use the slider or textbox to enter a value for
 the max output limit.

 Maximum number of tokens that can be generated in the response. A token is
 approximately four characters. 100 tokens correspond to roughly 60-80 words.

 Specify a lower value for shorter responses and a higher value for potentially longer
 responses.

 <li>**Add stop sequence**: Optional. Enter a stop sequence, which is a
 series of characters that includes spaces. If the model encounters a
 stop sequence, the response generation stops. The stop sequence isn't
 included in the response, and you can add up to five stop sequences.
 </ul>

 ```
5. Click **Insert Media**, and select a source for your file.

 ### Upload

 Select the file that you want to upload and click **Open**.

 ### By URL

 Enter the URL of the file that you want to use and click **Insert**.

 ### YouTube

 **Preview**

 This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
 of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
 Pre-GA features are available "as is" and might have limited support.
 For more information, see the
 [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

 Enter the URL of the YouTube video that you want to use and click
 **Insert**.

 You can use any public video or a video that's owned by the account that
 you used to sign in to the Google Cloud console.

 ### Cloud Storage

 Select the bucket and then the file from the bucket that
 you want to import and click **Select**.

 ### Google Drive

 1. Choose an account and give consent to
 Vertex AI Studio to access your account the first
 time you select this option. You can upload multiple files that
 have a total size of up to 10 MB. A single file can't exceed
 7 MB.
 2. Click the file that you want to add.
 3. Click **Select**.

 The file thumbnail displays in the **Prompt** pane. The total
 number of tokens also displays. If your prompt data exceeds the
 [token limit](../learn/models.md), the
 tokens are truncated and aren't included in processing your data.
6. Enter your text prompt in the **Prompt** pane.
7. Optional: To view the **Token ID to text** and **Token IDs**, click the
 **tokens count** in the **Prompt** pane.

 **Note:** Media tokens aren't supported.
8. Click **Submit**.
9. Optional: To save your prompt to **My prompts**, click save\_alt **Save**.
10. Optional: To get the Python code or a curl command for your prompt, click
 code **Build with code > Get code**.

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
from google.genai.types import HttpOptions, Part

client = genai.Client(http_options=HttpOptions(api_version="v1"))
response = client.models.generate_content(
 model="gemini-2.0-flash-001",
 contents=[
 Part.from_uri(
 file_uri="gs://cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4",
 mime_type="video/mp4",
 ),
 "What is in the video?",
 ],
)
print(response.text)
# Example response:
# The video shows several people surfing in an ocean with a coastline in the background. The camera ...
```

### Gen AI SDK for Go

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

// generateWithMuteVideo shows how to generate text using a video with no sound as the input.
func generateWithMuteVideo(w io.Writer) error {
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
 {Text: "What is in the video?"},
 {FileData: &genai.FileData{
 FileURI: "gs://cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4",
 MIMEType: "video/mp4",
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
 // The video shows several surfers riding waves in an ocean setting. The waves are ...

 return nil
}

```

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

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

 If you don't have a video file in Cloud Storage, then you can use the following
 publicly available file:
 `gs://cloud-samples-data/video/animals.mp4` with a mime type of
 `video/mp4`. To view this video,
 [open the sample MP4](https://storage.googleapis.com/cloud-samples-data/video/animals.mp4)
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
 `What is in the video?`

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
 "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent"
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
 "text": "This video is a commercial for Google Photos, featuring animals taking selfies
 with the Google Photos app. The commercial plays on the popularity of media in which
 animals act like humans, especially their use of technology. The commercial also
 highlights the app's ability to automatically back up photos."
 }
 ]
 },
 "finishReason": "STOP",
 "safetyRatings": [
 {
 "category": "HARM_CATEGORY_HATE_SPEECH",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.053601142,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.053799648
 },
 {
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.06278921,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.07850098
 },
 {
 "category": "HARM_CATEGORY_HARASSMENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.090253234,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.058453236
 },
 {
 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.1647851,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.09285216
 }
 ]
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 28916,
 "candidatesTokenCount": 61,
 "totalTokenCount": 28977
 }
}

```

Note the following in the URL for this sample:

- Use the
 [`generateContent`](../reference/rest/v1/projectslocationspublishersmodels/generateContent.md)
 method to request that the response is returned after it's fully generated.
 To reduce the perception of latency to a human audience, stream the response as it's being
 generated by using the
 [`streamGenerateContent`](../reference/rest/v1/projectslocationspublishersmodels/streamGenerateContent.md)
 method.
- The multimodal model ID is located at the end of the URL before the method
 (for example, `gemini-2.0-flash`). This sample might support other
 models as well.

### Video with audio

The following shows you how to summarize a video file with audio and return
chapters with timestamps. This sample works with Gemini 2.0.

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
from google.genai.types import HttpOptions, Part

client = genai.Client(http_options=HttpOptions(api_version="v1"))
response = client.models.generate_content(
 model="gemini-2.0-flash-001",
 contents=[
 Part.from_uri(
 file_uri="gs://cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4",
 mime_type="video/mp4",
 ),
 "What is in the video?",
 ],
)
print(response.text)
# Example response:
# The video shows several people surfing in an ocean with a coastline in the background. The camera ...
```

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

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

 If you don't have a video file in Cloud Storage, then you can use the following
 publicly available file:
 `gs://cloud-samples-data/generative-ai/video/pixel8.mp4` with a mime type of
 `video/mp4`. To view this video,
 [open the sample MP4](https://storage.googleapis.com/cloud-samples-data/generative-ai/video/pixel8.mp4)
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
- ```python
 TEXT
 ```

 The text instructions to include in the prompt.
 For example,
 `Provide a description of the video. The description should also contain anything
 important which people say in the video.`

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
 "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent"
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
 "text": "The video opens with a shot of a train traveling over a bridge in the night. \n
 \nThe scene changes to a woman walking in the streets of Tokyo. She says "My name is
 Saeko. I am a photographer in Tokyo. Tokyo has many faces. The city at night
 is totally different from what you see during the day. The new Pixel has a feature
 called "Video Boost". In low light, it activates "Night Sight" to make the quality
 even better." \n\nShe then uses her phone to take several photos of different parts of
 the city including a street with a lot of shops, a small alleyway, and a small
 restaurant. She says "Sancha is where I used to live when I first moved to Tokyo. I
 have a lot of great memories here. Oh, I like this." \n\nShe smiles and says
 "Beautiful".\n\nThe video ends with the woman standing in a different part of the
 city. She says "Next, I came to Shibuya." The scene shows the famous Shibuya crossing
 in the night. \n\nThe video features a woman showcasing the camera features of the
 Google Pixel phone while walking around the streets of Tokyo. She mentions "Night
 Sight" and "Video Boost" features. \n"
 }
 ]
 },
 "finishReason": "STOP",
 "safetyRatings": [
 {
 "category": "HARM_CATEGORY_HATE_SPEECH",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.053601142,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.053799648
 },
 {
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.06278921,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.07850098
 },
 {
 "category": "HARM_CATEGORY_HARASSMENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.090253234,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.058453236
 },
 {
 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.1647851,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.09285216
 }
 ]
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 28916,
 "candidatesTokenCount": 61,
 "totalTokenCount": 28977
 }
}

```

Note the following in the URL for this sample:

- Use the
 [`generateContent`](../reference/rest/v1/projectslocationspublishersmodels/generateContent.md)
 method to request that the response is returned after it's fully generated.
 To reduce the perception of latency to a human audience, stream the response as it's being
 generated by using the
 [`streamGenerateContent`](../reference/rest/v1/projectslocationspublishersmodels/streamGenerateContent.md)
 method.
- The multimodal model ID is located at the end of the URL before the method
 (for example, `gemini-2.0-flash`). This sample might support other
 models as well.

### Console

To send a multimodal prompt by using the Google Cloud console, do the
following:

1. In the Vertex AI section of the Google Cloud console, go to
 the **Vertex AI Studio** page.

 [Go to Vertex AI Studio](https://console.cloud.google.com/vertex-ai/generative/multimodal)
2. Click **Create prompt**.
3. Optional: Configure the model and parameters:

 - **Model**: Select a model.
4. Optional: To configure advanced parameters, click **Advanced** and
 configure as follows:

 #### Click to expand advanced configurations

 - **Top-K**: Use the slider or textbox to enter a value for top-K.

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
 - **Region**: Select the region that you want to use.
 - **Temperature**: Use the slider or textbox to enter a value for
 temperature.

 ```python
 
 The temperature is used for sampling during response generation, which occurs when topP
 and topK are applied. Temperature controls the degree of randomness in token selection.
 Lower temperatures are good for prompts that require a less open-ended or creative response, while
 higher temperatures can lead to more diverse or creative results. A temperature of 0
 means that the highest probability tokens are always selected. In this case, responses for a given
 prompt are mostly deterministic, but a small amount of variation is still possible.

 If the model returns a response that's too generic, too short, or the model gives a fallback
 response, try increasing the temperature.

 <li>**Output token limit**: Use the slider or textbox to enter a value for
 the max output limit.

 Maximum number of tokens that can be generated in the response. A token is
 approximately four characters. 100 tokens correspond to roughly 60-80 words.

 Specify a lower value for shorter responses and a higher value for potentially longer
 responses.

 <li>**Add stop sequence**: Optional. Enter a stop sequence, which is a
 series of characters that includes spaces. If the model encounters a
 stop sequence, the response generation stops. The stop sequence isn't
 included in the response, and you can add up to five stop sequences.
 </ul>

 ```
5. Click **Insert Media**, and select a source for your file.

 ### Upload

 Select the file that you want to upload and click **Open**.

 ### By URL

 Enter the URL of the file that you want to use and click **Insert**.

 ### YouTube

 **Preview**

 This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
 of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
 Pre-GA features are available "as is" and might have limited support.
 For more information, see the
 [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

 Enter the URL of the YouTube video that you want to use and click
 **Insert**.

 You can use any public video or a video that's owned by the account that
 you used to sign in to the Google Cloud console.

 ### Cloud Storage

 Select the bucket and then the file from the bucket that
 you want to import and click **Select**.

 ### Google Drive

 1. Choose an account and give consent to
 Vertex AI Studio to access your account the first
 time you select this option. You can upload multiple files that
 have a total size of up to 10 MB. A single file can't exceed
 7 MB.
 2. Click the file that you want to add.
 3. Click **Select**.

 The file thumbnail displays in the **Prompt** pane. The total
 number of tokens also displays. If your prompt data exceeds the
 [token limit](../learn/models.md), the
 tokens are truncated and aren't included in processing your data.
6. Enter your text prompt in the **Prompt** pane.
7. Optional: To view the **Token ID to text** and **Token IDs**, click the
 **tokens count** in the **Prompt** pane.

 **Note:** Media tokens aren't supported.
8. Click **Submit**.
9. Optional: To save your prompt to **My prompts**, click save\_alt **Save**.
10. Optional: To get the Python code or a curl command for your prompt, click
 code **Build with code > Get code**.

## Set optional model parameters

Each model has a set of optional parameters that you can set. For more
information, see [Content generation parameters](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters).

## Video requirements

Here's how tokens are calculated for video:

- **Gemini 2.0 Flash and Gemini 2.0 Flash-Lite**: The
 audio track is encoded with video frames. The audio track is also broken down into
 1-second trunks that each accounts for 32 tokens. The video
 frame and audio tokens are interleaved together with their timestamps. The
 timestamps are represented as 7 tokens.
- **All Gemini multimodal models**: Videos are sampled at
 1 frame per second (fps). Each video frame accounts for 258
 tokens.

## Best practices

When using video, use the following best practices and information for the
best results:

- If your prompt contains a single video, place the video before the text
 prompt.
- If you need timestamp localization in a video with audio, ask the model
 to generate timestamps in the `MM:SS` format where the first two
 digits represent minutes and the last two digits represent seconds. Use the
 same format for questions that ask about a timestamp.

## Limitations

While Gemini multimodal models are powerful in many multimodal use
cases, it's important to understand the limitations of the models:

- **Content moderation**: The models refuse to provide answers
 on videos that violate our safety policies.
- **Non-speech sound recognition**: The models that support
 audio might make mistakes recognizing sound that's not speech.
- **High-speed motion**: The models might make mistakes
 understanding high-speed motion in video due to the fixed
 1 frame per second (fps) sampling rate.

## What's next

- Start building with Gemini multimodal models - new customers [get $300 in free Google Cloud credits](https://console.cloud.google.com/freetrial?redirectPath=/vertex-ai/model-garden) to explore what they can do with Gemini.
- Learn how to [send chat prompt requests](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-chat-prompts-gemini).
- Learn about [responsible AI best practices and Vertex AI's safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).