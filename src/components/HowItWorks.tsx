import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Code, Server, Lock, Globe, AlertTriangle } from 'lucide-react';

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">How This Free Proxy Works</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            The free proxy is a kind of virtual pipeline, and your traffic flows through it to the destination website. 
            That's why the destination website doesn't see your real network identity.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Globe className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-gray-900">You</p>
              <p className="text-xs text-gray-500">Your device</p>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-green-500"></div>
                <Lock className="w-5 h-5 text-green-600" />
                <div className="w-8 h-0.5 bg-green-500"></div>
              </div>
              <p className="text-xs text-green-600 mt-1">Encrypted</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Server className="w-10 h-10 text-purple-600" />
              </div>
              <p className="text-gray-900">Proxy Server</p>
              <p className="text-xs text-gray-500">Our server</p>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-blue-500"></div>
                <div className="w-8 h-0.5 bg-blue-500"></div>
              </div>
              <p className="text-xs text-blue-600 mt-1">Proxied</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Globe className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-gray-900">Target Website</p>
              <p className="text-xs text-gray-500">Destination</p>
            </div>
          </div>

          <div className="text-center text-gray-600 text-sm max-w-2xl mx-auto">
            For better protection, all traffic to the free proxy is encrypted, ensuring that it remains hidden. 
            In this way, this online proxy cares about your anonymity and privacy. Regardless of whether the 
            destination website supports a secure connection or not, you can be sure that your web traffic 
            will always be protected.
          </div>
        </div>

        {/* Backend Implementation Guide */}
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-900">
            <strong className="block mb-2">⚠️ Backend Implementation Required</strong>
            <p className="text-sm">
              This frontend is ready to use, but you need to add web proxy functionality to your Python server. 
              See the implementation guide below.
            </p>
          </AlertDescription>
        </Alert>

        <Card className="border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              Backend Implementation Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-gray-900 mb-3">Step 1: Add Web Proxy Endpoint</h4>
              <p className="text-gray-600 text-sm mb-3">
                Add this new endpoint to your Python proxy server:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`# Add to your Python proxy server
from urllib.parse import urlparse, urljoin
import requests
from bs4 import BeautifulSoup

@app.route('/proxy')
def web_proxy():
    target_url = request.args.get('url')
    
    if not target_url:
        return "URL parameter required", 400
    
    # Fetch the target website
    response = requests.get(target_url)
    
    # Rewrite all URLs in the HTML
    content = rewrite_urls(response.text, target_url)
    
    return content, response.status_code, response.headers.items()`}
              </pre>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Step 2: URL Rewriting Function</h4>
              <p className="text-gray-600 text-sm mb-3">
                This function rewrites all URLs to go through your proxy:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`def rewrite_urls(html_content, base_url):
    soup = BeautifulSoup(html_content, 'html.parser')
    parsed_base = urlparse(base_url)
    
    # Rewrite all href attributes (links)
    for tag in soup.find_all(['a', 'link']):
        if tag.get('href'):
            original_url = urljoin(base_url, tag['href'])
            tag['href'] = f'/proxy?url={original_url}'
    
    # Rewrite all src attributes (images, scripts)
    for tag in soup.find_all(['img', 'script', 'iframe']):
        if tag.get('src'):
            original_url = urljoin(base_url, tag['src'])
            tag['src'] = f'/proxy?url={original_url}'
    
    # Rewrite CSS urls
    for tag in soup.find_all('style'):
        # Parse and rewrite CSS url() references
        # ... (CSS URL rewriting logic)
    
    return str(soup)`}
              </pre>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Step 3: Handle Different Content Types</h4>
              <p className="text-gray-600 text-sm mb-3">
                You need to handle HTML, CSS, JavaScript, images, and other resources:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`def web_proxy():
    target_url = request.args.get('url')
    response = requests.get(target_url)
    content_type = response.headers.get('Content-Type', '')
    
    # HTML - rewrite URLs
    if 'text/html' in content_type:
        content = rewrite_urls(response.text, target_url)
        return content, response.status_code
    
    # CSS - rewrite url() references
    elif 'text/css' in content_type:
        content = rewrite_css_urls(response.text, target_url)
        return content, response.status_code
    
    # JavaScript - may need URL rewriting
    elif 'javascript' in content_type:
        # Optional: rewrite JS URLs
        return response.content, response.status_code
    
    # Images, videos, etc - pass through
    else:
        return response.content, response.status_code`}
              </pre>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Step 4: Required Python Packages</h4>
              <p className="text-gray-600 text-sm mb-3">
                Install these packages on your server:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`pip install flask requests beautifulsoup4 lxml

# Or if using your existing socket-based proxy:
# You'll need to add HTTP server capabilities
# Consider using Flask or FastAPI alongside your current proxy`}
              </pre>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-blue-900 mb-2">💡 Alternative: Use Flask Framework</h4>
              <p className="text-blue-800 text-sm">
                While your current Python proxy uses raw sockets, web proxying is easier with Flask or FastAPI. 
                You can run both services on different ports:
              </p>
              <ul className="mt-2 text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Port 8080: Your existing HTTP/HTTPS proxy (for browser configuration)</li>
                <li>Port 5000: New Flask app for web-based proxy (for this frontend)</li>
                <li>Port 1080: Your existing SOCKS5 proxy</li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Complete Flask Example</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`# web_proxy.py - Run this alongside your existing proxy
from flask import Flask, request, Response
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

app = Flask(__name__)
CORS(app)  # Allow your frontend to connect

@app.route('/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return 'URL required', 400
    
    try:
        # Fetch target website
        resp = requests.get(url, timeout=10)
        content_type = resp.headers.get('Content-Type', '')
        
        # Rewrite HTML
        if 'text/html' in content_type:
            soup = BeautifulSoup(resp.content, 'html.parser')
            
            # Rewrite links
            for tag in soup.find_all(['a', 'link'], href=True):
                original = urljoin(url, tag['href'])
                tag['href'] = f'/proxy?url={original}'
            
            # Rewrite images, scripts
            for tag in soup.find_all(['img', 'script'], src=True):
                original = urljoin(url, tag['src'])
                tag['src'] = f'/proxy?url={original}'
            
            return str(soup), resp.status_code
        
        # Pass through other content
        return Response(resp.content, 
                       status=resp.status_code,
                       content_type=content_type)
    
    except Exception as e:
        return f'Error: {str(e)}', 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# Run with: python web_proxy.py
# Then update the frontend PROXY_BACKEND variable to your server:5000`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg">What Works Now</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Frontend UI is complete and functional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>URL input and navigation controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Share functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Browser history and back/forward</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Your existing HTTP/HTTPS proxy (port 8080)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Your existing SOCKS5 proxy (port 1080)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg">What You Need to Add</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <span>Web proxy endpoint (/proxy) on your server</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <span>URL rewriting logic for HTML content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <span>Handle different content types (CSS, JS, images)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <span>CORS headers to allow frontend access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  <span>Install Flask + BeautifulSoup4 + requests</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
