import { X, ExternalLink, ShieldAlert, CheckCircle2, Award, Hourglass } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Render a mock interface of the app based on its ID to show Adejax's frontend capabilities!
  const renderMockAppScreen = () => {
    switch (project.id) {
      case 'solshare':
        return (
          <div className="w-full bg-[#0E131F] rounded-lg border border-emerald-500/20 overflow-hidden font-mono p-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>SOLSHARE NODE v0.4.1 [ACTIVE]</span>
              </div>
              <div className="text-gray-400 bg-white/5 px-2 py-0.5 rounded">Block: #1823901</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <p className="text-[10px] text-gray-400">YOUR ENERGY SUPPLY</p>
                <p className="text-sm font-bold text-white">4.2 kW</p>
                <p className="text-[9px] text-emerald-500 font-semibold">Generating via Solar</p>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <p className="text-[10px] text-gray-400">LOCAL GRID PRICE</p>
                <p className="text-sm font-bold text-white">0.12 USDC/kWh</p>
                <p className="text-[9px] text-red-400 font-semibold">Standard: 0.18 USDC</p>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <p className="text-[10px] text-gray-400">ESCROW LOCKS</p>
                <p className="text-sm font-bold text-white">240.00 USDC</p>
                <p className="text-[9px] text-blue-400 font-semibold">3 active contracts</p>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <p className="text-[10px] text-gray-400">NET EARNINGS</p>
                <p className="text-sm font-bold text-emerald-400">+45.20 USDC</p>
                <p className="text-[9px] text-gray-400">This cycle</p>
              </div>
            </div>
            {/* Mock chart representation */}
            <div className="bg-white/5 p-3 rounded border border-white/5 mb-3">
              <p className="text-xs font-semibold text-white mb-2">P2P Peer-to-Peer Smart Matching Feed</p>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center text-emerald-400 bg-emerald-950/20 p-1.5 rounded border border-emerald-500/10">
                  <span>🟢 Neighbor #401 purchased 1.8 kWh</span>
                  <span>Match: Contract_0x4f3... | 0.21 USDC</span>
                </div>
                <div className="flex justify-between items-center text-blue-400 bg-blue-950/20 p-1.5 rounded border border-blue-500/10">
                  <span>🔵 Direct Grid overflow backup active</span>
                  <span>Battery reserve at 82%</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 bg-white/5 p-1.5 rounded">
                  <span>⚪ Smart contract oracle update broadcasted</span>
                  <span>Chainlink Node: #820 | Gas: 32 Gwei</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'novaai':
        return (
          <div className="w-full bg-[#0F111A] rounded-lg border border-purple-500/20 overflow-hidden p-4 text-xs text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-500"></div>
                <span className="font-semibold text-white">NovaAI Workspace</span>
              </div>
              <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full font-mono">Agent Mode: Creative</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="md:col-span-1 bg-white/5 p-2.5 rounded border border-white/5 space-y-2">
                <p className="font-semibold text-[10px] text-gray-300">Campaign Seed</p>
                <div className="bg-black/40 p-1.5 rounded text-[10px] text-purple-200 font-mono">
                  "Next-gen smart mechanical keyboard with hot-swappable switches and OLED screens"
                </div>
                <p className="font-semibold text-[10px] text-gray-300 mt-2">Target Personas</p>
                <div className="flex gap-1 flex-wrap">
                  <span className="bg-white/5 px-1.5 py-0.5 rounded text-[8px] text-gray-300">Developers</span>
                  <span className="bg-white/5 px-1.5 py-0.5 rounded text-[8px] text-gray-300">Gamers</span>
                  <span className="bg-white/5 px-1.5 py-0.5 rounded text-[8px] text-gray-300">Designers</span>
                </div>
              </div>
              <div className="md:col-span-2 bg-white/5 p-2.5 rounded border border-white/5 space-y-2">
                <p className="font-semibold text-[10px] text-emerald-400 flex items-center gap-1">
                  <span>✦ Generated Copy (Ready to Publish)</span>
                </p>
                <div className="space-y-2">
                  <div className="bg-black/30 p-2 rounded text-[10px]">
                    <p className="text-purple-300 font-semibold mb-1">🔗 Linkedin Ad Post:</p>
                    <p className="text-gray-300">Level up your workspace. 💻 Meet the ApexType Mechanical Keyboard. Hot-swappable switches, a customizable OLED screen, and acoustic dampening. Write code at the speed of thought. ⚡</p>
                  </div>
                  <div className="bg-black/30 p-2 rounded text-[10px]">
                    <p className="text-pink-300 font-semibold mb-1">📸 Instagram Hook:</p>
                    <p className="text-gray-300">Click. Clack. Perfect. ⌨️✨ The satisfying sound of productivity. Link in bio to customize yours!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'hyperscale':
        return (
          <div className="w-full bg-[#090D16] rounded-lg border border-blue-500/20 overflow-hidden p-4 text-xs font-sans text-left">
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
              <span className="font-bold text-white tracking-tight flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                HyperScale Analytics
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-mono">LIVE CONNECTED</span>
                <span className="text-gray-400 text-[10px]">Active users: 247</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <span className="text-[9px] text-gray-400 uppercase">Page Views (24h)</span>
                <p className="text-base font-bold text-white mt-0.5">1,248,390</p>
                <span className="text-[8px] text-emerald-400">↑ 12.4% vs yesterday</span>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <span className="text-[9px] text-gray-400 uppercase">Avg Response Time</span>
                <p className="text-base font-bold text-white mt-0.5">14.2 ms</p>
                <span className="text-[8px] text-blue-400">Clickhouse Edge</span>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <span className="text-[9px] text-gray-400 uppercase">Bounce Rate</span>
                <p className="text-base font-bold text-white mt-0.5">24.1%</p>
                <span className="text-[8px] text-emerald-400">↓ 3.2% optimization</span>
              </div>
            </div>
            {/* Visual simulation of a bar chart */}
            <div className="bg-white/5 p-3 rounded border border-white/5">
              <p className="text-[9px] text-gray-400 uppercase mb-2">Ingested Events / Sec (Last 10 Seconds)</p>
              <div className="h-16 flex items-end gap-1 px-2">
                <div className="w-full bg-blue-500/20 hover:bg-blue-500/40 transition-all h-8 rounded-t"></div>
                <div className="w-full bg-blue-500/30 hover:bg-blue-500/50 transition-all h-10 rounded-t"></div>
                <div className="w-full bg-blue-500/40 hover:bg-blue-500/60 transition-all h-12 rounded-t"></div>
                <div className="w-full bg-blue-500/60 hover:bg-blue-500/80 transition-all h-14 rounded-t"></div>
                <div className="w-full bg-blue-500 hover:bg-blue-400 transition-all h-16 rounded-t"></div>
                <div className="w-full bg-blue-500/80 hover:bg-blue-500 transition-all h-15 rounded-t"></div>
                <div className="w-full bg-blue-500/70 hover:bg-blue-500 transition-all h-13 rounded-t"></div>
                <div className="w-full bg-blue-500/50 hover:bg-blue-500/70 transition-all h-9 rounded-t"></div>
                <div className="w-full bg-blue-500/60 hover:bg-blue-500/80 transition-all h-11 rounded-t"></div>
                <div className="w-full bg-blue-500 hover:bg-blue-400 transition-all h-16 rounded-t animate-pulse"></div>
              </div>
              <div className="flex justify-between text-[8px] text-gray-500 mt-1 px-1">
                <span>10s ago</span>
                <span>5s ago</span>
                <span>Now</span>
              </div>
            </div>
          </div>
        );

      case 'apexcommerce':
        return (
          <div className="w-full bg-[#0E1015] rounded-lg border border-orange-500/20 overflow-hidden text-left text-xs">
            <div className="p-3 border-b border-white/5 flex justify-between items-center bg-[#141720]">
              <span className="font-bold text-white tracking-widest">APEX // ATELIER</span>
              <div className="flex gap-2 text-[10px]">
                <span className="text-orange-400 underline cursor-pointer">Shop</span>
                <span className="text-gray-400 cursor-pointer">Specs</span>
                <span className="text-gray-400 cursor-pointer">Cart (0)</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
              {/* Mock 3D render window */}
              <div className="bg-black border border-white/5 rounded p-3 flex flex-col justify-between items-center min-h-[140px] relative">
                <span className="absolute top-2 left-2 text-[8px] text-gray-500 bg-white/5 px-1 py-0.5 rounded font-mono">THREE.JS CANVAS [3D]</span>
                <div className="w-24 h-24 my-auto flex items-center justify-center relative">
                  {/* CSS Drawn Sneaker */}
                  <div className="w-20 h-10 bg-gradient-to-r from-orange-500 to-rose-600 rounded-lg transform -rotate-12 relative shadow-lg shadow-orange-500/20">
                    <div className="absolute top-[-4px] left-8 w-8 h-4 bg-white rounded-t-lg"></div>
                    <div className="absolute bottom-[-3px] left-0 w-20 h-3 bg-neutral-200 rounded-b-lg"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute w-20 h-2 bg-white/10 blur-md bottom-0 rounded-full"></div>
                </div>
                <div className="flex gap-1 justify-center">
                  <span className="w-2 h-2 rounded-full bg-orange-500 border border-white"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-orange-400 font-semibold tracking-wider uppercase">EXCLUSIVE RELEASE</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Apex Nebula Run-v1</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Responsive mesh, customized carbon composite sole plate, dynamic biometric fit. Customizable colors in real-time 3D.</p>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-bold text-white">$189.00 USD</p>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white py-1.5 px-3 rounded text-[10px] font-semibold mt-1">
                    ADD TO CART (STRIPE PAY)
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chainvault':
        return (
          <div className="w-full bg-[#090C12] rounded-lg border border-yellow-500/20 overflow-hidden p-4 text-xs font-mono text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
              <span className="text-yellow-400 font-semibold flex items-center gap-1">
                🔑 CHAINVAULT MULTISIG [3/5]
              </span>
              <span className="text-gray-400 text-[10px]">Safe Address: 0x82A1...9c1f</span>
            </div>
            <div className="bg-white/5 p-3 rounded border border-white/5 mb-3">
              <div className="flex justify-between items-center text-[10px] mb-1.5">
                <span className="text-gray-300 font-bold">TX_091: Withdraw 12,000 USDC</span>
                <span className="text-yellow-400 bg-yellow-950/40 px-2 py-0.5 rounded border border-yellow-500/20">AWAITING SIGNATURES</span>
              </div>
              <p className="text-[9px] text-gray-400 mb-2">Destination: 0x7a30...dE19 (Development Treasury Contract)</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[9px] text-emerald-400">
                  <span>✓ Signer #1 (Adejax - Admin)</span>
                  <span>SIGNED [0x2f9...]</span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-emerald-400">
                  <span>✓ Signer #2 (Sarah J. - CTO)</span>
                  <span>SIGNED [0xa18...]</span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-yellow-400">
                  <span>⏳ Signer #3 (David C. - VP Product)</span>
                  <span>PENDING REVIEW</span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-gray-500">
                  <span>○ Signer #4 (Elena R. - Board)</span>
                  <span>NOT REQUIRED (Threshold: 3)</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-bold py-1.5 rounded text-[10px]">
              EXECUTE SIGNATURE WITH HARDWARE WALLET
            </button>
          </div>
        );

      case 'devscribe':
        return (
          <div className="w-full bg-[#0D0F14] rounded-lg border border-pink-500/20 overflow-hidden p-4 text-xs font-mono text-left text-gray-300">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <span className="text-pink-400 font-bold">✍ DEVSCRIBE AI DOCS</span>
              <span className="text-[9px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">WEBHOOK CONNECTED</span>
            </div>
            <div className="bg-black/30 p-2 rounded border border-white/5 mb-2.5">
              <p className="text-[10px] text-gray-500">// Ingesting repository: adejax/solshare-dapp</p>
              <p className="text-[10px] text-blue-400">Parsing AST for: smart-contracts/SolShare.sol...</p>
              <p className="text-[10px] text-purple-400">Generating typed definitions & semantic context...</p>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <p className="text-[10px] text-pink-400 font-bold mb-1">Generated Output (Reference Docs):</p>
              <h5 className="text-white text-[11px] font-bold">function tradeEnergy(uint256 amount, uint256 price)</h5>
              <p className="text-[10px] text-gray-400 mt-0.5">Allows registered energy producers to list excess solar energy in the escrow ledger. The function checks active reserve capacity via chainlink oracle nodes and matches bids instantly.</p>
              <p className="text-[9px] text-yellow-400 mt-1">⚠️ Throws: CapacityLimitExceeded(), InsufficientEscrow()</p>
            </div>
          </div>
        );

      case 'defipulse':
        return (
          <div className="w-full bg-[#0C0A14] rounded-lg border border-purple-500/20 overflow-hidden p-4 text-xs font-mono text-left text-gray-300">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
              <span className="text-purple-400 font-bold flex items-center gap-1">
                🌀 DEFI PULSE YIELD ROUTER
              </span>
              <span className="text-gray-400 text-[9px]">Gas Price: 18 Gwei</span>
            </div>
            <div className="space-y-2">
              <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Aave V3 (Lending pool)</p>
                  <p className="text-[9px] text-gray-400">Asset: USDC | Low Risk</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">4.82% APY</p>
                  <p className="text-[8px] text-gray-400">Safe Score: AA</p>
                </div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Uniswap V3 (Stables Pool)</p>
                  <p className="text-[9px] text-gray-400">Asset: DAI-USDC | Med Risk</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">11.40% APY</p>
                  <p className="text-[8px] text-gray-400">Safe Score: A-</p>
                </div>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center bg-purple-950/20 border-purple-500/20">
                <div>
                  <p className="text-white font-semibold">Curve Finance (TriCrypto)</p>
                  <p className="text-[9px] text-gray-400">Asset: ETH-BTC-USDT | Volatile</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">18.92% APY</p>
                  <p className="text-[8px] text-purple-400 font-bold">★ TARGET YIELD</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white py-1 rounded text-[10px] font-bold">
              ZAP-IN: SWAP & DEPOSIT IN ONE CLICK
            </button>
          </div>
        );

      case 'customercopilot':
        return (
          <div className="w-full bg-[#0B0E14] rounded-lg border border-blue-500/20 overflow-hidden p-3 text-xs text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 bg-white/5 -mx-3 -mt-3 p-3">
              <span className="font-bold text-white flex items-center gap-1">
                🛡️ AEGIS CUSTOMER COPILOT
              </span>
              <span className="text-[9px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">RAG ENABLED</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto p-1 font-mono text-[10px] leading-relaxed">
              <div className="bg-white/5 p-2 rounded max-w-[85%] text-gray-300">
                <span className="text-[8px] text-blue-400 font-bold block mb-0.5">CUSTOMER QUERY:</span>
                "How do I rotate my webhook secret in ApexCommerce using CLI?"
              </div>
              <div className="bg-blue-950/20 border border-blue-500/10 p-2 rounded max-w-[90%] ml-auto text-blue-100">
                <span className="text-[8px] text-purple-400 font-bold block mb-0.5">AEGIS RESPONSE (82% confidence):</span>
                "To rotate your webhook secret, run: <br/>
                <code className="text-yellow-300 bg-black/40 px-1 rounded">apex-cli secrets rotate --webhook</code><br/>
                This generates a new secret on the Cloudflare Edge and starts a 15-minute grace period where both old and new secrets are valid."
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full bg-white/5 rounded-lg border border-white/10 h-36 flex items-center justify-center text-gray-500">
            [Interactive Showcase UI Mockup]
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0B0F17] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Top Header Section with category gradient */}
        <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 text-gray-400 hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Title, Quick Specs, Mock Screen, Tech tags */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-black mb-3`}>
                {project.categoryLabel}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{project.name}</h3>
              <p className="text-gray-400 text-sm md:text-base mt-2 leading-relaxed">{project.description}</p>
            </div>

            {/* Simulated Live UI Mockup */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Live Application UI Sandbox</label>
              {renderMockAppScreen()}
            </div>

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2.5 py-1 text-xs rounded bg-white/5 border border-white/10 text-blue-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Problem Solved, Case Study details, Metrics, CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Metadata Stats */}
            <div className="grid grid-cols-3 gap-3 bg-white/5 border border-white/5 rounded-xl p-4 text-center">
              <div>
                <div className="flex justify-center text-blue-400 mb-1">
                  <Award className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-semibold">Difficulty</p>
                <p className="text-xs font-bold text-white mt-0.5">{project.difficulty}</p>
              </div>
              <div className="border-x border-white/5">
                <div className="flex justify-center text-blue-400 mb-1">
                  <Hourglass className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-semibold">Timeframe</p>
                <p className="text-xs font-bold text-white mt-0.5">{project.timeframe}</p>
              </div>
              <div>
                <div className="flex justify-center text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-semibold">{project.metric.label}</p>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">{project.metric.value}</p>
              </div>
            </div>

            {/* Problem & Solution case study */}
            <div className="space-y-4">
              <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  The Problem
                </h4>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  The Architecture & Solution
                </h4>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>

            {/* Features Bullet List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Key Engineering Achievements</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Links */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <span>Source Code</span>
              </a>
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r ${project.color} text-black font-semibold transition-all hover:opacity-90`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
