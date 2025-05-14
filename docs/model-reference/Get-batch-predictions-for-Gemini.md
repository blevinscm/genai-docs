---
date_scraped: 2025-05-12
title: Get Batch Predictions For Gemini
---

# Get batch predictions for Gemini 

Batch predictions let you send a large number of multimodal prompts in
a single batch request.

For more information about the batch workflow and how to format your input
data, see
[Get batch predictions for Gemini](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/batch-prediction-gemini).

## Supported models

- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)
- [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite)

## Example syntax

The following example shows how to send a batch prediction API request using the
`curl` command. This example is specific to BigQuery storage.

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/batchPredictionJobs \
 -d '{
 "displayName": "...",
 "model": "publishers/google/models/${MODEL_ID}",
 "inputConfig": {
 "instancesFormat": "bigquery",
 "bigquerySource": {
 "inputUri" : "..."
 }
 },
 "outputConfig": {
 "predictionsFormat": "bigquery",
 "bigqueryDestination": {
 "outputUri": "..."
 }
 }
 }'
```

## Parameters

See [examples](#examples) for implementation details.

### Body request

| Parameters | |
| --- | --- |
| `displayName` | A name you choose for your job. |
| `model` | The model to use for batch prediction. |
| `inputConfig` | The data format. For Gemini batch prediction, Cloud Storage and BigQuery input sources are supported. |
| `outputConfig` | The output configuration which determines model output location. Cloud Storage and BigQuery output locations are supported. |

### `inputConfig`

| Parameters | |
| --- | --- |
| `instancesFormat` | The prompt input format. Use `jsonl` for Cloud Storage or `bigquery` for BigQuery. |
| `gcsSource.uris` | The input source URI. This is a Cloud Storage location of the JSONL file in the form `gs://bucketname/path/to/file.jsonl`. |
| `bigquerySource.inputUri` | The input source URI. This is a BigQuery table URI in the form `bq://project_id.dataset.table`. The region of the input BigQuery dataset must be the same as the Vertex AI batch prediction job. |

### `outputConfig`

| Parameters | |
| --- | --- |
| `predictionsFormat` | The output format of the prediction. Use `bigquery`. |
| `gcsDestination.outputUriPrefix` | The Cloud Storage bucket and directory location, in the form `gs://mybucket/path/to/output`. |
| `bigqueryDestination.outputUri` | The BigQuery URI of the target output table, in the form `bq://project_id.dataset.table`. If the table doesn't already exist, then it is created for you. The region of the output BigQuery dataset must be the same as the Vertex AI batch prediction job. |

## Examples

### Request a batch response

Batch requests for multimodal models accept Cloud Storage storage and BigQuery storage
sources. To learn more, see the following:

- [Batch request input format details](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/batch-prediction-gemini#prepare_your_inputs)

Depending on the number of input items that you submitted, a
batch generation task can take some time to complete.

### REST

To create a batch prediction job, use the
[`projects.locations.batchPredictionJobs.create`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.batchPredictionJobs/create) method.

### Cloud Storage input

Before using any of the request data,
make the following replacements:

- LOCATION: A region that supports
 Gemini models.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- INPUT\_URI: The
 Cloud Storage location of your JSONL batch prediction input such as
 `gs://bucketname/path/to/file.jsonl`.
- OUTPUT\_FORMAT: To output to
 a BigQuery table, specify `bigquery`. To output to
 a Cloud Storage bucket, specify `jsonl`.
- DESTINATION: For
 BigQuery, specify `bigqueryDestination`. For
 Cloud Storage, specify `gcsDestination`.
- OUTPUT\_URI\_FIELD\_NAME:
 For BigQuery, specify `outputUri`. For
 Cloud Storage, specify `outputUriPrefix`.
- OUTPUT\_URI: For
 BigQuery, specify the table location such as
 `bq://myproject.mydataset.output_result`. The region of the output
 BigQuery dataset must be the same as the Vertex AI batch
 prediction job.
 For Cloud Storage, specify the bucket and directory location such as
 `gs://mybucket/path/to/output`.

Request JSON body:

```python
{
 "displayName": "my-cloud-storage-batch-prediction-job",
 "model": "publishers/google/models/gemini-2.0-flash-001",
 "inputConfig": {
 "instancesFormat": "jsonl",
 "gcsSource": {
 "uris" : "INPUT_URI"
 }
 },
 "outputConfig": {
 "predictionsFormat": "OUTPUT_FORMAT",
 "DESTINATION": {
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "name": "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
 "displayName": "my-cloud-storage-batch-prediction-job",
 "model": "publishers/google/models/gemini-2.0-flash-001",
 "inputConfig": {
 "instancesFormat": "jsonl",
 "gcsSource": {
 "uris": [
 "INPUT_URI"
 ]
 }
 },
 "outputConfig": {
 "predictionsFormat": "OUTPUT_FORMAT",
 "DESTINATION": {
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
 }
 },
 "state": "JOB_STATE_PENDING",
 "createTime": "2024-10-16T19:33:59.153782Z", 
 "updateTime": "2024-10-16T19:33:59.153782Z", 
 "modelVersionId": "1"
}

```

### BigQuery input

Before using any of the request data,
make the following replacements:

- LOCATION: A region that supports
 Gemini models.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- INPUT\_URI: The
 BigQuery table where your batch prediction input is located
 such as `bq://myproject.mydataset.input_table`. Multi-region datasets are not
 supported.
- OUTPUT\_FORMAT: To output to
 a BigQuery table, specify `bigquery`. To output to
 a Cloud Storage bucket, specify `jsonl`.
- DESTINATION: For
 BigQuery, specify `bigqueryDestination`. For
 Cloud Storage, specify `gcsDestination`.
- OUTPUT\_URI\_FIELD\_NAME:
 For BigQuery, specify `outputUri`. For
 Cloud Storage, specify `outputUriPrefix`.
- OUTPUT\_URI: For
 BigQuery, specify the table location such as
 `bq://myproject.mydataset.output_result`. The region of the output
 BigQuery dataset must be the same as the Vertex AI batch
 prediction job.
 For Cloud Storage, specify the bucket and directory location such as
 `gs://mybucket/path/to/output`.

Request JSON body:

```python
{
 "displayName": "my-bigquery-batch-prediction-job",
 "model": "publishers/google/models/gemini-2.0-flash-001",
 "inputConfig": {
 "instancesFormat": "bigquery",
 "bigquerySource":{
 "inputUri" : "INPUT_URI"
 }
 },
 "outputConfig": {
 "predictionsFormat": "OUTPUT_FORMAT",
 "DESTINATION": {
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "name": "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
 "displayName": "my-bigquery-batch-prediction-job",
 "model": "publishers/google/models/gemini-2.0-flash-001",
 "inputConfig": {
 "instancesFormat": "bigquery",
 "bigquerySource": {
 "inputUri" : "INPUT_URI"
 }
 },
 "outputConfig": {
 "predictionsFormat": "OUTPUT_FORMAT",
 "DESTINATION": {
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
 }
 },
 "state": "JOB_STATE_PENDING",
 "createTime": "2024-10-16T19:33:59.153782Z",
 "updateTime": "2024-10-16T19:33:59.153782Z",
 "modelVersionId": "1"
}

```

The response includes a unique identifier for the batch job.
You can poll for the status of the batch job using
the BATCH\_JOB\_ID until the job `state` is
`JOB_STATE_SUCCEEDED`. For example:

```python
curl -X GET \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs/BATCH_JOB_ID

```

**Note:** The upper limit for concurrent batch jobs is
[eight per region](../quotas.md).
Custom service accounts and CMEK aren't supported.

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

### Cloud Storage input

```python
import time

from google import genai
from google.genai.types import CreateBatchJobConfig, JobState, HttpOptions

client = genai.Client(http_options=HttpOptions(api_version="v1"))
# TODO(developer): Update and un-comment below line
# output_uri = "gs://your-bucket/your-prefix"

# See the documentation: https://googleapis.github.io/python-genai/genai.html#genai.batches.Batches.create
job = client.batches.create(
 model="gemini-2.0-flash-001",
 # Source link: https://storage.cloud.google.com/cloud-samples-data/batch/prompt_for_batch_gemini_predict.jsonl
 src="gs://cloud-samples-data/batch/prompt_for_batch_gemini_predict.jsonl",
 config=CreateBatchJobConfig(dest=output_uri),
)
print(f"Job name: {job.name}")
print(f"Job state: {job.state}")
# Example response:
# Job name: projects/%PROJECT_ID%/locations/us-central1/batchPredictionJobs/9876453210000000000
# Job state: JOB_STATE_PENDING

# See the documentation: https://googleapis.github.io/python-genai/genai.html#genai.types.BatchJob
completed_states = {
 JobState.JOB_STATE_SUCCEEDED,
 JobState.JOB_STATE_FAILED,
 JobState.JOB_STATE_CANCELLED,
 JobState.JOB_STATE_PAUSED,
}

while job.state not in completed_states:
 time.sleep(30)
 job = client.batches.get(name=job.name)
 print(f"Job state: {job.state}")
# Example response:
# Job state: JOB_STATE_PENDING
# Job state: JOB_STATE_RUNNING
# Job state: JOB_STATE_RUNNING
# ...
# Job state: JOB_STATE_SUCCEEDED
```

### BigQuery input

```python
import time

from google import genai
from google.genai.types import CreateBatchJobConfig, JobState, HttpOptions

client = genai.Client(http_options=HttpOptions(api_version="v1"))

# TODO(developer): Update and un-comment below line
# output_uri = f"bq://your-project.your_dataset.your_table"

job = client.batches.create(
 model="gemini-2.0-flash-001",
 src="bq://storage-samples.generative_ai.batch_requests_for_multimodal_input",
 config=CreateBatchJobConfig(dest=output_uri),
)
print(f"Job name: {job.name}")
print(f"Job state: {job.state}")
# Example response:
# Job name: projects/%PROJECT_ID%/locations/us-central1/batchPredictionJobs/9876453210000000000
# Job state: JOB_STATE_PENDING

# See the documentation: https://googleapis.github.io/python-genai/genai.html#genai.types.BatchJob
completed_states = {
 JobState.JOB_STATE_SUCCEEDED,
 JobState.JOB_STATE_FAILED,
 JobState.JOB_STATE_CANCELLED,
 JobState.JOB_STATE_PAUSED,
}

while job.state not in completed_states:
 time.sleep(30)
 job = client.batches.get(name=job.name)
 print(f"Job state: {job.state}")
# Example response:
# Job state: JOB_STATE_PENDING
# Job state: JOB_STATE_RUNNING
# Job state: JOB_STATE_RUNNING
# ...
# Job state: JOB_STATE_SUCCEEDED
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

### Cloud Storage input

```python
// Import the aiplatform library
const aiplatformLib = require('@google-cloud/aiplatform');
const aiplatform = aiplatformLib.protos.google.cloud.aiplatform.v1;

/**
 * TODO(developer): Uncomment/update these variables before running the sample.
 */
// projectId = 'YOUR_PROJECT_ID';
// URI of the output folder in Google Cloud Storage.
// E.g. "gs://[BUCKET]/[OUTPUT]"
// outputUri = 'gs://my-bucket';

// URI of the input file in Google Cloud Storage.
// E.g. "gs://[BUCKET]/[DATASET].jsonl"
// Or try:
// "gs://cloud-samples-data/generative-ai/batch/gemini_multimodal_batch_predict.jsonl"
// for a batch prediction that uses audio, video, and an image.
const inputUri =
 'gs://cloud-samples-data/generative-ai/batch/batch_requests_for_multimodal_input.jsonl';
const location = 'us-central1';
const parent = `projects/${projectId}/locations/${location}`;
const modelName = `${parent}/publishers/google/models/gemini-2.0-flash-001`;

// Specify the location of the api endpoint.
const clientOptions = {
 apiEndpoint: `${location}-aiplatform.googleapis.com`,
};

// Instantiate the client.
const jobServiceClient = new aiplatformLib.JobServiceClient(clientOptions);

// Create a Gemini batch prediction job using Google Cloud Storage input and output buckets.
async function create_batch_prediction_gemini_gcs() {
 const gcsSource = new aiplatform.GcsSource({
 uris: [inputUri],
 });

 const inputConfig = new aiplatform.BatchPredictionJob.InputConfig({
 gcsSource: gcsSource,
 instancesFormat: 'jsonl',
 });

 const gcsDestination = new aiplatform.GcsDestination({
 outputUriPrefix: outputUri,
 });

 const outputConfig = new aiplatform.BatchPredictionJob.OutputConfig({
 gcsDestination: gcsDestination,
 predictionsFormat: 'jsonl',
 });

 const batchPredictionJob = new aiplatform.BatchPredictionJob({
 displayName: 'Batch predict with Gemini - GCS',
 model: modelName,
 inputConfig: inputConfig,
 outputConfig: outputConfig,
 });

 const request = {
 parent: parent,
 batchPredictionJob,
 };

 // Create batch prediction job request
 const [response] = await jobServiceClient.createBatchPredictionJob(request);
 console.log('Response name: ', response.name);
 // Example response:
 // Response name: projects/<project>/locations/us-central1/batchPredictionJobs/<job-id>
}

await create_batch_prediction_gemini_gcs();
```

### BigQuery input

```python
// Import the aiplatform library
const aiplatformLib = require('@google-cloud/aiplatform');
const aiplatform = aiplatformLib.protos.google.cloud.aiplatform.v1;

/**
 * TODO(developer): Uncomment/update these variables before running the sample.
 */
// projectId = 'YOUR_PROJECT_ID';
// URI of the output BigQuery table.
// E.g. "bq://[PROJECT].[DATASET].[TABLE]"
// outputUri = 'bq://projectid.dataset.table';

// URI of the multimodal input BigQuery table.
// E.g. "bq://[PROJECT].[DATASET].[TABLE]"
const inputUri =
 'bq://storage-samples.generative_ai.batch_requests_for_multimodal_input';
const location = 'us-central1';
const parent = `projects/${projectId}/locations/${location}`;
const modelName = `${parent}/publishers/google/models/gemini-2.0-flash-001`;

// Specify the location of the api endpoint.
const clientOptions = {
 apiEndpoint: `${location}-aiplatform.googleapis.com`,
};

// Instantiate the client.
const jobServiceClient = new aiplatformLib.JobServiceClient(clientOptions);

// Create a Gemini batch prediction job using BigQuery input and output datasets.
async function create_batch_prediction_gemini_bq() {
 const bqSource = new aiplatform.BigQuerySource({
 inputUri: inputUri,
 });

 const inputConfig = new aiplatform.BatchPredictionJob.InputConfig({
 bigquerySource: bqSource,
 instancesFormat: 'bigquery',
 });

 const bqDestination = new aiplatform.BigQueryDestination({
 outputUri: outputUri,
 });

 const outputConfig = new aiplatform.BatchPredictionJob.OutputConfig({
 bigqueryDestination: bqDestination,
 predictionsFormat: 'bigquery',
 });

 const batchPredictionJob = new aiplatform.BatchPredictionJob({
 displayName: 'Batch predict with Gemini - BigQuery',
 model: modelName, // Add model parameters per request in the input BigQuery table.
 inputConfig: inputConfig,
 outputConfig: outputConfig,
 });

 const request = {
 parent: parent,
 batchPredictionJob,
 };

 // Create batch prediction job request
 const [response] = await jobServiceClient.createBatchPredictionJob(request);
 console.log('Response name: ', response.name);
 // Example response:
 // Response name: projects/<project>/locations/us-central1/batchPredictionJobs/<job-id>
}

await create_batch_prediction_gemini_bq();
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

### Cloud Storage input

```python
import com.google.cloud.aiplatform.v1.BatchPredictionJob;
import com.google.cloud.aiplatform.v1.GcsDestination;
import com.google.cloud.aiplatform.v1.GcsSource;
import com.google.cloud.aiplatform.v1.JobServiceClient;
import com.google.cloud.aiplatform.v1.JobServiceSettings;
import com.google.cloud.aiplatform.v1.LocationName;
import java.io.IOException;

public class CreateBatchPredictionGeminiJobSample {

 public static void main(String[] args) throws IOException {
 // TODO(developer): Update these variables before running the sample.
 String project = "PROJECT_ID";
 String gcsDestinationOutputUriPrefix = "gs://MY_BUCKET/";

 createBatchPredictionGeminiJobSample(project, gcsDestinationOutputUriPrefix);
 }

 // Create a batch prediction job using a JSONL input file and output URI, both in Cloud
 // Storage.
 public static BatchPredictionJob createBatchPredictionGeminiJobSample(
 String project, String gcsDestinationOutputUriPrefix) throws IOException {
 String location = "us-central1";
 JobServiceSettings settings =
 JobServiceSettings.newBuilder()
 .setEndpoint(String.format("%s-aiplatform.googleapis.com:443", location))
 .build();

 // Initialize client that will be used to send requests. This client only needs to be created
 // once, and can be reused for multiple requests.
 try (JobServiceClient client = JobServiceClient.create(settings)) {
 GcsSource gcsSource =
 GcsSource.newBuilder()
 .addUris(
 "gs://cloud-samples-data/generative-ai/batch/"
 + "batch_requests_for_multimodal_input.jsonl")
 // Or try
 // "gs://cloud-samples-data/generative-ai/batch/gemini_multimodal_batch_predict.jsonl"
 // for a batch prediction that uses audio, video, and an image.
 .build();
 BatchPredictionJob.InputConfig inputConfig =
 BatchPredictionJob.InputConfig.newBuilder()
 .setInstancesFormat("jsonl")
 .setGcsSource(gcsSource)
 .build();
 GcsDestination gcsDestination =
 GcsDestination.newBuilder().setOutputUriPrefix(gcsDestinationOutputUriPrefix).build();
 BatchPredictionJob.OutputConfig outputConfig =
 BatchPredictionJob.OutputConfig.newBuilder()
 .setPredictionsFormat("jsonl")
 .setGcsDestination(gcsDestination)
 .build();
 String modelName =
 String.format(
 "projects/%s/locations/%s/publishers/google/models/%s",
 project, location, "gemini-2.0-flash-001");

 BatchPredictionJob batchPredictionJob =
 BatchPredictionJob.newBuilder()
 .setDisplayName("my-display-name")
 .setModel(modelName) // Add model parameters per request in the input jsonl file.
 .setInputConfig(inputConfig)
 .setOutputConfig(outputConfig)
 .build();

 LocationName parent = LocationName.of(project, location);
 BatchPredictionJob response = client.createBatchPredictionJob(parent, batchPredictionJob);
 System.out.format("\tName: %s\n", response.getName());
 // Example response:
 // Name: projects/<project>/locations/us-central1/batchPredictionJobs/<job-id>
 return response;
 }
 }
}

```

### BigQuery input

```python
import com.google.cloud.aiplatform.v1.BatchPredictionJob;
import com.google.cloud.aiplatform.v1.BigQueryDestination;
import com.google.cloud.aiplatform.v1.BigQuerySource;
import com.google.cloud.aiplatform.v1.JobServiceClient;
import com.google.cloud.aiplatform.v1.JobServiceSettings;
import com.google.cloud.aiplatform.v1.LocationName;
import java.io.IOException;

public class CreateBatchPredictionGeminiBigqueryJobSample {

 public static void main(String[] args) throws IOException {
 // TODO(developer): Update these variables before running the sample.
 String project = "PROJECT_ID";
 String bigqueryDestinationOutputUri = "bq://PROJECT_ID.MY_DATASET.MY_TABLE";

 createBatchPredictionGeminiBigqueryJobSample(project, bigqueryDestinationOutputUri);
 }

 // Create a batch prediction job using BigQuery input and output datasets.
 public static BatchPredictionJob createBatchPredictionGeminiBigqueryJobSample(
 String project, String bigqueryDestinationOutputUri) throws IOException {
 String location = "us-central1";
 JobServiceSettings settings =
 JobServiceSettings.newBuilder()
 .setEndpoint(String.format("%s-aiplatform.googleapis.com:443", location))
 .build();

 // Initialize client that will be used to send requests. This client only needs to be created
 // once, and can be reused for multiple requests.
 try (JobServiceClient client = JobServiceClient.create(settings)) {
 BigQuerySource bigquerySource =
 BigQuerySource.newBuilder()
 .setInputUri("bq://storage-samples.generative_ai.batch_requests_for_multimodal_input")
 .build();
 BatchPredictionJob.InputConfig inputConfig =
 BatchPredictionJob.InputConfig.newBuilder()
 .setInstancesFormat("bigquery")
 .setBigquerySource(bigquerySource)
 .build();
 BigQueryDestination bigqueryDestination =
 BigQueryDestination.newBuilder().setOutputUri(bigqueryDestinationOutputUri).build();
 BatchPredictionJob.OutputConfig outputConfig =
 BatchPredictionJob.OutputConfig.newBuilder()
 .setPredictionsFormat("bigquery")
 .setBigqueryDestination(bigqueryDestination)
 .build();
 String modelName =
 String.format(
 "projects/%s/locations/%s/publishers/google/models/%s",
 project, location, "gemini-2.0-flash-001");

 BatchPredictionJob batchPredictionJob =
 BatchPredictionJob.newBuilder()
 .setDisplayName("my-display-name")
 .setModel(modelName) // Add model parameters per request in the input BigQuery table.
 .setInputConfig(inputConfig)
 .setOutputConfig(outputConfig)
 .build();

 LocationName parent = LocationName.of(project, location);
 BatchPredictionJob response = client.createBatchPredictionJob(parent, batchPredictionJob);
 System.out.format("\tName: %s\n", response.getName());
 // Example response:
 // Name: projects/<project>/locations/us-central1/batchPredictionJobs/<job-id>
 return response;
 }
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

### Cloud Storage input

```python
import (
 "context"
 "fmt"
 "io"
 "time"

 aiplatform "cloud.google.com/go/aiplatform/apiv1"
 aiplatformpb "cloud.google.com/go/aiplatform/apiv1/aiplatformpb"

 "google.golang.org/api/option"
 "google.golang.org/protobuf/types/known/structpb"
)

// batchPredictGCS submits a batch prediction job using GCS data source as its input
func batchPredictGCS(w io.Writer, projectID, location string, inputURIs []string, outputURI string) error {
 // location := "us-central1"
 // inputURIs := []string{"gs://cloud-samples-data/batch/prompt_for_batch_gemini_predict.jsonl"}
 // outputURI := "gs://<cloud-bucket-name>/<prefix-name>"
 modelName := "gemini-2.0-flash-001"
 jobName := "batch-predict-gcs-test-001"

 ctx := context.Background()
 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 client, err := aiplatform.NewJobClient(ctx, option.WithEndpoint(apiEndpoint))
 if err != nil {
 return fmt.Errorf("unable to create aiplatform client: %w", err)
 }
 defer client.Close()

 modelParameters, err := structpb.NewValue(map[string]interface{}{
 "temperature": 0.2,
 "maxOutputTokens": 200,
 })
 if err != nil {
 return fmt.Errorf("unable to convert model parameters to protobuf value: %w", err)
 }

 req := &aiplatformpb.CreateBatchPredictionJobRequest{
 Parent: fmt.Sprintf("projects/%s/locations/%s", projectID, location),
 BatchPredictionJob: &aiplatformpb.BatchPredictionJob{
 DisplayName: jobName,
 Model: fmt.Sprintf("publishers/google/models/%s", modelName),
 ModelParameters: modelParameters,
 // Check the API reference for `BatchPredictionJob` for supported input and output formats:
 // https://cloud.google.com/vertex-ai/docs/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.BatchPredictionJob
 InputConfig: &aiplatformpb.BatchPredictionJob_InputConfig{
 Source: &aiplatformpb.BatchPredictionJob_InputConfig_GcsSource{
 GcsSource: &aiplatformpb.GcsSource{
 Uris: inputURIs,
 },
 },
 InstancesFormat: "jsonl",
 },
 OutputConfig: &aiplatformpb.BatchPredictionJob_OutputConfig{
 Destination: &aiplatformpb.BatchPredictionJob_OutputConfig_GcsDestination{
 GcsDestination: &aiplatformpb.GcsDestination{
 OutputUriPrefix: outputURI,
 },
 },
 PredictionsFormat: "jsonl",
 },
 },
 }

 job, err := client.CreateBatchPredictionJob(ctx, req)
 if err != nil {
 return err
 }
 fullJobId := job.GetName()
 fmt.Fprintf(w, "submitted batch predict job for model %q\n", job.GetModel())
 fmt.Fprintf(w, "job id: %q\n", fullJobId)
 fmt.Fprintf(w, "job state: %s\n", job.GetState())
 // Example response:
 // submitted batch predict job for model "publishers/google/models/gemini-2.0-flash-001"
 // job id: "projects/.../locations/.../batchPredictionJobs/1234567890000000000"
 // job state: JOB_STATE_PENDING

 for {
 time.Sleep(5 * time.Second)

 job, err := client.GetBatchPredictionJob(ctx, &aiplatformpb.GetBatchPredictionJobRequest{
 Name: fullJobId,
 })
 if err != nil {
 return fmt.Errorf("error: couldn't get updated job state: %w", err)
 }

 if job.GetEndTime() != nil {
 fmt.Fprintf(w, "batch predict job finished with state %s\n", job.GetState())
 break
 } else {
 fmt.Fprintf(w, "batch predict job is running... job state is %s\n", job.GetState())
 }
 }

 return nil
}

```

### BigQuery input

```python
import (
 "context"
 "fmt"
 "io"
 "time"

 aiplatform "cloud.google.com/go/aiplatform/apiv1"
 aiplatformpb "cloud.google.com/go/aiplatform/apiv1/aiplatformpb"

 "google.golang.org/api/option"
 "google.golang.org/protobuf/types/known/structpb"
)

// batchPredictBQ submits a batch prediction job using BigQuery data source as its input
func batchPredictBQ(w io.Writer, projectID, location string, inputURI string, outputURI string) error {
 // location := "us-central1"
 // inputURI := "bq://storage-samples.generative_ai.batch_requests_for_multimodal_input"
 // outputURI := "bq://<cloud-project-name>.<dataset-name>.<table-name>"
 modelName := "gemini-2.0-flash-001"
 jobName := "batch-predict-bq-test-001"

 ctx := context.Background()
 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 client, err := aiplatform.NewJobClient(ctx, option.WithEndpoint(apiEndpoint))
 if err != nil {
 return fmt.Errorf("unable to create aiplatform client: %w", err)
 }
 defer client.Close()

 modelParameters, err := structpb.NewValue(map[string]interface{}{
 "temperature": 0.2,
 "maxOutputTokens": 200,
 })
 if err != nil {
 return fmt.Errorf("unable to convert model parameters to protobuf value: %w", err)
 }

 req := &aiplatformpb.CreateBatchPredictionJobRequest{
 Parent: fmt.Sprintf("projects/%s/locations/%s", projectID, location),
 BatchPredictionJob: &aiplatformpb.BatchPredictionJob{
 DisplayName: jobName,
 Model: fmt.Sprintf("publishers/google/models/%s", modelName),
 ModelParameters: modelParameters,
 // Check the API reference for `BatchPredictionJob` for supported input and output formats:
 // https://cloud.google.com/vertex-ai/docs/reference/rpc/google.cloud.aiplatform.v1#google.cloud.aiplatform.v1.BatchPredictionJob
 InputConfig: &aiplatformpb.BatchPredictionJob_InputConfig{
 Source: &aiplatformpb.BatchPredictionJob_InputConfig_BigquerySource{
 BigquerySource: &aiplatformpb.BigQuerySource{
 InputUri: inputURI,
 },
 },
 InstancesFormat: "bigquery",
 },

 OutputConfig: &aiplatformpb.BatchPredictionJob_OutputConfig{
 Destination: &aiplatformpb.BatchPredictionJob_OutputConfig_BigqueryDestination{
 BigqueryDestination: &aiplatformpb.BigQueryDestination{
 OutputUri: outputURI,
 },
 },
 PredictionsFormat: "bigquery",
 },
 },
 }

 job, err := client.CreateBatchPredictionJob(ctx, req)
 if err != nil {
 return err
 }
 fullJobId := job.GetName()
 fmt.Fprintf(w, "submitted batch predict job for model %q\n", job.GetModel())
 fmt.Fprintf(w, "job id: %q\n", fullJobId)
 fmt.Fprintf(w, "job state: %s\n", job.GetState())
 // Example response:
 // submitted batch predict job for model "publishers/google/models/gemini-2.0-flash-001"
 // job id: "projects/.../locations/.../batchPredictionJobs/1234567890000000000"
 // job state: JOB_STATE_PENDING

 for {
 time.Sleep(5 * time.Second)

 job, err := client.GetBatchPredictionJob(ctx, &aiplatformpb.GetBatchPredictionJobRequest{
 Name: fullJobId,
 })
 if err != nil {
 return fmt.Errorf("error: couldn't get updated job state: %w", err)
 }

 if job.GetEndTime() != nil {
 fmt.Fprintf(w, "batch predict job finished with state %s\n", job.GetState())
 break
 } else {
 fmt.Fprintf(w, "batch predict job is running... job state is %s\n", job.GetState())
 }
 }

 return nil
}

```

## Retrieve batch output

When a batch prediction task completes, the output is stored in the
Cloud Storage bucket or the BigQuery table that you specified
in your request.

## What's next

- Learn how to tune a Gemini model in
 [Overview of model tuning for Gemini](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-gemini-overview).
- Learn more about how to
 [Get batch predictions for Gemini](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/batch-prediction-gemini).