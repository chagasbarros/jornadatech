"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  KeyRound,
} from "lucide-react";
import { OTP_LENGTH } from "@/lib/validation/login";
import { requestCode, verifyCode } from "./actions";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

type Step = "email" | "code";

// Mesmo intervalo mínimo do Supabase entre envios de código.
const RESEND_COOLDOWN_SECONDS = 60;

export default function LoginView() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (step !== "code") return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [step]);

  const cooldownLeft = cooldownUntil
    ? Math.max(0, Math.round((cooldownUntil - now) / 1000))
    : 0;

  function sendCode(targetEmail: string) {
    setError(null);
    startTransition(async () => {
      const result = await requestCode({ email: targetEmail });
      if (result?.error) {
        setError(result.error);
        return;
      }
      setStep("code");
      setCode("");
      setNow(Date.now());
      setCooldownUntil(Date.now() + RESEND_COOLDOWN_SECONDS * 1000);
    });
  }

  function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    sendCode(email.trim());
  }

  function handleCodeSubmit(e: FormEvent) {
    e.preventDefault();
    if (code.length !== OTP_LENGTH) return;

    setError(null);
    startTransition(async () => {
      // Em caso de sucesso a action redireciona e não retorna.
      const result = await verifyCode({ email: email.trim(), code });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div
      className={`${fraunces.variable} ${manrope.variable} font-[family-name:var(--font-body)] grid min-h-screen bg-[#F8F7F3] text-[#123F45] md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr]`}
    >
      {/* ---------- Painel do formulário ---------- */}
      <div className="flex flex-col justify-between px-6 py-8 md:px-14 md:py-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B5A48] text-sm font-semibold text-[#F8F7F3] font-[family-name:var(--font-display)]">
              TC
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Jornada Tech
            </span>
          </Link>

          <Link
            href="/"
            className="hidden items-center gap-1.5 text-[13px] font-medium text-[#456A70] transition-colors hover:text-[#123F45] sm:flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Voltar para a home
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm py-12">
          {step === "email" ? (
            <>
              <h1 className="font-[family-name:var(--font-display)] text-[32px] text-center leading-[1.1] tracking-tight text-[#123F45]">
                Bem-vindo
              </h1>
              <p className="mt-3 text-[15px] text-center leading-relaxed text-[#456A70]">
                Informe seu e-mail e enviaremos um código de acesso — sem
                senha para lembrar.
              </p>

              <form className="mt-9 space-y-5" onSubmit={handleEmailSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[13px] font-medium text-[#2A5359]"
                  >
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7F84]"
                      aria-hidden
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="voce@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#D7DDD8] bg-white/60 py-3 pl-11 pr-4 text-[15px] text-[#123F45] placeholder:text-[#8FA3A6] outline-none transition-colors focus:border-[#0B5A48] focus:ring-2 focus:ring-[#C5E3D9]"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[13px] text-[#B3432B]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0B5A48] py-3.5 text-[15px] font-semibold text-[#F8F7F3] transition-colors hover:bg-[#073D35] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Enviando código..." : "Enviar código"}
                  {!loading && <ArrowRight className="h-4 w-4" aria-hidden />}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="font-[family-name:var(--font-display)] text-[32px] text-center leading-[1.1] tracking-tight text-[#123F45]">
                Confira seu e-mail
              </h1>
              <p className="mt-3 text-[15px] text-center leading-relaxed text-[#456A70]">
                Enviamos um código de {OTP_LENGTH} dígitos para{" "}
                <span className="font-semibold text-[#123F45]">{email}</span>.
              </p>

              <form className="mt-9 space-y-5" onSubmit={handleCodeSubmit}>
                <div>
                  <label
                    htmlFor="code"
                    className="mb-1.5 block text-[13px] font-medium text-[#2A5359]"
                  >
                    Código de acesso
                  </label>
                  <div className="relative">
                    <KeyRound
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7F84]"
                      aria-hidden
                    />
                    <input
                      id="code"
                      name="code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={OTP_LENGTH}
                      placeholder={"0".repeat(OTP_LENGTH)}
                      value={code}
                      onChange={(e) =>
                        setCode(
                          e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH),
                        )
                      }
                      required
                      className="w-full rounded-xl border border-[#D7DDD8] bg-white/60 py-3 pl-11 pr-4 text-[15px] tracking-[0.3em] text-[#123F45] placeholder:tracking-normal placeholder:text-[#8FA3A6] outline-none transition-colors focus:border-[#0B5A48] focus:ring-2 focus:ring-[#C5E3D9]"
                    />
                  </div>
                  <p className="mt-2 text-[12px] text-[#5F7F84]">
                    Não chegou? Confira a caixa de spam ou peça um novo código.
                  </p>
                </div>

                {error && (
                  <p className="text-[13px] text-[#B3432B]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || code.length !== OTP_LENGTH}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0B5A48] py-3.5 text-[15px] font-semibold text-[#F8F7F3] transition-colors hover:bg-[#073D35] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Verificando..." : "Entrar"}
                  {!loading && <ArrowRight className="h-4 w-4" aria-hidden />}
                </button>

                <div className="flex items-center justify-between text-[13px]">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setError(null);
                      setCode("");
                    }}
                    className="font-medium text-[#456A70] transition-colors hover:text-[#123F45]"
                  >
                    Trocar e-mail
                  </button>

                  <button
                    type="button"
                    disabled={cooldownLeft > 0 || loading}
                    onClick={() => sendCode(email.trim())}
                    className="font-medium text-[#0B5A48] transition-colors hover:text-[#073D35] disabled:cursor-not-allowed disabled:text-[#8FA3A6]"
                  >
                    {cooldownLeft > 0
                      ? `Reenviar em ${cooldownLeft}s`
                      : "Reenviar código"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-[12px] text-[#8FA3A6] md:text-left">
          Projeto de extensão em parceria com o curso de Análise e
          Desenvolvimento de Sistemas
        </p>
      </div>

      {/* ---------- Painel visual (identidade da landing) ---------- */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-grad-brand px-14 py-12 text-[#E7F1EE] md:flex">
        <div className="flex items-center gap-2 text-[13px] text-[#9CC3B8]">
          <GraduationCap className="h-4 w-4" aria-hidden />
          Jornada Tech - Trilha de Desenvolvimento Web
        </div>

        <div>
          <p className="font-[family-name:var(--font-display)] text-[28px] italic leading-snug text-[#E7F1EE] lg:text-[32px]">
            A trilha me mostrou o que priorizar em vez de eu tentar aprender
            tudo ao mesmo tempo.
          </p>

          {/* Mesmo mockup de compatibilidade usado na landing, em versão compacta */}
          <div className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[12px] text-[#9CC3B8]">
              Compatibilidade com Desenvolvedor Front-end Jr.
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-[40px] leading-none text-[#3F8A76]">
              70%
            </p>

            <div className="mt-6 space-y-4">
              {[
                { nome: "Comunicação", atual: 60, alvo: 60 },
                { nome: "HTML / CSS", atual: 60, alvo: 80 },
                { nome: "JavaScript", atual: 40, alvo: 80 },
              ].map((c) => (
                <div key={c.nome}>
                  <div className="mb-1.5 flex items-center justify-between text-[12px] text-[#C6D6D2]">
                    <span>{c.nome}</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-white/10">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full border-r-2 border-white/30"
                      style={{ width: `${c.alvo}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-[#3F8A76]"
                      style={{ width: `${c.atual}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[12px] text-[#7A9396]">
          MVP acadêmico · dados de exemplo
        </p>
      </div>
    </div>
  );
}
