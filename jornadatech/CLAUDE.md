@AGENTS.md

## Produto

Jornada Tech é um plano de carreira para estudantes: mapear competências, área de atuação
e metas profissionais. O aluno percorre uma jornada guiada e termina com um Canvas de
Carreira e um plano de ação salvos no painel.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict). Ler `node_modules/next/dist/docs/`
  antes de usar APIs do Next — várias mudaram (ex.: `middleware.ts` agora é `proxy.ts`).
- Prisma 7 com driver adapter `@prisma/adapter-pg`, Postgres no Supabase.
  A URL de conexão fica em `prisma.config.ts`, não no `schema.prisma`.
- Supabase Auth (OTP por email) com `@supabase/ssr`.
- Zod para validação. Tailwind CSS 4. Ícones: `lucide-react`.
- O backend é o próprio Next.js. Não criar servidor separado.
- Gerenciador de pacotes: **npm** (não usar pnpm/yarn).

## Comandos

- Dev: `npm run dev` · Build: `npm run build` · Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Testes unitários: `npm test` (Vitest) · E2E: `npm run test:e2e` (Playwright)
- Nova migration: `npx prisma migrate dev --name <nome>` (não usar `db push`)
- Gerar client: `npx prisma generate` (roda no `postinstall`)

## Banco de dados e variáveis de ambiente

- `DATABASE_URL`: pooler do Supabase (porta 6543) — usado pela aplicação.
- `DIRECT_URL`: conexão direta/session pooler (porta 5432) — usado pelas migrations.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Toda mudança de esquema vai em `prisma/schema.prisma` + migration. Nunca alterar o banco manualmente.
- Manter `.env.example` atualizado ao adicionar variáveis. Nunca commitar `.env`.

## Estrutura

- `lib/prisma.ts` — singleton do PrismaClient. Único lugar que instancia o client.
- `lib/supabase/server.ts` — client do Supabase por requisição (`@supabase/ssr`). Não há client no navegador: todo acesso ao Supabase passa por Server Actions.
- `lib/auth.ts` — `requireUser()` e `requireStep(step)` (ver Autorização e Jornada).
- `lib/journey.ts` — regras de navegação da jornada (funções puras, testadas).
- `lib/steps.ts` — `journeyUpdate()` (avança `currentStep`/`completedAt`) e `ActionResult`.
- `lib/career/catalog.ts` — catálogo único de perfis e competências (constantes versionadas).
- `lib/career/gap-analysis.ts` — algoritmo de lacunas (funções puras).
- `lib/career/suggestions.ts` — metas sugeridas para o plano de ação.
- `lib/career/data.ts` — carrega notas do aluno e calcula a análise.
- `lib/validation/` — schemas Zod, um por etapa; usados no formulário e no servidor.
- `app/(journey)/` — etapas 1–5, com layout comum. Cada etapa: `page.tsx` (servidor, chama
  `requireStep` e carrega dados) + `*-form.tsx` (cliente) + `actions.ts` (Server Action).
- `e2e/` — testes Playwright; `lib/**/*.test.ts` — testes Vitest.
- `proxy.ts` — renovação da sessão Supabase + redirect otimista.
- `docs/` — documentação do projeto (specs em PDF, identidade visual, modelo do Canvas).
  Não colocar documentação em `public/`: tudo ali é servido publicamente pelo site.

## Autenticação (Supabase Auth, OTP por email)

- Fluxo: email → `signInWithOtp({ email })` → aluno digita o código →
  `verifyOtp({ email, token, type: 'email' })`. Não gerar/armazenar/comparar códigos manualmente.
- `signInWithOtp` cria o usuário se não existir. Não checar "email existe?" antes; a resposta
  ao pedir código é sempre a mesma, para não revelar emails cadastrados.
- Template de email do Supabase usa `{{ .Token }}` (código), não magic link.
  O SMTP embutido do Supabase tem limite baixo — produção usa SMTP próprio configurado no painel.
- Após `verifyOtp`, no servidor: `upsert` do `User` do Prisma com `id = auth.users.id`.
- Login e logout são Server Actions.
- No servidor, identificar o usuário com `supabase.auth.getUser()` (ou `getClaims()`).
  **Nunca** usar `getSession()` para decisões de autorização.

## Autorização e segurança

- Rotas públicas: `/` e `/login`. Todas as outras exigem login.
  Usuário logado que acessa `/login` é redirecionado (dashboard ou etapa atual).
- `proxy.ts` só faz checagem otimista (renova token, redireciona sem sessão).
  A checagem real é `requireUser()` em **toda** página privada, Server Action e Route Handler.
- O Prisma ignora RLS: toda autorização é no servidor, filtrando queries pelo `userId` de
  `requireUser()`. Nunca confiar em `userId` vindo do cliente.
- Todas as tabelas do schema `public` têm **RLS habilitado sem policies**, para bloquear a
  Data API do Supabase. Incluir isso em cada migration que cria tabela.
- Nunca importar Prisma, `lib/auth.ts` ou segredos em Client Components.

## Backend: Server Actions vs Route Handlers

- **Server Actions** por padrão: tudo que parte das telas do app (salvar etapas, login, logout).
- **Route Handlers** só para chamadores externos: callback de auth, webhooks.
- Toda Server Action começa com `requireUser()` + validação Zod — ela é um endpoint público.
  Tipar a entrada da action como dados brutos (`string`, não o enum) e confiar só no `safeParse`.
- Salvar etapa: gravar os dados e `journeyUpdate(user, etapa).data` no mesmo `$transaction`,
  depois `redirect(journey.redirectTo)`.

## Jornada do aluno

Ordem das etapas (enum `JourneyStep`):

1. `/self` — "Quem sou eu": interesses e contexto.
2. `/field-interest` — escolha de **exatamente um** perfil profissional-alvo.
3. `/self-evaluation` — autoavaliação das competências **do perfil escolhido** (0 a 5).
4. `/canvas` — Canvas de Carreira, com "competências a desenvolver" pré-preenchido.
5. `/action-plan` — metas de curto e médio prazo (objetivo, ação, prazo, indicador).
6. `/dashboard` — Canvas de Carreira com os 10 blocos do projeto (`app/dashboard/career-canvas.tsx`,
   spec em `docs/documentacao-canvas-carreira.pdf`), metas marcáveis e análise de lacunas.
   Imprime só o Canvas, em uma página A4 paisagem. O nome do aluno não é exibido.

Regras de navegação (implementadas em `requireStep`):

- **Primeiro acesso** (`User.completedAt` nulo): o aluno segue o fluxo em ordem, sem pular.
  Acessar uma etapa posterior à `currentStep` redireciona para a `currentStep`. Voltar a
  etapas já concluídas é permitido; ao salvar, segue para a etapa seguinte do fluxo.
- **Após concluir** (`completedAt` preenchido): login leva ao `/dashboard`. Qualquer etapa pode
  ser editada; ao salvar, redireciona para `/dashboard` (não retoma o fluxo).
- A mesma Server Action trata os dois casos, decidindo pelo `completedAt`.
- Trocar de perfil: o aluno imprime o plano atual e edita `/field-interest`. O cálculo usa os
  dados existentes; competências do novo perfil sem nota contam como `a = 0`, e o dashboard
  avisa "avalie N novas competências".
- A "memória de sessão" é o `currentStep` + os dados de cada etapa, salvos no Postgres via
  Prisma a cada "Continuar". Não usar Supabase Storage nem o client JS do Supabase para dados.

## Algoritmo de análise de lacunas (`lib/career/gap-analysis.ts`)

Catálogo (`lib/career/catalog.ts`): cada competência tem um id único, compartilhado entre
perfis e autoavaliação. Cada perfil lista suas competências com:
`w` peso (normalizado no código: `w_i / Σw`), `m` proficiência mínima (1–5),
`d` prioridade de mercado (1–3). Um teste valida o catálogo.

Curadoria (`docs/curadoria-competencias.pdf`): 6 perfis, 9 a 10 competências cada, nível
estágio/júnior. Por decisão da revisão, todas as competências de um perfil usam valores
iguais (`equalSkills`: `w = 1/n`, `m = 3`, `d = 2`). Não reutilizar ids removidos
(ex.: `trabalho-equipe`) — notas antigas ficam no banco com esse id.

Para cada competência `i` do perfil, com `a_i` = nota do aluno (0–5; ausente = 0):

- `gap_i = max(0, m_i − a_i)` (inteiro, em níveis)
- `gap_norm_i = gap_i / m_i`
- `urgência_i = gap_norm_i × w_i × d_i`
- `compatibilidade = 100 × Σ w_i × min(a_i / m_i, 1)`
  (invariante testado: `= 100 × (1 − Σ w_i × gap_norm_i)`)

Trilha sugerida: competências com `urgência > 0`, ordenadas por urgência desc; desempate por
`w` desc, depois `d` desc, depois id. Limitada às **5 primeiras**. As **3 primeiras** geram
a ação inicial sugerida no plano de ação.

Tipo de recomendação pelo **gap em níveis** (não pelo normalizado):

| `gap_i` | Recomendação |
|---|---|
| ≥ 3 | Curso estruturado / trilha formal |
| 2 | Projeto prático aplicado |
| 1 | Prática dirigida / mentoria pontual |

Escala da autoavaliação — cada nível aparece com sua descrição na tela:

| Nível | Descrição |
|---|---|
| 0 | Nunca tive contato |
| 1 | Conheço o conceito |
| 2 | Faço com ajuda |
| 3 | Faço sozinho, consultando referências |
| 4 | Faço com autonomia e segurança |
| 5 | Consigo ensinar e orientar outras pessoas |

Persistência: o banco guarda só os dados informados pelo aluno. Compatibilidade e trilha são
recalculadas na leitura. No Canvas, a sugestão do sistema (`suggestedSkills`) fica separada da
lista final do aluno (`skillsToDevelop`); reavaliar **não sobrescreve** a lista do aluno — o
dashboard mostra "há novas sugestões" quando diferem.

## Convenções

- Server Components por padrão; `"use client"` só para interatividade.
- Acesso a dados em `lib/`, nunca direto em componentes.
- Textos da interface em português.
- Identidade visual: `docs/identidade_visual_plano_de_carreira_ads.md` (verde petróleo `#0B5A48`
  dominante, roxo `#4A4165` secundário, laranja `#F58E52` só como destaque). Gradientes como
  utilitários em `app/globals.css` (`bg-grad-brand`, `bg-grad-compat`, `bg-grad-deco`).
  O Canvas do dashboard segue `docs/modelo-do-canvas.jpeg`.

## Definição de pronto

Uma tarefa só está concluída quando `npm run lint`, `npx tsc --noEmit` e `npm test` passam
e as migrations aplicam sem erro. Mudanças no algoritmo exigem testes em Vitest, incluindo o
exemplo de referência: Front-end Jr. → compatibilidade 70%, JavaScript antes de HTML/CSS,
Comunicação fora da trilha.

## Pendências

- E2E cobre só rotas públicas, redirecionamentos e validação do login. O fluxo completo da
  jornada precisa de um usuário de teste no Supabase.
