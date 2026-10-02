import type { Project, Client, AgencyDocument } from '@/lib/types/portal';

/**
 * Generates the standardized 12-Document Institutional Agency Suite
 * customized dynamically to the client and project engagement.
 */
export function generateDefaultDocuments(
  project: Project,
  client?: Client | null
): AgencyDocument[] {
  const clientName = client?.name || 'Project Partner';
  const clientCompany = client?.company || 'Enterprise Partner';
  const currentPhase = project.currentPhaseIndex + 1;
  const isPrdSigned = !!project.prd?.signedOffAt;

  return [
    {
      id: 'doc_01',
      orderIndex: 1,
      filename: '01_Project_Proposal.pdf',
      title: 'Project Proposal & Engagement Strategy',
      category: 'strategy',
      description:
        'Executive business problem synthesis, solution architecture, commercial engagement structure, and high-level milestones.',
      status: 'executed',
      unlockedAtPhase: 1,
      signedAt: project.createdAt,
      signedBy: 'WebMuse Lead Partner & ' + clientName,
      signatureHash: 'wm_prop_' + project.id.slice(-8),
      sections: [
        {
          heading: 'Executive Vision',
          body: `WebMuse Studios has structured this bespoke engagement for ${clientCompany} to architect, engineer, and deploy "${project.title}".`,
        },
        {
          heading: 'Value Proposition & Strategic Impact',
          body: project.description,
        },
        {
          heading: 'Commercial Framework',
          body: `Dual-currency engagement budgeted at $${project.totalBudgetUsd.toLocaleString()} USD (₦${project.totalBudgetNgn.toLocaleString()} NGN) structured across ${project.milestones.length} gated phases.`,
        },
      ],
    },
    {
      id: 'doc_02',
      orderIndex: 2,
      filename: '02_Product_Requirements_Document.pdf',
      title: 'Product Requirements Document (Living PRD)',
      category: 'technical',
      description:
        'Comprehensive product specifications, core feature matrices, user journeys, and scope baseline sign-off.',
      status: isPrdSigned ? 'executed' : 'awaiting_signature',
      unlockedAtPhase: 1,
      signedAt: project.prd.signedOffAt,
      signedBy: project.prd.signedOffBy,
      signatureHash: project.prd.signatureHash,
      sections: [
        {
          heading: 'Problem Statement & Opportunity',
          body: project.prd.problemStatement,
        },
        {
          heading: 'Target Personas & Stakeholders',
          body: project.prd.targetAudience,
        },
        {
          heading: 'Scope Creep Shield Protocol',
          body: 'This PRD represents the contractual baseline. Any functional additions requested after sign-off will be scheduled as out-of-scope change-orders.',
        },
      ],
    },
    {
      id: 'doc_03',
      orderIndex: 3,
      filename: '03_Technical_Requirements_Document.pdf',
      title: 'Technical Requirements Document (TRD)',
      category: 'technical',
      description:
        'Deep-dive engineering topology, database ERD schema models, API meshes, caching strategies, and security protocols.',
      status: 'executed',
      unlockedAtPhase: 1,
      signedAt: project.createdAt,
      signedBy: 'WebMuse Lead Systems Architect',
      sections: [
        {
          heading: 'System Architecture Consensus',
          body: project.prd.coreArchitecture,
        },
        {
          heading: 'Tech Universe Matrix',
          body: `Provisioned with ${project.techStack.join(', ')}. Engineered for sub-80ms edge performance and high-concurrency real-time data streaming.`,
        },
        {
          heading: 'Database & State Topology',
          body: 'Relational data models with Row-Level Security (RLS), ACID compliance, and zero-knowledge AES-256 vault credential encryption.',
        },
      ],
    },
    {
      id: 'doc_04',
      orderIndex: 4,
      filename: '04_Statement_of_Work.pdf',
      title: 'Statement of Work (SOW)',
      category: 'legal',
      description:
        'Granular milestone deliverables breakdown, acceptance criteria, revision sprint limits, and explicit out-of-scope exclusions.',
      status: 'executed',
      unlockedAtPhase: 1,
      signedAt: project.createdAt,
      signedBy: clientName,
      sections: [
        {
          heading: 'Deliverables Schedule',
          body: `Covers ${project.milestones.reduce((acc, m) => acc + m.deliverables.length, 0)} granular deliverable milestones across all 5 delivery phases.`,
        },
        {
          heading: 'Sprint Review Protocol',
          body: 'Client has 5 business days upon milestone delivery to submit pinpoint visual annotations before phase completion sign-off.',
        },
      ],
    },
    {
      id: 'doc_05',
      orderIndex: 5,
      filename: '05_Master_Service_Agreement.pdf',
      title: 'Master Service Agreement (MSA)',
      category: 'legal',
      description:
        'Standard agency contract defining mutual confidentiality (NDA), intellectual property transfer upon final settlement, and liability limits.',
      status: 'executed',
      unlockedAtPhase: 1,
      signedAt: project.createdAt,
      signedBy: `${clientName} (${clientCompany}) & WebMuse Principal`,
      signatureHash: 'wm_msa_signed_' + project.id.slice(-6),
      sections: [
        {
          heading: 'Intellectual Property Assignment',
          body: 'Upon full financial settlement of all milestone invoices, 100% of custom frontend, backend source code, and design assets transfer exclusively to the Client.',
        },
        {
          heading: 'Confidentiality & Non-Disclosure',
          body: 'Both parties agree to protect proprietary technical data, credential keys, and commercial trade secrets with strict non-disclosure obligations.',
        },
      ],
    },
    {
      id: 'doc_06',
      orderIndex: 6,
      filename: '06_Project_Timeline.pdf',
      title: 'Project Timeline & Sprint Schedule',
      category: 'strategy',
      description:
        'Gantt schedule outlining sprint phases, critical path dependencies, review milestones, and projected production cutover.',
      status: 'executed',
      unlockedAtPhase: 1,
      sections: [
        {
          heading: 'Delivery Phases',
          body: project.milestones
            .map(
              (m) =>
                `Phase 0${m.phaseNumber} (${m.title}): Estimated ${m.targetCompletionDays} business days`
            )
            .join(' • '),
        },
        {
          heading: 'Milestone Dependency Gate',
          body: 'Each subsequent phase unlocks automatically once preceding deliverables are approved and invoice settlement is confirmed on-chain or via bank rail.',
        },
      ],
    },
    {
      id: 'doc_07',
      orderIndex: 7,
      filename: '07_UIUX_Guide.pdf',
      title: 'UI/UX Design Guide & Design Tokens',
      category: 'design',
      description:
        'Visual identity manual, dark-mode cyberpunk design tokens, typography specifications (Outfit & JetBrains Mono), and component states.',
      status: currentPhase >= 2 ? 'released' : 'drafting',
      unlockedAtPhase: 2,
      sections: [
        {
          heading: 'Design System & Aesthetics',
          body: 'Cyberpunk dark-mode palette, glassmorphism card elevation, mesh gradient blurs, and Framer Motion micro-interactions.',
        },
        {
          heading: 'Typography & Spacing',
          body: 'Primary Display: Outfit (700/800/900). Code & Telemetry: JetBrains Mono. 8pt spatial grid with responsive viewport breakpoints (375px, 768px, 1440px).',
        },
      ],
    },
    {
      id: 'doc_08',
      orderIndex: 8,
      filename: '08_Testing_Report.pdf',
      title: 'QA Testing, Security & Stress Report',
      category: 'assurance',
      description:
        'Full QA test matrix, cross-browser compatibility pass, penetration audit findings, and Lighthouse 100/100 Core Web Vitals score.',
      status: currentPhase >= 4 ? 'released' : 'drafting',
      unlockedAtPhase: 4,
      sections: [
        {
          heading: 'Quality Benchmark Protocol',
          body: 'Automated end-to-end user flow testing, responsive viewport regression audits, and database query latency stress benchmarking.',
        },
        {
          heading: 'Core Web Vitals & Security Pass',
          body: '100/100 target for Performance, Accessibility, Best Practices, and SEO. Zero critical OWASP vulnerability rating.',
        },
      ],
    },
    {
      id: 'doc_09',
      orderIndex: 9,
      filename: '09_Deployment_Guide.pdf',
      title: 'Production Deployment & DNS Cutover Guide',
      category: 'technical',
      description:
        'Cloudflare edge configuration, DNS routing instructions, SSL certificate issuance, and production zero-downtime cutover protocol.',
      status: currentPhase >= 5 ? 'released' : 'drafting',
      unlockedAtPhase: 5,
      sections: [
        {
          heading: 'Infrastructure Provisioning',
          body: 'Next.js 16 Edge runtime containerized with Vercel/Cloudflare global CDN distribution and Supabase transaction pooler routing.',
        },
        {
          heading: 'Cutover & Health Check Checklist',
          body: 'Step-by-step custom domain DNS switchover, edge SSL verification, environment variable secrets injection, and 24/7 uptime monitoring ping setup.',
        },
      ],
    },
    {
      id: 'doc_10',
      orderIndex: 10,
      filename: '10_Handover_Document.pdf',
      title: 'Handover Document & Digital Safe Index',
      category: 'handoff',
      description:
        'Production GitHub organization transfer link, master .env credential export manifest, and video walkthrough archive playlist.',
      status: currentPhase >= 5 && project.status === 'completed' ? 'released' : 'drafting',
      unlockedAtPhase: 5,
      sections: [
        {
          heading: 'Ownership Transfer Protocol',
          body: 'Release of GitHub repository admin access, Supabase database ownership transfer, and Black Box Vault master key dispatch.',
        },
        {
          heading: 'Video Walkthrough Archives',
          body: 'Curated Loom playlist walking through backend APIs, content updates, and deployment pipelines.',
        },
      ],
    },
    {
      id: 'doc_11',
      orderIndex: 11,
      filename: '11_Maintenance_Agreement.pdf',
      title: 'Post-Launch Maintenance Agreement & SLA',
      category: 'handoff',
      description:
        'Terms for the complimentary 30-day post-launch warranty, priority bug response SLA, and optional monthly retainer extension options.',
      status: currentPhase >= 5 ? 'released' : 'drafting',
      unlockedAtPhase: 5,
      sections: [
        {
          heading: '30-Day Post-Launch SLA Warranty',
          body: 'Covers immediate resolution of any critical bugs or unexpected regressions at zero cost for 30 calendar days post-deployment cutover.',
        },
        {
          heading: 'Monthly Retainer Extension Options',
          body: 'Tier 1 Security & Core Updates ($450/mo) • Tier 2 Dedicated Sprint Support ($1,200/mo) • Tier 3 Institutional Concierge ($2,500/mo).',
        },
      ],
    },
    {
      id: 'doc_12',
      orderIndex: 12,
      filename: '12_Invoice.pdf',
      title: 'Master Financial Ledger & Milestone Invoices',
      category: 'financial',
      description:
        'Dual-currency itemized billing statements, on-chain crypto USDT transaction hashes, and bank wire settlement receipts.',
      status: 'released',
      unlockedAtPhase: 1,
      sections: [
        {
          heading: 'Dual-Currency Billing Summary',
          body: `Total Contract Value: $${project.totalBudgetUsd.toLocaleString()} USD / ₦${project.totalBudgetNgn.toLocaleString()} NGN.`,
        },
        {
          heading: 'Multi-Rail Payment Gateway Integration',
          body: 'Automated on-chain confirmation via NOWPayments (Crypto USDT on TRC20, ERC20, Polygon, BSC) and Paystack / Moniepoint for NGN bank transfers.',
        },
      ],
    },
  ];
}
