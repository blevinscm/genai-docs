---
title: Develop and deploy agents on Vertex AI Agent Engine
source: https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/quickstart
date_scraped: 2025-05-12
---

# Develop and deploy agents on Vertex AI Agent Engine

This page demonstrates how to create and deploy an agent that returns the
exchange rate between two currencies on a specified date, using the following agent frameworks:

- [Agent Development Kit (ADK)](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-development-kit/quickstart) (preview)
- [LangGraph](https://langchain-ai.github.io/langgraph/tutorials/introduction/)
- [LangChain](https://python.langchain.com/docs/introduction/)
- [AG2](https://docs.ag2.ai/latest/docs/home/home/)
- [LlamaIndex Query Pipeline](https://docs.llamaindex.ai/en/stable/examples/pipeline/query_pipeline/) (preview)

## Before you begin

**Note:** To enable APIs, you need the `serviceusage.services.enable` permission. If you don't have this permission, ask your administrator to grant you
the Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) role.

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
- Enable the Vertex AI and Cloud Storage APIs.

 [Enable the APIs](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com,storage.googleapis.com)
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI and Cloud Storage APIs.

 [Enable the APIs](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com,storage.googleapis.com)

To get the permissions that
you need to use Vertex AI Agent Engine,
ask your administrator to grant you the
following IAM roles on your project:

- [Vertex AI User](https://cloud.google.com/iam/docs/understanding-roles#aiplatform.user) (`roles/aiplatform.user`)
- [Storage Admin](https://cloud.google.com/iam/docs/understanding-roles#storage.admin) (`roles/storage.admin`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://cloud.google.com/iam/docs/understanding-roles).

## Install and initialize the Vertex AI SDK for Python

1. Run the following command to install the [Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/python-sdk/use-vertex-ai-python-sdk) and other
 required packages:

 ### ADK

 **Preview**

 This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
 of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
 Pre-GA features are available "as is" and might have limited support.
 For more information, see the
 [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

 ```python
 pip install --upgrade --quiet google-cloud-aiplatform[agent_engines,adk]
 ```

 ### LangGraph

 ```python
 pip install --upgrade --quiet google-cloud-aiplatform[agent_engines,langchain]
 ```

 ### LangChain

 ```python
 pip install --upgrade --quiet google-cloud-aiplatform[agent_engines,langchain]
 ```

 ### AG2

 ```python
 pip install --upgrade --quiet google-cloud-aiplatform[agent_engines,ag2]
 ```

 ### LlamaIndex

 **Preview**

 This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
 of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
 Pre-GA features are available "as is" and might have limited support.
 For more information, see the
 [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

 ```python
 pip install --upgrade --quiet google-cloud-aiplatform[agent_engines,llama_index]
 ```
2. Authenticate as a user

 ### Colab

 Run the following code:

 ```python
 from google.colab import auth

 auth.authenticate_user(project_id="PROJECT_ID")

 ```

 ### Cloud Shell

 No action required.

 ### Local Shell

 Run the following command:

 ```python
 gcloud auth application-default login
 ```
3. Run the following code to import Vertex AI Agent Engine and initialize the SDK:

 ```python
 import vertexai
 from vertexai import agent_engines

 vertexai.init(
 project="PROJECT_ID", # Your project ID.
 location="LOCATION", # Your cloud region.
 staging_bucket="gs://BUCKET_NAME", # Your staging bucket.
 )

 ```

## Develop an agent

First, develop a tool:

```python
def get_exchange_rate(
 currency_from: str = "USD",
 currency_to: str = "EUR",
 currency_date: str = "latest",
):
 """Retrieves the exchange rate between two currencies on a specified date."""
 import requests

 response = requests.get(
 f"https://api.frankfurter.app/{currency_date}",
 params={"from": currency_from, "to": currency_to},
 )
 return response.json()

```

Next, instantiate an agent:

### ADK

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

```python
from google.adk.agents import Agent
from vertexai.preview.reasoning_engines import AdkApp

agent = Agent(
 model="gemini-2.0-flash",
 name='currency_exchange_agent',
 tools=[get_exchange_rate],
)

app = AdkApp(agent=agent)

```

### LangGraph

```python
from vertexai import agent_engines

agent = agent_engines.LanggraphAgent(
 model="gemini-2.0-flash",
 tools=[get_exchange_rate],
 model_kwargs={
 "temperature": 0.28,
 "max_output_tokens": 1000,
 "top_p": 0.95,
 },
)

```

### LangChain

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model="gemini-2.0-flash",
 tools=[get_exchange_rate],
 model_kwargs={
 "temperature": 0.28,
 "max_output_tokens": 1000,
 "top_p": 0.95,
 },
)

```

### AG2

```python
from vertexai import agent_engines

agent = agent_engines.AG2Agent(
 model="gemini-2.0-flash",
 runnable_name="Get Exchange Rate Agent",
 tools=[get_exchange_rate],
)

```

### LlamaIndex

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

```python
from vertexai.preview import reasoning_engines

def runnable_with_tools_builder(model, runnable_kwargs=None, **kwargs):
 from llama_index.core.query_pipeline import QueryPipeline
 from llama_index.core.tools import FunctionTool
 from llama_index.core.agent import ReActAgent

 llama_index_tools = []
 for tool in runnable_kwargs.get("tools"):
 llama_index_tools.append(FunctionTool.from_defaults(tool))
 agent = ReActAgent.from_tools(llama_index_tools, llm=model, verbose=True)
 return QueryPipeline(modules = {"agent": agent})

agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
 model="gemini-2.0-flash",
 runnable_kwargs={"tools": [get_exchange_rate]},
 runnable_builder=runnable_with_tools_builder,
)

```

Finally, test the agent locally:

### ADK

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

**Note:** Testing an ADK agent locally uses in-memory sessions.

```python
for event in app.stream_query(
 user_id="USER_ID",
 message="What is the exchange rate from US dollars to SEK today?",
):
 print(event)

```

where USER\_ID is a user-defined ID with a character limit of 128.

### LangGraph

```python
agent.query(input={"messages": [
 ("user", "What is the exchange rate from US dollars to SEK today?"),
]})

```

### LangChain

```python
agent.query(
 input="What is the exchange rate from US dollars to SEK today?"
)

```

### AG2

```python
agent.query(
 input="What is the exchange rate from US dollars to SEK today?"
)

```

### LlamaIndex

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

```python
agent.query(
 input="What is the exchange rate from US dollars to SEK today?"
)

```

## Deploy an agent

To deploy the agent:

### ADK

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

**Note:** Deploying an ADK agent to Vertex AI Agent Engine automatically generates a managed session resource. You can delete the managed session resource along with the agent in the [Clean-up section](#clean-up).

```python
from vertexai import agent_engines

remote_agent = agent_engines.create(
 app,
 requirements=["google-cloud-aiplatform[agent_engines,adk]"],
)

```

### LangGraph

```python
from vertexai import agent_engines

remote_agent = agent_engines.create(
 agent,
 requirements=["google-cloud-aiplatform[agent_engines,langchain]"],
)

```

### LangChain

```python
from vertexai import agent_engines

remote_agent = agent_engines.create(
 agent,
 requirements=["google-cloud-aiplatform[agent_engines,langchain]"],
)

```

### AG2

```python
from vertexai import agent_engines

remote_agent = agent_engines.create(
 agent,
 requirements=["google-cloud-aiplatform[agent_engines,ag2]"],
)

```

### LlamaIndex

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

```python
from vertexai import agent_engines

remote_agent = agent_engines.create(
 agent,
 requirements=["google-cloud-aiplatform[agent_engines,llama_index]"],
)

```

This creates a [`reasoningEngine`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines) resource in Vertex AI.

## Use an agent

Test the deployed agent by sending a query:

### ADK

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

```python
for event in remote_agent.stream_query(
 user_id="USER_ID",
 message="What is the exchange rate from US dollars to SEK today?",
):
 print(event)

```

### LangGraph

```python
remote_agent.query(input={"messages": [
 ("user", "What is the exchange rate from US dollars to SEK today?"),
]})

```

### LangChain

```python
remote_agent.query(
 input="What is the exchange rate from US dollars to SEK today?"
)

```

### AG2

```python
remote_agent.query(
 input="What is the exchange rate from US dollars to SEK today?"
)

```

### LlamaIndex

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

```python
remote_agent.query(
 input="What is the exchange rate from US dollars to SEK today?"
)

```

## Clean up

To avoid incurring charges to your Google Cloud account for
the resources used on this page, follow these steps.

```python
remote_agent.delete(force=True)

```

## What's next

- [Explore the notebooks](https://github.com/GoogleCloudPlatform/generative-ai/tree/main/gemini/agent-engine).
- [Set up the environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up).
- [Develop an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop).
- [Deploy an agent](deploy.md).
- [Use an agent](use.md).
- [Manage an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).