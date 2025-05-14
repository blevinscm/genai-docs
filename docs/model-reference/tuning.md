---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/tuning
title: Tuning Api
---

# Tuning API 

Model tuning is a crucial process in adapting Gemini to perform specific tasks
with greater precision and accuracy. Model tuning works by providing a model
with a training dataset that contains a set of examples of specific downstream
tasks.

Use the Gemini tuning API for the following use-cases:

- [Supervised fine tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning)

#### Supported Models:

You can use supervised fine-tuning on the following Gemini models:

- [Vertex AI Model Optimizer](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/vertex-ai-model-optimizer)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)
- [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite)

Translation LLM V2 (`translation-llm-002`) is also supported.

## Example syntax

Syntax to tune a model.

### curl

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \

https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs \
-d '{
 "baseModel": "...",
 "supervisedTuningSpec" : {
 ...
 "hyper_parameters": {
 ...
 },
 },
 "tunedModelDisplayName": "",
}'
```

## Parameters list

See [examples](#examples) for implementation details.

#### Request body

The request body contains data with the following parameters:

| Parameters | |
| --- | --- |
| `source_model` | Optional: `string` Name of the foundation model that's being tuned. |
| `tunedModelDisplayName` | `string` The display name of the `TunedModel`. The name can be up to 128 characters long and can consist of any UTF-8 characters. |

#### `supervisedTuningSpec`

| Parameters | |
| --- | --- |
| `training_dataset` | `string` Cloud Storage URI of your training dataset. The dataset must be formatted as a JSONL file. For best results, provide at least 100 to 500 examples. For more information, see [About supervised tuning datasets.](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-about) |
| `validation_dataset` | Optional: `string` Cloud Storage URI of your validation dataset. Your dataset must be formatted as a JSONL file. A dataset can contain up to 256 examples. If you provide this file, the data is used to generate validation metrics periodically during fine-tuning. For more information, see [About supervised tuning datasets](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-about) . |
| `epoch_count` | Optional: `int` Number of complete passes the model makes over the entire training dataset during training. Vertex AI automatically adjusts the default value to your training dataset size. This value is based on benchmarking results to optimize model output quality. |
| `learning_rate_multiplier` | Optional: `float` Multiplier for adjusting the default learning rate. |
| `adapter_size` | Optional: `AdapterSize` Adapter size for tuning. |
| `tuned_model_display_name` | Optional: `string` Display name of the `TunedModel`. The name can be up to 128 characters long and can consist of any UTF-8 characters. |

#### `AdapterSize`

Adapter size for tuning job.

| Parameters | |
| --- | --- |
| `ADAPTER_SIZE_UNSPECIFIED` | Unspecified adapter size. |
| `ADAPTER_SIZE_ONE` | Adapter size 1. |
| `ADAPTER_SIZE_FOUR` | Adapter size 4. |
| `ADAPTER_SIZE_EIGHT` | Adapter size 8. |
| `ADAPTER_SIZE_SIXTEEN` | Adapter size 16. |

## Examples

### Create a supervised tuning Job

You can create a supervised text model tuning job by using the
Vertex AI SDK for Python or by sending a POST request.

#### Basic use case

The basic use case only sets values for `baseModel` and `training_dataset_uri`.
All other parameters use the default values.

### REST

To create a model tuning job, send a POST request by using the
[`tuningJobs.create`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.tuningJobs/create) method.
Note that some of the parameters are not supported by all of the models. Ensure
that you only include the applicable parameters for the model that you're
tuning.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TUNING\_JOB\_REGION: The [region](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-region-settings) where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- BASE\_MODEL: Name of the
 foundation model to tune.
- TRAINING\_DATASET\_URI: Cloud Storage URI of your training dataset. The dataset must be formatted as a JSONL file. For best results, provide at least 100 to 500 examples. For more information, see [About supervised tuning datasets](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-about) .

HTTP method and URL:

```python
POST https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs
```

Request JSON body:

```python
{
 "baseModel": "BASE_MODEL",
 "supervisedTuningSpec" : {
 "training_dataset_uri": "TRAINING_DATASET_URI"
 },
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
 "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs"
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
 -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "name": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID",
 "createTime": CREATE_TIME,
 "updateTime": UPDATE_TIME,
 "status": "STATUS",
 "supervisedTuningSpec": {
 "training_dataset_uri": "TRAINING_DATASET_URI",
 "validation_dataset_uri": "VALIDATION_DATASET_URI",
 "hyper_parameters": {
 "epoch_count": EPOCH_COUNT,
 "learning_rate_multiplier": LEARNING_RATE_MULTIPLIER
 },
 },
 "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME"
}

```

### Python

```python

import time

import vertexai
from vertexai.tuning import sft

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

sft_tuning_job = sft.train(
 source_model="gemini-2.0-flash-001",
 # 1.5 and 2.0 models use the same JSONL format
 train_dataset="gs://cloud-samples-data/ai-platform/generative_ai/gemini-1_5/text/sft_train_data.jsonl",
)

# Polling for job completion
while not sft_tuning_job.has_ended:
 time.sleep(60)
 sft_tuning_job.refresh()

print(sft_tuning_job.tuned_model_name)
print(sft_tuning_job.tuned_model_endpoint_name)
print(sft_tuning_job.experiment)
# Example response:
# projects/123456789012/locations/us-central1/models/1234567890@1
# projects/123456789012/locations/us-central1/endpoints/123456789012345
# <google.cloud.aiplatform.metadata.experiment_resources.Experiment object at 0x7b5b4ae07af0>

```

#### Advanced use case

The advance use case expands upon the basic use case, but also sets values for
optional `hyper_parameters`, such as `epoch_count`, `learning_rate_multiplier` and `adapter_size`.

### REST

To create a model tuning job, send a POST request by using the
[`tuningJobs.create`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.tuningJobs/create) method.
Note that some of the parameters are not supported by all of the models. Ensure
that you only include the applicable parameters for the model that you're
tuning.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TUNING\_JOB\_REGION: The [region](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-region-settings) where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- BASE\_MODEL: Name of the
 foundation model to tune.
- TRAINING\_DATASET\_URI: Cloud Storage URI of your training dataset. The dataset must be formatted as a JSONL file. For best results, provide at least 100 to 500 examples. For more information, see [About supervised tuning datasets](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-about) .
- VALIDATION\_DATASET\_URIOptional: The Cloud Storage URI of your validation dataset file.
- EPOCH\_COUNTOptional: The number of complete passes the model makes over the entire training dataset during training. Leave it unset to use the [pre-populated recommended value.](tuning.md)
- ADAPTER\_SIZEOptional: The [Adapter size](tuning.md) to use for the tuning job. The adapter size influences the number of trainable parameters for the tuning job. A larger adapter size implies that the model can learn more complex tasks, but it requires a larger training dataset and longer training times.
- LEARNING\_RATE\_MULTIPLIER: Optional: A
 multiplier to apply to the recommended learning rate. Leave it unset to use the [recommended value.](tuning.md)
- TUNED\_MODEL\_DISPLAYNAMEOptional: A display
 name for the tuned model. If not set, a random name is generated.
- KMS\_KEY\_NAMEOptional: The Cloud KMS resource identifier of the customer-managed encryption key used to protect a resource. The key has the format: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. The key needs to be in the same region as where the compute resource is created. For more information, see [Customer-managed encryption keys (CMEK)](https://cloud.google.com/vertex-ai/docs/general/cmek).
- SERVICE\_ACCOUNTOptional: The service account that the tuningJob workload runs as. If not specified, the Vertex AI Secure Fine-Tuning Service Agent in the project is used. See [Tuning Service Agent](https://cloud.google.com/iam/docs/service-agents#vertex-ai-secure-fine-tuning-service-account). If you plan to use a customer-managed Service Account, you must grant the `roles/aiplatform.tuningServiceAgent` role to the service account. Also grant the `vertex-ai-service-account` permission to the Tuning Service Agent.

HTTP method and URL:

```python
POST https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs
```

Request JSON body:

```python
{
 "baseModel": "BASE_MODEL",
 "supervisedTuningSpec" : {
 "trainingDatasetUri": "TRAINING_DATASET_URI",
 "validationDatasetUri": "VALIDATION_DATASET_URI",
 "hyperParameters": {
 "epochCount": "EPOCH_COUNT",
 "adapterSize": "ADAPTER_SIZE",
 "learningRateMultiplier": "LEARNING_RATE_MULTIPLIER"
 },
 },
 "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME",
 "encryptionSpec": {
 "kmsKeyName": "KMS_KEY_NAME"
 },
 "serviceAccount": "SERVICE_ACCOUNT"
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
 "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs"
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
 -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "name": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID",
 "createTime": CREATE_TIME,
 "updateTime": UPDATE_TIME,
 "status": "STATUS",
 "supervisedTuningSpec": {
 "trainingDatasetUri": "TRAINING_DATASET_URI",
 "validationDatasetUri": "VALIDATION_DATASET_URI",
 "hyperParameters": {
 "epochCount": EPOCH_COUNT,
 "adapterSize": "ADAPTER_SIZE",
 "learningRateMultiplier": LEARNING_RATE_MULTIPLIER
 },
 },
 "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME",
 "encryptionSpec": {
 "kmsKeyName": "KMS_KEY_NAME"
 },
 "serviceAccount": "SERVICE_ACCOUNT"
}

```

### Python

```python

import time

import vertexai
from vertexai.tuning import sft

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

# Initialize Vertex AI with your service account for BYOSA (Bring Your Own Service Account).
# Uncomment the following and replace "your-service-account"
# vertexai.init(service_account="your-service-account")

# Initialize Vertex AI with your CMEK (Customer-Managed Encryption Key).
# Un-comment the following line and replace "your-kms-key"
# vertexai.init(encryption_spec_key_name="your-kms-key")

sft_tuning_job = sft.train(
 source_model="gemini-2.0-flash-001",
 # 1.5 and 2.0 models use the same JSONL format
 train_dataset="gs://cloud-samples-data/ai-platform/generative_ai/gemini-1_5/text/sft_train_data.jsonl",
 # The following parameters are optional
 validation_dataset="gs://cloud-samples-data/ai-platform/generative_ai/gemini-1_5/text/sft_validation_data.jsonl",
 tuned_model_display_name="tuned_gemini_2_0_flash",
 # Advanced use only below. It is recommended to use auto-selection and leave them unset
 # epochs=4,
 # adapter_size=4,
 # learning_rate_multiplier=1.0,
)

# Polling for job completion
while not sft_tuning_job.has_ended:
 time.sleep(60)
 sft_tuning_job.refresh()

print(sft_tuning_job.tuned_model_name)
print(sft_tuning_job.tuned_model_endpoint_name)
print(sft_tuning_job.experiment)
# Example response:
# projects/123456789012/locations/us-central1/models/1234567890@1
# projects/123456789012/locations/us-central1/endpoints/123456789012345
# <google.cloud.aiplatform.metadata.experiment_resources.Experiment object at 0x7b5b4ae07af0>

```

### List tuning Jobs

You can view a list of tuning jobs in your current project by using
the Vertex AI SDK for Python or by sending a GET request.

### REST

To create a model tuning job, send a POST request by using the
[`tuningJobs.create`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.tuningJobs/create) method.
Note that some of the parameters are not supported by all of the models. Ensure
that you only include the applicable parameters for the model that you're
tuning.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TUNING\_JOB\_REGION: The [region](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-region-settings) where the tuning job runs. This is also the default region for where the tuned model is uploaded.

HTTP method and URL:

```python
GET https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs
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
 "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs"
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
 -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "tuning_jobs": [
 TUNING_JOB_1, TUNING_JOB_2, ...
 ]
}

```

### Python

```python
import vertexai
from vertexai.tuning import sft

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

responses = sft.SupervisedTuningJob.list()

for response in responses:
 print(response)
# Example response:
# <vertexai.tuning._supervised_tuning.SupervisedTuningJob object at 0x7c85287b2680>
# resource name: projects/12345678/locations/us-central1/tuningJobs/123456789012345

```

### Get details of a tuning job

You can get the details of a tuning job by using the Vertex AI SDK for Python or by
sending a GET request.

### REST

To view a list of model tuning jobs, send a GET request by using the
[`tuningJobs.get`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.tuningJobs/get)
method and specify the `TuningJob_ID`.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TUNING\_JOB\_REGION: The [region](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-region-settings) where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- TUNING\_JOB\_ID: The ID of the tuning job.

HTTP method and URL:

```python
GET https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID
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
 "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID"
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
 -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "name": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID",
 "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME",
 "createTime": CREATE_TIME,
 "endTime": END_TIME,
 "tunedModel": {
 "model": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/models/MODEL_ID",
 "endpoint": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/endpoints/ENDPOINT_ID"
 },
 "experiment": "projects/PROJECT_ID/locations/TUNING_JOB_REGION/metadataStores/default/contexts/EXPERIMENT_ID",
 "tuning_data_statistics": {
 "supervisedTuningDataStats": {
 "tuninDatasetExampleCount": "TUNING_DATASET_EXAMPLE_COUNT",
 "totalTuningCharacterCount": "TOTAL_TUNING_CHARACTER_COUNT",
 "tuningStepCount": "TUNING_STEP_COUNT"
 }
 },
 "status": "STATUS",
 "supervisedTuningSpec" : {
 "trainingDatasetUri": "TRAINING_DATASET_URI",
 "validationDataset_uri": "VALIDATION_DATASET_URI",
 "hyperParameters": {
 "epochCount": EPOCH_COUNT,
 "learningRateMultiplier": LEARNING_RATE_MULTIPLIER
 }
 }
}

```

### Python

```python
import vertexai
from vertexai.tuning import sft

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# LOCATION = "us-central1"
vertexai.init(project=PROJECT_ID, location=LOCATION)

tuning_job_id = "4982013113894174720"
response = sft.SupervisedTuningJob(
 f"projects/{PROJECT_ID}/locations/{LOCATION}/tuningJobs/{tuning_job_id}"
)

print(response)
# Example response:
# <vertexai.tuning._supervised_tuning.SupervisedTuningJob object at 0x7cc4bb20baf0>
# resource name: projects/1234567890/locations/us-central1/tuningJobs/4982013113894174720

```

### Cancel a tuning job

You can cancel a tuning job by using
the Vertex AI SDK for Python or by sending a POST request.

### REST

To view a list of model tuning jobs, send a GET request by using the
[`tuningJobs.cancel`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.tuningJobs/cancel)
method and specify the `TuningJob_ID`.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TUNING\_JOB\_REGION: The [region](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-region-settings) where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- TUNING\_JOB\_ID: The ID of the tuning job.

HTTP method and URL:

```python
POST https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID:cancel
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
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d "" \ 
 "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID:cancel"
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
 -Method POST ` 
 -Headers $headers ` 
 -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/tuningJobs/TUNING_JOB_ID:cancel" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{}

```

### Python

```python
import vertexai
from vertexai.tuning import sft

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# LOCATION = "us-central1"
vertexai.init(project=PROJECT_ID, location=LOCATION)

tuning_job_id = "4982013113894174720"
job = sft.SupervisedTuningJob(
 f"projects/{PROJECT_ID}/locations/{LOCATION}/tuningJobs/{tuning_job_id}"
)
job.cancel()
```

## What's next

For detailed documentation, see the following:

- [Supervised Tuning Job](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-use-supervised-tuning#create_a_text_model_supervised_tuning_job)
- [Gemini API](gemini.md)