---
date_scraped: 2025-05-12
title: Extensions Overview
---

# Extensions overview 

**Preview**

Vertex AI Extensions is a Preview offering, subject to the
"Pre-GA Offerings Terms" of the
[Google Cloud Service Specific Terms](https://cloud.google.com/terms/service-terms). Pre-GA products and features
may have limited support, and changes to pre-GA products and features may not be compatible with
other pre-GA versions. For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages). Further, by using
Vertex AI Extensions, you agree to the Generative AI Preview
[terms and conditions](/trustedtester/aitos) ("Preview Terms").

A Vertex AI
[`extension`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions) is a structured
API wrapper that connects a model to an API for processing real-time data or
performing real-world actions.

The difference between Extensions and
[Functions](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling)
is in the execution of the *Tool*. Extensions are automatically executed by
Vertex AI. Whereas functions must be [manually executed by the user or
client](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling#invoke-api).

To streamline the extension creation process, we provide prebuilt
*Extensions by Google* for common use cases, such as [code
interpretation](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/code-interpreter) and
[Vertex AI Search](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/vertex-ai-search).
If your use case doesn't align with these templates, you can create your own
[custom extension](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/create-extension).

## Use-cases and benefits

The following are some possible extensions use cases:

- Generate and run code.
- Query websites and synthesize information.
- Answer questions based on information within a collection of
 enterprise-specific data.
- Query and analyze datastores.

Vertex AI extensions provide the following benefits:

- **Enterprise controls**:
 [Identity and Access Management (IAM)](https://cloud.google.com/iam) permissions and
 security controls.
- **Data security**: Contractual agreements that your private data won't be
 leaked or used in model training
- **Performance agreements**: Contractual agreements that the platform
 delivers specific features and uptimes.
- **Private extensions**: Authorized users in your organization or a trusted
 partner can use extensions to access sensitive internal data and actions,
 such as searching internal knowledge bases or completing HR actions.
- **Google product integrations**: Integration with Google products like
 Vertex AI Search, BigQuery and specialized models.

## Extensions by Google

Google provides the following prebuilt extensions:

- [Code Interpreter](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/code-interpreter)
- [Vertex AI Search](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/vertex-ai-search)

## What's next

- [Create, register, and run
 extensions](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/create-extension).
- [Register and use Google-provided extensions](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/google-extensions)
- [Use Reasoning Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/reasoning-engine/overview).