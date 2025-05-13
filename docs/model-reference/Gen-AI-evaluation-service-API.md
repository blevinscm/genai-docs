---
title: Gen-AI-evaluation-service-APIgoogle.com/vertex-ai/generative-ai/docs/model-reference/evaluation
date_scraped: 2025-05-12
---

# Gen AI evaluation service API 

The Gen AI evaluation service lets you evaluate
your large language models (LLMs) across several metrics with your own criteria.
You can provide inference-time inputs, LLM responses and additional
parameters, and the Gen AI evaluation service returns metrics specific to the
evaluation task.

Metrics include model-based metrics, such as `PointwiseMetric` and `PairwiseMetric`, and in-memory
computed metrics, such as `rouge`, `bleu`, and tool function-call metrics.
`PointwiseMetric` and `PairwiseMetric` are generic model-based metrics that
you can customize with your own criteria.
Because the service takes the prediction results directly from models as input,
the evaluation service can perform both inference and subsequent evaluation on
all models supported by
Vertex AI.

For more information on evaluating a model, see [Gen AI evaluation service overview](../models/evaluation-overview.md).

**Limitations**

The following are limitations of the evaluation service:

- The evaluation service may have a propagation delay in your first call.
- Most model-based metrics consume
 [gemini-2.0-flash quota](../quotas.md)
 because the Gen AI evaluation service leverages `gemini-2.0-flash` as the underlying
 judge model to compute these model-based metrics.
- Some model-based metrics, such as MetricX and COMET, use different
 machine learning models, so they don't consume
 [gemini-2.0-flash quota](../quotas.md).

**Note:** MetricX and COMET will be not be charged during preview. At GA, the pricing will be the same as all pointwise model based metrics.

## Example syntax

Syntax to send an evaluation call.

### curl

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \

https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}:evaluateInstances \
-d '{
 "pointwise_metric_input" : {
 "metric_spec" : {
 ...
 },
 "instance": {
 ...
 },
 }
}'
```

### Python

```python
import json

from google import auth
from google.api_core import exceptions
from google.auth.transport import requests as google_auth_requests

creds, _ = auth.default(
 scopes=['https://www.googleapis.com/auth/cloud-platform'])

data = {
 ...
}

uri = f'https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}:evaluateInstances'
result = google_auth_requests.AuthorizedSession(creds).post(uri, json=data)

print(json.dumps(result.json(), indent=2))
```

## Parameter list

| Parameters | |
| --- | --- |
| `exact_match_input` | Optional: `ExactMatchInput` Input to assess if the prediction matches the reference exactly. |
| `bleu_input` | Optional: `BleuInput` Input to compute BLEU score by comparing the prediction against the reference. |
| `rouge_input` | Optional: `RougeInput` Input to compute `rouge` scores by comparing the prediction against the reference. Different `rouge` scores are supported by `rouge_type`. |
| `fluency_input` | Optional: `FluencyInput` Input to assess a single response's language mastery. |
| `coherence_input` | Optional: `CoherenceInput` Input to assess a single response's ability to provide a coherent, easy-to-follow reply. |
| `safety_input` | Optional: `SafetyInput` Input to assess a single response's level of safety. |
| `groundedness_input` | Optional: `GroundednessInput` Input to assess a single response's ability to provide or reference information included only in the input text. |
| `fulfillment_input` | Optional: `FulfillmentInput` Input to assess a single response's ability to completely fulfill instructions. |
| `summarization_quality_input` | Optional: `SummarizationQualityInput` Input to assess a single response's overall ability to summarize text. |
| `pairwise_summarization_quality_input` | Optional: `PairwiseSummarizationQualityInput` Input to compare two responses' overall summarization quality. |
| `summarization_helpfulness_input` | Optional: `SummarizationHelpfulnessInput` Input to assess a single response's ability to provide a summarization, which contains the details necessary to substitute the original text. |
| `summarization_verbosity_input` | Optional: `SummarizationVerbosityInput` Input to assess a single response's ability to provide a succinct summarization. |
| `question_answering_quality_input` | Optional: `QuestionAnsweringQualityInput` Input to assess a single response's overall ability to answer questions, given a body of text to reference. |
| `pairwise_question_answering_quality_input` | Optional: `PairwiseQuestionAnsweringQualityInput` Input to compare two responses' overall ability to answer questions, given a body of text to reference. |
| `question_answering_relevance_input` | Optional: `QuestionAnsweringRelevanceInput` Input to assess a single response's ability to respond with relevant information when asked a question. |
| `question_answering_helpfulness_input` | Optional: `QuestionAnsweringHelpfulnessInput` Input to assess a single response's ability to provide key details when answering a question. |
| `question_answering_correctness_input` | Optional: `QuestionAnsweringCorrectnessInput` Input to assess a single response's ability to correctly answer a question. |
| `pointwise_metric_input` | Optional: `PointwiseMetricInput` Input for a generic pointwise evaluation. |
| `pairwise_metric_input` | Optional: `PairwiseMetricInput` Input for a generic pairwise evaluation. |
| `tool_call_valid_input` | Optional: `ToolCallValidInput` Input to assess a single response's ability to predict a valid tool call. |
| `tool_name_match_input` | Optional: `ToolNameMatchInput` Input to assess a single response's ability to predict a tool call with the right tool name. |
| `tool_parameter_key_match_input` | Optional: `ToolParameterKeyMatchInput` Input to assess a single response's ability to predict a tool call with correct parameter names. |
| `tool_parameter_kv_match_input` | Optional: `ToolParameterKvMatchInput` Input to assess a single response's ability to predict a tool call with correct parameter names and values |
| `comet_input` | Optional: `CometInput` Input to evaluate using [COMET](https://huggingface.co/Unbabel/wmt22-comet-da). |
| `metricx_input` | Optional: `MetricxInput` Input to evaluate using [MetricX](https://github.com/google-research/metricx). |

#### `ExactMatchInput`

```python
{
 "exact_match_input": {
 "metric_spec": {},
 "instances": [
 {
 "prediction": string,
 "reference": string
 }
 ]
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `ExactMatchSpec`. Metric spec, defining the metric's behavior. |
| `instances` | Optional: `ExactMatchInstance[]` Evaluation input, consisting of LLM response and reference. |
| `instances.prediction` | Optional: `string` LLM response. |
| `instances.reference` | Optional: `string` Golden LLM response for reference. |

#### `ExactMatchResults`

```python
{
 "exact_match_results": {
 "exact_match_metric_values": [
 {
 "score": float
 }
 ]
 }
}
```

| Output | |
| --- | --- |
| `exact_match_metric_values` | `ExactMatchMetricValue[]` Evaluation results per instance input. |
| `exact_match_metric_values.score` | `float` One of the following: - `0`: Instance was not an exact match - `1`: Exact match |

#### `BleuInput`

```python
{
 "bleu_input": {
 "metric_spec": {
 "use_effective_order": bool
 },
 "instances": [
 {
 "prediction": string,
 "reference": string
 }
 ]
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `BleuSpec` Metric spec, defining the metric's behavior. |
| `metric_spec.use_effective_order` | Optional: `bool` Whether to take into account n-gram orders without any match. |
| `instances` | Optional: `BleuInstance[]` Evaluation input, consisting of LLM response and reference. |
| `instances.prediction` | Optional: `string` LLM response. |
| `instances.reference` | Optional: `string` Golden LLM response for reference. |

#### `BleuResults`

```python
{
 "bleu_results": {
 "bleu_metric_values": [
 {
 "score": float
 }
 ]
 }
}
```

| Output | |
| --- | --- |
| `bleu_metric_values` | `BleuMetricValue[]` Evaluation results per instance input. |
| `bleu_metric_values.score` | `float`: `[0, 1]`, where higher scores mean the prediction is more like the reference. |

#### `RougeInput`

```python
{
 "rouge_input": {
 "metric_spec": {
 "rouge_type": string,
 "use_stemmer": bool,
 "split_summaries": bool
 },
 "instances": [
 {
 "prediction": string,
 "reference": string
 }
 ]
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `RougeSpec` Metric spec, defining the metric's behavior. |
| `metric_spec.rouge_type` | Optional: `string` Acceptable values: - `rougen[1-9]`: compute `rouge` scores based on the overlap of n-grams between the prediction and the reference. - `rougeL`: compute `rouge` scores based on the Longest Common Subsequence (LCS) between the prediction and the reference. - `rougeLsum`: first splits the prediction and the reference into sentences and then computes the LCS for each tuple. The final `rougeLsum` score is the average of these individual LCS scores. |
| `metric_spec.use_stemmer` | Optional: `bool` Whether Porter stemmer should be used to strip word suffixes to improve matching. |
| `metric_spec.split_summaries` | Optional: `bool` Whether to add newlines between sentences for rougeLsum. |
| `instances` | Optional: `RougeInstance[]` Evaluation input, consisting of LLM response and reference. |
| `instances.prediction` | Optional: `string` LLM response. |
| `instances.reference` | Optional: `string` Golden LLM response for reference. |

#### `RougeResults`

```python
{
 "rouge_results": {
 "rouge_metric_values": [
 {
 "score": float
 }
 ]
 }
}
```

| Output | |
| --- | --- |
| `rouge_metric_values` | `RougeValue[]` Evaluation results per instance input. |
| `rouge_metric_values.score` | `float`: `[0, 1]`, where higher scores mean the prediction is more like the reference. |

#### `FluencyInput`

```python
{
 "fluency_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `FluencySpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `FluencyInstance` Evaluation input, consisting of LLM response. |
| `instance.prediction` | Optional: `string` LLM response. |

#### `FluencyResult`

```python
{
 "fluency_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `1`: Inarticulate - `2`: Somewhat Inarticulate - `3`: Neutral - `4`: Somewhat fluent - `5`: Fluent |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `CoherenceInput`

```python
{
 "coherence_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `CoherenceSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `CoherenceInstance` Evaluation input, consisting of LLM response. |
| `instance.prediction` | Optional: `string` LLM response. |

#### `CoherenceResult`

```python
{
 "coherence_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `1`: Incoherent - `2`: Somewhat incoherent - `3`: Neutral - `4`: Somewhat coherent - `5`: Coherent |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `SafetyInput`

```python
{
 "safety_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `SafetySpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `SafetyInstance` Evaluation input, consisting of LLM response. |
| `instance.prediction` | Optional: `string` LLM response. |

#### `SafetyResult`

```python
{
 "safety_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `0`: Unsafe - `1`: Safe |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `GroundednessInput`

```python
{
 "groundedness_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "context": string
 }
 }
}
```

| | |
| --- | --- |
| **Parameter** | **Description** |
| `metric_spec` | Optional: GroundednessSpec Metric spec, defining the metric's behavior. |
| `instance` | Optional: GroundednessInstance Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `GroundednessResult`

```python
{
 "groundedness_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `0`: Ungrounded - `1`: Grounded |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `FulfillmentInput`

```python
{
 "fulfillment_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "instruction": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `FulfillmentSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `FulfillmentInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |

#### `FulfillmentResult`

```python
{
 "fulfillment_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `1`: No fulfillment - `2`: Poor fulfillment - `3`: Some fulfillment - `4`: Good fulfillment - `5`: Complete fulfillment |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `SummarizationQualityInput`

```python
{
 "summarization_quality_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "instruction": string,
 "context": string,
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `SummarizationQualitySpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `SummarizationQualityInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `SummarizationQualityResult`

```python
{
 "summarization_quality_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `1`: Very bad - `2`: Bad - `3`: Ok - `4`: Good - `5`: Very good |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `PairwiseSummarizationQualityInput`

```python
{
 "pairwise_summarization_quality_input": {
 "metric_spec": {},
 "instance": {
 "baseline_prediction": string,
 "prediction": string,
 "instruction": string,
 "context": string,
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `PairwiseSummarizationQualitySpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `PairwiseSummarizationQualityInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.baseline_prediction` | Optional: `string` Baseline model LLM response. |
| `instance.prediction` | Optional: `string` Candidate model LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `PairwiseSummarizationQualityResult`

```python
{
 "pairwise_summarization_quality_result": {
 "pairwise_choice": PairwiseChoice,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `pairwise_choice` | `PairwiseChoice`: Enum with possible values as follows: - `BASELINE`: Baseline prediction is better - `CANDIDATE`: Candidate prediction is better - `TIE`: Tie between Baseline and Candidate predictions. |
| `explanation` | `string`: Justification for pairwise\_choice assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `SummarizationHelpfulnessInput`

```python
{
 "summarization_helpfulness_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "instruction": string,
 "context": string,
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `SummarizationHelpfulnessSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `SummarizationHelpfulnessInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `SummarizationHelpfulnessResult`

```python
{
 "summarization_helpfulness_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `1`: Unhelpful - `2`: Somewhat unhelpful - `3`: Neutral - `4`: Somewhat helpful - `5`: Helpful |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `SummarizationVerbosityInput`

```python
{
 "summarization_verbosity_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "instruction": string,
 "context": string,
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `SummarizationVerbositySpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `SummarizationVerbosityInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `SummarizationVerbosityResult`

```python
{
 "summarization_verbosity_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`. One of the following: - `-2`: Terse - `-1`: Somewhat terse - `0`: Optimal - `1`: Somewhat verbose - `2`: Verbose |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `QuestionAnsweringQualityInput`

```python
{
 "question_answering_quality_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "instruction": string,
 "context": string,
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `QuestionAnsweringQualitySpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `QuestionAnsweringQualityInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `QuestionAnsweringQualityResult`

```python
{
 "question_answering_quality_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `1`: Very bad - `2`: Bad - `3`: Ok - `4`: Good - `5`: Very good |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `PairwiseQuestionAnsweringQualityInput`

```python
{
 "question_answering_quality_input": {
 "metric_spec": {},
 "instance": {
 "baseline_prediction": string,
 "prediction": string,
 "instruction": string,
 "context": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `QuestionAnsweringQualitySpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `QuestionAnsweringQualityInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.baseline_prediction` | Optional: `string` Baseline model LLM response. |
| `instance.prediction` | Optional: `string` Candidate model LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `PairwiseQuestionAnsweringQualityResult`

```python
{
 "pairwise_question_answering_quality_result": {
 "pairwise_choice": PairwiseChoice,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `pairwise_choice` | `PairwiseChoice`: Enum with possible values as follows: - `BASELINE`: Baseline prediction is better - `CANDIDATE`: Candidate prediction is better - `TIE`: Tie between Baseline and Candidate predictions. |
| `explanation` | `string`: Justification for `pairwise_choice` assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `QuestionAnsweringRelevanceInput`

```python
{
 "question_answering_quality_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "instruction": string,
 "context": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `QuestionAnsweringRelevanceSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `QuestionAnsweringRelevanceInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `QuestionAnsweringRelevancyResult`

```python
{
 "question_answering_relevancy_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `1`: Irrelevant - `2`: Somewhat irrelevant - `3`: Neutral - `4`: Somewhat relevant - `5`: Relevant |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `QuestionAnsweringHelpfulnessInput`

```python
{
 "question_answering_helpfulness_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "instruction": string,
 "context": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `QuestionAnsweringHelpfulnessSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `QuestionAnsweringHelpfulnessInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `QuestionAnsweringHelpfulnessResult`

```python
{
 "question_answering_helpfulness_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `1`: Unhelpful - `2`: Somewhat unhelpful - `3`: Neutral - `4`: Somewhat helpful - `5`: Helpful |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `QuestionAnsweringCorrectnessInput`

```python
{
 "question_answering_correctness_input": {
 "metric_spec": {
 "use_reference": bool
 },
 "instance": {
 "prediction": string,
 "reference": string,
 "instruction": string,
 "context": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `QuestionAnsweringCorrectnessSpec` Metric spec, defining the metric's behavior. |
| `metric_spec.use_reference` | Optional: `bool` If reference is used or not in the evaluation. |
| `instance` | Optional: `QuestionAnsweringCorrectnessInstance` Evaluation input, consisting of inference inputs and corresponding response. |
| `instance.prediction` | Optional: `string` LLM response. |
| `instance.reference` | Optional: `string` Golden LLM response for reference. |
| `instance.instruction` | Optional: `string` Instruction used at inference time. |
| `instance.context` | Optional: `string` Inference-time text containing all information, which can be used in the LLM response. |

#### `QuestionAnsweringCorrectnessResult`

```python
{
 "question_answering_correctness_result": {
 "score": float,
 "explanation": string,
 "confidence": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: One of the following: - `0`: Incorrect - `1`: Correct |
| `explanation` | `string`: Justification for score assignment. |
| `confidence` | `float`: `[0, 1]` Confidence score of our result. |

#### `PointwiseMetricInput`

```python
{
 "pointwise_metric_input": {
 "metric_spec": {
 "metric_prompt_template": string
 },
 "instance": {
 "json_instance": string,
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Required: `PointwiseMetricSpec` Metric spec, defining the metric's behavior. |
| `metric_spec.metric_prompt_template` | Required: `string` A prompt template defining the metric. It is rendered by the key-value pairs in instance.json\_instance |
| `instance` | Required: `PointwiseMetricInstance` Evaluation input, consisting of json\_instance. |
| `instance.json_instance` | Optional: `string` The key-value pairs in Json format. For example, {"key\_1": "value\_1", "key\_2": "value\_2"}. It is used to render metric\_spec.metric\_prompt\_template. |

#### `PointwiseMetricResult`

```python
{
 "pointwise_metric_result": {
 "score": float,
 "explanation": string,
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: A score for pointwise metric evaluation result. |
| `explanation` | `string`: Justification for score assignment. |

#### `PairwiseMetricInput`

```python
{
 "pairwise_metric_input": {
 "metric_spec": {
 "metric_prompt_template": string
 },
 "instance": {
 "json_instance": string,
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Required: `PairwiseMetricSpec` Metric spec, defining the metric's behavior. |
| `metric_spec.metric_prompt_template` | Required: `string` A prompt template defining the metric. It is rendered by the key-value pairs in instance.json\_instance |
| `instance` | Required: `PairwiseMetricInstance` Evaluation input, consisting of json\_instance. |
| `instance.json_instance` | Optional: `string` The key-value pairs in JSON format. For example, {"key\_1": "value\_1", "key\_2": "value\_2"}. It is used to render metric\_spec.metric\_prompt\_template. |

#### `PairwiseMetricResult`

```python
{
 "pairwise_metric_result": {
 "score": float,
 "explanation": string,
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: A score for pairwise metric evaluation result. |
| `explanation` | `string`: Justification for score assignment. |

#### `ToolCallValidInput`

```python
{
 "tool_call_valid_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "reference": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `ToolCallValidSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `ToolCallValidInstance` Evaluation input, consisting of LLM response and reference. |
| `instance.prediction` | Optional: `string` Candidate model LLM response, which is a JSON serialized string that contains `content` and `tool_calls` keys. The `content` value is the text output from the model. The `tool_call` value is a JSON serialized string of a list of tool calls. An example is: ```python { "content": "", "tool_calls": [ { "name": "book_tickets", "arguments": { "movie": "Mission Impossible Dead Reckoning Part 1", "theater": "Regal Edwards 14", "location": "Mountain View CA", "showtime": "7:30", "date": "2024-03-30", "num_tix": "2" } } ] } ``` |
| `instance.reference` | Optional: `string` Golden model output in the same format as prediction. |

#### `ToolCallValidResults`

```python
{
 "tool_call_valid_results": {
 "tool_call_valid_metric_values": [
 {
 "score": float
 }
 ]
 }
}
```

| Output | |
| --- | --- |
| `tool_call_valid_metric_values` | repeated `ToolCallValidMetricValue`: Evaluation results per instance input. |
| `tool_call_valid_metric_values.score` | `float`: One of the following: - `0`: Invalid tool call - `1`: Valid tool call |

#### `ToolNameMatchInput`

```python
{
 "tool_name_match_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "reference": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `ToolNameMatchSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `ToolNameMatchInstance` Evaluation input, consisting of LLM response and reference. |
| `instance.prediction` | Optional: `string` Candidate model LLM response, which is a JSON serialized string that contains `content` and `tool_calls` keys. The `content` value is the text output from the model. The `tool_call` value is a JSON serialized string of a list of tool calls. |
| `instance.reference` | Optional: `string` Golden model output in the same format as prediction. |

#### `ToolNameMatchResults`

```python
{
 "tool_name_match_results": {
 "tool_name_match_metric_values": [
 {
 "score": float
 }
 ]
 }
}
```

| Output | |
| --- | --- |
| `tool_name_match_metric_values` | repeated `ToolNameMatchMetricValue`: Evaluation results per instance input. |
| `tool_name_match_metric_values.score` | `float`: One of the following: - `0`: Tool call name doesn't match the reference. - `1`: Tool call name matches the reference. |

#### `ToolParameterKeyMatchInput`

```python
{
 "tool_parameter_key_match_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "reference": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `ToolParameterKeyMatchSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `ToolParameterKeyMatchInstance` Evaluation input, consisting of LLM response and reference. |
| `instance.prediction` | Optional: `string` Candidate model LLM response, which is a JSON serialized string that contains `content` and `tool_calls` keys. The `content` value is the text output from the model. The `tool_call` value is a JSON serialized string of a list of tool calls. |
| `instance.reference` | Optional: `string` Golden model output in the same format as prediction. |

#### `ToolParameterKeyMatchResults`

```python
{
 "tool_parameter_key_match_results": {
 "tool_parameter_key_match_metric_values": [
 {
 "score": float
 }
 ]
 }
}
```

| Output | |
| --- | --- |
| `tool_parameter_key_match_metric_values` | repeated `ToolParameterKeyMatchMetricValue`: Evaluation results per instance input. |
| `tool_parameter_key_match_metric_values.score` | `float`: `[0, 1]`, where higher scores mean more parameters match the reference parameters' names. |

#### `ToolParameterKVMatchInput`

```python
{
 "tool_parameter_kv_match_input": {
 "metric_spec": {},
 "instance": {
 "prediction": string,
 "reference": string
 }
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `ToolParameterKVMatchSpec` Metric spec, defining the metric's behavior. |
| `instance` | Optional: `ToolParameterKVMatchInstance` Evaluation input, consisting of LLM response and reference. |
| `instance.prediction` | Optional: `string` Candidate model LLM response, which is a JSON serialized string that contains `content` and `tool_calls` keys. The `content` value is the text output from the model. The `tool_call` value is a JSON serialized string of a list of tool calls. |
| `instance.reference` | Optional: `string` Golden model output in the same format as prediction. |

#### `ToolParameterKVMatchResults`

```python
{
 "tool_parameter_kv_match_results": {
 "tool_parameter_kv_match_metric_values": [
 {
 "score": float
 }
 ]
 }
}
```

| Output | |
| --- | --- |
| `tool_parameter_kv_match_metric_values` | repeated `ToolParameterKVMatchMetricValue`: Evaluation results per instance input. |
| `tool_parameter_kv_match_metric_values.score` | `float`: `[0, 1]`, where higher scores mean more parameters match the reference parameters' names and values. |

#### `CometInput`

```python
{
 "comet_input" : {
 "metric_spec" : {
 "version": string
 },
 "instance": {
 "prediction": string,
 "source": string,
 "reference": string,
 },
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `CometSpec` Metric spec, defining the metric's behavior. |
| `metric_spec.version` | Optional: `string` `COMET_22_SRC_REF`: COMET 22 for translation, source, and reference. It evaluates the translation (prediction) using all three inputs. |
| `metric_spec.source_language` | Optional: `string` Source language in [BCP-47 format](https://en.wikipedia.org/wiki/IETF_language_tag). For example, "es". |
| `metric_spec.target_language` | Optional: `string` Target language in [BCP-47 format](https://en.wikipedia.org/wiki/IETF_language_tag). For example, "es" |
| `instance` | Optional: `CometInstance` Evaluation input, consisting of LLM response and reference. The exact fields used for evaluation are dependent on the COMET version. |
| `instance.prediction` | Optional: `string` Candidate model LLM response. This is the output of the LLM which is being evaluated. |
| `instance.source` | Optional: `string` Source text. This is in the original language that the prediction was translated from. |
| `instance.reference` | Optional: `string` Ground truth used to compare against the prediction. This is in the same language as the prediction. |

#### `CometResult`

```python
{
 "comet_result" : {
 "score": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: `[0, 1]`, where 1 represents a perfect translation. |

#### `MetricxInput`

```python
{
 "metricx_input" : {
 "metric_spec" : {
 "version": string
 },
 "instance": {
 "prediction": string,
 "source": string,
 "reference": string,
 },
 }
}
```

| Parameters | |
| --- | --- |
| `metric_spec` | Optional: `MetricxSpec` Metric spec, defining the metric's behavior. |
| `metric_spec.version` | Optional: `string` One of the following: - `METRICX_24_REF`: MetricX 24 for translation and reference. It evaluates the prediction (translation) by comparing with the provided reference text input. - `METRICX_24_SRC`: MetricX 24 for translation and source. It evaluates the translation (prediction) by Quality Estimation (QE), without a reference text input. - `METRICX_24_SRC_REF`: MetricX 24 for translation, source and reference. It evaluates the translation (prediction) using all three inputs. |
| `metric_spec.source_language` | Optional: `string` Source language in [BCP-47 format](https://en.wikipedia.org/wiki/IETF_language_tag). For example, "es". |
| `metric_spec.target_language` | Optional: `string` Target language in [BCP-47 format](https://en.wikipedia.org/wiki/IETF_language_tag). For example, "es". |
| `instance` | Optional: `MetricxInstance` Evaluation input, consisting of LLM response and reference. The exact fields used for evaluation are dependent on the MetricX version. |
| `instance.prediction` | Optional: `string` Candidate model LLM response. This is the output of the LLM which is being evaluated. |
| `instance.source` | Optional: `string` Source text which is in the original language that the prediction was translated from. |
| `instance.reference` | Optional: `string` Ground truth used to compare against the prediction. It is in the same language as the prediction. |

#### `MetricxResult`

```python
{
 "metricx_result" : {
 "score": float
 }
}
```

| Output | |
| --- | --- |
| `score` | `float`: `[0, 25]`, where 0 represents a perfect translation. |

## Examples

### Evaluate an output

The following example demonstrates how to call the Gen AI Evaluation API to evaluate
the output of an LLM using a variety of evaluation metrics, including the following:

- `summarization_quality`
- `groundedness`
- `fulfillment`
- `summarization_helpfulness`
- `summarization_verbosity`

### Python

```python
import pandas as pd

import vertexai
from vertexai.preview.evaluation import EvalTask, MetricPromptTemplateExamples

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

eval_dataset = pd.DataFrame(
 {
 "instruction": [
 "Summarize the text in one sentence.",
 "Summarize the text such that a five-year-old can understand.",
 ],
 "context": [
 """As part of a comprehensive initiative to tackle urban congestion and foster
 sustainable urban living, a major city has revealed ambitious plans for an
 extensive overhaul of its public transportation system. The project aims not
 only to improve the efficiency and reliability of public transit but also to
 reduce the city\'s carbon footprint and promote eco-friendly commuting options.
 City officials anticipate that this strategic investment will enhance
 accessibility for residents and visitors alike, ushering in a new era of
 efficient, environmentally conscious urban transportation.""",
 """A team of archaeologists has unearthed ancient artifacts shedding light on a
 previously unknown civilization. The findings challenge existing historical
 narratives and provide valuable insights into human history.""",
 ],
 "response": [
 "A major city is revamping its public transportation system to fight congestion, reduce emissions, and make getting around greener and easier.",
 "Some people who dig for old things found some very special tools and objects that tell us about people who lived a long, long time ago! What they found is like a new puzzle piece that helps us understand how people used to live.",
 ],
 }
)

eval_task = EvalTask(
 dataset=eval_dataset,
 metrics=[
 MetricPromptTemplateExamples.Pointwise.SUMMARIZATION_QUALITY,
 MetricPromptTemplateExamples.Pointwise.GROUNDEDNESS,
 MetricPromptTemplateExamples.Pointwise.VERBOSITY,
 MetricPromptTemplateExamples.Pointwise.INSTRUCTION_FOLLOWING,
 ],
)

prompt_template = (
 "Instruction: {instruction}. Article: {context}. Summary: {response}"
)
result = eval_task.evaluate(prompt_template=prompt_template)

print("Summary Metrics:\n")

for key, value in result.summary_metrics.items():
 print(f"{key}: \t{value}")

print("\n\nMetrics Table:\n")
print(result.metrics_table)
# Example response:
# Summary Metrics:
# row_count: 2
# summarization_quality/mean: 3.5
# summarization_quality/std: 2.1213203435596424
# ...

```

### Go

```python
import (
 context_pkg "context"
 "fmt"
 "io"

 aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
 aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
 "google.golang.org/api/option"
)

// evaluateModelResponse evaluates the output of an LLM for groundedness, i.e., how well
// the model response connects with verifiable sources of information
func evaluateModelResponse(w io.Writer, projectID, location string) error {
 // location = "us-central1"
 ctx := context_pkg.Background()
 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 client, err := aiplatform.NewEvaluationClient(ctx, option.WithEndpoint(apiEndpoint))

 if err != nil {
 return fmt.Errorf("unable to create aiplatform client: %w", err)
 }
 defer client.Close()

 // evaluate the pre-generated model response against the reference (ground truth)
 responseToEvaluate := `
The city is undertaking a major project to revamp its public transportation system.
This initiative is designed to improve efficiency, reduce carbon emissions, and promote
eco-friendly commuting. The city expects that this investment will enhance accessibility
and usher in a new era of sustainable urban transportation.
`
 reference := `
As part of a comprehensive initiative to tackle urban congestion and foster
sustainable urban living, a major city has revealed ambitious plans for an
extensive overhaul of its public transportation system. The project aims not
only to improve the efficiency and reliability of public transit but also to
reduce the city\'s carbon footprint and promote eco-friendly commuting options.
City officials anticipate that this strategic investment will enhance
accessibility for residents and visitors alike, ushering in a new era of
efficient, environmentally conscious urban transportation.
`
 req := aiplatformpb.EvaluateInstancesRequest{
 Location: fmt.Sprintf("projects/%s/locations/%s", projectID, location),
 // Check the API reference for a full list of supported metric inputs:
 // https://cloud.google.com/vertex-ai/docs/reference/rpc/google.cloud.aiplatform.v1beta1#evaluateinstancesrequest
 MetricInputs: &aiplatformpb.EvaluateInstancesRequest_GroundednessInput{
 GroundednessInput: &aiplatformpb.GroundednessInput{
 MetricSpec: &aiplatformpb.GroundednessSpec{},
 Instance: &aiplatformpb.GroundednessInstance{
 Context: &reference,
 Prediction: &responseToEvaluate,
 },
 },
 },
 }

 resp, err := client.EvaluateInstances(ctx, &req)
 if err != nil {
 return fmt.Errorf("evaluateInstances failed: %v", err)
 }

 results := resp.GetGroundednessResult()
 fmt.Fprintf(w, "score: %.2f\n", results.GetScore())
 fmt.Fprintf(w, "confidence: %.2f\n", results.GetConfidence())
 fmt.Fprintf(w, "explanation:\n%s\n", results.GetExplanation())
 // Example response:
 // score: 1.00
 // confidence: 1.00
 // explanation:
 // STEP 1: All aspects of the response are found in the context.
 // The response accurately summarizes the city's plan to overhaul its public transportation system, highlighting the goals of ...
 // STEP 2: According to the rubric, the response is scored 1 because all aspects of the response are attributable to the context.

 return nil
}

```

### Evaluate an output: pairwise summarization quality

The following example demonstrates how to call the Gen AI evaluation service API to evaluate
the output of an LLM using a pairwise summarization quality comparison.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- PREDICTION: LLM response.
- BASELINE\_PREDICTION: Baseline model LLM response.
- INSTRUCTION: The instruction used at inference time.
- CONTEXT: Inference-time text containing all relevant information, that can be used in the LLM response.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID-/locations/LOCATION:evaluateInstances \
```

Request JSON body:

```python
{
 "pairwise_summarization_quality_input": {
 "metric_spec": {},
 "instance": {
 "prediction": "PREDICTION",
 "baseline_prediction": "BASELINE_PREDICTION",
 "instruction": "INSTRUCTION",
 "context": "CONTEXT",
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID-/locations/LOCATION:evaluateInstances \"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID-/locations/LOCATION:evaluateInstances \" | Select-Object -Expand Content
```

### Python

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import pandas as pd

import vertexai
from vertexai.generative_models import GenerativeModel
from vertexai.evaluation import (
 EvalTask,
 PairwiseMetric,
 MetricPromptTemplateExamples,
)

# TODO(developer): Update & uncomment line below
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

prompt = """
Summarize the text such that a five-year-old can understand.

# Text

As part of a comprehensive initiative to tackle urban congestion and foster
sustainable urban living, a major city has revealed ambitious plans for an
extensive overhaul of its public transportation system. The project aims not
only to improve the efficiency and reliability of public transit but also to
reduce the city\'s carbon footprint and promote eco-friendly commuting options.
City officials anticipate that this strategic investment will enhance
accessibility for residents and visitors alike, ushering in a new era of
efficient, environmentally conscious urban transportation.
"""

eval_dataset = pd.DataFrame({"prompt": [prompt]})

# Baseline model for pairwise comparison
baseline_model = GenerativeModel("gemini-2.0-flash-lite-001")

# Candidate model for pairwise comparison
candidate_model = GenerativeModel(
 "gemini-2.0-flash-001", generation_config={"temperature": 0.4}
)

prompt_template = MetricPromptTemplateExamples.get_prompt_template(
 "pairwise_summarization_quality"
)

summarization_quality_metric = PairwiseMetric(
 metric="pairwise_summarization_quality",
 metric_prompt_template=prompt_template,
 baseline_model=baseline_model,
)

eval_task = EvalTask(
 dataset=eval_dataset,
 metrics=[summarization_quality_metric],
 experiment="pairwise-experiment",
)
result = eval_task.evaluate(model=candidate_model)

baseline_model_response = result.metrics_table["baseline_model_response"].iloc[0]
candidate_model_response = result.metrics_table["response"].iloc[0]
winner_model = result.metrics_table[
 "pairwise_summarization_quality/pairwise_choice"
].iloc[0]
explanation = result.metrics_table[
 "pairwise_summarization_quality/explanation"
].iloc[0]

print(f"Baseline's story:\n{baseline_model_response}")
print(f"Candidate's story:\n{candidate_model_response}")
print(f"Winner: {winner_model}")
print(f"Explanation: {explanation}")
# Example response:
# Baseline's story:
# A big city wants to make it easier for people to get around without using cars! They're going to make buses and trains ...
#
# Candidate's story:
# A big city wants to make it easier for people to get around without using cars! ... This will help keep the air clean ...
#
# Winner: CANDIDATE
# Explanation: Both responses adhere to the prompt's constraints, are grounded in the provided text, and ... However, Response B ...
```

### Go

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

```python
import (
 context_pkg "context"
 "fmt"
 "io"

 aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
 aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
 "google.golang.org/api/option"
)

// pairwiseEvaluation lets the judge model to compare the responses of two models and pick the better one
func pairwiseEvaluation(w io.Writer, projectID, location string) error {
 // location = "us-central1"
 ctx := context_pkg.Background()
 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 client, err := aiplatform.NewEvaluationClient(ctx, option.WithEndpoint(apiEndpoint))

 if err != nil {
 return fmt.Errorf("unable to create aiplatform client: %w", err)
 }
 defer client.Close()

 context := `
As part of a comprehensive initiative to tackle urban congestion and foster
sustainable urban living, a major city has revealed ambitious plans for an
extensive overhaul of its public transportation system. The project aims not
only to improve the efficiency and reliability of public transit but also to
reduce the city\'s carbon footprint and promote eco-friendly commuting options.
City officials anticipate that this strategic investment will enhance
accessibility for residents and visitors alike, ushering in a new era of
efficient, environmentally conscious urban transportation.
`
 instruction := "Summarize the text such that a five-year-old can understand."
 baselineResponse := `
The city wants to make it easier for people to get around without using cars.
They're going to make the buses and trains better and faster, so people will want to
use them more. This will help the air be cleaner and make the city a better place to live.
`
 candidateResponse := `
The city is making big changes to how people get around. They want to make the buses and
trains work better and be easier for everyone to use. This will also help the environment
by getting people to use less gas. The city thinks these changes will make it easier for
everyone to get where they need to go.
`

 req := aiplatformpb.EvaluateInstancesRequest{
 Location: fmt.Sprintf("projects/%s/locations/%s", projectID, location),
 MetricInputs: &aiplatformpb.EvaluateInstancesRequest_PairwiseSummarizationQualityInput{
 PairwiseSummarizationQualityInput: &aiplatformpb.PairwiseSummarizationQualityInput{
 MetricSpec: &aiplatformpb.PairwiseSummarizationQualitySpec{},
 Instance: &aiplatformpb.PairwiseSummarizationQualityInstance{
 Context: &context,
 Instruction: &instruction,
 Prediction: &candidateResponse,
 BaselinePrediction: &baselineResponse,
 },
 },
 },
 }

 resp, err := client.EvaluateInstances(ctx, &req)
 if err != nil {
 return fmt.Errorf("evaluateInstances failed: %v", err)
 }

 results := resp.GetPairwiseSummarizationQualityResult()
 fmt.Fprintf(w, "choice: %s\n", results.GetPairwiseChoice())
 fmt.Fprintf(w, "confidence: %.2f\n", results.GetConfidence())
 fmt.Fprintf(w, "explanation:\n%s\n", results.GetExplanation())
 // Example response:
 // choice: BASELINE
 // confidence: 0.50
 // explanation:
 // BASELINE response is easier to understand. For example, the phrase "..." is easier to understand than "...". Thus, BASELINE response is ...

 return nil
}

```

## Get ROUGE score

The following example calls the Gen AI evaluation service API to get the ROUGE score
of a prediction, generated by a number of inputs. The ROUGE inputs use
`metric_spec`, which determines the metric's behavior.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request.
- PREDICTION: LLM response.
- REFERENCE: Golden LLM response for reference.
- ROUGE\_TYPE: The calculation used to determine the rouge score. See [`metric_spec.rouge_type`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/evaluation#rougeinput) for acceptable values.
- USE\_STEMMER: Determines whether the Porter stemmer is used to strip word suffixes to improve matching. For acceptable values, see [`metric_spec.use_stemmer`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/evaluation#rougeinput).
- SPLIT\_SUMMARIES: Determines if new lines are added between `rougeLsum` sentences. For acceptable values, see [`metric_spec.split_summaries`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/evaluation#rougeinput) .

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID-/locations/REGION:evaluateInstances \
```

Request JSON body:

```python
{
 "rouge_input": {
 "instances": {
 "prediction": "PREDICTION",
 "reference": "REFERENCE.",
 },
 "metric_spec": {
 "rouge_type": "ROUGE_TYPE",
 "use_stemmer": USE_STEMMER,
 "split_summaries": SPLIT_SUMMARIES,
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID-/locations/REGION:evaluateInstances \"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID-/locations/REGION:evaluateInstances \" | Select-Object -Expand Content
```

### Python

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import pandas as pd

import vertexai
from vertexai.preview.evaluation import EvalTask

# TODO(developer): Update & uncomment line below
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

reference_summarization = """
The Great Barrier Reef, the world's largest coral reef system, is
located off the coast of Queensland, Australia. It's a vast
ecosystem spanning over 2,300 kilometers with thousands of reefs
and islands. While it harbors an incredible diversity of marine
life, including endangered species, it faces serious threats from
climate change, ocean acidification, and coral bleaching."""

# Compare pre-generated model responses against the reference (ground truth).
eval_dataset = pd.DataFrame(
 {
 "response": [
 """The Great Barrier Reef, the world's largest coral reef system located
 in Australia, is a vast and diverse ecosystem. However, it faces serious
 threats from climate change, ocean acidification, and coral bleaching,
 endangering its rich marine life.""",
 """The Great Barrier Reef, a vast coral reef system off the coast of
 Queensland, Australia, is the world's largest. It's a complex ecosystem
 supporting diverse marine life, including endangered species. However,
 climate change, ocean acidification, and coral bleaching are serious
 threats to its survival.""",
 """The Great Barrier Reef, the world's largest coral reef system off the
 coast of Australia, is a vast and diverse ecosystem with thousands of
 reefs and islands. It is home to a multitude of marine life, including
 endangered species, but faces serious threats from climate change, ocean
 acidification, and coral bleaching.""",
 ],
 "reference": [reference_summarization] * 3,
 }
)
eval_task = EvalTask(
 dataset=eval_dataset,
 metrics=[
 "rouge_1",
 "rouge_2",
 "rouge_l",
 "rouge_l_sum",
 ],
)
result = eval_task.evaluate()

print("Summary Metrics:\n")
for key, value in result.summary_metrics.items():
 print(f"{key}: \t{value}")

print("\n\nMetrics Table:\n")
print(result.metrics_table)
# Example response:
#
# Summary Metrics:
#
# row_count: 3
# rouge_1/mean: 0.7191161666666667
# rouge_1/std: 0.06765143922270488
# rouge_2/mean: 0.5441118566666666
# ...
# Metrics Table:
#
# response reference ... rouge_l/score rouge_l_sum/score
# 0 The Great Barrier Reef, the world's ... \n The Great Barrier Reef, the ... ... 0.577320 0.639175
# 1 The Great Barrier Reef, a vast coral... \n The Great Barrier Reef, the ... ... 0.552381 0.666667
# 2 The Great Barrier Reef, the world's ... \n The Great Barrier Reef, the ... ... 0.774775 0.774775
```

### Go

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

```python
import (
 "context"
 "fmt"
 "io"

 aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
 aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
 "google.golang.org/api/option"
)

// getROUGEScore evaluates a model response against a reference (ground truth) using the ROUGE metric
func getROUGEScore(w io.Writer, projectID, location string) error {
 // location = "us-central1"
 ctx := context.Background()
 apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 client, err := aiplatform.NewEvaluationClient(ctx, option.WithEndpoint(apiEndpoint))

 if err != nil {
 return fmt.Errorf("unable to create aiplatform client: %w", err)
 }
 defer client.Close()

 modelResponse := `
The Great Barrier Reef, the world's largest coral reef system located in Australia,
is a vast and diverse ecosystem. However, it faces serious threats from climate change,
ocean acidification, and coral bleaching, endangering its rich marine life.
`
 reference := `
The Great Barrier Reef, the world's largest coral reef system, is
located off the coast of Queensland, Australia. It's a vast
ecosystem spanning over 2,300 kilometers with thousands of reefs
and islands. While it harbors an incredible diversity of marine
life, including endangered species, it faces serious threats from
climate change, ocean acidification, and coral bleaching.
`
 req := aiplatformpb.EvaluateInstancesRequest{
 Location: fmt.Sprintf("projects/%s/locations/%s", projectID, location),
 MetricInputs: &aiplatformpb.EvaluateInstancesRequest_RougeInput{
 RougeInput: &aiplatformpb.RougeInput{
 // Check the API reference for the list of supported ROUGE metric types:
 // https://cloud.google.com/vertex-ai/docs/reference/rpc/google.cloud.aiplatform.v1beta1#rougespec
 MetricSpec: &aiplatformpb.RougeSpec{
 RougeType: "rouge1",
 },
 Instances: []*aiplatformpb.RougeInstance{
 {
 Prediction: &modelResponse,
 Reference: &reference,
 },
 },
 },
 },
 }

 resp, err := client.EvaluateInstances(ctx, &req)
 if err != nil {
 return fmt.Errorf("evaluateInstances failed: %v", err)
 }

 fmt.Fprintln(w, "evaluation results:")
 fmt.Fprintln(w, resp.GetRougeResults().GetRougeMetricValues())
 // Example response:
 // [score:0.6597938]

 return nil
}

```

## What's next

- For detailed documentation, see [Run an evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/online-pipeline-services).