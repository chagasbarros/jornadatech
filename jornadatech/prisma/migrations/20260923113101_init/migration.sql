-- CreateEnum
CREATE TYPE "JourneyStep" AS ENUM ('SELF', 'FIELD_INTEREST', 'SELF_EVALUATION', 'CANVAS', 'ACTION_PLAN', 'DONE');

-- CreateEnum
CREATE TYPE "GoalHorizon" AS ENUM ('SHORT', 'MEDIUM');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "currentStep" "JourneyStep" NOT NULL DEFAULT 'SELF',
    "completedAt" TIMESTAMP(3),
    "targetProfileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelfProfile" (
    "userId" UUID NOT NULL,
    "semester" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "curiosities" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelfProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "SkillAssessment" (
    "userId" UUID NOT NULL,
    "skillId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillAssessment_pkey" PRIMARY KEY ("userId","skillId")
);

-- CreateTable
CREATE TABLE "CareerCanvas" (
    "userId" UUID NOT NULL,
    "objective" TEXT NOT NULL,
    "skillsToDevelop" TEXT[],
    "suggestedSkills" TEXT[],
    "networking" TEXT NOT NULL,
    "experiences" TEXT NOT NULL,
    "portfolio" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerCanvas_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ActionGoal" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "horizon" "GoalHorizon" NOT NULL,
    "objective" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "indicator" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "suggested" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActionGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyFeedback" (
    "userId" UUID NOT NULL,
    "nextAction" TEXT NOT NULL,
    "satisfaction" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JourneyFeedback_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "ActionGoal_userId_idx" ON "ActionGoal"("userId");

-- AddForeignKey
ALTER TABLE "SelfProfile" ADD CONSTRAINT "SelfProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillAssessment" ADD CONSTRAINT "SkillAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerCanvas" ADD CONSTRAINT "CareerCanvas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionGoal" ADD CONSTRAINT "ActionGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyFeedback" ADD CONSTRAINT "JourneyFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RLS sem policies: bloqueia a Data API do Supabase (anon/authenticated).
-- O Prisma conecta como dono das tabelas e não é afetado.
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SelfProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SkillAssessment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CareerCanvas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ActionGoal" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "JourneyFeedback" ENABLE ROW LEVEL SECURITY;
-- A tabela de controle do Prisma não existe no shadow database.
DO $$ BEGIN
  IF to_regclass('public._prisma_migrations') IS NOT NULL THEN
    ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;
