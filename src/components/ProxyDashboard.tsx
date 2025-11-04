import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Copy, Check, Globe, Lock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ProxyDashboardProps {
  host: string;
  onHostChange: (host: string) => void;
}

export function ProxyDashboard({ host, onHostChange }: ProxyDashboardProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const httpPort = 8080;
  const socksPort = 1080;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Server Configuration */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            Server Configuration
          </CardTitle>
          <CardDescription>Configure your proxy server address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="host" className="text-slate-300">Proxy Host</Label>
            <Input
              id="host"
              value={host}
              onChange={(e) => onHostChange(e.target.value)}
              placeholder="your-server.com or IP address"
              className="bg-slate-800 border-slate-700 text-white"
            />
            <p className="text-xs text-slate-400">
              Replace with your Google Cloud server IP or domain
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">HTTP Port</Label>
              <div className="p-3 bg-slate-800 rounded-md border border-slate-700">
                <span className="text-white">{httpPort}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">SOCKS5 Port</Label>
              <div className="p-3 bg-slate-800 rounded-md border border-slate-700">
                <span className="text-white">{socksPort}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Copy Configurations */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-400" />
            Quick Copy
          </CardTitle>
          <CardDescription>Copy connection strings quickly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label className="text-slate-300 text-xs">HTTP/HTTPS Proxy</Label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-slate-800 rounded-md border border-slate-700 text-sm text-white overflow-x-auto">
                {host}:{httpPort}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(`${host}:${httpPort}`, 'HTTP Proxy')}
                className="bg-slate-800 border-slate-700 hover:bg-slate-700"
              >
                {copied === 'HTTP Proxy' ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300 text-xs">SOCKS5 Proxy</Label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-slate-800 rounded-md border border-slate-700 text-sm text-white overflow-x-auto">
                socks5://{host}:{socksPort}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(`socks5://${host}:${socksPort}`, 'SOCKS5 Proxy')}
                className="bg-slate-800 border-slate-700 hover:bg-slate-700"
              >
                {copied === 'SOCKS5 Proxy' ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300 text-xs">Full URL</Label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-slate-800 rounded-md border border-slate-700 text-sm text-white overflow-x-auto">
                http://{host}:{httpPort}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(`http://${host}:${httpPort}`, 'Full URL')}
                className="bg-slate-800 border-slate-700 hover:bg-slate-700"
              >
                {copied === 'Full URL' ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
