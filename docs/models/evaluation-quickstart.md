---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-quickstart
title: Quickstart Gen AI Evaluation Service Workflow
---

# Quickstart: Gen AI evaluation service workflow

To see an example of Getting started with the Vertex AI Python SDK for Gen AI evaluation service,
run the "Getting Started with the Vertex AI Python SDK for Gen AI evaluation service" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/intro_to_gen_ai_evaluation_service_sdk.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fintro_to_gen_ai_evaluation_service_sdk.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fevaluation%2Fintro_to_gen_ai_evaluation_service_sdk.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/intro_to_gen_ai_evaluation_service_sdk.ipynb)

This page shows you how to perform a model-based evaluation with Gen AI evaluation service using the Vertex AI SDK for Python.

## Before you begin

1. Sign in to your Google Cloud account. If you're new to
 Google Cloud, [create an account](https://console.cloud.google.com/freetrial) to evaluate how our products perform in
 real-world scenarios. New customers also get $300 in free credits to
 run, test, and deploy workloads.

 In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)

 [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).

 In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)

 [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
2. Install the Vertex AI SDK for Python with Gen AI evaluation service dependency:

 ```python
 !pip install google-cloud-aiplatform[evaluation]

 ```
3. Set up your credentials. If you are running this quickstart in Colaboratory, run the following:

 ```python
 from google.colab import auth
 auth.authenticate_user()

 ```

 For other environments, refer to [Authenticate to Vertex AI](https://cloud.google.com/vertex-ai/docs/authentication#client-libraries).

## Import libraries

Import your libraries and set up your project and location.

```python
import pandas as pd

import vertexai
from vertexai.evaluation import EvalTask, PointwiseMetric, PointwiseMetricPromptTemplate
from google.cloud import aiplatform

PROJECT_ID = "PROJECT_ID"
LOCATION = "LOCATION"
EXPERIMENT_NAME = "EXPERIMENT_NAME"

vertexai.init(
 project=PROJECT_ID,
 location=LOCATION,
)
```

Note that `EXPERIMENT_NAME` can only contain lowercase alphanumeric characters and hyphens, up to a maximum of 127 characters.

## Set up evaluation metrics based on your criteria

The following metric definition evaluates the text quality generated from a large language model based on two criteria: `Fluency` and `Entertaining`. The code defines a metric called `custom_text_quality` using those two criteria:

```python
custom_text_quality = PointwiseMetric(
 metric="custom_text_quality",
 metric_prompt_template=PointwiseMetricPromptTemplate(
 criteria={
 "fluency": (
 "Sentences flow smoothly and are easy to read, avoiding awkward"
 " phrasing or run-on sentences. Ideas and sentences connect"
 " logically, using transitions effectively where needed."
 ),
 "entertaining": (
 "Short, amusing text that incorporates emojis, exclamations and"
 " questions to convey quick and spontaneous communication and"
 " diversion."
 ),
 },
 rating_rubric={
 "1": "The response performs well on both criteria.",
 "0": "The response is somewhat aligned with both criteria",
 "-1": "The response falls short on both criteria",
 },
 ),
)

```

## Prepare your dataset

Add the following code to prepare your dataset:

```python
responses = [
 # An example of good custom_text_quality
 "Life is a rollercoaster, full of ups and downs, but it's the thrill that keeps us coming back for more!",
 # An example of medium custom_text_quality
 "The weather is nice today, not too hot, not too cold.",
 # An example of poor custom_text_quality
 "The weather is, you know, whatever.",
]

eval_dataset = pd.DataFrame({
 "response" : responses,
})

```

## Run evaluation with your dataset

Run the evaluation:

```python
eval_task = EvalTask(
 dataset=eval_dataset,
 metrics=[custom_text_quality],
 experiment=EXPERIMENT_NAME
)

pointwise_result = eval_task.evaluate()

```

View the evaluation results for each response in the `metrics_table` Pandas DataFrame:

```python
pointwise_result.metrics_table

```

## Clean up

To avoid incurring charges to your Google Cloud account for
the resources used on this page, follow these steps.

Delete the `ExperimentRun` created by the evaluation:

```python
aiplatform.ExperimentRun(
 run_name=pointwise_result.metadata["experiment_run"],
 experiment=pointwise_result.metadata["experiment"],
).delete()

```

## What's next

- [Define your evaluation metrics](determine-eval.md).
- [Prepare your evaluation dataset](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-dataset).