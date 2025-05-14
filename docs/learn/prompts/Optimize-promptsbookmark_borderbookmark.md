---
date_scraped: 2025-05-12
title: Optimize Promptsbookmark_borderbookmark
---

# Optimize prompts bookmark\_borderbookmark 

Release Notes

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This document describes how to use the Vertex AI prompt optimizer to
automatically optimize prompt performance by improving the
[system instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instructions) for
a set of prompts.

The Vertex AI prompt optimizer can help you improve your prompts
quickly at scale, without manually re-writing system instructions or
individual prompts. This is especially useful when you want to use system
instructions and prompts that were written for one model with a different model.

To see an example of optimizing prompts, run one of the following Jupyter
notebooks:

- Vertex AI prompt optimizer:
 [Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_ui.ipynb) |
 [Open in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fprompt_optimizer%2Fvertex_ai_prompt_optimizer_ui.ipynb) |
 [Open in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fprompt_optimizer%2Fvertex_ai_prompt_optimizer_ui.ipynb) |
 [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_ui.ipynb)
- Vertex AI prompt optimizer SDK:
 [Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_sdk.ipynb) |
 [Open in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fprompt_optimizer%2Fvertex_ai_prompt_optimizer_sdk.ipynb) |
 [Open in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fprompt_optimizer%2Fvertex_ai_prompt_optimizer_sdk.ipynb) |
 [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_sdk.ipynb)
- Vertex AI prompt optimizer custom metrics:
 [Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_sdk_custom_metric.ipynb) |
 [Open in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fprompt_optimizer%2Fvertex_ai_prompt_optimizer_sdk_custom_metric.ipynb) |
 [Open in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fprompt_optimizer%2Fvertex_ai_prompt_optimizer_sdk_custom_metric.ipynb) |
 [View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_sdk_custom_metric.ipynb)

The Vertex AI prompt optimizer helps improve prompts by evaluating the
model's response to sample prompts against specified
[evaluation metric(s)](../../models/determine-eval.md). To use the
Vertex AI prompt optimizer, you must have the following:

- A set of sample prompts
- System instructions that are used by all your sample prompts
- A prompt template that references your sample prompts

## Prompt optimization example

For example, to optimize system instructions for a set of prompts that reference
contextual information to answer questions about cooking, you can use the
Vertex AI prompt optimizer. To complete this task, you would prepare
the inputs similar to the following:

#### System instructions

```python
You are a professional chef. Your goal is teaching how to cook healthy cooking recipes to your apprentice.

Given a question from your apprentice and some context, provide the correct answer to the question.
Use the context to return a single and correct answer with some explanation.

```

#### Prompt template

```python
Question: {input_question}
Facts: {input_context}

```

#### Sample prompts

| `input_question` | `input_context` |
| --- | --- |
| What are some techniques for cooking red meat and pork that maximize flavor and tenderness while minimizing the formation of unhealthy compounds? | Red meat and pork should be cooked to an internal temperature of 145 degrees fahrenheit (63 degrees celsius) to ensure safety. Marinating meat in acidic ingredients like lemon juice or vinegar can help tenderize it by breaking down tough muscle fibers. High-heat cooking methods like grilling and pan-searing can create delicious browning and caramelization, but it's important to avoid charring, which can produce harmful compounds. |
| What are some creative ways to add flavor and nutrition to protein shakes without using added sugars or artificial ingredients? | Adding leafy greens like spinach or kale is a great way to boost the nutritional value of your shake without drastically altering the flavor. Using unsweetened almond milk or coconut water instead of regular milk can add a subtle sweetness and a boost of healthy fats or electrolytes, respectively. Did you know that over-blending your shake can actually heat it up? To keep things cool and refreshing, blend for shorter bursts and give your blender a break if needed. |

### How optimization works

After preparing your inputs, you choose an *optimization mode*, *evaluation
metric*, and *target model*.

- Optimization mode: specifies whether the Vertex AI prompt
 optimizer optimizes the system instructions, selects sample prompts to add to
 the system instructions as few shot examples, or both.
- Evaluation metric: the metric that the Vertex AI prompt optimizer
 uses to optimize the system instructions and/or select sample prompts.
- Target model: the
 [Google model](../models.md) that the
 Vertex AI prompt optimizer optimizes the system instructions and/or
 selects sample prompts for use with.

When you run the Vertex AI prompt optimizer, it optimizes the system
instructions based on your selections by running a custom training job
where it iteratively evaluates your sample prompts and rewrites your system
instructions to find the version that produces the best evaluation score for
the target model.

At the end of the job, the Vertex AI prompt optimizer outputs the
optimized system instructions with their evaluation score.

#### Optimized system instructions

```python
As a highly skilled chef with a passion for healthy cooking, you love sharing your knowledge with
aspiring chefs. Today, a culinary intern approaches you with a question about healthy cooking. Given
the intern's question and some facts, provide a clear, concise, and informative answer that will help
the intern excel in their culinary journey.

```

## Supported models

You can optimize system instructions for use with the following models:

- [Gemini models](../models.md)
- [Gemini experimental models](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/gemini-experimental)

## Supported evaluation metrics

The Vertex AI prompt optimizer supports
custom evaluation metrics, and additionally supports the following evaluation
metrics:

| Metric type | Use case | Metric | Description |
| --- | --- | --- | --- |
| [Model-based](../../models/determine-eval.md) | [Summarization](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates#pointwise_summarization) | `summarization_quality` | Describes the model's ability to answer questions given a body of text to reference. |
| [Question answering](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates#pointwise_question_answering_quality) | `question_answering_correctness`\* | Describes the model's ability to correctly answer a question. |
| `question_answering_quality` | Describes the model's ability to answer questions given a body of text to reference. |
| [Coherence](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates#pointwise_coherence) | `coherence` | Describes the model's ability to provide a coherent response and measures how well the generated text flows logically and makes sense. |
| [Safety](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates#pointwise_safety) | `safety` | Describes the model's level of safety, that is, whether the response contains any unsafe text. |
| [Fluency](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates#pointwise_fluency) | `fluency` | Describes the model's language mastery. |
| [Groundedness](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates#pointwise_groundedness) | `groundedness` | Describes the model's ability to provide or reference information included only in the input text. |
| [Computation-based](../../models/evaluation-overview.md) | [Tool use and function calling](../../models/determine-eval.md) | `tool_call_valid`\* | Describes the model's ability to predict a valid tool call. |
| `tool_name_match`\* | Describes the model's ability to predict a tool call with the correct tool name. Only the first tool call is inspected. |
| `tool_parameter_key_match`\* | Describes the model's ability to predict a tool call with the correct parameter names. |
| `tool_parameter_kv_match`\* | Describes the model's ability to predict a tool call with the correct parameter names and key values. |
| [General text generation](../../models/determine-eval.md) | `bleu`\* | Holds the result of an algorithm for evaluating the quality of the prediction, which has been translated from one natural language to another natural language. The quality of the prediction is considered to be the correspondence between a prediction parameter and its reference parameter. |
| `exact_match`\* | Computes whether a prediction parameter matches a reference parameter exactly. |
| `rouge_1`\* | Used to compare the provided prediction parameter against a reference parameter. |
| `rouge_2`\* |
| `rouge_l`\* |
| `rouge_l_sum`\* |

\* If you want to optimize your prompts using the
`question_answering_correctness` or computation-based evaluations, you must do
one of the following:

- Add a variable that represents the ground truth response for your prompts to
 your [prompt template](#template-si).
- If you don't have ground truth responses for your prompts, but you previously
 used the prompts with a [Google model](../models.md) and
 achieved your targeted results, you can add the `source_model` parameter to
 your [configuration](#configuration) instead of adding ground truth responses.
 When the `source_model` parameter is set, the Vertex AI runs your
 sample prompts on the source model to generate the ground truth responses for
 you.

## Before you begin

To ensure that the [Compute Engine default service account](https://cloud.google.com/iam/docs/service-account-types#default) has the necessary
permissions to optimize prompts,
ask your administrator to grant the [Compute Engine default service account](https://cloud.google.com/iam/docs/service-account-types#default) the
following IAM roles on the project:

**Important:** You must grant these roles
to the [Compute Engine default service account](https://cloud.google.com/iam/docs/service-account-types#default), *not* to your user account. Failure to grant the roles to the correct principal might result in permission errors.

- [Vertex AI User](https://cloud.google.com/iam/docs/understanding-roles#aiplatform.user) (`roles/aiplatform.user`)
- [Storage Object Admin](https://cloud.google.com/iam/docs/understanding-roles#storage.objectAdmin) (`roles/storage.objectAdmin`)
- [Artifact Registry Reader](https://cloud.google.com/iam/docs/understanding-roles#artifactregistry.reader) (`roles/artifactregistry.reader`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://cloud.google.com/iam/docs/granting-changing-revoking-access).

Your administrator might also be able to give the [Compute Engine default service account](https://cloud.google.com/iam/docs/service-account-types#default)
the required permissions through [custom
roles](https://cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://cloud.google.com/iam/docs/understanding-roles).

## Optimize prompts

You can optimize prompts by running the
[Vertex AI prompt optimizer notebook](https://console.cloud.google.com/vertex-ai/colab/import/https:%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fprompt_optimizer%2Fvertex_ai_prompt_optimizer_ui.ipynb),
or by using the Vertex AI API. To optimize prompts, choose which method
you want to use to run the Vertex AI prompt optimizer, then complete
the steps as described in detail in the following sections:

**Tip:** We recommend running the
Vertex AI prompt optimizer notebook for first time users. The notebook
provides a more interactive experience than the Vertex AI API.

1. [Create a prompt template and system instructions](#template-si)
2. [Prepare sample prompts](#prepare-sample-prompts)
3. [Choose an evaluation metric](#evaluation-metric)
4. [Create a configuration](#configuration)
5. [Run the prompt optimization job](#run-prompt-optimizer)
6. [Analyze results and iterate](#anaylyze-iterate)

### Create a prompt template and system instructions

Prompt templates define the format of all of your prompts through replaceable
variables. When you use a prompt template to optimize prompts, the
variables are replaced by the data in the prompt dataset.

Prompt template variables must meet the following requirements:

- Variables must be wrapped in curly-braces
- Variable names must not contain spaces
- Variables that represent multimodal inputs must include the `MIME_TYPE` string
 after the variable:

 ```python
 @@@MIME_TYPE

 ```

 Replace `MIME_TYPE` with an
 [image](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#image-requirements),
 [video](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/video-understanding#video-requirements),
 [audio](../../multimodal/audio-understanding.md),
 or
 [document](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/document-understanding#document-requirements)
 MIME type that is supported by the target model.

Create a prompt template and system instructions using one of the following
methods:

[Notebook](#notebook) [SDK](#sdk) 
More

If you want to run the Vertex AI prompt optimizer through the
notebook, create system instructions and a prompt template by doing the
following:

1. In Colab Enterprise, open the Vertex AI prompt
 optimizer notebook.

 [Go to Vertex AI prompt optimizer notebook](https://console.cloud.google.com/vertex-ai/colab/import/https:%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fprompt_optimizer%2Fvertex_ai_prompt_optimizer_ui.ipynb)
2. In the **Create a prompt template and system instructions** section, do
 the following:

 1. In the **SYSTEM\_INSTRUCTION** field, enter your system instructions.
 For example:

 ```python
 Based on the following images and articles respond to the questions.'\n' Be concise,
 and answer \"I don't know\" if the response cannot be found in the provided articles or images.

 ```
 2. In the **PROMPT\_TEMPLATE** field, enter your prompt template. For
 example:

 ```python
 Article 1:\n\n{article_1}\n\nImage 1:\n\n{image_1} @@@image/jpeg\n\nQuestion: {question}

 ```
 3. If you want to optimize your prompts using the
 `question_answering_correctness` or computation-based evaluations, you
 must do one of the following:
 - Add the `{target}` variable to the prompt
 template, to represent the prompt's ground truth response. For example:

 ```python
 Article 1:\n\n{article_1}\n\nImage 1:\n\n{image_1} @@@image/jpeg\n\nQuestion: {question}\n\n Answer: {target}

 ```
 - If you don't have ground truth responses for your prompts, but you
 previously used the prompts with a
 [Google model](../models.md) and achieved your
 targeted results, you can add the `source_model` parameter to your
 [configuration](#configuration) instead of adding ground truth
 responses. When the `source_model` parameter is set, the
 Vertex AI prompt optimizer runs your sample prompts on the
 source model to generate the ground truth responses for you.

If you want to run the Vertex AI prompt optimizer through the SDK
without using the notebook, create text files for your prompt template and
system instructions by doing the following:

1. Create a text file for your system instructions.
2. In the text file, define your system instructions to the text file. For
 example:

 ```python
 Based on the following images and articles respond to the questions.'\n' Be concise, and answer \"I don't know\" if the response cannot be found in the provided articles or images.

 ```
3. Create a text file for your prompt template.
4. In the text file, define a prompt template that includes one or more
 variables. For example:

 ```python
 Article 1:\n\n{article_1}\n\nImage 1:\n\n{image_1} @@@image/jpeg\n\nQuestion: {question}

 ```
5. If you want to optimize your prompts using the
 `question_answering_correctness` or computation-based evaluations, you
 must do one of the following:

 - Add the `{target}` variable to the prompt
 template, to represent the prompt's ground truth response. For example:

 ```python
 Article 1:\n\n{article_1}\n\nImage 1:\n\n{image_1} @@@image/jpeg\n\nQuestion: {question}\n\n Answer: {target}

 ```
 - If you don't have ground truth responses for your prompts, but you
 previously used the prompts with a
 [Google model](../models.md) and achieved your
 targeted results, you can add the `source_model` parameter to your
 [configuration](#configuration) instead of adding ground truth
 responses. When the `source_model` parameter is set, the
 Vertex AI prompt optimizer runs your sample prompts on the
 source model to generate the ground truth responses for you.

### Prepare sample prompts

To get the best results from the Vertex AI prompt optimizer, use
50-100 sample prompts.

- The tool can still be effective with as few as 5 sample prompts.
- The best samples include examples where the target model performs poorly.

**Note:** The Vertex AI prompt optimizer's performance improves as you
increase the number of sample prompts. If you notice poor performance for your
set of sample prompts, consider adding more prompts and re-running the tool.

The sample prompts contain the data that replaces the variables in the prompt
template. You can use a JSONL or CSV file to store your sample prompts.

[JSONL file](#jsonl-file) [CSV file](#csv-file) 
More

1. Create a JSONL file.
2. In the JSONL file, add the prompt data that replaces each variable. For
 example:

 ```python
 {"article_1": "The marine life …", "image_1": "gs://path_to_image", "Question": "What are some most effective ways to reduce ocean pollution?", "target": "The articles and images don't answer this question."}

 {"article_1": "During the year …", "image_1": "gs://path_to_image", "Question": "Who was the president in 2023?", "target": "Joe Biden"}

 ```
3. [Upload the JSONL file to a Cloud Storage bucket](https://cloud.google.com/storage/docs/uploading-objects).

1. Create a CSV file.
2. In the first row, add the variables from your prompt template.
3. In the following rows, add the sample data that replaces each variable.
4. [Upload the CSV file to a Cloud Storage bucket](https://cloud.google.com/storage/docs/uploading-objects).

### Choose an evaluation metric

The Vertex AI prompt optimizer uses evaluation metrics to optimize
system instructions and select sample prompts.

Choose from one of the
[supported evaluation metrics](#supported-evaluation-metrics), or define your
own custom evaluation metric. Custom metrics are useful when standard metrics
don't fit your application. You can optimize prompts using multiple metrics.
However, the Vertex AI prompt optimizer only supports one custom metric
at a time. For example, you could run the Vertex AI prompt optimizer
using a custom metric and the `bleu` metric, or with the `bleu`, `rouge`, and
`summarization_quality` metrics, but you can't run the Vertex AI prompt
optimizer with multiple custom metrics at once.

**Note:** Custom metrics require you to deploy a Cloud Run function.
Cloud Run is a separate Google Cloud product with separate
[pricing](/run/pricing).

Create a custom metric by doing the following:

1. Create a text file named `requirements.txt`.
2. In the `requirements.txt` file, define the required libraries for the custom
 evaluation metric function. All functions require the `functions-framework`
 package.

 For example, the `requirements.txt` file for a custom metric that computes
 ROUGE-L would look similar to the following:

 ```python
 functions-framework==3.*
 rouge-score

 ```
3. Create a Python file named `main.py`.
4. In the `main.py` file, write your custom evaluation function. The function
 must accept the following:

 - HTTP POST requests
 - JSON input that contains the `response`, which is the output from the LLM,
 and the `target`, which is the ground truth response for the prompt.

 For example, the `main.py` file for a custom metric that computes ROUGE-L
 would look similar to the following:

 ```python
 from typing import Any
 import json
 import functions_framework
 from rouge_score import rouge_scorer

 # Register an HTTP function with the Functions Framework
 @functions_framework.http
 def main(request):
 request_json = request.get_json(silent=True)
 if not request_json:
 raise ValueError('Can not find request json.')

 """Extract 'response' and 'target' from the request payload. 'response'
 represents the model's response, while 'target' represents the ground
 truth response."""
 response = request_json['response']
 reference = request_json['target']

 # Compute ROUGE-L F-measure
 scorer = rouge_scorer.RougeScorer(['rougeL'], use_stemmer=True)
 scores = scorer.score(reference, response)
 final_score = scores['rougeL'].fmeasure

 # Return the custom score in the response
 return json.dumps({
 # The following key is the CUSTOM_METRIC_NAME that you pass to the job
 'custom_accuracy': final_score,
 # The following key is optional
 'explanation': 'ROUGE_L F-measure between reference and response',
 })

 ```
5. Deploy your custom evaluation function as a Cloud Run function by
 running the
 [`gcloud functions deploy` command](https://cloud.google.com/sdk/gcloud/reference/functions/deploy):

 ```python
 gcloud functions deploy FUNCTION_NAME \
 --project PROJECT_ID \
 --gen2 \
 --memory=2Gb \
 --concurrency=6 \
 --min-instances 6 \
 --region=REGION \
 --runtime="python310" \
 --source="." \
 --entry-point main \
 --trigger-http \
 --timeout=3600 \
 --quiet

 ```

 Replace the following:

 - `FUNCTION_NAME`: the name for the custom evaluation
 metric.
 - `PROJECT_ID`: your project ID.
 - `REGION`: the region where you want to deploy the
 function.

### Create a configuration

The Vertex AI prompt optimizer configuration specifies the parameters
you want to set for your prompt optimization job, including the following:

- Optimization mode: specifies whether the Vertex AI prompt
 optimizer optimizes the system instructions, selects sample prompts to add to
 the system instructions as few shot examples, or both.
- Evaluation metric: the metric that the Vertex AI prompt optimizer
 uses to optimize the system instructions and/or select sample prompts.
- Target model: the
 [Google model](../models.md) that the
 Vertex AI prompt optimizer optimizes the system instructions and/or
 selects sample prompts for use with.

Create a configuration using one of the following options:

[Notebook](#notebook) [SDK](#sdk) 
More

If you want to run the Vertex AI prompt optimizer through the
notebook, create a configuration by doing the following:

1. In Colab Enterprise, open the Vertex AI prompt
 optimizer notebook.

 [Go to Vertex AI prompt optimizer notebook](https://console.cloud.google.com/vertex-ai/colab/notebooks)
2. In the **Configure project settings** section, do the following:

 1. In the **PROJECT\_ID** field, enter your project ID.
 2. In the **LOCATION** field, enter the location where you want to run the
 Vertex AI prompt optimizer.
 3. In the **OUTPUT\_PATH** field, enter the URI for the Cloud Storage
 bucket where you want the Vertex AI prompt optimizer
 to write the optimized system instructions and/or few shot examples.
 For example, `gs://bucket-name/output-path`.
 4. In the **INPUT\_PATH** field, enter the URI for the sample
 prompts in your Cloud Storage bucket. For example,
 `gs://bucket-name/sample-prompts.jsonl`.
3. In the **Configure optimization settings** section, do the following:

 1. In the **TARGET\_MODEL** field, enter the
 [model](../models.md) that you want to optimize
 prompts for use with.
 2. In the **OPTIMIZATION\_MODE**, enter the optimization mode you want to
 use. Must be one of `instruction`, `demonstration`, or
 `instruction_and_demo`.
 3. In the **EVAL\_METRIC** field, enter the
 [evaluation metric](#supported-evaluation-metrics) that you want to
 optimize your prompts for.
 4. Optional: In the **SOURCE\_MODEL** field, enter the
 [Google model](../models.md) that the system
 instructions and prompts were previously used with. When the
 `source_model` parameter is set, the Vertex AI prompt
 optimizer runs your sample prompts on the source model to generate the
 ground truth responses for you, for evaluation metrics that require
 ground truth responses. If you didn't previously run your prompts with
 a Google model or you didn't achieve your target results, add ground
 truth responses to your prompt instead. For more information, see the
 [Create a prompt and system instructions](#template-si) section of
 this document.
4. Optional: In the **Configure advanced optimization settings** section,
 you can additionally add any of the optional parameters to your
 configuration.

View optional parameters

- In the **NUM\_INST\_OPTIMIZATION\_STEPS** field, enter the number of
 iterations that the Vertex AI prompt optimizer uses in
 instruction optimization mode. The runtime increases linearly as you
 increase this value. Must be an integer between `10` and `20`. If left
 unset, the default is `10`.
- In the **NUM\_TEMPLATES\_PER\_STEP** field, enter the number of system
 instructions that the Vertex AI prompt optimizer generates
 and evaluates. Used with `instruction` and `instruction_and_demo`
 optimization mode. Must be an integer between `1` and `4`. If left
 unset, the default is `2`.
- In the **NUM\_DEMO\_OPTIMIZATION\_STEPS** field, enter the number of
 demonstrations that the Vertex AI prompt optimizer evaluates.
 Used with `demonstration` and `instruction_and_demo` optimization mode.
 Must be an integer between `10` and `30`. If left unset, the default is
 `10`.
- In the **NUM\_DEMO\_PER\_PROMPT** field, enter the number of
 demonstrations generated per prompt. Must be an integer between `3` and
 `6`. If left unset, the default is `3`.
- In the **TARGET\_MODEL\_QPS** field, enter the queries per second (QPS)
 that the Vertex AI prompt optimizer sends to the target model.
 The runtime decreases linearly as you increase this value. Must be a
 float that is `3.0` or greater, but less than the QPS quota you have
 on the target model. If left unset, the default is `3.0`.
- In the **SOURCE\_MODEL\_QPS** field, enter the queries per second
 (QPS) that the Vertex AI prompt optimizer sends to the
 source model. Must be a float that is `3.0` or greater, but less
 than the QPS quota you have on the source model. If left unset, the
 default is `3.0`.
- In the **EVAL\_QPS** field, enter the queries per second (QPS)
 that the Vertex AI prompt optimizer sends to the evaluation
 model, `gemini-1.5-pro`.
 - For model based metrics, must be a float that is `3.0` or
 greater, but less than the quota you have for
 `gemini-1.5-pro`. If left unset, the default is `3.0`.
 - For custom metrics, must be a float that is `3.0` or greater. This
 determines the rate at which the Vertex AI prompt
 optimizer calls your custom metric Cloud Run functions.
- If you want to use more than one evaluation metric, do the following:
 1. In the **EVAL\_METRIC\_1** field, enter an evaluation metric that you
 want to use.
 2. In the **EVAL\_METRIC\_1\_WEIGHT** field, enter the weight that you
 want the Vertex AI prompt optimizer to use when it runs
 the optimization.
 3. In the **EVAL\_METRIC\_2** field, enter an evaluation metric that you
 want to use.
 4. In the **EVAL\_METRIC\_2\_WEIGHT** field, enter the weight that you
 want the Vertex AI prompt optimizer to use when it runs
 the optimization.
 5. In the **EVAL\_METRIC\_3** field, optionally enter an evaluation
 metric that you want to use.
 6. In the **EVAL\_METRIC\_3\_WEIGHT** field, optionally enter
 7. In the **METRIC\_AGGREGATION\_TYPE** field, enter the weight that you
 want the Vertex AI prompt optimizer to use when it runs
 the optimization.
- In the **PLACEHOLDER\_TO\_VALUE** field, enter the information that
 replaces any variables in the system instructions. Information included
 within this flag is not optimized by the Vertex AI prompt
 optimizer.
- In the **RESPONSE\_MIME\_TYPE** field, enter the
 [MIME response type](https://cloud.google.com/vertex-ai/generative-ai/docs/samples/generativeaionvertexai-gemini-controlled-generation-response-schema)
 that the target model uses. Must be one of `text/plain` or
 `application/json`. If left unset, the default is `text/plain`.
- In the **TARGET\_LANGUAGE** field, enter the language of the system
 instructions. If left unset, the default is English.

If you want to run the Vertex AI prompt optimizer through the
SDK, create a Create a JSON file with the parameters you want to use to
optimize prompts by doing the following:

1. Create a JSON file with the parameters that you want to use to optimize
 your prompts. Each configuration file requires the following parameters:

 ```python
 {
 "project": "PROJECT_ID",
 "system_instruction_path": "SYSTEM_INSTRUCTION_PATH",
 "prompt_template_path": "PROMPT_TEMPLATE_PATH",
 "target_model": "TARGET_MODEL",
 EVALUATION_METRIC_PARAMETERS,
 "optimization_mode": "OPTIMIZATION_MODE",
 "input_data_path": "SAMPLE_PROMPT_URI",
 "output_path": "OUTPUT_URI"
 }

 ```

 Replace the following:

 - `PROJECT_ID`: your project ID.
 - `SYSTEM_INSTRUCTION_PATH`: the URI for the
 system instructions in your Cloud Storage bucket. For example,
 `gs://bucket-name/system-instruction.txt`.
 - `PROMPT_TEMPLATE`: the URI for the
 prompt template in your Cloud Storage bucket. For example,
 `gs://bucket-name/prompt-template.txt`
 - `TARGET_MODEL`: the
 [model](../models.md) that you want to optimize
 prompts for use with.
 - `EVALUATION_METRIC_PARAMETERS`: the parameter(s)
 you specify depend on how many evaluation metrics you're using, and
 whether your metric(s) are standard or custom:

 [Single standard metric](#single-standard-metric) [Single custom metric](#single-custom-metric) [Multiple standard metrics](#multiple-standard-metrics) 
 More

 [Multiple standard & custom metrics](#multiple-standard--custom-metrics)

 If you're using a single
 [supported evaluation metric](#supported-evaluation-metrics),
 use the following parameter:

 ```python
 "eval_metric": "EVALUATION_METRIC",
 
 ```

 Replace `EVALUATION_METRIC` with the
 [evaluation metric](#supported-evaluation-metrics) that you
 want to optimize your prompts for.

 If you're using a single
 [custom evaluation metric](#evaluation-metric), use the
 following parameters:

 ```python
 "eval_metric": "custom_metric",
 "custom_metric_name": "CUSTOM_METRIC_NAME",
 "custom_metric_cloud_function_name": "FUNCTION_NAME",

 ```

 Replace the following:

 - `CUSTOM_METRIC_NAME`: the metric name, as defined
 by the key that corresponds with the `final_score`. For example,
 `custom_accuracy`.
 - `FUNCTION_NAME`: the name of the
 Cloud Run function that you previously deployed.

 If you're using multiple
 [supported evaluation metrics](#supported-evaluation-metrics),
 use the following parameters:

 ```python
 "eval_metrics_types": [EVALUATION_METRIC_LIST],
 "eval_metrics_weights": [EVAL_METRICS_WEIGHTS],
 "aggregation_type": "METRIC_AGGREGATION_TYPE",

 ```

 Replace the following:

 - `EVALUATION_METRIC_LIST`: a list of
 evaluation metrics. Must be an array. For example,
 `"bleu", "summarization_quality"`.
 - `EVAL_METRICS_WEIGHTS`: the weight for
 each metric. Must be an array.
 - `METRIC_AGGREGATION_TYPE`: the type of
 aggregation used for the evaluation metrics. Must be one of
 `weighted_sum` or `weighted_average`. If left unset, the
 default is `weighted_sum`.

 If you're using multiple evaluation metrics that include a mix
 of a custom metric and standard metric(s), use the following
 parameters:

 **Note:** Only one of the metrics that you use can be a custom
 metric. The others must be standard metrics.

 ```python
 "eval_metrics_types": ["custom_metric", EVALUATION_METRIC_LIST],
 "eval_metrics_weights": [EVAL_METRICS_WEIGHTS],
 "aggregation_type": "METRIC_AGGREGATION_TYPE",
 "custom_metric_name": "CUSTOM_METRIC_NAME",
 "custom_metric_cloud_function_name": "FUNCTION_NAME",

 ```

 Replace the following:

 - `EVALUATION_METRIC_LIST`: a list of
 the standard evaluation metrics. Must be an array. For
 example, `"bleu", "summarization_quality"`.
 - `EVAL_METRICS_WEIGHTS`: the weight for
 each metric. Must be an array.
 - `METRIC_AGGREGATION_TYPE`: the type of
 aggregation used for the evaluation metrics. Must be one of
 `weighted_sum` or `weighted_average`. If left unset, the
 default is `weighted_sum`.
 - `CUSTOM_METRIC_NAME`: the metric name,
 as defined by the key that corresponds with the `final_score`.
 For example, `custom_accuracy`.
 - `FUNCTION_NAME`: the name of the
 Cloud Run function that you previously deployed.
 - `OPTIMIZATION_MODE`: the optimization mode. Must
 be one of `instruction`, `demonstration`, or `instruction_and_demo`.
 - `SAMPLE_PROMPT_URI`: the URI for the sample
 prompts in your Cloud Storage bucket. For example,
 `gs://bucket-name/sample-prompts.jsonl`.
 - `OUTPUT_URI`: the URI for the Cloud Storage
 bucket where you want the Vertex AI prompt optimizer
 to write the optimized system instructions and/or few shot examples.
 For example, `gs://bucket-name/output-path`.
2. You can additionally add any of the optional parameters to your
 configuration file.

 Optional parameters are broken down into 5 categories:

 - **Optimization process parameters.** These parameters control the
 overall optimization process, including its duration and the number of
 optimization iterations it runs, which directly impacts the quality of
 optimizations.
 - **Model selection and location parameters.** These parameters specify
 which models the Vertex AI prompt optimizer uses and the
 locations it uses those models in.
 - **Latency (QPS) parameters.** These parameters control QPS, impacting
 the speed of the optimization process.
 - **Other.** Other parameters that control the structure and content of
 prompts.

 View optional parameters

 ```python
 "num_steps": NUM_INST_OPTIMIZATION_STEPS,
 "num_template_eval_per_step": NUM_TEMPLATES_PER_STEP,
 "num_demo_set_candidates": "NUM_DEMO_OPTIMIZATION_STEPS,
 "demo_set_size": NUM_DEMO_PER_PROMPT,
 "target_model_location": "TARGET_MODEL_LOCATION",
 "source_model": "SOURCE_MODEL",
 "source_model_location": "SOURCE_MODEL_LOCATION",
 "target_model_qps": TARGET_MODEL_QPS,
 "eval_qps": EVAL_QPS,
 "source_model_qps": SOURCE_MODEL_QPS,
 "response_mime_type": "RESPONSE_MIME_TYPE",
 "language": "TARGET_LANGUAGE",
 "placeholder_to_content": "PLACEHOLDER_TO_CONTENT",
 "data_limit": DATA_LIMIT

 ```

 Replace the following:

 - Optimization process parameters:

 - `NUM_INST_OPTIMIZATION_STEPS`: the number of
 iterations that the Vertex AI prompt optimizer uses in
 instruction optimization mode. The runtime increases linearly as you
 increase this value. Must be an integer between `10` and `20`. If
 left unset, the default is `10`.
 - `NUM_TEMPLATES_PER_STEP`: the number of system
 instructions that the Vertex AI prompt optimizer generates
 and evaluates. Used with `instruction` and `instruction_and_demo`
 optimization mode. Must be an integer between `1` and `4`. If left
 unset, the default is `2`.
 - `NUM_DEMO_OPTIMIZATION_STEPS`: the number of
 demonstrations that the Vertex AI prompt optimizer
 evaluates. Used with `demonstration` and `instruction_and_demo`
 optimization mode. Must be an integer between `10` and `30`. If left
 unset, the default is `10`.
 - `NUM_DEMO_PER_PROMPT`: the number of
 demonstrations generated per prompt. Must be an integer between `3`
 and `6`. If left unset, the default is `3`.
 - Model selection and location parameters:

 - `TARGET_MODEL_LOCATION`: the
 [location](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations) that you want to run
 the target model in. If left unset, the default is `us-central1`.
 - `SOURCE_MODEL`: the
 [Google model](../models.md) that the system
 instructions and prompts were previously used with. When the
 `source_model` parameter is set, the Vertex AI runs your
 sample prompts on the source model to generate the ground truth
 responses for you, for evaluation metrics that require ground truth
 responses. If you didn't previously run your prompts with a Google
 model or you didn't achieve your target results, add ground truth
 responses to your prompt instead. For more information, see the
 [Create a prompt and system instructions](#template-si) section of
 this document.
 - `SOURCE_MODEL_LOCATION`: the
 [location](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations) that you want to run
 the source model in. If left unset, the default is `us-central1`.
 - Latency (QPS) parameters:

 **Note:** You must set a QPS that is lower than or equal to the QPM quota
 that is available to you, or your job will fail. To convert QPM quota
 to QPS, divide your QPM by 60. For example, a QPM quota of 600 is
 equivalent to a QPS of 600 (`600/10 = 60`).
 - `TARGET_MODEL_QPS`: the queries per second
 (QPS) that the Vertex AI prompt optimizer sends to the
 target model. The runtime decreases linearly as you increase this
 value. Must be a float that is `3.0` or greater, but less than the
 QPS quota you have on the target model. If left unset, the default is
 `3.0`.
 - `EVAL_QPS`: the queries per second (QPS)
 that the Vertex AI prompt optimizer sends to the evaluation
 model, `gemini-1.5-pro`.
 - For model based metrics, must be a float that is `3.0` or
 greater, but less than the quota you have for
 `gemini-1.5-pro`. If left unset, the default is `3.0`.
 - For custom metrics, must be a float that is `3.0` or greater. This
 determines the rate at which the Vertex AI prompt
 optimizer calls your custom metric Cloud Run functions.
 - `SOURCE_MODEL_QPS`: the queries per second
 (QPS) that the Vertex AI prompt optimizer sends to the
 source model. Must be a float that is `3.0` or greater, but less
 than the QPS quota you have on the source model. If left unset, the
 default is `3.0`.
 - Other parameters:

 - `RESPONSE_MIME_TYPE`: the
 [MIME response type](https://cloud.google.com/vertex-ai/generative-ai/docs/samples/generativeaionvertexai-gemini-controlled-generation-response-schema)
 that the target model uses. Must be one of `text/plain` or
 `application/json`. If left unset, the default is `text/plain`.
 - `TARGET_LANGUAGE`: the language of the system
 instructions. If left unset, the default is English.
 - `PLACEHOLDER_TO_CONTENT`: the information that
 replaces any variables in the system instructions. Information
 included within this flag is not optimized by the Vertex AI
 prompt optimizer.
 - `DATA_LIMIT`: the amount of data used for
 validation. The runtime increases linearly with this value. Must be
 an integer between `5` and `100`. If left unset, the default is `100`.
3. [Upload the JSON file to a Cloud Storage bucket](https://cloud.google.com/storage/docs/uploading-objects).

### Run prompt optimizer

Run the Vertex AI prompt optimizer using one of the following options:

[Notebook](#notebook)[REST](#rest)[Python](#python)
More

Run the Vertex AI prompt optimizer through the notebook, by
doing the following:

1. In Colab Enterprise, open the Vertex AI prompt
 optimizer notebook.

 [Go to Vertex AI prompt optimizer notebook](https://console.cloud.google.com/vertex-ai/colab/notebooks)
2. In the **Run prompt optimizer** section, click
 play\_circle **Run
 cell**.

 The Vertex AI prompt optimizer runs.

Before using any of the request data,
make the following replacements:

- LOCATION: the location where you want to run the Vertex AI prompt
 optimizer.
- PROJECT\_ID: your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- JOB\_NAME: a name for the Vertex AI prompt optimizer job.
- PATH\_TO\_CONFIG: the URI of the configuration file in your Cloud Storage bucket.
 For example, `gs://bucket-name/configuration.json`.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/customJobs
```

Request JSON body:

```python
{
 "displayName": "JOB_NAME",
 "jobSpec": {
 "workerPoolSpecs": [
 {
 "machineSpec": {
 "machineType": "n1-standard-4"
 },
 "replicaCount": 1,
 "containerSpec": {
 "imageUri": "us-docker.pkg.dev/vertex-ai-restricted/builtin-algorithm/apd:preview_v1_0",
 "args": ["--config=PATH_TO_CONFIG""]
 }
 }
 ]
 }
}

```

To send your request, choose one of these options:

[curl](#curl)[PowerShell](#powershell)
More

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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/customJobs"
```

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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/customJobs" | Select-Object -Expand Content
```

The response looks similar to the following:

#### Response

```python
{
 "name": "projects/PROJECT_ID/locations/LOCATION/customJobs/JOB_ID",
 "displayName": "JOB_NAME",
 "jobSpec": {
 "workerPoolSpecs": [
 {
 "machineSpec": {
 "machineType": "n1-standard-4"
 },
 "replicaCount": "1",
 "diskSpec": {
 "bootDiskType": "pd-ssd",
 "bootDiskSizeGb": 100
 },
 "containerSpec": {
 "imageUri": "us-docker.pkg.dev/vertex-ai-restricted/builtin-algorithm/apd:preview_v1_0"
 "args": [
 "--config=https://storage.mtls.cloud.google.com/testing-apd/testing-config.json"
 ]
 }
 }
 ]
 },
 "state": "JOB_STATE_PENDING",
 "createTime": "2020-09-15T19:09:54.342080Z",
 "startTime": "2020-09-15T19:13:42.991045Z",
}

```

Before trying this sample, follow the Python setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Python API
reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

```python
from google.cloud import aiplatform

# Initialize Vertex AI platform
aiplatform.init(project=PROJECT_ID, location="us-central1")

# TODO(Developer): Check and update lines below
# cloud_bucket = "gs://cloud-samples-data"
# config_path = f"{cloud_bucket}/instructions/sample_configuration.json"
# output_path = "custom_job/output/"

custom_job = aiplatform.CustomJob(
 display_name="Prompt Optimizer example",
 worker_pool_specs=[
 {
 "replica_count": 1,
 "container_spec": {
 "image_uri": "us-docker.pkg.dev/vertex-ai-restricted/builtin-algorithm/apd:preview_v1_0",
 "args": [f"--config={cloud_bucket}/{config_path}"],
 },
 "machine_spec": {
 "machine_type": "n1-standard-4",
 },
 }
 ],
 staging_bucket=cloud_bucket,
 base_output_dir=f"{cloud_bucket}/{output_path}",
)

custom_job.submit()
print(f"Job resource name: {custom_job.resource_name}")
# Example response:
# 'projects/123412341234/locations/us-central1/customJobs/12341234123412341234'
```

### Analyze results and iterate

After you run the Vertex AI prompt optimizer review the job's progress
using one of the following options:

[Notebook](#notebook) [Console](#console) 
More

If you want to view the results of the Vertex AI prompt optimizer
through the notebook, do the following:

1. Open the [Vertex AI prompt optimizer notebook](https://colab.sandbox.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_ui.ipynb).
2. In the **Inspect the results** section, do the following:

 1. In the **RESULT\_PATH** field, add the URI of the Cloud Storage
 bucket that you configured the Vertex AI prompt optimizer to
 write results to. For example, `gs://bucket-name/output-path`.
 2. Click play\_circle
 **Run cell**.

1. In the Google Cloud console, in the Vertex AI section, go
 to the **Training pipelines** page.

 [Go to Training pipelines](https://console.cloud.google.com/vertex-ai/training/training-pipelines)
2. Click the **Custom jobs** tab. Vertex AI prompt optimizer's
 custom training job appears in the list along with its status.

When the job is finished, review the optimizations by doing the following:

1. In the Google Cloud console, go to the Cloud Storage **Buckets**
 page:

 [Go to Buckets](https://console.cloud.google.com/storage/browser)
2. Click the name of your Cloud Storage bucket.
3. Navigate to the folder that has the same name as the optimization mode
 you used to evaluate the prompts, either `instruction` or
 `demonstration`. If you used `instruction_and_demo` mode, both folders
 appear. The `instruction` folder contains the results from the system
 instruction optimization, while the `demonstration` folder contains the
 results from the `demonstration` optimization and the optimized system
 instructions.

 The folder contains the following files:

 - `config.json`: the complete configuration that the Vertex AI
 prompt optimizer used.
 - `templates.json`: each set of system instructions and/or few shot
 examples that the Vertex AI prompt optimizer generated and
 their evaluation score.
 - `eval_results.json`: the target model's response for each sample prompt
 for each set of generated system instructions and/or few shot examples
 and their evaluation score.
 - `optimized_results.json`: the best performing system instructions
 and/or few shot examples and their evaluation score.
4. To view the optimized system instructions, view the
 `optimized_results.json` file.

## What's next

- Try the
 [Vertex AI prompt optimizer SDK notebook](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/prompt_optimizer/vertex_ai_prompt_optimizer_sdk.ipynb).
- Learn about
 [responsible AI best practices and Vertex AI's safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).
- Learn more about
 [prompting strategies](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies).
- Explore examples of prompts in the
 [Prompt gallery](https://cloud.google.com/vertex-ai/generative-ai/docs/prompt-gallery).

Was this helpful?