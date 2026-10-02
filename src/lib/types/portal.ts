export type MilestoneStatus =
  | 'locked'
  | 'awaiting_payment'
  | 'in_progress'
  | 'in_review'
  | 'completed';

export type DeliverableStatus =
  | 'backlog'
  | 'in_progress'
  | 'ready_for_review'
  | 'approved';

export interface MilestoneDeliverable {
  id: string;
  title: string;
  description?: string;
  status: DeliverableStatus;
  externalUrl?: string;
  updatedAt?: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  orderIndex: number;
  phaseNumber: number;
  title: string;
  subtitle: string;
  description: string;
  costUsd: number;
  costNgn: number;
  status: MilestoneStatus;
  deliverables: MilestoneDeliverable[];
  targetCompletionDays: number;
  paidAt?: string;
  unlockedAt?: string;
  completedAt?: string;
  paymentTxRef?: string;
  paymentGateway?: 'nowpayments' | 'paystack' | 'moniepoint' | 'manual';
}

export interface PRDSection {
  title: string;
  content: string;
}

export interface PRDFeatureCategory {
  category: string;
  features: string[];
}

export interface PRDDocument {
  version: string;
  title: string;
  summary: string;
  problemStatement: string;
  targetAudience: string;
  coreArchitecture: string;
  featureMatrix: PRDFeatureCategory[];
  techStack: string[];
  kpis: string[];
  signedOffAt?: string;
  signedOffBy?: string;
  signedOffIp?: string;
  signatureHash?: string;
}

export type DocumentStatus =
  | 'drafting'
  | 'awaiting_signature'
  | 'executed'
  | 'released';

export type DocumentCategory =
  | 'strategy'
  | 'technical'
  | 'legal'
  | 'design'
  | 'assurance'
  | 'handoff'
  | 'financial';

export interface DocumentSection {
  heading: string;
  body: string;
}

export interface AgencyDocument {
  id: string;
  orderIndex: number;
  filename: string;
  title: string;
  category: DocumentCategory;
  description: string;
  status: DocumentStatus;
  unlockedAtPhase: number;
  signedAt?: string;
  signedBy?: string;
  signatureHash?: string;
  downloadUrl?: string;
  sections: DocumentSection[];
}

export type ProjectStatus = 'draft' | 'active' | 'in_review' | 'completed';

export interface Project {
  id: string;
  clientId: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  currentPhaseIndex: number;
  techStack: string[];
  stagingUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  designUrl?: string;
  totalBudgetUsd: number;
  totalBudgetNgn: number;
  prd: PRDDocument;
  milestones: Milestone[];
  documents?: AgencyDocument[];
  warrantyDaysRemaining?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  avatarUrl?: string;
  phone?: string;
  telegramHandle?: string;
  discordHandle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MagicToken {
  tokenHash: string;
  rawTokenPreview?: string;
  email: string;
  projectId?: string;
  expiresAt: number; // Unix epoch ms
  used: boolean;
  createdAt: number;
}

export interface SessionPayload {
  role: 'client' | 'admin';
  clientId?: string;
  email: string;
  projectId?: string;
  projectSlug?: string;
  issuedAt: number;
  expiresAt: number;
}

export type VaultCategory =
  | 'infrastructure'
  | 'database'
  | 'apis'
  | 'staging_auth'
  | 'domain_dns'
  | 'repositories';

export interface VaultSecret {
  id: string;
  projectId: string;
  category: VaultCategory;
  toolName: string;
  keyLabel: string;
  encryptedValue: string;
  iv: string;
  authTag: string;
  isClientVisible: boolean;
  notes?: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  projectId: string;
  milestoneId: string;
  phaseNumber: number;
  gateway: 'nowpayments' | 'paystack' | 'moniepoint' | 'manual';
  amount: number;
  currency: 'USD' | 'NGN' | 'USDT';
  status: 'pending' | 'confirmed' | 'failed';
  txHashOrRef: string;
  payerEmail: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  confirmedAt?: string;
}

export interface ReviewPin {
  id: string;
  projectId: string;
  milestoneId: string;
  authorEmail: string;
  authorName: string;
  xPercent: number; // Viewport coordinate %
  yPercent: number;
  viewportWidth: number;
  comment: string;
  severity: 'tweak' | 'bug' | 'copy';
  status: 'open' | 'resolved';
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  projectId: string;
  actor: 'agency' | 'client' | 'system';
  actorName: string;
  action: string;
  details: string;
  timestamp: string;
}
