---
title: List-and-count-tokensgoogle.com/vertex-ai/generative-ai/docs/multimodal/list-token#tokens_and_the_importance_of_token_listing_and_counting
date_scraped: 2025-05-12
---

# List and count tokens 

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This page shows you how to list the tokens and their token IDs of a prompt
and how to get a total token count of a prompt by using the Google Gen AI SDK.

## Tokens and the importance of token listing and counting

Generative AI models break down text and other data in a prompt into units called
tokens for processing. The way that data is converted into tokens depends on the
tokenizer used. A token can be characters, words, or phrases.

Each model has a maximum number of tokens that it can handle in a prompt and
response. Knowing the token count of your prompt lets you know whether you've
exceeded this limit or not. Additionally, counting tokens also returns the billable
characters for the prompt, which helps you estimate cost.

Listing tokens returns a list of the tokens that your prompt is broken down into.
Each listed token is associated with a token ID, which helps you perform
troubleshooting and analyze model behavior.

## Supported models

The following table shows you the models that support token listing and token
counting:

- [Vertex AI Model Optimizer](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/vertex-ai-model-optimizer)
- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](../models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)
- [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite)

## Get a list of tokens and token IDs for a prompt

The following code sample shows you how to get a list of tokens and token IDs for
a prompt. The prompt must contain only text. Multimodal prompts are not supported.

### Gen AI SDK for Python

#### Install

```python
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
from google import genai
from google.genai.types import HttpOptions

client = genai.Client(http_options=HttpOptions(api_version="v1"))
response = client.models.compute_tokens(
 model="gemini-2.0-flash-001",
 contents="What's the longest word in the English language?",
)

print(response)
# Example output:
# tokens_info=[TokensInfo(
# role='user',
# token_ids=[1841, 235303, 235256, 573, 32514, 2204, 575, 573, 4645, 5255, 235336],
# tokens=[b'What', b"'", b's', b' the', b' longest', b' word', b' in', b' the', b' English', b' language', b'?']
# )]
```

### Gen AI SDK for Go

Learn how to install or update the [Gen AI SDK for Go](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
import (
 "context"
 "encoding/json"
 "fmt"
 "io"

 genai "google.golang.org/genai"
)

// computeWithTxt shows how to compute tokens with text input.
func computeWithTxt(w io.Writer) error {
 ctx := context.Background()

 client, err := genai.NewClient(ctx, &genai.ClientConfig{
 HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
 })
 if err != nil {
 return fmt.Errorf("failed to create genai client: %w", err)
 }

 modelName := "gemini-2.0-flash-001"
 contents := []*genai.Content{
 {Parts: []*genai.Part{
 {Text: "What's the longest word in the English language?"},
 }},
 }

 resp, err := client.Models.ComputeTokens(ctx, modelName, contents, nil)
 if err != nil {
 return fmt.Errorf("failed to generate content: %w", err)
 }

 type tokenInfoDisplay struct {
 IDs []int64 `json:"token_ids"`
 Tokens []string `json:"tokens"`
 }
 // See the documentation: https://pkg.go.dev/google.golang.org/genai#ComputeTokensResponse
 for _, instance := range resp.TokensInfo {
 display := tokenInfoDisplay{
 IDs: instance.TokenIDs,
 Tokens: make([]string, len(instance.Tokens)),
 }
 for i, t := range instance.Tokens {
 display.Tokens[i] = string(t)
 }

 data, err := json.MarshalIndent(display, "", " ")
 if err != nil {
 return fmt.Errorf("failed to marshal token info: %w", err)
 }
 fmt.Fprintln(w, string(data))
 }

 // Example response:
 // {
 // "ids": [
 // 1841,
 // 235303,
 // 235256,
 // ...
 // ],
 // "values": [
 // "What",
 // "'",
 // "s",
 // ...
 // ]
 // }

 return nil
}

```

## Get the token count and billable characters of a prompt

The following code sample shows you how to Get the token count and the number of
billable characters of a prompt. Both text-only and multimodal prompts are
supported.

### Gen AI SDK for Python

#### Install

```python
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
from google import genai
from google.genai.types import HttpOptions

client = genai.Client(http_options=HttpOptions(api_version="v1"))

prompt = "Why is the sky blue?"

# Send text to Gemini
response = client.models.generate_content(
 model="gemini-2.0-flash-001", contents=prompt
)

# Prompt and response tokens count
print(response.usage_metadata)

# Example output:
# cached_content_token_count=None
# candidates_token_count=311
# prompt_token_count=6
# total_token_count=317
```

### Gen AI SDK for Go

Learn how to install or update the [Gen AI SDK for Go](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
import (
 "context"
 "encoding/json"
 "fmt"
 "io"

 genai "google.golang.org/genai"
)

// generateTextAndCount shows how to generate text and obtain token count metadata from the model response.
func generateTextAndCount(w io.Writer) error {
 ctx := context.Background()

 client, err := genai.NewClient(ctx, &genai.ClientConfig{
 HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
 })
 if err != nil {
 return fmt.Errorf("failed to create genai client: %w", err)
 }

 modelName := "gemini-2.0-flash-001"
 contents := []*genai.Content{
 {Parts: []*genai.Part{
 {Text: "Why is the sky blue?"},
 }},
 }

 resp, err := client.Models.GenerateContent(ctx, modelName, contents, nil)
 if err != nil {
 return fmt.Errorf("failed to generate content: %w", err)
 }

 usage, err := json.MarshalIndent(resp.UsageMetadata, "", " ")
 if err != nil {
 return fmt.Errorf("failed to convert usage metadata to JSON: %w", err)
 }
 fmt.Fprintln(w, string(usage))

 // Example response:
 // {
 // "candidatesTokenCount": 339,
 // "promptTokenCount": 6,
 // "totalTokenCount": 345
 // }

 return nil
}

```