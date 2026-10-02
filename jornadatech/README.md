# Jornada Tech

Plano de carreira para estudantes de tecnologia, desenvolvido como projeto de extensão.
O aluno percorre uma jornada guiada para mapear interesses, escolher uma área de atuação,
avaliar suas competências e definir metas. No fim, recebe um **Canvas de Carreira** e um
**plano de ação** salvos no painel. O Canvas pode ser impresso em uma página A4.

## Como funciona

1. **Quem sou eu** (`/self`): semestre, motivação e áreas de curiosidade.
2. **Área de interesse** (`/field-interest`): escolha de um perfil profissional entre seis:
   Desenvolvimento de Software, Analista de Sistemas, Gestão de Projetos em TI,
   Infraestrutura, Segurança da Informação e QA.
3. **Autoavaliação** (`/self-evaluation`): nota de 0 a 5 em cada competência do perfil.
4. **Canvas** (`/canvas`): Canvas de Carreira, com as competências a desenvolver já sugeridas.
5. **Plano de ação** (`/action-plan`): metas de curto e médio prazo (objetivo, ação, prazo e
   indicador). Para concluir a jornada, o aluno responde a um questionário curto de feedback.
6. **Painel** (`/dashboard`): Canvas de Carreira completo, metas marcáveis, análise de lacunas
   e código do sorteio do Evento Conexão.

A partir das notas da autoavaliação, o sistema calcula a **compatibilidade** do aluno com o
perfil escolhido e uma **trilha** com as 5 competências mais urgentes, cada uma com um tipo de
recomendação (curso estruturado, projeto prático ou prática dirigida). As regras do algoritmo
estão em [`CLAUDE.md`](CLAUDE.md), na seção "Algoritmo de análise de lacunas".

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Prisma 7](https://www.prisma.io) com Postgres no [Supabase](https://supabase.com)
- Supabase Auth: login sem senha, com código enviado por email
- Zod, Tailwind CSS 4 e `lucide-react`
- Vitest (testes unitários) e Playwright (E2E)

O backend é o próprio Next.js, por meio de Server Actions; não há servidor separado.

## Como rodar localmente

Pré-requisitos: Node.js 20 ou superior, npm e um projeto no Supabase.

```bash
npm install            # também gera o Prisma Client
cp .env.example .env   # preencha as variáveis (veja abaixo)
npx prisma migrate deploy
npm run dev
```

O app fica em [http://localhost:3000](http://localhost:3000).

### Variáveis de ambiente

Todas estão descritas em [`.env.example`](.env.example):

| Variável | Uso |
|---|---|
| `DATABASE_URL` | Pooler do Supabase (porta 6543), usado pela aplicação. |
| `DIRECT_URL` | Conexão direta ou session pooler (porta 5432), usado pelas migrations. |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Auth. |
| `SMTP_*` | Servidor de email usado para enviar o código do sorteio. |

Nunca faça commit do arquivo `.env`.

### Configuração do Supabase

- **Template de email:** em Authentication → Emails, o template deve usar `{{ .Token }}`
  (código de 6 dígitos), e não o link mágico.
- **SMTP próprio:** o SMTP embutido do Supabase tem limite baixo de envios. Em produção,
  configure um SMTP próprio em Authentication → Emails → SMTP Settings.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build e servidor de produção |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Checagem de tipos |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:e2e` | Testes E2E (Playwright) |
| `npx prisma migrate dev --name <nome>` | Cria uma nova migration |

Uma mudança só está pronta quando lint, checagem de tipos e testes passam e as migrations
aplicam sem erro.

## Banco de dados

Toda mudança de esquema é feita em [`prisma/schema.prisma`](prisma/schema.prisma) e gera uma
migration; o banco nunca é alterado manualmente. Todas as tabelas têm RLS habilitado sem
policies, para bloquear a Data API do Supabase: o acesso aos dados passa sempre pelo servidor,
filtrado pelo usuário logado.

O banco guarda só o que o aluno informa. Compatibilidade e trilha são recalculadas na leitura.

## Estrutura

```
app/
  (journey)/        etapas 1 a 5 da jornada
  dashboard/        painel com o Canvas de Carreira
  login/            login por código enviado por email
lib/
  career/           catálogo de competências e algoritmo de lacunas
  validation/       schemas Zod de cada etapa
  auth.ts           requireUser() e requireStep()
  journey.ts        regras de navegação da jornada
prisma/             schema e migrations
e2e/                testes Playwright
docs/               documentação do projeto
proxy.ts            renovação da sessão e redirecionamentos
```

## Documentação

A pasta [`docs/`](docs) reúne a documentação do projeto:

- [Conceito do MVP](docs/Conceito%20do%20MVP%201.0.pdf)
- [Portfólio institucional](docs/Portf%C3%B3lio%20Institucional%20do%20Projeto%20Jornada%20Tech%202.pdf)
- [Curadoria de competências](docs/curadoria-competencias.pdf)
- [Documentação do Canvas de Carreira](docs/documentacao-canvas-carreira.pdf) e
  [modelo do Canvas](docs/modelo-do-canvas.jpeg)
- [Identidade visual](docs/identidade_visual_plano_de_carreira_ads.md)
- [Dados disponíveis por setor](docs/dados-disponiveis-por-setor.pdf): o que o banco permite
  extrair para a coordenação do curso, a direção da instituição e o núcleo de extensão
- [Pôster do sorteio do Evento Conexão](docs/poster-sorteio-evento-conexao.pdf)

As regras de negócio, convenções de código e decisões de arquitetura estão em
[`CLAUDE.md`](CLAUDE.md).
