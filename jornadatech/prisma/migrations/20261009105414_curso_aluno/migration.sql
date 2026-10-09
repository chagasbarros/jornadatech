-- Curso do aluno (ids em lib/career/courses.ts). Até aqui o app era só de ADS,
-- então as linhas existentes recebem 'ads'; depois o valor passa a ser obrigatório.
ALTER TABLE "SelfProfile" ADD COLUMN "course" TEXT NOT NULL DEFAULT 'ads';
ALTER TABLE "SelfProfile" ALTER COLUMN "course" DROP DEFAULT;
