---
date_scraped: 2025-05-12
title: Troubleshoot Setting Up An Environment
---

# Troubleshoot setting up an environment 

This document describes how to resolve errors that you might encounter when
[setting up an environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up).

## Errors when importing the Vertex AI SDK for Python

If you can't import the Vertex AI SDK for Python, it might be caused by one of the
following issues:

### Outdated version of the Vertex AI SDK for Python

**Issue**:

You receive an error message similar to the following:

```python
ImportError: cannot import name 'reasoning_engines' from 'vertexai.preview'

```

or

```python
ImportError: cannot import name 'agent_angines' from 'vertexai'

```

**Possible cause**:

This might happen if the version of your `google-cloud-aiplatform` package
is earlier than `1.82.0` (for `agent_engines`) or `1.47.0`
(for `reasoning_engines`). To check the version of your `google-cloud-aiplatform`
package, run the following command in the terminal:

```python
pip show google-cloud-aiplatform
```

**Recommended solution**:

Run the following command in your terminal to update your
`google-cloud-aiplatform` package:

```python
pip install google-cloud-aiplatform --upgrade
```

Verify your updated version is `1.82.0` or later by running the following command:

```python
pip show google-cloud-aiplatform
```

If you're in a notebook instance (For example, Jupyter or Colab or Workbench),
you might need to restart your runtime to use the updated packages.