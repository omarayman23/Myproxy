import { useState } from 'react';
import { ProxyDashboard } from './components/ProxyDashboard';
import { SetupInstructions } from './components/SetupInstructions';
import { ConnectionStatus } from './components/ConnectionStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Server, Shield, Settings } from 'lucide-react';

export default function App() {
  const [proxyHost, setProxyHost] = useState('your-server.com'); // User should replace with their actual host

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-white">Multi-Protocol Proxy Server</h1>
              <p className="text-slate-400 text-sm">HTTP/HTTPS & SOCKS5 Proxy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 mb-8">
          {/* Connection Status */}
          <ConnectionStatus host={proxyHost} />

          {/* Proxy Dashboard */}
          <ProxyDashboard host={proxyHost} onHostChange={setProxyHost} />
        </div>

        {/* Setup Instructions Tabs */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-5 h-5 text-blue-400" />
            <h2 className="text-white">Setup Instructions</h2>
          </div>
          
          <Tabs defaultValue="browser" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="browser">Browser</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="system">System Wide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browser">
              <SetupInstructions type="browser" host={proxyHost} />
            </TabsContent>
            
            <TabsContent value="curl">
              <SetupInstructions type="curl" host={proxyHost} />
            </TabsContent>
            
            <TabsContent value="python">
              <SetupInstructions type="python" host={proxyHost} />
            </TabsContent>
            
            <TabsContent value="system">
              <SetupInstructions type="system" host={proxyHost} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-amber-200 text-sm">
            ⚠️ <strong>Important:</strong> This proxy is for educational purposes only. Ensure you comply with all applicable laws and terms of service when using this proxy server.
          </p>
        </div>
      </main>
    </div>
  );
}
