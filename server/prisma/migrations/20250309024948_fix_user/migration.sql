/*
  Warnings:

  - You are about to drop the column `nome` on the `Utilizador` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Utilizador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);
INSERT INTO "new_Utilizador" ("id", "password", "tipo", "username") SELECT "id", "password", "tipo", "username" FROM "Utilizador";
DROP TABLE "Utilizador";
ALTER TABLE "new_Utilizador" RENAME TO "Utilizador";
CREATE UNIQUE INDEX "Utilizador_username_key" ON "Utilizador"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
