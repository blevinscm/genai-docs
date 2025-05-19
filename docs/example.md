---
date_scraped: 2025-05-12
title: Overview Of Prompting Strategies
---

# Overview of prompting strategies 

To see an example of prompt design,
run the "Intro to Prompt Design" Jupyter notebook in one of the following
environments:

[Open
in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/intro_prompt_design.ipynb)
|
[Open
in Colab Enterprise](https://console.cloud.google.com/vertex-ai/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fintro_prompt_design.ipynb)
|
[Open
in Vertex AI Workbench user-managed notebooks](https://console.cloud.google.com/vertex-ai/workbench/deploy-notebook?download_url=https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fprompts%2Fintro_prompt_design.ipynb)
|
[View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/prompts/intro_prompt_design.ipynb)

While there's no right or wrong way to design a prompt, there are common strategies that
you can use to affect the model's responses. Rigorous testing and evaluation remain crucial for
optimizing model performance.

Large language models (LLM) are trained on vast amounts of text data to learn the patterns and
relationships between units of language. When given some text (the prompt), language models can
predict what is likely to come next, like a sophisticated autocompletion tool. Therefore, when
designing prompts, consider the different factors that can influence what a model predicts comes
next.

### Prompt engineering workflow

Prompt engineering is a test-driven and iterative process that can enhance model performance.
When creating prompts, it is important to clearly define the objectives and expected outcomes for
each prompt and systematically test them to identify areas of improvement.

[NEEDS REVIEW]


The following diagram shows the prompt engineering workflow:

![Placeholder for Prompt Engineering Workflow Diagram: A flowchart illustrating an iterative process including steps like Define Task, Design Prompt, Test & Evaluate, Analyze Results, and Refine Prompt.](images/prompt-engineering-workflow-diagram.png)

## How to create an effective prompt

There are two aspects of a prompt that ultimately affect its effectiveness:
*content* and *structure*.

- **Content:**

 In order to complete a task, the model needs all of the relevant information associated with
 the task. This information can include instructions, examples, contextual information, and so
 on. For details, see [Components of a prompt](#components-of-a-prompt).
- **Structure:**

 Even when all the required information is provided in the prompt, giving the information
 structure helps the model parse the information. Things like the ordering, labeling, and the use
 of delimiters can all affect the quality of responses. For an example of prompt structure, see
 [Sample prompt template](#sample-prompt-template).

## Components of a prompt

The following table shows the essential and optional components of a prompt:

| Component | Description | Example |
| --- | --- | --- |
| Objective | What you want the model to achieve. Be specific and include any overarching objectives. Also called "mission" or "goal." | Your objective is to help students with math problems without directly giving them the answer. |
| Instructions | Step-by-step instructions on how to perform the task at hand. Also called "task," "steps," or "directions." | 1. Understand what the problem is asking. 2. Understand where the student is stuck. 3. Give a hint for the next step of the problem. |
| Optional components | | |
| System instructions | Technical or environmental directives that may involve controlling or altering the model's behavior across a set of tasks. For many model APIs, system instructions are specified in a dedicated parameter. System instructions are available in Gemini 2.0 Flash and later models. | You are a coding expert that specializes in rendering code for front-end interfaces. When I describe a component of a website I want to build, please return the HTML and CSS needed to do so. Do not give an explanation for this code. Also offer some UI design suggestions. |
| Persona | Who or what the model is acting as. Also called "role" or "vision." | You are a math tutor here to help students with their math homework. |
| Constraints | Restrictions on what the model must adhere to when generating a response, including what the model can and can't do. Also called "guardrails," "boundaries," or "controls." | Don't give the answer to the student directly. Instead, give hints at the next step towards solving the problem. If the student is completely lost, give them the detailed steps to solve the problem. |
| Tone | The tone of the response. You can also influence the style and tone by specifying a persona. Also called "style," "voice," or "mood." | Respond in a casual and technical manner. |
| Context | Any information that the model needs to refer to in order to perform the task at hand. Also called "background," "documents," or "input data." | A copy of the student's lesson plans for math. |
| Few-shot examples | Examples of what the response should look like for a given prompt. Also called "exemplars" or "samples." | `input:` I'm trying to calculate how many golf balls can fit into a box that has a one cubic meter volume. I've converted one cubic meter into cubic centimeters and divided it by the volume of a golf ball in cubic centimeters, but the system says my answer is wrong. `output:` Golf balls are spheres and cannot be packed into a space with perfect efficiency. Your calculations take into account the maximum packing efficiency of spheres. |
| Reasoning steps | Tell the model to explain its reasoning. This can sometimes improve the model's reasoning capability. Also called "thinking steps." | Explain your reasoning step-by-step. |
| Response format | The format that you want the response to be in. For example, you can tell the model to output the response in JSON, table, Markdown, paragraph, bulleted list, keywords, elevator pitch, and so on. Also called "structure," "presentation," or "layout." | Format your response in Markdown. |
| Recap | Concise repeat of the key points of the prompt, especially the constraints and response format, at the end of the prompt. | Don't give away the answer and provide hints instead. Always format your response in Markdown format. |
| Safeguards | Grounds the questions to the mission of the bot. Also called "safety rules." | N/A |

Depending on the specific tasks at hand, you might choose to include or exclude some of the
optional components. You can also adjust the ordering of the components and check how that can
affect the response.

## Sample prompt template

The following prompt template shows you an example of what a well-structured prompt might look
like:

|
| |
| **Sample prompt template:** ```python <OBJECTIVE_AND_PERSONA> You are a [insert a persona, such as a "math teacher" or "automotive expert"]. Your task is to... </OBJECTIVE_AND_PERSONA> <INSTRUCTIONS> To complete the task, you need to follow these steps: 1. 2. ... </INSTRUCTIONS> ------------- Optional Components ------------ <CONSTRAINTS> Dos and don'ts for the following aspects 1. Dos 2. Don'ts </CONSTRAINTS> <CONTEXT> The provided context </CONTEXT> <OUTPUT_FORMAT> The output format must be 1. 2. ... </OUTPUT_FORMAT> <FEW_SHOT_EXAMPLES> Here we provide some examples: 1. Example #1 Input: Thoughts: Output: ... </FEW_SHOT_EXAMPLES> <RECAP> Re-emphasize the key aspects of the prompt, especially the constraints, output format, etc. </RECAP> ``` |

## Best practices

Prompt design best practices include the following:

- [Give clear and specific instructions](clear-instructions.md)
- [Include few-shot examples](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/few-shot-examples)
- [Assign a role](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/assign-role)
- [Add contextual information](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/contextual-information)
- [Use system instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instructions)
- [Structure prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/structure-prompts)
- [Instruct the model to explain its reasoning](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/explain-reasoning)
- [Break down complex tasks](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/break-down-prompts)
- [Experiment with parameter values](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/adjust-parameter-values)
- [Prompt iteration strategies](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-iteration)

## What's next

- Explore examples of prompts in the
 [Prompt gallery](https://cloud.google.com/vertex-ai/generative-ai/docs/prompt-gallery).
- Learn how to optimize prompts for use with
 [Google models](../models.md) by using the
 [Vertex AI prompt optimizer (Preview)](prompt-optimizer.md).
- Learn about
 [responsible AI best practices and Vertex AI's safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).
