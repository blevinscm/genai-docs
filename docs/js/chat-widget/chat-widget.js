document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const questionInput = document.getElementById('questionInput');
    const chatMessages = document.getElementById('chatMessages');
    const submitButton = document.getElementById('submitButton');

    // Set default theme based on system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    }

    // Predefined answer for "What are the components of a prompt?"
    const promptComponentsAnswer = `# Components of a Prompt

According to the documentation, prompts have **essential components** and **optional components**:

## Essential Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Objective** | What you want the model to achieve. Be specific and include any overarching objectives. Also called "mission" or "goal." | Your objective is to help students with math problems without directly giving them the answer. |
| **Instructions** | Step-by-step instructions on how to perform the task at hand. Also called "task," "steps," or "directions." | 1. Understand what the problem is asking. 2. Understand where the student is stuck. 3. Give a hint for the next step of the problem. |

## Optional Components

| Component | Description | Example |
|-----------|-------------|---------|
| **System instructions** | Technical or environmental directives that may involve controlling or altering the model's behavior across a set of tasks. Available in Gemini 2.0 Flash and later models. | You are a coding expert that specializes in rendering code for front-end interfaces. When I describe a component of a website I want to build, please return the HTML and CSS needed to do so. |
| **Persona** | Who or what the model is acting as. Also called "role" or "vision." | You are a math tutor here to help students with their math homework. |
| **Constraints** | Restrictions on what the model must adhere to when generating a response, including what the model can and can't do. | Don't give the answer to the student directly. Instead, give hints at the next step towards solving the problem. |
| **Tone** | The tone of the response. You can also influence the style and tone by specifying a persona. | Respond in a casual and technical manner. |
| **Context** | Any information that the model needs to refer to in order to perform the task at hand. | A copy of the student's lesson plans for math. |
| **Few-shot examples** | Examples of what the response should look like for a given prompt. | Input: [example question] Output: [example answer] |
| **Reasoning steps** | Tell the model to explain its reasoning. This can sometimes improve the model's reasoning capability. | Explain your reasoning step-by-step. |
| **Response format** | The format that you want the response to be in (JSON, table, Markdown, etc.). | Format your response in Markdown. |
| **Recap** | Concise repeat of the key points of the prompt, especially the constraints and response format. | Don't give away the answer and provide hints instead. Always format your response in Markdown format. |
| **Safeguards** | Grounds the questions to the mission of the bot. | N/A |`;

    // Handle chat form submission
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const question = questionInput.value.trim();
        
        if (question === '') {
            return;
        }
        
        // Add user message to the chat
        addMessage('user', question);
        
        // Disable input and button during "processing"
        questionInput.disabled = true;
        submitButton.disabled = true;
        
        // Clear the input
        questionInput.value = '';
        
        // Check if the question is about prompt components
        setTimeout(() => {
            if (isAboutPromptComponents(question)) {
                // Add the predefined answer with markdown formatting
                addMessage('assistant', promptComponentsAnswer, true);
            } else {
                // Add a default response for any other question
                addMessage('assistant', "I'm specifically designed to answer questions about prompt components. Try asking 'What are the components of a prompt?'");
            }
            
            // Re-enable input and button
            questionInput.disabled = false;
            submitButton.disabled = false;
            questionInput.focus();
        }, 500); // Slight delay to simulate processing
    });

    // Function to check if the question is about prompt components
    function isAboutPromptComponents(question) {
        const lcQuestion = question.toLowerCase();
        return (
            lcQuestion.includes('component') && lcQuestion.includes('prompt') ||
            lcQuestion.includes('what are the components of a prompt') ||
            lcQuestion.includes('prompt components') ||
            lcQuestion.includes('parts of a prompt') ||
            lcQuestion.includes('prompt structure') ||
            lcQuestion.includes('how to structure a prompt')
        );
    }

    // Function to add a message to the chat
    function addMessage(role, content, isMarkdown = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.classList.add(role === 'user' ? 'user-message' : 'assistant-message');
        
        if (isMarkdown) {
            // Add markdown formatting
            messageElement.classList.add('markdown-content');
            messageElement.innerHTML = formatMarkdown(content);
        } else {
            messageElement.textContent = content;
        }
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to the new message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Simple Markdown formatter
    function formatMarkdown(text) {
        // Format headings
        text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        
        // Format tables
        text = formatTables(text);
        
        // Format bold text
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format paragraphs (any line that doesn't start with a special character)
        text = text.replace(/^(?!<h|<table|<\/table|<tr|<\/tr|<th|<\/th|<td|<\/td)(.+)$/gm, '<p>$1</p>');
        
        return text;
    }

    // Helper function to format markdown tables
    function formatTables(text) {
        const tableRegex = /^\|(.*)\|$/gm;
        
        let lines = text.split('\n');
        let inTable = false;
        let tableLines = [];
        let result = [];
        
        for (const line of lines) {
            if (tableRegex.test(line)) {
                if (!inTable) {
                    inTable = true;
                    tableLines = [];
                }
                tableLines.push(line);
            } else if (inTable) {
                inTable = false;
                result.push(convertTableToHtml(tableLines));
                result.push(line);
            } else {
                result.push(line);
            }
        }
        
        // Handle case where table is at the end of text
        if (inTable) {
            result.push(convertTableToHtml(tableLines));
        }
        
        return result.join('\n');
    }

    // Helper function to convert markdown table lines to HTML table
    function convertTableToHtml(tableLines) {
        let html = '<table>';
        let isHeader = true;
        
        for (const line of tableLines) {
            // Skip separator line (---|---|---)
            if (/^\|[\s-]+\|[\s-]+\|/.test(line)) {
                continue;
            }
            
            // Split the line into cells
            const rawCells = line.split('|').slice(1, -1);
            const cells = [];
            for (const cell of rawCells) {
                cells.push(cell.trim());
            }
            
            html += '<tr>';
            
            if (isHeader) {
                for (const cell of cells) {
                    html += `<th>${cell}</th>`;
                }
                isHeader = false;
            } else {
                for (const cell of cells) {
                    // Apply formatting to cell content
                    let cellContent = cell;
                    cellContent = cellContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    html += `<td>${cellContent}</td>`;
                }
            }
            
            html += '</tr>';
        }
        
        html += '</table>';
        return html;
    }
}); 