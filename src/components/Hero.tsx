import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
            <Zap className="w-3 h-3 mr-1" />
            Fast & Secure Proxy Service
          </Badge>

          {/* Headline */}
          <h1 className="text-gray-900 mb-6">
            Premium Proxy Network for Modern Applications
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Enterprise-grade HTTP/HTTPS and SOCKS5 proxy infrastructure. 
            Lightning-fast speeds, unlimited bandwidth, and 99.9% uptime guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300">
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-200">
            <div>
              <div className="text-gray-900 text-2xl mb-1">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-gray-900 text-2xl mb-1">50+</div>
              <div className="text-gray-600 text-sm">Locations</div>
            </div>
            <div>
              <div className="text-gray-900 text-2xl mb-1">10Gbps</div>
              <div className="text-gray-600 text-sm">Speed</div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600 text-sm">
              Military-grade encryption and zero-logging policy to protect your data.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">
              Optimized network infrastructure for maximum speed and reliability.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Global Network</h3>
            <p className="text-gray-600 text-sm">
              Access servers in 50+ countries for optimal performance worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
