"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fraunces, Manrope } from "next/font/google";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  KeyRound,
} from "lucide-react";

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

// Este arquivo usa "use client" por causa do estado do fluxo de login,
// por isso não exporta `metadata` diretamente — defina o título/descrição
// desta rota no layout pai (app/login/layout.tsx) caso precise de SEO aqui.

type Step = "email" | "code";

function formatCountdown(seconds: number) {
  const clamped = Math.max(0, seconds);
  const minutes = Math.floor(clamped / 60);
  const rest = clamped % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (step !== "code") return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [step]);

  const secondsLeft = expiresAt
    ? Math.max(0, Math.round((expiresAt - now) / 1000))
    : 0;
  const codeExpired = step === "code" && expiresAt !== null && secondsLeft <= 0;
  const cooldownLeft = cooldownUntil
    ? Math.max(0, Math.round((cooldownUntil - now) / 1000))
    : 0;

  async function requestCode(targetEmail: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Não foi possível enviar o código.");
        if (typeof data.retryAfterSeconds === "number") {
          setCooldownUntil(Date.now() + data.retryAfterSeconds * 1000);
        }
        return;
      }

      setStep("code");
      setCode("");
      setExpiresAt(Date.now() + data.expiresInSeconds * 1000);
      setCooldownUntil(Date.now() + data.resendCooldownSeconds * 1000);
    } catch {
      setError("Não foi possível conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    requestCode(email.trim());
  }

  async function handleCodeSubmit(e: FormEvent) {
    e.preventDefault();
    if (code.length !== 6) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Código inválido.");
        return;
      }

      router.push("/self");
    } catch {
      setError("Não foi possível conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`${fraunces.variable} ${manrope.variable} font-[family-name:var(--font-body)] grid min-h-screen bg-[#F6F2E7] text-[#16231C] md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr]`}
    >
      {/* ---------- Painel do formulário ---------- */}
      <div className="flex flex-col justify-between px-6 py-8 md:px-14 md:py-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6B45] text-sm font-semibold text-[#F6F2E7] font-[family-name:var(--font-display)]">
              TC
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Jornada Tech
            </span>
          </Link>

          <Link
            href="/"
            className="hidden items-center gap-1.5 text-[13px] font-medium text-[#4B5B52] transition-colors hover:text-[#16231C] sm:flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Voltar para a home
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm py-12">
          {step === "email" ? (
            <>
              <h1 className="font-[family-name:var(--font-display)] text-[32px] text-center leading-[1.1] tracking-tight text-[#16231C]">
                Bem-vindo
              </h1>
              <p className="mt-3 text-[15px] text-center leading-relaxed text-[#4B5B52]">
                Informe seu e-mail e enviaremos um código de acesso — sem
                senha para lembrar.
              </p>

              <form className="mt-9 space-y-5" onSubmit={handleEmailSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[13px] font-medium text-[#354238]"
                  >
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C7A6F]"
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
                      className="w-full rounded-xl border border-[#DCE6DA] bg-white/60 py-3 pl-11 pr-4 text-[15px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[13px] text-[#B3432B]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#2F6B45] py-3.5 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Enviando código..." : "Enviar código"}
                  {!loading && <ArrowRight className="h-4 w-4" aria-hidden />}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="font-[family-name:var(--font-display)] text-[32px] text-center leading-[1.1] tracking-tight text-[#16231C]">
                Confira seu e-mail
              </h1>
              <p className="mt-3 text-[15px] text-center leading-relaxed text-[#4B5B52]">
                Enviamos um código de 6 dígitos para{" "}
                <span className="font-semibold text-[#16231C]">{email}</span>.
              </p>

              <form className="mt-9 space-y-5" onSubmit={handleCodeSubmit}>
                <div>
                  <label
                    htmlFor="code"
                    className="mb-1.5 block text-[13px] font-medium text-[#354238]"
                  >
                    Código de acesso
                  </label>
                  <div className="relative">
                    <KeyRound
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C7A6F]"
                      aria-hidden
                    />
                    <input
                      id="code"
                      name="code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="000000"
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      required
                      className="w-full rounded-xl border border-[#DCE6DA] bg-white/60 py-3 pl-11 pr-4 text-[15px] tracking-[0.3em] text-[#16231C] placeholder:tracking-normal placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
                    />
                  </div>
                  <p className="mt-2 text-[12px] text-[#6C7A6F]">
                    {codeExpired
                      ? "Código expirado — peça um novo abaixo."
                      : `Expira em ${formatCountdown(secondsLeft)}`}
                  </p>
                </div>

                {error && (
                  <p className="text-[13px] text-[#B3432B]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || code.length !== 6 || codeExpired}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#2F6B45] py-3.5 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F] disabled:cursor-not-allowed disabled:opacity-60"
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
                    className="font-medium text-[#4B5B52] transition-colors hover:text-[#16231C]"
                  >
                    Trocar e-mail
                  </button>

                  <button
                    type="button"
                    disabled={cooldownLeft > 0 || loading}
                    onClick={() => requestCode(email.trim())}
                    className="font-medium text-[#2F6B45] transition-colors hover:text-[#26582F] disabled:cursor-not-allowed disabled:text-[#8C978F]"
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

        <p className="text-center text-[12px] text-[#8C978F] md:text-left">
          Projeto de extensão em parceria com o curso de Análise e
          Desenvolvimento de Sistemas
        </p>
      </div>

      {/* ---------- Painel visual (identidade da landing) ---------- */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0E2A20] px-14 py-12 text-[#EAF3EC] md:flex">
        <div className="flex items-center gap-2 text-[13px] text-[#9FC2AC]">
          <GraduationCap className="h-4 w-4" aria-hidden />
          Jornada Tech - Trilha de Desenvolvimento Web
        </div>

        <div>
          <p className="font-[family-name:var(--font-display)] text-[28px] italic leading-snug text-[#EAF3EC] lg:text-[32px]">
            A trilha me mostrou o que priorizar em vez de eu tentar aprender
            tudo ao mesmo tempo.
          </p>

          {/* Mesmo mockup de compatibilidade usado na landing, em versão compacta */}
          <div className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[12px] text-[#9FC2AC]">
              Compatibilidade com Desenvolvedor Front-end Jr.
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-[40px] leading-none text-[#6FA37E]">
              70%
            </p>

            <div className="mt-6 space-y-4">
              {[
                { nome: "Comunicação", atual: 60, alvo: 60 },
                { nome: "HTML / CSS", atual: 60, alvo: 80 },
                { nome: "JavaScript", atual: 40, alvo: 80 },
              ].map((c) => (
                <div key={c.nome}>
                  <div className="mb-1.5 flex items-center justify-between text-[12px] text-[#C7D6CC]">
                    <span>{c.nome}</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-white/10">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full border-r-2 border-white/30"
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
          </div>
        </div>

        <p className="text-[12px] text-[#7E9788]">
          MVP acadêmico · dados de exemplo
        </p>
      </div>
    </div>
  );
}
