---
date_scraped: 2025-05-12
title: Manage Deployed Agents
---

# Manage deployed agents 

This page describes how to manage agents that have been deploy to the Vertex AI Agent Engine
managed runtime. Deployed agents are resources of type [`reasoningEngine`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines) in Vertex AI.

## List deployed agents

List all deployed agents for a given project and location:

### Vertex AI SDK for Python

```python
from vertexai import agent_engines

agent_engines.list()

```

To filter the list of by `display_name`:

```python
from vertexai import agent_engines

agent_engines.list(filter='display_name="Demo Langchain Agent"')

```

### REST

Call the [`reasoningEngines.list`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines/list) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your GCP project ID
- `LOCATION`: a supported region

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines"
```

#### PowerShell (Windows)

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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## Get a deployed agent

Each deployed agent has a unique `RESOURCE_ID` identifier.
To learn more, see [Deploy an agent](deploy.md).

### Vertex AI SDK for Python

The following code lets you get a specific deployed agent:

```python
from vertexai import agent_engines

remote_agent = agent_engines.get("RESOURCE_ID")

```

Alternately, you can provide the fully qualified resource name:

```python
from vertexai import agent_engines

remote_agent = agent_engines.get(
"projects/PROJECT_ID_OR_NUMBER/locations/LOCATION/reasoningEngines/RESOURCE_ID"
)

```

### REST

Call the [`reasoningEngines.get`](../reference/rest/v1/projectslocationsreasoningEngines/get.md) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your GCP project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID"
```

#### PowerShell (Windows)

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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## Update a deployed agent

You can update one or more fields of the deployed agent at the same time,
but you have to specify at least one of the fields to be updated. The amount
of time it takes to update the deployed agent depends on the update being
performed, but it generally takes between a few seconds to a few minutes.

### Vertex AI SDK for Python

To update a deployed agent (corresponding to `RESOURCE_NAME`)
to an updated agent (corresponding to `UPDATED_AGENT`):

```python
from vertexai import agent_engines

agent_engines.update(
 resource_name=RESOURCE_NAME, # Required.
 agent_engine=UPDATED_AGENT, # Optional.
 requirements=REQUIREMENTS, # Optional.
 display_name="DISPLAY_NAME", # Optional.
 description="DESCRIPTION", # Optional.
 extra_packages=EXTRA_PACKAGES, # Optional.
)

```

The arguments are the same as when you are [deploying an agent](deploy.md).
You can find details in the [API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.preview.reasoning_engines.ReasoningEngine#vertexai_preview_reasoning_engines_ReasoningEngine_create).

### REST

Call the [`reasoningEngines.patch`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines/patch) method and provide an `update_mask` to specify which fields to update.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your GCP project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `update_mask`: a list of comma-separated fields to update

HTTP method and URL:

```python
PATCH https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask="display_name,description"
```

Request JSON body:

```python
{
"displayName": "DISPLAY_NAME",
"description": "DESCRIPTION"
}

```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

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
curl -X PATCH \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask="display_name,description""
```

#### PowerShell (Windows)

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
 -Method PATCH ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask="display_name,description"" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## Delete a deployed agent

### Vertex AI SDK for Python

If you already have [an existing instance of the deployed agent](#get)
(as `remote_agent`), you can run the following command:

```python
remote_agent.delete()

```

Alternatively, you can call `agent_engines.delete()` to delete the deployed
agent corresponding to `RESOURCE_NAME` in the following way:

```python
from vertexai import agent_engines

agent_engines.delete(RESOURCE_NAME)

```

### REST

Call the [`reasoningEngines.delete`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines/delete) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your GCP project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent

HTTP method and URL:

```python
DELETE https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

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
 "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID"
```

#### PowerShell (Windows)

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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## What's next

- [Use an agent](use.md).
- [Troubleshoot managing deployed agents](troubleshooting/manage.md).