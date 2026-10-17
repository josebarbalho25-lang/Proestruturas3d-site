/**
 * ============================================================================
 *  CATÁLOGO DE SOFTWARES (VITRINE)
 * ============================================================================
 *  REGRA DE SEGURANÇA DOS DOWNLOADS:
 *  Nenhum botão do site aponta para um arquivo solto (.exe, .zip) escrito
 *  direto no HTML. Os botões "Comprar" e "Baixar" leem as URLs DESTE arquivo
 *  ou, quando a API existir, pedem um link temporário ao backend.
 *
 *  Como cada botão decide o destino (ver src/scripts/product-actions.ts):
 *    1. mode: 'api'    -> chama a API (o backend confere login/licença e devolve
 *                         um link temporário assinado). Recomendado para versões pagas.
 *    2. mode: 'url'    -> usa a URL configurada abaixo (ex.: página de checkout
 *                         do gateway, página de releases, versão de demonstração).
 *    3. mode: 'whatsapp' -> abre o WhatsApp com a mensagem configurada (ex.: pedir teste grátis).
 *    4. mode: 'soon'   -> mostra "Em breve" e leva para o contato.
 * ============================================================================
 */

export type ActionMode = 'api' | 'url' | 'whatsapp' | 'soon';

export interface ProductAction {
  mode: ActionMode;
  /** Usado somente quando mode = 'url' (precisa começar com https://). */
  url?: string;
  /** Usado somente quando mode = 'whatsapp'. */
  message?: string;
  /** Texto do botão. */
  label: string;
}

/**
 * Plano de assinatura/licença.
 * url: checkout da loja (ex.: PayPal), nunca um arquivo. Sem url, o botão abre o
 * WhatsApp com o nome do plano (enquanto o pagamento online não estiver pronto).
 */
export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  note?: string;
  highlight?: boolean;
  url?: string;
}

export interface Software {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  /** Informações rápidas (plataforma, norma, licença...). */
  specs: { label: string; value: string }[];
  status: 'Disponível' | 'Em desenvolvimento' | 'Beta';
  /** Cor de destaque do card. */
  accent: string;
  /** Sigla de reserva, usada se o software ainda não tiver logo. */
  monogram: string;
  /** Logo original do software (arquivo em public/images/softwares/). */
  logo?: string;
  /** Telas do programa, mostradas em galeria na página do software (public/images/softwares/<id>/). */
  screens?: { src: string; alt: string }[];
  /** Planos à venda. Se existir, a página do software mostra a tabela de preços. */
  plans?: Plan[];
  /** Texto curto exibido abaixo dos botões na página do software. */
  deliveryNote?: string;
  buy: ProductAction;
  download: ProductAction;
}

export const SOFTWARES: Software[] = [
  {
    id: 'pro-viga-3d',
    name: 'Pró-Viga 3D',
    tagline: 'Cálculo, análise não-linear e detalhamento de vigas de concreto armado',
    description:
      'Dimensiona e detalha vigas de concreto armado conforme a NBR 6118:2023, da análise ao desenho: flexão, cisalhamento, flechas com análise física não-linear, ancoragens e emendas, com memorial de cálculo e prancha prontos para entregar.',
    features: [
      'Análise física não-linear (NLF) com flecha imediata e de longo prazo, fluência e retração',
      'Ancoragem, emendas, ganchos e grampos dimensionados e desenhados automaticamente',
      'Memorial de cálculo completo e prancha exportada em DXF',
      'Modelo 3D com armaduras, campos de tensão e deformada pelo MEF',
      'Tela de reações e verificações de ELU e ELS lado a lado',
      'Funciona offline: só precisa de internet para validar a licença',
    ],
    specs: [
      { label: 'Norma', value: 'NBR 6118:2023' },
      { label: 'Plataforma', value: 'Windows' },
      { label: 'Licença', value: '1 computador por assinatura' },
    ],
    status: 'Disponível',
    accent: '#f5a524',
    monogram: 'PV',
    logo: '/images/softwares/pro-viga-3d.svg',
    plans: [
      {
        id: 'mensal',
        name: 'Mensal',
        price: 'R$ 20',
        period: '/mês',
        note: 'Cancele quando quiser',
      },
      {
        id: 'anual',
        name: 'Anual',
        price: 'R$ 180',
        period: '/ano',
        note: 'Equivale a R$ 15/mês',
        highlight: true,
      },
    ],
    deliveryNote:
      'A assinatura é feita direto comigo pelo WhatsApp. Em breve, pagamento online e download pela Área do Cliente.',
    buy: {
      mode: 'whatsapp',
      message: 'Olá! Quero assinar o Pró-Viga 3D.',
      label: 'Assinar',
    },
    download: {
      mode: 'whatsapp',
      message: 'Olá! Sou engenheiro e gostaria de testar o Pró-Viga 3D por 30 dias.',
      label: 'Pedir teste grátis de 30 dias',
    },
  },
  {
    id: 'al-rimo',
    name: 'Al-rimo',
    tagline: 'Muros de arrimo em alvenaria estrutural com sapata corrida',
    description:
      'Projeto de muros de arrimo em blocos de concreto, em balanço ou com contrafortes, com a fundação em sapata corrida. A conta segue a NBR 16868-1:2020 e o manual da ABCP, com cada linha da memória citando o item da norma e a fórmula usada.',
    features: [
      'Muro em balanço (até 3,0 m de solo) e com contrafortes (até 4,0 m)',
      'Empuxo de terra, verificações de estabilidade e tensões no solo',
      'Sapata corrida dimensionada junto com o muro',
      'Modulação real dos blocos, com cinta, contrafortes e juntas de controle',
      'Drenagem (barbacã, dreno, manta) no 3D e no quantitativo',
      'Memória de cálculo auditável, vistas, cortes e exportação IFC',
    ],
    specs: [
      { label: 'Norma', value: 'NBR 16868-1:2020' },
      { label: 'Sistema', value: 'Bloco de concreto' },
      { label: 'Licença', value: 'Perpétua (prevista)' },
    ],
    status: 'Em desenvolvimento',
    accent: '#22c55e',
    monogram: 'AR',
    logo: '/images/softwares/al-rimo.svg',
    screens: [
      { src: '/images/softwares/al-rimo/01-modelo-3d.jpg', alt: 'Modelo 3D do muro em corte, com a armadura da sapata, o dreno e a brita no tardoz' },
      { src: '/images/softwares/al-rimo/02-entrada-muro.jpg', alt: 'Entrada por figuras: tipo de muro, bloco, graute e medidas, com o desenho cotado ao vivo' },
      { src: '/images/softwares/al-rimo/03-isometrico.jpg', alt: 'Isométrico em corte com blocos, canaletas, graute, barra vertical e sapata armada' },
      { src: '/images/softwares/al-rimo/04-memoria-empuxo.jpg', alt: 'Memória de cálculo do empuxo, com as fórmulas, os números substituídos e as figuras' },
      { src: '/images/softwares/al-rimo/05-memoria-flecha.jpg', alt: 'Memória do estado limite de serviço: inércia fissurada e deslocamento no topo pela NBR 16868-1' },
      { src: '/images/softwares/al-rimo/06-entrada-materiais.jpg', alt: 'Materiais: tabela de resistências do bloco, graute e prisma, e peso próprio calculado' },
      { src: '/images/softwares/al-rimo/07-entrada-drenagem.jpg', alt: 'Drenagem: barbacãs, dreno no tardoz, dreno de fundo e impermeabilização' },
      { src: '/images/softwares/al-rimo/08-quantitativo.jpg', alt: 'Quantitativo: blocos, canaletas, graute e argamassa do muro' },
    ],
    deliveryNote: 'Em desenvolvimento. Deixe seu contato para ser avisado no lançamento.',
    buy: {
      mode: 'whatsapp',
      message: 'Olá! Quero ser avisado quando o Al-rimo for lançado.',
      label: 'Quero ser avisado',
    },
    download: { mode: 'soon', label: 'Saiba mais' },
  },
  {
    id: 'a-port',
    name: 'A-PORT',
    tagline: 'Análise espacial 3D de edifícios: pórticos e cascas',
    description:
      'Lançamento e análise de estruturas de edifícios em pórtico espacial com elementos de casca para lajes e paredes. Vento pela NBR 6123:2023, combinações automáticas e efeitos de segunda ordem, com os resultados validados a cada módulo.',
    features: [
      'Pórtico espacial com elementos de casca para lajes e paredes',
      'Vento NBR 6123:2023 com mapa de isopletas e busca pelos 5.571 municípios do IBGE',
      'Combinações de ações automáticas, desaprumo e segunda ordem',
      'Plantas, elevações e 3D com navegação livre',
      'Importação de DXF para lançar a estrutura sobre a arquitetura',
      'Resultados validados módulo a módulo',
    ],
    specs: [
      { label: 'Normas', value: 'NBR 6118 · NBR 6123:2023' },
      { label: 'Análise', value: 'MEF: barras e cascas' },
      { label: 'Situação', value: 'Em desenvolvimento' },
    ],
    status: 'Em desenvolvimento',
    accent: '#38bdf8',
    monogram: 'AP',
    logo: '/images/softwares/a-port.svg',
    deliveryNote: 'Em desenvolvimento. Acompanhe as novidades no blog e no YouTube.',
    buy: {
      mode: 'whatsapp',
      message: 'Olá! Quero ser avisado quando o A-PORT for lançado.',
      label: 'Quero ser avisado',
    },
    download: { mode: 'soon', label: 'Saiba mais' },
  },
];
