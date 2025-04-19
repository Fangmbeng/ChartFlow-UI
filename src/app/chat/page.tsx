'use client';

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, History, Send, Clock, Moon, Sun, Laptop, AlertCircle,ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MermaidViewer from "@/components/mermaidviewer"
import SlidePanel from "@/components/slidePanel";
// import { GEMINI_API_KEY, GEMINI_API_URL } from "../../../config/gemini.config";
import { GROQ_API_KEY, GROQ_API_URL, GROQ_MODELS } from "../../../config/groq.config";

type Diagram = {
  id: number;
  title: string;
  mermaidCode?: string;
  documentation?: string;
  riskAnalysis?: string;
  timestamp: string;
};

type HistoryItem = {
  id: number;
  prompt: string;
  businessType: string;
  businessSector: string;
  timestamp: string;
  diagrams: Diagram[];
};

type ResponseData = {
  diagrams: Diagram[];
};

interface AIPromptParams {
  prompt: string;
  businessType: string;
  businessSector: string;
  budget?: string;
  audience?: string;
  securityRequirements?: string;
}


export default function GitFlowAI() {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [businessType, setBusinessType] = useState("");
  const [businessSector, setBusinessSector] = useState("");
  const [budget, setBudget] = useState("");
  const [audience, setAudience] = useState("");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("generator");
  const [theme, setTheme] = useState("system");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
  const [viewMode, setViewMode] = useState<'diagram' | 'documentation' | 'risk'>('diagram');
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelContent, setPanelContent] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);
  
  const openPanel = (title: string, content: React.ReactNode) => {
    setPanelContent({ title, content });
    setIsPanelOpen(true);
  };
  
  const closePanel = () => {
    setIsPanelOpen(false);
  };
  const viewDiagramInSidePanel = (diagram: Diagram, mode: 'diagram' | 'documentation' | 'risk') => {
    let content;
    
    if (mode === 'diagram' && diagram?.mermaidCode) {
      content = <MermaidViewer code={diagram.mermaidCode} />;
    } else if (mode === 'documentation') {
      content = (
        <div className="prose dark:prose-invert max-w-none">
          {diagram.documentation?.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line.startsWith('# ') ? (
              <h1 className="text-2xl font-bold mb-4">{line.substring(2)}</h1>
            ) : line.startsWith('## ') ? (
              <h2 className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>
            ) : line.startsWith('- ') ? (
              <li className="ml-4">{line.substring(2)}</li>
            ) : line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? (
              <div className="flex items-start mt-1">
                <span className="font-medium mr-2">{line.split('.')[0]}.</span>
                <span>{line.split('.').slice(1).join('.')}</span>
              </div>
            ) : (
              <p className="my-2">{line}</p>
            )}
            </React.Fragment>
          ))}
        </div>
      );
    } else if (mode === 'risk') {
      content = (
        <div className="prose dark:prose-invert max-w-none">
          {diagram.riskAnalysis?.split('\n').map((line, i) => (
            <React.Fragment key={i}>
            {line.startsWith('# ') ? (
              <h1 className="text-2xl font-bold mb-4">{line.substring(2)}</h1>
            ) : line.startsWith('## ') ? (
              <h2 className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>
            ) : line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? (
              <div className="flex items-start mt-1">
                <span className="font-medium mr-2">{line.split('.')[0]}.</span>
                <div>
                  <span className="font-medium">{line.split(':')[0].split('.').slice(1).join('.')}:</span>
                  <span>{line.split(':').slice(1).join(':')}</span>
                </div>
              </div>
            ) : (
              <p className="my-2">{line}</p>
            )}
          </React.Fragment>
          ))}
        </div>
      );
    }
    
    const title = `${diagram.title} - ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
    openPanel(title, content);
  };

  // Detect system theme preference
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      document.documentElement.classList.toggle("dark", mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };
      
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  // Generate AI prompts based on user input and architecture type
  // Generate AI prompts optimized for Groq
  const generateAIPrompt = (type: string, params: AIPromptParams) => {
    const securityContext = `Security considerations:
    - SDLC integration: Implement security checkpoints at each development phase
    - Risk assessment based on business type (${params.businessType}) and sector (${params.businessSector})
    - Budget constraints: ${params.budget || 'Not specified'}
    - Target audience: ${params.audience || 'Not specified'}
    - Compliance requirements for ${params.businessSector} sector`;
  
    const prompts: { [key: string]: string } = {
      combined: `Generate a complete ${type} architecture for:
      Business: ${params.businessType} in ${params.businessSector}
      Requirements: ${params.prompt}
      Budget: ${params.budget || 'Not specified'}
      Audience: ${params.audience || 'Not specified'}
      
      ${securityContext}
      
      Provide THREE SECTIONS separated by ###SECTION###:
      1. Mermaid diagram code ONLY (include security elements, components, relationships)
      2. Documentation (architecture overview, component descriptions, deployment strategy, CI/CD, monitoring)
      3. Risk analysis (security risks, scalability challenges, compliance, business continuity, mitigation strategies)
      
      Format EXACTLY as requested. No additional text.`
    };
  
    return prompts.combined;
  };

  // Call Groq API with retry logic
  const callGroq = async (prompt: string, retries = 3): Promise<string> => {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODELS.LLAMA3_3_70B, // Using LLaMA 3.3 70B
          messages: [
            {
              role: "system",
              content: "You are an expert software architect with deep knowledge of security best practices, SDLC, and compliance requirements. Provide responses in the exact format requested."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 8192,
          top_p: 0.95,
        }),
      });

      if (response.status === 429 && retries > 0) {
        // Exponential backoff for rate limits
        await new Promise(r => setTimeout(r, Math.pow(2, 4 - retries) * 1000));
        return callGroq(prompt, retries - 1);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(`API error: ${response.status} - ${errorData?.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      if (retries > 0) {
        await new Promise(r => setTimeout(r, Math.pow(2, 4 - retries) * 1000));
        return callGroq(prompt, retries - 1);
      }
      throw error;
    }
  };

  const handleGenerate = async () => {
    if (!prompt || !businessType || !businessSector) {
      setError("Please fill in all required fields");
      return;
    }

    if (!GROQ_API_KEY) {
      setError("Groq API key is not configured. Please set NEXT_PUBLIC_GROQ_API_KEY in your environment.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const architectureTypes = ["Microservices", "Event-Driven", "Serverless"];
      const generatedDiagrams: Diagram[] = [];

      for (let i = 0; i < architectureTypes.length; i++) {
        const archType = architectureTypes[i];
        const params: AIPromptParams = {
          prompt,
          businessType,
          businessSector,
          budget,
          audience
        };

        const combinedPrompt = generateAIPrompt(archType, params);
        
        // Add delay between requests to avoid rate limits
        if (i > 0) {
          await new Promise(r => setTimeout(r, 1000));
        }
        
        const response = await callGroq(combinedPrompt);
        
        // Parse the response to extract three sections
        const sections = response.split('###SECTION###').map((s: string) => s.trim());
        
        if (sections.length >= 3) {
          generatedDiagrams.push({
            id: i + 1,
            title: `${archType} Architecture`,
            mermaidCode: extractMermaidCode(sections[0]),
            documentation: sections[1],
            riskAnalysis: sections[2],
            timestamp: new Date().toISOString()
          });
        } else {
          console.warn(`Invalid response format for ${archType} architecture`);
          throw new Error('Invalid response format from AI');
        }
      }
      
      const newResponseData = { diagrams: generatedDiagrams };
      setResponseData(newResponseData);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        prompt,
        businessType,
        businessSector,
        timestamp: new Date().toISOString(),
        diagrams: generatedDiagrams
      };
      
      setHistory(prev => [historyItem, ...prev]);
    } catch (error) {
      console.error('Error generating architecture:', error);
      setError(`Failed to generate architecture: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to extract mermaid code from potential markdown code blocks
  const extractMermaidCode = (response: string): string => {
    // Check if response is wrapped in markdown code block
    const mermaidBlockRegex = /```(?:mermaid)?\s*([\s\S]*?)```/;
    const match = response.match(mermaidBlockRegex);
    
    if (match && match[1]) {
      return match[1].trim();
    }
    
    // If not in a code block, return as is
    return response.trim();
  };


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      
      // Read file content
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        setPrompt(content);
      };
      reader.readAsText(uploadedFile);
    }
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setBusinessType(item.businessType);
    setBusinessSector(item.businessSector);
    setResponseData({ diagrams: item.diagrams });
    setSelectedHistoryItem(item);
    setActiveTab("generator");
  };

  const viewDiagramDetails = (diagram: Diagram, mode: 'diagram' | 'documentation' | 'risk') => {
    setSelectedDiagram(diagram);
    setViewMode(mode);
  };

  const downloadAsset = (diagram: Diagram, type: 'diagram' | 'documentation' | 'risk') => {
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (type) {
      case 'diagram':
        content = diagram.mermaidCode || '';
        filename = `${diagram.title.toLowerCase().replace(/\s+/g, '-')}-diagram.mmd`;
        mimeType = 'text/plain';
        break;
      case 'documentation':
        content = diagram.documentation || '';
        filename = `${diagram.title.toLowerCase().replace(/\s+/g, '-')}-documentation.md`;
        mimeType = 'text/markdown';
        break;
      case 'risk':
        content = diagram.riskAnalysis || '';
        filename = `${diagram.title.toLowerCase().replace(/\s+/g, '-')}-risk-analysis.md`;
        mimeType = 'text/markdown';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 shadow-xl rounded-xl max-w-7xl mx-auto my-8 p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">GitFlow AI</h1>
            <p className="text-gray-600 dark:text-gray-300">Intelligent Software Architecture Generator</p>
          </div>
          
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setTheme("light")} 
                    className={`${theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                    <Sun size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Light Mode</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setTheme("dark")}
                    className={`${theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                    <Moon size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Dark Mode</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setTheme("system")}
                    className={`${theme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                    <Laptop size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>System Theme</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="generator" className="text-md py-3">
              <div className="flex items-center">
                <Send className="mr-2 h-5 w-5" />
                Generator
              </div>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-md py-3">
              <div className="flex items-center">
                <History className="mr-2 h-5 w-5" />
                History
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Type</label>
                <Select onValueChange={setBusinessType} value={businessType}>
                  <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm">
                    <SelectValue placeholder="Select Business Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="smb">Small/Medium Business</SelectItem>
                    <SelectItem value="nonprofit">Non-Profit</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Sector</label>
                <Select onValueChange={setBusinessSector} value={businessSector}>
                  <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm">
                    <SelectValue placeholder="Select Business Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fintech">FinTech</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                    <SelectItem value="social">Social / Media</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="iot">IoT / Embedded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Range</label>
                <Select onValueChange={setBudget} value={budget}>
                  <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm">
                    <SelectValue placeholder="Select Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal (&lt;$50K)</SelectItem>
                    <SelectItem value="low">Low ($50K - $200K)</SelectItem>
                    <SelectItem value="medium">Medium ($200K - $1M)</SelectItem>
                    <SelectItem value="high">High ($1M - $5M)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (&gt;$5M)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Audience</label>
                <Select onValueChange={setAudience} value={audience}>
                  <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm">
                    <SelectValue placeholder="Select Target Audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consumer">General Consumers</SelectItem>
                    <SelectItem value="business">Business Users</SelectItem>
                    <SelectItem value="developer">Developers</SelectItem>
                    <SelectItem value="enterprise">Enterprise Clients</SelectItem>
                    <SelectItem value="government">Government Organizations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business & Technical Requirements</label>
              <Textarea
                placeholder="Describe your application requirements, user needs, technical constraints, and business goals..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[180px] backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm resize-y"
              />

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <label className="flex items-center cursor-pointer px-4 py-2 rounded-lg backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 shadow-sm hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all">
                  <Upload className="mr-2 h-5 w-5" />
                  <Input type="file" onChange={handleFileUpload} className="hidden" accept=".txt,.md,.pdf,.docx" />
                  <span className="text-sm">{file ? file.name : "Upload Business Plan / Requirements"}</span>
                </label>

                <Button 
                  onClick={handleGenerate} 
                  className="ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    "Generate Architectures"
                  )}
                </Button>
              </div>
            </div>

            {responseData && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold px-2">Generated Architectures</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {responseData.diagrams.map((diagram) => (
                    <Card key={diagram.id} className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold">{diagram.title}</h3>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            <Clock className="mr-1 h-3 w-3" />
                            New
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <Button 
                            variant="default" 
                            className="w-full shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            onClick={() => viewDiagramDetails(diagram, 'diagram')}
                          >
                            View Architecture Diagram
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full shadow-sm backdrop-blur-sm bg-white/80 dark:bg-gray-700/80"
                            onClick={() => viewDiagramDetails(diagram, 'documentation')}
                          >
                            📄 View Documentation
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full shadow-sm backdrop-blur-sm bg-white/80 dark:bg-gray-700/80"
                            onClick={() => viewDiagramDetails(diagram, 'risk')}
                          >
                            🧠 Future Considerations & Risk
                          </Button>

                          {/* Add a new button for the side panel */}
                          <Button 
                            variant="outline" 
                            className="w-full shadow-sm backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 mt-2"
                            onClick={() => viewDiagramInSidePanel(diagram, 'diagram')}
                          >
                            <ArrowRight className="mr-2 h-4 w-4" /> Quick View
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            onClick={() => downloadAsset(diagram, 'diagram')}
                          >
                            <Download className="mr-2 h-4 w-4" /> Download Assets
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {selectedDiagram && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                  <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-xl font-medium">{selectedDiagram.title}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedDiagram(null)}>✕</Button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {viewMode === 'diagram' && selectedDiagram?.mermaidCode && (
                    <MermaidViewer code={selectedDiagram.mermaidCode} />
                  )}
                                      
                    {viewMode === 'documentation' && (
                      <div className="prose dark:prose-invert max-w-none">
                        {selectedDiagram.documentation?.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line.startsWith('# ') ? (
                              <h1 className="text-2xl font-bold mb-4">{line.substring(2)}</h1>
                            ) : line.startsWith('## ') ? (
                              <h2 className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>
                            ) : line.startsWith('- ') ? (
                              <li className="ml-4">{line.substring(2)}</li>
                            ) : line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? (
                              <div className="flex items-start mt-1">
                                <span className="font-medium mr-2">{line.split('.')[0]}.</span>
                                <span>{line.split('.').slice(1).join('.')}</span>
                              </div>
                            ) : (
                              <p className="my-2">{line}</p>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                    
                    {viewMode === 'risk' && (
                      <div className="prose dark:prose-invert max-w-none">
                        {selectedDiagram.riskAnalysis?.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line.startsWith('# ') ? (
                              <h1 className="text-2xl font-bold mb-4">{line.substring(2)}</h1>
                            ) : line.startsWith('## ') ? (
                              <h2 className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>
                            ) : line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? (
                              <div className="flex items-start mt-1">
                                <span className="font-medium mr-2">{line.split('.')[0]}.</span>
                                <div>
                                  <span className="font-medium">{line.split(':')[0].split('.').slice(1).join('.')}:</span>
                                  <span>{line.split(':').slice(1).join(':')}</span>
                                </div>
                              </div>
                            ) : (
                              <p className="my-2">{line}</p>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex gap-2">
                      <Button 
                        variant={viewMode === 'diagram' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setViewMode('diagram')}
                      >
                        Diagram
                      </Button>
                      <Button 
                        variant={viewMode === 'documentation' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setViewMode('documentation')}
                      >
                        Documentation
                      </Button>
                      <Button 
                        variant={viewMode === 'risk' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setViewMode('risk')}
                      >
                        Risk Analysis
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => downloadAsset(selectedDiagram, viewMode)}
                    >
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-semibold">Generation History</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Your previous architecture generations</p>
              </div>
              
              {history.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <History className="mx-auto h-12 w-12 mb-4 opacity-30" />
                  <p>No history yet. Generate your first architecture!</p>
                </div>
              ) : (
                <div className="divide-y dark:divide-gray-700">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer transition-colors ${
                        selectedHistoryItem?.id === item.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => loadHistoryItem(item)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium mb-1 line-clamp-1">
                            {item.prompt.length > 50 ? `${item.prompt.substring(0, 50)}...` : item.prompt}
                          </h3>
                          <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                              {item.businessType}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                              {item.businessSector}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(item.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        {item.diagrams.map((diagram) => (
                          <Badge key={diagram.id} variant="secondary" className="text-xs">
                            {diagram.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

        {/* Add the new slide panel component */}
        {isPanelOpen && panelContent && (
      <>
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closePanel}
        ></div>
        <SlidePanel
          isOpen={isPanelOpen}
          onClose={closePanel}
          title={panelContent.title}
          position="left"
          >
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (selectedDiagram) {
                  const mode = panelContent.title.toLowerCase().includes('diagram') 
                    ? 'diagram' 
                    : panelContent.title.toLowerCase().includes('documentation')
                      ? 'documentation'
                      : 'risk';
                  downloadAsset(selectedDiagram, mode as 'diagram' | 'documentation' | 'risk');
                }
              }}
              className="flex items-center"
            >
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
          {panelContent.content}
        </SlidePanel>
      </>
    )}


      <footer className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
        <p>GitFlow AI • Intelligent Architecture Generator • © 2025</p>
      </footer>
    </div>
  );
}