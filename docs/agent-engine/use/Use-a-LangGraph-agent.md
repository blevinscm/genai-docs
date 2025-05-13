---
title: Use-a-LangGraph-agentgoogle.com/vertex-ai/generative-ai/docs/agent-engine/use/langgraph
date_scraped: 2025-05-12
---

# Use a LangGraph agent 

In addition to the general instructions for [using an agent](../use.md),
this page describes features that are specific to `LanggraphAgent`.

## Before you begin

This tutorial assumes that you have read and followed the instructions in:

- [Develop a LangGraph agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langgraph): to develop `agent` as an instance of `LanggraphAgent`.
- [User authentication](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#authentication) to authenticate as a user for querying the agent.

## Supported operations

The following operations are supported for `LanggraphAgent`:

- [`query`](../use.md): for getting a response to a query synchronously.
- [`stream_query`](#stream-modes): for streaming a response to a query.
- [`get_state`](#human-in-the-loop-time-travel): for getting a specific checkpoint.
- [`get_state_history`](#human-in-the-loop-history): for listing the checkpoints of a thread.
- [`update_state`](#human-in-the-loop-branch): for creating branches corresponding to different scenarios.

## Stream a response to a query

LangGraph supports multiple streaming modes. The main ones are:

- `values`: This mode streams the full state of the graph after each node is called.
- `updates`: This mode streams updates to the state of the graph after each node is called.

To stream back `values` (corresponding to the full state of the graph):

```python
for state_values in agent.stream_query(
 input=inputs,
 stream_mode="values",
 config={"configurable": {"thread_id": "streaming-thread-values"}},
):
 print(state_values)

```

To stream back `updates` (corresponding to updates to the graph state):

```python
for state_updates in agent.stream_query(
 input=inputs,
 stream_mode="updates",
 config={"configurable": {"thread_id": "streaming-thread-updates"}},
):
 print(state_updates)

```

## Human in the loop

In LangGraph, a common aspect of human-in-the-loop is to add breakpoints to
interrupt the sequence of actions by the agent, and have a human resume the flow
at a later point in time.

**Note:** This step assumes that you are using an agent that is set up to
[store checkpoints](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langgraph#store-checkpoints).

### Review

You can set breakpoints using the `interrupt_before=` or `interrupt_after=`
arguments when calling `.query` or `.stream_query`:

```python
response = agent.query(
 input=inputs,
 interrupt_before=["tools"], # after generating the function call, before invoking the function
 interrupt_after=["tools"], # after getting a function response, before moving on
 config={"configurable": {"thread_id": "human-in-the-loop-deepdive"}},
)

langchain_load(response['messages'][-1]).pretty_print()

```

The output will look similar to the following:

```python
================================== Ai Message ==================================
Tool Calls:
 get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
 Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
 Args:
 currency_from: USD
 currency_to: SEK

```

### Approval

To approve the generated tool call and resume with the rest of the execution,
you pass in `None` to the input, and specifying the thread or checkpoint inside
the `config`:

```python
response = agent.query(
 input=None, # Continue with the function call
 interrupt_before=["tools"], # after generating the function call, before invoking the function
 interrupt_after=["tools"], # after getting a function response, before moving on
 config={"configurable": {"thread_id": "human-in-the-loop-deepdive"}},
)

langchain_load(response['messages'][-1]).pretty_print()

```

The output will look similar to the following:

```python
================================= Tool Message =================================
Name: get_exchange_rate

{"amount": 1.0, "base": "USD", "date": "2024-11-14", "rates": {"SEK": 11.0159}}

```

### History

To list all the checkpoints of a given thread, use the `.get_state_history` method:

```python
for state_snapshot in agent.get_state_history(
 config={"configurable": {"thread_id": "human-in-the-loop-deepdive"}},
):
 if state_snapshot["metadata"]["step"] >= 0:
 print(f'step {state_snapshot["metadata"]["step"]}: {state_snapshot["config"]}')
 state_snapshot["values"]["messages"][-1].pretty_print()
 print("\n")

```

The response will be similar to the following sequence of outputs:

```python
step 3: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-ded5-67e0-8003-2d34e04507f5'}}
================================== Ai Message ==================================

The exchange rate from US dollars to Swedish krona is 1 USD to 11.0159 SEK.

```

```python
step 2: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-d189-6a77-8002-5dbe79e2ce58'}}
================================= Tool Message =================================
Name: get_exchange_rate

{"amount": 1.0, "base": "USD", "date": "2024-11-14", "rates": {"SEK": 11.0159}}

```

```python
step 1: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-cc7f-6d68-8001-1f6b5e57c456'}}
================================== Ai Message ==================================
Tool Calls:
 get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
 Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
 Args:
 currency_from: USD
 currency_to: SEK

```

```python
step 0: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-c2e4-6f3c-8000-477fd654cb53'}}
================================ Human Message =================================

What is the exchange rate from US dollars to Swedish currency?

```

#### Get the configuration of a step

To get an earlier checkpoint, specify the `checkpoint_id` (and
`checkpoint_ns`). First, rewind to step 1, when the tool call was generated:

```python
snapshot_config = {}
for state_snapshot in agent.get_state_history(
 config={"configurable": {"thread_id": "human-in-the-loop-deepdive"}},
):
 if state_snapshot["metadata"]["step"] == 1:
 snapshot_config = state_snapshot["config"]
 break

print(snapshot_config)

```

The output will look similar to the following:

```python
{'configurable': {'thread_id': 'human-in-the-loop-deepdive',
 'checkpoint_ns': '',
 'checkpoint_id': '1efa2e95-cc7f-6d68-8001-1f6b5e57c456'}}

```

### Time travel

To get a checkpoint, the method `.get_state` can be used:

```python
# By default, it gets the latest state [unless (checkpoint_ns, checkpoint_id) is specified]
state = agent.get_state(config={"configurable": {
 "thread_id": "human-in-the-loop-deepdive",
}})

print(f'step {state["metadata"]["step"]}: {state["config"]}')
state["values"]["messages"][-1].pretty_print()

```

By default it gets the latest checkpoint (by timestamp). The output will look
similar to the following:

```python
step 3: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-ded5-67e0-8003-2d34e04507f5'}}
================================== Ai Message ==================================

The exchange rate from US dollars to Swedish krona is 1 USD to 11.0159 SEK.

```

#### Get the checkpoint of a configuration

For a given configuration (e.g. `snapshot_config` from the [configuration of a step](#get-step-configuration)),
you can get the corresponding checkpoint:

```python
state = agent.get_state(config=snapshot_config)
print(f'step {state["metadata"]["step"]}: {state["config"]}')
state["values"]["messages"][-1].pretty_print()

```

The output will look similar to the following:

```python
step 1: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-cc7f-6d68-8001-1f6b5e57c456'}}
================================== Ai Message ==================================
Tool Calls:
 get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
 Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
 Args:
 currency_from: USD
 currency_to: SEK

```

### Replay

To replay from a given state, pass the state configuration (i.e. `state["config"]`)
to the agent. The state configuration is a dict that looks like the following:

```python
{'configurable': {'thread_id': 'human-in-the-loop-deepdive',
 'checkpoint_ns': '',
 'checkpoint_id': '1efa2e95-cc7f-6d68-8001-1f6b5e57c456'}}

```

To replay from `state["config"]` (where a tool call was generated), specify
`None` in the input:

```python
for state_values in agent.stream_query(
 input=None, # resume
 stream_mode="values",
 config=state["config"],
):
 langchain_load(state_values["messages"][-1]).pretty_print()

```

It will result in something similar to the following sequence of outputs:

```python
================================== Ai Message ==================================
Tool Calls:
 get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
 Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
 Args:
 currency_from: USD
 currency_to: SEK

```

```python
================================= Tool Message =================================
Name: get_exchange_rate

{"amount": 1.0, "base": "USD", "date": "2024-11-14", "rates": {"SEK": 11.0159}}

```

```python
================================== Ai Message ==================================

The exchange rate from US dollars to Swedish krona is 1 USD to 11.0159 SEK.

```

### Branching

You can branch off previous checkpoints to try alternate scenarios by using the
`.update_state` method:

```python
branch_config = agent.update_state(
 config=state["config"],
 values={"messages": [last_message]}, # the update we want to make
)

print(branch_config)

```

The output will look similar to the following:

```python
{'configurable': {'thread_id': 'human-in-the-loop-deepdive',
 'checkpoint_ns': '',
 'checkpoint_id': '1efa2e96-0560-62ce-8002-d1bb48a337bc'}}

```

**Note:** `branch_config` has a different checkpoint\_id from `state["config"]` due
to `.update_state`

We can query the agent with `branch_config` to resume from the checkpoint with
the updated state:

```python
for state_values in agent.stream_query(
 input=None, # resume
 stream_mode="values",
 config=branch_config,
):
 langchain_load(state_values["messages"][-1]).pretty_print()

```

It will result in something similar to the following sequence of outputs:

```python
================================== Ai Message ==================================
Tool Calls:
 get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
 Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
 Args:
 currency_date: 2024-09-01
 currency_from: USD
 currency_to: SEK

```

```python
================================= Tool Message =================================
Name: get_exchange_rate

{"amount": 1.0, "base": "USD", "date": "2024-08-30", "rates": {"SEK": 10.2241}}

```

```python
================================== Ai Message ==================================

The exchange rate from US dollars to Swedish krona on 2024-08-30 was 1 USD to 10.2241 SEK.

```

## What's next

- [Use an agent](../use.md).
- [Evaluate an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/evaluate).
- [Manage deployed agents](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).