/*
  Warnings:

  - You are about to drop the column `topic_id` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Topics" DROP CONSTRAINT "Topics_creatorId_fkey";

-- DropIndex
DROP INDEX "topicId_Posts";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "topic_id";

-- DropTable
DROP TABLE "Topics";
