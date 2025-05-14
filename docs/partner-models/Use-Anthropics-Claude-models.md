---
date_scraped: 2025-05-12
title: Use Anthropics Claude Models
---

# Use Anthropic's Claude models 

The Anthropic Claude models on Vertex AI offer fully managed and
serverless models as APIs. To use a Claude model on Vertex AI, send
a request directly to the Vertex AI API endpoint. Because the Anthropic
Claude models use a managed API, there's no need to provision or manage
infrastructure.

You can stream your Claude responses to reduce the end-user latency perception.
A streamed response uses server-sent events (SSE) to incrementally stream the
response.

You pay for Claude models as you use them (pay as you go), or you pay a fixed
fee when using [provisioned throughput](https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput). For pay-as-you-go pricing, see
[Anthropic Claude models on the Vertex AI pricing
page](https://cloud.google.com/vertex-ai/generative-ai/pricing#partner-models).

To see an example of using Anthropic's Claude model on Vertex AI,
run the "Use Anthropic's Claude model on Vertex AI" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/anthropic_claude_3_intro.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fgenerative_ai%2Fanthropic_claude_3_intro.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fvertex-ai-samples%2Fmain%2Fnotebooks%2Fofficial%2Fgenerative_ai%2Fanthropic_claude_3_intro.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/generative_ai/anthropic_claude_3_intro.ipynb)

## Available Claude models

The following models are available from Anthropic to use in Vertex AI.
To access a Claude model, go to its Model Garden model card.

### Claude 3.7 Sonnet

Claude 3.7 Sonnet is Anthropic's most intelligent model to date
and the first Claude model to offer extended thinking—the ability to solve
complex problems with careful, step-by-step reasoning.
Claude 3.7 Sonnet is a single model where you can balance speed
and quality by choosing between standard thinking for near-instant responses or
extended thinking for advanced reasoning.

For more information about extended thinking, see Anthropic's
[documentation](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking).

Claude 3.7 Sonnet is optimized for the following use cases:

- Agentic coding - Claude 3.7 Sonnet is state-of-the-art for
 agentic coding, and can complete tasks across the entire software development
 lifecycle—from initial planning to bug fixes, maintenance to large refactors.
 It offers strong performance in both planning and solving for complex coding
 tasks, making Claude 3.7 Sonnet an ideal choice to power
 end-to-end software development processes.
- Customer-facing agents - Claude 3.7 Sonnet offers superior
 instruction following, tool selection, error correction, and advanced
 reasoning for customer-facing agents and complex AI workflows.
- Computer use - Claude 3.7 Sonnet is our most accurate model for
 computer use, enabling developers to direct Claude to use computers the way
 people do.
- Content generation and analysis - Claude 3.7 Sonnet excels at
 writing and is able to understand nuance and tone in content to generate more
 compelling content and analyze content on a deeper level.
- Visual data extraction - With Claude 3.7 Sonnet's robust vision
 skills, it is the right choice for teams that want to extract raw data from
 visuals like charts or graphs as part of their AI workflow.

[Go to the Claude 3.7 Sonnet model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-7-sonnet)

### Claude 3.5 Sonnet v2

Claude 3.5 Sonnet v2 is a state-of-the-art model for
real-world software engineering tasks and agentic capabilities.
Claude 3.5 Sonnet v2 delivers these advancements at the same
price and speed as Claude 3.5 Sonnet.

The upgraded Claude 3.5 Sonnet model is capable of interacting
with tools that can manipulate a computer desktop environment. For more
information, see the [Anthropic documentation](https://docs.anthropic.com/en/docs/build-with-claude/computer-use).

Claude 3.5 Sonnet is optimized for the following use cases:

- Agentic tasks and tool use - Claude 3.5 Sonnet offers
 superior instruction following, tool selection, error correction, and advanced
 reasoning for agentic workflows that require tool use.
- Coding - For software development tasks ranging from code migrations, code
 fixes, and translations, Claude 3.5 Sonnet offers strong
 performance in both planning and solving for complex coding tasks.
- Document Q&A - Claude 3.5 Sonnet combines strong context
 comprehension, advanced reasoning, and synthesis to deliver accurate and
 human-like responses.
- Visual data extraction - With Claude 3.5 Sonnet leading vision
 skills, Claude 3.5 Sonnet can extract raw data from visuals
 like charts or graphs as part of AI workflows.
- Content generation and analysis - Claude 3.5 Sonnet can
 understand nuance and tone in content, generating more compelling content and
 analyzing content on a deeper level.

[Go to the Claude 3.5 Sonnet v2 model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-5-sonnet-v2)

### Claude 3.5 Haiku

Claude 3.5 Haiku, the next generation of Anthropic's fastest and
most cost-effective model, is optimal for use cases where speed and
affordability matter. It improves on its predecessor across every skill set.
Claude 3.5 Haiku is optimized for the following use cases:

- Code completions - With its rapid response time and understanding of
 programming patterns, Claude 3.5 Haiku excels at providing
 quick, accurate code suggestions and completions in real-time development
 workflows.
- Interactive chat bots - Claude 3.5 Haiku's improved reasoning
 and natural conversation abilities make it ideal for creating responsive,
 engaging chatbots that can handle high volumes of user interactions
 efficiently.
- Data extraction and labeling - Leveraging its improved analysis skills,
 Claude 3.5 Haiku efficiently processes and categorizes data,
 making it useful for rapid data extraction and automated labeling tasks.
- Real-time content moderation - With strong reasoning skills and content
 understanding, Claude 3.5 Haiku provides fast, reliable content
 moderation for platforms that require immediate response times at scale.

[Go to the Claude 3.5 Haiku model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-5-haiku)

### Claude 3 Opus

Anthropic's Claude 3 Opus is a powerful AI model with top-level performance on highly
complex tasks. It can navigate open-ended prompts and sight-unseen scenarios
with remarkable fluency and human-like understanding.
Claude 3 Opus is optimized for the following use cases:

- Task automation, such as interactive coding and planning, or running complex
 actions across APIs and databases.
- Research and development tasks, such as research review, brainstorming and
 hypothesis generation, and product testing.
- Strategy tasks, such as advanced analysis of charts and graphs, financials and
 market trends, and forecasting.
- Vision tasks, such as processing images to return text output. Also, analysis
 of charts, graphs, technical diagrams, reports, and other visual content.

[Go to the Claude 3 Opus model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-opus)

### Claude 3 Haiku

Anthropic's Claude 3 Haiku is Anthropic's fastest vision and text model for
near-instant responses to basic queries, meant for seamless AI experiences
mimicking human interactions.

- Live customer interactions and translations.
- Content moderation to catch suspicious behavior or customer requests.
- Cost-saving tasks, such as inventory management and knowledge extraction from
 unstructured data.
- Vision tasks, such as processing images to return text output, analysis
 of charts, graphs, technical diagrams, reports, and other visual content.

[Go to the Claude 3 Haiku model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-haiku)

### Claude 3.5 Sonnet

Anthropic's Claude 3.5 Sonnet outperforms Claude 3 Opus on a wide
range of Anthropic's evaluations, with the speed and cost of Anthropic's
mid-tier Claude 3 Sonnet. Claude 3.5 Sonnet is
optimized for the following use cases:

- Coding, such as writing, editing, and running code with sophisticated
 reasoning and troubleshooting capabilities.
- Handle complex queries from customer support by understanding user context and
 orchestrating multi-step workflows.
- Data science and analysis by navigating unstructured data and leveraging
 multiple tools to generate insights.
- Visual processing, such as interpreting charts and graphs that require visual
 understanding.
- Writing content with a more natural, human-like tone.

[Go to the Claude 3.5 Sonnet model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-5-sonnet)

## Use Claude models

You can use Anthropic's SDK or curl commands to send requests to the
Vertex AI endpoint using the following model names:

- For Claude 3.7 Sonnet, use `claude-3-7-sonnet@20250219`.
- For Claude 3.5 Sonnet v2, use `claude-3-5-sonnet-v2@20241022`.
- For Claude 3.5 Haiku, use `claude-3-5-haiku@20241022`.
- For Claude 3 Opus, use `claude-3-opus@20240229`.
- For Claude 3.5 Sonnet, use `claude-3-5-sonnet@20240620`.
- For Claude 3 Haiku, use `claude-3-haiku@20240307`.

Anthropic Claude model versions must be used with a suffix that starts with an
`@` symbol (such as `claude-3-7-sonnet@20250219` or
`claude-3-5-haiku@20241022`) to guarantee consistent behavior.

**Note:** The maximum allowed image file size is 5 MB and you can
include up to 20 images in one request.

### Before you begin

To use the Anthropic Claude models with Vertex AI, you must perform the
following steps. The Vertex AI API (`aiplatform.googleapis.com`) must
be enabled to use Vertex AI. If you already have an existing project with
the Vertex AI API enabled, you can use that project instead of creating
a new project.

Make sure you have the required permissions to enable and use partner models.
For more information, see [Grant the required permissions](use-partner-models.md).

- Sign in to your Google Cloud account. If you're new to
 Google Cloud, [create an account](https://console.cloud.google.com/freetrial) to evaluate how our products perform in
 real-world scenarios. New customers also get $300 in free credits to
 run, test, and deploy workloads.
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
1. Go to one of the following Model Garden model cards, then click
 **Enable**:
 - [Go to the Claude 3.7 Sonnet model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-7-sonnet)
 - [Go to the Claude 3.5 Sonnet v2 model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-5-sonnet-v2)
 - [Go to
 the Claude 3.5 Haiku model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-5-haiku)
 - [Go to the Claude 3 Opus model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-opus)
 - [Go to the Claude 3.5 Sonnet model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-5-sonnet)
 - [Go to the Claude 3 Haiku model card](https://console.cloud.google.com/vertex-ai/publishers/anthropic/model-garden/claude-3-haiku)

### Use the Anthropic SDK

You can make API requests to the Anthropic Claude models using the [Anthropic
Claude SDK](https://pypi.org/project/anthropic/). To learn more, see
the following:

- [Claude messages API reference](https://docs.anthropic.com/claude/reference/messages_post)
- [Anthropic Python API library](https://github.com/anthropics/anthropic-sdk-python)
- [Anthropic Vertex AI TypeScript API Library](https://github.com/anthropics/anthropic-sdk-typescript/tree/main/packages/vertex-sdk)

#### Make a streaming call to a Claude model using the Anthropic Vertex SDK

The following code sample uses the Anthropic Vertex SDK to perform a streaming
call to a Claude model.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
# TODO(developer): Vertex AI SDK - uncomment below & run
# pip3 install --upgrade --user google-cloud-aiplatform
# gcloud auth application-default login
# pip3 install -U 'anthropic[vertex]'

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"

from anthropic import AnthropicVertex

client = AnthropicVertex(project_id=PROJECT_ID, region="us-east5")
result = []

with client.messages.stream(
 model="claude-3-5-sonnet-v2@20241022",
 max_tokens=1024,
 messages=[
 {
 "role": "user",
 "content": "Send me a recipe for banana bread.",
 }
 ],
) as stream:
 for text in stream.text_stream:
 print(text, end="", flush=True)
 result.append(text)

# Example response:
# Here's a simple recipe for delicious banana bread:
# Ingredients:
# - 2-3 ripe bananas, mashed
# - 1/3 cup melted butter
# ...
# ...
# 8. Bake for 50-60 minutes, or until a toothpick inserted into the center comes out clean.
# 9. Let cool in the pan for a few minutes, then remove and cool completely on a wire rack.

```

#### Make a unary call to a Claude model using the Anthropic Vertex SDK

The following code sample uses the Anthropic Vertex SDK to perform a unary
call to a Claude model.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
# TODO(developer): Vertex AI SDK - uncomment below & run
# pip3 install --upgrade --user google-cloud-aiplatform
# gcloud auth application-default login
# pip3 install -U 'anthropic[vertex]'

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"

from anthropic import AnthropicVertex

client = AnthropicVertex(project_id=PROJECT_ID, region="us-east5")
message = client.messages.create(
 model="claude-3-5-sonnet-v2@20241022",
 max_tokens=1024,
 messages=[
 {
 "role": "user",
 "content": "Send me a recipe for banana bread.",
 }
 ],
)
print(message.model_dump_json(indent=2))
# Example response:
# {
# "id": "msg_vrtx_0162rhgehxa9rvJM5BSVLZ9j",
# "content": [
# {
# "text": "Here's a simple recipe for delicious banana bread:\n\nIngredients:\n- 2-3 ripe bananas...
# ...

```

### Use a curl command

You can use a curl command to make a request to the Vertex AI endpoint.
The curl command specifies which supported Claude [model](#model-list)
you want to use.

Anthropic Claude model versions must be used with a suffix that starts with an
`@` symbol (such as `claude-3-7-sonnet@20250219` or
`claude-3-5-haiku@20241022`) to guarantee consistent behavior.

The following topic shows you how to create a curl command and includes a sample
curl command.

### REST

To test a text prompt by using the Vertex AI API, send a POST request to the
publisher model endpoint.

Before using any of the request data,
make the following replacements:

- LOCATION: A [region](#regions) that supports
 Anthropic Claude models.
- MODEL: The [model name](#model-list) you want to use.
- ROLE: The role associated with a
 message. You can specify a `user` or an `assistant`.
 The first message must use the `user` role. Claude models
 operate with alternating `user` and `assistant` turns.
 If the final message uses the `assistant` role, then the response
 content continues immediately from the content in that message. You can use
 this to constrain part of the model's response.
- STREAM: A boolean that specifies whether the response
 is streamed or not. Stream your response to reduce the end-use latency perception. Set to
 `true` to stream the response and `false` to return the response all at
 once.
- CONTENT: The content, such as text, of the `user` or
 `assistant` message.
- MAX\_TOKENS:
 Maximum number of tokens that can be generated in the response. A token is
 approximately 3.5 characters. 100 tokens correspond to roughly 60-80 words.

 Specify a lower value for shorter responses and a higher value for potentially longer
 responses.
- TOP\_P (Optional):
 Top-P changes how the model selects tokens for output. Tokens are selected
 from the most (see top-K) to least probable until the sum of their probabilities
 equals the top-P value. For example, if tokens A, B, and C have a probability of
 0.3, 0.2, and 0.1 and the top-P value is `0.5`, then the model will
 select either A or B as the next token by using temperature and excludes C as a
 candidate.

 Specify a lower value for less random responses and a higher value for more
 random responses.
- TOP\_K(Optional):
 Top-K changes how the model selects tokens for output. A top-K of
 `1` means the next selected token is the most probable among all
 tokens in the model's vocabulary (also called greedy decoding), while a top-K of
 `3` means that the next token is selected from among the three most
 probable tokens by using temperature.

 For each token selection step, the top-K tokens with the highest
 probabilities are sampled. Then tokens are further filtered based on top-P with
 the final token selected using temperature sampling.

 Specify a lower value for less random responses and a higher value for more
 random responses.
- TYPE: For
 Claude 3.7 Sonnet only, to enable extended thinking mode,
 specify `enable`.
- BUDGET\_TOKENS: If you
 enable extended thinking, you must specify the number of tokens that the model
 can use for its internal reasoning as part of the output. Larger budgets can
 enable more thorough analysis for complex problems and improve response
 quality. You must specify a value greater than or equal to `1024`
 but less than `MAX_TOKENS`.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/MODEL:streamRawPredict
```

Request JSON body:

```python
{
 "anthropic_version": "vertex-2023-10-16",
 "messages": [
 {
 "role": "ROLE",
 "content": "CONTENT"
 }],
 "max_tokens": MAX_TOKENS,
 "stream": STREAM,
 "thinking": {
 "type": "TYPE",
 "budget_tokens": BUDGET_TOKENS
 }
}

```

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/MODEL:streamRawPredict"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/MODEL:streamRawPredict" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "id":"msg_012NDLxqh6LsztWCU7zTb14C",
 "type":"message",
 "role":"assistant",
 "content":[{
 "type":"text",
 "text":"Hello! Nice to meet you."
 }],
 "model":"claude-2.1",
 "stop_reason":"end_turn",
 "stop_sequence":null,
 "usage":{
 "input_tokens":11,
 "output_tokens":11
 }
}

```

#### Example curl command

```python
MODEL_ID="MODEL"
LOCATION="us-central1"
PROJECT_ID="PROJECT_ID"

curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/anthropic/models/${MODEL_ID}:streamRawPredict -d \
'{
 "anthropic_version": "vertex-2023-10-16",
 "messages": [{
 "role": "user",
 "content": "Hello!"
 }],
 "max_tokens": 50,
 "stream": true}'

```

### Tool use (function calling)

The Anthropic Claude models support tools and function calling to enhance a
model's capabilities. For more information, see the [Tool use
overview](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) in the Anthropic documentation.

The following samples demonstrate how to use tools by using an SDK or curl
command. The samples search for nearby restaurants in San Francisco that are
open.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
# TODO(developer): Vertex AI SDK - uncomment below & run
# pip3 install --upgrade --user google-cloud-aiplatform
# gcloud auth application-default login
# pip3 install -U 'anthropic[vertex]'
from anthropic import AnthropicVertex

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"

client = AnthropicVertex(project_id=PROJECT_ID, region="us-east5")
message = client.messages.create(
 model="claude-3-5-sonnet-v2@20241022",
 max_tokens=1024,
 tools=[
 {
 "name": "text_search_places_api",
 "description": "returns information about a set of places based on a string",
 "input_schema": {
 "type": "object",
 "properties": {
 "textQuery": {
 "type": "string",
 "description": "The text string on which to search",
 },
 "priceLevels": {
 "type": "array",
 "description": "Price levels to query places, value can be one of [PRICE_LEVEL_INEXPENSIVE, PRICE_LEVEL_MODERATE, PRICE_LEVEL_EXPENSIVE, PRICE_LEVEL_VERY_EXPENSIVE]",
 },
 "openNow": {
 "type": "boolean",
 "description": "whether those places are open for business.",
 },
 },
 "required": ["textQuery"],
 },
 }
 ],
 messages=[
 {
 "role": "user",
 "content": "What are some affordable and good Italian restaurants open now in San Francisco??",
 }
 ],
)
print(message.model_dump_json(indent=2))
# Example response:
# {
# "id": "msg_vrtx_018pk1ykbbxAYhyWUdP1bJoQ",
# "content": [
# {
# "text": "To answer your question about affordable and good Italian restaurants
# that are currently open in San Francisco....
# ...

```

### REST

Before using any of the request data,
make the following replacements:

- LOCATION: A [region](#regions) that supports
 Anthropic Claude models.
- MODEL: The [model name](#model-list) to use.
- ROLE: The role associated with a
 message. You can specify a `user` or an `assistant`.
 The first message must use the `user` role. Claude models
 operate with alternating `user` and `assistant` turns.
 If the final message uses the `assistant` role, then the response
 content continues immediately from the content in that message. You can use
 this to constrain part of the model's response.
- STREAM: A boolean that specifies
 whether the response is streamed or not. Stream your response to reduce the
 end-use latency perception. Set to `true` to stream the response
 and `false` to return the response all at once.
- CONTENT: The content, such as
 text, of the `user` or `assistant` message.
- MAX\_TOKENS:
 Maximum number of tokens that can be generated in the response. A token is
 approximately 3.5 characters. 100 tokens correspond to roughly 60-80 words.

 Specify a lower value for shorter responses and a higher value for potentially longer
 responses.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/MODEL:rawPredict
```

Request JSON body:

```python

{
 "anthropic_version": "vertex-2023-10-16",
 "max_tokens": MAX_TOKENS,
 "stream": STREAM,
 "tools": [
 {
 "name": "text_search_places_api",
 "description": "Returns information about a set of places based on a string",
 "input_schema": {
 "type": "object",
 "properties": {
 "textQuery": {
 "type": "string",
 "description": "The text string on which to search"
 },
 "priceLevels": {
 "type": "array",
 "description": "Price levels to query places, value can be one of [PRICE_LEVEL_INEXPENSIVE, PRICE_LEVEL_MODERATE, PRICE_LEVEL_EXPENSIVE, PRICE_LEVEL_VERY_EXPENSIVE]",
 },
 "openNow": {
 "type": "boolean",
 "description": "Describes whether a place is open for business at
 the time of the query."
 },
 },
 "required": ["textQuery"]
 }
 }
 ],
 "messages": [
 {
 "role": "user",
 "content": "What are some affordable and good Italian restaurants that are open now in San Francisco??"
 }
 ]
}

```

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/MODEL:rawPredict"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/MODEL:rawPredict" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "id": "msg_vrtx_01ErR7VMNQdnvDt3n7Nmc4ER",
 "type": "message",
 "role": "assistant",
 "model": "claude-3-opus-20240229",
 "content": [
 {
 "type": "text",
 "text": "\nTo find affordable and good Italian restaurants that are currently open in San Francisco, the text_search_places_api tool seems most relevant. \n\nThe required textQuery parameter can be inferred as \"Italian restaurants in San Francisco\", since the user specified Italian restaurants and the location of San Francisco.\n\nTwo optional parameters are also relevant:\nopenNow - this should be set to true, since the user specified they want restaurants open now\npriceLevels - to find affordable restaurants, this can be set to [PRICE_LEVEL_INEXPENSIVE, PRICE_LEVEL_MODERATE]\n\nWith the textQuery provided and the two optional parameters that can help narrow the results to match the user's criteria, we have enough information to make a good call to the text_search_places_api tool to try to answer the user's request.\n"
 },
 {
 "type": "tool_use",
 "id": "toolu_vrtx_01TAJCTkxe8HhRoaQ69N4ouP",
 "name": "text_search_places_api",
 "input": {
 "textQuery": "Italian restaurants in San Francisco",
 "openNow": true,
 "priceLevels": [
 "PRICE_LEVEL_INEXPENSIVE",
 "PRICE_LEVEL_MODERATE"
 ]
 }
 }
 ],
 "stop_reason": "tool_use",
 "stop_sequence": null,
 "usage": {
 "input_tokens": 727,
 "output_tokens": 308
 }
}

```

### Use Vertex AI Studio

For some of the Anthropic Claude models, you can use Vertex AI Studio to
quickly prototype and test generative AI models in the Google Cloud console. As an
example, you can use Vertex AI Studio to compare Claude model responses
with other supported models such as Google Gemini.

For more information, see [Quickstart: Send text prompts to Gemini
using Vertex AI Studio](../start/quickstarts/quickstart.md).

## Anthropic Claude region availability

**Important:** Machine learning (ML) processing for all available
Anthropic Claude models occurs within the US when requests are made to regionally-available APIs
in the US, or within the EU when requests are made to regionally-available APIs in Europe.**Note:** We recommend that you send API requests to
the `us-east5` (Ohio) or `europe-west1` (Belgium) regional
endpoints because these regions have the highest available capacity.
Claude 3.7 Sonnet is available in the following regions:

- `us-east5 (Ohio)`
- `europe-west1 (Belgium)`

Claude 3.5 Sonnet v2 is available in the following regions:

- `us-east5 (Ohio)`
- `europe-west1 (Belgium)`

Claude 3.5 Haiku is available in the following regions:

- `us-east5 (Ohio)`

Claude 3 Opus is available in the following region:

- `us-east5 (Ohio)`

Claude 3.5 Sonnet is available in the following regions:

- `us-east5 (Ohio)`
- `asia-southeast1 (Singapore)`
- `europe-west1 (Belgium)`

Claude 3 Haiku is available in the following regions:

- `us-east5 (Ohio)`
- `asia-southeast1 (Singapore)`
- `europe-west1 (Belgium)`

## Anthropic Claude quotas and supported context length

For Claude models, a quota applies for each region where the model is
available. The quota is specified in queries per minute (QPM) and tokens per
minute (TPM). TPM includes both input and output tokens.

To maintain overall service performance and acceptable use, the maximum quotas
might vary by account and, in some cases, access might be restricted. View your
project's quotas on the [Quotas & Systems
Limits](https://console.cloud.google.com/quotas) page in the Google Cloud console.
You must also have the following quotas available:

- `Online prediction requests per base model per minute per region per
 base_model`
- `Online prediction tokens per minute per base model per minute per region per
 base_model`

### Claude 3.7 Sonnet

The following table shows the default quotas and supported context length for
**Claude 3.7 Sonnet**.

| Region | Quotas | Supported context length |
| --- | --- | --- |
| `us-east5 (Ohio)` | Up to 55 QPM, 500,000 TPM | 200,000 tokens |
| `europe-west1 (Belgium)` | Up to 40 QPM, 300,000 TPM | 200,000 tokens |

### Claude 3.5 Sonnet v2

The following table shows the default quotas and supported context length for
**Claude 3.5 Sonnet v2**.

| Region | Quotas | Supported context length |
| --- | --- | --- |
| `us-east5 (Ohio)` | Up to 90 QPM, 540,000 TPM | 200,000 tokens |
| `europe-west1 (Belgium)` | Up to 55 QPM, 330,000 TPM | 200,000 tokens |

### Claude 3.5 Haiku

The following table shows the default quotas and supported context length for
**Claude 3.5 Haiku**.

| Region | Quotas | Supported context length |
| --- | --- | --- |
| `us-east5 (Ohio)` | Up to 80 QPM, 350,000 TPM | 200,000 tokens |

### Claude 3 Opus

The following table shows the default quotas and supported context length for
**Claude 3 Opus**.

| Region | Quotas | Supported context length |
| --- | --- | --- |
| `us-east5 (Ohio)` | Up to 20 QPM, 105,000 TPM | 200,000 tokens |

### Claude 3 Haiku

The following table shows the default quotas and supported context length for
**Claude 3 Haiku**.

| Region | Quotas | Supported context length |
| --- | --- | --- |
| `us-east5 (Ohio)` | Up to 245 QPM, 600,000 TPM | 200,000 tokens |
| `asia-southeast1 (Singapore)` | Up to 70 QPM, 174,000 TPM | 200,000 tokens |
| `europe-west1 (Belgium)` | Up to 75 QPM, 181,000 TPM | 200,000 tokens |

### Claude 3.5 Sonnet

The following table shows the default quotas and supported context length for
**Claude 3.5 Sonnet**.

| Region | Quotas | Supported context length |
| --- | --- | --- |
| `us-east5 (Ohio)` | Up to 120 QPM, 555,000 TPM | 200,000 tokens |
| `asia-southeast1 (Singapore)` | Up to 35 QPM, 150,000 TPM | 200,000 tokens |
| `europe-west1 (Belgium)` | Up to 130 QPM, 600,000 TPM | 200,000 tokens |

If you want to increase any of your quotas for Generative AI on Vertex AI, you can
use the Google Cloud console to request a quota increase. To learn more about
quotas, see [Work with quotas](https://cloud.google.com/vertex-ai/generative-ai/docs/quotas).