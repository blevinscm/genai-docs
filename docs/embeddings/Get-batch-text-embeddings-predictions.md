---
date_scraped: 2025-05-12
title: Get Batch Text Embeddings Predictions
---

# Get batch text embeddings predictions 

Getting responses in a batch is a way to efficiently send large numbers of non-latency
sensitive embeddings requests. Different from getting online responses,
where you are limited to one input request at a time, you can send a large number
of LLM requests in a single batch request. Similar to how batch prediction is done
for [tabular data in Vertex AI](https://cloud.google.com/vertex-ai/docs/tabular-data/classification-regression/get-batch-predictions),
you determine your output location, add your input, and your responses asynchronously
populate into your output location.

## Text embeddings models that support batch predictions

All stable versions of text embedding models support batch predictions, except for `textembedding-gecko-multilingual@001`. Stable versions are versions which are no
longer in preview and are fully supported for production environments. To see the
full list of supported embedding models, see [Embedding model and versions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versioning#embedding_models_and_versions).

## Prepare your inputs

The input for batch requests are a list of prompts that can either be stored in
a BigQuery table or as a
[JSON Lines (JSONL)](https://jsonlines.org/) file in
Cloud Storage. Each request can include up to 30,000 prompts.

### JSONL example

This section shows examples of how to format JSONL input and output.

#### JSONL input example

```python
{"content":"Give a short description of a machine learning model:"}
{"content":"Best recipe for banana bread:"}

```

#### JSONL output example

```python
{"instance":{"content":"Give..."},"predictions": [{"embeddings":{"statistics":{"token_count":8,"truncated":false},"values":[0.2,....]}}],"status":""}
{"instance":{"content":"Best..."},"predictions": [{"embeddings":{"statistics":{"token_count":3,"truncated":false},"values":[0.1,....]}}],"status":""}

```

### BigQuery example

This section shows examples of how to format BigQuery input and output.

#### BigQuery input example

This example shows a single column BigQuery table.

| content |
| --- |
| "Give a short description of a machine learning model:" |
| "Best recipe for banana bread:" |

#### BigQuery output example

| content | predictions | status |
| --- | --- | --- |
| "Give a short description of a machine learning model:" | ```python '[{"embeddings": { "statistics":{"token_count":8,"truncated":false}, "Values":[0.1,....] } } ]' ``` | |
| "Best recipe for banana bread:" | ```python '[{"embeddings": { "statistics":{"token_count":3,"truncated":false}, "Values":[0.2,....] } } ]' ``` | |

## Request a batch response

Depending on the number of input items that you've submitted, a
batch generation task can take some time to complete.

### REST

To test a text prompt by using the Vertex AI API, send a POST request to the
publisher model endpoint.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: The ID of your Google Cloud project.
- BP\_JOB\_NAME: The job name.
- INPUT\_URI: The input source URI. This is either a BigQuery table URI or a JSONL
 file URI in Cloud Storage.
- OUTPUT\_URI: Output target URI.

HTTP method and URL:

```python
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs
```

Request JSON body:

```python
{
 "name": "BP_JOB_NAME",
 "displayName": "BP_JOB_NAME",
 "model": "publishers/google/models/textembedding-gecko",
 "inputConfig": {
 "instancesFormat":"bigquery",
 "bigquerySource":{
 "inputUri" : "INPUT_URI"
 }
 },
 "outputConfig": {
 "predictionsFormat":"bigquery",
 "bigqueryDestination":{
 "outputUri": "OUTPUT_URI"
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
 "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```python
{
 "name": "projects/123456789012/locations/us-central1/batchPredictionJobs/1234567890123456789",
 "displayName": "BP_sample_publisher_BQ_20230712_134650",
 "model": "projects/{PROJECT_ID}/locations/us-central1/models/textembedding-gecko",
 "inputConfig": {
 "instancesFormat": "bigquery",
 "bigquerySource": {
 "inputUri": "bq://project_name.dataset_name.text_input"
 }
 },
 "modelParameters": {},
 "outputConfig": {
 "predictionsFormat": "bigquery",
 "bigqueryDestination": {
 "outputUri": "bq://project_name.llm_dataset.embedding_out_BP_sample_publisher_BQ_20230712_134650"
 }
 },
 "state": "JOB_STATE_PENDING",
 "createTime": "2023-07-12T20:46:52.148717Z",
 "updateTime": "2023-07-12T20:46:52.148717Z",
 "labels": {
 "owner": "sample_owner",
 "product": "llm"
 },
 "modelVersionId": "1",
 "modelMonitoringStatus": {}
}

```

The response includes a unique identifier for the batch job.
You can poll for the status of the batch job using
the BATCH\_JOB\_ID until the job `state` is
`JOB_STATE_SUCCEEDED`. For example:

```python
curl \
 -X GET \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/batchPredictionJobs/BATCH_JOB_ID
```

**Note:** You can run only one batch response job at a time. Custom Service accounts,
live progress, CMEK, and VPC-SC reports aren't supported at this time.

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
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
import time

from google import genai
from google.genai.types import CreateBatchJobConfig, JobState, HttpOptions

client = genai.Client(http_options=HttpOptions(api_version="v1"))
# TODO(developer): Update and un-comment below line
# output_uri = "gs://your-bucket/your-prefix"

# See the documentation: https://googleapis.github.io/python-genai/genai.html#genai.batches.Batches.create
job = client.batches.create(
 model="text-embedding-005",
 # Source link: https://storage.cloud.google.com/cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl
 src="gs://cloud-samples-data/generative-ai/embeddings/embeddings_input.jsonl",
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
 if job.state == JobState.JOB_STATE_FAILED:
 print(f"Error: {job.error}")
 break

# Example response:
# Job state: JOB_STATE_PENDING
# Job state: JOB_STATE_RUNNING
# Job state: JOB_STATE_RUNNING
# ...
# Job state: JOB_STATE_SUCCEEDED
```

## Retrieve batch output

When a batch prediction task is complete, the output is stored
in the Cloud Storage bucket or BigQuery table that you specified
in your request.

## What's next

- Learn how to [get text embeddings](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings).