---
title: Code-Interpreter-extensiongoogle.com/vertex-ai/generative-ai/docs/extensions/google-extensions#register_and_query_the_code_interpreter_extension
date_scraped: 2025-05-12
---

# Code Interpreter extension 

**Preview**

Vertex AI Extensions is a Preview offering, subject to the
"Pre-GA Offerings Terms" of the
[Google Cloud Service Specific Terms](https://cloud.google.com/terms/service-terms). Pre-GA products and features
may have limited support, and changes to pre-GA products and features may not be compatible with
other pre-GA versions. For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages). Further, by using
Vertex AI Extensions, you agree to the Generative AI Preview
[terms and conditions](/trustedtester/aitos) ("Preview Terms").

This document shows you how to register and use the Google-provided Code
Interpreter [extension](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/overview)
from the Google Cloud console and the Vertex AI API. This extension lets you
generate and run Python code to:

- Analyze, clean, transform, and reshape your datasets
- Visualize data in charts and graphs
- Run calculations

The Code Interpreter extension uses the `code_interpreter_tool` to
generate and run Python code from a natural language description. The
`code_interpreter_tool` is defined in an
[OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/main/README.md)
`code_interpreter.yaml` file.

Expand Me
Collapse Me

```python
openapi: "3.0.0"
info:
 version: 1.0.0
 title: code_interpreter_tool
 description: >
 This tool supports the following operations based on user input:

 1. **Generates and Executes Code:** Accepts a user query in natural language, generates corresponding code, and executes it to produce results for the user query.

 Supported AuthTypes:

 - `GOOGLE_SERVICE_ACCOUNT_AUTH`: (Vertex AI Extension Service Agent is supported).
paths:
 /generate_and_execute:
 post:
 operationId: generate_and_execute
 description: >
 Get the results of a natural language query by generating and executing a code snippet.
 Example queries: "Find the max in [1, 2, 5]" or "Plot average sales by year (from data.csv)".
 requestBody:
 required: true
 content:
 application/json:
 schema:
 type: object
 required:
 - query
 properties:
 query:
 type: string
 description: >
 Required. The Natural language query to get the results for.
 The query string can optionally contain data to use for the code generated.
 For example: "I have a list of numbers: [1, 2, 3, 4]. Find the largest number in the provided data."
 timeout:
 type: number
 description: >
 Optional. Timeout in miliseconds for the code execution. Default value: 30000.
 files:
 type: array
 description: >
 Optional. Input files to use when executing the generated code.
 If specified, the file contents are expected be base64-encoded.
 For example: [{"name": "data.csv", "contents": "aXRlbTEsaXRlbTI="}]
 items:
 $ref: "#/components/schemas/File"
 file_gcs_uris:
 type: array
 description: >
 Optional. GCS URIs of input files to use when executing the generated code.
 For example: ["gs://input-bucket/data.csv"]
 This option is only applicable when `file_input_gcs_bucket` is specified in `Extension.CodeInterpreterRuntimeConfig`.
 items:
 type: string
 responses:
 '200':
 description: >
 The results of generating and executing code based on the natual language query.
 The result contains the generated code, and the STDOUT, STDERR, and output files from code execution.
 content:
 application/json:
 schema:
 $ref: "#/components/schemas/GenerationAndExecutionResult"
components:
 schemas:
 File:
 description: >
 File used as inputs and outputs of code execution. The `contents` string should be base64-encoded bytes.
 For example: [{"name": "data.csv", "contents": "aXRlbTEsaXRlbTI="}]
 type: object
 properties:
 name:
 type: string
 contents:
 type: string
 format: byte
 GenerationAndExecutionResult:
 description: >
 The results of generating and executing code based on the natual language query.
 properties:
 generated_code:
 type: string
 description: >
 The generated code in markdown format.
 For example: "```python\nprint(\"Hello World\")\n```"
 execution_result:
 type: string
 description: >
 The code execution result string from STDOUT.
 execution_error:
 type: string
 description: >
 The code execution error string from STDERR.
 output_files:
 type: array
 description: >
 The output files generated from code execution.
 If present, the file contents are required be base64-encoded.
 For example: [{"name": "data.csv", "contents": "aXRlbTEsaXRlbTI="}]
 items:
 $ref: "#/components/schemas/File"
 output_gcs_uris:
 type: array
 description: >
 The output GCS URIs of files generated from code execution.
 For example: ["gs://output-bucket/subfolder/output.csv"]

 This field is only applicable when `file_output_gcs_bucket` is specified in `Extension.CodeInterpreterRuntimeConfig`.
 items:
 type: string

```

## Before you begin

- Sign in to your Google Cloud account. If you're new to
 Google Cloud, [create an account](https://console.cloud.google.com/freetrial) to evaluate how our products perform in
 real-world scenarios. New customers also get $300 in free credits to
 run, test, and deploy workloads.
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com&redirect=https://console.cloud.google.com)
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com&redirect=https://console.cloud.google.com)

## Register, query, and run the Code Interpreter extension

The following sections show you how to register the Code Interpreter extension
using the Google Cloud console
and the Vertex AI API. After registering the extension, you can
query it using the Google Cloud console or run it using the
Vertex AI API.

### Console

**Register the extension**

Perform the following steps to register the Code Interpreter
extension using the Google Cloud console.

1. In the Google Cloud console, go to the Vertex AI
 **Extensions** page.

 [Go to Vertex AI Extensions](https://console.cloud.google.com/vertex-ai/extensions)
2. Click **Create Extension**.
3. In the **Create a new extension** dialog, do the:

 - **Extension name:** Enter a name for your extension, such as "code\_interpreter\_extension".
 - **Description:** (Optional) Enter an extension description, such as "A code interpreter extension".
 - **Extension type:** Select `Code interpreter`.
4. In the **OpenAPI Spec file** section that now appears, confirm that the
 following fields are set correctly:

 - **API name:** `code_interpreter_tool`.
 - **API description:** `Tool to generate and run valid Python code from a natural language description, or to run custom Python code...`
 - **Source:** `Cloud Storage`.
 - **OpenAPI Spec:** `vertex-extension-public/code_interpreter.yaml`.
 - **Authentication:** `Google service account`.
5. (Optional) In the **Runtime configurations** section, provide the input
 bucket and the output bucket.

 - The input bucket is the
 [Cloud Storage bucket](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions#CodeInterpreterRuntimeConfig.FIELDS.file_input_gcs_bucket)
 that the extension will use to read input files, including the `gs://` prefix, for example,
 `gs://sample-bucket-name`. If specified, you must assign the
 [`roles/storage.objectViewer`](https://cloud.google.com/iam/docs/understanding-roles#storage.objectViewer)
 role on this bucket to the [Vertex Extension Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) service account.
 - The output bucket is the
 [Cloud Storage bucket](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions#CodeInterpreterRuntimeConfig.FIELDS.file_output_gcs_bucket)
 that the extension will use to write output files, including the `gs://` prefix, for example,
 `gs://sample-bucket-name`. If specified, you must assign the
 [`roles/storage.objectUser`](https://cloud.google.com/iam/docs/understanding-roles#storage.objectUser)
 role on this bucket to the [Vertex Extension Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) service account.
6. Click **Create Extension**.

**(Optional) Query the extension**

You can use the Google Cloud console to experiment with your Code
Interpreter extension. Perform the following steps to invoke the extension with
natural language prompts.

1. In the Google Cloud console, go to the Vertex AI
 **Extensions** page.

 [Go to Vertex AI Extensions](https://console.cloud.google.com/vertex-ai/extensions)
2. Click the Code Interpreter extension name to open the **Extensions details**
 page.
3. In the **Enter a message** box, enter a query, then view the response. Expand
 Extension Response sections to view the code that the extension generated
 and ran to produce the result.

 The following example shows the results of a query that
 calculated the mean value of a list of numbers entered by the user.

### REST

**Register the extension**

Submit a Vertex AI API
[`extensions.import`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions/import)
request to register the Code Interpreter extension.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: The ID of your Google Cloud project.
- REGION: A [Compute Engine region](https://cloud.google.com/compute/docs/regions-zones#available).
- DISPLAY\_NAME: The [name](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions#Extension.FIELDS.display_name)
 extension that is displayed to users, such as "my\_code\_interpreter\_extension".
- DESCRIPTION: (Optional) The extension [description](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions#Extension.FIELDS.description)
 that is displayed to users, such as "A code interpreter extension".
- SERVICE\_ACCOUNT: (Optional) The Code Interpreter extension
 uses [GOOGLE\_SERVICE\_ACCOUNT\_AUTH](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions#AuthConfig.FIELDS.google_service_account_config)
 as shown in the sample request body. If you do not specify a service account, the extension uses the default
 [Vertex AI Extension Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents)
 service account.
 If you specify a different service account, grant the
 [`iam.serviceAccounts.getAccessToken`](https://cloud.google.com/iam/docs/permissions-reference#search)
 permission to the Vertex AI Extension Service Agent service account on the specified service account.
- INPUT\_BUCKET: (Optional) The
 [Cloud Storage bucket](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions#CodeInterpreterRuntimeConfig.FIELDS.file_input_gcs_bucket)
 that the extension will use to read input files, including the `gs://` prefix, for example,
 `gs://sample-bucket-name`. If specified, you must assign the
 [`roles/storage.objectViewer`](https://cloud.google.com/iam/docs/understanding-roles#storage.objectViewer)
 role on this bucket to the [Vertex Extension Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents)
 service account.
- OUTPUT\_BUCKET: (Optional) The [Cloud Storage bucket](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions#CodeInterpreterRuntimeConfig.FIELDS.file_output_gcs_bucket)
 that the extension will use to write output files, including the `gs://` prefix, for example,
 `gs://sample-bucket-name`. If specified, you must assign the
 [`roles/storage.objectUser`](https://cloud.google.com/iam/docs/understanding-roles#storage.objectUser)
 role on this bucket to the [Vertex Extension Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents)
 service account.

HTTP method and URL:

```python
POST https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions:import
```

Request JSON body:

```python
{
 "displayName":"DISPLAY_NAME",
 "description":"DESCRIPTION",
 "manifest":{
 "name":"code_interpreter_tool",
 "description":"A Google Code Interpreter tool",
 "apiSpec":{
 "openApiGcsUri":"gs://vertex-extension-public/code_interpreter.yaml"
 },
 "authConfig":{
 "authType":"GOOGLE_SERVICE_ACCOUNT_AUTH",
 "googleServiceAccountConfig":{
 "serviceAccount":"SERVICE_ACCOUNT"
 }
 }
 }
 "runtimeConfig": {
 "codeInterpreterRuntimeConfig": {
 "fileInputGcsBucket": "INPUT_BUCKET",
 "fileOutputGcsBucket": "OUTPUT_BUCKET"
 }
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
 "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions:import"
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
 -Uri "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions:import" | Select-Object -Expand Content
```

**Run the extension**

You can submit an `execute` operation to the Vertex AI API
to generate and run Python code based on a natural language query.

Query examples:

- Simple query: Find the max value of a list of numbers.
- Query inline data: Data to query is provided in the request body.
- Query with file data: Print file data.
- Query with Cloud Storage data: Read Cloud Storage data.

### Simple query

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: The ID of your Google Cloud project.
- REGION: A [Compute Engine region](https://cloud.google.com/compute/docs/regions-zones#available).
- EXTENSION\_ID: The ID of your code interpreter extension listed in the
 **Extension details** in the Google Cloud console.

HTTP method and URL:

```python
POST https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute
```

Request JSON body:

```python
{
 "operation_id":"generate_and_execute",
 "operation_params":{
 "query":"find the max value in the list: [1,2,3,4,-5]"
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
 "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute"
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
 -Uri "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute" | Select-Object -Expand Content
```

### Inline data

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: The ID of your Google Cloud project.
- REGION: A [Compute Engine region](https://cloud.google.com/compute/docs/regions-zones#available).
- EXTENSION\_ID: The ID of your code interpreter extension listed in the
 **Extension details** in the Google Cloud console.

HTTP method and URL:

```python
POST https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute
```

Request JSON body:

```python
{
 "operation_id":"generate_and_execute",
 "operation_params":{
 "query":"Calculate the total values of each column(mobile_subscribers, percent_internet_users, total_internet_users, fixed_broadband_subscribers) from the below dataset.\n\n\ncountry_name country_code year mobile_subscribers percent_internet_users total_internet_users fixed_broadband_subscribers\nUnited States US 2023 333.4 90.5 303.1 200.3\nChina CN 2023 1.613 70.2 1131.4 512.2\nIndia IN 2023 1.165 50.7 688.5 557.2\nJapan JP 2023 124.3 88.2 109.5 114.8\nGermany DE 2023 102.1 90.5 92.1 100\nUnited Kingdom UK 2023 67.1 92.7 62.2 65\nFrance FR 2023 66.7 89 63 69.7\nBrazil BR 2023 213.5 68 144.1 69.4\nRussia RU 2023 203.8 74.9 152.7 51.1"
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
 "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute"
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
 -Uri "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute" | Select-Object -Expand Content
```

### File print

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: The ID of your Google Cloud project.
- REGION: A [Compute Engine region](https://cloud.google.com/compute/docs/regions-zones#available).
- EXTENSION\_ID: The ID of your code interpreter extension listed in the
 **Extension details** in the Google Cloud console.
- FILE\_NAME: The CSV file data in the request body is written to this file in the working
 directory.
- BASE64\_ENCODED\_FILE\_BYTES: File bytes in the request body must be base64-encoded.

HTTP method and URL:

```python
POST https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute
```

Request JSON body:

```python
{
 "operation_id":"generate_and_execute",
 "operation_params":{
 "query":"print the csv file",
 "files":[
 {
 "name":"FILE_NAME",
 "contents":"BASE64_ENCODED_FILE_BYTES"
 }
 ]
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
 "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute"
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
 -Uri "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute" | Select-Object -Expand Content
```

### Cloud Storage read

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: The ID of your Google Cloud project.
- REGION: A [Compute Engine region](https://cloud.google.com/compute/docs/regions-zones#available).
- EXTENSION\_ID: The ID of your code interpreter extension listed in the
 **Extension details** in the Google Cloud console.
- BUCKET\_NAME: The Cloud Storage bucket that contains the CSV file to print. You
 must have specified this input bucket when you
 registered the code interpreter extension.
- FILE\_NAME: The CSV file data in the BUCKET\_NAME to print.

HTTP method and URL:

```python
POST https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute
```

Request JSON body:

```python
{
 "operation_id":"generate_and_execute",
 "operation_params":{
 "query":"print the csv file",
 "file_gcs_uris": ["gs://BUCKET_NAME/FILE_NAME"]
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
 "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute"
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
 -Uri "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/extensions/EXTENSION_ID:execute" | Select-Object -Expand Content
```