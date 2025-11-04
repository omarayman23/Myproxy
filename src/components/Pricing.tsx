import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Zap, Heart } from 'lucide-react';

export function Pricing() {
  const features = [
    'Unlimited bandwidth',
    'HTTP/HTTPS support',
    'SOCKS5 protocol',
    'No registration required',
    'No time limits',
    'Unlimited concurrent connections',
    'Community support',
    'Open source'
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
            <Heart className="w-3 h-3 mr-1" />
            100% Free Forever
          </Badge>
          <h2 className="text-gray-900 mb-4">No Subscription Required</h2>
          <p className="text-gray-600 text-lg">
            This proxy service is completely free to use. No hidden fees, no credit card required.
          </p>
        </div>

        <Card className="border-2 border-blue-500 shadow-2xl max-w-lg mx-auto">
          <CardHeader className="text-center pb-8 bg-gradient-to-b from-blue-50 to-white">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-gray-900 mb-2 text-3xl">Free Access</CardTitle>
            <CardDescription className="text-lg">Everything you need, at no cost</CardDescription>
            <div className="mt-6">
              <div className="text-gray-900 text-5xl mb-2">$0</div>
              <div className="text-gray-600">Forever. Really.</div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <ul className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 text-sm">
                ✨ <strong>Educational Project:</strong> This proxy is provided as a free educational resource. 
                Please use responsibly and respect all applicable laws and terms of service.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Why Free Section */}
        <div className="mt-16 text-center">
          <h3 className="text-gray-900 mb-6">Why is this free?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-3xl mb-2">📚</div>
              <h4 className="text-gray-900 mb-2">Educational</h4>
              <p className="text-gray-600 text-sm">
                Built to help developers learn about proxy servers and networking
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-3xl mb-2">🌍</div>
              <h4 className="text-gray-900 mb-2">Open Source</h4>
              <p className="text-gray-600 text-sm">
                Community-driven project that benefits from contributions
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-3xl mb-2">💡</div>
              <h4 className="text-gray-900 mb-2">Learning Tool</h4>
              <p className="text-gray-600 text-sm">
                Perfect for testing, development, and understanding proxies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
