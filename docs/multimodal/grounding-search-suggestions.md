---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/grounding-search-suggestions#behavior_on_tap
title: Use Google Search Suggestionsbookmark_borderbookmarkstay Organized With Collectionssave
  And Categori
---

# Use Google Search suggestions bookmark\_borderbookmark 

When you use grounding with Google Search, and you receive
Search suggestions in your response, you must display the
Search suggestions in production and in your applications.

For more information on grounding with Google Search, see
[Grounding with Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search).

Specifically, you must display the search queries that are included in the
grounded response's metadata. The response includes:

- **`"content"`**: LLM-generated response.
- **`"webSearchQueries"`**: The queries to be used for
 Search suggestions.

For example, in the following code snippet, Gemini responds to a
Search grounded prompt, which is asking about a type of
tropical plant.

```python
"predictions": [
 {
 "content": "Monstera is a type of vine that thrives in bright indirect light…",
 "groundingMetadata": {
 "webSearchQueries": ["What's a monstera?"],
 }
 }
]

```

You can take this output, and display it by using Search
suggestions.

## Requirements for Search suggestions

The following are requirements for suggestions:

| **Requirement** | **Description** |
| --- | --- |
| Do | - While complying with the [display requirements](#display-requirements), the Search suggestion is displayed exactly as provided without any changes. - When you interact with the Search suggestion, you are taken directly to the Search results page (SRP). |
| Don't | - Include any screens or additional steps between the user's tap and the display of the SRP. - Display any other search results or suggestions next to the Search suggestion or the associated grounded LLM response. |

### Display requirements

The following are the display requirements:

- Display the Search suggestion exactly as provided, and
 don't make any modifications to colors, fonts, or appearance. Ensure the
 Search suggestion renders as specified in the following
 mocks such as light and dark mode:

- Whenever a grounded response is shown, its corresponding
 Search suggestion should remain visible.
- For branding, you must strictly follow Google's guidelines for third-party use
 of Google brand features at the [Welcome to our Brand Resource
 Center](https://about.google/brand-resource-center/).
- When you use grounding with Search,
 Search suggestion chips display. The field that contains
 the suggestion chips must be the same width as the grounded response from the
 LLM.

### Behavior on tap

When a user taps the chip, they are taken directly to a
Search results page (SRP) for the search term displayed in
the chip. The SRP can open either within your in-application browser or in a
separate browser application. It's important to not minimize, remove, or
obstruct the SRP's display in any way. The following animated mockup illustrates
the tap-to-SRP interaction.

## Code to implement a Search suggestion

When you use the API to ground a response to search, the model response provides
compliant HTML and CSS styling in the `renderedContent` field, which you
implement to display Search suggestions in your
application. To see an example of the API response, see the response section in
[Grounding with Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search#considerations).

**Note:** The provided HTML and CSS provided in the API response automatically
adapts to your device settings, displaying in either light or dark mode
based on the your preference indicated by `@media(prefers-color-scheme)`.

## What's next

- Learn how to [send chat prompt requests](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/send-chat-prompts-gemini).
- Learn about [responsible AI best practices and Vertex AI safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).

Was this helpful?