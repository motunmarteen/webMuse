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
  domains?: DomainRecord[];
  tools?: ToolItem[];
  subscriptions?: SubscriptionService[];
  maintenanceRetainer?: MaintenanceRetainer;
  healthSentinel?: HealthSentinel;
  backups?: BackupRecord[];
  chatMessages?: ChatMessage[];
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
  usernameOrEmail?: string;
  loginUrl?: string;
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

export interface ChatMessage {
  id: string;
  projectId: string;
  sender: 'client' | 'agency';
  senderName: string;
  senderRole: string; // e.g. "WebMuse Lead Architect", "Apex Labs Project Owner"
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: { name: string; url: string; size?: string }[];
}

export interface DomainRecord {
  id: string;
  domain: string;
  registrar: string;
  registeredAt: string;
  expiresAt: string; // ISO date
  autoRenew: boolean;
  annualRenewalCostUsd: number;
  sslStatus: 'active' | 'expiring_soon' | 'expired';
  sslIssuer: string;
  sslExpiresAt: string;
  nameservers: string[];
  status: 'healthy' | 'warning' | 'critical';
}

export type ToolCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'hosting'
  | 'security'
  | 'ai'
  | 'analytics'
  | 'messaging'
  | 'design';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  purpose: string;
  tier: string;
  version?: string;
  status: 'operational' | 'upgraded' | 'monitoring';
  docsUrl?: string;
  iconName?: string;
}

export interface SubscriptionService {
  id: string;
  name: string;
  provider: string;
  category: 'database' | 'hosting' | 'ai_compute' | 'domain' | 'email_sms' | 'monitoring';
  billingCycle: 'monthly' | 'yearly';
  costUsd: number;
  costNgn: number;
  renewDate: string; // ISO date
  status: 'active' | 'renewing_soon' | 'expired';
  managedBy: 'agency' | 'client';
  paymentCardLast4?: string;
  actionRequired?: string;
  loginUrl?: string;
}

export type MaintenanceTier = 'standard' | 'mission_critical' | 'enterprise';

export interface MaintenanceRetainer {
  tier: MaintenanceTier;
  tierName: string;
  billingPeriod: 'yearly';
  annualCostUsd: number;
  annualCostNgn: number;
  status: 'active' | 'due_soon' | 'unsubscribed';
  expiresAt?: string;
  slaResponseTime: string;
  includedFeatures: string[];
  uptimeGuarantee: string;
  lastPaymentRef?: string;
  contractRef?: string;
}

export interface HealthSentinel {
  uptimePercentage: number;
  avgLatencyMs: number;
  sslGrade: string; // 'A+'
  edgeNodesActive: number;
  lastChecked: string;
  status: 'optimal' | 'degraded' | 'incident';
}

export interface BackupRecord {
  id: string;
  timestamp: string;
  sizeBytes: string;
  snapshotType: 'automated_daily' | 'pre_deployment' | 'database_wal';
  retentionDays: number;
  status: 'verified' | 'in_progress';
}

export interface IncidentReport {
  id: string;
  projectId: string;
  reportedBy: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'investigating' | 'mitigating' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export interface LoomWalkthrough {
  id: string;
  title: string;
  duration: string;
  url: string;
  speaker: string;
  category: 'architecture' | 'deployment' | 'cms_guide';
}

export interface EnvVariableSpec {
  key: string;
  category: string;
  description: string;
  sampleValue: string;
  isSecret: boolean;
}

export interface BrandAssetItem {
  name: string;
  format: string;
  size: string;
  downloadUrl: string;
}

export interface HandoffSafePackage {
  isUnlocked: boolean;
  unlockedAt?: string;
  repoTransferUrl?: string;
  repoTransferInstructions: string[];
  envManifest: EnvVariableSpec[];
  loomWalkthroughs: LoomWalkthrough[];
  brandAssets: BrandAssetItem[];
  warrantyDaysRemaining: number;
  warrantyStatus: 'active' | 'expiring_soon' | 'expired';
  warrantyEndDate: string;
}

export interface AddonServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'ai' | 'performance' | 'security' | 'i18n' | 'mobile';
  costUsd: number;
  costNgn: number;
  estimatedTurnaroundDays: number;
  deliverables: string[];
  icon: string;
  status?: 'available' | 'purchased' | 'in_progress';
}

export interface WarrantyTicket {
  id: string;
  projectId: string;
  authorEmail: string;
  authorName: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'submitted' | 'triaged' | 'in_progress' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export interface MusePilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: string[];
}
