---
title: Class-TextGenerationModel-1920google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.language_models.TextGenerationModel
date_scraped: 2025-05-12
---

# Class TextGenerationModel (1.92.0) 

```python
TextGenerationModel(model_id: str, endpoint_name: typing.Optional[str] = None)
```

Creates a LanguageModel.

This constructor should not be called directly.
Use `LanguageModel.from_pretrained(model_name=...)` instead.

## Methods

### batch\_predict

```python
batch_predict(
 *,
 dataset: typing.Union[str, typing.List[str]],
 destination_uri_prefix: str,
 model_parameters: typing.Optional[typing.Dict] = None
) -> google.cloud.aiplatform.jobs.BatchPredictionJob
```

Starts a batch prediction job with the model.

| **Exceptions** | |
| --- | --- |
| **Type** | **Description** |
| `ValueError` | When source or destination URI is not supported. |

### from\_pretrained

```python
from_pretrained(model_name: str) -> vertexai._model_garden._model_garden_models.T
```

Loads a \_ModelGardenModel.

| **Exceptions** | |
| --- | --- |
| **Type** | **Description** |
| `ValueError` | If model\_name is unknown. |
| `ValueError` | If model does not support this class. |

### get\_tuned\_model

```python
get_tuned_model(
 tuned_model_name: str,
) -> vertexai.language_models._language_models._LanguageModel
```

Loads the specified tuned language model.

### list\_tuned\_model\_names

```python
list_tuned_model_names() -> typing.Sequence[str]
```

Lists the names of tuned models.

### predict

```python
predict(
 prompt: str,
 *,
 max_output_tokens: typing.Optional[int] = 128,
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
 ] = None,
 logprobs: typing.Optional[int] = None,
 presence_penalty: typing.Optional[float] = None,
 frequency_penalty: typing.Optional[float] = None,
 logit_bias: typing.Optional[typing.Dict[str, float]] = None,
 seed: typing.Optional[int] = None
) -> vertexai.language_models.MultiCandidateTextGenerationResponse
```

Gets model response for a single prompt.

### predict\_async

```python
predict_async(
 prompt: str,
 *,
 max_output_tokens: typing.Optional[int] = 128,
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
 ] = None,
 logprobs: typing.Optional[int] = None,
 presence_penalty: typing.Optional[float] = None,
 frequency_penalty: typing.Optional[float] = None,
 logit_bias: typing.Optional[typing.Dict[str, float]] = None,
 seed: typing.Optional[int] = None
) -> vertexai.language_models.MultiCandidateTextGenerationResponse
```

Asynchronously gets model response for a single prompt.

### predict\_streaming

```python
predict_streaming(
 prompt: str,
 *,
 max_output_tokens: int = 128,
 temperature: typing.Optional[float] = None,
 top_k: typing.Optional[int] = None,
 top_p: typing.Optional[float] = None,
 stop_sequences: typing.Optional[typing.List[str]] = None,
 logprobs: typing.Optional[int] = None,
 presence_penalty: typing.Optional[float] = None,
 frequency_penalty: typing.Optional[float] = None,
 logit_bias: typing.Optional[typing.Dict[str, float]] = None,
 seed: typing.Optional[int] = None
) -> typing.Iterator[vertexai.language_models.TextGenerationResponse]
```

Gets a streaming model response for a single prompt.

The result is a stream (generator) of partial responses.

### predict\_streaming\_async

```python
predict_streaming_async(
 prompt: str,
 *,
 max_output_tokens: int = 128,
 temperature: typing.Optional[float] = None,
 top_k: typing.Optional[int] = None,
 top_p: typing.Optional[float] = None,
 stop_sequences: typing.Optional[typing.List[str]] = None,
 logprobs: typing.Optional[int] = None,
 presence_penalty: typing.Optional[float] = None,
 frequency_penalty: typing.Optional[float] = None,
 logit_bias: typing.Optional[typing.Dict[str, float]] = None,
 seed: typing.Optional[int] = None
) -> typing.AsyncIterator[vertexai.language_models.TextGenerationResponse]
```

Asynchronously gets a streaming model response for a single prompt.

The result is a stream (generator) of partial responses.

### tune\_model

```python
tune_model(
 training_data: typing.Union[str, pandas.core.frame.DataFrame],
 *,
 train_steps: typing.Optional[int] = None,
 learning_rate_multiplier: typing.Optional[float] = None,
 tuning_job_location: typing.Optional[str] = None,
 tuned_model_location: typing.Optional[str] = None,
 model_display_name: typing.Optional[str] = None,
 tuning_evaluation_spec: typing.Optional[
 vertexai.language_models.TuningEvaluationSpec
 ] = None,
 accelerator_type: typing.Optional[typing.Literal["TPU", "GPU"]] = None,
 max_context_length: typing.Optional[str] = None
) -> vertexai.language_models._language_models._LanguageModelTuningJob
```

Tunes a model based on training data.

This method launches and returns an asynchronous model tuning job.
Usage:

```python
tuning_job = model.tune_model(...)
... do some other work
tuned_model = tuning_job.get_tuned_model() # Blocks until tuning is complete

```

| **Exceptions** | |
| --- | --- |
| **Type** | **Description** |
| `ValueError` | If the "tuning\_job\_location" value is not supported |
| `ValueError` | If the "tuned\_model\_location" value is not supported |
| `RuntimeError` | If the model does not support tuning |

### tune\_model\_rlhf

```python
tune_model_rlhf(
 *,
 prompt_data: typing.Union[str, pandas.core.frame.DataFrame],
 preference_data: typing.Union[str, pandas.core.frame.DataFrame],
 model_display_name: typing.Optional[str] = None,
 prompt_sequence_length: typing.Optional[int] = None,
 target_sequence_length: typing.Optional[int] = None,
 reward_model_learning_rate_multiplier: typing.Optional[float] = None,
 reinforcement_learning_rate_multiplier: typing.Optional[float] = None,
 reward_model_train_steps: typing.Optional[int] = None,
 reinforcement_learning_train_steps: typing.Optional[int] = None,
 kl_coeff: typing.Optional[float] = None,
 default_context: typing.Optional[str] = None,
 tuning_job_location: typing.Optional[str] = None,
 accelerator_type: typing.Optional[typing.Literal["TPU", "GPU"]] = None,
 tuning_evaluation_spec: typing.Optional[
 vertexai.language_models.TuningEvaluationSpec
 ] = None
) -> vertexai.language_models._language_models._LanguageModelTuningJob
```

Tunes a model using reinforcement learning from human feedback.

This method launches and returns an asynchronous model tuning job.
Usage:

```python
tuning_job = model.tune_model_rlhf(...)
... do some other work
tuned_model = tuning_job.get_tuned_model() # Blocks until tuning is complete

```

| **Exceptions** | |
| --- | --- |
| **Type** | **Description** |
| `ValueError` | If the "tuning\_job\_location" value is not supported |
| `RuntimeError` | If the model does not support tuning |