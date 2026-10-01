import { cookies } from 'next/headers';
import type { Client, Project, SessionPayload } from '@/lib/types/portal';
import { signSession, verifySession } from '@/lib/server/crypto';

export const CLIENT_COOKIE_NAME = 'wm_client_session';
export const ADMIN_COOKIE_NAME = 'wm_admin_session';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Sets an HTTP-only, secure signed cookie for an authenticated client
 */
export async function setClientSession(client: Client, project: Project): Promise<void> {
  const cookieStore = await cookies();
  const now = Date.now();

  const payload: SessionPayload = {
    role: 'client',
    clientId: client.id,
    email: client.email,
    projectId: project.id,
    projectSlug: project.slug,
    issuedAt: now,
    expiresAt: now + SEVEN_DAYS_MS,
  };

  const signedToken = signSession(payload);

  cookieStore.set(CLIENT_COOKIE_NAME, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
}

/**
 * Sets an HTTP-only, secure signed cookie for the agency administrator
 */
export async function setAdminSession(adminEmail = 'admin@webmuse.io'): Promise<void> {
  const cookieStore = await cookies();
  const now = Date.now();

  const payload: SessionPayload = {
    role: 'admin',
    email: adminEmail,
    issuedAt: now,
    expiresAt: now + ONE_DAY_MS,
  };

  const signedToken = signSession(payload);

  cookieStore.set(ADMIN_COOKIE_NAME, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60, // 1 day
  });
}

/**
 * Retrieves and validates the current client session from incoming cookies
 */
export async function getClientSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(CLIENT_COOKIE_NAME);
    if (!cookie?.value) return null;

    const payload = verifySession(cookie.value);
    if (!payload || payload.role !== 'client') return null;

    return payload;
  } catch {
    return null;
  }
}

/**
 * Retrieves and validates the current admin session from incoming cookies
 */
export async function getAdminSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!cookie?.value) return null;

    const payload = verifySession(cookie.value);
    if (!payload || payload.role !== 'admin') return null;

    return payload;
  } catch {
    return null;
  }
}

/**
 * Clears the client authentication cookie
 */
export async function clearClientSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CLIENT_COOKIE_NAME);
}

/**
 * Clears the admin authentication cookie
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
