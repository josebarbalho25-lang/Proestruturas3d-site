/**
 * Cliente HTTP mínimo para conversar com o backend futuro.
 *
 * SEGURANÇA:
 *  - Nenhuma chave/token é enviada daqui. A identificação do cliente é feita
 *    pelo cookie HttpOnly com o JWT, que o próprio navegador envia
 *    (credentials: 'include'). O JavaScript do site nunca lê esse cookie.
 *  - O backend deve liberar CORS apenas para https://proestruturas3d.com.br.
 */
import { API } from '../config/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function apiFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API.baseUrl) throw new ApiError(0, 'API ainda não configurada.');

  const res = await fetch(`${API.baseUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });

  if (!res.ok) throw new ApiError(res.status, `Erro ${res.status}`);
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/** Só aceita links https (evita redirecionamentos para javascript:, data:, http: etc.). */
export function safeHttpsUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value, window.location.origin);
    return url.protocol === 'https:' || url.origin === window.location.origin ? url.href : null;
  } catch {
    return null;
  }
}
