import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home, 
  Lock,
  Share2,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface ProxyBrowserProps {
  initialUrl: string;
  onClose: () => void;
}

export function ProxyBrowser({ initialUrl, onClose }: ProxyBrowserProps) {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [displayUrl, setDisplayUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // YOUR BACKEND ENDPOINT - Replace with your actual Google Cloud server IP
  // Example: 'http://35.196.124.59:5000/proxy'
  const PROXY_BACKEND = 'http://142.0.3.5:5000/proxy';

  const handleNavigate = (url: string) => {
    let formattedUrl = url.trim();
    
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      new URL(formattedUrl);
      setCurrentUrl(formattedUrl);
      
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(formattedUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      setLoading(true);
      // Simulate loading
      setTimeout(() => setLoading(false), 1000);
    } catch {
      toast.error('Invalid URL');
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setDisplayUrl(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setDisplayUrl(history[newIndex]);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}?url=${encodeURIComponent(currentUrl)}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
  };

  // The actual proxied content would be loaded here
  // This is a DEMO - you need to implement the backend
  const getProxiedUrl = () => {
    // In production, this would call your backend:
     return `${PROXY_BACKEND}?url=${encodeURIComponent(currentUrl)}`;
    
    // For demo purposes, we'll show an explanation
    
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Browser Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">FreeProxy</span>
            </div>
            
            <div className="flex-1 flex items-center gap-2">
              {/* Navigation Buttons */}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={historyIndex === 0}
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleForward}
                  disabled={historyIndex === history.length - 1}
                  className="text-white hover:bg-white/20"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRefresh}
                  className="text-white hover:bg-white/20"
                >
                  <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <Home className="w-4 h-4" />
                </Button>
              </div>

              {/* URL Bar */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNavigate(displayUrl);
                }}
                className="flex-1"
              >
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <Input
                    type="text"
                    value={displayUrl}
                    onChange={(e) => setDisplayUrl(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 px-0"
                    placeholder="Enter URL..."
                  />
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleShare}
                  className="text-white hover:bg-white/20"
                  title="Share this page"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 overflow-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <RotateCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="h-full p-8 overflow-auto">
            {/* DEMO NOTICE - Remove this when backend is implemented */}
            

            {/* This is where the proxied content would appear */}
            { 
            <iframe 
              src={getProxiedUrl()} 
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-forms"
            /> }
          </div>
        )}
      </div>

      {/* Footer Bar */}
      <div className="bg-gray-900 text-white px-4 py-2 text-xs">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-green-400" />
              Secure Connection
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Your IP is hidden</span>
          </div>
          <div className="text-gray-400">
            Powered by FreeProxy
          </div>
        </div>
      </div>
    </div>
  );
}
