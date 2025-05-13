---
title: Financial-QA-Deductivegoogle.com/vertex-ai/generative-ai/docs/prompt-gallery/samples/answer_question_financial_qa_-_deductive
date_scraped: 2025-05-12
---

# Financial QA - Deductive 

Ask deductive questions about a (long) financial document.

| | |
| --- | --- |
| You can query a model directly and test the results returned when using different parameter values with the Cloud console, or by calling the Vertex AI API directly. - For an example of using the Vertex AI API, see [Quickstart using the Vertex AI API](../../start/quickstarts/api-quickstart.md). - To view this sample in the Cloud console: [Go to Google Cloud console](https://console.cloud.google.com/vertex-ai/generative/language/prompt-examples/Financial%20QA%20-%20Deductive) | |
| Prompt Freeform [financial\_qa\_example\_JNJ\_2021\_10K.pdf](https://storage.mtls.cloud.google.com/cloud-samples-data/generative-ai/pdf/financial_qa_deductive.pdf) How much did net earnings grow from FY2020 to FY2021? Response Net earnings grew from $14.714 billion in FY2020 to $20.878 billion in FY2021, representing a **41.9%** increase. **Supporting Information:** This information can be found in the **Consolidated Statements of Earnings** (page 48 of the document). Specifically, the "Net earnings" row shows: - **2021:** $20,878 million - **2020:** $14,714 million To calculate the growth: ($20,878 - $14,714) / $14,714 = 41.9% increase. | | | | | --- | --- | | **Model:** | gemini-1.5-flash-002 | | **Temperature:** | 0.2 | | **Max output tokens:** | 8192 | | **TopK:** | 40.0 | | **TopP:** | 0.95 | |