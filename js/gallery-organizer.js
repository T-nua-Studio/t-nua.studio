// Gallery Organizer - Organize videos in rows of 3 with uniform resolution per row
class GalleryOrganizer {
    constructor() {
        this.videos = [];
        this.processedRows = [];
        this.originalContent = null;
        this.fallbackMode = false;
    }

    async init() {
        try {
            console.log('Gallery Organizer: Starting initialization...');
            
            const galleryGrid = document.querySelector('.gallery-grid');
            if (!galleryGrid) {
                console.error('Gallery grid not found!');
                return;
            }
            
            // Store original content
            this.originalContent = galleryGrid.innerHTML;
            const originalItems = galleryGrid.querySelectorAll('.gallery-item');
            console.log('Gallery Organizer: Found', originalItems.length, 'gallery items');
            
            if (originalItems.length === 0) {
                console.warn('No gallery items found');
                return;
            }
            
            // Try to collect video metadata
            await this.collectVideoData();
            
            if (this.videos.length === 0) {
                console.warn('No videos collected, using fallback mode');
                this.useFallbackLayout();
                return;
            }
            
            console.log('Gallery Organizer: Collected', this.videos.length, 'videos');
            this.organizeIntoRows();
            
            if (this.processedRows.length === 0) {
                console.warn('No rows processed, using fallback mode');
                this.useFallbackLayout();
                return;
            }
            
            console.log('Gallery Organizer: Organized into', this.processedRows.length, 'rows');
            this.renderGallery();
            this.setupVideoControls();
            
            console.log('Gallery Organizer: Initialization complete');
        } catch (error) {
            console.error('Gallery Organizer: Error during initialization:', error);
            this.useFallbackLayout();
        }
    }

    useFallbackLayout() {
        console.log('Using fallback layout - organizing existing items into rows');
        this.fallbackMode = true;
        
        const galleryGrid = document.querySelector('.gallery-grid');
        const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
        
        // Clear and reorganize existing items into rows of 3
        galleryGrid.innerHTML = '';
        
        for (let i = 0; i < items.length; i += 3) {
            const rowItems = items.slice(i, i + 3);
            const rowElement = document.createElement('div');
            rowElement.className = 'gallery-row';
            
            rowItems.forEach(item => {
                // Ensure uniform aspect ratio for fallback
                item.style.aspectRatio = '16/9'; // Default aspect ratio
                rowElement.appendChild(item);
            });
            
            galleryGrid.appendChild(rowElement);
        }
        
        this.setupVideoControls();
    }

    restoreOriginalContent() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid && this.originalContent) {
            galleryGrid.innerHTML = this.originalContent;
            console.log('Gallery Organizer: Restored original content');
        }
    }

    async collectVideoData() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        console.log('Found', galleryItems.length, 'gallery items');
        
        for (const item of galleryItems) {
            const video = item.querySelector('video');
            if (video) {
                try {
                    const source = video.querySelector('source');
                    if (!source || !source.src) {
                        console.warn('Video found but no source:', video);
                        continue;
                    }
                    
                    const videoData = await this.getVideoMetadata(video);
                    this.videos.push({
                        element: item,
                        video: video,
                        width: videoData.width,
                        height: videoData.height,
                        aspectRatio: videoData.width / videoData.height,
                        resolution: videoData.width * videoData.height,
                        src: source.src,
                        poster: video.poster || ''
                    });
                    console.log('Added video:', source.src, 'Resolution:', videoData.width + 'x' + videoData.height);
                } catch (error) {
                    console.error('Error processing video:', error);
                }
            }
        }
    }

    getVideoMetadata(video) {
        return new Promise((resolve) => {
            if (video.videoWidth && video.videoHeight) {
                resolve({
                    width: video.videoWidth,
                    height: video.videoHeight
                });
            } else {
                const handleMetadata = () => {
                    resolve({
                        width: video.videoWidth || 1920,
                        height: video.videoHeight || 1080
                    });
                };

                video.addEventListener('loadedmetadata', handleMetadata, { once: true });
                
                // Trigger loading if not already loaded
                if (video.readyState === 0) {
                    video.load();
                }
                
                // Fallback after timeout
                setTimeout(() => {
                    resolve({
                        width: 1920,
                        height: 1080
                    });
                }, 3000);
            }
        });
    }

    organizeIntoRows() {
        // Group videos with similar aspect ratios together
        const aspectRatioGroups = this.groupByAspectRatio(this.videos);
        
        // Create rows of 3 from each group
        aspectRatioGroups.forEach(group => {
            for (let i = 0; i < group.length; i += 3) {
                const rowVideos = group.slice(i, i + 3);
                
                // Find the smallest resolution in this row
                const smallestResolution = Math.min(...rowVideos.map(v => v.resolution));
                const targetVideo = rowVideos.find(v => v.resolution === smallestResolution);
                
                // Calculate target dimensions
                const targetWidth = targetVideo.width;
                const targetHeight = targetVideo.height;
                const targetAspectRatio = targetVideo.aspectRatio;
                
                this.processedRows.push({
                    videos: rowVideos,
                    targetWidth,
                    targetHeight,
                    targetAspectRatio
                });
            }
        });
    }

    groupByAspectRatio(videos) {
        const tolerance = 0.1; // Allow some tolerance for aspect ratio grouping
        const groups = [];
        
        videos.forEach(video => {
            // Find existing group with similar aspect ratio
            let found = false;
            for (const group of groups) {
                if (Math.abs(group[0].aspectRatio - video.aspectRatio) <= tolerance) {
                    group.push(video);
                    found = true;
                    break;
                }
            }
            
            // Create new group if no similar aspect ratio found
            if (!found) {
                groups.push([video]);
            }
        });
        
        return groups;
    }

    renderGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) {
            console.error('Gallery grid not found during render!');
            return;
        }
        
        // Clear existing content
        galleryGrid.innerHTML = '';
        
        if (this.processedRows.length === 0) {
            console.warn('No processed rows to render');
            this.restoreOriginalContent();
            return;
        }
        
        // Create rows
        this.processedRows.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.className = 'gallery-row';
            console.log('Rendering row', rowIndex + 1, 'with', row.videos.length, 'videos');
            
            row.videos.forEach((videoData, videoIndex) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                // Set uniform aspect ratio for all videos in this row
                galleryItem.style.aspectRatio = row.targetAspectRatio.toFixed(3);
                
                // Create video element
                const video = document.createElement('video');
                video.controls = false;
                video.poster = videoData.poster;
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                video.controlsList = 'nodownload noremoteplayback';
                video.oncontextmenu = () => false;
                
                const source = document.createElement('source');
                source.src = videoData.src;
                source.type = 'video/mp4';
                
                video.appendChild(source);
                galleryItem.appendChild(video);
                rowElement.appendChild(galleryItem);
            });
            
            galleryGrid.appendChild(rowElement);
        });
        
        console.log('Gallery rendered with', this.processedRows.length, 'rows');
    }

    setupVideoControls() {
        // Hide video controls by default, show on hover
        document.querySelectorAll('.gallery-item video').forEach(video => {
            video.controls = false;
            
            video.parentElement.addEventListener('mouseenter', () => {
                video.controls = true;
            });
            
            video.parentElement.addEventListener('mouseleave', () => {
                video.controls = false;
            });
        });
    }
}

// Initialize gallery organizer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for gallery...');
    
    // Check if gallery exists before trying to organize
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) {
        console.log('No gallery found, skipping organization');
        return;
    }
    
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) {
        console.log('No gallery items found, skipping organization');
        return;
    }
    
    // Wait a moment for images/videos to start loading
    setTimeout(() => {
        console.log('Starting Gallery Organizer...');
        const galleryOrganizer = new GalleryOrganizer();
        galleryOrganizer.init();
    }, 1000);
});
