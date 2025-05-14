---
date_scraped: 2025-05-12
title: Text Embeddings Api
---

# Text embeddings API 

The Text embeddings API converts textual data into numerical vectors. These
vector representations are designed to capture the semantic meaning and context
of the words they represent.

**Supported Models**:

| English models | Multilingual models | Gemini embedding models |
| --- | --- | --- |
| `text-embedding-005` | `text-multilingual-embedding-002` | `text-embedding-large-exp-03-07` (experimental) |

## Syntax

### curl

```python
PROJECT_ID = PROJECT_ID
REGION = us-central1
MODEL_ID = MODEL_ID

curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/publishers/google/models/${MODEL_ID}:predict -d \
 '{
 "instances": [
 ...
 ],
 "parameters": {
 ...
 }
 }'
```

### Python

```python
PROJECT_ID = PROJECT_ID
REGION = us-central1
MODEL_ID = MODEL_ID

import vertexai
from vertexai.language_models import TextEmbeddingModel

vertexai.init(project=PROJECT_ID, location=REGION)

model = TextEmbeddingModel.from_pretrained(MODEL_ID)
embeddings = model.get_embeddings(...)
```

## Parameter list

| Parameters | |
| --- | --- |
| `texts` | `list of union[string, TextEmbeddingInput]` Each instance represents a single piece of text to be embedded. |
| `TextEmbeddingInput` | `string` The text that you want to generate embeddings for. |
| `auto_truncate` | Optional: `bool` When set to true, input text will be truncated. When set to false, an error is returned if the input text is longer than the maximum length supported by the model. Defaults to true. |
| `output_dimensionality` | Optional: `int` Used to specify output embedding size. If set, output embeddings will be truncated to the size specified. |

### Request body

```python
{
 "instances": [
 { 
 "task_type": "RETRIEVAL_DOCUMENT",
 "title": "document title",
 "content": "I would like embeddings for this text!"
 },
 ]
}

```

| Parameters | |
| --- | --- |
| `content` | `string` The text that you want to generate embeddings for. |
| `task_type` | Optional: `string` Used to convey intended downstream application to help the model produce better embeddings. If left blank, the default used is `RETRIEVAL_QUERY`. - `RETRIEVAL_QUERY` - `RETRIEVAL_DOCUMENT` - `SEMANTIC_SIMILARITY` - `CLASSIFICATION` - `CLUSTERING` - `QUESTION_ANSWERING` - `FACT_VERIFICATION` - `CODE_RETRIEVAL_QUERY` The `task_type` parameter is not supported for the textembedding-gecko@001 model. For more information about task types, see [Choose an embeddings task type](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/task-types). |
| `title` | Optional: `string` Used to help the model produce better embeddings. Only valid with `task_type=RETRIEVAL_DOCUMENT`. |

#### taskType

The following table describes the `task_type` parameter values and their use
cases:

| `task_type` | Description |
| --- | --- |
| `RETRIEVAL_QUERY` | Specifies the given text is a query in a search or retrieval setting. |
| `RETRIEVAL_DOCUMENT` | Specifies the given text is a document in a search or retrieval setting. |
| `SEMANTIC_SIMILARITY` | Specifies the given text is used for Semantic Textual Similarity (STS). |
| `CLASSIFICATION` | Specifies that the embedding is used for classification. |
| `CLUSTERING` | Specifies that the embedding is used for clustering. |
| `QUESTION_ANSWERING` | Specifies that the query embedding is used for answering questions. Use RETRIEVAL\_DOCUMENT for the document side. |
| `FACT_VERIFICATION` | Specifies that the query embedding is used for fact verification. |
| `CODE_RETRIEVAL_QUERY` | Specifies that the query embedding is used for code retrieval for Java and Python. |

**Retrieval Tasks**:

Query: Use task\_type=`RETRIEVAL_QUERY` to indicate that the input text is a search query.
Corpus: Use task\_type=`RETRIEVAL_DOCUMENT` to indicate that the input text is part
of the document collection being searched.

**Similarity Tasks**:

Semantic similarity: Use task\_type= `SEMANTIC_SIMILARITY` for both input texts to assess
their overall meaning similarity.

### Response body

```python
{
 "predictions": [
 {
 "embeddings": {
 "statistics": {
 "truncated": boolean,
 "token_count": integer
 },
 "values": [ number ]
 }
 }
 ]
}

```

| Response element | Description |
| --- | --- |
| `embeddings` | The result generated from input text. |
| `statistics` | The statistics computed from the input text. |
| `truncated` | Indicates if the input text was longer than max allowed tokens and truncated. |
| `tokenCount` | Number of tokens of the input text. |
| `values` | The `values` field contains the embedding vectors corresponding to the words in the input text. |

#### Sample response

```python
{
 "predictions": [
 {
 "embeddings": {
 "values": [
 0.0058424929156899452,
 0.011848051100969315,
 0.032247550785541534,
 -0.031829461455345154,
 -0.055369812995195389,
 ...
 ],
 "statistics": {
 "token_count": 4,
 "truncated": false
 }
 }
 }
 ]
}

```

## Examples

### Embed a text string

#### Basic use case

The following example shows how to obtain the embedding of a text string.

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TEXT: The text that you want to generate embeddings
 for. **Limit:** five texts of up to 2,048 tokens per text for all models except `textembedding-gecko@001`. The max input token length for `textembedding-gecko@001` is 3072.
- AUTO\_TRUNCATE: If set to
 `false`, text that exceeds the token limit causes the request to fail. The default
 value is `true`.

HTTP method and URL:

```python
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/text-embedding-005:predict
```

Request JSON body:

```python
{
 "instances": [
 { "content": "TEXT"}
 ],
 "parameters": { 
 "autoTruncate": AUTO_TRUNCATE 
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
 "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/text-embedding-005:predict"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/text-embedding-005:predict" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following. Note that `values`
has been truncated to save space.

#### Response

```python
{
 "predictions": [
 {
 "embeddings": {
 "statistics": {
 "truncated": false,
 "token_count": 6
 },
 "values": [ ... ]
 }
 }
 ]
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

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
from __future__ import annotations

from vertexai.language_models import TextEmbeddingInput, TextEmbeddingModel

def embed_text() -> list[list[float]]:
 """Embeds texts with a pre-trained, foundational model.

 Returns:
 A list of lists containing the embedding vectors for each input text
 """

 # A list of texts to be embedded.
 texts = ["banana muffins? ", "banana bread? banana muffins?"]
 # The dimensionality of the output embeddings.
 dimensionality = 256
 # The task type for embedding. Check the available tasks in the model's documentation.
 task = "RETRIEVAL_DOCUMENT"

 model = TextEmbeddingModel.from_pretrained("text-embedding-005")
 inputs = [TextEmbeddingInput(text, task) for text in texts]
 kwargs = dict(output_dimensionality=dimensionality) if dimensionality else {}
 embeddings = model.get_embeddings(inputs, **kwargs)

 print(embeddings)
 # Example response:
 # [[0.006135190837085247, -0.01462465338408947, 0.004978656303137541, ...], [0.1234434666, ...]],
 return [embedding.values for embedding in embeddings]

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
 "fmt"
 "io"

 aiplatform "cloud.google.com/go/aiplatform/apiv1"
 "cloud.google.com/go/aiplatform/apiv1/aiplatformpb"

 "google.golang.org/api/option"
 "google.golang.org/protobuf/types/known/structpb"
)

// embedTexts shows how embeddings are set for text-embedding-005 model
func embedTexts(w io.Writer, project, location string) error {
 // location := "us-central1"
 ctx := context.Background()

 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 dimensionality := 5
 model := "text-embedding-005"
 texts := []string{"banana muffins? ", "banana bread? banana muffins?"}

 client, err := aiplatform.NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
 if err != nil {
 return err
 }
 defer client.Close()

 endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)
 instances := make([]*structpb.Value, len(texts))
 for i, text := range texts {
 instances[i] = structpb.NewStructValue(&structpb.Struct{
 Fields: map[string]*structpb.Value{
 "content": structpb.NewStringValue(text),
 "task_type": structpb.NewStringValue("QUESTION_ANSWERING"),
 },
 })
 }

 params := structpb.NewStructValue(&structpb.Struct{
 Fields: map[string]*structpb.Value{
 "outputDimensionality": structpb.NewNumberValue(float64(dimensionality)),
 },
 })

 req := &aiplatformpb.PredictRequest{
 Endpoint: endpoint,
 Instances: instances,
 Parameters: params,
 }
 resp, err := client.Predict(ctx, req)
 if err != nil {
 return err
 }
 embeddings := make([][]float32, len(resp.Predictions))
 for i, prediction := range resp.Predictions {
 values := prediction.GetStructValue().Fields["embeddings"].GetStructValue().Fields["values"].GetListValue().Values
 embeddings[i] = make([]float32, len(values))
 for j, value := range values {
 embeddings[i][j] = float32(value.GetNumberValue())
 }
 }

 fmt.Fprintf(w, "Dimensionality: %d. Embeddings length: %d", len(embeddings[0]), len(embeddings))
 return nil
}

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
import static java.util.stream.Collectors.toList;

import com.google.cloud.aiplatform.v1.EndpointName;
import com.google.cloud.aiplatform.v1.PredictRequest;
import com.google.cloud.aiplatform.v1.PredictResponse;
import com.google.cloud.aiplatform.v1.PredictionServiceClient;
import com.google.cloud.aiplatform.v1.PredictionServiceSettings;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.OptionalInt;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PredictTextEmbeddingsSample {
 public static void main(String[] args) throws IOException {
 // TODO(developer): Replace these variables before running the sample.
 // Details about text embedding request structure and supported models are available in:
 // https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings
 String endpoint = "us-central1-aiplatform.googleapis.com:443";
 String project = "YOUR_PROJECT_ID";
 String model = "text-embedding-005";
 predictTextEmbeddings(
 endpoint,
 project,
 model,
 List.of("banana bread?", "banana muffins?"),
 "QUESTION_ANSWERING",
 OptionalInt.of(256));
 }

 // Gets text embeddings from a pretrained, foundational model.
 public static List<List<Float>> predictTextEmbeddings(
 String endpoint,
 String project,
 String model,
 List<String> texts,
 String task,
 OptionalInt outputDimensionality)
 throws IOException {
 PredictionServiceSettings settings =
 PredictionServiceSettings.newBuilder().setEndpoint(endpoint).build();
 Matcher matcher = Pattern.compile("^(?<Location>\\w+-\\w+)").matcher(endpoint);
 String location = matcher.matches() ? matcher.group("Location") : "us-central1";
 EndpointName endpointName =
 EndpointName.ofProjectLocationPublisherModelName(project, location, "google", model);

 // You can use this prediction service client for multiple requests.
 try (PredictionServiceClient client = PredictionServiceClient.create(settings)) {
 PredictRequest.Builder request =
 PredictRequest.newBuilder().setEndpoint(endpointName.toString());
 if (outputDimensionality.isPresent()) {
 request.setParameters(
 Value.newBuilder()
 .setStructValue(
 Struct.newBuilder()
 .putFields("outputDimensionality", valueOf(outputDimensionality.getAsInt()))
 .build()));
 }
 for (int i = 0; i < texts.size(); i++) {
 request.addInstances(
 Value.newBuilder()
 .setStructValue(
 Struct.newBuilder()
 .putFields("content", valueOf(texts.get(i)))
 .putFields("task_type", valueOf(task))
 .build()));
 }
 PredictResponse response = client.predict(request.build());
 List<List<Float>> floats = new ArrayList<>();
 for (Value prediction : response.getPredictionsList()) {
 Value embeddings = prediction.getStructValue().getFieldsOrThrow("embeddings");
 Value values = embeddings.getStructValue().getFieldsOrThrow("values");
 floats.add(
 values.getListValue().getValuesList().stream()
 .map(Value::getNumberValue)
 .map(Double::floatValue)
 .collect(toList()));
 }
 return floats;
 }
 }

 private static Value valueOf(String s) {
 return Value.newBuilder().setStringValue(s).build();
 }

 private static Value valueOf(int n) {
 return Value.newBuilder().setNumberValue(n).build();
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

```python
async function main(
 project,
 model = 'text-embedding-005',
 texts = 'banana bread?;banana muffins?',
 task = 'QUESTION_ANSWERING',
 dimensionality = 0,
 apiEndpoint = 'us-central1-aiplatform.googleapis.com'
) {
 const aiplatform = require('@google-cloud/aiplatform');
 const {PredictionServiceClient} = aiplatform.v1;
 const {helpers} = aiplatform; // helps construct protobuf.Value objects.
 const clientOptions = {apiEndpoint: apiEndpoint};
 const location = 'us-central1';
 const endpoint = `projects/${project}/locations/${location}/publishers/google/models/${model}`;

 async function callPredict() {
 const instances = texts
 .split(';')
 .map(e => helpers.toValue({content: e, task_type: task}));
 const parameters = helpers.toValue(
 dimensionality > 0 ? {outputDimensionality: parseInt(dimensionality)} : {}
 );
 const request = {endpoint, instances, parameters};
 const client = new PredictionServiceClient(clientOptions);
 const [response] = await client.predict(request);
 const predictions = response.predictions;
 const embeddings = predictions.map(p => {
 const embeddingsProto = p.structValue.fields.embeddings;
 const valuesProto = embeddingsProto.structValue.fields.values;
 return valuesProto.listValue.values.map(v => v.numberValue);
 });
 console.log('Got embeddings: \n' + JSON.stringify(embeddings));
 }

 callPredict();
}
```

#### Advanced Use Case

The following example demonstrates some advanced features

- Use `task_type` and `title` to improve embedding quality.
- Use parameters to control the behavior of the API.

**Note:** Feature support varies by model version. For example, `task_type` and `title` fields are **not** supported by `textembedding-gecko@001`. For best results, choose the latest available version.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TEXT: The text that you want to generate embeddings
 for. **Limit:** five texts of up to 3,072 tokens per text.
- TASK\_TYPE: Used to convey the intended downstream
 application to help the model produce better embeddings.
- TITLE: Used to help the model produce better embeddings.
- AUTO\_TRUNCATE: If set to
 `false`, text that exceeds the token limit causes the request to fail. The default
 value is `true`.
- OUTPUT\_DIMENSIONALITY: Used to specify
 output embedding size. If set, output embeddings will be truncated to the size specified.

HTTP method and URL:

```python
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/textembedding-gecko@003:predict
```

Request JSON body:

```python
{
 "instances": [
 { "content": "TEXT",
 "task_type": "TASK_TYPE",
 "title": "TITLE"
 },
 ],
 "parameters": {
 "autoTruncate": AUTO_TRUNCATE,
 "outputDimensionality": OUTPUT_DIMENSIONALITY
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
 "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/textembedding-gecko@003:predict"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/textembedding-gecko@003:predict" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following. Note that `values`
has been truncated to save space.

#### Response

```python
{
 "predictions": [
 {
 "embeddings": {
 "statistics": {
 "truncated": false,
 "token_count": 6
 },
 "values": [ ... ]
 }
 }
 ]
}

```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import re

from google.cloud.aiplatform import initializer as aiplatform_init
from vertexai.language_models import TextEmbeddingModel

def tune_embedding_model(
 api_endpoint: str,
 base_model_name: str = "text-embedding-005",
 corpus_path: str = "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/corpus.jsonl",
 queries_path: str = "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/queries.jsonl",
 train_label_path: str = "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/train.tsv",
 test_label_path: str = "gs://cloud-samples-data/ai-platform/embedding/goog-10k-2024/r11/test.tsv",
): # noqa: ANN201
 """Tune an embedding model using the specified parameters.
 Args:
 api_endpoint (str): The API endpoint for the Vertex AI service.
 base_model_name (str): The name of the base model to use for tuning.
 corpus_path (str): GCS URI of the JSONL file containing the corpus data.
 queries_path (str): GCS URI of the JSONL file containing the queries data.
 train_label_path (str): GCS URI of the TSV file containing the training labels.
 test_label_path (str): GCS URI of the TSV file containing the test labels.
 """
 match = re.search(r"^(\w+-\w+)", api_endpoint)
 location = match.group(1) if match else "us-central1"
 base_model = TextEmbeddingModel.from_pretrained(base_model_name)
 tuning_job = base_model.tune_model(
 task_type="DEFAULT",
 corpus_data=corpus_path,
 queries_data=queries_path,
 training_data=train_label_path,
 test_data=test_label_path,
 batch_size=128, # The batch size to use for training.
 train_steps=1000, # The number of training steps.
 tuned_model_location=location,
 output_dimensionality=768, # The dimensionality of the output embeddings.
 learning_rate_multiplier=1.0, # The multiplier for the learning rate.
 )
 return tuning_job

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
 "fmt"
 "io"

 aiplatform "cloud.google.com/go/aiplatform/apiv1"
 "cloud.google.com/go/aiplatform/apiv1/aiplatformpb"

 "google.golang.org/api/option"
 "google.golang.org/protobuf/types/known/structpb"
)

// embedTexts shows how embeddings are set for text-embedding-005 model
func embedTexts(w io.Writer, project, location string) error {
 // location := "us-central1"
 ctx := context.Background()

 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 dimensionality := 5
 model := "text-embedding-005"
 texts := []string{"banana muffins? ", "banana bread? banana muffins?"}

 client, err := aiplatform.NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
 if err != nil {
 return err
 }
 defer client.Close()

 endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)
 instances := make([]*structpb.Value, len(texts))
 for i, text := range texts {
 instances[i] = structpb.NewStructValue(&structpb.Struct{
 Fields: map[string]*structpb.Value{
 "content": structpb.NewStringValue(text),
 "task_type": structpb.NewStringValue("QUESTION_ANSWERING"),
 },
 })
 }

 params := structpb.NewStructValue(&structpb.Struct{
 Fields: map[string]*structpb.Value{
 "outputDimensionality": structpb.NewNumberValue(float64(dimensionality)),
 },
 })

 req := &aiplatformpb.PredictRequest{
 Endpoint: endpoint,
 Instances: instances,
 Parameters: params,
 }
 resp, err := client.Predict(ctx, req)
 if err != nil {
 return err
 }
 embeddings := make([][]float32, len(resp.Predictions))
 for i, prediction := range resp.Predictions {
 values := prediction.GetStructValue().Fields["embeddings"].GetStructValue().Fields["values"].GetListValue().Values
 embeddings[i] = make([]float32, len(values))
 for j, value := range values {
 embeddings[i][j] = float32(value.GetNumberValue())
 }
 }

 fmt.Fprintf(w, "Dimensionality: %d. Embeddings length: %d", len(embeddings[0]), len(embeddings))
 return nil
}

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
import static java.util.stream.Collectors.toList;

import com.google.cloud.aiplatform.v1.EndpointName;
import com.google.cloud.aiplatform.v1.PredictRequest;
import com.google.cloud.aiplatform.v1.PredictResponse;
import com.google.cloud.aiplatform.v1.PredictionServiceClient;
import com.google.cloud.aiplatform.v1.PredictionServiceSettings;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.OptionalInt;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PredictTextEmbeddingsSample {
 public static void main(String[] args) throws IOException {
 // TODO(developer): Replace these variables before running the sample.
 // Details about text embedding request structure and supported models are available in:
 // https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings
 String endpoint = "us-central1-aiplatform.googleapis.com:443";
 String project = "YOUR_PROJECT_ID";
 String model = "text-embedding-005";
 predictTextEmbeddings(
 endpoint,
 project,
 model,
 List.of("banana bread?", "banana muffins?"),
 "QUESTION_ANSWERING",
 OptionalInt.of(256));
 }

 // Gets text embeddings from a pretrained, foundational model.
 public static List<List<Float>> predictTextEmbeddings(
 String endpoint,
 String project,
 String model,
 List<String> texts,
 String task,
 OptionalInt outputDimensionality)
 throws IOException {
 PredictionServiceSettings settings =
 PredictionServiceSettings.newBuilder().setEndpoint(endpoint).build();
 Matcher matcher = Pattern.compile("^(?<Location>\\w+-\\w+)").matcher(endpoint);
 String location = matcher.matches() ? matcher.group("Location") : "us-central1";
 EndpointName endpointName =
 EndpointName.ofProjectLocationPublisherModelName(project, location, "google", model);

 // You can use this prediction service client for multiple requests.
 try (PredictionServiceClient client = PredictionServiceClient.create(settings)) {
 PredictRequest.Builder request =
 PredictRequest.newBuilder().setEndpoint(endpointName.toString());
 if (outputDimensionality.isPresent()) {
 request.setParameters(
 Value.newBuilder()
 .setStructValue(
 Struct.newBuilder()
 .putFields("outputDimensionality", valueOf(outputDimensionality.getAsInt()))
 .build()));
 }
 for (int i = 0; i < texts.size(); i++) {
 request.addInstances(
 Value.newBuilder()
 .setStructValue(
 Struct.newBuilder()
 .putFields("content", valueOf(texts.get(i)))
 .putFields("task_type", valueOf(task))
 .build()));
 }
 PredictResponse response = client.predict(request.build());
 List<List<Float>> floats = new ArrayList<>();
 for (Value prediction : response.getPredictionsList()) {
 Value embeddings = prediction.getStructValue().getFieldsOrThrow("embeddings");
 Value values = embeddings.getStructValue().getFieldsOrThrow("values");
 floats.add(
 values.getListValue().getValuesList().stream()
 .map(Value::getNumberValue)
 .map(Double::floatValue)
 .collect(toList()));
 }
 return floats;
 }
 }

 private static Value valueOf(String s) {
 return Value.newBuilder().setStringValue(s).build();
 }

 private static Value valueOf(int n) {
 return Value.newBuilder().setNumberValue(n).build();
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

```python
async function main(
 project,
 model = 'text-embedding-005',
 texts = 'banana bread?;banana muffins?',
 task = 'QUESTION_ANSWERING',
 dimensionality = 0,
 apiEndpoint = 'us-central1-aiplatform.googleapis.com'
) {
 const aiplatform = require('@google-cloud/aiplatform');
 const {PredictionServiceClient} = aiplatform.v1;
 const {helpers} = aiplatform; // helps construct protobuf.Value objects.
 const clientOptions = {apiEndpoint: apiEndpoint};
 const location = 'us-central1';
 const endpoint = `projects/${project}/locations/${location}/publishers/google/models/${model}`;

 async function callPredict() {
 const instances = texts
 .split(';')
 .map(e => helpers.toValue({content: e, task_type: task}));
 const parameters = helpers.toValue(
 dimensionality > 0 ? {outputDimensionality: parseInt(dimensionality)} : {}
 );
 const request = {endpoint, instances, parameters};
 const client = new PredictionServiceClient(clientOptions);
 const [response] = await client.predict(request);
 const predictions = response.predictions;
 const embeddings = predictions.map(p => {
 const embeddingsProto = p.structValue.fields.embeddings;
 const valuesProto = embeddingsProto.structValue.fields.values;
 return valuesProto.listValue.values.map(v => v.numberValue);
 });
 console.log('Got embeddings: \n' + JSON.stringify(embeddings));
 }

 callPredict();
}
```

## Supported text languages

All text embedding models support and have been evaluated on English-language
text. The `textembedding-gecko-multilingual@001` and
`text-multilingual-embedding-002` models additionally support and have been
evaluated on the following languages:

- **Evaluated languages:** `Arabic (ar)`, `Bengali (bn)`, `English (en)`,
 `Spanish (es)`, `German (de)`, `Persian (fa)`, `Finnish (fi)`, `French (fr)`,
 `Hindi (hi)`, `Indonesian (id)`, `Japanese (ja)`, `Korean (ko)`,
 `Russian (ru)`, `Swahili (sw)`, `Telugu (te)`, `Thai (th)`, `Yoruba (yo)`,
 `Chinese (zh)`
- **Supported languages**: `Afrikaans`, `Albanian`, `Amharic`, `Arabic`,
 `Armenian`, `Azerbaijani`, `Basque`, `Belarusiasn`, `Bengali`, `Bulgarian`,
 `Burmese`, `Catalan`, `Cebuano`, `Chichewa`, `Chinese`, `Corsican`, `Czech`,
 `Danish`, `Dutch`, `English`, `Esperanto`, `Estonian`, `Filipino`, `Finnish`,
 `French`, `Galician`, `Georgian`, `German`, `Greek`, `Gujarati`,
 `Haitian Creole`, `Hausa`, `Hawaiian`, `Hebrew`, `Hindi`, `Hmong`,
 `Hungarian`, `Icelandic`, `Igbo`, `Indonesian`, `Irish`, `Italian`,
 `Japanese`, `Javanese`, `Kannada`, `Kazakh`, `Khmer`, `Korean`, `Kurdish`,
 `Kyrgyz`, `Lao`, `Latin`, `Latvian`, `Lithuanian`, `Luxembourgish`,
 `Macedonian`, `Malagasy`, `Malay`, `Malayalam`, `Maltese`, `Maori`, `Marathi`,
 `Mongolian`, `Nepali`, `Norwegian`, `Pashto`, `Persian`, `Polish`,
 `Portuguese`, `Punjabi`, `Romanian`, `Russian`, `Samoan`, `Scottish Gaelic`,
 `Serbian`, `Shona`, `Sindhi`, `Sinhala`, `Slovak`, `Slovenian`, `Somali`,
 `Sotho`, `Spanish`, `Sundanese`, `Swahili`, `Swedish`, `Tajik`, `Tamil`,
 `Telugu`, `Thai`, `Turkish`, `Ukrainian`, `Urdu`, `Uzbek`, `Vietnamese`,
 `Welsh`, `West Frisian`, `Xhosa`, `Yiddish`, `Yoruba`, `Zulu`.

## Model versions

To use a current stable model, specify the model version number, for example
`text-embedding-005`. Specifying a model without a version number,
such as `textembedding-gecko`, isn't recommended, as it is merely a legacy
pointer to another model and isn't stable.

For more information, see [Model versions and lifecycle](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versioning).

## What's next

For detailed documentation, see the following:

- [Text Embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings)