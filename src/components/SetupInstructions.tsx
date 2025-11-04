import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface SetupInstructionsProps {
  type: 'browser' | 'curl' | 'python' | 'system';
  host: string;
}

export function SetupInstructions({ type, host }: SetupInstructionsProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const instructions = {
    browser: {
      title: 'Browser Configuration',
      steps: [
        'Open your browser settings',
        'Navigate to Network or Proxy settings',
        'Select "Manual proxy configuration"',
        `Enter HTTP Proxy: ${host}:8080`,
        `Enter SOCKS Host: ${host}:1080`,
        'Save and restart your browser'
      ],
      code: `HTTP Proxy: ${host}:8080
HTTPS Proxy: ${host}:8080
SOCKS v5: ${host}:1080

Firefox: Preferences → Network Settings → Manual proxy configuration
Chrome: Settings → System → Open proxy settings
Safari: Preferences → Advanced → Proxies`
    },
    curl: {
      title: 'cURL Commands',
      steps: [
        'Use the --proxy or -x flag to specify your proxy',
        'For HTTPS, cURL will use CONNECT method automatically',
        'Add --proxy-insecure if needed for testing'
      ],
      code: `# HTTP Proxy
curl -x http://${host}:8080 http://example.com

# HTTPS with HTTP proxy
curl -x http://${host}:8080 https://example.com

# SOCKS5 Proxy
curl --socks5 ${host}:1080 http://example.com

# With environment variable
export http_proxy="http://${host}:8080"
export https_proxy="http://${host}:8080"
curl http://example.com`
    },
    python: {
      title: 'Python Requests',
      steps: [
        'Install requests library: pip install requests',
        'Configure proxies dictionary',
        'Pass proxies to your request'
      ],
      code: `import requests

# HTTP/HTTPS Proxy
proxies = {
    'http': 'http://${host}:8080',
    'https': 'http://${host}:8080',
}

response = requests.get('http://example.com', proxies=proxies)
print(response.text)

# SOCKS5 Proxy (requires: pip install requests[socks])
proxies = {
    'http': 'socks5://${host}:1080',
    'https': 'socks5://${host}:1080',
}

response = requests.get('https://example.com', proxies=proxies)
print(response.text)`
    },
    system: {
      title: 'System-Wide Configuration',
      steps: [
        'Set environment variables for system-wide proxy',
        'Add to ~/.bashrc or ~/.zshrc for persistence',
        'Applications will automatically use these settings'
      ],
      code: `# Linux/macOS - Add to ~/.bashrc or ~/.zshrc
export http_proxy="http://${host}:8080"
export https_proxy="http://${host}:8080"
export HTTP_PROXY="http://${host}:8080"
export HTTPS_PROXY="http://${host}:8080"

# For SOCKS5
export ALL_PROXY="socks5://${host}:1080"

# Windows Command Prompt
set http_proxy=http://${host}:8080
set https_proxy=http://${host}:8080

# Windows PowerShell
$env:http_proxy="http://${host}:8080"
$env:https_proxy="http://${host}:8080"

# Apply changes
source ~/.bashrc  # Linux/macOS`
    }
  };

  const content = instructions[type];

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <h3 className="text-white">{content.title}</h3>
        <ol className="list-decimal list-inside space-y-1 text-slate-300 text-sm">
          {content.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="relative">
        <div className="absolute top-3 right-3 z-10">
          <Button
            size="sm"
            variant="outline"
            onClick={() => copyCode(content.code)}
            className="bg-slate-800 border-slate-700 hover:bg-slate-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1 text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
        <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm text-slate-300">{content.code}</code>
        </pre>
      </div>

      {type === 'browser' && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-200 text-sm">
            💡 <strong>Tip:</strong> Some browsers like Firefox have built-in proxy settings, while Chrome uses your system's proxy configuration.
          </p>
        </div>
      )}

      {type === 'python' && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-200 text-sm">
            💡 <strong>Tip:</strong> For SOCKS5 support, install the socks extra: <code className="bg-slate-900 px-2 py-1 rounded">pip install requests[socks]</code>
          </p>
        </div>
      )}
    </div>
  );
}
