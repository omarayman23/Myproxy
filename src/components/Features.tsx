import { Shield, Zap, Globe, Lock, Server, Activity } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'HTTP/HTTPS Support',
      description: 'Full support for both HTTP and HTTPS protocols with automatic SSL handling.',
      color: 'blue'
    },
    {
      icon: Lock,
      title: 'SOCKS5 Protocol',
      description: 'Advanced SOCKS5 proxy support for maximum compatibility and security.',
      color: 'purple'
    },
    {
      icon: Server,
      title: 'Dual-Port Architecture',
      description: 'Dedicated ports for HTTP (8080) and SOCKS5 (1080) traffic management.',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized multi-threaded architecture for handling thousands of connections.',
      color: 'yellow'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Deploy anywhere with support for any cloud platform or datacenter.',
      color: 'red'
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Built-in connection tracking and performance monitoring capabilities.',
      color: 'indigo'
    }
  ];

  const colorClasses: Record<string, { bg: string; text: string; iconBg: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
    green: { bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', iconBg: 'bg-yellow-100' },
    red: { bg: 'bg-red-50', text: 'text-red-600', iconBg: 'bg-red-100' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', iconBg: 'bg-indigo-100' },
  };

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-gray-900 mb-4">
            Enterprise-Grade Features
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need for a reliable, secure, and high-performance proxy infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color];
            
            return (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md"
              >
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
