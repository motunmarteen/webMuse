import { NextRequest, NextResponse } from 'next/server';
import { getClientSession, getAdminSession } from '@/lib/server/session';
import {
  getVaultSecrets,
  getDecryptedVaultSecret,
  createVaultSecret,
  deleteVaultSecret,
  getProjectById,
} from '@/lib/server/store';
import type { VaultCategory } from '@/lib/types/portal';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized session' }, { status: 401 });
    }

    // Role check: If client, can only access their assigned project
    const isClient = !adminSession && !!clientSession;
    if (isClient && clientSession.projectId && clientSession.projectId !== projectId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Client view filters out developer-only secrets
    const secrets = await getVaultSecrets(projectId, isClient);

    // Security UX: Strip encrypted values from metadata listing so ciphertexts aren't casually exposed
    const safeSecrets = secrets.map((s) => ({
      id: s.id,
      projectId: s.projectId,
      category: s.category,
      toolName: s.toolName,
      keyLabel: s.keyLabel,
      usernameOrEmail: s.usernameOrEmail,
      loginUrl: s.loginUrl,
      isClientVisible: s.isClientVisible,
      notes: s.notes,
      updatedAt: s.updatedAt,
      // Indication of existence without plaintext
      hasCipher: !!s.encryptedValue,
    }));

    return NextResponse.json({
      success: true,
      secrets: safeSecrets,
      role: isClient ? 'client' : 'admin',
    });
  } catch (error) {
    console.error('[Vault API Error - GET]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isClient = !adminSession && !!clientSession;
    const body = await request.json();
    const { action } = body;

    // ---------------------------------------------
    // ACTION: REVEAL (Decrypt specific secret)
    // ---------------------------------------------
    if (action === 'reveal') {
      const { secretId } = body;
      if (!secretId) {
        return NextResponse.json({ error: 'secretId is required' }, { status: 400 });
      }

      try {
        const requesterEmail = adminSession ? adminSession.email : clientSession?.email;
        const result = await getDecryptedVaultSecret(secretId, isClient, requesterEmail);

        if (!result) {
          return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          decryptedValue: result.decryptedValue,
          secretId: result.secret.id,
          keyLabel: result.secret.keyLabel,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Decryption error';
        if (message.includes('ACCESS_DENIED')) {
          return NextResponse.json({ error: 'Forbidden: Secret is developer-only' }, { status: 403 });
        }
        return NextResponse.json({ error: 'Failed to decrypt vault secret' }, { status: 500 });
      }
    }

    // ---------------------------------------------
    // ACTION: CREATE (Admin Only)
    // ---------------------------------------------
    if (action === 'create') {
      if (!adminSession) {
        return NextResponse.json({ error: 'Admin authorization required to create secrets' }, { status: 403 });
      }

      const {
        projectId,
        category,
        toolName,
        keyLabel,
        usernameOrEmail,
        loginUrl,
        plainValue,
        isClientVisible,
        notes,
      } = body;

      if (!projectId || !category || !toolName || !keyLabel || !plainValue) {
        return NextResponse.json(
          { error: 'Missing required secret fields (projectId, category, toolName, keyLabel, plainValue)' },
          { status: 400 }
        );
      }

      const project = await getProjectById(projectId);
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }

      const newSecret = await createVaultSecret({
        projectId,
        category: category as VaultCategory,
        toolName,
        keyLabel,
        usernameOrEmail,
        loginUrl,
        plainValue,
        isClientVisible: !!isClientVisible,
        notes,
        actorName: adminSession.email,
      });

      return NextResponse.json({ success: true, secret: newSecret }, { status: 201 });
    }

    // ---------------------------------------------
    // ACTION: DELETE (Admin Only)
    // ---------------------------------------------
    if (action === 'delete') {
      if (!adminSession) {
        return NextResponse.json({ error: 'Admin authorization required to delete secrets' }, { status: 403 });
      }

      const { secretId } = body;
      if (!secretId) {
        return NextResponse.json({ error: 'secretId is required' }, { status: 400 });
      }

      const success = await deleteVaultSecret(secretId, adminSession.email);
      if (!success) {
        return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Secret purged from vault' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('[Vault API Error - POST]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
