/*
  Warnings:

  - You are about to drop the column `messageThreadId` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_DogMessageThreads" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DogMessageThreads_A_fkey" FOREIGN KEY ("A") REFERENCES "Dog" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DogMessageThreads_B_fkey" FOREIGN KEY ("B") REFERENCES "MessageThread" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserMessageThreads" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserMessageThreads_A_fkey" FOREIGN KEY ("A") REFERENCES "MessageThread" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserMessageThreads_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_DogMessageThreads_AB_unique" ON "_DogMessageThreads"("A", "B");

-- CreateIndex
CREATE INDEX "_DogMessageThreads_B_index" ON "_DogMessageThreads"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserMessageThreads_AB_unique" ON "_UserMessageThreads"("A", "B");

-- CreateIndex
CREATE INDEX "_UserMessageThreads_B_index" ON "_UserMessageThreads"("B");
