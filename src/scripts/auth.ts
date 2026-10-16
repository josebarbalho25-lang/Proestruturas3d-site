/**
 * ============================================================================
 *  ÁREA DO CLIENTE — autenticação (lado do navegador)
 * ============================================================================
 *  Como vai funcionar quando o backend estiver pronto:
 *
 *  1. CADASTRO: o backend recebe a senha e salva SOMENTE o hash Bcrypt
 *     (ex.: bcrypt com custo 12). A senha em texto puro nunca é guardada.
 *
 *  2. LOGIN (POST /v1/auth/login): o backend compara a senha com o hash
 *     Bcrypt. Se estiver correta, gera um Token JWT (curta duração, ex. 15 min)
 *     e o devolve em um cookie:  HttpOnly; Secure; SameSite=Strict
 *     -> HttpOnly impede que qualquer script (inclusive malicioso) leia o token.
 *     -> Opcional: um refresh token, também em cookie HttpOnly.
 *
 *  3. REQUISIÇÕES: o navegador envia o cookie automaticamente
 *     (credentials: 'include'). O backend valida a assinatura do JWT.
 *
 *  O QUE NUNCA DEVE EXISTIR NESTE FRONT-END:
 *     ✗ o segredo de assinatura do JWT
 *     ✗ o JWT salvo em localStorage/sessionStorage
 *     ✗ qualquer verificação de compra/licença (isso é decidido pelo backend)
 * ============================================================================
 */
import { API, isApiEnabled } from '../config/api';
import { apiFetch } from './http';

export interface Customer {
  name: string;
  email: string;
}

/** Pergunta ao backend quem está logado. Retorna null se ninguém estiver. */
export async function getCurrentCustomer(): Promise<Customer | null> {
  if (!isApiEnabled()) return null;
  try {
    return await apiFetch<Customer>(API.routes.me);
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<Customer> {
  // A senha vai por HTTPS direto para o backend, que faz a comparação com Bcrypt.
  return apiFetch<Customer>(API.routes.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout(): Promise<void> {
  await apiFetch(API.routes.logout, { method: 'POST' });
}

/** Atualiza o botão do cabeçalho: "Login" -> "Minha Conta". */
async function refreshHeaderButton() {
  const label = document.querySelector<HTMLElement>('[data-auth-label]');
  if (!label) return;
  const customer = await getCurrentCustomer();
  label.textContent = customer ? 'Minha Conta' : 'Login';
}

refreshHeaderButton();
