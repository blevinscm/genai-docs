---
title: Define-your-evaluation-metricsbookmark_borderbookmarkStay-organized-with-collectionsSave-and-categor
source: https://cloud.google.com/vertex-ai/generative-ai/docs/models/determine-eval
date_scraped: 2025-05-12
---

# Define your evaluation metrics bookmark\_borderbookmark 

The first step to evaluate your generative models or applications is to identify your evaluation goal and define your evaluation metrics. This page provides an overview of concepts related to defining evaluation metrics for your use case.

## Overview

Generative AI models can be used to create applications for a wide range of tasks, such as summarizing news articles, responding to customer inquiries, or assisting with code writing. The Gen AI evaluation service in Vertex AI lets you evaluate any model with explainable metrics.

For example, you might be developing an application to summarize articles. To evaluate your application's performance on that specific task, consider the criteria you would like to measure and the metrics that you would use to score them:

- **Criteria**: Single or multiple dimensions you would like to evaluate upon, such as `conciseness`, `relevance`, `correctness`, or `appropriate choice of words`.
- **Metrics**: A single score that measures the model output against criteria.

The Gen AI evaluation service provides two major types of metrics:

- [**Model-based metrics**](#model-based-metrics): Our model-based metrics assess your candidate model against a judge model. The judge model for most use cases is Gemini, but you can also use models such as [MetricX](https://github.com/google-research/metricx) or [COMET](https://huggingface.co/Unbabel/wmt22-comet-da) for translation use cases.

 You can measure model-based metrics [pairwise or pointwise](#pointwise-pairwise):

 - **Pointwise metrics**: Let the judge model assess the candidate model's output based on the evaluation criteria. For example, the score could be 0~5, where 0 means the response does not fit the criteria, while 5 means the response fits the criteria well.
 - **Pairwise metrics**: Let the judge model compare the responses of two models and pick the better one. This is often used when comparing a candidate model with the baseline model. Pairwise metrics are only supported with Gemini as a judge model.
- [**Computation-based metrics**](#computation-based-metrics): These metrics are computed using mathematical formulas to compare the model's output against a ground truth or reference. Commonly used computation-based metrics include ROUGE and BLEU.

You can use computation-based metrics standalone, or together with model-based metrics. Use the following table to decide when to use model-based or computation-based metrics:

| | Evaluation approach | Data | Cost and speed |
| --- | --- | --- | --- |
| [Model-based metrics](#model-based-metrics) | Use a judge model to assess performance based on descriptive evaluation criteria | Ground truth is optional | Slightly more expensive and slower |
| [Computation-based metrics](#computation-based-metrics) | Use mathematical formulas to assess performance | Ground truth is usually required | Low cost and fast |

To get started, see [Prepare your dataset](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-dataset) and [Run evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/run-evaluation).

## Define your model-based metrics

Model-based evaluation involves using a machine learning model as a judge model to evaluate the outputs of the candidate model.

Proprietary Google judge models, such as Gemini, are calibrated with human raters to ensure their quality. They are managed and available out of the box. The process of model-based evaluation varies based on the evaluation metrics you provide.

Model-based evaluation follows this process:

1. **Data preparation**: You provide evaluation data in the form of input prompts. The candidate models receive the prompts and generate corresponding responses.
2. **Evaluation**: The evaluation metrics and generated responses are sent to the judge model. The judge model evaluates each response individually, providing a row-based assessment.
3. **Aggregation and explanation**: Gen AI evaluation service aggregates these individual assessments into an overall score. The output also includes [chain-of-thought](https://developers.google.com/machine-learning/glossary#chain-of-thought-prompting) explanations for each judgment, outlining the rationale behind the selection.

Gen AI evaluation service offers the following options to set up your model-based metrics with the Vertex AI SDK:

| Option | Description | Best for |
| --- | --- | --- |
| Use an existing example | Use a prebuilt metric prompt template to get started. | Common use cases, time-saving |
| Define metrics with our templated interface | Get guided assistance in defining your metrics. Our templated interface provides structure and suggestions. | Customization with support |
| Define metrics from scratch | Have complete control over your metric definitions. | Ideal for highly specific use cases. Requires more technical expertise and time investment. |

As an example, you might want to develop a generative AI application that returns fluent and entertaining responses. For this application, you can define two criteria for evaluation using the templated interface:

- **Fluency**: Sentences flow smoothly, avoiding awkward phrasing or run-on sentences. Ideas and sentences connect logically, using transitions effectively where needed.
- **Entertainment**: Short, amusing text that incorporates emoji, exclamations, and questions to convey quick and spontaneous communication and diversion.

To turn those two criteria into a metric, you want an overall score ranging from -1 ~ 1 called `custom_text_quality`. You can define a metric like this:

```python
# Define a pointwise metric with two criteria: Fluency and Entertaining.
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

For a complete list of metric prompt templates, see [Metric prompt templates for evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates).

### Evaluate translation models

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

The [Gen AI evaluation service](evaluation-overview.md) offers the following translation task evaluation metrics:

- [MetricX](https://github.com/google-research/metricx)
- [COMET](https://huggingface.co/Unbabel/wmt22-comet-da)
- BLEU

MetricX and COMET are pointwise model-based metrics that have been trained for translation tasks. You can evaluate the quality and accuracy of translation model results for your content, whether they are outputs of NMT, TranslationLLM, or Gemini models.

You can also use Gemini as a judge model to evaluate your model for fluency, coherence, verbosity and text quality in combination with MetricX, COMET or BLEU.

- MetricX is an error-based metric developed by Google that predicts a floating point score between 0 and 25 representing the quality of a translation. MetricX is available both as a referenced-based and reference-free (QE) method. When you use this metric, a lower score is a better score, because it means there are fewer errors.
- COMET employs a reference-based regression approach that provides scores ranging from 0 to 1, where 1 signifies a perfect translation.
- BLEU (Bilingual Evaluation Understudy) is a [computation-based metric](determine-eval.md). The BLEU score indicates how similar the candidate text is to the reference text. A BLEU score value that is closer to one indicates that a translation is closer to the reference text.

Note that BLEU scores are not recommended for comparing across different corpora and languages. For example, an English to German BLEU score of 50 is not comparable to a Japanese to English BLEU score of 50. Many translation experts have shifted to model-based metric approaches, which have higher correlation with human ratings and are more granular in identifying error scenarios.

To learn how to run evaluations for translation models, see [Evaluate a translation model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/run-evaluation#translation).

### Choose between pointwise or pairwise evaluation

Use the following table to decide when you want to use pointwise or pairwise evaluation:

| | Definition | When to use | Example use cases |
| --- | --- | --- | --- |
| Pointwise evaluation | Evaluate one model and generate scores based on the criteria | - When you need a score for each model being evaluated. - When it not difficult to define the rubric for each score. | - Understanding how your model behaves in production. - Explore strengths and weaknesses of a single model. - Identifying which behaviors to focus on when tuning. - Getting the baseline performance of a model. |
| Pairwise evaluation | Compare two models against each other, generating a preference based on the criteria | - When you want to compare two models and a score is not necessary. - When the score rubric for pointwise is difficult to define. For example, it may be difficult to define the rubric for 1~5 for pointwise text quality, but not as difficult to compare two models and output a preference directly. | - Determining which model to put into production. - Choose between model types. For example, Gemini-Pro versus Claude 3. - Choose between different prompts. - Determines if tuning made improvements to a baseline model. |

## Computation-based metrics

Computation-based metrics compare whether the LLM-generated results are
consistent with a ground-truth dataset of input and output pairs. The commonly
used metrics can be categorized into the following groups:

- **Lexicon-based metrics**: Use math to calculate the string
 similarities between LLM-generated results and ground
 truth, such as `Exact Match` and `ROUGE`.
- **Count-based metrics**: Aggregate the number of rows that hit or miss certain
 ground-truth labels, such as `F1-score`, `Accuracy`, and `Tool Name Match`.
- **Embedding-based metrics**: Calculate the distance between the LLM-generated
 results and ground truth in the embedding space, reflecting their level of
 similarity.

### General text generation

The following metrics help you to evaluate the model's ability to ensure the
responses are useful, safe, and effective for your users.

[Exact match](#exact-match) [BLEU](#bleu) [ROUGE](#rouge) 
More

The `exact_match` metric computes whether a model response
matches a reference exactly.

- **Token limit**: None

#### Evaluation criteria

Not applicable.

#### Metric input parameters

| Input parameter | Description |
| --- | --- |
| `response` | The LLM response. |
| `reference` | The golden LLM response for reference. |

#### Output scores

| Value | Description |
| --- | --- |
| 0 | Not matched |
| 1 | Matched |

The `bleu` (BiLingual Evaluation Understudy) metric holds the
result of an algorithm for evaluating the quality of the response, which has
been translated from one natural language to another natural language. The
quality of the response is considered to be the correspondence between a
`response` parameter and its `reference` parameter.

- **Token limit**: None

#### Evaluation criteria

Not applicable.

#### Metric input parameters

| Input parameter | Description |
| --- | --- |
| `response` | The LLM response. |
| `reference` | The golden LLM response for the reference. |

#### Output scores

| Value | Description |
| --- | --- |
| A float in the range of [0,1] | Higher scores indicate better translations. A score of `1` represents a perfect match to the `reference`. |

The `ROUGE` metric is used to compare the provided
`response` parameter against a `reference` parameter.
All `rouge` metrics return the F1 score. `rouge-l-sum` is calculated by default,
but you can [specify the `rouge`
variant](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/evaluation#rougeinput)
that you want to use.

- **Token limit**: None

#### Evaluation criteria

Not applicable

#### Metric input parameters

| Input parameter | Description |
| --- | --- |
| `response` | The LLM response. |
| `reference` | The golden LLM response for the reference. |

#### Output scores

| Value | Description |
| --- | --- |
| A float in the range of [0,1] | A score closer to `0` means poor similarity between `response` and `reference`. A score closer to `1` means strong similarity between `response` and `reference`. |

### Tool use and function calling

The following metrics help you to evaluate the model's ability to predict a
valid [tool (function) call](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling).

[Call valid](#call-valid) [Name match](#name-match) [Parameter key match](#parameter-key-match) [Parameter KV match](#parameter-kv-match) 
More

The `tool_call_valid` metric describes the model's ability to
predict a valid tool call. Only the first tool call is
inspected.

- **Token limit**: None

#### Evaluation criteria

| Evaluation criterion | Description |
| --- | --- |
| Validity | The model's output contains a valid tool call. |
| Formatting | A JSON dictionary contains the `name` and `arguments` fields. |

#### Metric input parameters

| Input parameter | Description |
| --- | --- |
| `prediction` | The candidate model output, which is a JSON serialized string that contains `content` and `tool_calls` keys. The `content` value is the text output from the model. The `tool_calls` value is a JSON serialized string of a list of tool calls. Here is an example: `{"content": "", "tool_calls": [{"name": "book_tickets", "arguments": {"movie": "Mission Impossible Dead Reckoning Part 1", "theater":"Regal Edwards 14", "location": "Mountain View CA", "showtime": "7:30", "date": "2024-03-30","num_tix": "2"}}]}` |
| `reference` | The ground-truth reference prediction, which follows the same format as `prediction`. |

#### Output scores

| Value | Description |
| --- | --- |
| 0 | Invalid tool call |
| 1 | Valid tool call |

The `tool_name_match` metric describes the model's ability to predict
a tool call with the correct tool name. Only the first tool call is inspected.

- **Token limit**: None

#### Evaluation criteria

| Evaluation criterion | Description |
| --- | --- |
| Name matching | The model-predicted tool call matches the reference tool call's name. |

#### Metric input parameters

| Input parameter | Description |
| --- | --- |
| `prediction` | The candidate model output, which is a JSON serialized string that contains `content` and `tool_calls` keys. The `content` value is the text output from the model. The `tool_call` value is a JSON serialized string of a list of tool calls. Here is an example: `{"content": "","tool_calls": [{"name": "book_tickets", "arguments": {"movie": "Mission Impossible Dead Reckoning Part 1", "theater":"Regal Edwards 14", "location": "Mountain View CA", "showtime": "7:30", "date": "2024-03-30","num_tix": "2"}}]}` |
| `reference` | The ground-truth reference prediction, which follows the same format as the `prediction`. |

#### Output scores

| Value | Description |
| --- | --- |
| 0 | Tool call name doesn't match the reference. |
| 1 | Tool call name matches the reference. |

The `tool_parameter_key_match` metric describes the model's ability to
predict a tool call with the correct parameter names.

- **Token limit**: None

#### Evaluation criteria

| Evaluation criterion | Description |
| --- | --- |
| Parameter matching ratio | The ratio between the number of predicted parameters that match the parameter names of the reference tool call and the total number of parameters. |

#### Metric input parameters

| Input parameter | Description |
| --- | --- |
| `prediction` | The candidate model output, which is a JSON serialized string that contains the `content` and `tool_calls` keys. The `content` value is the text output from the model. The `tool_call` value is a JSON serialized string of a list of tool calls. Here is an example: `{"content": "", "tool_calls": [{"name": "book_tickets", "arguments": {"movie": "Mission Impossible Dead Reckoning Part 1", "theater":"Regal Edwards 14", "location": "Mountain View CA", "showtime": "7:30", "date": "2024-03-30","num_tix": "2"}}]}` |
| `reference` | The ground-truth reference model prediction, which follows the same format as `prediction`. |

#### Output scores

| Value | Description |
| --- | --- |
| A float in the range of [0,1] | The higher score of `1` means more parameters match the `reference` parameters' names. |

The `tool_parameter_kv_match` metric describes the model's ability to
predict a tool call with the correct parameter names and key values.

- **Token limit**: None

#### Evaluation criteria

| Evaluation criterion | Description |
| --- | --- |
| Parameter matching ratio | The ratio between the number of the predicted parameters that match both the parameter names and values of the reference tool call and the total number of parameters. |

#### Metric input parameters

| Input parameter | Description |
| --- | --- |
| `prediction` | The candidate model output, which is a JSON serialized string that contains `content` and `tool_calls` keys. The `content` value is the text output from the model. The `tool_call` value is a JSON serialized string of a list of tool calls. Here is an example: `{"content": "", "tool_calls": [{"name": "book_tickets", "arguments": {"movie": "Mission Impossible Dead Reckoning Part 1", "theater":"Regal Edwards 14", "location": "Mountain View CA", "showtime": "7:30", "date": "2024-03-30","num_tix": "2"}}]}` |
| `reference` | The ground-truth reference prediction, which follows the same format as `prediction`. |

#### Output scores

| Value | Description |
| --- | --- |
| A float in the range of [0,1] | The higher score of `1` means more parameters match the `reference` parameters' names and values. |

In the generative AI evaluation service, you can [use computation-based metrics](https://cloud.google.com/vertex-ai/generative-ai/docs/models/run-evaluation) through the Vertex AI SDK for Python.

## Baseline evaluation quality for generative tasks

When evaluating the output of generative AI models, note that the evaluation process is inherently subjective, and the quality of evaluation can vary depending on the specific task and evaluation criteria. This subjectivity also applies to human evaluators. For more information about the challenges of achieving consistent evaluation for generative AI models, see [Judging LLM-as-a-Judge
with MT-Bench and Chatbot Arena](https://arxiv.org/pdf/2306.05685) and [Learning to summarize from human feedback](https://arxiv.org/pdf/2009.01325).

## What's next

- Find a [model-based metrics template](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates).
- [Prepare your evaluation dataset](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-dataset).
- [Run an evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/run-evaluation).
- Try an
 [evaluation example notebook](evaluation-overview.md).

Was this helpful?