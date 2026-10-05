import fs from 'node:fs';
import path from 'node:path';
import type {
  Client,
  Project,
  MagicToken,
  VaultSecret,
  VaultCategory,
  PaymentRecord,
  ReviewPin,
  ActivityLog,
  ChatMessage,
  DomainRecord,
  ToolItem,
  SubscriptionService,
  MaintenanceRetainer,
  MaintenanceTier,
  HealthSentinel,
  BackupRecord,
  IncidentReport,
  WarrantyTicket,
  AddonServiceItem,
  HandoffSafePackage,
  EnvVariableSpec,
  LoomWalkthrough,
  BrandAssetItem,
  MusePilotMessage,
  Milestone,
  MilestoneDeliverable,
  DeliverableStatus,
} from '@/lib/types/portal';
import { hashToken, encryptSecret, decryptSecret, generateMagicToken, generateScopeSignature } from '@/lib/server/crypto';

interface DatabaseSchema {
  clients: Client[];
  projects: Project[];
  magicTokens: MagicToken[];
  vaultSecrets: VaultSecret[];
  payments: PaymentRecord[];
  reviewPins: ReviewPin[];
  activityLogs: ActivityLog[];
  chatMessages: ChatMessage[];
  incidentReports: IncidentReport[];
  warrantyTickets?: WarrantyTicket[];
  addonServices?: AddonServiceItem[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'webmuse-db.json');

// Ensure directory and initialize store
function getInitialData(): DatabaseSchema {
  const sampleStagingPass = encryptSecret('Staging2026!ApexSecure#');
  const sampleDbUrl = encryptSecret('postgresql://postgres.apex:ApexSecure991@aws-0-eu-central-1.pooler.supabase.com:6543/postgres');
  const sampleApiKey = encryptSecret('wm_test_api_key_mock_placeholder_sample');

  const demoClient: Client = {
    id: 'cli_apex_01',
    name: 'Alex Vance',
    email: 'client@apexlabs.io',
    company: 'Apex Labs Inc.',
    telegramHandle: '@alexvance_apex',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const demoProject: Project = {
    id: 'proj_apex_01',
    clientId: 'cli_apex_01',
    title: 'Apex Protocol AI Platform',
    slug: 'apex-protocol',
    tagline: 'Autonomous Algorithmic Trading & Liquidity Engine',
    description:
      'High-performance institutional DeFi execution portal featuring AI-driven multi-chain arbitrage, mempool telemetry, and biometric authorization.',
    status: 'active',
    currentPhaseIndex: 0,
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Supabase',
      'FastAPI',
      'WebSockets',
      'Vercel',
    ],
    stagingUrl: 'https://staging.apex-protocol.webmuse.dev',
    repoUrl: 'https://github.com/webmuse-studios/apex-protocol-core',
    designUrl: 'https://figma.com/file/sample-apex-design-tokens',
    totalBudgetUsd: 18500,
    totalBudgetNgn: 27750000,
    prd: {
      version: '1.0.0',
      title: 'Apex Protocol Platform Architecture (PRD v1.0)',
      summary:
        'A dual-sided algorithmic dashboard allowing liquidity providers and quantitative funds to deploy automated trading strategies with sub-millisecond execution.',
      problemStatement:
        'Decentralized liquidity providers suffer from high impermanent loss, fragmented cross-chain bridges, and lack of institutional-grade automated risk management.',
      targetAudience:
        'Hedge fund managers, accredited crypto investors, decentralized autonomous organizations (DAOs), and liquidity allocators.',
      coreArchitecture:
        'Microservices event-mesh with Next.js 16 edge frontend, high-speed Python/Rust execution sidecars, and Supabase realtime state synchronization.',
      featureMatrix: [
        {
          category: 'Telemetry & Mempool Swarm',
          features: [
            'Live gas price forecasting & front-running evasion algorithms',
            'Sub-millisecond WebSocket market data feed',
            'Visual depth-of-market orderbook visualizer',
          ],
        },
        {
          category: 'AI Portfolio Optimization',
          features: [
            'Automated delta-neutral yield harvesting',
            'Predictive slippage reduction models',
            'Dynamic capital rebalancing triggers',
          ],
        },
        {
          category: 'Institutional Security & Audit',
          features: [
            'Multi-signature withdrawal quorum engine',
            'Hardware key (WebAuthn/YubiKey) approval workflows',
            'Exportable tax-compliant IRS/IFRS audit ledgers',
          ],
        },
      ],
      techStack: [
        'Next.js 16 (App Router)',
        'React 19',
        'TypeScript & Tailwind v4',
        'Supabase Realtime PostgreSQL',
        'FastAPI & ZeroMQ',
      ],
      kpis: [
        'Sub-80ms dashboard latency on 4G connections',
        '99.99% uptime during high-volatility market events',
        '100% adherence to scope baseline agreed upon in Milestone 1',
      ],
    },
    milestones: [
      {
        id: 'ms_01_discovery',
        projectId: 'proj_apex_01',
        orderIndex: 0,
        phaseNumber: 1,
        title: 'Genesis Discovery & PRD Sign-Off',
        subtitle: 'Foundational Scoping & Scope Creep Shield',
        description:
          'Deep architectural discovery, technical stack consensus, user journey mapping, and finalization of the Living Genesis PRD.',
        costUsd: 2500,
        costNgn: 3750000,
        status: 'in_progress',
        targetCompletionDays: 7,
        deliverables: [
          {
            id: 'del_01',
            title: 'Technical Discovery Matrix & Stakeholder Consensus',
            status: 'approved',
            description: 'Mapped all 14 integration endpoints and security constraints.',
          },
          {
            id: 'del_02',
            title: 'Living Genesis PRD Canvas (v1.0)',
            status: 'ready_for_review',
            description: 'Ready for digital scope approval by Apex Labs.',
          },
          {
            id: 'del_03',
            title: 'Database ERD & System Topology Document',
            status: 'in_progress',
            description: 'PostgreSQL schema models & Supabase RLS security policies.',
          },
        ],
      },
      {
        id: 'ms_02_design',
        projectId: 'proj_apex_01',
        orderIndex: 1,
        phaseNumber: 2,
        title: 'UI/UX Design Architecture & Design System',
        subtitle: 'Figma High-Fidelity & Interactive Prototypes',
        description:
          'Dark-mode cyberpunk visual system, component tokens, interactive prototype walkthrough, and micro-interaction specs.',
        costUsd: 4000,
        costNgn: 6000000,
        status: 'locked',
        targetCompletionDays: 14,
        deliverables: [
          {
            id: 'del_04',
            title: 'Institutional Dark Design Tokens & Figma Library',
            status: 'backlog',
          },
          {
            id: 'del_05',
            title: 'Live Orderbook & Chart Interaction Prototypes',
            status: 'backlog',
          },
          {
            id: 'del_06',
            title: 'Mobile & Tablet Viewport Responsive Specs',
            status: 'backlog',
          },
        ],
      },
      {
        id: 'ms_03_engineering',
        projectId: 'proj_apex_01',
        orderIndex: 2,
        phaseNumber: 3,
        title: 'Core Engine Sprint & Full-Stack Build',
        subtitle: 'Frontend, WebSocket Telemetry & API Integration',
        description:
          'Implementation of responsive Next.js frontend, Supabase real-time subscriptions, API connectivity, and trading bot execution hooks.',
        costUsd: 7000,
        costNgn: 10500000,
        status: 'locked',
        targetCompletionDays: 21,
        deliverables: [
          {
            id: 'del_07',
            title: 'Next.js 16 Reactive Dashboard & Charting Subsystems',
            status: 'backlog',
          },
          {
            id: 'del_08',
            title: 'Supabase Data Mesh & Auth Integrations',
            status: 'backlog',
          },
          {
            id: 'del_09',
            title: 'FastAPI Execution Sidecar Connectivity',
            status: 'backlog',
          },
        ],
      },
      {
        id: 'ms_04_qa',
        projectId: 'proj_apex_01',
        orderIndex: 3,
        phaseNumber: 4,
        title: 'Staging QA, Stress Audits & User Testing',
        subtitle: 'Live Staging Review Deck & Security Hardening',
        description:
          'Deployment to isolated staging environment, load testing, penetration audits, and client pinpoint feedback iterations.',
        costUsd: 3000,
        costNgn: 4500000,
        status: 'locked',
        targetCompletionDays: 10,
        deliverables: [
          {
            id: 'del_10',
            title: 'Live Staging Deployment & Review Studio Ingestion',
            status: 'backlog',
          },
          {
            id: 'del_11',
            title: 'Penetration & Cross-Site Vulnerability Audit',
            status: 'backlog',
          },
          {
            id: 'del_12',
            title: 'Visual Regression & Performance 100/100 Lighthouse Pass',
            status: 'backlog',
          },
        ],
      },
      {
        id: 'ms_05_handoff',
        projectId: 'proj_apex_01',
        orderIndex: 4,
        phaseNumber: 5,
        title: 'Handoff, Digital Safe Release & 30-Day SLA',
        subtitle: 'Production Cutover & Warranty Activation',
        description:
          'Custom domain routing, SSL issuance, GitHub repository transfer, master credential release, and launch of 30-day maintenance SLA clock.',
        costUsd: 2000,
        costNgn: 3000000,
        status: 'locked',
        targetCompletionDays: 5,
        deliverables: [
          {
            id: 'del_13',
            title: 'Production DNS & Cloudflare Edge SSL Setup',
            status: 'backlog',
          },
          {
            id: 'del_14',
            title: 'GitHub Organization Transfer & Source Delivery',
            status: 'backlog',
          },
          {
            id: 'del_15',
            title: 'Handoff Digital Safe Unlock & 30-Day Warranty Activation',
            status: 'backlog',
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const demoSecrets: VaultSecret[] = [
    {
      id: 'sec_01',
      projectId: 'proj_apex_01',
      category: 'staging_auth',
      toolName: 'Staging Vercel Preview',
      keyLabel: 'Staging Admin Password',
      encryptedValue: sampleStagingPass.encryptedValue,
      iv: sampleStagingPass.iv,
      authTag: sampleStagingPass.authTag,
      isClientVisible: true,
      notes: 'Use this to bypass staging basic-auth gate on preview builds.',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sec_02',
      projectId: 'proj_apex_01',
      category: 'database',
      toolName: 'Supabase PostgreSQL',
      keyLabel: 'Transaction Pooler URL',
      encryptedValue: sampleDbUrl.encryptedValue,
      iv: sampleDbUrl.iv,
      authTag: sampleDbUrl.authTag,
      isClientVisible: false,
      notes: 'Agency internal connection string for database schema migrations.',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sec_03',
      projectId: 'proj_apex_01',
      category: 'apis',
      toolName: 'WebMuse API Dispatcher',
      keyLabel: 'Telemetry Secret Key',
      encryptedValue: sampleApiKey.encryptedValue,
      iv: sampleApiKey.iv,
      authTag: sampleApiKey.authTag,
      isClientVisible: true,
      notes: 'Client API credential for ingesting live algorithmic signals.',
      updatedAt: new Date().toISOString(),
    },
  ];

  return {
    clients: [demoClient],
    projects: [demoProject],
    magicTokens: [],
    vaultSecrets: demoSecrets,
    payments: [],
    reviewPins: [],
    activityLogs: [
      {
        id: 'act_01',
        projectId: 'proj_apex_01',
        actor: 'agency',
        actorName: 'WebMuse Studio',
        action: 'PROJECT_INITIALIZED',
        details: 'Project workspace provisioned and Genesis PRD draft initialized.',
        timestamp: new Date().toISOString(),
      },
    ],
    chatMessages: getInitialChatMessages(),
    incidentReports: [],
  };
}

function getInitialChatMessages(): ChatMessage[] {
  return [
    {
      id: 'msg_01',
      projectId: 'proj_apex_01',
      sender: 'agency',
      senderName: 'Marteen Mubaraq',
      senderRole: 'WebMuse Lead Architect',
      message:
        'Welcome to your private WebMuse Command Center, Alex. We have provisioned your project environment, initialized your 12-Document Enclave, and mapped out Milestone 1 (Discovery & Genesis PRD). You can review all deliverables and chat with our team here anytime.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'msg_02',
      projectId: 'proj_apex_01',
      sender: 'client',
      senderName: 'Alex Vance',
      senderRole: 'Apex Labs Inc.',
      message:
        'Thanks Marteen! The Genesis PRD looks exceptionally detailed. I reviewed the mempool telemetry specs. Will the domain apexprotocol.io be automatically connected through Cloudflare SSL?',
      timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'msg_03',
      projectId: 'proj_apex_01',
      sender: 'agency',
      senderName: 'WebMuse Infrastructure',
      senderRole: 'DevOps & Edge Lead',
      message:
        'Yes, exactly! We have pre-configured Cloudflare Enterprise Edge DNS with full TLS 1.3 encryption. You can monitor domain expiration and our SaaS subscription dates directly in your new "Infrastructure & Subscriptions" tab.',
      timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
  ];
}

function ensureProjectEnrichment(p: Project): void {
  if (!p.domains || p.domains.length === 0) {
    p.domains = [
      {
        id: `dom_${p.id}_1`,
        domain: p.slug === 'apex-protocol' ? 'apexprotocol.io' : `${p.slug}.com`,
        registrar: 'Cloudflare Registrar',
        registeredAt: '2025-10-18T00:00:00.000Z',
        expiresAt: '2027-10-18T00:00:00.000Z',
        autoRenew: true,
        annualRenewalCostUsd: 14.5,
        sslStatus: 'active',
        sslIssuer: 'Cloudflare Edge ECC CA-3',
        sslExpiresAt: '2027-04-18T00:00:00.000Z',
        nameservers: ['ashley.ns.cloudflare.com', 'vance.ns.cloudflare.com'],
        status: 'healthy',
      },
      {
        id: `dom_${p.id}_2`,
        domain: `staging.${p.slug}.webmuse.dev`,
        registrar: 'WebMuse Cloudflare Edge DNS',
        registeredAt: '2026-01-10T00:00:00.000Z',
        expiresAt: '2028-01-10T00:00:00.000Z',
        autoRenew: true,
        annualRenewalCostUsd: 0,
        sslStatus: 'active',
        sslIssuer: "Let's Encrypt Authority X3",
        sslExpiresAt: '2027-01-10T00:00:00.000Z',
        nameservers: ['ns1.webmuse.dev', 'ns2.webmuse.dev'],
        status: 'healthy',
      },
    ];
  }

  if (!p.tools || p.tools.length === 0) {
    p.tools = [
      {
        id: 'tool_nextjs',
        name: 'Next.js 16 (App Router)',
        category: 'frontend',
        purpose: 'React 19 Server Components, Edge Rendering & Dynamic Streaming',
        tier: 'Production Framework',
        version: '16.2.10',
        status: 'operational',
        docsUrl: 'https://nextjs.org/docs',
      },
      {
        id: 'tool_supabase',
        name: 'Supabase Realtime PostgreSQL',
        category: 'database',
        purpose: 'Relational database, row-level security (RLS), real-time WebSockets',
        tier: 'Pro Dedicated Cluster',
        version: 'PostgreSQL 16.2',
        status: 'operational',
        docsUrl: 'https://supabase.com/docs',
      },
      {
        id: 'tool_vercel',
        name: 'Vercel Edge Network',
        category: 'hosting',
        purpose: 'Zero-cold-start Edge middleware, global CDN & serverless compute',
        tier: 'Pro Team Enterprise',
        status: 'operational',
        docsUrl: 'https://vercel.com/docs',
      },
      {
        id: 'tool_cloudflare',
        name: 'Cloudflare Zero Trust & WAF',
        category: 'security',
        purpose: 'DDoS mitigation, TLS 1.3 edge termination, DNS & Bot Management',
        tier: 'Pro Zone + WAF Rules',
        status: 'operational',
        docsUrl: 'https://cloudflare.com',
      },
      {
        id: 'tool_resend',
        name: 'Resend Transactional SMTP',
        category: 'messaging',
        purpose: 'Cryptographic magic link dispatch, transactional notifications, DKIM/SPF',
        tier: 'Scale Tier',
        status: 'operational',
        docsUrl: 'https://resend.com',
      },
      {
        id: 'tool_tailwind',
        name: 'Tailwind CSS v4 & Framer Motion',
        category: 'design',
        purpose: 'Cyberpunk design tokens, hardware-accelerated animations',
        tier: 'Design System',
        version: 'v4.0.0',
        status: 'operational',
      },
      {
        id: 'tool_openai',
        name: 'OpenAI GPT-4o Omni API',
        category: 'ai',
        purpose: 'Contextual AI intelligence, algorithmic analysis, automated summarization',
        tier: 'Tier 4 Production Org',
        status: 'operational',
        docsUrl: 'https://platform.openai.com',
      },
      {
        id: 'tool_sentry',
        name: 'Sentry Telemetry & Error APM',
        category: 'analytics',
        purpose: 'Real-time crash diagnostics, performance tracing, session replays',
        tier: 'Team Plan',
        status: 'operational',
        docsUrl: 'https://sentry.io',
      },
    ];
  }

  if (!p.subscriptions || p.subscriptions.length === 0) {
    p.subscriptions = [
      {
        id: 'sub_supabase',
        name: 'Supabase Pro Database Cluster',
        provider: 'Supabase Inc.',
        category: 'database',
        billingCycle: 'monthly',
        costUsd: 25,
        costNgn: 37500,
        renewDate: '2026-11-15T00:00:00.000Z',
        status: 'active',
        managedBy: 'agency',
        paymentCardLast4: '8821',
        loginUrl: 'https://supabase.com/dashboard',
      },
      {
        id: 'sub_vercel',
        name: 'Vercel Pro Team Hosting',
        provider: 'Vercel Inc.',
        category: 'hosting',
        billingCycle: 'monthly',
        costUsd: 20,
        costNgn: 30000,
        renewDate: '2026-12-01T00:00:00.000Z',
        status: 'active',
        managedBy: 'agency',
        paymentCardLast4: '8821',
        loginUrl: 'https://vercel.com',
      },
      {
        id: 'sub_cloudflare',
        name: 'Cloudflare Pro Zone & WAF',
        provider: 'Cloudflare',
        category: 'hosting',
        billingCycle: 'monthly',
        costUsd: 20,
        costNgn: 30000,
        renewDate: '2026-10-28T00:00:00.000Z',
        status: 'renewing_soon',
        managedBy: 'agency',
        paymentCardLast4: '8821',
        actionRequired: 'Scheduled renewal via WebMuse master billing profile.',
      },
      {
        id: 'sub_resend',
        name: 'Resend Scale Email Delivery',
        provider: 'Resend Inc.',
        category: 'email_sms',
        billingCycle: 'monthly',
        costUsd: 20,
        costNgn: 30000,
        renewDate: '2027-01-10T00:00:00.000Z',
        status: 'active',
        managedBy: 'agency',
      },
      {
        id: 'sub_openai',
        name: 'OpenAI Compute API Quota',
        provider: 'OpenAI LLC',
        category: 'ai_compute',
        billingCycle: 'monthly',
        costUsd: 120,
        costNgn: 180000,
        renewDate: '2026-11-01T00:00:00.000Z',
        status: 'active',
        managedBy: 'client',
        paymentCardLast4: '4190',
      },
      {
        id: 'sub_sentry',
        name: 'Sentry Performance Telemetry',
        provider: 'Functional Software Inc.',
        category: 'monitoring',
        billingCycle: 'monthly',
        costUsd: 26,
        costNgn: 39000,
        renewDate: '2026-11-30T00:00:00.000Z',
        status: 'active',
        managedBy: 'agency',
      },
    ];
  }

  if (!p.maintenanceRetainer) {
    p.maintenanceRetainer = {
      tier: 'mission_critical',
      tierName: 'WebMuse Mission Critical 24/7 SLA',
      billingPeriod: 'yearly',
      annualCostUsd: 5000,
      annualCostNgn: 7500000,
      status: 'active',
      expiresAt: '2027-10-01T00:00:00.000Z',
      slaResponseTime: '< 2 Hours Emergency SLA Guarantee',
      uptimeGuarantee: '99.99% Availability Commitment',
      contractRef: `WM-SLA-${p.slug.toUpperCase()}-2026`,
      lastPaymentRef: 'WIRE_ANNUAL_SLA_2026_01',
      includedFeatures: [
        '24/7/365 Real-Time Uptime & Server Sentinel',
        'Weekly automated dependency upgrades & security patch vetting',
        'Daily zero-downtime database backups & bi-weekly recovery drills',
        'Direct priority channel to WebMuse Senior Cloud Engineers',
        '15 hours / month included engineering tweaks & hotfixes',
        'Cloudflare Edge WAF firewall tuning & anti-DDoS mitigation',
        'Quarterly Lighthouse 100/100 Core Web Vitals re-tuning',
        'Domain registration & SSL certificate auto-management',
      ],
    };
  }

  if (!p.healthSentinel) {
    p.healthSentinel = {
      uptimePercentage: 99.98,
      avgLatencyMs: 34,
      sslGrade: 'A+',
      edgeNodesActive: 284,
      lastChecked: new Date().toISOString(),
      status: 'optimal',
    };
  }

  if (!p.backups || p.backups.length === 0) {
    p.backups = [
      {
        id: `bk_${p.id}_01`,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        sizeBytes: '48.2 MB',
        snapshotType: 'automated_daily',
        retentionDays: 30,
        status: 'verified',
      },
      {
        id: `bk_${p.id}_02`,
        timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
        sizeBytes: '47.9 MB',
        snapshotType: 'automated_daily',
        retentionDays: 30,
        status: 'verified',
      },
      {
        id: `bk_${p.id}_03`,
        timestamp: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString(),
        sizeBytes: '46.1 MB',
        snapshotType: 'pre_deployment',
        retentionDays: 60,
        status: 'verified',
      },
    ];
  }
}

export const DEFAULT_ADDON_CATALOG: AddonServiceItem[] = [
  {
    id: 'addon_rev_sprint',
    title: 'Additional Revision Sprint',
    tagline: 'Rapid 48-Hour UI/UX Polish & Refinement',
    description: 'Dedicated 48-hour engineering cycle for non-scope UI iterations, micro-interaction tuning, and styling updates.',
    category: 'performance',
    costUsd: 350,
    costNgn: 500000,
    estimatedTurnaroundDays: 2,
    deliverables: ['Custom design tweaks', 'Figma layout updates', 'Production patch deployment'],
    icon: 'Sparkles',
    status: 'available',
  },
  {
    id: 'addon_ai_assistant',
    title: 'AI Assistant Integration Sprint',
    tagline: 'Contextual RAG Assistant & Chatbot Shell',
    description: 'Embed a high-intelligence autonomous AI agent trained specifically on client domain documentation and user workflows.',
    category: 'ai',
    costUsd: 1200,
    costNgn: 1800000,
    estimatedTurnaroundDays: 5,
    deliverables: ['Vector embeddings pipeline', 'Custom chat UI', 'Streaming response engine', 'Admin prompt control'],
    icon: 'Bot',
    status: 'available',
  },
  {
    id: 'addon_speed_perf',
    title: 'Speed & Core Web Vitals Optimization',
    tagline: 'Sub-Second Edge Latency & 99+ Lighthouse',
    description: 'Deep optimization pass targeting 100/100 Lighthouse performance, edge asset caching, dynamic image compression, and bundle minification.',
    category: 'performance',
    costUsd: 450,
    costNgn: 650000,
    estimatedTurnaroundDays: 3,
    deliverables: ['Lighthouse 95+ audit pass', 'Brotli/Gzip compression tuning', 'Edge CDN cache rules', 'Bundle tree-shaking'],
    icon: 'Zap',
    status: 'available',
  },
  {
    id: 'addon_seo_schema',
    title: 'SEO & Structured Data Package',
    tagline: 'Semantic Rich Snippets & OpenGraph Dominance',
    description: 'Comprehensive technical SEO setup with dynamic OpenGraph banner generation, JSON-LD structured schema markup, and Google Search Console validation.',
    category: 'performance',
    costUsd: 600,
    costNgn: 900000,
    estimatedTurnaroundDays: 3,
    deliverables: ['Dynamic OG image generator', 'JSON-LD schema graph', 'Automated sitemap.xml & robots.txt', 'Canonical URL management'],
    icon: 'Search',
    status: 'available',
  },
  {
    id: 'addon_security_audit',
    title: 'Enterprise Penetration Test & Security Hardening',
    tagline: 'OWASP Top 10 Hardening & Threat Analysis',
    description: 'Rigorous penetration testing cycle validating API rate-limiting, CSRF shields, SQL injection immunity, and timing attack resistance.',
    category: 'security',
    costUsd: 850,
    costNgn: 1250000,
    estimatedTurnaroundDays: 4,
    deliverables: ['Automated DAST & SAST scans', 'Security headers audit (CSP, HSTS)', 'Vulnerability mitigation patch', 'Formal security sign-off report'],
    icon: 'ShieldCheck',
    status: 'available',
  },
  {
    id: 'addon_pwa_mobile',
    title: 'Custom Mobile PWA Shell',
    tagline: 'Installable App Experience with Offline Cache',
    description: 'Turn your web platform into an installable progressive web app (PWA) with custom splash screen, app manifest, and offline service worker caching.',
    category: 'mobile',
    costUsd: 750,
    costNgn: 1100000,
    estimatedTurnaroundDays: 4,
    deliverables: ['Manifest.json & icon suite', 'Offline service worker cache', 'Add-to-homescreen prompt', 'Push notification hook'],
    icon: 'Smartphone',
    status: 'available',
  },
];

function readDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }

    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    let needsSave = false;

    if (!parsed.chatMessages || parsed.chatMessages.length === 0) {
      parsed.chatMessages = getInitialChatMessages();
      needsSave = true;
    }
    if (!parsed.incidentReports) {
      parsed.incidentReports = [];
      needsSave = true;
    }
    if (!parsed.warrantyTickets) {
      parsed.warrantyTickets = [];
      needsSave = true;
    }
    if (!parsed.addonServices || parsed.addonServices.length === 0) {
      parsed.addonServices = DEFAULT_ADDON_CATALOG;
      needsSave = true;
    }
    if (parsed.projects) {
      for (const proj of parsed.projects) {
        if (!proj.domains || !proj.tools || !proj.subscriptions || !proj.maintenanceRetainer) {
          ensureProjectEnrichment(proj);
          needsSave = true;
        }
      }
    }

    if (needsSave) {
      writeDatabase(parsed);
    }

    return parsed;
  } catch (error) {
    console.error('[WebMuse DB] Read error, resetting or falling back to memory:', error);
    return getInitialData();
  }
}

function writeDatabase(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('[WebMuse DB] Write error:', error);
  }
}

// ==========================================
// STORE API METHODS
// ==========================================

export async function getClients(): Promise<Client[]> {
  const db = readDatabase();
  return db.clients;
}

export async function getClientByEmail(email: string): Promise<Client | null> {
  const db = readDatabase();
  const normalized = email.trim().toLowerCase();
  return db.clients.find((c) => c.email.toLowerCase() === normalized) || null;
}

export async function getClientById(id: string): Promise<Client | null> {
  const db = readDatabase();
  return db.clients.find((c) => c.id === id) || null;
}

export async function upsertClient(client: Client): Promise<Client> {
  const db = readDatabase();
  const index = db.clients.findIndex((c) => c.id === client.id);
  if (index >= 0) {
    db.clients[index] = { ...client, updatedAt: new Date().toISOString() };
  } else {
    db.clients.push({ ...client, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  writeDatabase(db);
  return client;
}

export async function getProjects(): Promise<Project[]> {
  const db = readDatabase();
  return db.projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const db = readDatabase();
  return db.projects.find((p) => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = readDatabase();
  return db.projects.find((p) => p.id === id) || null;
}

export async function getProjectForClient(clientId: string): Promise<Project | null> {
  const db = readDatabase();
  return db.projects.find((p) => p.clientId === clientId) || null;
}

export async function upsertProject(project: Project): Promise<Project> {
  const db = readDatabase();
  const index = db.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    db.projects[index] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    db.projects.push({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  writeDatabase(db);
  return project;
}

// ------------------------------------------
// Magic Token Management
// ------------------------------------------

export async function saveMagicToken(tokenData: {
  rawToken: string;
  tokenHash: string;
  email: string;
  projectId?: string;
  expiresInMinutes?: number;
}): Promise<MagicToken> {
  const db = readDatabase();
  const now = Date.now();
  const expiresAt = now + (tokenData.expiresInMinutes || 15) * 60 * 1000;

  // Purge any stale tokens for this email first
  db.magicTokens = db.magicTokens.filter((t) => t.email.toLowerCase() !== tokenData.email.toLowerCase());

  const record: MagicToken = {
    tokenHash: tokenData.tokenHash,
    rawTokenPreview: tokenData.rawToken.slice(0, 8),
    email: tokenData.email.toLowerCase(),
    projectId: tokenData.projectId,
    expiresAt,
    used: false,
    createdAt: now,
  };

  db.magicTokens.push(record);
  writeDatabase(db);
  return record;
}

export async function verifyAndConsumeMagicToken(rawToken: string): Promise<{
  valid: boolean;
  email?: string;
  projectId?: string;
  reason?: string;
}> {
  const db = readDatabase();
  const targetHash = hashToken(rawToken);
  const token = db.magicTokens.find((t) => t.tokenHash === targetHash);

  if (!token) {
    return { valid: false, reason: 'Invalid or unknown magic link.' };
  }

  if (token.used) {
    return { valid: false, reason: 'This magic link has already been used. Please request a new one.' };
  }

  if (Date.now() > token.expiresAt) {
    return { valid: false, reason: 'This magic link has expired. Magic links are valid for 15 minutes.' };
  }

  // Invalidate immediately (single-use)
  token.used = true;
  writeDatabase(db);

  return {
    valid: true,
    email: token.email,
    projectId: token.projectId,
  };
}

// ------------------------------------------
// Vault Secrets
// ------------------------------------------

export async function getVaultSecrets(projectId: string, isClientView = true): Promise<VaultSecret[]> {
  const db = readDatabase();
  return (db.vaultSecrets || []).filter((s) => s.projectId === projectId && (!isClientView || s.isClientVisible));
}

export async function getVaultSecretById(secretId: string): Promise<VaultSecret | null> {
  const db = readDatabase();
  return (db.vaultSecrets || []).find((s) => s.id === secretId) || null;
}

export async function getDecryptedVaultSecret(
  secretId: string,
  isClient = true,
  requesterEmail?: string
): Promise<{ secret: VaultSecret; decryptedValue: string } | null> {
  const db = readDatabase();
  const secret = (db.vaultSecrets || []).find((s) => s.id === secretId);
  if (!secret) return null;

  // Role Isolation: Clients can NEVER decrypt internal developer keys
  if (isClient && !secret.isClientVisible) {
    throw new Error('ACCESS_DENIED: Client role is not authorized to decrypt internal developer credentials.');
  }

  const decryptedValue = decryptSecret({
    encryptedValue: secret.encryptedValue,
    iv: secret.iv,
    authTag: secret.authTag,
  });

  // Security Audit Log
  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: secret.projectId,
    actor: isClient ? 'client' : 'agency',
    actorName: requesterEmail || (isClient ? 'Authorized Client' : 'WebMuse Security Enclave'),
    action: 'VAULT_SECRET_ACCESSED',
    details: `Decrypted credential "${secret.keyLabel}" (${secret.toolName}) viewed via hardware-grade AES-256-GCM.`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return { secret, decryptedValue };
}

export async function createVaultSecret(data: {
  projectId: string;
  category: VaultCategory;
  toolName: string;
  keyLabel: string;
  plainValue: string;
  isClientVisible: boolean;
  notes?: string;
  actorName?: string;
}): Promise<VaultSecret> {
  const db = readDatabase();
  if (!db.vaultSecrets) db.vaultSecrets = [];

  const encrypted = encryptSecret(data.plainValue);

  const secret: VaultSecret = {
    id: `sec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: data.projectId,
    category: data.category,
    toolName: data.toolName,
    keyLabel: data.keyLabel,
    encryptedValue: encrypted.encryptedValue,
    iv: encrypted.iv,
    authTag: encrypted.authTag,
    isClientVisible: data.isClientVisible,
    notes: data.notes,
    updatedAt: new Date().toISOString(),
  };

  db.vaultSecrets.push(secret);

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: data.projectId,
    actor: 'agency',
    actorName: data.actorName || 'WebMuse Admin',
    action: 'VAULT_SECRET_CREATED',
    details: `Encrypted credential "${data.keyLabel}" (${data.toolName}) committed to AES-256 vault. Visible to client: ${data.isClientVisible ? 'Yes' : 'No (Agency Only)'}.`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return secret;
}

export async function updateVaultSecret(
  secretId: string,
  data: {
    category?: VaultCategory;
    toolName?: string;
    keyLabel?: string;
    plainValue?: string;
    isClientVisible?: boolean;
    notes?: string;
    actorName?: string;
  }
): Promise<VaultSecret | null> {
  const db = readDatabase();
  if (!db.vaultSecrets) return null;

  const secret = db.vaultSecrets.find((s) => s.id === secretId);
  if (!secret) return null;

  if (data.category) secret.category = data.category;
  if (data.toolName) secret.toolName = data.toolName;
  if (data.keyLabel) secret.keyLabel = data.keyLabel;
  if (data.isClientVisible !== undefined) secret.isClientVisible = data.isClientVisible;
  if (data.notes !== undefined) secret.notes = data.notes;

  if (data.plainValue) {
    const encrypted = encryptSecret(data.plainValue);
    secret.encryptedValue = encrypted.encryptedValue;
    secret.iv = encrypted.iv;
    secret.authTag = encrypted.authTag;
  }

  secret.updatedAt = new Date().toISOString();

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: secret.projectId,
    actor: 'agency',
    actorName: data.actorName || 'WebMuse Admin',
    action: 'VAULT_SECRET_UPDATED',
    details: `Updated credential "${secret.keyLabel}" (${secret.toolName}) in AES-256 vault.`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return secret;
}

export async function deleteVaultSecret(secretId: string, actorName?: string): Promise<boolean> {
  const db = readDatabase();
  if (!db.vaultSecrets) return false;

  const index = db.vaultSecrets.findIndex((s) => s.id === secretId);
  if (index === -1) return false;

  const [removed] = db.vaultSecrets.splice(index, 1);

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: removed.projectId,
    actor: 'agency',
    actorName: actorName || 'WebMuse Admin',
    action: 'VAULT_SECRET_DELETED',
    details: `Credential "${removed.keyLabel}" (${removed.toolName}) permanently purged from AES-256 vault.`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return true;
}

export async function upsertVaultSecret(secret: VaultSecret): Promise<VaultSecret> {
  const db = readDatabase();
  if (!db.vaultSecrets) db.vaultSecrets = [];
  const index = db.vaultSecrets.findIndex((s) => s.id === secret.id);
  if (index >= 0) {
    db.vaultSecrets[index] = { ...secret, updatedAt: new Date().toISOString() };
  } else {
    db.vaultSecrets.push({ ...secret, updatedAt: new Date().toISOString() });
  }
  writeDatabase(db);
  return secret;
}

// ------------------------------------------
// Staging Review Studio & Pinpoint Visual Annotations
// ------------------------------------------

export async function getProjectReviewPins(
  projectId: string,
  milestoneId?: string
): Promise<ReviewPin[]> {
  const db = readDatabase();
  return (db.reviewPins || [])
    .filter((p) => p.projectId === projectId && (!milestoneId || p.milestoneId === milestoneId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createReviewPin(data: {
  projectId: string;
  milestoneId: string;
  authorEmail: string;
  authorName: string;
  xPercent: number;
  yPercent: number;
  viewportWidth: number;
  comment: string;
  severity: 'tweak' | 'bug' | 'copy';
}): Promise<ReviewPin> {
  const db = readDatabase();
  if (!db.reviewPins) db.reviewPins = [];

  const pin: ReviewPin = {
    id: `pin_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: data.projectId,
    milestoneId: data.milestoneId,
    authorEmail: data.authorEmail,
    authorName: data.authorName,
    xPercent: Math.round(data.xPercent * 100) / 100,
    yPercent: Math.round(data.yPercent * 100) / 100,
    viewportWidth: data.viewportWidth,
    comment: data.comment,
    severity: data.severity,
    status: 'open',
    createdAt: new Date().toISOString(),
  };

  db.reviewPins.unshift(pin);

  // Notify team in direct comms
  if (!db.chatMessages) db.chatMessages = [];
  const sevEmoji = data.severity === 'bug' ? '🔴' : data.severity === 'tweak' ? '🟡' : '🔵';
  db.chatMessages.push({
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: data.projectId,
    sender: 'client',
    senderName: data.authorName,
    senderRole: 'Staging Review Studio',
    message: `${sevEmoji} [STAGING FEEDBACK PIN #${pin.id.slice(-4)}]: "${data.comment}" dropped at (${pin.xPercent}%, ${pin.yPercent}%) on ${data.viewportWidth}px viewport.`,
    timestamp: new Date().toISOString(),
    read: false,
  });

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: data.projectId,
    actor: 'client',
    actorName: data.authorName,
    action: 'REVIEW_PIN_DROPPED',
    details: `Staging feedback marker #${pin.id.slice(-4)} placed [${data.severity.toUpperCase()}]: "${data.comment.slice(0, 60)}"`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return pin;
}

export async function resolveReviewPin(
  pinId: string,
  status: 'open' | 'resolved',
  resolverName?: string
): Promise<ReviewPin | null> {
  const db = readDatabase();
  if (!db.reviewPins) return null;

  const pin = db.reviewPins.find((p) => p.id === pinId);
  if (!pin) return null;

  pin.status = status;

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: pin.projectId,
    actor: 'agency',
    actorName: resolverName || 'WebMuse Lead Engineer',
    action: status === 'resolved' ? 'REVIEW_PIN_RESOLVED' : 'REVIEW_PIN_REOPENED',
    details: `Staging feedback marker #${pin.id.slice(-4)} marked ${status.toUpperCase()} by ${resolverName || 'Engineering team'}.`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return pin;
}

export async function deleteReviewPin(pinId: string, actorName?: string): Promise<boolean> {
  const db = readDatabase();
  if (!db.reviewPins) return false;

  const index = db.reviewPins.findIndex((p) => p.id === pinId);
  if (index === -1) return false;

  const [removed] = db.reviewPins.splice(index, 1);

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: removed.projectId,
    actor: 'agency',
    actorName: actorName || 'WebMuse Lead Engineer',
    action: 'REVIEW_PIN_DELETED',
    details: `Feedback marker #${removed.id.slice(-4)} removed from staging review deck.`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return true;
}

// ------------------------------------------
// Milestone Progression & Payments
// ------------------------------------------

export async function updateMilestoneStatus(
  projectId: string,
  milestoneId: string,
  status: 'locked' | 'awaiting_payment' | 'in_progress' | 'in_review' | 'completed',
  paymentRef?: string,
  gateway?: 'nowpayments' | 'paystack' | 'moniepoint' | 'manual'
): Promise<Project | null> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) return null;

  const milestone = project.milestones.find((m) => m.id === milestoneId);
  if (!milestone) return null;

  milestone.status = status;
  if (status === 'in_progress') {
    milestone.unlockedAt = new Date().toISOString();
    if (paymentRef) milestone.paymentTxRef = paymentRef;
    if (gateway) milestone.paymentGateway = gateway;
  } else if (status === 'completed') {
    milestone.completedAt = new Date().toISOString();
  }

  project.updatedAt = new Date().toISOString();
  writeDatabase(db);
  return project;
}

export async function recordPayment(payment: PaymentRecord): Promise<PaymentRecord> {
  const db = readDatabase();
  db.payments.push(payment);
  writeDatabase(db);
  return payment;
}

export async function createPaymentIntent(params: {
  projectId: string;
  milestoneId: string;
  amount: number;
  currency: 'USD' | 'NGN' | 'USDT';
  gateway: 'nowpayments' | 'paystack' | 'moniepoint' | 'manual';
  payerEmail: string;
  txHashOrRef: string;
  metadata?: Record<string, unknown>;
}): Promise<PaymentRecord> {
  const db = readDatabase();
  const payment: PaymentRecord = {
    id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: params.projectId,
    milestoneId: params.milestoneId,
    phaseNumber: 1,
    gateway: params.gateway,
    amount: params.amount,
    currency: params.currency,
    status: 'pending',
    txHashOrRef: params.txHashOrRef,
    payerEmail: params.payerEmail,
    metadata: params.metadata || {},
    createdAt: new Date().toISOString(),
  };

  const project = db.projects.find((p) => p.id === params.projectId);
  if (project) {
    const ms = project.milestones.find((m) => m.id === params.milestoneId);
    if (ms) payment.phaseNumber = ms.phaseNumber;
  }

  db.payments.push(payment);
  writeDatabase(db);
  return payment;
}

export async function confirmPaymentAndUnlockMilestone(params: {
  projectId: string;
  milestoneId: string;
  amount: number;
  currency: 'USD' | 'NGN' | 'USDT';
  gateway: 'nowpayments' | 'paystack' | 'moniepoint' | 'manual';
  txHashOrRef: string;
  payerEmail: string;
  metadata?: Record<string, unknown>;
}): Promise<{ project: Project; payment: PaymentRecord; alreadyConfirmed?: boolean }> {
  const db = readDatabase();

  // 1. Idempotency Check
  const existingPayment = db.payments.find(
    (p) => p.txHashOrRef === params.txHashOrRef && p.status === 'confirmed'
  );

  const project = db.projects.find((p) => p.id === params.projectId);
  if (!project) throw new Error(`Project ${params.projectId} not found`);

  const milestone = project.milestones.find((m) => m.id === params.milestoneId);
  if (!milestone) throw new Error(`Milestone ${params.milestoneId} not found`);

  if (existingPayment) {
    return { project, payment: existingPayment, alreadyConfirmed: true };
  }

  // 2. Record or update PaymentRecord
  let payment = db.payments.find((p) => p.txHashOrRef === params.txHashOrRef);
  const now = new Date().toISOString();

  if (payment) {
    payment.status = 'confirmed';
    payment.confirmedAt = now;
    payment.metadata = { ...(payment.metadata || {}), ...(params.metadata || {}) };
  } else {
    payment = {
      id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      projectId: params.projectId,
      milestoneId: params.milestoneId,
      phaseNumber: milestone.phaseNumber,
      gateway: params.gateway,
      amount: params.amount,
      currency: params.currency,
      status: 'confirmed',
      txHashOrRef: params.txHashOrRef,
      payerEmail: params.payerEmail,
      metadata: params.metadata || {},
      createdAt: now,
      confirmedAt: now,
    };
    db.payments.push(payment);
  }

  // 3. Milestone Gatekeeper Unlock
  milestone.status = 'in_progress';
  milestone.paidAt = now;
  milestone.unlockedAt = now;
  milestone.paymentTxRef = params.txHashOrRef;
  milestone.paymentGateway = params.gateway;

  // Update currentPhaseIndex to the newly unlocked milestone if ahead
  project.currentPhaseIndex = Math.max(project.currentPhaseIndex, milestone.orderIndex);
  project.updatedAt = now;

  // 4. Update Document #12 (12_Invoice.pdf) in project.documents
  if (project.documents) {
    const invoiceDoc = project.documents.find(
      (d) => d.id === 'doc_12_invoice' || d.filename.includes('Invoice')
    );
    if (invoiceDoc) {
      invoiceDoc.status = 'executed';
      invoiceDoc.signedAt = now;
      invoiceDoc.signedBy = params.payerEmail;
      invoiceDoc.signatureHash = params.txHashOrRef;
      invoiceDoc.description = `Settled invoice for Phase 0${milestone.phaseNumber} (${params.currency} ${params.amount.toLocaleString()}) via ${params.gateway.toUpperCase()}. Tx Ref: ${params.txHashOrRef}`;
    }
  }

  // 5. Activity Log Audit
  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: project.id,
    actor: 'client',
    actorName: params.payerEmail,
    action: 'MILESTONE_PAYMENT_CONFIRMED',
    details: `Settled ${params.currency} ${params.amount.toLocaleString()} for Phase 0${milestone.phaseNumber} (${milestone.title}) via ${params.gateway.toUpperCase()}. Ref: ${params.txHashOrRef}`,
    timestamp: now,
  });

  // 6. Direct Comms Announcement
  if (!db.chatMessages) db.chatMessages = [];
  db.chatMessages.push({
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: project.id,
    sender: 'agency',
    senderName: 'WebMuse Financial Sentinel',
    senderRole: 'Settlement Engine',
    message: `💎 PAYMENT SETTLED: Phase 0${milestone.phaseNumber} (${milestone.title}) has been verified on-chain / via ${params.gateway.toUpperCase()}.\n\nDeliverables are unlocked, Phase Gatekeeper lifted, and Invoice Document #12 generated. Tx Ref: ${params.txHashOrRef}`,
    timestamp: now,
    read: false,
  });

  writeDatabase(db);
  return { project, payment };
}

export async function getProjectPayments(projectId: string): Promise<PaymentRecord[]> {
  const db = readDatabase();
  return (db.payments || []).filter((p) => p.projectId === projectId);
}

export async function getPaymentByRef(txHashOrRef: string): Promise<PaymentRecord | null> {
  const db = readDatabase();
  return (db.payments || []).find((p) => p.txHashOrRef === txHashOrRef) || null;
}

// ------------------------------------------
// Phase 2 Admin & Project Operations
// ------------------------------------------

export async function addActivityLog(
  log: Omit<ActivityLog, 'id' | 'timestamp'>
): Promise<ActivityLog> {
  const db = readDatabase();
  const newLog: ActivityLog = {
    ...log,
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
  };
  db.activityLogs.unshift(newLog);
  if (db.activityLogs.length > 150) {
    db.activityLogs = db.activityLogs.slice(0, 150);
  }
  writeDatabase(db);
  return newLog;
}

export async function getActivityLogs(projectId?: string): Promise<ActivityLog[]> {
  const db = readDatabase();
  if (projectId) {
    return db.activityLogs.filter((a) => a.projectId === projectId);
  }
  return db.activityLogs;
}

export async function getProjectsWithClients(): Promise<Array<Project & { client: Client | null }>> {
  const db = readDatabase();
  return db.projects.map((p) => ({
    ...p,
    client: db.clients.find((c) => c.id === p.clientId) || null,
  }));
}

export async function getAgencyStats() {
  const db = readDatabase();
  const activeProjects = db.projects.filter((p) => p.status === 'active');

  let activeSprints = 0;
  let pendingApprovals = 0;
  let awaitingPayment = 0;
  let pipelineUsd = 0;
  let pipelineNgn = 0;

  for (const p of db.projects) {
    pipelineUsd += p.totalBudgetUsd || 0;
    pipelineNgn += p.totalBudgetNgn || 0;

    for (const m of p.milestones) {
      if (m.status === 'in_progress') activeSprints++;
      if (m.status === 'in_review') pendingApprovals++;
      if (m.status === 'awaiting_payment') awaitingPayment++;

      for (const d of m.deliverables) {
        if (d.status === 'ready_for_review') pendingApprovals++;
      }
    }
  }

  return {
    totalProjects: db.projects.length,
    activeRetainers: activeProjects.length,
    activeSprints,
    pendingApprovals,
    awaitingPayment,
    pipelineUsd,
    pipelineNgn,
  };
}

export async function overrideMilestone(
  projectId: string,
  milestoneId: string,
  updates: {
    status?: 'locked' | 'awaiting_payment' | 'in_progress' | 'in_review' | 'completed';
    paymentRef?: string;
    gateway?: 'nowpayments' | 'paystack' | 'moniepoint' | 'manual';
    notes?: string;
  }
): Promise<Project | null> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) return null;

  const milestoneIndex = project.milestones.findIndex((m) => m.id === milestoneId);
  if (milestoneIndex === -1) return null;

  const milestone = project.milestones[milestoneIndex];

  if (updates.status) {
    milestone.status = updates.status;
  }

  if (updates.paymentRef) {
    milestone.paymentTxRef = updates.paymentRef;
  }

  if (updates.gateway) {
    milestone.paymentGateway = updates.gateway;
  }

  if (updates.status === 'in_progress') {
    milestone.unlockedAt = new Date().toISOString();
  }

  if (updates.status === 'completed') {
    milestone.completedAt = new Date().toISOString();
    // Advance project phase index if this was the current phase
    if (project.currentPhaseIndex === milestoneIndex && milestoneIndex < project.milestones.length - 1) {
      project.currentPhaseIndex = milestoneIndex + 1;
      const nextMilestone = project.milestones[project.currentPhaseIndex];
      if (nextMilestone && nextMilestone.status === 'locked') {
        nextMilestone.status = 'awaiting_payment';
      }
    } else if (milestoneIndex === project.milestones.length - 1) {
      project.status = 'completed';
    }
  }

  project.updatedAt = new Date().toISOString();

  // Log administrative override
  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: project.id,
    actor: 'agency',
    actorName: 'Agency Administrator',
    action: 'MILESTONE_OVERRIDE',
    details: `Phase ${milestone.phaseNumber} (${milestone.title}) updated to ${milestone.status}. ${updates.notes || ''}`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return project;
}

export async function createFullProject(payload: {
  client: {
    name: string;
    email: string;
    company: string;
    telegramHandle?: string;
    discordHandle?: string;
    phone?: string;
  };
  project: {
    title: string;
    slug?: string;
    tagline?: string;
    description: string;
    techStack: string[];
    stagingUrl?: string;
    repoUrl?: string;
    designUrl?: string;
    milestones: Array<{
      title: string;
      subtitle: string;
      description: string;
      costUsd: number;
      costNgn: number;
      targetCompletionDays: number;
      deliverables: Array<{ title: string; description?: string }>;
    }>;
    prdSummary?: string;
    problemStatement?: string;
    targetAudience?: string;
    coreArchitecture?: string;
  };
}): Promise<{
  project: Project;
  client: Client;
  rawToken: string;
  magicToken: MagicToken;
}> {
  const db = readDatabase();

  // 1. Resolve or Create Client
  const normalizedEmail = payload.client.email.trim().toLowerCase();
  let client = db.clients.find((c) => c.email.toLowerCase() === normalizedEmail);

  if (!client) {
    client = {
      id: `cli_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: payload.client.name.trim(),
      email: normalizedEmail,
      company: payload.client.company.trim(),
      telegramHandle: payload.client.telegramHandle?.trim() || undefined,
      discordHandle: payload.client.discordHandle?.trim() || undefined,
      phone: payload.client.phone?.trim() || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.clients.push(client);
  } else {
    client.name = payload.client.name.trim() || client.name;
    client.company = payload.client.company.trim() || client.company;
    if (payload.client.telegramHandle) client.telegramHandle = payload.client.telegramHandle.trim();
    if (payload.client.discordHandle) client.discordHandle = payload.client.discordHandle.trim();
    if (payload.client.phone) client.phone = payload.client.phone.trim();
    client.updatedAt = new Date().toISOString();
  }

  // 2. Generate slug
  const baseSlug = (payload.project.slug || payload.project.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  let slug = baseSlug || `project-${Date.now().toString().slice(-4)}`;
  let counter = 1;
  while (db.projects.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const projectId = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

  // 3. Assemble Milestones
  let totalUsd = 0;
  let totalNgn = 0;

  const milestones = payload.project.milestones.map((m, index) => {
    totalUsd += Number(m.costUsd) || 0;
    totalNgn += Number(m.costNgn) || 0;

    return {
      id: `ms_${index + 1}_${Math.random().toString(36).slice(2, 6)}`,
      projectId,
      orderIndex: index,
      phaseNumber: index + 1,
      title: m.title,
      subtitle: m.subtitle,
      description: m.description,
      costUsd: Number(m.costUsd) || 0,
      costNgn: Number(m.costNgn) || 0,
      status: index === 0 ? ('in_progress' as const) : ('locked' as const),
      unlockedAt: index === 0 ? new Date().toISOString() : undefined,
      targetCompletionDays: Number(m.targetCompletionDays) || 7,
      deliverables: (m.deliverables || []).map((d, dIdx) => ({
        id: `del_${index + 1}_${dIdx + 1}_${Math.random().toString(36).slice(2, 5)}`,
        title: d.title,
        description: d.description || '',
        status: index === 0 ? ('in_progress' as const) : ('backlog' as const),
      })),
    };
  });

  // 4. Assemble Living Genesis PRD
  const prd = {
    version: '1.0.0',
    title: `${payload.project.title} Architectural Specification (PRD v1.0)`,
    summary:
      payload.project.prdSummary ||
      payload.project.description ||
      'Executive specifications and deliverables baseline agreed upon with client.',
    problemStatement:
      payload.project.problemStatement ||
      'Deliver high-ticket digital infrastructure with zero architectural compromises and sub-second performance.',
    targetAudience:
      payload.project.targetAudience || 'Enterprise users, institutional clients, and digital native consumers.',
    coreArchitecture:
      payload.project.coreArchitecture ||
      'Next.js 16 edge rendering, resilient cloud services, microservices backend, and state synchronization.',
    featureMatrix: [
      {
        category: 'Core System Capabilities',
        features: milestones.flatMap((m) => m.deliverables.map((d) => d.title)).slice(0, 8),
      },
      {
        category: 'Security & Integrity',
        features: [
          'Cryptographic magic link identity assertion',
          'AES-256-GCM encrypted credential vault protection',
          'Scope Creep Shield v1.0 immutable signature locking',
        ],
      },
    ],
    techStack: payload.project.techStack,
    kpis: [
      '100% adherence to agreed Milestone deliverables',
      'Sub-80ms responsive edge rendering',
      'Zero unhandled security vulnerabilities on staging and production cutover',
    ],
  };

  const newProject: Project = {
    id: projectId,
    clientId: client.id,
    title: payload.project.title,
    slug,
    tagline: payload.project.tagline || 'Bespoke Engineering & Design Sprint',
    description: payload.project.description,
    status: 'active',
    currentPhaseIndex: 0,
    techStack: payload.project.techStack,
    stagingUrl: payload.project.stagingUrl,
    repoUrl: payload.project.repoUrl,
    designUrl: payload.project.designUrl,
    totalBudgetUsd: totalUsd,
    totalBudgetNgn: totalNgn,
    prd,
    milestones,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  ensureProjectEnrichment(newProject);
  db.projects.push(newProject);

  // 5. Activity log
  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: newProject.id,
    actor: 'agency',
    actorName: 'Agency Administrator',
    action: 'PROJECT_GENESIS',
    details: `Created project "${newProject.title}" for ${client.name} (${client.company}) with ${milestones.length} milestones.`,
    timestamp: new Date().toISOString(),
  });

  // 6. Generate Magic Link
  const { rawToken, tokenHash } = generateMagicToken();
  const magicToken: MagicToken = {
    tokenHash,
    rawTokenPreview: rawToken.slice(0, 8),
    email: client.email,
    projectId: newProject.id,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days initial invite validity
    used: false,
    createdAt: Date.now(),
  };
  db.magicTokens.push(magicToken);

  writeDatabase(db);

  return {
    project: newProject,
    client,
    rawToken,
    magicToken,
  };
}

export async function generateProjectInvite(projectId: string): Promise<{
  rawToken: string;
  magicLink: string;
  client: Client;
  project: Project;
} | null> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) return null;

  const client = db.clients.find((c) => c.id === project.clientId);
  if (!client) return null;

  const { rawToken, tokenHash } = generateMagicToken();
  const magicToken: MagicToken = {
    tokenHash,
    rawTokenPreview: rawToken.slice(0, 8),
    email: client.email,
    projectId: project.id,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    used: false,
    createdAt: Date.now(),
  };

  // Filter out any stale unused tokens for this project
  db.magicTokens = db.magicTokens.filter(
    (t) => !(t.projectId === project.id && t.email === client.email && !t.used)
  );
  db.magicTokens.push(magicToken);

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: project.id,
    actor: 'agency',
    actorName: 'Agency Administrator',
    action: 'MAGIC_INVITE_DISPATCHED',
    details: `Fresh magic token generated for client ${client.name} (${client.email}).`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);

  return {
    rawToken,
    magicLink: `/portal/verify?token=${rawToken}`,
    client,
    project,
  };
}

export async function signOffPRDScope(
  projectId: string,
  signerName: string,
  signerEmail: string,
  clientIp = '127.0.0.1'
): Promise<Project | null> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) return null;

  const timestamp = new Date().toISOString();
  const signatureHash = generateScopeSignature(
    project.id,
    signerEmail,
    project.prd.version,
    timestamp
  );

  project.prd.signedOffAt = timestamp;
  project.prd.signedOffBy = signerName;
  project.prd.signedOffIp = clientIp;
  project.prd.signatureHash = signatureHash;

  // Mark the PRD deliverable as approved if in milestone 1
  const m1 = project.milestones[0];
  if (m1) {
    const prdDeliverable = m1.deliverables.find(
      (d) => d.id === 'del_02' || d.title.toLowerCase().includes('prd')
    );
    if (prdDeliverable) {
      prdDeliverable.status = 'approved';
    }
  }

  project.updatedAt = timestamp;

  // Record audit log
  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: project.id,
    actor: 'client',
    actorName: signerName,
    action: 'SCOPE_BASELINE_SIGNED_OFF',
    details: `Client approved Scope v${project.prd.version} baseline. Cryptographic signature locked: ${signatureHash.slice(0, 16)}...`,
    timestamp,
  });

  writeDatabase(db);
  return project;
}

// ------------------------------------------
// Direct In-Platform Agency Comms & Chat
// ------------------------------------------

export async function getProjectChatMessages(projectId: string): Promise<ChatMessage[]> {
  const db = readDatabase();
  return (db.chatMessages || [])
    .filter((m) => m.projectId === projectId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

export async function sendChatMessage(data: {
  projectId: string;
  sender: 'client' | 'agency';
  senderName: string;
  senderRole: string;
  message: string;
  attachments?: { name: string; url: string; size?: string }[];
}): Promise<ChatMessage> {
  const db = readDatabase();
  if (!db.chatMessages) db.chatMessages = [];

  const newMessage: ChatMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: data.projectId,
    sender: data.sender,
    senderName: data.senderName,
    senderRole: data.senderRole,
    message: data.message,
    timestamp: new Date().toISOString(),
    read: false,
    attachments: data.attachments || [],
  };

  db.chatMessages.push(newMessage);

  // Record audit log for chat dispatch
  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: data.projectId,
    actor: data.sender,
    actorName: data.senderName,
    action: 'CHAT_MESSAGE_DISPATCHED',
    details: `${data.sender === 'client' ? 'Client' : 'Agency team'} sent message: "${data.message.slice(0, 60)}${data.message.length > 60 ? '...' : ''}"`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return newMessage;
}

export async function markChatMessagesRead(
  projectId: string,
  readerRole: 'client' | 'agency'
): Promise<void> {
  const db = readDatabase();
  if (!db.chatMessages) return;

  let updated = false;
  for (const m of db.chatMessages) {
    if (m.projectId === projectId && m.sender !== readerRole && !m.read) {
      m.read = true;
      updated = true;
    }
  }

  if (updated) {
    writeDatabase(db);
  }
}

// ------------------------------------------
// Annual Maintenance & SLA Retainer
// ------------------------------------------

export async function subscribeToMaintenanceRetainer(
  projectId: string,
  tier: MaintenanceTier,
  paymentRef: string,
  annualCostUsd?: number,
  annualCostNgn?: number
): Promise<Project | null> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) return null;

  const costUsd = annualCostUsd || (tier === 'mission_critical' ? 5000 : tier === 'enterprise' ? 12000 : 2400);
  const costNgn = annualCostNgn || (tier === 'mission_critical' ? 7500000 : tier === 'enterprise' ? 18000000 : 3600000);
  const tierName =
    tier === 'mission_critical'
      ? 'WebMuse Mission Critical 24/7 SLA'
      : tier === 'enterprise'
        ? 'Autonomous Enterprise Retainer'
        : 'WebMuse Sentinel Care (Standard SLA)';

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  project.maintenanceRetainer = {
    tier,
    tierName,
    billingPeriod: 'yearly',
    annualCostUsd: costUsd,
    annualCostNgn: costNgn,
    status: 'active',
    expiresAt: oneYearFromNow.toISOString(),
    slaResponseTime:
      tier === 'mission_critical' ? '< 2 Hours Emergency SLA Guarantee' : tier === 'enterprise' ? '< 30 Minutes Dedicated Hotline' : '< 24 Hours Standard SLA',
    uptimeGuarantee: tier === 'enterprise' ? '99.995%' : tier === 'mission_critical' ? '99.99%' : '99.9%',
    lastPaymentRef: paymentRef,
    contractRef: `WM-SLA-${project.slug.toUpperCase()}-${new Date().getFullYear()}`,
    includedFeatures: [
      '24/7/365 Real-Time Uptime & Server Sentinel',
      'Weekly automated dependency upgrades & security patch vetting',
      'Daily zero-downtime database backups & bi-weekly recovery drills',
      'Direct priority channel to WebMuse Senior Cloud Engineers',
      `${tier === 'enterprise' ? '30' : tier === 'mission_critical' ? '15' : '5'} hours / month included engineering tweaks & hotfixes`,
      'Cloudflare Edge WAF firewall tuning & anti-DDoS mitigation',
      'Quarterly Lighthouse 100/100 Core Web Vitals re-tuning',
      'Domain registration & SSL certificate auto-management',
    ],
  };

  project.updatedAt = new Date().toISOString();

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: project.id,
    actor: 'client',
    actorName: 'Client System',
    action: 'MAINTENANCE_RETAINER_SUBSCRIBED',
    details: `Subscribed to ${tierName} ($${costUsd.toLocaleString()}/yr). Ref: ${paymentRef}`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return project;
}

// ------------------------------------------
// Emergency Incident Reporting
// ------------------------------------------

export async function reportEmergencyIncident(data: {
  projectId: string;
  reportedBy: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}): Promise<IncidentReport> {
  const db = readDatabase();
  if (!db.incidentReports) db.incidentReports = [];

  const incident: IncidentReport = {
    id: `inc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: data.projectId,
    reportedBy: data.reportedBy,
    title: data.title,
    description: data.description,
    severity: data.severity,
    status: 'investigating',
    createdAt: new Date().toISOString(),
  };

  db.incidentReports.unshift(incident);

  // Also notify in chat
  db.chatMessages.push({
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: data.projectId,
    sender: 'client',
    senderName: data.reportedBy,
    senderRole: 'Critical Incident Dispatcher',
    message: `🚨 [EMERGENCY INCIDENT DEPLOYED - ${data.severity.toUpperCase()}]: ${data.title}\n\nDetails: ${data.description}`,
    timestamp: new Date().toISOString(),
    read: false,
  });

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: data.projectId,
    actor: 'client',
    actorName: data.reportedBy,
    action: 'EMERGENCY_INCIDENT_REPORTED',
    details: `Incident reported: "${data.title}" [Severity: ${data.severity}]. On-call leads paged.`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return incident;
}

export async function getProjectIncidentReports(projectId: string): Promise<IncidentReport[]> {
  const db = readDatabase();
  return (db.incidentReports || []).filter((i) => i.projectId === projectId);
}

export async function updateIncidentStatus(
  incidentId: string,
  status: 'investigating' | 'mitigating' | 'resolved'
): Promise<IncidentReport | null> {
  const db = readDatabase();
  if (!db.incidentReports) return null;

  const incident = db.incidentReports.find((i) => i.id === incidentId);
  if (!incident) return null;

  incident.status = status;
  if (status === 'resolved') {
    incident.resolvedAt = new Date().toISOString();
  }

  writeDatabase(db);
  return incident;
}

export async function updateProjectDomains(
  projectId: string,
  domains: DomainRecord[]
): Promise<Project | null> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) return null;

  project.domains = domains;
  project.updatedAt = new Date().toISOString();
  writeDatabase(db);
  return project;
}

export async function updateProjectSubscriptions(
  projectId: string,
  subscriptions: SubscriptionService[]
): Promise<Project | null> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) return null;

  project.subscriptions = subscriptions;
  project.updatedAt = new Date().toISOString();
  writeDatabase(db);
  return project;
}

// ==========================================
// PHASE 6: HANDOFF SAFE, ADDONS & MUSE PILOT
// ==========================================

export async function getAddonCatalog(): Promise<AddonServiceItem[]> {
  const db = readDatabase();
  return db.addonServices && db.addonServices.length > 0 ? db.addonServices : DEFAULT_ADDON_CATALOG;
}

export async function purchaseAddon(
  projectId: string,
  addonId: string,
  paymentMethod: 'nowpayments' | 'paystack' | 'moniepoint' | 'manual',
  txRef: string,
  payerEmail?: string
): Promise<{ project: Project; milestone: Milestone; payment: PaymentRecord }> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error(`Project ${projectId} not found`);
  }

  const catalog = db.addonServices && db.addonServices.length > 0 ? db.addonServices : DEFAULT_ADDON_CATALOG;
  const addon = catalog.find((a) => a.id === addonId);
  if (!addon) {
    throw new Error(`Add-on item "${addonId}" not found in catalog`);
  }

  const newPhaseNumber = (project.milestones?.length || 0) + 1;
  const milestoneId = `ms_addon_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const nowIso = new Date().toISOString();

  const newMilestone: Milestone = {
    id: milestoneId,
    projectId,
    orderIndex: project.milestones.length,
    phaseNumber: newPhaseNumber,
    title: `[Add-on] ${addon.title}`,
    subtitle: addon.tagline,
    description: addon.description,
    costUsd: addon.costUsd,
    costNgn: addon.costNgn,
    status: 'in_progress',
    targetCompletionDays: addon.estimatedTurnaroundDays,
    paidAt: nowIso,
    unlockedAt: nowIso,
    paymentTxRef: txRef,
    paymentGateway: paymentMethod,
    deliverables: addon.deliverables.map((item, idx) => ({
      id: `del_addon_${Date.now()}_${idx}`,
      title: item,
      status: 'in_progress' as DeliverableStatus,
      updatedAt: nowIso,
    })),
  };

  project.milestones.push(newMilestone);
  project.updatedAt = nowIso;

  const isFiat = paymentMethod === 'paystack' || paymentMethod === 'moniepoint';
  const payment: PaymentRecord = {
    id: `pay_addon_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId,
    milestoneId: newMilestone.id,
    phaseNumber: newPhaseNumber,
    gateway: paymentMethod,
    amount: isFiat ? addon.costNgn : addon.costUsd,
    currency: isFiat ? 'NGN' : 'USD',
    status: 'confirmed',
    txHashOrRef: txRef,
    payerEmail: payerEmail || 'client@apexlabs.io',
    createdAt: nowIso,
    confirmedAt: nowIso,
    metadata: { addonId: addon.id, addonTitle: addon.title },
  };

  db.payments.push(payment);

  db.chatMessages.push({
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId,
    sender: 'agency',
    senderName: 'WebMuse Financial Sentinel',
    senderRole: 'Autonomous Escrow Daemon',
    message: `⚡ [ADD-ON PURCHASE CONFIRMED]: The client successfully acquired "${addon.title}" (${payment.currency} ${payment.amount.toLocaleString()}).\n\nA new micro-sprint Phase ${newPhaseNumber} has been automatically spun up in the pipeline with ${addon.deliverables.length} tracked deliverables!`,
    timestamp: nowIso,
    read: false,
  });

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId,
    actor: 'client',
    actorName: payerEmail || 'Client',
    action: 'ADDON_SERVICE_PURCHASED',
    details: `Purchased Add-on "${addon.title}" via ${paymentMethod.toUpperCase()} (Ref: ${txRef}). Phase ${newPhaseNumber} micro-milestone initialized.`,
    timestamp: nowIso,
  });

  writeDatabase(db);
  return { project, milestone: newMilestone, payment };
}

export async function getHandoffPackage(projectId: string): Promise<HandoffSafePackage> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error(`Project ${projectId} not found`);
  }

  // All initial core milestones must be completed to unlock the digital safe
  // (or project status marked as completed)
  const isUnlocked =
    project.status === 'completed' ||
    (project.milestones.length > 0 &&
      project.milestones.every(
        (m) => m.status === 'completed' || m.title.startsWith('[Add-on]')
      ));

  const now = Date.now();
  const completedMilestone = project.milestones.find((m) => m.completedAt);
  const baselineEpoch = completedMilestone?.completedAt
    ? new Date(completedMilestone.completedAt).getTime()
    : new Date(project.createdAt).getTime();

  const warrantyEndEpoch = baselineEpoch + 30 * 24 * 60 * 60 * 1000;
  const msRemaining = Math.max(0, warrantyEndEpoch - now);
  const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

  let warrantyStatus: 'active' | 'expiring_soon' | 'expired' = 'active';
  if (daysRemaining <= 0) {
    warrantyStatus = 'expired';
  } else if (daysRemaining <= 5) {
    warrantyStatus = 'expiring_soon';
  }

  const envManifest: EnvVariableSpec[] = [
    {
      key: 'DATABASE_URL',
      category: 'Database',
      description: 'Production Supabase PostgreSQL connection string with pooled transaction mode',
      sampleValue: 'postgresql://postgres.apex:[VAULT_SECRET]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
      isSecret: true,
    },
    {
      key: 'NEXT_PUBLIC_SUPABASE_URL',
      category: 'Database',
      description: 'Supabase project API gateway endpoint URL',
      sampleValue: 'https://apex-protocol-prod.supabase.co',
      isSecret: false,
    },
    {
      key: 'SUPABASE_SERVICE_ROLE_KEY',
      category: 'Database',
      description: 'Elevated bypass key for administrative backend operations and webhooks',
      sampleValue: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      isSecret: true,
    },
    {
      key: 'NEXT_PUBLIC_APP_URL',
      category: 'Application',
      description: 'Public apex production URL for canonical redirects and CORS whitelisting',
      sampleValue: 'https://apexlabs.io',
      isSecret: false,
    },
    {
      key: 'NOWPAYMENTS_API_KEY',
      category: 'Payments',
      description: 'Production API key for NOWPayments multi-chain crypto settlement engine',
      sampleValue: 'wm_test_np_mock_sample_820491829034',
      isSecret: true,
    },
    {
      key: 'PAYSTACK_SECRET_KEY',
      category: 'Payments',
      description: 'Live secret key for Nigerian Naira fiat billing and Titan virtual accounts',
      sampleValue: 'sk_test_paystack_mock_sample_key_948f',
      isSecret: true,
    },
    {
      key: 'VAULT_MASTER_KEY',
      category: 'Security',
      description: '256-bit AES master cryptographic key for hardware-grade credential decryption',
      sampleValue: 'wm_aes256_e7d23a9b910248c891402830f6a91...',
      isSecret: true,
    },
    {
      key: 'FASTAPI_INTERNAL_URL',
      category: 'Sidecar',
      description: 'Sub-millisecond Rust/Python algorithmic calculation engine sidecar URL',
      sampleValue: 'https://engine.internal.apexlabs.io:8080',
      isSecret: false,
    },
  ];

  const loomWalkthroughs: LoomWalkthrough[] = [
    {
      id: 'loom_01',
      title: 'Full System Architecture & Event-Mesh Tour',
      duration: '18:42',
      url: 'https://www.loom.com/share/sample-arch-tour-apex',
      speaker: 'Martins (WebMuse Lead Architect)',
      category: 'architecture',
    },
    {
      id: 'loom_02',
      title: 'Production Deployment & Vercel/Supabase Setup',
      duration: '12:15',
      url: 'https://www.loom.com/share/sample-deploy-guide-apex',
      speaker: 'WebMuse DevOps Lead',
      category: 'deployment',
    },
    {
      id: 'loom_03',
      title: 'Admin Operations & Incident Triage Walkthrough',
      duration: '09:30',
      url: 'https://www.loom.com/share/sample-cms-guide-apex',
      speaker: 'Agency Operations',
      category: 'cms_guide',
    },
  ];

  const brandAssets: BrandAssetItem[] = [
    {
      name: 'Apex Protocol Vector Brand Suite (SVG, EPS, PNG, Favicons)',
      format: 'ZIP',
      size: '48.2 MB',
      downloadUrl: `/api/portal/handoff/download?projectId=${project.id}&asset=brand_pack`,
    },
    {
      name: 'Figma Master Design System & Token Variables (.fig)',
      format: 'FIG',
      size: '112.5 MB',
      downloadUrl: `/api/portal/handoff/download?projectId=${project.id}&asset=figma_master`,
    },
    {
      name: 'Production Deployment Playbook & SLA Architecture (.pdf)',
      format: 'PDF',
      size: '4.8 MB',
      downloadUrl: `/api/portal/handoff/download?projectId=${project.id}&asset=playbook`,
    },
  ];

  return {
    isUnlocked,
    unlockedAt: isUnlocked ? (completedMilestone?.completedAt || project.updatedAt) : undefined,
    repoTransferUrl: `https://github.com/webmuse-studios/${project.slug}-core/invitations`,
    repoTransferInstructions: [
      '1. Sign in to GitHub with your authorized company organization or admin account.',
      '2. Accept the repository transfer invitation dispatched from WebMuse Studios.',
      '3. Verify automated CI/CD GitHub Actions workflows and configure GitHub Secrets with production credentials.',
      `4. Update local git remotes on your developer workstations using: git remote set-url origin git@github.com:apexlabs-org/${project.slug}.git`,
      '5. Revoke WebMuse administrative access once your internal engineering leads take custody.',
    ],
    envManifest,
    loomWalkthroughs,
    brandAssets,
    warrantyDaysRemaining: daysRemaining,
    warrantyStatus,
    warrantyEndDate: new Date(warrantyEndEpoch).toISOString(),
  };
}

export async function generateEnvProductionText(projectId: string): Promise<string> {
  const pkg = await getHandoffPackage(projectId);
  const lines = [
    '# =============================================================================',
    `# WEBMUSE OS // PRODUCTION ENVIRONMENT MANIFEST (.env.production)`,
    `# Generated for Project: ${projectId}`,
    `# Date: ${new Date().toISOString()}`,
    '# =============================================================================',
    '',
  ];

  const categories = Array.from(new Set(pkg.envManifest.map((v) => v.category)));
  for (const cat of categories) {
    lines.push(`# --- ${cat.toUpperCase()} ---`);
    const vars = pkg.envManifest.filter((v) => v.category === cat);
    for (const v of vars) {
      lines.push(`# ${v.description}`);
      lines.push(`${v.key}=${v.sampleValue}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export async function submitWarrantyTicket(data: {
  projectId: string;
  authorEmail: string;
  authorName: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}): Promise<WarrantyTicket> {
  const db = readDatabase();
  const ticket: WarrantyTicket = {
    id: `ticket_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: data.projectId,
    authorEmail: data.authorEmail,
    authorName: data.authorName,
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: 'submitted',
    createdAt: new Date().toISOString(),
  };

  if (!db.warrantyTickets) db.warrantyTickets = [];
  db.warrantyTickets.unshift(ticket);

  db.chatMessages.push({
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    projectId: data.projectId,
    sender: 'client',
    senderName: data.authorName,
    senderRole: 'Warranty SLA Dispatcher',
    message: `🛡️ [WARRANTY PRIORITY TICKET - ${data.priority.toUpperCase()}]: ${data.title}\n\n${data.description}`,
    timestamp: new Date().toISOString(),
    read: false,
  });

  db.activityLogs.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    projectId: data.projectId,
    actor: 'client',
    actorName: data.authorName,
    action: 'WARRANTY_TICKET_SUBMITTED',
    details: `SLA Warranty Ticket "${data.title}" filed [Priority: ${data.priority}]. Assigned to engineering triage.`,
    timestamp: new Date().toISOString(),
  });

  writeDatabase(db);
  return ticket;
}

export async function getProjectWarrantyTickets(projectId: string): Promise<WarrantyTicket[]> {
  const db = readDatabase();
  return (db.warrantyTickets || []).filter((t) => t.projectId === projectId);
}

export async function updateWarrantyTicketStatus(
  ticketId: string,
  status: 'submitted' | 'triaged' | 'in_progress' | 'resolved'
): Promise<WarrantyTicket | null> {
  const db = readDatabase();
  if (!db.warrantyTickets) return null;
  const ticket = db.warrantyTickets.find((t) => t.id === ticketId);
  if (!ticket) return null;

  ticket.status = status;
  if (status === 'resolved') {
    ticket.resolvedAt = new Date().toISOString();
  }

  writeDatabase(db);
  return ticket;
}

export async function queryMusePilot(
  projectId: string,
  question: string
): Promise<{ answer: string; citations: string[]; timestamp: string }> {
  const db = readDatabase();
  const project = db.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error(`Project ${projectId} not found`);
  }

  const q = question.toLowerCase();
  const citations: string[] = [];
  let answer = '';

  if (q.includes('tech') || q.includes('stack') || q.includes('framework') || q.includes('database')) {
    citations.push('Genesis PRD: Technical Architecture', 'System Infrastructure Manifest');
    answer = `**${project.title}** is architected on a high-throughput, modern foundation:\n\n` +
      `• **Frontend & Edge**: Next.js 16 (App Router), React 19, Tailwind CSS v4, and TypeScript with edge SSR.\n` +
      `• **Data Tier**: Supabase PostgreSQL with pooled connection routing and row-level security (RLS).\n` +
      `• **Execution Sidecars**: Sub-millisecond Python & Rust microservices communicating via secure WebSockets.\n` +
      `• **Deployment**: Vercel Enterprise Edge Network with multi-region failover and Cloudflare DNS security.`;
  } else if (q.includes('scope') || q.includes('prd') || q.includes('feature') || q.includes('spec')) {
    citations.push(`Genesis PRD v${project.prd.version}`, 'Cryptographic Scope Creep Shield');
    const categories = project.prd.featureMatrix.map((f) => `**${f.category}** (${f.features.length} core features)`).join(', ');
    const signoffStatus = project.prd.signedOffAt
      ? `Digital Scope Signed-Off by ${project.prd.signedOffBy} on ${new Date(project.prd.signedOffAt).toLocaleDateString()} (Signature Hash: \`${project.prd.signatureHash?.slice(0, 16)}...\`)`
      : `Scope baseline v${project.prd.version} is currently awaiting executive sign-off in the Genesis Canvas tab.`;
    answer = `**Core Scope Overview for ${project.title}:**\n\n` +
      `• **Vision**: ${project.prd.summary}\n` +
      `• **Feature Matrix**: Covers ${categories}.\n` +
      `• **Target Audience**: ${project.prd.targetAudience}\n` +
      `• **Scope Governance**: ${signoffStatus}\n\nAny requirement requested outside this signed matrix is tagged as an Out-of-Scope Change Order or available via the Add-on Marketplace.`;
  } else if (q.includes('milestone') || q.includes('phase') || q.includes('status') || q.includes('next')) {
    citations.push('Milestone Pipeline Stepper', 'Gatekeeper Escrow Engine');
    const activeMilestone = project.milestones.find((m) => m.status === 'in_progress' || m.status === 'awaiting_payment') || project.milestones[0];
    answer = `**Current Milestone Status:**\n\n` +
      `• **Active Phase**: Phase 0${activeMilestone.phaseNumber} — *${activeMilestone.title}* (${activeMilestone.status.replace('_', ' ').toUpperCase()}).\n` +
      `• **Deliverables**: ${activeMilestone.deliverables.map((d) => `\`${d.title}\` [${d.status}]`).join(', ')}.\n` +
      `• **Gatekeeper Guardrail**: Successive phases remain locked until milestone review approval and escrow settlement verification.`;
  } else if (q.includes('payment') || q.includes('pay') || q.includes('crypto') || q.includes('naira') || q.includes('invoice')) {
    citations.push('Multi-Rail Payment Engine', 'Document #12: Invoice.pdf');
    answer = `**Multi-Rail Payment Rails:**\n\n` +
      `WebMuse supports instant cryptographic and fiat settlement:\n` +
      `1. **Crypto (USDT / Multi-Chain)**: TRC20, ERC20, Polygon, BSC, BTC, ETH via NOWPayments API with live on-chain deposit confirmation.\n` +
      `2. **Fiat (NGN)**: Instant debit card checkout and dedicated dynamic virtual accounts (Wema / Paystack Titan) via Paystack.\n` +
      `3. **Invoice Status**: Document #12 (\`12_Invoice.pdf\`) generates dynamic settlement receipts with cryptographic signature hashes.`;
  } else if (q.includes('warranty') || q.includes('sla') || q.includes('bug') || q.includes('support')) {
    citations.push('30-Day SLA Warranty Agreement', 'Maintenance Retainer Specifications');
    const pkg = await getHandoffPackage(projectId);
    answer = `**Post-Launch SLA & Warranty Coverage:**\n\n` +
      `• **Status**: ${pkg.warrantyStatus.toUpperCase()} (${pkg.warrantyDaysRemaining} days remaining).\n` +
      `• **Coverage**: Covers zero-cost priority bug triage, security hotfixes, and unexpected regressions.\n` +
      `• **Submissions**: You can dispatch urgent bug reports directly through the "Digital Safe & Warranty" tab.\n` +
      `• **Ongoing Retainer**: After the 30-day window, our Mission-Critical Retainer provides continuous 99.9% uptime monitoring and sub-hour SLA response.`;
  } else if (q.includes('safe') || q.includes('handoff') || q.includes('repo') || q.includes('env')) {
    citations.push('Handoff Digital Safe', 'Production Deployment Playbook');
    const pkg = await getHandoffPackage(projectId);
    const unlockMsg = pkg.isUnlocked
      ? 'The Digital Safe is UNLOCKED! You have access to the GitHub repo transfer link, production `.env` generator, brand archive, and Loom video playlist.'
      : 'The Digital Safe unlocks automatically once all milestone phases reach COMPLETED status and final sign-off is recorded.';
    answer = `**Handoff Digital Safe Package:**\n\n${unlockMsg}\n\nAll secrets are safeguarded with AES-256-GCM hardware-grade encryption.`;
  } else if (q.includes('addon') || q.includes('shop') || q.includes('purchase') || q.includes('extra')) {
    citations.push('Add-on Marketplace Catalog', 'Milestone Expansion Engine');
    answer = `**Change-Order & Add-on Marketplace:**\n\n` +
      `You can upgrade your platform at any time with 1-click micro-sprints:\n` +
      `• **Additional Revision Sprint**: +$350 / ₦500,000 (48h UI polish)\n` +
      `• **AI Assistant Integration Sprint**: +$1,200 / ₦1,800,000 (vector RAG bot)\n` +
      `• **Speed & Core Web Vitals Optimization**: +$450 / ₦650,000 (99+ Lighthouse)\n` +
      `• **SEO & Structured Data Package**: +$600 / ₦900,000 (Rich snippets & schema)\n` +
      `• **Enterprise Penetration Test**: +$850 / ₦1,250,000 (OWASP audit)\n` +
      `• **Custom Mobile PWA Shell**: +$750 / ₦1,100,000 (Installable app)\n\nPurchasing immediately injects a tracked micro-milestone into your project timeline!`;
  } else {
    citations.push('Genesis PRD Architecture', 'WebMuse Lead Architect Knowledge Base');
    answer = `Welcome to **Muse Pilot AI** for **${project.title}**!\n\n` +
      `I am your dedicated project intelligence agent, trained directly on your Genesis PRD, tech stack specifications, active sprint milestones, and encrypted vault architecture.\n\n` +
      `Feel free to ask me about:\n` +
      `• Milestone deadlines and current deliverable progress\n` +
      `• Genesis PRD specifications, target personas, and scope approval\n` +
      `• Multi-rail payment procedures and invoice status\n` +
      `• Handoff Digital Safe assets, Loom walkthroughs, and repository transfers\n` +
      `• 30-Day SLA warranty tickets and add-on sprint upgrades`;
  }

  return {
    answer,
    citations,
    timestamp: new Date().toISOString(),
  };
}



