-- CreateTable
CREATE TABLE "RaffleEntry" (
    "userId" UUID NOT NULL,
    "code" CHAR(4) NOT NULL,
    "emailSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RaffleEntry_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "RaffleEntry_code_key" ON "RaffleEntry"("code");

-- AddForeignKey
ALTER TABLE "RaffleEntry" ADD CONSTRAINT "RaffleEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RLS sem policies: bloqueia a Data API do Supabase (anon/authenticated).
ALTER TABLE "RaffleEntry" ENABLE ROW LEVEL SECURITY;
