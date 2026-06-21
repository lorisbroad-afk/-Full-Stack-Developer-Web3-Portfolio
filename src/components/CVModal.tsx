import { X, Mail, MapPin, Globe, Printer, Award, Briefcase, GraduationCap } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden my-8 print:my-0 print:rounded-none print:shadow-none">
        
        {/* Top interactive control bar (hidden in print) */}
        <div className="bg-[#0B0F17] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-gray-400 font-mono">adejax-resume-2026.pdf</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="p-8 md:p-12 font-sans bg-white text-gray-800 leading-relaxed print:p-0">
          
          {/* Header Section */}
          <div className="border-b-2 border-blue-600 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">ADEJAX</h1>
                <p className="text-lg font-bold text-blue-600 mt-1">Lead Full-Stack Developer & Web3 Architect</p>
                <p className="text-sm text-gray-500 mt-1 italic">Building high-performance decentralized systems, custom AI agents, and premium web apps.</p>
              </div>
              <div className="text-xs md:text-sm text-gray-600 space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-100 w-full md:w-auto font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>hello@adejax.dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>www.adejax.dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Remote / Lisbon, Portugal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
            
            {/* Left Main Column: Experience, Key Projects */}
            <div className="md:col-span-8 space-y-8">
              
              {/* Professional Summary */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Professional Profile
                </h3>
                <p className="text-sm text-gray-600 mt-3">
                  Highly versatile, security-conscious Full-Stack Engineer and Web3 Developer with 4+ years of professional experience designing, deploying, and auditing decentralized applications (DApps), custom AI agent workflows, and high-speed enterprise web portals. Proven track record of boosting conversion rates for startups by up to 40% and deploying smart contracts that secure millions in decentralized treasury assets.
                </p>
              </div>

              {/* Work Experience */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Work History & Experience
                </h3>

                {/* Role 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Independent Full-Stack & Web3 Consultant</h4>
                      <p className="text-xs text-blue-600 font-semibold">Self-Employed / Remote Freelance</p>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded font-mono">2022 - Present</span>
                  </div>
                  <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1.5 mt-2">
                    <li>Developed and launched <span className="font-semibold text-gray-900">SolShare</span>, a peer-to-peer energy trading marketplace that routes electricity purchases using Solidity smart contracts and Chainlink decentralized Oracles.</li>
                    <li>Designed high-converting headless e-commerce store (<span className="font-semibold text-gray-900">ApexCommerce</span>) featuring an interactive 3D product customizer built with Three.js, achieving a 100/100 Lighthouse performance score and driving a 40% increase in mobile checkouts.</li>
                    <li>Implemented enterprise-grade Customer AI Copilots integrating Pinecone vector databases and GPT-4 Retrieval-Augmented Generation (RAG) pipelines, deflecting over 82% of standard customer support queries.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Senior Smart Contract Developer</h4>
                      <p className="text-xs text-blue-600 font-semibold">Nexus DeFi Labs (Web3 Startup)</p>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded font-mono">2021 - 2022</span>
                  </div>
                  <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1.5 mt-2">
                    <li>Authored and deployed gas-optimized, security-audited ERC-20, ERC-721, and multisig treasury smart contracts on Ethereum and Polygon networks, safeguarding over $8.4M USD in TVL.</li>
                    <li>Integrated frontends with wallet connection packages (Viem, Wagmi, Metamask SDK, WalletConnect v2), reducing DApp bundle loading times by 72% through advanced code splitting.</li>
                    <li>Orchestrated local and testnet deployments using Hardhat, Foundry, and Mocha/Chai testing suites, maintaining a 100% contract execution safety record.</li>
                  </ul>
                </div>

                {/* Role 3 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Full-Stack Engineer</h4>
                      <p className="text-xs text-blue-600 font-semibold">Synthetix Software Group</p>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded font-mono">2020 - 2021</span>
                  </div>
                  <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1.5 mt-2">
                    <li>Built collaborative data visualization tools using React, TypeScript, and WebSockets (Socket.io) for real-time tracking of clickstream analytics, processing up to 12,000 requests/sec.</li>
                    <li>Optimized high-load PostgreSQL databases, writing complex timeseries SQL queries and configuring Redis caching layers, improving API query speeds by 65%.</li>
                    <li>Assisted in setting up robust Docker environments and CI/CD pipelines (GitHub Actions) for automatic deployments on AWS ECS and Vercel.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Side Column: Skills matrix, Education, Credentials */}
            <div className="md:col-span-4 space-y-8 border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-8">
              
              {/* Core Technologies */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1.5">
                  Core Skills Matrix
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 uppercase">Frontend Engineering</h5>
                    <p className="text-[11px] text-gray-600 mt-1 font-mono">React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, JavaScript (ES6+), Framer Motion</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 uppercase">Backend & Databases</h5>
                    <p className="text-[11px] text-gray-600 mt-1 font-mono">Node.js, Express, FastAPI, Python, PostgreSQL, MongoDB, ClickHouse, Redis, REST, GraphQL</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 uppercase">Web3 & Blockchain</h5>
                    <p className="text-[11px] text-gray-600 mt-1 font-mono">Solidity, Smart Contracts, Ethers.js, Viem, Hardhat, Foundry, Gnosis Safe, The Graph, Web3.js</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 uppercase">Artificial Intelligence</h5>
                    <p className="text-[11px] text-gray-600 mt-1 font-mono">OpenAI APIs, LangChain, RAG, Pinecone DB, AI Agent Workflows, Prompt Optimization</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-4.5 h-4.5 text-blue-600" />
                  Education
                </h3>
                <div className="mt-3 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">B.S. in Computer Science</h4>
                    <p className="text-[11px] text-gray-600">University of Lisbon</p>
                    <p className="text-[10px] text-gray-400 font-mono">Graduated 2020</p>
                  </div>
                </div>
              </div>

              {/* Certifications & Trust */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1.5">
                  Key Credentials
                </h3>
                <ul className="list-disc pl-4 text-[11px] text-gray-600 mt-3 space-y-2">
                  <li>Certified Smart Contract Auditor (ConsenSys Academy)</li>
                  <li>DeepLearning.AI LangChain Practitioner</li>
                  <li>Top Rated Full-Stack Consultant on Upwork</li>
                  <li>Active GitHub contributor since 2018</li>
                </ul>
              </div>

              {/* Footer details in print */}
              <div className="pt-8 border-t border-gray-100 text-[10px] text-gray-400 leading-normal">
                References available upon request. Made with React, TypeScript, and Tailwind.
              </div>

            </div>

          </div>

        </div>
        
      </div>
    </div>
  );
}
