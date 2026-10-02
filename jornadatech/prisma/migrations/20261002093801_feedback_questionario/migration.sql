-- CreateEnum
CREATE TYPE "FeedbackFit" AS ENUM ('YES', 'PARTIAL', 'NO');

-- CreateEnum
CREATE TYPE "FeedbackStep" AS ENUM ('SELF', 'FIELD_INTEREST', 'SELF_EVALUATION', 'CANVAS', 'ACTION_PLAN', 'NONE');

-- AlterTable
ALTER TABLE "JourneyFeedback" ADD COLUMN     "clarity" INTEGER,
ADD COLUMN     "hardestStep" "FeedbackStep",
ADD COLUMN     "recommend" INTEGER,
ADD COLUMN     "suggestionsFit" "FeedbackFit",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
