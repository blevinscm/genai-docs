---
title: Deploy-and-inference-Gemma-using-Model-Garden-and-Vertex-AI-TPU-backed-endpointsStay-organized-with-
source: https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/deploy-and-inference-tutorial-tpu
date_scraped: 2025-05-12
---

# Deploy and inference Gemma using Model Garden and Vertex AI TPU-backed endpoints 

---

In this tutorial, you use Model Garden to deploy the
[Gemma 2B](https://cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-gemma) open model to a TPU-backed Vertex AI
endpoint. You must [deploy a model to an endpoint](https://cloud.google.com/vertex-ai/docs/general/deployment) before that model can
be used to serve online predictions. Deploying a model associates physical
resources with the model so it can serve online predictions with low latency.

After you deploy the Gemma 2B model, you inference the trained
model by using the [`PredictionServiceClient`](https://cloud.google.com/python/docs/reference/aiplatform/1.18.2/google.cloud.aiplatform_v1beta1.services.prediction_service.PredictionServiceClient) to get [online
predictions](https://cloud.google.com/vertex-ai/docs/predictions/get-online-predictions). Online predictions are synchronous requests made to a
model that is deployed to an endpoint.

## Objectives

This tutorial shows you how to perform the following tasks:

- Deploy the Gemma 2B open model to a TPU backed endpoint by
 using Model Garden
- Use the `PredictionServiceClient` to get online predictions

## Costs

In this document, you use the following billable components of Google Cloud:

- [A `ct5lp-hightpu-1t` machine type](https://cloud.google.com/vertex-ai/pricing#custom-trained_models) with one TPU\_V5 accelerator
- [Vertex AI prediction and explanation](https://cloud.google.com/vertex-ai/pricing#prediction-prices)

To generate a cost estimate based on your projected usage,
use the [pricing calculator](https://cloud.google.com/products/calculator).

New Google Cloud users might be eligible for a [free trial](../samples/Edit-image-content-using-mask-free-editing-with-Imagen-v002.md).

When you finish the tasks that are described in this document, you can avoid
continued billing by deleting the resources that you created. For more information, see
[Clean up](#clean-up).

## Before you begin

This tutorial requires you to:

- Set up a Google Cloud project and enable the Vertex AI API
- On your local machine:
 - Install, initialize, and authenticate with the Google Cloud CLI
 - Install the SDK for your language

### Set up a Google Cloud project

Set up your Google Cloud project and enable the Vertex AI API.

- Sign in to your Google Cloud account. If you're new to
 Google Cloud, [create an account](https://console.cloud.google.com/freetrial) to evaluate how our products perform in
 real-world scenarios. New customers also get $300 in free credits to
 run, test, and deploy workloads.
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
- Enable the Vertex AI API.

 [Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)

### Set up the Google Cloud CLI

On your local machine, set up the Google Cloud CLI.

1. [Install and initialize](https://cloud.google.com/sdk/docs/install) the Google Cloud CLI.
2. If you previously installed the gcloud CLI, ensure your
 `gcloud` components are updated by running this command.

 ```python
 gcloud components update
 ```
3. To authenticate with the gcloud CLI, generate a local
 Application Default Credentials (ADC) file by running this command. The web
 flow launched by the command is used to provide your user credentials.

 ```python
 gcloud auth application-default login
 ```

 For more information, see [gcloud CLI authentication configuration and ADC configuration](https://cloud.google.com/docs/authentication/gcloud#gcloud-credentials).

**Note:** To avoid providing your project ID and region to the Google Cloud CLI, you
can use the [`gcloud config set`](https://cloud.google.com/sdk/gcloud/reference/config/set) command to set a default project
and region.

### Set up the SDK for your programming language

To set up the environment used in this tutorial, you install the Vertex AI
SDK for your language and the Protocol Buffers library. The code samples use
functions from the Protocol Buffers library to convert the input dictionary to
the JSON format that is expected by the API.

On your local machine, click one of the following tabs to install the SDK for
your programming language.

### Python

On your local machine, click one of the following tabs to install the SDK
for your programming language.

- Install and update the Vertex AI SDK for Python by running this command.

 ```python
 pip3 install --upgrade "google-cloud-aiplatform>=1.64"
 ```
- Install the Protocol Buffers library for Python by running this command.

 ```python
 pip3 install --upgrade "protobuf>=5.28"
 ```

### Node.js

Install or update the `aiplatform` SDK for Node.js by running the following
command.

```python
npm install @google-cloud/aiplatform
```

### Java

To add `google-cloud-aiplatform` as a dependency, add the appropriate code for
your environment.

### Maven with BOM

Add the following HTML to your [`pom.xml`](https://github.com/GoogleCloudPlatform/java-docs-samples/blob/main/aiplatform/pom.xml):

```python
<dependencyManagement>
<dependencies>
 <dependency>
 <artifactId>libraries-bom</artifactId>
 <groupId>com.google.cloud</groupId>
 <scope>import</scope>
 <type>pom</type>
 <version>26.34.0</version>
 </dependency>
</dependencies>
</dependencyManagement>
<dependencies>
<dependency>
 <groupId>com.google.cloud</groupId>
 <artifactId>google-cloud-aiplatform</artifactId>
</dependency>
<dependency>
 <groupId>com.google.protobuf</groupId>
 <artifactId>protobuf-java-util</artifactId>
</dependency>
<dependency>
 <groupId>com.google.code.gson</groupId>
 <artifactId>gson</artifactId>
</dependency>
</dependencies>
```

### Maven without BOM

Add the following to your
[`pom.xml`](https://github.com/GoogleCloudPlatform/java-docs-samples/blob/main/aiplatform/pom.xml):

```python
<dependency>
 <groupId>com.google.cloud</groupId>
 <artifactId>google-cloud-aiplatform</artifactId>
 <version>1.1.0</version>
</dependency>
<dependency>
 <groupId>com.google.protobuf</groupId>
 <artifactId>protobuf-java-util</artifactId>
 <version>5.28</version>
</dependency>
<dependency>
 <groupId>com.google.code.gson</groupId>
 <artifactId>gson</artifactId>
 <version>2.11.0</version>
</dependency>
```

### Gradle without BOM

Add the following to your `build.gradle`:

```python
implementation 'com.google.cloud:google-cloud-aiplatform:1.1.0'
```

### Go

Install these Go packages by running the following commands.

- The [`aiplatform` Go client library](https://pkg.go.dev/cloud.google.com/go/aiplatform)
- [Go support for Protocol Buffers](https://pkg.go.dev/google.golang.org/protobuf#section-readme)
- [Google API Extensions for Go (gax-go)](https://github.com/googleapis/gax-go)

```python
go get cloud.google.com/go/aiplatform
go get google.golang.org/protobuf
go get github.com/googleapis/gax-go/v2
```

## Deploy Gemma using Model Garden

You deploy the Gemma 2B model to a [`ct5lp-hightpu-1t`](https://cloud.google.com/vertex-ai/docs/training/configure-compute#tpu_v5e) Compute Engine
machine type that is optimized for small to medium scale training. This machine
has one [TPU v5e](https://cloud.google.com/tpu/docs/v5e) accelerator. For more information on training models
using TPUs, see [Cloud TPU v5e training](https://cloud.google.com/tpu/docs/v5e-training).

In this tutorial, you deploy the instruction-tuned Gemma 2B open
model by using the model card in Model Garden. The specific model
version is `gemma2-2b-it` — `-it` stands for [instruction-tuned](https://cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-gemma#gem-model-sizes).

The Gemma 2B model has a lower parameter size which means lower
resource requirements and more deployment flexibility.

1. In the Google Cloud console, go to the **Model Garden** page.

 [Go to Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
2. Click the **Gemma 2** model card.

 [Go to Gemma 2](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/gemma2)
3. Click **Deploy** to open the **Deploy model** pane.
4. In the **Deploy model** pane, specify these details.

 1. For **Deployment environment** click **Vertex AI**.
 2. In the **Deploy model** section:

 1. For **Resource ID**, choose `gemma-2b-it`.
 2. For **Model name** and **Endpoint name**, accept the default
 values. For example:

 - Model name: `gemma2-2b-it-1234567891234`
 - Endpoint name: `gemma2-2b-it-mg-one-click-deploy`

 Make a note of the endpoint name. You'll need it to find the
 endpoint ID used in the code samples.
 3. In the **Deployment settings** section:

 1. Accept the default option for **Basic** settings.
 2. For **Region**, accept the default value or choose a region from the
 list. Make a note of the region. You'll need it for the code
 samples.
 3. For **Machine spec**, choose the TPU backed instance:
 `ct5lp-hightpu-1t (1 TPU_V5_LITEPOD; ct5lp-hightpu-1t)`.
5. Click **Deploy**. When the deployment is finished, receive an email that
 contains details about your new endpoint. You can also view the endpoint
 details by clicking **Online prediction > Endpoints** and selecting your
 region.

 [Go to Endpoints](https://console.cloud.google.com/vertex-ai/online-prediction/endpoints)

## Inference Gemma 2B with the PredictionServiceClient

After you deploy Gemma 2B, you use the `PredictionServiceClient` to
get online [predictions](https://cloud.google.com/vertex-ai/docs/predictions/get-predictions) for the prompt: "Why is the sky blue?"

### Code parameters

The `PredictionServiceClient` code samples require you to update the following.

- `PROJECT_ID`: To [find your project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) follow these steps.

 1. Go to the **Welcome** page in the Google Cloud console.

 [Go to Welcome](https://console.cloud.google.com/welcome)
 2. From the project picker at the top of the page, select your project.

 The project name, project number, and project ID appear after the
 **Welcome** heading.
- `ENDPOINT_REGION`: This is the region where you [deployed the endpoint](#deploy-gemma).
- `ENDPOINT_ID`: To find your endpoint ID, view it in the console or run the
 `gcloud ai endpoints list` command. You'll need the endpoint name and region
 from the [**Deploy model**](#deploy-gemma) pane.

 ### Console

 You can view the endpoint details by clicking **Online prediction >
 Endpoints** and selecting your region. Note the number that appears in the
 `ID` column.

 [Go to Endpoints](https://console.cloud.google.com/vertex-ai/online-prediction/endpoints)

 ### gcloud

 You can view the endpoint details by running the [`gcloud ai endpoints
 list`](https://cloud.google.com/sdk/gcloud/reference/ai/endpoints/list) command.

 ```python
 gcloud ai endpoints list \
 --region=ENDPOINT_REGION \
 --filter=display_name=ENDPOINT_NAME

 ```

 The output looks like this.

 ```python
 Using endpoint [https://us-central1-aiplatform.googleapis.com/]
 ENDPOINT_ID: 1234567891234567891
 DISPLAY_NAME: gemma2-2b-it-mg-one-click-deploy

 ```

### Sample code

In the sample code for your language, update the `PROJECT_ID`,
`ENDPOINT_REGION`, and `ENDPOINT_ID`. Then run your code.

### Vertex AI SDK for Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).
For more information, see the
[Vertex AI SDK for Python API reference documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
"""
Sample to run inference on a Gemma2 model deployed to a Vertex AI endpoint with TPU accellerators.
"""

from google.cloud import aiplatform
from google.protobuf import json_format
from google.protobuf.struct_pb2 import Value

# TODO(developer): Update & uncomment lines below
# PROJECT_ID = "your-project-id"
# ENDPOINT_REGION = "your-vertex-endpoint-region"
# ENDPOINT_ID = "your-vertex-endpoint-id"

# Default configuration
config = {"max_tokens": 1024, "temperature": 0.9, "top_p": 1.0, "top_k": 1}

# Prompt used in the prediction
prompt = "Why is the sky blue?"

# Encapsulate the prompt in a correct format for TPUs
# Example format: [{'prompt': 'Why is the sky blue?', 'temperature': 0.9}]
input = {"prompt": prompt}
input.update(config)

# Convert input message to a list of GAPIC instances for model input
instances = [json_format.ParseDict(input, Value())]

# Create a client
api_endpoint = f"{ENDPOINT_REGION}-aiplatform.googleapis.com"
client = aiplatform.gapic.PredictionServiceClient(
 client_options={"api_endpoint": api_endpoint}
)

# Call the Gemma2 endpoint
gemma2_end_point = (
 f"projects/{PROJECT_ID}/locations/{ENDPOINT_REGION}/endpoints/{ENDPOINT_ID}"
)
response = client.predict(
 endpoint=gemma2_end_point,
 instances=instances,
)
text_responses = response.predictions
print(text_responses[0])

```

### Node.js

Before trying this sample, follow the Node.js setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Node.js API
reference documentation](/nodejs/docs/reference/aiplatform/latest).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

```python
// Imports the Google Cloud Prediction Service Client library
const {
 // TODO(developer): Uncomment PredictionServiceClient before running the sample.
 // PredictionServiceClient,
 helpers,
} = require('@google-cloud/aiplatform');
/**
 * TODO(developer): Update these variables before running the sample.
 */
const projectId = 'your-project-id';
const endpointRegion = 'your-vertex-endpoint-region';
const endpointId = 'your-vertex-endpoint-id';

// Prompt used in the prediction
const prompt = 'Why is the sky blue?';

// Encapsulate the prompt in a correct format for TPUs
// Example format: [{prompt: 'Why is the sky blue?', temperature: 0.9}]
const input = {
 prompt,
 // Parameters for default configuration
 maxOutputTokens: 1024,
 temperature: 0.9,
 topP: 1.0,
 topK: 1,
};

// Convert input message to a list of GAPIC instances for model input
const instances = [helpers.toValue(input)];

// TODO(developer): Uncomment apiEndpoint and predictionServiceClient before running the sample.
// const apiEndpoint = `${endpointRegion}-aiplatform.googleapis.com`;

// Create a client
// predictionServiceClient = new PredictionServiceClient({apiEndpoint});

// Call the Gemma2 endpoint
const gemma2Endpoint = `projects/${projectId}/locations/${endpointRegion}/endpoints/${endpointId}`;

const [response] = await predictionServiceClient.predict({
 endpoint: gemma2Endpoint,
 instances,
});

const predictions = response.predictions;
const text = predictions[0].stringValue;

console.log('Predictions:', text);
```

### Java

Before trying this sample, follow the Java setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Java API
reference documentation](/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

```python

import com.google.cloud.aiplatform.v1.EndpointName;
import com.google.cloud.aiplatform.v1.PredictResponse;
import com.google.cloud.aiplatform.v1.PredictionServiceClient;
import com.google.cloud.aiplatform.v1.PredictionServiceSettings;
import com.google.gson.Gson;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Value;
import com.google.protobuf.util.JsonFormat;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Gemma2PredictTpu {
 private final PredictionServiceClient predictionServiceClient;

 // Constructor to inject the PredictionServiceClient
 public Gemma2PredictTpu(PredictionServiceClient predictionServiceClient) {
 this.predictionServiceClient = predictionServiceClient;
 }

 public static void main(String[] args) throws IOException {
 // TODO(developer): Replace these variables before running the sample.
 String projectId = "YOUR_PROJECT_ID";
 String endpointRegion = "us-west1";
 String endpointId = "YOUR_ENDPOINT_ID";

 PredictionServiceSettings predictionServiceSettings =
 PredictionServiceSettings.newBuilder()
 .setEndpoint(String.format("%s-aiplatform.googleapis.com:443", endpointRegion))
 .build();
 PredictionServiceClient predictionServiceClient =
 PredictionServiceClient.create(predictionServiceSettings);
 Gemma2PredictTpu creator = new Gemma2PredictTpu(predictionServiceClient);

 creator.gemma2PredictTpu(projectId, endpointRegion, endpointId);
 }

 // Demonstrates how to run inference on a Gemma2 model
 // deployed to a Vertex AI endpoint with TPU accelerators.
 public String gemma2PredictTpu(String projectId, String region,
 String endpointId) throws IOException {
 Map<String, Object> paramsMap = new HashMap<>();
 paramsMap.put("temperature", 0.9);
 paramsMap.put("maxOutputTokens", 1024);
 paramsMap.put("topP", 1.0);
 paramsMap.put("topK", 1);
 Value parameters = mapToValue(paramsMap);
 // Prompt used in the prediction
 String instance = "{ \"prompt\": \"Why is the sky blue?\"}";
 Value.Builder instanceValue = Value.newBuilder();
 JsonFormat.parser().merge(instance, instanceValue);
 // Encapsulate the prompt in a correct format for TPUs
 // Example format: [{'prompt': 'Why is the sky blue?', 'temperature': 0.9}]
 List<Value> instances = new ArrayList<>();
 instances.add(instanceValue.build());

 EndpointName endpointName = EndpointName.of(projectId, region, endpointId);

 PredictResponse predictResponse = this.predictionServiceClient
 .predict(endpointName, instances, parameters);
 String textResponse = predictResponse.getPredictions(0).getStringValue();
 System.out.println(textResponse);
 return textResponse;
 }

 private static Value mapToValue(Map<String, Object> map) throws InvalidProtocolBufferException {
 Gson gson = new Gson();
 String json = gson.toJson(map);
 Value.Builder builder = Value.newBuilder();
 JsonFormat.parser().merge(json, builder);
 return builder.build();
 }
}
```

### Go

Before trying this sample, follow the Go setup instructions in the
[Vertex AI quickstart using
client libraries](https://cloud.google.com/vertex-ai/docs/start/client-libraries).
For more information, see the
[Vertex AI Go API
reference documentation](/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1).

To authenticate to Vertex AI, set up Application Default Credentials.
For more information, see
[Set up authentication for a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

```python
import (
 "context"
 "fmt"
 "io"

 "cloud.google.com/go/aiplatform/apiv1/aiplatformpb"

 "google.golang.org/protobuf/types/known/structpb"
)

// predictTPU demonstrates how to run interference on a Gemma2 model deployed to a Vertex AI endpoint with TPU accelerators.
func predictTPU(w io.Writer, client PredictionsClient, projectID, location, endpointID string) error {
 ctx := context.Background()

 // Note: client can be initialized in the following way:
 // apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
 // client, err := aiplatform.NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
 // if err != nil {
 // return fmt.Errorf("unable to create prediction client: %v", err)
 // }
 // defer client.Close()

 gemma2Endpoint := fmt.Sprintf("projects/%s/locations/%s/endpoints/%s", projectID, location, endpointID)
 prompt := "Why is the sky blue?"
 parameters := map[string]interface{}{
 "temperature": 0.9,
 "maxOutputTokens": 1024,
 "topP": 1.0,
 "topK": 1,
 }

 // Encapsulate the prompt in a correct format for TPUs.
 // Example format: [{'prompt': 'Why is the sky blue?', 'temperature': 0.9}]
 promptValue, err := structpb.NewValue(map[string]interface{}{
 "prompt": prompt,
 "parameters": parameters,
 })
 if err != nil {
 fmt.Fprintf(w, "unable to convert prompt to Value: %v", err)
 return err
 }

 req := &aiplatformpb.PredictRequest{
 Endpoint: gemma2Endpoint,
 Instances: []*structpb.Value{promptValue},
 }

 resp, err := client.Predict(ctx, req)
 if err != nil {
 return err
 }

 prediction := resp.GetPredictions()
 value := prediction[0].GetStringValue()
 fmt.Fprintf(w, "%v", value)

 return nil
}

```

## Clean up

To avoid incurring charges to your Google Cloud account for the resources used in this
tutorial, either delete the project that contains the resources, or keep the project and
delete the individual resources.

### Delete the project

**Caution**: Deleting a project has the following effects:

- **Everything in the project is deleted.** If you used an existing project for
 the tasks in this document, when you delete it, you also delete any other work you've
 done in the project.
- **Custom project IDs are lost.**
 When you created this project, you might have created a custom project ID that you want to use in
 the future. To preserve the URLs that use the project ID, such as an `appspot.com`
 URL, delete selected resources inside the project instead of deleting the whole project.

If you plan to explore multiple architectures, tutorials, or quickstarts, reusing projects
can help you avoid exceeding project quota limits.

1. In the Google Cloud console, go to the **Manage resources** page.

 [Go to Manage resources](https://console.cloud.google.com/iam-admin/projects)
2. In the project list, select the project that you
 want to delete, and then click **Delete**.
3. In the dialog, type the project ID, and then click
 **Shut down** to delete the project.

### Delete individual resources

If you're keeping your project, delete the resources used in this tutorial:

- Undeploy the model and delete the endpoint
- Delete the model from Model Registry

#### Undeploy the model and delete the endpoint

Use one of the following methods to undeploy a model and delete the endpoint.

**Note:** You can only delete the endpoint after all models have been undeployed
from it.

### Console

1. In the Google Cloud console, click **Online prediction** and then
 click **Endpoints**.

 [Go to the Endpoints page](https://console.cloud.google.com/vertex-ai/endpoints)
2. In the **Region** drop-down list, choose the region where you deployed
 your endpoint.
3. Click the endpoint name to open the details page. For example:
 `gemma2-2b-it-mg-one-click-deploy`.
4. On the row for the `Gemma 2 (Version 1)` model, click
 more\_vert **Actions**, and then
 click **Undeploy model from endpoint**.
5. In the **Undeploy model from endpoint** dialog, click **Undeploy**.
6. Click the **Back** button to return to the **Endpoints** page.

 [Go to the Endpoints page](https://console.cloud.google.com/vertex-ai/online-prediction/endpoints)
7. At the end of the `gemma2-2b-it-mg-one-click-deploy` row, click
 more\_vert **Actions**, and then
 select **Delete endpoint**.
8. In the confirmation prompt, click **Confirm**.

### gcloud

To undeploy the model and delete the endpoint using the Google Cloud CLI,
follow these steps.

In these commands, replace:

- PROJECT\_ID with your project name
- LOCATION\_ID with the region where you deployed the model and
 endpoint
- ENDPOINT\_ID with the endpoint ID
- DEPLOYED\_MODEL\_NAME with the model's display name
- DEPLOYED\_MODEL\_ID with the model ID

1. Get the endpoint ID by running the [`gcloud ai endpoints list`](https://cloud.google.com/sdk/gcloud/reference/ai/endpoints/list)
 command. This command lists the endpoint IDs for all endpoints in your
 project. Make a note of the ID of the endpoint used in this tutorial.

 ```python
 gcloud ai endpoints list \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```

 The output looks like this. In the output, the ID is called
 `ENDPOINT_ID`.

 ```python
 Using endpoint [https://us-central1-aiplatform.googleapis.com/]
 ENDPOINT_ID: 1234567891234567891
 DISPLAY_NAME: gemma2-2b-it-mg-one-click-deploy

 ```
2. Get the model ID by running the [`gcloud ai models describe`](https://cloud.google.com/sdk/gcloud/reference/ai/models/describe)
 command. Make a note of the ID of the model you deployed in this
 tutorial.

 ```python
 gcloud ai models describe DEPLOYED_MODEL_NAME \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```

 The abbreviated output looks like this. In the output, the ID is called
 `deployedModelId`.

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
3. Undeploy the model from the endpoint. You'll need the endpoint ID and
 model ID from the previous commands.

 ```python
 gcloud ai endpoints undeploy-model ENDPOINT_ID \
 --project=PROJECT_ID \
 --region=LOCATION_ID \
 --deployed-model-id=DEPLOYED_MODEL_ID

 ```

 This command produces no output.
4. Run the [`gcloud ai endpoints delete`](https://cloud.google.com/sdk/gcloud/reference/ai/endpoints/delete) command to delete
 the endpoint.

 ```python
 gcloud ai endpoints delete ENDPOINT_ID \
 --project=PROJECT_ID \
 --region=LOCATION_ID

 ```

 When promted, type `y` to confirm. This command produces no output.

#### Delete the model

### Console

1. Go to the **Model Registry** page from the Vertex AI section
 in the Google Cloud console.

 [Go to the Model Registry page](https://console.cloud.google.com/vertex-ai/models)
2. In the **Region** drop-down list, choose the region where you deployed
 your model.
3. At the end of the `gemma2-2b-it-1234567891234` row, click
 more\_vert **Actions**.
4. Select **Delete model**.

 When you delete the model, all associated model versions and evaluations
 are deleted from your Google Cloud project.
5. In the confirmation prompt, click **Delete**.

### gcloud

To delete the model using the Google Cloud CLI, provide the model's display
name and region to the [`gcloud ai models delete`](https://cloud.google.com/sdk/gcloud/reference/ai/models/delete) command.

```python
gcloud ai models delete DEPLOYED_MODEL_NAME \
 --project=PROJECT_ID \
 --region=LOCATION_ID

```

Replace DEPLOYED\_MODEL\_NAME with the model's display name.
Replace PROJECT\_ID with your project name. Replace
LOCATION\_ID with the region where you deployed the model.

## What's next

- Learn more about [Gemma open models](https://ai.google.dev/gemma/docs).
- Read the [Gemma Terms of Use](https://ai.google.dev/gemma/terms).
- Learn more about [open models](https://cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-open-models).
- Learn how to [deploy a tuned model](https://cloud.google.com/vertex-ai/generative-ai/docs/deploy/overview#deploy_a_tuned_model).
- Learn how to [deploy Gemma 2 to Google Kubernetes Engine using HuggingFace Textgen Inference (TGI)](https://cloud.google.com/kubernetes-engine/docs/tutorials/serve-gemma-gpu-tgi).
- Learn more about the `PredictionServiceClient` in your preferred language:
 [Python](https://cloud.google.com/python/docs/reference/aiplatform/1.18.2/google.cloud.aiplatform_v1beta1.services.prediction_service.PredictionServiceClient), [Node.js](/nodejs/docs/reference/aiplatform/3.13.0/aiplatform/v1.predictionserviceclient), [Java](/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1.PredictionServiceClient), or
 [Go](/go/docs/reference/cloud.google.com/go/aiplatform/1.0.0/apiv1#cloud_google_com_go_aiplatform_apiv1_PredictionClient_Predict).