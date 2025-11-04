#!/usr/bin/env python3
"""
Web Proxy Server for CroxyProxy-style browsing
This should run on your Google Cloud server alongside your existing proxy.py

Installation:
    pip install flask flask-cors requests beautifulsoup4

Usage:
    python3 web_proxy.py

This runs on port 5000 by default.
Your existing proxy.py continues running on ports 8080 and 1080.
"""

from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

app = Flask(__name__)
CORS(app)  # Allow frontend to connect from any domain

# Configuration
TIMEOUT = 10  # Request timeout in seconds
MAX_CONTENT_SIZE = 10 * 1024 * 1024  # 10MB max response size

@app.route('/')
def index():
    return jsonify({
        'status': 'running',
        'message': 'Web Proxy Server is running',
        'endpoints': {
            'proxy': '/proxy?url=<target_url>'
        }
    })

@app.route('/proxy')
def proxy():
    """
    Main proxy endpoint that fetches and rewrites content
    Usage: /proxy?url=https://example.com
    """
    target_url = request.args.get('url')
    
    if not target_url:
        return jsonify({'error': 'URL parameter required'}), 400
    
    # Validate URL
    try:
        parsed = urlparse(target_url)
        if not parsed.scheme or not parsed.netloc:
            return jsonify({'error': 'Invalid URL format'}), 400
    except Exception as e:
        return jsonify({'error': f'Invalid URL: {str(e)}'}), 400
    
    try:
        # Prepare headers (mimic a real browser)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        }
        
        # Fetch the target URL
        print(f"Fetching: {target_url}")
        response = requests.get(
            target_url, 
            headers=headers, 
            timeout=TIMEOUT,
            stream=True,
            verify=True,
            allow_redirects=True
        )
        
        content_type = response.headers.get('Content-Type', '').lower()
        
        # Handle HTML content - needs URL rewriting
        if 'text/html' in content_type:
            return handle_html(response, target_url)
        
        # Handle CSS - needs URL rewriting
        elif 'text/css' in content_type:
            return handle_css(response, target_url)
        
        # Handle JavaScript - pass through (could add URL rewriting)
        elif 'javascript' in content_type or 'json' in content_type:
            return Response(
                response.content,
                status=response.status_code,
                headers=dict(response.headers)
            )
        
        # Handle images, videos, fonts, etc - pass through
        else:
            return Response(
                response.content,
                status=response.status_code,
                headers=dict(response.headers)
            )
    
    except requests.exceptions.Timeout:
        return jsonify({'error': 'Request timeout'}), 504
    except requests.exceptions.TooManyRedirects:
        return jsonify({'error': 'Too many redirects'}), 508
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Request failed: {str(e)}'}), 502
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500


def handle_html(response, base_url):
    """
    Parse HTML and rewrite all URLs to go through proxy
    """
    try:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Rewrite <a> and <link> href attributes
        for tag in soup.find_all(['a', 'link'], href=True):
            original_url = urljoin(base_url, tag['href'])
            tag['href'] = f'/proxy?url={original_url}'
        
        # Rewrite <img>, <script>, <iframe> src attributes
        for tag in soup.find_all(['img', 'script', 'iframe', 'embed'], src=True):
            original_url = urljoin(base_url, tag['src'])
            tag['src'] = f'/proxy?url={original_url}'
        
        # Rewrite <video> and <audio> sources
        for tag in soup.find_all(['video', 'audio']):
            if tag.get('src'):
                original_url = urljoin(base_url, tag['src'])
                tag['src'] = f'/proxy?url={original_url}'
            
            # Handle <source> tags inside video/audio
            for source in tag.find_all('source', src=True):
                original_url = urljoin(base_url, source['src'])
                source['src'] = f'/proxy?url={original_url}'
        
        # Rewrite form actions
        for tag in soup.find_all('form', action=True):
            original_url = urljoin(base_url, tag['action'])
            tag['action'] = f'/proxy?url={original_url}'
        
        # Rewrite CSS in style attributes
        for tag in soup.find_all(style=True):
            tag['style'] = rewrite_css_urls(tag['style'], base_url)
        
        # Rewrite CSS in <style> tags
        for tag in soup.find_all('style'):
            if tag.string:
                tag.string = rewrite_css_urls(tag.string, base_url)
        
        # Add base tag to help with relative URLs
        if not soup.find('base'):
            base_tag = soup.new_tag('base', href=base_url)
            if soup.head:
                soup.head.insert(0, base_tag)
        
        # Inject a notice banner (optional - remove if you don't want it)
        notice = soup.new_tag('div', style='background:#1e40af;color:white;padding:10px;text-align:center;font-family:sans-serif;')
        notice.string = f'🔒 Browsing through FreeProxy | Original URL: {base_url}'
        if soup.body:
            soup.body.insert(0, notice)
        
        html_content = str(soup)
        
        return Response(
            html_content,
            status=response.status_code,
            content_type='text/html; charset=utf-8'
        )
    
    except Exception as e:
        print(f"HTML processing error: {str(e)}")
        return Response(response.content, status=response.status_code)


def handle_css(response, base_url):
    """
    Rewrite URLs in CSS files
    """
    try:
        css_content = response.text
        rewritten = rewrite_css_urls(css_content, base_url)
        
        return Response(
            rewritten,
            status=response.status_code,
            content_type='text/css; charset=utf-8'
        )
    except Exception as e:
        print(f"CSS processing error: {str(e)}")
        return Response(response.content, status=response.status_code)


def rewrite_css_urls(css_text, base_url):
    """
    Rewrite url() references in CSS
    """
    def replace_url(match):
        original_url = match.group(1).strip('\'"')
        if original_url.startswith('data:'):
            return match.group(0)
        
        absolute_url = urljoin(base_url, original_url)
        return f'url("/proxy?url={absolute_url}")'
    
    # Match url(...) in CSS
    pattern = r'url\([\'"]?([^\'")]+)[\'"]?\)'
    return re.sub(pattern, replace_url, css_text)


@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'web-proxy'}), 200


if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Web Proxy Server Starting...")
    print("=" * 60)
    print("📡 Server will run on: http://0.0.0.0:5000")
    print("📝 Proxy endpoint: http://0.0.0.0:5000/proxy?url=<target_url>")
    print("💡 Health check: http://0.0.0.0:5000/health")
    print("")
    print("⚠️  Make sure to:")
    print("   1. Open port 5000 in your firewall")
    print("   2. Update frontend PROXY_BACKEND to your server IP")
    print("   3. Keep your existing proxy.py running on ports 8080/1080")
    print("=" * 60)
    print("")
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',  # Listen on all interfaces
        port=5000,
        debug=False,  # Set to True for development
        threaded=True  # Handle multiple requests
    )
