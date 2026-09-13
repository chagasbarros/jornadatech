"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Plus, Sparkles, Trash2, X } from "lucide-react";

type Acao = {
  id: string;
  objetivo: string;
  acao: string;
  prazo: string;
  concluida: boolean;
  sugerida?: boolean;
};

const ACOES_INICIAIS: Acao[] = [
  {
    id: "1",
    objetivo: "Fechar a lacuna prioritária em JavaScript",
    acao: "Fazer um curso estruturado de JavaScript para iniciantes",
    prazo: "8 semanas",
    concluida: false,
    sugerida: true,
  },
  {
    id: "2",
    objetivo: "Reforçar HTML / CSS",
    acao: "Reconstruir um layout existente do zero, como prática",
    prazo: "3 semanas",
    concluida: false,
    sugerida: true,
  },
];

export default function PlanoDeAcaoPage() {
  const router = useRouter();
  const [acoes, setAcoes] = useState<Acao[]>(ACOES_INICIAIS);
  const [mostrarFechamento, setMostrarFechamento] = useState(false);
  const [proximoPasso, setProximoPasso] = useState("");
  const [satisfacao, setSatisfacao] = useState<number | null>(null);

  function alternarConcluida(id: string) {
    setAcoes((atual) =>
      atual.map((a) => (a.id === id ? { ...a, concluida: !a.concluida } : a)),
    );
  }

  function removerAcao(id: string) {
    setAcoes((atual) => atual.filter((a) => a.id !== id));
  }

  function adicionarAcao() {
    setAcoes((atual) => [
      ...atual,
      {
        id: crypto.randomUUID(),
        objetivo: "",
        acao: "",
        prazo: "",
        concluida: false,
      },
    ]);
  }

  function atualizarCampo(
    id: string,
    campo: "objetivo" | "acao" | "prazo",
    valor: string,
  ) {
    setAcoes((atual) =>
      atual.map((a) => (a.id === id ? { ...a, [campo]: valor } : a)),
    );
  }

  function finalizarJornada() {
    // Sem backend nesta entrega — apenas encaminha ao painel.
    router.push("/panel");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#16231C] md:text-[34px]">
        Seu plano de ação
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#4B5B52]">
        Transformamos sua trilha em ações com prazo. Ajuste como quiser antes de
        concluir.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-[#DCE6DA]">
        <table className="w-full border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-[#DCE6DA] bg-white/60 text-[#6C7A6F]">
              <th className="w-8 px-4 py-3 font-medium" />
              <th className="px-2 py-3 font-medium">Objetivo</th>
              <th className="px-2 py-3 font-medium">Ação</th>
              <th className="w-32 px-2 py-3 font-medium">Prazo</th>
              <th className="w-10 px-2 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE6DA] bg-white/40">
            {acoes.map((a) => (
              <tr key={a.id} className="align-top">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => alternarConcluida(a.id)}
                    aria-pressed={a.concluida}
                    aria-label="Marcar ação como concluída"
                    className={
                      "flex h-5 w-5 items-center justify-center rounded-full border transition-colors " +
                      (a.concluida
                        ? "border-[#2F6B45] bg-[#2F6B45] text-[#F6F2E7]"
                        : "border-[#B9C9BE]")
                    }
                  >
                    {a.concluida && <Check className="h-3 w-3" aria-hidden />}
                  </button>
                </td>
                <td className="px-2 py-2.5">
                  <input
                    value={a.objetivo}
                    onChange={(e) =>
                      atualizarCampo(a.id, "objetivo", e.target.value)
                    }
                    placeholder="Objetivo"
                    className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-[13px] outline-none transition-colors focus:border-[#2F6B45] focus:bg-white"
                  />
                  {a.sugerida && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#26582F]">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      Sugerido pela sua trilha
                    </span>
                  )}
                </td>
                <td className="px-2 py-2.5">
                  <input
                    value={a.acao}
                    onChange={(e) =>
                      atualizarCampo(a.id, "acao", e.target.value)
                    }
                    placeholder="O que você vai fazer"
                    className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-[13px] outline-none transition-colors focus:border-[#2F6B45] focus:bg-white"
                  />
                </td>
                <td className="px-2 py-2.5">
                  <input
                    value={a.prazo}
                    onChange={(e) =>
                      atualizarCampo(a.id, "prazo", e.target.value)
                    }
                    placeholder="Ex.: 4 semanas"
                    className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-[13px] outline-none transition-colors focus:border-[#2F6B45] focus:bg-white"
                  />
                </td>
                <td className="px-2 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => removerAcao(a.id)}
                    aria-label="Remover ação"
                    className="rounded-lg p-1.5 text-[#8C978F] hover:bg-[#EDE9DC] hover:text-[#16231C]"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={adicionarAcao}
          className="flex w-full items-center gap-2 border-t border-[#DCE6DA] bg-white/40 px-4 py-3 text-[13px] font-medium text-[#354238] transition-colors hover:bg-white/70"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Adicionar ação
        </button>
      </div>

      <div className="mt-14 flex items-center justify-between">
        <Link
          href="/onboarding/canvas"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4B5B52] transition-colors hover:text-[#16231C]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar
        </Link>
        <button
          type="button"
          onClick={() => setMostrarFechamento(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-6 py-3 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F]"
        >
          Concluir jornada
        </button>
      </div>

      {/* Tela 11 — feedback e próximo passo, como overlay de fechamento */}
      {mostrarFechamento && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E2A20]/50 px-6">
          <div className="w-full max-w-md rounded-[28px] bg-[#F6F2E7] p-7">
            <div className="flex items-start justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-[22px] leading-tight text-[#16231C]">
                Antes de continuar
              </h2>
              <button
                type="button"
                onClick={() => setMostrarFechamento(false)}
                aria-label="Fechar"
                className="rounded-full p-1.5 text-[#8C978F] hover:bg-[#EDE9DC] hover:text-[#16231C]"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <label
              htmlFor="proximo-passo"
              className="mb-1.5 mt-5 block text-[13px] font-medium text-[#354238]"
            >
              Minha próxima ação é...
            </label>
            <textarea
              id="proximo-passo"
              rows={2}
              value={proximoPasso}
              onChange={(e) => setProximoPasso(e.target.value)}
              placeholder="Ex.: começar o curso de JavaScript nesta semana"
              className="w-full resize-none rounded-xl border border-[#DCE6DA] bg-white/70 p-3 text-[14px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
            />

            <p className="mb-2 mt-5 text-[13px] font-medium text-[#354238]">
              O que achou dessa experiência?
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSatisfacao(n)}
                  aria-pressed={satisfacao === n}
                  className={
                    "flex h-10 w-10 items-center justify-center rounded-full border text-[14px] font-semibold transition-colors " +
                    (satisfacao === n
                      ? "border-[#2F6B45] bg-[#2F6B45] text-[#F6F2E7]"
                      : "border-[#DCE6DA] bg-white/50 text-[#354238] hover:border-[#B9C9BE]")
                  }
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={finalizarJornada}
              className="mt-7 w-full rounded-full bg-[#2F6B45] py-3 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F]"
            >
              Enviar e ver meu painel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
