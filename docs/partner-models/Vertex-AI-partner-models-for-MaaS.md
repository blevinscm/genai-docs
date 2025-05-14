---
date_scraped: 2025-05-12
title: Vertex Ai Partner Models For Maas
---

# Vertex AI partner models for MaaS 

Vertex AI supports a curated list of models developed by Google partners.
Partner models can be used with [Vertex AI](../start/express-mode/Tutorial-Vertex-AI-API-in-express-mode.md) as a model
as a service (MaaS) and are offered as a managed API. When you use a partner
model, you continue to send your requests to Vertex AI endpoints. Partner
models are serverless so there's no need to provision or manage infrastructure.

Partner models can be discovered using Model Garden. You can also
deploy models using Model Garden. For more information, see
[Explore AI models in
Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models).
While information about each available partner model can be found on its model
card in Model Garden, only third-party models that perform as a
MaaS with Vertex AI are documented in this guide.

Anthropic's Claude and Mistral models are examples of third-party managed models
that are available to use on Vertex AI.

## Vertex AI partner model pricing with capacity assurance

Google offers provisioned throughput for some partner models that reserves
throughput capacity for your models for a fixed fee. You decide on the
throughput capacity and in which regions to reserve that capacity. Because
provisioned throughput requests are prioritized over the standard pay-as-you-go
requests, provisioned throughput provides increased availability. When the
system is overloaded, your requests can still be completed as long as the
throughput remains under your reserved throughput capacity. For more information
or to subscribe to the service, [Contact sales](https://cloud.google.com/contact).

## Grant user access to partner models

For you to enable partner models and make a prompt request, a Google Cloud
administrator must [set the required permissions](#set-permissions) and [verify
the organization policy allows the use of required
APIs](#set-organization-policy).

### Set required permissions to use partner models

The following roles and permissions are required to use partner models:

- You must have the Consumer Procurement Entitlement Manager
 Identity and Access Management (IAM) role. Anyone who's been granted this role can
 enable partner models in Model Garden.
- You must have the `aiplatform.endpoints.predict` permission. This
 permission is included in the Vertex AI User IAM role.
 For more information, see [Vertex AI
 User](https://cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user) and [Access
 control](../access-control_1.md).

### Console

1. To grant the Consumer Procurement Entitlement Manager IAM
 roles to a user, go to the **IAM** page.

 [Go to IAM](https://console.cloud.google.com/projectselector/iam-admin/iam?supportedpurview=)
2. In the **Principal** column, find the user
 [principal](https://cloud.google.com/iam/docs/overview#concepts_related_identity) for which you
 want to enable access to partner models, and then click
 edit **Edit principal** in that row.
3. In the **Edit access** pane, click
 add **Add another role**.
4. In **Select a role**, select **Consumer Procurement Entitlement Manager**.
5. In the **Edit access** pane, click
 add **Add another role**.
6. In **Select a role**, select **Vertex AI User**.
7. Click **Save**.

### gcloud

1. In the Google Cloud console, activate Cloud Shell.

 [Activate Cloud Shell](https://console.cloud.google.com/?cloudshell=true)
2. Grant the Consumer Procurement Entitlement Manager role that's required
 to enable partner models in Model Garden

 ```python
 gcloud projects add-iam-policy-binding PROJECT_ID \
 --member=PRINCIPAL --role=roles/consumerprocurement.entitlementManager

 ```
3. Grant the Vertex AI User role that includes the
 `aiplatform.endpoints.predict` permission which is required to make
 prompt requests:

 ```python
 gcloud projects add-iam-policy-binding PROJECT_ID \
 --member=PRINCIPAL --role=roles/aiplatform.user

 ```

 Replace `PRINCIPAL` with the identifier for
 the principal. The identifier takes the form
 `user|group|serviceAccount:email` or `domain:domain`—for
 example, `user:cloudysanfrancisco@gmail.com`,
 `group:admins@example.com`,
 `serviceAccount:test123@example.domain.com`, or
 `domain:example.domain.com`.

 The output is a list of policy bindings that includes the following:

 ```python
 - members:
 - user:PRINCIPAL
 role: roles/roles/consumerprocurement.entitlementManager

 ```

 For more information, see
 [Grant a single role](https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role)
 and
 [`gcloud projects add-iam-policy-binding`](https://cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding).

### Set the organization policy for partner model access

To enable partner models, your organization policy must allow the following
API: Cloud Commerce Consumer Procurement API - `cloudcommerceconsumerprocurement.googleapis.com`

If your organization sets an organization policy to
[restrict service usage](https://cloud.google.com/resource-manager/docs/organization-policy/restricting-resources),
then an organization administrator must verify that
`cloudcommerceconsumerprocurement.googleapis.com` is allowed by
[setting the organization policy](https://cloud.google.com/resource-manager/docs/organization-policy/restricting-resources#setting_the_organization_policy).

Also, if you have an organization policy that restricts model usage in
Model Garden, the policy must allow access to partner models. For more
information, see [Control model
access](../control-model-access.md).

### Partner model regulatory compliance

The [certifications](https://cloud.google.com/security/compliance/services-in-scope) for
[Generative AI on Vertex AI](../code/code-models-overview.md) continue to
apply when partner models are used as a managed API using Vertex AI.
If you need details about the models themselves, additional information can be
found in the respective Model Card, or you can contact the respective model
publisher.

Your data is stored at rest within the selected region or multi-region for
partner models on Vertex AI, but the regionalization of data
processing may vary. For a detailed list of partner models' data processing
commitments, see [Data residency for partner
models](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#ml-processing-partner-models).

Customer prompts and model responses are not shared with third-parties when
using the Vertex AI API, including partner models. Google only processes
Customer Data as instructed by the Customer, which is further described in our
[Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum).