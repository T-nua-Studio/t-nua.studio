// generate-gallery.js
// Scans assets/videos/ for .mp4 files and updates the gallery in index.html

const fs = require('fs');
const path = require('path');

const VIDEO_DIR = path.join(__dirname, 'assets', 'videos');
const THUMB_DIR = path.join(VIDEO_DIR, 'thumbnails');
const INDEX_HTML = path.join(__dirname, 'index.html');
const GALLERY_START = '<div class="gallery-grid">';
const GALLERY_END = '</div>';
const DEFAULT_POSTER = 'assets/T-NUA-logo.webp';
const THUMB_EXTS = ['jpg', 'png', 'webp'];

function getVideos() {
    return fs.readdirSync(VIDEO_DIR)
        .filter(f => f.endsWith('.mp4'))
        .sort();
}

function getThumbnail(baseName) {
    for (const ext of THUMB_EXTS) {
        const thumbPath = path.join(THUMB_DIR, `${baseName}.${ext}`);
        if (fs.existsSync(thumbPath)) {
            return `assets/videos/thumbnails/${baseName}.${ext}`;
        }
    }
    return DEFAULT_POSTER;
}

function makeGalleryItem(videoFile) {
    const baseName = videoFile.replace(/\.[^/.]+$/, '');
    const poster = getThumbnail(baseName);
    return `                <div class="gallery-item">\n` +
        `                    <video controls poster="${poster}" width="100%" controlsList="nodownload noremoteplayback" oncontextmenu="return false;">\n` +
        `                        <source src="assets/videos/${videoFile}" type="video/mp4">\n` +
        `                        Your browser does not support the video tag.\n` +
        `                    </video>\n` +
        `                </div>`;
}

function updateIndexHtml() {
    let html = fs.readFileSync(INDEX_HTML, 'utf8');
    const startIdx = html.indexOf(GALLERY_START);
    const endIdx = html.indexOf(GALLERY_END, startIdx);
    if (startIdx === -1 || endIdx === -1) {
        console.error('Could not find gallery grid in index.html');
        process.exit(1);
    }
    const before = html.slice(0, startIdx + GALLERY_START.length);
    const after = html.slice(endIdx);
    const videos = getVideos();
    const items = videos.map(makeGalleryItem).join('\n');
    const newHtml = before + '\n' + items + '\n' + after;
    fs.writeFileSync(INDEX_HTML, newHtml, 'utf8');
    console.log(`Gallery updated with ${videos.length} videos.`);
}

updateIndexHtml();
