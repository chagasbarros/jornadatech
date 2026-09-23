"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  /** Link de "Voltar" no primeiro acesso; após concluir, volta ao dashboard. */
  backHref?: string;
  editing: boolean;
  label: string;
  pending: boolean;
  disabled?: boolean;
  error?: string | null;
  onSubmit?: () => void;
};

export function StepFooter({
  backHref,
  editing,
  label,
  pending,
  disabled,
  error,
  onSubmit,
}: Props) {
  const back = editing ? "/dashboard" : backHref;

  return (
    <div className="mt-14">
      {error && (
        <p role="alert" className="mb-4 text-right text-[13px] text-[#B3432B]">
          {error}
        </p>
      )}
      <div className="flex items-center justify-between">
        {back ? (
          <Link
            href={back}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4B5B52] transition-colors hover:text-[#16231C]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {editing ? "Cancelar" : "Voltar"}
          </Link>
        ) : (
          <span />
        )}
        <button
          type={onSubmit ? "button" : "submit"}
          onClick={onSubmit}
          disabled={pending || disabled}
          className="inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-6 py-3 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F] disabled:cursor-not-allowed disabled:bg-[#EDE9DC] disabled:text-[#8C978F]"
        >
          {pending ? "Salvando..." : editing ? "Salvar" : label}
          {!pending && !editing && <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </div>
    </div>
  );
}
