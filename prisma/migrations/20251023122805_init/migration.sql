-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "calculation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "calculation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initial_contribution" REAL NOT NULL,
    "monthly_contribution" REAL NOT NULL,
    "monthly_rate" REAL NOT NULL,
    "months_to_reach_goal" INTEGER NOT NULL,
    CONSTRAINT "calculation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
