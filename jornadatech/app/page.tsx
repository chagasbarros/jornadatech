import type { Metadata } from "next";
import {
  UserPlus,
  ListChecks,
  Target,
  Compass,
  ClipboardCheck,
  GraduationCap,
  TrendingUp,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Hourglass,
  Ticket,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Jornada tech — do autoconhecimento ao plano de carreira em tecnologia",
  description:
    "Descubra a distância entre suas competências atuais e a carreira de tecnologia que você quer seguir. Monte seu Canvas de carreira e concorra a um ingresso do Evento Conexão.",
};

const dores = [
  {
    icon: HelpCircle,
    titulo: "Não sei por onde começar",
    texto:
      "Front-end, dados, QA, cibersegurança... a tecnologia tem trilhas demais e nenhuma resposta pronta sobre qual é a sua.",
  },
  {
    icon: AlertTriangle,
    titulo: "Medo de escolher errado",
    texto:
      "Investir tempo estudando algo que talvez não combine com você é a principal razão para adiar a decisão.",
  },
  {
    icon: Hourglass,
    titulo: "Sensação de estar perdendo tempo",
    texto:
      "Sem saber o que falta desenvolver, é fácil estudar sem direção e sentir que o esforço não está levando a lugar nenhum.",
  },
];

const passos = [
  {
    numero: "1",
    icon: UserPlus,
    titulo: "Conte quem você é",
    texto:
      "Cadastro rápido, seu contexto atual (ensino médio, início em ADS ou transição de carreira) e até 3 áreas de tecnologia que despertam seu interesse.",
  },
  {
    numero: "2",
    icon: ListChecks,
    titulo: "Avalie suas competências",
    texto:
      "Uma autoavaliação simples, de 0 a 5, para competências técnicas e comportamentais — sem jargão, com espaço para citar cursos e projetos como evidência.",
  },
  {
    numero: "3",
    icon: Target,
    titulo: "Veja sua compatibilidade",
    texto:
      "O sistema compara seu perfil com o perfil profissional escolhido e mostra, em um número só, o quanto você já atende ao que essa carreira exige.",
  },
  {
    numero: "4",
    icon: Compass,
    titulo: "Receba uma trilha priorizada",
    texto:
      "As lacunas mais urgentes aparecem primeiro — não as maiores em números absolutos, mas as que mais pesam para a carreira escolhida.",
  },
  {
    numero: "5",
    icon: ClipboardCheck,
    titulo: "Monte seu plano de ação",
    texto:
      "Cada lacuna vira uma recomendação concreta — curso, projeto prático ou reforço — com prazo e indicador de conclusão.",
  },
];

const metodologia = [
  {
    autor: "Donald Super",
    foco: "Estágios de desenvolvimento de carreira: a carreira é um processo ao longo da vida, não uma escolha única.",
    aplicacao:
      'As telas "Quem sou eu" e "Áreas de interesse" situam você no seu momento atual antes de sugerir qualquer caminho.',
  },
  {
    autor: "Edgar Schein",
    foco: "Âncoras de carreira: o núcleo estável de talentos, motivos e valores que você não abriria mão.",
    aplicacao:
      "A autoavaliação captura esse núcleo, e a compatibilidade calculada respeita o que realmente importa para você.",
  },
  {
    autor: "Alexander Osterwalder",
    foco: "Business Model Canvas adaptado à pessoa: nove blocos que organizam sua proposta de valor em uma página só.",
    aplicacao:
      "Seu Canvas de Carreira final segue essa mesma estrutura, já pré-preenchido com o resultado da comparação de perfil.",
  },
];

export default function Home() {
  return (
    <div
      className={`font-[family-name:var(--font-display)/var(--font-body)] bg-[#F6F2E7] text-[#16231C] antialiased`}
    >
      {/* ---------- Navegação ---------- */}
      <header className="sticky top-0 z-50 border-b border-[#DCE6DA] bg-[#F6F2E7]/90 backdrop-blur">
        <input type="checkbox" id="nav-toggle" className="peer hidden" />

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6B45] text-sm font-semibold text-[#F6F2E7] font-[family-name:var(--font-display)]">
              JT
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Jornada Tech
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-[15px] text-[#354238] md:flex">
            <a
              href="#como-funciona"
              className="transition-colors hover:text-[#16231C]"
            >
              Como funciona
            </a>
            <a href="#prova" className="transition-colors hover:text-[#16231C]">
              Por que confiar
            </a>
            <a
              href="#sorteio"
              className="transition-colors hover:text-[#16231C]"
            >
              Evento Conexão
            </a>
          </nav>

          <Link
            href="/login"
            className="hidden rounded-full bg-[#2F6B45] px-5 py-2.5 text-[14px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F] md:inline-flex"
          >
            Criar meu Canvas
          </Link>

          <label
            htmlFor="nav-toggle"
            aria-label="Abrir menu"
            className="flex cursor-pointer items-center justify-center rounded-full p-2 text-[#16231C] md:hidden"
          >
            <Menu className="h-6 w-6 peer-checked:hidden" aria-hidden />
          </label>
        </div>

        {/* Menu mobile — controlado só por CSS (peer), sem JavaScript */}
        <div className="hidden flex-col gap-1 border-t border-[#DCE6DA] px-6 py-4 peer-checked:flex md:hidden">
          <label
            htmlFor="nav-toggle"
            className="mb-2 flex cursor-pointer items-center justify-end text-[#16231C]"
          >
            <X className="h-5 w-5" aria-hidden />
          </label>
          <a href="#como-funciona" className="py-2 text-[15px] text-[#354238]">
            Como funciona
          </a>
          <a href="#prova" className="py-2 text-[15px] text-[#354238]">
            Por que confiar
          </a>
          <a href="#sorteio" className="py-2 text-[15px] text-[#354238]">
            Evento Conexão
          </a>
          <Link
            href="/login"
            className="mt-2 rounded-full bg-[#2F6B45] px-5 py-2.5 text-center text-[14px] font-semibold text-[#F6F2E7]"
          >
            Criar meu Canvas
          </Link>
        </div>
      </header>

      <main>
        {/* ---------- Dor / problema ---------- */}
        <section className="border-t border-[#DCE6DA] bg-white/40 py-10 md:py-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-lg">
              <h2 className="font-[family-name:var(--font-display)] text-[32px] leading-tight tracking-tight text-[#16231C] md:text-[40px]">
                Se você se reconhece em algum desses pontos, o Jornada Tech foi
                feito pra você
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {dores.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.titulo}
                    className="rounded-2xl border border-[#DCE6DA] bg-[#F6F2E7] p-7"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#BFE3CE]/60">
                      <Icon className="h-5 w-5 text-[#26582F]" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-[16px] font-semibold text-[#16231C]">
                      {d.titulo}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#4B5B52]">
                      {d.texto}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- Como funciona ---------- */}
        <section id="como-funciona" className="py-20 md:py-5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-lg">
              <h2 className="font-[family-name:var(--font-display)] text-[32px] leading-tight tracking-tight text-[#16231C] md:text-[40px]">
                Da dúvida sobre carreira a um plano com prazo
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#4B5B52]">
                Cinco etapas simples, pensadas para quem ainda não tem clareza
                sobre áreas de tecnologia — sem exigir conhecimento técnico
                prévio para começar.
              </p>
            </div>

            <ol className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-5">
              {passos.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.numero} className="flex flex-col md:block">
                    <div className="flex items-center gap-3 md:block">
                      <span className="font-[family-name:var(--font-display)] text-[15px] text-[#6FA37E]">
                        {p.numero}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#BFE3CE]/60 md:mt-3">
                        <Icon className="h-5 w-5 text-[#26582F]" aria-hidden />
                      </div>
                    </div>
                    <h3 className="mt-4 text-[16px] font-semibold text-[#16231C]">
                      {p.titulo}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#4B5B52]">
                      {p.texto}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ---------- Prova: metodologia ---------- */}
        <section
          id="prova"
          className="border-t border-[#DCE6DA] bg-white/40 py-20 md:py-10"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-lg">
              <h2 className="font-[family-name:var(--font-display)] text-[32px] leading-tight tracking-tight text-[#16231C] md:text-[40px]">
                Não é achismo — é método
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#4B5B52]">
                O Jornada Tech traduz em produto digital um Canvas de Carreira
                fundamentado em três referenciais consolidados: Donald Super,
                Edgar Schein e Alexander Osterwalder.
              </p>
            </div>

            <div className="mt-14 overflow-x-auto rounded-2xl border border-[#DCE6DA]">
              <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#DCE6DA] bg-[#F6F2E7] text-[#6C7A6F]">
                    <th className="px-6 py-4 font-medium">Referencial</th>
                    <th className="px-6 py-4 font-medium">Conceito central</th>
                    <th className="px-6 py-4 font-medium">
                      Onde aparece no Jornada Tech
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE6DA] bg-white/60">
                  {metodologia.map((m) => (
                    <tr key={m.autor}>
                      <td className="px-6 py-5 align-top font-semibold text-[#16231C]">
                        {m.autor}
                      </td>
                      <td className="px-6 py-5 align-top text-[#4B5B52]">
                        {m.foco}
                      </td>
                      <td className="px-6 py-5 align-top text-[#4B5B52]">
                        {m.aplicacao}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---------- Algoritmo ---------- */}
        <section
          id="algoritmo"
          className="border-t border-[#DCE6DA] bg-[#0E2A20] py-20 text-[#EAF3EC] md:py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-14 md:grid-cols-2">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[32px] leading-tight tracking-tight md:text-[40px]">
                  Um cálculo simples, não uma caixa-preta
                </h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#C7D6CC]">
                  Cada competência do perfil-alvo tem um peso, uma proficiência
                  mínima e uma prioridade de mercado. A diferença entre o que
                  você tem e o que é exigido vira uma urgência — para que a
                  trilha sugerida mostre primeiro o que mais importa, não apenas
                  o que está mais distante.
                </p>

                <dl className="mt-10 space-y-6">
                  <div className="border-l-2 border-[#6FA37E] pl-5">
                    <dt className="text-[13px] text-[#9FC2AC]">
                      Urgência de uma competência
                    </dt>
                    <dd className="mt-1 font-[family-name:var(--font-display)] text-[17px] italic">
                      gap normalizado × peso × prioridade de mercado
                    </dd>
                  </div>
                  <div className="border-l-2 border-[#6FA37E] pl-5">
                    <dt className="text-[13px] text-[#9FC2AC]">
                      Compatibilidade geral
                    </dt>
                    <dd className="mt-1 font-[family-name:var(--font-display)] text-[17px] italic">
                      100 × soma ponderada de (atual ÷ mínimo exigido)
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7">
                <p className="text-[13px] text-[#9FC2AC]">
                  Exemplo — perfil Desenvolvedor Front-end Jr.
                </p>
                <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-white/10 text-[#9FC2AC]">
                        <th className="px-4 py-3 font-medium">Competência</th>
                        <th className="px-4 py-3 font-medium">Mínimo</th>
                        <th className="px-4 py-3 font-medium">Atual</th>
                        <th className="px-4 py-3 font-medium">Urgência</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="px-4 py-3">HTML / CSS</td>
                        <td className="px-4 py-3">4</td>
                        <td className="px-4 py-3">3</td>
                        <td className="px-4 py-3">0,10</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">JavaScript</td>
                        <td className="px-4 py-3">4</td>
                        <td className="px-4 py-3">2</td>
                        <td className="px-4 py-3 font-semibold text-[#6FA37E]">
                          0,75
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Comunicação</td>
                        <td className="px-4 py-3">3</td>
                        <td className="px-4 py-3">3</td>
                        <td className="px-4 py-3">0,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-5 text-[13px] leading-relaxed text-[#C7D6CC]">
                  Resultado: 70% de compatibilidade geral. A trilha sugerida
                  prioriza JavaScript, depois HTML/CSS — Comunicação não entra
                  na trilha, pois já atende ao mínimo esperado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Sorteio: Evento Conexão ---------- */}
        <section id="sorteio" className="py-20 md:py-10">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-[32px] leading-tight tracking-tight text-[#16231C] md:text-[40px]">
              Complete seu Canvas e concorra a um ingresso do Evento Conexão
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#4B5B52]">
              Todo aluno que preencher o Canvas de Carreira até o fim entra
              automaticamente no sorteio de ingressos para o Evento Conexão. É
              mais um motivo para não deixar seu plano de carreira para depois.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-7 py-3.5 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F]"
            >
              Quero concorrer ao ingresso
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-[#DCE6DA] py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2F6B45] text-[12px] font-semibold text-[#F6F2E7] font-[family-name:var(--font-display)]">
              JT
            </span>
            <span className="text-[14px] font-medium text-[#354238]">
              Jornada Tech
            </span>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-[#6C7A6F]">
            <GraduationCap className="h-4 w-4" aria-hidden />
            <span>Projeto de extensão do Curso de ADS.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
