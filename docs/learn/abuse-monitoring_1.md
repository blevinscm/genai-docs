---
title: Abuse monitoring
source: https://cloud.google.com/vertex-ai/generative-ai/docs/learn/abuse-monitoring
date_scraped: 2025-05-12
---

# Abuse monitoring 

As outlined in Section 4.3 "Generative AI Safety and Abuse" of [Google Cloud Platform Terms of Service](/terms), Google uses the following process to detect potential abuse and violations of its
[Acceptable Use Policy](https://cloud.google.com/terms/aup) and
[Prohibited Use Policy](https://policies.google.com/terms/generative-ai/use-policy) as part of providing Generative AI Services to customers.

- **Automated detection**: Google uses automated
 safety classifiers to detect potential abuse and violations. For technical details on how safety classifiers work, see
 [Configure safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-filters).
- **Prompt logging**: If automated safety classifiers detect suspicious activity that requires further investigation into whether a customer has violated our policies, then Google may log customer prompts solely for the purpose of examining whether a violation of the AUP or Prohibited Use Policy has occurred. This data won't be used to train or fine-tune any AI/ML models. This data is stored securely for up to 30 days in the same region or multi-region selected by the customer for their project and adheres to Google Cloud assurances, such as Data Residency, Access Transparency and VPC Service Controls. Customers also have the option to request an opt-out from abuse logging (see below).
- **Action**: Authorized Google employees may assess the
 flagged prompts and may reach out to the customer for clarification. Failure to address the behavior—or recurring or severe abuse—may
 result in suspension or termination of the customer's access to
 Vertex AI or Google Cloud services.
- **Services in scope**: Vertex AI API, when used with Google's large language models.
- **Customers in scope**: Only customers whose use of Google Cloud is governed
 by the [Google Cloud Platform Terms of Service](/terms) and who don't have an [invoiced (offline) Cloud Billing account](https://cloud.google.com/billing/docs/concepts#billing_account_types) are subject to
 prompt logging for abuse monitoring.
- **Customer opt-out**: Customers may request for
 an exception by filling out this [form](https://forms.gle/mtjKKas8a82grYN6A). If
 approved, Google won't store any prompts associated with the approved
 Google Cloud account.

## What's next

- Learn about [Responsible AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).