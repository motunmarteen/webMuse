import fs from 'node:fs';
import path from 'node:path';
import type {
  Client,
  Project,
  MagicToken,
  VaultSecret,
  PaymentRecord,
  ReviewPin,
  ActivityLog,
} from '@/lib/types/portal';
import { hashToken, encryptSecret, generateMagicToken, generateScopeSignature } from '@/lib/server/crypto';

interface DatabaseSchema {
  clients: Client[];
  projects: Project[];
  magicTokens: MagicToken[];
  vaultSecrets: VaultSecret[];
  payments: PaymentRecord[];
  reviewPins: ReviewPin[];
  activityLogs: ActivityLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'webmuse-db.json');

// Ensure directory and initialize store
function getInitialData(): DatabaseSchema {
  const sampleStagingPass = encryptSecret('Staging2026!ApexSecure#');
  const sampleDbUrl = encryptSecret('postgresql://postgres.apex:ApexSecure991@aws-0-eu-central-1.pooler.supabase.com:6543/postgres');
  const sampleApiKey = encryptSecret('wm_live_sk_948f92110ea381029ba881');

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
  };
}

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
    return JSON.parse(raw);
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
  return db.vaultSecrets.filter((s) => s.projectId === projectId && (!isClientView || s.isClientVisible));
}

export async function upsertVaultSecret(secret: VaultSecret): Promise<VaultSecret> {
  const db = readDatabase();
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


