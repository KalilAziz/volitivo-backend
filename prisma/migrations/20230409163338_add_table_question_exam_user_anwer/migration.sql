/*
  Warnings:

  - You are about to drop the `QuestionExamUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionExamUser" DROP CONSTRAINT "QuestionExamUser_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionExamUser" DROP CONSTRAINT "QuestionExamUser_user_id_fkey";

-- DropTable
DROP TABLE "QuestionExamUser";

-- CreateTable
CREATE TABLE "QuestionExamUserAnswer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answer" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "QuestionExamUserAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionExamUserAnswer" ADD CONSTRAINT "QuestionExamUserAnswer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionExamUserAnswer" ADD CONSTRAINT "QuestionExamUserAnswer_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionExamUserAnswer" ADD CONSTRAINT "QuestionExamUserAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
