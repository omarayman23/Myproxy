import { useState } from 'react';
import { ProxyBrowser } from './components/ProxyBrowser';
import { ProxyHero } from './components/ProxyHero';
import { ProxyFeatures } from './components/ProxyFeatures';
import { ProxyFooter } from './components/ProxyFooter';
import { HowItWorks } from './components/HowItWorks';

export default function App() {
  const [isProxying, setIsProxying] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleStartProxy = (url: string) => {
    setCurrentUrl(url);
    setIsProxying(true);
  };

  const handleStopProxy = () => {
    setIsProxying(false);
    setCurrentUrl('');
  };

  return (
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
  );
}
