---
title: Evaluate-a-judge-model
# eval_result contains human evaluation result from human_rated_dataset.
evaluate_autorater_result = evaluate_autorater(
 evaluate_autorater_input=eval_result.metrics_table,
 eval_metrics=[pairwise_fluency]
)

```

## What's next

- [Prompting for judge model customization](https://cloud.google.com/vertex-ai/generative-ai/docs/models/prompt-judge-model)
- [Configure your judge model](https://cloud.google.com/vertex-ai/generative-ai/docs/models/configure-judge-model)