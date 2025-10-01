// build-blog-home.js - VIBE-AWARE CARD GENERATOR
const fs = require('fs');
const path = require('path');

function buildBlogHome() {
    const postsDir = path.join(__dirname, '../blogs/posts');
    const outputPath = path.join(__dirname, '../blogs/blog-home.html');
    
    // Get all article folders
    const articleFolders = fs.readdirSync(postsDir)
        .filter(folder => {
            const folderPath = path.join(postsDir, folder);
            return fs.statSync(folderPath).isDirectory();
        })
        .map(folder => {
            const folderPath = path.join(postsDir, folder);
            const files = fs.readdirSync(folderPath);
            const mdFile = files.find(f => f.endsWith('.md') && f.startsWith(folder));
            
            if (!mdFile) return null;
            
            const mdPath = path.join(folderPath, mdFile);
            const content = fs.readFileSync(mdPath, 'utf8');
            const headerContent = extractHeaderContent(content);
            
            return {
                folder,
                title: extractTitle(content) || formatTitle(folder),
                headerContent,
                date: extractDate(folder),
                url: `posts/${folder}/${folder}.html` // GitHub Pages will render this
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.date.localeCompare(a.date)); // Newest first

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - dr.kb multiverse</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/blog.css">
    <style>
        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            padding: 2rem 0;
        }
        
        .post-card {
            background: linear-gradient(135deg, #0f0f23, #1a1a2e);
            border: 1px solid;
            border-radius: 12px;
            padding: 1.8rem;
            transition: all 0.3s ease;
            text-decoration: none;
            display: block;
            color: inherit;
            position: relative;
            overflow: hidden;
        }
        
        .post-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #00ffff, #ff00ff, #00ff00);
        }
        
        .post-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 255, 255, 0.15);
            border-color: #00ffff !important;
        }
        
        .post-card.vibe-cyan { border-color: #00ffff; }
        .post-card.vibe-magenta { border-color: #ff00ff; }
        .post-card.vibe-green { border-color: #00ff00; }
        
        .post-card h2 {
            color: #00ffff;
            margin: 0 0 1rem 0;
            font-size: 1.4rem;
            font-weight: bold;
        }
        
        .post-date {
            color: #888;
            font-size: 0.9rem;
            margin: 0 0 1.2rem 0;
            font-family: 'Courier New', monospace;
            background: #001122;
            padding: 0.3rem 0.6rem;
            border-radius: 4px;
            display: inline-block;
        }
        
        .header-content {
            color: #e0e0e0;
            line-height: 1.6;
            font-size: 0.95rem;
        }
        
        .header-content .excerpt {
            font-style: italic;
            color: #b0b0ff;
            margin: 1rem 0;
            border-left: 2px solid #00ffff;
            padding-left: 1rem;
        }
        
        .header-content .hashtags {
            margin: 1rem 0;
            font-family: 'Courier New', monospace;
            font-size: 0.85rem;
            color: #00ff00;
        }
        
        .header-content .collaboration {
            color: #ff00ff;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            margin: 0.5rem 0;
        }
        
        .vibe-indicator {
            font-family: 'Courier New', monospace;
            color: #00ff00;
            background: #001100;
            padding: 0.3rem 0.6rem;
            border-radius: 4px;
            font-size: 0.8rem;
            border: 1px solid #00ff00;
        }
        
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: #666;
        }
        
        .empty-state h2 {
            color: #00ffff;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="blog-container">
        <nav class="blog-nav">
            <a href="../index.html" class="home-link">🏠 Multiverse Central</a>
            <span class="vibe-indicator">#KotV Curated • ${articleFolders.length} posts</span>
        </nav>
        
        <header class="blog-header">
            <h1>🤖💭 The Blogosphere</h1>
            <p>Co-creations with #KotV • Where ethics meet emergent intelligence</p>
        </header>
        
        <div class="posts-grid">
            ${articleFolders.map((post, index) => `
            <a href="${post.url}" class="post-card ${getVibeColor(index)}">
                <h2>${post.title}</h2>
                <p class="post-date">${formatDisplayDate(post.date)}</p>
                <div class="header-content">
                    ${post.headerContent}
                </div>
            </a>
            `).join('')}
        </div>
        
        ${articleFolders.length === 0 ? `
        <div class="empty-state">
            <h2>🌌 The Void Awaits</h2>
            <p>No posts published yet. Run <code>node build-blog.js &lt;folder&gt;</code> to publish your first article.</p>
        </div>
        ` : ''}
        
        <footer class="blog-footer">
            <p>All content co-created with #KotV • The vibe is ethical, the conversation is open</p>
        </footer>
    </div>
</body>
</html>`;

    fs.writeFileSync(outputPath, html);
    console.log(`✅ Blog home updated with ${articleFolders.length} posts`);
}

// Extract everything from start until the first "---" separator
function extractHeaderContent(content) {
    const sections = content.split('---');
    if (sections.length < 2) return 'Human-AI collaboration exploring relational ethics and emotional transparency.';
    
    const headerSection = sections[0];
    return headerSection
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function extractTitle(content) {
    const titleMatch = content.match(/^# (.*)$/m);
    return titleMatch ? titleMatch[1].replace(/\*\*(.*)\*\*/, '$1') : null;
}

function formatTitle(folderName) {
    // Convert "20251001-profXmode" to "Prof Xmode"
    return folderName.split('-').slice(1).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function extractDate(folderName) {
    // Extract YYYYMMDD from folder name
    const dateMatch = folderName.match(/^(\d{8})/);
    return dateMatch ? dateMatch[1] : '19700101';
}

function formatDisplayDate(dateStr) {
    const year = dateStr.substr(0, 4);
    const month = dateStr.substr(4, 2);
    const day = dateStr.substr(6, 2);
    return `${year}-${month}-${day}`;
}

function getVibeColor(index) {
    const colors = ['vibe-cyan', 'vibe-magenta', 'vibe-green'];
    return colors[index % colors.length];
}

// Run if called directly
if (require.main === module) {
    buildBlogHome();
}

module.exports = { buildBlogHome };
