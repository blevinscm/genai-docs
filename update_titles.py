import os
from pathlib import Path
import frontmatter

def clean_title(title):
    # Convert to string if not already
    title = str(title)
    
    # Remove URLs and everything after them
    if 'google.com' in title:
        title = title.split('google.com')[0]
    
    # Replace hyphens with spaces
    title = title.replace('-', ' ')
    
    # Remove extra whitespace and capitalize words
    title = ' '.join(word.capitalize() for word in title.split())
    
    return title

def process_file(file_path):
    try:
        # Load the markdown file with frontmatter
        post = frontmatter.load(file_path)
        
        # Check if there's a title in the frontmatter
        if 'title' in post.metadata:
            old_title = post.metadata['title']
            new_title = clean_title(old_title)
            
            # Only update if the title has changed
            if new_title != old_title:
                post.metadata['title'] = new_title
                print(f"Updating {file_path}")
                print(f"  Old title: {old_title}")
                print(f"  New title: {new_title}")
                
                # Write the changes back to the file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(frontmatter.dumps(post))
                return True
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
    return False

def main():
    docs_dir = Path('docs')
    files_updated = 0
    
    # Walk through all directories recursively
    for root, _, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = Path(root) / file
                if process_file(file_path):
                    files_updated += 1
    
    print(f"\nCompleted! Updated {files_updated} files.")

if __name__ == '__main__':
    main() 