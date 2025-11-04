# Backend Setup Instructions

## ⚠️ IMPORTANT: This folder is just a reference!

**DO NOT run these files in this frontend project.**

These Python files should be copied to your **Google Cloud server** where your existing `proxy.py` is running.

---

## 📋 Step-by-Step Setup

### 1. On Your Google Cloud Server

```bash
# SSH into your server
ssh your-username@your-server-ip

# Navigate to your proxy directory (where your proxy.py is)
cd /path/to/your/proxy

# Create the new web proxy file
nano web_proxy.py
# (Copy the contents from backend-example/web_proxy.py)

# Install required packages
pip3 install flask flask-cors requests beautifulsoup4

# Or use a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors requests beautifulsoup4
```

### 2. Open Firewall Port

```bash
# For Google Cloud (using gcloud command)
gcloud compute firewall-rules create allow-web-proxy \
    --allow tcp:5000 \
    --source-ranges 0.0.0.0/0 \
    --description "Allow web proxy on port 5000"

# Or if using ufw
sudo ufw allow 5000/tcp
```

### 3. Run the Web Proxy

```bash
# Test it first
python3 web_proxy.py

# For production, use a process manager like systemd or supervisor
# Or run in background with nohup
nohup python3 web_proxy.py > web_proxy.log 2>&1 &
```

### 4. Test It Works

```bash
# From your local machine, test the endpoint
curl "http://YOUR-SERVER-IP:5000/proxy?url=https://example.com"

# You should see HTML content
```

### 5. Update Frontend

In this project, edit `/components/ProxyBrowser.tsx`:

```typescript
// Line ~19 - Change this to your actual server
const PROXY_BACKEND = 'http://YOUR-SERVER-IP:5000/proxy';

// For example:
// const PROXY_BACKEND = 'http://34.123.45.67:5000/proxy';
```

---

## 🏗️ Complete Setup Overview

```
┌──────────────────────────────┐
│  Google Cloud Server         │
│  IP: 34.123.45.67            │
├──────────────────────────────┤
│  Port 8080: HTTP/HTTPS proxy │  ← Your existing proxy.py
│  Port 1080: SOCKS5 proxy     │  ← Your existing proxy.py
│  Port 5000: Web proxy        │  ← NEW web_proxy.py
└──────────────────────────────┘
         ↑
         │ HTTP requests
         │
┌──────────────────────────────┐
│  Frontend (This Project)     │
│  Deployed on Vercel/Netlify  │
│  Users visit in browser      │
└──────────────────────────────┘
```

---

## 🔧 Running Both Proxies

You'll have TWO Python scripts running:

1. **proxy.py** (your existing one)
   - Ports: 8080, 1080
   - For browser configuration
   
2. **web_proxy.py** (new Flask app)
   - Port: 5000
   - For CroxyProxy-style browsing

Run them both:

```bash
# Terminal 1 - Your existing proxy
python3 proxy.py

# Terminal 2 - New web proxy
python3 web_proxy.py
```

Or use a process manager:

```bash
# Using screen
screen -S existing-proxy
python3 proxy.py
# Press Ctrl+A then D to detach

screen -S web-proxy
python3 web_proxy.py
# Press Ctrl+A then D to detach
```

---

## 🚀 Production Deployment

For production, use systemd:

```bash
# Create service file for web proxy
sudo nano /etc/systemd/system/web-proxy.service
```

```ini
[Unit]
Description=Web Proxy Service
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/your/proxy
ExecStart=/usr/bin/python3 /path/to/your/proxy/web_proxy.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl enable web-proxy
sudo systemctl start web-proxy

# Check status
sudo systemctl status web-proxy
```

---

## 📝 Summary

1. ✅ Copy `web_proxy.py` to your Google Cloud server
2. ✅ Install packages: `pip install flask flask-cors requests beautifulsoup4`
3. ✅ Open port 5000 in firewall
4. ✅ Run `python3 web_proxy.py`
5. ✅ Update `PROXY_BACKEND` in `/components/ProxyBrowser.tsx`
6. ✅ Deploy this frontend to Vercel/Netlify
7. ✅ Visit your frontend URL and start browsing!

---

## ❓ Need Help?

- Backend not starting? Check: `python3 --version` (need 3.6+)
- Can't connect? Check firewall: `sudo ufw status`
- Errors? Check logs: `tail -f web_proxy.log`
