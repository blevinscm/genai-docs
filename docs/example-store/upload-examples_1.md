---
title: Upload examples
source: https://cloud.google.com/vertex-ai/generative-ai/docs/example-store/upload-examples
date_scraped: 2025-05-12
---

# Upload examples 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

After creating an Example Store instance, you can start authoring and uploading examples to
it. There's no limit to the number of examples that you can store in an example
store instance. Examples become available immediately after you upload them to the
Example Store instance.

A few scenarios where you'd need to upload examples include the
following:

- The queries are irrelevant to the existing examples.
- The model struggles with some reasoning.
- The available examples don't cover all the functions, outcomes, or
 reasoning that you expect.

By authoring relevant examples that are in the expected format, you can achieve
the following:

- Improve the ability of the LLM to pay attention to the examples and use them,
 avoiding unexpected changes to response patterns that result from small
 changes to the prompt.
- Reduce the potential negative impact of adding examples for irrelevant queries.
- The LLM performs as expected to similar queries.

If the LLM shows unexpected behavior or reasoning, you can upload a corrected
response to guide the model to follow the expected pattern or reasoning in
subsequent requests.

The samples on this page let you author examples based on LLM output. Authoring
examples based on the output from an LLM has the following advantages
over manually authoring examples:

- Authoring examples based on expected LLM output involves less manual effort.
- By authoring examples based on unexpected LLM behavior, you can directly
 correct failure cases.
- You can author examples based on responses from well-performing models to
 improve the behavior of other models. For example, if Gemini 1.5 Pro
 provides better responses than Gemini 1.5 Flash but with
 higher latency, you can author examples using those responses to achieve
 a similar performance at lower latencies using
 Gemini 1.5 Flash.

## Use examples to improve function calling performance

You can use few-shot examples to improve function calling
performance by demonstrating the following:
\* When a particular function is invoked.

- How to extract the arguments to use in your function call.
- How the model responds based on the response returned by the
 function, or multiple functions in case of multi-step reasoning.

To learn more about function calling, see the [Function calling documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling#examples_of_function_calling).

## Prerequisites

Before you use the Python samples on this page, you must install and initialize the
Vertex AI SDK for Python for Example Store in your local Python environment.

1. Run the following command to install the Vertex AI SDK for Python for Example Store.

 ```python
 pip install --upgrade google-cloud-aiplatform>=1.87.0
 ```
2. Use the following code sample to import and initialize the SDK for Example Store.

 ```python
 import vertexai
 from vertexai.preview import example_stores

 vertexai.init(
 project="PROJECT_ID",
 location="LOCATION"
 )

 ```

 Replace the following:

 - PROJECT\_ID: Your project ID.
 - LOCATION: Your region. Only `us-central1` is supported.

## Upload examples

Use the following samples to upload examples to an Example Store instance. You can upload
a maximum of five examples per request.

### Python

The following samples let you improve LLM behavior and function calling
performance by creating and uploading examples to an Example Store
instance, using responses received from an LLM.
Before using the following samples, ensure that you've done the following:

- Follow the Python setup instructions in the
 [Vertex AI quickstart using client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
 For more information, see the [Vertex AI Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).
- Authenticate to Vertex AI by setting up Application Default Credentials.
 For more information, see [Set up authentication for a local development environment](/authentication/provide-credentials-adc#local-dev).

### Upload an example based on an expected response

Use the following sample to author and upload a sample in a scenario where the
response from the LLM is in the expected format. This sample lets you send a
request, create an example based on the response, and then upload the example
to an Example Store instance.

```python
from vertexai.preview.example_stores import ContentsExample, StoredContentsExample

client = genai.Client(
 http_options=genai_types.HttpOptions(api_version="v1"),
 vertexai=True,
 project="PROJECT_ID",,
 location="LOCATION")

user_content = Content(
 role="user",
 parts=[Part(text="EXAMPLE_QUERY")],
)

response = client.models.generate_content(
 model="MODEL_NAME",
 user_content,
 config=genai_types.GenerateContentConfig(
 tools=[FUNCTION_OR_FUNCTION_DECLARATION]
 )
 )

# Upload example.
example = {
 "contents_example": {
 "contents": [user_content.to_json_dict()],
 "expected_contents": [
 {"content": response.candidates[0].content.to_json_dict()},
 {"content": EXPECTED_FUNCTION_RESPONSE.to_json_dict()},
 {"content": EXPECTED_FINAL_MODEL_RESPONSE.to_json_dict()},
 ],
 },
 "search_key": user_content.parts[0].text,
}
example_store.upsert_examples(examples=[example])

```

Replace the following:

- PROJECT\_ID: Your project ID.
- LOCATION: Your region. Only `us-central1` is supported.
- EXAMPLE\_QUERY: The user request or query to the LLM or agent.
- MODEL\_NAME: The model name. For example, `gemini-2.0-flash`.
- FUNCTION\_OR\_FUNCTION\_DECLARATION: The function or function
 declaration to use in the request. See [the GenAI SDK documentation for Function Calling](https://googleapis.github.io/python-genai/#function-calling) for help in defining a function as a tool.
- EXPECTED\_FUNCTION\_RESPONSE: The expected function response (a [`FunctionResponse`object](https://googleapis.github.io/python-genai/genai.html#genai.types.FunctionResponse)) for the expected function call. See [the GenAI SDK documentation for Function Calling](https://googleapis.github.io/python-genai/#function-calling) for help in defining a function response.
- EXPECTED\_FINAL\_MODEL\_RESPONSE: The expected final model response (a [`Content` object](https://googleapis.github.io/python-genai/genai.html#genai.types.Content)) for the expected function call and response.

### Upload an example to correct an unexpected response

If the LLM doesn't generate the response as expected, you can create an example
based on the corrected response. This helps the LLM follow the expected
reasoning for subsequent requests.

Use the following sample to upload an example with the corrected response to the
Example Store instance.

```python
user_content = Content(
 role="user",
 parts=[Part(text="EXAMPLE_QUERY")],
)

example = {
 "contents_example": {
 "contents": [user_content.to_json_dict()],
 "expected_contents": [
 {"content": EXPECTED_FUNCTION_CALL.to_json_dict()},
 {"content": EXPECTED_FUNCTION_RESPONSE.to_json_dict()},
 {"content": EXPECTED_FINAL_MODEL_RESPONSE.to_json_dict()},
 ],
 },
 "search_key": user_content.parts[0].text,
}

example_store.upsert_examples(examples=[example])

```

Replace the following:

- EXAMPLE\_QUERY: The user request or query to the LLM or agent.
- EXPECTED\_FUNCTION\_CALL: The expected function call (a [`FunctionCall`object](https://googleapis.github.io/python-genai/genai.html#genai.types.FunctionCall)) for the provided user query. See [the GenAI SDK documentation for Function Calling](https://googleapis.github.io/python-genai/#function-calling) for help in defining a function call.
- EXPECTED\_FUNCTION\_RESPONSE: The expected function response (a [`FunctionResponse`object](https://googleapis.github.io/python-genai/genai.html#genai.types.FunctionResponse)) for the expected function call. See [the GenAI SDK documentation for Function Calling](https://googleapis.github.io/python-genai/#function-calling) for help in defining a function response.
- EXPECTED\_FINAL\_MODEL\_RESPONSE: The expected final model response (a [`Content` object](https://googleapis.github.io/python-genai/genai.html#genai.types.Content)) for the expected function call and response.

### REST

To upload a sample to an Example Store instance, send a `POST` request by using the
[`exampleStores.upsertExamples`](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-api/reference/rest/v1beta1/projects.locations.exampleStores/upsertExamples)
method.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you want to create the example
 store. The only region supported is `us-central1`.
- EXAMPLE\_STORE\_ID: The ID of the Example Store
 instance where you want to upload the example.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:upsertExamples
```

Request JSON body:

```python
{
 "examples": [
 {
 "stored_contents_example": {
 "contents_example": {
 "contents": [
 {
 "role": "user",
 "parts": [
 {
 "text": "Is there a store in Mountain View, CA that I can visit to try the new Pixel 8 Pro?"
 }
 ]
 }
 ],
 "expected_contents": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": ""Yes, there is a store located at 2000 N Shoreline Blvd, Mountain View, CA 94043, US."
 }
 ]
 }
 }
 ]
 },
 "search_key_generation_method": {
 "last_entry": {}
 }
 }
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:upsertExamples"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/exampleStores/EXAMPLE_STORE_ID:upsertExamples" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following, where EXAMPLE\_ID
represents the numerical ID generated for the example.

#### Response

```python
{
 "results": [
 {
 "example": {
 "exampleId": "exampleTypes/stored_contents_example/examples/EXAMPLE_ID",
 "storedContentsExample": {
 "searchKey": "Is there a store in Mountain View, CA that I can visit to try the new Pixel 8 Pro?",
 "contentsExample": {
 "contents": [
 {
 "role": "user",
 "parts": [
 {
 "text": "Is there a store in Mountain View, CA that I can visit to try the new Pixel 8 Pro?"
 }
 ]
 }
 ],
 "expectedContents": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": ""Yes, there is a store located at 2000 N Shoreline Blvd, Mountain View, CA 94043, US."
 }
 ]
 }
 }
 ]
 },
 "searchKeyGenerationMethod": {
 "lastEntry": {}
 }
 }
 }
 }
 ]
}

```

## What's next

- Learn how to [retrieve examples](https://cloud.google.com/vertex-ai/generative-ai/docs/example-store/retrieve-examples).