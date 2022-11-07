-- CreateTable
CREATE TABLE "records" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);
