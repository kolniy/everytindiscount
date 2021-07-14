-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'user',
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package_Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconname" TEXT NOT NULL,
    "createdbyid" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "packagetypeId" TEXT NOT NULL,
    "packagename" TEXT NOT NULL,
    "packageimage" TEXT NOT NULL,
    "packagediscount" DOUBLE PRECISION NOT NULL,
    "packagedescription" TEXT NOT NULL,
    "packagelandingpageimage" TEXT NOT NULL,
    "packagelogo" TEXT NOT NULL,
    "createdbyid" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package_Plan" (
    "id" TEXT NOT NULL,
    "planname" TEXT NOT NULL,
    "plandescription" TEXT NOT NULL,
    "planprice" INTEGER NOT NULL,
    "createdbyid" TEXT NOT NULL,
    "packageid" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.name_unique" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Package_Type" ADD FOREIGN KEY ("createdbyid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD FOREIGN KEY ("packagetypeId") REFERENCES "Package_Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD FOREIGN KEY ("createdbyid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package_Plan" ADD FOREIGN KEY ("createdbyid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package_Plan" ADD FOREIGN KEY ("packageid") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
