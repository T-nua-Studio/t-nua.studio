# Deployment Guide for T-NUA Studio Website

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it something like `tnua-studio-website` or `portfolio`
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

## Step 2: Push Your Code to GitHub

Run these commands in your terminal:

```powershell
# Add all files to git
git add .

# Make your first commit
git commit -m "Initial commit: T-NUA Studio website"

# Add your GitHub repository as origin (replace with your actual GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`

## Step 4: Configure Custom Domain (Optional)

Since you want to use `www.t-nua.studio`:

### In GitHub:
1. In Pages settings, add `www.t-nua.studio` in the "Custom domain" field
2. Enable "Enforce HTTPS"

### With Your Domain Provider:
Add these DNS records:

**Option A: CNAME Record (Recommended)**
- Type: CNAME
- Name: www
- Value: YOUR_USERNAME.github.io

**Option B: A Records**
- Type: A
- Name: @
- Value: 185.199.108.153
- Repeat for: 185.199.109.153, 185.199.110.153, 185.199.111.153

**For www subdomain:**
- Type: CNAME
- Name: www
- Value: YOUR_USERNAME.github.io

## Step 5: Verify Deployment

1. Wait 5-10 minutes for DNS propagation
2. Visit your website at your custom domain
3. Check that HTTPS is working

## Updating Your Website

To make changes:

1. Edit your files locally
2. Test locally by opening `index.html` in your browser
3. Commit and push changes:

```powershell
git add .
git commit -m "Update: describe your changes"
git push
```

GitHub Pages will automatically rebuild and deploy your changes.

## Troubleshooting

### Common Issues:

1. **Site not loading**: Check if GitHub Pages is enabled and the source branch is correct
2. **Custom domain not working**: Verify DNS records and wait for propagation (up to 24 hours)
3. **HTTPS certificate issues**: Make sure "Enforce HTTPS" is enabled in GitHub Pages settings

### DNS Verification:
Use online tools like `whatsmydns.net` to check if your DNS records are propagated worldwide.

## Performance Optimization

After deployment, consider:

1. **Optimize images**: Use tools like TinyPNG or convert to WebP format
2. **Add analytics**: Google Analytics or similar
3. **SEO optimization**: Add meta descriptions, structured data
4. **Add sitemap.xml** for better search engine indexing

## Next Steps

1. Replace placeholder content with your actual projects
2. Add real client logos to `assets/clients/`
3. Integrate with a contact form service like Formspree or Netlify Forms
4. Add your actual project images and videos
5. Consider adding a blog section for SEO

Your modern portfolio website is now ready to replace your WordPress site!
