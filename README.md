# T-NUA Studio Portfolio Website

A modern, responsive portfolio website for T-NUA Studio showcasing CGI, animation, and VR experiences.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on all devices and screen sizes
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **GitHub Pages Ready**: Easy deployment to GitHub Pages

## Sections

- **Hero**: Eye-catching introduction with animated elements
- **Featured Project**: Highlighted "Show. Don't Tell" project
- **Services**: CGI Videos, Animation, and VR Experiences
- **Projects**: Portfolio showcase with hover effects
- **Gallery**: Visual portfolio grid
- **Clients**: Trusted client logos
- **Contact**: Contact form for new project inquiries

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Google Fonts (Inter)

## Setup for GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings
3. Navigate to Pages section
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your site will be available at `https://yourusername.github.io/repository-name`

## Custom Domain Setup

To use your custom domain (t-nua.studio):

1. Create a `CNAME` file in the root directory with your domain
2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub Pages IPs

## File Structure

```
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   └── script.js      # JavaScript functionality
├── assets/
│   ├── logo.png       # Site logo
│   └── clients/       # Client logos
└── README.md          # This file
```

## Customization

### Adding Projects
Edit the projects section in `index.html` and add corresponding images to the assets folder.

### Updating Client Logos
Add client logos to `assets/clients/` and update the HTML accordingly.

### Modifying Colors
The color scheme uses CSS custom properties. Main colors:
- Primary gradient: `#ff6b6b` to `#4ecdc4`
- Background: `#0a0a0a`
- Text: `#ffffff`

### Adding Content
- Replace placeholder content in `index.html`
- Add actual project images and videos
- Update contact form action for form processing

## Performance Tips

- Optimize images (use WebP format when possible)
- Add lazy loading for images below the fold
- Consider implementing a CDN for assets
- Enable compression in your hosting environment

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 T-NUA Studio. All Rights Reserved.
