---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/reasoning-engine
title: Agent Engine Api
---

# Agent Engine API 

Agent Engine (formerly known as Reasoning Engine or LangChain on Vertex AI)
provides a managed runtime for your agents. You can create an agent
using orchestration frameworks such as LangChain, and deploy it with Agent
Engine. This service has all the security, privacy, observability, and
scalability benefits of Vertex AI integration.

For more conceptual information about Agent Engine, see [Agent Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview).

**Limitations**

- Agent Engine supports only Python orchestration frameworks.
- Agent Engine is supported only in the `us-central1` region.

**Note:** Because the name of Vertex AI Agent Engine changed over time, the
name of the resource is
[`ReasoningEngine`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines)
to maintain backwards compatibility.

## Example syntax

Syntax to create and register a reasoning engine resource.

### Python

```python
class SimpleAdditionApp:
 def query() -> str:
 """
 ...

 """

 return
...

reasoning_engine = reasoning_engines.ReasoningEngine.create(
 SimpleAdditionApp(),
 display_name="",
 description="",
 requirements=[...],
 extra_packages=[...],
)
```

## Parameter list

| Parameters | |
| --- | --- |
| `display_name` | Required: `string` The display name of the `ReasoningEngine`. |
| `description` | Optional: `string` The description of the `ReasoningEngine`. |
| `spec` | Required: `ReasoningEngineSpec` Configurations of the `ReasoningEngine`. |
| `package_spec` | Required: `PackageSpec` A user provided package specification, such as pickled objects and package requirements. |
| `class_methods` | Optional: `protobuf.Struct` Declarations for object class methods. |

#### PackageSpec

PackageSpec contains the reference to the Cloud Storage URI storing the
OpenAPI YAML file.

| Parameters | |
| --- | --- |
| `pickle_object_gcs_uri` | Optional: `string` The Cloud Storage URI of the pickled python object. |
| `dependency_files_gcs_uri` | Optional: `string` The Cloud Storage URI of the dependency files with the `tar.gz` extension. |
| `requirements_gcs_uri` | Optional: `string` The Cloud Storage URI of the `requirements.txt` file. |
| `python_version` | Optional: `string` The Python version. Supported versions include Python `3.8`, `3.9`, `3.10`, and `3.11`. If not specified, the default value is `3.10`. |

#### QueryReasoningEngine

| Parameters | |
| --- | --- |
| `input` | `protobuf.struct` The arguments inside `input` should be consistent with the `query` class method defined in the creation step. |

## Examples

### Deploy a basic app configuration

The following example uses an application that adds two integers and a remote
app with Reasoning Engine:

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import vertexai
from vertexai.preview import reasoning_engines

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# staging_bucket = "gs://YOUR_BUCKET_NAME"
vertexai.init(
 project=PROJECT_ID, location="us-central1", staging_bucket=staging_bucket
)

class SimpleAdditionApp:
 def query(self, a: int, b: int) -> str:
 """Query the application.
 Args:
 a: The first input number
 b: The second input number
 Returns:
 int: The additional result.
 """
 return f"{int(a)} + {int(b)} is {int(a + b)}"

# Locally test
app = SimpleAdditionApp()
app.query(a=1, b=2)

# Create a remote app with Reasoning Engine.
# This may take 1-2 minutes to finish.
reasoning_engine = reasoning_engines.ReasoningEngine.create(
 SimpleAdditionApp(),
 display_name="Demo Addition App",
 description="A simple demo addition app",
 requirements=["cloudpickle==3"],
 extra_packages=[],
)
# Example response:
# Using bucket YOUR_BUCKET_NAME
# Writing to gs://YOUR_BUCKET_NAME/reasoning_engine/reasoning_engine.pkl
# ...
# ReasoningEngine created. Resource name: projects/123456789/locations/us-central1/reasoningEngines/123456
# To use this ReasoningEngine in another session:
# reasoning_engine = vertexai.preview.reasoning_engines.ReasoningEngine('projects/123456789/locations/...

```

### Deploy an advanced app configuration

This is an advanced example that uses LangChain's chain, prompt templates, and
the Gemini API:

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python

from typing import List

import vertexai
from vertexai.preview import reasoning_engines

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# staging_bucket = "gs://YOUR_BUCKET_NAME"

vertexai.init(
 project=PROJECT_ID, location="us-central1", staging_bucket=staging_bucket
)

class LangchainApp:
 def __init__(self, project: str, location: str) -> None:
 self.project_id = project
 self.location = location

 def set_up(self) -> None:
 from langchain_core.prompts import ChatPromptTemplate
 from langchain_google_vertexai import ChatVertexAI

 system = (
 "You are a helpful assistant that answers questions "
 "about Google Cloud."
 )
 human = "{text}"
 prompt = ChatPromptTemplate.from_messages(
 [("system", system), ("human", human)]
 )
 chat = ChatVertexAI(project=self.project_id, location=self.location)
 self.chain = prompt | chat

 def query(self, question: str) -> Union[str, List[Union[str, Dict]]]:
 """Query the application.
 Args:
 question: The user prompt.
 Returns:
 str: The LLM response.
 """
 return self.chain.invoke({"text": question}).content

# Locally test
app = LangchainApp(project=PROJECT_ID, location="us-central1")
app.set_up()
print(app.query("What is Vertex AI?"))

# Create a remote app with Reasoning Engine
# Deployment of the app should take a few minutes to complete.
reasoning_engine = reasoning_engines.ReasoningEngine.create(
 LangchainApp(project=PROJECT_ID, location="us-central1"),
 requirements=[
 "google-cloud-aiplatform[langchain,reasoningengine]",
 "cloudpickle==3.0.0",
 "pydantic==2.7.4",
 ],
 display_name="Demo LangChain App",
 description="This is a simple LangChain app.",
 # sys_version="3.10", # Optional
 extra_packages=[],
)
# Example response:
# Model_name will become a required arg for VertexAIEmbeddings starting...
# ...
# Create ReasoningEngine backing LRO: projects/123456789/locations/us-central1/reasoningEngines/...
# ReasoningEngine created. Resource name: projects/123456789/locations/us-central1/reasoningEngines/...
# ...

```

### Query Reasoning Engine

Query a reasoning engine.

This example uses the `SimpleAdditionApp` class from the [Deploy a basic app configuration example](#deploy_a_basic_app_configuration).

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request. Must be `us-central1`.
- REASONING\_ENGINE\_ID: The ID of the reasoning engine.
- INPUT: `protobuf.struct:` The arguments inside `input` should match the arguments inside of the `def query(self, question: str)` method defined during the [Deploy a basic app configuration.](reasoning-engine.md)

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID:query
```

Request JSON body:

```python
{
 "input": {
 INPUT
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID:query"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID:query" | Select-Object -Expand Content
```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import vertexai
from vertexai.preview import reasoning_engines

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# reasoning_engine_id = "1234567890123456"
vertexai.init(project=PROJECT_ID, location="us-central1")
reasoning_engine = reasoning_engines.ReasoningEngine(reasoning_engine_id)

# Replace with kwargs for `.query()` method.
response = reasoning_engine.query(a=1, b=2)
print(response)
# Example response:
# 1 + 2 is 3

```

### List Reasoning Engines

List reasoning engines in a project.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request. Must be `us-central1`.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines" | Select-Object -Expand Content
```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import vertexai
from vertexai.preview import reasoning_engines

# TODO(developer): Update and un-comment below line
# PROJECT_ID = "your-project-id"
vertexai.init(project=PROJECT_ID, location="us-central1")

reasoning_engine_list = reasoning_engines.ReasoningEngine.list()
print(reasoning_engine_list)
# Example response:
# [<vertexai.reasoning_engines._reasoning_engines.ReasoningEngine object at 0x71a0e5cb99c0>
# resource name: projects/123456789/locations/us-central1/reasoningEngines/111111111111111111,
# <vertexai.reasoning_engines._reasoning_engines.ReasoningEngine object at 0x71a0e5cbac80>
# resource name: projects/123456789/locations/us-central1/reasoningEngines/222222222222222222]

```

### Get Reasoning Engine

Get details of a reasoning engine.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request. Must be `us-central1`.
- REASONING\_ENGINE\_ID: The ID of the reasoning engine.

HTTP method and URL:

```python
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID" | Select-Object -Expand Content
```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import vertexai
from vertexai.preview import reasoning_engines

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# reasoning_engine_id = "1234567890123456"
vertexai.init(project=PROJECT_ID, location="us-central1")

reasoning_engine = reasoning_engines.ReasoningEngine(reasoning_engine_id)
print(reasoning_engine)
# Example response:
# <vertexai.reasoning_engines._reasoning_engines.ReasoningEngine object at 0x757999a63c40>
# resource name: projects/[PROJECT_ID]/locations/us-central1/reasoningEngines/1234567890123456

```

### Delete Reasoning Engine

Delete a reasoning engine.

### REST

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- LOCATION: The region to process the request. Must be `us-central1`.
- REASONING\_ENGINE\_ID: The ID of the reasoning engine.

HTTP method and URL:

```python
DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID
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
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID"
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
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID" | Select-Object -Expand Content
```

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
import vertexai
from vertexai.preview import reasoning_engines

# TODO(developer): Update and un-comment below lines
# PROJECT_ID = "your-project-id"
# reasoning_engine_id = "1234567890123456"
vertexai.init(project=PROJECT_ID, location="us-central1")

reasoning_engine = reasoning_engines.ReasoningEngine(reasoning_engine_id)
reasoning_engine.delete()
# Example response:
# Deleting ReasoningEngine:projects/[PROJECT_ID]/locations/us-central1/reasoningEngines/1234567890123456
# ...
# ... resource projects/[PROJECT_ID]/locations/us-central1/reasoningEngines/1234567890123456 deleted.

```

## What's next

- Learn more about using [Vertex AI client libraries](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/libraries).