---
date_scraped: 2025-05-12
title: Use A Langchain Agent
---

# Use a LangChain agent 

In addition to the general instructions for [using an agent](../use.md),
this page describes features that are specific to `LangchainAgent`.

## Before you begin

This tutorial assumes that you have read and followed the instructions in:

- [Develop a LangChain agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langchain): to develop `agent` as an instance of `LangchainAgent`.
- [User authentication](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#authentication) to authenticate as a user for querying the agent.

## Supported operations

The following operations are supported for `LangchainAgent`:

- [`query`](../use.md): for getting a response to a query synchronously.
- [`stream_query`](../use.md): for streaming a response to a query.

Both `query` and `stream_query` methods support the same type of arguments:

- [`input`](#input-messages): the messages to be sent to the agent.
- [`config`](#runnable-configuration): the configuration (if applicable) for the context of the query.

## Query the agent

The command:

```python
agent.query(input="What is the exchange rate from US dollars to SEK today?")

```

is equivalent to the following (in full form):

```python
agent.query(input={
 "input": [ # The input is represented as a list of messages (each message as a dict)
 {
 # The role (e.g. "system", "user", "assistant", "tool")
 "role": "user",
 # The type (e.g. "text", "tool_use", "image_url", "media")
 "type": "text",
 # The rest of the message (this varies based on the type)
 "text": "What is the exchange rate from US dollars to Swedish currency?",
 },
 ]
})

```

Roles are used to help the model distinguish between different types of [messages](https://python.langchain.com/docs/concepts/messages)
when responding. When the `role` is omitted in the input, it defaults to `"user"`.

| Role | Description |
| --- | --- |
| `system` | Used to tell the chat model how to behave and provide additional context. Not supported by all chat model providers. |
| `user` | Represents input from a user interacting with the model, usually in the form of text or other interactive input. |
| `assistant` | Represents a response from the model, which can include text or a request to invoke tools. |
| `tool` | A message used to pass the results of a tool invocation back to the model after external data or processing has been retrieved. |

The `type` of the message will also determine how the rest of the message is
interpreted (see [Handle multi-modal content](#multimodal-content)).

## Query the agent with multi-modal content

We will use the following agent (which forwards the input to the model and does
not use any tools) to illustrate how to pass in multimodal inputs to an agent:

**Note:** there isn't any known support for multi-modal outputs.

```python
agent = agent_engines.LangchainAgent(
 model="gemini-2.0-flash",
 runnable_builder=lambda model, **kwargs: model,
)

```

Multimodal messages are represented through content blocks that specify a `type`
and corresponding data. In general, for multimodal content, you would specify
the `type` to be `"media"`, the `file_uri` to point to a Cloud Storage URI,
and the `mime_type` for interpreting the file.

### Image

```python
agent.query(input={"input": [
 {"type": "text", "text": "Describe the attached media in 5 words!"},
 {"type": "media", "mime_type": "image/jpeg", "file_uri": "gs://cloud-samples-data/generative-ai/image/cricket.jpeg"},
]})

```

### Video

```python
agent.query(input={"input": [
 {"type": "text", "text": "Describe the attached media in 5 words!"},
 {"type": "media", "mime_type": "video/mp4", "file_uri": "gs://cloud-samples-data/generative-ai/video/pixel8.mp4"},
]})

```

### Audio

```python
agent.query(input={"input": [
 {"type": "text", "text": "Describe the attached media in 5 words!"},
 {"type": "media", "mime_type": "audio/mp3", "file_uri": "gs://cloud-samples-data/generative-ai/audio/pixel.mp3"},
]})

```

For the list of MIME types supported by Gemini, visit the documentation on:

- [Image](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-understanding#image-requirements)
- [Video](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/video-understanding#video-requirements)
- [Audio](../../multimodal/audio-understanding.md)

## Query the agent with a runnable configuration

When querying the agent, you can also specify a `config` for the agent (which
follows the schema of a [`RunnableConfig`](https://python.langchain.com/docs/concepts/runnables/#runnableconfig)).
Two common scenarios are:

- Default configuration parameters:
 - `run_id` / `run_name`: identifier for the run.
 - `tags` / `metadata`: classifier for the run when [tracing with OpenTelemetry](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/custom#tracing).
- Custom configuration parameters (via `configurable`):
 - `session_id`: the session under which the run is happening (see [Store chat history](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langchain#chat-history)).
 - `thread_id`: the thread under which the run is happening (see [Store Checkpoints](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langgraph#store-checkpoints)).

As an example:

```python
import uuid

run_id = uuid.uuid4() # Generate an ID for tracking the run later.

response = agent.query(
 input="What is the exchange rate from US dollars to Swedish currency?",
 config={ # Specify the RunnableConfig here.
 "run_id": run_id # Optional.
 "tags": ["config-tag"], # Optional.
 "metadata": {"config-key": "config-value"}, # Optional.
 "configurable": {"session_id": "SESSION_ID"} # Optional.
 },
)

print(response)

```

## What's next

- [Use an agent](../use.md).
- [Evaluate an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/evaluate).
- [Manage deployed agents](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).