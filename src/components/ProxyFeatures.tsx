import { Shield, Lock, Share2, Video, Globe, Zap } from 'lucide-react';

export function ProxyFeatures() {
  const features = [
    {
      icon: Shield,
      title: 'Hide Your Real Identity',
      description: 'Your real network identity is hidden, allowing you to surf anonymously without revealing your IP address.',
      color: 'blue'
    },
    {
      icon: Lock,
      title: 'Encrypted Traffic',
      description: 'All websites are encrypted for added security. Your traffic flows through our secure pipeline protected by encryption.',
      color: 'purple'
    },
    {
      icon: Share2,
      title: 'Shareable Links',
      description: 'Share opened pages with friends using our unique shareable link feature. Send any proxied page directly.',
      color: 'green'
    },
    {
      icon: Video,
      title: 'Video & Audio Support',
      description: 'Full support for video and audio playback. Watch videos and listen to audio through our proxy without issues.',
      color: 'red'
    },
    {
      icon: Globe,
      title: 'Works Everywhere',
      description: 'Can be used on any operating system including Windows, Mac, Linux, Android, iOS, and Chrome OS.',
      color: 'indigo'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Optimized performance ensures fast page loading and smooth browsing experience without compromising security.',
      color: 'yellow'
    }
  ];

  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Free Web Proxy Features</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need for anonymous and secure browsing, completely free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color];
            
            return (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
