---
date_scraped: 2025-05-12
title: Prepare Your Evaluation Dataset
---

# Prepare your evaluation dataset 

For the Gen AI evaluation service, the evaluation dataset typically consists of the model response that you want to evaluate, the input data used to generate your response, and possibly the ground truth response.

## Evaluation dataset schema

For typical model-based metrics use cases, your dataset needs to provide the following information:

| Input type | Input field contents |
| --- | --- |
| prompt | User input for the Gen AI model or application. It's optional in some cases. |
| response | Your LLM inference response to be evaluated. |
| baseline\_model\_response (required by pairwise metrics) | The baseline LLM inference response that is used to compare your LLM response to the pairwise evaluation |

If you use the [Gen AI Evaluation module](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.evaluation) of the [Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/python-sdk/use-vertex-ai-python-sdk), the Gen AI evaluation service can automatically generate the `response`
and `baseline_model_response` with the model you specified.

For other evaluation use cases, you may need to provide more information:

### Multi-turn or chat

| Input type | Input field contents |
| --- | --- |
| history | The history of the conversation between user and model before the current turn. |
| prompt | User input for the Gen AI model or application in the current turn. |
| response | Your LLM inference response to be evaluated, which is based on the history and current turn prompt. |
| baseline\_model\_response (required by pairwise metrics) | The baseline LLM inference response that is used to compare your LLM response to the pairwise evaluation, which is based on the history and current turn prompt. |

### Computation-based metrics

Your dataset needs to provide a response from the large language model and a reference to compare to.

| Input type | Input field contents |
| --- | --- |
| response | Your LLM inference response to be evaluated. |
| reference | The ground truth to compare your LLM response to. |

### Translation metrics

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

Your dataset needs to provide a response from the model. Depending on your use case, you also need to provide a reference to compare to, an input in the source language, or a combination of both.

| Input type | Input field contents |
| --- | --- |
| source | Source text which is in the original language that the prediction was translated from. |
| response | Your LLM inference response to be evaluated. |
| reference | The ground truth to compare your LLM response to. This is in the same language as the response. |

Depending on your use cases, you may also break down the input user prompt into granular pieces, such as `instruction` and `context`, and assemble them for inference by providing a prompt template. You can also provide the reference or ground truth information if needed:

| Input type | Input field contents |
| --- | --- |
| instruction | Part of the input user prompt. It refers to the inference instruction that is sent to your LLM. For example: "Please summarize the following text" is an instruction. |
| context | User input for the Gen AI model or application in the current turn. |
| reference | The ground truth to compare your LLM response to. |

The required inputs for the evaluation dataset should be consistent with your metrics. For more details regarding customizing your metrics, see [Define your evaluation metrics](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluate-models#determine-eval) and [Run evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluate-models#run-evaluation). For more details regarding how to include reference data in your model-based metrics, see [Adapt a metric prompt template to your input data](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates#adapt-template).

## Import your evaluation dataset

You can import your dataset in the following formats:

- JSONL or CSV file stored in Cloud Storage
- BigQuery table
- Pandas DataFrame

## Evaluation dataset examples

This section shows dataset examples using the Pandas Dataframe format. Note that only several data records are shown here as an example, and evaluation datasets usually have 100 or more data points. For best practices when preparing a dataset, see the [Best practices](#best-practices) section.

### Pointwise model-based metrics

The following is a summarization case to demonstrate a sample dataset for pointwise model-based metrics:

```python
prompts = [
 # Example 1
 (
 "Summarize the text in one sentence: As part of a comprehensive"
 " initiative to tackle urban congestion and foster sustainable urban"
 " living, a major city has revealed ambitious plans for an extensive"
 " overhaul of its public transportation system. The project aims not"
 " only to improve the efficiency and reliability of public transit but"
 " also to reduce the city's carbon footprint and promote eco-friendly"
 " commuting options. City officials anticipate that this strategic"
 " investment will enhance accessibility for residents and visitors"
 " alike, ushering in a new era of efficient, environmentally conscious"
 " urban transportation."
 ),
 # Example 2
 (
 "Summarize the text such that a five-year-old can understand: A team of"
 " archaeologists has unearthed ancient artifacts shedding light on a"
 " previously unknown civilization. The findings challenge existing"
 " historical narratives and provide valuable insights into human"
 " history."
 ),
]

responses = [
 # Example 1
 (
 "A major city is revamping its public transportation system to fight"
 " congestion, reduce emissions, and make getting around greener and"
 " easier."
 ),
 # Example 2
 (
 "Some people who dig for old things found some very special tools and"
 " objects that tell us about people who lived a long, long time ago!"
 " What they found is like a new puzzle piece that helps us understand"
 " how people used to live."
 ),
]

eval_dataset = pd.DataFrame({
 "prompt": prompts,
 "response": responses,
})

```

### Pairwise model-based metrics

The following example shows an open-book question-answering case to demonstrate a sample dataset for pairwise model-based metrics.

```python
prompts = [
 # Example 1
 (
 "Based on the context provided, what is the hardest material? Context:"
 " Some might think that steel is the hardest material, or even"
 " titanium. However, diamond is actually the hardest material."
 ),
 # Example 2
 (
 "Based on the context provided, who directed The Godfather? Context:"
 " Mario Puzo and Francis Ford Coppola co-wrote the screenplay for The"
 " Godfather, and the latter directed it as well."
 ),
]

responses = [
 # Example 1
 "Diamond is the hardest material. It is harder than steel or titanium.",
 # Example 2
 "Francis Ford Coppola directed The Godfather.",
]

baseline_model_responses = [
 # Example 1
 "Steel is the hardest material.",
 # Example 2
 "John Smith.",
]

eval_dataset = pd.DataFrame(
 {
 "prompt": prompts,
 "response": responses,
 "baseline_model_response": baseline_model_responses,
 }
)

```

### Computation-based metrics

For computation-based metrics, `reference` is often required.

```python
eval_dataset = pd.DataFrame({
 "response": ["The Roman Senate was filled with exuberance due to Pompey's defeat in Asia."],
 "reference": ["The Roman Senate was filled with exuberance due to successes against Catiline."],
})

```

#### Tool-use (function calling) metrics

The following example shows input data for computation-based tool-use metrics:

```python
json_responses = ["""{
 "content": "",
 "tool_calls":[{
 "name":"get_movie_info",
 "arguments": {"movie":"Mission Impossible", "time": "today 7:30PM"}
 }]
 }"""]

json_references = ["""{
 "content": "",
 "tool_calls":[{
 "name":"book_tickets",
 "arguments":{"movie":"Mission Impossible", "time": "today 7:30PM"}
 }]
 }"""]

eval_dataset = pd.DataFrame({
 "response": json_responses,
 "reference": json_references,
})

```

### Translation use cases

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

The following example shows input data for translation metrics:

```python
 source = [
 "Dem Feuer konnte Einhalt geboten werden",
 "Schulen und Kindergärten wurden eröffnet.",
 ]

 response = [
 "The fire could be stopped",
 "Schools and kindergartens were open",
 ]

 reference = [
 "They were able to control the fire.",
 "Schools and kindergartens opened",
 ]

 eval_dataset = pd.DataFrame({
 "source": source,
 "response": response,
 "reference": reference,
 })

```

## Best practices

Follow these best practices when defining your evaluation dataset:

- Provide examples that represent the types of inputs, which your models process
 in production.
- Your dataset must include a minimum of one evaluation example. We recommend around 100 examples to ensure high-quality aggregated metrics and statistically significant results. This size helps establish a higher confidence level in the aggregated evaluation results, minimizing the influence of outliers and ensuring that the performance metrics reflect the model's true capabilities across diverse scenarios. The rate of aggregated metric quality improvements tends to decrease when more than 400 examples are provided.

## What's next

- [Run an evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/run-evaluation).
- Try an
 [evaluation example notebook](evaluation-overview.md).