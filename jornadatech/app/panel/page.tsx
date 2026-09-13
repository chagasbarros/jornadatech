import Link from "next/link";
import {
  RefreshCcw,
  PlusCircle,
  NotebookPen,
  ListTodo,
  ArrowRight,
} from "lucide-react";

// As fontes já vêm do layout raiz (app/layout.tsx).

// Dados de exemplo — em produção viriam do histórico de autoavaliações
// (seção 5, "Autoavaliação... permite histórico") e do plano de ação salvo.
const EVOLUCAO = [
  { rotulo: "Jan", valor: 42 },
  { rotulo: "Fev", valor: 48 },
  { rotulo: "Mar", valor: 55 },
  { rotulo: "Abr", valor: 61 },
  { rotulo: "Mai", valor: 70 },
];

const ACOES_PLANO = [
  { objetivo: "Fechar a lacuna prioritária em JavaScript", concluida: false },
  { objetivo: "Reforçar HTML / CSS", concluida: false },
  { objetivo: "Manter o nível em Comunicação", concluida: true },
];

export default function PainelPage() {
  const concluidas = ACOES_PLANO.filter((a) => a.concluida).length;
  const maiorValor = Math.max(...EVOLUCAO.map((e) => e.valor));

  return (
    <div className="min-h-screen bg-[#F6F2E7] text-[#16231C]">
      <header className="border-b border-[#DCE6DA] bg-[#F6F2E7]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6B45] text-sm font-semibold text-[#F6F2E7] font-[family-name:var(--font-display)]">
              TC
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Tech Career Canvas
            </span>
          </Link>
          <span className="text-[13px] text-[#6C7A6F]">Imprimir em PDF</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <h1 className="font-[family-name:var(--font-display)] text-[30px] leading-tight tracking-tight text-[#16231C] md:text-[36px]">
          Bem-vindo de volta
        </h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#4B5B52]">
          Aqui você acompanha sua evolução e retoma qualquer parte do seu Canvas
          de Carreira, sem precisar refazer tudo do início.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          {/* Evolução da compatibilidade */}
          <div className="rounded-[28px] border border-[#DCE6DA] bg-white/50 p-6 md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-[#6C7A6F]">
                  Evolução da compatibilidade
                </p>
                <p className="text-[14px] font-semibold text-[#16231C]">
                  Desenvolvimento de Software
                </p>
              </div>
              <p className="font-[family-name:var(--font-display)] text-[32px] leading-none text-[#2F6B45]">
                {EVOLUCAO[EVOLUCAO.length - 1].valor}%
              </p>
            </div>

            <div className="mt-8 flex h-32 items-end gap-4">
              {EVOLUCAO.map((ponto) => (
                <div
                  key={ponto.rotulo}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div className="flex h-24 w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-[#6FA37E]"
                      style={{ height: `${(ponto.valor / maiorValor) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#8C978F]">
                    {ponto.rotulo}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/onboarding/autoavaliacao"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2F6B45] transition-colors hover:text-[#26582F]"
            >
              <RefreshCcw className="h-3.5 w-3.5" aria-hidden />
              Refazer autoavaliação
            </Link>
          </div>

          {/* Status do plano de ação */}
          <div className="rounded-[28px] border border-[#DCE6DA] bg-white/50 p-6 md:p-7">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-[#6C7A6F]">
                Seu plano de ação
              </p>
              <span className="text-[13px] font-semibold text-[#16231C]">
                {concluidas} de {ACOES_PLANO.length}
              </span>
            </div>

            <ul className="mt-4 space-y-3">
              {ACOES_PLANO.map((a) => (
                <li key={a.objetivo} className="flex items-start gap-2.5">
                  <span
                    className={
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border " +
                      (a.concluida
                        ? "border-[#2F6B45] bg-[#2F6B45]"
                        : "border-[#B9C9BE]")
                    }
                  />
                  <span
                    className={
                      "text-[13px] leading-snug " +
                      (a.concluida
                        ? "text-[#8C978F] line-through"
                        : "text-[#354238]")
                    }
                  >
                    {a.objetivo}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/onboarding/plano-de-acao"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2F6B45] transition-colors hover:text-[#26582F]"
            >
              <ListTodo className="h-3.5 w-3.5" aria-hidden />
              Ver plano completo
            </Link>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Link
            href="/onboarding/areas-interesse"
            className="flex items-center justify-between rounded-2xl border border-[#DCE6DA] bg-white/50 p-5 transition-colors hover:border-[#B9C9BE]"
          >
            <span className="flex items-center gap-3 text-[14px] font-semibold text-[#16231C]">
              <PlusCircle className="h-4 w-4 text-[#26582F]" aria-hidden />
              Comparar nova área
            </span>
            <ArrowRight className="h-4 w-4 text-[#8C978F]" aria-hidden />
          </Link>

          <Link
            href="/onboarding/canvas"
            className="flex items-center justify-between rounded-2xl border border-[#DCE6DA] bg-white/50 p-5 transition-colors hover:border-[#B9C9BE]"
          >
            <span className="flex items-center gap-3 text-[14px] font-semibold text-[#16231C]">
              <NotebookPen className="h-4 w-4 text-[#26582F]" aria-hidden />
              Editar meu Canvas
            </span>
            <ArrowRight className="h-4 w-4 text-[#8C978F]" aria-hidden />
          </Link>

          <Link
            href="/onboarding/resultado"
            className="flex items-center justify-between rounded-2xl border border-[#DCE6DA] bg-white/50 p-5 transition-colors hover:border-[#B9C9BE]"
          >
            <span className="flex items-center gap-3 text-[14px] font-semibold text-[#16231C]">
              <RefreshCcw className="h-4 w-4 text-[#26582F]" aria-hidden />
              Ver resultado atual
            </span>
            <ArrowRight className="h-4 w-4 text-[#8C978F]" aria-hidden />
          </Link>
        </div>
      </main>
    </div>
  );
}
