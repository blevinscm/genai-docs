---
title: Security-bulletinsgoogle.com/vertex-ai/generative-ai/docs/security-bulletins
date_scraped: 2025-05-12
---

# Security bulletins 

The following describes all security bulletins related to
Vertex AI.

## GCP-2024-063

**Published**: 2024-12-06

| Description | Severity | Notes |
| --- | --- | --- |
| A vulnerability was discovered in the Vertex AI API serving Gemini multimodal requests, allowing bypass of [VPC Service Controls](https://cloud.google.com/vertex-ai/docs/general/vpc-service-controls). An attacker may be able to abuse the [`fileURI`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest/v1/projects.locations.tuningJobs#FileData) parameter of the API to exfiltrate data. **What should I do?** No actions needed. We've implemented a fix to return an error message when a media file URL is specified in the fileUri parameter and VPC Service Controls is enabled. Other use cases are unaffected. **What vulnerabilities are being addressed?** The Vertex AI API serving Gemini multimodal requests lets you include media files by specifying the URL of the media file in the `fileUri` parameter. This capability can be used to bypass VPC Service Controls perimeters. An attacker inside the service perimeter could encode sensitive data in the `fileURI` parameter to bypass the service perimeter. | Medium | [CVE-2024-12236](https://nvd.nist.gov/vuln/detail/CVE-2024-12236) |