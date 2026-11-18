import React, { useState } from 'react';
import { VisualPayload } from '../types';

interface VisualDiagramPanelProps {
  visual: VisualPayload;
}

export const VisualDiagramPanel: React.FC<VisualDiagramPanelProps> = ({ visual }) => {
  // State for interactive Function Graph
  const [testInputX, setTestInputX] = useState<number>(2);

  // State for Newton Free-Body Diagram
  const [showReaction, setShowReaction] = useState<boolean>(true);

  // 1. FUNCTIONS: DOMAIN & CODOMAIN MAPPING DIAGRAM + PARABOLIC GRAPH (Matching Image 1 & 2)
  if (visual.type === 'functions_mapping' || visual.type === 'function_graph') {
    const calculatedY = (testInputX * testInputX).toFixed(1);

    return (
      <div className="space-y-4">
        {/* SVG Set Mapping Diagram (Directly matching Screen 3 in Reference) */}
        <div className="p-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-[var(--text-primary)]">Set Mapping Diagram: $f: A \\to B$</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              Single-Valued Relation
            </span>
          </div>

          <div className="w-full flex items-center justify-center py-2">
            <svg viewBox="0 0 400 180" className="w-full max-w-[360px] h-auto select-none">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent-primary)" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
                </marker>
              </defs>

              {/* Domain Oval A */}
              <ellipse cx="80" cy="90" rx="45" ry="70" fill="none" stroke="var(--border-main)" strokeWidth="2" strokeDasharray="3 3" />
              <text x="80" y="15" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--text-primary)">Domain (A)</text>

              {/* Elements in A */}
              <circle cx="80" cy="50" r="14" fill="var(--bg-secondary)" stroke="var(--border-main)" strokeWidth="1.5" />
              <text x="80" y="54" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-primary)">1</text>

              <circle cx="80" cy="90" r="14" fill="var(--bg-secondary)" stroke="var(--border-main)" strokeWidth="1.5" />
              <text x="80" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-primary)">2</text>

              <circle cx="80" cy="130" r="14" fill="var(--bg-secondary)" stroke="var(--border-main)" strokeWidth="1.5" />
              <text x="80" y="134" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-primary)">3</text>

              {/* Codomain Oval B */}
              <ellipse cx="320" cy="90" rx="45" ry="70" fill="none" stroke="var(--border-main)" strokeWidth="2" strokeDasharray="3 3" />
              <text x="320" y="15" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--text-primary)">Codomain (B)</text>

              {/* Elements in B */}
              <circle cx="320" cy="50" r="14" fill="var(--bg-secondary)" stroke="var(--border-main)" strokeWidth="1.5" />
              <text x="320" y="54" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-primary)">a</text>

              <circle cx="320" cy="90" r="14" fill="var(--bg-secondary)" stroke="var(--border-main)" strokeWidth="1.5" />
              <text x="320" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-primary)">b</text>

              <circle cx="320" cy="130" r="14" fill="var(--bg-secondary)" stroke="var(--border-main)" strokeWidth="1.5" />
              <text x="320" y="134" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-muted)">c</text>

              {/* Directed Mapping Arrows */}
              {/* 1 -> a */}
              <path d="M 94 50 Q 200 40 304 49" fill="none" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrow)" />
              {/* 2 -> b */}
              <path d="M 94 90 Q 200 85 304 89" fill="none" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrow)" />
              {/* 3 -> b (demonstrating Many-to-One!) */}
              <path d="M 94 130 Q 200 115 304 93" fill="none" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow-green)" />

              {/* Mapping label f */}
              <text x="200" y="45" textAnchor="middle" fontSize="12" fontStyle="italic" fontWeight="bold" fill="var(--accent-primary)">f</text>

              {/* Range Bracket annotation */}
              <rect x="350" y="38" width="8" height="64" fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" rx="3" />
              <text x="365" y="74" fontSize="10" fill="var(--accent-amber)" fontWeight="bold">Range = {'{a, b}'}</text>
            </svg>
          </div>

          <p className="text-[11px] text-[var(--text-secondary)] mt-2 leading-relaxed">
            <strong>Key Insight:</strong> Elements 2 and 3 both map into <code>b</code> (Many-to-One). Element <code>c</code> is in Codomain B but is not hit by any arrow, so Range $\subset$ Codomain.
          </p>
        </div>

        {/* Function Curve Graph: y = x^2 (Directly matching Reference Screen 3 graph!) */}
        <div className="p-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)]">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-semibold text-[var(--text-primary)]">Interactive Parabolic Graph: $y = x^2$</span>
            <span className="text-[11px] font-mono font-bold text-[var(--accent-primary)]">
              f({testInputX}) = {calculatedY}
            </span>
          </div>

          {/* Interactive Slider */}
          <div className="mb-3 flex items-center gap-3">
            <span className="text-[11px] text-[var(--text-muted)] font-mono">x: -4</span>
            <input
              type="range"
              min="-4"
              max="4"
              step="0.5"
              value={testInputX}
              onChange={(e) => setTestInputX(Number(e.target.value))}
              className="flex-1 accent-[var(--accent-primary)] h-1.5 bg-[var(--bg-secondary)] rounded-lg cursor-pointer"
            />
            <span className="text-[11px] text-[var(--text-muted)] font-mono">x: +4</span>
          </div>

          {/* Canvas SVG for y = x^2 */}
          <div className="flex justify-center">
            <svg viewBox="-120 -10 240 180" className="w-full max-w-[280px] h-[160px] select-none">
              {/* Axes */}
              <line x1="-110" y1="150" x2="110" y2="150" stroke="var(--border-main)" strokeWidth="1.5" />
              <line x1="0" y1="10" x2="0" y2="165" stroke="var(--border-main)" strokeWidth="1.5" />
              <text x="105" y="145" fontSize="10" fill="var(--text-muted)" textAnchor="end">x</text>
              <text x="8" y="20" fontSize="10" fill="var(--text-muted)">y</text>

              {/* Grid ticks */}
              {[-3, -2, -1, 1, 2, 3].map((val) => (
                <line key={val} x1={val * 25} y1="147" x2={val * 25} y2="153" stroke="var(--border-main)" />
              ))}

              {/* Smooth Parabola Path */}
              <path
                d="M -90 20 Q 0 170 90 20"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2.5"
              />

              {/* Calculated dynamic point */}
              {/* Scale: x: 1 unit = 25px, y: 1 unit = 8.5px. y=150 is zero */}
              <circle
                cx={testInputX * 25}
                cy={150 - (testInputX * testInputX * 8.1)}
                r="5"
                fill="var(--accent-amber)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <text
                x={testInputX * 25 + (testInputX > 0 ? -10 : 10)}
                y={150 - (testInputX * testInputX * 8.1) - 8}
                textAnchor={testInputX > 0 ? "end" : "start"}
                fontSize="10"
                fontWeight="bold"
                fill="var(--accent-amber)"
              >
                ({testInputX}, {calculatedY})
              </text>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // 2. PYTHON MEMORY ALLOCATION (STACK VS HEAP)
  if (visual.type === 'python_memory') {
    return (
      <div className="p-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] text-xs">
        <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
          <span className="font-semibold text-[var(--text-primary)]">Python Memory Model: Name Binding</span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">Heap Object References</span>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-main)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">CALL STACK (Labels)</span>
            <div className="space-y-1.5">
              <div className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] flex justify-between">
                <span className="font-bold text-[var(--accent-primary)]">x</span>
                <span className="text-[var(--text-muted)]">→ 0x7FFF</span>
              </div>
              <div className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] flex justify-between">
                <span className="font-bold text-[var(--accent-primary)]">y</span>
                <span className="text-[var(--text-muted)]">→ 0x7FFF</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-main)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] block mb-1">MANAGED HEAP</span>
            <div className="p-2 rounded bg-[var(--bg-surface)] border border-emerald-500/40">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">Addr: 0x7FFF</span>
              <div className="mt-1 text-slate-800 dark:text-slate-200">
                Type: <code>int</code><br />
                Value: <strong>42</strong><br />
                Ref count: <strong>2</strong>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[var(--text-secondary)] mt-3">
          <strong>Key Insight:</strong> <code>x</code> and <code>y</code> are two stickers pointing to the exact same immutable integer 42 on the heap.
        </p>
      </div>
    );
  }

  // 3. PHYSICS NEWTON'S LAWS (FREE BODY DIAGRAM)
  if (visual.type === 'newton_forces') {
    return (
      <div className="p-4 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] text-xs">
        <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
          <span className="font-semibold text-[var(--text-primary)]">Free-Body Diagram: Static Equilibrium vs 3rd Law</span>
          <button
            onClick={() => setShowReaction(!showReaction)}
            className="text-[10px] px-2 py-0.5 rounded font-mono border border-[var(--border-main)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          >
            {showReaction ? 'Showing: 3rd Law Pair' : 'Showing: Net Equilibrium'}
          </button>
        </div>

        <div className="w-full flex justify-center py-2">
          <svg viewBox="0 0 280 180" className="w-full max-w-[240px] h-[160px] select-none">
            {/* Table Surface */}
            <rect x="20" y="110" width="240" height="12" fill="var(--bg-secondary)" stroke="var(--border-main)" strokeWidth="1.5" rx="2" />
            <line x1="60" y1="122" x2="60" y2="160" stroke="var(--border-main)" strokeWidth="2" />
            <line x1="220" y1="122" x2="220" y2="160" stroke="var(--border-main)" strokeWidth="2" />

            {/* Book Box */}
            <rect x="90" y="60" width="100" height="50" fill="var(--bg-surface)" stroke="var(--accent-primary)" strokeWidth="2" rx="4" />
            <text x="140" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-primary)">Book (m=2kg)</text>

            {/* Downward Gravity Force Vector */}
            <line x1="140" y1="85" x2="140" y2="145" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="148" y="138" fontSize="10" fill="#EF4444" fontWeight="bold">F_gravity = 19.6N</text>

            {/* Upward Normal Force Vector */}
            <line x1="140" y1="85" x2="140" y2="25" stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="148" y="35" fontSize="10" fill="#10B981" fontWeight="bold">F_normal = 19.6N</text>

            {/* Net force indicator */}
            <text x="140" y="172" textAnchor="middle" fontSize="10" fontStyle="italic" fill="var(--text-muted)">
              {showReaction ? '3rd Law: Earth pulls book ↔ Book pulls Earth (opp bodies)' : 'Equilibrium: F_normal - F_gravity = 0 (same body)'}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
};
