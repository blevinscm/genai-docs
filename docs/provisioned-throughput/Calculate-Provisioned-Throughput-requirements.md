---
title: Calculate-Provisioned-Throughput-requirementsgoogle.com/vertex-ai/generative-ai/docs/provisioned-throughput/measure-provisioned-throughput
date_scraped: 2025-05-12
---

# Calculate Provisioned Throughput requirements 

This section explains the concepts of generative AI scale unit (GSU) and
burndown rates. Provisioned Throughput is calculated and priced
using generative AI scale units (GSUs) and burndown rates.

## GSU and burndown rate

A *generative AI scale unit (GSU)* is a measure of throughput for your prompts
and responses. This amount specifies how much throughput to provision a model
with.

A *burndown rate* is a ratio that converts the input and output units (such
as tokens, characters, or images) to input tokens per second, input characters
or second, or input images per second, respectively. This ratio represents the
throughput and is used to produce a standard unit across models.

Different models use different amounts of throughput. For information about the
minimum GSU purchase amount and increments for each model, see [Supported models
and burndown rates](../supported-models_1.md) in this document.

This equation demonstrates how throughput is calculated:

```python
inputs_per_query = inputs_across_modalities_converted_using_burndown_rates
outputs_per_query = outputs_across_modalities_converted_using_burndown_rates

throughput_per_second = (inputs_per_query + outputs_per_query) * queries_per_second

```

The calculated throughput per second determines how many GSUs that you need for
your use case.

## Important Considerations

To help you plan for your Provisioned Throughput needs, review the
following important considerations:

- **Requests are prioritized.**

 Provisioned Throughput customers are prioritized and serviced
 first before on-demand requests.
- **Throughput doesn't accumulate.**

 Unused throughput doesn't accumulate or carry over to the next
 month.
- **Provisioned Throughput is measured in tokens per second, characters per second, or images per second.**

 Provisioned Throughput isn't measured solely based on queries per minute
 (QPM). It's measured based on the query size for your use case, the response
 size, and the QPM.
- **Provisioned Throughput is specific to a project, region, model, and version.**

 Provisioned Throughput is assigned to a specific
 project-region-model-version combination. The same model called from a
 different region won't count against your Provisioned Throughput
 quota and won't be prioritized over on-demand requests.

## Example of estimating your Provisioned Throughput needs

To estimate your Provisioned Throughput needs, use the
[estimation tool in the Google Cloud console](https://cloud.google.com/vertex-ai/generative-ai/docs/purchase-provisioned-throughput#estimate-provisioned-throughput).
The following example illustrates the process of estimating the amount of
Provisioned Throughput for your model. The region isn't considered
in the estimation calculations.

This table provides the burndown rates for `gemini-2.0-flash` that you
can use to follow the example.

| **Model** | **Throughput per GSU** | **Units** | **Minimum GSU purchase increment** | **Burndown rates** |
| --- | --- | --- | --- | --- |
| Gemini 2.0 Flash | 3,360 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 7 tokens 1 output text token = 4 tokens |

1. Gather your requirements.

 1. In this example, your requirement is to ensure that you can support 10
 queries per second (QPS) of a query with an input of 1,000 text tokens and
 500 audio tokens, to receive an output of 300 text tokens using
 `gemini-2.0-flash`.

 This step means that you understand your use case, because you have
 identified your model, the QPS, and the size of your inputs and outputs.
 2. To calculate your throughput, refer to the
 [burndown rates](../supported-models_1.md) for your selected model.
2. Calculate your throughput.

 1. Multiply your inputs by the burndown rates to arrive at total input tokens:

 1,000\*(1 token per input text token) + 500\*(7 tokens per input audio
 token) = 4,500 burndown adjusted input tokens per query.
 2. Multiply your outputs by the burndown rates to arrive at total output tokens:

 300\*(4 tokens per output text token) = 1,200 burndown adjusted output
 tokens per query
 3. Add your totals together:

 4,500 burndown adjusted input tokens + 1,200 burndown adjusted output
 tokens = 5,700 total tokens per query
 4. Multiply the total number of tokens by the QPS to arrive at total
 throughput per second:

 5,700 total tokens per query \* 10 QPS = 57,000 total tokens per second
3. Calculate your GSUs.

 1. The GSUs are the total tokens per second divided by per-second throughput per GSU from the burndown table.

 57,000 total tokens per second ÷ 3,360 per-second throughput per GSU = 16.96 GSUs
 2. The minimum GSU purchase increment for `gemini-2.0-flash` is
 1, so you'll need 17 GSUs to assure your workload.

## What's next

- [Purchase Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/purchase-provisioned-throughput).