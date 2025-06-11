# Classifying Production Assembly Line Faults with Gemini 2.5 Pro 05-06

This guide provides a step-by-step introduction for junior developers on how to leverage the power of Gemini 2.5 Pro (specifically model version 05-06) to classify faults in a production assembly line. We'll cover everything from setting up your environment to making API calls and interpreting the results.

## Introduction

Production assembly lines can experience various faults, such as misaligned parts, missing components, or cosmetic defects. Quickly and accurately classifying these faults is crucial for maintaining quality control and production efficiency. Gemini 2.5 Pro, a powerful large language model, can be used to analyze descriptions or even images of faults and classify them based on predefined categories.

**Why Gemini 2.5 Pro?**
*   **Advanced Understanding:** Gemini can understand nuanced descriptions of faults.
*   **Flexibility:** It can be adapted to various types of faults and classification schemes with careful prompting.
*   **Rapid Prototyping:** You can quickly set up a classification system without needing extensive custom model training for initial tests.

## Prerequisites

Before you begin, ensure you have:
1.  **Basic Python Knowledge:** This guide uses Python for examples.
2.  **Access to Gemini API:** You'll need an API key for Gemini. Refer to the official Google AI documentation for access.
3.  **Sample Fault Data:** Collect some examples of fault descriptions that you want to classify. For instance:
    *   "Component A is scratched on the left side."
    *   "Wire B is not connected to terminal C."
    *   "The casing has a dent near the top corner."
4.  **Defined Fault Categories:** Decide on the categories you want to classify faults into (e.g., "Scratch," "Connection Issue," "Dent," "Missing Part").

## Step 1: Setting Up Your Environment

First, you'll need to install the necessary Google client library for Python.

```python
# It's recommended to do this in a virtual environment
pip install -q google-generativeai
```

Next, configure your API key. It's best practice to store your API key securely, for example, as an environment variable.

```python
import google.generativeai as genai
import os

# Option 1: Set GOOGLE_API_KEY environment variable before running the script
# genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Option 2: Or, if you're trying this in a Colab/Jupyter notebook,
# you can use userdata to store the key.
# from google.colab import userdata
# GOOGLE_API_KEY=userdata.get('GOOGLE_API_KEY')
# genai.configure(api_key=GOOGLE_API_KEY)

# For this example, we'll assume it's set as an environment variable
# Ensure you have your API key set for this to work
try:
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
except AttributeError:
    print("ERROR: GOOGLE_API_KEY environment variable not set.")
    print("Please set your API key to proceed.")
    # In a real application, you'd handle this more gracefully.
    exit()

print("Successfully configured Gemini API.")
```

## Step 2: Preparing Your Data

For this example, let's assume your fault data consists of textual descriptions.

```python
fault_descriptions = [
    "The front panel has a deep scratch near the logo.",
    "Sensor wire (red) is detached from its designated port.",
    "Unit fails to power on, no lights observed.",
    "Plastic casing is cracked on the bottom edge.",
    "Missing screw on the back plate, section B."
]

fault_categories = ["Cosmetic Defect", "Connectivity Issue", "Functional Failure", "Structural Damage", "Missing Component"]
```
Your categories should be clear and cover the types of faults you expect.

## Step 3: Designing Your Prompt for Gemini

A good prompt is key to getting accurate classifications from Gemini. You need to tell the model what task to perform, provide the context (your categories), and give it the input (the fault description).

Here's an example of a prompt structure:

```python
def create_classification_prompt(fault_description, categories):
    prompt = f"""You are an expert system for classifying faults on a production assembly line.
Your task is to classify the given fault description into one of the following categories:
{', '.join(categories)}.

Fault Description: "{fault_description}"

Classify the fault. Provide only the category name as the output.
Category:"""
    return prompt

# Example usage for one fault:
test_fault = fault_descriptions[0]
example_prompt = create_classification_prompt(test_fault, fault_categories)
print("--- Example Prompt ---")
print(example_prompt)
print("----------------------")
```

**Tips for Prompting:**
*   **Be Specific:** Clearly define the task and the expected output format.
*   **Provide Examples (Few-Shot Prompting):** For more complex scenarios, you can include a few examples of correctly classified faults directly within the prompt to guide the model. (This example uses zero-shot prompting).
*   **Iterate:** You might need to experiment with different prompt phrasings to get the best results.

## Step 4: Making the API Call to Gemini

Now, let's use the Gemini API to get the classification. We'll use the `gemini-1.5-pro-latest` model as an example of a powerful model suitable for this task (always check official documentation for the specific model ID like 'gemini-2.5-pro-05-06' if available, or the latest recommended version).

```python
# Initialize the model - use the appropriate model name
# For this example, we use 'gemini-1.5-pro-latest'.
# Replace with 'gemini-2.5-pro-05-06' if that's the precise model ID you must use.
model = genai.GenerativeModel('gemini-1.5-pro-latest')

def classify_fault(fault_description, categories):
    prompt = create_classification_prompt(fault_description, categories)
    try:
        response = model.generate_content(prompt)
        classification = "Error: No content in response" # Default in case of issues
        if response.parts:
            classification = response.text.strip()
        elif response.text: # Fallback if parts is empty but text might be populated
             classification = response.text.strip()
        
        if classification not in categories and not classification.startswith("Error:"):
            print(f"Warning: Model returned an unexpected category '{classification}' for description: '{fault_description}'")
        return classification
    except Exception as e:
        print(f"An error occurred during API call for '{fault_description}': {e}")
        return "Error during classification"

# Test with one fault
print(f"
--- Classifying one fault ---")
fault_to_classify = fault_descriptions[0] # "The front panel has a deep scratch near the logo."
predicted_category = classify_fault(fault_to_classify, fault_categories)
print(f"Fault: {fault_to_classify}")
print(f"Predicted Category: {predicted_category}")
print("---------------------------")
```

## Step 5: Processing the Results

The `classify_fault` function already extracts the category. If the model's output is more verbose, you would need to add parsing logic. Our prompt asks for only the category name, which simplifies this.

Let's classify all our sample faults:

```python
print("
--- Classifying all sample faults ---")
for fault_desc in fault_descriptions:
    category = classify_fault(fault_desc, fault_categories)
    print(f"Fault: "{fault_desc}" => Category: {category}")
print("-----------------------------------")
```

## Step 6: Putting It All Together - A Complete Example Script

Here is a complete script combining all the steps.

```python
import google.generativeai as genai
import os

# --- Configuration ---
# Ensure GOOGLE_API_KEY is set as an environment variable
try:
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
except AttributeError:
    print("ERROR: GOOGLE_API_KEY environment variable not set.")
    print("Please set your API key to proceed.")
    exit()

# Replace with 'gemini-2.5-pro-05-06' if that's the precise model ID you must use.
# Or use other available models like 'gemini-1.5-flash-latest' for speed/cost balance.
MODEL_NAME = 'gemini-1.5-pro-latest' # Example model
model = genai.GenerativeModel(MODEL_NAME)

# --- Data and Categories ---
fault_descriptions_data = [
    "The front panel has a deep scratch near the logo.",
    "Sensor wire (red) is detached from its designated port.",
    "Unit fails to power on, no lights observed.",
    "Plastic casing is cracked on the bottom edge.",
    "Missing screw on the back plate, section B."
]

fault_categories_list = [
    "Cosmetic Defect",
    "Connectivity Issue",
    "Functional Failure",
    "Structural Damage",
    "Missing Component"
]

# --- Prompt Engineering ---
def create_classification_prompt_text(fault_description, categories):
    prompt = f"""You are an expert system for classifying faults on a production assembly line.
Your task is to classify the given fault description into one of the following predefined categories:
Categories: {', '.join(categories)}.

Fault Description: "{fault_description}"

Carefully analyze the fault description and determine the most appropriate category.
Provide only the category name as your response. Do not add any other text or explanation.
Category:"""
    return prompt

# --- Classification Logic ---
def get_fault_classification(description, categories):
    prompt_text = create_classification_prompt_text(description, categories)
    try:
        response = model.generate_content(prompt_text)
        classification = "Classification Error: Empty Response" # Default
        if response.parts:
             classification = response.text.strip()
        elif response.text:
             classification = response.text.strip()

        if classification not in categories and not classification.startswith("Classification Error:"):
            print(f"Warning: Model returned an unexpected category '{classification}' for description: '{description}'. Expected one of: {categories}")
        return classification
    except Exception as e:
        print(f"An error occurred during API call for '{description}': {e}")
        return f"Classification Error: API Exception"

# --- Main Execution ---
if __name__ == "__main__":
    print(f"Using Gemini model: {MODEL_NAME} for fault classification.
")
    print("Available fault categories:")
    for cat in fault_categories_list:
        print(f"- {cat}")
    print("
--- Classifying Faults ---")

    for fault_desc_item in fault_descriptions_data:
        predicted_cat = get_fault_classification(fault_desc_item, fault_categories_list)
        print(f"Fault: "{fault_desc_item}" 
  => Predicted Category: {predicted_cat}
")

    print("--- Classification Complete ---")
```

## Conclusion

You've now seen a basic workflow for using Gemini 2.5 Pro to classify assembly line faults. This is a starting point. To improve this system, you could:
*   **Refine Prompts:** Experiment with different prompt structures, add few-shot examples, or adjust the temperature/top_p parameters of the API call for more or less creative responses.
*   **Use Image Input:** If your faults are visual, Gemini models with multimodal capabilities can process images alongside text descriptions for more accurate classification.
*   **Fine-tuning (Advanced):** For very specific tasks and large datasets, you might explore fine-tuning a model, though this is a more advanced topic.
*   **Error Analysis:** Regularly review misclassifications to understand why they occurred and how to improve your prompts or data.
*   **Integrate with Systems:** Connect this classification logic to your assembly line monitoring tools or databases.

Happy coding, and good luck improving your production line's quality control!
