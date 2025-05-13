---
title: Tune-Translation-LLM-models-by-using-supervised-fine-tuningStay-organized-with-collectionsSave-and-c
source: https://cloud.google.com/vertex-ai/generative-ai/docs/models/translation-use-supervised-tuning
date_scraped: 2025-05-12
---

# Tune Translation LLM models by using supervised fine-tuning 

This document describes how to tune a Translation LLM model by using supervised
fine-tuning.

## Before you begin

Before you begin, you must prepare a supervised fine-tuning dataset.
Depending on your use case, there are different requirements.

- Prepare a text dataset for tuning: [Text tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/translation-supervised-tuning-prepare)

## Supported Models

- `translation-llm-002` (In preview, only supports text tuning)

## Create a tuning job

You can create a supervised fine-tuning job by using the REST API or
the Vertex AI SDK for Python.

### REST

To create a model tuning job, send a POST request by using the
[`tuningJobs.create`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.tuningJobs/create)
method. Some of the parameters are not supported by all of the models. Ensure
that you include only the applicable parameters for the model that you're
tuning.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TUNING\_JOB\_REGION: The [region](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning-region-settings) where the tuning job runs. This is also the default region for where the tuned model is uploaded. Supported region: `us-central1`.
- BASE\_MODEL: Name of the
 translation model to tune. Supported values: `translation-llm-002`.
- TRAINING\_DATASET\_URI: Cloud Storage URI of your training dataset. The dataset must be formatted as a JSONL file. For best results, provide at least 100 to 500 examples. For more information, see [About supervised tuning dataset](https://cloud.google.com/vertex-ai/generative-ai/docs/models/translation-supervised-tuning-prepare) .
- VALIDATION\_DATASET\_URIOptional: The Cloud Storage URI of your validation dataset file.
- TUNED\_MODEL\_DISPLAYNAMEOptional: A display
 name for the tuned model. If not set, a random name is generated.

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
 },
 "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME"
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
 },
 "tunedModelDisplayName": "TUNED_MODEL_DISPLAYNAME"
}

```

#### Example curl command

```python
PROJECT_ID=myproject
LOCATION=us-central1
curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json; charset=utf-8" \
"https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/tuningJobs" \
-d \
$'{
 "baseModel": "translation-llm-002",
 "supervisedTuningSpec" : {
 "training_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/sft_train_data.jsonl",
 "validation_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/sft_validation_data.jsonl"
 },
 "tunedModelDisplayName": "tuned_translation_llm"
}'

```

### Python

```python
from vertexai.generative_models import GenerativeModel

sft_tuning_job = sft.SupervisedTuningJob("projects/<PROJECT_ID>/locations/<TUNING_JOB_REGION>/tuningJobs/<TUNING_JOB_ID>")
tuned_model = GenerativeModel(sft_tuning_job.tuned_model_endpoint_name)
print(tuned_model.generate_content(content))

import time

import vertexai
from vertexai.tuning import sft

# TODO(developer): Update and un-comment below line.
# PROJECT_ID = os.environ["GOOGLE_CLOUD_PROJECT"]
vertexai.init(project=PROJECT_ID, location="us-central1")

sft_tuning_job = sft.train(
 source_model="translation-llm-002",
 train_dataset="gs://cloud-samples-data/ai-platform/generative_ai/gemini-1_5/text/sft_train_data.jsonl",
 # The following parameters are optional
 validation_dataset="gs://cloud-samples-data/ai-platform/generative_ai/gemini-1_5/text/sft_validation_data.jsonl",
 tuned_model_display_name="tuned_translation_llm_002",
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

## View a list of tuning jobs

You can view a list of tuning jobs in your current project by using the Google Cloud console,
the Vertex AI SDK for Python, or by sending a GET request by using the `tuningJobs` method.

### REST

To view a list of model tuning jobs, send a GET request by using the
[`tuningJobs.list`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.tuningJobs/list)
method.

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

### Console

To view your tuning jobs in the Google Cloud console, go to the
**Vertex AI Studio** page.

[Go to **Vertex AI Studio**](https://console.cloud.google.com/vertex-ai/generative/language/tuning)

Your Translation LLM tuning jobs are listed in the table under the **Translation LLM tuned models**
section.

## Get details of a tuning job

You can get the details of a tuning job in your current project
by using the Google Cloud console, the Vertex AI SDK for Python, or by sending a GET
request by using the `tuningJobs` method.

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

### Console

1. To view details of a tuned model in the Google Cloud console, go to the
 **Vertex AI Studio** page.

 [Go to **Vertex AI Studio**](https://console.cloud.google.com/vertex-ai/generative/language/tuning)
2. In the **Translation LLM tuned models** table, find your model and click
 **Details**.

 The details of your model are shown.

## Cancel a tuning job

You can cancel a tuning job in your current project by using the Google Cloud console,
the Vertex AI SDK for Python, or by sending a POST request using the `tuningJobs` method.

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

### Console

1. To cancel a tuning job in the Google Cloud console, go to the
 **Vertex AI Studio** page.

 [Go to **Vertex AI Studio**](https://console.cloud.google.com/vertex-ai/generative/language/tuning)
2. In the **Translation tuned models** table, click more\_vert **Manage run**.
3. Click **Cancel**.

## Test the tuned model with a prompt

You can test a tuning job in your current project by using the
Vertex AI SDK for Python or by sending a POST request using the `tuningJobs`
method.

The following example prompts a model with the question "Why is sky blue?".

### REST

To test a tuned model with a prompt, send a POST request and
specify the `TUNED_ENDPOINT_ID`.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- TUNING\_JOB\_REGION: The region where the tuning job runs. This is also the default region for where the tuned model is uploaded.
- ENDPOINT\_ID: The tuned model endpoint ID from the GET API.

HTTP method and URL:

```python
POST https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/endpoints/ENDPOINT_ID:generateContent
```

Request JSON body:

```python
{
 "contents": [
 {
 "role": "USER",
 "parts": {
 "text" : "English: Hello. Spanish:"
 }
 }
 ],
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
 "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/endpoints/ENDPOINT_ID:generateContent"
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
 -Uri "https://TUNING_JOB_REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/TUNING_JOB_REGION/endpoints/ENDPOINT_ID:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [English: Hello. Spanish:
 {
 "text": "Hola."
 }
 ]
 },
 "finishReason": "STOP",
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 5,
 "candidatesTokenCount": 33,
 "totalTokenCount": 38
 }
}

```

### Python

```python
from vertexai.generative_models import GenerativeModel

sft_tuning_job = sft.SupervisedTuningJob("projects/<PROJECT_ID>/locations/<TUNING_JOB_REGION>/tuningJobs/<TUNING_JOB_ID>")
tuned_model = GenerativeModel(sft_tuning_job.tuned_model_endpoint_name)
print(tuned_model.generate_content(content))

```

## Tuning and validation metrics

You can configure a model tuning job to collect and report model tuning and
model evaluation metrics, which can then be visualized in
**Vertex AI Studio**.

1. To view details of a tuned model in the Google Cloud console, go to the
 **Vertex AI Studio** page.

 [Go to **Vertex AI Studio**](https://console.cloud.google.com/vertex-ai/generative/language/tuning)
2. In the **Tune and Distill** table, click the name of the tuned model
 that you want to view metrics for.

 The tuning metrics appear under the **Monitor** tab.

### Model tuning metrics

The model tuning job automatically collects the following tuning metrics
for `translation-llm-002`.

- `/train_total_loss`: Loss for the tuning dataset at a training step.
- `/train_fraction_of_correct_next_step_preds`: The token accuracy at a training
 step. A single prediction consists of a sequence of tokens. This metric
 measures the accuracy of the predicted tokens when compared to the ground
 truth in the tuning dataset.
- `/train_num_predictions:` Number of predicted tokens at a training step.

### Model validation metrics:

You can configure a model tuning job to collect the following validation metrics
for `translation-llm-002`.

- `/eval_total_loss`: Loss for the validation dataset at a validation step.
- `/eval_fraction_of_correct_next_step_preds`: The token accuracy at an
 validation step. A single prediction consists of a sequence of tokens. This
 metric measures the accuracy of the predicted tokens when compared to the
 ground truth in the validation dataset.
- `/eval_num_predictions`: Number of predicted tokens at a validation step.

The metrics visualizations are available after the tuning job starts running.
It will be updated in real time as tuning progresses.
If you don't specify a validation dataset when you create the tuning job, only
the visualizations for the tuning metrics are available.

## What's next

- To learn how supervised fine-tuning can be used in a solution that builds a
 generative AI knowledge base, see [Jump Start Solution: Generative AI
 knowledge base](https://cloud.google.com/architecture/ai-ml/generative-ai-knowledge-base).