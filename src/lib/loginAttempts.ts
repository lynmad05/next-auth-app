// lib/loginAttempts.ts

interface AttemptRecord {
  count: number;
  lockedUntil: Date | null;
}

const attempts: Map<string, AttemptRecord> = new Map();

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export function getAttempts(email: string): AttemptRecord {
  return attempts.get(email) || { count: 0, lockedUntil: null };
}

export function isLocked(email: string): boolean {
  const record = getAttempts(email);
  if (record.lockedUntil && new Date() < record.lockedUntil) {
    return true;
  }
  return false;
}

export function registerFailedAttempt(email: string): void {
  const record = getAttempts(email);
  record.count += 1;
  if (record.count >= MAX_ATTEMPTS) {
    const lockUntil = new Date();
    lockUntil.setMinutes(lockUntil.getMinutes() + LOCKOUT_MINUTES);
    record.lockedUntil = lockUntil;
    record.count = 0; // reset after locking
  }
  attempts.set(email, record);
}

export function resetAttempts(email: string): void {
  attempts.delete(email);
}

export function getRemainingLockTime(email: string): number {
  const record = getAttempts(email);
  if (!record.lockedUntil) return 0;
  const diff = record.lockedUntil.getTime() - Date.now();
  return Math.ceil(diff / 60000); // minutos restantes
}