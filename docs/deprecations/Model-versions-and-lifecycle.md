---
title: Model-versions-and-lifecyclegoogle.com/vertex-ai/generative-ai/docs/deprecations/palm
date_scraped: 2025-05-12
---

# Model versions and lifecycle 

This document defines key terms related to the lifecycle stages and important
dates for Gemini and embedding models that are available on
Google Cloud Vertex AI. It also gives you the recommended upgrades for
the models and points you to available migration paths.

## Key Terms

**Stable model**: A publicly released version of the model that is available and
supported for production use starting on the release date. A stable model
version is typically released with a *retirement date*, which indicates the last
day that the model is available. After this date, the model is no longer
accessible or supported by Google.

- **Latest stable model**: The latest version within the model family
 recommended for new and active projects and should be the target for
 migrations from earlier versions. See [Latest stable models](#latest-stable).
- **Legacy stable model**: A model version that's been superseded by the Latest
 Stable Model. Although legacy stable models are still supported, you should
 strongly consider migrating to the latest model to receive the latest features
 and improvements. Access to legacy stable models might be restricted for new
 projects. See [Legacy stable models](#legacy-stable).

**Retired model**: The model version is past its retirement date and has been
permanently deactivated. Retired models are no longer accessible or supported by
Google. API requests referencing a retired model ID typically returns a 404
error. See [Retired models](#retired-models).

**Recommended upgrade**: The latest stable model that we recommend switching to.
Latest stable models tend to offer better performance and more capabilities as
compared to legacy stable models. See the recommended upgrades in the
[Legacy stable models](#legacy-stable) and [Retired models](#retired-models)
sections.

## Latest stable models

The following table lists the latest stable models:

| Model ID | Release date | Retirement date | Details |
| --- | --- | --- | --- |
| `gemini-2.0-flash-001` | February 5, 2025 | February 5, 2026 | [Gemini 2.0: Flash, Flash-Lite and Pro - Google Developers Blog](https://developers.googleblog.com/en/gemini-2-family-expands/) |
| `gemini-2.0-flash-lite-001` | February 25, 2025 | February 25, 2026 | [Gemini 2.0: Flash, Flash-Lite and Pro - Google Developers Blog](https://developers.googleblog.com/en/gemini-2-family-expands/) |
| `text-embedding-005` | November 18, 2024 | No retirement date announced | |
| `text-multilingual-embedding-002` | May 14, 2024 | No retirement date announced | |
| `multimodalembedding@001` | February 12, 2024 | No Retirement date announced | |

## Legacy stable models

The following table lists legacy stable models:

| Model ID | Release date | Retirement date | Recommended upgrade |
| --- | --- | --- | --- |
| `gemini-1.5-pro-001`\* | May 24, 2024 | May 24, 2025 | `gemini-2.0-flash` |
| `gemini-1.5-flash-001`\* | May 24, 2024 | May 24, 2025 | `gemini-2.0-flash-lite` |
| `textembedding-gecko@003*` | December 12, 2023 | May 24, 2025 | `text-embedding-005` |
| `textembedding-gecko-multilingual@001`\* | November 2, 2023 | May 24, 2025 | `text-multilingual-embedding-002` |
| `gemini-1.5-pro-002`\* | September 24, 2024 | September 24, 2025 | `gemini-2.0-flash` |
| `gemini-1.5-flash-002`\* | September 24, 2024 | September 24, 2025 | `gemini-2.0-flash-lite` |
| `text-embedding-004` | May 14, 2024 | November 18, 2025 | `text-embedding-005` |

\*: Restricted for new projects.

## Migrate to a latest stable model

To learn how to migrate to a latest stable model, see
[Migrate your application to Gemini 2 with the Vertex AI Gemini API](https://cloud.google.com/vertex-ai/generative-ai/docs/migrate-to-v2).
This guide gives you a set of migration steps that aims to minimize some
potential risks involved in model migration and helps you use new models in an
optimal way.

However, if you don't have time to follow the guide and just need to quickly
resolve the errors caused by models reaching their retirement dates, do the following:

1. Update your application to point to the recommended upgrades.
2. Test all mission critical features to make sure everything works as expected.
3. Deploy the updates like you normally would.

## Gemini auto-updated aliases

The auto-updated alias of a Gemini model always points to the latest
stable model. When a new latest stable model is available, the auto-updated
alias automatically points to the new version.

The following table shows the auto-updated aliases for Gemini models
and the latest stable models that they point to.

| Auto-updated alias | Stable version reference |
| --- | --- |
| `gemini-2.0-flash-lite` | `gemini-2.0-flash-lite-001` |
| `gemini-2.0-flash` | `gemini-2.0-flash-001` |
| `gemini-1.5-pro` | `gemini-1.5-pro-002` |
| `gemini-1.5-flash` | `gemini-1.5-flash-002` |

## Retired models

#### The following table lists the retired models (click to expand)

| Model ID | Release date | Retirement date | Recommended upgrade |
| --- | --- | --- | --- |
| `gemini-1.0-pro-001` | February 15, 2024 | April 21, 2025 | `gemini-2.0-flash` |
| `gemini-1.0-pro-002` | April 9, 2024 | April 21, 2025 | `gemini-2.0-flash` |
| `gemini-1.0-pro-vision-001` | February 15, 2024 | April 21, 2025 | `gemini-2.0-flash` |
| `text-bison` | May 2023 | April 21, 2025 | `gemini-2.0-flash-lite` |
| `chat-bison` | May 2023 | April 21, 2025 | `gemini-2.0-flash-lite` |
| `code-gecko` | May 2023 | April 21, 2025 | `gemini-2.0-flash-lite` |
| `textembedding-gecko@002` | November 2, 2023 | April 21, 2025 | `text-embedding-005` |
| `textembedding-gecko@001` | June 7, 2023 | April 21, 2025 | `text-embedding-005` |