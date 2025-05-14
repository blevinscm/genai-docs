---
date_scraped: 2025-05-12
title: Content Generation Parameters
---

# Content generation parameters 

This page shows the optional sampling parameters you can set in a request to a
model. The parameters available for each model may differ. For more information,
see the [reference documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#generationconfig).

## Token sampling parameters

### Top-P

Top-P changes how the model selects tokens for output. Tokens are selected
from the most (see top-K) to least probable until the sum of their probabilities
equals the top-P value. For example, if tokens A, B, and C have a probability of
0.3, 0.2, and 0.1 and the top-P value is `0.5`, then the model will
select either A or B as the next token by using temperature and excludes C as a
candidate.

Specify a lower value for less random responses and a higher value for more
random responses.

For more information, see [`topP`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#topP).

### Top-K

Top-K changes how the model selects tokens for output. A top-K of
`1` means the next selected token is the most probable among all
tokens in the model's vocabulary (also called greedy decoding), while a top-K of
`3` means that the next token is selected from among the three most
probable tokens by using temperature.

For each token selection step, the top-K tokens with the highest
probabilities are sampled. Then tokens are further filtered based on top-P with
the final token selected using temperature sampling.

Specify a lower value for less random responses and a higher value for more
random responses.

For more information, see [`topK`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#topK).**Note:** Not all Gemini models support the `top-k` parameter.

### Temperature

The temperature is used for sampling during response generation, which occurs when `topP`
and `topK` are applied. Temperature controls the degree of randomness in token selection.
Lower temperatures are good for prompts that require a less open-ended or creative response, while
higher temperatures can lead to more diverse or creative results. A temperature of `0`
means that the highest probability tokens are always selected. In this case, responses for a given
prompt are mostly deterministic, but a small amount of variation is still possible.

If the model returns a response that's too generic, too short, or the model gives a fallback
response, try increasing the temperature.

Lower temperatures lead to predictable (but not completely [deterministic](https://medium.com/google-cloud/is-a-zero-temperature-deterministic-c4a7faef4d20))
results. For more information, see [`temperature`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#temperature).

## Stopping parameters

### Maximum output tokens

Set [`maxOutputTokens`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#maxOutputTokens) to limit the number of tokens
generated in the response. A token is approximately four characters, so 100
tokens correspond to roughly 60-80 words. Set a low value to limit the length
of the response.

### Stop sequences

Define strings in [`stopSequences`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#stopSequences) to tell the model to stop
generating text if one of the strings is encountered in the response. If a
string appears multiple times in the response, then the response is truncated
where the string is first encountered. The strings are case-sensitive.

## Token penalization parameters

### Frequency penalty

Positive values penalize tokens that repeatedly appear in the generated text, decreasing the
probability of repeating content. The minimum value is `-2.0`. The maximum value is up
to, but not including, `2.0`.
For more information, see [`frequencyPenalty`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#frequencyPenalty).

### Presence penalty

Positive values penalize tokens that already appear in the generated text, increasing the
probability of generating more diverse content. The minimum value is `-2.0`. The maximum
value is up to, but not including, `2.0`.
For more information, see [`presencePenalty`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#presencePenalty).

## Advanced parameters

Use these parameters to return more information about the tokens in the response
or to control the variability of the response.

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

### Log probabilities of output tokens

Returns the log probabilities of the top candidate tokens at each generation step. The model's
chosen token might not be the same as the top candidate token at each step. Specify the number of
candidates to return by using an integer value in the range of `1`-`5`.
For more information, see [`logprobs`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#logprobs). You also need to
set the [`responseLogprobs`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#responseLogprobs) parameter to `true` to use this
feature.

The [`responseLogprobs`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#responseLogprobs) parameter returns the log
probabilities of the tokens that were chosen by the model at each step.

### Seed

When seed is fixed to a specific value, the model makes a best effort to provide
the same response for repeated requests. Deterministic output isn't guaranteed.
Also, changing the model or parameter settings, such as the temperature, can
cause variations in the response even when you use the same seed value. By
default, a random seed value is used.
For more information, see [`seed`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#seed).