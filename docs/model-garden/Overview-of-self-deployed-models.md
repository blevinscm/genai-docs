---
date_scraped: 2025-05-12
title: Overview Of Self Deployed Models
---

# Overview of self-deployed models 

Model Garden offers both self-deploy open and partner models
that you can deploy and serve on Vertex AI. These models are different
from the [model-as-a-service (MaaS)](../partner-models/use-partner-models.md) offerings, which are serverless and
require no manual deployment.

When you self deploy models, you deploy them securely within your
Google Cloud project and VPC network.

## Self-deploy open models

Open models provide pretrained capabilities for various AI tasks, including
Gemini models that excel in multimodal processing. An open model is
freely available, you are free to publish its outputs, and it can be used
anywhere as long as you adhere to its licensing terms.
[Vertex AI](../start/express-mode/Tutorial-Vertex-AI-API-in-express-mode.md) offers both open (also known as *open weight*)
and open source models.

When you use an open model with Vertex AI, you use Vertex AI for
your infrastructure. You can also use open models with other infrastructure
products, such as PyTorch or Jax.

### Open weight models

Many open models are considered open weight large language models (LLMs). Open
models provide more transparency than models that aren't open weight. A
model's weights are the numerical values stored in the model's neural network
architecture that represent learned patterns and relationships from the data a
model is trained on. The pretrained parameters, or weights, of open weight
models are released. You can use an open weight model for inference and tuning
while details such as the original dataset, model architecture, and training
code aren't provided.

### Open source models

Open models differ from open source AI models. While open models often expose
the weights and the core numerical representation of learned patterns, they
don't necessarily provide the full source code or training details. Providing
weights offers a level of AI model transparency, allowing you to
understand the model's capabilities without needing to build it yourself.

## Self-deploy partner models

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

Model Garden helps you purchase and manage model licenses from partners
who offer proprietary models as a self deploy option. After you purchase
access to a model from Cloud Marketplace, you can choose to deploy on
on-demand hardware or use your Compute Engine reservations and
committed use discounts to meet your budget requirements. You are charged for
model usage and for the Vertex AI infrastructure that you use.

To request usage of a self-deploy partner model, find the relevant model in
the [Model Garden console](https://console.cloud.google.com/vertex-ai/model-garden), click **Contact sales**, and
then complete the form, which initiates contact with a Google Cloud sales
representative.

For more information about deploying and using partner models, see [Deploy a
partner model and make prediction requests](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/use-models#deploy_a_partner_model_and_make_prediction_requests).

### Considerations

Consider the following limitations when using self-deploy partner models:

- Unlike with open models, you cannot export weights.
- If you VPC Service Controls set up for your project, you can't upload
 models, which prevents you from deploying partner models.
- For endpoints, only the [shared public endpoint](https://cloud.google.com/vertex-ai/docs/predictions/choose-endpoint-type) type is
 supported.

**Note:** Support for model-specific issues is provided by the partner. To contact
a partner for model performance related issues, use the contact details in the
"Support" section of their Model Garden model card.

## Learn more about self-deployed models in Vertex AI

- For more information about Model Garden, see [Overview of
 Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models).
- For more information about deploying models, see [Use models in
 Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/use-models).
- [Use Gemma open models](https://cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-gemma)
- [Use Llama open models](../open-models/use-llama.md)
- [Use Hugging Face open models](https://cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-hugging-face-models)