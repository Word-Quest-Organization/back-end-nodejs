-- CreateTable
CREATE TABLE "grammar_books" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "grammar_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_lists" (
    "id" TEXT NOT NULL,
    "grammarBookId" TEXT NOT NULL,

    CONSTRAINT "unit_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" TEXT NOT NULL,
    "unitListId" TEXT NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentences_list" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "sentences_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentences" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sentencesListId" TEXT NOT NULL,

    CONSTRAINT "sentences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unit_lists_grammarBookId_key" ON "unit_lists"("grammarBookId");

-- CreateIndex
CREATE UNIQUE INDEX "sentences_list_unitId_key" ON "sentences_list"("unitId");

-- AddForeignKey
ALTER TABLE "unit_lists" ADD CONSTRAINT "unit_lists_grammarBookId_fkey" FOREIGN KEY ("grammarBookId") REFERENCES "grammar_books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_unitListId_fkey" FOREIGN KEY ("unitListId") REFERENCES "unit_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentences_list" ADD CONSTRAINT "sentences_list_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentences" ADD CONSTRAINT "sentences_sentencesListId_fkey" FOREIGN KEY ("sentencesListId") REFERENCES "sentences_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
