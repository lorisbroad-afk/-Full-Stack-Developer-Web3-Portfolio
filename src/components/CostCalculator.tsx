import { useState, useEffect } from 'react';
import { Calculator, Sparkles, Check, ArrowRight } from 'lucide-react';

interface CostCalculatorProps {
  onSelectEstimate: (details: { serviceType: string; features: string[]; budget: string; message: string }) => void;
}

export default function CostCalculator({ onSelectEstimate }: CostCalculatorProps) {
  const [serviceType, setServiceType] = useState<'website' | 'webapp' | 'ai' | 'blockchain'>('website');
  const [urgency, setUrgency] = useState<number>(2); // 1 = Relaxed, 2 = Standard, 3 = Rush
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState<number>(2499);

  const basePrices = {
    website: 2499,
    webapp: 4999,
    ai: 3999,
    blockchain: 5999,
  };

  const featuresList = {
    website: [
      { id: 'seo', name: 'Advanced SEO & Analytics Integration', price: 350 },
      { id: 'cms', name: 'Headless CMS (Sanity.io/Strapi) Setup', price: 600 },
      { id: '3d', name: 'Three.js / 3D Graphics Configurator', price: 1200 },
      { id: 'copy', name: 'Premium Copywriting & Brand Design', price: 400 },
    ],
    webapp: [
      { id: 'auth', name: 'Advanced User Authentication & Roles', price: 450 },
      { id: 'stripe', name: 'Stripe Subscription & Billing Portal', price: 700 },
      { id: 'sockets', name: 'Real-time WebSocket Notifications/Chat', price: 900 },
      { id: 'dashboard', name: 'Custom BI Data Visualizations & Charts', price: 1100 },
    ],
    ai: [
      { id: 'rag', name: 'RAG Knowledge Ingestion (Pinecone/Vector DB)', price: 1200 },
      { id: 'agents', name: 'Multi-Agent Autonomous Workflows', price: 1500 },
      { id: 'slack', name: 'Slack/Discord Bot Integration', price: 500 },
      { id: 'train', name: 'Custom Fine-Tuning & Prompt Engineering', price: 800 },
    ],
    blockchain: [
      { id: 'multisig', name: 'DAO Multisig Treasury Safe Setup', price: 1000 },
      { id: 'erc20', name: 'Custom ERC-20 / ERC-721 Token Minting', price: 800 },
      { id: 'index', name: 'The Graph Custom Subgraph Indexing', price: 1200 },
      { id: 'gas', name: 'Gas-Optimization Audit & Upgrades', price: 1400 },
    ],
  };

  // Reset features when service type changes
  useEffect(() => {
    setSelectedFeatures([]);
  }, [serviceType]);

  // Recalculate total cost
  useEffect(() => {
    let price = basePrices[serviceType];
    
    // Add feature prices
    const currentFeatures = featuresList[serviceType];
    selectedFeatures.forEach((featId) => {
      const feat = currentFeatures.find((f) => f.id === featId);
      if (feat) {
        price += feat.price;
      }
    });

    // Urgency multiplier
    if (urgency === 1) {
      price *= 0.9; // 10% discount for relaxed timeline
    } else if (urgency === 3) {
      price *= 1.25; // 25% rush premium
    }

    setTotalCost(Math.round(price));
  }, [serviceType, selectedFeatures, urgency]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getUrgencyLabel = () => {
    if (urgency === 1) return 'Relaxed (6-12 weeks) - 10% Off';
    if (urgency === 2) return 'Standard (4-6 weeks)';
    return 'Rush Delivery (2-3 weeks) - 25% Premium';
  };

  const handleApplyEstimate = () => {
    const serviceLabels = {
      website: 'High-Performance Website',
      webapp: 'Custom Web Application',
      ai: 'AI & Automation Solution',
      blockchain: 'Blockchain & Web3 DApp',
    };

    const currentFeatures = featuresList[serviceType];
    const featureNames = selectedFeatures.map(
      (id) => currentFeatures.find((f) => f.id === id)?.name || id
    );

    const message = `Hi Adejax, I used your interactive cost calculator and estimated a project.
- Service: ${serviceLabels[serviceType]}
- Timeline: ${getUrgencyLabel()}
- Features selected: ${featureNames.join(', ') || 'Base package only'}
- Estimated Price: $${totalCost.toLocaleString()} USD.
Let's discuss my requirements!`;

    onSelectEstimate({
      serviceType: serviceLabels[serviceType],
      features: featureNames,
      budget: totalCost < 3500 ? '$2k - $5k' : totalCost < 7500 ? '$5k - $10k' : '$10k - $20k',
      message: message,
    });
  };

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl text-left">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">Interactive Project Estimator</h4>
          <p className="text-xs text-gray-400">Select specifications to build a live cost quote.</p>
        </div>
      </div>

      {/* Service Type Selection */}
      <div className="mb-5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
          Step 1: Choose Project Category
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {(['website', 'webapp', 'ai', 'blockchain'] as const).map((type) => {
            const labels = {
              website: 'Websites & Shop',
              webapp: 'SaaS & Web App',
              ai: 'AI Automation',
              blockchain: 'Web3 & Blockchain',
            };
            const active = serviceType === type;
            return (
              <button
                key={type}
                onClick={() => setServiceType(type)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-500/25 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Selection */}
      <div className="mb-5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
          Step 2: Add Add-ons & Features
        </label>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {featuresList[serviceType].map((feat) => {
            const checked = selectedFeatures.includes(feat.id);
            return (
              <div
                key={feat.id}
                onClick={() => toggleFeature(feat.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  checked
                    ? 'bg-blue-500/10 border-blue-500/40 text-white'
                    : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      checked ? 'bg-blue-500 border-blue-500' : 'border-white/30 bg-transparent'
                    }`}
                  >
                    {checked && <Check className="w-3 h-3 text-black font-bold" />}
                  </div>
                  <span className="text-xs md:text-sm">{feat.name}</span>
                </div>
                <span className="text-xs font-mono text-blue-400 font-bold shrink-0 pl-2">
                  +${feat.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Urgency / Speed Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Step 3: Timeline Urgency
          </label>
          <span className="text-xs font-semibold text-blue-300">{getUrgencyLabel()}</span>
        </div>
        <input
          type="range"
          min="1"
          max="3"
          value={urgency}
          onChange={(e) => setUrgency(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-[10px] text-gray-500 mt-1 px-1 font-mono">
          <span>Relaxed</span>
          <span>Standard</span>
          <span>Rush Delivery</span>
        </div>
      </div>

      {/* Pricing Display */}
      <div className="bg-[#0B0F17] rounded-xl p-4 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Total Estimated Quote</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-3xl font-extrabold text-white font-mono">${totalCost.toLocaleString()}</span>
            <span className="text-xs text-gray-400 font-mono">USD</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1 italic">
            *Final quote depends on full project spec. 20% retainer due on kick-off.
          </p>
        </div>
        
        <button
          onClick={handleApplyEstimate}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 active:scale-95 text-black font-extrabold text-xs tracking-wide uppercase py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/15 shrink-0"
        >
          <span>Apply to Contact Form</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Trust Badge */}
      <div className="mt-4 flex items-start gap-2 text-[10px] text-yellow-400/80 bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-3">
        <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Freelancer Direct Advantage:</strong> Save up to 45% compared to digital agencies. You work directly with Adejax—no account managers, no communication overhead, just pure engineering.
        </p>
      </div>
    </div>
  );
}
