---
title: Migrate-to-the-Gemini-API-from-Azure-OpenAIgoogle.com/vertex-ai/generative-ai/docs/migrate/migrate-from-azure-to-gemini
date_scraped: 2025-05-12
---

# Migrate to the Gemini API from Azure OpenAI 

This page outlines the steps required to migrate to the Vertex AI Gemini API from
Microsoft Azure OpenAI.

The Gemini API is a fully managed cloud-based service that lets
you create and train generative models using the Google Cloud console. It provides
access to large language models (LLMs), which you can use to create a variety
of applications, including chatbots, content generators, and creative tools.

## Prerequisites

To migrate an OpenAI service from Microsoft Azure OpenAI to the
Vertex AI Gemini API, you must first create a Google Cloud project and
development environment. For more information, see [Set up a project
and a development environment](https://cloud.google.com/vertex-ai/docs/start/cloud-environment).

## Migrate to the Gemini API

Use the following topics to learn how to migrate to the
Gemini API from an OpenAI project in Microsoft Azure.

### Use equivalent Gemini API parameters

The following are some common Azure OpenAI parameters and their equivalent
parameters in the Gemini API:

| | | | |
| --- | --- | --- | --- |
| **OpenAI Parameters** | **Gemini API Parameters** | **Description** | **Valid values** |
| `prompt` | `prompt` | A prompt is a natural language request submitted to a language model to receive a response back. Prompts can contain questions, instructions, contextual information, examples, and text for the model to complete or continue. | Text |
| `temperature` | `temperature` | The temperature is used for sampling during response generation, which occurs when `topP` and `topK` are applied. Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results. A temperature of `0` means that the highest probability tokens are always selected. In this case, responses for a given prompt are mostly deterministic, but a small amount of variation is still possible. If the model returns a response that's too generic, too short, or the model gives a fallback response, try increasing the temperature. | `0.0`–`1.0` |
| `max_tokens` | `maxOutputTokens` | Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words. Specify a lower value for shorter responses and a higher value for potentially longer responses. | `1-8192` (OpenAI) `1`–`8192` (Gemini API) |
| Not available | `topK` | Top-K changes how the model selects tokens for output. A top-K of `1` means the next selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-K of `3` means that the next token is selected from among the three most probable tokens by using temperature. For each token selection step, the top-K tokens with the highest probabilities are sampled. Then tokens are further filtered based on top-P with the final token selected using temperature sampling. Specify a lower value for less random responses and a higher value for more random responses. | `1`–`40` |
| `top_p` | `topP` | Top-P changes how the model selects tokens for output. Tokens are selected from the most (see top-K) to least probable until the sum of their probabilities equals the top-P value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the top-P value is `0.5`, then the model will select either A or B as the next token by using temperature and excludes C as a candidate. Specify a lower value for less random responses and a higher value for more random responses. | `0.0`–`1.0` |
| `stop` | `stop_sequences` | A stop sequence is a series of characters (including spaces) that stops response generation if the model encounters it. The sequence is not included as part of the response. You can add up to five stop sequences. | Your stop sequence in an array—for example, `["###"]`. |

### Use the equivalent Gemini API model

The following table describes the foundation models available.

| | | | |
| --- | --- | --- | --- |
| Type | Description | OpenAI endpoints | Gemini API LLM endpoints |
| Text | Fine-tuned to follow natural language instructions and suitable for a variety of language tasks. | `gpt-3.5-turbo` or `gpt-4` | `gemini-1.0-pro` |
| Chat | Fine-tuned for multi-turn conversation use cases. | `gpt-3.5-turbo` or `gpt-4` | `gemini-1.0-pro` |

## Install, import, and authenticate Vertex AI Gemini API

Use the Vertex AI SDK for Python to install, import, and authenticate
Vertex AI Gemini API. The following shows you the equivalent methods for
Vertex AI SDK for Python and Azure OpenAI.

### Install the Vertex AI Gemini API

#### Azure OpenAI

```python
$ pip install --upgrade openai

```

#### Vertex AI Gemini API

```python
$ pip install google-cloud-aiplatform

```

### Import the Vertex AI Gemini API

#### Azure OpenAI

```python
import openai

```

#### Vertex AI Gemini API

```python
from vertexai.preview.generative_models import GenerativeModel

```

### Authenticate the Vertex AI Gemini API

#### Azure OpenAI

```python
openai.api_key = os.getenv("OPENAI_API_KEY")

```

#### Vertex AI Gemini API

```python
from google.colab import auth as google_auth
google_auth.authenticate_user()

```

## Vertex AI Gemini API and Azure comparisons and sample code

### Generate text with the Vertex AI SDK for Python

#### Azure OpenAI

```python
from openai import OpenAI

client = OpenAI()

response = client.completions.create(
 prompt="Write an article about the potential of AI",
 max_tokens=8192,
 temperature=0.3,
 model="gpt-4")

print(f"Response from Model: {response['choices'][0]['text']}")

```

#### Vertex AI Gemini API

```python
from vertexai.preview.generative_models import GenerativeModel

model = GenerativeModel("gemini-1.0-pro")
generation_config = {
 "max_output_tokens": 8192,
 "temperature": 0.9,
 "top_p": 1}

responses = model.generate_content(
 "Write an article about the potential of AI",
 generation_config=generation_config,
 stream=True)

for response in responses:
 print(response.text)

```

### Use chat completion with the Vertex AI SDK for Python

#### Azure OpenAI

```python
from openai import OpenAI

client = OpenAI()

parameters = {
 "model":"gpt-4",
 "temperature": 0.2,
 "max_tokens": 256,
 "top_p": 0.95}

chat_completion = client.chat.completions.create(
 messages=[
 {"role": "user", "name":"example_user", "content": "Hello! Can you write a 300 word article on the history of AI?"}
 ]
 ,
 **parameters)
response = chat_completion['choices'][0]
print(f"Response from Model: {response.text}")

chat_completion = client.chat.completions.create(
 messages=[
 {"role": "user", "name":"example_user", "content": "Could you give me a catchy title for the paper?"}
 ]
 ,
 **parameters)
response = chat_completion['choices'][0]
print(f"Response from Model: {response.text}")

```

#### Vertex AI Gemini API

```python
from vertexai.preview.generative_models import GenerativeModel

model = GenerativeModel("gemini-1.0-pro")
chat = model.start_chat()

responses = chat.send_message(
 content="Hello! Can you write a 300 word article on the history of AI?",
 stream=True)

for response in responses:
 print(response.text)

responses = chat.send_message(
 content="Could you give me a catchy title for the paper?",
 stream=True)

for response in responses:
 print(response.text)

```

### Generate code with the Vertex AI SDK for Python

#### Azure OpenAI

```python
from openai import OpenAI

client = OpenAI()

response = client.completions.create(
 prompt="Write a Python code to read a CSV file in pandas, calculate the average for a specific column, and then sort the data in descending order for that column",
 max_tokens=8192,
 temperature=0.3,
 model="gpt-4")

print(f"Response from Model: {response['choices'][0]['text']}")

```

#### Vertex AI Gemini API

```python
from vertexai.preview.generative_models import GenerativeModel

model = GenerativeModel("gemini-1.0-pro")
generation_config = {
 "max_output_tokens": 8192,
 "temperature": 0.9,
 "top_p": 1,
 }

responses = model.generate_content(
 contents="Write a Python code to read a CSV file in pandas, calculate the average for a specific column, and then sort the data in descending order for that column",
 generation_config=generation_config,
 stream=True)

for response in responses:
 print(response.text)

```

## Migrate prompts to Gemini models

If you have sets of prompts that you previously used with Azure OpenAI, you can
optimize them for use with [Google models](../learn/models.md) by
using the
[Vertex AI prompt optimizer (Preview)](../learn/prompts/prompt-optimizer.md).

## What's next

- Learn how to test prompts in [Vertex AI Studio](../start/quickstarts/quickstart.md).
- Learn more about prompt design for [text](https://cloud.google.com/vertex-ai/generative-ai/docs/text/text-prompts) and [chat](https://cloud.google.com/vertex-ai/generative-ai/docs/chat/chat-prompts).
- Learn more about [models](../learn/models.md).