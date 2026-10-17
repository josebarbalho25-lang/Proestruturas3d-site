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
import { API } from '../config/api';
import { apiFetch, ApiError, safeHttpsUrl } from './http';

type ActionKind = 'buy' | 'download';

async function resolveDestination(productId: string, kind: ActionKind, action: ProductAction): Promise<string | null> {
  if (action.mode === 'url') return safeHttpsUrl(action.url);
  if (action.mode === 'whatsapp') return whatsappLink(action.message);

  if (action.mode === 'api') {
    const route = kind === 'buy' ? API.routes.checkout(productId) : API.routes.download(productId);
    const data = await apiFetch<{ url?: string }>(route, { method: 'POST' });
    return safeHttpsUrl(data?.url);
  }

  return `/contato/?produto=${encodeURIComponent(productId)}`;
}

async function handleClick(button: HTMLButtonElement) {
  const productId = button.dataset.productId ?? '';
  const kind = button.dataset.productAction as ActionKind;
  const product = SOFTWARES.find((s) => s.id === productId);
  if (!product || (kind !== 'buy' && kind !== 'download')) return;

  const plan = button.dataset.planId ? product.plans?.find((p) => p.id === button.dataset.planId) : undefined;
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
    if (new URL(url).origin === window.location.origin) window.location.assign(url);
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
