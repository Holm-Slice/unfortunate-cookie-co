-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fortune" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "type" TEXT NOT NULL DEFAULT 'unfortunate',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Fortune" ("category", "createdAt", "id", "text") SELECT "category", "createdAt", "id", "text" FROM "Fortune";
DROP TABLE "Fortune";
ALTER TABLE "new_Fortune" RENAME TO "Fortune";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
