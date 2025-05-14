---
date_scraped: 2025-05-12
title: Troubleshoot Deploying An Agent
---

# Troubleshoot deploying an agent 

This document shows you how to resolve errors that you might encounter when
[deploying an agent](../deploy.md).

**Note:** To search and filter agent error logs, [use the Logs Explorer](/logging/docs/view/logs-viewer-interface), select `RESOURCE TYPE` to "Vertex AI Reasoning Engine" and select the corresponding `RESOURCE CONTAINER` value (i.e. the project number) and `REASONING ENGINE ID` value.

## Prebuilt Template errors

If you run into issues with the [LangchainAgent template](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.preview.reasoning_engines.LangchainAgent)
during deployment, it might be due to one of the issues in this section.

### Internal server errors

**Issue**:

You receive an error message similar to the following:

```python
InternalServerError: 500 Revision XXX is not ready and cannot serve traffic.

```

Unfortunately, this is a catch-all error for any issues with the container at
runtime, and the possible cause is one of many errors that might be happening.

**Possible cause(s)**:

- **Dirty state on `LangchainAgent`**. This might happen if [`.set_up()`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.preview.reasoning_engines.LangchainAgent#vertexai_preview_reasoning_engines_LangchainAgent_set_up)
 was called on a `LangchainAgent` before [deploying the agent](../deploy.md).
- **Inconsistent package versions**. This might happen if the packages installed
 in the development environment are different from the packages installed in the
 remote environment in Vertex AI Agent Engine.

**Recommended solution(s)**:

- **Dirty state on `LangchainAgent`**. Instantiate a fresh instance of the
 `LangchainAgent` or remove `agent.set_up()` from the code before
 [deploying the agent](../deploy.md).
- **Inconsistent package specs**. See the section on troubleshooting
 [serialization errors](#serialization-internal-server-errors).

## Serialization errors

In general, it is important to ensure that the "local" and "remote" environments
are in sync when deploying the agent. You can ensure this by specifying
[`requirements=`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.preview.reasoning_engines.ReasoningEngine#vertexai_preview_reasoning_engines_ReasoningEngine_create) when
[deploying the agent](../deploy.md).

If you run into issues with serialization (errors related to "pickle" or
"pickling" are synonymous with "serialization" errors), it might be due to one
of the issues that's described in this section.

### Pydantic version

**Issue**:

You receive an error message similar to the following:

```python
PicklingError: Can't pickle <cyfunction str_validator at 0x7ca030133d30>: it's
not the same object as pydantic.validators.str_validator

```

**Possible cause**:

This might happen if your `pydantic` package is earlier than version `2.6.4`. To
check which version you're using, run the following command in your terminal:

```python
pip show pydantic
```

**Recommended solution**:

Update your package by running the following command in the terminal:

```python
pip install pydantic --upgrade
```

Run the following command in your terminal to verify you're using version
`2.6.4` or later:

```python
pip show pydantic
```

If you're in a notebook instance (for example, a Jupyter or Colab or Workbench),
you might need to restart your runtime to use the updated packages.

### Cloudpickle version

**Issue**:

You receive an error message similar to the following:

```python
AttributeError: Can't get attribute '_class_setstate' on <module 'cloudpickle.cloudpickle'
from '/usr/local/lib/python3.10/site-packages/cloudpickle/cloudpickle.py'>

```

**Possible cause**:

This might happen if the version of your `cloudpickle` package is different in
your development environment and your deployment environment. To check which
version you're using in development, run the following command in your terminal:

```python
pip show cloudpickle
```

**Recommended solution**:

Deploy the same version of cloudpickle in both environments (i.e. your local
development environment and the remotely deployed agent) by specifying
`requirements=` when [deploying the agent](../deploy.md).

### Internal server errors

**Issue**:

You receive an error message similar to the following:

```python
InternalServerError: 500 Revision XXX is not ready and cannot serve traffic.

```

**Possible cause**:

This might happen if [`sys_version=`](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/vertexai.preview.reasoning_engines.ReasoningEngine#vertexai_preview_reasoning_engines_ReasoningEngine_create)
is different from the development environment when [deploying the agent](../deploy.md).

**Recommended solution**:

Consider removing `sys_version=` from the input arguments when [deploying the agent](../deploy.md). If you still run into issues, [file a bug report](https://github.com/googleapis/python-aiplatform/issues/new?template=bug_report.md).

## Cloud Storage bucket errors

If you're running into issues with the Cloud Storage staging bucket that's
used at deployment time to collect and upload your agent, it might be due
to one of the following issues:

### Permission errors

**Recommended solution**:

If you want to use a pre-existing bucket: make sure the principal that's
authenticated to use Vertex AI (either yourself or a service account)
has `Storage Admin` access to the bucket, and grant permissions to the
[service account](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/set-up#service-agent).

Alternatively, you can specify a new bucket when [deploying the agent](../deploy.md)
and the SDK will create the bucket with the necessary permissions.

If you still run into issues, [file a bug report](https://github.com/googleapis/python-aiplatform/issues/new?template=bug_report.md).

### Cloud Storage bucket subdirectory isn't created

**Issue**:

You receive an error message similar to the following:

```python
NotFound: 404 Can not copy from \"gs://[LOCATION]-*/agent_engine/agent_engine.pkl\" to \"gs://*/code.pkl\", check if the source object and target bucket exist.

```

(The 404 occurs when the system tries to copy into a folder that doesn't exist.)

**Possible cause**:

This is likely due to an issue with string interpolation in versions of
`google-cloud-aiplatform` earlier than version `1.49.0`. This is [fixed](https://github.com/googleapis/python-aiplatform/commit/3d22a18abdacc7cb53d4b5fef941fa1a34caec08)
in later versions. To check which version of `google-cloud-aiplatform` you're
using, run the following command in your terminal:

```python
pip show google-cloud-aiplatform
```

**Recommended solution**:

Update your package by running the following command in the terminal:

```python
pip install google-cloud-aiplatform --upgrade
```

Verify that you're using version `1.49.0` or later of `google-cloud-aiplatform`
by running the following command in your terminal:

```python
pip show google-cloud-aiplatform
```

If you're using a notebook instance (for example, Jupyter or Colab or Workbench),
you might need to restart your runtime before you can use the updated packages.

## Support resources

If your problem is still not resolved, refer to our [support guide](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/support) to get help.