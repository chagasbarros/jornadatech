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
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Jornada tech — do autoconhecimento ao plano de carreira em tecnologia",
  description:
    "Descubra a distância entre suas competências atuais e a carreira de tecnologia que você quer seguir. Autoavaliação, comparação de perfil e um plano de ação priorizado.",
};

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

const telas = [
  {
    numero: "05",
    titulo: "Autoavaliação de competências",
    texto:
      "Lista de competências técnicas e comportamentais por categoria, com escala de 0 a 5 e campo opcional para evidências.",
  },
  {
    numero: "06",
    titulo: "Comparação de perfil",
    texto:
      "Percentual de compatibilidade com o perfil escolhido e, se mais de um perfil for comparado, um ranking entre eles.",
  },
  {
    numero: "07",
    titulo: "Lacunas e trilha sugerida",
    texto:
      "Lista ordenada por urgência, com o tipo de recomendação — curso estruturado, projeto prático ou prática dirigida.",
  },
  {
    numero: "08",
    titulo: "Canvas de carreira",
    texto:
      "Objetivo profissional, competências a desenvolver já pré-preenchidas, experiências, portfólio e networking.",
  },
  {
    numero: "09",
    titulo: "Plano de ação",
    texto:
      "Objetivo, ação, prazo e indicador de conclusão, com sugestão automática da primeira ação por lacuna prioritária.",
  },
  {
    numero: "10",
    titulo: "Painel de acompanhamento",
    texto:
      "Linha do tempo da evolução da compatibilidade e status das ações — o aluno refaz a autoavaliação quando quiser.",
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
            <a href="#telas" className="transition-colors hover:text-[#16231C]">
              Metodologia
            </a>
            <a
              href="#algoritmo"
              className="transition-colors hover:text-[#16231C]"
            >
              O algoritmo
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
          <a href="#telas" className="py-2 text-[15px] text-[#354238]">
            Metodologia
          </a>
          <a href="#algoritmo" className="py-2 text-[15px] text-[#354238]">
            O algoritmo
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
        {/* ---------- Hero ---------- */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-[40px] leading-[1.08] tracking-tight text-[#16231C] md:text-[56px]">
                Quanto falta entre você e o profissional de tecnologia que você
                quer ser?
              </h1>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#4B5B52]">
                O Jornada Tech compara suas competências de hoje com o que uma
                carreira de tecnologia exige, e transforma essa diferença em uma
                trilha de desenvolvimento com prioridade clara — sem depender de
                sorte ou de achismo.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  id="comecar"
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-6 py-3.5 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F]"
                >
                  Criar meu Canvas de carreira
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href="#como-funciona"
                  className="text-[15px] font-semibold text-[#16231C] underline decoration-[#BFE3CE] decoration-2 underline-offset-4 transition-colors hover:decoration-[#2F6B45]"
                >
                  Ver como funciona
                </a>
              </div>

              <p className="mt-8 text-[13px] text-[#6C7A6F]">
                Gratuito para estudantes · leva cerca de 15 minutos
              </p>
            </div>

            {/* Mockup da Tela 6 — comparação de perfil, com os números do exemplo do projeto */}
            <div className="rounded-[28px] border border-[#DCE6DA] bg-white/60 p-6 shadow-[0_1px_0_#DCE6DA] md:p-7">
              <p className="text-[13px] font-medium text-[#6C7A6F]">
                Compatibilidade com
              </p>
              <p className="font-[family-name:var(--font-display)] text-[19px] text-[#16231C]">
                Desenvolvedor Front-end Jr.
              </p>

              <div className="mt-5 flex items-end gap-3">
                <span className="font-[family-name:var(--font-display)] text-[64px] leading-none text-[#2F6B45]">
                  70%
                </span>
                <span className="mb-2 text-[13px] text-[#6C7A6F]">
                  já atendido
                </span>
              </div>

              <div className="mt-7 space-y-5">
                {[
                  {
                    nome: "Comunicação",
                    atual: 60,
                    alvo: 60,
                    urgencia: "atendida",
                  },
                  {
                    nome: "HTML / CSS",
                    atual: 60,
                    alvo: 80,
                    urgencia: "baixa",
                  },
                  { nome: "JavaScript", atual: 40, alvo: 80, urgencia: "alta" },
                ].map((c) => (
                  <div key={c.nome}>
                    <div className="mb-1.5 flex items-center justify-between text-[13px]">
                      <span className="font-medium text-[#354238]">
                        {c.nome}
                      </span>
                      <span className="text-[#6C7A6F]">
                        {c.urgencia === "atendida"
                          ? "nível esperado atingido"
                          : `urgência ${c.urgencia}`}
                      </span>
                    </div>
                    <div className="relative h-2.5 rounded-full bg-[#EDE9DC]">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full border-r-2 border-[#16231C]/25"
                        style={{ width: `${c.alvo}%` }}
                      />
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-[#6FA37E]"
                        style={{ width: `${c.atual}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[12px] leading-relaxed text-[#6C7A6F]">
                Traço escuro marca o nível mínimo esperado para o perfil; verde
                marca onde você está hoje.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Como funciona ---------- */}
        <section
          id="como-funciona"
          className="border-t border-[#DCE6DA] bg-white/40 py-20 md:py-28"
        >
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

        {/* ---------- Telas ---------- */}
        <section id="telas" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-lg">
              <h2 className="font-[family-name:var(--font-display)] text-[32px] leading-tight tracking-tight text-[#16231C] md:text-[40px]">
                Metodologia validada com alunos e orientadores de carreira
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#4B5B52]">
                Nossa plataforma entrega um caminho claro, prático e como
                resultado um Canvas de carreira, que pode ser compartilhado com
                mentores, professores e colegas.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#DCE6DA] bg-[#DCE6DA] sm:grid-cols-2 lg:grid-cols-3">
              {telas.map((t) => (
                <div key={t.numero} className="bg-[#F6F2E7] p-7">
                  <h3 className="mt-2 text-[16px] font-semibold text-[#6FA37E]">
                    {t.titulo}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#4B5B52]">
                    {t.texto}
                  </p>
                </div>
              ))}
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

        {/* ---------- CTA final ---------- */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Sparkles className="mx-auto h-6 w-6 text-[#6FA37E]" aria-hidden />
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[32px] leading-tight tracking-tight text-[#16231C] md:text-[42px]">
              Seu primeiro Canvas de carreira leva menos de 15 minutos
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[#4B5B52]">
              Comece pela autoavaliação e descubra hoje o que mais vale a pena
              desenvolver esta semana.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-7 py-3.5 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F]"
            >
              Criar meu Canvas de carreira
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
            <span>
              Projeto de extensão em parceria com o curso de Análise e
              Desenvolvimento de Sistemas
            </span>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-[#6C7A6F]">
            <TrendingUp className="h-4 w-4" aria-hidden />
            <span>Painel do orientador em desenvolvimento</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
