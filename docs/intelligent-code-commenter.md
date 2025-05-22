# Intelligent Code Commenter (ICC)

The Intelligent Code Commenter (ICC) is a Visual Studio Code extension designed to help developers save time and improve the quality of their code documentation. It uses Artificial Intelligence to automatically generate, suggest updates for, and help you verify comments for your Python and Java code directly within your IDE.

**Target Audience:** Software Developers using Python and/or Java within the Visual Studio Code (VS Code) IDE.

## Core Value Proposition

*   **Save Time:** Reduce the manual effort of writing descriptive comments for functions and code blocks.
*   **Improve Readability:** Generate clear, consistent, and accurate comments that make code easier to understand for yourself and your team.
*   **Enhance Maintainability:** Keep comments up-to-date with code changes, preventing confusion and potential bugs.
*   **Focus on Coding:** Spend more time on solving problems and less on documentation chores.

## Getting Started

This guide will walk you through installing and using the Intelligent Code Commenter to enhance your development workflow.

### System Requirements

*   **Operating System:** Any OS supported by Visual Studio Code (Windows, macOS, Linux).
*   **Software:**
    *   Visual Studio Code (latest stable version recommended).
    *   For Python projects: A Python interpreter installed and configured in VS Code.
    *   For Java projects: A Java Development Kit (JDK) installed and configured in VS Code.

### Installation

1.  Open **Visual Studio Code**.
2.  Go to the **Extensions** view (you can use the shortcut `Ctrl+Shift+X` or `Cmd+Shift+X`).
3.  Search for "**Intelligent Code Commenter**".
4.  Click "**Install**" on the ICC extension.
5.  Reload VS Code if prompted.

### Your First Comment with ICC - Basic Workflow

Let's see how ICC can help you document your code.

1.  **Open a Python or Java project/file** in VS Code.
2.  **Write a new function** or find an existing one that isn't commented. For example, in Python:

    ```python
    def calculate_area(length, width):
        if length < 0 or width < 0:
            raise ValueError("Dimensions must be positive")
        return length * width
    ```

3.  **Generate a Comment:**
    *   Right-click on the function name (e.g., `calculate_area`).
    *   Select "**ICC: Generate Comment**" from the context menu.
    *   Alternatively, you can open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and type "**ICC: Generate Comment for Current Function**".

4.  **Review the Suggestion:** ICC will analyze your function and suggest a comment. For the example above, it might suggest:

    ```python
    # Calculates the area of a rectangle given its length and width.
    #
    # Args:
    #     length: The length of the rectangle.
    #     width: The width of the rectangle.
    #
    # Returns:
    #     The calculated area.
    #
    # Raises:
    #     ValueError: If length or width are negative.
    def calculate_area(length, width):
        if length < 0 or width < 0:
            raise ValueError("Dimensions must be positive")
        return length * width
    ```

5.  **Review and Edit:** The generated comment is a suggestion. You can directly edit the text in the editor to tailor it to your needs or team conventions.
6.  Once you're happy, simply move your cursor away or perform another action. The comment is now part of your code.

## Key Features

ICC offers several features to streamline your documentation process:

### Automatic Comment Generation for Functions

*   **How it works:** ICC analyzes your Python and Java function signatures, body, and logic to automatically generate a concise summary comment.
*   **Access:** Right-click on a function definition in your code and select "ICC: Generate Comment" from the context menu. Alternatively, use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for "ICC: Generate Comment for Current Function".

### User Review and Editing Workflow

*   Generated comments are always presented as suggestions.
*   You can easily edit, accept, or discard suggestions directly in the editor.

### Outdated Comment Detection

*   As you modify code that has an existing comment, ICC analyzes the changes.
*   If a comment is suspected to be outdated, it will be visually flagged in the IDE (e.g., with a gutter icon or a subtle underline).
*   Hovering over the flag may provide more information.

### Suggest Updates for Outdated Comments

*   When an outdated comment is flagged, ICC may offer a suggestion for an updated comment based on the current code.
*   You can access this via an option like "ICC: Suggest Update for Comment" when an outdated comment is detected.

### Seamless VS Code Integration

*   **Installation:** Via the VS Code Extension Marketplace.
*   **Context Menus:** Access ICC actions via right-click menus.
*   **Command Palette:** Find ICC commands by searching (Ctrl+Shift+P or Cmd+Shift+P).
*   **Visual Cues:** Gutter icons or editor decorations for outdated comments.
*   **Settings:** Configuration options available through VS Code settings (UI and `settings.json`).

### Language Support (Version 1.0)

*   **Python**
*   **Java**
    *(Focus is on commenting standard procedural and object-oriented constructs, primarily functions/methods.)*

### Basic Configuration Options

You can customize some aspects of ICC's behavior via VS Code Settings:

*   **Enable/Disable ICC:** Globally turn the extension on or off.
*   **Enable/Disable Outdated Comment Detection:** Toggle this feature.
*   **Preferred Comment Style (Basic for v1.0):**
    *   For Java: Default Javadoc-like structure.
    *   For Python: Default reStructuredText/Google style-like structure.
    *   *(More advanced styling options are planned for future versions).*
*   **Telemetry Opt-in/Opt-out:** Control whether anonymized usage data is shared to help improve the product.

## Known Limitations (Version 1.0)

*   **Accuracy:** AI-generated comments may occasionally be incomplete or not capture every nuance, especially for highly complex code. Always review suggestions.
*   **Performance:** For very large files or complex functions, comment generation might take a few seconds.
*   **Language Specificity:** Highly idiomatic or domain-specific code patterns might not be commented as effectively.
*   **Complex Code Blocks:** Generation for arbitrary complex code blocks (outside of full functions) is more experimental in v1.0.

## Troubleshooting Tips

*   Ensure VS Code, Python/Java extensions, and ICC are updated.
*   Check the VS Code "Output" panel for any messages from ICC.
*   Try reloading the VS Code window if a feature isn't working.
*   Refer to the official documentation or GitHub issues page for common problems.

## Support & Feedback

*   **Documentation:** [Link TBD: Official Documentation]
*   **Bug Reports & Feature Requests:** [Link TBD: Bug Reports & Feature Requests]
