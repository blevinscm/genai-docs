---
date_scraped: 2025-05-12
title: Run An Evaluation
---

# Run an evaluation 

You can use the [Gen AI Evaluation module](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.evaluation) of the [Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/python-sdk/use-vertex-ai-python-sdk) to programmatically evaluate your generative language models and applications with the Gen AI evaluation service API. This page shows you how to run evaluations with the Vertex AI SDK. Note that evaluations at scale are only available using the REST API.

## Before you begin

### Install the Vertex AI SDK

To install the Gen AI Evaluation module from the Vertex AI SDK for Python, run the following command:

```python
!pip install -q google-cloud-aiplatform[evaluation]

```

For more information, see
[Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/install-sdk).

### Authenticate the Vertex AI SDK

After you install the Vertex AI SDK for Python, you need to authenticate. The following
topics explain how to authenticate with the Vertex AI SDK if you're
working locally and if you're working in Colaboratory:

- If you're developing locally, set up
 [Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials)
 in your local environment:

 1. [Install](https://cloud.google.com/sdk/docs/install) the Google Cloud CLI, then
 [initialize](https://cloud.google.com/sdk/docs/initializing) it by running the following command:

 ```python
 gcloud init

 ```
 2. Create local authentication credentials for your Google Account:

 ```python
 gcloud auth application-default login

 ```

 A login screen is displayed. After you sign in, your credentials are stored
 in the local credential file used by ADC. For more information, see
 [Set up ADC for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).
- If you're working in Colaboratory, run the following command in a
 Colab cell to authenticate:

 ```python
 from google.colab import auth
 auth.authenticate_user()

 ```

 This command opens a window where you can complete the authentication.

### Understanding service accounts

The [service account](https://cloud.google.com/iam/docs/principals-overview#service-account) is used by the Gen AI evaluation service to get
predictions from the [Gemini API in Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal) for model-based evaluation
metrics. This service account is automatically provisioned on the first request
to the Gen AI evaluation service.

| Name | Description | Email address | Role |
| --- | --- | --- | --- |
| Vertex AI Rapid Eval Service Agent | The service account used to get predictions for model based evaluation. | `service-PROJECT_NUMBER@gcp-sa-vertex-eval.iam.gserviceaccount.com` | `roles/aiplatform.rapidevalServiceAgent` |

The permissions associated to the rapid evaluation service agent are:

| Role | Permissions |
| --- | --- |
| Vertex AI Rapid Eval Service Agent (roles/aiplatform.rapidevalServiceAgent) | `aiplatform.endpoints.predict` |

## Run your evaluation

Use the `EvalTask` class to run evaluations for the following use cases:

- [Model-based metrics](#metrics-model-based)

 - [Use existing examples](#metrics-examples)
 - [Use a templated interface](#metrics-template)
 - [Define metrics from scratch](#metrics-freeform)
 - [Evaluate a translation model](#translation) (preview)
- [Computation-based metrics](#metrics-computation)
- [Run evaluations at scale](#batch-eval) (preview)
- [Additional metric customization](#metrics-custom)
- [Increase rate limits and quota](#increase-quota)

### `EvalTask` class

The `EvalTask` class helps you evaluate models and applications based on specific tasks. To make fair comparisons between generative models, you typically need to repeatedly evaluate various models and prompt templates against a fixed evaluation dataset using specific metrics. It's also important to evaluate multiple metrics simultaneously within a single evaluation run.

`EvalTask` also integrates with [Vertex AI Experiments](https://cloud.google.com/vertex-ai/docs/experiments/intro-vertex-ai-experiments) to help you track configurations and results for each evaluation run. Vertex AI Experiments aids in managing and interpreting evaluation results, empowering you to make informed decisions.

The following example demonstrates how to instantiate the `EvalTask` class and run an evaluation:

```python
from vertexai.evaluation import (
 EvalTask,
 PairwiseMetric,
 PairwiseMetricPromptTemplate,
 PointwiseMetric,
 PointwiseMetricPromptTemplate,
 MetricPromptTemplateExamples，
)

eval_task = EvalTask(
 dataset=DATASET,
 metrics=[METRIC_1, METRIC_2, METRIC_3],
 experiment=EXPERIMENT_NAME,
)

eval_result = eval_task.evaluate(
 model=MODEL,
 prompt_template=PROMPT_TEMPLATE,
 experiment_run=EXPERIMENT_RUN,
)

```

## Run evaluation with model-based metrics

For [model-based metrics](determine-eval.md), use the `PointwiseMetric` and `PairwiseMetric` classes to define metrics tailored to your specific criteria. Run evaluations using the following options:

- [Use existing examples](#metrics-examples)
- [Use a templated interface](#metrics-template)
- [Define metrics from scratch](#metrics-freeform)

### Use model-based metric examples

You can directly use the built-in constant `Metric Prompt Template Examples` within Vertex AI SDK. Alternatively, modify and incorporate them in the free-form metric definition interface.

For the full list of Metric Prompt Template Examples covering most key use cases, see [Metric prompt templates](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates).

The following Vertex AI SDK example shows how to use `MetricPromptTemplateExamples` class to define your metrics:

```python
# View all the available examples of model-based metrics
MetricPromptTemplateExamples.list_example_metric_names()

# Display the metric prompt template of a specific example metric
print(MetricPromptTemplateExamples.get_prompt_template('fluency'))

# Use the pre-defined model-based metrics directly
eval_task = EvalTask(
 dataset=EVAL_DATASET,
 metrics=[MetricPromptTemplateExamples.Pointwise.FLUENCY],
)

eval_result = eval_task.evaluate(
 model=MODEL,
)

```

### Use a model-based metric templated interface

Customize your metrics by populating fields like `Criteria` and `Rating Rubrics` using the `PointwiseMetricPromptTemplate` and `PairwiseMetricPromptTemplate` classes within Vertex AI SDK. Certain fields, such as `Instruction`, are assigned a default value if you don't provide input.

Optionally, you can specify `input_variables`, which is a list of input fields used by the metric prompt template to generate model-based evaluation results. By default, the model's `response` column is included for pointwise metrics, and both the candidate model's `response` and `baseline_model_response` columns are included for pairwise metrics.

For additional information, refer to the "Structure a metric prompt template" section in [Metric prompt templates](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates#structure-template).

```python
# Define a pointwise metric with two custom criteria
custom_text_quality = PointwiseMetric(
 metric="custom_text_quality",
 metric_prompt_template=PointwiseMetricPromptTemplate(
 criteria={
 "fluency": "Sentences flow smoothly and are easy to read, avoiding awkward phrasing or run-on sentences. Ideas and sentences connect logically, using transitions effectively where needed.",
 "entertaining": "Short, amusing text that incorporates emojis, exclamations and questions to convey quick and spontaneous communication and diversion.",
 },
 rating_rubric={
 "1": "The response performs well on both criteria.",
 "0": "The response is somewhat aligned with both criteria",
 "-1": "The response falls short on both criteria",
 },
 input_variables=["prompt"],
 ),
)

# Display the serialized metric prompt template
print(custom_text_quality.metric_prompt_template)

# Run evaluation using the custom_text_quality metric
eval_task = EvalTask(
 dataset=EVAL_DATASET,
 metrics=[custom_text_quality],
)
eval_result = eval_task.evaluate(
 model=MODEL,
)

```

### Use the model-based metric free-form SDK interface

For more flexibility in customizing the metric prompt template, you can define a metric directly using the free-form interface, which accepts a direct string input.

```python
# Define a pointwise multi-turn chat quality metric
pointwise_chat_quality_metric_prompt = """Evaluate the AI's contribution to a meaningful conversation, considering coherence, fluency, groundedness, and conciseness.
 Review the chat history for context. Rate the response on a 1-5 scale, with explanations for each criterion and its overall impact.

# Conversation History
{history}

# Current User Prompt
{prompt}

# AI-generated Response
{response}
"""

freeform_multi_turn_chat_quality_metric = PointwiseMetric(
 metric="multi_turn_chat_quality_metric",
 metric_prompt_template=pointwise_chat_quality_metric_prompt,
)

# Run evaluation using the freeform_multi_turn_chat_quality_metric metric
eval_task = EvalTask(
 dataset=EVAL_DATASET,
 metrics=[freeform_multi_turn_chat_quality_metric],
)
eval_result = eval_task.evaluate(
 model=MODEL,
)

```

## Evaluate a translation model

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

To evaluate your translation model, you can specify [BLEU](determine-eval.md), [MetricX](https://github.com/google-research/metricx), or [COMET](https://huggingface.co/Unbabel/wmt22-comet-da) as evaluation metrics when using the Vertex AI SDK.

```python
#Prepare the dataset for evaluation.
sources = [
 "Dem Feuer konnte Einhalt geboten werden",
 "Schulen und Kindergärten wurden eröffnet.",
]

responses = [
 "The fire could be stopped",
 "Schools and kindergartens were open",
]

references = [
 "They were able to control the fire.",
 "Schools and kindergartens opened",
]

eval_dataset = pd.DataFrame({
 "source": sources,
 "response": responses,
 "reference": references,
})

# Set the metrics.

metrics = [
 "bleu",
 pointwise_metric.Comet(),
 pointwise_metric.MetricX(),
]

eval_task = evaluation.EvalTask(
 dataset=eval_dataset,
 metrics=metrics,
)
eval_result = eval_task.evaluate()

```

## Run evaluation with computation-based metrics

You can use [computation-based metrics](determine-eval.md) standalone, or together with model-based metrics.

```python
# Combine computation-based metrics "ROUGE" and "BLEU" with model-based metrics
eval_task = EvalTask(
 dataset=EVAL_DATASET,
 metrics=["rouge_l_sum", "bleu", custom_text_quality],
)
eval_result = eval_task.evaluate(
 model=MODEL,
)

```

## Run evaluations at scale

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

If you have large evaluation datasets or periodically run evaluations in a production environment, you can use the `EvaluateDataset` API in the Gen AI evaluation service to run evaluations at scale.

Before using any of the request data,
make the following replacements:

- PROJECT\_NUMBER: Your
 [project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- DATASET\_URI: The Cloud Storage path to a JSONL file
 that contains evaluation instances. Each line in the file should represent a single instance, with
 keys corresponding to user-defined input fields in the `metric_prompt_template`
 (for model-based metrics) or required input parameters (for computation-based metrics).
 You can only specify one JSONL file. The following example is a line for a pointwise evaluation instance:

 ```python
 {"response": "The Roman Senate was filled with exuberance due to Pompey's defeat in Asia."}
 ```
- METRIC\_SPEC: One or more
 [metric specs](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/evaluation) you are using for
 evaluation. You can use the following metric specs when running evaluations at scale:
 `"pointwise_metric_spec"`, `"pairwise_metric_spec"`, `"exact_match_spec"`,
 `"bleu_spec"`, and `"rouge_spec"`.
- METRIC\_SPEC\_FIELD\_NAME: The required
 fields for your chosen metric spec. For example, `"metric_prompt_template"`
- METRIC\_SPEC\_FIELD\_CONTENT: The field
 content for your chosen metric spec. For example, you can use the following field content for a
 pointwise evaluation: `"Evaluate the fluency of this sentence: {response}. Give score from 0 to
 1. 0 - not fluent at all. 1 - very fluent."`
- OUTPUT\_BUCKET: The name of the
 Cloud Storage bucket where you want to store evaluation results.

HTTP method and URL:

```python
POST https://us-central1-aiplatform.googleapis.com/v1beta1/projects/PROJECT_NUMBER/locations/us-central1/evaluateDataset
```

Request JSON body:

```python
{
 "dataset": {
 "gcs_source": {
 "uris": "DATASET_URI"
 }
 },
 "metrics": [
 {
 METRIC_SPEC: {
 METRIC_SPEC_FIELD_NAME: METRIC_SPEC_FIELD_CONTENT
 }
 }
 ],
 "output_config": {
 "gcs_destination": {
 "output_uri_prefix": "OUTPUT_BUCKET"
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
 "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/PROJECT_NUMBER/locations/us-central1/evaluateDataset"
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
 -Uri "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/PROJECT_NUMBER/locations/us-central1/evaluateDataset" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "name": "projects/PROJECT_NUMBER/locations/us-central1/operations/OPERATION_ID",
 "metadata": {
 "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.EvaluateDatasetOperationMetadata",
 "genericMetadata": {
 "createTime": CREATE_TIME,
 "updateTime": UPDATE_TIME
 }
 },
 "done": true,
 "response": {
 "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.EvaluateDatasetResponse",
 "outputInfo": {
 "gcsOutputDirectory": "gs://OUTPUT_BUCKET/evaluation_GENERATION_TIME"
 }
 }
}

```

You can use the OPERATION\_ID you receive in the response to request the status of the evaluation:

```python
curl -X GET \
 -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
 -H "Content-Type: application/json; charset=utf-8" \
 "https://us-central1-aiplatform.googleapis.com/v1beta1/projects/PROJECT_NUMBER/locations/us-central1/operations/OPERATION_ID"

```

## Additional metric customization

If you need to further customize your metrics, like choosing a different judge model for model-based metrics, or define a new computation-based metric, you can use the `CustomMetric` class in the Vertex AI SDK. For more details, see the following notebooks:

To see an example of Bring your own judge model using Custom Metric,
run the "Bring your own judge model using Custom Metric" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/bring_your_own_autorater_with_custom_metric.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fbring_your_own_autorater_with_custom_metric.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fbring_your_own_autorater_with_custom_metric.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/bring_your_own_autorater_with_custom_metric.ipynb)

To see an example of Bring your own computation-based Custom Metric,
run the "Bring your own computation-based Custom Metric" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/bring_your_own_computation_based_metric.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fbring_your_own_computation_based_metric.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fbring_your_own_computation_based_metric.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/bring_your_own_computation_based_metric.ipynb)

## Run model-based evaluation with increased rate limits and quota

A single evaluation request for a model-based metric results in multiple underlying requests to the Gemini API in Vertex AI and consumes quota for the judge model. You should set a higher evaluation service rate limit in the following use cases:

- **Increased data volume:** If you're processing significantly more data using the model-based metrics, you might hit the default requests per minute (RPM) quota. Increasing the quota lets you handle the larger volume without performance degradation or interruptions.
- **Faster evaluation:** If your application requires quicker turnaround time for evaluations, you might need a higher RPM quota. This is especially important for time-sensitive applications or those with real-time interactions where delays in evaluation can impact the user experience.
- **Complex evaluation tasks:** A higher RPM quota ensures you have enough capacity to handle resource-intensive evaluations for complex tasks or large amounts of text.
- **High user concurrency:** If you anticipate a large number of users simultaneously requesting model-based evaluations and model inference within your project, a higher model RPM limit is crucial to prevent bottlenecks and maintain responsiveness.

If you're using the default judge model of `gemini-2.0-flash` or newer models, we recommend that you use [Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput) to manage your quota.

For models older than `gemini-2.0-flash`, use the following instructions to increase the [judge model RPM quota](../quotas.md):

1. In the Google Cloud console, go to the IAM & Admin **Quotas** page.

 [View Quotas in Console](https://console.cloud.google.com/iam-admin/quotas)
2. In the **Filter** field, specify the **Dimension** (model identifier) and the **Metric** (quota identifier for Gemini models): `base_model:gemini-2.0-flash` and `Metric:aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model`.
3. For the quota that you want to increase, click the **more actions** menu more\_vert button.
4. In the drop-down menu, click **Edit quota**. The **Quota changes** panel opens.
5. Under **Edit quota**, enter a new quota value.
6. Click **Submit request**.
7. A Quota Increase Request (QIR) is confirmed by email and typically takes two business days to process.

To run an evaluation using a new quota, set the `evaluation_service_qps` parameter as follows:

```python
from vertexai.evaluation import EvalTask

# GEMINI_RPM is the requests per minute (RPM) quota for gemini-2.0-flash-001 in your region
# Evaluation Service QPS limit is equal to (gemini-2.0-flash-001 RPM / 60 sec / default number of samples)
CUSTOM_EVAL_SERVICE_QPS_LIMIT = GEMINI_RPM / 60 / 4

eval_task = EvalTask(
 dataset=DATASET,
 metrics=[METRIC_1, METRIC_2, METRIC_3],
)

eval_result = eval_task.evaluate(
 evaluation_service_qps=CUSTOM_EVAL_SERVICE_QPS_LIMIT,
 # Specify a retry_timeout limit for a more responsive evaluation run
 # the default value is 600 (in seconds, or 10 minutes)
 retry_timeout=RETRY_TIMEOUT,
)

```

For more information about quotas and limits, see [Gen AI evaluation service quotas](../quotas.md), and [Gen AI evaluation service API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/evaluation).

## What's next

- [View your evaluation results](https://cloud.google.com/vertex-ai/generative-ai/docs/models/view-evaluation).
- Find a [model-based metrics template](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates).
- Try an
 [evaluation example notebook](evaluation-overview.md).