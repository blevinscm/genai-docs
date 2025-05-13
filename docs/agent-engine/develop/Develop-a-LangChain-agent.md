---
title: Develop-a-LangChain-agentgoogle.com/vertex-ai/generative-ai/docs/agent-engine/develop/langchain
date_scraped: 2025-05-12
---

# Develop a LangChain agent 

This page shows you how to develop an agent by using the framework-specific LangChain template (the `LangchainAgent` class in the Vertex AI SDK for Python). The agent returns the exchange
rate between two currencies on a specified date. Here are the steps:

1. [Define and configure a model](#model)
2. [Define and use a tool](#define-function)
3. (Optional) [Store chat history](#chat-history)
4. (Optional) [Customize the prompt template](#prompt-template)
5. (Optional) [Customize the orchestration](#orchestration)

## Before you begin

Make sure your environment is set up by following
the steps in [Set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up).

## Step 1. Define and configure a model

Define the [Model version](../../learn/model-versions.md) to use.

```python
model = "gemini-2.0-flash"

```

(Optional) Configure the safety settings of the model. To learn more
about the options available for safety settings in Gemini, see
[Configure safety attributes](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-attributes).
The following is an example of how you can configure the safety settings:

```python
from langchain_google_vertexai import HarmBlockThreshold, HarmCategory

safety_settings = {
 HarmCategory.HARM_CATEGORY_UNSPECIFIED: HarmBlockThreshold.BLOCK_NONE,
 HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
 HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
 HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
 HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
}

```

(Optional) Specify [model parameters](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#set_model_parameters)
in the following way:

```python
model_kwargs = {
 # temperature (float): The sampling temperature controls the degree of
 # randomness in token selection.
 "temperature": 0.28,
 # max_output_tokens (int): The token limit determines the maximum amount of
 # text output from one prompt.
 "max_output_tokens": 1000,
 # top_p (float): Tokens are selected from most probable to least until
 # the sum of their probabilities equals the top-p value.
 "top_p": 0.95,
 # top_k (int): The next token is selected from among the top-k most
 # probable tokens. This is not supported by all model versions. See
 # https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#valid_parameter_values
 # for details.
 "top_k": None,
 # safety_settings (Dict[HarmCategory, HarmBlockThreshold]): The safety
 # settings to use for generating content.
 # (you must create your safety settings using the previous step first).
 "safety_settings": safety_settings,
}

```

Create a `LangchainAgent` using the model configurations:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model=model, # Required.
 model_kwargs=model_kwargs, # Optional.
)

```

If you are running in an interactive environment (e.g. terminal or Colab
notebook), you can run a query as an intermediate testing step:

```python
response = agent.query(input="What is the exchange rate from US dollars to SEK today?")

print(response)

```

The response is a Python dictionary similar to the following example:

```python
{"input": "What is the exchange rate from US dollars to Swedish currency?",
 "output": """I cannot provide the live exchange rate from US dollars to Swedish currency (Swedish krona, SEK).

**Here's why:**

* **Exchange rates constantly fluctuate.** Factors like global economics, interest rates, and political events cause
 these changes throughout the day.
* **Providing inaccurate information would be misleading.**

**How to find the current exchange rate:**

1. **Use a reliable online converter:** Many websites specialize in live exchange rates. Some popular options include:
 * Google Finance (google.com/finance)
 * XE.com
 * Bank websites (like Bank of America, Chase, etc.)
2. **Contact your bank or financial institution:** They can give you the exact exchange rate they are using.

Remember to factor in any fees or commissions when exchanging currency.
"""}

```

**Note:** The response indicates that the agent is unable to provide the exchange
rate. When the agent is [equipped with an exchange rate tool](#define-function),
it will perform [function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling)
to use the tool and provide a better response.

### (Optional) Advanced customization

The `LangchainAgent` template uses [`ChatVertexAI`](https://python.langchain.com/v0.2/docs/integrations/chat/google_vertex_ai_palm/) by default, because it provides access to all
foundational models available in Google Cloud. To use a model that is not
available through `ChatVertexAI`, you can specify the `model_builder=` argument,
with a Python function of the following signature:

```python
from typing import Optional

def model_builder(
 *,
 model_name: str, # Required. The name of the model
 model_kwargs: Optional[dict] = None, # Optional. The model keyword arguments.
 **kwargs, # Optional. The remaining keyword arguments to be ignored.
):

```

For a list of the chat models supported in LangChain and their capabilities, see
[Chat Models](https://python.langchain.com/v0.2/docs/integrations/chat/).
The set of supported values for `model=` and `model_kwargs=` are specific to
each chat model, so you have to refer to their corresponding documentation for
details.

### ChatVertexAI

Installed by default.

It is used in the `LangchainAgent` template when you omit the `model_builder`
argument, for example

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model=model, # Required.
 model_kwargs=model_kwargs, # Optional.
)

```

### ChatAnthropic

First, follow their [documentation](https://python.langchain.com/v0.2/docs/integrations/chat/anthropic/)
to set up an account and install the package.

Next, define a `model_builder` that returns `ChatAnthropic`:

```python
def model_builder(*, model_name: str, model_kwargs = None, **kwargs):
 from langchain_anthropic import ChatAnthropic
 return ChatAnthropic(model_name=model_name, **model_kwargs)

```

Finally, use it in the `LangchainAgent` template with the following code:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model="claude-3-opus-20240229", # Required.
 model_builder=model_builder, # Required.
 model_kwargs={
 "api_key": "ANTHROPIC_API_KEY", # Required.
 "temperature": 0.28, # Optional.
 "max_tokens": 1000, # Optional.
 },
)

```

### ChatOpenAI

You can use `ChatOpenAI` in conjunction with Gemini's [ChatCompletions API](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/call-gemini-using-openai-library).

First, follow their [documentation](https://python.langchain.com/v0.2/docs/integrations/chat/openai/)
to install the package.

Next, define a `model_builder` that returns `ChatOpenAI`:

```python
def model_builder(
 *,
 model_name: str,
 model_kwargs = None,
 project: str, # Specified via vertexai.init
 location: str, # Specified via vertexai.init
 **kwargs,
):
 import google.auth
 from langchain_openai import ChatOpenAI

 # Note: the credential lives for 1 hour by default.
 # After expiration, it must be refreshed.
 creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
 auth_req = google.auth.transport.requests.Request()
 creds.refresh(auth_req)

 if model_kwargs is None:
 model_kwargs = {}

 endpoint = f"https://{location}-aiplatform.googleapis.com"
 base_url = f'{endpoint}/v1beta1/projects/{project}/locations/{location}/endpoints/openapi'

 return ChatOpenAI(
 model=model_name,
 base_url=base_url,
 api_key=creds.token,
 **model_kwargs,
 )

```

Finally, use it in the `LangchainAgent` template with the following code:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model="google/gemini-2.0-flash", # Or "meta/llama3-405b-instruct-maas"
 model_builder=model_builder, # Required.
 model_kwargs={
 "temperature": 0, # Optional.
 "max_retries": 2, # Optional.
 },
)

```

## Step 2. Define and use a tool

After you define your model, the next step is to define the tools that your
model uses for reasoning. A tool can be a
[LangChain tool](https://python.langchain.com/docs/concepts/tools/) or a Python
function. You can also
[convert a defined Python function to a LangChain Tool](https://python.langchain.com/docs/how_to/custom_tools/).

When you define your function, it's important to include comments that fully and
clearly describe the function's parameters, what the function does, and what the
function returns. This information is used by the model to determine which
function to use. You must also test your function locally to confirm that it
works.

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
{'amount': 1.0, 'base': 'USD', 'date': '2024-02-22', 'rates': {'SEK': 10.3043}}

```

To use the tool inside the `LangchainAgent` template, you will add it to the
list of tools under the `tools=` argument:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model=model, # Required.
 tools=[get_exchange_rate], # Optional.
 model_kwargs=model_kwargs, # Optional.
)

```

You can test the agent locally by performing test queries against it. Run the
following command to test the agent locally using US dollars and Swedish Krona:

```python
response = agent.query(
 input="What is the exchange rate from US dollars to Swedish currency?"
)

```

The response is a dictionary that's similar to the following:

```python
{"input": "What is the exchange rate from US dollars to Swedish currency?",
 "output": "For 1 US dollar you will get 10.7345 Swedish Krona."}

```

### (Optional) Multiple tools

Tools for `LangchainAgent` can be defined and instantiated in other ways.

### Grounding Tool

First, import the `generate_models` package and create the tool

```python
from vertexai.generative_models import grounding, Tool

grounded_search_tool = Tool.from_google_search_retrieval(
 grounding.GoogleSearchRetrieval()
)

```

Next, use the tool inside the `LangchainAgent` template:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model=model,
 tools=[grounded_search_tool],
)
agent.query(input="When is the next total solar eclipse in US?")

```

The response is a dictionary that is similar to the following:

```python
{"input": "When is the next total solar eclipse in US?",
 "output": """The next total solar eclipse in the U.S. will be on August 23, 2044.
 This eclipse will be visible from three states: Montana, North Dakota, and
 South Dakota. The path of totality will begin in Greenland, travel through
 Canada, and end around sunset in the United States."""}

```

For details, visit [Grounding](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview).

### LangChain Tool

First, install the package that defines the tool.

```python
pip install langchain-google-community
```

Next, import the package and create the tool.

```python
from langchain_google_community import VertexAISearchRetriever
from langchain.tools.retriever import create_retriever_tool

retriever = VertexAISearchRetriever(
 project_id="PROJECT_ID",
 data_store_id="DATA_STORE_ID",
 location_id="DATA_STORE_LOCATION_ID",
 engine_data_type=1,
 max_documents=10,
)
movie_search_tool = create_retriever_tool(
 retriever=retriever,
 name="search_movies",
 description="Searches information about movies.",
)

```

Finally, use the tool inside the `LangchainAgent` template:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model=model,
 tools=[movie_search_tool],
)
response = agent.query(
 input="List some sci-fi movies from the 1990s",
)

```

It should return a response such as

```python
{"input": "List some sci-fi movies from the 1990s",
 "output": """Here are some sci-fi movies from the 1990s:
 * The Matrix (1999): A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.
 * Star Wars: Episode I - The Phantom Menace (1999): Two Jedi Knights escape a hostile blockade to find a queen and her protector, and come across a young boy [...]
 * Men in Black (1997): A police officer joins a secret organization that monitors extraterrestrial interactions on Earth.
 [...]
 """}

```

To see the full example, visit the [notebook](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_vertex_ai_search_rag_agent.ipynb).

For more examples of tools available in LangChain, visit [Google Tools](https://python.langchain.com/v0.2/docs/integrations/platforms/google/#tools).

### Vertex AI Extension

First, import the extensions package and create the tool

```python
from typing import Optional

def generate_and_execute_code(
 query: str,
 files: Optional[list[str]] = None,
 file_gcs_uris: Optional[list[str]] = None,
) -> str:
 """Get the results of a natural language query by generating and executing
 a code snippet.

 Example queries: "Find the max in [1, 2, 5]" or "Plot average sales by
 year (from data.csv)". Only one of `file_gcs_uris` and `files` field
 should be provided.

 Args:
 query:
 The natural language query to generate and execute.
 file_gcs_uris:
 Optional. URIs of input files to use when executing the code
 snippet. For example, ["gs://input-bucket/data.csv"].
 files:
 Optional. Input files to use when executing the generated code.
 If specified, the file contents are expected be base64-encoded.
 For example: [{"name": "data.csv", "contents": "aXRlbTEsaXRlbTI="}].
 Returns:
 The results of the query.
 """
 operation_params = {"query": query}
 if files:
 operation_params["files"] = files
 if file_gcs_uris:
 operation_params["file_gcs_uris"] = file_gcs_uris

 from vertexai.preview import extensions

 # If you have an existing extension instance, you can get it here
 # i.e. code_interpreter = extensions.Extension(resource_name).
 code_interpreter = extensions.Extension.from_hub("code_interpreter")
 return extensions.Extension.from_hub("code_interpreter").execute(
 operation_id="generate_and_execute",
 operation_params=operation_params,
 )

```

Next, use the tool inside the `LangchainAgent` template:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model=model,
 tools=[generate_and_execute_code],
)
agent.query(
 input="""Using the data below, construct a bar chart that includes only the height values with different colors for the bars:

 tree_heights_prices = {
 \"Pine\": {\"height\": 100, \"price\": 100},
 \"Oak\": {\"height\": 65, \"price\": 135},
 \"Birch\": {\"height\": 45, \"price\": 80},
 \"Redwood\": {\"height\": 200, \"price\": 200},
 \"Fir\": {\"height\": 180, \"price\": 162},
 }
 """
)

```

It should return a response such as

```python
{"input": """Using the data below, construct a bar chart that includes only the height values with different colors for the bars:

 tree_heights_prices = {
 \"Pine\": {\"height\": 100, \"price\": 100},
 \"Oak\": {\"height\": 65, \"price\": 135},
 \"Birch\": {\"height\": 45, \"price\": 80},
 \"Redwood\": {\"height\": 200, \"price\": 200},
 \"Fir\": {\"height\": 180, \"price\": 162},
 }
 """,
 "output": """Here's the generated bar chart:
 ```python
 import matplotlib.pyplot as plt

 tree_heights_prices = {
 "Pine": {"height": 100, "price": 100},
 "Oak": {"height": 65, "price": 135},
 "Birch": {"height": 45, "price": 80},
 "Redwood": {"height": 200, "price": 200},
 "Fir": {"height": 180, "price": 162},
 }

 heights = [tree["height"] for tree in tree_heights_prices.values()]
 names = list(tree_heights_prices.keys())

 plt.bar(names, heights, color=['red', 'green', 'blue', 'purple', 'orange'])
 plt.xlabel('Tree Species')
 plt.ylabel('Height')
 plt.title('Tree Heights')
 plt.show()
 ```
 """}

```

For your deployed agent to access the [Code Interpreter](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/code-interpreter)
extension, you must add the Vertex AI User role (`roles/aiplatform.user`) to
the AI Platform Reasoning Engine Service Agent service account. For more
information, see [Managing access](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage/access#roles).

For details, visit [Vertex AI Extensions](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/overview).

You can use all (or a subset) of the tools you've created in `LangchainAgent`:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model=model,
 tools=[
 get_exchange_rate, # Optional (Python function)
 grounded_search_tool, # Optional (Grounding Tool)
 movie_search_tool, # Optional (Langchain Tool)
 generate_and_execute_code, # Optional (Vertex Extension)
 ],
)

agent.query(input="When is the next total solar eclipse in US?")

```

### (Optional) Tool configuration

With Gemini, you can place constraints on tool usage. For example,
instead of allowing the model to generate natural language responses, you can
force it to only generate function calls ("forced function calling").

```python
from vertexai import agent_engines
from vertexai.preview.generative_models import ToolConfig

agent = agent_engines.LangchainAgent(
 model="gemini-2.0-flash",
 tools=[search_arxiv, get_exchange_rate],
 model_tool_kwargs={
 "tool_config": { # Specify the tool configuration here.
 "function_calling_config": {
 "mode": ToolConfig.FunctionCallingConfig.Mode.ANY,
 "allowed_function_names": ["search_arxiv", "get_exchange_rate"],
 },
 },
 },
)

agent.query(
 input="Explain the Schrodinger equation in a few sentences",
)

```

For details, visit [Tool Configuration](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling#tool-config).

## Step 3. Store chat history

To track chat messages and append them to a database, define a
`get_session_history` function and pass it in when you create the agent. This
function should take in a `session_id` and return a `BaseChatMessageHistory`
object.

- `session_id` is an identifier for the session that these input messages belong
 to. This lets you maintain several conversations at the same time.
- `BaseChatMessageHistory` is the interface for classes that can load and save
 message objects.

### Set up a database

For a list of the `ChatMessageHistory` providers from Google that are supported
in LangChain, see
[Memory](https://python.langchain.com/docs/integrations/providers/google/#memory).

First, follow LangChain's documentation to install and use the relevant package to set up a database of your choice (e.g. Firestore, Bigtable, or Spanner):

- [Firestore (Native Mode)](https://python.langchain.com/docs/integrations/memory/google_firestore/)
- [Bigtable](https://python.langchain.com/docs/integrations/memory/google_bigtable/)
- [Spanner](https://python.langchain.com/docs/integrations/memory/google_spanner/)

Next, define a `get_session_history` function as follows:

### Firestore (Native Mode)

```python
def get_session_history(session_id: str):
 from langchain_google_firestore import FirestoreChatMessageHistory
 from google.cloud import firestore

 client = firestore.Client(project="PROJECT_ID")
 return FirestoreChatMessageHistory(
 client=client,
 session_id=session_id,
 collection="TABLE_NAME",
 encode_message=False,
 )

```

### Bigtable

```python
def get_session_history(session_id: str):
 from langchain_google_bigtable import BigtableChatMessageHistory

 return BigtableChatMessageHistory(
 instance_id="INSTANCE_ID",
 table_id="TABLE_NAME",
 session_id=session_id,
 )

```

### Spanner

```python
def get_session_history(session_id: str):
 from langchain_google_spanner import SpannerChatMessageHistory

 return SpannerChatMessageHistory(
 instance_id="INSTANCE_ID",
 database_id="DATABASE_ID",
 table_name="TABLE_NAME",
 session_id=session_id,
 )

```

Finally, create the agent and pass it in as `chat_history`:

```python
from vertexai import agent_engines

agent = agent_engines.LangchainAgent(
 model=model,
 chat_history=get_session_history, # <- new
)

```

When querying the agent, make sure you pass in the `session_id` so that the agent has "memory" of past questions and answers:

```python
agent.query(
 input="What is the exchange rate from US dollars to Swedish currency?",
 config={"configurable": {"session_id": "SESSION_ID"}},
)

```

You can check that subsequent queries will retain memory of the session:

```python
response = agent.query(
 input="How much is 100 USD?",
 config={"configurable": {"session_id": "SESSION_ID"}},
)

print(response)

```

## Step 4. Customize the prompt template

Prompt templates help to translate user input into instructions for a model, and
are used to guide a model's response, helping it understand the context and
generate relevant and coherent language-based output. For details, visit
[ChatPromptTemplates](https://python.langchain.com/v0.2/docs/concepts/#chatprompttemplates).

The default prompt template is organized sequentially into sections.

| Section | Description |
| --- | --- |
| (Optional) System instruction | Instructions for the agent to be applied across all queries. |
| (Optional) Chat history | Messages corresponding to the chat history from a past session. |
| User input | The query from the user for the agent to respond to. |
| Agent Scratchpad | Messages created by the agent (e.g. with function calling) as it performs uses its tools and performs reasoning to formulate a response to the user. |

The default prompt template is generated if you create the agent without
specifying your own prompt template, and will look like the following in full:

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain.agents.format_scratchpad.tools import format_to_tool_messages

prompt_template = {
 "user_input": lambda x: x["input"],
 "history": lambda x: x["history"],
 "agent_scratchpad": lambda x: format_to_tool_messages(x["intermediate_steps"]),
} | ChatPromptTemplate.from_messages([
 ("system", "{system_instruction}"),
 ("placeholder", "{history}"),
 ("user", "{user_input}"),
 ("placeholder", "{agent_scratchpad}"),
])

```

You are implicitly using the full prompt template when you instantiate the agent
in the following example:

```python
from vertexai import agent_engines

system_instruction = "I help look up the rate between currencies"

agent = agent_engines.LangchainAgent(
 model=model,
 system_instruction=system_instruction,
 chat_history=get_session_history,
 tools=[get_exchange_rate],
)

```

You can override the default prompt template with your own prompt template, and
use it when constructing the agent, for example:

```python

from vertexai import agent_engines

custom_prompt_template = {
 "user_input": lambda x: x["input"],
 "history": lambda x: x["history"],
 "agent_scratchpad": lambda x: format_to_tool_messages(x["intermediate_steps"]),
} | ChatPromptTemplate.from_messages([
 ("placeholder", "{history}"),
 ("user", "{user_input}"),
 ("placeholder", "{agent_scratchpad}"),
])

agent = agent_engines.LangchainAgent(
 model=model,
 prompt=custom_prompt_template,
 chat_history=get_session_history,
 tools=[get_exchange_rate],
)

agent.query(
 input="What is the exchange rate from US dollars to Swedish currency?",
 config={"configurable": {"session_id": "SESSION_ID"}},
)

```

## Step 5. Customize the orchestration

All LangChain components implement the [Runnable interface](https://python.langchain.com/v0.2/docs/concepts/#runnable-interface),
which provide input and output schemas for orchestration. The `LangchainAgent`
requires a runnable to be built for it to respond to queries. By default,
the `LangchainAgent` will build such a runnable by [binding the model with tools](https://python.langchain.com/v0.2/docs/how_to/tool_calling)
and use an [`AgentExecutor`](https://api.python.langchain.com/en/latest/agents/langchain.agents.agent.AgentExecutor.html)
that is wrapped into a [`RunnableWithMessageHistory`](https://api.python.langchain.com/en/latest/runnables/langchain_core.runnables.history.RunnableWithMessageHistory.html)
if [chat history is enabled](#chat-history).

You might want to customize the orchestration if you intend to (i) implement an
agent that performs a deterministic set of steps (rather than to perform
open-ended reasoning), or (ii) prompt the Agent in a ReAct-like fashion to
annotate each step with thoughts for why it performed that step. To do so, you
have to override the default runnable when creating the `LangchainAgent` by
specifying the `runnable_builder=` argument with a Python function of the
following signature:

```python
from typing import Optional
from langchain_core.language_models import BaseLanguageModel

def runnable_builder(
 model: BaseLanguageModel,
 *,
 system_instruction: Optional[str] = None,
 prompt: Optional["RunnableSerializable"] = None,
 tools: Optional[Sequence["_ToolLike"]] = None,
 chat_history: Optional["GetSessionHistoryCallable"] = None,
 model_tool_kwargs: Optional[Mapping[str, Any]] = None,
 agent_executor_kwargs: Optional[Mapping[str, Any]] = None,
 runnable_kwargs: Optional[Mapping[str, Any]] = None,
 **kwargs,
):

```

where

- `model` corresponds to the chat model being returned from the `model_builder`
 (see [Define and configure a model](#custom-model)),
- `tools` and `model_tool_kwargs` corresponds to the tools and configurations to
 be used (see [Define and use a tool](#define-function)),
- `chat_history` corresponds to the database for storing chat messages (see
 [Store chat history](#chat-history)),
- `system_instruction` and `prompt` corresponds to the prompt configuration (see
 [Customize the prompt template](#prompt-template)),
- `agent_executor_kwargs` and `runnable_kwargs` are the keyword arguments you
 can use for customizing the runnable to be built.

This gives different options for customizing the orchestration logic.

### ChatModel

In the simplest case, to create an agent without orchestration, you can
override the `runnable_builder` for `LangchainAgent` to return the `model`
directly.

```python
from vertexai import agent_engines
from langchain_core.language_models import BaseLanguageModel

def llm_builder(model: BaseLanguageModel, **kwargs):
 return model

agent = agent_engines.LangchainAgent(
 model=model,
 runnable_builder=llm_builder,
)

```

### ReAct

To override the default [tool-calling behavior](https://python.langchain.com/v0.1/docs/modules/model_io/chat/function_calling/) with your own ReAct agent based on
your own `prompt` (see [Customize the Prompt Template](#prompt-template)),
you need to override the `runnable_builder` for `LangchainAgent`.

```python
from typing import Sequence
from langchain_core.language_models import BaseLanguageModel
from langchain_core.prompts import BasePromptTemplate
from langchain_core.tools import BaseTool
from langchain import hub

from vertexai import agent_engines

def react_builder(
 model: BaseLanguageModel,
 *,
 tools: Sequence[BaseTool],
 prompt: BasePromptTemplate,
 agent_executor_kwargs = None,
 **kwargs,
):
 from langchain.agents.react.agent import create_react_agent
 from langchain.agents import AgentExecutor

 agent = create_react_agent(model, tools, prompt)
 return AgentExecutor(agent=agent, tools=tools, **agent_executor_kwargs)

agent = agent_engines.LangchainAgent(
 model=model,
 tools=[get_exchange_rate],
 prompt=hub.pull("hwchase17/react"),
 agent_executor_kwargs={"verbose": True}, # Optional. For illustration.
 runnable_builder=react_builder,
)

```

### LCEL Syntax

To construct the following graph using LangChain Expression Language (LCEL),

```python
 Input
 / \
 Pros Cons
 \ /
 Summary

```

you need to override the `runnable_builder` for `LangchainAgent`:

```python
from vertexai import agent_engines

def lcel_builder(*, model, **kwargs):
 from operator import itemgetter
 from langchain_core.prompts import ChatPromptTemplate
 from langchain_core.runnables import RunnablePassthrough
 from langchain_core.output_parsers import StrOutputParser

 output_parser = StrOutputParser()

 planner = ChatPromptTemplate.from_template(
 "Generate an argument about: {input}"
 ) | model | output_parser | {"argument": RunnablePassthrough()}

 pros = ChatPromptTemplate.from_template(
 "List the positive aspects of {argument}"
 ) | model | output_parser

 cons = ChatPromptTemplate.from_template(
 "List the negative aspects of {argument}"
 ) | model | output_parser

 final_responder = ChatPromptTemplate.from_template(
 "Argument:{argument}\nPros:\n{pros}\n\nCons:\n{cons}\n"
 "Generate a final response given the critique",
 ) | model | output_parser

 return planner | {
 "pros": pros,
 "cons": cons,
 "argument": itemgetter("argument"),
 } | final_responder

agent = agent_engines.LangchainAgent(
 model=model,
 runnable_builder=lcel_builder,
)

```

### LangGraph

To construct the following graph using [LangGraph](https://langchain-ai.github.io/langgraph/),

```python
 Input
 / \
 Pros Cons
 \ /
 Summary

```

you need to override the `runnable_builder` for `LangchainAgent`:

```python
from vertexai import agent_engines

def langgraph_builder(*, model, **kwargs):
 from langchain_core.prompts import ChatPromptTemplate
 from langchain_core.output_parsers import StrOutputParser
 from langgraph.graph import END, MessageGraph

 output_parser = StrOutputParser()

 planner = ChatPromptTemplate.from_template(
 "Generate an argument about: {input}"
 ) | model | output_parser

 pros = ChatPromptTemplate.from_template(
 "List the positive aspects of {input}"
 ) | model | output_parser

 cons = ChatPromptTemplate.from_template(
 "List the negative aspects of {input}"
 ) | model | output_parser

 summary = ChatPromptTemplate.from_template(
 "Input:{input}\nGenerate a final response given the critique",
 ) | model | output_parser

 builder = MessageGraph()
 builder.add_node("planner", planner)
 builder.add_node("pros", pros)
 builder.add_node("cons", cons)
 builder.add_node("summary", summary)

 builder.add_edge("planner", "pros")
 builder.add_edge("planner", "cons")
 builder.add_edge("pros", "summary")
 builder.add_edge("cons", "summary")
 builder.add_edge("summary", END)
 builder.set_entry_point("planner")
 return builder.compile()

agent = agent_engines.LangchainAgent(
 model=model,
 runnable_builder=langgraph_builder,
)

# Example query
agent.query(input={"role": "user", "content": "scrum methodology"})

```

## What's next

- [Evaluate an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/evaluate).
- [Deploy an agent](../deploy.md).
- [Troubleshoot developing an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/troubleshooting/develop).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).