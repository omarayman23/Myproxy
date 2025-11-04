import { Shield, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Documentation', 'API Reference', 'Status'],
    Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Partners'],
    Resources: ['Support', 'Community', 'Tutorials', 'FAQs', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Compliance']
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-white">ProxyNet</span>
            </div>
            <p className="text-sm mb-4">
              Enterprise-grade proxy infrastructure for modern applications.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2025 ProxyNet. All rights reserved.
          </p>
          <p className="text-sm">
            Made with ❤️ for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
