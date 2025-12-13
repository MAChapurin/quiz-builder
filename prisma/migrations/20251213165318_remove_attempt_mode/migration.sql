/*
  Migration: remove_attempt_mode_and_add_label
*/

UPDATE "InviteToken"
SET "label" = 'default'
WHERE "label" IS NULL;

ALTER TABLE "InviteToken"
ALTER COLUMN "label" SET NOT NULL;

ALTER TABLE "QuizAttempt"
DROP CONSTRAINT "QuizAttempt_inviteTokenId_fkey";

ALTER TABLE "QuizAttempt"
ADD COLUMN "label" TEXT;

UPDATE "QuizAttempt" qa
SET "label" = COALESCE(it.label, 'legacy')
FROM "InviteToken" it
WHERE qa."inviteTokenId" = it.id;

UPDATE "QuizAttempt"
SET "label" = 'legacy'
WHERE "label" IS NULL;

ALTER TABLE "QuizAttempt"
ALTER COLUMN "label" SET NOT NULL;

ALTER TABLE "QuizAttempt"
DROP COLUMN "mode";

ALTER TABLE "QuizAttempt"
ADD CONSTRAINT "QuizAttempt_inviteTokenId_fkey"
FOREIGN KEY ("inviteTokenId")
REFERENCES "InviteToken"(id)
ON DELETE SET NULL
ON UPDATE CASCADE;

DROP TYPE "QuizAttemptMode";
