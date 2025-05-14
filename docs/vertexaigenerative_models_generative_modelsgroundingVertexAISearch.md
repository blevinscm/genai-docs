---
date_scraped: 2025-05-12
title: Class Grounding 1920
---

# Class grounding (1.92.0) 

```python
grounding()
```

Grounding namespace.

## Classes

### DynamicRetrievalConfig

```python
DynamicRetrievalConfig(
 mode: google.cloud.aiplatform_v1beta1.types.tool.DynamicRetrievalConfig.Mode = Mode.MODE_UNSPECIFIED,
 dynamic_threshold: typing.Optional[float] = None,
)
```

Config for dynamic retrieval.

### GoogleSearchRetrieval

```python
GoogleSearchRetrieval(
 dynamic_retrieval_config: typing.Optional[
 vertexai.generative_models._generative_models.grounding.DynamicRetrievalConfig
 ] = None,
)
```

Tool to retrieve public web data for grounding, powered by
Google Search.

### Retrieval

```python
Retrieval(
 source: vertexai.generative_models._generative_models.grounding.VertexAISearch,
 disable_attribution: typing.Optional[bool] = None,
)
```

Defines a retrieval tool that model can call to access external knowledge.

### VertexAISearch

```python
VertexAISearch(
 datastore: str,
 *,
 project: typing.Optional[str] = None,
 location: typing.Optional[str] = None
)
```

Retrieve from Vertex AI Search data store for grounding.
See <https://cloud.google.com/products/agent-builder>