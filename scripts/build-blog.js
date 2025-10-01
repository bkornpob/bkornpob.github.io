// build-blog.js - CLEAN VERSION
const fs = require('fs');
const path = require('path');

function publishArticle(sourceFolder) {
    const sourcePath = path.join(__dirname, `../content/blog-posts/${sourceFolder}`);
    const targetBase = path.join(__dirname, `../blogs/posts`);
    
    // Validate source exists
    if (!fs.existsSync(sourcePath)) {
        console.log(`❌ Source folder not found: ${sourceFolder}`);
        return;
    }

    // Find the main markdown file
    const files = fs.readdirSync(sourcePath);
    const mdFile = files.find(f => f.endsWith('.md') && !f.includes('plan.md'));
    
    if (!mdFile) {
        console.log(`❌ No main markdown file found in ${sourceFolder}`);
        return;
    }

    const articleName = path.basename(mdFile, '.md'); // e.g., "20251001-profXmode"
    const targetFolder = path.join(targetBase, articleName);
    
    console.log(`🚀 Publishing: ${sourceFolder} -> ${articleName}`);

    // Create target directory
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
    }

    // Copy main markdown file (KEEP ORIGINAL NAME)
    const sourceMd = path.join(sourcePath, mdFile);
    const targetMd = path.join(targetFolder, mdFile); // Keep original name
    fs.copyFileSync(sourceMd, targetMd);
    console.log(`✅ Copied: ${mdFile}`);

    // Find and copy all locally referenced images
    const mdContent = fs.readFileSync(sourceMd, 'utf8');
    const imageRefs = extractLocalImages(mdContent);
    
    imageRefs.forEach(imageFile => {
        const sourceImage = path.join(sourcePath, imageFile);
        const targetImage = path.join(targetFolder, imageFile);
        
        if (fs.existsSync(sourceImage)) {
            fs.copyFileSync(sourceImage, targetImage);
            console.log(`✅ Copied image: ${imageFile}`);
        } else {
            console.log(`⚠️  Image not found: ${imageFile}`);
        }
    });

    console.log(`🎉 Published to: /blogs/posts/${articleName}/`);
    console.log(`📁 Contents: ${fs.readdirSync(targetFolder).join(', ')}`);
}

function extractLocalImages(mdContent) {
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const images = [];
    let match;
    
    while ((match = imageRegex.exec(mdContent)) !== null) {
        const imagePath = match[1];
        // Only include local files (not URLs)
        if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
            images.push(imagePath);
        }
    }
    
    return [...new Set(images)]; // Remove duplicates
}

// Command line execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node build-blog.js <source-folder-name>');
        console.log('Example: node build-blog.js profXmode');
        process.exit(1);
    }

    const sourceFolder = args[0];
    publishArticle(sourceFolder);
}

module.exports = { publishArticle };
