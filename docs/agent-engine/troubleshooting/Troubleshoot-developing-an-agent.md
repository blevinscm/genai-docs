---
title: Troubleshoot-developing-an-agentgoogle.com/vertex-ai/generative-ai/docs/agent-engine/troubleshooting/develop
date_scraped: 2025-05-12
---

# Troubleshoot developing an agent 

This document describes how to resolve errors that you might encounter when
[developing an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/overview).

## Content generation errors

**Issue**:

You receive an error message similar to the following:

```python
ValueError: Cannot get the Candidate text.
Response candidate content part has no text.

```

**Possible cause**:

This error might be caused by using a version of `langchain-google-vertexai`
that's not compatible with `google-cloud-aiplatform`. Version `1.0.2` or later
of `langchain-google-vertexai` is required. To check which version you're using,
run the following command in your terminal:

```python
pip show langchain-google-vertexai
```

**Recommended solution**:

Install version `1.0.2` of `langchain-google-vertexai`. This version includes
the [LangChain tool-calling](https://github.com/langchain-ai/langchain-google/pull/166)
updates that are required to work with `google-cloud-aiplatform`. To update your
version of `langchain-google-vertexai`, run the following command in your
terminal:

```python
pip install langchain-google-vertexai --upgrade
```

After running the update command, verify that you're using version `1.0.2` or
later by running the following command in your terminal:

```python
pip show langchain-google-vertexai
```

If you're in a notebook instance (for example, Jupyter or Colab or Workbench),
you might need to restart your runtime to use the updated packages.