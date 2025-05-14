---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/code-execution#enable_code_execution_on_the_model
title: Code Execution
---

# Code execution 

To see an example of code execution,
run the "Intro to Generating and Executing Python Code with Gemini 2.0" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/code-execution/intro_code_execution.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fcode-execution%2Fintro_code_execution.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fcode-execution%2Fintro_code_execution.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/code-execution/intro_code_execution.ipynb)

The Gemini API code execution feature enables the model to generate and
run Python code and learn iteratively from the results until it arrives at a
final output. You can use this code execution capability to build applications
that benefit from code-based reasoning and that produce text output. For
example, you could use code execution in an application that solves equations or
processes text.

The Gemini API provides code execution as a tool, similar to
[function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling).
After you add code execution as a tool, the model decides when to use it.

The code execution environment includes the following libraries. You can't
install your own libraries.

- [Altair](https://altair-viz.github.io/)
- [Chess](https://python-chess.readthedocs.io/)
- [Cv2](https://opencv.org/)
- [Matplotlib](https://matplotlib.org/)
- [Mpmath](https://mpmath.org/)
- [NumPy](https://numpy.org/)
- [Pandas](https://pandas.pydata.org/)
- [Pdfminer](https://pdfminersix.readthedocs.io/)
- [Reportlab](https://www.reportlab.com/)
- [Seaborn](https://seaborn.pydata.org/)
- [Sklearn](https://scikit-learn.org/)
- [Statsmodels](https://www.statsmodels.org/)
- [Striprtf](https://github.com/joshy/striprtf)
- [SymPy](https://www.sympy.org/)
- [Tabulate](https://github.com/astanin/python-tabulate)

## Supported models

The following models provide support for code execution:

- [Vertex AI Model Optimizer](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/vertex-ai-model-optimizer)
- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](../models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)

## Get started with code execution

This section assumes that you've completed the setup and configuration steps
shown in the [Gemini API quickstart](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal).

### Enable code execution on the model

You can enable basic code execution as shown here:

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
from google.genai.types import (
 HttpOptions,
 Tool,
 ToolCodeExecution,
 GenerateContentConfig,
)

client = genai.Client(http_options=HttpOptions(api_version="v1"))
model_id = "gemini-2.0-flash-001"

code_execution_tool = Tool(code_execution=ToolCodeExecution())
response = client.models.generate_content(
 model=model_id,
 contents="Calculate 20th fibonacci number. Then find the nearest palindrome to it.",
 config=GenerateContentConfig(
 tools=[code_execution_tool],
 temperature=0,
 ),
)
print("# Code:")
print(response.executable_code)
print("# Outcome:")
print(response.code_execution_result)

# Example response:
# # Code:
# def fibonacci(n):
# if n <= 0:
# return 0
# elif n == 1:
# return 1
# else:
# a, b = 0, 1
# for _ in range(2, n + 1):
# a, b = b, a + b
# return b
#
# fib_20 = fibonacci(20)
# print(f'{fib_20=}')
#
# # Outcome:
# fib_20=6765
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
 "fmt"
 "io"

 genai "google.golang.org/genai"
)

// generateWithCodeExec shows how to generate text using the code execution tool.
func generateWithCodeExec(w io.Writer) error {
 ctx := context.Background()

 client, err := genai.NewClient(ctx, &genai.ClientConfig{
 HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
 })
 if err != nil {
 return fmt.Errorf("failed to create genai client: %w", err)
 }

 prompt := "Calculate 20th fibonacci number. Then find the nearest palindrome to it."
 contents := []*genai.Content{
 {Parts: []*genai.Part{
 {Text: prompt},
 }},
 }
 config := &genai.GenerateContentConfig{
 Tools: []*genai.Tool{
 {CodeExecution: &genai.ToolCodeExecution{}},
 },
 Temperature: genai.Ptr(0.0),
 }
 modelName := "gemini-2.0-flash-001"

 resp, err := client.Models.GenerateContent(ctx, modelName, contents, config)
 if err != nil {
 return fmt.Errorf("failed to generate content: %w", err)
 }

 for _, p := range resp.Candidates[0].Content.Parts {
 if p.Text != "" {
 fmt.Fprintf(w, "Gemini: %s", p.Text)
 }
 if p.ExecutableCode != nil {
 fmt.Fprintf(w, "Language: %s\n%s\n", p.ExecutableCode.Language, p.ExecutableCode.Code)
 }
 if p.CodeExecutionResult != nil {
 fmt.Fprintf(w, "Outcome: %s\n%s\n", p.CodeExecutionResult.Outcome, p.CodeExecutionResult.Output)
 }
 }

 // Example response:
 // Gemini: Okay, I can do that. First, I'll calculate the 20th Fibonacci number. Then, I need ...
 //
 // Language: PYTHON
 //
 // def fibonacci(n):
 // ...
 //
 // fib_20 = fibonacci(20)
 // print(f'{fib_20=}')
 //
 // Outcome: OUTCOME_OK
 // fib_20=6765
 //
 // Now that I have the 20th Fibonacci number (6765), I need to find the nearest palindrome. ...
 // ...

 return nil
}

```

### REST

Before using any of the request data,
make the following replacements:

- `GENERATE_RESPONSE_METHOD`: The type of response that you want the model to generate.
 Choose a method that generates how you want the model's response to be returned:
 - `streamGenerateContent`: The response is streamed as it's being generated to reduce the perception of latency to a human audience.
 - `generateContent`: The response is returned after it's fully generated.
- `LOCATION`: The region to process the request. Available
 options include the following:

 **Click to expand a partial list of available regions**

 - `us-central1`
 - `us-west4`
 - `northamerica-northeast1`
 - `us-east4`
 - `us-west1`
 - `asia-northeast3`
 - `asia-southeast1`
 - `asia-northeast1`
- `PROJECT_ID`: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- `MODEL_ID`: The model ID of the model
 that you want to use.
- `ROLE`:
 The role in a conversation associated with the content. Specifying a role is required even in
 singleturn use cases.
 Acceptable values include the following:
 - `USER`: Specifies content that's sent by you.
 - `MODEL`: Specifies the model's response.
- ```python
 TEXT
 ```

 The text instructions to include in the prompt.

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

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
cat > request.json << 'EOF'
{
 "tools": [{'codeExecution': {}}],
 "contents": {
 "role": "ROLE",
 "parts": { "text": "TEXT" }
 },
}
EOF
```

Then execute the following command to send your REST request:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD"
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

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
@'
{
 "tools": [{'codeExecution': {}}],
 "contents": {
 "role": "ROLE",
 "parts": { "text": "TEXT" }
 },
}
'@ | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```python
{
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": "Okay, I understand. You want me to calculate the sum of the first 10 positive integers and to use code to do so. Here's my plan: I will use a loop to add the numbers from 1 to 10 and then return the final sum.\n\n"
 },
 {
 "executableCode": {
 "language": "PYTHON",
 "code": "\ntotal = 0\nfor i in range(1, 11):\n total += i\nprint(f'{total=}')\n"
 }
 },
 {
 "codeExecutionResult": {
 "outcome": "OUTCOME_OK",
 "output": "total=55\n"
 }
 },
 {
 "text": "The sum of the first 10 positive numbers is 55.\n"
 }
 ]
 },
 "finishReason": "STOP",
 "safetyRatings": [
 {
 "category": "HARM_CATEGORY_HATE_SPEECH",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.19436789,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.17441037
 },
 {
 "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.0685376,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.14903527
 },
 {
 "category": "HARM_CATEGORY_HARASSMENT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.23231025,
 "severity": "HARM_SEVERITY_LOW",
 "severityScore": 0.2436427
 },
 {
 "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
 "probability": "NEGLIGIBLE",
 "probabilityScore": 0.08269742,
 "severity": "HARM_SEVERITY_NEGLIGIBLE",
 "severityScore": 0.10818888
 }
 ],
 "score": -0.50845032930374146,
 "avgLogprobs": -0.0046222757209431042
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 34,
 "candidatesTokenCount": 110,
 "totalTokenCount": 144,
 "billablePromptUsage": {
 "textCount": 119
 },
 "trafficType": "ON_DEMAND"
 },
 "modelVersion": "gemini-2.0-flash-001",
 "createTime": "2024-12-09T23:33:47.842964Z",
 "responseId": "W35XZ9S5M6acmecP3vDFkQU"
}

```

### Use code execution in chat

You can also use code execution as part of a chat.

### REST

```python
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://aiplatform.googleapis.com/v1/projects/test-project/locations/global/publishers/google/models/gemini-2.0-flash-001:generateContent -d \
$'{
 "tools": [{'code_execution': {}}],
 "contents": [
 {
 "role": "user",
 "parts": {
 "text": "Can you print \"Hello world!\"?"
 }
 },
 {
 "role": "model",
 "parts": [
 {
 "text": ""
 },
 {
 "executable_code": {
 "language": "PYTHON",
 "code": "\nprint(\"hello world!\")\n"
 }
 },
 {
 "code_execution_result": {
 "outcome": "OUTCOME_OK",
 "output": "hello world!\n"
 }
 },
 {
 "text": "I have printed \"hello world!\" using the provided python code block. \n"
 }
 ],
 },
 {
 "role": "user",
 "parts": {
 "text": "What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50."
 }
 }
 ]
 }'

```

## Code execution versus function calling

Code execution and [function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling)
are similar features:

- Code execution lets the model run code in the API backend in a fixed, isolated
 environment.
- Function calling lets you run the functions that the model requests, in
 whatever environment you want.

In general, you should prefer to use code execution if it can handle your use
case. Code execution is simpler to use (you just enable it) and resolves in a
single `GenerateContent` request. Function calling takes an additional
`GenerateContent` request to send back the output from each function call.

For most cases, you should use function calling if you have your own functions
that you want to run locally, and you should use code execution if you'd like
the API to write and run Python code for you and return the result.

## Billing

There's no additional charge for enabling code execution from the
Gemini API. You'll be billed at the current rate of input and output
tokens based on what Gemini model you're using.

Here are a few other things to know about billing for code execution:

- You're only billed once for the input tokens you pass to the model and the
 intermediate input tokens generated by the code execution tool use.
- You're billed for the final output tokens returned to you in the API
 response.

- You're billed at the current rate of input and output tokens based on what
 Gemini model you're using.
- If Gemini uses code execution when generating your response, the
 original prompt, the generated code, and the result of the executed code are
 labeled **intermediate tokens** and are billed as **input tokens**.
- Gemini then generates a summary and returns the generated code, the
 result of the executed code, and the final summary. These are billed as
 **output tokens**.
- The Gemini API includes an intermediate token count in the API
 response, so you can keep track of any additional input tokens beyond those
 passed in your initial prompt.

Generated code can include both text and multimodal outputs, such as images.

## Limitations

- The model can only generate and execute code. It can't return other artifacts
 like media files.
- The code execution tool doesn't support file URIs as input/output. However,
 the code execution tool supports file input and graph output as
 inlined bytes. By using these input and output capabilities, you can upload
 CSV and text files, ask questions about the files, and have
 Matplotlib graphs generated as part of the code execution result.
 The supported mime types for inlined bytes are `.cpp`, `.csv`, `.java`,
 `.jpeg`, `.js`, `.png`, `.py`, `.ts`, and `.xml`.
- Code execution can run for a maximum of 30 seconds before timing out.
- In some cases, enabling code execution can lead to regressions in other areas
 of model output (for example, writing a story).