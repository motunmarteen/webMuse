'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminLogoutButton } from '@/components/admin/AdminLogoutButton';
import { LayoutDashboard, PlusCircle, ShieldAlert, BookOpen } from 'lucide-react';

export function AdminNavbar({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname();

  return (
    <header className="relative z-30 border-b border-card-border bg-background/85 backdrop-blur-xl sticky top-0 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <span className="font-display font-black text-lg tracking-wider text-foreground">
              WEBMUSE<span className="text-electric-blue">.</span>
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-[10px] font-mono text-electric-blue font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              OS ADMIN
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/admin'
                  ? 'bg-card-bg border border-card-border text-foreground font-medium'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-electric-blue" />
              <span>Command Deck</span>
            </Link>

            <Link
              href="/admin/projects/new"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/admin/projects/new'
                  ? 'bg-card-bg border border-card-border text-foreground font-medium'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>New Genesis Project</span>
            </Link>

            <Link
              href="/manual"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/manual'
                  ? 'bg-card-bg border border-card-border text-foreground font-medium'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Operational Manual</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-right font-mono text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-card-border bg-card-bg text-text-muted text-[11px]">
              <ShieldAlert className="w-3 h-3 text-electric-blue" />
              <span>{adminEmail || 'admin@webmuse.tech'}</span>
            </div>
          </div>

          <div className="h-4 w-px bg-card-border hidden sm:block" />

          <AdminLogoutButton />
        </div>
      </div>
    </header>
  );
}
