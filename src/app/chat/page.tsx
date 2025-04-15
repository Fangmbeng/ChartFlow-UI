'use client';

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, History, Send, Clock, Moon, Sun, Laptop } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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

export default function GitFlowAI() {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [businessType, setBusinessType] = useState("");
  const [businessSector, setBusinessSector] = useState("");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("generator");
  const [theme, setTheme] = useState("system");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
  const [viewMode, setViewMode] = useState<'diagram' | 'documentation' | 'risk'>('diagram');
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);

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

  // Generate mermaid diagram based on prompt
  const generateMermaidDiagram = (requirements: string, type: string, sector: string): string => {
    // This is a simplified example - in a real application, you'd call an AI API
    // For now, let's return a sample architecture diagram based on the business sector
    
    if (sector === "fintech") {
      return `
graph TD
    Client[Client App] --> API[API Gateway]
    API --> Auth[Auth Service]
    API --> Trans[Transaction Service]
    API --> Acc[Account Service]
    Trans --> DB[(Transaction DB)]
    Acc --> DB2[(Account DB)]
    Auth --> DB3[(User DB)]
    Trans --> MQ[Message Queue]
    MQ --> Analytics[Analytics Service]
    Analytics --> DW[(Data Warehouse)]
`;
    } else if (sector === "ecommerce") {
      return `
graph TD
    Client[Web/Mobile Client] --> CDN[CDN]
    CDN --> API[API Gateway]
    API --> Auth[Auth Service]
    API --> Catalog[Product Catalog]
    API --> Cart[Shopping Cart]
    API --> Order[Order Management]
    API --> Payment[Payment Processing]
    Catalog --> ProductDB[(Product DB)]
    Cart --> CartDB[(Cart DB)]
    Order --> OrderDB[(Order DB)]
    Order --> MQ[Message Queue]
    MQ --> Shipping[Shipping Service]
    MQ --> Inventory[Inventory Service]
    MQ --> Analytics[Analytics Engine]
`;
    } else {
      return `
graph TD
    Client[Client Applications] --> API[API Gateway]
    API --> Auth[Authentication]
    API --> Core[Core Service]
    Core --> DB[(Database)]
    Core --> Cache[(Cache)]
    Core --> Queue[Message Queue]
    Queue --> Worker[Background Workers]
    Worker --> Storage[(Object Storage)]
`;
    }
  };

  // Generate documentation based on architecture
  const generateDocumentation = (mermaidCode: string, type: string, sector: string): string => {
    // In a real app, you'd use an AI to generate this based on the diagram
    return `# Architecture Documentation

## Overview
This architecture is designed for a ${type} in the ${sector} sector, focusing on scalability, security, and maintainability.

## Components
- **Client Applications**: Web and mobile interfaces for user interaction
- **API Gateway**: Central entry point that routes requests to appropriate services
- **Authentication Service**: Handles user authentication and authorization
- **Core Services**: Business logic implementation
- **Databases**: Persistent storage for application data
- **Message Queue**: Facilitates asynchronous communication between services

## Design Considerations
- Microservices architecture for component isolation
- RESTful API design for service communication
- Database sharding for horizontal scaling
- Containerized deployment for consistent environments

## Implementation Guidelines
1. Use API-first development approach
2. Implement CI/CD pipelines for automated testing and deployment
3. Utilize container orchestration for service management
4. Implement comprehensive monitoring and logging`;
  };

  // Generate risk analysis
  const generateRiskAnalysis = (mermaidCode: string, type: string, sector: string): string => {
    // In a real app, you'd use an AI to generate this
    return `# Risk Analysis & Future Considerations

## Current Risks
1. **Scalability Challenges**: The current architecture may face bottlenecks at the database layer during peak usage periods.
2. **Security Vulnerabilities**: API Gateway requires robust authentication mechanisms to prevent unauthorized access.
3. **Service Dependencies**: Tight coupling between certain services could lead to cascading failures.

## Mitigation Strategies
1. Implement database read replicas and consider NoSQL options for specific high-volume data
2. Deploy Web Application Firewall (WAF) and implement rate limiting
3. Adopt circuit breaker patterns and fallback mechanisms

## Future Considerations
1. **AI Integration**: Consider adding machine learning models for predictive analytics
2. **Blockchain Implementation**: Explore distributed ledger technology for improved transparency (${sector === 'fintech' ? 'especially relevant for financial transactions' : ''})
3. **Edge Computing**: Evaluate moving certain processing closer to end users for reduced latency
4. **Serverless Architecture**: Consider migrating appropriate services to serverless functions for improved scalability and cost efficiency`;
  };

  const handleGenerate = async () => {
    if (!prompt || !businessType || !businessSector) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate diagrams using AI (simulated here)
      const architectureTypes = ["Microservices", "Event-Driven", "Serverless"];
      const generatedDiagrams = architectureTypes.map((archType, index) => {
        const mermaidCode = generateMermaidDiagram(prompt, businessType, businessSector);
        const documentation = generateDocumentation(mermaidCode, businessType, businessSector);
        const riskAnalysis = generateRiskAnalysis(mermaidCode, businessType, businessSector);
        
        return {
          id: index + 1,
          title: `${archType} Architecture`,
          mermaidCode,
          documentation,
          riskAnalysis,
          timestamp: new Date().toISOString()
        };
      });
      
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
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      
      // In a real app, you would extract text from the file
      // For now, let's simulate this with a placeholder
      setPrompt(`Processing requirements from: ${e.target.files[0].name}\n\nExtracted requirements will appear here...`);
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
                  <Input type="file" onChange={handleFileUpload} className="hidden" />
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
                          
                          <Button 
                            variant="ghost" 
                            className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
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
                    {viewMode === 'diagram' && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl overflow-auto">
                        <pre className="text-xs">{selectedDiagram.mermaidCode}</pre>
                        {/* In a real app, you would render the Mermaid diagram here */}
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                          [Mermaid diagram would render here in the actual app]
                        </div>
                      </div>
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
                    <Button variant="outline" size="sm">
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

      <footer className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
        <p>GitFlow AI • Intelligent Architecture Generator • © 2025</p>
      </footer>
    </div>
  );
}