---
title: Grounding-with-Google-Maps-in-Vertex-AIgoogle.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-maps
date_scraped: 2025-05-12
---

# Grounding with Google Maps in Vertex AI 

**Experimental**

Grounding with Google Maps in Vertex AI is covered by the Pre-GA
Offerings Terms of the Google Cloud Terms of Service. Pre-GA features may have
limited support, and changes to pre-GA features may not be compatible with other
pre-GA versions. For more information, see the launch stage descriptions.

Grounding with Google Maps in Vertex AI is available for testing by
customers in the United States.

Grounding with Google Maps in Vertex AI combines the power of Gemini with
Google Maps, which has access to information on over 250 million places. This
important integration that's available through Vertex AI is designed
to help you create a new generation of generative applications.

This page explains how you can use Google Maps to ground your LLM responses.

## Overview

Grounding with Google Maps in Vertex AI is a service that lets you use Google Maps data with
LLMs to provide more accurate and context-aware responses to your prompts.
Grounding with Google Maps is integrated with Vertex AI to support
your use of geographical data with your Gemini model.

Grounding with Google Maps helps you to discover new places, plan for events,
and get recommendations for a variety of locations. You can do the following:

- Ask a conversational assistant about the area and any nearby places. Your
 assistant has access to the travel time information and can let you know how
 far a place is from your location. For example, *Are there any parks nearby?*
- See personalized descriptions of the place that matches your criteria. For
 example, *Can you tell me more about the parks and any family-friendly
 restaurants that are within a walkable distance?*

Grounding with Google Maps lets you create generative AI applications from an
LLM-powered chat using geospatial context to generate a personalized
location-based summary to help you make better decisions.

For assistance, send a message to `maps-grounding-feedback-external@google.com`.

## Supported models

This section lists the models that support grounding with Google Maps.

- [Vertex AI Model Optimizer](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/vertex-ai-model-optimizer)
- [Gemini 2.5 Pro](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](../models/gemini/2-5-flash.md)
- [Gemini 2.0 Flash](../models/gemini/2-0-flash.md)

For more information about the Gemini models, see [Gemini models](../learn/models.md).

## Access to Grounding with Google Maps

To use Grounding with Google Maps in Vertex AI, follow these steps:

1. To request access to use Grounding with Google Maps in Vertex AI for specific projects,
 complete and submit the
 [Opt-in or Opt-out to use Google Maps form](https://docs.google.com/forms/d/e/1FAIpQLSdJixRKhCjPQ6jO34tHLtTzaypHE4FDKpX2BFsUwHrOLLg9IQ/viewform).

 This form requires your email address, company name, project ID, and your
 acceptance of the terms.
2. If you don't have a project, see [Creating and
 managing projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
3. In the Google Cloud console, go to the **Maps Grounding API** page.

 [Go to **Maps Grounding API**](https://console.cloud.google.com/marketplace/product/google/mapsgrounding.googleapis.com?q=search&referrer=search&inv=1&invt=AbtQYw&project=google.com:graphic-catcher-858))

 To enable the Maps Grounding API, click **Enable**. Select a project,
 and the **Maps Grounding API** page displays.
4. In the Google Cloud console, go to the **Maps JavaScript API** page.

 [Go to **Maps JavaScript API**](https://console.cloud.google.com/marketplace/product/google/maps-backend.googleapis.com?q=search&referrer=search&inv=1&invt=AbtQYw&project=google.com:graphic-catcher-858))

 To enable JavaScript, click **Enable**. Select a project, and the
 **APIs & Services** page displays.
5. To verify that Google Maps is enabled, go to Vertex AI Studio.

 [Go to **Vertex AI Studio**](https://console.cloud.google.com/vertex-ai/studio/multimodal?model=gemini-2.0-flash-001&invt=AbtiYw))

 1. Select the project that you enabled the APIs for.
 2. To turn on the Google Maps feature in the **Tools** section of the
 model's pane, click the **Grounding: Google** toggle.
 3. Select **Google Maps Preview**.
 4. Enter the **API Key**.

 1. If you don't have an API Key, see [Creating API keys](https://developers.google.com/maps/documentation/places/web-service/get-api-key#creating-api-keys).
 2. Limit use of the APIs by [Restricting API keys](https://developers.google.com/maps/documentation/places/web-service/get-api-key#restrict_key).
 5. Select the **Location** for a location-based response.
 6. Click **Apply**.

## Place properties

This section lists place properties that are used to describe locations and used
by Grounding with Google Maps to generate responses. These properties are
used to determine the types of questions that Grounding with Google Maps can
answer.

### Sample place properties

This list provides an alphabetized sampling of properties about places that
might be used by your model to generate responses.

- Address
- Cash only
- Credit card
- Curbside pickup
- Debit card
- Distance
- Free parking lot
- Live music
- Menu for children
- Opening hours
- Pet friendly
- Serves beer
- Serves vegetarian food
- Wheelchair accessible
- Wifi

### Examples of using place properties

The following examples use [place properties](#place-properties) in questions
about different types of places. Grounding with Google Maps uses the
properties to understand your intent and then provides relevant answers based on
the data associated with places in Google Maps.

- **Plan a family dinner**: You might ask, *Is "The Italian Place" good for
 children, and do they offer takeout? What is their rating?*

 Answers to these
 questions help you to determine if a restaurant is suitable for a family and
 if the restaurant offers a convenient service.
- **Check accessibility for a friend**: You might ask, *I need a restaurant that
 has a wheelchair accessible entrance.*

 A response to this prompt might help
 you to determine if the location meets specific accessibility needs.
- **Find a location for a late-night snack**: You might ask, *Is "Burger Joint"
 open now? Do they serve dinner? What are their opening hours for Friday?*

 Answers to these questions help you to find an open establishment serving a
 specific meal during a particular time.
- **Meet a client for coffee**: You might ask, *Does "Cafe Central" have Wifi?
 Do they serve coffee? What is their price level, and do they accept credit
 cards?*

 Answers to these questions help you to assess the suitability of a
 cafe for a business meeting based on amenities, offerings, and payment
 options.

## Use Grounding with Google Maps to ground your model

You can use the Google Maps API to ground your model's responses.

These code samples demonstrate how to use the Maps API to ground your model's
responses using Grounding with Google Maps.

### REST

Before using any of the request data,
make the following replacements:

- LOCATION: The region to process the request.
- PROJECT\_ID: Your [project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- MODEL\_ID: The model ID of the multimodal model.
- TEXT:
 The text instructions to include in the prompt.
- API\_KEY: Your API key.
- LATITUDE: The latitude of the location.
- LONGITUDE: The longitude of the location.

HTTP method and URL:

```python
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent
```

Request JSON body:

```python
{
 "contents": [{
 "role": "user",
 "parts": [{
 "text": "TEXT"
 }]
 }],
 "tools": [{
 "googleMaps": {
 "authConfig": {
 "apiKeyConfig": {
 "apiKeyString": "API_KEY"
 }
 }
 }
 }],
 "toolConfig": {
 "retrievalConfig": {
 "latLng": {
 "latitude": LATITUDE,
 "longitude": LONGITUDE
 }
 }
 },
 "model": "projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID"
}

```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
, or by using [Cloud Shell](https://cloud.google.com/shell/docs),
which automatically logs you into the `gcloud` CLI
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
curl -X POST \ 
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \ 
 -H "Content-Type: application/json; charset=utf-8" \ 
 -d @request.json \ 
 "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"
```

#### PowerShell (Windows)

**Note:**
The following command assumes that you have logged in to
the `gcloud` CLI with your user account by running
[`gcloud init`](https://cloud.google.com/sdk/gcloud/reference/init)
or
[`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login)
.
You can check the currently active account by running
[`gcloud auth list`](https://cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```python
$cred = gcloud auth print-access-token 
$headers = @{ "Authorization" = "Bearer $cred" } 
 
Invoke-WebRequest ` 
 -Method POST ` 
 -Headers $headers ` 
 -ContentType: "application/json; charset=utf-8" ` 
 -InFile request.json ` 
 -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```python
{
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": "Here are a few options for late-night burgers in San Jose, based on the search results. Keep in mind that \"late night\" can be subjective, so I've included places with varying closing times. I recommend double-checking their hours before you go, as these can change.\n\n* **Campus Burgers:** Open until 12:00 AM every night except Sunday (closed).\n* **Lazy Dog Restaurant & Bar:** Open until 12:00 AM every night.\n* **Dough Burger:** Open until 1:30 AM Monday through Thursday and Sunday, and until 3:00 AM on Friday and Saturday.\n* **El Apartamento Colombian Burgers:** Open until 1:00 AM on Friday and Saturday, and until 10:30 PM Monday through Wednesday and until 11:00 PM Thursday and Sunday.\n* **Paper Plane:** Open until 2:00 AM Thursday through Saturday, and until 12:00 AM on Tuesday and Wednesday and Sunday. Closed on Monday.\n\nNote that opening hours are subject to change.\n"
 }
 ]
 },
 "finishReason": "STOP",
 "groundingMetadata": {
 "retrievalQueries": [
 "late night burger san jose"
 ],
 "groundingChunks": [
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=15700677770979677665",
 "title": "El Apartamento Colombian Burgers",
 "text": "**About:**\n\n* **Type:** Hamburger Restaurant\n* **Address:** 76 E Santa Clara St, San Jose, CA 95113, USA\n* **Open Now:** No\n* **Rating:** 4.9 (25 reviews)\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** Yes\n* **Outdoor Seating:** No\n* **Live Music:** No\n* **Curbside Pickup:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: 5:00 – 10:30 PM\n* Tuesday: 5:00 – 10:30 PM\n* Wednesday: 5:00 – 10:30 PM\n* Thursday: 4:00 – 11:00 PM\n* Friday: 4:00 PM – 1:00 AM\n* Saturday: 4:00 PM – 1:00 AM\n* Sunday: 4:00 – 11:00 PM\n\n**Parking options:**\n\n* **Free street parking:** Yes\n\n**Accessibility:**\n\n* **Wheelchair accessible parking:** Yes\n* **Wheelchair accessible entrance:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Cash Only:** No\n\n**Distance & Travel Time:**\n\n* 4733.0 kilometers\n* 43.4 hours"
 }
 },
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=8798666889278262772",
 "title": "Campus Burgers",
 "text": "**About:**\n\n* **Type:** Hamburger Restaurant\n* **Address:** 108 Paseo de San Antonio, San Jose, CA 95113, USA\n* **Open Now:** Yes\n* **Rating:** 4.4 (207 reviews)\n* **Price Level:** Inexpensive\n* **Phone:** (408) 352-5507\n* **Additional Summary:** Simple hamburger restaurant with a limited menu of comfort fare such as burgers and fries.\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** Yes\n* **Good for Groups:** Yes\n* **Outdoor Seating:** Yes\n* **Live Music:** No\n* **Menu for Children:** No\n* **Serves Cocktails:** No\n* **Serves Dessert:** Yes\n* **Serves Coffee:** No\n* **Good for Watching Sports:** No\n* **Serves Lunch:** Yes\n* **Serves Dinner:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: 11:00 AM – 12:00 AM\n* Tuesday: 11:00 AM – 12:00 AM\n* Wednesday: 11:00 AM – 12:00 AM\n* Thursday: 11:00 AM – 12:00 AM\n* Friday: 11:00 AM – 12:00 AM\n* Saturday: 11:00 AM – 12:00 AM\n* Sunday: Closed\n\n**Parking options:**\n\n* **Paid parking lot:** Yes\n* **Free street parking:** Yes\n* **Paid street parking:** Yes\n* **Valet parking:** No\n* **Paid garage parking:** Yes\n\n**Accessibility:**\n\n* **Wheelchair accessible parking:** Yes\n* **Wheelchair accessible entrance:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Debit Card:** Yes\n* **Cash Only:** No\n* **NFC:** Yes\n\n**Distance & Travel Time:**\n\n* 4732.5 kilometers\n* 43.4 hours"
 }
 },
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=3915125089239094417",
 "title": "Paper Plane",
 "text": "**About:**\n\n* **Type:** Bar\n* **Address:** 72 S 1st St, San Jose, CA 95113, USA\n* **Open Now:** No\n* **Rating:** 4.4 (2452 reviews)\n* **Price Level:** Moderate\n* **Phone:** (408) 713-2625\n* **Summary:** Relaxed spot with a long bar in an exposed brick space for creative or classic cocktails & snacks.\n* **Additional Summary:** Casual, popular bar serving signature cocktails and New American fare, including burgers and tacos.\n* **Takes Reservations:** Yes\n* **Offers Takeout:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** No\n* **Allows Dogs:** No\n* **Has Restroom:** Yes\n* **Good for Groups:** Yes\n* **Outdoor Seating:** No\n* **Live Music:** No\n* **Serves Cocktails:** Yes\n* **Good for Watching Sports:** No\n* **Serves Beer:** Yes\n* **Serves Wine:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: Closed\n* Tuesday: 5:00 PM – 12:00 AM\n* Wednesday: 5:00 PM – 12:00 AM\n* Thursday: 5:00 PM – 2:00 AM\n* Friday: 5:00 PM – 2:00 AM\n* Saturday: 5:00 PM – 2:00 AM\n* Sunday: 5:00 PM – 12:00 AM\n\n**Parking options:**\n\n* **Paid parking lot:** Yes\n* **Free street parking:** Yes\n* **Paid street parking:** Yes\n* **Valet parking:** No\n* **Paid garage parking:** Yes\n\n**Accessibility:**\n\n* **Wheelchair accessible entrance:** Yes\n* **Wheelchair accessible restroom:** Yes\n* **Wheelchair accessible seating:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Cash Only:** No\n* **NFC:** Yes\n\n**Distance & Travel Time:**\n\n* 4733.0 kilometers\n* 43.4 hours"
 }
 },
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=12662287798905863411",
 "title": "Lazy Dog Restaurant & Bar",
 "text": "**About:**\n\n* **Type:** American Restaurant\n* **Address:** 5305 Almaden Expy, San Jose, CA 95118, USA\n* **Open Now:** Yes\n* **Rating:** 4.2 (940 reviews)\n* **Price Level:** Moderate\n* **Phone:** (408) 786-9594\n* **Summary:** Relaxed, lodge-chic chain serving global comfort fare, including stir-fries, pot roast & pastas.\n* **Additional Summary:** American food including comfort fare and small plates served in a casual setting with a bar.\n* **Takes Reservations:** Yes\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** Yes\n* **Allows Dogs:** Yes\n* **Has Restroom:** Yes\n* **Good for Groups:** Yes\n* **Outdoor Seating:** Yes\n* **Live Music:** No\n* **Menu for Children:** Yes\n* **Serves Cocktails:** Yes\n* **Serves Dessert:** Yes\n* **Serves Coffee:** Yes\n* **Has Wifi:** Yes\n* **Good for Watching Sports:** Yes\n* **Curbside Pickup:** Yes\n* **Serves Lunch:** Yes\n* **Serves Dinner:** Yes\n* **Serves Beer:** Yes\n* **Serves Wine:** Yes\n* **Serves Brunch:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: 11:00 AM – 12:00 AM\n* Tuesday: 11:00 AM – 12:00 AM\n* Wednesday: 11:00 AM – 12:00 AM\n* Thursday: 11:00 AM – 12:00 AM\n* Friday: 11:00 AM – 12:00 AM\n* Saturday: 10:00 AM – 12:00 AM\n* Sunday: 10:00 AM – 12:00 AM\n\n**Parking options:**\n\n* **Free parking lot:** Yes\n* **Free street parking:** Yes\n* **Valet parking:** No\n\n**Accessibility:**\n\n* **Wheelchair accessible parking:** Yes\n* **Wheelchair accessible entrance:** Yes\n* **Wheelchair accessible restroom:** Yes\n* **Wheelchair accessible seating:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Debit Card:** Yes\n* **Cash Only:** No\n* **NFC:** Yes\n\n**Distance & Travel Time:**\n\n* 4745.7 kilometers\n* 43.5 hours"
 }
 },
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=12520445715080978741",
 "title": "Dough Burger",
 "text": "**About:**\n\n* **Type:** Restaurant\n* **Address:** 1721 Old Bayshore Hwy, San Jose, CA 95112, USA\n* **Open Now:** No\n* **Rating:** 4.2 (61 reviews)\n* **Phone:** (408) 515-0161\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** Yes\n* **Live Music:** No\n* **Curbside Pickup:** Yes\n* **Serves Lunch:** Yes\n* **Serves Dinner:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: 6:00 PM – 1:30 AM\n* Tuesday: 6:00 PM – 1:30 AM\n* Wednesday: 6:00 PM – 1:30 AM\n* Thursday: 6:00 PM – 1:30 AM\n* Friday: 6:00 PM – 3:00 AM\n* Saturday: 6:00 PM – 3:00 AM\n* Sunday: 6:00 PM – 1:30 AM\n\n**Parking options:**\n\n* **Free parking lot:** Yes\n* **Free street parking:** Yes\n\n**Accessibility:**\n\n* **Wheelchair accessible parking:** Yes\n* **Wheelchair accessible entrance:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Cash Only:** No\n\n**Distance & Travel Time:**\n\n* 4740.1 kilometers\n* 43.3 hours"
 }
 }
 ],
 "groundingSupports": [
 {
 "segment": {
 "startIndex": 267,
 "endIndex": 346,
 "text": "* **Campus Burgers:** Open until 12:00 AM every night except Sunday (closed)."
 },
 "groundingChunkIndices": [
 1
 ],
 "confidenceScores": [
 0.76444983
 ]
 }
 ],
 "googleMapsWidgetContextToken": "widgetcontent/AcBXPQfo6pGrCXPJeN2xtADMw1TPz8Wzwm-..."
 }
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 7,
 "candidatesTokenCount": 236,
 "totalTokenCount": 243,
 "trafficType": "ON_DEMAND",
 "promptTokensDetails": [
 {
 "modality": "TEXT",
 "tokenCount": 7
 }
 ],
 "candidatesTokensDetails": [
 {
 "modality": "TEXT",
 "tokenCount": 236
 }
 ]
 },
 "modelVersion": "gemini-2.0-flash-001",
 "createTime": "2025-04-03T20:11:51.118341Z"
}
```

```

### curl

Replace the values in the following variables:

- **`PROJECT_ID`**: Your project ID.
- **`LOCATION`**: The region to process the request.
- **`API_KEY`**: Your API key.
 To get an API key, see [Get an API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
- **`MODEL_ID`**: The model ID.
- **`PROMPT_TEXT`**: Your prompt.
- **`SYSTEM_INSTRUCTION`**: Your system instruction that
 provides context to the model so that the model understands how to process
 the prompt to generate a relevant response.

```python
 curl -i -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" https://LOCATION-aiplatform.googleapis.com/v1/projects/maps-grounding/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent -d '{
 "contents": [
 {
 "role": "USER",
 "parts": [
 {
 "text": PROMPT_TEXT
 }
 ]
 }
 ],
 "system_instruction": {
 "parts": [
 {
 "text": SYSTEM_INSTRUCTION
 }
 ]
 },
 "generation_config": {
 "temperature": 0.0,
 "top_p": 0.95,
 "top_k": 40
 },
 "tools": [
 {
 "googleMaps": {
 "authConfig": {
 "apiKeyConfig": {
 "apiKeyString": API_KEY
 }
 }
 }
 }
 ],
 "toolConfig": {
 "retrievalConfig": {
 "latLng": {
 "latitude": 40.730610,
 "longitude": -73.935242
 }
 }
 }
 }'

```

### json

Replace the values in the following variables:

- **`PROJECT_ID`**: Your project ID.
- **`LOCATION`**: The region to process the request.
- **`API_KEY`**: Your API key.
 To get an API key, see [Get an API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
- **`MODEL_ID`**: The model ID.
- **`PROMPT_TEXT`**: Your prompt.
- **`SYSTEM_INSTRUCTION`**: Your system instruction that
 provides context to the model so that the model understands how to process
 the prompt to generate a relevant response.

```python
 #!/bin/bash

 # Set required variables
 PROJECT_ID=PROJECT_ID
 LOCATION=LOCATION
 API_KEY=API_KEY
 MODEL_ID=MODEL_ID
 PROMPT_TEXT=PROMPT_TEXT
 SYSTEM_INSTRUCTION=SYSTEM_INSTRUCTION

 # Construct the JSON payload
 # The location of New York City, NY, USA is lat: 40.730610, lon: -73.935242
 # additional documentation on this payload can be found at:
 # https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.publishers.models/generateContent
 JSON_PAYLOAD='{
 "contents": [
 {
 "role": "USER",
 "parts": [
 {
 "text": "'"$PROMPT_TEXT"'"
 }
 ]
 }
 ],
 "system_instruction": {
 "parts": [
 {
 "text": "'"$SYSTEM_INSTRUCTION"'"
 }
 ]
 },
 "generation_config": {
 "temperature": 0.0,
 "top_p": 0.95,
 "top_k": 40
 },
 "tools": [
 {
 "googleMaps": {
 "authConfig": {
 "apiKeyConfig": {
 "apiKeyString": "'"$API_KEY"'"
 }
 }
 }
 }
 ],
 "toolConfig": {
 "retrievalConfig": {
 "latLng": {
 "latitude": 40.730610,
 "longitude": -73.935242
 }
 }
 }
 }'

 BASE_URL="https://$LOCATION-aiplatform.googleapis.com/v1"

 # Execute the curl command
 curl -X POST \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 "$BASE_URL/projects/$PROJECT_ID/locations/$LOCATION/publishers/google/models/$MODEL_ID:generateContent" \
 -d "$JSON_PAYLOAD"

```

This is a sample response from the code sample.

```python
 {
 "candidates": [
 {
 "content": {
 "role": "model",
 "parts": [
 {
 "text": "Here are some restaurants near you:\n\n* **Bella Blue:** This restaurant is 1.5 kilometers away (about 5.9 minutes). It has a 4.7-star rating and offers takeout, delivery, and dine-in options.\n* **Bantry Bay Publick House:** This American restaurant is 878 meters away (approximately 2.8 minutes). It has a 4.6-star rating. Note that it is currently closed and will open at 11:00 AM.\n* **Sunnyside Eats:** This food court is 3.0 kilometers away (about 11.1 minutes). It has a 4.4-star rating and is open now.\n* **Court Square Diner:** This diner is 2.7 kilometers away (about 9.3 minutes). It has a 4.4-star rating and is open 24/7.\n* **Bubby's:** This restaurant is 13.6 kilometers away (about 25.6 minutes) and has a 4.4-star rating."
 }
 ]
 },
 "finishReason": "STOP",
 "groundingMetadata": {
 "groundingChunks": [
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=6527654009738952016",
 "title": "Sunnyside Eats",
 "text": "**About:**\n\n* **Type:** Food Court\n* **Address:** 40-05 Skillman Ave, Long Island City, NY 11104, USA\n* **Open Now:** Yes\n* **Rating:** 4.4 (305 reviews)\n* **Price Level:** Moderate\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** Yes\n* **Live Music:** No\n* **Serves Dessert:** Yes\n* **Serves Lunch:** Yes\n* **Serves Dinner:** Yes\n* **Serves Vegetarian Food:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: 6:00 AM – 12:00 AM\n* Tuesday: 6:00 AM – 12:00 AM\n* Wednesday: 6:00 AM – 12:00 AM\n* Thursday: 6:00 AM – 12:00 AM\n* Friday: 6:00 AM – 12:00 AM\n* Saturday: 6:00 AM – 12:00 AM\n* Sunday: 6:00 AM – 12:00 AM\n\n**Parking options:**\n\n* **Free parking lot:** Yes\n\n**Accessibility:**\n\n* **Wheelchair accessible parking:** No\n* **Wheelchair accessible entrance:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Debit Card:** Yes\n* **Cash Only:** No\n* **NFC:** Yes\n\n**Distance & Travel Time:**\n\n* 3.0 kilometers\n* 11.1 minutes"
 }
 },
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=17852728553155586875",
 "title": "Bella Blue",
 "text": "**About:**\n\n* **Type:** Restaurant\n* **Address:** 3235 48th Ave, Long Island City, NY 11101, USA\n* **Open Now:** Yes\n* **Rating:** 4.7 (28 reviews)\n* **Price Level:** Moderate\n* **Takes Reservations:** Yes\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** Yes\n* **Live Music:** No\n* **Serves Dessert:** Yes\n* **Serves Coffee:** Yes\n* **Serves Lunch:** Yes\n* **Serves Brunch:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: 5:00 AM – 5:00 PM\n* Tuesday: 5:00 AM – 5:00 PM\n* Wednesday: 5:00 AM – 5:00 PM\n* Thursday: 5:00 AM – 5:00 PM\n* Friday: 5:00 AM – 5:00 PM\n* Saturday: Closed\n* Sunday: Closed\n\n**Parking options:**\n\n* **Valet parking:** No\n\n**Accessibility:**\n\n* **Wheelchair accessible entrance:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Debit Card:** Yes\n* **Cash Only:** No\n* **NFC:** Yes\n\n**Distance & Travel Time:**\n\n* 1.5 kilometers\n* 5.9 minutes"
 }
 },
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=17506796222486207538",
 "title": "Court Square Diner",
 "text": "**About:**\n\n* **Type:** Diner\n* **Address:** 45-30 23rd St, Long Island City, NY 11101, USA\n* **Open Now:** Yes\n* **Rating:** 4.4 (3646 reviews)\n* **Price Level:** Inexpensive\n* **Phone:** (718) 392-1222\n* **Summary:** Diner open 24/7 with shiny retro look & massive menu serving American standards since 1946.\n* **Additional Summary:** Open 24/7, this diner serves comfort food including omelets, burgers, and challah French toast.\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** Yes\n* **Allows Dogs:** No\n* **Has Restroom:** Yes\n* **Good for Groups:** Yes\n* **Outdoor Seating:** No\n* **Live Music:** No\n* **Menu for Children:** Yes\n* **Serves Cocktails:** Yes\n* **Serves Dessert:** Yes\n* **Serves Coffee:** Yes\n* **Good for Watching Sports:** No\n* **Serves Lunch:** Yes\n* **Serves Dinner:** Yes\n* **Serves Beer:** Yes\n* **Serves Wine:** Yes\n* **Serves Brunch:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: Open 24 hours\n* Tuesday: Open 24 hours\n* Wednesday: Open 24 hours\n* Thursday: Open 24 hours\n* Friday: Open 24 hours\n* Saturday: Open 24 hours\n* Sunday: Open 24 hours\n\n**Parking options:**\n\n* **Paid parking lot:** No\n* **Free street parking:** Yes\n* **Paid street parking:** Yes\n* **Valet parking:** No\n\n**Accessibility:**\n\n* **Wheelchair accessible parking:** No\n* **Wheelchair accessible seating:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Debit Card:** Yes\n* **Cash Only:** No\n* **NFC:** Yes\n\n**Distance & Travel Time:**\n\n* 2.7 kilometers\n* 9.3 minutes"
 }
 },
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=5611732157661087317",
 "title": "Bubby's",
 "text": "**About:**\n\n* **Type:** Restaurant\n* **Address:** 120 Hudson St, New York, NY 10013, USA\n* **Open Now:** Yes\n* **Rating:** 4.4 (7278 reviews)\n* **Price Level:** Moderate\n* **Phone:** (212) 219-0666\n* **Summary:** Weekend brunch hot spot serving homestyle American eats with many locally sourced ingredients.\n* **Additional Summary:** Classic, made-from-scratch American cooking is served at this beloved restaurant and pie shop with a diner vibe.\n* **Takes Reservations:** Yes\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Good for Children:** Yes\n* **Has Restroom:** Yes\n* **Good for Groups:** Yes\n* **Outdoor Seating:** Yes\n* **Live Music:** No\n* **Menu for Children:** Yes\n* **Serves Cocktails:** Yes\n* **Serves Dessert:** Yes\n* **Serves Coffee:** Yes\n* **Good for Watching Sports:** No\n* **Serves Lunch:** Yes\n* **Serves Dinner:** Yes\n* **Serves Beer:** Yes\n* **Serves Wine:** Yes\n* **Serves Brunch:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: 8:00 AM – 10:00 PM\n* Tuesday: 8:00 AM – 10:00 PM\n* Wednesday: 8:00 AM – 10:00 PM\n* Thursday: 8:00 AM – 10:00 PM\n* Friday: 8:00 AM – 10:00 PM\n* Saturday: 8:00 AM – 10:00 PM\n* Sunday: 8:00 AM – 10:00 PM\n\n**Parking options:**\n\n* **Paid parking lot:** No\n* **Free street parking:** Yes\n* **Paid street parking:** Yes\n* **Valet parking:** No\n\n**Accessibility:**\n\n* **Wheelchair accessible parking:** No\n* **Wheelchair accessible entrance:** Yes\n* **Wheelchair accessible restroom:** Yes\n* **Wheelchair accessible seating:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Debit Card:** Yes\n* **Cash Only:** No\n* **NFC:** Yes\n\n**Distance & Travel Time:**\n\n* 13.6 kilometers\n* 25.6 minutes"
 }
 },
 {
 "maps": {
 "uri": "https://maps.google.com/?cid=6091491943686568358",
 "title": "Bantry Bay Publick House",
 "text": "**About:**\n\n* **Type:** American Restaurant\n* **Address:** 33-01 Greenpoint Ave, Long Island City, NY 11101, USA\n* **Open Now:** No\n* **Rating:** 4.6 (582 reviews)\n* **Price Level:** Moderate\n* **Phone:** (718) 784-9500\n* **Summary:** Unfussy watering hole offering hearty, internationally inspired pub grub & draft beers.\n* **Additional Summary:** Casual American restaurant offering comfort food and a selection of beers, as well as sports on TV.\n* **Takes Reservations:** Yes\n* **Offers Takeout:** Yes\n* **Offers Delivery:** Yes\n* **Offers Dine-in:** Yes\n* **Allows Dogs:** No\n* **Has Restroom:** Yes\n* **Good for Groups:** Yes\n* **Outdoor Seating:** No\n* **Live Music:** No\n* **Menu for Children:** Yes\n* **Serves Cocktails:** Yes\n* **Serves Dessert:** Yes\n* **Serves Coffee:** Yes\n* **Good for Watching Sports:** Yes\n* **Serves Lunch:** Yes\n* **Serves Dinner:** Yes\n* **Serves Beer:** Yes\n* **Serves Wine:** Yes\n* **Serves Brunch:** Yes\n\n**Opening Hours (local time):**\n\n* Monday: 11:00 AM – 2:00 AM\n* Tuesday: 11:00 AM – 2:00 AM\n* Wednesday: 11:00 AM – 2:00 AM\n* Thursday: 11:00 AM – 2:00 AM\n* Friday: 11:00 AM – 2:00 AM\n* Saturday: 12:00 PM – 1:00 AM\n* Sunday: 12:00 PM – 1:00 AM\n\n**Parking options:**\n\n* **Free parking lot:** Yes\n* **Free street parking:** Yes\n* **Valet parking:** No\n\n**Accessibility:**\n\n* **Wheelchair accessible entrance:** Yes\n* **Wheelchair accessible restroom:** Yes\n* **Wheelchair accessible seating:** Yes\n\n**Payment options:**\n\n* **Credit Card:** Yes\n* **Debit Card:** Yes\n* **Cash Only:** No\n* **NFC:** Yes\n\n**Distance & Travel Time:**\n\n* 878 meters\n* 2.8 minutes"
 }
 }
 ],
 "groundingSupports": [
 {
 "segment": {
 "startIndex": 37,
 "endIndex": 116,
 "text": "* **Bella Blue:** This restaurant is 1.5 kilometers away (about 5.9 minutes)."
 },
 "groundingChunkIndices": [
 1
 ],
 "confidenceScores": [
 0.95786446
 ]
 },
 {
 "segment": {
 "startIndex": 117,
 "endIndex": 192,
 "text": "It has a 4.7-star rating and offers takeout, delivery, and dine-in options."
 },
 "groundingChunkIndices": [
 1
 ],
 "confidenceScores": [
 0.97011536
 ]
 },
 {
 "segment": {
 "startIndex": 193,
 "endIndex": 299,
 "text": "* **Bantry Bay Publick House:** This American restaurant is 878 meters away (approximately 2.8 minutes)."
 },
 "groundingChunkIndices": [
 4
 ],
 "confidenceScores": [
 0.6947031
 ]
 },
 {
 "segment": {
 "startIndex": 300,
 "endIndex": 325,
 "text": "It has a 4.6-star rating."
 },
 "groundingChunkIndices": [
 4
 ],
 "confidenceScores": [
 0.94997823
 ]
 },
 {
 "segment": {
 "startIndex": 326,
 "endIndex": 385,
 "text": "Note that it is currently closed and will open at 11:00 AM."
 },
 "groundingChunkIndices": [
 4
 ],
 "confidenceScores": [
 0.6143993
 ]
 },
 {
 "segment": {
 "startIndex": 386,
 "endIndex": 470,
 "text": "* **Sunnyside Eats:** This food court is 3.0 kilometers away (about 11.1 minutes)."
 },
 "groundingChunkIndices": [
 0
 ],
 "confidenceScores": [
 0.9326993
 ]
 },
 {
 "segment": {
 "startIndex": 471,
 "endIndex": 512,
 "text": "It has a 4.4-star rating and is open now."
 },
 "groundingChunkIndices": [
 3,
 2,
 0
 ],
 "confidenceScores": [
 0.9840884,
 0.8849733,
 0.9861043
 ]
 },
 {
 "segment": {
 "startIndex": 513,
 "endIndex": 595,
 "text": "* **Court Square Diner:** This diner is 2.7 kilometers away (about 9.3 minutes)."
 },
 "groundingChunkIndices": [
 2
 ],
 "confidenceScores": [
 0.82310444
 ]
 },
 {
 "segment": {
 "startIndex": 596,
 "endIndex": 638,
 "text": "It has a 4.4-star rating and is open 24/7."
 },
 "groundingChunkIndices": [
 2
 ],
 "confidenceScores": [
 0.8532716
 ]
 }
 ],
 "googleMapsWidgetContextToken": "widgetcontent/AcBXPQcypDFCG_1XzVodpoUGffHkgBuEuLBFgJBBwWcbRMrE8SZZf81okOX1PtcFdT_xSEeQ6_eD8wuLjKRayTRUPbxadZ0fzgsSa1De7WckoARtzF3SL6dih7lkfOfJkN-z1aIo1a8u0cLjyyAbV58kUTzZcSG8JHlbOFiaO85XAplbZz4DGEagwjbEWMnEphsVaiEAvDoofK1hWVo1tIvJwPYy5Nzbadw-tVvJy4FNmVsPCn0GNngOaGhyLj5iNlPZLUq-pM6ZRHg7o98CJGjVDzDlo8DVLMj43NtnXttF89Vnj3PG1e4GtPqUrlQLuIjllwKdbWNsA_4q04D0vZjp2-YNFQwMj5ayXXtiOnbCFSZW787lRcl_IMEYLVRA8M0aJEJvlKvIYZd-qP8PDt8FqTsImToE3ENsjWmLykmaUR1d8pYpgShHdiisF4mdvxw-FsHZkWze6d7sxpNcV-RtcT1j3STFfpOuMLQhjFfA7dssREH-5mGHyvXiEJK7_4jRxv_cjgn3lhAwi3Xk5dLcNXxv3soJtqjJYtcwX7oplVQJhEB2YY2RJ4yDTPksIU9vCH3zAThwWk3ogwNV5DLC7d4al4YD-ChcwnXfENVCLcMwOYRu8HYE-bRXSlArRwOlUX4OwPgIbVuEN0QZkJ7cMWeA5BI8KqpetNlZdD42-J5sYEkUbBxTZoDywsW2n0amwUkFU6g33UXR_uOBmUdt-0flFOj0ta99dPBAA1mesmN8UPtAk2GcSJpDIXn6lxxYKvXwrnKIjxSpZhL5b_sqYPBxcpxSa0RVInCMgC-3U9_4rxYz2gAXCBHx5RdTBN3tJTFllRQmeXV_qX5bIhDZ5CwdlexDFKeRNQJYHX-8Y5uUlWuPOx3P2NTB3XufNkpzFJrrsrP-GxRfEIBM43AJWzIsW1sCcJnFxZX3JwRsJ0X3gGNmQP3KDJNeOEV6BR-JZomi5ziDP5i3Xthz7XBGmw2e_8wBfh6h-U5KCzEkop74ipJW52jGuaFbdPGGiFphkx3A7850F0UcNhYHT1mtYmjMSpLNjx9LNEx2Gg8QnF0tl_v5d8Z9PBJaiQjXJj0kXfsWmwN87PnARaVoDnLAmT4GSg7N-xJ6HCaW_W7yr77iX8d_xZDAJ5L_mcC1ZMyPmfrEAnI36X-X3GB3pziKrcT1sM4u_-Y9N3rH8bod0L6uFecOPpyVSbV__-p-JexDL74Zz_Trqj2Rpenb412PDGoUK2wkW4E19Eb4puWWjj9D0qucGinrD1VoUb8DjyJFMrAiQBeYJJAWrw1ngkRwiIEjzuJQMH-Pcap1JD6RDmRj5Fr6OvDl0NPF0ZO7vzaPUhkptrOzhaIuOhBPDQ0bAzJ5yAMpib4R4fw576Qmiwl-ZBeAkjie5FcJQjGaMhvOL5QRLZowo9sHY-v7jDzHI7aFBZREk3u5q8uhPvWyDKf59tuTIU1MRmaRl5R5b-EQwM55O5P_RkdlExCAskYC7Uqg1Pa-N4b7q143vdgvZ5X6pg05W1yYUOK19e8qQjAJhzGH7NAwoVL1-8P026XAYdC91krLrLAUFmP7HNZe4sEtBQfenUAsQzJh6F5IWSrzW_XygeKOfCRaKDcNbybcVcR0bo6QlXV1XR6xZznMocHhvVQ3xJgQLFg06b3jBGCL76GtzRThOV8cOpw-DcD7QolL6BvMIbYrF1JK7mXQA1XNRQwS4TjCwndIcgW_RMMg6cQ1sSYYQ5SurdkH9svdty2jgTt_qbGJNLCSKKX9t0_xSsboLRea8tjJCSxrfR4S6_XmkRjbqzw_48O4jgStXB0ATLqni7wvv_zFFdKFXXXENexvy46TUahmlCXdibUS7AqTMgXHbCf5HskklkZ1vbbyuRRhEHixEj9r-h98tTwjKyYpxWK5DUE9Grgm7k328WJzB9-dMezb9OJaT6d1I_nREp2KT7hqcz6RvcMX2jG9ItP-AcV3UhHdrMtJqaI4YPbl-gmP_XpJnHOYPXmYOVA7Ds-BFj3tMgst05KJ4zLLAUKRcsgIYXF33DAEXsUGJmQvytjGfuRQ6GH7PR4AaTrAREIOCXBapbWVuLqI1HC0CwrPky18oBdOVkLWFau4j-s3MWJBxsnI2OiRYz__PQpytkbaXf_P9D3ZoR3W7fXa-H5hxD3gi6kd7vT2hdeIsI2ywIEELi-T6hR6-50Z-dxS07IcXi5Kuw1-yglBySWL-b9xN1-OXvI0EF2_pRjfaQvLfWsfH9jbt1AcaR1JKKWLICmeBDazG9XxnIc4uYm7Chbx7tdUpSYUjuDLkuki_j4TCWw0_dBKuGq3wxiqykrozSxM2pkmhanjRFcTVoYxhIbTXZT9S3qSUCB1vJBV8oIiK15iXiy8_jZjYw76wMDEFbS5k1T8LrwGIZxzH4KpI8fEWyrO-d-n97mYtZNNgtKCoyUGey7POPoIY_Ky0927fbteH2Ef4_PkrmB6_t5xF4ZspHvnaV_cFvhnooVZkLQpJe2ryY3L6xcauqZDKy6yXiS5o91a2j7l8d0VO5aTKyLDJf3bg6YlWhkcs1iI0OziFAQ1GH_d7wREyZneIzGkW-xCxXAzg8xxddJp8k5t-nwEJozHYcuoQh-EnFRCw6oywOgekAXvhPaqZmJQ2BZhbJ8gExSjS2MJTJ83_I8lNNMRRTe12byYUUtRWiA86osShwmQBJZCqxrRqYCEP25T1RSKuxWz3ql_Alrcsj7k5g-5xxCAQjkpCT4_4vlFbsx134m4diYsKFkmzeQO6b_ZCi5IXeb3VU8STRt8jWdWpkevK9G0ETm0PfCO-g01pSCgnUrdkVH1btIFQF3uZKlYRKM0S6-ePHcNdiQNPIH_wokoHTLNas96xwy_nJrsnyOIUQSRLWq4NJbieqMHDksX9qp9_EHsfctU4gZ8WxNr50S6NU9T3JCF90hJfyXv3Lve5FoqdEp5LFM_JokFAqpW95xtK71O79zpCeX6Fqf6p82E12qtIPoZBq35ttpImua79hPafQ8CR0MdgaUrROI2UYYyP7gvaIZ64oNqi_TX_vxOeqkfhUIvy6VVUZ83QmXw6TmVNg24wVzaYMgSaS8JUd_N-1GPqEZhhOSSi3uaYt4bYk7ihFVq2f6KnXmvIzIuYr9WMvFcM6V8KgUIx5-iB49H6fDwptRUEFIOssi0o6XWrLrd0ozuochrnz5feXahw4zr4iDiDg7NUtpX6l6-k4YGbXgoSj8PpdiA-7iqi2FcSpb1Al8mzaWUdGRqoP6Y68JD834OF3_Bul31Hdl3Ehp2Swbz9s4EvR8QOSDGeWTKwEMNtAE6n9cGNWB1oVVh56UD0DwDTZC_8tL6PyALE-dn_hGPtETElALCYmG1xC-mDXrnfbzjWRwNYxReBWbivnUa-WUBUEvSny0EUEbsculQgaV0ZEr6aBChUsPZjUanLJQ4WfsFt1pPbC0l-8fBPIQ-X_Yt3GbGmBDHM9-kDywI3xks4CiZ6OmvamY45CbBcve4E13WqqmrhvsXBkW9xmrQxQbCTY4-zyoQPHaByTuI0b2mXyKs2EOpyDurqIVrq-PmEO5VIpLHOFxYXQsv9nhOtWgUaAbaQ8nJbBN8ed2JAHzZconv_OznFdf9rwo974nGIXjhk8xezqp4z-yYQKIsZgh15wRs6G0KqafrXe4T8kHyEhJG3mlLIlGKkQiLWojPYsBp8nl9zgwfZUAK3toYQUmYUW34tNiKhNpOh3OS6PX4bXFJkXDB3S2L0RTD_cuMNyLWS9n9QDJkzgU6jZmM9Fi-Zb_87oSbTFavB--bPUugvDgVpK0741OgtON-U_AuRERwuQ31jtvfbRpOGw5h7BljHGpzNXnNDvxiWc0bCD9G3WnQxvI-42lX4YzFE-cXH8BhUX1BMCP6-Mq3LzL6a3cgNv1Kaf6JHyzly0e_RdrflD0npIHjbWG8YF-jNO_xm9YFEwqqDDDurDmJVpngpBpX4Gl3UFJ28ikXNJiuikt-gXa3SR90OhugNI0xNVpsVuM9y0UVcX9KWJphyWJ_oK-nR9dU15QtbIVaiRwGEmdtW22NBRm7TJteIXp4l6wgKVX5iRiAQ7fKGdQ4a3-ArGEaLHD3hAJs9aQU0rHlwAJIvOLaHArBkTEcVxLcrB9HkEVmcHsgQTJTf8zrMHo01PO53rTa2R7_HX3mK8kfe7LG433o8QGB-xeJguFc0ocPYQwGMno0ftJvOAJDUhsOVJkpMN-XeMbJtmqgIa0RiTqtyP9ShDLtqo7yg00Puoqltk2reW_Glpa7vNcge8c-pKW1QI7yjr6x37NWuT1IwumV2mjFMY7JD22LaaAEKUKfSecCx65VQJRrk4cgtdRr-nGEbTjLSMEXCJ4ADZG_9jxkLY14GhOgy9mz12hWSMGFKAmZAGVCSVnB8cmU5omqYpbtqxQxu5dlWiAmVG516xuULVAShqtfNPdgUV9t-8EWKujhaUVLeW1tSZIRA6fAWL6sMWTaOHgWxN2UBbjQdXFRcfTUB7T8Oy_ajM13GX3vGKnnTPVb7NVxfhq8LJ2Bg6FEkboaZxe1ChADeByOf9obFpgIAZNWiW3lYMKmNFU4I7klZ4wFiNGF6m_e5vGFlG7xvJ2P6W4rjerICuLlnfCt5_X4YT42a-j1ekPwNbMbmWuoe3BX4wHhu5uxeuBRdjQ2Oh7rXPGPb7JPdZdIhQ3O9JGhJjq9WXQunfiGuwnT3fzAFLQDubITaBh_Nf0M8V3Ae8L5byVQYkWTGpBuMEdXOtJfLJFnIlPti4jxElng3ACS9E4j5QSgnHi1xbizIYFup2ICjoD8TCWoWItdh3SesWFdqlsQEthfjib6TkwCVINcRpVR8I5cZqVr9lhhmYVzkZhLWF56ExJpHcS08PdrXW5rmRFt5m-MhqoQ2-Fkt6wUTL6qCNxWH5Df71hmcQbJ095Ud3b_2yxlU8YGCh0HZaSx2Hv2QnMMODEz6o5VbD0cv3wMETs_ulVe2XZCHDp6LeRoSb4hGuZgTkWwYEo3_gIdLA1zVKK-nAkj6ZhP0A7CN7UzlSR8evWlNlI6HtOzRaum8gzdG3pqSRgDp6KSSFPp0ckdDfzu61nXssu2IGglfC3MnBL6sZixkouFQUTTT817q-IpEbxZXA4vrOqz4c48W4vyEJRqGzlS5_ExnrD51RcCGh68gRCQW-_BQLi_YG5YSbMtGIR4X5yQpGExt0Gi-vu72Hnv_saHEPol0U06tfDQYGJFGRr78_OggXJiADByYd1i2xdE7OVXvUVB4kmyTysViI6ihOinIje3-3NXJUq1vq8RLm42iuLb74pR5-bjQb8LDlUYIfG8IupiIfMMnN9sTil9LaV22x6tDLW_6tHtAf942DDc9j45e7A3d67VbjSYyEpzsvOjzObKZYuNmIBrZRdA-2SLfkQQvu5wz68flhKxHH3a-wVRjok2kJDu3hRcSdQmYWl0ARj652qs5YeZXQRVAnr2vGTkGx_WG75z2xtTktsSfl0s9uUItI1pNGxR0hs-dCSW3u2PRPKttcc4cRKMhUOHi0wPZmruyj5BpTCSz4ftHuk9wNoAkqoRBXps-T63elSesVOtSUhACrspvKTyw3wD318aIPFAPYSXM5AMmtK--t_cxoYIW5q-trte4IAkdRwvelpBoNidaO21XL142Yzig-aue8vQUKeQ6z7jsQyvUsoZzpHQux_bhvEV_ogiTRxbBxJ3Jq2gn8Fd2XjfZzvRDUoEiyq3pknIny7PRThqd6uUlEF7XFdIZdeTiuZcgZaPRvqptrsVuzBh1MLAx0EMPva9jUpKzJJXc1A3e9HqGKY7a7m9W__-SSReunQHudiYvKaFLATXKQZ2asTnwvZ0xgQqbPZcvhnXhoFlFv09taNYw1K-r1AiRbca-b23U2-td7MuSVovAPgAWpkZNnJu5xc6R9PaJ-NFm8kF04OOK-f9Xilhc8heJArn8KGRk7J9kOEnLma9v55Emt03XTrSnzT_zaj7X_Ge77Bmy_P7Xo6uoEAbP9Cs0IQmC_JMvE9L1U3VkgTTPbMfkvmr8yYwDEDMZdoCAx6QW34v0lIsNuMcq0sJUiovCTenUhyUwR1lP0S98Ga0SE6JQUN0dK2OMdlwfKudM8lcKfrFnlP-dvmjzygDYpGp0eb2lV6YrE7GDNqtVIapc5j6Dryy8-NuhVJUHfmEzHeZMMGecFLADq1kHDpmvmoz_RicJQwS-eAgeT3zLo5hYrElRLkicQSlcTC-YAcbsSpkdwrOiWDpHxctpYlcmoRMzBozo3VZSSYVE52J6rg5nQ0x_W4RFn_nuCBXuSFr8NIfG5nBkfG9XR3dvMP09SjvAd7VfKwCoVATJHO08coF5BdmRjPl96vx62wFhCSmn6xMOPt5MlyDNYJFN2tvR4teMu0GaAm2BupsKtmUs4WUdgFw3C2JYtZNkVDC4X_0Yi28KGhLHlSKMDhQnXZ26b7SB4zWU_CM6CCrXbwZYwQPvsS7FN0x8rAaFj8tO_x1iZmUoudnjW3fsRt3NAZUpFGSGJG8cmeOo0qow6FOEtFgqtQerAmed6LieHM-SgI0WIWA3EW10frPz4D_zTZtSkFMXmi0tBI4UUsWuCLFyvTSy3Wg9SNpHlVOJ-Xu6sGqmp0CoOhZwhA0lyeFmRKGXR_9ZB-DdzBSvqwB9lzAY0SSvSpSihKbzghnnecZxg0-XjC8Bz87qq5oEutQEwiOCGMvp1ublKFUG4i_byS0d8fHSOsW9n9CqNPgCCZJKfuf2vpJaWl0oWhWEsMW2IQAEt1gKsWKeRxUFTsSZCtE4foAyE49C7jYh3svqL-7qDUKTMW52F1T0TMM6FustiL3bhOiGE258rOrpepXOx0uFy6dHXXaFHhxGEdisw-fLIJFuvIexEFvUJvGwjaLHL8sGlRRuWXthwIZSTEkajmQjayN0GwR_mOV6YdQzBcF8LWB2BDicuQNICPW2VY36zkPA4C5OiRQoQM5CJwj5Pt76Y6OlwkpY-M6v_xR7EvOUgxGiPPN9roU3TQUd7LDQ76YBPhuvcyv0FYixeQGWpVBN85NopssJ2McGLwaOoiqoTnByir2eDp8n4tG5Q5SOguw4wBEjNoxf4V9zThYDlHCKQQGifSAFGmTPveNcfJfvuzNrmPLKEPCMHcqFX7UefJ-00OoZa6qAaJxORBJ2UbdphgD016loHW5t95MmcyzTMDlPYeEDLaMgrGARopg2P_d90MoFuYvPkEz4kcE_79u2tLsFR5OmPA7z5lbrJO6WzYDg9vR4Cz5ZYZicce2Q4Mx1xTtHVGFdDpSuqtj77fmIIU8JDFz-jwSHhmzhywLddIBVQFAcHkJkvgAu1kGn6dGmyeUYb6ElqNtPiHMwtv8mCTtfS5Sg3tCzQ7ORrakgDAQ-wrWScD0dDc0-IEKutmKuVUeXHylzV-SnoUNXNdgI0id0Tz6RbZwa3Y4VEp3Vv7TcbM8ltLRSh4ISqUMs4JKbZx7vXwbZGj-CkVafDSx0vErOo5fWbvHhhFPFZziFS9AiZNzcewL3ypkxrMabQ8EFaYjYmzCzHJrlZPcRnFD4Ehh2cTTd93XyY7-ov5eNGwqS0QHPUN3y7-hSWQUrklrt7GEo1pglQECcYWRpic2mOC-KT5QxUnQ6U2FMGnpfNXr675Js1A29kCZVBhidqHX9X5vzz-TL8RLUt8qWLv7j-T18PGZWBYgOycJBP6uEyvv86w9B7Vqk9IUTGxVwzVxaN_1mTQaJqRcSBd6VIDep9hdjavQNXQym3Ld3KVrVYi809Zy6-I5f0oylxB4KIwknScLvy5E50Lhzwy0znH2ggFrLPJSVbOJdUD3FbBT1G5Ia_5UeTvSjcf--l_aVFGPBum15OA554kBRazvjV-adiDmr9CthZYKZIVIyKdmgf8T9fczj8AYlQ5eS7KnPEcjDkSOnHCQoNP4lDVq5Eu2dzco2HB3EQ4YMfdO5beYI6iq1KJQUI406lIy-4SdcrgVrdSG83gfNYe6HKSbvE8l7qVxlPdL0d5_tIN5LX0qDA9hC52TC_osePApZKVv_oyzcCIX1SWkapP0MlHWcNBqln8LICUAUb-HlkMAi6oeoycU07ZLg4gb3jYjUsKShFSXRzi9EijKjP5IKICCVuEbG5ZkbCl8CCjvwVke-AidaUFbsnldlFxkH-2dlBDXU87ih2n5Etd41mYu-4TQe3VFDgPhsCp1iofz8kxiTAnwGVSF0F9aKJcHaK10D6QLpLaJ5P1cGs5nsqaUP4sBg2REJSwzT6QrY8R4nn_invQ153zTzIMDcEIsma7cVNw6JZ93ColIoHxuceZtSXFBHcGelgKwK8hGCeXQ3fomLdm7ggq4VQZ8ykDZuO-isNRERS6Zr12AERiOYkn2nX4qgbtTL9HGxJBCf0z2zBH-WuLu0yP9v1CbEH4Ru0oDPFJWoesldLDYouI3c00XwQwGCqbrYgnZM8JHD4ZDeZUThvHMXjG5fTbt066veM4u2biVcjm5yRaeJKCxY6N52w4JG8rGO0l3oAj4D6Ft2pE9LEIUmZhk3Fy5_YaFVL6oUnZPvZWUrRjFpsoSUeY9_IZDZlvmEOjlmq5g8SpEblalBuGjfbU2P6e890YNaxAsSCfKiLUQ6yWqmOVYXM4xRYhWi7WqgwddxDi6AH4GVtqzvMpUnY-U5KIDzP-o4IEcxoob_wrUCDsd6x3UVlxIP0sxkDuPA9FaNGiH5o41v1Ym97OkLOMXVv_BaK7q62RBM7cXgx7lZyzpx8qedMmcJ9Zrn35LSy3686qrgO8zdrzsMWWo2SY6r7dhcc7qP0fozNSA_lptgh5cW8KO3YjYs1w8yAWq-MmBuo5fLdl_SZo53FwtArqPCURkpiUfMMjtk-lqMgG7cuctqWHwljd6gv8puqSDDLkqAGkCcCBrggVlRtRhLvTfuKO4XXmRarHhk8FyB6TkmlgyJHZoA7_WEyT1FqwsjpGJNvKjAarhDUfxeYSc_U8L8FFgJ2RqJj4g3jF5mKBHYHKj4k8N3_rSufkzZG7kVYZM-7Yy9uXc8_VlPyXyhBXAz4XiFYFMfqWU0_Gwri8ZsDyYxuhXGsu1bId-J3RwikyGO8TeTARhHpvnywqFOW4bHoQnM7_oaOhNrWbWEzXvDUePunmw2bApE6IQA-QfpumSrMIWQzLjFyMt7zMLko4KbaucJNVSsienhKHH86m_w2ryF2AZH_YY5qEPkbVKOxWAGY5rv_Vfoswbe4laF_GN1-OquVfP5wyQUtJd5rsMSDQ5KnE_AKfd4gWaaFSB_F2FhFMNjhIx02NcMCvYk2l9qHPWPM-h1SGAeJFECpDQU6ovV6Al6nlOpHP8gxvEKH4C6oXNTvxuVPkqEhoR1gGa6o7Du-IVzzddD06eQ2_h1EXhtLjEzgiDJx6ArAXx04qhYv0Iq_qgaMgki81u-SIbhRgYyg-tdj40Wzt5bKqEOnOtIPHilFoPxDcQ88we-gE94hnmMrg8G_RIknrkcpWlPnFcB1gR8oLTuXlU3XN8CKaTHdzLBz-F_DZpSCFyWcT1XqmyQM_jcz_v70fdOM9KByPYBXaBXNf0cGXAo8nFUgW6azh3v19v_j0AH-ebm0P2qvpbyJJkuvRhLqluBfNN0x6MSCFoTogfZSOAGAWkskNh9aewqu1u"
 }
 }
 ],
 "usageMetadata": {
 "promptTokenCount": 57,
 "candidatesTokenCount": 236,
 "totalTokenCount": 293,
 "billablePromptUsage": {
 "textCount": 249
 },
 "trafficType": "ON_DEMAND",
 "promptTokensDetails": [
 {
 "modality": "TEXT",
 "tokenCount": 57
 }
 ],
 "candidatesTokensDetails": [
 {
 "modality": "TEXT",
 "tokenCount": 236
 }
 ]
 },
 "modelVersion": "gemini-2.0-flash-001",
 "createTime": "2025-03-27T14:02:25.864430Z",
 "responseId": "cVrlZ67hNOyVybgPmLC5sAg"
 }

```

## Render the Google Maps contextual widget

Rendering the Google Maps contextual widget is required as part of using
Grounding with Google Maps in Vertex AI. In any response that is grounded with Google Maps,
there is a corresponding `googleMapsWidgetContextToken` that is used to render
the contextual widget in close proximity to the generated response.

```python
 "googleMapsWidgetContextToken": "widgetcontent/AcBXPQdpWQWbap9H-OH8sEKmOXxmEKAYvff0tvthhneMQC3VrqWCjpnPBl4-Id98FGiA_S_t8aeAeJj0T6JkWFX56Bil8oBSR0W8JH3C_RSYLbTjxKdpxc9yNn6JcZTtolIRZon9xi6WpNGuSyjcIxWu2S0hwpasNOpUlWrG1RxVCB4WD1fsz_pwR236mG36lMxevXTQ_JnfdYNuQwQ4Lc3vn...<snip>...
 Ts5VJE_b3IC5eE_6wez0nh61r7foTUZpP7BXMwxR-7Wyfcj6x1v6mIWsFGr1o0p_HSAMNqWPg-aFVnkPLhAkOR6MaNZOfezTva-gxHlu7z_haFvYxcUE1qfNVQ",

```

Your page that displays the widget must use the alpha version of the
Google Maps JS API. For more information, see [Load
the Maps JavaScript
API](https://developers.google.com/maps/documentation/javascript/load-maps-js-api).

You must use the API key that was enabled for Grounding with Google Maps in Vertex AI to
load the Google Maps JS API.

This code sample demonstrates how to create a widget using HTML.

```python
 <body>
 <gmp-place-contextual id="widget"></gmp-place-contextual>
 </body>

```

In your Javascript, use the following method to update the context token:

```python
function updateWidget(contextToken) {
 let widget = document.querySelector('#widget');
 widget.contextToken = contextToken;
}

```

You can also create a widget dynamically with the following code:

```python
async function createWidget(contextToken) {
 await google.maps.importLibrary('places');
 let widgetContainer = document.querySelector('#wc'); // a div that contains the widget
 const placeContextualElement = new
 google.maps.places.PlaceContextualElement({ contextToken });
 widgetContainer.appendChild(placeContextualElement);
}

```

This HTML code sample demonstrates how to use configuration options to toggle
between two different layouts (`compact` or `vertical`).

```python
 <gmp-place-contextual id="widget">
 <gmp-place-contextual-list-config layout="compact">
 </gmp-place-contextual-list-config>
 </gmp-place-contextual>

```

This HTML code sample demonstrates how to disable the map.

```python
 <gmp-place-contextual id="widget">
 <gmp-place-contextual-list-config map-hidden>
 </gmp-place-contextual-list-config>
 </gmp-place-contextual>

```

This JavaScript code sample demonstrates how to specify a `compact` layout and
how to hide the map.

```python
 const widgetConfig = new google.maps.places.PlaceContextualListConfigElement({
 layout: 'compact',
 mapHidden: true
 });
 widget.appendChild(widgetConfig);

```

## What's next

- To learn more about how to ground Gemini models to your data, see [Grounding with
 your data](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-your-data).
- To learn more about responsible AI best practices and Vertex AI's
 safety filters, see [Responsible AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).