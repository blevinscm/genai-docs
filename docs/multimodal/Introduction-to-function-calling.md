---
title: Introduction-to-function-calling`
- Details or instructions on how and when to use the functions-for example, `Don't make assumptions on the departure or destination airports. Always use a future date for the departure or destination time.`
- Instructions to ask clarifying questions if user queries are ambiguous-for example, `Ask clarifying questions if not enough information is available.`

### Generation configuration

For the temperature parameter, use `0` or another low value. This instructs
the model to generate more confident results and reduces hallucinations.

### API invocation

If the model proposes the invocation of a function that would send an order,
update a database, or otherwise have significant consequences, validate the
function call with the user before executing it.

## Pricing

The pricing for function calling is based on the number of characters within the
text inputs and outputs. To learn more, see
[Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing).

Here, text input (prompt)
refers to the user prompt for the current conversation turn, the function
declarations for the current conversation turn, and the history of the
conversation. The history of the conversation includes the queries, the function
calls, and the function responses of previous conversation turns.
Vertex AI truncates the history of the conversation at 32,000 characters.

Text output (response) refers to the function calls and the text responses
for the current conversation turn.

## What's next

- See the [API reference for function calling](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/function-calling).
- Learn about [Vertex AI extensions](https://cloud.google.com/vertex-ai/generative-ai/docs/extensions/overview).
- Learn about [LangChain on Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/reasoning-engine/overview).