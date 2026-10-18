/**
 * ============================================================================
 *  BOTÕES "COMPRAR" E "BAIXAR"
 * ============================================================================
 *  Os botões no HTML NÃO têm o link do arquivo. Eles só dizem QUAL produto e
 *  QUAL ação, por exemplo:
 *      <button data-product-id="al-rimo" data-product-action="download">
 *
 *  Ao clicar, este script decide o destino lendo src/config/softwares.ts:
 *    • mode 'api'  -> pede ao backend um link temporário (o backend confere
 *                     login e licença; se não estiver logado, responde 401).
 *    • mode 'url'  -> usa a URL configurada (somente https).
 *    • mode 'whatsapp' -> abre o WhatsApp com a mensagem configurada.
 *    • mode 'soon' -> leva para o contato com o produto já indicado.
 *  Botões de plano (data-plan-id) usam o checkout do plano, também de softwares.ts.
 * ============================================================================
 */
import { SOFTWARES, type ProductAction } from '../config/softwares';
import { whatsappLink } from '../config/site';
import { API, LOJA } from '../config/api';
import { apiFetch, ApiError, safeHttpsUrl } from './http';

type ActionKind = 'buy' | 'download';

async function resolveDestination(productId: string, kind: ActionKind, action: ProductAction): Promise<string | null> {
  // Caminho do próprio site ("/softwares/…#planos"): fica no site, sem passar pela checagem de https.
  if (action.mode === 'url' && /^\/(?!\/)/.test(action.url ?? '')) return action.url!;
  if (action.mode === 'url') return safeHttpsUrl(action.url);
  if (action.mode === 'whatsapp') return whatsappLink(action.message);

  if (action.mode === 'api') {
    const route = kind === 'buy' ? API.routes.checkout(productId) : API.routes.download(productId);
    const data = await apiFetch<{ url?: string }>(route, { method: 'POST' });
    return safeHttpsUrl(data?.url);
  }

  return `/contato/?produto=${encodeURIComponent(productId)}`;
}

// ── Pagamento online (Mercado Pago) ──────────────────────────────────────────
// O botão do plano abre a caixinha do e-mail; o servidor de licenças abre a
// assinatura no Mercado Pago (com o preço DELE) e devolve o endereço de pagamento.
const ENDERECOS_DO_MP = /^https:\/\/(www\.)?mercadopago\.com(\.br)?\//;

function abrirAssinatura(productId: string, planId: string, planName: string) {
  const dialogo = document.getElementById('assinar-dialogo') as HTMLDialogElement | null;
  if (!dialogo) return;
  const form = dialogo.querySelector('form')!;
  const campo = form.querySelector<HTMLInputElement>('input[name="email"]')!;
  const erro = form.querySelector<HTMLElement>('.assinar__erro')!;
  const ir = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  dialogo.querySelector<HTMLElement>('[data-plano-nome]')!.textContent = `· ${planName.toLowerCase()}`;
  erro.hidden = true;
  dialogo.showModal();
  campo.focus();

  const mostraErro = (msg: string) => { erro.textContent = msg; erro.hidden = false; };
  form.querySelector<HTMLButtonElement>('[data-assinar-cancelar]')!.onclick = () => dialogo.close();
  form.onsubmit = async (ev) => {
    ev.preventDefault();
    const email = campo.value.trim();
    if (!campo.checkValidity() || !email) { mostraErro('Confira o e-mail.'); return; }
    ir.disabled = true;
    ir.setAttribute('aria-busy', 'true');
    erro.hidden = true;
    try {
      // Sem cookie nenhum (credentials: 'omit'): esta chamada não precisa saber quem é o cliente.
      const res = await fetch(`${LOJA.baseUrl}${LOJA.checkout(productId)}`, {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, plano: planId }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; erro?: string };
      if (!res.ok || !data.url) { mostraErro(data.erro || 'Não foi possível abrir o pagamento agora. Tente de novo em instantes.'); return; }
      if (!ENDERECOS_DO_MP.test(data.url)) { mostraErro('Endereço de pagamento inesperado. Fale conosco pelo WhatsApp.'); return; }
      window.location.assign(data.url);
    } catch {
      mostraErro('Sem conexão com o servidor de pagamento. Tente de novo em instantes.');
    } finally {
      ir.disabled = false;
      ir.removeAttribute('aria-busy');
    }
  };
}

// ── Teste grátis ─────────────────────────────────────────────────────────────
// O servidor libera o e-mail por alguns dias (sem cartão) e o cliente baixa o instalador.
function abrirTeste(productId: string): boolean {
  const dialogo = document.getElementById('teste-dialogo') as HTMLDialogElement | null;
  if (!dialogo) return false;
  const form = dialogo.querySelector<HTMLFormElement>('[data-teste-pedido]')!;
  const pronto = dialogo.querySelector<HTMLElement>('[data-teste-pronto]')!;
  const campo = form.querySelector<HTMLInputElement>('input[name="email"]')!;
  const erro = form.querySelector<HTMLElement>('.assinar__erro')!;
  const ir = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  form.hidden = false;
  pronto.hidden = true;
  erro.hidden = true;
  dialogo.querySelectorAll<HTMLButtonElement>('[data-teste-fechar]').forEach((b) => { b.onclick = () => dialogo.close(); });
  dialogo.showModal();
  campo.focus();

  const mostraErro = (msg: string) => { erro.textContent = msg; erro.hidden = false; };
  form.onsubmit = async (ev) => {
    ev.preventDefault();
    const email = campo.value.trim();
    if (!campo.checkValidity() || !email) { mostraErro('Confira o e-mail.'); return; }
    ir.disabled = true;
    ir.setAttribute('aria-busy', 'true');
    erro.hidden = true;
    try {
      const res = await fetch(`${LOJA.baseUrl}${LOJA.teste(productId)}`, {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; ate?: string; erro?: string };
      if (!res.ok || !data.ok) { mostraErro(data.erro || 'Não foi possível liberar o teste agora. Tente de novo em instantes.'); return; }
      const ate = data.ate ? new Date(data.ate).toLocaleDateString('pt-BR') : '';
      pronto.querySelector<HTMLElement>('[data-teste-ate]')!.textContent = ate;
      pronto.querySelector<HTMLElement>('[data-teste-email]')!.textContent = email.toLowerCase();
      form.hidden = true;
      pronto.hidden = false;
    } catch {
      mostraErro('Sem conexão com o servidor. Tente de novo em instantes.');
    } finally {
      ir.disabled = false;
      ir.removeAttribute('aria-busy');
    }
  };
  return true;
}

async function handleClick(button: HTMLButtonElement) {
  const productId = button.dataset.productId ?? '';
  const kind = button.dataset.productAction as ActionKind;
  const product = SOFTWARES.find((s) => s.id === productId);
  if (!product || (kind !== 'buy' && kind !== 'download')) return;

  // Na página do programa, o teste abre a caixinha; nas listas, o botão leva até ela.
  if (kind === 'download' && product.trialDays && abrirTeste(productId)) return;
  const plan = button.dataset.planId ? product.plans?.find((p) => p.id === button.dataset.planId) : undefined;
  if (plan?.online) { abrirAssinatura(productId, plan.id, plan.name); return; }
  const action: ProductAction = plan
    ? plan.url
      ? { mode: 'url', url: plan.url, label: plan.name }
      : { mode: 'whatsapp', message: `Olá! Quero assinar o ${product.name} no plano ${plan.name}.`, label: plan.name }
    : kind === 'buy'
      ? product.buy
      : product.download;
  const original = button.innerHTML;
  button.setAttribute('aria-busy', 'true');
  button.disabled = true;

  try {
    const url = await resolveDestination(productId, kind, action);
    if (!url) throw new Error('Link inválido');
    if (new URL(url, window.location.href).origin === window.location.origin) window.location.assign(url);
    else window.open(url, '_blank', 'noopener,noreferrer');
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      // Cliente não está logado: manda para a Área do Cliente e volta depois.
      window.location.assign(`/minha-conta/?voltar=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    alert('Não foi possível concluir agora. Tente novamente em instantes ou fale conosco pelo WhatsApp.');
  } finally {
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.innerHTML = original;
  }
}

document.querySelectorAll<HTMLButtonElement>('button[data-product-action]').forEach((btn) => {
  btn.addEventListener('click', () => handleClick(btn));
});

// Chegou de um cartão "Testar grátis" (…/?teste=1): abre a caixinha do teste direto.
if (new URLSearchParams(location.search).get('teste') === '1') {
  document.querySelector<HTMLButtonElement>('button[data-product-action="download"]')?.click();
}
