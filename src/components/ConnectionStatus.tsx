import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Server, Globe, Zap } from 'lucide-react';

interface ConnectionStatusProps {
  host: string;
}

export function ConnectionStatus({ host }: ConnectionStatusProps) {
  // Mock status data - in a real implementation, you would ping the server
  const status = {
    online: true,
    httpPort: 8080,
    socksPort: 1080,
    uptime: '24h 15m',
    connections: 12,
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Server className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white">Proxy Server Status</h3>
                <Badge className={status.online ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                  {status.online ? '● Online' : '● Offline'}
                </Badge>
              </div>
              <p className="text-slate-400 text-sm">{host}</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs text-slate-400">Uptime</p>
                <p className="text-white">{status.uptime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">HTTP Port</p>
                <p className="text-white">{status.httpPort}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">SOCKS Port</p>
                <p className="text-white">{status.socksPort}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
