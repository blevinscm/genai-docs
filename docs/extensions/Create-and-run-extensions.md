---
date_scraped: 2025-05-12
title: Create And Run Extensions
---

# Create and run extensions 

**Preview**

Vertex AI Extensions is a Preview offering, subject to the
"Pre-GA Offerings Terms" of the
[Google Cloud Service Specific Terms](https://cloud.google.com/terms/service-terms). Pre-GA products and features
may have limited support, and changes to pre-GA products and features may not be compatible with
other pre-GA versions. For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages). Further, by using
Vertex AI Extensions, you agree to the Generative AI Preview
[terms and conditions](/trustedtester/aitos) ("Preview Terms").

This document shows you the key functionality of the Vertex AI
extension service:

- How to [create and import extensions](#create-import-extension).
- How to [manage extensions](#manage-extension).
- How to [run extensions](#run-extension).

To learn how to import and run an extension provided by Google, see the
following:

- [Use the code interpreter extension](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/google-extensions) to generate and run
 code.
- [Use the Vertex AI Search extension](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/google-extensions#vertex_ai_search_extension)
 to access and search website corpuses and unstructured data to provide
 relevant responses to natural language questions.

## Create and import extensions

This document assumes that you already have a running API service that can
back an extension. To create an extension, you must define its interface
with an external API in an [API specification file](#create-spec). You must
[upload this specification file](#upload-spec) to a Cloud Storage bucket or
convert it into a string. You must then define an extension manifest, include
the specification file, and [send a registration request](#import-extension)
to the extension service.

### Create an API specification file

**Important:** Don't include sensitive information such as personally identifiable
information (PII) or security data in API specifications.

An extension can be created by anyone through files that define and describe the extensions's
API endpoints. The API endpoints can be public or private and hosted on any
cloud or on-premises.

An API specification file describes the interface of a API service. You must
provide an API specification file in YAML format that is compatible with
OpenAPI 3.0. This specification file must define the following:

- A [server object](https://swagger.io/specification/#server-object). This
 object must define an API server URL. The Vertex AI extension
 service does not support multiple servers.

 ```python
 servers:
 - url: API_SERVICE_URL

 ```
- A [paths object](https://swagger.io/specification/#paths-object). This object
 must describe the various operations provided by the API service and the input
 parameters that correspond to each operation. Each operation must have a
 unique identifier and a response.

 ```python
 paths:
 ...
 get:
 operationId: API_SERVICE_OPERATION_ID
 ...
 parameters:
 - name: API_SERVICE_INPUT_VAR
 ...
 responses:
 ...

 ```
- A [components object](https://swagger.io/specification/#components-object).
 This object is optional. You can use the components object to define reusable objects. For
 example, you can use the components object to provide a definition of the
 object schemas that are defined in the paths object. You can also use the components object to
 describe the output parameters of the API service.

 ```python
 components:
 schemas:
 Result:
 ...
 properties:
 API_SERVICE_OUTPUT_VAR:
 ...

 ```

To learn more about OpenAPI, see [OpenAPI Specification](https://swagger.io/specification/).

The following example is an API specification file for an API service that
says "hello" in the requested language:

```python
 openapi: "3.0.0"
 info:
 version: 1.0.0
 title: Hello Extension
 description: Learn to build Vertex AI extensions
 servers:
 - url: [API_SERVICE_URL]
 paths:
 /hello:
 get:
 operationId: say_hello
 description: Say hello in prompted language.
 parameters:
 - name: apiServicePrompt
 in: query
 description: Language
 required: true
 schema:
 type: string
 responses:
 '200':
 description: Successful operation.
 content:
 application/json:
 schema:
 $ref: "#/components/schemas/Result"
 components:
 schemas:
 Result:
 description: Hello in the requested language.
 properties:
 apiServiceOutput:
 type: string

```

### Upload the specification file

You can either upload the [specification file](#create-spec) to a Cloud Storage
bucket or convert it into a string.

If you upload the specification file to a Cloud Storage bucket, grant the
`Vertex AI Extension Service Agent` service account
(`service-PROJECT_NUMBER@gcp-sa-vertex-ex.iam.gserviceaccount.com`) the
[Storage Object Viewer](https://cloud.google.com/storage/docs/access-control/iam-roles) role. To learn
how to list the buckets in your project, see
[Listing buckets](https://cloud.google.com/storage/docs/listing-buckets).
To learn how to copy an object to a Cloud Storage bucket, see
[Copy, rename, and move objects](https://cloud.google.com/storage/docs/copying-renaming-moving-objects).

### Define an extension import request

After creating an API specification file, you can define an extension import
request in a JSON file. An extension import request must contain a reference to
your API specification file (`apiSpec`) and the authentication configuration
(`authConfig`). To connect the extension to a large language model (LLM) to see
how the extension works, include the optional `toolUseExamples` parameter. If
you want to only run the extension, don't include the `toolUseExamples`
parameter.

An extension import request has the following format:

```python
{
 "displayName": "DISPLAY_NAME_HUMAN",
 "description": "DESCRIPTION_HUMAN",
 "manifest": {
 "name": "EXTENSION_NAME_LLM",
 "description": "DESCRIPTION_LLM",
 "apiSpec": { ... },
 "authConfig": { ... },
 }
 "toolUseExamples": [ ... ],
}

```

- DISPLAY\_NAME\_HUMAN: The name of the extension that's displayed to
 users.
- DESCRIPTION\_HUMAN: The description of the extension that is
 displayed to users.
- EXTENSION\_NAME\_LLM: The name of the extension that is used by the
 LLM for reasoning.
- DESCRIPTION\_LLM: The description of the extension that is used by
 the LLM for reasoning. You should provide a meaningful and informative
 description.

#### Reference to your API specification file

Your extension import request must contain a reference to your
[API specification file](#create-spec). You can provide the specification file
in two ways:

- Use `openApiGcsUri` to pass in the Cloud Storage URI of the YAML file.

 ```python
 "apiSpec": {
 "openApiGcsUri": "gs://BUCKET_NAME/SPECIFICATION_FILE_NAME.yaml"
 },

 ```

 - BUCKET\_NAME: The name of the Cloud Storage bucket that stores
 the specification file.
 - SPECIFICATION\_FILE\_NAME: The name of the API specification file.
- Use `openApiYaml` to pass in the YAML file as a string.

#### Authentication configuration

Extensions can be *public*, available for any user to use, or *private*, only
available to authorized users within one or more organizations.

An extension import request must contain an authentication configuration. You can
choose between the following authentication methods:

- `NO_AUTH`: No authentication
- `API_KEY_AUTH`: API key authentication
- `HTTP_BASIC_AUTH`: HTTP basic authentication
- `OAUTH`: OAuth authentication
- `OIDC_AUTH`: OIDC authentication

To learn more about authentication configurations, see
[Specify an authentication configuration](#specify-authentication).

#### Examples that demonstrate how the extension works

For best results, an extension import request should contain examples that
demonstrate how the extension works. Use the `toolUseExamples` parameter to
provide these examples.

The following code shows the format of `toolUseExamples` for a single example,
with a single input parameter and a single output parameter. In this example,
both the request and the response parameters are of `string` type.

```python
"toolUseExamples": [
 {
 "extensionOperation": {
 "operationId": "API_SERVICE_OPERATION_ID",
 },
 "displayName": "EXAMPLE_DISPLAY_NAME",
 "query": "EXAMPLE_QUERY",
 "requestParams": {
 "fields": [
 {
 "key": "API_SERVICE_INPUT_VAR",
 "value": {
 "string_value": "EXAMPLE_INPUT",
 }
 }
 ]
 },
 "responseParams": {
 "fields": [
 {
 "key": "API_SERVICE_OUTPUT_VAR",
 "value": {
 "string_value": "EXAMPLE_OUTPUT",
 },
 }
 ],
 },
 "responseSummary": "EXAMPLE_SUMMARY"
 }
],

```

- `query`: An example of a query that can take advantage of this extension.
 Use EXAMPLE\_QUERY to provide the query text.
- `extensionOperation`: An extension operation that is suitable for answering
 the `query`. Use API\_SERVICE\_OPERATION\_ID to provide the ID of an
 extension operation defined in the [API specification file](#create-spec).
- `displayName`: A display name for the example. Use
 EXAMPLE\_DISPLAY\_NAME to provide a brief description.
- `requestParams`: The request parameters that are necessary for the
 `extensionOperation` and example values, in key-value format. Use
 API\_SERVICE\_INPUT\_VAR to provide an input parameter that is
 defined in the [API specification file](#create-spec) and corresponds
 with API\_SERVICE\_OPERATION\_ID. Use EXAMPLE\_INPUT to provide
 an example of an input value that corresponds with EXAMPLE\_QUERY.
- `responseParams`: The response parameters of the `extensionOperation` and
 example values in key-value format. Use API\_SERVICE\_OUTPUT\_VAR to
 provide an output parameter that is defined in the
 [API specification file](#create-spec) and corresponds with the API service.
 Use EXAMPLE\_OUTPUT to provide an example of an output value that
 corresponds with EXAMPLE\_INPUT.
- `responseSummary`: An example of a summary that the application might provide
 in response to the `query`. Use EXAMPLE\_SUMMARY to provide the
 summary text.

The following is an example of `toolUseExamples` for an API service that
says "hello" in the requested language:

```python
"toolUseExamples": [
 {
 "extensionOperation": {
 "operationId": "say_hello",
 },
 "displayName": "Say hello in the requested language",
 "query": "Say hello in French",
 "requestParams": {
 "fields": [
 {
 "key": "apiServicePrompt",
 "value": {
 "string_value": "French",
 }
 }
 ]
 },
 "responseParams": {
 "fields": [
 {
 "key": "apiServiceOutput",
 "value": {
 "string_value": "bonjour",
 },
 }
 ],
 },
 "responseSummary": "Bonjour"
 }
],

```

### Specify an authentication configuration

You must specify an authentication configuration when you
[define an extension import request](#define-import-request).

If your extension does not require authentication, set the `authType` variable
to `NO_AUTH`:

```python
"authConfig": {
 "authType": "NO_AUTH"
}

```

If your extension requires authentication, then you must set the authentication
type in the `authType` variable and supply an authentication configuration. You
can choose between following authentication methods:

- [HTTP API key authentication](#authentication-api-key)
- [HTTP basic authentication](#authentication-basic)
- [OAuth authentication](#authentication-oauth)
- [OIDC authentication](#authentication-oidc)

#### API key authentication

To support API key authentication, Vertex AI integrates with
[SecretManager](https://cloud.google.com/secret-manager) for secret storage and
access. The Vertex AI Extensions platform does not store the secret data directly.
You have the responsibility to manage the lifecycle of your `SecretManager` resource.

Specify `authConfig` as follows:

```python
"authConfig": {
 "authType": "API_KEY_AUTH",
 "apiKeyConfig": {
 "name": "API_KEY_CONFIG_NAME",
 "apiKeySecret": "API_KEY_SECRET",
 "httpElementLocation": "HTTP_ELEMENT_LOCATION",
 },
}

```

- API\_KEY\_CONFIG\_NAME: The name of the API key. For example,
 in the API request `https://example.com/act?api_key=<API KEY>`,
 API\_KEY\_CONFIG\_NAME corresponds with `api_key`.
- API\_KEY\_SECRET: `SecretManager` secret version resource that stores
 the key. This parameter has the following format:
 `projects/PROJECT_ID/secrets/SECRET_ID/versions/VERSION`.
- HTTP\_ELEMENT\_LOCATION: The location of the API key in the HTTP
 request. Possible values are:

 - `HTTP_IN_QUERY`
 - `HTTP_IN_HEADER`
 - `HTTP_IN_PATH`
 - `HTTP_IN_BODY`
 - `HTTP_IN_COOKIE`

 To learn more, see [Describing parameters](https://swagger.io/docs/specification/describing-parameters/).

#### HTTP basic authentication

To support HTTP basic authentication, Vertex AI integrates with
[SecretManager](https://cloud.google.com/secret-manager) for secret storage and
access. The Vertex AI Extensions platform does not store the secret data directly.
You must manage the lifecycle of your `SecretManager` resource on your own.

Specify `authConfig` as follows:

```python
"authConfig": {
 "authType": "HTTP_BASIC_AUTH",
 "httpBasicAuthConfig": {
 "credentialSecret": "CREDENTIAL_SECRET"
 },
}

```

- CREDENTIAL\_SECRET: `SecretManager` secret version resource that
 stores the base64-encoded credential. This parameter has the following format:
 `projects/PROJECT_ID/secrets/SECRET_ID/versions/VERSION`.

#### OAuth authentication

Vertex AI supports two methods of OAuth authentication: access token
and service account.

### Access token

Specify `authConfig` as follows:

```python
"authConfig": {
 "authType": "OAUTH",
 "oauthConfig": {}
}

```

Leave the `oauthConfig` field blank when you import the extension. If you
choose to run a registered extension, you must provide an access token in the
`oauthConfig` field of the execution request. To learn more, see
[Run the extension](#run-extension).

### Service account

Specify `authConfig` as follows:

```python
"authConfig": {
 "authType": "OAUTH",
 "oauthConfig": {"service_account": "SERVICE_ACCOUNT_NAME"}
}

```

- SERVICE\_ACCOUNT\_NAME: Vertex AI uses this service account
 to generate access tokens.

Perform the following steps to allow `Vertex AI Extension Service Agent` to
get access tokens from SERVICE\_ACCOUNT\_NAME.

1. Go to the **IAM** page.

 [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
2. Select the **Service Accounts** tab.
3. Click your service account. The value of `SERVICE_ACCOUNT_NAME`
 in `authConfig` must correspond with the name of your service account.
4. Click the **Permissions** tab.
5. Click **Grant Access**.
6. In the **Add principals** section, in the **New principals** field, enter
 `service-PROJECT_NUMBER@gcp-sa-vertex-ex.iam.gserviceaccount.com`.
 This principal corresponds with the `Vertex AI Extension Service Agent` service account.
7. In the **Assign roles** section, find and select the
 `Service Account Token Creator` role. This role includes the
 `iam.serviceAccounts.getAccessToken` permission.
8. Click the **Save** button.

#### OIDC authentication

Vertex AI supports two methods of OIDC authentication: ID token
and service account.

### ID token

Specify `authConfig` as follows:

```python
"authConfig": {
 "authType": "OIDC_AUTH",
 "oidcConfig": {}
}

```

Leave the `oidcConfig` field blank when you import the extension. If you
choose to run a registered extension, you must provide an ID token in the
`oidcConfig` field of the execution request. To learn more, see
[Run the extension](#run-extension).

### Service account

Specify `authConfig` as follows:

```python
"authConfig": {
 "authType": "OIDC_AUTH",
 "oidcConfig": {"service_account": "SERVICE_ACCOUNT_NAME"}
}

```

- SERVICE\_ACCOUNT\_NAME: Vertex AI uses this service account
 to generate OpenID Connect (OIDC) tokens. Vertex AI
 sets the audience for the token to API\_SERVICE\_URL, as
 defined in the [API specification file](#create-spec).

Perform the following steps to allow `Vertex AI Extension Service Agent` to
get access tokens from SERVICE\_ACCOUNT\_NAME.

1. Go to the **IAM** page.

 [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
2. Select the **Service Accounts** tab.
3. Click your service account. The value of `SERVICE_ACCOUNT_NAME`
 in `authConfig` must correspond with the name of your service account.
4. Click the **Permissions** tab.
5. Click **Grant Access**.
6. In the **Add principals** section, in the **New principals** field, enter
 `service-PROJECT_NUMBER@gcp-sa-vertex-ex.iam.gserviceaccount.com`.
 This principal corresponds with the `Vertex AI Extension Service Agent` service account.
7. In the **Assign roles** section, find and select the
 `Service Account Token Creator` role. This role includes the
 `iam.serviceAccounts.getOpenIdToken` permission.
8. Click the **Save** button.

### Import the extension with Vertex AI

After defining an [extension import request](#define-import-request), you can
import the extension with Vertex AI.

1. Set the following shell variables:

 ```python
 ENDPOINT="LOCATION-aiplatform.googleapis.com"
 URL="https://${ENDPOINT}/v1beta1/projects/PROJECT_ID/locations/LOCATION"

 ```

 - PROJECT\_ID: Your project.
 - LOCATION: A region of your choice. If you are not sure,
 choose `us-central1`.
2. Run the following `curl` command to submit the import request:

 ```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json; charset=utf-8" \
 -d @IMPORT_REQUEST.json "${URL}/extensions:import"

 ```

 - IMPORT\_REQUEST: The name of the JSON file that
 contains the [extension import request](#define-import-request).

 The response has the following format:

 ```python
 {
 "name": "projects/[PROJECT_NUMBER]/locations/[LOCATION]/extensions/[EXTENSION_ID]/operations/[IMPORT_OPERATION_ID]",
 "metadata": {
 "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.ImportExtensionOperationMetadata",
 "genericMetadata": {
 "createTime": "[CREATE_TIME]",
 "updateTime": "[UPDATE_TIME]"
 }
 }
 }

 ```
3. Set shell variables based on the output of the import request:

 ```python
 EXTENSION_ID=EXTENSION_ID
 IMPORT_OPERATION_ID=IMPORT_OPERATION_ID

 ```
4. To check the status of your import, run the following `curl` command:

 ```python
 curl -X GET \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json; charset=utf-8" \
 "${URL}/operations/${IMPORT_OPERATION_ID}"

 ```

## Manage extensions

To list all registered extensions, run the following `curl` command:

```python
curl -X GET \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json; charset=utf-8" \
"${URL}/extensions"

```

To get an extension, run the following `curl` command:

```python
curl -X GET \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json; charset=utf-8" \
"${URL}/extensions/${EXTENSION_ID}"

```

You can update the extension's `displayName`, `description` or
`toolUseExamples`. If you specify `toolUseExamples` when you update an
extension, then the update replaces the examples. For example, if you have
examples `a` and `b`, then update the extension with example `c`, then the
updated extension contains only example `c`.To update an extension description,
run the following `curl` command:

```python
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
${URL}/extensions/${EXTENSION_ID}?update_mask="description" \
-d '{
 "description": "A nice tool.",
}'

```

To delete an extension, run the following `curl` command:

```python
curl \
 -X DELETE \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
${URL}/extensions/${EXTENSION_ID}

```

## Run an extension

There are two ways to run an extension:

- [`execute`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions/execute): This
 mode focuses solely on API execution. The extension triggers the specified
 API operation and returns the raw results without any further processing.
- [`query`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.extensions/query): This mode
 is designed for intelligent interactions. It involves multiple steps:

 - **Model request**: The query and the extension's schema are provided to
 Gemini as a prompt and
 [`FunctionDeclaration`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/FunctionDeclaration)
 respectively.
 - **API execution**: If the model determines that tool use is required, the
 extension automatically calls the API operation on behalf of the model, and retrieves the results.
 - **Model integration**: The API results are fed into the model, which
 processes them to generate the final, contextually relevant response. In
 essence, `query` acts as a single-tool agent, using the API to achieve its goals.

This section describes how to `execute` an extension.

If your extension uses OAuth authentication and an access token, see
[Run an extension with OAuth authentication and an access token](#execute-oauth-token).

If your extension uses OIDC authentication and an ID token, see
[Run an extension with OIDC authentication and an ID token](#execute-oidc-token).

Otherwise, you can run it using the following steps:

1. Create a file named `execute-extension.json` with the following contents:

 ```python
 {
 "operation_id": "API_SERVICE_OPERATION_ID",
 "operation_params": {
 "API_SERVICE_INPUT_VAR": "API_SERVICE_INPUT_VALUE"
 }
 }

 ```

 - API\_SERVICE\_OPERATION\_ID: The ID of the API service operation
 you want to run. API service operations are defined in the
 [API specification file](#create-spec).
 - API\_SERVICE\_INPUT\_VAR: An input variable that corresponds with
 API\_SERVICE\_OPERATION\_ID and is defined in the
 [API specification file](#create-spec).
 - API\_SERVICE\_INPUT\_VALUE: An input value for the extension.
2. Run the following `curl` command:

 ```python
 curl \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json; charset=utf-8" -d @execute-extension.json \
 "${URL}/extensions/${EXTENSION_ID}:execute"

 ```

 The response has the following format:

 ```python
 {
 "output": {
 "content": "{\"API_SERVICE_OUTPUT_VAR\": \"API_SERVICE_OUTPUT_VALUE\"}"
 }
 }

 ```

 - API\_SERVICE\_OUTPUT\_VAR: An output parameter that is defined in
 the [API specification file](#create-spec) and corresponds with the API
 service.
 - API\_SERVICE\_OUTPUT\_VALUE: A string value that is a serialization
 of the response object. If your API specification file defines a
 JSON response schema, you must parse this output string into JSON on
 your own.

### Run an extension with OAuth authentication and an access token

If your extension uses OAuth authentication and an access token, you can run
it using the following steps:

1. Create a file named `execute-extension.json` with the following contents:

 ```python
 {
 "operation_id": "API_SERVICE_OPERATION_ID",
 "operation_params": {...},
 "runtime_auth_config": {
 "authType": "OAUTH",
 "oauth_config": {"access_token": "'$(gcloud auth print-access-token)'"}
 }
 }

 ```

 - API\_SERVICE\_OPERATION\_ID: The ID of the API service operation
 you want to run. API service operations are defined in the
 [API specification file](#create-spec).
2. Run the following `curl` command:

 ```python
 curl \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json; charset=utf-8" -d @execute-extension.json \
 "${URL}/extensions/${EXTENSION_ID}:execute"

 ```

### Run an extension with OIDC authentication and an ID token

If your extension uses OIDC authentication and an ID token, you can run
it using the following steps:

1. Create a file named `execute-extension.json` with the following contents:

 ```python
 {
 "operation_id": "API_SERVICE_OPERATION_ID",
 "operation_params": {...},
 "runtime_auth_config": {
 "authType": "OIDC_AUTH",
 "oidc_config": {"id_token": "$(gcloud auth print-identity-token)"}
 }
 }

 ```

 - API\_SERVICE\_OPERATION\_ID: The ID of the API service operation
 you want to run. API service operations are defined in the
 [API specification file](#create-spec).
2. Run the following `curl` command:

 ```python
 curl \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json; charset=utf-8" -d @execute-extension.json \
 "${URL}/extensions/${EXTENSION_ID}:execute"

 ```

## What's next

- [Build and deploy your LLM orchestration framework](https://cloud.google.com/vertex-ai/generative-ai/docs/reasoning-engine/overview).