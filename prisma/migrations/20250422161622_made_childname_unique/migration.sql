/*
  Warnings:

  - Made the column `name` on table `Child` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Child" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Child" ("id", "name") SELECT "id", "name" FROM "Child";
DROP TABLE "Child";
ALTER TABLE "new_Child" RENAME TO "Child";
CREATE UNIQUE INDEX "Child_name_key" ON "Child"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
