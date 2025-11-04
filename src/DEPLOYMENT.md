# 🚀 Deployment Guide for Vercel

## Quick Deploy to Vercel (5 minutes)

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/freeproxy.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! ✅

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? freeproxy
# - In which directory is your code? ./
# - Want to override settings? N

# Deploy to production
vercel --prod
```

## ⚙️ Vercel Configuration

The project includes a `vercel.json` file with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

No additional configuration needed!

## 🔗 After Deployment

### 1. Note Your Frontend URL
After deployment, Vercel gives you a URL like:
```
https://freeproxy.vercel.app
```

### 2. Set Up Backend

**On your Google Cloud server:**

```bash
# Copy web_proxy.py from backend-example/
cd /your/server/directory

# Install dependencies
pip3 install flask flask-cors requests beautifulsoup4

# Run the backend
python3 web_proxy.py

# Keep it running with nohup
nohup python3 web_proxy.py > web_proxy.log 2>&1 &
```

### 3. Update PROXY_BACKEND

In your deployed site, you need to update the backend URL:

**Method 1: Redeploy with correct URL**
1. Edit `/components/ProxyBrowser.tsx` line 19
2. Change: `const PROXY_BACKEND = 'http://YOUR-SERVER-IP:5000/proxy';`
3. To: `const PROXY_BACKEND = 'http://34.123.45.67:5000/proxy';`
4. Commit and push to trigger auto-deploy

**Method 2: Use Environment Variable (Advanced)**
1. In Vercel dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_PROXY_BACKEND` = `http://34.123.45.67:5000/proxy`
3. Update ProxyBrowser.tsx to use: `import.meta.env.VITE_PROXY_BACKEND`
4. Redeploy

## ✅ Deployment Checklist

Before going live, check these:

### Frontend (Vercel)
- [x] Code pushed to GitHub
- [x] Connected to Vercel
- [x] Deployment successful
- [x] Can access the site
- [x] No build errors

### Backend (Your Server)
- [ ] Server is running (Google Cloud, AWS, etc.)
- [ ] Port 5000 is open in firewall
- [ ] Flask dependencies installed
- [ ] `web_proxy.py` is running
- [ ] Test endpoint: `curl http://YOUR-IP:5000/health`
- [ ] Returns: `{"status": "healthy"}`

### Integration
- [ ] Updated `PROXY_BACKEND` with your server IP
- [ ] CORS is enabled in backend
- [ ] Test a simple site (example.com)
- [ ] Share link works
- [ ] No CORS errors in console

## 🧪 Testing Your Deployment

### 1. Test Backend Directly
```bash
# From your local machine
curl "http://YOUR-SERVER-IP:5000/health"
# Expected: {"status": "healthy", "service": "web-proxy"}

# Test proxy endpoint
curl "http://YOUR-SERVER-IP:5000/proxy?url=https://example.com"
# Expected: HTML content
```

### 2. Test Frontend
- Visit your Vercel URL
- Enter `example.com` in the proxy field
- Click "Browse"
- Should load the proxied content

### 3. Test Share Feature
- Proxy any site
- Click the share button
- Copy the URL
- Open in new tab/incognito
- Should load the same proxied page

## 🔧 Troubleshooting

### Build Fails on Vercel
```bash
# Locally test the build
npm run build

# If it works locally but fails on Vercel:
# - Check Node.js version (should be 18+)
# - Clear Vercel cache and redeploy
```

### CORS Errors
Make sure your `web_proxy.py` has:
```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # This is critical!
```

### "Backend not configured" Error
1. Check `/components/ProxyBrowser.tsx` line 19
2. Make sure IP is correct: `http://34.123.45.67:5000/proxy`
3. No trailing slash
4. Include `/proxy` at the end

### Connection Refused
```bash
# On your server, check if proxy is running
ps aux | grep web_proxy

# Check if port is listening
netstat -tlnp | grep 5000

# Check firewall
sudo ufw status
sudo ufw allow 5000/tcp
```

## 🎯 Production Optimizations

### Use a Process Manager on Backend
```bash
# Install PM2
npm install -g pm2

# Or use systemd
sudo nano /etc/systemd/system/web-proxy.service
```

### Enable HTTPS on Backend
Use Nginx as reverse proxy with Let's Encrypt SSL:
```nginx
server {
    listen 443 ssl;
    server_name yourserver.com;
    
    ssl_certificate /etc/letsencrypt/live/yourserver.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourserver.com/privkey.pem;
    
    location /proxy {
        proxy_pass http://localhost:5000;
    }
}
```

Then update PROXY_BACKEND to:
```typescript
const PROXY_BACKEND = 'https://yourserver.com/proxy';
```

### Monitor Performance
- Vercel Analytics (built-in)
- Backend logs: `tail -f web_proxy.log`
- Error tracking (Sentry, LogRocket)

## 📊 Expected Costs

- **Vercel**: Free (Hobby plan)
- **Backend Server**: 
  - Google Cloud: ~$5-10/month (e2-micro)
  - DigitalOcean: $5/month (basic droplet)
  - AWS: ~$5-10/month (t2.micro)

## 🔄 Updating Your Site

```bash
# Make changes locally
# Test: npm run dev

# Commit and push
git add .
git commit -m "Update feature"
git push

# Vercel auto-deploys! ✨
```

## 🆘 Need Help?

1. Check Vercel deployment logs
2. Check backend logs: `tail -f web_proxy.log`
3. Check browser console (F12)
4. Test backend separately
5. Verify firewall rules

---

## 🎉 You're Ready!

Once everything is checked:
1. Share your Vercel URL
2. Users can browse anonymously
3. Monitor usage and performance
4. Enjoy your web proxy!

**Your URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend: `http://your-server-ip:5000`
- Share links: `https://your-project.vercel.app?url=<website>`
