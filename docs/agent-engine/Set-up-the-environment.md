---
date_scraped: 2025-05-12
title: Set Up The Environment
---

# Set up the environment 

Before you work with Vertex AI Agent Engine, you need to make sure your
environment is set up. You need to have a Google Cloud project with billing enabled,
have the required permissions, set up a Cloud Storage bucket, and install the
Vertex AI SDK for Python. Use the following topics to ensure ready to start working
with Vertex AI Agent Engine.

For a reference Terraform example to streamline Vertex AI Agent Engine environment setup and deployment, consider exploring the [agent-starter-pack](https://github.com/GoogleCloudPlatform/agent-starter-pack?tab=readme-ov-file#-agent-starter-pack).

## Set up your Google Cloud project

Every project can be identified in two ways: the project number or the project
ID. The `PROJECT_NUMBER` is automatically created when you
create the project, whereas the `PROJECT_ID` is created by you,
or whoever created the project. To set up a project:

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
- In the Google Cloud console, on the project selector page,
 select or create a Google Cloud project.

 **Note**: If you don't plan to keep the
 resources that you create in this procedure, create a project instead of
 selecting an existing project. After you finish these steps, you can
 delete the project, removing all resources associated with the project.

 [Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)
- [Make sure that billing is enabled for your Google Cloud project](https://cloud.google.com/billing/docs/how-to/verify-billing-enabled#confirm_billing_is_enabled_on_a_project).
1. The Vertex AI and Cloud Storage APIs are required for setting up and using Vertex AI Agent Engine.

 Enable the Vertex AI, Cloud Storage APIs.

 [Enable the APIs](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com,storage.googleapis.com)

 (Optional) To access observability tools, you need to enable additional APIs:

 - **Cloud Monitoring API:** Enable to monitor an agent using [user-defined metrics](manage/monitoring.md).
 - **Cloud Trace API:** Enable to [trace an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage/tracing).

 Enable optional APIs using the Google Cloud console:

 1. Go to the [API Library](https://console.cloud.google.com/apis/library).
 2. From the **Select a project** list, select your Google Cloud project.
 3. Select or search for the API you want to enable.
 4. On the API page, click **Enable**.

**Note:** For additional guidance, see [Creating and managing projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects) or [Set up a project for a team](https://cloud.google.com/vertex-ai/docs/general/set-up-project).**Note:** To enable APIs, you need the `serviceusage.services.enable` permission. If you don't have this permission, ask your administrator to grant you
the Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) role.

## Get the required roles

To get the permissions that
you need to use Vertex AI Agent Engine,
ask your administrator to grant you the
following IAM roles on your project:

- [Vertex AI User](https://cloud.google.com/iam/docs/understanding-roles#aiplatform.user) (`roles/aiplatform.user`)
- [Storage Admin](https://cloud.google.com/iam/docs/understanding-roles#storage.admin) (`roles/storage.admin`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://cloud.google.com/iam/docs/understanding-roles).

## Set up your service agent permissions

Agents that you deploy on Vertex AI Agent Engine run using the *AI Platform Reasoning
Engine Service Agent* service account. This account has a *Vertex AI
Reasoning Engine Service Agent* role that grants the default permissions required
for deployed agents. You can view the full list of default permissions in the
[IAM documentation](https://cloud.google.com/iam/docs/understanding-roles#aiplatform.reasoningEngineServiceAgent).

If you need additional permissions, you can grant this Service Agent additional
roles by performing the following steps:

1. Go to the **IAM** page and check the "Include Google-provided role grants" checkbox.

 [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
2. Find the principal which matches `service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`.
3. Add the required roles to the principal by clicking the edit button and then
 the save button.

### Manually Generate a Service Agent

While the Reasoning Engine Service Agent is automatically provisioned during
Vertex AI Agent Engine deployment, there might be scenarios where you need to manually
generate it beforehand. This is particularly important when you need to grant
specific roles to the service agent to ensure the deployment process has the
necessary permissions and avoid potential deployment failures.

Here are the steps to manually generate a Reasoning Engine Service Agent:

1. Generate the Reasoning Engine Service Agent using the Google Cloud CLI.

 ```python
 gcloud beta services identity create --service=aiplatform.googleapis.com --project=PROJECT-ID-OR-PROJECT-NUMBER
 ```

 **Note:** The response to the Google Cloud CLI command might display only the Vertex
 AI Service Agent. However, the Reasoning Engine Service Agent is also created.
2. Go to the **IAM** page and click **Grant Access**.

 [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
3. In **Add principals** section, in the **New principals** field, enter `service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`.
4. In the **Assign roles** section, find and select the roles you need.
5. Click the **Save** button.

## Create a Cloud Storage bucket

Vertex AI Agent Engine stages the artifacts of your deployed agents in a Cloud Storage
bucket as part of the deployment process. Make sure the principal that is
authenticated to use Vertex AI (either yourself or a service account)
has `Storage Admin` access to this bucket. This is needed because
Vertex AI SDK for Python writes your code to this bucket.

If you already have a bucket set up, you can skip this step. Otherwise, you can
follow the standard instructions for creating a bucket.

### Google Cloud console

1. In the Google Cloud console, go to the Cloud Storage
 **Buckets** page.

 [Go to Buckets](https://console.cloud.google.com/storage/browser)
2. Click add\_box **Create**.
3. On the **Create a bucket** page, enter your bucket information. To go to the next
 step, click **Continue**.
 1. In the **Get started** section, do the following:
 - Enter a globally unique name that meets the
 [bucket naming requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements).
 - To add a
 [bucket label](https://cloud.google.com/storage/docs/tags-and-labels#bucket-labels),
 expand the **Labels** section (expand\_more),
 click *add\_box*
 **Add label**, and specify a `key` and a `value` for your label.
 2. In the **Choose where to store your data** section, do the following:
 1. Select a [Location type](https://cloud.google.com/storage/docs/locations).
 2. Choose a location where your bucket's data is permanently stored from the **[Location type](https://cloud.google.com/storage/docs/locations#available-locations)** drop-down menu.
 - If you select the [dual-region](https://cloud.google.com/storage/docs/locations#location-dr) location type, you can
 also choose to enable [turbo replication](https://cloud.google.com/storage/docs/availability-durability#turbo-replication) by using the
 relevant checkbox.
 3. To set up [cross-bucket replication](https://cloud.google.com/storage/docs/availability-durability#cross-bucket-replication), select
 **Add cross-bucket replication via Storage Transfer Service** and
 follow these steps:

 #### Set up cross-bucket replication

 1. In the **Bucket** menu, select a bucket.
 2. In the **Replication settings** section,
 click **Configure** to configure settings for the
 replication job.

 The **Configure cross-bucket replication** pane
 appears.

 - To filter objects to replicate by object name prefix,
 enter a prefix that you want to include or exclude objects from, then click add
 **Add a prefix**.
 - To set a storage class for the replicated objects,
 select a storage class from the **Storage class** menu.
 If you skip this step, the replicated objects will use the
 destination bucket's storage class by default.
 - Click **Done**.
 3. In the **Choose how to store your data** section, do the following:
 1. Select a [default storage class](https://cloud.google.com/storage/docs/storage-classes) for the bucket or
 [Autoclass](https://cloud.google.com/storage/docs/autoclass) for automatic storage class management of your
 bucket's data.
 2. To enable [hierarchical namespace](https://cloud.google.com/storage/docs/hns-overview), in the
 **Optimize storage for data-intensive workloads** section, select
 **Enable hierarchical namespace on this bucket**.
 **Note:** You cannot enable hierarchical namespace in existing
 buckets.
 4. In the **Choose how to control access to objects** section, select
 whether or not your bucket enforces [public access prevention](https://cloud.google.com/storage/docs/public-access-prevention),
 and select an [access control method](https://cloud.google.com/storage/docs/access-control) for your bucket's objects.
 **Note:** You cannot change the **Prevent public access** setting if this setting is enforced at an [organization policy](https://cloud.google.com/storage/docs/org-policy-constraints#public-access-prevention).
 5. In the **Choose how to protect object data** section, do the
 following:
 - Select any of the options under **Data protection** that you
 want to set for your bucket.
 - To enable [soft delete](https://cloud.google.com/storage/docs/soft-delete), click the
 **Soft delete policy (For data recovery)** checkbox,
 and specify the number of days you want to retain objects
 after deletion.
 - To set [Object Versioning](https://cloud.google.com/storage/docs/object-versioning), click the
 **Object versioning (For version control)** checkbox,
 and specify the maximum number of versions per object and the number of days after which
 the noncurrent versions expire.
 - To enable the retention policy on objects and buckets, click the **Retention (For compliance)** checkbox, and then do the following:
 - To enable [Object Retention Lock](https://cloud.google.com/storage/docs/object-lock), click the
 **Enable object retention** checkbox.
 - To enable [Bucket Lock](https://cloud.google.com/storage/docs/bucket-lock), click the **Set bucket retention policy** checkbox, and choose a unit of time and a length of time for your retention period.
 - To choose how your object data will be encrypted, expand the
 **Data encryption** section (expand\_more), and select a
 [**Data encryption** method](https://cloud.google.com/storage/docs/encryption).
4. Click **Create**.

### Command line

1. Create a Cloud Storage bucket and configure it as follows:
 - Replace `STORAGE_CLASS` with your preferred
 [storage class](https://cloud.google.com/storage/docs/storage-classes).
 - Replace `LOCATION` with your preferred location
 (`ASIA`, `EU`, or `US`)
 - Replace `BUCKET_NAME` with
 a bucket name that meets the
 [bucket name
 requirements](https://cloud.google.com/storage/docs/buckets#naming).

 ```python
 gcloud storage buckets create gs://BUCKET_NAME --default-storage-class STORAGE_CLASS --location LOCATION
 ```

## Install and initialize the Vertex AI SDK for Python

This section presumes that you have [set up a Python development environment](https://cloud.google.com/python/docs/setup),
or are using Colab (or any other suitable runtime that has set it up for you).

### (Optional) Set up a virtual environment

We also recommend [setting up a virtual environment](https://cloud.google.com/python/docs/setup#installing_and_using_virtualenv)
to isolate your dependencies.

### Installation

To minimize the set of dependencies that you have to install, we have separated
out the dependencies into:

- `agent_engines`: the set of packages required for deployment to Vertex AI Agent Engine.
- `adk`: the set of compatible Agent Development Kit packages.
- `langchain`: the set of compatible LangChain and LangGraph packages.
- `ag2`: the set of compatible AG2 packages.
- `llama_index`: the set of compatible LlamaIndex packages.

When installing the Vertex AI SDK for Python, you can specify the dependencies
required (separated by commas). To install all of them:

```python
pip install google-cloud-aiplatform[agent_engines,adk,langchain,ag2,llama_index]>=1.88.0
```

### Authentication

### Colab

Run the following code:

```python
from google.colab import auth

auth.authenticate_user(project_id="PROJECT_ID")

```

### Cloud Shell

No action required.

### Local Shell

Run the following command:

```python
gcloud auth application-default login
```

### Import and initialize the SDK

Run the following code to import and initialize the SDK for Vertex AI Agent Engine:

```python
import vertexai
from vertexai import agent_engines

vertexai.init(
 project="PROJECT_ID",
 location="LOCATION",
 staging_bucket="gs://BUCKET_NAME",
)

```

where

- `PROJECT_ID` is the Google Cloud [project ID](#project) under
 which you will [develop](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop) and [deploy](deploy.md) agents,
- `LOCATION` is one of the [supported regions](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview#supported-regions), and
- `BUCKET_NAME` is the name of the [Cloud Storage bucket](#storage)
 for staging the artifacts when [deploying agents](deploy.md).

## What's next

- [Develop an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/overview).
- [Troubleshoot setting up an environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/troubleshooting/set-up).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).