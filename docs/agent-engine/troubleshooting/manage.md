---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/troubleshooting/manage
title: Troubleshoot Managing Deployed Agents Bookmark Borderbookmark
---

# Troubleshoot managing deployed agents bookmark\_borderbookmark 

This document describes how to resolve errors that you might encounter when
[managing deployed agents](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage/overview).

## Error when filtering the list of agents

**Issue**:

You receive an error message similar to the following:

See more code actions.

Light code theme

Dark code theme

```python
InvalidArgument: 400 Provided filter is not valid.

```

**Possible cause**:

Your filter isn't formatted properly.

**Recommended solution**:

Update the formatting of your filter so it's formatted correctly. For example,
you might be using the following to filter by display name. This filter isn't
formatted correctly because it's missing quotation marks:

See more code actions.

Light code theme

Dark code theme

```python
from vertexai import agent_engines

agent_engines.list(filter=f'display_name={DISPLAY_NAME}')

```

In this case, enclose `{DISPLAY_NAME}` in double-quotation marks:

```python
from vertexai import agent_engines

agent_engines.list(filter=f'display_name="{DISPLAY_NAME}"')

```

Was this helpful?