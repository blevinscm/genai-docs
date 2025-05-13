---
title: Use an agent
source: https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use
date_scraped: 2025-05-12
---

# Use an agent 

The code for querying an agent is the same regardless of whether it is running
[locally](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop) or
[deployed](deploy.md) remotely. Therefore, in this
page, the term `agent` refers to either `local_agent` or `remote_agent`
interchangeably. As the set of supported operations varies across frameworks, we
provide usage instructions for framework-specific templates:

| Framework | Description |
| --- | --- |
| [Agent Development Kit](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/adk) (preview) | Designed based on Google's internal best practices for developers building AI applications or teams needing to rapidly prototype and deploy robust agent-based solutions. |
| [LangChain](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/langchain) | Easier to use for basic use cases because of its predefined configurations and abstractions. |
| [LangGraph](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/langgraph) | Graph-based approach to defining workflows, with advanced human-in-the-loop and rewind/replay capabilities. |
| [AG2 (formerly AutoGen)](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/ag2) | AG2 provides multi-agent conversation framework as a high-level abstraction for building LLM workflows. |
| [LlamaIndex](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/llama-index/query-pipeline) (preview) | LlamaIndex's query pipeline offers a high-level interface for creating Retrieval-Augmented Generation (RAG) workflows. |

For [custom agents](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/custom) that are not
based on one of the framework-specific templates, you can follow these steps:

1. [User authentication](#user-authentication).
2. [Get an agent instance](#get-agent-instance).
3. [Look up supported operations](#supported-operations).
4. [Query the agent](#query-agent).
5. (If applicable) [Stream responses from the agent](#stream-responses).

**Note:** The steps apply to all deployed agents, including agents developed using
the framework-specific templates.

## Step 1: User authentication

Follows the same instructions as [setting up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#authentication).

## Step 2: Get an instance of an agent

To query an agent, you first need an instance of an agent. You can either
[create a new instance](deploy.md) or
[get an existing instance](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage#get) of an
agent.

To get the agent corresponding to a specific resource ID:

### Vertex AI SDK for Python

Run the following code:

```python
from vertexai import agent_engines

agent = agent_engines.get(RESOURCE_ID)

```

Alternatively, you can provide the full resource name of the agent:

```python
agent = agent_engines.get("projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID")

```

### requests

Run the following code:

```python
from google import auth as google_auth
from google.auth.transport import requests as google_requests
import requests

def get_identity_token():
 credentials, _ = google_auth.default()
 auth_request = google_requests.Request()
 credentials.refresh(auth_request)
 return credentials.token

response = requests.get(
f"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID",
 headers={
 "Content-Type": "application/json; charset=utf-8",
 "Authorization": f"Bearer {get_identity_token()}",
 },
)

```

### REST

```python
curl \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID
```

The rest of this section assumes that you have an instance, named as `agent`.

## Step 3: Supported operations

When developing the agent locally, you have access and knowledge of the
operations that it supports. To use a [deployed agent](deploy.md), you can enumerate the operations that it supports:

### Vertex AI SDK for Python

Run the following code:

```python
agent.operation_schemas()

```

### requests

Run the following code:

```python
import json

json.loads(response.content).get("spec").get("classMethods")

```

### REST

Represented in `spec.class_methods` from the response to the curl request.

The schema for each operation is a dictionary that documents the information of
a method for the agent that you can call. The following is an example of the
operation schema for a synchronous operation:

The following command provides a list of schemas in
[JSON format](https://www.json.org/) that correspond to the operations of the
`remote_app` object:

```python
agent.operation_schemas()

```

As an example, the following is the schema for the `query` operation of a
`LangchainAgent`:

```python
{'api_mode': '',
 'name': 'query',
 'description': """Queries the Agent with the given input and config.
 Args:
 input (Union[str, Mapping[str, Any]]):
 Required. The input to be passed to the Agent.
 config (langchain_core.runnables.RunnableConfig):
 Optional. The config (if any) to be used for invoking the Agent.
 Returns:
 The output of querying the Agent with the given input and config.
""", ' ',
 'parameters': {'$defs': {'RunnableConfig': {'description': 'Configuration for a Runnable.',
 'properties': {'configurable': {...},
 'run_id': {...},
 'run_name': {...},
 ...},
 'type': 'object'}},
 'properties': {'config': {'nullable': True},
 'input': {'anyOf': [{'type': 'string'}, {'type': 'object'}]}},
 'required': ['input'],
 'type': 'object'}}

```

where

- `name` is the name of the operation (i.e. `agent.query` for an operation named `query`).
- `api_mode` is the API mode of the operation (`""` for synchronous, `"stream"` for streaming).
- `description` is a description of the operation based on the method's docstring.
- `parameters` is the schema of the input arguments in OpenAPI schema format.

## Step 4: Query the agent

To query the agent using one of its supported operations (e.g. `query`):

### Vertex AI SDK for Python

```python
agent.query(input={"messages": [
 ("user", "What is the exchange rate from US dollars to Swedish currency?")
]})

```

### requests

```python
from google import auth as google_auth
from google.auth.transport import requests as google_requests
import requests

def get_identity_token():
 credentials, _ = google_auth.default()
 auth_request = google_requests.Request()
 credentials.refresh(auth_request)
 return credentials.token

requests.post(
 f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{LOCATION}/reasoningEngines/{RESOURCE_ID}:query",
 headers={
 "Content-Type": "application/json; charset=utf-8",
 "Authorization": f"Bearer {get_identity_token()}",
 },
 data=json.dumps({
 "class_method": "query",
 "input": {
 "input": {"messages": [
 ("user", "What is the exchange rate from US dollars to Swedish currency?")
 ]},
 }})
)

```

### REST

```python
curl \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query -d '{
 "input": {
 "class_method": "query",
 "input": {"messages": [
 ("user", "What is the exchange rate from US dollars to Swedish currency?")
 ]},
 }
}'
```

The query response is a string that is similar to the output of a [local application test](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop#test):

```python
{"input": "What is the exchange rate from US dollars to Swedish currency?",
 # ...
 "output": "For 1 US dollar you will get 10.7345 Swedish Krona."}

```

## Step 5: Stream responses from the agent

If applicable, you can stream a response from the agent using one of its operations (e.g. `stream_query`):

### Vertex AI SDK for Python

```python
agent = agent_engines.get("projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID")

agent.stream_query(input={"messages": [
 ("user", "What is the exchange rate from US dollars to Swedish currency?")
]})

```

### requests

```python
from google import auth as google_auth
from google.auth.transport import requests as google_requests
import requests

def get_identity_token():
 credentials, _ = google_auth.default()
 auth_request = google_requests.Request()
 credentials.refresh(auth_request)
 return credentials.token

requests.post(
 f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{LOCATION}/reasoningEngines/{RESOURCE_ID}:streamQuery",
 headers={
 "Content-Type": "application/json",
 "Authorization": f"Bearer {get_identity_token()}",
 },
 data=json.dumps({
 "class_method": "stream_query",
 "input": {
 "input": {"messages": [
 ("user", "What is the exchange rate from US dollars to Swedish currency?")
 ]},
 },
 }),
 stream=True,
)

```

### REST

```python
curl \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:streamQuery?alt=sse -d '{
 "class_method": "stream_query",
 "input": {
 "input": {"messages": [
 ("user", "What is the exchange rate from US dollars to Swedish currency?")
 ]},
 }
}'
```

Vertex AI Agent Engine streams responses as a sequence of iteratively generated
objects. For example, a set of three responses might look like the following:

```python
{'actions': [{'tool': 'get_exchange_rate', ...}]} # first response
{'steps': [{'action': {'tool': 'get_exchange_rate', ...}}]} # second response
{'output': 'The exchange rate is 11.0117 SEK per USD as of 2024-12-03.'} # final response

```

## What's next

- [Use a LangChain agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/langchain).
- [Use a LangGraph agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/langgraph).
- [Use an AG2 agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/ag2).
- [Use a LlamaIndex Query Pipeline agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/use/llama-index/query-pipeline).
- [Evaluate an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/evaluate).
- [Manage deployed agents](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).