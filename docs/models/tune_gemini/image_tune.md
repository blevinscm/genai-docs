---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune_gemini/image_tune
title: Image Tuning
---

# Image tuning 

This page provides prerequisites and detailed instructions for fine-tuning
Gemini on image data using supervised learning.

## Use cases

Fine-tuning lets you adapt pre-trained image models for specialized tasks,
significantly enhancing their performance. Here are some image use cases:

- **Product catalog enhancement**: Extract key attributes from images (e.g.,
 brand, color, size) to automatically build and enrich your product catalog.
- **Image moderation**: Fine-tune a model to detect and flag inappropriate or
 harmful content in images, ensuring a safer online experience.
- **Visual inspection**: Train a model to identify specific objects or defects
 within images, automating quality control or inspection processes.
- **Image classification**: Improve the accuracy of image classification for specific
 domains, such as medical imaging or satellite imagery analysis.
- **Image-based recommendations**: Analyze images to provide personalized
 recommendations, such as suggesting similar products or complementary items.
- **Table content extraction**: Extract data from tables within images and convert
 it into structured formats like spreadsheets or databases.

## Limitations

- Maximum images per example: 30
- Maximum image file size: 20MB

To learn more about image sample requirements, see the [Image understanding](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#image-requirements) page.

## Dataset format

The `fileUri` for your dataset can be the URI for a file in a Cloud Storage
bucket, or it can be a publicly available HTTP or HTTPS URL.

To see the generic format example, see
[Dataset example for Gemini](../gemini-supervised-tuning-prepare.md).

The following is an example of an image dataset.

```python
{
 "contents": [
 {
 "role": "user",
 "parts": [
 {
 "fileData": {
 "mimeType": "image/jpeg",
 "fileUri": "gs://cloud-samples-data/ai-platform/generative_ai/gemini-2_0/image/longcap100/100.jpeg"
 }
 }, 
 {
 "text": "Describe this image in detail that captures the essence of it."
 }
 ]
 }, 
 {
 "role": "model",
 "parts": [
 {
 "text": "A man stands on a road, wearing a blue denim jacket, tan pants, and white sneakers. He has his hands in his pockets and is wearing a white t-shirt under his jacket. The man's pants are cuffed, and his shoes are white. The road is dark grey, and the leaves are green. The man is standing in the shade, and the light is shining on the ground."
 }
 ]
 }
 ]
}

```

### Sample datasets

You can use the following sample datasets to learn how to tune a
Gemini model:

- [Sample tuning dataset](https://console.cloud.google.com/storage/browser/_details/cloud-samples-data/ai-platform/generative_ai/gemini-2_0/image/sft_train_data.jsonl)
- [Sample validation dataset](https://console.cloud.google.com/storage/browser/_details/cloud-samples-data/ai-platform/generative_ai/gemini-2_0/image/sft_validation_data.jsonl)

To use these datasets, specify the URIs in the applicable parameters when
creating a text model supervised fine-tuning job.

For example:

```python
...
"training_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/sft_train_data.jsonl",
...
"validation_dataset_uri": "gs://cloud-samples-data/ai-platform/generative_ai/sft_validation_data.jsonl",
...

```

## What's next

- To learn more about the image understanding capability of Gemini, see our [Image understanding](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding) documentation.
- To start tuning, see [Tune Gemini models by using supervised fine-tuning](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-use-supervised-tuning)
- To learn how supervised fine-tuning can be used in a solution that builds a
 generative AI knowledge base, see [Jump Start Solution: Generative AI
 knowledge base](https://cloud.google.com/architecture/ai-ml/generative-ai-knowledge-base).