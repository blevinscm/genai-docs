---
date_scraped: 2025-05-12
title: Vertex Ai Agent Builder Overview
---

# Vertex AI Agent Builder overview 

Vertex AI Agent Builder is a suite of features for building and
deploying AI agents. It consists of the following components:

- **Agent Garden** is a library where you can find and explore sample agents
 and tools that are designed to accelerate your development.

 [Go to Agent Garden](https://console.cloud.google.com/vertex-ai/agents/agent-garden)

 **Preview:** Support for Agent Garden is in [preview](https://cloud.google.com/products#product-launch-stages).
- [**Agent Development Kit**](https://google.github.io/adk-docs/)
 (ADK) is an open-source framework that simplifies the process of building
 sophisticated multi-agent systems while maintaining precise control over
 agent behavior.

 **Preview:** Support for ADK is in [preview](https://cloud.google.com/products#product-launch-stages).
- **Agent Tools** are tools that you can equip your ADK agent to use, including:

 - [Built-in tools](https://google.github.io/adk-docs/tools/built-in-tools/) such as [Grounding with Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/ground-with-google-search), [Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction), and [Code Execution](../multimodal/code-execution_1.md)
 - [RAG Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-quickstart#run-rag) for retrieval-augmented generation (RAG)
 - [Google Cloud tools](https://google.github.io/adk-docs/tools/google-cloud-tools/) to connect to:

 - Your APIs managed in [Apigee API Hub](/apigee/docs/apihub/what-is-api-hub)
 - 100+ enterprise applications through [Integration Connectors](/integration-connectors/docs/all-integration-connectors)
 - Custom integrations with [Application Integration](/application-integration/docs/overview)
 - [Model Context Protocol (MCP) tools](https://google.github.io/adk-docs/tools/mcp-tools/)
 - [Ecosystem tools](https://google.github.io/adk-docs/tools/third-party-tools/) such as LangChain tools, CrewAI tools, and [GenAI Toolbox for Databases](https://github.com/googleapis/genai-toolbox)
- [**Vertex AI Agent Engine**](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview)
 is a fully-managed runtime to deploy, manage, and scale your agents in
 production. You can evaluate, monitor, and trace your agent's behavior for
 continuous improvement and auditing.

The following diagram shows the components of AI Applications:

To learn more about AI agents in general, see:

- our blog post on [multi-agent systems with Vertex AI](/blog/products/ai-machine-learning/build-and-manage-multi-system-agents-with-vertex-ai)
- [What are AI Agents?](/discover/what-are-ai-agents)

## Workflow for building and deploying agents

1. Discover agent samples and tools specific to your use cases in the [Agent Garden](https://console.cloud.google.com/vertex-ai/agents/agent-garden).
2. Build and test your agent using the Agent Development Kit.
3. Deploy your agent to Vertex AI Agent Engine.

## What's next

- [Agent Development Kit Quickstart](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-development-kit/quickstart)