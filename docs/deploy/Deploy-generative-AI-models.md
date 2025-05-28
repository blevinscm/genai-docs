---
date_scraped: 2025-05-12
title: Deploy Generative AI Models
---

# Deploy generative AI models 

Some generative AI models, such as [Gemini](../code/code-models-overview.md), have managed APIs and are ready to process prompts without deployment. For a list of models with managed APIs, see [Foundational model APIs](../learn/models.md).

Other generative AI models must be deployed to an endpoint before
they can begin serving inference requests. There are two types of generative models that
must be deployed:

- [Tuned models](#deploy_a_tuned_model), which you create by tuning a
 supported foundation model with your own data.
- [Generative models that don't have managed APIs](#not-managed). In the
 Model Garden, these are models that aren't labeled as
 **API available** or **Vertex AI Studio**—for example, Llama 2.

When you deploy a model to an endpoint, Vertex AI associates compute
resources and a URI with the model so that it can serve prompt requests.

## Deploy a tuned model

Tuned models are automatically uploaded to the
[Vertex AI Model Registry](https://cloud.google.com/vertex-ai/docs/model-registry/introduction)
and deployed to a Vertex AI shared public
[`endpoint`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints). Tuned models don't
appear in the Model Garden because they are tuned with your data.
For more information, see
[Overview of model tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models).

Once the endpoint is *active*, it is ready to accept prompt requests at its URI.
The format of the API call for a tuned model is the same as the foundation model
it was tuned from. For example, if your model is tuned on Gemini, then your
prompt request should follow the [Gemini API](../model-reference/gemini.md).

Make sure you send prompt requests to your tuned model's endpoint instead of the
managed API. The tuned model's endpoint is in the format:

```python
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID

```

To get the endpoint ID, see [View or manage an endpoint](#view_or_manage_an_endpoint).

For more information on formatting prompt requests, see the
[Model API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/overview).

## Deploy a generative model that doesn't have a managed API

To use a model from the Model Garden that doesn't have a managed
API, you must upload the model to Model Registry and
deploy it to an endpoint before you can send prompt requests. This is similar to
uploading and [deploying a custom trained model for online prediction](https://cloud.google.com/vertex-ai/docs/general/deployment)
in Vertex AI.

To deploy one of these models, go to the Model Garden and select
the model you'd like to deploy.

[Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)

Each model card displays one or more of the following deployment options:

- **Deploy** button: Most of the generative models in
 the Model Garden have a **Deploy** button that walks you
 through deploying to Vertex AI. If you don't see a **Deploy**
 button, go to the next bullet.

 For deployment on Vertex AI, you can use the
 suggested settings or modify them. You can also set **Advanced** deployment
 settings to, for example, select a Compute Engine
 [reservation](#reservation).

 **Note:** Some models also support deployment to Google Kubernetes Engine, which offers greater control over the deployment environment. For more
 information, see [Serve a model with a single GPU in GKE](https://cloud.google.com/kubernetes-engine/docs/tutorials/online-ml-inference).
- **Open Notebook** button: This option opens a Jupyter notebook. Every model
 card displays this option. The Jupyter notebook includes instructions and
 sample code for uploading the model to Model Registry,
 deploying the model to an endpoint, and sending a prompt request.

Once deployment is complete and the endpoint is *active*, it is ready to process
prompt requests at its URI. The format of the API is
[`predict`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints/predict) and the format
of each [`instance`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.endpoints/predict#body.request_body.FIELDS.instances)
in the request body depends on the model. For more information, see the
following resources:

- [Request body for online prediction](https://cloud.google.com/vertex-ai/docs/predictions/get-online-predictions#request-body-details)
- [Format your input for online prediction](https://cloud.google.com/vertex-ai/docs/predictions/get-online-predictions#formatting-prediction-input)

Make sure you have enough machine quota to deploy your model. To view your
current quota or request more quota, in the Google Cloud console, go to the
**Quotas** page.

[Go to Quotas](https://console.cloud.google.com/iam-admin/quotas)

Then, filter by the quota name `Custom Model Serving` to see the quotas for
online prediction. To learn more, see [View and manage quotas](https://cloud.google.com/docs/quotas/view-manage).

### Ensure capacity for deployed models with Compute Engine reservations

You can deploy Model Garden models on VM resources that have been
allocated through Compute Engine reservations. Reservations help ensure
that capacity is available when your model predictions requests need them. For
more information, see [Use reservations with prediction](https://cloud.google.com/vertex-ai/docs/predictions/use-reservations).

## View or manage a model

For tuned models, you can view the model and its tuning job on the **Tune and
Distill** page in the Google Cloud console.

[Go to Tune and Distill](https://console.cloud.google.com/vertex-ai/generative/language/tuning)

You can also view and manage all of your uploaded models in
Model Registry.

[Go to Model Registry](https://console.cloud.google.com/vertex-ai/models)

In Model Registry, a tuned model is categorized as a
*Large Model*, and has labels that specify the foundation model and the pipeline
or tuning job that was used for tuning.

Models that are deployed with the **Deploy** button will indicate **Model Garden**
as its [`Source`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.models#Model.FIELDS.model_source_info).
Note that, if the model is updated in the Model Garden, your
uploaded model in Model Registry is not updated.

For more information, see [Introduction to Vertex AI Model Registry](https://cloud.google.com/vertex-ai/docs/model-registry/introduction).

## View or manage an endpoint

To view and manage your endpoint, go to the Vertex AI
**Online prediction** page. By default, the endpoint's name is the same as the
model's name.

[Go to Online prediction](https://console.cloud.google.com/vertex-ai/online-prediction/endpoints)

For more information, see [Deploy a model to an endpoint](https://cloud.google.com/vertex-ai/docs/general/deployment).

## Monitor model endpoint traffic

Use the following instructions to monitor traffic to your endpoint in the Metrics Explorer.

1. In the Google Cloud console, go to the **Metrics Explorer** page.

 [Go
 to Metrics Explorer](https://console.cloud.google.com/projectselector/monitoring/metrics-explorer?supportedpurview=project,folder,organizationId)
2. Select the project you want to view metrics for.
3. From the **Metric** drop-down menu, click **Select a metric**.
4. In the **Filter by resource or metric name** search bar, enter
 `Vertex AI Endpoint`.
5. Select the **Vertex AI Endpoint > Prediction** metric category. Under **Active metrics**, select any of the following metrics:

 - **`prediction/online/error_count`**
 - **`prediction/online/prediction_count`**
 - **`prediction/online/prediction_latencies`**
 - **`prediction/online/response_count`**

 Click **Apply**. To add more than one metric, click **Add query**.

 You can filter or aggregate your metrics using the following drop-down menus:

 - To select and view a subset of your data based on specified criteria, use
 the **Filter** drop-down menu. For example, `endpoint_id = gemini-2p0-flash-001` (decimal points in a model name should be replaced with `p`. For example, `gemini-2.0-flash-001` becomes `gemini-2p0-flash-001`, and a hypothetical `model-3.14-beta` would use `model-3p14-beta` as its filter value).
 - To combine multiple data points into a single value and see a summarized
 view of your metrics, use the **Aggregation** drop-down menu. For example, you can aggregate the **Sum** of `response_code`.
6. Optionally, you can set up alerts for your endpoint. For more information,
 see [Manage alerting policies](/monitoring/alerts/manage-alerts).

To view the metrics you add to your project using a dashboard, see
[Dashboards overview](/monitoring/dashboards).

## Limitations

- A tuned Gemini model can only be deployed to a shared public
 endpoint. Deployment to dedicated public endpoints,
 Private Service Connect endpoints, and private endpoints isn't
 supported.

## Pricing

For tuned models, you are billed per token at the same rate as the foundation
model your model was tuned from. There is no separate hosting cost for the endpoint itself, as tuned models utilize shared infrastructure. You are billed for the token usage on this endpoint at the same rate as the foundation model it was tuned from. For
more information, see [pricing for Generative AI on Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/pricing).

For models without managed APIs, you are billed for the machine hours that are
used by your endpoint at the same rate as Vertex AI online
predictions. You are not billed per token. For more information, see
[pricing for predictions in Vertex AI](https://cloud.google.com/vertex-ai/pricing#prediction-prices).

## What's next

- [Overview of model tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models)
- [Model API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/overview)
- [Deploy a model to an endpoint](https://cloud.google.com/vertex-ai/docs/general/deployment)
