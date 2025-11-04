import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Copy, Check, Terminal, Code, Globe, Settings } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ProxyConfig() {
  const [proxyHost, setProxyHost] = useState('proxy.example.com');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const configs = {
    http: {
      icon: Globe,
      title: 'HTTP/HTTPS Configuration',
      description: 'Configure your application to use HTTP/HTTPS proxy',
      code: `HTTP Proxy:  ${proxyHost}:8080
HTTPS Proxy: ${proxyHost}:8080

# Environment Variables
export http_proxy="http://${proxyHost}:8080"
export https_proxy="http://${proxyHost}:8080"

# cURL Example
curl -x http://${proxyHost}:8080 https://api.example.com`
    },
    socks: {
      icon: Terminal,
      title: 'SOCKS5 Configuration',
      description: 'Use SOCKS5 protocol for maximum compatibility',
      code: `SOCKS5 Proxy: ${proxyHost}:1080

# Environment Variable
export ALL_PROXY="socks5://${proxyHost}:1080"

# cURL Example
curl --socks5 ${proxyHost}:1080 https://api.example.com

# SSH Tunnel
ssh -D 1080 -N -f user@${proxyHost}`
    },
    python: {
      icon: Code,
      title: 'Python Integration',
      description: 'Quick integration with Python requests',
      code: `import requests

# HTTP/HTTPS Proxy
proxies = {
    'http': 'http://${proxyHost}:8080',
    'https': 'http://${proxyHost}:8080',
}

response = requests.get('https://api.example.com', proxies=proxies)

# SOCKS5 Proxy (requires: pip install requests[socks])
proxies = {
    'http': 'socks5://${proxyHost}:1080',
    'https': 'socks5://${proxyHost}:1080',
}

response = requests.get('https://api.example.com', proxies=proxies)`
    },
    browser: {
      icon: Settings,
      title: 'Browser Setup',
      description: 'Configure your web browser proxy settings',
      code: `Chrome/Edge:
Settings → System → Open proxy settings
→ Manual proxy configuration
→ HTTP Proxy: ${proxyHost}:8080

Firefox:
Preferences → Network Settings
→ Manual proxy configuration
→ HTTP Proxy: ${proxyHost}:8080
→ SOCKS Host: ${proxyHost}:1080
→ SOCKS v5

Safari:
Preferences → Advanced → Proxies
→ Web Proxy (HTTP): ${proxyHost}:8080
→ Secure Web Proxy (HTTPS): ${proxyHost}:8080`
    }
  };

  return (
    <section id="proxy-config" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Quick Setup Guide</h2>
          <p className="text-gray-600 text-lg mb-8">
            Get started in minutes with our simple configuration
          </p>

          {/* Proxy Host Input */}
          <div className="max-w-md mx-auto mb-8">
            <Label htmlFor="proxy-host" className="text-gray-700 mb-2 block text-left">
              Your Proxy Server
            </Label>
            <div className="flex gap-2">
              <Input
                id="proxy-host"
                value={proxyHost}
                onChange={(e) => setProxyHost(e.target.value)}
                placeholder="proxy.example.com"
                className="bg-white border-gray-300"
              />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(proxyHost, 'host')}
                className="shrink-0"
              >
                {copied === 'host' ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-left">
              Replace with your actual proxy server address
            </p>
          </div>
        </div>

        {/* Configuration Tabs */}
        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Configuration Examples</CardTitle>
            <CardDescription>Choose your platform and copy the configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="http" className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full bg-gray-100">
                {Object.entries(configs).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <TabsTrigger key={key} value={key} className="gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{key.toUpperCase()}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.entries(configs).map(([key, config]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-900 mb-1">{config.title}</h3>
                      <p className="text-gray-600 text-sm">{config.description}</p>
                    </div>

                    <div className="relative">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(config.code, key)}
                        className="absolute top-3 right-3 z-10 bg-white"
                      >
                        {copied === key ? (
                          <>
                            <Check className="w-4 h-4 mr-1 text-green-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>{config.code}</code>
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Reference Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                HTTP/HTTPS Proxy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Endpoint</div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                    <code className="text-sm text-gray-900">{proxyHost}:8080</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(`${proxyHost}:8080`, 'http-endpoint')}
                    >
                      {copied === 'http-endpoint' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  • Supports HTTP and HTTPS<br />
                  • Automatic SSL handling<br />
                  • No authentication required
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-600" />
                SOCKS5 Proxy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Endpoint</div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                    <code className="text-sm text-gray-900">{proxyHost}:1080</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(`${proxyHost}:1080`, 'socks-endpoint')}
                    >
                      {copied === 'socks-endpoint' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  • SOCKS5 protocol<br />
                  • All traffic types<br />
                  • No authentication required
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
