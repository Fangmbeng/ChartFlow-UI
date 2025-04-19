// 'use client';

// import React, { useState, useEffect, useRef } from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Download, Upload, History, Send, Clock, Moon, Sun, Laptop, Shield, Users, Target, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Avatar } from "@/components/ui/avatar";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
// import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import mammoth from 'mammoth';

// // Types for our application
// type SecurityLevel = 'basic' | 'standard' | 'enhanced' | 'high-compliance';
// type BudgetLevel = 'minimal' | 'standard' | 'enterprise' | 'unlimited';
// type AudienceType = 'internal' | 'b2b' | 'b2c' | 'mixed';

// type Diagram = {
//   id: number;
//   title: string;
//   mermaidCode: string;
//   documentation: string;
//   riskAnalysis: string;
//   securityAnalysis: string;
//   timestamp: string;
//   matchScore?: number;
// };

// type HistoryItem = {
//   id: number;
//   prompt: string;
//   businessType: string;
//   businessSector: string;
//   securityLevel: SecurityLevel;
//   budgetLevel: BudgetLevel;
//   audienceType: AudienceType;
//   goals: string[];
//   timestamp: string;
//   diagrams: Diagram[];
// };

// type GoalOption = {
//   id: string;
//   label: string;
//   description: string;
//   category: 'scalability' | 'security' | 'performance' | 'usability' | 'business';
// };

// // Default goals by category
// const defaultGoals: GoalOption[] = [
//   { id: 'high-scalability', label: 'High Scalability', description: 'Ability to handle significant growth in users or workload', category: 'scalability' },
//   { id: 'global-distribution', label: 'Global Distribution', description: 'Infrastructure that supports users worldwide', category: 'scalability' },
//   { id: 'high-availability', label: 'High Availability (99.9%+)', description: 'Minimizing downtime and ensuring continuous operation', category: 'performance' },
//   { id: 'low-latency', label: 'Low Latency', description: 'Fast response times and minimal processing delays', category: 'performance' },
//   { id: 'data-protection', label: 'Data Protection & Privacy', description: 'Safeguarding sensitive information and ensuring compliance', category: 'security' },
//   { id: 'regulatory-compliance', label: 'Regulatory Compliance', description: 'Meeting industry-specific regulations (GDPR, HIPAA, etc.)', category: 'security' },
//   { id: 'user-friendly', label: 'User-Friendly Interface', description: 'Intuitive design that requires minimal training', category: 'usability' },
//   { id: 'mobile-first', label: 'Mobile-First Design', description: 'Prioritizing mobile user experience', category: 'usability' },
//   { id: 'cost-efficiency', label: 'Cost Efficiency', description: 'Minimizing infrastructure and operational costs', category: 'business' },
//   { id: 'time-to-market', label: 'Rapid Time-to-Market', description: 'Quick development and deployment cycles', category: 'business' },
// ];

// // AI API service with actual OpenAI integration
// const aiService = {
//   generateArchitecture: async (params: {
//     prompt: string;
//     businessType: string;
//     businessSector: string;
//     securityLevel: SecurityLevel;
//     budgetLevel: BudgetLevel;
//     audienceType: AudienceType;
//     goals: string[];
//     fileContent?: string;
//   }): Promise<{diagrams: Diagram[]}> => {
//     try {
//       // Construct a rich prompt for the AI
//       const systemPrompt = `You are an expert software architect specialized in designing secure, scalable, and efficient architectures. You'll design appropriate software architectures based on the following requirements. Provide detailed diagrams in Mermaid format, comprehensive documentation, risk analysis, and security considerations.`;
      
//       // Create a structured and detailed prompt for the AI
//       const userPrompt = `
// Design three distinct appropriate software architectures for the following requirements:

// BUSINESS PROFILE:
// - Type: ${params.businessType}
// - Sector: ${params.businessSector}
// - Target Audience: ${params.audienceType}
// - Security Requirements: ${params.securityLevel}
// - Budget Level: ${params.budgetLevel}
// - Key Business Goals: ${params.goals.join(', ')}

// SPECIFIC REQUIREMENTS:
// ${params.prompt}
// ${params.fileContent ? `\nAdditional context from document: ${params.fileContent}` : ''}

// For each architecture, provide the following in JSON format:
// 1. title: A descriptive name for the architecture with a match score percentage
// 2. mermaidCode: Detailed architecture diagram using Mermaid graph TD syntax
// 3. documentation: Technical documentation with overview, components, implementation guidelines
// 4. riskAnalysis: Analysis of risks and future considerations
// 5. securityAnalysis: Security implementation across the SDLC

// Format your response as a valid JSON object with an array called "architectures" containing three objects, each with the fields described above.
// `;

//       // In a production environment, you would call OpenAI or another AI service
//       // For demonstration purposes, we'll use a simulated API response for now
      
//       // Simulating API call delay
//       await new Promise(resolve => setTimeout(resolve, 3000));
      
//       // Determine which architectures would be most appropriate based on requirements
//       const architectureTypes = determineArchitectureTypes(params);
      
//       // Generate the actual response
//       const timestamp = new Date().toISOString();
//       const diagrams = architectureTypes.map((architecture, idx) => {
//         return {
//           id: idx + 1,
//           title: `${architecture.type} Architecture (${Math.round(architecture.suitability * 100)}% Match)`,
//           matchScore: Math.round(architecture.suitability * 100),
//           mermaidCode: generateMermaidDiagram(params, architecture.type),
//           documentation: generateDocumentation(params, architecture.type),
//           riskAnalysis: generateRiskAnalysis(params, architecture.type),
//           securityAnalysis: generateSecurityAnalysis(params, architecture.type),
//           timestamp
//         };
//       });
      
//       return { diagrams };
      
//       // In actual implementation with OpenAI:
//       /*
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//           model: "gpt-4-turbo",
//           messages: [
//             { role: "system", content: systemPrompt },
//             { role: "user", content: userPrompt }
//           ],
//           temperature: 0.7
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }
      
//       const data = await response.json();
//       const content = data.choices[0].message.content;
      
//       // Parse the JSON response from the AI
//       try {
//         const parsedContent = JSON.parse(content);
//         const diagrams = parsedContent.architectures.map((arch, idx) => ({
//           id: idx + 1,
//           title: arch.title,
//           mermaidCode: arch.mermaidCode,
//           documentation: arch.documentation,
//           riskAnalysis: arch.riskAnalysis,
//           securityAnalysis: arch.securityAnalysis,
//           timestamp: new Date().toISOString(),
//           matchScore: parseInt(arch.title.match(/\((\d+)%/)[1], 10) || 0
//         }));
        
//         return { diagrams };
//       } catch (e) {
//         console.error("Failed to parse AI response:", e);
//         throw new Error("Failed to parse architecture data");
//       }
//       */
//     } catch (error) {
//       console.error("Error generating architecture:", error);
//       throw new Error("Failed to generate architecture. Please try again.");
//     }
//   }
// };

// // Helper function to determine appropriate architecture types based on parameters
// const determineArchitectureTypes = (params: any) => {
//   const architectureTypes = [
//     { 
//       type: "Microservices", 
//       suitability: calculateSuitability("Microservices", params)
//     },
//     { 
//       type: "Event-Driven", 
//       suitability: calculateSuitability("Event-Driven", params)
//     },
//     { 
//       type: "Serverless", 
//       suitability: calculateSuitability("Serverless", params)
//     },
//     { 
//       type: "Monolithic-with-API", 
//       suitability: calculateSuitability("Monolithic-with-API", params)
//     },
//     { 
//       type: "Hexagonal", 
//       suitability: calculateSuitability("Hexagonal", params)
//     },
//     {
//       type: "CQRS", 
//       suitability: calculateSuitability("CQRS", params)
//     }
//   ];
  
//   // Sort by suitability and take top 3
//   return architectureTypes
//     .sort((a, b) => b.suitability - a.suitability)
//     .slice(0, 3);
// };

// // Calculate architecture suitability score based on business requirements
// const calculateSuitability = (architecture: string, params: any): number => {
//   let score = 0.5; // Base score
  
//   // Adjust score based on business type
//   if (architecture === "Microservices") {
//     if (params.businessType === 'enterprise') score += 0.2;
//     if (params.businessSector === 'fintech' || params.businessSector === 'ecommerce') score += 0.1;
//     if (params.budgetLevel === 'minimal') score -= 0.2;
//     if (params.goals.includes('high-scalability')) score += 0.15;
//   }
//   else if (architecture === "Event-Driven") {
//     if (params.businessSector === 'social' || params.businessSector === 'iot') score += 0.2;
//     if (params.goals.includes('high-scalability') || params.goals.includes('low-latency')) score += 0.1;
//     if (params.businessType === 'smb') score -= 0.1;
//   }
//   else if (architecture === "Serverless") {
//     if (params.businessType === 'startup') score += 0.2;
//     if (params.budgetLevel === 'minimal' || params.budgetLevel === 'standard') score += 0.15;
//     if (params.goals.includes('cost-efficiency')) score += 0.15;
//     if (params.securityLevel === 'high-compliance') score -= 0.1;
//   }
//   else if (architecture === "Monolithic-with-API") {
//     if (params.businessType === 'smb') score += 0.2;
//     if (params.budgetLevel === 'minimal') score += 0.2;
//     if (params.goals.includes('time-to-market')) score += 0.15;
//     if (params.goals.includes('high-scalability')) score -= 0.2;
//   }
//   else if (architecture === "Hexagonal") {
//     if (params.securityLevel === 'high-compliance' || params.securityLevel === 'enhanced') score += 0.2;
//     if (params.businessSector === 'healthcare' || params.businessSector === 'fintech') score += 0.1;
//     if (params.goals.includes('regulatory-compliance')) score += 0.15;
//   }
//   else if (architecture === "CQRS") {
//     if (params.businessSector === 'fintech' || params.businessSector === 'ecommerce') score += 0.15;
//     if (params.goals.includes('high-scalability') && params.goals.includes('high-availability')) score += 0.2;
//     if (params.budgetLevel === 'minimal') score -= 0.15;
//   }
  
//   // Ensure score is between 0 and 1
//   return Math.max(0.1, Math.min(0.95, score));
// };

// // Helper function to generate appropriate Mermaid diagram based on parameters
// const generateMermaidDiagram = (params: any, architectureType: string): string => {
//   // Base components all architectures will have
//   const commonComponents = {
//     client: "Client[Client Applications]",
//     api: "API[API Gateway]",
//     auth: "Auth[Authentication Service]",
//     users: "UserMgmt[User Management]",
//   };
  
//   // Security components based on security level
//   const securityComponents: Record<SecurityLevel, Record<string, string>> = {
//     'basic': {
//       basicFirewall: "Firewall[Basic Firewall]",
//     },
//     'standard': {
//       standardFirewall: "Firewall[WAF]",
//       logging: "Logging[Security Logging]"
//     },
//     'enhanced': {
//       enhancedFirewall: "Firewall[Advanced WAF]",
//       logging: "Logging[Security Logging]",
//       ids: "IDS[Intrusion Detection]",
//       encryption: "Encryption[Data Encryption]"
//     },
//     'high-compliance': {
//       complianceFirewall: "Firewall[Enterprise WAF]",
//       logging: "ExtendedLogging[Comprehensive Logging]",
//       ids: "IDPS[Intrusion Prevention]",
//       encryption: "Encryption[End-to-End Encryption]",
//       audit: "Audit[Compliance Auditing]",
//       dlp: "DLP[Data Loss Prevention]",
//       vault: "Vault[Secret Management]"
//     }
//   };
  
//   // Get security components based on selected level
//   const securityComp = securityComponents[params.securityLevel];
  
//   // Business sector specific components
//   const sectorComponents: Record<string, Record<string, string>> = {
//     'fintech': {
//       payments: "Payments[Payment Processing]",
//       transactions: "Transactions[Transaction Service]",
//       accounts: "Accounts[Account Service]",
//       reporting: "Reporting[Financial Reporting]",
//       compliance: "Compliance[Regulatory Compliance]"
//     },
//     'healthcare': {
//       ehr: "EHR[Electronic Health Records]",
//       scheduling: "Scheduling[Appointment Scheduling]",
//       billing: "Billing[Healthcare Billing]",
//       hipaa: "HIPAA[HIPAA Compliance]"
//     },
//     'ecommerce': {
//       catalog: "Catalog[Product Catalog]",
//       cart: "Cart[Shopping Cart]",
//       orders: "Orders[Order Management]",
//       payments: "Payments[Payment Processing]",
//       inventory: "Inventory[Inventory Management]",
//       shipping: "Shipping[Shipping Service]"
//     },
//     'social': {
//       feed: "Feed[Content Feed]",
//       posts: "Posts[Post Management]",
//       notifications: "Notifications[Notification Service]",
//       messaging: "Messaging[Direct Messaging]",
//       analytics: "Analytics[User Analytics]"
//     },
//     'education': {
//       courses: "Courses[Course Management]",
//       enrollment: "Enrollment[Student Enrollment]",
//       grading: "Grades[Grading System]",
//       content: "Content[Learning Content]"
//     },
//     'logistics': {
//       tracking: "Tracking[Shipment Tracking]",
//       routing: "Routing[Route Optimization]",
//       inventory: "Inventory[Inventory Management]",
//       fleet: "Fleet[Fleet Management]"
//     },
//     'gaming': {
//       game: "GameServer[Game Server]",
//       matchmaking: "Matchmaking[Matchmaking Service]",
//       leaderboard: "Leaderboard[Leaderboard Service]",
//       store: "Store[In-game Store]",
//       auth: "GameAuth[Game Authentication]"
//     },
//     'iot': {
//       devices: "Devices[Device Management]",
//       telemetry: "Telemetry[Telemetry Service]",
//       processing: "Processing[Data Processing]",
//       rules: "Rules[Rules Engine]"
//     }
//   };
  
//   // Get sector-specific components
//   const sectorComp = sectorComponents[params.businessSector] || {};
  
//   // Budget level determines infrastructure complexity
//   const infrastructureComponents: Record<BudgetLevel, Record<string, string>> = {
//     'minimal': {
//       db: "DB[(Shared Database)]",
//       storage: "Storage[(Object Storage)]"
//     },
//     'standard': {
//       db: "DB[(Primary Database)]",
//       cache: "Cache[(Caching Layer)]",
//       storage: "Storage[(Object Storage)]",
//       queue: "Queue[Message Queue]"
//     },
//     'enterprise': {
//       primaryDB: "PrimaryDB[(Primary Database)]",
//       replicaDB: "ReplicaDB[(Database Replicas)]",
//       distributedCache: "DistCache[(Distributed Cache)]",
//       storage: "Storage[(Object Storage)]",
//       queue: "Queue[Event Bus]",
//       search: "Search[Search Engine]"
//     },
//     'unlimited': {
//       primaryDB: "PrimaryDB[(Primary Database)]",
//       replicaDB: "ReplicaDB[(Database Replicas)]",
//       distributedCache: "DistCache[(Distributed Cache)]",
//       storage: "Storage[(Object Storage)]",
//       queue: "Queue[Event Bus]",
//       search: "Search[Search Engine]",
//       ml: "ML[Machine Learning]",
//       analytics: "Analytics[Real-time Analytics]",
//       cdn: "CDN[Content Delivery]"
//     }
//   };
  
//   // Get infrastructure components based on budget
//   const infraComp = infrastructureComponents[params.budgetLevel];
  
//   // Build different diagrams based on architecture type
//   let mermaidCode = "graph TD\n";
  
//   if (architectureType === "Microservices") {
//     mermaidCode += `    ${commonComponents.client} --> ${commonComponents.api}\n`;
    
//     // Add API Gateway connections
//     mermaidCode += `    ${commonComponents.api} --> ${commonComponents.auth}\n`;
    
//     // Add security components
//     if (params.securityLevel !== 'basic') {
//       mermaidCode += `    ${commonComponents.client} --> ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall}\n`;
//       mermaidCode += `    ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall} --> ${commonComponents.api}\n`;
//     }
    
//     // Connect sector-specific microservices
//     Object.values(sectorComp).forEach(service => {
//       mermaidCode += `    ${commonComponents.api} --> ${service}\n`;
//     });
    
//     // Add connections to infrastructure components
//     Object.values(sectorComp).forEach(service => {
//       if (infraComp.primaryDB) {
//         mermaidCode += `    ${service} --> ${infraComp.primaryDB}\n`;
//       } else if (infraComp.db) {
//         mermaidCode += `    ${service} --> ${infraComp.db}\n`;
//       }
      
//       if (infraComp.queue) {
//         mermaidCode += `    ${service} --> ${infraComp.queue}\n`;
//       }
//     });
    
//     // Add additional infrastructure connections
//     if (infraComp.queue && infraComp.analytics) {
//       mermaidCode += `    ${infraComp.queue} --> ${infraComp.analytics}\n`;
//     }
    
//     if (params.securityLevel === 'enhanced' || params.securityLevel === 'high-compliance') {
//       mermaidCode += `    subgraph Security\n`;
//       Object.values(securityComp).forEach(comp => {
//         mermaidCode += `        ${comp}\n`;
//       });
//       mermaidCode += `    end\n`;
//     }
//   } 
//   else if (architectureType === "Event-Driven") {
//     mermaidCode += `    ${commonComponents.client} --> ${commonComponents.api}\n`;
    
//     // Security layer
//     if (params.securityLevel !== 'basic') {
//       mermaidCode += `    ${commonComponents.client} --> ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall}\n`;
//       mermaidCode += `    ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall} --> ${commonComponents.api}\n`;
//     }
    
//     // Event bus is central to event-driven architecture
//     const eventBus = infraComp.queue || "EventBus[Event Bus]";
//     mermaidCode += `    ${commonComponents.api} --> ${eventBus}\n`;
    
//     // Connect event bus to services
//     Object.values(sectorComp).forEach(service => {
//       mermaidCode += `    ${eventBus} --> ${service}\n`;
      
//       // Services might publish back to the event bus
//       mermaidCode += `    ${service} --> ${eventBus}\n`;
//     });
    
//     // Add database connections
//     Object.values(sectorComp).forEach(service => {
//       if (infraComp.primaryDB) {
//         mermaidCode += `    ${service} --> ${infraComp.primaryDB}\n`;
//       } else if (infraComp.db) {
//         mermaidCode += `    ${service} --> ${infraComp.db}\n`;
//       }
//     });
    
//     // Security monitoring
//     if (params.securityLevel === 'enhanced' || params.securityLevel === 'high-compliance') {
//       if (securityComp.logging) {
//         mermaidCode += `    ${eventBus} --> ${securityComp.logging}\n`;
//       }
//     }
//   }
//   else if (architectureType === "Serverless") {
//     mermaidCode += `    ${commonComponents.client} --> ${commonComponents.api}\n`;
    
//     // API Gateway to Lambda/Function connections
//     mermaidCode += `    ${commonComponents.api} --> Auth[Authentication Lambda]\n`;
    
//     // Connect API to serverless functions
//     const functions: Record<string, string> = {};
//     Object.entries(sectorComp).forEach(([key, service]) => {
//       const funcName = `${key}Func[${key} Function]`;
//       functions[key] = funcName;
//       mermaidCode += `    ${commonComponents.api} --> ${funcName}\n`;
//     });
    
//     // Connect functions to resources
//     Object.values(functions).forEach(func => {
//       if (infraComp.db || infraComp.primaryDB) {
//         mermaidCode += `    ${func} --> ${infraComp.db || infraComp.primaryDB}\n`;
//       }
      
//       if (infraComp.storage) {
//         mermaidCode += `    ${func} --> ${infraComp.storage}\n`;
//       }
//     });
    
//     // Event triggers
//     if (infraComp.queue) {
//       Object.values(functions).forEach(func => {
//         mermaidCode += `    ${func} --> ${infraComp.queue}\n`;
//         mermaidCode += `    ${infraComp.queue} -.-> ${func}\n`;
//       });
//     }
    
//     // Security for serverless
//     if (params.securityLevel === 'high-compliance' && securityComp.vault) {
//       Object.values(functions).forEach(func => {
//         mermaidCode += `    ${func} --> ${securityComp.vault}\n`;
//       });
      
//       mermaidCode += `    subgraph "Security Layer"\n`;
//       Object.values(securityComp).forEach(comp => {
//         mermaidCode += `        ${comp}\n`;
//       });
//       mermaidCode += `    end\n`;
//     }
//   }
//   else if (architectureType === "Monolithic-with-API") {
//     mermaidCode += `    ${commonComponents.client} --> ${commonComponents.api}\n`;
//     mermaidCode += `    ${commonComponents.api} --> Monolith[Monolithic Application]\n`;
    
//     // Add security
//     if (params.securityLevel !== 'basic') {
//       mermaidCode += `    ${commonComponents.client} --> ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall}\n`;
//       mermaidCode += `    ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall} --> ${commonComponents.api}\n`;
//     }
    
//     // Database connection
//     if (infraComp.db || infraComp.primaryDB) {
//       mermaidCode += `    Monolith --> ${infraComp.db || infraComp.primaryDB}\n`;
//     }
    
//     // Internal components
//     mermaidCode += `    subgraph Monolith\n`;
//     Object.values(sectorComp).forEach(service => {
//       mermaidCode += `        ${service}\n`;
//     });
//     mermaidCode += `    end\n`;
//   }
//   else if (architectureType === "Hexagonal") {
//     mermaidCode += `    ${commonComponents.client} --> ${commonComponents.api}\n`;
    
//     // Add security layer
//     if (params.securityLevel !== 'basic') {
//       mermaidCode += `    ${commonComponents.client} --> ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall}\n`;
//       mermaidCode += `    ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall} --> ${commonComponents.api}\n`;
//     }
    
//     // Hexagonal core
//     mermaidCode += `    ${commonComponents.api} --> CoreDomain[Core Domain]\n`;
    
//     // Ports and adapters
//     mermaidCode += `    subgraph "Core Domain"\n`;
//     Object.entries(sectorComp).forEach(([key, value]) => {
//       const domainName = `Domain${key}[${key} Domain]`;
//       mermaidCode += `        ${domainName}\n`;
//     });
//     mermaidCode += `    end\n`;
    
//     // External adapters
//     mermaidCode += `    CoreDomain --> PersistenceAdapter[Persistence Adapter]\n`;
//     mermaidCode += `    PersistenceAdapter --> ${infraComp.db || infraComp.primaryDB}\n`;
    
//     if (infraComp.queue) {
//       mermaidCode += `    CoreDomain --> MessagingAdapter[Messaging Adapter]\n`;
//       mermaidCode += `    MessagingAdapter --> ${infraComp.queue}\n`;
//     }
    
//     // High compliance security connections
//     if (params.securityLevel === 'high-compliance') {
//       mermaidCode += `    subgraph "Security Components"\n`;
//       Object.values(securityComp).forEach(comp => {
//         mermaidCode += `        ${comp}\n`;
//       });
//       mermaidCode += `    end\n`;
      
//       mermaidCode += `    CoreDomain --> ${securityComp.audit || securityComp.logging}\n`;
//     }
//   }
//   else if (architectureType === "CQRS") {
//     mermaidCode += `    ${commonComponents.client} --> ${commonComponents.api}\n`;
    
//     // Security layer
//     if (params.securityLevel !== 'basic') {
//       mermaidCode += `    ${commonComponents.client} --> ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall}\n`;
//       mermaidCode += `    ${securityComp.standardFirewall || securityComp.enhancedFirewall || securityComp.complianceFirewall} --> ${commonComponents.api}\n`;
//     }
    
//     // Command and Query separation
//     mermaidCode += `    ${commonComponents.api} --> CommandAPI[Command API]\n`;
//     mermaidCode += `    ${commonComponents.api} --> QueryAPI[Query API]\n`;
    
//     // Command side
//     mermaidCode += `    CommandAPI --> CommandHandler[Command Handler]\n`;
//     mermaidCode += `    CommandHandler --> WriteDB[(Write Database)]\n`;
    
//     if (infraComp.queue) {
//       mermaidCode += `    CommandHandler --> ${infraComp.queue}\n`;
//       mermaidCode += `    ${infraComp.queue} --> EventHandler[Event Handler]\n`;
//       mermaidCode += `    EventHandler --> QueryDB[(Read Database)]\n`;
//     } else {
//       mermaidCode += `    CommandHandler --> EventHandler[Event Handler]\n`;
//       mermaidCode += `    EventHandler --> QueryDB[(Read Database)]\n`;
//     }
    
//     // Query side
//     mermaidCode += `    QueryAPI --> QueryHandler[Query Handler]\n`;
//     mermaidCode += `    QueryHandler --> QueryDB\n`;
    
//     // Add additional sector-specific command handlers
//     Object.entries(sectorComp).slice(0, 3).forEach(([key, service]) => {
//       mermaidCode += `    CommandHandler --> ${key}CommandProcessor[${key} Processor]\n`;
//     });
    
//     // Security for CQRS
//     if (params.securityLevel === 'high-compliance') {
//       mermaidCode += `    subgraph "Security & Compliance"\n`;
//       Object.values(securityComp).forEach(comp => {
//         mermaidCode += `        ${comp}\n`;
//       });
//       mermaidCode += `    end\n`;
      
//       mermaidCode += `    CommandHandler --> ${securityComp.audit || securityComp.logging}\n`;
//       mermaidCode += `    QueryHandler --> ${securityComp.audit || securityComp.logging}\n`;
//     }
//   }
  
//   return mermaidCode;
// };

// // Generate technical documentation
// const generateDocumentation = (params: any, architectureType: string): string => {
//     // Create appropriate documentation based on architecture type and business parameters
//     const docs = [];
    
//     // Header and introduction
//     docs.push(`# ${architectureType} Architecture for ${params.businessSector.charAt(0).toUpperCase() + params.businessSector.slice(1)} ${params.businessType.charAt(0).toUpperCase() + params.businessType.slice(1)}`);
//     docs.push(`\n## Overview`);
    
//     // Introduction based on architecture type
//     if (architectureType === "Microservices") {
//       docs.push(`This microservices architecture is designed for a ${params.businessType} in the ${params.businessSector} sector, focusing on modularity, scalability, and independent deployment. Each business capability is encapsulated within its own service, allowing for technology diversity and optimized scaling.`);
//     } else if (architectureType === "Event-Driven") {
//       docs.push(`This event-driven architecture is tailored for ${params.businessType} operations in the ${params.businessSector} sector, emphasizing responsiveness and loose coupling. The design centers around the production, detection, and consumption of events through an asynchronous messaging backbone.`);
//     } else if (architectureType === "Serverless") {
//       docs.push(`This serverless architecture provides a cost-effective and highly scalable solution for ${params.businessType}s in the ${params.businessSector} industry. It eliminates infrastructure management concerns while automatically scaling based on demand.`);
//     } else if (architectureType === "Monolithic-with-API") {
//       docs.push(`This monolithic architecture with API Gateway is designed for ${params.businessType}s in the ${params.businessSector} sector that prioritize development speed and operational simplicity. The architecture maintains modularity through clean internal boundaries while simplifying deployment.`);
//     } else if (architectureType === "Hexagonal") {
//       docs.push(`This hexagonal (ports and adapters) architecture creates a maintainable and flexible system for ${params.businessType}s in the ${params.businessSector} sector. By isolating the core business logic from external concerns, it enables sustainable evolution and strict dependency control.`);
//     } else if (architectureType === "CQRS") {
//       docs.push(`This Command Query Responsibility Segregation (CQRS) architecture separates read and write operations for ${params.businessType}s in the ${params.businessSector} sector. This design optimizes for complex domains with different read and write scaling requirements.`);
//     }
    
//     docs.push(`\nThe architecture is designed with ${params.securityLevel} security requirements in mind and optimized for a ${params.budgetLevel} budget level.`);
    
//     // Core Components
//     docs.push(`\n## Core Components`);
    
//     // Common components for all architectures
//     docs.push(`- **Client Applications**: Web and mobile interfaces for user interaction`);
//     docs.push(`- **API Gateway**: Central entry point that routes requests to appropriate services`);
//     docs.push(`- **Authentication Service**: Handles user authentication and authorization`);
    
//     // Architecture-specific components
//     if (architectureType === "Microservices") {
//       docs.push(`- **Domain-Specific Microservices**: Independent services organized around business capabilities`);
//       docs.push(`- **Service Discovery**: Mechanism for services to locate each other`);
//       docs.push(`- **API Composition**: Aggregates data from multiple microservices when needed`);
//     } else if (architectureType === "Event-Driven") {
//       docs.push(`- **Event Bus/Message Queue**: Central communication mechanism for asynchronous messaging`);
//       docs.push(`- **Event Producers**: Services that generate events based on state changes`);
//       docs.push(`- **Event Consumers**: Services that react to events in the system`);
//     } else if (architectureType === "Serverless") {
//       docs.push(`- **Function-as-a-Service (FaaS)**: Stateless compute containers triggered by events`);
//       docs.push(`- **API Gateway**: Routes HTTP requests to appropriate functions`);
//       docs.push(`- **Managed Services**: Cloud-provided databases, storage, and other services`);
//     } else if (architectureType === "Monolithic-with-API") {
//       docs.push(`- **Monolithic Core**: Single-deployment unit containing all business logic`);
//       docs.push(`- **Internal Modules**: Well-defined modules with clear interfaces`);
//       docs.push(`- **API Gateway**: Provides controlled access to the monolith`);
//     } else if (architectureType === "Hexagonal") {
//       docs.push(`- **Domain Core**: Contains all business logic independent of external systems`);
//       docs.push(`- **Ports**: Interfaces defining how the core interacts with the outside world`);
//       docs.push(`- **Adapters**: Implementations connecting external systems to the ports`);
//     } else if (architectureType === "CQRS") {
//       docs.push(`- **Command API**: Handles write operations and state changes`);
//       docs.push(`- **Query API**: Optimized for read operations`);
//       docs.push(`- **Event Store**: Records all state changes as events`);
//       docs.push(`- **Read Models**: Projections optimized for specific query needs`);
//     }
    
//     // Add security components based on security level
//     docs.push(`\n## Security Components`);
    
//     if (params.securityLevel === 'basic') {
//       docs.push(`- **Basic Authentication**: Username/password authentication`);
//       docs.push(`- **Simple Firewall**: Basic traffic filtering`);
//       docs.push(`- **TLS Encryption**: Secure communication channels`);
//     } else if (params.securityLevel === 'standard') {
//       docs.push(`- **OAuth/OpenID Connect**: Industry-standard authentication protocols`);
//       docs.push(`- **Web Application Firewall (WAF)**: Protection against common web vulnerabilities`);
//       docs.push(`- **Role-Based Access Control**: Fine-grained authorization`);
//       docs.push(`- **Security Logging**: Recording security events for auditing`);
//     } else if (params.securityLevel === 'enhanced') {
//       docs.push(`- **Multi-Factor Authentication**: Additional verification factors`);
//       docs.push(`- **Advanced WAF**: Enhanced protection against complex attacks`);
//       docs.push(`- **Intrusion Detection System**: Monitoring for suspicious activities`);
//       docs.push(`- **Data Encryption**: Protection for data at rest and in transit`);
//       docs.push(`- **API Rate Limiting**: Protection against abuse and DoS attacks`);
//     } else if (params.securityLevel === 'high-compliance') {
//       docs.push(`- **Advanced Authentication System**: Supports multiple factors, biometrics, and context-aware authentication`);
//       docs.push(`- **Enterprise WAF and RASP**: Runtime application self-protection`);
//       docs.push(`- **Intrusion Prevention System**: Active threat mitigation`);
//       docs.push(`- **End-to-End Encryption**: Comprehensive data protection`);
//       docs.push(`- **Data Loss Prevention**: Controls to prevent data exfiltration`);
//       docs.push(`- **Secret Management Vault**: Secure storage for credentials and secrets`);
//       docs.push(`- **Comprehensive Audit Logging**: Detailed audit trail for all activities`);
//       docs.push(`- **Security Information and Event Management (SIEM)**: Real-time analysis of security alerts`);
//     }
    
//     // Implementation guidelines
//     docs.push(`\n## Implementation Guidelines`);
//     docs.push(`1. **Development Approach**: ${architectureType === "Microservices" || architectureType === "Event-Driven" ? "Use domain-driven design to identify service boundaries" : architectureType === "Serverless" ? "Focus on stateless function design and managed services" : architectureType === "Hexagonal" ? "Define clear domain model and ports before implementing adapters" : architectureType === "CQRS" ? "Separate command and query models early in development" : "Establish clear module boundaries within the monolith"}`);
//     docs.push(`2. **Deployment Strategy**: ${params.businessType === 'enterprise' ? "Use a robust CI/CD pipeline with comprehensive testing" : params.businessType === 'startup' ? "Implement lightweight CI/CD focusing on speed to market" : "Balance between deployment speed and stability with appropriate testing"}`);
//     docs.push(`3. **Technology Stack**: ${architectureType === "Microservices" ? "Choose technologies appropriate for each service domain" : architectureType === "Serverless" ? "Select cloud provider based on required managed services" : "Select a cohesive technology stack that supports all requirements"}`);
//     docs.push(`4. **Data Management**: ${architectureType === "Microservices" ? "Consider database-per-service where appropriate" : architectureType === "CQRS" ? "Separate read and write data stores" : "Use a centralized database with proper access controls"}`);
//     docs.push(`5. **Monitoring and Observability**: Implement comprehensive monitoring, logging, and tracing across all components`);
    
//     // Budget considerations
//     docs.push(`\n## Budget Considerations`);
    
//     if (params.budgetLevel === 'minimal') {
//       docs.push(`- Focus on essential components and consider open-source solutions`);
//       docs.push(`- Start with a simpler architecture and plan for incremental enhancements`);
//       docs.push(`- Consider serverless options to minimize infrastructure costs`);
//       docs.push(`- Optimize for pay-as-you-go services to manage cash flow`);
//     } else if (params.budgetLevel === 'standard') {
//       docs.push(`- Balance between managed services and self-hosted components based on ROI`);
//       docs.push(`- Implement auto-scaling to optimize resource utilization`);
//       docs.push(`- Consider regional deployment to manage data transfer costs`);
//       docs.push(`- Reserve instances for predictable workloads`);
//     } else if (params.budgetLevel === 'enterprise') {
//       docs.push(`- Invest in high-availability configurations across all critical components`);
//       docs.push(`- Implement multi-region deployments for disaster recovery`);
//       docs.push(`- Consider dedicated instances for performance-sensitive components`);
//       docs.push(`- Deploy comprehensive monitoring and management tools`);
//     } else if (params.budgetLevel === 'unlimited') {
//       docs.push(`- Implement global deployment with edge computing capabilities`);
//       docs.push(`- Utilize premium managed services for operational efficiency`);
//       docs.push(`- Deploy active-active configurations for maximum reliability`);
//       docs.push(`- Invest in advanced analytics and machine learning capabilities`);
//       docs.push(`- Implement custom solutions for unique business requirements`);
//     }
    
//     // Return the formatted documentation
//     return docs.join('\n');
//   };
  
//   // Generate risk analysis based on architecture type and parameters
//   const generateRiskAnalysis = (params: any, architectureType: string): string => {
//     const analysis = [];
    
//     analysis.push(`# Risk Analysis & Future Considerations`);
    
//     // Architecture-specific risks
//     analysis.push(`\n## Architecture Risks`);
    
//     if (architectureType === "Microservices") {
//       analysis.push(`1. **Distributed System Complexity**: Microservices introduce operational complexity that can be challenging to manage.`);
//       analysis.push(`2. **Inter-Service Communication**: Network latency and reliability issues can impact overall system performance.`);
//       analysis.push(`3. **Data Consistency**: Maintaining data consistency across services requires careful design.`);
//       analysis.push(`4. **Debugging Complexity**: Tracing issues across multiple services can be more difficult.`);
//       analysis.push(`5. **Operational Overhead**: Each service requires independent deployment, monitoring, and scaling.`);
//     } else if (architectureType === "Event-Driven") {
//       analysis.push(`1. **Eventual Consistency**: System may have periods where data is not fully consistent across components.`);
//       analysis.push(`2. **Event Schema Evolution**: Changes to event schemas must be managed carefully to avoid breaking consumers.`);
//       analysis.push(`3. **Debugging Complexity**: Following the flow of events for troubleshooting can be challenging.`);
//       analysis.push(`4. **Message Delivery Guarantees**: May require careful design to ensure "at least once" or "exactly once" delivery.`);
//       analysis.push(`5. **Development Complexity**: Asynchronous programming paradigms can present a learning curve.`);
//     } else if (architectureType === "Serverless") {
//       analysis.push(`1. **Cold Start Latency**: Initial invocation delay can impact performance for certain use cases.`);
//       analysis.push(`2. **Vendor Lock-in**: Heavy reliance on cloud provider's proprietary services.`);
//       analysis.push(`3. **Limited Execution Time**: Functions typically have execution time limits that may constrain use cases.`);
//       analysis.push(`4. **Resource Limits**: Memory, CPU, and concurrent execution constraints may apply.`);
//       analysis.push(`5. **State Management**: Managing state in stateless functions requires careful design.`);
//     } else if (architectureType === "Monolithic-with-API") {
//       analysis.push(`1. **Scaling Limitations**: Entire application must be scaled as a unit, which may be inefficient.`);
//       analysis.push(`2. **Single Point of Failure**: Issues can impact the entire system rather than isolated components.`);
//       analysis.push(`3. **Technology Stack Constraints**: All components must use compatible technologies.`);
//       analysis.push(`4. **Deployment Risk**: Each deployment involves the entire application, increasing risk.`);
//       analysis.push(`5. **Team Coordination Challenges**: Multiple teams working on the same codebase requires coordination.`);
//     } else if (architectureType === "Hexagonal") {
//       analysis.push(`1. **Initial Development Overhead**: More interfaces and abstractions can slow initial development.`);
//       analysis.push(`2. **Learning Curve**: The pattern requires disciplined adherence to principles.`);
//       analysis.push(`3. **Potential Over-engineering**: May introduce unnecessary complexity for simple applications.`);
//       analysis.push(`4. **Testing Complexity**: More interfaces may require more comprehensive testing strategies.`);
//       analysis.push(`5. **Performance Overhead**: Additional abstraction layers may introduce minor performance costs.`);
//     } else if (architectureType === "CQRS") {
//       analysis.push(`1. **Complexity**: The pattern introduces additional complexity in system design and implementation.`);
//       analysis.push(`2. **Eventual Consistency**: Read models may lag behind write models, requiring careful user experience design.`);
//       analysis.push(`3. **Data Duplication**: Multiple models often involve data duplication.`);
//       analysis.push(`4. **Learning Curve**: The pattern represents a significant departure from traditional CRUD approaches.`);
//       analysis.push(`5. **Increased Development Time**: Initially takes longer to implement than simpler patterns.`);
//     }
    
//     // Business-specific risks
//     analysis.push(`\n## Business & Domain Risks`);
    
//     if (params.businessSector === 'fintech') {
//       analysis.push(`1. **Regulatory Compliance**: Financial regulations may change, requiring architectural adaptations.`);
//       analysis.push(`2. **Transaction Integrity**: Ensuring financial data consistency is mission-critical.`);
//       analysis.push(`3. **High Availability Requirements**: Financial services typically require near-perfect uptime.`);
//     } else if (params.businessSector === 'healthcare') {
//       analysis.push(`1. **Regulatory Compliance**: Healthcare regulations (HIPAA, GDPR for health data) may evolve.`);
//       analysis.push(`2. **Data Privacy Concerns**: Patient data requires exceptional protection measures.`);
//       analysis.push(`3. **System Availability**: Healthcare systems may be critical for patient care.`);
//     } else if (params.businessSector === 'ecommerce') {
//       analysis.push(`1. **Seasonal Traffic Spikes**: Architecture must handle large variations in traffic.`);
//       analysis.push(`2. **Payment Processing Security**: Financial transactions require robust security measures.`);
//       analysis.push(`3. **Customer Experience Dependency**: Performance directly impacts sales conversion.`);
//     } else {
//       analysis.push(`1. **Market-Specific Regulations**: Changes in sector-specific regulations may impact architecture.`);
//       analysis.push(`2. **Competitive Pressure**: May require rapid feature development and system evolution.`);
//       analysis.push(`3. **User Expectations**: Users increasingly expect high performance and reliability.`);
//     }
    
//     // Security risks based on security level
//     analysis.push(`\n## Security Risks`);
    
//     if (params.securityLevel === 'basic' || params.securityLevel === 'standard') {
//       analysis.push(`1. **Potential Insufficient Protection**: The selected security level may not be adequate for all threat scenarios.`);
//       analysis.push(`2. **Evolving Threats**: New attack vectors may emerge that the current architecture doesn't address.`);
//       analysis.push(`3. **Integration Vulnerabilities**: Third-party integrations may introduce security weaknesses.`);
//     } else {
//       analysis.push(`1. **Security Complexity**: Higher security levels introduce operational complexity that must be managed.`);
//       analysis.push(`2. **Performance Trade-offs**: Security measures may impact system performance and user experience.`);
//       analysis.push(`3. **False Positives**: Advanced security systems may occasionally block legitimate activity.`);
//     }
    
//     if (params.businessSector === 'fintech' || params.businessSector === 'healthcare') {
//       analysis.push(`4. **Targeted Attacks**: This sector faces increased risk of sophisticated, targeted attacks.`);
//       analysis.push(`5. **Insider Threats**: Access to valuable data increases the risk from malicious insiders.`);
//     }
    
//     // Mitigation strategies
//     analysis.push(`\n## Mitigation Strategies`);
    
//     // Architecture-specific mitigations
//     if (architectureType === "Microservices") {
//       analysis.push(`1. **Implement Circuit Breakers**: Prevent cascading failures when services are unavailable.`);
//       analysis.push(`2. **Use Distributed Tracing**: Implement tracing across service boundaries for debugging.`);
//       analysis.push(`3. **API Versioning Strategy**: Plan for evolution of service interfaces.`);
//       analysis.push(`4. **Service Mesh**: Consider implementing for improved communication reliability and observability.`);
//     } else if (architectureType === "Event-Driven") {
//       analysis.push(`1. **Event Versioning**: Implement a clear strategy for evolving event schemas.`);
//       analysis.push(`2. **Dead Letter Queues**: Capture and handle failed event processing.`);
//       analysis.push(`3. **Event Sourcing Patterns**: Consider for critical state that requires audit trails.`);
//       analysis.push(`4. **Idempotent Consumers**: Design consumers to handle duplicate events gracefully.`);
//     } else if (architectureType === "Serverless") {
//       analysis.push(`1. **Warm-up Strategies**: Implement keep-alive mechanisms for critical functions.`);
//       analysis.push(`2. **Portable Design**: Abstract provider-specific services where possible.`);
//       analysis.push(`3. **Chunking Strategies**: Break large tasks into smaller units for execution time limits.`);
//       analysis.push(`4. **Effective Monitoring**: Implement comprehensive monitoring for serverless workloads.`);
//     } else if (architectureType === "Monolithic-with-API") {
//       analysis.push(`1. **Clear Internal Boundaries**: Maintain strong module boundaries within the monolith.`);
//       analysis.push(`2. **Horizontal Scaling**: Deploy multiple instances behind a load balancer.`);
//       analysis.push(`3. **Feature Flags**: Control feature rollout to reduce deployment risk.`);
//       analysis.push(`4. **Migration Path**: Design with potential future decomposition in mind.`);
//     } else if (architectureType === "Hexagonal" || architectureType === "CQRS") {
//       analysis.push(`1. **Start Simple**: Begin with core patterns and evolve complexity as needed.`);
//       analysis.push(`2. **Clear Documentation**: Document the architecture patterns for team understanding.`);
//       analysis.push(`3. **Automated Testing**: Comprehensive testing to ensure pattern compliance.`);
//       analysis.push(`4. **Performance Monitoring**: Watch for performance bottlenecks from additional abstractions.`);
//     }
    
//     // General mitigations
//     analysis.push(`5. **Comprehensive Monitoring**: Implement detailed monitoring across all system components.`);
//     analysis.push(`6. **Regular Security Reviews**: Conduct periodic security assessments and penetration testing.`);
//     analysis.push(`7. **Disaster Recovery Plan**: Develop and test recovery procedures for various failure scenarios.`);
    
//     // Future considerations
//     analysis.push(`\n## Future Considerations`);
    
//     // Technology evolution
//     analysis.push(`1. **Emerging Technologies**: Consider future integration of:`);
//     analysis.push(`   - **AI/ML Capabilities**: For enhanced data analytics and personalization`);
//     analysis.push(`   - **Edge Computing**: For reduced latency and bandwidth usage`);
//     if (params.budgetLevel !== 'minimal') {
//       analysis.push(`   - **Blockchain Integration**: For enhanced transparency and trust in transactions`);
//     }
    
//     // Business evolution
//     analysis.push(`2. **Business Evolution**:`);
//     analysis.push(`   - **Market Expansion**: Architecture should support geographic and demographic expansion`);
//     analysis.push(`   - **Product Diversification**: Should accommodate new product lines and services`);
//     analysis.push(`   - **Acquisition Integration**: Consider how to integrate acquired systems`);
    
//     // Scaling considerations
//     analysis.push(`3. **Scaling Considerations**:`);
//     analysis.push(`   - **User Growth Projection**: Architecture should scale to ${params.businessType === 'enterprise' ? 'millions' : params.businessType === 'startup' ? 'hundreds of thousands' : 'tens of thousands'} of users`);
//     analysis.push(`   - **Data Growth Management**: Strategy for handling increasing data volumes`);
//     analysis.push(`   - **Global Presence**: ${params.budgetLevel === 'enterprise' || params.budgetLevel === 'unlimited' ? 'Plan for multi-region deployment' : 'Consider future geographic expansion needs'}`);
    
//     return analysis.join('\n');
//   };
  
//   // Generate security analysis based on architecture and parameters
//   const generateSecurityAnalysis = (params: any, architectureType: string): string => {
//     const security = [];
    
//     security.push(`# Security Implementation Analysis`);
    
//     // Security by design principles
//     security.push(`\n## Security by Design Principles`);
    
//     security.push(`1. **Defense in Depth**: Multiple layers of security controls throughout the architecture`);
//     security.push(`2. **Least Privilege**: Components operate with minimal necessary permissions`);
//     security.push(`3. **Secure Defaults**: All components configured with security as the default state`);
//     security.push(`4. **Fail Secure**: System defaults to secure state during failures`);
//     security.push(`5. **Security Testing**: Regular security testing integrated throughout development`);
    
//     // Security across SDLC
//     security.push(`\n## Security Across SDLC`);
    
//     // Planning phase
//     security.push(`### Planning Phase`);
//     security.push(`- **Threat Modeling**: Identify potential threats and attack vectors early`);
//     security.push(`- **Security Requirements**: Define explicit security requirements and acceptance criteria`);
//     security.push(`- **Compliance Mapping**: Identify relevant regulatory requirements (${params.businessSector === 'healthcare' ? 'HIPAA, ' : ''}${params.businessSector === 'fintech' ? 'PCI-DSS, ' : ''}GDPR, etc.)`);
    
//     // Development phase
//     security.push(`### Development Phase`);
//     security.push(`- **Secure Coding Standards**: Enforce secure coding practices and guidelines`);
//     security.push(`- **Static Analysis**: Implement automated code scanning for security vulnerabilities`);
//     security.push(`- **Dependency Management**: Monitor and update dependencies for security patches`);
    
//     if (params.securityLevel === 'enhanced' || params.securityLevel === 'high-compliance') {
//       security.push(`- **Code Review**: Mandatory security-focused peer code reviews`);
//       security.push(`- **Security Unit Tests**: Specific tests for security controls`);
//     }
    
//     // Testing phase
//     security.push(`### Testing Phase`);
//     security.push(`- **Dynamic Analysis**: Runtime security testing to identify vulnerabilities`);
//     security.push(`- **Penetration Testing**: Simulated attacks to identify weaknesses`);
    
//     if (params.securityLevel === 'enhanced' || params.securityLevel === 'high-compliance') {
//       security.push(`- **Fuzz Testing**: Automated testing with invalid, unexpected, or random data`);
//       security.push(`- **Compliance Validation**: Verification of regulatory compliance requirements`);
//     }
    
//     // Deployment phase
//     security.push(`### Deployment Phase`);
//     security.push(`- **Secure Configuration**: Hardened deployment configurations`);
//     security.push(`- **Secrets Management**: Secure handling of credentials and sensitive data`);
//     security.push(`- **Minimal Attack Surface**: Remove unnecessary components and services`);
    
//     // Operations phase
//     security.push(`### Operations Phase`);
//     security.push(`- **Continuous Monitoring**: Real-time security monitoring and alerting`);
//     security.push(`- **Log Management**: Centralized logging with security event correlation`);
//     security.push(`- **Incident Response**: Defined procedures for security incidents`);
//     security.push(`- **Regular Updates**: Systematic patching and updates for all components`);
    
//     if (params.securityLevel === 'high-compliance') {
//       security.push(`- **Security Audits**: Regular third-party security audits`);
//       security.push(`- **Threat Intelligence**: Integration with threat intelligence feeds`);
//     }
    
//     // Architecture-specific security considerations
//     security.push(`\n## Architecture-Specific Security Considerations`);
    
//     if (architectureType === "Microservices") {
//       security.push(`1. **Service-to-Service Authentication**: Implement robust service identity verification`);
//       security.push(`2. **API Gateway Security**: Centralized security enforcement at API gateway`);
//       security.push(`3. **Container Security**: Secure container images and runtime environments`);
//       security.push(`4. **Network Segmentation**: Limit communication paths between services`);
//       security.push(`5. **Service Mesh Security**: Consider service mesh for advanced security controls`);
//     } else if (architectureType === "Event-Driven") {
//       security.push(`1. **Message Integrity**: Ensure events cannot be tampered with`);
//       security.push(`2. **Queue Security**: Secure access to message brokers and queues`);
//       security.push(`3. **Event Authentication**: Verify the source of events`);
//       security.push(`4. **Sensitive Data in Events**: Handle sensitive data in events appropriately`);
//       security.push(`5. **Replay Protection**: Prevent event replay attacks`);
//     } else if (architectureType === "Serverless") {
//       security.push(`1. **Function Permissions**: Fine-grained IAM permissions for serverless functions`);
//       security.push(`2. **Dependency Scanning**: Check third-party libraries for vulnerabilities`);
//       security.push(`3. **Timeout Configuration**: Appropriate function timeouts to limit attack window`);
//       security.push(`4. **Cold Start Security**: Ensure secure initialization during cold starts`);
//       security.push(`5. **API Gateway Protections**: Request validation, rate limiting, and WAF integration`);
//     } else if (architectureType === "Monolithic-with-API") {
//       security.push(`1. **Internal Security Boundaries**: Security controls between internal components`);
//       security.push(`2. **API Security Gateway**: Robust security at the API gateway layer`);
//       security.push(`3. **Comprehensive Monitoring**: Central security monitoring for the entire application`);
//       security.push(`4. **Authentication & Authorization**: Fine-grained access control throughout`);
//       security.push(`5. **Database Security**: Strong security for the central database`);
//     } else if (architectureType === "Hexagonal") {
//       security.push(`1. **Security Adapters**: Dedicated adapters for security concerns`);
//       security.push(`2. **Domain-Level Security**: Security controls within the domain model`);
//       security.push(`3. **Port Security**: Security verification at port boundaries`);
//       security.push(`4. **External System Isolation**: Security barriers between core and external systems`);
//       security.push(`5. **Authentication Adapter**: Dedicated adapter for authentication services`);
//     } else if (architectureType === "CQRS") {
//       security.push(`1. **Command Validation**: Thorough validation of all commands`);
//       security.push(`2. **Query Authorization**: Fine-grained access control for queries`);
//       security.push(`3. **Event Store Security**: Secure storage and access for the event store`);
//       security.push(`4. **Projection Security**: Security controls for read model projections`);
//       security.push(`5. **Command/Query Separation**: Different security profiles for read and write operations`);
//     }
    
//     // Security level specific implementations
//     security.push(`\n## Security Level Implementation`);
    
//     if (params.securityLevel === 'basic') {
//       security.push(`The basic security level provides fundamental protections:`);
//       security.push(`- **Authentication**: Simple username/password authentication`);
//       security.push(`- **TLS Encryption**: Standard HTTPS for all communications`);
//       security.push(`- **Basic Firewall**: Standard network traffic filtering`);
//       security.push(`- **Input Validation**: Basic validation of user inputs`);
//       security.push(`- **Error Handling**: Generic error messages to users`);
//     } else if (params.securityLevel === 'standard') {
//       security.push(`The standard security level includes more robust protections:`);
//       security.push(`- **Strong Authentication**: OAuth2/OpenID Connect implementation`);
//       security.push(`- **Role-Based Access Control**: Fine-grained authorization`);
//       security.push(`- **Web Application Firewall**: Protection against OWASP Top 10 threats`);
//       security.push(`- **Security Headers**: Implementation of secure HTTP headers`);
//       security.push(`- **Regular Vulnerability Scanning**: Scheduled security assessments`);
//       security.push(`- **API Rate Limiting**: Basic protection against abuse`);
//       security.push(`- **Secure Logging**: Implementation of tamper-evident logs`);
//     } else if (params.securityLevel === 'enhanced') {
//       security.push(`The enhanced security level provides advanced security capabilities:`);
//       security.push(`- **Multi-Factor Authentication**: Multiple verification factors`);
//       security.push(`- **Advanced WAF**: Protection against sophisticated attacks`);
//       security.push(`- **Intrusion Detection**: Active monitoring for suspicious activities`);
//       security.push(`- **Data Encryption**: Both at rest and in transit`);
//       security.push(`- **Security Information and Event Management (SIEM)**: Centralized security monitoring`);
//       security.push(`- **Advanced Rate Limiting**: Context-aware protection against abuse`);
//       security.push(`- **Secrets Management**: Secure storage and rotation of credentials`);
//       security.push(`- **Regular Penetration Testing**: Scheduled security assessments`);
//       security.push(`- **Security Champions**: Dedicated security experts within development teams`);
//     } else if (params.securityLevel === 'high-compliance') {
//       security.push(`The high-compliance security level implements comprehensive security controls:`);
//       security.push(`- **Advanced Authentication System**: Contextual, adaptive authentication`);
//       security.push(`- **Fine-Grained Authorization**: Attribute-based access control`);
//       security.push(`- **Enterprise WAF and RASP**: Runtime application self-protection`);
//       security.push(`- **Intrusion Prevention System**: Active threat mitigation`);
//       security.push(`- **End-to-End Encryption**: Comprehensive data protection`);
//       security.push(`- **Data Loss Prevention**: Controls to prevent data exfiltration`);
//       security.push(`- **Advanced Secret Management**: Automated rotation and access control`);
//       security.push(`- **Comprehensive Audit Logging**: Detailed audit trail for all activities`);
//       security.push(`- **Advanced SIEM**: AI-enhanced security monitoring and response`);
//       security.push(`- **Third-Party Security Audits**: Regular independent security assessments`);
//       security.push(`- **Formal Security Program**: Comprehensive security governance`);
//       security.push(`- **Threat Modeling**: For all new features and components`);
//     }
    
//     // Security recommendations
//     security.push(`\n## Additional Security Recommendations`);
    
//     // Business sector specific recommendations
//     if (params.businessSector === 'fintech') {
//       security.push(`1. **Financial Transaction Security**: Implement additional controls for financial transactions`);
//       security.push(`2. **Fraud Detection**: Consider AI-powered fraud detection systems`);
//       security.push(`3. **


// 'use client';

// import React, { useState, useEffect } from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Download, Upload, History, Send, Clock, Moon, Sun, Laptop, AlertCircle } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import MermaidViewer from "@/components/mermaidviewer"
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";

// type Diagram = {
//   id: number;
//   title: string;
//   mermaidCode?: string;
//   documentation?: string;
//   riskAnalysis?: string;
//   timestamp: string;
// };

// type HistoryItem = {
//   id: number;
//   prompt: string;
//   businessType: string;
//   businessSector: string;
//   timestamp: string;
//   diagrams: Diagram[];
//   modelUsed: string;
// };

// type ResponseData = {
//   diagrams: Diagram[];
// };

// interface AIPromptParams {
//   prompt: string;
//   businessType: string;
//   businessSector: string;
//   budget?: string;
//   audience?: string;
//   securityRequirements?: string;
// }

// // Configuration for AI APIs (you should move this to environment variables)
// const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
// const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
// const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// export default function GitFlowAI() {
//   const [prompt, setPrompt] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [businessType, setBusinessType] = useState("");
//   const [businessSector, setBusinessSector] = useState("");
//   const [budget, setBudget] = useState("");
//   const [audience, setAudience] = useState("");
//   const [responseData, setResponseData] = useState<ResponseData | null>(null);
//   const [history, setHistory] = useState<HistoryItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("generator");
//   const [theme, setTheme] = useState("system");
//   const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
//   const [viewMode, setViewMode] = useState<'diagram' | 'documentation' | 'risk'>('diagram');
//   const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [useGemini, setUseGemini] = useState(false);
//   const [modelUsed, setModelUsed] = useState<string>("gpt-4-turbo");

//   // Detect system theme preference
//   useEffect(() => {
//     if (theme === "system") {
//       const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//       document.documentElement.classList.toggle("dark", mediaQuery.matches);
      
//       const handler = (e: MediaQueryListEvent) => {
//         document.documentElement.classList.toggle("dark", e.matches);
//       };
      
//       mediaQuery.addEventListener("change", handler);
//       return () => mediaQuery.removeEventListener("change", handler);
//     } else {
//       document.documentElement.classList.toggle("dark", theme === "dark");
//     }
//   }, [theme]);

//   // Generate AI prompts based on user input and architecture type
//   const generateAIPrompt = (type: string, params: AIPromptParams) => {
//     const securityContext = `Security considerations:
//     - SDLC integration: Implement security checkpoints at each development phase
//     - Risk assessment based on business type (${params.businessType}) and sector (${params.businessSector})
//     - Budget constraints: ${params.budget || 'Not specified'}
//     - Target audience: ${params.audience || 'Not specified'}
//     - Compliance requirements for ${params.businessSector} sector`;

//     const prompts: { [key: string]: string } = {
//       mermaid: `Generate a Mermaid diagram for a ${type} architecture based on these requirements:
      
//       Business context:
//       - Type: ${params.businessType}
//       - Sector: ${params.businessSector}
//       - Requirements: ${params.prompt}
      
//       ${securityContext}
      
//       The diagram should:
//       1. Show all major components and their relationships
//       2. Include security elements (Auth, WAF, encryption at rest/transit)
//       3. Demonstrate scalability and resilience
//       4. Show data flow and integration points
//       5. Include monitoring and logging components
      
//       Return ONLY the Mermaid diagram code with no additional explanation.`,
      
//       documentation: `Create comprehensive architecture documentation for a ${type} architecture:
      
//       Business context:
//       - Type: ${params.businessType}
//       - Sector: ${params.businessSector}
//       - Requirements: ${params.prompt}
      
//       ${securityContext}
      
//       Include:
//       1. Architecture overview
//       2. Component descriptions
//       3. Security considerations per OWASP/NIST standards
//       4. Deployment strategy
//       5. Development practices and CI/CD pipeline
//       6. Monitoring and maintenance
//       7. Compliance requirements (GDPR, HIPAA, PCI DSS if applicable)
//       8. Best practices for secure development`,
      
//       risk: `Perform a comprehensive risk analysis for this ${type} architecture:
      
//       Business context:
//       - Type: ${params.businessType}
//       - Sector: ${params.businessSector}
//       - Requirements: ${params.prompt}
//       - Budget: ${params.budget || 'Not specified'}
      
//       Include:
//       1. Security risks and vulnerabilities
//       2. Scalability challenges
//       3. Technical debt analysis
//       4. Compliance risks
//       5. Business continuity considerations
//       6. Future scalability and technology evolution
//       7. Cost optimization opportunities
//       8. Mitigation strategies and recommendations`
//     };

//     return prompts;
//   };

//   // Call OpenAI API
//   const callOpenAI = async (prompt: string) => {
//     try {
//       const response = await fetch(OPENAI_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//           model: "gpt-4-turbo-preview",
//           messages: [
//             { role: "system", content: "You are an expert software architect with deep knowledge of security best practices, SDLC, and compliance requirements." },
//             { role: "user", content: prompt }
//           ],
//           temperature: 0.7,
//           max_tokens: 2000
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return data.choices[0].message.content;
//     } catch (error) {
//       console.error('Error calling OpenAI:', error);
//       throw error;
//     }
//   };

//   // Call Gemini API
//   const callGemini = async (prompt: string) => {
//     try {
//       const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [
//                 {
//                   text: "You are an expert software architect with deep knowledge of security best practices, SDLC, and compliance requirements. " + prompt
//                 }
//               ]
//             }
//           ],
//           generationConfig: {
//             temperature: 0.7,
//             maxOutputTokens: 2048,
//           }
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return data.candidates[0].content.parts[0].text;
//     } catch (error) {
//       console.error('Error calling Gemini:', error);
//       throw error;
//     }
//   };

//   const handleGenerate = async () => {
//     if (!prompt || !businessType || !businessSector) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     const currentModel = useGemini ? "gemini-2.5-pro" : "gpt-4-turbo";
//     setModelUsed(currentModel);

//     if (!useGemini && !OPENAI_API_KEY) {
//       setError("OpenAI API key is not configured. Please set NEXT_PUBLIC_OPENAI_API_KEY in your environment or switch to Gemini.");
//       return;
//     }

//     if (useGemini && !GEMINI_API_KEY) {
//       setError("Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment.");
//       return;
//     }
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const architectureTypes = ["Microservices", "Event-Driven", "Serverless"];
//       const generatedDiagrams: Diagram[] = [];

//       for (let i = 0; i < architectureTypes.length; i++) {
//         const archType = architectureTypes[i];
//         const params: AIPromptParams = {
//           prompt,
//           businessType,
//           businessSector,
//           budget,
//           audience
//         };

//         const prompts = generateAIPrompt(archType, params);
        
//         // Choose API based on user selection
//         const callAIModel = useGemini ? callGemini : callOpenAI;
        
//         // Generate each component using AI
//         const [mermaidCode, documentation, riskAnalysis] = await Promise.all([
//           callAIModel(prompts.mermaid),
//           callAIModel(prompts.documentation),
//           callAIModel(prompts.risk)
//         ]);
        
//         // Clean up the mermaid code (especially for Gemini which might include backticks)
//         const cleanMermaidCode = mermaidCode
//           .replace(/```mermaid\s*/g, '')
//           .replace(/```\s*$/g, '')
//           .trim();
        
//         generatedDiagrams.push({
//           id: i + 1,
//           title: `${archType} Architecture`,
//           mermaidCode: cleanMermaidCode,
//           documentation,
//           riskAnalysis,
//           timestamp: new Date().toISOString()
//         });
//       }
      
//       const newResponseData = { diagrams: generatedDiagrams };
//       setResponseData(newResponseData);
      
//       // Add to history
//       const historyItem = {
//         id: Date.now(),
//         prompt,
//         businessType,
//         businessSector,
//         timestamp: new Date().toISOString(),
//         diagrams: generatedDiagrams,
//         modelUsed: currentModel
//       };
      
//       setHistory(prev => [historyItem, ...prev]);
//     } catch (error) {
//       console.error('Error generating architecture:', error);
//       setError(`Failed to generate architecture using ${useGemini ? 'Gemini' : 'OpenAI'}. Please try again later.`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const uploadedFile = e.target.files[0];
//       setFile(uploadedFile);
      
//       // Read file content
//       const reader = new FileReader();
//       reader.onload = async (event) => {
//         const content = event.target?.result as string;
//         setPrompt(content);
//       };
//       reader.readAsText(uploadedFile);
//     }
//   };

//   const loadHistoryItem = (item: HistoryItem) => {
//     setPrompt(item.prompt);
//     setBusinessType(item.businessType);
//     setBusinessSector(item.businessSector);
//     setResponseData({ diagrams: item.diagrams });
//     setSelectedHistoryItem(item);
//     setActiveTab("generator");
//     setModelUsed(item.modelUsed);
//   };

//   const viewDiagramDetails = (diagram: Diagram, mode: 'diagram' | 'documentation' | 'risk') => {
//     setSelectedDiagram(diagram);
//     setViewMode(mode);
//   };

//   const downloadAsset = (diagram: Diagram, type: 'diagram' | 'documentation' | 'risk') => {
//     let content = '';
//     let filename = '';
//     let mimeType = '';

//     switch (type) {
//       case 'diagram':
//         content = diagram.mermaidCode || '';
//         filename = `${diagram.title.toLowerCase().replace(/\s+/g, '-')}-diagram.mmd`;
//         mimeType = 'text/plain';
//         break;
//       case 'documentation':
//         content = diagram.documentation || '';
//         filename = `${diagram.title.toLowerCase().replace(/\s+/g, '-')}-documentation.md`;
//         mimeType = 'text/markdown';
//         break;
//       case 'risk':
//         content = diagram.riskAnalysis || '';
//         filename = `${diagram.title.toLowerCase().replace(/\s+/g, '-')}-risk-analysis.md`;
//         mimeType = 'text/markdown';
//         break;
//     }

//     const blob = new Blob([content], { type: mimeType });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
//       <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 shadow-xl rounded-xl max-w-7xl mx-auto my-8 p-6">
//         <header className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">GitFlow AI</h1>
//             <p className="text-gray-600 dark:text-gray-300">Intelligent Software Architecture Generator</p>
//           </div>
          
//           <div className="flex space-x-2">
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button variant="outline" size="icon" onClick={() => setTheme("light")} 
//                     className={`${theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
//                     <Sun size={18} />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Light Mode</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
            
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button variant="outline" size="icon" onClick={() => setTheme("dark")}
//                     className={`${theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
//                     <Moon size={18} />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Dark Mode</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
            
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button variant="outline" size="icon" onClick={() => setTheme("system")}
//                     className={`${theme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
//                     <Laptop size={18} />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>System Theme</TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//         </header>

//         {error && (
//           <Alert variant="destructive" className="mb-6">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid grid-cols-2 mb-8">
//             <TabsTrigger value="generator" className="text-md py-3">
//               <div className="flex items-center">
//                 <Send className="mr-2 h-5 w-5" />
//                 Generator
//               </div>
//             </TabsTrigger>
//             <TabsTrigger value="history" className="text-md py-3">
//               <div className="flex items-center">
//                 <History className="mr-2 h-5 w-5" />
//                 History
//               </div>
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="generator" className="space-y-6">
//             {/* AI Model Selection */}
//             <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-lg font-medium mb-1">AI Model Selection</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Choose between OpenAI GPT-4 or Google Gemini 2.5 Pro (Free)
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <span className={`text-sm ${!useGemini ? "font-medium" : "text-gray-500 dark:text-gray-400"}`}>GPT-4</span>
//                   <Switch
//                     checked={useGemini}
//                     onCheckedChange={setUseGemini}
//                     id="model-toggle"
//                   />
//                   <span className={`text-sm ${useGemini ? "font-medium" : "text-gray-500 dark:text-gray-400"}`}>Gemini</span>
//                 </div>
//               </div>
              
//               {useGemini && (
//                 <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-teal-500">
//                   Using Gemini 2.5 Pro (Free Preview)
//                 </Badge>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Type</label>
//                 <Select onValueChange={setBusinessType} value={businessType}>
//                   <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm">
//                     <SelectValue placeholder="Select Business Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="startup">Startup</SelectItem>
//                     <SelectItem value="enterprise">Enterprise</SelectItem>
//                     <SelectItem value="smb">Small/Medium Business</SelectItem>
//                     <SelectItem value="nonprofit">Non-Profit</SelectItem>
//                     <SelectItem value="government">Government</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Sector</label>
//                 <Select onValueChange={setBusinessSector} value={businessSector}>
//                   <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm">
//                     <SelectValue placeholder="Select Business Sector" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="fintech">FinTech</SelectItem>
//                     <SelectItem value="healthcare">Healthcare</SelectItem>
//                     <SelectItem value="ecommerce">E-commerce</SelectItem>
//                     <SelectItem value="education">Education</SelectItem>
//                     <SelectItem value="logistics">Logistics</SelectItem>
//                     <SelectItem value="social">Social / Media</SelectItem>
//                     <SelectItem value="gaming">Gaming</SelectItem>
//                     <SelectItem value="iot">IoT / Embedded</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Range</label>
//                 <Select onValueChange={setBudget} value={budget}>
//                   <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm">
//                     <SelectValue placeholder="Select Budget Range" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="minimal">Minimal (&lt;$50K)</SelectItem>
//                     <SelectItem value="low">Low ($50K - $200K)</SelectItem>
//                     <SelectItem value="medium">Medium ($200K - $1M)</SelectItem>
//                     <SelectItem value="high">High ($1M - $5M)</SelectItem>
//                     <SelectItem value="enterprise">Enterprise (&gt;$5M)</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Audience</label>
//                 <Select onValueChange={setAudience} value={audience}>
//                   <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm">
//                     <SelectValue placeholder="Select Target Audience" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="consumer">General Consumers</SelectItem>
//                     <SelectItem value="business">Business Users</SelectItem>
//                     <SelectItem value="developer">Developers</SelectItem>
//                     <SelectItem value="enterprise">Enterprise Clients</SelectItem>
//                     <SelectItem value="government">Government Organizations</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business & Technical Requirements</label>
//               <Textarea
//                 placeholder="Describe your application requirements, user needs, technical constraints, and business goals..."
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 className="min-h-[180px] backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 border-0 shadow-sm resize-y"
//               />

//               <div className="flex flex-wrap items-center gap-4 mt-4">
//                 <label className="flex items-center cursor-pointer px-4 py-2 rounded-lg backdrop-blur-sm bg-white/80 dark:bg-gray-700/80 shadow-sm hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all">
//                   <Upload className="mr-2 h-5 w-5" />
//                   <Input type="file" onChange={handleFileUpload} className="hidden" accept=".txt,.md,.pdf,.docx" />
//                   <span className="text-sm">{file ? file.name : "Upload Business Plan / Requirements"}</span>
//                 </label>

//                 <Button 
//                   onClick={handleGenerate} 
//                   className={`ml-auto shadow-md hover:shadow-lg transition-all ${
//                     useGemini 
//                       ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white" 
//                       : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
//                   }`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Generating with {useGemini ? "Gemini" : "GPT-4"}...
//                     </>
//                   ) : (
//                     `Generate with ${useGemini ? "Gemini 2.5 Pro" : "GPT-4"}`
//                   )}
//                 </Button>
//               </div>
//             </div>

//             {responseData && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center px-2">
//                   <h2 className="text-2xl font-semibold">Generated Architectures</h2>
//                   <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
//                     Generated with {modelUsed}
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {responseData.diagrams.map((diagram) => (
//                     <Card key={diagram.id} className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all">
//                       <CardContent className="p-6">
//                         <div className="flex justify-between items-start mb-4">
//                           <h3 className="text-xl font-semibold">{diagram.title}</h3>
//                           <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//                             <Clock className="mr-1 h-3 w-3" />
//                             New
//                           </Badge>
//                         </div>
                        
//                         <div className="space-y-4">
//                           <Button 
//                             variant="default" 
//                             className={`w-full shadow-sm ${
//                               useGemini || modelUsed === "gemini-2.5-pro"
//                                 ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
//                                 : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                             }`}
//                             onClick={() => viewDiagramDetails(diagram, 'diagram')}
//                           >
//                             View Architecture Diagram
//                           </Button>
                          
//                           <Button 
//                             variant="outline" 
//                             className="w-full shadow-sm backdrop-blur-sm bg-white/80 dark:bg-gray-700/80"
//                             onClick={() => viewDiagramDetails(diagram, 'documentation')}
//                           >
//                             📄 View Documentation
//                           </Button>
                          
//                           <Button 
//                             variant="outline" 
//                             className="w-full shadow-sm backdrop-blur-sm bg-white/80 dark:bg-gray-700/80"
//                             onClick={() => viewDiagramDetails(diagram, 'risk')}
//                           >
//                             🧠 Future Considerations & Risk
//                           </Button>
                          
//                           <Button 
//                             variant="ghost" 
//                             className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//                             onClick={() => downloadAsset(diagram, 'diagram')}
//                           >
//                             <Download className="mr-2 h-4 w-4" /> Download Assets
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             )}