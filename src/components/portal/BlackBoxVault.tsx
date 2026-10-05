'use client';

import React, { useState, useEffect } from 'react';
import type { Project, VaultCategory } from '@/lib/types/portal';
import {
  Shield,
  Key,
  Eye,
  EyeOff,
  Copy,
  Check,
  Lock,
  Unlock,
  Plus,
  RefreshCw,
  Database,
  Globe,
  Server,
  Code2,
  AlertTriangle,
  FolderGit2,
  Terminal,
  ExternalLink,
  Search,
  User,
  Sparkles,
  Layers,
} from 'lucide-react';

interface VaultSecretItem {
  id: string;
  projectId: string;
  category: VaultCategory;
  toolName: string;
  keyLabel: string;
  usernameOrEmail?: string;
  loginUrl?: string;
  isClientVisible: boolean;
  notes?: string;
  updatedAt: string;
  hasCipher: boolean;
}

interface BlackBoxVaultProps {
  project: Project;
  isAdmin?: boolean;
}

const CATEGORY_MAP: Record<
  VaultCategory | 'all',
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  all: { label: 'All Tools & Services', icon: Shield, color: 'text-foreground' },
  infrastructure: { label: 'Cloud Hosting & Compute', icon: Server, color: 'text-blue-400' },
  database: { label: 'Database & Storage', icon: Database, color: 'text-emerald-400' },
  apis: { label: 'Payments & APIs', icon: Terminal, color: 'text-purple-400' },
  staging_auth: { label: 'Staging & Admin Logins', icon: Key, color: 'text-amber-400' },
  domain_dns: { label: 'Domains & DNS', icon: Globe, color: 'text-cyan-400' },
  repositories: { label: 'Code & GitHub Repos', icon: FolderGit2, color: 'text-pink-400' },
};

export function BlackBoxVault({ project, isAdmin = false }: BlackBoxVaultProps) {
  const [secrets, setSecrets] = useState<VaultSecretItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<VaultCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Revealed plaintexts cache: { [secretId]: string }
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, string>>({});
  const [decryptingId, setDecryptingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State for Add Secret (Admin)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<VaultCategory>('infrastructure');
  const [newToolName, setNewToolName] = useState('');
  const [newKeyLabel, setNewKeyLabel] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newLoginUrl, setNewLoginUrl] = useState('');
  const [newPlainValue, setNewPlainValue] = useState('');
  const [newIsClientVisible, setNewIsClientVisible] = useState(true);
  const [newNotes, setNewNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch secrets on mount
  const fetchSecrets = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/portal/vault?projectId=${project.id}`);
      if (!res.ok) throw new Error('Failed to load organization vault credentials');
      const data = await res.json();
      if (data.success) {
        setSecrets(data.secrets);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetching secrets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, [project.id]);

  // Decrypt on demand
  const handleToggleReveal = async (secretId: string) => {
    if (revealedSecrets[secretId]) {
      // Toggle off
      setRevealedSecrets((prev) => {
        const next = { ...prev };
        delete next[secretId];
        return next;
      });
      return;
    }

    try {
      setDecryptingId(secretId);
      const res = await fetch('/api/portal/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reveal', secretId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to decrypt credential');
      }

      setRevealedSecrets((prev) => ({
        ...prev,
        [secretId]: data.decryptedValue,
      }));

      // Auto-hide after 45 seconds for zero-knowledge safety
      setTimeout(() => {
        setRevealedSecrets((prev) => {
          const next = { ...prev };
          delete next[secretId];
          return next;
        });
      }, 45000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Decryption error');
    } finally {
      setDecryptingId(null);
    }
  };

  // Copy to clipboard
  const handleCopy = async (secretId: string, customVal?: string) => {
    let value = customVal || revealedSecrets[secretId];

    // If not yet revealed, decrypt first then copy
    if (!value) {
      try {
        setDecryptingId(secretId);
        const res = await fetch('/api/portal/vault', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'reveal', secretId }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Decryption failed');
        value = data.decryptedValue;
        setRevealedSecrets((prev) => ({ ...prev, [secretId]: value }));
      } catch (err) {
        alert('Failed to copy secret');
        return;
      } finally {
        setDecryptingId(null);
      }
    }

    if (value) {
      await navigator.clipboard.writeText(value);
      setCopiedId(customVal ? `custom_${secretId}` : secretId);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Handle Add Secret Submission (Admin)
  const handleCreateSecret = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName || !newKeyLabel || !newPlainValue) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/portal/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          projectId: project.id,
          category: newCategory,
          toolName: newToolName,
          keyLabel: newKeyLabel,
          usernameOrEmail: newUsername,
          loginUrl: newLoginUrl,
          plainValue: newPlainValue,
          isClientVisible: newIsClientVisible,
          notes: newNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to create secret');

      setIsAddModalOpen(false);
      setNewToolName('');
      setNewKeyLabel('');
      setNewUsername('');
      setNewLoginUrl('');
      setNewPlainValue('');
      setNewNotes('');
      await fetchSecrets();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error adding secret');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSecrets = secrets.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.toolName.toLowerCase().includes(q) ||
      s.keyLabel.toLowerCase().includes(q) ||
      (s.usernameOrEmail && s.usernameOrEmail.toLowerCase().includes(q)) ||
      (s.notes && s.notes.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in font-mono">
      {/* Header & Vault Telemetry Enclave */}
      <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card-bg/80 backdrop-blur-xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] text-electric-blue uppercase tracking-widest font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>ORGANIZATION CREDENTIAL ENCLAVE // HARDWARE-GRADE AES-256-GCM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-title tracking-tight">
              Organization &amp; Product Password Vault
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Every tool, database, API, and cloud infrastructure service provisioned for your product is securely
              cataloged here. Product owners have full visibility to view passwords, copy access keys, or jump
              directly to login dashboards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSecrets}
              disabled={loading}
              className="p-2.5 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground transition-colors"
              title="Refresh Vault Credentials"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {isAdmin && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric-blue text-black font-bold text-xs uppercase tracking-wider hover:bg-electric-blue/90 transition-all shadow-lg shadow-electric-blue/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tool Password</span>
              </button>
            )}
          </div>
        </div>

        {/* Security Specs Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-card-border/60 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">Cipher Standard</span>
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" />
              AES-256-GCM Hardware-Grade
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">Product Owner Access</span>
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <Key className="w-3 h-3 text-electric-blue" />
              Full Visibility &amp; Export
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">Auto-Mask Safety</span>
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <EyeOff className="w-3 h-3 text-amber-400" />
              45s Auto-Zeroization
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">Monitored Tools</span>
            <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Check className="w-3 h-3" />
              {secrets.length} Active Services
            </p>
          </div>
        </div>
      </div>

      {/* Real-Time Tool Search & Category Filter */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tools by name, service, username, or keyword (e.g. Supabase, Vercel, Stripe, GitHub, Cloudflare)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-card-border bg-card-bg/60 text-foreground placeholder:text-zinc-500 focus:outline-none focus:border-electric-blue text-xs transition-colors"
          />
        </div>

        {/* Category Filter Tabs - All Visible at Once (Never horizontally scrolling) */}
        <div className="flex flex-wrap items-center gap-2 pb-2 text-xs">
          {(Object.keys(CATEGORY_MAP) as Array<VaultCategory | 'all'>).map((cat) => {
            const cfg = CATEGORY_MAP[cat];
            const Icon = cfg.icon;
            const isActive = activeCategory === cat;
            const count = cat === 'all' ? secrets.length : secrets.filter((s) => s.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all border ${
                  isActive
                    ? 'bg-card-bg border-electric-blue/40 text-electric-blue font-bold shadow-md'
                    : 'bg-card-bg/40 border-card-border text-text-muted hover:text-foreground hover:bg-card-bg'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                <span>{cfg.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-card-border/60 text-text-muted">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secrets Grid */}
      {loading ? (
        <div className="p-12 text-center border border-card-border rounded-2xl bg-card-bg/40 space-y-3">
          <RefreshCw className="w-6 h-6 text-electric-blue animate-spin mx-auto" />
          <p className="text-xs text-text-muted">Unlocking zero-knowledge cryptographic enclave...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center border border-red-500/20 rounded-2xl bg-red-500/5 space-y-3">
          <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
          <p className="text-xs text-red-400">{error}</p>
          <button
            onClick={fetchSecrets}
            className="text-xs text-electric-blue underline uppercase tracking-wider"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredSecrets.length === 0 ? (
        <div className="p-12 text-center border border-card-border rounded-2xl bg-card-bg/40 space-y-3">
          <Lock className="w-8 h-8 text-text-muted mx-auto" />
          <h3 className="text-sm font-bold text-foreground">No Credentials Found</h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto">
            {searchQuery
              ? `No tools matched "${searchQuery}". Try searching for another service name.`
              : activeCategory === 'all'
              ? 'No cryptographic secrets have been provisioned yet for this project.'
              : `No keys cataloged under ${CATEGORY_MAP[activeCategory].label}.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSecrets.map((secret) => {
            const isRevealed = !!revealedSecrets[secret.id];
            const isDecrypting = decryptingId === secret.id;
            const isCopied = copiedId === secret.id;
            const catCfg = CATEGORY_MAP[secret.category] || CATEGORY_MAP.infrastructure;
            const CategoryIcon = catCfg.icon;

            return (
              <div
                key={secret.id}
                className="group relative rounded-2xl border border-card-border bg-card-bg/60 p-5 space-y-4 hover:border-card-border/80 transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Secret Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                          <CategoryIcon className={`w-3.5 h-3.5 ${catCfg.color}`} />
                          {catCfg.label}
                        </span>
                        <span className="text-card-border">•</span>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            secret.isClientVisible
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          }`}
                        >
                          {secret.isClientVisible ? 'Owner Visible' : 'Dev Internal'}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-foreground group-hover:text-electric-blue transition-colors">
                        {secret.toolName}
                      </h4>
                      <p className="text-[11px] text-cyan-300/80 font-mono font-medium">
                        {secret.keyLabel}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Reveal/Hide Button */}
                      <button
                        onClick={() => handleToggleReveal(secret.id)}
                        disabled={isDecrypting}
                        className={`p-2 rounded-lg border transition-colors ${
                          isRevealed
                            ? 'border-electric-blue/40 bg-electric-blue/10 text-electric-blue'
                            : 'border-card-border bg-card-bg text-text-muted hover:text-foreground'
                        }`}
                        title={isRevealed ? 'Hide password' : 'Decrypt & reveal password'}
                      >
                        {isDecrypting ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-electric-blue" />
                        ) : isRevealed ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Copy Password Button */}
                      <button
                        onClick={() => handleCopy(secret.id)}
                        disabled={isDecrypting}
                        className={`p-2 rounded-lg border transition-colors ${
                          isCopied
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                            : 'border-card-border bg-card-bg text-text-muted hover:text-foreground'
                        }`}
                        title="Copy plaintext password"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Username / Login ID Display (if available) */}
                  {secret.usernameOrEmail && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-card-border text-[11px]">
                      <div className="flex items-center gap-1.5 text-zinc-400 truncate">
                        <User className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="text-[10px] uppercase font-mono text-zinc-500">Login ID:</span>
                        <span className="text-white font-mono font-medium truncate">
                          {secret.usernameOrEmail}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(secret.id, secret.usernameOrEmail)}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono shrink-0 pl-2"
                      >
                        {copiedId === `custom_${secret.id}` ? 'Copied ID ✓' : 'Copy'}
                      </button>
                    </div>
                  )}

                  {/* Secret Value Cipher Display */}
                  <div className="relative">
                    <div
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono break-all transition-all ${
                        isRevealed
                          ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300 shadow-inner'
                          : 'border-card-border/60 bg-black/40 text-text-muted select-none'
                      }`}
                    >
                      {isRevealed
                        ? revealedSecrets[secret.id]
                        : '••••••••••••••••••••••••••••••••'}
                    </div>

                    {isRevealed && (
                      <span className="absolute -top-2 right-2 text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                        Auto-Zeroizes in 45s
                      </span>
                    )}
                  </div>

                  {/* Notes / Documentation */}
                  {secret.notes && (
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                      {secret.notes}
                    </p>
                  )}
                </div>

                {/* Footer with External Link & Timestamp */}
                <div className="pt-2 border-t border-card-border/60 flex items-center justify-between text-[10px] text-text-muted">
                  {secret.loginUrl ? (
                    <a
                      href={secret.loginUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono hover:underline"
                    >
                      <span>Launch Login Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span>Managed by WebMuse</span>
                  )}
                  <span>Updated {new Date(secret.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Secret Modal (Admin Only) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-lg w-full rounded-3xl border border-card-border bg-card-bg p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-card-border pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-electric-blue" />
                <h3 className="text-lg font-bold font-display text-text-title">
                  Add Tool Credential to Vault
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-text-muted hover:text-foreground text-xs uppercase"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateSecret} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-text-muted uppercase text-[10px]">Tool / Service Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Supabase Cloud Database"
                    value={newToolName}
                    onChange={(e) => setNewToolName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-card-border bg-black/40 text-foreground focus:outline-none focus:border-electric-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted uppercase text-[10px]">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as VaultCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-card-border bg-black/40 text-foreground focus:outline-none focus:border-electric-blue"
                  >
                    <option value="infrastructure">Cloud Hosting &amp; Compute</option>
                    <option value="database">Database &amp; Storage</option>
                    <option value="apis">Payments &amp; APIs</option>
                    <option value="staging_auth">Staging &amp; Admin Logins</option>
                    <option value="domain_dns">Domains &amp; DNS</option>
                    <option value="repositories">Code &amp; Repositories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-text-muted uppercase text-[10px]">Key / Credential Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master DB Password"
                    value={newKeyLabel}
                    onChange={(e) => setNewKeyLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-card-border bg-black/40 text-foreground focus:outline-none focus:border-electric-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted uppercase text-[10px]">Username / Login ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. admin@organization.com"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-card-border bg-black/40 text-foreground focus:outline-none focus:border-electric-blue"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-text-muted uppercase text-[10px]">Login Dashboard URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://supabase.com/dashboard/project/..."
                  value={newLoginUrl}
                  onChange={(e) => setNewLoginUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-card-border bg-black/40 text-foreground focus:outline-none focus:border-electric-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-text-muted uppercase text-[10px]">Plaintext Password / Secret</label>
                <input
                  type="password"
                  required
                  placeholder="Paste confidential password or API token (Encrypted with AES-256-GCM)"
                  value={newPlainValue}
                  onChange={(e) => setNewPlainValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-card-border bg-black/40 text-foreground focus:outline-none focus:border-electric-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-text-muted uppercase text-[10px]">Notes &amp; Access Instructions</label>
                <textarea
                  rows={2}
                  placeholder="Describe what this tool is used for in the organization..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-card-border bg-black/40 text-foreground focus:outline-none focus:border-electric-blue resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="clientVisible"
                  checked={newIsClientVisible}
                  onChange={(e) => setNewIsClientVisible(e.target.checked)}
                  className="rounded border-card-border bg-card-bg text-electric-blue focus:ring-0"
                />
                <label htmlFor="clientVisible" className="text-xs text-text-muted">
                  Allow Product Owner / Client to view and copy this password
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-text-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-electric-blue text-black font-bold uppercase tracking-wider hover:bg-electric-blue/90 transition-all shadow-lg"
                >
                  {isSubmitting ? 'Encrypting...' : 'Encrypt & Store Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
