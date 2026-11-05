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
  /** Usado somente quando mode = 'url': https://… ou um caminho do próprio site ("/softwares/…"). */
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
  /** true = pagamento online pelo Mercado Pago (o site pede o e-mail e manda para o checkout). */
  online?: boolean;
}

export interface Software {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  /** Informações rápidas (plataforma, norma, licença...). */
  specs: { label: string; value: string }[];
  status: 'Disponível' | 'Gratuito' | 'Em desenvolvimento' | 'Beta';
  /** Cor de destaque do card. */
  accent: string;
  /** Sigla de reserva, usada se o software ainda não tiver logo. */
  monogram: string;
  /** true = nome feminino ("a PFF Calc", de calculadora): a página usa "da/a" em vez de "do/o". */
  feminino?: boolean;
  /** Logo original do software (arquivo em public/images/softwares/). */
  logo?: string;
  /** Telas do programa, mostradas em galeria na página do software (public/images/softwares/<id>/). */
  screens?: { src: string; alt: string }[];
  /** Planos à venda. Se existir, a página do software mostra a tabela de preços. */
  plans?: Plan[];
  /** Texto curto exibido abaixo dos botões na página do software. */
  deliveryNote?: string;
  /** Teste grátis automático (dias). O servidor libera o e-mail; sem cartão. */
  trialDays?: number;
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
    screens: [
      { src: '/images/softwares/pro-viga-3d/03-deformada-nlf-3d.jpg', alt: 'Deformada 3D da viga pela análise física não-linear, com a escala de cores da flecha' },
      { src: '/images/softwares/pro-viga-3d/05-armadura-3d.jpg', alt: 'Armadura em 3D (estribos, positivas, negativas e grampos) ao lado da tabela de ferros' },
      { src: '/images/softwares/pro-viga-3d/02-esforcos.jpg', alt: 'Diagramas de momento fletor, cortante e flecha diferida, com os limites da NBR 6118' },
      { src: '/images/softwares/pro-viga-3d/04-tensoes-concreto-3d.jpg', alt: 'Tensões no concreto em 3D: compressão e tração ao longo da viga' },
      { src: '/images/softwares/pro-viga-3d/06-detalhamento-2d.jpg', alt: 'Detalhamento 2D da armação longitudinal e dos estribos, com posições, bitolas e cortes' },
      { src: '/images/softwares/pro-viga-3d/07-memoria-flecha-nlf.jpg', alt: 'Memória de cálculo da flecha: momento × curvatura e a seção fissurada no Estádio II' },
      { src: '/images/softwares/pro-viga-3d/08-memoria-flexao.jpg', alt: 'Memória de cálculo da flexão no apoio, passo a passo com as fórmulas e os itens da NBR 6118' },
      { src: '/images/softwares/pro-viga-3d/09-reacoes-apoio.jpg', alt: 'Reações de apoio pelo modelo de viga com pilares (NBR 6118 14.6.6.1)' },
    ],
    plans: [
      {
        id: 'mensal',
        name: 'Mensal',
        price: 'R$ 20',
        period: '/mês',
        note: 'Cancele quando quiser',
        online: true,
      },
      {
        id: 'anual',
        name: 'Anual',
        price: 'R$ 180',
        period: '/ano',
        note: 'Equivale a R$ 15/mês',
        highlight: true,
        online: true,
      },
    ],
    deliveryNote:
      'Pagamento pelo Mercado Pago, no cartão de crédito, com ou sem conta no Mercado Pago. O programa é ativado com o e-mail que você informar na assinatura.',
    buy: {
      mode: 'url',
      url: '/softwares/pro-viga-3d/#planos',
      label: 'Assinar',
    },
    // Teste de 7 dias sem cartão (Jose, 18/10). Nos cartões das listas o botão leva à página
    // do programa, que abre a caixinha do teste.
    trialDays: 7,
    download: { mode: 'url', url: '/softwares/pro-viga-3d/?teste=1#planos', label: 'Testar grátis por 7 dias' },
  },
  // Calculadoras gratuitas (licença MIT), com código e instalador no GitHub do Jose (05/11/2026).
  // O botão leva à página de versões do GitHub, que mostra o instalador mais novo: nenhum .exe escrito aqui.
  {
    id: 'pff-calc',
    name: 'PFF Calc',
    feminino: true,
    tagline: 'Verificação de perfis de aço formados a frio',
    description:
      'Verifica barras de perfil formado a frio pela NBR 14762:2010. Calcula os esforços críticos elásticos por um método das faixas finitas próprio, trata a flambagem local pelos três métodos da norma (largura efetiva, seção efetiva e resistência direta) e entrega a memória de cálculo completa, com cada fórmula, os números no lugar das letras e o item da norma.',
    features: [
      'Tração, compressão (global, local e distorcional), flexão nos dois eixos e cortante',
      'Flambagem local pelos três métodos: largura efetiva, seção efetiva e resistência direta',
      'U, U enrijecido, Z, Z enrijecido, cartola, cantoneiras, seção desenhada e dupla de U enrijecidos',
      'Modo de flambagem na barra em 3D e diagrama de interação N–Mx–My',
      'Terça com telha na mesa tracionada pelo Anexo F',
      'Memória de cálculo em PDF, com fórmula, números e item da norma em cada linha',
    ],
    specs: [
      { label: 'Norma', value: 'NBR 14762:2010' },
      { label: 'Plataforma', value: 'Windows' },
      { label: 'Licença', value: 'Gratuita (MIT)' },
    ],
    status: 'Gratuito',
    accent: '#4f46e5',
    monogram: 'PFF',
    logo: '/images/softwares/pff-calc.svg',
    screens: [
      { src: '/images/softwares/pff-calc/01-tela-papel.jpg', alt: 'Tela principal: perfil U enrijecido, propriedades da seção e o aproveitamento de cada verificação com o item da norma' },
      { src: '/images/softwares/pff-calc/02-modo-3d.jpg', alt: 'O modo de flambagem na barra, em 3D' },
      { src: '/images/softwares/pff-calc/03-editor-do-desenho.jpg', alt: 'O editor da seção desenhada pelo engenheiro' },
      { src: '/images/softwares/pff-calc/04-dois-ue.jpg', alt: 'Dois U enrijecidos soldados boca com boca' },
      { src: '/images/softwares/pff-calc/05-interacao.jpg', alt: 'Diagrama de interação N–Mx–My do item 9.9' },
      { src: '/images/softwares/pff-calc/06-tela-escura.jpg', alt: 'A mesma tela no tema escuro' },
    ],
    deliveryNote:
      'Grátis, sem cadastro. O instalador não tem assinatura digital: se o Windows avisar, clique em "Mais informações" e "Executar assim mesmo". A responsabilidade pela verificação é do engenheiro que assina o projeto.',
    buy: {
      mode: 'url',
      url: 'https://github.com/josebarbalho25-lang/PFF-Calc/releases/latest',
      label: 'Baixar grátis',
    },
    download: {
      mode: 'url',
      url: 'https://github.com/josebarbalho25-lang/PFF-Calc/blob/main/docs/MANUAL.pdf',
      label: 'Manual (PDF)',
    },
  },
  {
    id: 'pls-calc',
    name: 'PLS Calc',
    feminino: true,
    tagline: 'Verificação de perfis de aço laminados e soldados',
    description:
      'Verifica uma barra de perfil de aço laminado ou soldado aos estados-limites últimos da NBR 8800:2024 e gera a memória de cálculo completa, com cada fórmula escrita com as letras, com os números e com o resultado, e o item da norma ao lado.',
    features: [
      'Laminados de catálogo: I de abas paralelas (W e HP), I e U padrão americano e cantoneiras',
      'Soldados das séries CS, CVS e VS da NBR 5884, ou de chapas quaisquer, com mesas iguais ou diferentes',
      'Tração, compressão com a área efetiva da edição de 2024, flexão em X e em Y e cortante',
      'Flambagem lateral com torção, inclusive seção monossimétrica, e viga de alma esbelta (Anexo E)',
      'Força axial com momentos (5.5.1.2)',
      'Memória de cálculo em PDF com o carimbo do projetista; funciona sem internet',
    ],
    specs: [
      { label: 'Norma', value: 'NBR 8800:2024' },
      { label: 'Plataforma', value: 'Windows' },
      { label: 'Licença', value: 'Gratuita (MIT)' },
    ],
    status: 'Gratuito',
    accent: '#64748b',
    monogram: 'PLS',
    logo: '/images/softwares/pls-calc.svg',
    screens: [
      { src: '/images/softwares/pls-calc/01-tela.jpg', alt: 'Tela principal: perfil W, propriedades da seção e o aproveitamento de cada verificação com o item da norma' },
      { src: '/images/softwares/pls-calc/02-soldado-mesas-diferentes.jpg', alt: 'Perfil soldado de mesas diferentes, por chapas, com curvatura reversa: as duas mesas verificadas' },
      { src: '/images/softwares/pls-calc/03-janela-flt.jpg', alt: 'A janela animada da flambagem lateral com torção, com os números da verificação' },
      { src: '/images/softwares/pls-calc/04-memoria.jpg', alt: 'A memória de cálculo em PDF: a capa e uma página de contas' },
      { src: '/images/softwares/pls-calc/05-tema-escuro.jpg', alt: 'A tela no tema escuro' },
    ],
    deliveryNote:
      'Grátis, sem cadastro. O instalador não tem assinatura digital: se o Windows avisar, clique em "Mais informações" e "Executar assim mesmo". A responsabilidade pela verificação é do engenheiro que assina o projeto.',
    buy: {
      mode: 'url',
      url: 'https://github.com/josebarbalho25-lang/PLS-Calc/releases/latest',
      label: 'Baixar grátis',
    },
    download: {
      mode: 'url',
      url: 'https://github.com/josebarbalho25-lang/PLS-Calc/blob/main/docs/MANUAL.pdf',
      label: 'Manual (PDF)',
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
    screens: [
      { src: '/images/softwares/a-port/01-portico-deformada.jpg', alt: 'Pórtico espacial com a deformada e a escala de deslocamentos em cores' },
      { src: '/images/softwares/a-port/02-escada-deslocamentos.jpg', alt: 'Escada com degraus em balanço: deslocamentos da combinação ELU-1, com o navegador de plantas, elevações e cortes' },
      { src: '/images/softwares/a-port/03-escada-momentos.jpg', alt: 'Diagrama de momento fletor da viga da escada, com os degraus como barras' },
      { src: '/images/softwares/a-port/04-escada-casca-mx.jpg', alt: 'A mesma escada em elementos de casca: momento Mx ao lado do modelo renderizado' },
      { src: '/images/softwares/a-port/05-diagramas-momento.jpg', alt: 'Diagramas de momento de um pórtico de dois pavimentos, com os valores nas barras' },
      { src: '/images/softwares/a-port/06-portico-momentos-eixos.jpg', alt: 'Momentos em vigas e pilares sobre a malha de eixos do projeto' },
      { src: '/images/softwares/a-port/07-parede-casca.jpg', alt: 'Parede em casca apoiada em pilares: esforço na malha de elementos finitos' },
      { src: '/images/softwares/a-port/08-lajes-deslocamentos.jpg', alt: 'Lajes em casca vistas de topo: deslocamentos com os eixos e os apoios' },
      { src: '/images/softwares/a-port/09-pilar-casca-nxy.jpg', alt: 'Pilar de forma livre modelado em casca: esforço Nxy no plano' },
      { src: '/images/softwares/a-port/10-diagramas-da-barra.jpg', alt: 'Diagramas de cortante e momento de uma barra, com leitura ponto a ponto' },
    ],
    deliveryNote: 'Em desenvolvimento. Acompanhe as novidades no blog e no YouTube.',
    buy: {
      mode: 'whatsapp',
      message: 'Olá! Quero ser avisado quando o A-PORT for lançado.',
      label: 'Quero ser avisado',
    },
    download: { mode: 'soon', label: 'Saiba mais' },
  },
];
