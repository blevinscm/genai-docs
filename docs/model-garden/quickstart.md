---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/quickstart
title: Try It Test Model Capabilities Using Demo Playgrounds In Model Gardenstay Organized
  With Collections
---

# Try it: Test model capabilities using demo playgrounds in Model Garden 

Model Garden hosts public demo playgrounds for
[supported models](#supported_models). The playgrounds are powered by predeployed
Vertex AI [online prediction endpoints](https://cloud.google.com/vertex-ai/docs/predictions/overview).

When you open the model card for a supported model, a **Try out** panel is
embedded in the card. You can quickly test the model's capabilities by sending a
text prompt in the **Try out** panel. The **Try out** panel also lets you set
some of the most common parameters such as temperature and number of output
tokens.

## Supported models

The following models have demo playgrounds available.

| Provider | Models |
| --- | --- |
| Google | - Gemma 2 2B it (instruction tuned) - Gemma 2 9B it (instruction tuned) - Gemma 2 27B it (instruction tuned) - Gemma 2B - Gemma 2B it (instruction tuned) - Gemma 7B - Gemma 7B it (instruction tuned) |
| Meta | - Llama 3 8B Instruct - Llama 3 70B Instruct - Llama 2 7B - Llama 2 7B Chat - Llama 2 13B Chat - Llama 2 70B Chat (Int8) - Code Llama 7B Python |
| IIT | - Falcon 7B |
| Mistral AI | - Mixtral 8x7B |

## Before you begin

This tutorial requires you to set up a Google Cloud project and enable the
Vertex AI API.

- Sign in to your Google Cloud account. If you're new to
 Google Cloud, [create an account](https://console.cloud.google.com/freetrial) to evaluate how our products perform in
 real-world scenarios. New customers also get $300 in free credits to
 run, test, and deploy workloads.
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)

## Try out Gemma 2

In this quickstart, you try out the `Gemma-2b-it` model. Note that
`-it` stands for [instruction-tuned](https://cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-gemma#gem-model-sizes).

1. In the Google Cloud console, go to the **Gemma 2** model card.

 [Go to Gemma 2](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/gemma2)
2. In the **Try out** panel:

 1. For **Region**, accept the default or choose your region.
 2. For **Endpoint**, select **Demo playground (Free)2b-it**.
 3. In the **Prompt** box, enter `Why is the sky blue?`.
 4. Expand the **Advanced options** section and view the default parameters.
3. Click **Submit**. The output appears below the Submit button.

## Clean up

To avoid incurring charges to your Google Cloud account for the resources used
on this page, follow these steps.

### Delete the project

The easiest way to eliminate billing is to delete the project that you
created for the tutorial.

To delete the project:

**Caution**: Deleting a project has the following effects:

- **Everything in the project is deleted.** If you used an existing project for
 the tasks in this document, when you delete it, you also delete any other work you've
 done in the project.
- **Custom project IDs are lost.**
 When you created this project, you might have created a custom project ID that you want to use in
 the future. To preserve the URLs that use the project ID, such as an `appspot.com`
 URL, delete selected resources inside the project instead of deleting the whole project.

If you plan to explore multiple architectures, tutorials, or quickstarts, reusing projects
can help you avoid exceeding project quota limits.

1. In the Google Cloud console, go to the **Manage resources** page.

 [Go to Manage resources](https://console.cloud.google.com/iam-admin/projects)
2. In the project list, select the project that you
 want to delete, and then click **Delete**.
3. In the dialog, type the project ID, and then click
 **Shut down** to delete the project.

## What's next

See an [overview of Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models).