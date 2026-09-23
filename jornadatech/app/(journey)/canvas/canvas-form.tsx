"use client";

import { useState, useTransition } from "react";
import { Plus, Sparkles, X } from "lucide-react";
import { StepFooter } from "@/components/step-footer";
import type { CanvasInput } from "@/lib/validation/career";
import { saveCanvas } from "./actions";

const INPUT_CLASS =
  "w-full rounded-xl border border-[#DCE6DA] bg-white/70 px-4 py-3 text-[14px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]";

const TEXTAREA_CLASS =
  "w-full resize-none rounded-xl border border-[#DCE6DA] bg-white/70 p-3 text-[14px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]";

function BlocoCanvas({
  titulo,
  descricao,
  htmlFor,
  children,
}: {
  titulo: string;
  descricao?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#DCE6DA] bg-white/50 p-5">
      <label
        htmlFor={htmlFor}
        className="block text-[14px] font-semibold text-[#16231C]"
      >
        {titulo}
      </label>
      {descricao && (
        <p className="mt-1 text-[13px] text-[#6C7A6F]">{descricao}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}

type Props = {
  editing: boolean;
  summary: React.ReactNode;
  /** Nomes das competências da trilha sugerida atual. */
  suggested: string[];
  initial: CanvasInput;
};

export default function CanvasForm({
  editing,
  summary,
  suggested,
  initial,
}: Props) {
  const [form, setForm] = useState(initial);
  const [novaCompetencia, setNovaCompetencia] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const competencias = form.skillsToDevelop;
  const sugestoesFora = suggested.filter((s) => !competencias.includes(s));

  function set<K extends keyof CanvasInput>(campo: K, valor: CanvasInput[K]) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function adicionarCompetencia(nome: string) {
    const valor = nome.trim();
    if (valor && !competencias.includes(valor)) {
      set("skillsToDevelop", [...competencias, valor]);
    }
  }

  function salvar() {
    setError(null);
    startTransition(async () => {
      const result = await saveCanvas(form);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mt-10 font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#16231C] md:text-[34px]">
        Seu resultado
      </h1>
      <div className="mt-6">{summary}</div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-[24px] leading-tight tracking-tight text-[#16231C] md:text-[28px]">
        Seu Canvas de Carreira
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <BlocoCanvas
            titulo="Qual seu objetivo profissional"
            descricao="Ex.: Atuar como desenvolvedor(a) front-end júnior em até 1 ano."
            htmlFor="objetivo"
          >
            <input
              id="objetivo"
              type="text"
              maxLength={300}
              value={form.objective}
              onChange={(e) => set("objective", e.target.value)}
              className={INPUT_CLASS}
            />
          </BlocoCanvas>
        </div>

        <BlocoCanvas titulo="Competências a desenvolver" htmlFor="nova-competencia">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#BFE3CE]/50 px-3 py-1 text-[12px] font-medium text-[#26582F]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Sugerido com base no seu resultado
          </div>
          <div className="flex flex-wrap gap-2">
            {competencias.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE6DA] bg-white/70 py-1.5 pl-3 pr-2 text-[13px] font-medium text-[#354238]"
              >
                {c}
                <button
                  type="button"
                  onClick={() =>
                    set(
                      "skillsToDevelop",
                      competencias.filter((x) => x !== c),
                    )
                  }
                  aria-label={`Remover ${c}`}
                  className="rounded-full p-0.5 text-[#8C978F] hover:bg-[#EDE9DC] hover:text-[#16231C]"
                >
                  <X className="h-3 w-3" aria-hidden />
                </button>
              </span>
            ))}
          </div>

          {sugestoesFora.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {sugestoesFora.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => adicionarCompetencia(s)}
                  className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#6FA37E] px-3 py-1.5 text-[12px] font-medium text-[#26582F] hover:bg-[#BFE3CE]/30"
                >
                  <Plus className="h-3 w-3" aria-hidden />
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="mt-3 flex gap-2">
            <input
              id="nova-competencia"
              type="text"
              maxLength={80}
              value={novaCompetencia}
              onChange={(e) => setNovaCompetencia(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  adicionarCompetencia(novaCompetencia);
                  setNovaCompetencia("");
                }
              }}
              placeholder="Adicionar outra competência"
              className="min-w-0 flex-1 rounded-xl border border-[#DCE6DA] bg-white/70 px-4 py-2.5 text-[13px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
            />
            <button
              type="button"
              onClick={() => {
                adicionarCompetencia(novaCompetencia);
                setNovaCompetencia("");
              }}
              className="rounded-xl border border-[#DCE6DA] px-4 text-[13px] font-medium text-[#354238] transition-colors hover:border-[#B9C9BE]"
            >
              Adicionar
            </button>
          </div>
        </BlocoCanvas>

        <BlocoCanvas
          titulo="Networking"
          descricao="Pessoas, comunidades ou eventos que podem te ajudar nessa jornada."
          htmlFor="networking"
        >
          <textarea
            id="networking"
            rows={3}
            maxLength={2000}
            value={form.networking}
            onChange={(e) => set("networking", e.target.value)}
            className={TEXTAREA_CLASS}
          />
        </BlocoCanvas>

        <BlocoCanvas
          titulo="Experiências e projetos"
          descricao="Cursos, projetos pessoais, estágios ou trabalhos voluntários."
          htmlFor="experiencias"
        >
          <textarea
            id="experiencias"
            rows={4}
            maxLength={2000}
            value={form.experiences}
            onChange={(e) => set("experiences", e.target.value)}
            className={TEXTAREA_CLASS}
          />
        </BlocoCanvas>

        <BlocoCanvas
          titulo="Portfólio"
          descricao="Um link (GitHub, Behance, site pessoal) ou o que pretende criar."
          htmlFor="portfolio"
        >
          <textarea
            id="portfolio"
            rows={4}
            maxLength={2000}
            value={form.portfolio}
            onChange={(e) => set("portfolio", e.target.value)}
            className={TEXTAREA_CLASS}
          />
        </BlocoCanvas>
      </div>

      <StepFooter
        backHref="/self-evaluation"
        editing={editing}
        label="Continuar para o plano de ação"
        pending={pending}
        disabled={!form.objective.trim()}
        error={error}
        onSubmit={salvar}
      />
    </div>
  );
}
