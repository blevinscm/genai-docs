---
date_scraped: 2025-05-12
title: Model Monitoring Metricsbookmark_borderbookmark
---

# Model monitoring metrics bookmark\_borderbookmark 

Generative AI on Vertex AI provides a prebuilt model observability dashboard to
view the behavior, health, and performance of fully-managed models.
Fully-managed models, also known as Model as a Service (MaaS), are provided by
Google and include Google's Gemini models and partner
models with managed endpoints. Metrics from self-hosted models aren't included
in the dashboard.

Generative AI on Vertex AI automatically collects and reports activity from MaaS
models to help you quickly troubleshoot latency issues and monitor capacity.

Model observability dashboard example

## Available monitoring metrics

The model observability dashboard displays a subset of metrics that are
collected by Cloud Monitoring, such as model request per second (QPS), token
throughput, and first token latencies. [View the dashboard](#view) to see all
the available metrics.

### Use case

As an application developer, you can view how your users are interacting with
the models that you've exposed. For example, you can view how model usage (model
requests per second) and the compute intensity of user prompts (model invocation
latencies) are trending over time. Consequently, because these metrics are
related to model usage, you can also estimate costs for running each model.

When an issue arises, you can quickly troubleshoot from the dashboard. You can
check if models are responding reliably and in a timely manner by viewing API
error rates, first token latencies, and token throughput.

## Limitations

Vertex AI captures dashboard metrics only for API calls to a
model's endpoint. Google Cloud console usage, such as metrics from
Vertex AI Studio, aren't added to the dashboard.

## View the dashboard

1. In the Vertex AI section of the Google Cloud console, go to the
 **Dashboard** page.

 [Go to Vertex AI](https://console.cloud.google.com/vertex-ai/)
2. In the **Model observability** section, click **Show all metrics** to view
 the model observability dashboard in the Google Cloud Observability console.

 **Note:** The observability section is available only if you or another user has
 made API calls to a MaaS model in your project.
3. To view metrics for a specific model or in a particular location, set one or
 more filters at the top of the dashboard page.

 For descriptions of each metric, see the "aiplatform" section on the
 [Google Cloud metrics](/monitoring/api/metrics_gcp#gcp-aiplatform) page.

## Additional resources

- To create alerts for your dashboard, see the [Alerting overview](/monitoring/alerts)
 page in the Monitoring documentation.
- For information about metrics data retention, see the
 [Monitoring quotas and limits](/monitoring/quotas#data_retention_policy).
- For information about data at rest, see [Protecting data at rest](/monitoring/compliance/data-at-rest).
- To view a list of all metrics that Cloud Monitoring collects, see the
 "aiplatform" section on the [Google Cloud metrics](/monitoring/api/metrics_gcp#gcp-aiplatform) page.

Was this helpful?