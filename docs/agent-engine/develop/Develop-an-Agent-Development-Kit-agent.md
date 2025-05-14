---
date_scraped: 2025-05-12
title: Develop An Agent Development Kit Agent
---

# Develop an Agent Development Kit agent 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This page shows you how to develop an agent using the Agent Development Kit template (the `AdkApp` class in the Vertex AI SDK for Python). The agent returns the exchange rate between two currencies on a specified date.

Use the following steps:

1. [Define and configure a model](#model)
2. [Define and use a tool](#define-function)
3. [Manage sessions](#manage-sessions)

## Before you begin

Make sure your environment is set up by following
the steps in [Set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up).

## Define and configure a model

Define the [model version](../../learn/model-versions.md):

```python
model = "gemini-2.0-flash"

```

(Optional) Configure the safety settings of the model. To learn more
about the options available for safety settings in Gemini, see
[Configure safety attributes](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-attributes).
The following is an example of how you can configure the safety settings:

```python
from google.genai import types

safety_settings = [
 types.SafetySetting(
 category=types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
 threshold=types.HarmBlockThreshold.OFF,
 ),
]

```

(Optional) Specify [content generation parameters](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters):

```python
from google.genai import types

generate_content_config = types.GenerateContentConfig(
 safety_settings=safety_settings,
 temperature=0.28,
 max_output_tokens=1000,
 top_p=0.95,
)

```

Create an `AdkApp` using the model configurations:

```python
from google.adk.agents import Agent
from vertexai.preview.reasoning_engines import AdkApp

agent = Agent(
 model=model, # Required.
 name='currency_exchange_agent', # Required.
 generate_content_config=generate_content_config, # Optional.
)
app = AdkApp(agent=agent)

```

If you are running in an interactive environment, such as the terminal or a Colab notebook, you can run a query as an intermediate testing step:

```python
for event in app.stream_query(
 user_id="USER_ID", # Required
 message="What is the exchange rate from US dollars to Swedish currency?",
):
 print(event)

```

where USER\_ID is a user-defined ID with a character limit of 128.

The response is a Python dictionary similar to the following example:

```python
{'actions': {'artifact_delta': {},
 'requested_auth_configs': {},
 'state_delta': {}},
 'author': 'currency_exchange_agent',
 'content': {'parts': [{'text': 'To provide you with the most accurate '
 'exchange rate, I need to know the specific '
 'currencies you\'re asking about. "Swedish '
 'currency" could refer to:\n'
 '\n'
 '* **Swedish Krona (SEK):** This is the '
 'official currency of Sweden.\n'
 '\n'
 "Please confirm if you're interested in the "
 'exchange rate between USD and SEK. Once you '
 'confirm, I can fetch the latest exchange rate '
 'for you.\n'}],
 'role': 'model'},
 'id': 'LYg7wg8G',
 'invocation_id': 'e-113ca547-0f19-4d50-9dde-f76cbc001dce',
 'timestamp': 1744166956.925927}

```

## Define and use a tool

After you define your model, define the tools that your model uses for reasoning.

When you define your function, it's important to include comments that fully and clearly describe the function's parameters, what the function does, and what the function returns. This information is used by the model to determine which function to use. You must also test your function locally to confirm that it works.

Use the following code to define a function that returns an exchange rate:

```python
def get_exchange_rate(
 currency_from: str = "USD",
 currency_to: str = "EUR",
 currency_date: str = "latest",
):
 """Retrieves the exchange rate between two currencies on a specified date.

 Uses the Frankfurter API (https://api.frankfurter.app/) to obtain
 exchange rate data.

 Args:
 currency_from: The base currency (3-letter currency code).
 Defaults to "USD" (US Dollar).
 currency_to: The target currency (3-letter currency code).
 Defaults to "EUR" (Euro).
 currency_date: The date for which to retrieve the exchange rate.
 Defaults to "latest" for the most recent exchange rate data.
 Can be specified in YYYY-MM-DD format for historical rates.

 Returns:
 dict: A dictionary containing the exchange rate information.
 Example: {"amount": 1.0, "base": "USD", "date": "2023-11-24",
 "rates": {"EUR": 0.95534}}
 """
 import requests
 response = requests.get(
 f"https://api.frankfurter.app/{currency_date}",
 params={"from": currency_from, "to": currency_to},
 )
 return response.json()

```

To test the function before you use it in your agent, run the following:

```python
get_exchange_rate(currency_from="USD", currency_to="SEK")

```

The response should be similar to the following:

```python
{'amount': 1.0, 'base': 'USD', 'date': '2025-04-03', 'rates': {'SEK': 9.6607}}

```

To use the tool inside the `AdkApp` template, add it to the list of tools under
the `tools=` argument:

```python
from google.adk.agents import Agent

agent = Agent(
 model=model, # Required.
 name='currency_exchange_agent', # Required.
 tools=[get_exchange_rate], # Optional.
)

```

You can test the agent locally by performing test queries against it. Run the
following command to test the agent locally using US dollars and Swedish Krona:

```python
from vertexai.preview.reasoning_engines import AdkApp

app = AdkApp(agent=agent)
for event in app.stream_query(
 user_id="USER_ID",
 message="What is the exchange rate from US dollars to SEK on 2025-04-03?",
):
 print(event)

```

The response is a sequence of dictionaries that's similar to the following:

```python
{'author': 'currency_exchange_agent',
 'content': {'parts': [{'function_call': {'args': {'currency_date': '2025-04-03',
 'currency_from': 'USD',
 'currency_to': 'SEK'},
 'id': 'adk-e39f3ba2-fa8c-4169-a63a-8e4c62b89818',
 'name': 'get_exchange_rate'}}],
 'role': 'model'},
 'id': 'zFyIaaif',
 # ...
}
{'author': 'currency_exchange_agent',
 'content': {'parts': [{'function_response': {'id': 'adk-e39f3ba2-fa8c-4169-a63a-8e4c62b89818',
 'name': 'get_exchange_rate',
 'response': {'amount': 1.0,
 'base': 'USD',
 'date': '2025-04-03',
 'rates': {'SEK': 9.6607}}}}],
 'role': 'user'},
 'id': 'u2YR4Uom',
 # ...
}
{'author': 'currency_exchange_agent',
 'content': {'parts': [{'text': 'The exchange rate from USD to SEK on '
 '2025-04-03 is 9.6607.'}],
 'role': 'model'},
 'id': 'q3jWA3wl',
 # ...
}

```

## Manage sessions

`AdkApp` uses in-memory sessions when running locally and uses cloud-based managed sessions after you deploy the agent to Vertex AI Agent Engine. This section describes how to configure your ADK agent to work with managed sessions.

### (Optional) Customize your sessions database

**Note:** If you use a custom in-memory session service, sessions might not stay in sync when you deploy the agent to Vertex AI Agent Engine. We only recommend customizing your database if you can synchronize the state across sessions in a deployed environment.

If you want to override the default managed session service with your own database, you can [define a `session_service_builder`](https://google.github.io/adk-docs/sessions/) function as follows:

```python
def session_service_builder():
 from google.adk.sessions import InMemorySessionService

 return InMemorySessionService()

```

Pass your database to `AdkApp` as `session_service_builder=`:

```python
from vertexai.preview.reasoning_engines import AdkApp

app = AdkApp(
 agent=agent, # Required.
 session_service_builder=session_service_builder, # Optional.
)

```

### Use the agent with sessions

When you run the agent locally, the following instructions use in-memory sessions:

Create a session for your agent:

```python
session = app.create_session(user_id="USER_ID")

```

List sessions associated with your agent:

```python
app.list_sessions(user_id="USER_ID")

```

Get a particular session:

```python
session = app.get_session(user_id="USER_ID", session_id="SESSION_ID")

```

where SESSION\_ID is the ID for the particular session you want to retrieve.

Query the agent using sessions:

```python
for event in app.stream_query(
 user_id="USER_ID",
 session_id=SESSION_ID, # Optional. you can pass in the session_id when querying the agent
 message="What is the exchange rate from US dollars to Swedish currency on 2025-04-03?",
):
 print(event)

```

The agent might respond with a request for information like the following:

```python
{'author': 'currency_exchange_agent',
 'content': {'parts': [{'text': 'I need to know the Swedish currency code to '
 'provide you with the exchange rate.'}],
 'role': 'model'},
 'id': 'wIgZAtQ4',
 #...
}

```

You can send a response within the session (for example, `"SEK"`) by specifying
the `session_id`:

```python
for event in app.stream_query(
 user_id="USER_ID",
 session_id=session.id, # Optional. you can pass in the session_id when querying the agent
 message="SEK",
):
 print(event)

```

You should receive a continuation of the conversation like the following
sequence of dictionaries:

```python
{'author': 'currency_exchange_agent',
 'content': {'parts': [{'function_call': {'args': {'currency_date': '2025-04-03',
 'currency_from': 'USD',
 'currency_to': 'SEK'},
 'id': 'adk-2b9230a6-4b92-4a1b-9a65-b708ff6c68b6',
 'name': 'get_exchange_rate'}}],
 'role': 'model'},
 'id': 'bOPHtzji',
 # ...
}
{'author': 'currency_exchange_agent',
 'content': {'parts': [{'function_response': {'id': 'adk-2b9230a6-4b92-4a1b-9a65-b708ff6c68b6',
 'name': 'get_exchange_rate',
 'response': {'amount': 1.0,
 'base': 'USD',
 'date': '2025-04-03',
 'rates': {'SEK': 9.6607}}}}],
 'role': 'user'},
 'id': '9AoDFmiL',
 # ...
}
{'author': 'currency_exchange_agent',
 'content': {'parts': [{'text': 'The exchange rate from USD to SEK on '
 '2025-04-03 is 1 USD to 9.6607 SEK.'}],
 'role': 'model'},
 'id': 'hmle7trT',
 # ...
}

```

## What's next

- [Evaluate an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/evaluate).
- [Deploy an agent](../deploy.md).
- [Troubleshoot developing an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/troubleshooting/develop).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).