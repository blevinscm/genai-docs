---
date_scraped: 2025-05-12
title: Safety And Content Filters
---

# Safety and content filters 

To see an example of getting started with Responsible AI with Vertex AI Gemini API,
run the "Responsible AI with Vertex AI Gemini API: Safety ratings and thresholds" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/responsible-ai/gemini_safety_ratings.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fresponsible-ai%2Fgemini_safety_ratings.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fresponsible-ai%2Fgemini_safety_ratings.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/responsible-ai/gemini_safety_ratings.ipynb)

Google's generative AI models, like Gemini 2.0 Flash, are designed to
prioritize safety. However, they can still generate harmful responses,
especially when they're explicitly prompted. To further enhance safety and
minimize misuse, you can configure content filters to block potentially harmful
responses.

This page describes each of the safety and content filter types and outlines key safety concepts.
For configurable content filters, it shows you how to configure the blocking thresholds
of each harm category to control how often prompts and responses are blocked.

Safety and content filters act as a barrier, preventing harmful output, but they don't
directly influence the model's behavior. To learn more about model steerability,
see [System instructions for safety](safety-system-instructions.md).

## Unsafe prompts

The Vertex AI Gemini API provides one of the following `enum` codes to explain why a prompt was rejected:

| Enum | Filter type | Description |
| --- | --- | --- |
| `PROHIBITED_CONTENT` | Non-configurable safety filter | The prompt was blocked because it was flagged for containing the prohibited contents, usually CSAM. |
| `BLOCKED_REASON_UNSPECIFIED` | N/A | The reason for blocking the prompt is unspecified. |
| `OTHER` | N/A | This enum refers to all other reasons for blocking a prompt. Note that Vertex AI Gemini API does not support all languages. For a list of supported languages, see [Gemini language support](../learn/models.md). |

To learn more, see [BlockedReason](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/GenerateContentResponse#blockedreason).

The following is an example of Vertex AI Gemini API output when a prompt is
blocked for containing `PROHIBITED_CONTENT`:

```python
{
 "promptFeedback": {
 "blockReason": "PROHIBITED_CONTENT"
 },
 "usageMetadata": {
 "promptTokenCount": 7,
 "totalTokenCount": 7
 }
}

```

## Unsafe responses

The following filters can detect and block potentially unsafe responses:

- **Non-configurable safety filters**, which block child sexual abuse material
 (CSAM) and personally identifiable information (PII).
- **Configurable content filters**, which block unsafe content based on a list of
 harm categories and their user-configured blocking thresholds. You can
 configure blocking thresholds for each of these harms based on what is
 appropriate for your use case and business. To learn more, see [Configurable content filters](#configurable-filters).
- **Citation filters**, which provide citations for source material.
 To learn more, see [Citation filter](#citation-filter).

An LLM generates responses in units of text called tokens. A model stops
generating tokens because it reaches a natural stopping point or
because one of the filters blocks the response. The Vertex AI Gemini API
provides one of the following `enum` codes to explain why token generation stopped:

| Enum | Filter type | Description |
| --- | --- | --- |
| `STOP` | N/A | This enum indicates that the model reached a natural stopping point or the provided stop sequence. |
| `MAX_TOKENS` | N/A | The token generation was stopped because the model reached the maximum number of tokens that was specified in the request. |
| `SAFETY` | Configurable content filter | The token generation was stopped because the response was flagged for harmful content. |
| `RECITATION` | Citation filter | The token generation stopped because of potential recitation. |
| `SPII` | Non-configurable safety filter | The token generation was stopped because the response was flagged for Sensitive Personally Identifiable Information (SPII) content. |
| `PROHIBITED_CONTENT` | Non-configurable safety filter | The token generation was stopped because the response was flagged for containing prohibited content, usually CSAM. |
| `FINISH_REASON_UNSPECIFIED` | N/A | The finish reason is unspecified. |
| `OTHER` | N/A | This enum refers to all other reasons that stop token generation. Note that token generation is not supported for all languages. For a list of supported languages, see [Gemini language support](../learn/models.md). |

To learn more, see [FinishReason](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/GenerateContentResponse#finishreason).

If a filter blocks the response, it voids the response's `Candidate.content`
field. It does not provide any feedback to the model.

## Configurable Content Filters {#configurable-filters}

Content filters assess content against a list
of harms. For each harm category, the content filters assign one
score based on the *probability* of the content being harmful and another
score based on the *severity* of harmful content.

The configurable content filters don't have versioning independent of model
versions. Google won't update the configurable content filter for a previously
released version of a model. However, it may update the configurable content
filter for a future version of a model.

### Harm categories

Content filters assess content based on the following harm categories:

| Harm Category | Definition |
| --- | --- |
| Hate Speech | Negative or harmful comments targeting identity and/or protected attributes. |
| Harassment | Threatening, intimidating, bullying, or abusive comments targeting another individual. |
| Sexually Explicit | Contains references to sexual acts or other lewd content. |
| Dangerous Content | Promotes or enables access to harmful goods, services, and activities. |

### Comparison of probability scores and severity scores

The *probability* safety score reflects the likelihood that a model response
is associated with the respective harm. It has an
associated confidence score between `0.0` and `1.0`, rounded to one decimal place.
The confidence score is discretized into four confidence levels:
`NEGLIGIBLE`, `LOW`, `MEDIUM`, and `HIGH`.

The *severity* score reflects the magnitude of how harmful a model
response might be. It has an associated severity score ranging from
`0.0` to `1.0`, rounded to one decimal place. The severity score is discretized
into four levels: `NEGLIGIBLE`, `LOW`, `MEDIUM`, and `HIGH`.

Content can have a low *probability* score and a high *severity* score, or a
high *probability* score and a low *severity* score.

### How to configure content filters

You can use the Vertex AI Gemini API or the Google Cloud console to configure
content filters.

### Vertex AI Gemini API

The Vertex AI Gemini API provides two "harm block" methods:

- **SEVERITY**: This method uses both probability and severity scores.
- **PROBABILITY**: This method uses the probability score only.

The default method is `SEVERITY`. For models older than `gemini-1.5-flash` and
`gemini-1.5-pro`, the default method is
`PROBABILITY`. To learn more, see
[`HarmBlockMethod` API reference](https://cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.SafetySetting.HarmBlockMethod).

The Vertex AI Gemini API provides the following "harm block" thresholds:

- **`BLOCK_LOW_AND_ABOVE`**: Block when the probability score or the severity
 score is `LOW`, `MEDIUM` or `HIGH`.
- **`BLOCK_MEDIUM_AND_ABOVE`**: Block when the probability score or the severity
 score is `MEDIUM` or `HIGH`. For `gemini-2.0-flash-001` and
 subsequent models, `BLOCK_MEDIUM_AND_ABOVE` is the default
 value.
- **`BLOCK_ONLY_HIGH`**: Block when the probability score or the severity score
 is `HIGH`.
- **`HARM_BLOCK_THRESHOLD_UNSPECIFIED`**: Block using the default threshold.
- **`OFF`**: No automated response blocking and no metadata is returned.
 For `gemini-2.0-flash-001` and subsequent models, `OFF` is the
 default value.
- **`BLOCK_NONE`**: The `BLOCK_NONE` setting removes
 automated response blocking. Instead, you can configure your own content
 guidelines with the returned scores. This is a restricted field that isn't
 available to all users in [GA](https://cloud.google.com/products#product-launch-stages) model
 versions.

For example, the following Python code demonstrates how you can set the harm
block threshold to `BLOCK_ONLY_HIGH` for the dangerous content category:

```python
generative_models.SafetySetting(
 category=generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
 threshold=generative_models.HarmBlockThreshold.BLOCK_ONLY_HIGH,
),

```

This will block most of the content that is classified as dangerous content.
To learn more, see [`HarmBlockThreshold` API reference](https://cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.SafetySetting.HarmBlockThreshold).

For end-to-end examples in Python, Node.js, Java, Go, C# and REST, see
[Examples of content filter configuration](#api-examples).

### Google Cloud console

The Google Cloud console lets you configure a threshold for each content attribute.
The content filter uses only the probability scores. There is no option to use
the severity scores.

The Google Cloud console provides the following threshold values:

- **Off** (default): No automated response blocking.
- **Block few**: Block when the probability score is `HIGH`.
- **Block some**: Block when the probability score is `MEDIUM` or `HIGH`.
- **Block most**: Block when the probability score is `LOW`, `MEDIUM` or `HIGH`.

For example, if you set the block setting to **Block few** for the
**Dangerous Content category**, everything that has a high probability of
being dangerous content is blocked. Anything with a lower probability is
allowed. The default threshold is `Block some`.

To set the thresholds, see the following steps:

1. In the Vertex AI section of the Google Cloud console, go to
 the **Vertex AI Studio** page.

 [Go to Vertex AI Studio](https://console.cloud.google.com/vertex-ai/generative/language)
2. Under **Create a new prompt**, click any of the buttons to open the prompt
 design page.
3. Click **Safety settings**.

 The **Safety settings** dialog window opens.
4. For each harm category, configure the desired threshold value.
5. Click **Save**.

### Example output when a response is blocked by the configurable content filter

The following is an example of Vertex AI Gemini API output when a response is
blocked by the configurable content filter for containing dangerous content:

```python
{
 "candidates": [{
 "finishReason": "SAFETY",
 "safetyRatings": [{
 "category": "HARM_CATEGORY_HATE_SPEECH",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.11027937,
 "severity": "HARM_SEVERITY_LOW",
 "severityScore": 0.28487435
 }, {
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "probability": "HIGH",
 "blocked": true,
 "probabilityScore": 0.95422274,
 "severity": "HARM_SEVERITY_MEDIUM",
 "severityScore": 0.43398145
 }, {
 "category": "HARM_CATEGORY_HARASSMENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.11085559,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.19027223
 }, {
 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.22901751,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.09089675
 }]
 }],
 "usageMetadata": {
 "promptTokenCount": 38,
 "totalTokenCount": 38
 }
}

```

### Examples of Content Filter Configuration {#api-examples}

Here are examples of how to configure content filters using different APIs:

### Python Example

```python
from google.cloud import aiplatform
from google.cloud.aiplatform import generative_models

model = aiplatform.GenerativeModel("gemini-2.0-flash")

safety_settings = [
    generative_models.SafetySetting(
        category=generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold=generative_models.HarmBlockThreshold.BLOCK_ONLY_HIGH,
    ),
]

response = model.generate_content(
    "Your prompt here",
    safety_settings=safety_settings,
)
```

### Node.js Example

```javascript
const {VertexAI} = require('@google-cloud/vertexai');

const vertexAI = new VertexAI();
const model = vertexAI.getGenerativeModel('gemini-2.0-flash');

const safetySettings = [
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold: 'BLOCK_ONLY_HIGH',
  },
];

const response = await model.generateContent({
  contents: [{text: 'Your prompt here'}],
  safetySettings,
});
```

## Citation filter

The generative code features of Vertex AI are intended to produce
original content. By design, Gemini limits the likelihood
that existing content is replicated at length. If a Gemini feature does
make an extensive quotation from a web page, Gemini cites that page.

Sometimes the same content can be found on multiple web pages. Gemini
attempts to point you to a popular source. In the case of
citations to code repositories, the citation might also reference an applicable
open source license. Complying with any license requirements is your own
responsibility.

To learn about the metadata of the citation filter, see the [Citation API reference](https://cloud.google.com/python/docs/reference/aiplatform/latest/google.cloud.aiplatform_v1.types.Citation).

## Civic integrity filter

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

The civic integrity filter detects and blocks prompts that mention or relate to
political elections and candidates. This filter is disabled by default. To turn
it on, set the blocking threshold for `CIVIC_INTEGRITY` to any of the following
values. It doesn't make a difference which value you specify.

- `BLOCK_LOW_AND_ABOVE`
- `BLOCK_MEDIUM_AND_ABOVE`
- `BLOCK_ONLY_HIGH`

The following Python code shows you how to turn on the civic integrity filter:

```python
 generative_models.SafetySetting(
 category=generative_models.HarmCategory.CIVIC_INTEGRITY,
 threshold=generative_models.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
 ),

```

For more details about the civic integrity filter, contact your Google Cloud
representative.

## Best practices

While content filters help prevent unsafe content, they might occasionally block
benign content or miss harmful content. Advanced models like
Gemini 2.0 Flash are designed to generate safe responses even without
filters. Test different filter settings to find the right balance between
safety and allowing appropriate content.

## What's next

- Learn about [system instructions for safety](safety-system-instructions.md).
- Learn about [abuse monitoring](../learn/abuse-monitoring_1.md).
- Learn more about [responsible AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).
- Learn about [data governance](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance).