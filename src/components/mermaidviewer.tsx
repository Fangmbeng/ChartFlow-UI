'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidViewerProps {
  code: string;
}

export default function MermaidViewer({ code }: MermaidViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      const uniqueId = `mermaid-${Math.floor(Math.random() * 1000000)}`;
      mermaid.initialize({ startOnLoad: false });

      try {
        const { svg } = await mermaid.render(uniqueId, code);
        containerRef.current.innerHTML = svg;

        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('width', '100%');
          svgElement.setAttribute('height', 'auto');
          svgElement.setAttribute('preserveAspectRatio', 'xMinYMin meet');
          svgElement.style.backgroundColor = '#ffffff'; // ✅ Force white background

          // Optional: style arrows/labels to be dark for readability
          const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
          style.innerHTML = `
            .edgeLabel, .label, text {
              fill: #000 !important;
            }
            .edgePath path, .arrowheadPath, .flowchart-link {
              stroke: #333 !important;
              stroke-width: 2 !important;
            }
          `;
          svgElement.prepend(style);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown rendering error';
        containerRef.current.innerHTML = `<pre class="text-red-500">Mermaid render error: ${errorMessage}</pre>`;
      }
    };

    renderDiagram();
  }, [code]);

  return (
    <div
      ref={containerRef}
      className="overflow-auto border p-4 rounded-lg"
      style={{ minHeight: '400px', maxWidth: '100%', backgroundColor: '#ffffff' }} // ✅ outer container also white
    />
  );
}
