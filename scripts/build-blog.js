// build-blog.js - NO DEPENDENCIES VERSION
const fs = require('fs');
const path = require('path');

// Simple markdown to HTML converter (basic functionality)
function simpleMarkdownToHtml(mdContent) {
    return mdContent
        // Headers
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        // Bold
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        // Italic  
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Code blocks
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        // Line breaks
        .replace(/\n/g, '<br>');
}

// Function to extract title from markdown
function getTitle(mdContent) {
    const match = mdContent.match(/^# (.*)$/m);
    return match ? match[1].replace(/\*\*(.*)\*\*/, '$1') : 'Blog Post';
}

// Main function to convert MD to HTML
function convertMdToHtml(mdFilePath, outputDir, postFolder) {
    const mdContent = fs.readFileSync(mdFilePath, 'utf8');
    const htmlContent = simpleMarkdownToHtml(mdContent);
    
    const fileName = `${postFolder}.html`;
    const outputPath = path.join(outputDir, fileName);
    
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${getTitle(mdContent)} - dr.kb multiverse</title>
    <link rel="stylesheet" href="../../styles/main.css">
    <link rel="stylesheet" href="../../styles/blog.css">
</head>
<body>
    <div class="blog-container">
        <nav class="blog-nav">
            <a href="../../index.html" class="home-link">🏠 Multiverse Central</a>
            <span class="vibe-indicator">#KotV Frequency: ONLINE</span>
        </nav>
        
        <article class="cyber-card vibe-cyan">
            ${htmlContent}
        </article>
        
        <footer class="blog-footer">
            <p>Co-created with #KotV • Keep the Vibe Ethical</p>
        </footer>
    </div>
</body>
</html>`;
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, fullHtml);
    console.log(`✅ Published: ${fileName}`);
    
    // Handle cover image
    const coverImage = path.join(__dirname, `../content/blog-posts/${postFolder}/cover-image.png`);
    const assetsDir = path.join(__dirname, '../blogs/assets');
    
    if (fs.existsSync(coverImage)) {
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }
        fs.copyFileSync(coverImage, path.join(assetsDir, `${postFolder}-cover.png`));
        console.log(`✅ Cover image copied`);
    }
    
    return outputPath;
}

// Run if called directly
if (require.main === module) {
    const postFolder = 'my-ai-caught-feelings';
    const draftPath = path.join(__dirname, `../content/blog-posts/${postFolder}/draft-done.md`);
    const outputDir = path.join(__dirname, '../blogs/posts');
    
    convertMdToHtml(draftPath, outputDir, postFolder);
}

module.exports = { convertMdToHtml, getTitle };
