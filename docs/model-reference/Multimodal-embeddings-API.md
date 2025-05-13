---
title: Multimodal-embeddings-APIgoogle.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api
date_scraped: 2025-05-12
---

# Multimodal embeddings API 

The Multimodal embeddings API generates vectors based on the input you
provide, which can include a combination of image, text, and video data. The
embedding vectors can then be used for subsequent tasks like image
classification or video content moderation.

For additional conceptual information, see [Multimodal embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings).

**Supported Models**:

| Model | Code |
| --- | --- |
| Embeddings for Multimodal | `multimodalembedding@001` |

## Example syntax

Syntax to send a multimodal embeddings API request.

### curl

```python
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \

https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:predict \
-d '{
"instances": [
 ...
],
}'
```

### Python

```python
from vertexai.vision_models import MultiModalEmbeddingModel

model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding")
model.get_embeddings(...)
```

## Parameter list

See [examples](#examples) for implementation details.

### Request Body

```python
{
 "instances": [
 {
 "text": string,
 "image": {
 // Union field can be only one of the following:
 "bytesBase64Encoded": string,
 "gcsUri": string,
 // End of list of possible types for union field.
 "mimeType": string
 },
 "video": {
 // Union field can be only one of the following:
 "bytesBase64Encoded": string,
 "gcsUri": string,
 // End of list of possible types for union field.
 "videoSegmentConfig": {
 "startOffsetSec": integer,
 "endOffsetSec": integer,
 "intervalSec": integer
 }
 },
 "parameters": {
 "dimension": integer
 }
 }
 ]
}

```

| Parameters | |
| --- | --- |
| `image` | Optional: `Image` The image to generate embeddings for. |
| `text` | Optional: `String` The text to generate embeddings for. |
| `video` | Optional: `Video` The video segment to generate embeddings for. |
| `dimension` | Optional: `Int` The dimension of the embedding, included in the response. Only applies to text and image input. Accepted values: `128`, `256`, `512`, or `1408`. |

#### Image

| Parameters | |
| --- | --- |
| `bytesBase64Encoded` | Optional: `String` Image bytes encoded in a base64 string. Must be one of `bytesBase64Encoded` or `gcsUri`. |
| `gcsUri` | Optional. `String` The Cloud Storage location of the image to perform the embedding. One of `bytesBase64Encoded` or `gcsUri`. |
| `mimeType` | Optional. `String` The MIME type of the content of the image. Supported values: `image/jpeg` and `image/png`. |

#### Video

| Parameters | |
| --- | --- |
| `bytesBase64Encoded` | Optional: `String` Video bytes encoded in base64 string. One of `bytesBase64Encoded` or `gcsUri`. |
| `gcsUri` | Optional: `String` The Cloud Storage location of the video on which to perform the embedding. One of `bytesBase64Encoded` or `gcsUri`. |
| `videoSegmentConfig` | Optional: `VideoSegmentConfig` The video segment config. |

##### VideoSegmentConfig

| Parameters | |
| --- | --- |
| `startOffsetSec` | Optional: `Int` The start offset of the video segment in seconds. If not specified, it's calculated with `max(0, endOffsetSec - 120)`. |
| `endOffsetSec` | Optional: `Int` The end offset of the video segment in seconds. If not specified, it's calculated with `min(video length, startOffSec + 120)`. If both `startOffSec` and `endOffSec` are specified, `endOffsetSec` is adjusted to `min(startOffsetSec+120, endOffsetSec)`. |
| `intervalSec` | Optional. `Int` The interval of the video the embedding will be generated. The minimum value for `interval_sec` is 4. If the interval is less than `4`, an `InvalidArgumentError` is returned. There are no limitations on the maximum value of the interval. However, if the interval is larger than `min(video length, 120s)`, it impacts the quality of the generated embeddings. Default value: `16`. |

### Response body

```python
{
 "predictions": [
 {
 "textEmbedding": [
 float,
 // array of 128, 256, 512, or 1408 float values
 float
 ],
 "imageEmbedding": [
 float,
 // array of 128, 256, 512, or 1408 float values
 float
 ],
 "videoEmbeddings": [
 {
 "startOffsetSec": integer,
 "endOffsetSec": integer,
 "embedding": [
 float,
 // array of 1408 float values
 float
 ]
 }
 ]
 }
 ],
 "deployedModelId": string
}

```

| Response element | Description |
| --- | --- |
| `imageEmbedding` | 128, 256, 512, or 1408 dimension list of floats. |
| `textEmbedding` | 128, 256, 512, or 1408 dimension list of floats. |
| `videoEmbeddings` | 1408 dimension list of floats with the start and end time (in seconds) of the video segment that the embeddings are generated for. |

## Examples

### Basic use case

#### Generate embeddings from image

Use the following sample to generate embeddings for an image.

### REST

Before using any of the request data,
make the following replacements:

- LOCATION: Your project's region. For example,
 `us-central1`, `europe-west2`, or `asia-northeast3`. For a list
 of available regions, see
 [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).
- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TEXT: The target text to get embeddings for. For example,
 `a cat`.
- B64\_ENCODED\_IMG: The target image to get embeddings for. The image must be
 specified as a [base64-encoded](https://cloud.google.com/vertex-ai/generative-ai/docs/image/base64-encode) byte string.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict
```

Request JSON body:

```python
{
 "instances": [
 {
 "text": "TEXT",
 "image": {
 "bytesBase64Encoded": "B64_ENCODED_IMG"
 }
 }
 ]
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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict" | Select-Object -Expand Content
```

The embedding the model returns is a 1408 float vector. The following sample response is shortened
for space.

```python
{
 "predictions": [
 {
 "textEmbedding": [
 0.010477379,
 -0.00399621,
 0.00576670747,
 [...]
 -0.00823613815,
 -0.0169572588,
 -0.00472954148
 ],
 "imageEmbedding": [
 0.00262696808,
 -0.00198890246,
 0.0152047109,
 -0.0103145819,
 [...]
 0.0324628279,
 0.0284924973,
 0.011650892,
 -0.00452344026
 ]
 }
 ],
 "deployedModelId": "DEPLOYED_MODEL_ID"
}

```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import vertexai
from vertexai.vision_models import Image, MultiModalEmbeddingModel

# TODO(developer): Update & uncomment line below
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding@001")
image = Image.load_from_file(
 "gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png"
)

embeddings = model.get_embeddings(
 image=image,
 contextual_text="Colosseum",
 dimension=1408,
)
print(f"Image Embedding: {embeddings.image_embedding}")
print(f"Text Embedding: {embeddings.text_embedding}")
# Example response:
# Image Embedding: [-0.0123147098, 0.0727171078, ...]
# Text Embedding: [0.00230263756, 0.0278981831, ...]

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

```python
/**
 * TODO(developer): Uncomment these variables before running the sample.\
 * (Not necessary if passing values as arguments)
 */
// const project = 'YOUR_PROJECT_ID';
// const location = 'YOUR_PROJECT_LOCATION';
// const bastImagePath = "YOUR_BASED_IMAGE_PATH"
// const textPrompt = 'YOUR_TEXT_PROMPT';
const aiplatform = require('@google-cloud/aiplatform');

// Imports the Google Cloud Prediction service client
const {PredictionServiceClient} = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects.
const {helpers} = aiplatform;

// Specifies the location of the api endpoint
const clientOptions = {
 apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};
const publisher = 'google';
const model = 'multimodalembedding@001';

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function predictImageFromImageAndText() {
 // Configure the parent resource
 const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;

 const fs = require('fs');
 const imageFile = fs.readFileSync(baseImagePath);

 // Convert the image data to a Buffer and base64 encode it.
 const encodedImage = Buffer.from(imageFile).toString('base64');

 const prompt = {
 text: textPrompt,
 image: {
 bytesBase64Encoded: encodedImage,
 },
 };
 const instanceValue = helpers.toValue(prompt);
 const instances = [instanceValue];

 const parameter = {
 sampleCount: 1,
 };
 const parameters = helpers.toValue(parameter);

 const request = {
 endpoint,
 instances,
 parameters,
 };

 // Predict request
 const [response] = await predictionServiceClient.predict(request);
 console.log('Get image embedding response');
 const predictions = response.predictions;
 console.log('\tPredictions :');
 for (const prediction of predictions) {
 console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
 }
}

await predictImageFromImageAndText();
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

```python

import com.google.cloud.aiplatform.v1beta1.EndpointName;
import com.google.cloud.aiplatform.v1beta1.PredictResponse;
import com.google.cloud.aiplatform.v1beta1.PredictionServiceClient;
import com.google.cloud.aiplatform.v1beta1.PredictionServiceSettings;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Value;
import com.google.protobuf.util.JsonFormat;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PredictImageFromImageAndTextSample {

 public static void main(String[] args) throws IOException {
 // TODO(developer): Replace this variable before running the sample.
 String project = "YOUR_PROJECT_ID";
 String textPrompt = "YOUR_TEXT_PROMPT";
 String baseImagePath = "YOUR_BASE_IMAGE_PATH";

 // Learn how to use text prompts to update an image:
 // https://cloud.google.com/vertex-ai/docs/generative-ai/image/edit-images
 Map<String, Object> parameters = new HashMap<String, Object>();
 parameters.put("sampleCount", 1);

 String location = "us-central1";
 String publisher = "google";
 String model = "multimodalembedding@001";

 predictImageFromImageAndText(
 project, location, publisher, model, textPrompt, baseImagePath, parameters);
 }

 // Update images using text prompts
 public static void predictImageFromImageAndText(
 String project,
 String location,
 String publisher,
 String model,
 String textPrompt,
 String baseImagePath,
 Map<String, Object> parameters)
 throws IOException {
 final String endpoint = String.format("%s-aiplatform.googleapis.com:443", location);
 final PredictionServiceSettings predictionServiceSettings =
 PredictionServiceSettings.newBuilder().setEndpoint(endpoint).build();

 // Initialize client that will be used to send requests. This client only needs to be created
 // once, and can be reused for multiple requests.
 try (PredictionServiceClient predictionServiceClient =
 PredictionServiceClient.create(predictionServiceSettings)) {
 final EndpointName endpointName =
 EndpointName.ofProjectLocationPublisherModelName(project, location, publisher, model);

 // Convert the image to Base64
 byte[] imageData = Base64.getEncoder().encode(Files.readAllBytes(Paths.get(baseImagePath)));
 String encodedImage = new String(imageData, StandardCharsets.UTF_8);

 JsonObject jsonInstance = new JsonObject();
 jsonInstance.addProperty("text", textPrompt);
 JsonObject jsonImage = new JsonObject();
 jsonImage.addProperty("bytesBase64Encoded", encodedImage);
 jsonInstance.add("image", jsonImage);

 Value instanceValue = stringToValue(jsonInstance.toString());
 List<Value> instances = new ArrayList<>();
 instances.add(instanceValue);

 Gson gson = new Gson();
 String gsonString = gson.toJson(parameters);
 Value parameterValue = stringToValue(gsonString);

 PredictResponse predictResponse =
 predictionServiceClient.predict(endpointName, instances, parameterValue);
 System.out.println("Predict Response");
 System.out.println(predictResponse);
 for (Value prediction : predictResponse.getPredictionsList()) {
 System.out.format("\tPrediction: %s\n", prediction);
 }
 }
 }

 // Convert a Json string to a protobuf.Value
 static Value stringToValue(String value) throws InvalidProtocolBufferException {
 Value.Builder builder = Value.newBuilder();
 JsonFormat.parser().merge(value, builder);
 return builder.build();
 }
}
```

### Go

Before trying this sample, follow the Go setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Go API
reference documentation](/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

```python
import (
 "context"
 "encoding/json"
 "fmt"
 "io"

 aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
 aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
 "google.golang.org/api/option"
 "google.golang.org/protobuf/encoding/protojson"
 "google.golang.org/protobuf/types/known/structpb"
)

// generateForTextAndImage shows how to use the multimodal model to generate embeddings for
// text and image inputs.
func generateForTextAndImage(w io.Writer, project, location string) error {
 // location = "us-central1"
 ctx := context.Background()
 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 client, err := aiplatform.NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
 if err != nil {
 return fmt.Errorf("failed to construct API client: %w", err)
 }
 defer client.Close()

 model := "multimodalembedding@001"
 endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)

 // This is the input to the model's prediction call. For schema, see:
 // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#request_body
 instance, err := structpb.NewValue(map[string]any{
 "image": map[string]any{
 // Image input can be provided either as a Google Cloud Storage URI or as
 // base64-encoded bytes using the "bytesBase64Encoded" field.
 "gcsUri": "gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png",
 },
 "text": "Colosseum",
 })
 if err != nil {
 return fmt.Errorf("failed to construct request payload: %w", err)
 }

 req := &aiplatformpb.PredictRequest{
 Endpoint: endpoint,
 // The model supports only 1 instance per request.
 Instances: []*structpb.Value{instance},
 }

 resp, err := client.Predict(ctx, req)
 if err != nil {
 return fmt.Errorf("failed to generate embeddings: %w", err)
 }

 instanceEmbeddingsJson, err := protojson.Marshal(resp.GetPredictions()[0])
 if err != nil {
 return fmt.Errorf("failed to convert protobuf value to JSON: %w", err)
 }
 // For response schema, see:
 // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#response-body
 var instanceEmbeddings struct {
 ImageEmbeddings []float32 `json:"imageEmbedding"`
 TextEmbeddings []float32 `json:"textEmbedding"`
 }
 if err := json.Unmarshal(instanceEmbeddingsJson, &instanceEmbeddings); err != nil {
 return fmt.Errorf("failed to unmarshal JSON: %w", err)
 }

 imageEmbedding := instanceEmbeddings.ImageEmbeddings
 textEmbedding := instanceEmbeddings.TextEmbeddings

 fmt.Fprintf(w, "Text embedding (length=%d): %v\n", len(textEmbedding), textEmbedding)
 fmt.Fprintf(w, "Image embedding (length=%d): %v\n", len(imageEmbedding), imageEmbedding)
 // Example response:
 // Text embedding (length=1408): [0.0023026613 0.027898183 -0.011858357 ... ]
 // Image embedding (length=1408): [-0.012314269 0.07271844 0.00020170923 ... ]

 return nil
}

```

#### Generate embeddings from video

Use the following sample to generating embeddings for video content.

### REST

The following example uses a video located in Cloud Storage. You can
also use the `video.bytesBase64Encoded` field to provide a
[base64-encoded](https://cloud.google.com/vertex-ai/generative-ai/docs/image/base64-encode) string representation of the
video.

Before using any of the request data,
make the following replacements:

- LOCATION: Your project's region. For example,
 `us-central1`, `europe-west2`, or `asia-northeast3`. For a list
 of available regions, see
 [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).
- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- VIDEO\_URI: The Cloud Storage URI of the target video to get embeddings for.
 For example, `gs://my-bucket/embeddings/supermarket-video.mp4`.

 You can also provide the video as a
 base64-encoded byte string:

 ```python
 [...]
 "video": {
 "bytesBase64Encoded": "B64_ENCODED_VIDEO"
 }
 [...]

 ```
- `videoSegmentConfig` (START\_SECOND, END\_SECOND,
 INTERVAL\_SECONDS). Optional. The specific video segments (in seconds) the embeddings
 are generated for.
 The value you set for `videoSegmentConfig.intervalSec` affects
 the pricing tier you are charged at. For more information, see
 the [video embedding modes](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#video-modes) section and
 [pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) page.

 For example:

 ```python
 [...]
 "videoSegmentConfig": {
 "startOffsetSec": 10,
 "endOffsetSec": 60,
 "intervalSec": 10
 }
 [...]
 ```

 Using this config specifies video data from 10 seconds to 60 seconds and generates embeddings
 for the following 10 second video intervals: [10, 20), [20, 30), [30, 40), [40, 50), [50, 60).
 This video interval (`"intervalSec": 10`) falls in the
 [Standard video embedding mode](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#video-modes), and the user
 is charged at the [Standard mode pricing rate](https://cloud.google.com/vertex-ai/generative-ai/pricing).

 If you omit `videoSegmentConfig`, the service uses the following default values:
 `"videoSegmentConfig": { "startOffsetSec": 0, "endOffsetSec": 120, "intervalSec": 16 }`.
 This video interval (`"intervalSec": 16`) falls in the
 [Essential video embedding mode](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#video-modes), and the user
 is charged at the [Essential mode pricing rate](https://cloud.google.com/vertex-ai/generative-ai/pricing).

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict
```

Request JSON body:

```python
{
 "instances": [
 {
 "video": {
 "gcsUri": "VIDEO_URI",
 "videoSegmentConfig": {
 "startOffsetSec": START_SECOND,
 "endOffsetSec": END_SECOND,
 "intervalSec": INTERVAL_SECONDS
 }
 }
 }
 ]
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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict" | Select-Object -Expand Content
```

The embedding the model returns is a 1408 float vector. The following sample responses are shortened
for space.

**Response (7 second video, no `videoSegmentConfig` specified):**

```python
{
 "predictions": [
 {
 "videoEmbeddings": [
 {
 "endOffsetSec": 7,
 "embedding": [
 -0.0045467657,
 0.0258095954,
 0.0146885719,
 0.00945400633,
 [...]
 -0.0023291884,
 -0.00493789,
 0.00975185353,
 0.0168156829
 ],
 "startOffsetSec": 0
 }
 ]
 }
 ],
 "deployedModelId": "DEPLOYED_MODEL_ID"
}
```

**Response (59 second video, with the following video segment config: `"videoSegmentConfig": { "startOffsetSec": 0, "endOffsetSec": 60, "intervalSec": 10 }`):**

```python
{
 "predictions": [
 {
 "videoEmbeddings": [
 {
 "endOffsetSec": 10,
 "startOffsetSec": 0,
 "embedding": [
 -0.00683252793,
 0.0390476175,
 [...]
 0.00657121744,
 0.013023301
 ]
 },
 {
 "startOffsetSec": 10,
 "endOffsetSec": 20,
 "embedding": [
 -0.0104404651,
 0.0357737206,
 [...]
 0.00509833824,
 0.0131902946
 ]
 },
 {
 "startOffsetSec": 20,
 "embedding": [
 -0.0113538112,
 0.0305239167,
 [...]
 -0.00195809244,
 0.00941874553
 ],
 "endOffsetSec": 30
 },
 {
 "embedding": [
 -0.00299320649,
 0.0322436653,
 [...]
 -0.00993082579,
 0.00968887936
 ],
 "startOffsetSec": 30,
 "endOffsetSec": 40
 },
 {
 "endOffsetSec": 50,
 "startOffsetSec": 40,
 "embedding": [
 -0.00591270532,
 0.0368893594,
 [...]
 -0.00219071587,
 0.0042470959
 ]
 },
 {
 "embedding": [
 -0.00458270218,
 0.0368121453,
 [...]
 -0.00317760976,
 0.00595594104
 ],
 "endOffsetSec": 59,
 "startOffsetSec": 50
 }
 ]
 }
 ],
 "deployedModelId": "DEPLOYED_MODEL_ID"
}

```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import vertexai

from vertexai.vision_models import MultiModalEmbeddingModel, Video
from vertexai.vision_models import VideoSegmentConfig

# TODO(developer): Update & uncomment line below
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding@001")

embeddings = model.get_embeddings(
 video=Video.load_from_file(
 "gs://cloud-samples-data/vertex-ai-vision/highway_vehicles.mp4"
 ),
 video_segment_config=VideoSegmentConfig(end_offset_sec=1),
)

# Video Embeddings are segmented based on the video_segment_config.
print("Video Embeddings:")
for video_embedding in embeddings.video_embeddings:
 print(
 f"Video Segment: {video_embedding.start_offset_sec} - {video_embedding.end_offset_sec}"
 )
 print(f"Embedding: {video_embedding.embedding}")

# Example response:
# Video Embeddings:
# Video Segment: 0.0 - 1.0
# Embedding: [-0.0206376351, 0.0123456789, ...]

```

### Go

Before trying this sample, follow the Go setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Go API
reference documentation](/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

```python
import (
 "context"
 "encoding/json"
 "fmt"
 "io"
 "time"

 aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
 aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
 "google.golang.org/api/option"
 "google.golang.org/protobuf/encoding/protojson"
 "google.golang.org/protobuf/types/known/structpb"
)

// generateForVideo shows how to use the multimodal model to generate embeddings for video input.
func generateForVideo(w io.Writer, project, location string) error {
 // location = "us-central1"

 // The default context timeout may be not enough to process a video input.
 ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
 defer cancel()

 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 client, err := aiplatform.NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
 if err != nil {
 return fmt.Errorf("failed to construct API client: %w", err)
 }
 defer client.Close()

 model := "multimodalembedding@001"
 endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)

 // This is the input to the model's prediction call. For schema, see:
 // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#request_body
 instances, err := structpb.NewValue(map[string]any{
 "video": map[string]any{
 // Video input can be provided either as a Google Cloud Storage URI or as base64-encoded
 // bytes using the "bytesBase64Encoded" field.
 "gcsUri": "gs://cloud-samples-data/vertex-ai-vision/highway_vehicles.mp4",
 "videoSegmentConfig": map[string]any{
 "startOffsetSec": 1,
 "endOffsetSec": 5,
 },
 },
 })
 if err != nil {
 return fmt.Errorf("failed to construct request payload: %w", err)
 }

 req := &aiplatformpb.PredictRequest{
 Endpoint: endpoint,
 // The model supports only 1 instance per request.
 Instances: []*structpb.Value{instances},
 }
 resp, err := client.Predict(ctx, req)
 if err != nil {
 return fmt.Errorf("failed to generate embeddings: %w", err)
 }

 instanceEmbeddingsJson, err := protojson.Marshal(resp.GetPredictions()[0])
 if err != nil {
 return fmt.Errorf("failed to convert protobuf value to JSON: %w", err)
 }
 // For response schema, see:
 // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#response-body
 var instanceEmbeddings struct {
 VideoEmbeddings []struct {
 Embedding []float32 `json:"embedding"`
 StartOffsetSec float64 `json:"startOffsetSec"`
 EndOffsetSec float64 `json:"endOffsetSec"`
 } `json:"videoEmbeddings"`
 }
 if err := json.Unmarshal(instanceEmbeddingsJson, &instanceEmbeddings); err != nil {
 return fmt.Errorf("failed to unmarshal json: %w", err)
 }
 // Get the embedding for our single video segment (`.videoEmbeddings` object has one entry per
 // each processed segment).
 videoEmbedding := instanceEmbeddings.VideoEmbeddings[0]

 fmt.Fprintf(w, "Video embedding (seconds: %.f-%.f; length=%d): %v\n",
 videoEmbedding.StartOffsetSec,
 videoEmbedding.EndOffsetSec,
 len(videoEmbedding.Embedding),
 videoEmbedding.Embedding,
 )
 // Example response:
 // Video embedding (seconds: 1-5; length=1408): [-0.016427778 0.032878537 -0.030755188 ... ]

 return nil
}

```

### Advanced use case

Use the following sample to get embeddings for video, text, and image content.

For video embedding, you can specify the video segment and embedding density.

### REST

The following example uses image, text, and video data. You can use any
combination of these data types in your request body.

This sample uses a video located in Cloud Storage. You can
also use the `video.bytesBase64Encoded` field to provide a
[base64-encoded](https://cloud.google.com/vertex-ai/generative-ai/docs/image/base64-encode) string representation of the
video.

Before using any of the request data,
make the following replacements:

- LOCATION: Your project's region. For example,
 `us-central1`, `europe-west2`, or `asia-northeast3`. For a list
 of available regions, see
 [Generative AI on Vertex AI locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations-genai).
- PROJECT\_ID: Your Google Cloud [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TEXT: The target text to get embeddings for. For example,
 `a cat`.
- IMAGE\_URI: The Cloud Storage URI of the target image to get embeddings for.
 For example, `gs://my-bucket/embeddings/supermarket-img.png`.

 You can also provide the image as a
 base64-encoded byte string:

 ```python
 [...]
 "image": {
 "bytesBase64Encoded": "B64_ENCODED_IMAGE"
 }
 [...]

 ```
- VIDEO\_URI: The Cloud Storage URI of the target video to get embeddings for.
 For example, `gs://my-bucket/embeddings/supermarket-video.mp4`.

 You can also provide the video as a
 base64-encoded byte string:

 ```python
 [...]
 "video": {
 "bytesBase64Encoded": "B64_ENCODED_VIDEO"
 }
 [...]

 ```
- `videoSegmentConfig` (START\_SECOND, END\_SECOND,
 INTERVAL\_SECONDS). Optional. The specific video segments (in seconds) the embeddings
 are generated for.
 The value you set for `videoSegmentConfig.intervalSec` affects
 the pricing tier you are charged at. For more information, see
 the [video embedding modes](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#video-modes) section and
 [pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) page.

 For example:

 ```python
 [...]
 "videoSegmentConfig": {
 "startOffsetSec": 10,
 "endOffsetSec": 60,
 "intervalSec": 10
 }
 [...]
 ```

 Using this config specifies video data from 10 seconds to 60 seconds and generates embeddings
 for the following 10 second video intervals: [10, 20), [20, 30), [30, 40), [40, 50), [50, 60).
 This video interval (`"intervalSec": 10`) falls in the
 [Standard video embedding mode](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#video-modes), and the user
 is charged at the [Standard mode pricing rate](https://cloud.google.com/vertex-ai/generative-ai/pricing).

 If you omit `videoSegmentConfig`, the service uses the following default values:
 `"videoSegmentConfig": { "startOffsetSec": 0, "endOffsetSec": 120, "intervalSec": 16 }`.
 This video interval (`"intervalSec": 16`) falls in the
 [Essential video embedding mode](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#video-modes), and the user
 is charged at the [Essential mode pricing rate](https://cloud.google.com/vertex-ai/generative-ai/pricing).

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict
```

Request JSON body:

```python
{
 "instances": [
 {
 "text": "TEXT",
 "image": {
 "gcsUri": "IMAGE_URI"
 },
 "video": {
 "gcsUri": "VIDEO_URI",
 "videoSegmentConfig": {
 "startOffsetSec": START_SECOND,
 "endOffsetSec": END_SECOND,
 "intervalSec": INTERVAL_SECONDS
 }
 }
 }
 ]
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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict" | Select-Object -Expand Content
```

The embedding the model returns is a 1408 float vector. The following sample response is shortened
for space.

```python
{
 "predictions": [
 {
 "textEmbedding": [
 0.0105433334,
 -0.00302835181,
 0.00656806398,
 0.00603460241,
 [...]
 0.00445805816,
 0.0139605571,
 -0.00170318608,
 -0.00490092579
 ],
 "videoEmbeddings": [
 {
 "startOffsetSec": 0,
 "endOffsetSec": 7,
 "embedding": [
 -0.00673126569,
 0.0248149596,
 0.0128901172,
 0.0107588246,
 [...]
 -0.00180952181,
 -0.0054573305,
 0.0117037306,
 0.0169312079
 ]
 }
 ],
 "imageEmbedding": [
 -0.00728622358,
 0.031021487,
 -0.00206603738,
 0.0273937676,
 [...]
 -0.00204976718,
 0.00321615417,
 0.0121978866,
 0.0193375275
 ]
 }
 ],
 "deployedModelId": "DEPLOYED_MODEL_ID"
}

```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import vertexai

from vertexai.vision_models import Image, MultiModalEmbeddingModel, Video
from vertexai.vision_models import VideoSegmentConfig

# TODO(developer): Update & uncomment line below
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding@001")

image = Image.load_from_file(
 "gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png"
)
video = Video.load_from_file(
 "gs://cloud-samples-data/vertex-ai-vision/highway_vehicles.mp4"
)

embeddings = model.get_embeddings(
 image=image,
 video=video,
 video_segment_config=VideoSegmentConfig(end_offset_sec=1),
 contextual_text="Cars on Highway",
)

print(f"Image Embedding: {embeddings.image_embedding}")

# Video Embeddings are segmented based on the video_segment_config.
print("Video Embeddings:")
for video_embedding in embeddings.video_embeddings:
 print(
 f"Video Segment: {video_embedding.start_offset_sec} - {video_embedding.end_offset_sec}"
 )
 print(f"Embedding: {video_embedding.embedding}")

print(f"Text Embedding: {embeddings.text_embedding}")
# Example response:
# Image Embedding: [-0.0123144267, 0.0727186054, 0.000201397663, ...]
# Video Embeddings:
# Video Segment: 0.0 - 1.0
# Embedding: [-0.0206376351, 0.0345234685, ...]
# Text Embedding: [-0.0207006838, -0.00251058186, ...]

```

### Go

Before trying this sample, follow the Go setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Go API
reference documentation](/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

```python
import (
 "context"
 "encoding/json"
 "fmt"
 "io"
 "time"

 aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
 aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
 "google.golang.org/api/option"
 "google.golang.org/protobuf/encoding/protojson"
 "google.golang.org/protobuf/types/known/structpb"
)

// generateForImageTextAndVideo shows how to use the multimodal model to generate embeddings for
// image, text and video data.
func generateForImageTextAndVideo(w io.Writer, project, location string) error {
 // location = "us-central1"

 // The default context timeout may be not enough to process a video input.
 ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
 defer cancel()

 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 client, err := aiplatform.NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
 if err != nil {
 return fmt.Errorf("failed to construct API client: %w", err)
 }
 defer client.Close()

 model := "multimodalembedding@001"
 endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)

 // This is the input to the model's prediction call. For schema, see:
 // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#request_body
 instance, err := structpb.NewValue(map[string]any{
 "text": "Domestic cats in natural conditions",
 "image": map[string]any{
 // Image and video inputs can be provided either as a Google Cloud Storage URI or as
 // base64-encoded bytes using the "bytesBase64Encoded" field.
 "gcsUri": "gs://cloud-samples-data/generative-ai/image/320px-Felis_catus-cat_on_snow.jpg",
 },
 "video": map[string]any{
 "gcsUri": "gs://cloud-samples-data/video/cat.mp4",
 },
 })
 if err != nil {
 return fmt.Errorf("failed to construct request payload: %w", err)
 }

 req := &aiplatformpb.PredictRequest{
 Endpoint: endpoint,
 // The model supports only 1 instance per request.
 Instances: []*structpb.Value{instance},
 }

 resp, err := client.Predict(ctx, req)
 if err != nil {
 return fmt.Errorf("failed to generate embeddings: %w", err)
 }

 instanceEmbeddingsJson, err := protojson.Marshal(resp.GetPredictions()[0])
 if err != nil {
 return fmt.Errorf("failed to convert protobuf value to JSON: %w", err)
 }
 // For response schema, see:
 // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#response-body
 var instanceEmbeddings struct {
 ImageEmbeddings []float32 `json:"imageEmbedding"`
 TextEmbeddings []float32 `json:"textEmbedding"`
 VideoEmbeddings []struct {
 Embedding []float32 `json:"embedding"`
 StartOffsetSec float64 `json:"startOffsetSec"`
 EndOffsetSec float64 `json:"endOffsetSec"`
 } `json:"videoEmbeddings"`
 }
 if err := json.Unmarshal(instanceEmbeddingsJson, &instanceEmbeddings); err != nil {
 return fmt.Errorf("failed to unmarshal JSON: %w", err)
 }

 imageEmbedding := instanceEmbeddings.ImageEmbeddings
 textEmbedding := instanceEmbeddings.TextEmbeddings
 // Get the embedding for our single video segment (`.videoEmbeddings` object has one entry per
 // each processed segment).
 videoEmbedding := instanceEmbeddings.VideoEmbeddings[0].Embedding

 fmt.Fprintf(w, "Image embedding (length=%d): %v\n", len(imageEmbedding), imageEmbedding)
 fmt.Fprintf(w, "Text embedding (length=%d): %v\n", len(textEmbedding), textEmbedding)
 fmt.Fprintf(w, "Video embedding (length=%d): %v\n", len(videoEmbedding), videoEmbedding)
 // Example response:
 // Image embedding (length=1408): [-0.01558477 0.0258355 0.016342038 ... ]
 // Text embedding (length=1408): [-0.005894961 0.008349559 0.015355394 ... ]
 // Video embedding (length=1408): [-0.018867437 0.013997682 0.0012682161 ... ]

 return nil
}

```

## What's next

For detailed documentation, see the following:

- [Get multimodal embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings)