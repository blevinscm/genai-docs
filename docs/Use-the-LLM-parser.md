---
title: Use-the-LLM-parsergoogle.com/vertex-ai/generative-ai/docs/llm-parser
date_scraped: 2025-05-12
---

# Use the LLM parser 

**Preview**

Some of the RAG features are Preview offerings, subject to the "Pre-GA Offerings Terms"
of the [Google Cloud Service Specific
Terms](https://cloud.google.com/terms/service-terms). Pre-GA products and features may have limited support, and changes to Pre-GA products
and features may not be compatible with other Pre-GA versions. For more information, see the [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).
Further, by using the Gemini API on Vertex AI, you agree to the Generative AI Preview [terms and conditions](https://cloud.google.com/trustedtester/aitos) (Preview
Terms).

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

This page explains how to use the Vertex AI RAG Engine LLM parser.

## Introduction

Vertex AI RAG Engine uses LLMs for document parsing. LLMs have
the ability to effectively process documents in the following ways:

- Understand and interpret semantic content across various formats.
- Retrieve relevant document chunks.
- Extract meaningful information from documents.
- Identify relevant sections in documents.
- Accurately summarize complex documents.
- Understand and interact with visuals.
- Extract data from charts and diagrams.
- Describe images.
- Understand relationships between charts and text.
- Provide more contextually rich and accurate responses.

The capabilities of the Vertex AI RAG Engine significantly
improves the quality of generated responses.

## Supported models

The LLM parser only supports Gemini models. If you have the RAG API
enabled, you have access to the supported models. For a list of supported
generation models, see [Generative models](https://cloud.google.com/vertex-ai/generative-ai/docs/supported-rag-models).

## Supported file types

The following file types are supported by the LLM parser:

- `application/pdf`
- `image/png`
- `image/jpeg`
- `image/webp`
- `image/heic`
- `image/heif`

## Pricing and quotas

For pricing details, see [Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing).

For quotas that apply, see [Request quotas](quotas.md).

The LLM parser calls Gemini models to parse your documents. This
creates additional costs, which are charged to your project. The cost can be
roughly estimated using this formula:

```python
cost = number_of_document_files * average_pages_per_document *
(average_input_tokens * input_token_pricing_of_selected_model +
average_output_tokens * output_token_pricing_of_selected_model)
```

For example, you have 1,000 PDF files, and each PDF file has 50 pages. The
average PDF page has 500 tokens, and we need an additional 100 tokens for
prompting. The average output is 100 tokens.

Gemini 2.0 Flash-Lite is used in your configuration for
parsing, and it costs $0.075 for 1M input tokens and $0.3 for output text
tokens.

**Note:** This example is for an educational purpose on how to estimate your cost.
It doesn't reflect the real cost you pay for every indexing request using the
LLM parser.

```python
cost = 1,000 * 50 * (600 * 0.075 / 1M + 100 * 0.3 / 1M) = 3.75

```

The cost is $3.75.

## Import files with `LlmParser` enabled

Replace the values in the following variables used in the code samples:

- **PROJECT\_ID**: The ID for your Google Cloud project.
- **LOCATION**: The region where your request is processed.
- **RAG\_CORPUS\_RESOURCE**: The ID of your corpus.
- **GCS\_URI**: The Cloud Storage URI of the
 files you want to import.
- **GOOGLE\_DRIVE\_URI**: The Google Drive URI
 of the files you want to import.
- **MODEL\_NAME**: The resource name of the model used for
 parsing.

 Format:
 `projects/{project_id}/locations/{location}/publishers/google/models/{model_id}`
- **CUSTOM\_PARSING\_PROMPT**: Optional: Custom
 prompt that is configured by the customer for LLM parser to use for parsing
 documents.
- **MAX\_PARSING\_REQUESTS\_PER\_MIN**: Optional:
 The maximum number of requests the job can make to the
 Vertex AI model per minute. For more information, see
 [Generative AI on Vertex AI rate limits](quotas.md) and
 the [Quotas & System Limits](https://console.cloud.google.com/iam-admin/quotas) page for your
 project to set an appropriate value.

### REST

```python
 curl -X POST \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/ragCorpora/RAG_CORPUS_RESOURCE/ragFiles:import" -d '{
 "import_rag_files_config": {
 "gcs_source": {
 "uris": ["GCS_URI", "GOOGLE_DRIVE_URI"]
 },
 "rag_file_chunking_config": {
 "chunk_size": 512,
 "chunk_overlap": 102
 },
 "rag_file_parsing_config": {
 "llm_parser": {
 "model_name": "MODEL_NAME",
 "custom_parsing_prompt": "CUSTOM_PARSING_PROMPT"
 "max_parsing_requests_per_min": "MAX_PARSING_REQUESTS_PER_MIN"
 }
 }
 }
 }'

```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the
Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk). For
more information, see the [Python API reference
documentation](https://cloud.google.com/python/docs/reference/aiplatform/latest).

```python
 from vertexai.preview import rag
 import vertexai

 PROJECT_ID = "PROJECT_ID"
 CORPUS_NAME = "RAG_CORPUS_RESOURCE"
 LOCATION = "LOCATION"
 MODEL_ID = "MODEL_ID"
 MODEL_NAME = "projects/{PROJECT_ID}/locations/{LOCATION}/publishers/google/models/{MODEL_ID}"
 MAX_PARSING_REQUESTS_PER_MIN = MAX_PARSING_REQUESTS_PER_MIN # Optional
 CUSTOM_PARSING_PROMPT = "Your custom prompt" # Optional

 PATHS = ["https://drive.google.com/file/123", "gs://my_bucket/my_files_dir"]

 # Initialize Vertex AI API once per session
 vertexai.init(project={PROJECT_ID}, location={LOCATION})

 transformation_config = rag.TransformationConfig(
 chunking_config=rag.ChunkingConfig(
 chunk_size=1024, # Optional
 chunk_overlap=200, # Optional
 ),
 )

 llm_parser_config = rag.LlmParserConfig(
 model_name = MODEL_NAME,
 max_parsing_requests_per_min=MAX_PARSING_REQUESTS_PER_MIN, # Optional
 custom_parsing_prompt=CUSTOM_PARSING_PROMPT, # Optional
 )

 rag.import_files(
 CORPUS_NAME,
 PATHS,
 llm_parser=llm_parser_config,
 transformation_config=transformation_config,
 )

```

## Prompting

The Vertex AI RAG Engine LLM parser uses a predefined and tuned prompt
for parsing documents. However, if you have specialized documents that might not
be suitable for a general prompt, you have the option to specify your custom
parsing prompt when using the API. When requesting Gemini to parse your
documents, Vertex AI RAG Engine appends a prompt to your default
system prompt.

### Prompt template table

To help with document parsing, the following table provides a prompt template
example to guide you in creating prompts that Vertex AI RAG Engine can use to parse your documents:

| **Instruction** | **Template statement** | **Example** |
| --- | --- | --- |
| Specify role. | You are a/an [Specify the role, such as a factual data extractor or an information retriever]. | You are an information retriever. |
| Specify task. | Extract [Specify the type of information, such as factual statements, key data, or specific details] from the [Specify the document source, such as a document, text, article, image, table]. | Extract key data from the sample.txt file. |
| Explain how you want the LLM to generate the output according to your documents. | Present each fact in a [Specify the output format, such as a structured list or text format], and link to its [Specify the source location, such as a page, paragraph, table, or row]. | Present each fact in a structured list, and link to its sample page. |
| Highlight what should be the focus of the LLM. | Extract [Specify the key data types, such as the names, dates, numbers, attributes, or relationships] exactly as stated. | Extract names and dates. |
| Highlight what you want the LLM to avoid. | [List the actions to avoid, such as analysis, interpretation, summarizing, inferring, or giving opinions]. Extract only what the document explicitly says. | No giving opinions. Extract only what the document explicitly says. |

### General guidance

Follow these guidelines to write your prompt to send to the LLM parser.

- **Specific**: Clearly define the task and the type of information to be
 extracted.
- **Detailed**: Provide detailed instructions on output format, source
 attribution, and handling of different data structures.
- **Constraining**: Explicitly state what the AI shouldn't do such as analysis
 or interpretation.
- **Clear**: Use clear and directive language.
- **Structured**: Organize instructions logically using numbered lists or bullet
 points for readability.

## Parsing quality analysis

This table lists results from scenarios that customers ran using
Vertex AI RAG Engine. The feedback shows that the LLM parser improves
the quality of parsing documents.

| **Scenario** | **Result** |
| --- | --- |
| Parsing information across slides and linking sections | The LLM parser successfully linked section titles on one slide to the detailed information presented on subsequent slides. | |
| Understanding and extracting information from tables | The LLM parser correctly related columns and headers within a large table to answer specific questions. |
| Interpreting flowcharts | The LLM parser was able to follow the logic of a flowchart and extract the correct sequence of actions and corresponding information. |
| Extracting data from graphs | The LLM parser could interpret different types of graphs, such as line graphs, and extract specific data points based on the query. |
| Capturing relationships between headings and text | The LLM parser, guided by the prompt, paid attention to heading structures and could retrieve all relevant information associated with a particular topic or section. |
| Potential to overcome embedding limitations with prompt engineering | While initially hampered by embedding model limitations in some use cases, additional experiments demonstrated that a well-crafted LLM parser prompt could potentially mitigate these issues and retrieve the correct information even when semantic understanding is challenging for the embedding model alone. |

The LLM parser enhances the LLM's ability to understand and reason about the
context within a document, which leads to more accurate and comprehensive
responses.

## Retrieval query

After you enter a prompt that's sent to a generative AI model, the retrieval
component in RAG searches through its knowledge base to find information that's
relevant to the query. For an example of retrieving RAG files from a corpus
based on a query text, see [Retrieval
query](model-reference/rag-api.md).

## What's next

- To learn more about Vertex AI RAG Engine, see
 [Vertex AI RAG Engine overview](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview).
- To learn more about the Vertex AI RAG Engine, see
 [Vertex AI RAG Engine API](model-reference/rag-api.md).