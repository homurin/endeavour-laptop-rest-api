-- CreateTable
CREATE TABLE "Tag" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(33) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnApplications" (
    "appId" VARCHAR(36) NOT NULL,
    "tagId" VARCHAR(36) NOT NULL,

    CONSTRAINT "TagsOnApplications_pkey" PRIMARY KEY ("appId","tagId")
);

-- AddForeignKey
ALTER TABLE "TagsOnApplications" ADD CONSTRAINT "TagsOnApplications_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnApplications" ADD CONSTRAINT "TagsOnApplications_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
