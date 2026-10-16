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
 *    3. mode: 'soon'   -> mostra "Em breve" e leva para o contato.
 * ============================================================================
 */

export type ActionMode = 'api' | 'url' | 'soon';

export interface ProductAction {
  mode: ActionMode;
  /** Usado somente quando mode = 'url'. */
  url?: string;
  /** Texto do botão. */
  label: string;
}

export interface Software {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: 'Disponível' | 'Em desenvolvimento' | 'Beta';
  /** Cor de destaque do card. */
  accent: string;
  /** Sigla exibida no "logo" provisório. */
  monogram: string;
  buy: ProductAction;
  download: ProductAction;
}

export const SOFTWARES: Software[] = [
  {
    id: 'proviga-3d',
    name: 'ProViga 3D',
    tagline: 'Análise física não-linear e detalhamento de vigas',
    description:
      'Dimensionamento e detalhamento de vigas de concreto armado considerando a não-linearidade física do material, com verificação de flechas, fissuração e geração automática de armaduras.',
    features: [
      'Análise física não-linear (diagramas tensão-deformação NBR 6118)',
      'Verificação de ELU e ELS: flechas, fissuração e abertura de fissuras',
      'Detalhamento automático de armaduras longitudinais e estribos',
      'Visualização 3D da viga e das armaduras',
    ],
    status: 'Em desenvolvimento',
    accent: '#f5a524',
    monogram: 'PV',
    buy: { mode: 'soon', label: 'Comprar licença' },
    download: { mode: 'soon', label: 'Baixar demonstração' },
  },
  {
    id: 'alrimo',
    name: 'Alrimo',
    tagline: 'Cálculo de muros de arrimo e sapatas',
    description:
      'Ferramenta dedicada ao projeto geotécnico-estrutural de muros de arrimo e sapatas: empuxos, estabilidade global e local, tensões no solo e dimensionamento das armaduras.',
    features: [
      'Empuxos ativo e passivo (Rankine e Coulomb), com sobrecarga',
      'Verificações de tombamento, deslizamento e tensões no solo',
      'Dimensionamento de sapatas isoladas, corridas e associadas',
      'Memorial de cálculo pronto para entregar ao cliente',
    ],
    status: 'Em desenvolvimento',
    accent: '#22c55e',
    monogram: 'AL',
    buy: { mode: 'soon', label: 'Comprar licença' },
    download: { mode: 'soon', label: 'Baixar demonstração' },
  },
  {
    id: 'a-port',
    name: 'A-PORT',
    tagline: 'Análise espacial 3D de pórticos e cascas',
    description:
      'Análise matricial espacial de pórticos, grelhas e elementos de casca pelo Método dos Elementos Finitos, com combinações de ações e visualização de esforços e deformadas em 3D.',
    features: [
      'Pórticos espaciais com 6 graus de liberdade por nó',
      'Elementos de casca para lajes, paredes e reservatórios',
      'Combinações de ações automáticas conforme NBR 8681',
      'Diagramas de esforços e deformada em 3D interativo',
    ],
    status: 'Em desenvolvimento',
    accent: '#38bdf8',
    monogram: 'AP',
    buy: { mode: 'soon', label: 'Comprar licença' },
    download: { mode: 'soon', label: 'Baixar demonstração' },
  },
];
