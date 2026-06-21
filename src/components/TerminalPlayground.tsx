import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export default function TerminalPlayground() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'system-init',
      output: (
        <div className="space-y-1">
          <p className="text-blue-400">⚡ Adejax Core Terminal v2.6.0 loaded successfully.</p>
          <p className="text-gray-400">Type <span className="text-emerald-400 font-semibold">help</span> to see available commands or try <span className="text-emerald-400 font-semibold">deploy</span> to launch a test smart contract.</p>
        </div>
      ),
    },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
            <div><span className="text-blue-400 font-mono">help</span> - Display this menu</div>
            <div><span className="text-blue-400 font-mono">skills</span> - Display tech stack proficiency</div>
            <div><span className="text-blue-400 font-mono">deploy</span> - Compile & deploy mock Solidity contract</div>
            <div><span className="text-blue-400 font-mono">ai</span> - Initialize an autonomous AI agent review</div>
            <div><span className="text-blue-400 font-mono">projects</span> - List flagship projects</div>
            <div><span className="text-blue-400 font-mono">about</span> - Read brief bio of Adejax</div>
            <div><span className="text-blue-400 font-mono">hire</span> - Get quick contact instructions</div>
            <div><span className="text-blue-400 font-mono">clear</span> - Clear terminal history</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-sm font-mono text-gray-300">
            <p className="text-emerald-400 font-semibold">⚡ Technical Proficiency Matrix:</p>
            <p>React/Next.js   [██████████████████░] 95%</p>
            <p>TypeScript      [██████████████████░] 92%</p>
            <p>Node.js/Express [██████████████████░] 92%</p>
            <p>Solidity/Web3   [████████████████░░░] 88%</p>
            <p>OpenAI/LangChain[██████████████████░] 90%</p>
            <p>Postgres/MongoDB[█████████████████░░] 89%</p>
          </div>
        );
        break;

      case 'deploy':
        output = (
          <div className="space-y-2 text-xs font-mono text-gray-300 leading-relaxed">
            <p className="text-yellow-400">🔨 Compiling AdejaxToken.sol...</p>
            <p className="text-gray-400">✓ Compiler target: Solidity v0.8.20</p>
            <p className="text-gray-400">✓ Optimization enabled: 200 runs</p>
            <p className="text-gray-400">✓ Bytecode size: 4,821 bytes</p>
            <p className="text-yellow-400">🚀 Deploying to Ethereum Sepolia Testnet...</p>
            <p className="text-blue-400">⌛ Broadcasted transaction with hash: 0x8a92f8efb9376a267c7e997a...</p>
            <div className="bg-emerald-950/40 border border-emerald-500/20 p-2 rounded text-emerald-400 space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>CONTRACT DEPLOYED SUCCESSFULLY!</span>
              </div>
              <p>📍 Address: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
              <p>⛽ Gas Used: 184,392 Gwei ($0.42 USD equivalent)</p>
              <p>⛓️ Block Number: #12,845,901 | Status: Confirmed</p>
            </div>
          </div>
        );
        break;

      case 'ai':
        output = (
          <div className="space-y-2 text-sm font-mono text-gray-300">
            <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
              <Cpu className="w-4 h-4 animate-pulse" />
              <span>Adejax AI Agent: v1.0-copilot</span>
            </div>
            <p className="italic text-gray-400">"Scanning Adejax's repository data... Analysing client reviews... Synthesizing report..."</p>
            <div className="bg-purple-950/30 border border-purple-500/20 p-3 rounded-lg text-purple-200">
              <span className="font-semibold text-white">★ Recommendation Score: 9.9/10</span>
              <p className="mt-1">"Adejax demonstrates a high level of code health. 86% of his commits pass automated testing on the first try. He is particularly strong at writing clean Solidity smart contracts and designing highly responsive Tailwind interfaces. Ideal for fast-growing startups."</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-sm text-gray-300">
            <p className="text-emerald-400 font-semibold">⚡ Flagship Projects Available for Showcase:</p>
            <div className="space-y-1 font-mono text-xs">
              <p>1. <span className="text-blue-400 font-semibold">SolShare</span> - P2P Solar Energy Trading Web3 App (Solidity, React)</p>
              <p>2. <span className="text-blue-400 font-semibold">NovaAI</span> - Multimodal Marketing Content Generator (Next.js, OpenAI)</p>
              <p>3. <span className="text-blue-400 font-semibold">HyperScale</span> - Collaborative SaaS Analytics Dashboard (Node, Socket.io)</p>
              <p>4. <span className="text-blue-400 font-semibold">ApexCommerce</span> - Headless Storefront with 3D Configurator (Three.js, Stripe)</p>
            </div>
            <p className="text-xs text-gray-400">Scroll down to the Portfolio section to view fully responsive visual mockups of these!</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-sm text-gray-300 space-y-2">
            <p>I'm a full-stack engineer and Web3 builder specialized in bridging complex backend/blockchain systems with gorgeous, high-performance interfaces.</p>
            <p>I focus on clean architecture, security audits, AI automations, and speed. I'm dedicated to helping startups ship products in weeks rather than months.</p>
          </div>
        );
        break;

      case 'hire':
        output = (
          <div className="text-sm text-gray-300 space-y-2">
            <p className="text-emerald-400 font-semibold">🚀 Ready to start a project?</p>
            <p>1. Scroll down to the <span className="text-blue-400">Contact Section</span> at the bottom of the page.</p>
            <p>2. Fill out the project inquiry form with your requirements and budget.</p>
            <p>3. Alternatively, email me directly at: <span className="text-emerald-400 font-mono">hello@adejax.dev</span> or hit me up on WhatsApp.</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <p className="text-rose-400 font-mono">
            ⚠️ Command not found: "{input}". Type <span className="underline">help</span> for a list of available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="w-full bg-[#0B0F17]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-left max-w-3xl mx-auto flex flex-col h-96">
      {/* Top Window bar */}
      <div className="bg-[#121824] px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>adejax-interactive-terminal.sh</span>
        </div>
        <div className="w-12"></div> {/* spacer */}
      </div>

      {/* Output history */}
      <div 
        onClick={handleTerminalClick}
        className="flex-1 p-4 overflow-y-auto space-y-4 text-xs md:text-sm scrollbar-thin scrollbar-thumb-white/10"
      >
        {history.map((entry, index) => (
          <div key={index} className="space-y-1.5">
            {entry.command !== 'system-init' && (
              <div className="flex items-center gap-2 text-emerald-400">
                <span>adejax-guest@portfolio:~#</span>
                <span className="text-white font-semibold">{entry.command}</span>
              </div>
            )}
            <div className="text-gray-300 whitespace-pre-wrap">{entry.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input bar */}
      <form 
        onSubmit={handleCommand}
        className="bg-[#0e1420] px-4 py-3 border-t border-white/5 flex items-center gap-2"
      >
        <span className="text-emerald-400 text-xs md:text-sm font-semibold shrink-0">adejax-guest@portfolio:~#</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a command (e.g. "help", "deploy", "ai")...'
          className="flex-1 bg-transparent text-white border-none outline-none focus:ring-0 text-xs md:text-sm font-mono placeholder-gray-600"
          autoFocus
        />
        <button 
          type="submit"
          className="p-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all shrink-0"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
