---
date_scraped: 2025-05-12
title: Manage Sessions Using Direct Api Calls
---

# Manage sessions using direct API calls 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This section describes how to use Vertex AI Agent Engine Sessions to manage sessions using direct API calls. You can make direct API calls if you don't want to use an ADK agent to manage sessions.

To manage sessions using the ADK agent, see [Manage sessions with Agent Development Kit](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/sessions/manage-sessions-adk).

## Create a Vertex AI Agent Engine instance

To access Vertex AI Agent Engine Sessions, you need use an Vertex AI Agent Engine instance. You don't need to deploy any code to start using Sessions. Without code deployment, creating a Vertex AI Agent Engine instance only takes a few seconds.

If you don't have an existing Vertex AI Agent Engine instance, create one using the following code:

```python
import vertexai
from vertexai import agent_engines

# Create an agent engine instance
agent_engine = agent_engines.create()

```

## List sessions

List all sessions associated with your Vertex AI Agent Engine instance.

### REST API

Use the `sessions.list` method:

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you created your
 Agent Engine instance. The only region supported is `us-central1`.
- AGENT\_ENGINE\_ID:
 The resource ID of your Agent Engine instance.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions
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

Execute the following command:

```python
curl -X GET \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions"
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

Execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method GET ` 
 -Headers $headers ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions" | Select-Object -Expand Content
```

You should see a list of sessions returned.

## Create a session

Create a session associated with a user ID.

### REST API

Use the `sessions.create` method.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you created your
 Agent Engine instance. The only region supported is `us-central1`.
- AGENT\_ENGINE\_ID:
 The resource ID of your Agent Engine instance.
- USER\_ID: a user ID

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions
```

Request JSON body:

```python
{
 "userId": USER_ID
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions" | Select-Object -Expand Content
```

You should receive a long-running operation that you can query to check the creation status of your session.

## Get a session

Get a specific session associated with your Vertex AI Agent Engine instance.

### REST API

Use the `sessions.get` method.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you created your
 Agent Engine instance. The only region supported is `us-central1`.
- AGENT\_ENGINE\_ID:
 The resource ID of your Agent Engine instance.
- SESSION\_ID: The resource ID of the session you want to retrieve.
 You can get the session ID from the response you received when you created the session.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID
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

Execute the following command:

```python
curl -X GET \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID"
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

Execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method GET ` 
 -Headers $headers ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID" | Select-Object -Expand Content
```

In the response, you should see information about your session.

## Delete a session

Delete a session associated with your Vertex AI Agent Engine instance.

### REST API

Use the `sessions.delete` method.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you want to create the Example
 Store instance. The only region supported is `us-central1`.
- AGENT\_ENGINE\_ID:
 The resource ID of your Agent Engine instance.
- SESSION\_ID: The resource ID of the session you want to retrieve.

HTTP method and URL:

```python
DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/sessions/SESSION_ID
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

Execute the following command:

```python
curl -X DELETE \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/sessions/SESSION_ID"
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

Execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method DELETE ` 
 -Headers $headers ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/sessions/SESSION_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## List events in a session

List events in a session associated with your Vertex AI Agent Engine instance.

### REST API

Use the `events.list` method.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you created your
 Agent Engine instance. The only region supported is `us-central1`.
- AGENT\_ENGINE\_ID:
 The resource ID of your Agent Engine instance.
- SESSION\_ID: The resource ID of the session you want to retrieve.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID/events
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

Execute the following command:

```python
curl -X GET \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID/events"
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

Execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method GET ` 
 -Headers $headers ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID/events" | Select-Object -Expand Content
```

In the response, you should see a list of events associated with your session.

## Append an event to a session

Append an event to a session associated with an Vertex AI Agent Engine instance.

### REST API

Use the `sessions.appendEvent` method.

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your project ID.
- LOCATION: The region where you created your
 Agent Engine instance. The only region supported is `us-central1`.
- AGENT\_ENGINE\_ID:
 The resource ID of your Agent Engine instance.
- SESSION\_ID: The resource ID of the session you want to append events to.
- AUTHOR: The author of the event. This can be `'user'`, or an agent name.
- INVOCATION\_ID: An identifier of an [invocation](https://google.github.io/adk-docs/context/).
- TIMESTAMP: The timestamp of the event.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID
```

Request JSON body:

```python
{
 "author": AUTHOR,
 "invocationId": INVOCATION_ID,
 "timestamp": TIMESTAMP,
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.