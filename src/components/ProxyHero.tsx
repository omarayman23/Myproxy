import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Shield, Lock, Globe, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProxyHeroProps {
  onStartProxy: (url: string) => void;
}

export function ProxyHero({ onStartProxy }: ProxyHeroProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    let formattedUrl = url.trim();
    
    // Add protocol if missing
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    // Validate URL
    try {
      new URL(formattedUrl);
      onStartProxy(formattedUrl);
    } catch {
      toast.error('Please enter a valid URL');
    }
  };

  const quickLinks = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'YouTube', url: 'https://www.youtube.com' },
    { name: 'Reddit', url: 'https://www.reddit.com' },
    { name: 'Twitter', url: 'https://www.twitter.com' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-gray-900 text-5xl">FreeProxy</h1>
          </div>

          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Free web proxy for anonymous browsing. Access any website securely and privately.
          </p>

          {/* Main Proxy Input */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 max-w-2xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL (e.g., example.com)"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 px-8"
                >
                  Browse
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </form>

          {/* Quick Links */}
          <div className="mb-12">
            <p className="text-gray-500 text-sm mb-3">Quick access:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => onStartProxy(link.url)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-gray-700 text-sm"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Badges */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Anonymous Browsing</h3>
              <p className="text-gray-600 text-sm">
                Hide your real IP address and browse anonymously
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Encrypted Connection</h3>
              <p className="text-gray-600 text-sm">
                All traffic is encrypted for maximum security
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Access Anywhere</h3>
              <p className="text-gray-600 text-sm">
                Works on any device and operating system
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
