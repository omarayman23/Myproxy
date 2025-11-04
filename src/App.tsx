import { useState, useEffect } from 'react';
import { ProxyBrowser } from './components/ProxyBrowser';
import { ProxyHero } from './components/ProxyHero';
import { ProxyFeatures } from './components/ProxyFeatures';
import { ProxyFooter } from './components/ProxyFooter';
import { HowItWorks } from './components/HowItWorks';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isProxying, setIsProxying] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // Check for URL parameter on load (for shareable links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    if (urlParam) {
      handleStartProxy(urlParam);
    }
  }, []);

  const handleStartProxy = (url: string) => {
    setCurrentUrl(url);
    setIsProxying(true);
    
    // Update URL without page reload for sharing
    const newUrl = `${window.location.pathname}?url=${encodeURIComponent(url)}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleStopProxy = () => {
    setIsProxying(false);
    setCurrentUrl('');
    
    // Clear URL parameter
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {!isProxying ? (
          <>
            <ProxyHero onStartProxy={handleStartProxy} />
            <ProxyFeatures />
            <HowItWorks />
            <ProxyFooter />
          </>
        ) : (
          <ProxyBrowser 
            initialUrl={currentUrl}
            onClose={handleStopProxy}
          />
        )}
      </div>
      <Toaster position="top-center" richColors />
    </>
  );
}
