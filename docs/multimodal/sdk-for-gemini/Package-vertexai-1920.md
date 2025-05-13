---
title: Package-vertexai-1920google.com/vertex-ai/generative-ai/docs/multimodal/sdk-for-gemini/gemini-sdk-overview
date_scraped: 2025-05-12
---

# Package vertexai (1.92.0) 

API documentation for `vertexai` package.

## Packages

### [generative\_models](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.generative_models)

API documentation for `generative_models` package.

### [language\_models](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.language_models)

API documentation for `language_models` package.

### [preview](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.preview)

API documentation for `preview` package.

### [vision\_models](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.vision_models)

API documentation for `vision_models` package.

### [evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.evaluation)

API documentation for `evaluation` package.

### [resources](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.resources)

API documentation for `resources` package.

## Packages Functions

### init

```python
init(
 *,
 project: typing.Optional[str] = None,
 location: typing.Optional[str] = None,
 experiment: typing.Optional[str] = None,
 experiment_description: typing.Optional[str] = None,
 experiment_tensorboard: typing.Optional[
 typing.Union[
 str,
 google.cloud.aiplatform.tensorboard.tensorboard_resource.Tensorboard,
 bool,
 ]
 ] = None,
 staging_bucket: typing.Optional[str] = None,
 credentials: typing.Optional[google.auth.credentials.Credentials] = None,
 encryption_spec_key_name: typing.Optional[str] = None,
 network: typing.Optional[str] = None,
 service_account: typing.Optional[str] = None,
 api_endpoint: typing.Optional[str] = None,
 api_key: typing.Optional[str] = None,
 api_transport: typing.Optional[str] = None,
 request_metadata: typing.Optional[typing.Sequence[typing.Tuple[str, str]]] = None
)
```

Updates common initialization parameters with provided options.

| **Parameters** | |
| --- | --- |
| **Name** | **Description** |
| `project` | The default project to use when making API calls. |
| `location` | The default location to use when making API calls. If not set defaults to us-central-1. |
| `experiment` | Optional. The experiment name. |
| `experiment_description` | Optional. The description of the experiment. |
| `experiment_tensorboard` | Optional. The Vertex AI TensorBoard instance, Tensorboard resource name, or Tensorboard resource ID to use as a backing Tensorboard for the provided experiment. Example tensorboard resource name format: "projects/123/locations/us-central1/tensorboards/456" If `experiment_tensorboard` is provided and `experiment` is not, the provided `experiment_tensorboard` will be set as the global Tensorboard. Any subsequent calls to aiplatform.init() with `experiment` and without `experiment_tensorboard` will automatically assign the global Tensorboard to the `experiment`. If `experiment_tensorboard` is ommitted or set to `True` or `None` the global Tensorboard will be assigned to the `experiment`. If a global Tensorboard is not set, the default Tensorboard instance will be used, and created if it does not exist. To disable creating and using Tensorboard with `experiment`, set `experiment_tensorboard` to `False`. Any subsequent calls to aiplatform.init() should include this setting as well. |
| `staging_bucket` | The default staging bucket to use to stage artifacts when making API calls. In the form gs://... |
| `credentials` | The default custom credentials to use when making API calls. If not provided credentials will be ascertained from the environment. |
| `encryption_spec_key_name` | Optional. The Cloud KMS resource identifier of the customer managed encryption key used to protect a resource. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. The key needs to be in the same region as where the compute resource is created. If set, this resource and all sub-resources will be secured by this key. |
| `network` | Optional. The full name of the Compute Engine network to which jobs and resources should be peered. E.g. "projects/12345/global/networks/myVPC". Private services access must already be configured for the network. If specified, all eligible jobs and resources created will be peered with this VPC. |
| `service_account` | Optional. The service account used to launch jobs and deploy models. Jobs that use service\_account: BatchPredictionJob, CustomJob, PipelineJob, HyperparameterTuningJob, CustomTrainingJob, CustomPythonPackageTrainingJob, CustomContainerTrainingJob, ModelEvaluationJob. |
| `api_endpoint` | Optional. The desired API endpoint, e.g., us-central1-aiplatform.googleapis.com |
| `api_key` | Optional. The API key to use for service calls. NOTE: Not all services support API keys. |
| `api_transport` | Optional. The transport method which is either 'grpc' or 'rest'. NOTE: "rest" transport functionality is currently in a beta state (preview). |