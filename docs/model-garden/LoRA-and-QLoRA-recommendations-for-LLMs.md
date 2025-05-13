---
title: LoRA-and-QLoRA-recommendations-for-LLMsgoogle.com/vertex-ai/generative-ai/docs/model-garden/lora-qlora
date_scraped: 2025-05-12
---

# LoRA and QLoRA recommendations for LLMs 

This page gives you configuration recommendations for tuning large language
models (LLM) on Vertex AI by using
[Low-Rank Adaptation of Large Language Models (LoRA)](https://arxiv.org/abs/2106.09685)
and its more memory-efficient version,
[QLoRA](https://arxiv.org/abs/2305.14314).

## Tuning recommendations

The following table summarizes our recommendations for tuning LLMs by using LoRA
or QLoRA:

| Specification | Recommended | Details |
| --- | --- | --- |
| GPU memory efficiency | QLoRA | QLoRA has about 75% smaller peak GPU memory usage compared to LoRA. |
| Speed | LoRA | LoRA is about 66% faster than QLoRA in terms of tuning speed. |
| Cost efficiency | LoRA | While both methods are relatively inexpensive, LoRA is up to 40% less expensive than QLoRA. |
| Higher max sequence length | QLoRA | Higher max sequence length increases GPU memory consumption. QLoRA uses less GPU memory so it can support higher max sequence lengths. |
| Accuracy improvement | Same | Both methods offer similar accuracy improvements. |
| Higher batch size | QLoRA | QLoRA supports much higher batch sizes. For example, the following are batch size recommendations for tuning openLLaMA-7B on the following GPUs: - 1 x A100 40G: - LoRA: Batch size of 2 is recommended. - QLoRA: Batch size of 24 is recommended. - 1 x L4: - LoRA: Batch size of 1 fails with an out of memory error (OOM). - QLoRA: Batch size of 12 is recommended. - 1 x V100: - LoRA: Batch size of 1 fails with an out of memory error (OOM). - QLoRA: Batch size of 8 is recommended. |