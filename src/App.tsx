import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProxyConfig } from './components/ProxyConfig';
import { Documentation } from './components/Documentation';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <ProxyConfig />
      <Documentation />
      <Pricing />
      <Footer />
    </div>
  );
}
