---
title: Purchase-Provisioned-Throughputgoogle.com/vertex-ai/generative-ai/docs/provisioned-throughput/purchase-provisioned-throughput
date_scraped: 2025-05-12
---

# Purchase Provisioned Throughput 

This page provides details to consider before subscribing to
Provisioned Throughput, the permissions you must have to place or to
view a Provisioned Throughput order, and the instructions for
placing and viewing your orders.

## What to consider before purchasing

To help you decide whether you want to purchase
Provisioned Throughput, consider the following:

- **You can't cancel your order in the middle of your term.**

 Your Provisioned Throughput purchase is a commitment, which
 means that you can't cancel the order in the middle of your term. However, you
 can increase the number of purchased GSUs. If you accidentally purchase a
 commitment or there's a problem with your configuration, [contact your
 Google Cloud account representative](https://cloud.google.com/contact) for assistance.
- **You can auto-renew your subscription.**

 When you submit your order, you can choose to auto-renew your subscription
 at the end of its term, or let the subscription expire. You can cancel the
 auto-renew process. To cancel your subscription before it auto renews, cancel
 the auto renewal 30 days before the start of the next term.

 You can configure monthly subscriptions to renew automatically each month.
 Weekly terms don't support automatic renewal.

 For more information, see [Change Provisioned Throughput order](https://cloud.google.com/vertex-ai/generative-ai/docs/purchase-provisioned-throughput#change-order). You can also [contact your Google Cloud account representative](https://cloud.google.com/contact) for assistance.
- **You can change your auto-renewal behavior, model, model version, or region with notice.**

 After you've chosen your project, region, model, model version, and
 auto-renewal behavior and your order is approved and activated,
 Provisioned Throughput is enabled, subject to available capacity.
 You can change your auto-renewal behavior, model, or model version by using
 the Google Cloud console, which you can use to modify your existing order. For
 more information, see
 [Change Provisioned Throughput order](https://cloud.google.com/vertex-ai/generative-ai/docs/purchase-provisioned-throughput#change-order).

 To change your region, [contact your Google Cloud account
 representative](https://cloud.google.com/contact) for assistance. A new order with a new subscription
 end date might be required.

 All changes are processed on a best-effort basis and are typically
 fulfilled within 10 business days of the initial request.

 Model changes are limited to a specific publisher. For example, you can
 switch the model assignment of Provisioned Throughput from Google
 Gemini 2.0 Pro to Google
 Gemini 2.0 Flash, but you can't switch from Google
 Gemini 2.0 Flash to Anthropic's Claude 3.5 Sonnet v2.
- **By default, the overage is billed as pay-as-you-go.**

 If your throughput exceeds your Provisioned Throughput order
 amount, overages are processed and billed as standard pay-as-you-go. You can
 control overages on a per-request basis. For more information, see
 [Use Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/use-provisioned-throughput).

For information about pricing, see
[Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/pricing#provisioned-throughput).

### Purchase Provisioned Throughput for preview models

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

You can purchase Provisioned Throughput for Google models in
preview, provided that a generally available version of the model hasn't been
released.

If you have an active Provisioned Throughput order for a preview
model and a generally available version of the model is released, then you can
do either of the following:

- Move the order to the generally available version of the model. Note that
 after you move your order to the generally available model, you can't switch
 your order back to the preview model. For more information about changing an
 order, see [Change Provisioned Throughput order](#change-order).
- Alternatively, continue using Provisioned Throughput for the
 preview version of a model as long as the preview version is stable. For more
 information about stable and retired models, see
 [Model versions and lifecycle](../learn/model-versions.md).

## Roles and permissions

The following role grants full access to manage Vertex AI Provisioned Throughput:

- **`roles/aiplatform.provisionedThroughputAdmin`**: You can access
 Vertex AI Provisioned Throughput resources.

This role includes the following permissions:

| **Permissions** | **Description** |
| --- | --- |
| `aiplatform.googleapis.com/provisionedThroughputs.create` | Submit a new Provisioned Throughput order. |
| `aiplatform.googleapis.com/provisionedThroughputs.get` | View a specific Provisioned Throughput order. |
| `aiplatform.googleapis.com/provisionedThroughputs.list` | View all Provisioned Throughput orders. |
| `aiplatform.googleapis.com/provisionedThroughputs.update` | Modify a Provisioned Throughput order. |
| `aiplatform.googleapis.com/provisionedThroughputs.cancel` | Cancel a pending order or pending update. |

## Place a Provisioned Throughput order

Some Imagen capabilities might not be publicly available. To learn more, see
[Restricted GA and Preview
features](../image/Imagen-on-Vertex-AI.md).

Before you place an order to use MedLM-large-1.5, [contact your Google Cloud account representative](https://cloud.google.com/contact) to request
access.

If you expect your QPM to exceed 30,000, then to maximize your
Provisioned Throughput order, [request an
increase](https://cloud.google.com/docs/quotas/view-manage#requesting_higher_quota) to your default
Vertex AI system quota using the following information:

- **Service**: The Vertex AI API.
- **Name**: `Online prediction requests per minute per region`
- **Service type**: A quota.
- **Dimensions**: The region where you ordered Provisioned Throughput.
- **Value**: This is your chosen online-prediction traffic limit.

Provisioned Throughput orders are processed based on the size of
the order and the available capacity. Depending on the number of GSUs requested
and the available capacity, it might take from a few minutes to a few weeks to
process your order.

Follow these steps to purchase Provisioned Throughput:

### Console

1. In the Google Cloud console, go to the Provisioned Throughput page.

 [Go to Provisioned Throughput](https://console.cloud.google.com/vertex-ai/provisioned-throughput)
2. To start a new order, click **New order**.
3. Enter an **Order name**.
4. Select the **Model**.
5. Select the **Region**.
6. Enter the **Number of generative AI scale units (GSUs)** that you must
 purchase.

 Optional: You can use the **Generative AI scale unit estimation tool** to estimate the number of GSUs that you'll need. To use this tool, do the following:

 1. Click **Estimation tool**.
 2. Select your **Model**.
 3. Based on the selected model, enter the details to
 estimate the number of GSUs needed.

 - For the Gemini 2.5 (preview) models, enter the following:

 - **Estimated queries per second requiring assurance**
 - **Input tokens per query**
 - **Input image tokens per query**
 - **Input video tokens per query**
 - **Input audio tokens per query**
 - **Output response text tokens per query**
 - **Output thinking response text tokens per query** (applicable only for the Gemini 2.5 Flash preview model)
 - **Output reasoning text tokens per query**
 - For Gemini 2.0 models, enter the following:

 - **Estimated queries per second requiring assurance**
 - **Input tokens per query**
 - **Input image tokens per query**
 - **Input video tokens per query**
 - **Input audio tokens per query**
 - **Output text tokens per query**
 - For Imagen models, enter the following:

 - **Queries per second**
 - **Output images per query**
 4. If you want to use the values that you entered into the estimation tool,
 click **Use calculated**.
7. Select your **Term**. The following options are available:

 - **1 week**
 - **1 month**
 - **3 months**
 - **1 year**
8. Optional: Select the **Start date and time** for your term (Preview).

 You can provide a start date and time within two weeks into the future from when
 you place the order. If you don't specify a start date and time, then the
 order is processed as soon as the capacity is available. Requested start
 dates and times are processed on a best-effort basis, and orders aren't
 guaranteed to be fulfilled by these dates until the order status is set to
 **Approved**.

 If your requested start date is too close to the current date, your order
 might be approved and activated after your requested start date. In this
 case, the end date is adjusted, based on the duration of the selected
 term, starting from the activation date. For information about cancelling
 a pending order, see [Change Provisioned Throughput order](#change-order).
9. In the **Renewal** list, specify whether you want to automatically renew
 the order at the end of the term. You can specify the renewal option only
 if you select **1 month**, **3 months**, or **1 year** as the term.
10. Click **Continue**.
11. In the **Summary** section, review the price and throughput estimates for
 your order. Read the terms listed and linked in the form.
12. To finalize your order, click **Confirm**.

 It can take from a few minutes to a few weeks to process an order,
 depending on the order size and the available capacity. After the order is
 processed, its status in the Google Cloud console changes to
 **Active**. You're billed for the order only after it becomes active.

## Change Provisioned Throughput order

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This table describes how you can modify your Provisioned Throughput
orders through the
[Google Cloud console](https://console.cloud.google.com/vertex-ai/provisioned-throughput) based on the
status of your order and any existing conditions. Modifying your orders is a
Preview feature and is only available for online orders placed through
the console. For changes to offline orders, contact your [Google Cloud account
representative](https://cloud.google.com/contact) for assistance.

Also, changes made when using the Google Cloud console to your model or model
version modifies the existing order while keeping the same subscription end
date.

| **Order status** | **Action** | **Note** | **Steps in Google Cloud console** |
| --- | --- | --- | --- |
| **Pending review** | You can cancel your order. | If you have additional changes to your order, then cancel the pending order, and place a new order. If you have multiple models, each model can have only one pending order revision or pending order at a time. | To cancel your pending order in the Google Cloud console, do the following: 1. Go to the [**Provisioned Throughput** page](https://console.cloud.google.com/vertex-ai/provisioned-throughput). 2. Select the **Region** where your pending order is located. 3. To go to the **Order details** page, click the **Order ID** for the order that you want to cancel. 4. Click **Cancel**. 5. In the **Are you sure you want to cancel the order?** dialog, click **Cancel Order**. |
| **Approved** | You can't modify your order. | The order is awaiting activation. You can't make changes to your order at this time. | Not applicable |
| **Active** | The following actions are permitted only if the order doesn't expire in the next five days or renews automatically: - You can increase GSUs on existing orders. - You can enable or disable automatic renewals. - You can change the model or model version. | You can't change an active order if it expires in less than five days and isn't set up to renew automatically. | To change your active order in the Google Cloud console, use one of the following methods: - In the [**Provisioned Throughput**](https://console.cloud.google.com/vertex-ai/provisioned-throughput) page, click the symbol from the **Actions** column, and click **Edit**. - In the **Order details** page, click the **Edit** button. |

## Check order status

After you submit your Provisioned Throughput order, the order status might
appear as one of the following:

- **Pending review**: You placed your order. Because approval depends on
 available capacity to provision your order, your order is waiting for review
 and approval. For more information about the status of your pending order,
 [contact your Google Cloud account representative](https://cloud.google.com/contact).
- **Approved**: Google has approved your order and the order is awaiting
 activation. You can't make changes after the order is approved.
- **Active**: Google has activated your order, and then billing starts.
- **Expired**: Your order has expired.

## View Provisioned Throughput orders

Follow these steps to view your Provisioned Throughput orders:

### Console

1. In the Google Cloud console, go to the Provisioned Throughput page.

 [Go to Provisioned Throughput](https://console.cloud.google.com/vertex-ai/provisioned-throughput)
2. Select the **Region**. Your list of orders appears.

## What's next

- [Use Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/use-provisioned-throughput).