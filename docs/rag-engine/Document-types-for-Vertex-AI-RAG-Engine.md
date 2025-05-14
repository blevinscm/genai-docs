---
date_scraped: 2025-05-12
title: Document Types For Vertex Ai Rag Engine
---

# Document types for Vertex AI RAG Engine 

The [VPC-SC security control](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls) is
supported by RAG Engine. Data residency, CMEK, and AXT security controls aren't supported.

The following table shows the file types and their file size limits:

| File type | File size limit |
| --- | --- |
| Google documents | 10 MB when exported from Google Workspace |
| Google drawings | 10 MB when exported from Google Workspace |
| Google slides | 10 MB when exported from Google Workspace |
| HTML file | 10 MB |
| JSON file | 1 MB |
| Markdown file | 10 MB |
| Microsoft PowerPoint slides (PPTX file) | 10 MB |
| Microsoft Word documents (DOCX file) | 50 MB |
| PDF file | 50 MB |
| Text file | 10 MB |

Using Vertex AI RAG Engine with other document types is possible but
can generate lower-quality responses.

## What's next

- [Fine-tune RAG transformations](https://cloud.google.com/vertex-ai/generative-ai/docs/fine-tune-rag-transformations)