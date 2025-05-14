---
date_scraped: 2025-05-12
title: Vertex Ai Agent Engine Overview
---

# Vertex AI Agent Engine overview 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/docs/general/vpc-service-controls) is
supported by Vertex AI Agent Engine. Data residency, CMEK, and AXT security controls aren't supported.

To see an example of getting started with ,
run the "Building and Deploying an Agent with " Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/intro_agent_engine.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fagent-engine%2Fintro_agent_engine.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fagent-engine%2Fintro_agent_engine.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/intro_agent_engine.ipynb)

Vertex AI Agent Engine (formerly known as LangChain on Vertex AI
or Vertex AI Reasoning Engine) is a fully managed Google Cloud service
enabling developers to deploy, manage, and scale AI agents in production. Agent
Engine handles the infrastructure to scale agents in production so you can focus
on creating intelligent and impactful applications. Vertex AI Agent Engine offers:

- **Fully managed**: Deploy and scale agents with a managed runtime that
 provides robust security features including VPC-SC compliance and
 comprehensive end-to-end management capabilities. Gain CRUD access to
 multi-agent applications that use Google Cloud Trace (supporting
 OpenTelemetry) for performance monitoring and [tracing](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage/tracing). To learn more, see
 [deploy an agent](deploy.md).
- **Quality and evaluation**: Ensure agent quality with the integrated
 [Gen AI Evaluation service](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/evaluate).
- **Simplified development**: Vertex AI Agent Engine abstracts away low-level tasks such
 as application server development and configuration of authentication and
 IAM, allowing you to focus on the unique capabilities of your
 agent, such as its behavior, tools, and model parameters. Furthermore, your
 agents can use any of the models and tools, such as [function
 calling](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling), in
 Vertex AI.
- **Framework agnostic**: Enjoy flexibility when deploying agents that you
 build using different python frameworks including [Agent Development Kit](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/adk),
 [LangGraph](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langgraph),
 [Langchain](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langchain),
 [AG2](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/ag2), and
 [LlamaIndex](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/llama-index/query-pipeline).
 If you already have an existing agent, you can
 adapt it to run on Vertex AI Agent Engine using the [custom
 template](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/custom) in our
 SDK. Otherwise, you can develop an agent from scratch using one of the
 [framework-specific
 templates](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/overview) we
 provide.

Vertex AI Agent Engine is part of [Vertex AI Agent Builder](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-builder/overview), a suite of features for discovering, building, and deploying AI agents.

**Note:** Because the name of Vertex AI Agent Engine changed over time, the
name of the resource in the API reference is
[`ReasoningEngine`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.reasoningEngines)
to maintain backwards compatibility.

## Create and deploy on Vertex AI Agent Engine

**Note:** For a streamlined, *IDE-based* development and deployment experience with Vertex AI Agent Engine, consider the [agent-starter-pack](https://github.com/GoogleCloudPlatform/agent-starter-pack). It provides ready-to-use templates, a built-in UI for experimentation, and simplifies deployment, operations, evaluation, customization, and observability.

The workflow for building an agent on Vertex AI Agent Engine is:

| Steps | Description |
| --- | --- |
| 1. [Set up the environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up) | Set up your Google project and install the latest version of the Vertex AI SDK for Python. |
| 2. [Develop an agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop) | Develop an agent that can be deployed on Vertex AI Agent Engine. |
| 3. [Deploy the agent](deploy.md) | Deploy the agent on the Vertex AI Agent Engine managed runtime. |
| 4. [Use the agent](use.md) | Query the agent by sending an API request. |
| 5. [Manage the deployed agent](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/manage) | Manage and delete agents that you have deployed to Vertex AI Agent Engine. |

The steps are illustrated by the following diagram:

## Supported frameworks

The following table describes the level of support Vertex AI Agent Engine provides for various agent frameworks:

| Support level | Agent frameworks |
| --- | --- |
| **Custom template**: You can adapt a custom template to support deployment to Vertex AI Agent Engine from your framework. | [CrewAI](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_crewai_agent_engine_customized_template.ipynb), [custom frameworks](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/custom) |
| **Vertex AI SDK integration**: Vertex AI Agent Engine provides managed templates per framework in the Vertex AI SDK and documentation. | [AG2](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/ag2), [LlamaIndex](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/llama-index/query-pipeline) |
| **Full integration**: Features are integrated to work across the framework, Vertex AI Agent Engine, and broader Google Cloud ecosystem. | [Agent Development Kit (ADK)](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/adk), [LangChain](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langchain), [LangGraph](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/develop/langgraph) |

## Use cases

To learn about Vertex AI Agent Engine with end-to-end examples, see the following
resources:

| Use Case | Description | Link(s) |
| --- | --- | --- |
| Build agents by connecting to public APIs | Convert between currencies. Create a function that connects to a currency exchange app, allowing the model to provide accurate answers to queries such as "What's the exchange rate for euros to dollars today?" | [Vertex AI SDK for Python notebook - Intro to Building and Deploying an Agent with Vertex AI Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/intro_agent_engine.ipynb) |
| Designing a community solar project. Identify potential locations, look up relevant government offices and suppliers, and review satellite images and solar potential of regions and buildings to find the optimal location to install your solar panels. | [Vertex AI SDK for Python notebook - Building and Deploying a Google Maps API Agent with Vertex AI Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_google_maps_agent.ipynb) |
| Build agents by connecting to databases | Integration with AlloyDB and Cloud SQL for PostgreSQL. | [Blog post - Announcing LangChain on Vertex AI for AlloyDB and Cloud SQL for PostgreSQL](https://cloud.google.com/blog/products/databases/alloydb-and-cloudsql-for-postgresql-on-langchain-on-vertex-ai) [Vertex AI SDK for Python notebook - Deploying a RAG Application with Cloud SQL for PostgreSQL to Vertex AI Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_cloud_sql_pg_rag_agent.ipynb) [Vertex AI SDK for Python notebook - Deploying a RAG Application with AlloyDB for PostgreSQL to Vertex AI Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_alloydb_rag_agent.ipynb) |
| Build agents with tools that access data in your database. | [Vertex AI SDK for Python notebook - Deploying an Agent with Vertex AI Agent Engine and MCP Toolbox for Databases](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_mcp_toolbox_for_databases.ipynb) |
| Query and understand structured datastores using natural language. | [Vertex AI SDK for Python notebook - Building a Conversational Search Agent with Vertex AI Agent Engine and RAG on Vertex AI Search](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_vertex_ai_search_rag_agent.ipynb) |
| Query and understand graph databases using natural language | [Blog post - GenAI GraphRAG and AI agents using Vertex AI Agent Engine with LangChain and Neo4j](https://www.googlecloudcommunity.com/gc/Cloud-Product-Articles/GenAI-GraphRAG-and-AI-agents-using-Vertex-AI-Reasoning-Engine/ta-p/789066) |
| Query and understand vector stores using natural language | [Blog post - Simplify GenAI RAG with MongoDB Atlas and Vertex AI Agent Engine](https://www.mongodb.com/developer/products/atlas/ragdeployment-vertex-ai-reasoning-engine/) |
| Build agents with Agent Development Kit (preview) | Build and deploy agents using Agent Development Kit. | [Agent Development Kit -- Deploy to Vertex AI Agent Engine](http://google.github.io/adk-docs/deploy/agent-engine) |
| Build agents with OSS frameworks | Build and deploy agents using the OneTwo open-source framework. | [Blog post - OneTwo and Vertex AI Agent Engine: exploring advanced AI agent development on Google Cloud](https://www.googlecloudcommunity.com/gc/Community-Blogs/OneTwo-and-Vertex-AI-Reasoning-Engine-exploring-advanced-AI/ba-p/788254) |
| Build and deploy agents using the LangGraph open-source framework. | [Vertex AI SDK for Python notebook - Building and Deploying a LangGraph Application with Vertex AI Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tutorial_langgraph.ipynb) |
| Debugging and optimizing agents | Build and trace agents using OpenTelemetry and Cloud Trace. | [Vertex AI SDK for Python notebook - Debugging and Optimizing Agents: A Guide to Tracing in Vertex AI Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/tracing_agents_in_agent_engine.ipynb) |

## Enterprise security

Vertex AI Agent Engine supports [VPC Service Controls](https://cloud.google.com/vertex-ai/docs/general/vpc-service-controls) to strengthen data security and mitigate the risks of data exfiltration. When VPC Service Controls is configured, the deployed agent retains secure access to Google APIs and services, such as BigQuery API, Cloud SQL Admin API, and Vertex AI API, ensuring seamless operation within your defined perimeter. Critically, VPC Service Controls effectively blocks all public internet access, confining data movement to your authorized network boundaries and significantly enhancing your enterprise security posture.

## Supported regions

Vertex AI Agent Engine is supported in the following regions:

| Region | Location | Description | Launch stage |
| --- | --- | --- | --- |
| `us-central1` | Iowa | `v1` and `v1beta1` versions are supported. | GA |
| `us-west1` | Oregon | `v1` and `v1beta1` versions are supported. | GA |
| `europe-west1` | Belgium | `v1` and `v1beta1` versions are supported. | GA |
| `europe-southwest1` | Madrid | `v1` and `v1beta1` versions are supported. | GA |
| `asia-east1` | Taiwan | `v1` and `v1beta1` versions are supported. | GA |
| `asia-northeast1` | Tokyo | `v1` and `v1beta1` versions are supported. | GA |

When using managed sessions with an ADK agent deployed to Vertex AI Agent Engine, the
following regions are supported:

| Region | Location | Description | Launch stage |
| --- | --- | --- | --- |
| `us-central1` | Iowa | `v1beta1` version is supported. | Preview |

## Quota

The following quotas and limits apply to [Vertex AI Agent Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview) for a given project in each region.

| Quota | Value |
| --- | --- |
| Create/Delete/Update Vertex AI Agent Engine per minute | 10 |
| Query/StreamQuery Vertex AI Agent Engine per minute | 60 |
| Maximum number of Vertex AI Agent Engine resources | 100 |

## Pricing

Pricing is based on compute (vCPU hours) and memory (GiB hours) resources used
by the agents that are deployed to the Vertex AI Agent Engine managed runtime.

| Product | SKU ID | Price |
| --- | --- | --- |
| ReasoningEngine vCPU | 8A55-0B95-B7DC | $0.0994/vCPU-Hr |
| ReasoningEngine Memory | 0B45-6103-6EC1 | $0.0105/GiB-Hr |

For more information, see [pricing](https://cloud.google.com/vertex-ai/pricing#agent_engine).

## What's next

- [Set up the environment](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up).
- [Get support](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support).