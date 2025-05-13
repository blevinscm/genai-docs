---
title: Gemini-25-Flash
source: https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash
date_scraped: 2025-05-12
---

# Gemini 2.5 Flash 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

Gemini 2.5 Flash is a thinking model that offers great, well-rounded
capabilities. It is designed to offer a balance between price and performance.

[Try in Vertex AI](https://console.cloud.google.com/vertex-ai/generative/multimodal/create/text?model=gemini-2.5-flash-preview-04-17) [View model card in Model Garden](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/gemini-2.5-flash-preview-04-17) [(Preview) Deploy example app](https://console.cloud.google.com/vertex-ai/studio/multimodal?suggestedPrompt=How%20does%20AI%20work&deploy=true&model=gemini-2.5-flash-preview-04-17)

Note: To use the "Deploy example app" feature, you need a Google Cloud project with billing and Vertex AI API enabled.

| | | |
| --- | --- | --- |
| Model ID | `gemini-2.5-flash-preview-04-17` | |
| Supported inputs & outputs | - Inputs: Text, Code, Images, Audio, Video - Outputs: Text | |
| Token limits | - Maximum input tokens: 1,048,576 - Maximum output tokens: 65,535 | |
| Capabilities | - Supported - [Grounding with Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search) - [Code execution](../../multimodal/code-execution_1.md) - [System instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instruction-introduction) - [Controlled generation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output) - [Function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling) - [Count Tokens](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/get-token-count) - [Thinking](../../thinking_1.md) previewPreview feature - [Context caching](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview) - [Vertex AI RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview) - [Chat completions](https://cloud.google.com/vertex-ai/generative-ai/docs/migrate/openai/overview) - Not supported - [Tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models) - [Batch prediction](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/batch-prediction-gemini) - [Live API](../../live-api_1.md) previewPreview feature | |
| Usage types | - Supported - [Dynamic shared quota](https://cloud.google.com/vertex-ai/generative-ai/docs/dsq) - Not supported - [Fixed quota](../../quotas.md) - [Provisioned Throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput) | |
| Technical specifications |
| **Images** photo | - Maximum images per prompt: 3,000 - Maximum image size: 7 MB - Supported MIME types: `image/png`, `image/jpeg`, `image/webp` |
| **Documents** description | - Maximum number of files per prompt: 3,000 - Maximum number of pages per file: 1,000 - Maximum file size per file for the API or Cloud Storage imports: 50 MB - Maximum file size per file for direct uploads through the console: 7 MB - Supported MIME types: `application/pdf`, `text/plain` |
| **Video** videocam | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Audio** mic | - Maximum audio length per prompt: Appropximately 8.4 hours, or up to 1 million tokens - Maximum number of audio files per prompt: 1 - Speech understanding for: Audio summarization, transcription, and translation - Supported MIME types: `audio/x-aac`, `audio/flac`, `audio/mp3`, `audio/m4a`, `audio/mpeg`, `audio/mpga`, `audio/mp4`, `audio/opus`, `audio/pcm`, `audio/wav`, `audio/webm` |
| **Parameter defaults** tune | - Temperature: 0-2 - topP: 0.95 - topK: 64 (fixed) - candidateCount: 1-8 |
| Knowledge cutoff date | January 2025 | |
| Versions | - `gemini-2.5-flash-preview-04-17` - Launch stage: Public preview - Release date: April 17, 2025 | |
| Supported regions |
| Model availability | - Global - global - United States - us-central1 |
| See [Data residency](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/data-residency) for more information. | |
| Security controls |
| See [Security controls](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) for more information. | |
| Pricing | See [Pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing). | |