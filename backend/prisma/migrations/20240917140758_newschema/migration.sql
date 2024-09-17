/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AlbumToSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `playLog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[spotifyUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spotifyUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToSong" DROP CONSTRAINT "_AlbumToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToSong" DROP CONSTRAINT "_AlbumToSong_B_fkey";

-- DropForeignKey
ALTER TABLE "playLog" DROP CONSTRAINT "playLog_albumId_fkey";

-- DropForeignKey
ALTER TABLE "playLog" DROP CONSTRAINT "playLog_songId_fkey";

-- DropForeignKey
ALTER TABLE "playLog" DROP CONSTRAINT "playLog_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "spotifyUserId" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "Album";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Song";

-- DropTable
DROP TABLE "_AlbumToSong";

-- DropTable
DROP TABLE "playLog";

-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "spotifyPlaylistId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "spotifyTrackId" TEXT NOT NULL,
    "name" TEXT,
    "artist" TEXT,
    "album" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistTrack" (
    "id" SERIAL NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaylistTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_spotifyPlaylistId_key" ON "Playlist"("spotifyPlaylistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_spotifyTrackId_key" ON "Track"("spotifyTrackId");

-- CreateIndex
CREATE UNIQUE INDEX "User_spotifyUserId_key" ON "User"("spotifyUserId");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
