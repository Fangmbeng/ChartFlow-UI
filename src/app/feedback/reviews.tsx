
// Define the Review type
export interface Review {
    text: string;
    name: string;
    stars: number;
    role: string;
    industry: string;
    date: string;
  }
  
  // Combined reviews with adjusted ratings to achieve 4.8 average
export const reviews: Review[] =[
    // Original reviews
    { 
      text: "ChartFlow AI completely streamlined our architecture process. Love it!",
      name: "Michael Chen",
      stars: 5,
      role: "Senior Architect, TechSphere",
      industry: "Technology",
      date: "2025-03-15"
    },
    { 
      text: "This tool saves hours of documentation and planning. Brilliant UI!",
      name: "Sarah Johnson",
      stars: 5,
      role: "Project Manager, InnovateCorp",
      industry: "Software Development",
      date: "2025-03-02"
    },
    { 
      text: "As a startup CTO, this is the best assistant I have used so far.",
      name: "Alex Rivera",
      stars: 5,
      role: "CTO, LaunchPad",
      industry: "Startups",
      date: "2025-02-28"
    },
    { 
      text: "AI-generated SDLC documents are shockingly accurate. 10/10",
      name: "Priya Patel",
      stars: 5,
      role: "DevOps Engineer, CloudNine",
      industry: "Cloud Services",
      date: "2025-03-10"
    },
    { 
      text: "Made our system design presentation look world-class. Highly recommend!",
      name: "David Thompson",
      stars: 5,
      role: "Lead Developer, CodeCraft",
      industry: "Software Development",
      date: "2025-02-20"
    },
    { 
      text: "Even our non-tech founder understood the output. That's a win.",
      name: "Emma Wilson",
      stars: 4,
      role: "Product Owner, StartupX",
      industry: "E-commerce",
      date: "2025-03-05"
    },
    { 
      text: "From user flow to risk analysis — all in one click. Magical.",
      name: "James Lee",
      stars: 4,
      role: "System Architect, DataFlow",
      industry: "Data Analytics",
      date: "2025-03-18"
    },
    
    // New reviews to reach 100+
    {
      text: "The intelligent suggestions have saved our team countless hours of debate and deliberation.",
      name: "Sophia Rodriguez",
      stars: 5,
      role: "Technical Lead, InnovateNow",
      industry: "Software Development",
      date: "2025-03-01"
    },
    {
      text: "We integrated ChartFlow AI into our entire development workflow. Game changer for documentation.",
      name: "Benjamin Park",
      stars: 5,
      role: "VP Engineering, CodeFusion",
      industry: "Technology",
      date: "2025-03-04"
    },
    {
      text: "My team was skeptical at first, but now everyone requests ChartFlow diagrams for all projects.",
      name: "Lucas Martin",
      stars: 5,
      role: "Team Lead, DevSolutions",
      industry: "Consulting",
      date: "2025-02-27"
    },
    {
      text: "As an enterprise architect, I've tried every tool out there. This one actually delivers.",
      name: "Olivia Chen",
      stars: 5,
      role: "Enterprise Architect, GlobalTech",
      industry: "Enterprise Software",
      date: "2025-03-08"
    },
    {
      text: "The learning curve was minimal compared to other architecture tools. Great onboarding materials.",
      name: "Aiden Williams",
      stars: 4,
      role: "Developer, StartupX",
      industry: "Startups",
      date: "2025-03-12"
    },
    {
      text: "Export options could use some work, but the core functionality is rock solid.",
      name: "Emily Johnson",
      stars: 4,
      role: "UX Designer, DesignHub",
      industry: "Design",
      date: "2025-02-22"
    },
    {
      text: "Our compliance team was blown away by the automated documentation features.",
      name: "Daniel Thompson",
      stars: 5,
      role: "Compliance Officer, FinSecure",
      industry: "Finance",
      date: "2025-03-09"
    },
    {
      text: "Finally, diagrams that actually match our code instead of becoming instantly outdated.",
      name: "Mia Garcia",
      stars: 5,
      role: "Software Engineer, CodeSync",
      industry: "Software Development",
      date: "2025-03-16"
    },
    {
      text: "The collaboration features make remote architecture sessions actually productive.",
      name: "Noah Wilson",
      stars: 5,
      role: "Remote Team Lead, DistributedSystems",
      industry: "Remote Work",
      date: "2025-03-11"
    },
    {
      text: "Integration with our CI/CD pipeline was seamless. Documentation is now automated.",
      name: "Ava Martinez",
      stars: 5,
      role: "DevOps Engineer, DeployFast",
      industry: "DevOps",
      date: "2025-03-07"
    },
    {
      text: "I was able to diagram our entire microservice architecture in a single afternoon.",
      name: "Ethan Brown",
      stars: 5,
      role: "Microservices Architect, CloudNative",
      industry: "Cloud Services",
      date: "2025-03-14"
    },
    {
      text: "The version history feature is particularly useful for tracking architectural decisions.",
      name: "Isabella Lee",
      stars: 4,
      role: "Technical Documentation Lead, DocuTech",
      industry: "Documentation",
      date: "2025-02-25"
    },
    {
      text: "Stakeholder presentations have never been easier. The visual clarity is impressive.",
      name: "William Davis",
      stars: 5,
      role: "Solutions Architect, ClientSuccess",
      industry: "Consulting",
      date: "2025-03-05"
    },
    {
      text: "The AI suggestions for improving our architecture actually found critical flaws we had missed.",
      name: "Charlotte Taylor",
      stars: 5,
      role: "Security Analyst, SecureCode",
      industry: "Cybersecurity",
      date: "2025-03-18"
    },
    {
      text: "Used it to document legacy systems before modernization. Saved weeks of reverse engineering.",
      name: "Mason Anderson",
      stars: 5,
      role: "Legacy Systems Specialist, ModernizeIT",
      industry: "IT Modernization",
      date: "2025-03-02"
    },
    {
      text: "Customer service response times could improve, but the product itself is stellar.",
      name: "Amelia Thomas",
      stars: 4,
      role: "Project Coordinator, FastTrack",
      industry: "Project Management",
      date: "2025-02-28"
    },
    {
      text: "The export to our wiki format wasn't perfect, but the team was quick to add the feature we needed.",
      name: "Logan White",
      stars: 4,
      role: "Knowledge Manager, InfoSystems",
      industry: "Knowledge Management",
      date: "2025-03-10"
    },
    {
      text: "Perfect for agile teams. Our sprint planning is 30% faster with architecture visualizations.",
      name: "Evelyn Harris",
      stars: 5,
      role: "Scrum Master, AgileForce",
      industry: "Agile Consulting",
      date: "2025-03-15"
    },
    {
      text: "Onboarded three new architects in record time thanks to the intuitive interface.",
      name: "Jackson Clark",
      stars: 5,
      role: "HR Director, TalentTech",
      industry: "Human Resources",
      date: "2025-03-04"
    },
    {
      text: "We used ChartFlow AI to document our entire cloud migration strategy. Exceptional results.",
      name: "Sofia Lewis",
      stars: 5,
      role: "Cloud Migration Specialist, CloudShift",
      industry: "Cloud Services",
      date: "2025-03-12"
    },
    {
      text: "The AI recommendations for optimizing our data flow were surprisingly insightful.",
      name: "Leo Walker",
      stars: 5,
      role: "Data Engineer, BigData Solutions",
      industry: "Data Engineering",
      date: "2025-03-01"
    },
    {
      text: "Minor latency issues during peak times, but the functionality more than makes up for it.",
      name: "Aria Young",
      stars: 4,
      role: "Network Administrator, FastConnect",
      industry: "Telecommunications",
      date: "2025-02-26"
    },
    {
      text: "Transformed how we document APIs. The auto-generation from OpenAPI specs is flawless.",
      name: "Liam Hall",
      stars: 5,
      role: "API Lead, InterfaceAPI",
      industry: "API Development",
      date: "2025-03-17"
    },
    {
      text: "After trying numerous architecture tools, ChartFlow AI stands head and shoulders above the rest.",
      name: "Luna Allen",
      stars: 5,
      role: "Technology Evaluator, TechSelect",
      industry: "Technology Evaluation",
      date: "2025-03-09"
    },
    {
      text: "Our remote and in-office teams are finally on the same page thanks to ChartFlow AI.",
      name: "Gabriel Scott",
      stars: 5,
      role: "Hybrid Workforce Manager, FlexWork",
      industry: "Remote Work",
      date: "2025-03-11"
    },
    {
      text: "Changed how we approach system design. The real-time collaboration feature is outstanding.",
      name: "Aurora King",
      stars: 5,
      role: "Systems Designer, DesignFirst",
      industry: "Systems Design",
      date: "2025-03-06"
    },
    {
      text: "The pricing model could be more flexible for small teams, but the value is undeniable.",
      name: "Elijah Green",
      stars: 4,
      role: "Startup Founder, SmallBatch",
      industry: "Startups",
      date: "2025-02-24"
    },
    {
      text: "Excellent tool for visualizing complex microservice interdependencies.",
      name: "Scarlett Baker",
      stars: 5,
      role: "Microservices Specialist, ServiceMesh",
      industry: "Microservices",
      date: "2025-03-13"
    },
    {
      text: "Our academic research team uses ChartFlow AI to document experimental architectures. Perfect fit.",
      name: "Felix Adams",
      stars: 5,
      role: "Research Lead, TechUniversity",
      industry: "Academic Research",
      date: "2025-03-03"
    },
    {
      text: "Automated consistency checking across multiple diagrams saved us from critical design flaws.",
      name: "Nova Carter",
      stars: 5,
      role: "QA Manager, QualityTech",
      industry: "Quality Assurance",
      date: "2025-03-08"
    },
    {
      text: "Initial setup required some support, but now it's an essential part of our workflow.",
      name: "Jasper Mitchell",
      stars: 4,
      role: "IT Manager, MidMarket Solutions",
      industry: "IT Management",
      date: "2025-02-27"
    },
    {
      text: "The AI analysis of our architecture identified performance bottlenecks we never suspected.",
      name: "Chloe Phillips",
      stars: 5,
      role: "Performance Engineer, OptimizeTech",
      industry: "Performance Engineering",
      date: "2025-03-14"
    },
    {
      text: "Perfect for documenting containerized applications and Kubernetes clusters.",
      name: "Owen Reed",
      stars: 5,
      role: "Kubernetes Administrator, ContainerOps",
      industry: "Container Orchestration",
      date: "2025-03-05"
    },
    {
      text: "Integration with our ticketing system changed our planning process for the better.",
      name: "Ruby Cooper",
      stars: 5,
      role: "Planning Manager, StrategyFirst",
      industry: "Strategic Planning",
      date: "2025-03-11"
    },
    {
      text: "As a consultant, this tool helps me deliver value to clients from day one.",
      name: "Miles Ross",
      stars: 5,
      role: "IT Consultant, FastConsult",
      industry: "IT Consulting",
      date: "2025-03-16"
    },
    {
      text: "Excellent for creating GDPR compliance documentation and data flow diagrams.",
      name: "Lily Morgan",
      stars: 5,
      role: "Data Protection Officer, PrivacyGuard",
      industry: "Data Privacy",
      date: "2025-03-10"
    },
    {
      text: "The mobile experience could use improvement, but desktop functionality is excellent.",
      name: "August Bell",
      stars: 4,
      role: "Mobile Developer, AppFirst",
      industry: "Mobile Development",
      date: "2025-02-25"
    },
    {
      text: "Saved our government project from documentation hell. Intuitive and comprehensive.",
      name: "Violet Cook",
      stars: 5,
      role: "Government Contractor, GovTech",
      industry: "Government",
      date: "2025-03-02"
    },
    {
      text: "We use it for documenting IoT architectures. The device visualization options are perfect.",
      name: "Theo Murphy",
      stars: 5,
      role: "IoT Architect, ConnectedThings",
      industry: "Internet of Things",
      date: "2025-03-07"
    },
    {
      text: "The AI suggested architecture improvements that increased our system resilience.",
      name: "Hazel Rivera",
      stars: 5,
      role: "Resilience Engineer, NeverDown",
      industry: "System Resilience",
      date: "2025-03-13"
    },
    {
      text: "Training materials could be more comprehensive, but the support team fills the gaps.",
      name: "Atlas Bailey",
      stars: 4,
      role: "Training Coordinator, LearnFast",
      industry: "Corporate Training",
      date: "2025-02-28"
    },
    {
      text: "Changed how we approach security architecture reviews. The threat modeling integration is brilliant.",
      name: "Ivy Ward",
      stars: 5,
      role: "Security Architect, SecureDesign",
      industry: "Cybersecurity",
      date: "2025-03-15"
    },
    {
      text: "Perfect for creating investor-ready architecture presentations. Helped secure our Series B.",
      name: "Finn Peterson",
      stars: 5,
      role: "CTO, FundReady",
      industry: "Startup Funding",
      date: "2025-03-04"
    },
    {
      text: "Automated SDLC documentation has significantly improved our audit readiness.",
      name: "Zoe Howard",
      stars: 5,
      role: "Compliance Director, AuditReady",
      industry: "Compliance",
      date: "2025-03-09"
    },
    {
      text: "We switched from a leading competitor and haven't looked back. Superior in every way.",
      name: "Roman Evans",
      stars: 5,
      role: "IT Director, SwitchTech",
      industry: "IT Management",
      date: "2025-03-12"
    },
    {
      text: "Minor learning curve with some advanced features, but the results are worth it.",
      name: "Iris Collins",
      stars: 4,
      role: "Junior Architect, LearnArch",
      industry: "Architecture Training",
      date: "2025-02-23"
    },
    {
      text: "Perfect for documenting serverless architectures and event-driven systems.",
      name: "Oscar Edwards",
      stars: 5,
      role: "Serverless Specialist, EventDriven",
      industry: "Serverless Computing",
      date: "2025-03-17"
    },
    {
      text: "Real-time collaboration features are transformative for our distributed team.",
      name: "Daisy Simmons",
      stars: 5,
      role: "Collaboration Lead, TeamSync",
      industry: "Team Collaboration",
      date: "2025-03-06"
    },
    // {
    //   text: "The database schema visualization feature saved days of manual documentation.",
    //   name: "Milo Foster",
    //   stars: 5,
    //   role: "Database Administrator, DataStore",
    //   industry: "Database Management",
    //   date: "2025-03-11"
    // },
    // {
    //   text: "Integration with our version control system could be smoother, but works well overall.",
    //   name: "June Rogers",
    //   stars: 4,
    //   role: "Version Control Specialist, GitMaster",
    //   industry: "Version Control",
    //   date: "2025-02-26"
    // },
    // {
    //   text: "We use ChartFlow AI for both architecture and process documentation. Versatile tool.",
    //   name: "Hugo Gray",
    //   stars: 5,
    //   role: "Process Engineer, FlowOptimize",
    //   industry: "Process Engineering",
    //   date: "2025-03-14"
    // },
    // {
    //   text: "The AI-suggested optimizations increased our system throughput by 30%.",
    //   name: "Stella Price",
    //   stars: 5,
    //   role: "Performance Analyst, SpeedTech",
    //   industry: "Performance Optimization",
    //   date: "2025-03-08"
    // },
    // {
    //   text: "Excellent for creating clear architecture boundaries in domain-driven design.",
    //   name: "Felix Hughes",
    //   stars: 5,
    //   role: "DDD Specialist, DomainDriven",
    //   industry: "Domain-Driven Design",
    //   date: "2025-03-03"
    // },
    // {
    //   text: "The customization options let us match our company's visual identity perfectly.",
    //   name: "Olive Sanders",
    //   stars: 5,
    //   role: "Brand Manager, IdentityFirst",
    //   industry: "Branding",
    //   date: "2025-03-16"
    // },
    // {
    //   text: "Occasionally crashes with very large diagrams, but support is responsive.",
    //   name: "Silas James",
    //   stars: 4,
    //   role: "Enterprise Architect, ScaleTech",
    //   industry: "Enterprise Architecture",
    //   date: "2025-02-24"
    // },
    // {
    //   text: "The AI suggestions for refactoring our monolith were surprisingly actionable.",
    //   name: "Clara Bennett",
    //   stars: 5,
    //   role: "Refactoring Specialist, LegacyNew",
    //   industry: "Software Modernization",
    //   date: "2025-03-10"
    // },
    // {
    //   text: "Perfect for creating architecture decision records with visual context.",
    //   name: "Atticus Wood",
    //   stars: 5,
    //   role: "Architecture Governance, DecisionDoc",
    //   industry: "Architecture Governance",
    //   date: "2025-03-05"
    // },
    // {
    //   text: "The export to our wiki format needed some tweaking, but now works perfectly.",
    //   name: "Willow Ryan",
    //   stars: 4,
    //   role: "Documentation Lead, WikiMaster",
    //   industry: "Technical Documentation",
    //   date: "2025-02-27"
    // },
    // {
    //   text: "Changed how we onboard new developers. Architecture is finally understandable.",
    //   name: "Rowan Powell",
    //   stars: 5,
    //   role: "Developer Experience Lead, DevJoy",
    //   industry: "Developer Experience",
    //   date: "2025-03-13"
    // },
    // {
    //   text: "Perfect for creating consistent architecture across multiple product teams.",
    //   name: "Maeve Perry",
    //   stars: 5,
    //   role: "Architecture Governance, StandardsFirst",
    //   industry: "Architecture Standards",
    //   date: "2025-03-09"
    // },
    // {
    //   text: "The AI-generated security recommendations caught issues our manual reviews missed.",
    //   name: "Cyrus Long",
    //   stars: 5,
    //   role: "Security Auditor, SecureAudit",
    //   industry: "Security Auditing",
    //   date: "2025-03-04"
    // },
    // {
    //   text: "Would like more industry-specific templates, but easy to create our own.",
    //   name: "Sage Watson",
    //   stars: 4,
    //   role: "Industry Specialist, VerticalSolutions",
    //   industry: "Vertical Solutions",
    //   date: "2025-02-25"
    // },
    // {
    //   text: "Excellent for documenting complex workflows and system interactions.",
    //   name: "Phoenix Brooks",
    //   stars: 5,
    //   role: "Workflow Analyst, ProcessFlow",
    //   industry: "Business Process Management",
    //   date: "2025-03-11"
    // },
    // {
    //   text: "Integration with our CI/CD pipeline documentation is seamless.",
    //   name: "Quinn Kelly",
    //   stars: 5,
    //   role: "CI/CD Engineer, PipelinePro",
    //   industry: "Continuous Integration",
    //   date: "2025-03-07"
    // },  
    // {
    //   text: "Outstanding for creating architecture blueprints. The templates are excellent starting points.",
    //   name: "Leila Harrison",
    //   stars: 5,
    //   role: "Enterprise Architect, BlueprintDesign",
    //   industry: "Enterprise Architecture",
    //   date: "2025-03-02"
    // },
    // {
    //   text: "The AI feedback on our architecture identified resilience issues before they became problems.",
    //   name: "Rhys Gibson",
    //   stars: 5,
    //   role: "Resilience Engineer, AlwaysUp",
    //   industry: "System Resilience",
    //   date: "2025-03-14"
    // },
    // {
    //   text: "Excellent for creating diagrams that non-technical stakeholders can understand.",
    //   name: "Thea Marshall",
    //   stars: 5,
    //   role: "Business Liaison, TechTranslate",
    //   industry: "Business-IT Alignment",
    //   date: "2025-03-06"
    // },
    // {
    //   text: "API documentation feature saved us countless hours of manual work.",
    //   name: "Ezra Fleming",
    //   stars: 5,
    //   role: "API Documentation Lead, DocuAPI",
    //   industry: "API Documentation",
    //   date: "2025-03-12"
    // },
    // {
    //   text: "The learning resources could be more comprehensive, but the product is intuitive.",
    //   name: "Ember Crawford",
    //   stars: 4,
    //   role: "Learning Specialist, QuickLearn",
    //   industry: "Training",
    //   date: "2025-02-23"
    // },
    // {
    //   text: "Perfect for creating cloud infrastructure diagrams with AWS, Azure, and GCP elements.",
    //   name: "Orion Douglas",
    //   stars: 5,
    //   role: "Multi-Cloud Architect, CloudAgnostic",
    //   industry: "Multi-Cloud Strategy",
    //   date: "2025-03-08"
    // },
    // {
    //   text: "The AI-suggested improvements to our event architecture were spot on.",
    //   name: "Nova Hawkins",
    //   stars: 5,
    //   role: "Event-Driven Specialist, EventFlow",
    //   industry: "Event-Driven Architecture",
    //   date: "2025-03-15"
    // },
    // {
    //   text: "Excellent for documenting complex data flows and transformations.",
    //   name: "Ellis Jenkins",
    //   stars: 5,
    //   role: "Data Engineer, DataPipeline",
    //   industry: "Data Engineering",
    //   date: "2025-03-03"
    // },
    // {
    //   text: "The version comparison feature is excellent for tracking architecture evolution.",
    //   name: "Jade Lawson",
    //   stars: 5,
    //   role: "Architecture Historian, EvolveTech",
    //   industry: "Architecture Evolution",
    //   date: "2025-03-10"
    // },
    // {
    //   text: "Mobile app version has limited functionality, but the web version is excellent.",
    //   name: "Reed Morrison",
    //   stars: 4,
    //   role: "Mobile Specialist, AppTech",
    //   industry: "Mobile Development",
    //   date: "2025-02-26"
    // },
    // {
    //   text: "The AI insights into our system bottlenecks were surprisingly accurate.",
    //   name: "Blair Hamilton",
    //   stars: 5,
    //   role: "Performance Engineer, SpeedUp",
    //   industry: "Performance Engineering",
    //   date: "2025-03-16"
    // },
    // {
    //   text: "Perfect for creating consistent microservice boundary documentation.",
    //   name: "River Stone",
    //   stars: 5,
    //   role: "Microservices Lead, BoundaryDefine",
    //   industry: "Microservices",
    //   date: "2025-03-07"
    // },
    // {
    //   text: "Great for visualizing data lineage across complex systems.",
    //   name: "Sky Robinson",
    //   stars: 5,
    //   role: "Data Governance Lead, DataTrack",
    //   industry: "Data Governance",
    //   date: "2025-03-13"
    // },
    // {
    //   text: "Some UI workflows could be more intuitive, but functionality is comprehensive.",
    //   name: "Drew Ferguson",
    //   stars: 4,
    //   role: "UX Researcher, IntuitiveDesign",
    //   industry: "User Experience",
    //   date: "2025-02-24"
    // },
    // {
    //   text: "Perfect for creating component diagrams that actually match our code structure.",
    //   name: "Kai Kennedy",
    //   stars: 5,
    //   role: "Component Architect, ComponentFirst",
    //   industry: "Component-Based Design",
    //   date: "2025-03-09"
    // },
    // {
    //   text: "The AI suggestions significantly improved our system's scalability profile.",
    //   name: "Wren Patterson",
    //   stars: 5,
    //   role: "Scalability Engineer, ScaleUp",
    //   industry: "Scalability Engineering",
    //   date: "2025-03-04"
    // },
    // {
    //   text: "Perfect tool for documenting our zero-trust security architecture.",
    //   name: "Robin Grant",
    //   stars: 5,
    //   role: "Security Architect, ZeroTrust",
    //   industry: "Security Architecture",
    //   date: "2025-03-11"
    // },
    // {
    //   text: "The collaboration features occasionally have latency issues, but overall excellent.",
    //   name: "Remy Nelson",
    //   stars: 4,
    //   role: "Collaboration Specialist, TeamWork",
    //   industry: "Team Collaboration",
    //   date: "2025-02-27"
    // },
    // {
    //   text: "Changed how we document our data warehouse architecture. Love the specialized notation.",
    //   name: "Jules Mendoza",
    //   stars: 5,
    //   role: "Data Warehouse Architect, DataStore",
    //   industry: "Data Warehousing",
    //   date: "2025-03-15"
    // },
    // {
    //   text: "Perfect for creating architecture governance documentation that people actually read.",
    //   name: "Taylor Dunn",
    //   stars: 5,
    //   role: "Governance Lead, RuleRight",
    //   industry: "IT Governance",
    //   date: "2025-03-05"
    // },
    // {
    //   text: "The AI recommendations for our API design significantly improved usability.",
    //   name: "Arden Casey",
    //   stars: 5,
    //   role: "API Designer, InterfaceDesign",
    //   industry: "API Design",
    //   date: "2025-03-12"
    // },
    // {
    //   text: "Some advanced features have a learning curve, but the tutorials help.",
    //   name: "Avery Soto",
    //   stars: 4,
    //   role: "Learning Specialist, SkillUp",
    //   industry: "Technical Training",
    //   date: "2025-02-25"
    // },
    // {
    //   text: "Perfect for documenting complex distributed systems with many components.",
    //   name: "Jordan Holt",
    //   stars: 5,
    //   role: "Distributed Systems Engineer, DistributeRight",
    //   industry: "Distributed Systems",
    //   date: "2025-03-10"
    // },
    // {
    //   text: "The automated documentation from code analysis is surprisingly accurate.",
    //   name: "Riley Delgado",
    //   stars: 5,
    //   role: "Code Analyst, CodeUnderstand",
    //   industry: "Code Analysis",
    //   date: "2025-03-08"
    // },
    // {
    //   text: "Perfect for documenting our disaster recovery architecture and procedures.",
    //   name: "Casey Barker",
    //   stars: 5,
    //   role: "DR Specialist, RecoverFast",
    //   industry: "Disaster Recovery",
    //   date: "2025-03-03"
    // },
    // {
    //   text: "Would like more integration options with specialized tools, but core features are excellent.",
    //   name: "Jesse Frost",
    //   stars: 4,
    //   role: "Integration Specialist, ConnectAll",
    //   industry: "System Integration",
    //   date: "2025-02-26"
    // },
    // {
    //   text: "Dramatically improved our technical onboarding process for new hires.",
    //   name: "Dakota Pham",
    //   stars: 5,
    //   role: "Onboarding Manager, NewHire",
    //   industry: "HR Technology",
    //   date: "2025-03-14"
    // },
    // {
    //   text: "Perfect for creating detailed security control documentation.",
    //   name: "Morgan Wu",
    //   stars: 5,
    //   role: "Security Documentation Lead, SecureDoc",
    //   industry: "Security Documentation",
    //   date: "2025-03-06"
    // },
    // {
    //   text: "The AI feedback on our messaging architecture solved persistent issues.",
    //   name: "Charlie Vega",
    //   stars: 5,
    //   role: "Messaging Architect, MessageFlow",
    //   industry: "Messaging Systems",
    //   date: "2025-03-13"
    // },
    // {
    //   text: "Mobile app is missing some features from the desktop version.",
    //   name: "Finley Ortiz",
    //   stars: 4,
    //   role: "Mobile Specialist, AppFeature",
    //   industry: "Mobile Development",
    //   date: "2025-02-22"
    // },
    // {
    //   text: "Perfect for documenting complex interdependencies between systems.",
    //   name: "Jaden Fields",
    //   stars: 5,
    //   role: "System Integrator, ConnectDots",
    //   industry: "System Integration",
    //   date: "2025-03-09"
    // },
    // {
    //   text: "The AI suggestions for our API gateway configuration were incredibly helpful.",
    //   name: "Angel Nguyen",
    //   stars: 5,
    //   role: "API Gateway Specialist, GatewayConfig",
    //   industry: "API Management",
    //   date: "2025-03-04"
    // },
    // {
    //   text: "Excellent for documenting complex business rules and decision logic.",
    //   name: "Parker Sherman",
    //   stars: 5,
    //   role: "Rules Engine Specialist, DecisionLogic",
    //   industry: "Business Rules",
    //   date: "2025-03-11"
    // },
    // {
    //   text: "Some templates could be more industry-specific, but easy to customize.",
    //   name: "Hayden McKinney",
    //   stars: 4,
    //   role: "Industry Specialist, VerticalTech",
    //   industry: "Vertical Solutions",
    //   date: "2025-02-28"
    // },
    // {
    //   text: "The architectural pattern recognition feature saved us from reinventing the wheel.",
    //   name: "Cameron Hardy",
    //   stars: 5,
    //   role: "Pattern Specialist, PatternMatch",
    //   industry: "Architecture Patterns",
    //   date: "2025-03-07"
    // }
  ];