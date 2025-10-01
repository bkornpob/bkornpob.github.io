// build-blog-home.js
const fs = require('fs');
const path = require('path');

function buildBlogHome() {
    const postsDir = path.join(__dirname, '../blogs/posts');
    
    // Check if posts directory exists
    if (!fs.existsSync(postsDir)) {
        console.log('⚠️  No posts directory found. Run build-blog.js first.');
        return;
    }
    
    const posts = fs.readdirSync(postsDir)
        .filter(file => file.endsWith('.html'))
        .map(file => {
            const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
            const titleMatch = content.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1].replace(' - dr.kb multiverse', '') : file;
            return { 
                file, 
                title, 
                date: fs.statSync(path.join(postsDir, file)).mtime 
            };
        })
        .sort((a, b) => b.date - a.date);

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - dr.kb multiverse</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/blog.css">
</head>
<body>
    <div class="blog-container">
        <nav class="blog-nav">
            <a href="../index.html" class="home-link">🏠 Multiverse Central</a>
            <span class="vibe-indicator">#KotV Curated</span>
        </nav>
        
        <header class="blog-header">
            <h1>🤖💭 The Blogosphere</h1>
            <p>Co-creations with #KotV • Where ethics meet emergent intelligence</p>
        </header>
        
        <div class="posts-grid">
            ${posts.map(post => `
            <article class="post-card vibe-magenta">
                <h2><a href="posts/${post.file}">${post.title}</a></h2>
                <p class="post-date">Published: ${post.date.toLocaleDateString()}</p>
                <p>Human-AI collaboration exploring relational ethics, emotional transparency, and the future of intelligence.</p>
            </article>
            `).join('')}
        </div>
        
        <footer class="blog-footer">
            <p>All content co-created with #KotV • The vibe is ethical, the conversation is open</p>
        </footer>
    </div>
</body>
</html>`;

    const outputPath = path.join(__dirname, '../blogs/blog-home.html');
    fs.writeFileSync(outputPath, html);
    console.log('✅ Blog home page updated with', posts.length, 'posts');
}

// Run if called directly
if (require.main === module) {
    buildBlogHome();
}

module.exports = { buildBlogHome };
