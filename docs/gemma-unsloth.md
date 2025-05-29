# Tuning Gemma with Unsloth for Peak Performance

Unsloth provides a significantly faster and more memory-efficient way to fine-tune Gemma models. This guide will walk you through the steps to tune Gemma using Unsloth, complete with code examples.

## Why Unsloth for Gemma?

- **Speed:** Up to 2-5x faster fine-tuning compared to traditional methods.
- **Memory Efficiency:** Train larger models or use larger batch sizes on the same hardware.
- **Ease of Use:** Unsloth integrates smoothly with Hugging Face's `transformers` and `peft` libraries.
- **No Quality Degradation:** Achieves these speedups without sacrificing model performance.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.8 or higher
- PyTorch (latest stable version recommended)
- Transformers library by Hugging Face
- PEFT (Parameter-Efficient Fine-Tuning) library by Hugging Face
- Unsloth library
- Datasets library by Hugging Face (for loading your data)
- TRL (Transformer Reinforcement Learning) for the SFTTrainer

You can install the necessary libraries using pip:

```bash
pip install "unsloth[gemma-new] @ git+https://github.com/unslothai/unsloth.git"
pip install "transformers[torch]" "peft" "accelerate" "datasets" "trl"
```

## Step-by-Step Guide to Tuning Gemma with Unsloth

### 1. Import Libraries and Load Model

First, import the necessary libraries and load the Gemma model using Unsloth's `FastLanguageModel`. This function automatically applies optimizations for speed and memory.

```python
from unsloth import FastLanguageModel
import torch
from transformers import TrainingArguments
from trl import SFTTrainer
from datasets import load_dataset

# Specify the maximum sequence length
max_seq_length = 2048

# Specify the data type (None for auto-detection, or torch.bfloat16 if supported)
dtype = None 

# Specify whether to use 4-bit quantization
load_in_4bit = True

# Load the Gemma model using Unsloth
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/gemma-2b-it-bnb-4bit", # Choose your Gemma model
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
    # token = "hf_...", # Optional: use if downloading from a private repo
)
```
*Note: You can replace `"unsloth/gemma-2b-it-bnb-4bit"` with other Unsloth-optimized Gemma models like `"unsloth/gemma-7b-it-bnb-4bit"` or their non-quantized versions.*

### 2. Prepare the Model for PEFT (LoRA)

Unsloth makes it easy to prepare the model for LoRA (Low-Rank Adaptation) fine-tuning.

```python
model = FastLanguageModel.get_peft_model(
    model,
    r = 16, # LoRA rank
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                      "gate_proj", "up_proj", "down_proj",], # Modules to apply LoRA to
    lora_alpha = 16,
    lora_dropout = 0, # Supports any value, but `0` is an optimized setting for Unsloth
    bias = "none",    # Supports any, but using `'none'` is an optimized setting for Unsloth
    use_gradient_checkpointing = True,
    random_state = 3407,
    use_rslora = False,  # Set to `True` to enable Rank-Stabilized LoRA (Unsloth supports this). `False` is used in this example.
    loftq_config = None, # Set to a LoftQ configuration object to enable LoftQ initialization (Unsloth supports this). `None` means LoftQ is not used in this example.
)
```

### 3. Load and Prepare Your Dataset

Load your dataset for fine-tuning. For this example, we'll use a placeholder dataset. Replace this with your actual training data. The dataset should typically have a 'text' column or be formatted in a way that SFTTrainer can understand (e.g., instruction-response pairs).

```python
# Example: Using a simple dataset
# Replace this with your actual dataset loading and preprocessing
dataset_name = "philschmid/guanaco-sharegpt-style" # Replace with your dataset
dataset = load_dataset(dataset_name, split = "train")

# You might need a formatting function if your dataset is not in a chat/instruction format
# For example, if your dataset has '''instruction''' and '''output''' fields:
# def formatting_prompts_func(examples):
#     texts = []
#     for instruction, output in zip(examples["instruction"], examples["output"]):
#         text = f"### Instruction:
{instruction}

### Response:
{output}"
#         texts.append(text)
#     return { "text" : texts, }
# dataset = dataset.map(formatting_prompts_func, batched = True,)
```
Make sure your tokenizer has a padding token.
```python
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
```

### 4. Define Training Arguments

Set up the training arguments using `TrainingArguments` from the Transformers library.

```python
training_args = TrainingArguments(
    per_device_train_batch_size = 2,
    gradient_accumulation_steps = 4,
    warmup_steps = 5,
    # max_steps = 60, # Adjust as needed
    num_train_epochs = 1, # Adjust as needed
    learning_rate = 2e-4,
    fp16 = not torch.cuda.is_bf16_supported(), # Use bf16 if available, else fp16
    bf16 = torch.cuda.is_bf16_supported(),
    logging_steps = 1,
    optim = "adamw_8bit", # More memory efficient optimizer
    weight_decay = 0.01,
    lr_scheduler_type = "linear",
    seed = 3407,
    output_dir = "outputs", # Directory to save checkpoints and logs
)
```

### 5. Initialize the SFTTrainer

Use `SFTTrainer` from the TRL library to perform supervised fine-tuning.

```python
trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "text",  # Or your specific column name
    max_seq_length = max_seq_length,
    dataset_num_proc = 2, # Number of processes for dataset preprocessing
    packing = False, # Can make training faster for many short sequences
    args = training_args,
)
```

### 6. Start Fine-Tuning

Now, you can start the fine-tuning process.

```python
print("Starting training...")
trainer_stats = trainer.train()
print("Training finished.")
print(trainer_stats)
```

### 7. Save the Model

After training, save your fine-tuned LoRA adapters.

```python
# Save the LoRA model
model.save_pretrained("gemma_unsloth_tuned_lora") 
tokenizer.save_pretrained("gemma_unsloth_tuned_lora")
print("LoRA adapters saved to 'gemma_unsloth_tuned_lora'")

# To save to Hugging Face Hub:
# model.push_to_hub("your_username/gemma_unsloth_tuned_lora", token = "YOUR_HF_TOKEN")
# tokenizer.push_to_hub("your_username/gemma_unsloth_tuned_lora", token = "YOUR_HF_TOKEN")
```

### 8. Inference with the Tuned Model (Optional)

Here's how you can load your tuned LoRA adapters for inference:

```python
from unsloth import FastLanguageModel

# Load the base model again
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/gemma-2b-it-bnb-4bit", # Must be the same base model
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
)

# Load the LoRA adapters to make them active for inference
model.load_adapter("gemma_unsloth_tuned_lora")
# The tokenizer loaded with the base model is used.

# Optional: To potentially improve inference speed (at the cost of higher VRAM and loss of adapter flexibility),
# you can merge the LoRA weights directly into the base model:
# model.merge_and_unload()
# After this, the model behaves like a standard fine-tuned model.

# Example inference (simple prompt)
# For basic text generation, a simple prompt is sufficient:
prompt = "What is the capital of France?" # Or use a proper instruction format if needed
inputs = tokenizer(prompt, return_tensors="pt").to("cuda") # Ensure model and inputs are on the same device

outputs = model.generate(**inputs, max_new_tokens=50) # For dicts like tokenizer output
decoded_output = tokenizer.decode(outputs[0], skip_special_tokens=True)

print(f"Simple Prompt: {prompt}")
print(f"Generated Response: {decoded_output}")
```
For instruction-tuned models like Gemma-IT, you'll get better results if you format your prompt according to its template. Unsloth's Gemma models use the ChatML format.

```python
# For instruction-tuned models like Gemma-IT, format your prompt according to its template.
# Unsloth's Gemma models, which are often instruction-tuned, typically use a ChatML-based format.
# The Hugging Face tokenizer can often apply this format automatically if a chat_template is configured.

messages = [
    {"role": "user", "content": "What is the capital of France?"}
]

# The tokenizer.apply_chat_template method formats the message list into a single string
# or a tokenized sequence, ready for the model.
# `add_generation_prompt=True` appends the system's turn start (e.g., <|start_header_id|>assistant<|end_header_id|>

),
# prompting the model for a response.
# Ensure the tokenizer used here is the one loaded with your Unsloth model, as it should have the correct template.
inputs = tokenizer.apply_chat_template(
    messages,
    tokenize=True, # Tokenize the output
    add_generation_prompt=True, # Add the prompt for the assistant's turn
    return_tensors="pt" # Return PyTorch tensors
).to("cuda") # Send to GPU

# Generate the response
# If `inputs` is just the input_ids tensor (as it should be here), use `model.generate(inputs, ...)`
outputs = model.generate(inputs, max_new_tokens=64, use_cache=True)

# Decode the generated tokens to text
# `skip_special_tokens=True` is often useful to get a clean response.
decoded_output = tokenizer.decode(outputs[0], skip_special_tokens=True) # Assuming batch size 1 from `messages`
print(f"Formatted Prompt Response (ChatML-style): {decoded_output}")

# To see the full output including any special tokens and the prompt structure:
# full_decoded_output = tokenizer.decode(outputs[0], skip_special_tokens=False)
# print(f"Full Response with Special Tokens: {full_decoded_output}")
# This can help verify the ChatML structure, e.g., you might see something like:
# "<|im_start|>user
What is the capital of France?<|im_end|>
<|im_start|>assistant
Paris is the capital of France.<|im_end|>"
# (The exact tokens depend on the specific tokenizer's chat template for Gemma)
```

## Conclusion

Unsloth significantly accelerates the fine-tuning process for Gemma models while reducing memory usage. By following these steps, you can efficiently adapt Gemma to your specific tasks and datasets. Remember to consult the official Unsloth documentation for the latest features, advanced configurations, and troubleshooting. Happy tuning!
