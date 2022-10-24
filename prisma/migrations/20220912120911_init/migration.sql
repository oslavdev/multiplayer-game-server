/*
  Warnings:

  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - Added the required column `activated` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "level" INTEGER NOT NULL,
    "moneyCents" INTEGER NOT NULL
);
INSERT INTO "new_User" ("admin", "email", "id", "level", "moneyCents", "password", "username") SELECT "admin", "email", "id", "level", "moneyCents", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
