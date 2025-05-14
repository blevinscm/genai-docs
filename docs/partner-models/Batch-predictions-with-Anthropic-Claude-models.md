---
date_scraped: 2025-05-12
title: Batch Predictions With Anthropic Claude Models
---

# Batch predictions with Anthropic Claude models 

Batch predictions lets you send multiple prompts that
aren't latency sensitive to an [Anthropic Claude model](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude). Compared to
online predictions, where you send one input prompt for each request, you can
batch a large number of input prompts in a single request.

## Supported Anthropic Claude models

Vertex AI supports batch predictions for the following Anthropic Claude
models:

- Claude 3.7 Sonnet (`claude-3-7-sonnet@20250219`)
- Claude 3.5 Sonnet v2 (`claude-3-5-sonnet-v2@20241022`)
- Claude 3.5 Haiku (`claude-3-5-haiku@20241022`)

### Quotas

By default, the number of concurrent batch requests that you can make in a
single project is 4.

## Prepare input

Before you begin, prepare your input dataset in a BigQuery table or as a
JSONL file in Cloud Storage. The input for both sources must
follow the [Anthropic Claude API Schema](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude) JSON format, as shown in the following
example:

```python
{
 "custom_id": "request-1",
 "request": {
 "messages": [{"role": "user", "content": "Hello!"}],
 "anthropic_version": "vertex-2023-10-16",
 "max_tokens": 50
 }
}

```

### BigQuery

Your BigQuery input table must adhere to the following schema:

| Column name | Description |
| --- | --- |
| custom\_id | An ID for each request to match the input with the output. |
| request | The request body, which is your input prompt and must follow the [Anthropic Claude API Schema](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude) |

- Your input table can have other columns, which are ignored by the batch job.
- Batch prediction jobs reserve two column names for the batch prediction
 output: `response(JSON)` and `status`. Don't use these columns in the input
 table.

### Cloud Storage

For Cloud Storage, the input file must be a JSONL file that is
located in a Cloud Storage bucket.

## Request a batch prediction

Make a batch prediction against a Claude model by using input from
[BigQuery](#bigquery) or [Cloud Storage](#cloudstorage).
You can independently choose to output predictions to either a
BigQuery table or a JSONL file in a Cloud Storage
bucket.

### BigQuery

Specify your BigQuery input table, model, and output location.
The batch prediction job and your table must be in the same region.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import time

from google import genai
from google.genai.types import CreateBatchJobConfig, JobState, HttpOptions

client = genai.Client(http_options=HttpOptions(api_version="v1"))

# TODO(developer): Update and un-comment below line
# output_uri = f"bq://your-project.your_dataset.your_table"

job = client.batches.create(
 # Check Anthropic Claude region availability in https://cloud.devsite.corp.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude#regions
 # More about Anthropic model: https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-5-haiku
 model="publishers/anthropic/models/claude-3-5-haiku",
 # The source dataset needs to be created specifically in us-east5
 src="bq://python-docs-samples-tests.anthropic_bq_sample.test_data",
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

### REST

Before using any of the request data,
make the following replacements:

- LOCATION: A region that supports the selected
 Anthropic Claude model (see [Claude Regions](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude#regions)).
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL: The name of the [model](#models).
- INPUT\_URI: The
 BigQuery table where your batch prediction input is located
 such as `bq://myproject.mydataset.input_table`.
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
 `bq://myproject.mydataset.output_result`. For Cloud Storage,
 specify the bucket and folder location such as
 `gs://mybucket/path/to/outputfile`.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs
```

Request JSON body:

```python
'{
 "displayName": "JOB_NAME",
 "model": "publishers/anthropic/models/MODEL",
 "inputConfig": {
 "instancesFormat":"bigquery",
 "bigquerySource":{
 "inputUri" : "INPUT_URI"
 }
 },
 "outputConfig": {
 "predictionsFormat":"OUTPUT_FORMAT",
 "DESTINATION":{
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
 }
 }
}'

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
"name":
 "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
 "displayName": "JOB_NAME",
 "model": "publishers/anthropic/models/MODEL",
 "inputConfig": {
 "instancesFormat":"bigquery",
 "bigquerySource":{
 "inputUri" : "INPUT_URI"
 }
 },
 "outputConfig": {
 "predictionsFormat":"OUTPUT_FORMAT",
 "DESTINATION":{
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
 }
 },
 "state": "JOB_STATE_PENDING",
 "createTime": "2024-10-16T19:33:59.153782Z",
 "updateTime": "2024-10-16T19:33:59.153782Z",
 "modelVersionId": "1"
}

```

### Cloud Storage

Specify your JSONL file's Cloud Storage location, model, and output
location.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import time

from google import genai
from google.genai.types import CreateBatchJobConfig, JobState, HttpOptions

client = genai.Client(http_options=HttpOptions(api_version="v1"))
# TODO(developer): Update and un-comment below line
# output_uri = "gs://your-bucket/your-prefix"

# See the documentation: https://googleapis.github.io/python-genai/genai.html#genai.batches.Batches.create
job = client.batches.create(
 # More about Anthropic model: https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-5-haiku
 model="publishers/anthropic/models/claude-3-5-haiku",
 # Source link: https://storage.cloud.google.com/cloud-samples-data/batch/anthropic-test-data-gcs.jsonl
 src="gs://cloud-samples-data/anthropic-test-data-gcs.jsonl",
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

### REST

Before using any of the request data,
make the following replacements:

- LOCATION: A region that supports the selected
 Anthropic Claude model (see [Claude Regions](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude#regions)).
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL: The name of the [model](#models).
- INPUT\_URIS: A comma-separated list of the
 Cloud Storage locations of your JSONL batch prediction input such as
 `gs://bucketname/path/to/jsonl`.
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
 `bq://myproject.mydataset.output_result`. For Cloud Storage,
 specify the bucket and folder location such as
 `gs://mybucket/path/to/outputfile`.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs
```

Request JSON body:

```python
'{
 "displayName": "JOB_NAME",
 "model": "publishers/anthropic/models/MODEL",
 "inputConfig": {
 "instancesFormat":"jsonl",
 "gcsSource":{
 "uris" : "INPUT_URIS"
 }
 },
 "outputConfig": {
 "predictionsFormat":"OUTPUT_FORMAT",
 "DESTINATION":{
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
 }
 }
}'

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
"name":
 "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
 "displayName": "JOB_NAME",
 "model": "publishers/anthropic/models/MODEL",
 "inputConfig": {
 "instancesFormat": "jsonl",
 "gcsSource": {
 "uris": [
 "INPUT_URIS"
 ]
 }
 },
 "outputConfig": {
 "predictionsFormat":"OUTPUT_FORMAT",
 "DESTINATION":{
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
 }
 },
 "state": "JOB_STATE_PENDING",
 "createTime": "2024-10-16T19:33:59.153782Z", 
 "updateTime": "2024-10-16T19:33:59.153782Z", 
 "modelVersionId": "1"
}

```

## Get the status of a batch prediction job

Get the status of your batch prediction job to check whether it has completed
successfully.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region where your
 batch job is located.
- JOB\_ID: The batch job ID that was
 returned when you created the job.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/JOB_ID
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

Execute the following command:

```python
curl -X GET \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/JOB_ID"
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

Execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method GET ` 
 -Headers $headers ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/JOB_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
"name":
 "projects/PROJECT_ID/locations/LOCATION/batchPredictionJobs/BATCH_JOB_ID",
 "displayName": "JOB_NAME",
 "model": "publishers/anthropic/models/MODEL",
 "inputConfig": {
 "instancesFormat":"bigquery",
 "bigquerySource":{
 "inputUri" : "INPUT_URI"
 }
 },
 "outputConfig": {
 "predictionsFormat":"OUTPUT_FORMAT",
 "DESTINATION":{
 "OUTPUT_URI_FIELD_NAME": "OUTPUT_URI"
 }
 },
 "state": "JOB_STATE_SUCCEEDED",
 "createTime": "2024-10-16T19:33:59.153782Z", 
 "updateTime": "2024-10-16T19:33:59.153782Z", 
 "modelVersionId": "1"
}

```

## Retrieve batch prediction output

When a batch prediction job completes, retrieve the output from the location
that you specified. For BigQuery, the output is in the
`response(JSON)` column of your destination BigQuery table. For
Cloud Storage, the output is saved as a JSONL file in the output
Cloud Storage location.

You can access the full batch prediction results after all rows have completed or after 24 hours, whichever comes first.