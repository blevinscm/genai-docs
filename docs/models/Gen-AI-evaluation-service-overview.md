---
date_scraped: 2025-05-12
title: Gen AI Evaluation Service Overview
---

# Gen AI evaluation service overview 

**Note:** Vertex AI provides model evaluation metrics for both predictive AI and generative AI models. This page provides an overview of the evaluation service for generative AI models. To evaluate a predictive AI model, see [Model
evaluation in Vertex AI](https://cloud.google.com/vertex-ai/docs/evaluation/introduction).

The Gen AI evaluation service in Vertex AI lets you evaluate any generative model or application and benchmark the evaluation results against your own judgment, using your own evaluation criteria.

While leaderboards and reports offer insights into overall model performance, they don't reveal how a model handles your specific needs. The Gen AI evaluation service helps you define your own evaluation criteria, ensuring a clear understanding of how well generative AI models and applications align with your unique use case.

Evaluation is important at every step of your Gen AI development process including model selection, prompt engineering, and model customization. Evaluating Gen AI is integrated within Vertex AI to help you launch and reuse evaluations as needed.

## Gen AI evaluation service capabilities

The Gen AI evaluation service can help you with the following tasks:

- **Model selection**: Choose the best pre-trained model for your task based on benchmark results and its performance on your specific data.
- **Generation settings**: Tweak model parameters (like temperature) to optimize output for your needs.
- **Prompt engineering**: Craft effective prompts and prompt templates to guide the model towards your preferred behavior and responses.
- **Improve and safeguard fine-tuning**: Fine-tune a model to improve performance for your use case, while avoiding biases or undesirable behaviors.
- **RAG optimization**: Select the most effective Retrieval Augmented Generation (RAG) architecture to enhance performance for your application.
- **Migration**: Continuously assess and improve the performance of your AI solution by migrating to newer models when they provide a clear advantage for your specific use case.
- **Translation** (preview): Assess the quality of your model's translations.
- **Evaluate agents**: Evaluate the performance of your agents using the Gen AI evaluation service.

## Evaluation process

The Gen AI evaluation service lets you evaluate any Gen AI model or application on your evaluation criteria by following these steps:

1. [**Define evaluation metrics**](determine-eval.md):

 - Learn how to tailor model-based metrics to your business criteria.
 - Evaluate a single model (pointwise) or determine the winner when comparing 2 models (pairwise).
 - Include computation-based metrics for additional insights.
2. [**Prepare your evaluation dataset**](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-dataset).

 - Provide a dataset that reflects your specific use case.
3. [**Run an evaluation**](https://cloud.google.com/vertex-ai/generative-ai/docs/models/run-evaluation).

 - Start from scratch, use a template, or adapt existing examples.
 - Define candidate models and create an `EvalTask` to reuse your evaluation logic through Vertex AI.
4. [**View and interpret your evaluation results**](https://cloud.google.com/vertex-ai/generative-ai/docs/models/view-evaluation).
5. (Optional) Evaluate and improve the quality of the judge model:

 - [Evaluate the judge model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluate-judge-model).
 - Use [advanced prompt engineering techniques](https://cloud.google.com/vertex-ai/generative-ai/docs/models/prompt-judge-model) for judge model customization.
 - Use [system instructions and judge model configurations](https://cloud.google.com/vertex-ai/generative-ai/docs/models/configure-judge-model) to improve evaluate results consistency and reduce judge model bias.
6. (Optional) [Evaluate generative AI agents](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-agents).

## Notebooks for evaluation use cases

The following table lists Vertex AI SDK for Python notebooks for various generative AI evaluation use cases:

| Use case | Description | Links to notebooks |
| --- | --- | --- |
| Evaluate models | Quickstart: Introduction to Gen AI evaluation service SDK. | [Getting Started with Gen AI evaluation service SDK](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/intro_to_gen_ai_evaluation_service_sdk.ipynb) |
| Evaluate and select first-party (1P) foundation models for your task. | [Evaluate and select first-party (1P) foundation models for your task](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/compare_generative_ai_models.ipynb) |
| Evaluate and select Gen AI model settings: Adjust temperature, output token limit, safety settings and other model generation configurations of Gemini models on a summarization task and compare the evaluation results from different model settings on several metrics. | [Compare different model parameter settings for Gemini](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluate_and_compare_gemini_model_settings.ipynb) |
| Evaluate third-party (3P) models on Vertex AI Model Garden. This notebook provides a comprehensive guide to evaluating both Google's Gemini models and 3P language models using the Gen AI evaluation service SDK. Learn how to assess and compare models from different sources, including open and closed models, model endpoints, and 3P client libraries using various evaluation metrics and techniques. Gain practical experience in conducting controlled experiments and analyzing model performance across a range of tasks. | [Use Gen AI evaluation service SDK to Evaluate Models in Vertex AI Studio, Model Garden, and Model Registry](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluate_models_in_vertex_ai_studio_and_model_garden.ipynb) |
| Migrate from PaLM to Gemini model with Gen AI evaluation service SDK. This notebook guides you through evaluating PaLM and Gemini foundation models using multiple evaluation metrics to support decisions around migrating from one model to another. We visualize these metrics to gain insights into the strengths and weaknesses of each model, helping you make an informed decision about which one aligns best with the specific requirements of your use case. | [Compare and migrate from PaLM to Gemini model](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/compare_and_migrate_from_palm_to_gemini.ipynb) |
| Evaluate translation models. This notebook shows you how to use the Vertex AI SDK for the Gen AI evaluation service to measure the translation quality of your large language model (LLM) responses using BLEU, MetricX, and COMET. | [Evaluate a translation model](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluate_translation.ipynb) |
| Evaluate prompt templates | Prompt engineering and prompt evaluation with Gen AI evaluation service SDK. | [Evaluate and Optimize Prompt Template Design for Better Results](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/prompt_engineering_gen_ai_evaluation_service_sdk.ipynb) |
| Evaluate Gen AI applications | Evaluate Gemini model tool use and function calling capabilities. | [Evaluate Gemini Model Tool Use](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluate_gemini_tool_use.ipynb) |
| Evaluate generated answers from Retrieval-Augmented Generation (RAG) for a question-answering task with Gen AI evaluation service SDK. | [Evaluate Generated Answers from Retrieval-Augmented Generation (RAG)](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluate_rag_gen_ai_evaluation_service_sdk.ipynb) |
| Evaluate LangChain chatbots with Vertex AI Gen AI evaluation service. This notebook demonstrates how to evaluate a LangChain conversational chatbot using the Vertex AI Gen AI evaluation service SDK. It covers data preparation, LangChain chain setup, creating custom evaluation metrics, and analyzing results. The tutorial uses a recipe suggestion chatbot as an example and shows how to improve its performance by iterating on the prompt design. | [Evaluate LangChain](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluate_langchain_chains.ipynb) |
| Evaluate Gen AI agents | Evaluate an agent built with agent frameworks such as LangGraph and CrewAI. | - [Evaluate a LangGraph agent](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluating_langgraph_agent.ipynb) - [Evaluate a CrewAI agent](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluating_crewai_agent.ipynb) |
| Use the Gen AI evaluation service and Vertex AI Agent Engine to evaluate agents built using agent frameworks. | - [Evaluate a LangChain agent with Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_langchain_agent_engine_prebuilt_template.ipynb) - [Evaluate a LangGraph agent with Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_langgraph_agent_engine_customized_template.ipynb) - [Evaluate a CrewAI agent with Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_crewai_agent_engine_customized_template.ipynb) |
| Metric customization | Customize model-based metrics and evaluate a generative AI model according to your specific criteria using the following features: - **Templated customization**: Use predefined fields to help define your pointwise and pairwise model-based metrics. - **Full customization**: Gain complete control over the design of your pointwise and pairwise model-based metrics. | [Customize Model-based Metrics to evaluate a Gen AI model](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/customize_model_based_metrics.ipynb) |
| Evaluate generative AI models with your locally-defined custom metric, and bring your own judge model to perform model-based metric evaluation. | [Bring-Your-Own-Autorater using Custom Metric](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/bring_your_own_autorater_with_custom_metric.ipynb) |
| Define your own computation-based custom metric functions, and use them for evaluation with Gen AI evaluation service SDK. | [Bring your own computation-based Custom Metric](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/bring_your_own_computation_based_metric.ipynb) |
| Other topics | Gen AI evaluation service SDK Preview-to-GA Migration Guide. This tutorial guides you through the migration process from the Preview version to the latest GA version of the Vertex AI SDK for Python for Gen AI evaluation service. The guide also showcases how to use the GA version SDK to evaluate Retrieval-Augmented Generation (RAG) and compare two models using pairwise evaluation. | [Gen AI evaluation service SDK Preview-to-GA Migration Guide](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/migration_guide_preview_to_GA_sdk.ipynb) |

## Supported models and languages

The Vertex AI Gen AI evaluation service supports Google's foundation models, third party models, and open models. You can provide pre-generated predictions directly, or automatically generate candidate model responses in the following ways:

- Automatically generate responses for Google's foundation models (such as Gemini 2.0 Flash) and any model deployed in Vertex AI Model Registry.
- Integrate with SDK text generation APIs from other third party and open models.
- Wrap model endpoints from other providers using the Vertex AI SDK.

For Gemini model-based metrics, the Gen AI evaluation service supports all input languages that are [supported by Gemini 2.0 Flash](../learn/models.md). However, the quality of evaluations for non-English inputs may not be as high as the quality for English inputs.

The Gen AI evaluation service supports the following languages for model-based translation metrics:

### MetricX

**Supported languages for [MetricX](https://github.com/google-research/metricx)**: Afrikaans, Albanian, Amharic, Arabic, Armenian, Azerbaijani, Basque, Belarusian, Bengali, Bulgarian, Burmese, Catalan, Cebuano, Chichewa, Chinese, Corsican, Czech, Danish, Dutch, English, Esperanto, Estonian, Filipino, Finnish, French, Galician, Georgian, German, Greek, Gujarati, Haitian Creole, Hausa, Hawaiian, Hebrew, Hindi, Hmong, Hungarian, Icelandic, Igbo, Indonesian, Irish, Italian, Japanese, Javanese, Kannada, Kazakh, Khmer, Korean, Kurdish, Kyrgyz, Lao, Latin, Latvian, Lithuanian, Luxembourgish, Macedonian, Malagasy, Malay, Malayalam, Maltese, Maori, Marathi, Mongolian, Nepali, Norwegian, Pashto, Persian, Polish, Portuguese, Punjabi, Romanian, Russian, Samoan, Scottish Gaelic, Serbian, Shona, Sindhi, Sinhala, Slovak, Slovenian, Somali, Sotho, Spanish, Sundanese, Swahili, Swedish, Tajik, Tamil, Telugu, Thai, Turkish, Ukrainian, Urdu, Uzbek, Vietnamese, Welsh, West Frisian, Xhosa, Yiddish, Yoruba, Zulu.

### COMET

**Supported languages for [COMET](https://huggingface.co/Unbabel/wmt22-comet-da#languages-covered**)**: Afrikaans, Albanian, Amharic, Arabic, Armenian, Assamese, Azerbaijani, Basque, Belarusian, Bengali, Bengali Romanized, Bosnian, Breton, Bulgarian, Burmese, Burmese, Catalan, Chinese (Simplified), Chinese (Traditional), Croatian, Czech, Danish, Dutch, English, Esperanto, Estonian, Filipino, Finnish, French, Galician, Georgian, German, Greek, Gujarati, Hausa, Hebrew, Hindi, Hindi Romanized, Hungarian, Icelandic, Indonesian, Irish, Italian, Japanese, Javanese, Kannada, Kazakh, Khmer, Korean, Kurdish (Kurmanji), Kyrgyz, Lao, Latin, Latvian, Lithuanian, Macedonian, Malagasy, Malay, Malayalam, Marathi, Mongolian, Nepali, Norwegian, Oriya, Oromo, Pashto, Persian, Polish, Portuguese, Punjabi, Romanian, Russian, Sanskrit, Scottish, Gaelic, Serbian, Sindhi, Sinhala, Slovak, Slovenian, Somali, Spanish, Sundanese, Swahili, Swedish, Tamil, Tamil Romanized, Telugu, Telugu Romanized, Thai, Turkish, Ukrainian, Urdu, Urdu Romanized, Uyghur, Uzbek, Vietnamese, Welsh, Western, Frisian, Xhosa, Yiddish.

## What's next

- Try the [evaluation quickstart](evaluation-quickstart.md).
- [Define your evaluation metrics](determine-eval.md).
- Learn how to [tune a foundation model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models).