/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "level" INTEGER NOT NULL,
    "moneyCents" INTEGER NOT NULL
);
INSERT INTO "new_User" ("activated", "admin", "email", "id", "level", "moneyCents", "password", "username") SELECT "activated", "admin", "email", "id", "level", "moneyCents", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
