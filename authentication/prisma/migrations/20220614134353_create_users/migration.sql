-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL,
    "failed" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "blocked" SET DEFAULT false,
ALTER COLUMN "failed" SET DEFAULT 0;