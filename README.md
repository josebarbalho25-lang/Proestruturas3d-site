# PRO Estruturas 3D — site oficial

Site de **proestruturas3d.com.br**: portfólio de cálculo estrutural + vitrine
da software house (Pró-Viga 3D, Al-rimo e A-PORT) + blog em Markdown.

Feito com [Astro](https://astro.build) (gera um site 100% estático, rápido e
seguro) e publicado de graça no **GitHub Pages**.

---

## 1. Estrutura de pastas

```
proestruturas3d-site/
├── .github/workflows/deploy.yml   ← publica o site sozinho a cada envio ao GitHub
├── public/                        ← arquivos copiados como estão
│   ├── CNAME                      ← diz ao GitHub que o domínio é proestruturas3d.com.br
│   ├── favicon.svg                ← ícone da aba do navegador
│   ├── robots.txt
│   └── images/                    ← coloque aqui suas fotos (ex.: images/eu.jpg)
├── src/
│   ├── config/                    ← ★ ONDE VOCÊ EDITA OS DADOS DO SITE ★
│   │   ├── site.ts                ← nome, CREA, WhatsApp, Instagram, YouTube, menu
│   │   ├── softwares.ts           ← catálogo dos softwares e destino dos botões Comprar/Baixar
│   │   └── api.ts                 ← endereço público da API (backend futuro)
│   ├── content/
│   │   ├── blog/                  ← ★ um arquivo .md = um artigo do blog
│   │   └── portfolio/             ← ★ um arquivo .md = um projeto do portfólio
│   ├── pages/                     ← cada arquivo vira uma página do site
│   │   ├── index.astro            ← página inicial
│   │   ├── softwares/             ← vitrine + página de cada software
│   │   ├── sobre.astro            ← Sobre o Engenheiro
│   │   ├── portfolio/             ← Portfólio & Serviços + página de cada projeto
│   │   ├── blog/                  ← lista de artigos + página de cada artigo
│   │   ├── contato.astro          ← formulário de orçamento
│   │   ├── minha-conta.astro      ← Login / Área do Cliente (pronta para o backend)
│   │   └── 404.astro              ← página de "não encontrado"
│   ├── components/                ← pedaços reutilizáveis (cabeçalho, rodapé, cards...)
│   ├── layouts/BaseLayout.astro   ← moldura comum de todas as páginas
│   ├── scripts/                   ← lógica do navegador (botões, login, formulário)
│   └── styles/global.css          ← cores, fontes e estilos gerais
├── .env.example                   ← modelo de configuração (sem segredos!)
├── astro.config.mjs
└── package.json
```

## 2. Primeiro passo: troque os dados de exemplo

Abra os arquivos abaixo e procure por **`TODO`**:

| O que trocar | Onde |
| --- | --- |
| Seu nome, CREA, e-mail | `src/config/site.ts` → `ENGINEER` |
| Número do WhatsApp (ex.: `5581999998888`) | `src/config/site.ts` → `CONTACT.whatsappNumber` |
| Links do Instagram e YouTube | `src/config/site.ts` → `SOCIAL` |
| Sua trajetória e foto | `src/pages/sobre.astro` |
| Serviços oferecidos | `src/pages/portfolio/index.astro` |
| Textos dos projetos | `src/content/portfolio/*.md` |
| Textos dos softwares | `src/config/softwares.ts` |

> Dica para vibe coding: peça ao Claude "troque meu WhatsApp para X no
> `src/config/site.ts`". Todos os dados ficam concentrados ali.

## 3. Rodar na sua máquina

1. Instale o **Node.js versão 24 (LTS)**: https://nodejs.org (baixe o
   instalador "LTS" e clique em Avançar até o fim). É preciso a versão 22.22
   ou mais nova.
2. Descompacte o `.zip` em uma pasta, por exemplo `Documentos/proestruturas3d-site`.
3. Abra o terminal **dentro dessa pasta**:
   - Windows: abra a pasta no Explorador, clique na barra de endereço, digite
     `cmd` e aperte Enter.
   - Mac: clique com o botão direito na pasta → "Novo Terminal na Pasta".
4. Instale as dependências (só na primeira vez):
   ```bash
   npm install
   ```
5. Ligue o site:
   ```bash
   npm run dev
   ```
6. Abra **http://localhost:4321** no navegador. Toda alteração que você salvar
   aparece na hora. Para desligar, aperte `Ctrl + C` no terminal.

Para testar a versão final (igual à que vai ao ar): `npm run build` e depois
`npm run preview`.

## 4. Publicar no GitHub Pages (passo a passo)

### 4.1 Criar o repositório e enviar o código

1. Crie uma conta em https://github.com (se ainda não tiver).
2. Clique em **New repository**. Nome sugerido: `proestruturas3d-site`.
   Deixe **Public** (o GitHub Pages gratuito exige repositório público) e
   **não** marque "Add a README". Clique em **Create repository**.
3. O jeito mais fácil sem programar: instale o **GitHub Desktop**
   (https://desktop.github.com), entre na sua conta, vá em
   *File → Add local repository*, escolha a pasta do site, clique em
   *create a repository* se ele pedir, depois **Publish repository**.
   (Desmarque "Keep this code private".)

   Pelo terminal, a alternativa é:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/proestruturas3d-site.git
   git push -u origin main
   ```

### 4.2 Ligar o GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **GitHub Actions**.
3. Vá na aba **Actions**: o fluxo "Publicar site no GitHub Pages" vai rodar
   sozinho (bolinha amarela → verde em ~1 minuto). Se ele não tiver rodado,
   clique nele e em **Run workflow**.

### 4.3 Apontar o domínio proestruturas3d.com.br (Registro.br)

1. Entre em https://registro.br → seu domínio → **DNS → Configurar zona DNS**
   (se pedir, ative o modo "DNS do Registro.br" / "Editar zona").
2. Crie estas entradas:

   | Tipo | Nome | Valor |
   | --- | --- | --- |
   | A | (vazio) | `185.199.108.153` |
   | A | (vazio) | `185.199.109.153` |
   | A | (vazio) | `185.199.110.153` |
   | A | (vazio) | `185.199.111.153` |
   | AAAA | (vazio) | `2606:50c0:8000::153` |
   | AAAA | (vazio) | `2606:50c0:8001::153` |
   | AAAA | (vazio) | `2606:50c0:8002::153` |
   | AAAA | (vazio) | `2606:50c0:8003::153` |
   | CNAME | `www` | `SEU-USUARIO.github.io` |

3. No GitHub, em **Settings → Pages → Custom domain**, digite
   `proestruturas3d.com.br` e clique **Save**.
4. A propagação do DNS pode levar de minutos a algumas horas. Quando o
   GitHub mostrar "DNS check successful", marque **Enforce HTTPS** (cadeado
   gratuito).
5. Recomendado: em **Settings (do seu perfil) → Pages → Add a domain**,
   verifique o domínio. Isso impede que outra pessoa use seu domínio em
   outro repositório.

Pronto! A partir daqui, **qualquer alteração enviada ao GitHub publica o site
sozinha**.

## 5. Como publicar um artigo no blog

Crie um arquivo em `src/content/blog/`, por exemplo `lajes-macicas.md`:

```markdown
---
title: "Lajes maciças x lajes treliçadas"
description: Quando vale a pena cada solução.
date: 2026-11-01
category: Cálculo Estrutural   # Engenharia | Cálculo Estrutural | Softwares | Notícias
tags: [lajes, concreto armado]
draft: false                   # true = rascunho (não aparece no site)
---

Texto do artigo aqui. Use **negrito**, listas, ## subtítulos, etc.
```

O nome do arquivo vira o endereço: `proestruturas3d.com.br/blog/lajes-macicas/`.
Envie para o GitHub e o artigo entra no ar sozinho. Projetos do portfólio
funcionam do mesmo jeito em `src/content/portfolio/`.

## 6. Regras de segurança (já aplicadas no código)

**Downloads e compras sem links soltos.** Nenhum botão "Comprar" ou "Baixar"
tem link de arquivo escrito no HTML. O botão só informa o ID do produto; o
script `src/scripts/product-actions.ts` busca o destino em
`src/config/softwares.ts`, que tem 3 modos por botão:

- `mode: 'soon'`: "Tenho interesse" leva ao formulário de contato (atual).
- `mode: 'url'`: usa a URL configurada (aceita apenas `https://`), por exemplo
  a página de checkout do gateway de pagamento.
- `mode: 'api'`: pede ao backend um **link temporário assinado**. O backend
  confere login e licença; sem login, o cliente é levado à Área do Cliente.

**Zero chaves expostas.** Este site roda inteiro no navegador do visitante,
então qualquer coisa no código é pública. Por isso:

- Não existe nenhuma chave de API, token de banco ou chave de pagamento no
  projeto. A única configuração é o **endereço público** da API
  (`PUBLIC_API_BASE_URL`), que pode ficar vazio até o backend existir.
- O `.gitignore` bloqueia arquivos `.env` para não irem ao GitHub por engano.
- Chaves secretas (Stripe, Mercado Pago, banco de dados, segredo do JWT)
  vivem **somente** no servidor backend.

**Área do Cliente (Login / Minha Conta).** A interface está pronta em
`src/pages/minha-conta.astro` e `src/scripts/auth.ts`, com comentários do
fluxo planejado:

- O backend guarda as senhas como **hash Bcrypt** (nunca em texto puro).
- No login, o backend gera um **Token JWT** e o devolve em cookie
  `HttpOnly; Secure; SameSite=Strict`. O JavaScript do site não consegue ler
  esse token, o que protege contra roubo de sessão.
- O front-end nunca guarda o JWT em `localStorage`.
- O backend deve liberar CORS apenas para `https://proestruturas3d.com.br`.

Rotas que o backend deverá ter (definidas em `src/config/api.ts`):

| Método | Rota | Função |
| --- | --- | --- |
| POST | `/v1/auth/login` | confere senha (Bcrypt) e devolve o JWT em cookie |
| POST | `/v1/auth/logout` | apaga o cookie |
| GET | `/v1/auth/me` | dados do cliente logado |
| POST | `/v1/products/{id}/checkout` | cria o pagamento e devolve `{ "url": "https://..." }` |
| POST | `/v1/products/{id}/download` | confere a licença e devolve `{ "url": "https://..." }` temporária |

Quando a API existir, configure o endereço no GitHub em
**Settings → Secrets and variables → Actions → aba Variables → New variable**:
nome `PUBLIC_API_BASE_URL`, valor `https://api.proestruturas3d.com.br`.
Depois troque `mode: 'soon'` para `mode: 'api'` nos softwares.

**Outros cuidados incluídos:** links externos com `rel="noopener noreferrer"`,
proteção contra redirecionamento malicioso no login, campo anti-robô no
formulário, permissões mínimas no fluxo do GitHub Actions e dependências sem
vulnerabilidades conhecidas (`npm audit` limpo na criação).

## 7. Comandos úteis

| Comando | O que faz |
| --- | --- |
| `npm install` | instala as dependências (primeira vez) |
| `npm run dev` | liga o site em http://localhost:4321 |
| `npm run build` | gera a versão final na pasta `dist/` |
| `npm run preview` | mostra a versão final localmente |
| `npm audit` | verifica vulnerabilidades nas dependências |
