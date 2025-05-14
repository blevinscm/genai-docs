---
date_scraped: 2025-05-12
title: Prompting For Judge Model Customization
---

# Prompting for judge model customization 

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

For model-based metrics, the Gen AI evaluation service evaluates your models with a foundational model such as Gemini that has been configured as a judge model. This page describes how you can improve the quality of that judge model and customize it for your needs using prompt engineering techniques.

For the basic evaluation workflow, see the [Gen AI evaluation service quickstart](evaluation-quickstart.md). The *Advanced judge model customization series* includes the following pages:

1. [Evaluate a judge model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluate-judge-model)
2. Prompting for judge model customization (current page)
3. [Configure a judge model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/configure-judge-model)

## Overview

Using human judges to evaluate large language models (LLMs) can be expensive and time consuming. Using a judge model is a more scalable way to evaluate LLMs.

The Gen AI evaluation service uses Gemini 2.0 Flash by default as the judge model, with customizable prompts to evaluate your model for various use cases. Many basic use cases are covered in [Model-based metrics templates](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates), but you can use the following process to further customize your judge model beyond the basic use cases:

1. Create a dataset with prompts that are representative of your use case. The recommended dataset size is between 100 and 1000 prompts.
2. Use the prompts to modify the judge model with prompt engineering techniques.
3. [Run an evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/run-evaluation) with the judge model.

## Prompt engineering techniques

This section lists prompt engineering techniques you can use to modify the judge model. The examples use zero-shot prompting, but you can also use few-shot examples in the prompt to improve the model quality.

Start with prompts that apply to the entire evaluation dataset. The prompts should include high-level evaluation criteria and rubrics for ratings and ask for a final verdict from the judge model. For examples of evaluation criteria and rubrics across various use cases, see [Metric prompt templates](https://cloud.google.com/vertex-ai/generative-ai/docs/models/metrics-templates).

### Use Chain-of-Thought prompting

Prompt the judge model to evaluate a candidate model with a sequence of logically coherent actions or steps.

For example, you can use the following step-by-step instructions:

```python
"Please first list down the instructions in the user query."
"Please highlight such specific keywords."
"After listing down instructions, you should rank the instructions in the order of importance."
"After that, INDEPENDENTLY check if response A and response B for meeting each of the instructions."
"Writing quality/style should NOT be used to judge the response quality unless it was requested by the user."
"When evaluating the final response quality, please value Instruction Following a more important rubrics than Truthfulness."

```

The following prompt example asks the judge model to evaluate text tasks using [Chain-of-Thought prompting](https://developers.google.com/machine-learning/glossary#chain-of-thought-prompting):

```python
# Rubrics
Your mission is to judge responses from two AI models, Model A and Model B, and decide which is better. You will be given the previous conversations between the user and the model, a prompt, and responses from both models.
Please use the following rubric criteria to judge the responses:
<START OF RUBRICS>
Your task is to first analyze each response based on the two rubric criteria: instruction_following, and truthfulness (factual correctness). Start your analysis with "Analysis".
(1) Instruction Listing
Please first list down the instructions in the user query. In general, an instruction is VERY important if it is specific asked in the prompt and deviate from the norm. Please highlight such specific keywords.
You should also derive the task type from the prompt and include the task specific implied instructions.
Sometimes, no instruction is available in the prompt. It is your job to infer if the instruction is to auto-complete the prompt or asking LLM for followups.
After listing down instructions, you should rank the instructions in the order of importance.
After that, INDEPENDENTLY check if response A and response B for meeting each of the instructions. You should itemize for each instruction, if response meet, partially meet or does not meet the requirement using reasoning. You should start reasoning first before reaching a conclusion whether response satisfies the requirement. Citing examples while making reasoning is preferred.

(2) Truthfulness
Compare response A and response B for factual correctness. The one with less hallucinated issues is better.
If response is in sentences and not too long, you should check every sentence separately.
For longer responses, to check factual correctness, focus specifically on places where response A and B differ. Find the correct information in the text to decide if one is more truthful to the other or they are about the same.
If you cannot determine validity of claims made in the response, or response is a punt ("I am not able to answer that type of question"), the response has no truthful issues.
Truthfulness check is not applicable in the majority of creative writing cases ("write me a story about a unicorn on a parade")

Writing quality/style should NOT be used to judge the response quality unless it was requested by the user.

In the end, express your final verdict in one of the following choices:
1. Response A is better: [[A>B]]
2. Tie, relatively the same: [[A=B]]
3. Response B is better: [[B>A]]
Example of final verdict: "My final verdict is tie, relatively the same: [[A=B]]".

When evaluating the final response quality, please value Instruction Following a more important rubrics than Truthfulness.
When for both response, instruction and truthfulness are fully meet, it is a tie.

<END OF RUBRICS>

```

### Guide model reasoning with rating guidelines

Use rating guidelines to help the judge model evaluate model reasoning. Rating guidelines are different from rating criteria.

For example, the following prompt uses rating criteria, which instructs a judge model to rate the "instruction following" task with the rating rubrics "major issues", "minor issues", and "no issues:"

```python
Your task is to first analyze each response based on the three rubric criteria: verbosity, instruction_following, truthfulness (code correctness) and (coding) executability. Please note that the model responses should follow "response system instruction" (if provided). Format your judgment in the following way:
Response A - verbosity:too short|too verbose|just right
Response A - instruction_following:major issues|minor issues|no issues
Response A - truthfulness:major issues|minor issues|no issues
Response A - executability:no|no code present|yes-fully|yes-partially
Then do the same for response B.

After the rubric judgements, you should also give a brief rationale to summarize your evaluation considering each individual criteria as well as the overall quality in a new paragraph starting with "Reason: ".

In the last line, express your final judgment in the format of: "Which response is better: [[verdict]]" where "verdict" is one of {Response A is much better, Response A is better, Response A is slightly better, About the same, Response B is slightly better, Response B is better, Response B is much better}. Do not use markdown format or output anything else.

```

The following prompt uses rating guidelines to help the judge model rate the "instruction following" task:

```python
You are a judge for coding related tasks for LLMs. You will be provided with a coding prompt, and two responses (Response A and Response B) attempting to answer the prompt. Your task is to evaluate each response based on the following criteria:

Correctness: Does the code produce the correct output and solve the problem as stated?
Executability: Does the code run without errors?
Instruction Following: Does the code adhere to the given instructions and constraints?

Please think about the three criteria, and provide a side-by-side comparison rating to to indicate which one is better.

```

### Calibrate the judge model with reference answers

You can calibrate the judge model with reference answers for some or all prompts.

The following prompt guides the judge model on how to use the reference answers:

```python
"Note that you can compare the responses with the reference answer to make your judgment, but the reference answer may not be the only correct answer to the query."

```

The following example also uses reasoning, Chain-of-Thought prompting, and rating guidelines to guide the evaluation process for the "Instruction Following" task:

```python
# Rubrics
Your mission is to judge responses from two AI models, Model A and Model B, and decide which is better. You will be given a user query, source summaries, and responses from both models. A reference answer
may also be provided - note that you can compare the responses with the reference answer to make your judgment, but the reference answer may not be the only correct answer to the query.

Please use the following rubric criteria to judge the responses:

<START OF RUBRICS>
Your task is to first analyze each response based on the three rubric criteria: grounding, completeness, and instruction_following. Start your analysis with "Analysis".

(1) Grounding
Please first read through all the given sources in the source summaries carefully and make sure you understand the key points in each one.
After that, INDEPENDENTLY check if response A and response B use ONLY the given sources in the source summaries to answer the user query. It is VERY important to check that all
statements in the response MUST be traceable back to the source summaries and ACCURATELY cited.

(2) Completeness
Please first list down the aspects in the user query. After that, INDEPENDENTLY check if response A and response B for covering each of the aspects by using ALL RELEVANT information from the sources.

(3) Instruction Following
Please read through the following instruction following rubrics carefully. After that, INDEPENDENTLY check if response A and response B for following each of the instruction following rubrics successfully.
 * Does the response provide a final answer based on summaries of 3 potential answers to a user query?
 * Does the response only use the technical sources provided that are relevant to the query?
 * Does the response use only information from sources provided?
 * Does the response select all the sources that provide helpful details to answer the question in the Technical Document?
 * If the sources have significant overlapping or duplicate details, does the response select sources which are most detailed and comprehensive?
 * For each selected source, does the response prepend source citations?
 * Does the response use the format: "Source X" where x represents the order in which the technical source appeared in the input?
 * Does the response use original source(s) directly in its response, presenting each source in its entirety, word-for-word, without omitting and altering any details?
 * Does the response create a coherent technical final answer from selected Sources without inter-mixing text from any of the Sources?

Writing quality/style can be considered, but should NOT be used as critical rubric criteria to judge the response quality.

In the end, express your final verdict in one of the following choices:
1. Response A is better: [[A>B]]
2. Tie, relatively the same: [[A=B]]
3. Response B is better: [[B>A]]
Example of final verdict: "My final verdict is tie, relatively the same: [[A=B]]".

When for both response, grounding, completeness, and instruction following are fully meet, it is a tie.

<END OF RUBRICS>

```

## What's next

- [Run your evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/run-evaluation) with the modified judge model.
- [Configure your judge model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/configure-judge-model)