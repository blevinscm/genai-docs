---
title: Manage-sessions-with-Agent-Development-Kitgoogle.com/vertex-ai/generative-ai/docs/agent-engine/sessions/manage-sessions-adk
date_scraped: 2025-05-12
---

# Manage sessions with Agent Development Kit 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This page describes how you can connect an Agent Development Kit (ADK) agent with Vertex AI Agent Engine Sessions and use managed sessions in the local and production environment.

**Note:** If you've already followed the instructions in [Develop an Agent Development Kit agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/adk), you don't need to follow this guide, since the `AdkApp` template is already connected to Vertex AI Agent Engine Sessions through `session_service`.

## Before you begin

Make sure your environment is set up by following
the [Get the required roles](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#get_the_required_roles) and [Authentication](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#authentication) steps in [Set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up).

## Create a Vertex AI Agent Engine instance

To access Vertex AI Agent Engine Sessions, you first need to create an Vertex AI Agent Engine instance. You don't need to deploy any code to start using Sessions. Without code deployment, creating an Vertex AI Agent Engine instance only takes a few seconds.

```python
import vertexai
from vertexai import agent_engines

# Create an agent engine instance
agent_engine = agent_engines.create()

```

## Develop your ADK agent

To create your ADK agent, follow the instructions in [Agent Development Kit](https://google.github.io/adk-docs/), or use the following code to create an agent that greets a user with fixed greetings:

```python
from google import adk

def greetings(query: str):
 """Tool to greet user."""
 if 'hello' in query.lower():
 return {"greeting": "Hello, world"}
 else:
 return {"greeting": "Goodbye, world"}

# Define an ADK agent
root_agent = adk.Agent(
 model="gemini-2.0-flash",
 name='my_agent',
 instruction="You are an Agent that greet users, always use greetings tool to respond.",
 tools=[greetings]
)

```

## Set up the ADK runner

The [ADK Runtime](https://google.github.io/adk-docs/runtime/) orchestrates the execution of your agents, tools, and callbacks, and orchestrates calls to read and write sessions. Initialize the Runner with [`VertexAiSessionService`](https://google.github.io/adk-docs/sessions/session/#sessionservice-implementations), which connects with Vertex AI Agent Engine Sessions.

```python
from google.adk.sessions import VertexAiSessionService

app_name="AGENT_ENGINE_ID"
user_id="USER_ID"

# Create the ADK runner with VertexAiSessionService
session_service = VertexAiSessionService(
 "PROJECT_ID", "LOCATION")
runner = adk.Runner(
 agent=root_agent,
 app_name=app_name,
 session_service=session_service)

# Helper method to send query to the runner
def call_agent(query, session_id, user_id):
 content = types.Content(role='user', parts=[types.Part(text=query)])
 events = runner.run(
 user_id=user_id, session_id=session_id, new_message=content)

 for event in events:
 if event.is_final_response():
 final_response = event.content.parts[0].text
 print("Agent Response: ", final_response)

```

Replace the following:

- PROJECT\_ID: Your project ID.
- LOCATION: Your region. Only `us-central1` is supported for Vertex AI Agent Engine Sessions.
- AGENT\_ENGINE\_ID: The resource ID of a Vertex AI Agent Engine instance.

 - For deployed agents, the resource ID is listed as the `GOOGLE_CLOUD_AGENT_ENGINE_ID` environment variable
 - For local agents, you can retrieve the resource ID using `agent_engine.name.split("/")[-1]`.
- USER\_ID: A non-empty unique identifier for the user, with a maximum length of 128 characters.

## Interact with your agent

After defining your agent and setting up Vertex AI Agent Engine Sessions, you can interact with your agent to check that the session history and states persist.

### ADK UI

Test your agent with the ADK user interface and connect to Vertex AI Agent Engine Session using the `session_db_url` command line option:

```python
agent_engine_id="AGENT_ENGINE_ID"

adk web --session_db_url=agentengine://${agent_engine_id}

# Sample output
+-----------------------------------------------------------------------------+
| ADK Web Server started |
| |
| For local testing, access at http://localhost:8000. |
+-----------------------------------------------------------------------------+

INFO: Application startup complete.
INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)

```

### Python

Use ADK Python code to manage sessions and states.

### Create a session and query the agent

Use the following code to create a session and send a query to your agent:

```python
# Create a session
session = session_service.create_session(
 app_name=app_name,
 user_id=user_id)

call_agent("Hello!", session.id, user_id)
# Agent response: "Hello, world"

call_agent("Thanks!", session.id, user_id)
# Agent response: "Goodbye, world"

```

After the session is created and passed to the runner, ADK uses the session to store events from the current interaction. You can also resume a previous session by providing the ID for that session.

### List existing sessions

List all existing sessions associated with a given user ID.

```python
# List sessions
session_service.list_sessions(app_name=app_name,user_id=user_id)

# ListSessionsResponse(session_ids=['1122334455', '9988776655'])

```

### List events for a session

List all [events](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/sessions/overview#core_concepts) associated with a session.

```python
# List all the events of the session
for event in session_service.list_events(app_name=app_name, user_id=user_id, session_id=session.id):
 if event.is_final_response():
 print(event.content.parts[0].text)

# Expected output
# Hello!
# Hello, world
# Thanks!
# Goodbye, world

```

### Manage session states

States hold information that the agent needs for a conversation. You can provide an initial state as a dictionary when you create a session:

```python
# Create a session with state
session = session_service.create_session(
 app_name=app_name,
 user_id=user_id,
 state={'key': 'value'})

print(session.state['key'])
# value

```

To update the session state outside the runner, append a new event to the session using `state_delta`:

```python
from google.adk.events import Event, EventActions
import time

# Define state changes
state_changes = {'key': 'new_value'}

# Create event with actions
actions_with_update = EventActions(state_delta=state_changes)
system_event = Event(
 invocation_id="invocation_id",
 author="system", # Or 'agent', 'tool' etc.
 actions=actions_with_update,
 timestamp=time.time()
)

# Append the event
session_service.append_event(session, system_event)

# Check updated state
updated_session = session_service.get_session(
 app_name=app_name,
 user_id=user_id,
 session_id=session.id)
# State is updated to new value
print(updated_session.state['key'])
# new_value

```

### Delete a session

Delete a specific session associated with a user ID:

```python
session_service.delete_session(app_name=app_name, user_id=user_id, session_id=session.id)

```

## Deploy your agent to Vertex AI Agent Engine

After you test your agent locally, you can deploy the agent to production by updating the Vertex AI Agent Engine instance with parameters:

```python
agent_engines.update(resource_name=agent_engine.name, agent_engine=AGENT, requirements=REQUIREMENTS)

```

Replace the following:

- AGENT: The application that implements the `query / stream_query` method (for example, `AdkApp` for an ADK agent). For more information, see [Deployment considerations](../deploy.md).

## Clean up

To clean up all resources used in this project, you can delete the Vertex AI Agent Engine instance along with its child resources:

```python
agent_engine.delete(force=True)

```

## What's next

- [Manage sessions using API calls](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/sessions/manage-sessions-api).