import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  // Parse content for block math ($$...$$), inline math ($...$), and basic markdown formatting
  const renderFormatted = () => {
    // Split by block math first: $$ ... $$
    const blockParts = content.split(/(\$\$[\s\S]*?\$\$)/g);

    return blockParts.map((block, bIdx) => {
      if (block.startsWith('$$') && block.endsWith('$$')) {
        const mathExpr = block.slice(2, -2).trim();
        try {
          const html = katex.renderToString(mathExpr, {
            displayMode: true,
            throwOnError: false,
          });
          return (
            <div
              key={`block-math-${bIdx}`}
              className="my-3 py-2 px-3 rounded-lg bg-slate-900/90 border border-indigo-900/50 overflow-x-auto text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch (err) {
          return (
            <pre key={`err-${bIdx}`} className="text-rose-400 font-mono text-xs">
              {mathExpr}
            </pre>
          );
        }
      }

      // Handle paragraphs and inline math
      const paragraphs = block.split(/\n\n+/);

      return (
        <div key={`p-group-${bIdx}`} className="space-y-2">
          {paragraphs.map((p, pIdx) => {
            if (!p.trim()) return null;

            // Split by inline math: $ ... $
            const inlineParts = p.split(/(\$[^$\n]+?\$)/g);

            return (
              <p key={`p-${pIdx}`} className="leading-relaxed">
                {inlineParts.map((part, iIdx) => {
                  if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
                    const mathExpr = part.slice(1, -1).trim();
                    try {
                      const html = katex.renderToString(mathExpr, {
                        displayMode: false,
                        throwOnError: false,
                      });
                      return (
                        <span
                          key={`inline-math-${iIdx}`}
                          className="inline-block px-1 text-indigo-300 font-medium"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      );
                    } catch (err) {
                      return <span key={`inline-err-${iIdx}`}>{part}</span>;
                    }
                  }

                  // Handle bold (**text**) and code (`code`)
                  const subTokens = part.split(/(\*\*[^*]+?\*\*|`[^`]+?`)/g);

                  return (
                    <span key={`text-token-${iIdx}`}>
                      {subTokens.map((token, tIdx) => {
                        if (token.startsWith('**') && token.endsWith('**')) {
                          return (
                            <strong key={`b-${tIdx}`} className="text-white font-semibold">
                              {token.slice(2, -2)}
                            </strong>
                          );
                        }
                        if (token.startsWith('`') && token.endsWith('`')) {
                          return (
                            <code
                              key={`c-${tIdx}`}
                              className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[13px] border border-slate-700/60"
                            >
                              {token.slice(1, -1)}
                            </code>
                          );
                        }
                        return <span key={`t-${tIdx}`}>{token}</span>;
                      })}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return <div className={`text-slate-300 ${className}`}>{renderFormatted()}</div>;
};
