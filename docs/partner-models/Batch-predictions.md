---
date_scraped: 2025-05-12
title: Batch Predictions
---

# Batch predictions 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

Batch predictions lets you efficiently send multiple text-only prompts that
aren't latency sensitive to a Llama model. Compared to online predictions, where
you send one input prompt for each request, you can batch a large number of
input prompts in a single request.

There are no charges for batch predictions during the [Preview](https://cloud.google.com/products#product-launch-stages) period.

## Supported Llama models

Vertex AI supports batch predictions for the following Llama models:

- Llama 3.1 405B (`llama-3.1-405b-instruct-maas`)
- Llama 3.1 70B (`llama-3.1-70b-instruct-maas`)
- Llama 3.1 8B (`llama-3.1-8b-instruct-maas`)

## Prepare input

Before you begin, prepare your inputs in a BigQuery table or as a
JSONL file in Cloud Storage. The input for both sources must
follow the [OpenAI API schema](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input) JSON format, as shown in the following
example:

```python
{"custom_id": "test-request-0", "method": "POST", "url": "/v1/chat/completions", "body": {"model": "meta/llama-3.1-405b-instruct-maas", "messages": [{"role": "system", "content": "You are a chef."}, {"role": "user", "content": "Give me a recipe for banana bread"}], "max_tokens": 1000}}

```

**Note:** Vertex AI doesn't use the `custom_id`, `method`, `url`, and `model`
fields. You can include them but they are ignored by the batch prediction job.

### BigQuery

Your BigQuery input table must adhere to the following schema:

| Column name | Description |
| --- | --- |
| custom\_id | An ID for each request to match the input with the output. |
| method | The request method. |
| url | The request endpoint. |
| body(JSON) | Your input prompt. |

- Your input table can have other columns, which are ignored by the batch job
 and passed directly to the output table.
- Batch prediction jobs reserve two column names for the batch prediction
 output: **response(JSON)** and **id**. Don't use these columns in the input
 table.
- The **method** and **url** columns are dropped and not included in the output
 table.

### Cloud Storage

For Cloud Storage, the input file must be a JSONL file that is
located in a Cloud Storage bucket.

## Request a batch prediction

Make a batch prediction against a Llama model by using input from
[BigQuery](#bigquery) or [Cloud Storage](#cloudstorage).
You can independently choose to output predictions to either a
BigQuery table or a JSONL file in a Cloud Storage
bucket.

### BigQuery

Specify your BigQuery input table, model, and output location.
The batch prediction job and your table must be in the same region.

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

Before using any of the request data,
make the following replacements:

- LOCATION: A region that supports
 Llama models.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL: The name of the [model](#models) to tune.
- INPUT\_URI: The
 BigQuery table where your batch prediction input is located
 such as `myproject.mydataset.input_table`.
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
 `myproject.mydataset.output_result`. For Cloud Storage,
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
 "model": "publishers/meta/models/MODEL",
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
 "model": "publishers/meta/models/MODEL",
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
 "labels": {
 "purpose": "testing"
 },
 "modelVersionId": "1"
}

```

### Cloud Storage

Specify your JSONL file's Cloud Storage location, model, and output
location.

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

Before using any of the request data,
make the following replacements:

- LOCATION: A region that supports
 Llama models.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL: The name of the [model](#models) to tune.
- INPUT\_URI: The
 Cloud Storage location of your JSONL batch prediction input such as
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
 `myproject.mydataset.output_result`. For Cloud Storage,
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
 "model": "publishers/meta/models/MODEL",
 "inputConfig": {
 "instancesFormat":"jsonl",
 "gcsDestination":{
 "uris" : "INPUT_URI"
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
 "model": "publishers/meta/models/MODEL",
 "inputConfig": {
 "instancesFormat": "jsonl",
 "gcsSource": {
 "uris": [
 "INPUT_URI"
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
 "labels": {
 "purpose": "testing"
 },
 "modelVersionId": "1"
}

```

## Get the status of a batch prediction job

Get the state of your batch prediction job to check whether it has completed
successfully. The job length depends on the number input items that you
submitted.

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

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
 "model": "publishers/meta/models/MODEL",
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
 "labels": {
 "purpose": "testing"
 },
 "modelVersionId": "1"
}

```

## Retrieve output

When a batch prediction job completes, retrieve the output from the location
that you specified. For BigQuery, the output is in the
**response(JSON)** column of your destination BigQuery table. For
Cloud Storage, the output is saved as a JSONL file in the output
Cloud Storage location.