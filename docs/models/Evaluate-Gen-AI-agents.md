---
title: Evaluate-Gen-AI-agents",
 "tool_input": {
 "user_id": "user_y"
 }
 },
 {
 "tool_name": "set_temperature",
 "tool_input": {
 "location": "Living Room",
 "temperature": 23
 }
 },
 ]
]

predicted_trajectory = [
# example 1
[
 {
 "tool_name": "set_device_info",
 "tool_input": {
 "device_id": "device_3",
 "updates": {
 "status": "OFF"
 }
 }
 }
],
# example 2
[
 {
 "tool_name": "get_user_preferences",
 "tool_input": {
 "user_id": "user_z"
 }
 },
 {
 "tool_name": "set_temperature",
 "tool_input": {
 "location": "Living Room",
 "temperature": 23
 }
 },
 ]
]

eval_dataset = pd.DataFrame({
 "predicted_trajectory": predicted_trajectory,
 "reference_trajectory": reference_trajectory,
})

```

## Import your evaluation dataset

You can import your dataset in the following formats:

- JSONL or CSV file stored in Cloud Storage
- BigQuery table
- Pandas DataFrame

Gen AI evaluation service provides example public datasets to demonstrate how you can evaluate your agents. The following code shows how to import the public datasets from a Cloud Storage bucket:

```python
# dataset name to be imported
dataset = "on-device" # Alternatives: "customer-support", "content-creation"

# copy the tools and dataset file
!gcloud storage cp gs://cloud-ai-demo-datasets/agent-eval-datasets/{dataset}/tools.py .
!gcloud storage cp gs://cloud-ai-demo-datasets/agent-eval-datasets/{dataset}/eval_dataset.json .

# load the dataset examples
import json

eval_dataset = json.loads(open('eval_dataset.json').read())

# run the tools file
%run -i tools.py

```

where `dataset` is one of the following public datasets:

- `"on-device"` for an On-Device Home Assistant, which controls home devices.
 The agent helps with queries such as "Schedule the air conditioning in the
 bedroom so that it is on between 11pm and 8am, and off the rest of the time."
- `"customer-support"` for a Customer Support Agent. The agent helps with
 queries such as "Can you cancel any pending orders and escalate any open
 support tickets?"
- `"content-creation"` for a Marketing Content Creation Agent. The agent helps
 with queries such as "Reschedule campaign X to be a one-time campaign on
 social media site Y with a 50% reduced budget, only on December 25, 2024."

## Run agent evaluation

Run an evaluation for trajectory or final response evaluation:

For agent evaluation, you can mix response evaluation metrics and trajectory evaluation metrics like in the following code:

```python
single_tool_use_metric = TrajectorySingleToolUse(tool_name='tool_name')

eval_task = EvalTask(
 dataset=EVAL_DATASET,
 metrics=[
 "rouge_l_sum",
 "bleu",
 custom_trajectory_eval_metric, # custom computation-based metric
 "trajectory_exact_match",
 "trajectory_precision",
 single_tool_use_metric,
 response_follows_trajectory_metric # llm-based metric
 ],
)
eval_result = eval_task.evaluate(
 runnable=RUNNABLE,
)

```

### Metric customization

You can customize a large language model-based metric for trajectory evaluation using a templated interface or from scratch, for more details see the section on [model-based metrics](determine-eval.md). Here is a templated example:

```python
response_follows_trajectory_prompt_template = PointwiseMetricPromptTemplate(
 criteria={
 "Follows trajectory": (
 "Evaluate whether the agent's response logically follows from the "
 "sequence of actions it took. Consider these sub-points:\n"
 " - Does the response reflect the information gathered during the trajectory?\n"
 " - Is the response consistent with the goals and constraints of the task?\n"
 " - Are there any unexpected or illogical jumps in reasoning?\n"
 "Provide specific examples from the trajectory and response to support your evaluation."
 )
 },
 rating_rubric={
 "1": "Follows trajectory",
 "0": "Does not follow trajectory",
 },
 input_variables=["prompt", "predicted_trajectory"],
)

response_follows_trajectory_metric = PointwiseMetric(
 metric="response_follows_trajectory",
 metric_prompt_template=response_follows_trajectory_prompt_template,
)

```

You can also define a custom computation-based metric for trajectory evaluation or response evaluation as follows:

```python
def essential_tools_present(instance, required_tools = ["tool1", "tool2"]):
 trajectory = instance["predicted_trajectory"]
 tools_present = [tool_used['tool_name'] for tool_used in trajectory]
 if len(required_tools) == 0:
 return {"essential_tools_present": 1}
 score = 0
 for tool in required_tools:
 if tool in tools_present:
 score += 1
 return {
 "essential_tools_present": score/len(required_tools),
 }

custom_trajectory_eval_metric = CustomMetric(name="essential_tools_present", metric_function=essential_tools_present)

```

## View and interpret results

For trajectory evaluation or final response evaluation, the evaluation results are displayed as follows:

The evaluation results contain the following information:

### Final response metrics

### Instance-level results

| Column | Description |
| --- | --- |
| response | Final response generated by the agent. |
| latency\_in\_seconds | Time taken to generate the response. |
| failure | Indicates that a valid response was generated or not. |
| score | A score calculated for the response specified in the metric spec. |
| explanation | The explanation for the score specified in the metric spec. |

### Aggregate results

| Column | Description |
| --- | --- |
| mean | Average score for all instances. |
| standard deviation | Standard deviation for all the scores. |

### Trajectory metrics

### Instance-level results

| Column | Description |
| --- | --- |
| predicted\_trajectory | Sequence of tool calls followed by agent to reach the final response. |
| reference\_trajectory | Sequence of expected tool calls. |
| score | A score calculated for the predicted trajectory and reference trajectory specified in the metric spec. |
| latency\_in\_seconds | Time taken to generate the response. |
| failure | Indicates that a valid response was generated or not. |

### Aggregate results

| Column | Description |
| --- | --- |
| mean | Average score for all instances. |
| standard deviation | Standard deviation for all the scores. |

## What's next

Try the following agent evaluation notebooks:

- [Evaluate a Langraph agent](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluating_langgraph_agent.ipynb)
- [Evaluate a CrewAI agent](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/evaluation/evaluating_crewai_agent.ipynb)
- [Evaluate a Langchain agent with Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_langchain_agent_engine_prebuilt_template.ipynb)
- [Evaluate a LangGraph agent with Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_langgraph_agent_engine_customized_template.ipynb)
- [Evaluate a CrewAI agent with Agent Engine](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/agent-engine/evaluating_crewai_agent_engine_customized_template.ipynb)