---
date_scraped: 2025-05-12
title: Generative Ai Glossary
---

# Generative AI glossary 

- ##### **agent**

 - In the context of generative AI, an agent is software that autonomously plans and executes a series of actions in pursuit of a goal, potentially in novel situations. Agents can be used in various applications, such as natural language processing, machine learning, and robotics. For example, an LLM agent uses a language model to evaluate the environment and choose an action to help it achieve its goal. LLM agents can be used to generate text, translate languages, and answer questions.
- ##### **API endpoint**

 - API Endpoints is a service config aspect that specifies the network addresses, also known as service endpoints (for example, aiplatform.googleapis.com).
- ##### **Application Default Credentials (ADC)**

 - The Application Default Credentials (ADC) provide a simple way to get authorization credentials for use in calling Google APIs. They are best suited for cases when the call needs to have the same identity and authorization level for the application independent of the user. This is the recommended approach to authorize calls to Google Cloud APIs, particularly when you're building an application that is deployed to Google App Engine (GAE) or Compute Engine virtual machines. For more information, see [How Application Default Credentials works](https://cloud.google.com/docs/authentication/application-default-credentials).
- ##### **Approximate Nearest Neighbor (ANN)**

 - The Approximate Nearest Neighbor (ANN) service is a high scale, low latency solution, to find similar vectors (or more specifically, "embeddings") for a large corpus. For more information, see [How to use Vector Search for semantic matching](https://cloud.google.com/vertex-ai/docs/vector-search/overview#how_to_use_for_semantic_matching).
- ##### **artifact**

 - An artifact is a discrete entity or piece of data produced and consumed by a machine learning workflow. Examples of artifacts include datasets, models, input files, and training logs.
- ##### **Artifact Registry**

 - Artifact Registry is a universal artifact management service. It is the recommended service for managing containers and other artifacts on Google Cloud. For more information, see [Artifact Registry](https://cloud.google.com/artifact-registry/docs/overview).
- ##### **Artificial Intelligence (AI)**

 - Artificial intelligence (or AI) is the study and design of machines that appear to be "intelligent", meaning one which mimics human or intellectual functions such as mechanical movement, reasoning or problem solving. One of the most popular subfields of AI is machine learning, which uses a statistical and data-driven approach to create AI. However, some people use these two terms interchangeably.
- ##### **Augmented Reality (AR)**

 - Blending rendered digital content with real-world content, either via a display such as in a phone or as an overlay to the world seen through optics like glasses. The digital content should be tracked to the movement of the camera or glasses (depending on how the scene is rendered) so that it appears as if it is part of the real world.
- ##### **authentication**

 - The process of verifying the identity of a client (which might be a user or another process) for the purposes of gaining access to a secured system. A client that has proven its identity is said to be authenticated. For more information, see [Authentication methods at Google](https://cloud.google.com/docs/authentication).
- ##### **Automatic side-by-side (AutoSxS)**

 - Automatic side-by-side (AutoSxS) is a model-assisted evaluation tool that compares two large language models (LLMs) side by side. It can be used to evaluate the performance of either generative AI models in Vertex AI Model Registry or pre-generated predictions. AutoSxS uses an autorater to decide which model gives the better response to a prompt. AutoSxS is available on demand and evaluates language models with comparable performance to human raters.
- ##### **Automatic Speech Recognition (ASR,Speech to Text)**

 - Automatic transcription of spoken language (speech) to text.
- ##### **AutoML**

 - Machine learning algorithms that "learn to learn" through black-box optimization. For more information, see [ML Glossary](https://developers.google.com/machine-learning/glossary#automl).
- ##### **autorater**

 - An autorater is a language model that evaluates the quality of model responses given an original inference prompt. It's used in the AutoSxS pipeline to compare the predictions of two models and determine which model performed the best. For more information, see [The autorater](https://cloud.google.com/vertex-ai/generative-ai/docs/models/side-by-side-eval#autorater).
- ##### **baseline**

 - A model used as a reference point for comparing how well another model (typically, a more complex one) is performing. For example, a logistic regression model might serve as a good baseline for a deep model. For a particular problem, the baseline helps model developers quantify the minimal expected performance that a new model must achieve for the new model to be useful. For more information, see [Baseline and target datasets](https://cloud.google.com/vertex-ai/docs/model-monitoring/set-up-model-monitoring#baseline_and_target_datasets).
- ##### **batch**

 - The set of examples used in one training iteration. The batch size determines the number of examples in a batch.
- ##### **batch size**

 - The number of examples in a batch. For example, the batch size of SGD is 1, while the batch size of a mini-batch is usually between 10 and 1000. Batch size is usually fixed during training and inference; however, TensorFlow does permit dynamic batch sizes.
- ##### **batch prediction**

 - Batch prediction takes a group of prediction requests and outputs the results in one file. For more information, see [Overview of getting predictions on Vertex AI](https://cloud.google.com/vertex-ai/docs/predictions/overview#batch-prediction).
- ##### **bias**

 - 1. Stereotyping, prejudice or favoritism towards some things, people, or groups over others. These biases can affect collection and interpretation of data, the design of a system, and how users interact with a system. 2. Systematic error introduced by a sampling or reporting procedure.
- ##### **bidrectional**

 - A term used to describe a system that evaluates the text that both precedes and follows a target section of text. In contrast, a unidirectional system only evaluates the text that precedes a target section of text.
- ##### **Bidirectional Encoder Representations from Transformers (BERT)**

 - BERT is a method of pre-training language representations, meaning that we train a general-purpose "language understanding" model on a large text corpus (like Wikipedia), and then use that model for downstream NLP tasks that we care about (like question answering). BERT outperforms previous methods because it is the first unsupervised, deeply bidirectional system for pre-training NLP.
- ##### **Bilingual Evaluation Understudy (BLEU)**

 - A popular measure for evaluating the quality of a machine-translation algorithm by comparing its output to that of one or more human translations.
- ##### **boosting**

 - In model training: Boosting can refer to data augmentation techniques used to increase the size and diversity of training datasets. This is done by transforming existing examples to create additional, varied examples, which can improve model performance, especially when the original dataset is limited.
- ##### **bounding box**

 - A bounding box for an object in the video frame can be specified in either of two ways (i) Using 2 vertices consisting of a set of x,y coordinates if they are diagonally opposite points of the rectangle. For example: x\_relative\_min, y\_relative\_min,,,x\_relative\_max,y\_relative\_max,, (ii) Use all 4 vertices. For more information, see [Prepare video data](https://cloud.google.com/vertex-ai/docs/video-data/object-tracking/prepare-data#csv).
- ##### **bucket**

 - Top-level folder for Cloud Storage. Bucket names must be unique across all users of Cloud Storage. Buckets contain files. For more information, see [Product overview of Cloud Storage](https://cloud.google.com/storage/docs/introduction).
- ##### **Chain-of-Thought**

 - In generative AI, Chain-of-Thought (CoT) is a prompting technique that encourages the large language model (LLM) to explicitly detail its reasoning process before arriving at a conclusion. This involves prompting the model to show the intermediate steps it takes to solve a problem, rather than just providing the final answer. This method can significantly improve the LLM's performance on complex reasoning tasks.
- ##### **chat**

 - The contents of a back-and-forth dialogue with an ML system, typically a large language model. The previous interaction in a chat (what you typed and how the large language model responded) becomes the context for subsequent parts of the chat. A chatbot is an application of a large language model.
- ##### **checkpoint**

 - Data that captures the state of a model's parameters either during training or after training is completed. For example, during training, you can: 1. Stop training, perhaps intentionally or perhaps as the result of certain errors. 2. Capture the checkpoint. 3. Later, reload the checkpoint, possibly on different hardware. 4. Restart training. Within Gemini, a checkpoint refers to a specific version of a Gemini model trained on a specific dataset.
- ##### **classification model**

 - A model whose prediction is a class. For example, the following are all classification models: A model that predicts an input sentence's language (French? Spanish? Italian?). A model that predicts tree species (Maple? Oak? Baobab?). A model that predicts the positive or negative class for a particular medical condition.
- ##### **classification metrics**

 - Supported classification metrics in the Vertex AI SDK for Python are confusion matrix and ROC curve.
- ##### **Cloud TPU**

 - A specialized hardware accelerator designed to speed up machine learning workloads on Google Cloud.
- ##### **clustering**

 - In the context of generative AI, clustering is an unsupervised machine learning technique used to group similar data points together based on their characteristics. This is achieved by defining a similarity measure (or metric) to compare data points, and grouping those with high similarity into the same cluster. In generative AI applications, this might involve clustering embeddings (numerical representations of text, images, or other data) to perform tasks like search, classification, or outlier detection. For example, customer segmentation can be achieved by clustering customer data to identify groups with similar behaviors or characteristics. For more information, see [What is clustering?](https://developers.google.com/machine-learning/clustering/overview).
- ##### **container image**

 - A container image is a package that includes the component's executable code and a definition of the environment that the code runs in. For more information, see [Custom training overview](https://cloud.google.com/vertex-ai/docs/training/overview).
- ##### **context**

 - A context is used to group artifacts and executions together under a single, queryable, and typed category. Contexts can be used to represent sets of metadata. An example of a Context would be a run of a machine learning pipeline.
- ##### **context cache**

 - A context cache in Vertex AI is a large amount of data that can be used in multiple requests to a Gemini model. The cached content is stored in the region where the request to create the cache is made. It can be any MIME type supported by Gemini multimodal models, such as text, audio, or video. For more information, see [Context caching overview](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview).
- ##### **context window**

 - The number of tokens a model can process in a given prompt. The larger the context window, the more information the model can use to provide coherent and consistent responses to the prompt.
- ##### **Customer-managed encryption keys (cmek)**

 - Customer-managed encryption keys (CMEK) are integrations that allow customers to encrypt data in existing Google services using a key they manage in Cloud KMS (also known as Storky). The key in Cloud KMS is the key encryption key protecting their data. For more information, see [Customer-managed encryption keys (CMEK)](https://cloud.google.com/vertex-ai/docs/general/cmek).
- ##### **data analysis**

 - Obtaining an understanding of data by considering samples, measurement, and visualization. Data analysis can be particularly useful when a dataset is first received, before one builds the first model. It is also crucial in understanding experiments and debugging problems with the system.
- ##### **data augmentation**

 - Artificially boosting the range and number of training examples by transforming existing examples to create additional examples. For example, suppose images are one of your features, but your dataset doesn't contain enough image examples for the model to learn useful associations. Ideally, you'd add enough labeled images to your dataset to enable your model to train properly. If that's not possible, data augmentation can rotate, stretch, and reflect each image to produce many variants of the original picture, possibly yielding enough labeled data to enable excellent training.
- ##### **DataFrame**

 - A popular pandas data type for representing datasets in memory. A DataFrame is analogous to a table or a spreadsheet. Each column of a DataFrame has a name (a header), and each row is identified by a unique number. Each column in a DataFrame is structured like a 2D array, except that each column can be assigned its own data type.
- ##### **data indexing**

 - In the context of generative AI, data indexing is the process of structuring and organizing a knowledge base to optimize search and retrieval. This involves creating an index, often called a corpus, which allows for efficient searching of the data. The process is separate from corpus creation, and the indexed data can be used to enrich the context of large language models (LLMs), reducing hallucinations and improving the accuracy of responses. For example, in a website context, data indexing might involve adding metadata like datePublished and dateModified to improve search functionality. Different methods exist for indexing data, including using vector search for similarity search in applications like retrieving relevant information for LLMs at query time. For more information, see [RAG Engine overview](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview) .
- ##### **data ingestion**

 - Data ingestion is the process of extracting data from various sources and integrating it into a central location for further processing and analysis. In the context of generative AI, data ingestion involves extracting information from different data sources, such as clinical forms, patient records, or unstructured text, to train and fine-tune generative AI models. The ingested data is typically processed and transformed to ensure its quality and consistency before it is used to train the generative AI models. This process may involve data cleaning, feature engineering, and data augmentation techniques to improve the model's performance and generalization capabilities. For more information, see [Use generative AI for utilization management](https://cloud.google.com/architecture/use-generative-ai-utilization-management).
- ##### **data parallelism**

 - A way of scaling training or inference that replicates an entire model onto multiple devices and then passes a subset of the input data to each device. Data parallelism can enable training and inference on very large batch sizes; however, data parallelism requires that the model be small enough to fit on all devices. Data parallelism typically speeds training and inference.
- ##### **dataset (data set)**

 - A dataset is broadly defined as a collection of structured or unstructured data records. A collection of raw data, commonly (but not exclusively) organized in one of the following formats: a spreadsheet a file in CSV (comma-separated values) format. For more information, see [Create a dataset](https://cloud.google.com/vertex-ai/docs/samples/aiplatform-create-dataset-sample).
- ##### **data transformation**

 - In the context of Retrieval Augmented Generation (RAG), data transformation refers to the conversion of data into a format suitable for indexing and processing by an LLM. This often involves splitting data into smaller chunks to make it manageable for embedding and indexing. Other transformations might include cleaning and validation steps to ensure data quality. For more information, see [RAG Engine overview](https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview).
- ##### **decoder**

 - In general, any ML system that converts from a processed, dense, or internal representation to a more raw, sparse, or external representation. Decoders are often a component of a larger model, where they are frequently paired with an encoder. In sequence-to-sequence tasks, a decoder starts with the internal state generated by the encoder to predict the next sequence.
- ##### **deep neural network (DNN)**

 - A neural network with multiple hidden layers, typically programmed through deep learning techniques.
- ##### **depth**

 - The sum of the following in a neural network: 1. the number of hidden layers 2. the number of output layers, which is typically one 3. the number of any embedding layers. For example, a neural network with five hidden layers and one output layer has a depth of 6. Notice that the input layer doesn't influence depth.
- ##### **DevOps**

 - DevOps is a suite of Google Cloud Platform products, for example, Artifact Registry, Cloud Deploy.
- ##### **early stopping**

 - A method for regularization that involves ending training before training loss finishes decreasing. In early stopping, you intentionally stop training the model when the loss on a validation dataset starts to increase; that is, when generalization performance worsens.
- ##### **embedding**

 - Numerical representations of words or pieces of text. These numbers capture the semantic meaning and context of the text. Similar or related words or text tend to have similar embeddings, which means they are closer together in the high-dimensional vector space.
- ##### **embedding space (latent space)**

 - In Generative AI, embedding space refers to a numerical representation of text, images, or videos that captures relationships between inputs. Machine learning models, particularly generative AI models, are adept at creating these embeddings by identifying patterns within large datasets. Applications can utilize embeddings to process and generate language, recognizing complex meanings and semantic relationships specific to the content.
- ##### **embedding vector**

 - A dense, often low-dimensional, vector representation of an item such that, if two items are semantically similar, their respective embeddings are located near each other in the embedding vector space.
- ##### **encoder**

 - In general, any ML system that converts from a raw, sparse, or external representation into a more processed, denser, or more internal representation. Encoders are often a component of a larger model, where they are frequently paired with a decoder. Some transformers pair encoders with decoders, though other transformers use only the encoder or only the decoder. Some systems use the encoder's output as the input to a classification or regression network. In sequence-to-sequence tasks, an encoder takes an input sequence and returns an internal state (a vector). Then, the decoder uses that internal state to predict the next sequence.
- ##### **ensemble**

 - A collection of models trained independently whose predictions are averaged or aggregated. In many cases, an ensemble produces better predictions than a single model. For example, a random forest is an ensemble built from multiple decision trees. Note that not all decision forests are ensembles.
- ##### **environment**

 - In reinforcement learning, the world that contains the agent and allows the agent to observe that world's state. For example, the represented world can be a game like chess, or a physical world like a maze. When the agent applies an action to the environment, then the environment transitions between states.
- ##### **evaluation (eval)**

 - An eval, short for "evaluation", is a type of experiment in which logged or synthetic queries are sent through two Search stacks--an experimental stack that includes your change and a base stack without your change. Evals produce diffs and metrics that let you evaluate the impact, quality, and other effects of your change on search results and other parts of the Google user experience. Evals are used during tuning, or iterations, on your change. They are also used as part of launching a change to live user traffic.
- ##### **execution**

 - An execution is a record of an individual machine learning workflow step, typically annotated with its runtime parameters. Examples of executions include data ingestion, data validation, model training, model evaluation, and model deployment.
- ##### **F1 Score**

 - The F1 score is a metric used to evaluate the accuracy of a model's output. It's particularly useful for assessing the performance of models on tasks where both precision and recall are important, such as information extraction. For generative AI models, the F1 score can be used to compare the model's predictions with ground truth data to determine the model's accuracy. However, for generative tasks like summarization and text generation, other metrics like Rough-L score might be more appropriate.
- ##### **feature**

 - In machine learning (ML), a feature is a characteristic or attribute of an instance or entity that's used as an input to train an ML model or to make predictions.
- ##### **feature extraction**

 - In the context of generative AI, feature extraction refers to the process of identifying and selecting relevant features from input data to be used in model training. These features are then used to generate new data that resembles the original input. For example, in image generation, feature extraction might involve identifying edges, textures, and colors. In natural language processing, it could involve extracting keywords, phrases, and grammatical structures. The extracted features are then used by the generative model to create new content.
- ##### **feature serving**

 - Feature serving is the process of exporting or fetching feature values for training or inference. In Vertex AI, there are two types of feature serving—online serving and offline serving. Online serving retrieves the latest feature values of a subset of the feature data source for online predictions. Offline or batch serving exports high volumes of feature data—including historical data—for offline processing, such as ML model training.
- ##### **feature view**

 - A feature view is a logical collection of features materialized from a BigQuery data source to an online store instance. A feature view stores and periodically refreshes the customer's feature data, which is refreshed periodically from the BigQuery source. A feature view is associated with the feature data storage either directly or through associations to feature registry resources.
- ##### **few-shot prompt (few-shot)**

 - In generative AI, "few-shot" refers to a type of prompt that includes a small number of examples to guide the model's response. These examples help the model understand the desired output format, phrasing, scope, or general patterning of the response. Few-shot prompts are often used to regulate the output of language models, ensuring that they generate responses that are accurate, high-quality, and consistent with the user's expectations. By providing the model with a few relevant examples, the user can influence the model's behavior and obtain more satisfactory results. For more information, see [Include few-shot examples](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/few-shot-examples).
- ##### **foundation model (FM)**

 - Models trained on broad data such that they can be adapted (for example, fine-tuned) to a wide range of downstream tasks.
- ##### **Foundation Model Operations (FMOPs)**

 - FMOps expands upon the capabilities of MLOps and focuses on the efficient productionization of pre-trained (trained from scratch) or customized (fine-tuned) FMs.
- ##### **Gemini**

 - Gemini is a set of Google's large sequence-based multimodal models. This means that they can accept inputs and produce outputs in more than one medium at once, including text, audio, and visual media. They are designed to integrate with agents capable of performing various tasks. For more information, see [Google models](learn/models.md).
- ##### **generalization**

 - A model's ability to make correct predictions on new, previously unseen data. A model that can generalize is the opposite of a model that is overfitting.
- ##### **generation**

 - In the context of generative AI, "generation" refers to the process of creating new data or content from existing data or information. Generative AI models are trained on large datasets and can learn patterns and relationships within the data. They can then use this knowledge to generate new and unique content that is similar to the training data but not an exact replica. For more information, see [When to use generative AI or traditional AI](https://cloud.google.com/docs/ai-ml/generative-ai/generative-ai-or-traditional-ai).
- ##### **generative model**

 - A type of machine learning model that can create novel outputs based on its training data. At its simplest, the model generates new data that looks like a certain set of categories that it was trained on. Usually associated with large language models, but other types of models can be generative as well.
- ##### **Google Embedded Modem System (GEMS)**

 - GEMS is an embedded software framework targeting modems, and an accompanying set of development workflows and infrastructure. The core vision of GEMS is to provide high quality modem system code with high reusability across many Google devices that contain modems. To achieve this broad vision, GEMS provides a comprehensive environment for developers, comprised of the major building blocks depicted below.
- ##### **gradient**

 - The vector of partial derivatives with respect to all of the independent variables. In machine learning, the gradient is the vector of partial derivatives of the model function. The gradient points in the direction of steepest ascent.
- ##### **graph**

 - In the context of generative AI, a graph refers to a structured representation of information that organizes and connects data as a network of nodes and edges. These graphs are often used to represent knowledge and relationships between entities, making them particularly useful for generative AI systems that require a deep understanding of the context and relationships within data. GenAI systems that leverage knowledge graphs can utilize them to enhance the performance of retrieval models. By incorporating knowledge graphs into the system, generative AI can access context-rich data and traverse the graph to retrieve relevant subgraphs based on user queries. This lets the system provide more accurate and informative responses by generating contextually relevant content.
- ##### **ground truth (GT)**

 - Ground truth is a term used in various fields to refer to the absolute truth of some decision or measurement problem, as opposed to some system's estimate. In machine learning, the term "ground truth" refers to the training set for supervised learning techniques.
- ##### **hallucination**

 - A hallucination in generative AI is a confident response by an AI that cannot be grounded by its training data. It may be factually incorrect. In the context of text generation, it's plausible-sounding random falsehoods within its generated text content.
- ##### **heuristic**

 - A simple and quickly implemented solution to a problem. For example, "With a heuristic, we achieved 86% accuracy. When we switched to a deep neural network, accuracy went up to 98%".
- ##### **hidden layer**

 - A layer in a neural network between the input layer (the features) and the output layer (the prediction). Each hidden layer consists of one or more neurons. A deep neural network contains more than one hidden layer.
- ##### **histogram**

 - A graphical display of the variation in a set of data using bars. A histogram visualizes patterns that are difficult to detect in a simple table of numbers.
- ##### **hyperparameter**

 - A hyperparameter refers to a variable that governs the training process of a machine learning model. These variables can include learning rates, momentum values in the optimizer, and the number of units in the last hidden layer of a model. Hyperparameter tuning in Vertex AI involves running multiple trials of a training application with different values for the chosen hyperparameters, set within specified limits. The goal is to optimize the hyperparameter settings to maximize the model's predictive accuracy. For more information, see [Hyperparameter tuning overview](https://cloud.google.com/vertex-ai/docs/training/hyperparameter-tuning-overview).
- ##### **Imagen**

 - Imagen is a text-to-image generative AI service available through the Vertex AI platform. It allows users to generate novel images, edit images, fine-tune style or subject models, caption images, or get answers to questions about image content. For more information, see [Imagen on Vertex AI overview](image/Imagen-on-Vertex-AI.md).
- ##### **image recognition**

 - Image recognition is the process of classifying objects, patterns, or concepts in an image. It is also known as image classification. Image recognition is a subfield of machine learning and computer vision.
- ##### **index**

 - A collection of vectors deployed together for similarity search. Vectors can be added to an index or removed from an index. Similarity search queries are issued to a specific index and will search over the vectors in that index.
- ##### **inference**

 - In the context of the Vertex AI platform, inference refers to the process of running data points through a machine learning model to calculate an output, such as a single numerical score. This process is also known as "operationalizing a machine learning model" or "putting a machine learning model into production." Inference is an important step in the machine learning workflow, since it enables models to be used to make predictions on new data. In Vertex AI, inference can be performed in various ways, including batch prediction and online prediction. Batch prediction involves running a group of prediction requests and outputting the results in one file, while online prediction allows for real-time predictions on individual data points.
- ##### **information retrieval (IR)**

 - Information retrieval (IR) is a key component of Vertex AI Search. It is the process of finding and retrieving relevant information from a large collection of data. In the context of Vertex AI, IR is used to retrieve documents from a corpus based on a user's query. Vertex AI offers a suite of APIs to help you build your own Retrieval Augmented Generation (RAG) applications or to build your own Search engine. For more information, see [Use Vertex AI Search as a retrieval backend using RAG Engine](use-vertexai-search.md).
- ##### **learning rate (step size)**

 - Learning rate is a hyperparameter used to tune the optimization process of a machine learning model. It determines the step size at which the model updates its weights during training. A higher learning rate can lead to faster convergence but may result in instability or overfitting. Conversely, a lower learning rate may lead to slower convergence but can help prevent overfitting, no sources. For more information, see [Overview of hyperparameter tuning](https://cloud.google.com/vertex-ai/docs/training/hyperparameter-tuning-overview).
- ##### **loss (cost)**

 - During the training of a supervised model, a measure of how far a model's prediction is from its label. A loss function calculates the loss.
- ##### **managed dataset**

 - A dataset object created in and hosted by Vertex AI.
- ##### **model**

 - Any model pre-trained or not. In general, any mathematical construct that processes input data and returns output. Phrased differently, a model is the set of parameters and structure needed for a system to make predictions.
- ##### **model distillation (knowledge distillation, teacher-student models)**

 - Model distillation is a technique that allows a smaller student model to learn from a larger teacher model. The student model is trained to mimic the output of the teacher model, and it can then be used to generate new data or make predictions. Model distillation is often used to make large models more efficient or to make them more accessible to devices with limited resources. It can also be used to improve the generalization of models by reducing overfitting.
- ##### **Model Monitoring**

 - Model Monitoring is a service for tracking the quality and behavior of deployed models. For more information, see [Introduction to Vertex AI Model Monitoring](https://cloud.google.com/vertex-ai/docs/model-monitoring/overview).
- ##### **model resource name**

 - The resource name for a [`model`](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/projects.locations.models) is as follows: `projects/<PROJECT_ID>/locations/<LOCATION_ID>/models/<MODEL_ID>`. You can find the model's ID in the Cloud console on the Model Registry page.
- ##### **Network File System (NFS)**

 - A client/server system that lets users access files across a network and treat them as if they resided in a local file directory. For more information, see [Mount an NFS share for custom training](https://cloud.google.com/vertex-ai/docs/training/train-nfs-share).
- ##### **one-hot encoding**

 - One-hot encoding represents each category as a vector of N elements (where N is the number of categories) with exactly one element having a value of 1.0 and all remaining elements having a value of 0.0. For more information, see [One-hot encoding](https://developers.google.com/machine-learning/crash-course/categorical-data/one-hot-encoding#one-hot_encoding).
- ##### **one-shot prompt**

 - A prompt that contains one example demonstrating how the large language model should respond. For more information, see [one-shot prompt](https://ai.google.dev/gemini-api/docs/models/generative-models#one-shot-prompts).
- ##### **parameter**

 - Parameters are keyed input values that configure a run, regulate the behavior of the run, and affect the results of the run. Examples include learning rate, dropout rate, and number of training steps.
- ##### **perplexity**

 - Perplexity is a metric used to evaluate the performance of language models. It measures how likely the model is to generate a given text sequence based on the distribution of the text it was trained on. Perplexity is a commonly used metric for evaluating language models and is often used to compare the performance of different models or to track the progress of a model during training.
- ##### **pipeline**

 - ML pipelines are portable and scalable ML workflows that are based on containers. For more information, see [Introduction to Vertex AI Pipelines](https://cloud.google.com/vertex-ai/docs/pipelines/introduction).
- ##### **pipeline job**

 - A pipeline job or a pipeline run corresponds to the PipelineJob resource in the Vertex AI API. It's an execution instance of your ML pipeline definition, which is defined as a set of ML tasks interconnected by input-output dependencies.
- ##### **pipeline run**

 - One or more Vertex PipelineJobs can be associated with an experiment where each PipelineJob is represented as a single run. In this context, the parameters of the run are inferred by the parameters of the PipelineJob. The metrics are inferred from the system.Metric artifacts produced by that PipelineJob. The artifacts of the run are inferred from artifacts produced by that PipelineJob.
- ##### **private services access**

 - Private services access is a private connection between your Virtual Private Cloud (VPC) network and networks owned by Google or third-party service providers. It allows virtual machine (VM) instances in your VPC network to communicate with these services using internal IP addresses, avoiding exposure to the public internet. For more information, see [Private services access](https://cloud.google.com/vpc/docs/private-services-access).
- ##### **prompt**

 - A prompt is a natural language request submitted to a language model to receive a response back. Prompts can contain questions, instructions, contextual information, few-shot examples, and partial input for the model to complete or continue. After the model receives a prompt, depending on the type of model being used, it can generate text, embeddings, code, images, videos, music, and more. For more information, see [Overview of prompting strategies](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies).
- ##### **prompt engineering (prompt design)**

 - Prompt engineering in generative AI is the process of crafting effective prompts to elicit desired outputs from large language models (LLMs). It's an iterative, test-driven process focused on refining inputs to achieve specific outcomes. This involves considering both the content and structure of the prompt to ensure accurate and high-quality responses. Effective prompt engineering is crucial for complex tasks, even though simpler tasks may not require it. The goal is to rapidly prototype LLM-based applications. For more information, see [Introduction to prompt engineering](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design).
- ##### **prompt tuning**

 - Prompt tuning is a parameter-efficient fine-tuning method used to improve a generative AI model's performance on a specific task. It involves learning a "prefix" that is prepended to the actual prompt, sometimes at every layer. This approach is considered cheaper and faster than other tuning methods, often yielding good results. Prompt tuning is particularly effective when you have a specific task and want the model to perform it in a certain way. It's also sometimes referred to as prompt learning or parameter-efficient (fine) tuning. For more information, see [Introduction to prompt engineering](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design).
- ##### **Provisioned Throughput (PT)**

 - Provisioned Throughput (PT) is a premium service for Vertex AI's generative AI models that offers a guaranteed experience through capacity assurance and predictable pricing. Unlike the pay-as-you-go (on-demand) option, PT lets customers purchase a dedicated quota, ensuring their requests don't compete with others for model capacity. PT is a fixed-cost monthly or weekly subscription that reserves throughput for specified models and locations For more information, see [Provisioned Throughput overview](https://cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput).
- ##### **quantization**

 - Quantization is a model optimization technique used to reduce the precision of the numbers used to represent a model's parameters. This can lead to smaller models, lower power consumption, and reduced inference latency.
- ##### **Random Forest**

 - Random Forest is a machine learning algorithm used for both classification and regression. It's not directly a generative AI model itself, but it's a component that can be used within a larger generative AI system. A random forest consists of multiple decision trees, and its prediction is an aggregation of the predictions from these individual trees. For example, in a classification task, each tree "votes" for a class, and the final prediction is the class with the most votes For more information, see [Decision forest](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies).
- ##### **Ray cluster on Vertex AI**

 - A Ray cluster on Vertex AI is a managed cluster of compute nodes that can be used to run distributed machine learning (ML) and Python applications. It provides the infrastructure to perform distributed computing and parallel processing for your ML workflow. Ray clusters are built into Vertex AI to ensure capacity availability for critical ML workloads or during peak seasons. Unlike custom jobs, where the training service releases the resource after job completion, Ray clusters remain available until deleted. For more information, see [Ray on Vertex AI overview](https://cloud.google.com/vertex-ai/docs/open-source/ray-on-vertex-ai/overview).
- ##### **Ray on Vertex AI (RoV)**

 - Ray on Vertex AI is designed so you can use the same open source Ray code to write programs and develop applications on Vertex AI with minimal changes. For more information, see [Ray on Vertex AI overview](https://cloud.google.com/vertex-ai/docs/open-source/ray-on-vertex-ai/overview).
- ##### **Ray on Vertex AI SDK for Python**

 - Ray on Vertex AI SDK for Python is a version of the Vertex AI SDK for Python that includes the functionality of the Ray Client, Ray BigQuery connector, Ray cluster management on Vertex AI, and predictions on Vertex AI. For more information, see [Introduction to the Vertex AI SDK for Python](https://cloud.google.com/vertex-ai/docs/python-sdk/use-vertex-ai-python-sdk-ref).
- ##### **recall**

 - The percentage of true nearest neighbors returned by the index. For example, if a nearest neighbor query for 20 nearest neighbors returned 19 of the "ground truth" nearest neighbors, the recall is 19/20x100 = 95%.
- ##### **recommendation system**

 - A recommendation system is a machine learning-based system that helps users find compelling content in a large corpus. It generates a smaller subset of candidates from a potentially huge corpus, scores and ranks the candidates, and re-ranks the final ranking to take into account additional constraints. For more information, see [Recommendation systems overview](https://developers.google.com/machine-learning/recommendation/overview/types).
- ##### **regularization**

 - Regularization is a technique used to prevent overfitting in machine learning models. Overfitting occurs when a model learns the training data too well, resulting in poor performance on unseen data. One specific type of regularization mentioned is early stopping, where training is halted before the loss on a validation dataset begins to increase, indicating a decline in generalization performance. For more information, see [Overfitting: L2 regularization](https://developers.google.com/machine-learning/crash-course/overfitting/regularization).
- ##### **service account**

 - In Google Cloud, a service account is a special kind of account used by an application or a virtual machine (VM) instance, not a person. Applications use service accounts to make authorized API calls.
- ##### **service agent**

 - A service agent refers to a Google-managed service account. It's utilized when a service requires access to resources created by a different service. For instance, when Dataflow or Dataproc services need to create instances during runtime or when a Cloud Function wants to use the Key Management Service (KMS) to protect the Cloud Function. Service agents are created automatically by Google Cloud when a service requires them. They are typically used to manage access to resources and perform various tasks on behalf of the service. For more information, see [Service agents](access-control_1.md).
- ##### **summary metrics**

 - Summary metrics are a single value for each metric key in an experiment run. For example, the test accuracy of an experiment is the accuracy calculated against a test dataset at the end of training that can be captured as a single value summary metric.
- ##### **TensorBoard**

 - TensorBoard is a suite of web applications for visualizing and understanding TensorFlow runs and models. For more information, see [TensorBoard](https://www.tensorflow.org/tensorboard/get_started).
- ##### **TensorBoard instance**

 - A TensorBoard instance is a regionalized resource that stores Vertex AI TensorBoard Experiments associated with a Project. You can create multiple TensorBoard instances in a project if, for example, you want multiple CMEK enabled instances. This is the same as the TensorBoard resource in the API.
- ##### **TensorBoard Resource name**

 - A TensorBoard Resource name is used to fully identify a Vertex AI TensorBoard instance. The format is as follows: projects/PROJECT\_ID\_OR\_NUMBER/locations/REGION/tensorboards/TENSORBOARD\_INSTANCE\_ID.
- ##### **time offset**

 - Time offset is relative to the beginning of a video.
- ##### **time series metrics**

 - Time series metrics are longitudinal metric values where each value represents a step in the training routine portion of a run. Time series metrics are stored in Vertex AI TensorBoard. Vertex AI Experiments stores a reference to the Vertex TensorBoard resource.
- ##### **token**

 - A token in a language model is the atomic unit that the model is training and making predictions on, namely words, morphemes, and characters. In domains outside of language models, tokens can represent other kinds of atomic units. For example, in computer vision, a token might be a subset of an image. For more information, see [List and count tokens](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/list-token).
- ##### **trajectory**

 - A "trajectory" refers to a sequence of steps or actions taken by an agent or model. It's often used in the evaluation of generative models, where the model's ability to generate text, code, or other content is assessed. There are several types of trajectory metrics that can be used to evaluate generative models, including trajectory exact match, trajectory in-order match, trajectory any order match, and trajectory precision. These metrics measure the similarity between the model's output and a set of human-generated reference outputs.
- ##### **Transformer**

 - A "Transformer" is a neural network architecture that underlies most state-of-the-art generative models. It's used in various language model applications, including translation. Transformers consist of an encoder and a decoder; the encoder converts input text into an intermediate representation, and the decoder converts this into useful output. They utilize a self-attention mechanism to gather context from words surrounding the word being processed. While training a Transformer requires significant resources, fine-tuning a pre-trained Transformer for specific applications is more efficient.
- ##### **Transformer Reinforcement Learning**

 - Transformer Reinforcement Learning (TRL) refers to the application of reinforcement learning (RL) techniques to train transformer-based models for generative tasks. This approach addresses limitations of traditional generative models, which are often trained on next-token prediction without explicit optimization for desirable qualities like coherence, safety, and sensibility. TRL directly optimizes the language model on complex objectives by using RL, often incorporating human feedback (RLHF) to guide the learning process. Examples include fine-tuning models to generate less toxic content using reward models and using TRL to fine-tune Gemma, a generative model. For more information, see [Hugging Face DLCs: Fine-tuning Gemma with Transformer Reinforcement Learning (TRL) on Vertex AI](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/open-models/fine-tuning/vertex_ai_trl_fine_tuning_gemma.ipynb).
- ##### **true positive**

 - A "true positive" refers to a prediction where the model correctly identifies a positive class. For example, if a model is trained to identify customers who will purchase a jacket, a true positive would be correctly predicting that a customer will make such a purchase.
- ##### **validation**

 - Validation checks the quality of a model's predictions against the validation set. This involves defining metrics to measure the generated content's quality, speed, adherence to instructions, and safety. Validation often uses labeled data (input prompts and expected outputs) to compare the model's predictions with the ground truth. Metrics like F1 score (for classification) and ROUGE-L score (for summarization) might be used. The process also includes testing edge cases and unusual scenarios to ensure robustness. For deployed models, continuous monitoring and capturing of common data points and edge cases help improve future validation efforts.
- ##### **vector**

 - A vector refers to a numerical representation of text, images, or videos that captures relationships between inputs. Machine learning models are suited for creating embeddings by identifying patterns within large datasets. Applications can use embeddings to process and produce language, recognizing complex meanings and semantic relationships specific to the content. For more information, see [Embeddings APIs overview](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings).
- ##### **Vertex AI Experiments**

 - Vertex AI Experiments lets users track the following: 1. Steps of an experiment run (for example, preprocessing and training). 2. Inputs (for example, algorithm, parameters, and datasets). 3. Outputs of those steps (for example, models, checkpoints, and metrics).
- ##### **Vertex AI Model Registry**

 - The Vertex AI Model Registry is a central repository where you can manage the lifecycle of your ML models. From the Vertex AI Model Registry, you have an overview of your models so you can better organize, track, and train new versions. When you have a model version you would like to deploy, you can assign it to an endpoint directly from the registry, or using aliases, deploy models to an endpoint. For more information, see [Introduction to the Vertex AI Model Registry](https://cloud.google.com/vertex-ai/docs/model-registry/introduction).
- ##### **video segment**

 - A video segment is identified by beginning and ending time offset of a video.
- ##### **virtual private cloud (VPC)**

 - Virtual private cloud is an on-demand, configurable pool of shared computing resources that's allocated in a public cloud environment and provides a level of isolation between different organizations using those resources.
- ##### **word embedding**

 - Word embeddings are a way to represent words as dense vectors of floating-point values. This allows similar words to have similar encodings. Word embeddings are often used in generative AI to capture the relationships between words and generate new text or code, no sources. In generative AI, word embeddings can be used to train models that can generate new text or code. By understanding the relationships between words, generative AI models can create new content that is both coherent and relevant.
- ##### **zero-shot prompt (direct prompting)**

 - In generative AI, a zero-shot prompt is a prompt that enables a large language model (LLM) to perform a task without any additional training or examples. This contrasts with methods like few-shot prompting, which provides the model with example inputs and outputs. A zero-shot prompt relies solely on the model's pre-existing knowledge to generate a response. For more information, see [zero-shot prompt](https://ai.google.dev/gemini-api/docs/models/generative-models#zero-shot-prompts).