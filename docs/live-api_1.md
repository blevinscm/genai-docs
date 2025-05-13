---
title: Live-API
source: https://cloud.google.com/vertex-ai/generative-ai/docs/live-api
date_scraped: 2025-05-12
---

# Live API 

**Preview**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

To try a tutorial that lets you use your voice and camera to talk to
Gemini through the Live API, see the [`websocket-demo-app`
tutorial](https://github.com/GoogleCloudPlatform/generative-ai/tree/main/gemini/multimodal-live-api/websocket-demo-app).

The Live API enables low-latency bidirectional voice and video
interactions with Gemini. Using the Live API, you can
provide end users with the experience of natural, human-like voice
conversations, and with the ability to interrupt the model's responses using
voice commands. The Live API
can process text, audio, and video input, and it can provide text and audio
output.

## Specifications

The Live API features the following technical specifications:

- **Inputs:** Text, audio, and video
- **Outputs:** Text and audio (synthesized speech)
- **Default session length:** 10 minutes
 - Session length can be extended in 10 minute increments as needed
- **Context window:** 32K tokens
- Selection between 8 voices for responses
- Support for responses in 31 languages

## Use the Live API

**Note:** Live API is only available in `gemini-2.0-flash-live-preview-04-09`,
not `gemini-2.0-flash`.

The following sections provide examples on how to use the
Live API's features.

For more information, see the [Live API reference
guide](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-live).

### Send text and receive audio

#### Gen AI SDK for Python

```python
voice_name = "Aoede" # @param ["Aoede", "Puck", "Charon", "Kore", "Fenrir", "Leda", "Orus", "Zephyr"]

config = LiveConnectConfig(
 response_modalities=["AUDIO"],
 speech_config=SpeechConfig(
 voice_config=VoiceConfig(
 prebuilt_voice_config=PrebuiltVoiceConfig(
 voice_name=voice_name,
 )
 ),
 ),
)

async with client.aio.live.connect(
 model=MODEL_ID,
 config=config,
) as session:
 text_input = "Hello? Gemini are you there?"
 display(Markdown(f"**Input:** {text_input}"))

 await session.send_client_content(
 turns=Content(role="user", parts=[Part(text=text_input)]))

 audio_data = []
 async for message in session.receive():
 if (
 message.server_content.model_turn
 and message.server_content.model_turn.parts
 ):
 for part in message.server_content.model_turn.parts:
 if part.inline_data:
 audio_data.append(
 np.frombuffer(part.inline_data.data, dtype=np.int16)
 )

 if audio_data:
 display(Audio(np.concatenate(audio_data), rate=24000, autoplay=True))
 
```

### Send and receive text

### Gen AI SDK for Python

#### Install

```python
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```python
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=True
```

```python
from google import genai
from google.genai.types import (
 Content,
 LiveConnectConfig,
 HttpOptions,
 Modality,
 Part,
)

client = genai.Client(http_options=HttpOptions(api_version="v1beta1"))
model_id = "gemini-2.0-flash-live-preview-04-09"

async with client.aio.live.connect(
 model=model_id,
 config=LiveConnectConfig(response_modalities=[Modality.TEXT]),
) as session:
 text_input = "Hello? Gemini, are you there?"
 print("> ", text_input, "\n")
 await session.send_client_content(
 turns=Content(role="user", parts=[Part(text=text_input)])
 )

 response = []

 async for message in session.receive():
 if message.text:
 response.append(message.text)

 print("".join(response))
# Example output:
# > Hello? Gemini, are you there?
# Yes, I'm here. What would you like to talk about?
```

### Send audio

#### Gen AI SDK for Python

```python
import asyncio
import wave
from google import genai

client = genai.Client(api_key="GEMINI_API_KEY", http_options={'api_version': 'v1alpha'})
model = "gemini-2.0-flash-live-preview-04-09"

config = {"response_modalities": ["AUDIO"]}

async def main():
 async with client.aio.live.connect(model=model, config=config) as session:
 wf = wave.open("audio.wav", "wb")
 wf.setnchannels(1)
 wf.setsampwidth(2)
 wf.setframerate(24000)

 message = "Hello? Gemini are you there?"
 await session.send_client_content(
 turns=Content(role="user", parts=[Part(text=message)]))

 async for idx,response in async_enumerate(session.receive()):
 if response.data is not None:
 wf.writeframes(response.data)

 # Un-comment this code to print audio data info
 # if response.server_content.model_turn is not None:
 # print(response.server_content.model_turn.parts[0].inline_data.mime_type)

 wf.close()

if __name__ == "__main__":
 asyncio.run(main())
 
```

#### Supported audio formats

The Live API supports the following audio formats:

- **Input audio format:** Raw 16 bit PCM audio at 16kHz little-endian
- **Output audio format:** Raw 16 bit PCM audio at 24kHz little-endian

### Audio transcription

The Live API can transcribe both input and output audio:

#### Gen AI SDK for Python

```python
# Set model generation_config
CONFIG = {
 'response_modalities': ['AUDIO'],
}

headers = {
 "Content-Type": "application/json",
 "Authorization": f"Bearer {bearer_token[0]}",
}

# Connect to the server
async with connect(SERVICE_URL, additional_headers=headers) as ws:
 # Setup the session
 await ws.send(
 json.dumps(
 {
 "setup": {
 "model": "gemini-2.0-flash-live-preview-04-09",
 "generation_config": CONFIG,
 'input_audio_transcription': {},
 'output_audio_transcription': {}
 }
 }
 )
 )

 # Receive setup response
 raw_response = await ws.recv(decode=False)
 setup_response = json.loads(raw_response.decode("ascii"))

 # Send text message
 text_input = "Hello? Gemini are you there?"
 display(Markdown(f"**Input:** {text_input}"))

 msg = {
 "client_content": {
 "turns": [{"role": "user", "parts": [{"text": text_input}]}],
 "turn_complete": True,
 }
 }

 await ws.send(json.dumps(msg))

 responses = []
 input_transcriptions = []
 output_transcriptions = []

 # Receive chucks of server response
 async for raw_response in ws:
 response = json.loads(raw_response.decode())
 server_content = response.pop("serverContent", None)
 if server_content is None:
 break

 if (input_transcription := server_content.get("inputTranscription")) is not None:
 if (text := input_transcription.get("text")) is not None:
 input_transcriptions.append(text)
 if (output_transcription := server_content.get("outputTranscription")) is not None:
 if (text := output_transcription.get("text")) is not None:
 output_transcriptions.append(text)

 model_turn = server_content.pop("modelTurn", None)
 if model_turn is not None:
 parts = model_turn.pop("parts", None)
 if parts is not None:
 for part in parts:
 pcm_data = base64.b64decode(part["inlineData"]["data"])
 responses.append(np.frombuffer(pcm_data, dtype=np.int16))

 # End of turn
 turn_complete = server_content.pop("turnComplete", None)
 if turn_complete:
 break

 if input_transcriptions:
 display(Markdown(f"**Input transcription >** {''.join(input_transcriptions)}"))

 if responses:
 # Play the returned audio message
 display(Audio(np.concatenate(responses), rate=24000, autoplay=True))

 if output_transcriptions:
 display(Markdown(f"**Output transcription >** {''.join(output_transcriptions)}"))
 
```

### Change voice and language settings

The Live API uses Chirp 3 to support synthesized speech responses
in 8 HD voices and 31 languages.

You can select between the following voices:

- `Aoede` (female)
- `Charon` (male)
- `Fenrir` (male)
- `Kore` (female)
- `Leda` (female)
- `Orus` (male)
- `Puck` (male)
- `Zephyr` (female)

For demos of what these voices sound like and for the full list of available
languages, see [Chirp 3: HD voices](/text-to-speech/docs/chirp3-hd).

To set the response voice and language:

#### Gen AI SDK for Python

```python
config = LiveConnectConfig(
 response_modalities=["AUDIO"],
 speech_config=SpeechConfig(
 voice_config=VoiceConfig(
 prebuilt_voice_config=PrebuiltVoiceConfig(
 voice_name=voice_name,
 )
 ),
 language_code="en-US",
 ),
)
 
```

#### Console

1. Open [**Vertex AI Studio > Stream realtime**](https://console.cloud.google.com/vertex-ai/studio/multimodal-live).
2. In the **Outputs** expander, select a voice from the **Voice** drop-down.
3. In the same expander, select a language from the **Language** drop-down.
4. Click **mic Start session** to start the session.

For the best results when prompting and requiring the model to respond in a
non-English language, include the following as part of your system instructions:

```python
RESPOND IN LANGUAGE. YOU MUST RESPOND UNMISTAKABLY IN LANGUAGE.
```

### Have a streamed conversation

#### Gen AI SDK for Python

Set up a conversation with the API that lets you send text prompts and receive audio responses:

```python
# Set model generation_config
CONFIG = {"response_modalities": ["AUDIO"]}

headers = {
 "Content-Type": "application/json",
 "Authorization": f"Bearer {bearer_token[0]}",
}

async def main() -> None:
 # Connect to the server
 async with connect(SERVICE_URL, additional_headers=headers) as ws:

 # Setup the session
 async def setup() -> None:
 await ws.send(
 json.dumps(
 {
 "setup": {
 "model": "gemini-2.0-flash-live-preview-04-09",
 "generation_config": CONFIG,
 }
 }
 )
 )

 # Receive setup response
 raw_response = await ws.recv(decode=False)
 setup_response = json.loads(raw_response.decode("ascii"))
 print(f"Connected: {setup_response}")
 return

 # Send text message
 async def send() -> bool:
 text_input = input("Input > ")
 if text_input.lower() in ("q", "quit", "exit"):
 return False

 msg = {
 "client_content": {
 "turns": [{"role": "user", "parts": [{"text": text_input}]}],
 "turn_complete": True,
 }
 }

 await ws.send(json.dumps(msg))
 return True

 # Receive server response
 async def receive() -> None:
 responses = []

 # Receive chucks of server response
 async for raw_response in ws:
 response = json.loads(raw_response.decode())
 server_content = response.pop("serverContent", None)
 if server_content is None:
 break

 model_turn = server_content.pop("modelTurn", None)
 if model_turn is not None:
 parts = model_turn.pop("parts", None)
 if parts is not None:
 for part in parts:
 pcm_data = base64.b64decode(part["inlineData"]["data"])
 responses.append(np.frombuffer(pcm_data, dtype=np.int16))

 # End of turn
 turn_complete = server_content.pop("turnComplete", None)
 if turn_complete:
 break

 # Play the returned audio message
 display(Markdown("**Response >**"))
 display(Audio(np.concatenate(responses), rate=24000, autoplay=True))
 return

 await setup()

 while True:
 if not await send():
 break
 await receive()
 
```

Start the conversation, input your prompts, or type `q`, `quit` or `exit` to exit.

```python
await main()
 
```

#### Console

1. Open [**Vertex AI Studio > Stream realtime**](https://console.cloud.google.com/vertex-ai/studio/multimodal-live).
2. Click **mic Start session** to start the conversation session.

To end the session, click **stop\_circleStop session**.

#### Session length

The default maximum length of a conversation session is 10 minutes. A `go_away`
notification (`BidiGenerateContentServerMessage.go_away`) will be sent back to
the client 60 seconds before the session ends.

When using the API, you can extend the length of your session by 10 minute
increments. There is no limit on how many times you can extend a session. For an
example of how to extend your session length, see [Enable and disable session
resumption](#session-resumption). This feature is currently only available in
the API, not in Vertex AI Studio.

#### Context window

The maximum context length for a session in the Live API is 32,768 tokens by
default, which are allocated to store realtime data that is streamed in at a
rate of 25 tokens per second (TPS) for audio and 258 TPS for video, and other
contents including text based inputs, model outputs, etc.

If the context window exceeds the maximum context length, the contexts of the
oldest turns from context window will be truncated, so that the overall context
window size is below the limitation.

The default context length of the session, and the target context length after
the truncation, can be configured using
`context_window_compression.trigger_tokens` and
`context_window_compression.sliding_window.target_tokens` field of the setup
message respectively.

#### Concurrent sessions

By default, you can have up to 10 concurrent sessions per project.

#### Update the system instructions mid-session

The Live API lets you update the system instructions in the
middle of an active session. You can use this to adapt the model's responses
mid-session, such as changing the language the model responds in to another
language or modify the tone you want the model to respond with.

### Change voice activity detection settings

By default, the model automatically performs voice activity detection (VAD) on a
continuous audio input stream. VAD can be configured with the
[`realtimeInputConfig.automaticActivityDetection`](https://ai.google.dev/gemini-api/docs/live#RealtimeInputConfig.AutomaticActivityDetection)
field of the [setup
message](https://ai.google.dev/gemini-api/docs/live#GenerateContentSetup).

When the audio stream is paused for more than a second (for example, because the
user switched off the microphone), an
[`audioStreamEnd`](https://ai.google.dev/gemini-api/docs/live#BidiGenerateContentRealtimeInput.FIELDS.bool.BidiGenerateContentRealtimeInput.audio_stream_end)
event should be sent to flush any cached audio. The client can resume sending
audio data at any time.

Alternatively, the automatic VAD can be disabled by setting
`realtimeInputConfig.automaticActivityDetection.disabled` to `true` in the setup
message. In this configuration the client is responsible for detecting user
speech and sending
[`activityStart`](https://ai.google.dev/gemini-api/docs/live#BidiGenerateContentRealtimeInput.FIELDS.BidiGenerateContentRealtimeInput.ActivityStart.BidiGenerateContentRealtimeInput.activity_start)
and
[`activityEnd`](https://ai.google.dev/gemini-api/docs/live#BidiGenerateContentRealtimeInput.FIELDS.BidiGenerateContentRealtimeInput.ActivityEnd.BidiGenerateContentRealtimeInput.activity_end)
messages at the appropriate times. An `audioStreamEnd` isn't sent in this
configuration. Instead, any interruption of the stream is marked by an
`activityEnd` message.

### Enable and disable session resumption

This feature is disabled by default. It must be enabled by the user every time
they call the API by specifying the field in the API request, and project-level
privacy is enforced for cached data. Enabling Session Resumption allows the user
to reconnect to a previous session within 24 hours by storing cached data,
including text, video, and audio prompt data and model outputs, for up to 24
hours. To achieve zero data retention, do not enable this feature.

To enable the session resumption feature, set the `session_resumption` field of
the `BidiGenerateContentSetup` message. If enabled, the server will periodically
take a snapshot of the current cached session contexts, and store it in the
internal storage. When a snapshot is successfully taken, a `resumption_update`
will be returned with the handle ID that you can record and use later to resume
the session from the snapshot.

Here's an example of enabling session resumption feature, and collect the handle
ID information:

#### Gen AI SDK for Python

```python
# Set model generation_config
CONFIG = {"response_modalities": ["TEXT"]}

headers = {
 "Content-Type": "application/json",
 "Authorization": f"Bearer {bearer_token[0]}",
}

# Connect to the server
async with connect(SERVICE_URL, additional_headers=headers) as ws:
 # Setup the session
 await ws.send(
 json.dumps(
 {
 "setup": {
 "model": "gemini-2.0-flash-live-preview-04-09",
 "generation_config": CONFIG,
 # Enable session resumption.
 "session_resumption": {},
 }
 }
 )
 )

 # Receive setup response
 raw_response = await ws.recv(decode=False)
 setup_response = json.loads(raw_response.decode("ascii"))

 # Send text message
 text_input = "Hello? Gemini are you there?"
 display(Markdown(f"**Input:** {text_input}"))

 msg = {
 "client_content": {
 "turns": [{"role": "user", "parts": [{"text": text_input}]}],
 "turn_complete": True,
 }
 }

 await ws.send(json.dumps(msg))

 responses = []
 handle_id = ""

 turn_completed = False
 resumption_received = False

 # Receive chucks of server response,
 # wait for turn completion and resumption handle.
 async for raw_response in ws:
 response = json.loads(raw_response.decode())

 server_content = response.pop("serverContent", None)
 resumption_update = response.pop("sessionResumptionUpdate", None)

 if server_content is not None:
 model_turn = server_content.pop("modelTurn", None)
 if model_turn is not None:
 parts = model_turn.pop("parts", None)
 if parts is not None:
 responses.append(parts[0]["text"])

 # End of turn
 turn_complete = server_content.pop("turnComplete", None)
 if turn_complete:
 turn_completed = True

 elif resumption_update is not None:
 handle_id = resumption_update['newHandle']
 resumption_received = True
 else:
 continue

 if turn_complete and resumption_received:
 break

 # Print the server response
 display(Markdown(f"**Response >** {''.join(responses)}"))
 display(Markdown(f"**Session Handle ID >** {handle_id}"))
 
```

If you want to resume the previous session, you can set the `handle` field of
the `setup.session_resumption` configuration to the previously recorded handle
ID:

#### Gen AI SDK for Python

```python
# Set model generation_config
CONFIG = {"response_modalities": ["TEXT"]}

headers = {
 "Content-Type": "application/json",
 "Authorization": f"Bearer {bearer_token[0]}",
}

# Connect to the server
async with connect(SERVICE_URL, additional_headers=headers) as ws:
 # Setup the session
 await ws.send(
 json.dumps(
 {
 "setup": {
 "model": "gemini-2.0-flash-live-preview-04-09",
 "generation_config": CONFIG,
 # Enable session resumption.
 "session_resumption": {
 "handle": handle_id,
 },
 }
 }
 )
 )

 # Receive setup response
 raw_response = await ws.recv(decode=False)
 setup_response = json.loads(raw_response.decode("ascii"))

 # Send text message
 text_input = "What was the last question I asked?"
 display(Markdown(f"**Input:** {text_input}"))

 msg = {
 "client_content": {
 "turns": [{"role": "user", "parts": [{"text": text_input}]}],
 "turn_complete": True,
 }
 }

 await ws.send(json.dumps(msg))

 responses = []
 handle_id = ""

 turn_completed = False
 resumption_received = False

 # Receive chucks of server response,
 # wait for turn completion and resumption handle.
 async for raw_response in ws:
 response = json.loads(raw_response.decode())

 server_content = response.pop("serverContent", None)
 resumption_update = response.pop("sessionResumptionUpdate", None)

 if server_content is not None:
 model_turn = server_content.pop("modelTurn", None)
 if model_turn is not None:
 parts = model_turn.pop("parts", None)
 if parts is not None:
 responses.append(parts[0]["text"])

 # End of turn
 turn_complete = server_content.pop("turnComplete", None)
 if turn_complete:
 turn_completed = True

 elif resumption_update is not None:
 handle_id = resumption_update['newHandle']
 resumption_received = True
 else:
 continue

 if turn_complete and resumption_received:
 break

 # Print the server response
 # Expected answer: "You just asked if I was there."
 display(Markdown(f"**Response >** {''.join(responses)}"))
 display(Markdown(f"**Session Handle >** {resumption_update}"))
 
```

If you want to achieve seamless session resumption, you can enable *transparent
mode*:

#### Gen AI SDK for Python

```python
await ws.send(
 json.dumps(
 {
 "setup": {
 "model": "gemini-2.0-flash-live-preview-04-09",
 "generation_config": CONFIG,
 # Enable session resumption.
 "session_resumption": {
 "transparent": True,
 },
 }
 }
 )
 )
 
```

After the transparent mode is enabled, the index of the client message that
corresponds with the context snapshot is explicitly returned. This helps
identify which client message you need to send again, when you resume the
session from the resumption handle.

### Use function calling

You can use function calling to create a description of a function, then pass
that description to the model in a request. The response from the model includes
the name of a function that matches the description and the arguments to call it
with.

All functions must be declared at the start of the session by sending tool
definitions as part of the `setup` message.

#### Gen AI SDK for Python

```python
# Set model generation_config
CONFIG = {"response_modalities": ["TEXT"]}

# Define function declarations
TOOLS = {
 "function_declarations": {
 "name": "get_current_weather",
 "description": "Get the current weather in the given location",
 "parameters": {
 "type": "OBJECT",
 "properties": {"location": {"type": "STRING"}},
 },
 }
}

headers = {
 "Content-Type": "application/json",
 "Authorization": f"Bearer {bearer_token[0]}",
}

# Connect to the server
async with connect(SERVICE_URL, additional_headers=headers) as ws:
 # Setup the session
 await ws.send(
 json.dumps(
 {
 "setup": {
 "model": "gemini-2.0-flash-live-preview-04-09",
 "generation_config": CONFIG,
 "tools": TOOLS,
 }
 }
 )
 )

 # Receive setup response
 raw_response = await ws.recv(decode=False)
 setup_response = json.loads(raw_response.decode())

 # Send text message
 text_input = "Get the current weather in Santa Clara, San Jose and Mountain View"
 display(Markdown(f"**Input:** {text_input}"))

 msg = {
 "client_content": {
 "turns": [{"role": "user", "parts": [{"text": text_input}]}],
 "turn_complete": True,
 }
 }

 await ws.send(json.dumps(msg))

 responses = []

 # Receive chucks of server response
 async for raw_response in ws:
 response = json.loads(raw_response.decode("UTF-8"))

 if (tool_call := response.get("toolCall")) is not None:
 for function_call in tool_call["functionCalls"]:
 responses.append(f"FunctionCall: {str(function_call)}\n")

 if (server_content := response.get("serverContent")) is not None:
 if server_content.get("turnComplete", True):
 break

 # Print the server response
 display(Markdown("**Response >** {}".format("\n".join(responses))))
 
```

### Use code execution

You can use code execution with the Live API to generate and
execute Python code directly.

#### Gen AI SDK for Python

```python
# Set model generation_config
CONFIG = {"response_modalities": ["TEXT"]}

# Set code execution
TOOLS = {"code_execution": {}}

headers = {
 "Content-Type": "application/json",
 "Authorization": f"Bearer {bearer_token[0]}",
}

# Connect to the server
async with connect(SERVICE_URL, additional_headers=headers) as ws:
 # Setup the session
 await ws.send(
 json.dumps(
 {
 "setup": {
 "model": "gemini-2.0-flash-live-preview-04-09",
 "generation_config": CONFIG,
 "tools": TOOLS,
 }
 }
 )
 )

 # Receive setup response
 raw_response = await ws.recv(decode=False)
 setup_response = json.loads(raw_response.decode())

 # Send text message
 text_input = "Write code to calculate the 15th fibonacci number then find the nearest palindrome to it"
 display(Markdown(f"**Input:** {text_input}"))

 msg = {
 "client_content": {
 "turns": [{"role": "user", "parts": [{"text": text_input}]}],
 "turn_complete": True,
 }
 }

 await ws.send(json.dumps(msg))

 responses = []

 # Receive chucks of server response
 async for raw_response in ws:
 response = json.loads(raw_response.decode("UTF-8"))

 if (server_content := response.get("serverContent")) is not None:
 if (model_turn:= server_content.get("modelTurn")) is not None:
 if (parts := model_turn.get("parts")) is not None:
 if parts[0].get("text"):
 responses.append(parts[0]["text"])
 for part in parts:
 if (executable_code := part.get("executableCode")) is not None:
 display(
 Markdown(
 f"""**Executable code:**
```py
{executable_code.get("code")}
```
 """
 )
 )
 if server_content.get("turnComplete", False):
 break

 # Print the server response
 display(Markdown(f"**Response >** {''.join(responses)}"))
 
```

### Use Grounding with Google Search

You can use [Grounding with Google
Search](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/ground-with-google-search) with
the Live API using `google_search`:

#### Gen AI SDK for Python

```python
# Set model generation_config
CONFIG = {"response_modalities": ["TEXT"]}

# Set google search
TOOLS = {"google_search": {}}

headers = {
 "Content-Type": "application/json",
 "Authorization": f"Bearer {bearer_token[0]}",
}

# Connect to the server
async with connect(SERVICE_URL, additional_headers=headers) as ws:
 # Setup the session
 await ws.send(
 json.dumps(
 {
 "setup": {
 "model": "gemini-2.0-flash-live-preview-04-09",
 "generation_config": CONFIG,
 "tools": TOOLS,
 }
 }
 )
 )

 # Receive setup response
 raw_response = await ws.recv(decode=False)
 setup_response = json.loads(raw_response.decode())

 # Send text message
 text_input = "What is the current weather in San Jose, CA?"
 display(Markdown(f"**Input:** {text_input}"))

 msg = {
 "client_content": {
 "turns": [{"role": "user", "parts": [{"text": text_input}]}],
 "turn_complete": True,
 }
 }

 await ws.send(json.dumps(msg))

 responses = []

 # Receive chucks of server response
 async for raw_response in ws:
 response = json.loads(raw_response.decode())
 server_content = response.pop("serverContent", None)
 if server_content is None:
 break

 model_turn = server_content.pop("modelTurn", None)
 if model_turn is not None:
 parts = model_turn.pop("parts", None)
 if parts is not None:
 responses.append(parts[0]["text"])

 # End of turn
 turn_complete = server_content.pop("turnComplete", None)
 if turn_complete:
 break

 # Print the server response
 display(Markdown("**Response >** {}".format("\n".join(responses))))
 
```

## Limitations

See the [Live API limitations
section](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-live#limitations)
of our reference documentation for the full list of current limitations for the
Live API.

## Pricing

See our [Pricing page](https://cloud.google.com/vertex-ai/generative-ai/pricing) for details.

## More information

For more information on Live API like the `WebSocket` API
reference, see the [Gemini API
documentation](https://ai.google.dev/gemini-api/docs/live).