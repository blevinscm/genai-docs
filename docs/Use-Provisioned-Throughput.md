---
title: Use-Provisioned-Throughputgoogle.com/vertex-ai/generative-ai/docs/use-provisioned-throughput#only-pay-as-you-go
date_scraped: 2025-05-12
---

# Use Provisioned Throughput 

This page explains how Provisioned Throughput works, how to control
overages or bypass Provisioned Throughput, and how to monitor usage.

## How Provisioned Throughput works

This section explains how Provisioned Throughput works by using
quota checking through the quota enforcement period.

### Provisioned Throughput quota checking

Your Provisioned Throughput maximum quota is a multiple of the
number of generative AI scale units (GSUs) purchased and the throughput per GSU.
It's checked each time you make a request within your *quota enforcement
period*, which is how frequently the maximum Provisioned Throughput
quota is enforced.

At the time a request is received, the true response size is unknown. Because we
prioritize speed of response for real-time applications,
Provisioned Throughput estimates the output token size. If the
initial estimate exceeds the available Provisioned Throughput
maximum quota, the request is processed as pay-as-you-go. Otherwise, it is
processed as Provisioned Throughput. This is done by comparing the
initial estimate to your Provisioned Throughput maximum quota.

When the response is generated and the true output token size is known, actual
usage and quota are reconciled by adding the difference between the estimate and
the actual usage to your available Provisioned Throughput quota
amount.

### Provisioned Throughput quota enforcement period

For `gemini-2.0-flash-lite` and `gemini-2.0-flash` models, the
quota enforcement period can take up to 30 seconds and is subject to change.
This means that you might temporarily experience prioritized traffic that
exceeds your quota amount on a per-second basis in some cases, but you shouldn't
exceed your quota on a 30-second basis. These periods are based on the
Vertex AI internal clock time and are independent of when requests are
made.

For example, if you purchase one GSU of `gemini-2.0-flash-001`, then you
should expect 3,360 tokens per second of always-on throughput. On average, you
can't exceed 100,800 characters on a 30-second basis, which is calculated using
the following formula:

```python
3,360 tokens per second * 30 seconds = 100,800 tokens
```

If, in a day, you submitted only one request that consumed 8,000 tokens in a
second, it might still be processed as a Provisioned Throughput
request, even though you exceeded your 3,360 tokens per second limit at the time
of the request. This is because the request didn't exceed the threshold of
100,800 tokens per 30 seconds.

**Note:** Context caching is only supported when using pay-as-you-go traffic and doesn't
support Provisioned Throughput traffic.
Provisioned Throughput requests that use context caching are treated
as [pay-as-you-go](#only-pay-as-you-go).

## Control overages or bypass Provisioned Throughput

Use the API to control overages when you exceed your purchased throughput
or to bypass Provisioned Throughput on a per-request basis.

Read through each option to determine what you must do to meet your use case.

### Default behavior

If you exceed your purchased amount of throughput, the overages go to on-demand
and are billed at the
[pay-as-you-go rate](https://cloud.google.com/vertex-ai/generative-ai/pricing). After your
Provisioned Throughput order is active, the default behavior takes place
automatically. You don't have to change your code to begin consuming your
order.

### Use only Provisioned Throughput

If you are managing costs by avoiding on-demand charges, use only
Provisioned Throughput. Requests which exceed the
Provisioned Throughput order amount return an [error `429`](error-code-429_1.md).

When sending requests to the API, set the `X-Vertex-AI-LLM-Request-Type` HTTP
header to `dedicated`.

### Use only pay-as-you-go

This is also referred to as using on-demand. Requests bypass the Provisioned Throughput
order and are sent directly to pay-as-you-go. This might be useful
for experiments or applications that are in development.

When sending requests to the API, set the `X-Vertex-AI-LLM-Request-Type` HTTP header to `shared`.

### Example

### Gen AI SDK for Python

#### Install

```python
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
from google import genai
from google.genai.types import HttpOptions

client = genai.Client(
 http_options=HttpOptions(
 api_version="v1",
 headers={
 # Options:
 # - "dedicated": Use Provisioned Throughput
 # - "shared": Use pay-as-you-go
 # https://cloud.google.com/vertex-ai/generative-ai/docs/use-provisioned-throughput
 "X-Vertex-AI-LLM-Request-Type": "shared"
 },
 )
)
response = client.models.generate_content(
 model="gemini-2.0-flash-001",
 contents="How does AI work?",
)
print(response.text)
# Example response:
# Okay, let's break down how AI works. It's a broad field, so I'll focus on the ...
#
# Here's a simplified overview:
# ...
```

### REST

After you
[set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#gemini-setup-environment-drest),
you can use REST to test a text prompt. The following sample sends a request to the publisher
model endpoint.

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 -H "X-Vertex-AI-LLM-Request-Type: dedicated" \ # Options: dedicated, shared
 $URL \
 -d '{"contents": [{"role": "user", "parts": [{"text": "Hello."}]}]}'

```

## Monitor Provisioned Throughput

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

You can self-monitor your Provisioned Throughput usage using a set
of metrics that are measured on the `aiplatform.googleapis.com/PublisherModel`
resource type.

Provisioned Throughput traffic monitoring is a public Preview
feature.

#### Dimensions

You can filter on metrics using the following dimensions:

| **Dimension** | **Values** |
| --- | --- |
| `type` | `input` `output` |
| `request_type` | **`dedicated`**: Traffic is processed using Provisioned Throughput. **`shared`**: If Provisioned Throughput is active, then traffic is processed using pay-as-you-go by default if you exceed your Provisioned Throughput maximum quota or if you have used the `shared` [HTTP header](https://cloud.google.com/vertex-ai/generative-ai/docs/use-provisioned-throughput#only-pay-as-you-go). |

#### Path prefix

The path prefix for a metric is
`aiplatform.googleapis.com/publisher/online_serving`.

For example, the full path for the `/consumed_throughput` metric is
`aiplatform.googleapis.com/publisher/online_serving/consumed_throughput`.

#### Metrics

The following Cloud Monitoring metrics are available on the
`aiplatform.googleapis.com/PublisherModel` resource for the
Gemini models. Use the `dedicated` request types to filter for
Provisioned Throughput usage.

| Metric | Display name | Description |
| --- | --- | --- |
| `/dedicated_gsu_limit` | **Limit (GSU)** | Dedicated limit in GSUs. Use this metric to understand your Provisioned Throughput maximum quota in GSUs. |
| `/tokens` | **Tokens** | Input and output token count distribution. |
| `/token_count` | **Token count** | Accumulated input and output token count. |
| `/consumed_token_throughput` | **Token throughput** | Throughput usage, which accounts for the burndown rate in tokens and incorporates quota reconciliation. See [Provisioned Throughput quota checking](#pt-quota-checking). Use this metric to understand how your Provisioned Throughput quota was used. |
| `/dedicated_token_limit` | **Limit (tokens per second)** | Dedicated limit in tokens per second. Use this metric to understand your Provisioned Throughput maximum quota for token-based models. |
| `/characters` | **Characters** | Input and output character count distribution. |
| `/character_count` | **Character count** | Accumulated input and output character count. |
| `/consumed_throughput` | **Character throughput** | Throughput usage, which accounts for the burndown rate in characters and incorporates quota reconciliation [Provisioned Throughput quota checking](#pt-quota-checking). Use this metric to understand how your Provisioned Throughput quota was used. For token-based models, this metric is equivalent to the throughput consumed in tokens multiplied by 4. |
| `/dedicated_character_limit` | **Limit (characters per second)** | Dedicated limit in characters per second. Use this metric to understand your Provisioned Throughput maximum quota for character-based models. |
| `/model_invocation_count` | **Model invocation count** | Number of model invocations (prediction requests). |
| `/model_invocation_latencies` | **Model invocation latencies** | Model invocation latencies (prediction latencies). |
| `/first_token_latencies` | **First token latencies** | Duration from request received to first token returned. |

Anthropic models also have a filter for Provisioned Throughput but
only for `tokens/token_count`.

### Dashboards

Default monitoring dashboards for Provisioned Throughput provide
[metrics](#metrics) that let you better understand your usage and
Provisioned Throughput utilization. To access the dashboards, do the
following:

1. In the Google Cloud console, go to the **Provisioned Throughput**
 page.

 [Go to Provisioned Throughput](https://console.cloud.google.com/vertex-ai/provisioned-throughput)
2. To view the Provisioned Throughput utilization of each model
 across your orders, select the **Utilization summary** tab.
3. Select a model from the **Provisioned Throughput utilization by
 model** table to see more metrics specific to the selected model.

### Limitations of the dashboard

The dashboard might display results that you don't expect, especially if traffic
is spiky. The following reasons might contribute to those results:

- Time ranges that are larger than 12 hours can lead to a less accurate
 representation of the quota enforcement period. Throughput metrics
 and their derivatives, such as utilization, display averages across alignment
 periods that are based on the selected time range. When the time range
 expands, each alignment period also expands. The alignment period expands
 across the calculation of the average usage. Because quota enforcement is
 calculated at a sub-minute level, setting the time range to a period of 12
 hours or less results in minute-level data that is more comparable to the
 actual quota enforcement period. For more information on alignment periods,
 see [Alignment: within-series
 regularization](/monitoring/api/v3/aggregation#alignment-intro). For more
 information about time ranges, see [Regularizing time
 intervals](/monitoring/api/v3/aggregation#time-bucketing).
- If multiple requests were submitted at the same time, monitoring aggregations
 might impact your ability to filter down to specific requests.
- Provisioned Throughput throttles traffic when a request was made
 but reports usage metrics after the quota is reconciled.
- Provisioned Throughput quota enforcement periods are independent
 from and might not align with monitoring aggregation periods or
 request-or-response periods.
- If no errors occurred, you might see an error message within the error rate
 chart. For example, *An error occurred requesting data. One or more resources
 could not be found.*

### Alerting

After alerting is enabled, set default alerts to help you manage your traffic
usage.

#### Enable alerts

To enable alerts in the dashboard, do the following:

1. In the Google Cloud console, go to the **Provisioned Throughput**
 page.

 [Go to Provisioned Throughput](https://console.cloud.google.com/vertex-ai/provisioned-throughput)
2. To view the Provisioned Throughput utilization of each model
 across your orders, select the **Utilization summary** tab.
3. Select **Recommended alerts**, and the following alerts display:

 - `Provisioned Throughput Usage Reached Limit`
 - `Provisioned Throughput Utilization Exceeded 80%`
 - `Provisioned Throughput Utilization Exceeded 90%`
4. Check the alerts that help you manage your traffic.

#### View more alert details

To view more information about alerts, do the following:

1. Go to the **Integrations** page.

 [Go to Integrations](https://console.cloud.google.com/monitoring/integrations)
2. Enter *vertex* into the **Filter** field and press **Enter**. **Google
 Vertex AI** appears.
3. To view more information, click **View details**. The **Google
 Vertex AI details** pane displays.
4. Select **Alerts** tab, and you can select an **Alert Policy** template.

## What's next

- Troubleshoot [Error code `429`](error-code-429_1.md).