# Project Portfolio System

## Overview
The Projects section has been completely redesigned to function as a unified portfolio system with:
- Filterable project grid on the homepage
- Individual case study pages for each project
- Professional case study layout with hero, info, description, deliverables, and gallery

## Filter Tags Available
Projects can be tagged with any of these categories:
- `cgi` - CGI & 3D Visualization
- `animation` - Motion Graphics & Animation
- `vr` - VR Experiences
- `ar` - AR Experiences
- `installation` - Installations & Spatial Design
- `commercial` - Commercial Videos & Advertising
- `interactive` - Interactive Content

## How to Add a New Project

### 1. Add to Projects Grid (index.html)
In the `projects-grid` section, add a new project card:

```html
<div class="project-card" data-tags="cgi,animation,commercial">
    <div class="project-image" style="background: url('assets/[IMAGE].webp') center center / cover no-repeat;">
        <div class="project-overlay">
            <h3>Project Title</h3>
            <p>Short description</p>
            <a href="project-[slug].html" class="project-link">View Project</a>
        </div>
    </div>
</div>
```

### 2. Create Project Page
Use `project-template.html` as a starting point. Copy and rename to `project-[slug].html`.

Key sections:
- **Project Hero**: Large video/image background with title and one-liner
- **Project Info**: Client, Year, Category, Services (4-column grid)
- **Description**: Challenge → Idea → Solution → Result (4 paragraphs)
- **Deliverables**: Bullet list of what was delivered
- **Gallery**: Mixed video and image content
- **Navigation**: Back to Projects button + Next Project button

### 3. Update Filter Tags
The `data-tags` attribute on each card determines which filters show it:
```html
data-tags="cgi,vr,interactive"
```
Multiple tags should be comma-separated with no spaces.

## JavaScript Filter Logic
The filter system works through:
- Click handler on `.filter-btn` elements
- Reads `data-filter` attribute from button
- Compares against `data-tags` on project cards
- Shows/hides cards using `display: none`
- Active button gets highlighted with `.active` class

## CSS Classes

### Homepage Projects
- `.projects` - Main section wrapper
- `.projects-filters` - Filter button container
- `.filter-btn` - Individual filter button
- `.filter-btn.active` - Active filter button state
- `.projects-grid` - Grid of project cards
- `.project-card` - Individual project card
- `.project-image` - Image/video background container
- `.project-overlay` - Text overlay on card

### Project Pages
- `.project-hero` - Hero section with video background
- `.project-hero-content` - Title and subtitle
- `.project-info` - 4-column info grid
- `.project-description` - Main content section
- `.project-deliverables` - Bullet list section
- `.project-gallery` - Gallery grid
- `.project-gallery-item` - Individual gallery item
- `.project-nav` - Navigation buttons

## Responsive Behavior
- Filters stack horizontally with wrapping
- Project grid collapses to single column on mobile
- Project info grid becomes 2-column on mobile
- Gallery adapts to viewport size
- All text scales with viewport

## Video & Image Optimization
- Use `.webp` format for faster loading
- Provide poster images for videos
- Thumbnails should be 800x600px minimum
- Hero videos work best at 16:9 ratio
- Gallery videos should have controls

## Example Project Structure
```
project-[slug].html
├── Hero (video background)
├── Info Block (Client, Year, Category, Services)
├── Description (4 paragraphs)
├── Deliverables (bullet list)
├── Gallery (mixed videos + images)
└── Navigation (Back + Next)
```

## Filter Performance
Filtering is instant and smooth with:
- Fade-in animation on cards
- Active button highlighting
- No page reload required
- Touch-friendly on mobile
