---
date_scraped: 2025-05-12
source: https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/deploy
title: Deploy An Agent
---

# Deploy an agent 

To deploy an agent on Vertex AI Agent Engine, use the following steps:

1. Configure your agent for deployment. You can make the following optional configurations:
 - [Package requirements](#package-requirements)
 - [Additional packages](#extra-packages)
 - [Cloud Storage directory](#gcs-directory)
 - [Environment variables](#environment-variables)
 - [Resource metadata](#resource-metadata)
2. [Create an `AgentEngine` instance](#create-agent-engine).
3. [Grant the deployed agent permissions](#agent-permissions).
4. [Get the agent resource ID](#resource-identifier).

You can also use [Agent Starter Pack](#agent-starter-pack) templates for deployment.

**Note:** Vertex AI Agent Engine deployment only supports Python.

## Before you begin

Before you deploy an agent, make sure you have completed the following tasks:

1. [Set up your environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up).
2. [Develop an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop).

## (Optional) Define the package requirements

Provide the set of packages required by the agent for deployment. The set of packages can
either be a list of items to be installed by pip, or the path to a file that
follows the [Requirements File Format](https://pip.pypa.io/en/stable/reference/requirements-file-format).

If the agent does not have any dependencies, you can set `requirements` to `None`:

```python
requirements = None

```

If the agent uses a framework-specific template, you should specify the SDK
version that is imported (such as `1.77.0`) when developing the agent.

### ADK

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

```python
requirements = [
 "google-cloud-aiplatform[agent_engines,adk]",
 # any other dependencies
]

```

### LangChain

```python
requirements = [
 "google-cloud-aiplatform[agent_engines,langchain]",
 # any other dependencies
]

```

### LangGraph

```python
requirements = [
 "google-cloud-aiplatform[agent_engines,langgraph]",
 # any other dependencies
]

```

### AG2

```python
requirements = [
 "google-cloud-aiplatform[agent_engines,ag2]",
 # any other dependencies
]

```

### LlamaIndex

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

The following instructions are for LlamaIndex Query Pipeline:

```python
requirements = [
 "google-cloud-aiplatform[agent_engines,llama_index]",
 # any other dependencies
]

```

### (Optional) Version constraints

To upper-bound or pin the version of a given package
(such as `google-cloud-aiplatform`), specify the following:

```python
requirements = [
 # See https://pypi.org/project/google-cloud-aiplatform for the latest version.
 "google-cloud-aiplatform[agent_engines,adk]==1.88.0",
]

```

You can add additional packages and constraints to the list:

```python
requirements = [
 "google-cloud-aiplatform[agent_engines,adk]==1.88.0",
 "cloudpickle==3.0", # new
]

```

### (Optional) Define a developmental branch

You can point to the version of a package that is on a GitHub branch or pull request. For example:

```python
requirements = [
 "google-cloud-aiplatform[agent_engines,adk] @ git+https://github.com/googleapis/python-aiplatform.git@BRANCH_NAME", # new
 "cloudpickle==3.0",
]

```

### (Optional) Define a requirements file format

You can maintain the list of requirements in a file (such as `path/to/requirements.txt`):

```python
requirements = "path/to/requirements.txt"

```

where `path/to/requirements.txt` is a text file that follows the [Requirements File Format](https://pip.pypa.io/en/stable/reference/requirements-file-format/#example). For example:

```python
google-cloud-aiplatform[agent_engines,adk]
cloudpickle==3.0

```

## (Optional) Define additional packages

You can include local files or directories that contain local required Python source
files. Compared to [package requirements](#package-requirements), this
lets you use private utilities you have developed that aren't
otherwise available on PyPI or GitHub.

If the agent does not require any extra packages, you can set it to `None`:

```python
extra_packages = None

```

### (Optional) Define files and directories

To include a single file (such as `agents/agent.py`), add it to the
`extra_packages` list:

```python
extra_packages = ["agents/agent.py"]

```

To include the set of files in an entire directory (for example, `agents/`), specify the directory:

```python
extra_packages = ["agents"] # directory that includes agents/agent.py

```

### (Optional) Define wheel binaries

You can specify [Python wheel binaries](https://peps.python.org/pep-0427/)
(for example, `path/to/python_package.whl`) in the
[package requirements](#package-requirements):

```python
requirements = [
 "google-cloud-aiplatform[agent_engines,adk]",
 "cloudpickle==3.0",
 "python_package.whl", # install from the whl file that was uploaded
]
extra_packages = ["path/to/python_package.whl"] # bundle the whl file for uploading

```

## (Optional) Define environment variables

If there are environment variables that your agent depends on, you can specify
them in the `env_vars=` argument. If the agent does not depend on any environment
variables, you can set it to `None`:

```python
env_vars = None

```

**Warning:** You should not set the following environment variables: `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_QUOTA_PROJECT`, `GOOGLE_CLOUD_LOCATION`, `PORT`, `K_SERVICE`, `K_REVISION`, `K_CONFIGURATION`, and `GOOGLE_APPLICATION_CREDENTIALS`. Also, you should avoid the prefix `GOOGLE_CLOUD_AGENT_ENGINE`
to avoid naming conflicts with Vertex AI Agent Engine environment variables.

To specify the environment variables, there are a few different options available:

### Dictionary

```python
env_vars = {
 "VARIABLE_1": "VALUE_1",
 "VARIABLE_2": "VALUE_2",
}
# These environment variables will become available in Vertex AI Agent Engine
# through `os.environ`, e.g.
#
# import os
# os.environ["VARIABLE_1"] # will have the value "VALUE_1"
#
# and
#
# os.environ["VARIABLE_2"] # will have the value "VALUE_2"
#

```

To reference a secret in Secret Manager and have it be available as
an environment variable (for example, `CLOUD_SQL_CREDENTIALS_SECRET`), first follow
the instructions to [Create a secret](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage/access#create-secret) for `CLOUD_SQL_CREDENTIALS_SECRET` in [your project](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#project),
before specifying the environment variables as:

```python
env_vars = {
 # ... (other environment variables and their values)
 "CLOUD_SQL_CREDENTIALS_SECRET": {"secret": "SECRET_ID", "version": "SECRET_VERSION_ID"},
}

```

where

- `SECRET_VERSION_ID` is the ID of the secret version.
- `SECRET_ID` is the ID of the secret.

**Note:** You can only reference secrets (and their versions) that are managed in
the same project as the deployed agent.

In your [agent code](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/custom), you can
then reference the secret like so:

```python
secret = os.environ.get("CLOUD_SQL_CREDENTIALS_SECRET")
if secret:
 # Secrets are stored as strings, so use json.loads to parse JSON payloads.
 return json.loads(secret)

```

### List

**Note:** This option does not support Secret Manager
integration. If you need to specify managed secrets, you need to specify the
environment variables as a dictionary.

```python
env_vars = ["VARIABLE_1", "VARIABLE_2"]
# This corresponds to the following code snippet:
#
# import os
#
# env_vars = {
# "VARIABLE_1": os.environ["VARIABLE_1"],
# "VARIABLE_2": os.environ["VARIABLE_2"],
# }

```

## (Optional) Define a Cloud Storage directory

The staging artifacts are overwritten if they correspond to an existing
sub-bucket (a folder in a Cloud Storage bucket). If necessary, you can
specify the subbucket for the staging artifacts. You
can set `gcs_dir_name` to `None` if you don't mind potentially overwriting the files in the
default sub-bucket:

```python
gcs_dir_name = None

```

To avoid overwriting the files (such as for different environments such as development,
staging, and production), you can set up corresponding sub-buckets, and specify the
sub-bucket to stage the artifact under:

```python
gcs_dir_name = "dev" # or "staging" or "prod"

```

If you want or need to avoid collisions, you can generate a random uuid:

```python
import uuid
gcs_dir_name = str(uuid.uuid4())

```

## (Optional) Configure resource metadata

You can set metadata on the
[`ReasoningEngine`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines)
resource that gets created in Vertex AI:

```python
display_name = "Currency Exchange Rate Agent (Staging)"

description = """
An agent that has access to tools for looking up the exchange rate.

If you run into any issues, please contact the dev team.
"""

```

For a full set of the parameters, see the [API reference](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines).

## Create an `AgentEngine` instance

To deploy the agent on Vertex AI, use `agent_engines.create` and pass in the object as a parameter:

```python
remote_agent = agent_engines.create(
 local_agent, # Optional.
 requirements=requirements, # Optional.
 extra_packages=extra_packages, # Optional.
 gcs_dir_name=gcs_dir_name, # Optional.
 display_name=display_name, # Optional.
 description=description, # Optional.
 env_vars=env_vars, # Optional.
)

```

Deployment takes a few minutes, during which the following steps happen in the background:

1. A bundle of the following artifacts are generated locally:

 - `*.pkl` a pickle file corresponding to local\_agent.
 - `requirements.txt` a text file containing the [package requirements](#package-requirements).
 - `dependencies.tar.gz` a tar file containing any [extra packages](#extra-packages).
2. The bundle is uploaded to Cloud Storage (under the corresponding [sub-bucket](#gcs-directory)) for staging the artifacts.
3. The Cloud Storage URIs for the respective artifacts are specified in the
 [PackageSpec](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines#PackageSpec).
4. The Vertex AI Agent Engine service receives the request and builds containers and turns up HTTP servers on the backend.

Deployment latency is dependent on the total time it takes to install the
required packages. Once deployed, `remote_agent` corresponds to an instance of
`local_agent` that is running on Vertex AI and can be queried or
deleted. It is separate from local instances of the agent.

## (Optional) Grant the deployed agent permissions

If the deployed agent needs to be granted any additional permissions, you can
follow the instructions in [Set up your service agent permissions](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#service-agent).

If you have [defined secrets as environment variables](#environment-variables),
you need to grant the following permission:

- Secret Manager Secret Accessor (`roles/secretmanager.secretAccessor`)

## Get the agent resource ID

Each deployed agent has a unique identifier. You can run the following command
to get the `resource_name` identifier for your deployed agent:

```python
remote_agent.resource_name

```

The response should look like the following string:

```python
"projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/RESOURCE_ID"

```

where

- `PROJECT_ID` is the Google Cloud [project ID](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#project)
 where the deployed agent runs.
- `LOCATION` is the [region](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview#supported-regions)
 where the deployed agent runs.
- `RESOURCE_ID` is the ID of the deployed agent as a
 [`reasoningEngine` resource](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines).

## Deploy in production with Agent Starter Pack

The [Agent Starter Pack](https://github.com/GoogleCloudPlatform/agent-starter-pack) is a collection of production-ready generative AI agent templates built for **Vertex AI Agent Engine**. It accelerates deployment by providing:

- **Pre-built Agent Templates:** ReAct, RAG, multi-agent, and more.
- **Interactive Playground**: Test and interact with your agent.
- **Automated Infrastructure**: Uses [Terraform](https://cloud.google.com/docs/terraform) for streamlined resource management.
- **CI/CD Pipelines**: Automated deployment workflows leveraging Cloud Build.
- **Observability**: Includes built-in support for Cloud Trace and Cloud Logging.

**Get Started:** [Quickstart](https://github.com/GoogleCloudPlatform/agent-starter-pack?tab=readme-ov-file#-get-started-in-1-minute)

## Best practices for deployment

1. Pin your package versions (for reproducible builds). Common packages to keep
 track of include the following: `google-cloud-aiplatform`, `cloudpickle`, `langchain`,
 `langchain-core`, `langchain-google-vertexai`, and `pydantic`.
2. Minimize the number of dependencies in your agent. This reduces the
 number of breaking changes when updating your dependencies and makes it easier
 to update your agent over time for newer features.

## What's next

- [Use the agent](use.md).
- [Manage deployed agents](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage).
- [Troubleshoot deploying an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/troubleshooting/deploy).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).