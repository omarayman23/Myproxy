import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Alert, AlertDescription } from './ui/alert';
import { BookOpen, Terminal, Globe, Lock, Code, AlertCircle } from 'lucide-react';

export function Documentation() {
  return (
    <section id="docs" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-gray-900 mb-4">Documentation</h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about using this proxy service
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>Get up and running in 3 simple steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                  1
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Get Your Proxy Address</h4>
                  <p className="text-gray-600 text-sm">
                    Copy the proxy server address from the configuration section above. Replace "proxy.example.com" with your actual server address.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                  2
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Choose Your Protocol</h4>
                  <p className="text-gray-600 text-sm">
                    Select HTTP/HTTPS (port 8080) for web browsing or SOCKS5 (port 1080) for all traffic types. SOCKS5 offers more flexibility but requires application support.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                  3
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Configure & Test</h4>
                  <p className="text-gray-600 text-sm">
                    Apply the settings to your application or browser, then test by visiting a website or making an API request. Check your IP to verify it's working.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-gray-900">
                  What's the difference between HTTP and SOCKS5?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <strong>HTTP/HTTPS Proxy (Port 8080):</strong> Designed for web traffic. Understands HTTP protocol and can handle web requests efficiently. Best for browsers and web scraping.
                  <br /><br />
                  <strong>SOCKS5 Proxy (Port 1080):</strong> Protocol-agnostic, works with any type of traffic (HTTP, FTP, SMTP, etc.). More versatile but requires application-level support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-gray-900">
                  Does this proxy support authentication?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Currently, this proxy server does not require authentication. It's designed for educational purposes. For production use, you should implement authentication in the Python code to prevent unauthorized access.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-gray-900">
                  How do I test if the proxy is working?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  After configuring your proxy, visit a site like <code className="bg-gray-100 px-2 py-0.5 rounded">whatismyip.com</code> or <code className="bg-gray-100 px-2 py-0.5 rounded">ifconfig.me</code>. The IP address should match your proxy server's IP, not your local IP. You can also use curl: <code className="bg-gray-100 px-2 py-0.5 rounded">curl -x http://your-proxy:8080 ifconfig.me</code>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-gray-900">
                  Can I use this for production applications?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  This proxy is designed for educational purposes and development/testing. For production use, you should add authentication, rate limiting, logging, and monitoring. Consider using established proxy solutions for production workloads.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-gray-900">
                  What are the system requirements?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  The Python proxy server requires Python 3.6+ and uses only standard library modules (no external dependencies). It can run on any Linux server, including minimal cloud instances. Recommended: 1GB RAM, 1 CPU core for light usage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-gray-900">
                  How do I secure my proxy server?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <strong>Essential security steps:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Configure firewall rules to restrict access by IP</li>
                    <li>Add authentication to the Python code</li>
                    <li>Use HTTPS/SSL for encrypted connections</li>
                    <li>Monitor logs for suspicious activity</li>
                    <li>Implement rate limiting to prevent abuse</li>
                    <li>Keep your server OS and Python updated</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-gray-900">
                  Why is my connection slow?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Proxy speed depends on several factors:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Server location:</strong> Choose a server geographically close to you or your target</li>
                    <li><strong>Server resources:</strong> Ensure adequate CPU and bandwidth</li>
                    <li><strong>Network latency:</strong> Cloud provider network performance varies</li>
                    <li><strong>Concurrent connections:</strong> Too many connections can overwhelm the server</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-gray-900">
                  Can I modify the source code?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Absolutely! The Python code is designed to be educational and modifiable. You can add features like:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Username/password authentication</li>
                    <li>Request/response logging</li>
                    <li>IP whitelisting/blacklisting</li>
                    <li>Bandwidth throttling</li>
                    <li>Traffic filtering and inspection</li>
                    <li>Custom headers injection</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Protocol Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                HTTP/HTTPS Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-gray-900 mb-1">Port</div>
                <code className="text-gray-600 bg-gray-50 px-2 py-1 rounded">8080</code>
              </div>
              <div>
                <div className="text-gray-900 mb-1">Supported Methods</div>
                <div className="text-gray-600">GET, POST, PUT, DELETE, CONNECT</div>
              </div>
              <div>
                <div className="text-gray-900 mb-1">SSL/TLS</div>
                <div className="text-gray-600">HTTPS via CONNECT tunneling</div>
              </div>
              <div>
                <div className="text-gray-900 mb-1">Best For</div>
                <div className="text-gray-600">Web browsers, API requests, web scraping</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                SOCKS5 Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-gray-900 mb-1">Port</div>
                <code className="text-gray-600 bg-gray-50 px-2 py-1 rounded">1080</code>
              </div>
              <div>
                <div className="text-gray-900 mb-1">Protocol Version</div>
                <div className="text-gray-600">SOCKS5 (RFC 1928)</div>
              </div>
              <div>
                <div className="text-gray-900 mb-1">Address Types</div>
                <div className="text-gray-600">IPv4, Domain names</div>
              </div>
              <div>
                <div className="text-gray-900 mb-1">Best For</div>
                <div className="text-gray-600">All traffic types, SSH tunnels, torrenting</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-900">
            <strong>Important:</strong> This proxy is for educational and testing purposes. Always comply with applicable laws, 
            website terms of service, and ethical guidelines when using proxy servers. Misuse of proxy servers can violate 
            laws and terms of service. Use responsibly.
          </AlertDescription>
        </Alert>

        {/* Advanced Topics */}
        <Card className="mt-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Code className="w-5 h-5 text-green-600" />
              Advanced Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="text-gray-900 mb-2">Environment Variables</h4>
              <p className="text-gray-600 mb-2">
                Most applications respect these standard environment variables for proxy configuration:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`export http_proxy="http://your-proxy:8080"
export https_proxy="http://your-proxy:8080"
export all_proxy="socks5://your-proxy:1080"
export no_proxy="localhost,127.0.0.1,.local"`}
              </pre>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Proxy Auto-Config (PAC)</h4>
              <p className="text-gray-600 mb-2">
                For enterprise deployments, you can create a PAC file to automatically configure proxies:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`function FindProxyForURL(url, host) {
  if (shExpMatch(host, "*.local")) {
    return "DIRECT";
  }
  return "PROXY your-proxy:8080; SOCKS5 your-proxy:1080";
}`}
              </pre>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Docker Deployment</h4>
              <p className="text-gray-600 mb-2">
                You can containerize the proxy server for easy deployment:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`FROM python:3.11-slim
COPY proxy.py /app/proxy.py
WORKDIR /app
EXPOSE 8080 1080
CMD ["python3", "proxy.py"]`}
              </pre>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Troubleshooting</h4>
              <div className="text-gray-600 space-y-2">
                <p><strong>Connection refused:</strong> Check if the proxy server is running and ports are open in firewall</p>
                <p><strong>Timeout errors:</strong> Verify network connectivity between client and proxy server</p>
                <p><strong>SSL errors:</strong> Some applications may require SSL certificate configuration</p>
                <p><strong>DNS issues:</strong> SOCKS5 can perform DNS resolution on the proxy server side</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
