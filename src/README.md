# FreeProxy - Web Proxy Service

A CroxyProxy-style web proxy built with React and Python. Browse any website anonymously and securely.

## 🚀 Features

- **Anonymous Browsing** - Hide your real IP address
- **Encrypted Connections** - All traffic encrypted for security
- **Shareable Links** - Share proxied pages with friends
- **Video & Audio Support** - Full multimedia playback support
- **Cross-Platform** - Works on any device and OS
- **Fast & Reliable** - Optimized for performance

## 📋 Prerequisites

### Frontend (This Project)
- Node.js 18+ and npm

### Backend (Separate Server)
- Python 3.6+
- Flask, requests, beautifulsoup4
- A server (Google Cloud, AWS, DigitalOcean, etc.)

## 🛠️ Setup

### 1. Frontend Deployment (Vercel)

```bash
# Clone or download this repository
git clone <your-repo>
cd freeproxy

# Install dependencies
npm install

# Deploy to Vercel
# Option 1: Using Vercel CLI
npm install -g vercel
vercel

# Option 2: Connect to Vercel via GitHub
# Push to GitHub and connect your repo in Vercel dashboard
```

### 2. Backend Setup

See detailed instructions in `/backend-example/README.md`

**Quick setup:**

```bash
# On your server (Google Cloud, AWS, etc.)
cd /your/server/path

# Copy web_proxy.py from backend-example/
# Install dependencies
pip install flask flask-cors requests beautifulsoup4

# Run the proxy
python3 web_proxy.py
```

### 3. Connect Frontend to Backend

Update `/components/ProxyBrowser.tsx` line 19:

```typescript
const PROXY_BACKEND = 'http://YOUR-SERVER-IP:5000/proxy';
```

Replace `YOUR-SERVER-IP` with your actual server address.

## 🌐 How It Works

```
User → Frontend (Vercel) → Backend (Your Server) → Target Website
                  ↓
            URL Rewriting
                  ↓
           Proxied Content
```

1. User enters a URL in the frontend
2. Frontend sends request to your backend server
3. Backend fetches the website and rewrites all URLs
4. Modified content is returned to the user
5. All links/resources go through your proxy

## 📁 Project Structure

```
├── App.tsx                    # Main React component
├── components/
│   ├── ProxyBrowser.tsx       # Proxy browser interface
│   ├── ProxyHero.tsx          # Landing page hero
│   ├── ProxyFeatures.tsx      # Features section
│   ├── HowItWorks.tsx         # Documentation
│   └── ui/                    # UI components (shadcn)
├── backend-example/
│   ├── web_proxy.py           # Flask backend (COPY TO SERVER)
│   └── README.md              # Backend setup guide
└── styles/
    └── globals.css            # Global styles
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Environment Variables

No environment variables needed for the frontend!

Backend configuration is done directly in the code or via command-line arguments.

## ⚠️ Important Notes

1. **Backend Required**: This frontend requires a backend server to function. Follow the setup in `/backend-example/README.md`

2. **CORS**: Make sure your backend allows CORS from your frontend domain

3. **Firewall**: Open port 5000 on your backend server

4. **Legal**: This is for educational purposes. Users must comply with all applicable laws.

## 🚢 Deployment Checklist

- [ ] Backend server is running (port 5000)
- [ ] Firewall allows port 5000
- [ ] Updated `PROXY_BACKEND` in ProxyBrowser.tsx
- [ ] Tested backend endpoint: `curl http://YOUR-IP:5000/health`
- [ ] Frontend deployed to Vercel
- [ ] Tested end-to-end functionality

## 📖 Documentation

- **Backend Setup**: See `/backend-example/README.md`
- **Frontend Features**: Built-in documentation on the "How It Works" page
- **Python Backend**: Complete Flask implementation in `/backend-example/web_proxy.py`

## 🤝 Contributing

This is a personal/educational project. Feel free to fork and modify!

## 📄 License

For educational purposes only. Use responsibly and legally.

## 🆘 Support

Common issues:

1. **"Backend not configured"**: Update PROXY_BACKEND in ProxyBrowser.tsx
2. **CORS errors**: Enable CORS in your backend (Flask-CORS)
3. **Connection refused**: Check firewall and server status
4. **Slow loading**: Server location or resource limitations

## 🎯 Next Steps

After deployment:

1. Test with simple sites first (example.com)
2. Monitor backend logs for errors
3. Add authentication if needed (backend)
4. Consider CDN for static assets
5. Set up monitoring/logging

---

Built with ❤️ using React, Tailwind CSS, and Flask
