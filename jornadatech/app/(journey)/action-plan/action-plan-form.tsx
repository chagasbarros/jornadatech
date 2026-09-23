"use client";

import { useState, useTransition } from "react";
import { Check, Plus, Sparkles, Trash2, X } from "lucide-react";
import { StepFooter } from "@/components/step-footer";
import { HORIZONS, type GoalInput } from "@/lib/validation/career";
import { saveActionPlan } from "./actions";

type Meta = GoalInput & { key: string };

// Chave local só para o React; não é gravada.
let seq = 0;
const nextKey = () => `meta-${seq++}`;

const FIELD_CLASS =
  "w-full rounded-lg border border-[#DCE6DA] bg-white/70 px-3 py-2 text-[13px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:bg-white";

function novaMeta(): Meta {
  return {
    key: nextKey(),
    horizon: "SHORT",
    objective: "",
    action: "",
    deadline: "",
    indicator: "",
    done: false,
    suggested: false,
  };
}

function metaCompleta(m: Meta) {
  return [m.objective, m.action, m.deadline, m.indicator].every((v) => v.trim());
}

type Props = {
  editing: boolean;
  initialGoals: GoalInput[];
};

export default function ActionPlanForm({ editing, initialGoals }: Props) {
  const [metas, setMetas] = useState<Meta[]>(() =>
    initialGoals.map((g) => ({ ...g, key: nextKey() })),
  );
  const [mostrarFechamento, setMostrarFechamento] = useState(false);
  const [proximoPasso, setProximoPasso] = useState("");
  const [satisfacao, setSatisfacao] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const podeSalvar = metas.length > 0 && metas.every(metaCompleta);

  function atualizar<K extends keyof GoalInput>(
    key: string,
    campo: K,
    valor: GoalInput[K],
  ) {
    setMetas((atual) =>
      atual.map((m) => (m.key === key ? { ...m, [campo]: valor } : m)),
    );
  }

  function salvar(comFeedback: boolean) {
    setError(null);
    startTransition(async () => {
      const result = await saveActionPlan({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        goals: metas.map(({ key, ...g }) => g),
        feedback: comFeedback
          ? { nextAction: proximoPasso, satisfaction: satisfacao }
          : null,
      });
      if (result?.error) {
        setError(result.error);
        setMostrarFechamento(false);
      }
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mt-10 font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#16231C] md:text-[34px]">
        Seu plano de ação
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#4B5B52]">
        Transformamos sua trilha em metas de curto e médio prazo. Cada meta
        tem um prazo e um indicador para você saber quando chegou lá.
      </p>

      <div className="mt-8 space-y-3">
        {metas.map((m, i) => (
          <div
            key={m.key}
            className="rounded-2xl border border-[#DCE6DA] bg-white/50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => atualizar(m.key, "done", !m.done)}
                  aria-pressed={m.done}
                  aria-label={`Marcar meta ${i + 1} como concluída`}
                  className={
                    "flex h-5 w-5 items-center justify-center rounded-full border transition-colors " +
                    (m.done
                      ? "border-[#2F6B45] bg-[#2F6B45] text-[#F6F2E7]"
                      : "border-[#B9C9BE]")
                  }
                >
                  {m.done && <Check className="h-3 w-3" aria-hidden />}
                </button>
                <select
                  value={m.horizon}
                  onChange={(e) =>
                    atualizar(
                      m.key,
                      "horizon",
                      e.target.value as GoalInput["horizon"],
                    )
                  }
                  aria-label="Horizonte"
                  className="rounded-full border border-[#DCE6DA] bg-white/70 px-3 py-1 text-[12px] font-medium text-[#354238] outline-none focus:border-[#2F6B45]"
                >
                  {HORIZONS.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.label}
                    </option>
                  ))}
                </select>
                {m.suggested && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#26582F]">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Sugerido pela sua trilha
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  setMetas((atual) => atual.filter((x) => x.key !== m.key))
                }
                aria-label={`Remover meta ${i + 1}`}
                className="rounded-lg p-1.5 text-[#8C978F] hover:bg-[#EDE9DC] hover:text-[#16231C]"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <input
                value={m.objective}
                maxLength={200}
                onChange={(e) => atualizar(m.key, "objective", e.target.value)}
                placeholder="Objetivo"
                aria-label="Objetivo"
                className={FIELD_CLASS}
              />
              <input
                value={m.action}
                maxLength={300}
                onChange={(e) => atualizar(m.key, "action", e.target.value)}
                placeholder="O que você vai fazer"
                aria-label="Ação"
                className={FIELD_CLASS}
              />
              <input
                value={m.deadline}
                maxLength={60}
                onChange={(e) => atualizar(m.key, "deadline", e.target.value)}
                placeholder="Prazo (ex.: 4 semanas)"
                aria-label="Prazo"
                className={FIELD_CLASS}
              />
              <input
                value={m.indicator}
                maxLength={200}
                onChange={(e) => atualizar(m.key, "indicator", e.target.value)}
                placeholder="Indicador (como vou saber que cheguei lá?)"
                aria-label="Indicador"
                className={FIELD_CLASS}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setMetas((atual) => [...atual, novaMeta()])}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#B9C9BE] px-4 py-3 text-[13px] font-medium text-[#354238] transition-colors hover:bg-white/50"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Adicionar meta
        </button>
      </div>

      {!podeSalvar && metas.length > 0 && (
        <p className="mt-3 text-[12px] text-[#6C7A6F]">
          Preencha objetivo, ação, prazo e indicador de todas as metas.
        </p>
      )}

      <StepFooter
        backHref="/canvas"
        editing={editing}
        label="Concluir jornada"
        pending={pending}
        disabled={!podeSalvar}
        error={error}
        onSubmit={() =>
          editing ? salvar(false) : setMostrarFechamento(true)
        }
      />

      {mostrarFechamento && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fechamento-titulo"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E2A20]/50 px-6"
        >
          <div className="w-full max-w-md rounded-[28px] bg-[#F6F2E7] p-7">
            <div className="flex items-start justify-between">
              <h2
                id="fechamento-titulo"
                className="font-[family-name:var(--font-display)] text-[22px] leading-tight text-[#16231C]"
              >
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
              maxLength={300}
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
              onClick={() => salvar(true)}
              disabled={pending}
              className="mt-7 w-full rounded-full bg-[#2F6B45] py-3 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F] disabled:opacity-60"
            >
              {pending ? "Salvando..." : "Enviar e ver meu painel"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
