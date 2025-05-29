// Initialize the chat widget when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add a style element to force header styling
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .chat-header {
      background-color: rgba(192, 192, 192, 0.9) !important;
    }
    .transparent .chat-header {
      background-color: rgba(192, 192, 192, 0.8) !important;
    }
  `;
  document.head.appendChild(styleEl);

  // Create the chat container if it doesn't already exist
  if (!document.querySelector('.chat-container')) {
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.style.width = '700px';  // Force width on creation
    chatContainer.innerHTML = `
      <div class="chat-header" style="background-color: rgba(192, 192, 192, 0.9) !important;">
        <div class="chat-title">Documentation AI Helper</div>
        <button class="chat-toggle-button" id="chatToggleButton">−</button>
      </div>
      <div class="chat-content" id="chatContent">
        <div class="chat-messages" id="chatMessages">
          <!-- Messages will be displayed here -->
        </div>
        <div class="chat-input-container">
          <form id="chatForm">
            <div class="input-wrapper">
              <input 
                  type="text" 
                  id="questionInput" 
                  class="chat-input" 
                  placeholder="Ask a question about documentation..."
                  autocomplete="off"
              >
              <button type="submit" class="chat-submit-button" id="submitButton">
                  <svg class="submit-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                  </svg>
                  <span>Ask</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
    
    // Append the chat container to the body
    document.body.appendChild(chatContainer);
    
    // Initialize chat widget functionality
    initializeChat();
    
    // Force the header styling
    setTimeout(() => {
      const header = document.querySelector('.chat-header');
      if (header) {
        header.style.setProperty('background-color', 'rgba(192, 192, 192, 0.9)', 'important');
      }
    }, 100);
  }
});

// Function to initialize the chat functionality
function initializeChat() {
  const chatForm = document.getElementById('chatForm');
  const questionInput = document.getElementById('questionInput');
  const chatMessages = document.getElementById('chatMessages');
  const submitButton = document.getElementById('submitButton');
  const chatToggleButton = document.getElementById('chatToggleButton');
  const chatContent = document.getElementById('chatContent');
  const chatContainer = document.querySelector('.chat-container');

  // Set default theme based on system preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
  }

  // Store states
  let isExpanded = false;
  
  // Apply transparency
  chatContainer.style.opacity = '0.9';
  chatContainer.classList.add('transparent');
  
  // Set initial collapsed state
  chatContent.style.display = 'none';
  chatToggleButton.textContent = '+';

  // Toggle chat content visibility
  chatToggleButton.addEventListener('click', function() {
    if (isExpanded) {
      chatContent.style.display = 'none';
      chatToggleButton.textContent = '+';
      isExpanded = false;
      
      // Make semi-transparent when collapsed
      chatContainer.style.opacity = '0.9';
      chatContainer.classList.add('transparent');
      
      // Ensure header background color
      document.querySelector('.chat-header').style.setProperty('background-color', 'rgba(192, 192, 192, 0.8)', 'important');
    } else {
      chatContent.style.display = 'block';
      chatToggleButton.textContent = '−';
      isExpanded = true;
      
      // Make fully opaque when expanded
      chatContainer.style.opacity = '1';
      chatContainer.classList.remove('transparent');
      
      // Ensure header background color
      document.querySelector('.chat-header').style.setProperty('background-color', 'rgba(192, 192, 192, 0.9)', 'important');
    }
  });

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
    
    // Make fully opaque when displaying answers
    chatContainer.style.opacity = '1';
    chatContainer.classList.remove('transparent');
    
    // Add user message to the chat
    addMessage('user', question);
    
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator chat-message assistant-message';
    loadingIndicator.innerHTML = `
      Thinking<div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    chatMessages.appendChild(loadingIndicator);
    
    // Scroll to the loading indicator
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Disable input and button during "processing"
    questionInput.disabled = true;
    submitButton.disabled = true;
    
    // Clear the input
    questionInput.value = '';
    
    // Check if the question is about prompt components
    setTimeout(() => {
      // Remove loading indicator
      chatMessages.removeChild(loadingIndicator);
      
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
    }, 1500); // Increased delay to show loading indicator longer
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
    // Temporarily replace escaped pipes and other special characters
    const placeholders = {};
    let placeholderCount = 0;
    
    // First replace code blocks - they should not be processed for markdown
    text = text.replace(/```([\s\S]*?)```/g, function(match, codeContent) {
      const placeholder = `__CODE_BLOCK_${placeholderCount}__`;
      placeholders[placeholder] = '<pre><code>' + escapeHtml(codeContent.trim()) + '</code></pre>';
      placeholderCount++;
      return placeholder;
    });
    
    // Replace inline code - it should not be processed for markdown either
    text = text.replace(/`([^`]+)`/g, function(match, codeContent) {
      const placeholder = `__CODE_INLINE_${placeholderCount}__`;
      placeholders[placeholder] = '<code>' + escapeHtml(codeContent) + '</code>';
      placeholderCount++;
      return placeholder;
    });
    
    // Replace escaped characters
    text = text.replace(/\\([\\`*_{}[\]()#+\-.!|])/g, function(match, char) {
      const placeholder = `__ESCAPED_${placeholderCount}__`;
      placeholders[placeholder] = char;
      placeholderCount++;
      return placeholder;
    });
    
    // Format headings
    text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Format tables - must be done before processing pipe characters in regular text
    text = formatTables(text);
    
    // Format bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format italic text
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Format links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Process lists
    text = text.replace(/^\s*[-*+]\s+(.*)/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
    
    // Process numbered lists
    text = text.replace(/^\s*\d+\.\s+(.*)/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n)+/g, function(match) {
      // Only wrap in <ol> if it's not already wrapped in <ul>
      return match.includes('<ul>') ? match : '<ol>' + match + '</ol>';
    });
    
    // Format paragraphs (any line that doesn't start with a special character)
    text = text.replace(/^(?!<h|<table|<\/table|<tr|<\/tr|<th|<\/th|<td|<\/td|<pre|<\/pre|<code|<\/code|<ul|<\/ul|<ol|<\/ol|<li|<\/li)(.+)$/gm, '<p>$1</p>');
    
    // Replace placeholders back with their original content
    for (const [placeholder, content] of Object.entries(placeholders)) {
      text = text.replace(new RegExp(placeholder, 'g'), content);
    }
    
    return text;
  }
  
  // Escape HTML special characters
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Function to check if a line is a markdown table separator
  function isTableSeparatorLine(line) {
    // Check if the line consists of | followed by dashes/spaces/colons and |
    return /^\|[\s\-:]+\|[\s\-:]+\|/.test(line);
  }

  // Helper function to format markdown tables
  function formatTables(text) {
    const tableRegex = /^\|(.*)\|$/gm;
    
    // If no table markers detected, return text unchanged
    if (!text.match(tableRegex)) {
      return text;
    }
    
    let lines = text.split('\n');
    let inTable = false;
    let tableLines = [];
    let result = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const nextLine = i < lines.length - 1 ? lines[i + 1] : null;
      
      // Check if this is a table header line with a separator line underneath
      if (tableRegex.test(line) && nextLine && isTableSeparatorLine(nextLine)) {
        inTable = true;
        tableLines = [line];
        // Skip reading the separator line now, it will be handled by convertTableToHtml
        i++;
        continue;
      } 
      // If we're already in a table and encounter another table line
      else if (inTable && tableRegex.test(line)) {
        tableLines.push(line);
      } 
      // If we're in a table but this line is not a table line
      else if (inTable) {
        inTable = false;
        result.push(convertTableToHtml(tableLines));
        result.push(line);
      }
      // Not a table line and not in a table context
      else {
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
    let hasSeenSeparator = false;
    
    for (let i = 0; i < tableLines.length; i++) {
      const line = tableLines[i];
      
      // Skip separator line (---|---|---)
      if (isTableSeparatorLine(line)) {
        hasSeenSeparator = true;
        continue;
      }
      
      // Split the line into cells, properly handling the case
      const cells = parseCells(line);
      
      html += '<tr>';
      
      // First row or rows before separator are header cells
      if (i === 0 || !hasSeenSeparator) {
        for (const cell of cells) {
          let cellContent = formatCellContent(cell);
          html += `<th>${cellContent}</th>`;
        }
      } else {
        for (const cell of cells) {
          let cellContent = formatCellContent(cell);
          html += `<td>${cellContent}</td>`;
        }
      }
      
      html += '</tr>';
    }
    
    html += '</table>';
    return html;
  }
  
  // Helper function to parse table cells correctly
  function parseCells(line) {
    // Remove the first and last | characters
    const content = line.substring(1, line.length - 1);
    
    // Split by pipe characters, but not escaped ones
    const result = [];
    let currentCell = '';
    let inBackticks = false;
    
    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      
      // Toggle backtick state (to ignore pipes in code)
      if (char === '`') {
        inBackticks = !inBackticks;
        currentCell += char;
        continue;
      }
      
      // Only split on pipes that aren't in code blocks
      if (char === '|' && !inBackticks) {
        result.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    
    // Add the last cell
    result.push(currentCell.trim());
    
    return result;
  }
  
  // Helper function to format content inside table cells
  function formatCellContent(content) {
    // Apply formatting to cell content (bold, italic, etc.)
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    return content;
  }
} 