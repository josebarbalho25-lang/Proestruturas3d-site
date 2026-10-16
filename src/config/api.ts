/**
 * ============================================================================
 *  CONFIGURAÇÃO DA API EXTERNA (BACKEND FUTURO)
 * ============================================================================
 *  REGRA DE OURO DE SEGURANÇA:
 *  Este site roda 100% no navegador do visitante. Qualquer coisa escrita aqui
 *  (ou em qualquer arquivo dentro de /src) pode ser lida por qualquer pessoa.
 *
 *  Por isso, aqui só existe o ENDEREÇO PÚBLICO da API. Nada de:
 *    - chaves de API / tokens de banco de dados
 *    - chaves secretas de gateway de pagamento
 *    - segredo de assinatura de JWT
 *  Tudo isso fica APENAS no servidor backend.
 *
 *  Para ativar a API, defina a variável PUBLIC_API_BASE_URL
 *  (no arquivo .env local, ou como "Variable" no GitHub Actions).
 * ============================================================================
 */

export const API = {
  /** Ex.: https://api.proestruturas3d.com.br — vazio = API ainda não existe. */
  baseUrl: (import.meta.env.PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, ''),

  /** Rotas que o backend deverá implementar. */
  routes: {
    /** POST  -> pede um link de download temporário (assinado) de um software */
    download: (productId: string) => `/v1/products/${productId}/download`,
    /** POST  -> cria uma sessão de checkout no gateway de pagamento e devolve a URL */
    checkout: (productId: string) => `/v1/products/${productId}/checkout`,
    /** POST  -> login (o backend confere a senha com Bcrypt e devolve o JWT em cookie HttpOnly) */
    login: '/v1/auth/login',
    /** POST  -> encerra a sessão (apaga o cookie) */
    logout: '/v1/auth/logout',
    /** GET   -> dados do cliente logado (licenças, downloads liberados) */
    me: '/v1/auth/me',
  },
};

export const isApiEnabled = (): boolean => API.baseUrl.length > 0;
