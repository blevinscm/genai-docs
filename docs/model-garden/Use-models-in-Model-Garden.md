---
date_scraped: 2025-05-12
title: Use Models In Model Garden
---

# Use models in Model Garden 

Discover, test, tune, and deploy models by using Model Garden in the
Google Cloud console. You can also deploy Model Garden models by using the
Google Cloud CLI.

## Send test prompts

1. In the Google Cloud console, go to the **Model Garden** page.

 [Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
2. Find a supported model that you want to test and click **View details**.
3. Click **Open prompt design**.

 You're taken to the **Prompt design** page.
4. In **Prompt**, enter the prompt that you want to test.
5. Optional: Configure the model parameters.
6. Click **Submit**.

## Tune a model

1. In the Google Cloud console, go to the **Model Garden** page.

 [Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
2. In **Search models**, enter **BERT** or **T5-FLAN**, then click the
 magnifying glass to search.
3. Click **View details** on the **T5-FLAN** or the **BERT** model card.
4. Click **Open fine-tuning pipeline**.

 You're taken to the Vertex AI pipelines page.
5. To start tuning, click **Create run**.

### Tune in a notebook

The model cards for most open source foundation models and fine-tunable
models support tuning in a notebook.

1. In the Google Cloud console, go to the **Model Garden** page.

 [Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
2. Find a supported model that you want to tune and go to its model card.
3. Click **Open notebook**.

## Deploy an open model

You can deploy a model by using its model card in the Google Cloud console or
programmatically.

For more information about setting up the Google Gen AI SDK or Google Cloud CLI,
see the [Google Gen AI SDK](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview) overview or [Install the
Google Cloud CLI](https://cloud.google.com/sdk/docs/install).

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

1. List the models that you can deploy and record the model ID to deploy. You can optionally list the supported
 Hugging Face models in Model Garden and even filter them by model names.
 The output doesn't include any tuned models.

 ```python

 import vertexai
 from vertexai.preview import model_garden

 # TODO(developer): Update and un-comment below lines
 # PROJECT_ID = "your-project-id"
 vertexai.init(project=PROJECT_ID, location="us-central1")

 # List deployable models, optionally list Hugging Face models only or filter by model name.
 deployable_models = model_garden.list_deployable_models(list_hf_models=False, model_filter="gemma")
 print(deployable_models)
 # Example response:
 # ['google/gemma2@gemma-2-27b','google/gemma2@gemma-2-27b-it', ...]

 ```
2. View the deployment specifications for a model by using the model ID
 from the previous step. You can view the
 machine type, accelerator type, and container image URI that Model Garden
 has verified for a particular model.

 ```python

 import vertexai
 from vertexai.preview import model_garden

 # TODO(developer): Update and un-comment below lines
 # PROJECT_ID = "your-project-id"
 # model = "google/gemma3@gemma-3-1b-it"
 vertexai.init(project=PROJECT_ID, location="us-central1")

 # For Hugging Face modelsm the format is the Hugging Face model name, as in
 # "meta-llama/Llama-3.3-70B-Instruct".
 # Go to https://console.cloud.google.com/vertex-ai/model-garden to find all deployable
 # model names.

 model = model_garden.OpenModel(model)
 deploy_options = model.list_deploy_options()
 print(deploy_options)
 # Example response:
 # [
 # dedicated_resources {
 # machine_spec {
 # machine_type: "g2-standard-12"
 # accelerator_type: NVIDIA_L4
 # accelerator_count: 1
 # }
 # }
 # container_spec {
 # ...
 # }
 # ...
 # ]

 ```
3. Deploy a model to an endpoint. Model Garden uses the default
 deployment configuration unless you specify additional argument and values.

 ```python

 import vertexai
 from vertexai.preview import model_garden

 # TODO(developer): Update and un-comment below lines
 # PROJECT_ID = "your-project-id"
 vertexai.init(project=PROJECT_ID, location="us-central1")

 open_model = model_garden.OpenModel("google/gemma3@gemma-3-12b-it")
 endpoint = open_model.deploy(
 machine_type="g2-standard-48",
 accelerator_type="NVIDIA_L4",
 accelerator_count=4,
 accept_eula=True,
 )

 # Optional. Run predictions on the deployed endoint.
 # endpoint.predict(instances=[{"prompt": "What is Generative AI?"}])

 ```

### gcloud

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

Before you begin, specify a quota project to run the following commands. The
commands you run are counted against the quotas for that project. For more
information, see [Set the quota project](https://cloud.google.com/docs/quotas/set-quota-project).

1. List the models that you can deploy by running the `gcloud beta ai
 model-garden models list` command. This command lists all model IDs and
 which ones you can self deploy.

 ```python
 gcloud beta ai model-garden models list

 ```

 In the output, find the model ID to deploy. The following example shows an
 abbreviated output.

 ```python
 MODEL_ID SUPPORTS_DEPLOYMENT
 google/gemma2@gemma-2-27b Yes
 google/gemma2@gemma-2-27b-it Yes
 google/gemma2@gemma-2-2b Yes
 google/gemma2@gemma-2-2b-it Yes
 google/gemma2@gemma-2-9b Yes
 google/gemma2@gemma-2-9b-it Yes
 google/gemma@gemma-1.1-2b-it Yes
 google/gemma@gemma-1.1-2b-it-gg-hf Yes
 google/gemma@gemma-1.1-7b-it Yes
 google/gemma@gemma-1.1-7b-it-gg-hf Yes
 google/gemma@gemma-2b Yes
 google/gemma@gemma-2b-gg-hf Yes
 google/gemma@gemma-2b-it Yes
 google/gemma@gemma-2b-it-gg-hf Yes
 google/gemma@gemma-7b Yes
 google/gemma@gemma-7b-gg-hf Yes
 google/gemma@gemma-7b-it Yes
 google/gemma@gemma-7b-it-gg-hf Yes

 ```

 The output doesn't include any tuned models or Hugging Face models.
 To view which Hugging Face models are supported, add the
 `--list-supported-hugging-face-models` flag.
2. To view the deployment specifications for a model, run the `gcloud beta ai
 model-garden models list-deployment-config` command. You can view the machine
 type, accelorator type, and container image URI that Model Garden
 supports for a particular model.

 ```python
 gcloud beta ai model-garden models list-deployment-config \
 --model=MODEL_ID

 ```

 Replace MODEL\_ID with the model ID from the previous list
 command, such as `google/gemma@gemma-2b` or
 `stabilityai/stable-diffusion-xl-base-1.0`.
3. Deploy a model to an endpoint by running the `gcloud beta ai model-garden
 models deploy` command. Model Garden generates a display name for
 your endpoint and uses the default deployment configuration unless you
 specify additional argument and values.

 To run the command asynchronously, include the `--asynchronous` flag.

 ```python
 gcloud beta ai model-garden models deploy \
 --model=MODEL_ID \
 [--machine-type=MACHINE_TYPE] \
 [--accelerator-type=ACCELERATOR_TYPE] \
 [--endpoint-display-name=ENDPOINT_NAME] \
 [--hugging-face-access-token=HF_ACCESS_TOKEN] \
 [--reservation-affinity reservation-affinity-type=any-reservation] \
 [--reservation-affinity reservation-affinity-type=specific-reservation, key="compute.googleapis.com/reservation-name", values=RESERVATION_RESOURCE_NAME] \
 [--asynchronous]

 ```

 Replace the following placeholders:

 - MODEL\_ID: The model ID from the previous list command. For
 Hugging Face models, use the Hugging Face model URL format, such as
 `stabilityai/stable-diffusion-xl-base-1.0`.
 - MACHINE\_TYPE: Defines the set of resources to deploy for your
 model, such as `g2-standard-4`.
 - ACCELERATOR\_TYPE: Specifies accelerators to add to your
 deployment to help improve performance when working with intensive
 workloads, such as `NVIDIA_L4`.
 - ENDPOINT\_NAME: A name for the deployed Vertex AI
 endpoint.
 - HF\_ACCESS\_TOKEN: For Hugging Face models, if the model is
 gated, provide an [access token](https://huggingface.co/docs/hub/en/security-tokens).
 - RESERVATION\_RESOURCE\_NAME: To use a specific
 [Compute Engine reservation](https://cloud.google.com/vertex-ai/docs/predictions/use-reservations), specify the name of your
 reservation. If you specify a specific reservation, you can't specify
 `any-reservation`.

 The output includes the deployment configuration that Model Garden
 used, the endpoint ID, and the deployment operation ID, which you can use
 to check the deployment status.

 ```python
 Using the default deployment configuration:
 Machine type: g2-standard-12
 Accelerator type: NVIDIA_L4
 Accelerator count: 1

 The project has enough quota. The current usage of quota for accelerator type NVIDIA_L4 in region us-central1 is 0 out of 28.

 Deploying the model to the endpoint. To check the deployment status, you can try one of the following methods:
 1) Look for endpoint `ENDPOINT_DISPLAY_NAME` at the [Vertex AI] -> [Online prediction] tab in Cloud Console
 2) Use `gcloud ai operations describe OPERATION_ID --region=LOCATION` to find the status of the deployment long-running operation

 ```
4. To see details about your deployment, run the `gcloud beta ai endpoints list
 --list-model-garden-endpoints-only` command:

 ```python
 gcloud beta ai endpoints list --list-model-garden-endpoints-only \
 --region=LOCATION_ID

 ```

 Replace LOCATION\_ID with the region where you deployed the
 model.

 The output includes all endpoints that were created from
 Model Garden and includes information such as the endpoint ID,
 endpoint name, and whether the endpoint is associated with a deployed model.
 To find your deployment, look for the endpoint name that was returned from
 the previous command.

### REST

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

List all deployable models and then get the ID of the model to deploy. You can
then deploy the model with its default configuration and endpoint. Or, you can
choose to customize your deployment, such as setting a specific machine type or
using a dedicated endpoint.

### 1. List models that you can deploy

Before using any of the request data,
make the following replacements:

- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- QUERY\_PARAMETERS: To list Model Garden
 models, add the following query parameters
 `listAllVersions=True&filter=is_deployable(true)`. To list
 Hugging Face models, set the filter to
 `alt=json&is_hf_wildcard(true)+AND+labels.VERIFIED_DEPLOYMENT_CONFIG%3DVERIFIED_DEPLOYMENT_SUCCEED&listAllVersions=True`.

HTTP method and URL:

```python
GET https://us-central1-aiplatform.googleapis.com/v1beta1/publishers/*/models?QUERY_PARAMETERS
```

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```python
curl -X GET \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "x-goog-user-project: PROJECT_ID" \ 
 "https://us-central1-aiplatform.googleapis.com/v1beta1/publishers/*/models?QUERY_PARAMETERS"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred"; "x-goog-user-project" = "PROJECT_ID" } 
 
Invoke-WebRequest ` 
 -Method GET ` 
 -Headers $headers ` 
 -Uri "https://us-central1-aiplatform.googleapis.com/v1beta1/publishers/*/models?QUERY_PARAMETERS" | Select-Object -Expand Content
```

You receive a JSON response similar to the following.

```python
{
 "publisherModels": [
 {
 "name": "publishers/google/models/gemma3",
 "versionId": "gemma-3-1b-it",
 "openSourceCategory": "GOOGLE_OWNED_OSS_WITH_GOOGLE_CHECKPOINT",
 "supportedActions": {
 "openNotebook": {
 "references": {
 "us-central1": {
 "uri": "https://colab.research.google.com/github/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/community/model_garden/model_garden_gradio_streaming_chat_completions.ipynb"
 }
 },
 "resourceTitle": "Notebook",
 "resourceUseCase": "Chat Completion Playground",
 "resourceDescription": "Chat with deployed Gemma 2 endpoints via Gradio UI."
 },
 "deploy": {
 "modelDisplayName": "gemma-3-1b-it",
 "containerSpec": {
 "imageUri": "us-docker.pkg.dev/vertex-ai/vertex-vision-model-garden-dockers/pytorch-vllm-serve:20250312_0916_RC01",
 "args": [
 "python",
 "-m",
 "vllm.entrypoints.api_server",
 "--host=0.0.0.0",
 "--port=8080",
 "--model=gs://vertex-model-garden-restricted-us/gemma3/gemma-3-1b-it",
 "--tensor-parallel-size=1",
 "--swap-space=16",
 "--gpu-memory-utilization=0.95",
 "--disable-log-stats"
 ],
 "env": [
 {
 "name": "MODEL_ID",
 "value": "google/gemma-3-1b-it"
 },
 {
 "name": "DEPLOY_SOURCE",
 "value": "UI_NATIVE_MODEL"
 }
 ],
 "ports": [
 {
 "containerPort": 8080
 }
 ],
 "predictRoute": "/generate",
 "healthRoute": "/ping"
 },
 "dedicatedResources": {
 "machineSpec": {
 "machineType": "g2-standard-12",
 "acceleratorType": "NVIDIA_L4",
 "acceleratorCount": 1
 }
 },
 "publicArtifactUri": "gs://vertex-model-garden-restricted-us/gemma3/gemma3.tar.gz",
 "deployTaskName": "vLLM 128K context",
 "deployMetadata": {
 "sampleRequest": "{\n \"instances\": [\n {\n \"@requestFormat\": \"chatCompletions\",\n \"messages\": [\n {\n \"role\": \"user\",\n \"content\": \"What is machine learning?\"\n }\n ],\n \"max_tokens\": 100\n }\n ]\n}\n"
 }
 },
 ...

```

### 2. Deploy a model

Deploy a model from Model Garden or a model from
Hugging Face. You can also customize the deployment by specifying additional
JSON fields.

#### Deploy a model with its default configuration.

Before using any of the request data,
make the following replacements:

- LOCATION: A region where the
 model is deployed.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_ID: The ID of the model to
 deploy, which you can get from listing all the deployable models. The ID
 uses the following format: publishers/PUBLISHER\_NAME/models/
 MODEL\_NAME@MODEL\_VERSION.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy
```

Request JSON body:

```python
{
 "publisher_model_name": "MODEL_ID",
 "model_config": {
 "accept_eula": "true"
 }
}

```

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
cat > request.json << 'EOF'
{
 "publisher_model_name": "MODEL_ID",
 "model_config": {
 "accept_eula": "true"
 }
}
EOF
```

Then execute the following command to send your REST request:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
@'
{
 "publisher_model_name": "MODEL_ID",
 "model_config": {
 "accept_eula": "true"
 }
}
'@ | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy" | Select-Object -Expand Content
```

You receive a JSON response similar to the following.

```python
{
 "name": "projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
 "metadata": {
 "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.DeployOperationMetadata",
 "genericMetadata": {
 "createTime": "2025-03-13T21:44:44.538780Z",
 "updateTime": "2025-03-13T21:44:44.538780Z"
 },
 "publisherModel": "publishers/google/models/gemma3@gemma-3-1b-it",
 "destination": "projects/PROJECT_ID/locations/LOCATION",
 "projectNumber": "PROJECT_ID"
 }
}

```

#### Deploy a Hugging Face model

Before using any of the request data,
make the following replacements:

- LOCATION: A region where the
 model is deployed.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_ID: The Hugging Face model
 ID model to deploy, which you can get from listing all the deployable
 models. The ID uses the following format:
 PUBLISHER\_NAME/MODEL\_NAME.
- ACCESS\_TOKEN: If the model is
 gated, provide an [access
 token](https://huggingface.co/docs/hub/en/security-tokens).

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy
```

Request JSON body:

```python
{
 "hugging_face_model_id": "MODEL_ID",
 "hugging_face_access_token": "ACCESS_TOKEN",
 "model_config": {
 "accept_eula": "true"
 }
}

```

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
cat > request.json << 'EOF'
{
 "hugging_face_model_id": "MODEL_ID",
 "hugging_face_access_token": "ACCESS_TOKEN",
 "model_config": {
 "accept_eula": "true"
 }
}
EOF
```

Then execute the following command to send your REST request:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
@'
{
 "hugging_face_model_id": "MODEL_ID",
 "hugging_face_access_token": "ACCESS_TOKEN",
 "model_config": {
 "accept_eula": "true"
 }
}
'@ | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy" | Select-Object -Expand Content
```

You receive a JSON response similar to the following.

```python
{
 "name": "projects/PROJECT_ID/locations/us-central1LOCATION/operations/OPERATION_ID",
 "metadata": {
 "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.DeployOperationMetadata",
 "genericMetadata": {
 "createTime": "2025-03-13T21:44:44.538780Z",
 "updateTime": "2025-03-13T21:44:44.538780Z"
 },
 "publisherModel": "publishers/PUBLISHER_NAME/model/MODEL_NAME",
 "destination": "projects/PROJECT_ID/locations/LOCATION",
 "projectNumber": "PROJECT_ID"
 }
}

```

#### Deploy a model with customizations

Before using any of the request data,
make the following replacements:

- LOCATION: A region where the
 model is deployed.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_ID: The ID of the model to
 deploy, which you can get from listing all the deployable models. The ID
 uses the following format: publishers/PUBLISHER\_NAME/models/
 MODEL\_NAME@MODEL\_VERSION, such as
 `google/gemma@gemma-2b` or
 `stabilityai/stable-diffusion-xl-base-1.0`.
- MACHINE\_TYPE: Defines the set
 of resources to deploy for your model, such as `g2-standard-4`.
- ACCELERATOR\_TYPE:
 Specifies accelerators to add to your deployment to help improve performance
 when working with intensive workloads, such as `NVIDIA_L4`
- ACCELERATOR\_COUNT: The
 number of accelerators to use in your deployment.
- `reservation_affinity_type`: To use an existing
 Compute Engine reservation for your deployment, specify any
 reservation or a specific one. If you specify this value, don't specify
 `spot`.
- `spot`: Whether to use spot VMs for your deployment.
- IMAGE\_URI: The location of the
 container image to use, such as
 `us-docker.pkg.dev/vertex-ai/vertex-vision-model-garden-dockers/pytorch-vllm-serve:20241016_0916_RC00_maas`
- CONTAINER\_ARGS: Arguments
 to pass to the container during the deployment.
- CONTAINER\_PORT: A port
 number for your container.
- `fast_tryout_enabled`: When testing a model, you can choose to
 use a faster deployment. This option is available only for the highly-used
 models with certain machine types. If enabled, you cannot specify model or
 deployment configurations.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy
```

Request JSON body:

```python
{
 "publisher_model_name": "MODEL_ID",
 "deploy_config": {
 "dedicated_resources": {
 "machine_spec": {
 "machine_type": "MACHINE_TYPE",
 "accelerator_type": "ACCELERATOR_TYPE",
 "accelerator_count": ACCELERATOR_COUNT,
 "reservation_affinity": {
 "reservation_affinity_type": "ANY_RESERVATION"
 }
 },
 "spot": "false"
 }
 },
 "model_config": {
 "accept_eula": "true",
 "container_spec": {
 "image_uri": "IMAGE_URI",
 "args": [CONTAINER_ARGS ],
 "ports": [
 {
 "container_port": CONTAINER_PORT
 }
 ]
 }
 },
 "deploy_config": {
 "fast_tryout_enabled": false
 },
}

```

To send your request, choose one of these options:

#### curl

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
cat > request.json << 'EOF'
{
 "publisher_model_name": "MODEL_ID",
 "deploy_config": {
 "dedicated_resources": {
 "machine_spec": {
 "machine_type": "MACHINE_TYPE",
 "accelerator_type": "ACCELERATOR_TYPE",
 "accelerator_count": ACCELERATOR_COUNT,
 "reservation_affinity": {
 "reservation_affinity_type": "ANY_RESERVATION"
 }
 },
 "spot": "false"
 }
 },
 "model_config": {
 "accept_eula": "true",
 "container_spec": {
 "image_uri": "IMAGE_URI",
 "args": [CONTAINER_ARGS ],
 "ports": [
 {
 "container_port": CONTAINER_PORT
 }
 ]
 }
 },
 "deploy_config": {
 "fast_tryout_enabled": false
 },
}
EOF
```

Then execute the following command to send your REST request:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy"
```

#### PowerShell

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```python
@'
{
 "publisher_model_name": "MODEL_ID",
 "deploy_config": {
 "dedicated_resources": {
 "machine_spec": {
 "machine_type": "MACHINE_TYPE",
 "accelerator_type": "ACCELERATOR_TYPE",
 "accelerator_count": ACCELERATOR_COUNT,
 "reservation_affinity": {
 "reservation_affinity_type": "ANY_RESERVATION"
 }
 },
 "spot": "false"
 }
 },
 "model_config": {
 "accept_eula": "true",
 "container_spec": {
 "image_uri": "IMAGE_URI",
 "args": [CONTAINER_ARGS ],
 "ports": [
 {
 "container_port": CONTAINER_PORT
 }
 ]
 }
 },
 "deploy_config": {
 "fast_tryout_enabled": false
 },
}
'@ | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION:deploy" | Select-Object -Expand Content
```

You receive a JSON response similar to the following.

```python
{
 "name": "projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
 "metadata": {
 "@type": "type.googleapis.com/google.cloud.aiplatform.v1beta1.DeployOperationMetadata",
 "genericMetadata": {
 "createTime": "2025-03-13T21:44:44.538780Z",
 "updateTime": "2025-03-13T21:44:44.538780Z"
 },
 "publisherModel": "publishers/google/models/gemma3@gemma-3-1b-it",
 "destination": "projects/PROJECT_ID/locations/LOCATION",
 "projectNumber": "PROJECT_ID"
 }
}

```

### Console

1. In the Google Cloud console, go to the **Model Garden** page.

 [Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
2. Find a supported model that you want to deploy, and click its model card.
3. Click **Deploy** to open the **Deploy model** pane.
4. In the **Deploy model** pane, specify details for your deployment.

 1. Use or modify the generated model and endpoint names.
 2. Select a location to create your model endpoint in.
 3. Select a machine type to use for each node of your deployment.
 4. To use a Compute Engine reservation, under the **Deployment
 settings** section, select **Advanced**.

 For the **Reservation type** field, select a reservation type. The
 reservation must match your specified machine specs.

 - **Automatically use created reservation**: Vertex AI
 automatically selects an allowed reservation with matching
 properties. If there's no capacity in the automatically selected
 reservation, Vertex AI uses the general Google Cloud
 resource pool.
 - **Select specific reservations**: Vertex AI uses a specific
 reservation. If there's no capacity for your selected reservation,
 an error is thrown.
 - **Don't use** (default): Vertex AI uses the general
 Google Cloud resource pool. This value has the same effect as
 not specifying a reservation.
5. Click **Deploy**.

## Deploy a partner model and make prediction requests

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

Before you begin, you must have an agreement with the partner. This agreement
includes agreeing to any partner specific terms and licensing requirements and
pricing. For more information or to initiate contact with a partner, see the
partner documentation on their Model Garden model card and click
**Contact sales**.

You must deploy on the partner's required machine types, as described in the
"Recommended hardware configuration" section on their Model Garden
model card. When deployed, the model serving resources are located in a secure
Google-managed project.

**Note:** For self-deploy partner models, if you have sufficient quotas but
encounter serving quota issues during deployment, contact your Google Cloud
account team for assistance.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

In your code, replace the following placeholders:

**Note:** The values for the **machine type**, **accelerator type**, and
**accelerator count**, must all match one of the partner's recommended
configurations. View the partner's Model Garden model card to see the
recommended configurations.

- LOCATION: The region where you plan to deploy the model and
 endpoint.
- PROJECT\_ID: Your project ID.
- DISPLAY\_NAME: A descriptive name for the associated resource.
- PUBLISHER\_NAME: The name of partner that provides the model to
 upload or deploy.
- PUBLISHER\_MODEL\_NAME: The name of the model to upload.
- MACHINE\_TYPE: Defines the set of resources to deploy for your
 model, such as `g2-standard-4`. You must match one of the confirgurations
 provided by the partner.
- ACCELERATOR\_TYPE: Specifies accelerators to add to your deployment
 to help improve performance when working with intensive workloads, such as
 `NVIDIA_L4`. You must match one of the confirgurations provided by the
 partner.
- ACCELERATOR\_COUNT: The number of accelerators to use. You must
 match one of the confirgurations provided by the partner.
- REQUEST\_PAYLOAD: The fields and values to include in your
 prediction request. View the partner's Model Garden model card to
 see the available fields.

```python
from google.cloud import aiplatform

aiplatform.init(project=PROJECT_ID, location=LOCATION)

# Upload a model
model = aiplatform.Model.upload(
 display_name="DISPLAY_NAME_MODEL",
 model_garden_source_model_name = f"publishers/PUBLISHER_NAME/models/PUBLISHER_MODEL_NAME",
)

# Create endpoint
my_endpoint = aiplatform.Endpoint.create(display_name="DISPLAY_NAME_ENDPOINT")

# Deploy model
MACHINE_TYPE = "MACHINE_TYPE" # @param {type: "string"}
ACCELERATOR_TYPE = "ACCELERATOR_TYPE" # @param {type: "string"}
ACCELERATOR_COUNT = ACCELERATOR_COUNT # @param {type: "number"}

model.deploy(
 endpoint=my_endpoint,
 deployed_model_display_name="DISPLAY_NAME_DEPLOYED_MODEL",
 traffic_split={"0": 100},
 machine_type=MACHINE_TYPE,
 accelerator_type=ACCELERATOR_TYPE,
 accelerator_count=ACCELERATOR_COUNT,
 min_replica_count=1,
 max_replica_count=1,
)

# Unary call for predictions
PAYLOAD = {
 REQUEST_PAYLOAD
}

request = json.dumps(PAYLOAD)

response = my_endpoint.raw_predict(
 body = request,
 headers = {'Content-Type':'application/json'}
)

print(response)

# Streaming call for predictions
PAYLOAD = {
 REQUEST_PAYLOAD
}

request = json.dumps(PAYLOAD)

for stream_response in my_endpoint.stream_raw_predict(
 body = request,
 headers = {'Content-Type':'application/json'}
):
 print(stream_response)

```

### REST

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

List all deployable models and then get the ID of the model to deploy. You can
then deploy the model with its default configuration and endpoint. Or, you can
choose to customize your deployment, such as setting a specific machine type or
using a dedicated endpoint.

In the sample curl commands, replace the following placeholders:

**Note:** The values for the **machine type**, **accelerator type**, and
**accelerator count**, must all match one of the partner's recommended
configurations. View the partner's Model Garden model card to see the
recommended configurations.

- LOCATION: The region where you plan to deploy the model and
 endpoint.
- PROJECT\_ID: Your project ID.
- DISPLAY\_NAME: A descriptive name for the associated resource.
- PUBLISHER\_NAME: The name of partner that provides the model to
 upload or deploy.
- PUBLISHER\_MODEL\_NAME: The name of the model to upload.
- ENDPOINT\_ID: The ID of the endpoint.
- MACHINE\_TYPE: Defines the set of resources to deploy for your
 model, such as `g2-standard-4`. You must match one of the confirgurations
 provided by the partner.
- ACCELERATOR\_TYPE: Specifies accelerators to add to your deployment
 to help improve performance when working with intensive workloads, such as
 `NVIDIA_L4`. You must match one of the confirgurations provided by the
 partner.
- ACCELERATOR\_COUNT: The number of accelerators to use. You must
 match one of the confirgurations provided by the partner.
- REQUEST\_PAYLOAD: The fields and values to include in your
 prediction request. View the partner's Model Garden model card to
 see the available fields.

1. Upload a model to add it to your Model Registry.

 ```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://LOCATION-aiplatform.googleapi.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/models:upload \
 -d '{
 "model": {
 "displayName": "DISPLAY_NAME_MODEL",
 "baseModelSource": {
 "modelGardenSource": {
 "publicModelName": f"publishers/PUBLISHER_NAME/models/PUBLISHER_MODEL_NAME",
 }
 }
 }
 }'

 ```
2. Create an endpoint.

 ```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://LOCATION-aiplatform.googleapi.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints \
 -d '{
 "displayName": "DISPLAY_NAME_ENDPOINT"
 }'

 ```
3. Deploy the uploaded model to the endpoint.

 ```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://LOCATION-aiplatform.googleapi.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID:deployModel \
 -d '{
 "deployedModel": {
 "model": f"projects/PROJECT_ID/locations/LOCATION/models/MODEL_ID",
 "displayName": "DISPLAY_NAME_DEPLOYED_MODEL",
 "dedicatedResources": {
 "machineSpec": {
 "machineType": "MACHINE_TYPE",
 "acceleratorType": "ACCELERATOR_TYPE",
 "acceleratorCount":"ACCELERATOR_COUNT",
 },
 "minReplicaCount": 1,
 "maxReplicaCount": 1
 },
 },
 "trafficSplit": {
 "0": 100
 }
 }'

 ```
4. After the model is deployed, you can make an unary or streaming call for
 predictions. View the partner's Model Garden model card to see which
 API methods are supported.

 - Sample unary call:

 ```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://LOCATION-aiplatform.googleapi.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID:rawPredict \
 -d 'REQUEST_PAYLOAD'

 ```

 - Sample streaming call:

 ```python
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 https://LOCATION-aiplatform.googleapi.com/v1/projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID:streamRawPredict \
 -d 'REQUEST_PAYLOAD'

 ```

### Console

1. In the Google Cloud console, go to the **Model Garden** page.

 [Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
2. To find a specific model, enter its name in the Model Garden
 search box.
3. To view all the models that you can self-deploy, in the **Model collections**
 section of the filter pane, select **Self-deploy partner models**. The
 resulting list includes all the self-deployable partner models.
4. Click the name of the model to deploy, which opens its model card.
5. Click **Deploy options**.
6. In the **Deploy on Vertex AI** pane, configure your deployment
 such as the location and machine type.
7. Click **Deploy**.

After the deployment is complete, you can request predictions by using the SDK
or API. Additional instructions are available in the "Documentation" section on
the model card.

## View or manage an endpoint

To view and manage your endpoint, go to the Vertex AI
**Online prediction** page.

[Go to Online prediction](https://console.cloud.google.com/vertex-ai/online-prediction/endpoints)

Vertex AI lists all endpoints in your project for a particular
region. Click an endpoint to view its details such as which models are
deployed to the endpoint.

## Undeploy models and delete resources

To stop a deployed model from using resources in your project, undeploy your
model from its endpoint. You must undeploy a model before you can delete the
endpoint and the model.

### Undeploy models

Undeploy a model from its endpoint.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

In your code, replace:

- PROJECT\_ID with your project ID
- LOCATION with your region, for example, "us-central1"
- ENDPOINT\_ID with your endpoint ID

```python
from google.cloud import aiplatform

aiplatform.init(project=PROJECT_ID, location=LOCATION)

# To find out which endpoints are available, un-comment the line below:
# endpoints = aiplatform.Endpoint.list()

endpoint = aiplatform.Endpoint(ENDPOINT_ID)
endpoint.undeploy_all()

```

### gcloud

In these commands, replace:

- PROJECT\_ID with your project name
- LOCATION\_ID with the region where you deployed the model and
 endpoint
- ENDPOINT\_ID with the endpoint ID
- MODEL\_ID with the model ID from the list model command
- DEPLOYED\_MODEL\_ID with the deployed model ID

1. Find the endpoint ID that is associated with your deployment by running the
 [`gcloud ai endpoints list`](https://cloud.google.com/sdk/gcloud/reference/ai/endpoints/list) command.

 ```python
 gcloud ai endpoints list \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```
2. Find the model ID by running the [`gcloud ai models
 list`](https://cloud.google.com/sdk/gcloud/reference/ai/models/list) command.

 ```python
 gcloud ai models list \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```
3. Use the model ID from the previous command to get the deployed model ID by
 running the [`gcloud ai models describe`](https://cloud.google.com/sdk/gcloud/reference/ai/models/describe) command.

 ```python
 gcloud ai models describe MODEL_ID \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```

 The abbreviated output looks like the following example. In the output,
 the ID is called `deployedModelId`.

 ```python
 Using endpoint [https://us-central1-aiplatform.googleapis.com/]
 artifactUri: [URI removed]
 baseModelSource:
 modelGardenSource:
 publicModelName: publishers/google/models/gemma2
 ...
 deployedModels:
 - deployedModelId: '1234567891234567891'
 endpoint: projects/12345678912/locations/us-central1/endpoints/12345678912345
 displayName: gemma2-2b-it-12345678912345
 etag: [ETag removed]
 modelSourceInfo:
 sourceType: MODEL_GARDEN
 name: projects/123456789123/locations/us-central1/models/gemma2-2b-it-12345678912345
 ...

 ```
4. Run the [`gcloud ai endpoints undeploy-model`](https://cloud.google.com/sdk/gcloud/reference/ai/endpoints/undeploy-model) command to undeploy
 the model from the endpoint by using the endpoint ID and the deployed model
 ID from the previous commands.

 ```python
 gcloud ai endpoints undeploy-model ENDPOINT_ID \
 --project=PROJECT_ID \
 --region=LOCATION_ID \
 --deployed-model-id=DEPLOYED_MODEL_ID

 ```

 This command produces no output.

### Console

1. In the Google Cloud console, go to the **Endpoints** tab on the **Online
 prediction** page.

 [Go to Endpoints](https://console.cloud.google.com/vertex-ai/endpoints)
2. In the **Region** drop-down list, choose the region where your endpoint is
 located.
3. Click the endpoint name to open the details page.
4. On the row for the model, click more\_vert **Actions**, and then select
 **Undeploy model from endpoint**.
5. In the **Undeploy model from endpoint** dialog, click **Undeploy**.

### Delete endpoints

Delete the Vertex AI endpoint that was associated with your model
deployment.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

In your code, replace:

- PROJECT\_ID with your project ID
- LOCATION with your region, for example, "us-central1"
- ENDPOINT\_ID with your endpoint ID

```python
from google.cloud import aiplatform

aiplatform.init(project=PROJECT_ID, location=LOCATION)

# To find out which endpoints are available, un-comment the line below:
# endpoints = aiplatform.Endpoint.list()

endpoint = aiplatform.Endpoint(ENDPOINT_ID)
endpoint.delete()

```

### gcloud

In these commands, replace:

- PROJECT\_ID with your project name
- LOCATION\_ID with the region where you deployed the model and
 endpoint
- ENDPOINT\_ID with the endpoint ID

1. Get the endpoint ID to delete by running the [`gcloud ai endpoints
 list`](https://cloud.google.com/sdk/gcloud/reference/ai/endpoints/list) command. This command lists the endpoint IDs for
 all endpoints in your project.

 ```python
 gcloud ai endpoints list \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```
2. Run the [`gcloud ai endpoints delete`](https://cloud.google.com/sdk/gcloud/reference/ai/endpoints/delete) command to delete
 the endpoint.

 ```python
 gcloud ai endpoints delete ENDPOINT_ID \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```

 When prompted, type `y` to confirm. This command produces no output.

### Console

1. In the Google Cloud console, go to the **Endpoints** tab on the **Online
 prediction** page.

 [Go to Endpoints](https://console.cloud.google.com/vertex-ai/endpoints)
2. In the **Region** drop-down list, choose the region your endpoint is
 located.
3. At the end of the endpoint's row, click more\_vert **Actions**, and then select
 **Delete endpoint**.
4. In the confirmation prompt, click **Confirm**.

### Delete models

Delete the model resource that was associated with your model deployment.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

In your code, replace:

- PROJECT\_ID with your project ID
- LOCATION with your region, for example, "us-central1"
- MODEL\_ID with your model ID

```python
from google.cloud import aiplatform

aiplatform.init(project=PROJECT_ID, location=LOCATION)

# To find out which models are available in Model Registry, un-comment the line below:
# models = aiplatform.Model.list()

model = aiplatform.Model(MODEL_ID)
model.delete()

```

### gcloud

In these commands, replace:

- PROJECT\_ID with your project name
- LOCATION\_ID with the region where you deployed the model and
 endpoint
- MODEL\_ID with the model ID from the list model command

1. Find the model ID to delete by running the [`gcloud ai models
 list`](https://cloud.google.com/sdk/gcloud/reference/ai/models/list) command.

 ```python
 gcloud ai models list \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```
2. Run the [`gcloud ai models delete`](https://cloud.google.com/sdk/gcloud/reference/ai/models/delete) command to delete the model by
 providing the model ID and the model's location.

 ```python
 gcloud ai models delete MODEL_ID \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```

### Console

1. Go to the **Model Registry** page from the Vertex AI section
 in the Google Cloud console.

 [Go to the Model Registry page](https://console.cloud.google.com/vertex-ai/models)
2. In the **Region** drop-down list, choose the region where you deployed
 your model.
3. On the row for your model, click more\_vert **Actions** and then select
 **Delete model**.

 When you delete the model, all associated model versions and evaluations
 are deleted from your Google Cloud project.
4. In the confirmation prompt, click **Delete**.

## View code samples

Most of the model cards for task-specific solutions models contain code
samples that you can copy and test.

1. In the Google Cloud console, go to the **Model Garden** page.

 [Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
2. Find a supported model that you want to view code samples for and click
 the **Documentation** tab.
3. The page scrolls to the documentation section with sample code
 embedded in place.

## Create a vision app

The model cards for applicable computer vision models support creating a
vision application.

1. In the Google Cloud console, go to the **Model Garden** page.

 [Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
2. Find a vision model in the Task specific solutions section that you want
 to use to create a vision application and click **View details**.
3. Click **Build app**.

 You're taken to Vertex AI Vision.
4. In **Application name**, enter a name for your application and click
 **Continue**.
5. Select a billing plan and click **Create**.

 You're taken to Vertex AI Vision Studio where you can continue
 creating your computer vision application.