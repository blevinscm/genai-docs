---
title: Function-calling-referencegoogle.com/vertex-ai/generative-ai/docs/model-reference/function-calling
date_scraped: 2025-05-12
---

# Function calling reference 

Function calling improves the LLM's ability to provide relevant and contextual
answers.

You can provide custom functions to a generative AI model with the Function
Calling API. The model doesn't directly invoke these functions, but instead
generates structured data output that specifies the function name and suggested
arguments.

This output enables the calling of external APIs or information
systems such as databases, customer relationship management systems, and
document repositories. The resulting API output can be used by the LLM to
improve response quality.

For more conceptual documentation on function calling, see [Function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling).

## Supported models

- [Vertex AI Model Optimizer](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/vertex-ai-model-optimizer)
- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](../models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)
- [Gemini 2.0 Flash-Lite](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-0-flash-lite)

**Limitations**:

- The maximum number of function declarations that can be provided with the request is 128.

## Example syntax

Syntax to send a function call API request.

### curl

```python
curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \

https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:generateContent \
-d '{
 "contents": [{
 ...
 }],
 "tools": [{
 "function_declarations": [
 {
 ...
 }
 ]
 }]
}'
```

## Parameter list

See [examples](#examples) for implementation details.

#### `FunctionDeclaration`

Defines a function that the model can generate JSON inputs for based on
[OpenAPI 3.0](https://spec.openapis.org/oas/v3.0.3) specifications.

| Parameters | |
| --- | --- |
| `name` | `string` The name of the function to call. Must start with a letter or an underscore. Must be a-z, A-Z, 0-9, or contains underscores, dots, or dashes, with a maximum length of 64. |
| `description` | Optional: `string` The description and purpose of the function. The model uses this to decide how and whether to call the function. For the best results, we recommend that you include a description. |
| `parameters` | Optional: `Schema` Describes the parameters of the function in the OpenAPI JSON Schema Object format: [OpenAPI 3.0 specification](https://spec.openapis.org/oas/v3.0.3). |
| `response` | Optional: `Schema` Describes the output from the function in the OpenAPI JSON Schema Object format: [OpenAPI 3.0 specification](https://spec.openapis.org/oas/v3.0.3). |

For more information, see
[Function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling)

#### `Schema`

Defines the format of the input and output data in a function call based on the
[OpenAPI 3.0 Schema](https://spec.openapis.org/oas/v3.0.3#schema) specification.

| Parameters | |
| --- | --- |
| type | `string` Enum. The type of the data. Must be one of: - `STRING` - `INTEGER` - `BOOLEAN` - `NUMBER` - `ARRAY` - `OBJECT` |
| `description` | Optional: `string` Description of the data. |
| `enum` | Optional: `string[]` Possible values of the element of primitive type with enum format. |
| `items` | Optional: `Schema[]` Schema of the elements of `Type.ARRAY` |
| `properties` | Optional: `Schema` Schema of the properties of `Type.OBJECT` |
| `required` | Optional: `string[]` Required properties of `Type.OBJECT`. |
| `nullable` | Optional: `bool` Indicates if the value may be `null`. |

#### `FunctionCallingConfig`

The `FunctionCallingConfig` controls the behavior of the model and
determines what type of function to call.

| Parameters | |
| --- | --- |
| `mode` | Optional: `enum/string[]` - `AUTO`: Default model behavior. The model can make predictions in either a function call form or a natural language response form. The model decides which form to use based on the context. - `NONE`: The model doesn't make any predictions in the form of function calls. - `ANY`: The model is constrained to always predict a function call. If `allowed_function_names` is not provided, the model picks from all of the available function declarations. If `allowed_function_names` is provided, the model picks from the set of allowed functions. |
| `allowed_function_names` | Optional: `string[]` Function names to call. Only set when the `mode` is `ANY`. Function names should match `[FunctionDeclaration.name]`. With mode set to `ANY`, the model will predict a function call from the set of function names provided. |

#### `functionCall`

A predicted `functionCall` returned from the model that contains a string
representing the `functionDeclaration.name` and a structured JSON object
containing the parameters and their values.

| Parameters | |
| --- | --- |
| `name` | `string` The name of the function to call. |
| `args` | `Struct` The function parameters and values in JSON object format. See [Function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/function-calling) for parameter details. |

#### `functionResponse`

The resulting output from a `FunctionCall` that contains a string representing the
`FunctionDeclaration.name`. Also contains a structured JSON object with the
output from the function (and uses it as context for the model). This should contain the
result of a `FunctionCall` made based on model prediction.

| Parameters | |
| --- | --- |
| `name` | `string` The name of the function to call. |
| `response` | `Struct` The function response in JSON object format. |

## Examples

### Send a function declaration

The following example is a basic example of sending a query and a function declaration
to the model.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_ID: The ID of the model that's being processed.
- ROLE: The [identity of the entity](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#content) that creates the message.
- TEXT: The prompt to send to the model.
- NAME: The name of the function to call.
- DESCRIPTION: Description and purpose of the function.
- For other fields, see the [Parameter list](#parameter-list) table.

HTTP method and URL:

```python
POST https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID:generateContent
```

Request JSON body:

```python
{
 "contents": [{
 "role": "ROLE",
 "parts": [{
 "text": "TEXT"
 }]
 }],
 "tools": [{
 "function_declarations": [
 {
 "name": "NAME",
 "description": "DESCRIPTION",
 "parameters": {
 "type": "TYPE",
 "properties": {
 "location": {
 "type": "TYPE",
 "description": "DESCRIPTION"
 }
 },
 "required": [
 "location"
 ]
 }
 }
 ]
 }]
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
 "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID:generateContent"
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
 -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID:generateContent" | Select-Object -Expand Content
```

#### Example curl command

```python
PROJECT_ID=myproject
LOCATION=us-central1
MODEL_ID=gemini-2.0-flash-001

curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:generateContent \
 -d '{
 "contents": [{
 "role": "user",
 "parts": [{
 "text": "What is the weather in Boston?"
 }]
 }],
 "tools": [{
 "functionDeclarations": [
 {
 "name": "get_current_weather",
 "description": "Get the current weather in a given location",
 "parameters": {
 "type": "object",
 "properties": {
 "location": {
 "type": "string",
 "description": "The city and state, e.g. San Francisco, CA or a zip code e.g. 95616"
 }
 },
 "required": [
 "location"
 ]
 }
 }
 ]
 }]
 }'

```

### Gen AI SDK for Python

```python
from google import genai
from google.genai.types import GenerateContentConfig, HttpOptions

def get_current_weather(location: str) -> str:
 """Example method. Returns the current weather.

 Args:
 location: The city and state, e.g. San Francisco, CA
 """
 weather_map: dict[str, str] = {
 "Boston, MA": "snowing",
 "San Francisco, CA": "foggy",
 "Seattle, WA": "raining",
 "Austin, TX": "hot",
 "Chicago, IL": "windy",
 }
 return weather_map.get(location, "unknown")

client = genai.Client(http_options=HttpOptions(api_version="v1"))
model_id = "gemini-2.0-flash-001"

response = client.models.generate_content(
 model=model_id,
 contents="What is the weather like in Boston?",
 config=GenerateContentConfig(
 tools=[get_current_weather],
 temperature=0,
 ),
)

print(response.text)
# Example response:
# The weather in Boston is sunny.
```

### Node.js

```python
const {
 VertexAI,
 FunctionDeclarationSchemaType,
} = require('@google-cloud/vertexai');

const functionDeclarations = [
 {
 function_declarations: [
 {
 name: 'get_current_weather',
 description: 'get weather in a given location',
 parameters: {
 type: FunctionDeclarationSchemaType.OBJECT,
 properties: {
 location: {type: FunctionDeclarationSchemaType.STRING},
 unit: {
 type: FunctionDeclarationSchemaType.STRING,
 enum: ['celsius', 'fahrenheit'],
 },
 },
 required: ['location'],
 },
 },
 ],
 },
];

/**
 * TODO(developer): Update these variables before running the sample.
 */
async function functionCallingBasic(
 projectId = 'PROJECT_ID',
 location = 'us-central1',
 model = 'gemini-2.0-flash-001'
) {
 // Initialize Vertex with your Cloud project and location
 const vertexAI = new VertexAI({project: projectId, location: location});

 // Instantiate the model
 const generativeModel = vertexAI.preview.getGenerativeModel({
 model: model,
 });

 const request = {
 contents: [
 {role: 'user', parts: [{text: 'What is the weather in Boston?'}]},
 ],
 tools: functionDeclarations,
 };
 const result = await generativeModel.generateContent(request);
 console.log(JSON.stringify(result.response.candidates[0].content));
}
```

### Java

```python
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.Content;
import com.google.cloud.vertexai.api.FunctionDeclaration;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.Schema;
import com.google.cloud.vertexai.api.Tool;
import com.google.cloud.vertexai.api.Type;
import com.google.cloud.vertexai.generativeai.ChatSession;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

public class FunctionCalling {
 public static void main(String[] args) throws IOException {
 // TODO(developer): Replace these variables before running the sample.
 String projectId = "your-google-cloud-project-id";
 String location = "us-central1";
 String modelName = "gemini-2.0-flash-001";

 String promptText = "What's the weather like in Paris?";

 whatsTheWeatherLike(projectId, location, modelName, promptText);
 }

 // A request involving the interaction with an external tool
 public static String whatsTheWeatherLike(String projectId, String location,
 String modelName, String promptText)
 throws IOException {
 // Initialize client that will be used to send requests.
 // This client only needs to be created once, and can be reused for multiple requests.
 try (VertexAI vertexAI = new VertexAI(projectId, location)) {

 FunctionDeclaration functionDeclaration = FunctionDeclaration.newBuilder()
 .setName("getCurrentWeather")
 .setDescription("Get the current weather in a given location")
 .setParameters(
 Schema.newBuilder()
 .setType(Type.OBJECT)
 .putProperties("location", Schema.newBuilder()
 .setType(Type.STRING)
 .setDescription("location")
 .build()
 )
 .addRequired("location")
 .build()
 )
 .build();

 System.out.println("Function declaration:");
 System.out.println(functionDeclaration);

 // Add the function to a "tool"
 Tool tool = Tool.newBuilder()
 .addFunctionDeclarations(functionDeclaration)
 .build();

 // Start a chat session from a model, with the use of the declared function.
 GenerativeModel model = new GenerativeModel(modelName, vertexAI)
 .withTools(Arrays.asList(tool));
 ChatSession chat = model.startChat();

 System.out.println(String.format("Ask the question: %s", promptText));
 GenerateContentResponse response = chat.sendMessage(promptText);

 // The model will most likely return a function call to the declared
 // function `getCurrentWeather` with "Paris" as the value for the
 // argument `location`.
 System.out.println("\nPrint response: ");
 System.out.println(ResponseHandler.getContent(response));

 // Provide an answer to the model so that it knows what the result
 // of a "function call" is.
 Content content =
 ContentMaker.fromMultiModalData(
 PartMaker.fromFunctionResponse(
 "getCurrentWeather",
 Collections.singletonMap("currentWeather", "sunny")));
 System.out.println("Provide the function response: ");
 System.out.println(content);
 response = chat.sendMessage(content);

 // See what the model replies now
 System.out.println("Print response: ");
 String finalAnswer = ResponseHandler.getText(response);
 System.out.println(finalAnswer);

 return finalAnswer;
 }
 }
}
```

### Go

```python
import (
 "context"
 "fmt"
 "io"

 genai "google.golang.org/genai"
)

// generateWithFuncCall shows how to submit a prompt and a function declaration to the model,
// allowing it to suggest a call to the function to fetch external data. Returning this data
// enables the model to generate a text response that incorporates the data.
func generateWithFuncCall(w io.Writer) error {
 ctx := context.Background()

 client, err := genai.NewClient(ctx, &genai.ClientConfig{
 HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
 })
 if err != nil {
 return fmt.Errorf("failed to create genai client: %w", err)
 }

 weatherFunc := &genai.FunctionDeclaration{
 Description: "Returns the current weather in a location.",
 Name: "getCurrentWeather",
 Parameters: &genai.Schema{
 Type: "object",
 Properties: map[string]*genai.Schema{
 "location": {Type: "string"},
 },
 Required: []string{"location"},
 },
 }
 config := &genai.GenerateContentConfig{
 Tools: []*genai.Tool{
 {FunctionDeclarations: []*genai.FunctionDeclaration{weatherFunc}},
 },
 Temperature: genai.Ptr(0.0),
 }

 modelName := "gemini-2.0-flash-001"
 contents := []*genai.Content{
 {Parts: []*genai.Part{
 {Text: "What is the weather like in Boston?"},
 }},
 }

 resp, err := client.Models.GenerateContent(ctx, modelName, contents, config)
 if err != nil {
 return fmt.Errorf("failed to generate content: %w", err)
 }

 var funcCall *genai.FunctionCall
 for _, p := range resp.Candidates[0].Content.Parts {
 if p.FunctionCall != nil {
 funcCall = p.FunctionCall
 fmt.Fprint(w, "The model suggests to call the function ")
 fmt.Fprintf(w, "%q with args: %v\n", funcCall.Name, funcCall.Args)
 // Example response:
 // The model suggests to call the function "getCurrentWeather" with args: map[location:Boston]
 }
 }
 if funcCall == nil {
 return fmt.Errorf("model did not suggest a function call")
 }

 // Use synthetic data to simulate a response from the external API.
 // In a real application, this would come from an actual weather API.
 funcResp := &genai.FunctionResponse{
 Name: "getCurrentWeather",
 Response: map[string]any{
 "location": "Boston",
 "temperature": "38",
 "temperature_unit": "F",
 "description": "Cold and cloudy",
 "humidity": "65",
 "wind": `{"speed": "10", "direction": "NW"}`,
 },
 }

 // Return conversation turns and API response to complete the model's response.
 contents = []*genai.Content{
 {Parts: []*genai.Part{
 {Text: "What is the weather like in Boston?"},
 }},
 {Parts: []*genai.Part{
 {FunctionCall: funcCall},
 }},
 {Parts: []*genai.Part{
 {FunctionResponse: funcResp},
 }},
 }

 resp, err = client.Models.GenerateContent(ctx, modelName, contents, config)
 if err != nil {
 return fmt.Errorf("failed to generate content: %w", err)
 }

 respText, err := resp.Text()
 if err != nil {
 return fmt.Errorf("failed to convert model response to text: %w", err)
 }
 fmt.Fprintln(w, respText)

 // Example response:
 // The weather in Boston is cold and cloudy with a temperature of 38 degrees Fahrenheit. The humidity is ...

 return nil
}

```

### REST (OpenAI)

You can call the Function Calling API by using the OpenAI library. For more information, see
[Call Vertex AI models by using the OpenAI library](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/call-vertex-using-openai-library).

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_ID: The ID of the model that's being processed.

HTTP method and URL:

```python
POST https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/endpoints/openapi/chat/completions
```

Request JSON body:

```python
{
 "model": "google/MODEL_ID",
 "messages": [
 {
 "role": "user",
 "content": "What is the weather in Boston?"
 }
 ],
 "tools": [
 {
 "type": "function",
 "function": {
 "name": "get_current_weather",
 "description": "Get the current weather in a given location",
 "parameters": {
 "type": "OBJECT",
 "properties": {
 "location": {
 "type": "string",
 "description": "The city and state, e.g. San Francisco, CA or a zip code e.g. 95616"
 }
 },
 "required": ["location"]
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
 "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/endpoints/openapi/chat/completions"
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
 -Uri "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/endpoints/openapi/chat/completions" | Select-Object -Expand Content
```

### Python (OpenAI)

You can call the Function Calling API by using the OpenAI library. For more information, see
[Call Vertex AI models by using the OpenAI library](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/call-vertex-using-openai-library).

```python
import vertexai
import openai

from google.auth import default, transport

# TODO(developer): Update & uncomment below line
# PROJECT_ID = "your-project-id"
location = "us-central1"

vertexai.init(project=PROJECT_ID, location=location)

# Programmatically get an access token
credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
auth_request = transport.requests.Request()
credentials.refresh(auth_request)

# # OpenAI Client
client = openai.OpenAI(
 base_url=f"https://{location}-aiplatform.googleapis.com/v1beta1/projects/{PROJECT_ID}/locations/{location}/endpoints/openapi",
 api_key=credentials.token,
)

tools = [
 {
 "type": "function",
 "function": {
 "name": "get_current_weather",
 "description": "Get the current weather in a given location",
 "parameters": {
 "type": "object",
 "properties": {
 "location": {
 "type": "string",
 "description": "The city and state, e.g. San Francisco, CA or a zip code e.g. 95616",
 },
 },
 "required": ["location"],
 },
 },
 }
]

messages = []
messages.append(
 {
 "role": "system",
 "content": "Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous.",
 }
)
messages.append({"role": "user", "content": "What is the weather in Boston?"})

response = client.chat.completions.create(
 model="google/gemini-2.0-flash-001",
 messages=messages,
 tools=tools,
)

print("Function:", response.choices[0].message.tool_calls[0].id)
print("Arguments:", response.choices[0].message.tool_calls[0].function.arguments)
# Example response:
# Function: get_current_weather
# Arguments: {"location":"Boston"}

```

### Send a function declaration with `FunctionCallingConfig`

The following example demonstrates how to pass a `FunctionCallingConfig`
to the model.

The `functionCallingConfig` ensures that the model output is always a
specific function call. To configure:

- Set the function calling `mode` to `ANY`.
- Specify the function names that you want to use in `allowed_function_names`.
 If `allowed_function_names` is empty, any of the provided functions
 can be returned.

### REST

```python
PROJECT_ID=myproject
LOCATION=us-central1
MODEL_ID=gemini-2.0-flash-001

curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:generateContent \
 -d '{
 "contents": [{
 "role": "user",
 "parts": [{
 "text": "Do you have the White Pixel 8 Pro 128GB in stock in the US?"
 }]
 }],
 "tools": [{
 "functionDeclarations": [
 {
 "name": "get_product_sku",
 "description": "Get the available inventory for a Google products, e.g: Pixel phones, Pixel Watches, Google Home etc",
 "parameters": {
 "type": "object",
 "properties": {
 "product_name": {"type": "string", "description": "Product name"}
 }
 }
 },
 {
 "name": "get_store_location",
 "description": "Get the location of the closest store",
 "parameters": {
 "type": "object",
 "properties": {
 "location": {"type": "string", "description": "Location"}
 },
 }
 }
 ]
 }],
 "toolConfig": {
 "functionCallingConfig": {
 "mode":"ANY",
 "allowedFunctionNames": ["get_product_sku"]
 }
 },
 "generationConfig": {
 "temperature": 0.95,
 "topP": 1.0,
 "maxOutputTokens": 8192
 }
 }'

```

### Gen AI SDK for Python

```python
from google import genai
from google.genai.types import (
 FunctionDeclaration,
 GenerateContentConfig,
 HttpOptions,
 Tool,
)

client = genai.Client(http_options=HttpOptions(api_version="v1"))
model_id = "gemini-2.0-flash-001"

get_album_sales = FunctionDeclaration(
 name="get_album_sales",
 description="Gets the number of albums sold",
 # Function parameters are specified in JSON schema format
 parameters={
 "type": "OBJECT",
 "properties": {
 "albums": {
 "type": "ARRAY",
 "description": "List of albums",
 "items": {
 "description": "Album and its sales",
 "type": "OBJECT",
 "properties": {
 "album_name": {
 "type": "STRING",
 "description": "Name of the music album",
 },
 "copies_sold": {
 "type": "INTEGER",
 "description": "Number of copies sold",
 },
 },
 },
 },
 },
 },
)

sales_tool = Tool(
 function_declarations=[get_album_sales],
)

response = client.models.generate_content(
 model=model_id,
 contents='At Stellar Sounds, a music label, 2024 was a rollercoaster. "Echoes of the Night," a debut synth-pop album, '
 'surprisingly sold 350,000 copies, while veteran rock band "Crimson Tide\'s" latest, "Reckless Hearts," '
 'lagged at 120,000. Their up-and-coming indie artist, "Luna Bloom\'s" EP, "Whispers of Dawn," '
 'secured 75,000 sales. The biggest disappointment was the highly-anticipated rap album "Street Symphony" '
 "only reaching 100,000 units. Overall, Stellar Sounds moved over 645,000 units this year, revealing unexpected "
 "trends in music consumption.",
 config=GenerateContentConfig(
 tools=[sales_tool],
 temperature=0,
 ),
)

print(response.function_calls[0])
# Example response:
# [FunctionCall(
# id=None,
# name="get_album_sales",
# args={
# "albums": [
# {"album_name": "Echoes of the Night", "copies_sold": 350000},
# {"copies_sold": 120000, "album_name": "Reckless Hearts"},
# {"copies_sold": 75000, "album_name": "Whispers of Dawn"},
# {"copies_sold": 100000, "album_name": "Street Symphony"},
# ]
# },
# )]
```

### Node.js

```python
const {
 VertexAI,
 FunctionDeclarationSchemaType,
} = require('@google-cloud/vertexai');

const functionDeclarations = [
 {
 function_declarations: [
 {
 name: 'get_product_sku',
 description:
 'Get the available inventory for a Google products, e.g: Pixel phones, Pixel Watches, Google Home etc',
 parameters: {
 type: FunctionDeclarationSchemaType.OBJECT,
 properties: {
 productName: {type: FunctionDeclarationSchemaType.STRING},
 },
 },
 },
 {
 name: 'get_store_location',
 description: 'Get the location of the closest store',
 parameters: {
 type: FunctionDeclarationSchemaType.OBJECT,
 properties: {
 location: {type: FunctionDeclarationSchemaType.STRING},
 },
 },
 },
 ],
 },
];

const toolConfig = {
 function_calling_config: {
 mode: 'ANY',
 allowed_function_names: ['get_product_sku'],
 },
};

const generationConfig = {
 temperature: 0.95,
 topP: 1.0,
 maxOutputTokens: 8192,
};

/**
 * TODO(developer): Update these variables before running the sample.
 */
async function functionCallingAdvanced(
 projectId = 'PROJECT_ID',
 location = 'us-central1',
 model = 'gemini-2.0-flash-001'
) {
 // Initialize Vertex with your Cloud project and location
 const vertexAI = new VertexAI({project: projectId, location: location});

 // Instantiate the model
 const generativeModel = vertexAI.preview.getGenerativeModel({
 model: model,
 });

 const request = {
 contents: [
 {
 role: 'user',
 parts: [
 {text: 'Do you have the White Pixel 8 Pro 128GB in stock in the US?'},
 ],
 },
 ],
 tools: functionDeclarations,
 tool_config: toolConfig,
 generation_config: generationConfig,
 };
 const result = await generativeModel.generateContent(request);
 console.log(JSON.stringify(result.response.candidates[0].content));
}
```

### Go

```python
import (
 "context"
 "encoding/json"
 "errors"
 "fmt"
 "io"

 "cloud.google.com/go/vertexai/genai"
)

// functionCallsChat opens a chat session and sends 4 messages to the model:
// - convert a first text question into a structured function call request
// - convert the first structured function call response into natural language
// - convert a second text question into a structured function call request
// - convert the second structured function call response into natural language
func functionCallsChat(w io.Writer, projectID, location, modelName string) error {
 // location := "us-central1"
 // modelName := "gemini-2.0-flash-001"
 ctx := context.Background()
 client, err := genai.NewClient(ctx, projectID, location)
 if err != nil {
 return fmt.Errorf("unable to create client: %w", err)
 }
 defer client.Close()

 model := client.GenerativeModel(modelName)

 // Build an OpenAPI schema, in memory
 paramsProduct := &genai.Schema{
 Type: genai.TypeObject,
 Properties: map[string]*genai.Schema{
 "productName": {
 Type: genai.TypeString,
 Description: "Product name",
 },
 },
 }
 fundeclProductInfo := &genai.FunctionDeclaration{
 Name: "getProductSku",
 Description: "Get the SKU for a product",
 Parameters: paramsProduct,
 }
 paramsStore := &genai.Schema{
 Type: genai.TypeObject,
 Properties: map[string]*genai.Schema{
 "location": {
 Type: genai.TypeString,
 Description: "Location",
 },
 },
 }
 fundeclStoreLocation := &genai.FunctionDeclaration{
 Name: "getStoreLocation",
 Description: "Get the location of the closest store",
 Parameters: paramsStore,
 }
 model.Tools = []*genai.Tool{
 {FunctionDeclarations: []*genai.FunctionDeclaration{
 fundeclProductInfo,
 fundeclStoreLocation,
 }},
 }
 model.SetTemperature(0.0)

 chat := model.StartChat()

 // Send a prompt for the first conversation turn that should invoke the getProductSku function
 prompt := "Do you have the Pixel 8 Pro in stock?"
 fmt.Fprintf(w, "Question: %s\n", prompt)
 resp, err := chat.SendMessage(ctx, genai.Text(prompt))
 if err != nil {
 return err
 }
 if len(resp.Candidates) == 0 ||
 len(resp.Candidates[0].Content.Parts) == 0 {
 return errors.New("empty response from model")
 }

 // The model has returned a function call to the declared function `getProductSku`
 // with a value for the argument `productName`.
 jsondata, err := json.MarshalIndent(resp.Candidates[0].Content.Parts[0], "\t", " ")
 if err != nil {
 return fmt.Errorf("json.MarshalIndent: %w", err)
 }
 fmt.Fprintf(w, "function call generated by the model:\n\t%s\n", string(jsondata))

 // Create a function call response, to simulate the result of a call to a
 // real service
 funresp := &genai.FunctionResponse{
 Name: "getProductSku",
 Response: map[string]any{
 "sku": "GA04834-US",
 "in_stock": "yes",
 },
 }
 jsondata, err = json.MarshalIndent(funresp, "\t", " ")
 if err != nil {
 return fmt.Errorf("json.MarshalIndent: %w", err)
 }
 fmt.Fprintf(w, "function call response sent to the model:\n\t%s\n\n", string(jsondata))

 // And provide the function call response to the model
 resp, err = chat.SendMessage(ctx, funresp)
 if err != nil {
 return err
 }
 if len(resp.Candidates) == 0 ||
 len(resp.Candidates[0].Content.Parts) == 0 {
 return errors.New("empty response from model")
 }

 // The model has taken the function call response as input, and has
 // reformulated the response to the user.
 jsondata, err = json.MarshalIndent(resp.Candidates[0].Content.Parts[0], "\t", " ")
 if err != nil {
 return fmt.Errorf("json.MarshalIndent: %w", err)
 }
 fmt.Fprintf(w, "Answer generated by the model:\n\t%s\n\n", string(jsondata))

 // Send a prompt for the second conversation turn that should invoke the getStoreLocation function
 prompt2 := "Is there a store in Mountain View, CA that I can visit to try it out?"
 fmt.Fprintf(w, "Question: %s\n", prompt)

 resp, err = chat.SendMessage(ctx, genai.Text(prompt2))
 if err != nil {
 return err
 }
 if len(resp.Candidates) == 0 ||
 len(resp.Candidates[0].Content.Parts) == 0 {
 return errors.New("empty response from model")
 }

 // The model has returned a function call to the declared function `getStoreLocation`
 // with a value for the argument `store`.
 jsondata, err = json.MarshalIndent(resp.Candidates[0].Content.Parts[0], "\t", " ")
 if err != nil {
 return fmt.Errorf("json.MarshalIndent: %w", err)
 }
 fmt.Fprintf(w, "function call generated by the model:\n\t%s\n", string(jsondata))

 // Create a function call response, to simulate the result of a call to a
 // real service
 funresp = &genai.FunctionResponse{
 Name: "getStoreLocation",
 Response: map[string]any{
 "store": "2000 N Shoreline Blvd, Mountain View, CA 94043, US",
 },
 }
 jsondata, err = json.MarshalIndent(funresp, "\t", " ")
 if err != nil {
 return fmt.Errorf("json.MarshalIndent: %w", err)
 }
 fmt.Fprintf(w, "function call response sent to the model:\n\t%s\n\n", string(jsondata))

 // And provide the function call response to the model
 resp, err = chat.SendMessage(ctx, funresp)
 if err != nil {
 return err
 }
 if len(resp.Candidates) == 0 ||
 len(resp.Candidates[0].Content.Parts) == 0 {
 return errors.New("empty response from model")
 }

 // The model has taken the function call response as input, and has
 // reformulated the response to the user.
 jsondata, err = json.MarshalIndent(resp.Candidates[0].Content.Parts[0], "\t", " ")
 if err != nil {
 return fmt.Errorf("json.MarshalIndent: %w", err)
 }
 fmt.Fprintf(w, "Answer generated by the model:\n\t%s\n\n", string(jsondata))
 return nil
}

```

### REST (OpenAI)

You can call the Function Calling API by using the OpenAI library. For more information, see
[Call Vertex AI models by using the OpenAI library](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/call-vertex-using-openai-library).

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_ID: The ID of the model that's being processed.

HTTP method and URL:

```python
POST https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/endpoints/openapi/chat/completions
```

Request JSON body:

```python
{
 "model": "google/MODEL_ID",
 "messages": [
 {
 "role": "user",
 "content": "What is the weather in Boston?"
 }
],
"tools": [
 {
 "type": "function",
 "function": {
 "name": "get_current_weather",
 "description": "Get the current weather in a given location",
 "parameters": {
 "type": "OBJECT",
 "properties": {
 "location": {
 "type": "string",
 "description": "The city and state, e.g. San Francisco, CA or a zip code e.g. 95616"
 }
 },
 "required": ["location"]
 }
 }
 }
],
"tool_choice": "auto"
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
 "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/endpoints/openapi/chat/completions"
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
 -Uri "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/endpoints/openapi/chat/completions" | Select-Object -Expand Content
```

### Python (OpenAI)

You can call the Function Calling API by using the OpenAI library. For more information, see
[Call Vertex AI models by using the OpenAI library](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/call-vertex-using-openai-library).

```python
import vertexai
import openai

from google.auth import default, transport

# TODO(developer): Update & uncomment below line
# PROJECT_ID = "your-project-id"
location = "us-central1"

vertexai.init(project=PROJECT_ID, location=location)

# Programmatically get an access token
credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
auth_request = transport.requests.Request()
credentials.refresh(auth_request)

# OpenAI Client
client = openai.OpenAI(
 base_url=f"https://{location}-aiplatform.googleapis.com/v1beta1/projects/{PROJECT_ID}/locations/{location}/endpoints/openapi",
 api_key=credentials.token,
)

tools = [
 {
 "type": "function",
 "function": {
 "name": "get_current_weather",
 "description": "Get the current weather in a given location",
 "parameters": {
 "type": "object",
 "properties": {
 "location": {
 "type": "string",
 "description": "The city and state, e.g. San Francisco, CA or a zip code e.g. 95616",
 },
 },
 "required": ["location"],
 },
 },
 }
]

messages = []
messages.append(
 {
 "role": "system",
 "content": "Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous.",
 }
)
messages.append({"role": "user", "content": "What is the weather in Boston, MA?"})

response = client.chat.completions.create(
 model="google/gemini-2.0-flash-001",
 messages=messages,
 tools=tools,
 tool_choice="auto",
)

print("Function:", response.choices[0].message.tool_calls[0].id)
print("Arguments:", response.choices[0].message.tool_calls[0].function.arguments)
# Example response:
# Function: get_current_weather
# Arguments: {"location":"Boston"}
```

## What's next

For detailed documentation, see the following:

- [Function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling)