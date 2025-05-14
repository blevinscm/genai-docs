---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/image/quickstart-image-generate-console#delete-the-project
title: Quickstart Generate And Verify An Images Watermark Using Imagen Text To Image
  Console Bookmark Border
---

# Quickstart: Generate and verify an image's watermark using Imagen text-to-image (Console) bookmark\_borderbookmark 

**API reference overview**: To view an overview of the API options for image generation and
editing, see the [`imagegeneration` model API reference](../model-reference/imagen-api.md).

Learn how to use Imagen on Vertex AI's text-to-image generation feature and
verify a digital watermark ([SynthID](https://deepmind.google/technologies/synthid/)) on a generated image. This
quickstart shows you how to use Imagen image generation in the
Google Cloud console.

Imagen on Vertex AI pricing is based on the feature you use. For more
information, see [Pricing](https://cloud.google.com/vertex-ai/pricing#generative_ai_models).

Image generated using Imagen on Vertex AI from the prompt:
*portrait of a french bulldog at the beach, 85mm f/2.8*.

## Before you begin

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

## Generate images and save a local copy

Send the text-to-image generation request using the Google Cloud console.

1. In the Google Cloud console, open the **Vertex AI Studio > Media** tab in the
 Vertex AI dashboard.

 [Go to the Vertex AI Studio tab](https://console.cloud.google.com/vertex-ai/generative/vision)
2. In the **Prompt** (*Write your prompt here*) field, enter the following
 prompt:

 ```python
 portrait of a french bulldog at the beach, 85mm f/2.8

 ```
3. If not selected, in the **Model options** box in the **Parameters** panel,
 select `Imagen 3`.
4. If not selected, in the **Aspect ratio** section in the **Parameters**
 panel, select `1:1`.
5. In the **Number of results** section, change the **Number of results** to
 `2`.
6. Click play\_arrow**Generate**.

 Generating images produces images similar to the following images:
7. To save a local copy of an image, click one of the images.
8. In the **Image details** window that opens, click **Export**.
9. In the **Export image** dialog box, click **Export**.

## Verify an image's digital watermark

After you generate watermarked images, you can verify the digital watermark of
the novel images.

1. [Create generated images and save a local copy as you did in the previous
 step](#generate-images).
2. In the **Image detail** window, click **Export**.
3. In the lower panel, click local\_police**Verify**.
4. Click **Upload image**.
5. Select a locally-saved generated image.

Congratulations! You've just used the Imagen text-to-image
generation feature to create novel images and verify the digital watermark of
one of the images.

## Clean up

To avoid incurring charges to your Google Cloud account for the resources used
on this page, follow these steps.

### Delete the project

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

- Learn about all image generative AI features in the
 [Imagen on Vertex AI overview](Imagen-on-Vertex-AI.md).
- Read [usage
 guidelines](https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#imagen-guidelines) for
 Imagen on Vertex AI.
- Explore more pretrained models in
 [Model Garden](https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models).
- Learn about [responsible AI best practices and Vertex AI's safety
 filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).

Was this helpful?