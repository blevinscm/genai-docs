---
title: Web-Grounding-for-Enterprisegoogle.com/vertex-ai/generative-ai/docs/grounding/web-grounding-enterprise
date_scraped: 2025-05-12
---

# Web Grounding for Enterprise 

This page describes Web Grounding for Enterprise compliance controls and how to use
the Web Grounding for Enterprise API to generate responses that are grounded on the
web. The indexed content is a subset of what's available on
Google Search and suitable for customers in highly-regulated
industries, such as finance, healthcare, and the public sector.

If you don't require the compliance controls, use [Ground with
Google Search](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/ground-with-google-search),
because it offers access to a broader web index.

## Overview

Web Grounding for Enterprise uses a web index that is used to generate grounded
responses. The web index supports the following:

- ML processing in the US or European multi-regions
- No logging of customer data
- [VPC Service Controls](https://cloud.google.com/vertex-ai/generative-ai/docs/security-controls)

Because no customer data is persisted, customer-managed encryption keys (CMEK)
and Access Transparency (AxT) aren't applicable.

## Use the API

This section provides sample requests of using the Generative AI API [Gemini 2](../gemini-v2.md) on
Vertex AI to create grounded responses with Gemini. To use the API, you
must set the following fields:

- **`Contents.parts.text`**: The text query users want to send to the API.
- **`tools.enterpriseWebSearch`**: When this tool is provided,
 Web Grounding for Enterprise can be used by Gemini.

Select a code sample to see how to use the API:

### Python

Replace the following variables with values:

- **`PROJECT_NUMBER`**: Your project number.
- **`LOCATION`**: The region where your model runs.
- **`MODEL_NAME`**: Your model.

```python
import requests
import subprocess
import json

def generate_content_with_gemini():
 """
 Sends a request to the Gemini 2.0 Flash model to generate content using Google's AI Platform.
 """

 # Replace with your actual project number and model name if different.
 project_id = PROJECT_NUMBER
 region = LOCATION
 model_name = MODEL_NAME # Or the correct model ID, including any version specifier

 endpoint = f"https://{region}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{region}/publishers/google/models/{model_name}:generateContent"

 # Get the access token using gcloud. Requires gcloud to be installed and configured.
 try:
 result = subprocess.run(["gcloud", "auth", "print-access-token"], capture_output=True, text=True, check=True)
 access_token = result.stdout.strip()
 except subprocess.CalledProcessError as e:
 print(f"Error getting access token: {e}")
 return None

 headers = {
 "Authorization": f"Bearer {access_token}",
 "Content-Type": "application/json",
 "x-server-timeout": "60" # in seconds
 }

 data = {
 "contents": [{
 "role": "user",
 "parts": [{
 "text": "Who won the 2024 Eurocup?"
 }]
 }],
 "tools": [{
 "enterpriseWebSearch": {
 }
 }]
 }

 try:
 response = requests.post(endpoint, headers=headers, json=data)
 response.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)
 return response.json()
 except requests.exceptions.RequestException as e:
 print(f"Request failed: {e}")
 return None

# Example usage:
if __name__ == "__main__":
 result = generate_content_with_gemini()

 if result:
 print(json.dumps(result, indent=2))
 else:
 print("Failed to generate content.")

```

### curl

Replace the following variables with values:

- **`PROJECT_NUMBER`**: Your project number.
- **`TEXT`**: Your prompt.

```python
 curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" -H "x-server-timeout: 60" https://us-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_NUMBER/locations/eu:generateGroundedContent -d '
 {
 "contents": [{
 "role": "user",
 "parts": [{
 "text": TEXT
 }]
 }],
 "tools": [{
 "enterpriseWebSearch": {
 }
 }]
 }
 }
 '

```

## What's next

- To learn more about how to ground Gemini models to your data, see
 [Ground to your data](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/ground-with-your-data#private-ground-gemini).
- To learn more about responsible AI best practices and Vertex AI's
 safety filters, see [Responsible AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).