/**
 * ============================================================================
 *  CONFIGURAÇÃO GERAL DO SITE
 * ============================================================================
 *  Este é o arquivo que você mais vai editar. Troque os textos e links abaixo
 *  pelos seus dados reais. Tudo aqui é PÚBLICO (aparece no site), então
 *  NUNCA coloque senhas, tokens ou chaves de API neste arquivo.
 * ============================================================================
 */

export const SITE = {
  name: 'PRO Estruturas 3D',
  domain: 'proestruturas3d.com.br',
  url: 'https://proestruturas3d.com.br',
  tagline: 'Engenharia estrutural e softwares de cálculo',
  description:
    'Engenheiro estrutural em Uberaba-MG: projeto estrutural em concreto armado, alvenaria estrutural, aço e fundações, laudos técnicos e softwares de cálculo. Atendimento em todo o Brasil.',
  locale: 'pt-BR',
};

/**
 * Contador de visitas (Cloudflare Web Analytics): sem cookies, não guarda IP.
 * Cole aqui o "token" que a Cloudflare mostra ao cadastrar o site.
 * Vazio = contador desligado (e a política de privacidade não cita ele).
 */
export const ANALYTICS = {
  cloudflareToken: '73efbe77ee134419ab4066ffd5f542c0',
};

/** Dados do engenheiro (aparecem na página "Sobre" e no rodapé). */
export const ENGINEER = {
  // TODO: confira seu nome como deseja que apareça no site
  name: 'Eng. José Barbalho',
  role: 'Engenheiro Civil · Calculista Estrutural',
  // TODO: coloque seu número de registro profissional
  crea: 'CREA-MG 382166', // vazio = não aparece no site
  city: 'Uberaba-MG',
  email: 'contato@proestruturas3d.com.br',
};

/**
 * Contato / WhatsApp
 * whatsappNumber: somente números, com código do país (55) e DDD.
 * Exemplo: 5581999998888
 */
export const CONTACT = {
  whatsappNumber: '5534999545092',
  whatsappDefaultMessage:
    'Olá! Vim pelo site proestruturas3d.com.br e gostaria de solicitar um orçamento de projeto estrutural.',
  /**
   * Endereço para onde o formulário de contato vai enviar os dados.
   * Deixe vazio ('') para o formulário abrir o WhatsApp com a mensagem pronta.
   * No futuro, aponte para o seu backend, ex.: 'https://api.proestruturas3d.com.br/v1/contato'
   */
  formEndpoint: '',
};

/** Redes sociais (aparecem no cabeçalho e no rodapé). */
export const SOCIAL = [
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/jbarbalho_civil',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@proestruturas3d',
  },
] as const;

/** Itens do menu principal. */
export const NAV = [
  { label: 'Softwares', href: '/softwares/' },
  { label: 'Sobre', href: '/sobre/' },
  { label: 'Portfólio & Serviços', href: '/portfolio/' },
  { label: 'Blog', href: '/blog/' },
];

/** Monta o link do WhatsApp com a mensagem pronta. */
export function whatsappLink(message: string = CONTACT.whatsappDefaultMessage): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
