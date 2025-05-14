---
date_scraped: 2025-05-12
title: Use Prompt Templates
---

# Use prompt templates 

**Preview**

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section
of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1).
Pre-GA products and features are available "as is" and might have limited support.
For more information, see the
[launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

This document describes how to use prompt templates. A prompt template is a
prompt that includes replaceable variables. Prompt templates enable you to test
how different prompt formats perform with different prompt data, without
requiring you to write multiple individual prompts.

For example, consider the following prompts and their corresponding system
instructions:

- **System instructions**: Respond to the question concisely.
- **Prompts**:
 - Do coyotes eat berries?
 - Do eagles swim?
 - Do squirrels dig holes?

The corresponding prompt template would be similar to the following:

- **Prompt template**: `Do {animal_name} {animal_activity}?`
- **Variable replacements**:

 | `animal_name` replacements | `animal_activity` replacements |
 | --- | --- |
 | Coyotes | eat berries |
 | Eagles | swim |
 | Squirrels | dig holes |

## Limitations

- System instructions are not supported as a replaceable variable in prompt
 templates.
- Prompt templates don't support multimodal prompts.

## Create a prompt template

Prompt templates define the format of all of your prompts through replaceable
variables. Prompt template variables must meet the following requirements:

- Variables must be wrapped in curly-braces.
- Variable names must not contain spaces.

Use the following instructions to create a prompt template.

### Console

To create a prompt template by using Vertex AI Studio in the
Google Cloud console, follow these steps:

1. In the Google Cloud console, go to the **Language** page.

 [Go to
 Vertex AI Studio](https://console.cloud.google.com/vertex-ai/generative/language/create/text)
2. In the **System instructions** field, enter system
 instructions for the prompt. For example, "Respond to the question
 concisely".
3. In the **Prompt** field, enter a prompt that includes
 prompt variables. Prompt variables must be wrapped in curly-braces and must
 not contain spaces. For example, `Do {animal_name} {animal_activity}?`.

 As you add variables, columns appear in the **Test**
 section. Each column represents the text that you want to replace the
 variables with when you run the prompt.
4. In the **Test** section, replace the variables with the text
 that you want to test. For example, enter the following:
 - In the `animal_name` column, enter "Coyotes".
 - In the `animal_activity` column, enter "eat berries".
5. Click send
 **Submit**.
6. To test how the prompt performs with other variables, adjust the
 variables, then run the prompt again. For example, enter the
 following and click **Submit**:
 - In the `animal_name` column, enter "Eagles".
 - In the `animal_activity` column, enter "swim".
7. Optional: To view different results, adjust the prompt, model, or
 parameters, and click **Submit**.

## What's next

- Learn more about
 [prompting strategies](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies).
- Learn about
 [responsible AI best practices and Vertex AI's safety filters](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai).