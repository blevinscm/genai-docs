# Fine-tuning Gemma with Unsloth for Peak Performance

Gemma, Google's latest family of open-weights models, offers powerful capabilities for various NLP tasks. Unsloth, a project by Daniel Han, significantly accelerates the fine-tuning process for LoRA (Low-Rank Adaptation) adapters, making it faster and more memory-efficient, especially on consumer GPUs. This guide will walk you through fine-tuning a Gemma model using Unsloth.

## Why Unsloth for Gemma?

- **Speed:** Unsloth can speed up LoRA fine-tuning by up to 2-5x.
- **Memory Efficiency:** It reduces memory usage by up to 60%, allowing you to fine-tune larger models or use larger batch sizes on the same hardware.
- **Ease of Use:** Unsloth integrates smoothly with popular libraries like Hugging Face Transformers.
- **No Quality Degradation:** Achieves these speedups and memory savings without sacrificing the quality of the fine-tuned model.

## Prerequisites

1.  **Python Environment:** Ensure you have Python 3.8 or higher installed.
2.  **PyTorch:** Install PyTorch with CUDA support if you have an NVIDIA GPU. Visit [pytorch.org](https://pytorch.org/) for installation instructions.
3.  **Transformers & Datasets:** Install Hugging Face Transformers and Datasets libraries:
    ```bash
    pip install transformers datasets
    ```
4.  **Unsloth:** Install Unsloth. For the latest Gemma support, it's recommended to install from their GitHub repository:
    ```bash
    pip install "unsloth[gemma] @ git+https://github.com/unslothai/unsloth.git"
    ```
5.  **BitsAndBytes:** For 4-bit quantization:
    ```bash
    pip install bitsandbytes
    ```
6.  **TRL (Transformer Reinforcement Learning):** For the SFTTrainer:
    ```bash
    pip install trl
    ```
7.  **Accelerate:**
    ```bash
    pip install accelerate
    ```
8.  **Hugging Face Hub Login (Optional but Recommended):** If you plan to push your model to the Hugging Face Hub:
    ```bash
    huggingface-cli login
    ```

## Step-by-Step Guide to Fine-tuning Gemma with Unsloth

### Step 1: Import Libraries and Load Model

First, import the necessary libraries and load your Gemma model using Unsloth's `FastLanguageModel`. This example uses `unsloth/gemma-2b-it-bnb-4bit`, a 4-bit quantized version of Gemma 2B Instruct, optimized for faster loading and lower memory.

```python
from unsloth import FastLanguageModel
import torch

# Configuration
max_seq_length = 2048 # Choose any sequence length you want
dtype = None # None for auto detection. Float16 for Tesla T4, V100, Bfloat16 for Ampere+
load_in_4bit = True # Use 4bit quantization to reduce memory usage

# Load the Gemma model
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/gemma-2b-it-bnb-4bit", # Or any other Gemma model like "google/gemma-2b-it"
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
    # token = "hf_...", # T_O_K_E_N if using prompt Llama tokenizer or requiring access to private models
)
```

Unsloth automatically prepares the model for LoRA fine-tuning by patching the attention and MLP layers.

### Step 2: Add LoRA Adapters

Now, add LoRA adapters to the model. Unsloth handles the complexities of finding the right modules to adapt.

```python
model = FastLanguageModel.get_peft_model(
    model,
    r = 16, # Choose any number > 0. Suggested values are 8, 16, 32, 64, 128
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                      "gate_proj", "up_proj", "down_proj",], # Gemma MLP layers
    lora_alpha = 16, # LoRA scaling factor
    lora_dropout = 0, # Supports any, but = 0 is optimized
    bias = "none",    # Supports any, but = "none" is optimized
    use_gradient_checkpointing = True, # Dramatically reduces memory usage but slightly slower
    random_state = 3407,
    use_rslora = False,  # We support rank stabilized LoRA
    loftq_config = None, # And LoftQ
)
```

### Step 3: Prepare Your Dataset

You'll need a dataset for fine-tuning. The dataset should ideally be in a format that includes instructions, inputs (optional), and outputs. For this example, we'll use a simple conversational format.

Let's assume you have a dataset like the Alpaca dataset. You can load it using the `datasets` library.

```python
from datasets import load_dataset

# Example: Using a simple instruction-following dataset
# Make sure your dataset has columns like 'instruction', 'input', 'output' or a single text column.
# For Gemma instruct models, it's beneficial to format prompts similar to how the base model was trained.
# For Gemma-IT models, a common format is:
# <start_of_turn>user
# {instruction} <end_of_turn>
# <start_of_turn>model
# {response} <end_of_turn>

# This is a placeholder for your actual dataset loading and formatting
# For demonstration, we'll create a dummy dataset
alpaca_prompt_template = '''Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
{}

### Input:
{}

### Response:
{}'''

EOS_TOKEN = tokenizer.eos_token # Must add EOS_TOKEN

def formatting_prompts_func(examples):
    instructions = examples["instruction"]
    inputs       = examples["input"]
    outputs      = examples["output"]
    texts = []
    for instruction, input, output in zip(instructions, inputs, outputs):
        # Add EOS_TOKEN to the end of the text
        text = alpaca_prompt_template.format(instruction, input, output) + EOS_TOKEN
        texts.append(text)
    return { "text" : texts, }

# Load your dataset (replace with your actual dataset)
# For example, if using yahma/alpaca-cleaned:
# dataset = load_dataset("yahma/alpaca-cleaned", split = "train")
# Or create a dummy one for this example:
# Create dummy_data.json with content like:
# [
#   {"instruction": "Translate to French", "input": "Hello, how are you?", "output": "Bonjour, comment ça va?"},
#   {"instruction": "Summarize the following text", "input": "The quick brown fox jumps over the lazy dog.", "output": "A fast fox leaps over a sleepy canine."}
# ]
# For example:
# with open("dummy_data.json", "w") as f:
#     import json
#     json.dump([
#         {"instruction": "Translate to French", "input": "Hello, how are you?", "output": "Bonjour, comment ça va?"},
#         {"instruction": "Summarize the following text", "input": "The quick brown fox jumps over the lazy dog.", "output": "A fast fox leaps over a sleepy canine."}
#     ], f)
# dataset = load_dataset("json", data_files={"train": "dummy_data.json"})["train"]
# dataset = dataset.map(formatting_prompts_func, batched = True,)

# For this example, we'll stick to the Alpaca-style formatting for simplicity of demonstration
# and assume the 'text' column is ready.
# You should replace this with proper Gemma chat templating for best results.
dataset = load_dataset("yahma/alpaca-cleaned", split = "train[:1%]") # Using 1% of Alpaca for quick demo
dataset = dataset.map(formatting_prompts_func, batched = True,)

```

**Important Note on Data Preparation for Gemma Instruct Models:**
Gemma Instruct models are trained with specific turn templates. For optimal performance, format your training data accordingly:

```
<start_of_turn>user
{USER_PROMPT_HERE}<end_of_turn>
<start_of_turn>model
{MODEL_RESPONSE_HERE}<end_of_turn>
```
Ensure your `formatting_prompts_func` correctly applies this template and adds the `EOS_TOKEN` at the end of the model's response. Unsloth's `get_chat_template` can simplify this.

### Step 4: Configure and Run Training

Use the `SFTTrainer` from the TRL library to perform the fine-tuning.

```python
from trl import SFTTrainer
from transformers import TrainingArguments

trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset, # Your formatted dataset
    dataset_text_field = "text", # The column in your dataset that contains the formatted text
    max_seq_length = max_seq_length,
    dataset_num_proc = 2, # Number of CPU cores to use for dataset processing
    packing = False, # Can make training faster for many short sequences.
    args = TrainingArguments(
        per_device_train_batch_size = 2, # Adjust based on your GPU memory
        gradient_accumulation_steps = 4, # Effective batch size = batch_size * gradient_accumulation_steps
        warmup_steps = 5,
        # max_steps = 60, # Remove for full training run, or set num_train_epochs
        num_train_epochs = 1, # Or use max_steps
        learning_rate = 2e-4,
        fp16 = not torch.cuda.is_bf16_supported(), # Use fp16 if bf16 is not available
        bf16 = torch.cuda.is_bf16_supported(),
        logging_steps = 1,
        optim = "adamw_8bit", # 8-bit AdamW optimizer
        weight_decay = 0.01,
        lr_scheduler_type = "linear",
        seed = 3407,
        output_dir = "outputs", # Directory to save checkpoints and logs
        report_to = "tensorboard", # Or "wandb"
    ),
)

# Start training
trainer_stats = trainer.train()
```

### Step 5: Save and Test Your Model

After training, you can save your LoRA adapter.

```python
# Saving the LoRA adapter
model.save_pretrained("gemma_unsloth_finetuned_lora") # Saves LoRA adapter
# tokenizer.save_pretrained("gemma_unsloth_finetuned_lora") # Optionally save the tokenizer if modified

# To save to Hugging Face Hub:
# model.push_to_hub("your_username/gemma_unsloth_finetuned_lora", token = "YOUR_HF_TOKEN")
# tokenizer.push_to_hub("your_username/gemma_unsloth_finetuned_lora", token = "YOUR_HF_TOKEN")


# Inference with the fine-tuned model
# Load the base model again (if in a new session) and apply the adapter
from unsloth import FastLanguageModel

# Load base model
base_model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/gemma-2b-it-bnb-4bit", # Or the same base model you used for fine-tuning
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
)

# Apply the saved LoRA adapter
# If loading from local:
# FastLanguageModel.patch_peft_model(base_model, "gemma_unsloth_finetuned_lora")
# If loading from Hub (assuming you pushed it):
# FastLanguageModel.patch_peft_model(base_model, "your_username/gemma_unsloth_finetuned_lora")


# For direct inference after training (if model is still in memory):
# Note: The 'model' object from training is already the PEFT model with adapters.

# Formatting prompt for Gemma Instruct
prompt = '''<start_of_turn>user
What is the capital of France?<end_of_turn>
<start_of_turn>model
''' # This is how Gemma expects an instruction prompt

inputs = tokenizer(prompt, return_tensors = "pt").to("cuda") # Ensure model and inputs are on the same device

# Generate text
outputs = model.generate(**inputs, max_new_tokens = 64, use_cache = True)
response = tokenizer.batch_decode(outputs)[0]

print(response)

# To merge LoRA weights and save a full model (optional):
# merged_model = model.merge_and_unload()
# merged_model.save_pretrained("gemma_unsloth_finetuned_full")
# tokenizer.save_pretrained("gemma_unsloth_finetuned_full")
```

## Tips for Optimization

*   **Batch Size and Gradient Accumulation:** Experiment with `per_device_train_batch_size` and `gradient_accumulation_steps` to maximize GPU utilization without running out of memory.
*   **Learning Rate:** The optimal learning rate can vary. `2e-4` is a common starting point for LoRA.
*   **Sequence Length:** `max_seq_length` impacts memory usage significantly. Choose the smallest length that accommodates your data.
*   **Quantization:** Using `load_in_4bit = True` drastically reduces memory, making it possible to fine-tune larger models on consumer GPUs. Unsloth optimizes this process.
*   **Dataset Quality:** The quality and formatting of your fine-tuning dataset are paramount. Ensure it aligns with how Gemma expects inputs, especially for instruct models.
*   **Monitoring:** Use tools like TensorBoard or Weights & Biases (`report_to = "wandb"`) to monitor training progress and identify issues early.

## Conclusion

Unsloth provides a powerful and efficient way to fine-tune Gemma models. By leveraging its speed and memory optimizations, you can iterate faster and achieve high-quality results even with limited hardware resources. Remember to carefully prepare your dataset and experiment with hyperparameters to get the best performance for your specific task.

Happy fine-tuning!
