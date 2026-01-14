# Netlify + Decap CMS Setup Guide

## Step 1: Update GitHub Configuration
Edit `public/admin/config.yml` and replace:
- `YOUR_GITHUB_USERNAME` with your GitHub username
- `YOUR_NETLIFY_SITE` with your Netlify site URL (after deployment)

Example:
```yaml
repo: johnsmith/Vertex-Capital-Portfolio
base_url: https://vertex-capital.netlify.app
```

## Step 2: Push to GitHub
```bash
git add .
git commit -m "Add Decap CMS configuration"
git push origin main
```

## Step 3: Deploy to Netlify

### Option A: Connect GitHub to Netlify (Recommended)
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Connect GitHub and select this repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"
6. Wait for deployment to complete (3-5 minutes)
7. Copy your Netlify site URL

## Step 4: Configure OAuth
1. In Netlify, go to **Site settings → Access control**
2. Scroll to **OAuth** section
3. Click "Install the Netlify App on GitHub"
4. Select your repository
5. Authorize it

## Step 5: Enable Git Gateway
1. In Netlify dashboard: **Site settings → Build & deploy → Access control**
2. Scroll to **Git Gateway**
3. Click "Enable Git Gateway"
4. Connect it to your GitHub repo

## Step 6: Access Admin Panel
- Go to: `https://your-site.netlify.app/admin`
- Log in with GitHub credentials
- Start managing your portfolio!

## Step 7: Update config.yml with Final URL
Once you have your Netlify site URL, update `base_url` in `public/admin/config.yml`:
```yaml
base_url: https://your-site.netlify.app
```

---

## How It Works

1. **You edit data in admin panel** → `/admin`
2. **Decap CMS saves to GitHub** → `src/data/` folder
3. **Netlify auto-rebuilds** → Your site updates automatically
4. **Portfolio displays updated data** → Instantly on the main site

## Admin Features Available
- ✅ Edit portfolio allocations
- ✅ Manage securities
- ✅ Update risk metrics
- ✅ Modify portfolio settings
- ✅ All changes sync to GitHub

---

## Troubleshooting

**"Error: CMS repository not found"**
- Check GitHub username and repo name in `config.yml`
- Make sure repo is public or you have proper access

**"Admin page shows blank"**
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)

**"Git Gateway not working"**
- Ensure OAuth app is installed in GitHub
- Check Netlify build logs for errors

---

## Next Steps
Once running, you can:
- Add more custom fields to `config.yml`
- Create additional collections for compliance, tactical moves, etc.
- Style the admin interface
- Set up workflow (draft → review → publish)
