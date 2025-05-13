---
title: Gemini-20-Flash
source: https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash
date_scraped: 2025-05-12
---

# Gemini 2.0 Flash 

Gemini 2.0 Flash delivers next-gen features and improved
capabilities, including superior speed, built-in tool use, multimodal
generation, and a 1M token context window.

## 2.0 Flash

[Try in Vertex AI](https://console.cloud.google.com/vertex-ai/generative/multimodal/create/text?model=gemini-2.0-flash-001) [View model card in Model Garden](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/gemini-2.0-flash-001) [(Preview) Deploy example app](https://console.cloud.google.com/vertex-ai/studio/multimodal?suggestedPrompt=How%20does%20AI%20work&deploy=true&model=gemini-2.0-flash-001)

Note: To use the "Deploy example app" feature, you need a Google Cloud project with billing and Vertex AI API enabled.

| | | |
| --- | --- | --- |
| Model ID | `gemini-2.0-flash` | |
| Supported inputs & outputs | - Inputs: Text, Code, Images, Audio, Video - Outputs: Text | |
| Token limits | - Maximum input tokens: 1,048,576 - Maximum output tokens: 8,192 | |
| Capabilities | - Supported - [Grounding with Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search) - [Code execution](../../multimodal/code-execution_1.md) - [Tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models) - [System instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instruction-introduction) - [Controlled generation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output) - [Batch prediction](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/batch-prediction-gemini) - [Function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling) - [Count Tokens](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/get-token-count) - [Context caching](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview) - [Vertex AI RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview) - [Chat completions](https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/openai/overview) - Not supported - [Live API](../../live-api_1.md) previewPreview feature - [Thinking](../../thinking_1.md) previewPreview feature | |
| Usage types | - Supported - [Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput) - [Dynamic shared quota](https://cloud.google.com/vertex-ai/generative-ai/docs/dsq) - Not supported - [Fixed quota](../../quotas.md) | |
| Technical specifications |
| **Images** photo | - Maximum images per prompt: 3,000 - Maximum image size: 7 MB - Maximum tokens per minute (TPM) per project: - High/Medium/Default media resolution: - US/Asia: 40 M - EU: 10 M - Low media resolution: - US/Asia: 10 M - EU: 2.6 M - Supported MIME types: `image/png`, `image/jpeg`, `image/webp` |
| **Documents** description | - Maximum number of files per prompt: 3,000 - Maximum number of pages per file: 1,000 - Maximum file size per file: 50 MB - Maximum tokens per minute (TPM) per project1: - US/Asia: 3.4 M - EU: 3.4 M - Supported MIME types: `application/pdf`, `text/plain` |
| **Video** videocam | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Maximum tokens per minute (TPM): - High/Medium/Default media resolution: - US/Asia: 38 M - EU: 10 M - Low media resolution: - US/Asia: 10 M - EU: 2.5 M - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Audio** mic | - Maximum audio length per prompt: Appropximately 8.4 hours, or up to 1 million tokens - Maximum number of audio files per prompt: 1 - Speech understanding for: Audio summarization, transcription, and translation - Maximum tokens per minute (TPM): - US/Asia: 3.5 M - EU: 3.5 M - Supported MIME types: `audio/x-aac`, `audio/flac`, `audio/mp3`, `audio/m4a`, `audio/mpeg`, `audio/mpga`, `audio/mp4`, `audio/opus`, `audio/pcm`, `audio/wav`, `audio/webm` |
| **Parameter defaults** tune | - Temperature: 0-2 - topP: 0.95 - topK: 64 (fixed) - candidateCount: 1-8 |
| Knowledge cutoff date | June 2024 | |
| Versions | - `gemini-2.0-flash-001` - Launch stage: Generally available - Release date: February 5, 2025 - Discontinuation date: February 5, 2026 | |
| Supported regions |
| Model availability (Includes dynamic shared quota & Provisioned Throughput) | - Global - global - United States - us-central1 - us-east1 - us-east4 - us-east5 - us-south1 - us-west1 - us-west4 - Europe - europe-central2 - europe-north1 - europe-southwest1 - europe-west1 - europe-west4 - europe-west8 - europe-west9 |
| ML processing | - United States - Multi-region - Europe - Multi-region |
| See [Data residency](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/data-residency) for more information. | |
| Security controls |
| **Online prediction** | - Data residency (at rest) Supported - Customer-managed encryption keys (CMEK) Supported - VPC Service Controls Supported - Access Transparency (AXT) Supported |
| **Batch prediction** | - Data residency (at rest) Supported - Customer-managed encryption keys (CMEK) Not supported - VPC Service Controls Supported - Access Transparency (AXT) Not supported |
| **Tuning** | - Data residency (at rest) Supported - Customer-managed encryption keys (CMEK) Supported - VPC Service Controls Supported - Access Transparency (AXT) Not supported |
| See [Security controls](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) for more information. | |
| Pricing | See [Pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing). | |

## Image generation

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

[Try in Vertex AI](https://console.cloud.google.com/vertex-ai/generative/multimodal/create/text?model=gemini-2.0-flash-preview-image-generation)

| | | |
| --- | --- | --- |
| Model ID | `gemini-2.0-flash-preview-image-generation` | |
| Supported inputs & outputs | - Inputs: Text, Code, Images, Audio, Video - Outputs: Text and image | |
| Token limits | - Maximum input tokens: 32,768 - Maximum output tokens: 8,192 | |
| Capabilities | - Supported - [System instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instruction-introduction) - [Count Tokens](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/get-token-count) - Not supported - [Grounding with Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search) - [Code execution](../../multimodal/code-execution_1.md) - [Tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models) - [Controlled generation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output) - [Batch prediction](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/batch-prediction-gemini) - [Function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling) - [Live API](../../live-api_1.md) previewPreview feature - [Thinking](../../thinking_1.md) previewPreview feature - [Context caching](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview) - [Vertex AI RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview) | |
| Usage types | - Supported - [Dynamic shared quota](https://cloud.google.com/vertex-ai/generative-ai/docs/dsq) - Not supported - [Fixed quota](../../quotas.md) - [Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput) | |
| Technical specifications |
| **Images** photo | - Maximum images per prompt: 3,000 - Maximum image size: 7 MB - Maximum number of output images per prompt: 10 - Maximum tokens per minute (TPM) per project: - High/Medium/Default media resolution: - US/Asia: 40 M - EU: 10 M - Low media resolution: - US/Asia: 10 M - EU: 3 M - Supported MIME types: `image/png`, `image/jpeg`, `image/webp` |
| **Documents** description | - Maximum number of files per prompt: 3,000 - Maximum number of pages per file: 1,000 - Maximum file size per file: 50 MB - Supported MIME types: `application/pdf`, `text/plain` |
| **Video** videocam | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Maximum tokens per minute (TPM): - High/Medium/Default media resolution: - US/Asia: 37.9 M - EU: 9.5 M - Low media resolution: - US/Asia: 1 G - EU: 2.5 M - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Audio** mic | - Maximum audio length per prompt: Appropximately 8.4 hours, or up to 1 million tokens - Maximum number of audio files per prompt: 1 - Speech understanding for: Audio summarization, transcription, and translation - Maximum tokens per minute (TPM): - US/Asia: 1.7 M - EU: 0.4 M - Supported MIME types: `audio/x-aac`, `audio/flac`, `audio/mp3`, `audio/m4a`, `audio/mpeg`, `audio/mpga`, `audio/mp4`, `audio/opus`, `audio/pcm`, `audio/wav`, `audio/webm` |
| **Parameter defaults** tune | - Temperature: 0-2 - topP: 0.95 - topK: 64 (fixed) - candidateCount: 1-8 |
| Knowledge cutoff date | August 2024 | |
| Versions | - `gemini-2.0-flash-preview-image-generation` - Launch stage: Public preview - Release date: May 6, 2025 | |
| Supported regions |
| Model availability | - global - global |
| See [Data residency](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/data-residency) for more information. | |
| Security controls |
| **Online prediction** | - Data residency (at rest) Not supported - Customer-managed encryption keys (CMEK) Not supported - VPC Service Controls Supported - Access Transparency (AXT) Supported |
| See [Security controls](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) for more information. | |
| Pricing | See [Pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing). | |

## Live API

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

[Try in Vertex AI](https://console.cloud.google.com/vertex-ai/generative/multimodal/create/text?model=gemini-2.0-flash-live-preview-04-09)

| | | |
| --- | --- | --- |
| Model ID | `gemini-2.0-flash-live-preview-04-09` | |
| Supported inputs & outputs | - Inputs: Audio, Video - Outputs: Audio | |
| Token limits | - Maximum input tokens: 32,768 - Maximum output tokens: 8,192 | |
| Capabilities | - Supported - [Grounding with Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search) - [Code execution](../../multimodal/code-execution_1.md) - [System instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instruction-introduction) - [Function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling) - [Live API](../../live-api_1.md) previewPreview feature - [Context caching](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview) - Not supported - [Tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models) - [Controlled generation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output) - [Batch prediction](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/batch-prediction-gemini) - [Thinking](../../thinking_1.md) previewPreview feature - [Vertex AI RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview) | |
| Usage types | - Supported - [Dynamic shared quota](https://cloud.google.com/vertex-ai/generative-ai/docs/dsq) - Not supported - [Fixed quota](../../quotas.md) - [Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput) | |
| Technical specifications |
| **Video** videocam | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Maximum tokens per minute (TPM): - High/Medium/Default media resolution: - US/Asia: 37.9 M - EU: 9.5 M - Low media resolution: - US/Asia: 1 G - EU: 2.5 M - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Audio** mic | - Maximum audio length per prompt: Appropximately 8.4 hours, or up to 1 million tokens - Maximum number of audio files per prompt: 1 - Speech understanding for: Audio summarization, transcription, and translation - Maximum tokens per minute (TPM): - US/Asia: 1.7 M - EU: 0.4 M - Supported MIME types: `audio/x-aac`, `audio/flac`, `audio/mp3`, `audio/m4a`, `audio/mpeg`, `audio/mpga`, `audio/mp4`, `audio/opus`, `audio/pcm`, `audio/wav`, `audio/webm` |
| **Parameter defaults** tune | - Temperature: 0-2 - topP: 0.95 - topK: 64 (fixed) - candidateCount: 1-8 |
| Knowledge cutoff date | June 2024 | |
| Versions | - `gemini-2.0-flash-live-preview-04-09` - Launch stage: Public preview - Release date: April 9, 2025 | |
| Supported regions |
| Model availability | - Global - global - United States - us-central1 |
| See [Data residency](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/data-residency) for more information. | |
| Security controls |
| **Online prediction** | - Data residency (at rest) Not supported - Customer-managed encryption keys (CMEK) Not supported - VPC Service Controls Supported - Access Transparency (AXT) Supported |
| See [Security controls](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) for more information. | |
| Pricing | See [Pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing). | |