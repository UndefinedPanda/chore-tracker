/*
  Warnings:

  - Added the required column `day_of_week` to the `Chore` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "day_of_week" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    CONSTRAINT "Chore_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chore" ("childId", "description", "finished", "id", "name") SELECT "childId", "description", "finished", "id", "name" FROM "Chore";
DROP TABLE "Chore";
ALTER TABLE "new_Chore" RENAME TO "Chore";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
