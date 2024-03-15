-- CreateTable
CREATE TABLE "Genre" (
    "id" VARCHAR(36) NOT NULL,
    "adminId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(33) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenresOnApplications" (
    "appId" VARCHAR(36) NOT NULL,
    "genreId" VARCHAR(36) NOT NULL,

    CONSTRAINT "GenresOnApplications_pkey" PRIMARY KEY ("appId","genreId")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" VARCHAR(36) NOT NULL,
    "adminId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(33) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnApplications" (
    "appId" VARCHAR(36) NOT NULL,
    "categoryId" VARCHAR(36) NOT NULL,

    CONSTRAINT "CategoriesOnApplications_pkey" PRIMARY KEY ("appId","categoryId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" VARCHAR(36) NOT NULL,
    "adminId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnApplications" (
    "appId" VARCHAR(36) NOT NULL,
    "tagId" VARCHAR(36) NOT NULL,

    CONSTRAINT "TagsOnApplications_pkey" PRIMARY KEY ("appId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_id_key" ON "Tag"("id");

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnApplications" ADD CONSTRAINT "GenresOnApplications_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnApplications" ADD CONSTRAINT "GenresOnApplications_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnApplications" ADD CONSTRAINT "CategoriesOnApplications_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnApplications" ADD CONSTRAINT "CategoriesOnApplications_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnApplications" ADD CONSTRAINT "TagsOnApplications_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnApplications" ADD CONSTRAINT "TagsOnApplications_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
