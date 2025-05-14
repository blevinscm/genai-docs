---
date_scraped: 2025-05-12
title: Class Chatsession 1920bookmark_borderbookmark
---

# Class ChatSession (1.92.0) bookmark\_borderbookmark 

See more code actions.

Light code theme

Dark code theme

```python
ChatSession(
 model: vertexai.language_models.ChatModel,
 context: typing.Optional[str] = None,
 examples: typing.Optional[
 typing.List[vertexai.language_models.InputOutputTextPair]
 ] = None,
 max_output_tokens: typing.Optional[int] = None,
 temperature: typing.Optional[float] = None,
 top_k: typing.Optional[int] = None,
 top_p: typing.Optional[float] = None,
 message_history: typing.Optional[
 typing.List[vertexai.language_models.ChatMessage]
 ] = None,
 stop_sequences: typing.Optional[typing.List[str]] = None,
)
```

ChatSession represents a chat session with a language model.

Within a chat session, the model keeps context and remembers the previous conversation.

## Properties

### message\_history

List of previous messages.

## Methods

### send\_message

```python
send_message(
 message: str,
 *,
 max_output_tokens: typing.Optional[int] = None,
 temperature: typing.Optional[float] = None,
 top_k: typing.Optional[int] = None,
 top_p: typing.Optional[float] = None,
 stop_sequences: typing.Optional[typing.List[str]] = None,
 candidate_count: typing.Optional[int] = None,
 grounding_source: typing.Optional[
 typing.Union[
 vertexai.language_models._language_models.WebSearch,
 vertexai.language_models._language_models.VertexAISearch,
 vertexai.language_models._language_models.InlineContext,
 ]
 ] = None
) -> vertexai.language_models.MultiCandidateTextGenerationResponse
```

Sends message to the language model and gets a response.

### send\_message\_async

```python
send_message_async(
 message: str,
 *,
 max_output_tokens: typing.Optional[int] = None,
 temperature: typing.Optional[float] = None,
 top_k: typing.Optional[int] = None,
 top_p: typing.Optional[float] = None,
 stop_sequences: typing.Optional[typing.List[str]] = None,
 candidate_count: typing.Optional[int] = None,
 grounding_source: typing.Optional[
 typing.Union[
 vertexai.language_models._language_models.WebSearch,
 vertexai.language_models._language_models.VertexAISearch,
 vertexai.language_models._language_models.InlineContext,
 ]
 ] = None
) -> vertexai.language_models.MultiCandidateTextGenerationResponse
```

Asynchronously sends message to the language model and gets a response.

### send\_message\_streaming

```python
send_message_streaming(
 message: str,
 *,
 max_output_tokens: typing.Optional[int] = None,
 temperature: typing.Optional[float] = None,
 top_k: typing.Optional[int] = None,
 top_p: typing.Optional[float] = None,
 stop_sequences: typing.Optional[typing.List[str]] = None
) -> typing.Iterator[vertexai.language_models.TextGenerationResponse]
```

Sends message to the language model and gets a streamed response.

The response is only added to the history once it's fully read.

### send\_message\_streaming\_async

```python
send_message_streaming_async(
 message: str,
 *,
 max_output_tokens: typing.Optional[int] = None,
 temperature: typing.Optional[float] = None,
 top_k: typing.Optional[int] = None,
 top_p: typing.Optional[float] = None,
 stop_sequences: typing.Optional[typing.List[str]] = None
) -> typing.AsyncIterator[vertexai.language_models.TextGenerationResponse]
```

Asynchronously sends message to the language model and gets a streamed response.

The response is only added to the history once it's fully read.

Was this helpful?