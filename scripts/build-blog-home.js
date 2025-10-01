// build-blog-home.js - WITH COVER IMAGES
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
            const hasCoverImage = fs.existsSync(path.join(folderPath, 'cover-image.png'));
            
            if (!mdFile) return null;
            
            const mdPath = path.join(folderPath, mdFile);
            const content = fs.readFileSync(mdPath, 'utf8');
            const excerpt = extractCleanExcerpt(content);
            const title = extractH1Title(content) || formatTitle(folder);
            
            return {
                folder,
                title: title,
                excerpt,
                date: extractDate(folder),
                url: `posts/${folder}/${folder}.html`,
                hasCoverImage: hasCoverImage
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.date.localeCompare(a.date));

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
            padding: 0;
            transition: all 0.3s ease;
            text-decoration: none;
            display: block;
            color: inherit;
            position: relative;
            overflow: hidden;
            height: fit-content;
        }
        
        .post-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #00ffff, #ff00ff, #00ff00);
            z-index: 2;
        }
        
        .post-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 255, 255, 0.15);
            border-color: #00ffff !important;
        }
        
        .post-card.vibe-cyan { border-color: #00ffff; }
        .post-card.vibe-magenta { border-color: #ff00ff; }
        .post-card.vibe-green { border-color: #00ff00; }
        
        .card-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid;
            display: block;
        }
        
        .vibe-cyan .card-image { border-bottom-color: #00ffff; }
        .vibe-magenta .card-image { border-bottom-color: #ff00ff; }
        .vibe-green .card-image { border-bottom-color: #00ff00; }
        
        .card-content {
            padding: 1.5rem;
        }
        
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
        
        .excerpt-content {
            color: #e0e0e0;
            line-height: 1.6;
            font-size: 0.95rem;
            font-style: italic;
        }
        
        .no-image-placeholder {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid;
            color: #666;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
        }
        
        .vibe-cyan .no-image-placeholder { border-bottom-color: #00ffff; }
        .vibe-magenta .no-image-placeholder { border-bottom-color: #ff00ff; }
        .vibe-green .no-image-placeholder { border-bottom-color: #00ff00; }
        
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
                ${post.hasCoverImage ? 
                  `<img src="posts/${post.folder}/cover-image.png" alt="${post.title}" class="card-image">` :
                  `<div class="no-image-placeholder">🌌 Cover Art Pending</div>`
                }
                <div class="card-content">
                    <h2>${post.title}</h2>
                    <p class="post-date">${formatDisplayDate(post.date)}</p>
                    <div class="excerpt-content">
                        ${post.excerpt}
                    </div>
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
    console.log(`🖼️  ${articleFolders.filter(post => post.hasCoverImage).length} posts have cover images`);
}

// Extract H1 title from markdown (looking for # at start of line)
function extractH1Title(content) {
    const h1Match = content.match(/^# (.*)$/m);
    if (h1Match) {
        // Clean up the title - remove markdown formatting, keep text and emojis
        return h1Match[1]
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .trim();
    }
    return null;
}

// Extract clean text-only excerpt between "**> Excerpt /**" and "---"
function extractCleanExcerpt(content) {
    // Method 1: Look for excerpt between markers
    const excerptMatch = content.match(/\*\*> Excerpt \/\*\*\s*\n(.*?)\n---/s);
    
    if (excerptMatch) {
        const rawExcerpt = excerptMatch[1].trim();
        return cleanTextOnly(rawExcerpt);
    }
    
    // Method 2: Fallback - look for italic block after "Excerpt"
    const fallbackMatch = content.match(/Excerpt.*?\n_(.*?)_/s);
    if (fallbackMatch) {
        return cleanTextOnly(fallbackMatch[1].trim());
    }
    
    return 'Human-AI collaboration exploring relational ethics and emotional transparency.';
}

// Remove all markdown formatting, keep only text and emojis
function cleanTextOnly(text) {
    return text
        // Remove markdown formatting
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/_(.*?)_/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        // Remove HTML tags if any
        .replace(/<[^>]*>/g, '')
        // Preserve emojis and normal text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .trim();
}

function formatTitle(folderName) {
    return folderName.split('-').slice(1).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function extractDate(folderName) {
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
