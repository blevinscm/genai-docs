// Helper script for the chat widget

document.addEventListener('DOMContentLoaded', function() {
  // Position the chat widget at the center bottom
  const chatContainer = document.querySelector('.chat-container');
  if (chatContainer) {
    // Add styles for the chat container
    chatContainer.style.position = 'fixed';
    chatContainer.style.bottom = '20px';
    chatContainer.style.left = '50%';
    chatContainer.style.transform = 'translateX(-50%)';
    chatContainer.style.zIndex = '1000';
    chatContainer.style.width = '400px';
    chatContainer.style.maxWidth = '90%';
    chatContainer.style.borderRadius = '8px 8px 0 0';
    chatContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    chatContainer.style.overflow = 'hidden';
    
    // Add styles for the chat header
    const chatHeader = chatContainer.querySelector('.chat-header');
    if (chatHeader) {
      chatHeader.style.display = 'flex';
      chatHeader.style.justifyContent = 'space-between';
      chatHeader.style.alignItems = 'center';
      chatHeader.style.padding = '10px 15px';
      chatHeader.style.backgroundColor = '#f0f4f8';
      chatHeader.style.borderBottom = '1px solid #e1e4e8';
      chatHeader.style.cursor = 'pointer';
    }
    
    // Add styles for the title
    const chatTitle = chatContainer.querySelector('.chat-title');
    if (chatTitle) {
      chatTitle.style.fontWeight = 'bold';
      chatTitle.style.fontSize = '14px';
    }
    
    // Add styles for the toggle button
    const chatToggleButton = chatContainer.querySelector('.chat-toggle-button');
    if (chatToggleButton) {
      chatToggleButton.style.background = 'none';
      chatToggleButton.style.border = 'none';
      chatToggleButton.style.fontSize = '18px';
      chatToggleButton.style.cursor = 'pointer';
      chatToggleButton.style.padding = '0 5px';
      chatToggleButton.style.lineHeight = '1';
    }
    
    // Make header also toggle the visibility when clicked
    const chatContent = chatContainer.querySelector('.chat-content');
    if (chatHeader && chatContent && chatToggleButton) {
      chatHeader.addEventListener('click', function(e) {
        // Only toggle if the click was on the header itself, not on the toggle button
        if (e.target !== chatToggleButton) {
          chatToggleButton.click();
        }
      });
    }
    
    // Add a small delay to ensure the widget is visible after page load
    setTimeout(() => {
      chatContainer.style.display = 'block';
    }, 500);
  }
}); 