'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidViewerProps {
  code: string
}

export default function MermaidViewer({ code }: MermaidViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return

      const uniqueId = `mermaid-${Math.floor(Math.random() * 1000000)}`
      mermaid.initialize({ startOnLoad: false })

      try {
        const { svg } = await mermaid.render(uniqueId, code)
        containerRef.current.innerHTML = svg
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        containerRef.current.innerHTML = `<pre class="text-red-500">Error rendering diagram: ${errorMessage}</pre>`
      }
    }

    renderDiagram()
  }, [code])

  return (
    <div
      ref={containerRef}
      className="overflow-auto rounded-lg border p-4 bg-white dark:bg-gray-800"
    />
  )
}