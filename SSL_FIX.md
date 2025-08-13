# SSL Certificate Fix for t-nua.studio

## Problem Analysis
The SSL error "bad_content_encoding" on `t-nua.studio` indicates:
1. **Apex domain** (`t-nua.studio`) is not properly configured
2. **Subdomain** (`www.t-nua.studio`) might be working correctly
3. SSL certificate is not valid for the apex domain

## Current Configuration
- CNAME file: `www.t-nua.studio` ✅ (correct)
- Error domain: `t-nua.studio` (apex domain)

## Solution: Fix DNS Records

### Option A: Redirect Apex to WWW (Recommended)
Configure your DNS provider to redirect `t-nua.studio` → `www.t-nua.studio`:

**DNS Records Needed:**
```
Type    Name            Value                   TTL
A       t-nua.studio    185.199.108.153        3600
A       t-nua.studio    185.199.109.153        3600
A       t-nua.studio    185.199.110.153        3600
A       t-nua.studio    185.199.111.153        3600
CNAME   www             t-nua-studio.github.io  3600
```

### Option B: Use Only Apex Domain
If you prefer `t-nua.studio` (without www):

1. **Update CNAME file:**
```bash
# Change CNAME content to:
t-nua.studio
```

2. **DNS Records for Apex:**
```
Type    Name            Value                   TTL
A       @               185.199.108.153        3600
A       @               185.199.109.153        3600
A       @               185.199.110.153        3600
A       @               185.199.111.153        3600
```

## Quick Fix Steps

### Step 1: Choose Your Preferred Domain
- `www.t-nua.studio` (current setup) - **Recommended**
- `t-nua.studio` (apex only)

### Step 2: Configure DNS (for current www setup)
In your domain provider's DNS panel:

1. **Delete any existing A records for t-nua.studio**
2. **Add GitHub Pages A records:**
   ```
   A    @    185.199.108.153
   A    @    185.199.109.153  
   A    @    185.199.110.153
   A    @    185.199.111.153
   ```
3. **Add CNAME record:**
   ```
   CNAME    www    t-nua-studio.github.io
   ```

### Step 3: GitHub Pages Settings
1. Go to: https://github.com/T-nua-Studio/t-nua.studio/settings/pages
2. Custom domain: `www.t-nua.studio`
3. ✅ Enable "Enforce HTTPS"
4. Wait 24-48 hours for SSL to propagate

### Step 4: Test
After DNS propagation (up to 24 hours):
- `https://www.t-nua.studio` ✅ Should work with SSL
- `https://t-nua.studio` ✅ Should redirect to www version

## Common DNS Providers

### Cloudflare
- A records: Use "DNS only" (gray cloud)
- CNAME: Use "DNS only" for setup, then enable proxy if needed

### Namecheap
- Host: `@` for apex, `www` for subdomain
- Value: Use GitHub's IP addresses

### GoDaddy
- Name: `@` for apex, `www` for subdomain  
- Value: GitHub Pages IPs

## Verification Commands
```bash
# Check DNS propagation
nslookup www.t-nua.studio
nslookup t-nua.studio

# Check SSL certificate
curl -I https://www.t-nua.studio
```

## Expected Timeline
- DNS changes: 1-24 hours
- SSL certificate: 24-48 hours after DNS
- Full propagation: Up to 48 hours

The SSL error should resolve once proper DNS records are configured and propagated.
