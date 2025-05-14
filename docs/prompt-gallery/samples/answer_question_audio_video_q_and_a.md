---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/prompt-gallery/samples/answer_question_audio_video_q_and_a
title: Audiovideo Qa
---

# Audio/video Q&A 

Audio/video Q&A

| | |
| --- | --- |
| You can query a model directly and test the results returned when using different parameter values with the Cloud console, or by calling the Vertex AI API directly. - For an example of using the Vertex AI API, see [Quickstart using the Vertex AI API](../../start/quickstarts/api-quickstart.md). - To view this sample in the Cloud console: [Go to Google Cloud console](https://console.cloud.google.com/vertex-ai/generative/language/prompt-examples/Audio%2Fvideo%20Q&A) | |
| Prompt Freeform Your browser does not support HTML5 video. Look through each frame in the video carefully and answer the question. Only base your answers strictly on what information is available in the video attached. Do not make up any information that is not part of the video and do not be too verbose. Questions: - When does a red lantern first appear and what is written in the lantern? Provide a timestamp. - What language is the person speaking and what does the person say at that time? Response - 0:23: "灯籠" - Japanese, "Sancha is where I used to live when I first moved to Tokyo. I have a lot of great memories here." | | | | | --- | --- | | **Model:** | gemini-1.5-flash-002 | | **Temperature:** | 0.2 | | **Max output tokens:** | 8192 | | **TopK:** | 40.0 | | **TopP:** | 0.95 | |