/**
 * Formulário de contato / orçamento.
 *  - Se CONTACT.formEndpoint estiver vazio: monta a mensagem e abre o WhatsApp.
 *  - Se estiver preenchido: envia via POST para o backend (sem chaves no front-end;
 *    o backend deve ter proteção anti-spam, como rate limit e captcha).
 */
import { CONTACT, whatsappLink } from '../config/site';

const form = document.querySelector<HTMLFormElement>('#contact-form');
const status = document.querySelector<HTMLElement>('#contact-status');

// Pré-seleciona o assunto quando o visitante vem de um botão de software (?produto=alrimo)
const produto = new URLSearchParams(window.location.search).get('produto');
if (form && produto) {
  const subject = form.querySelector<HTMLSelectElement>('[name="assunto"]');
  if (subject) subject.value = 'Softwares';
  const msg = form.querySelector<HTMLTextAreaElement>('[name="mensagem"]');
  if (msg && !msg.value) msg.value = `Tenho interesse no software: ${produto}.`;
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);

  // Campo "isca" invisível: robôs costumam preenchê-lo, pessoas não.
  if (data.get('website')) return;

  const fields = {
    nome: String(data.get('nome') ?? '').trim(),
    email: String(data.get('email') ?? '').trim(),
    telefone: String(data.get('telefone') ?? '').trim(),
    assunto: String(data.get('assunto') ?? '').trim(),
    mensagem: String(data.get('mensagem') ?? '').trim(),
  };

  if (!CONTACT.formEndpoint) {
    const text =
      `Olá! Meu nome é ${fields.nome}.\n` +
      `Assunto: ${fields.assunto}\n` +
      `E-mail: ${fields.email}\n` +
      (fields.telefone ? `Telefone: ${fields.telefone}\n` : '') +
      `\n${fields.mensagem}`;
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
    return;
  }

  if (status) status.textContent = 'Enviando...';
  try {
    const res = await fetch(CONTACT.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error(String(res.status));
    form.reset();
    if (status) status.textContent = 'Mensagem enviada! Retornaremos em breve.';
  } catch {
    if (status) status.textContent = 'Não foi possível enviar. Por favor, fale conosco pelo WhatsApp.';
  }
});
