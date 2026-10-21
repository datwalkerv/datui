const warned = new Set<string>();

/** Logs a datui warning once per message, outside production builds. */
export function devWarning(message: string): void {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  if (env === "production" || warned.has(message)) return;
  warned.add(message);
  console.warn(`[datui] ${message}`);
}
