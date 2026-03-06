-- AlterTable
ALTER TABLE "pessoas" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "capa_url" TEXT;

-- CreateTable
CREATE TABLE "aquisicoes" (
    "id" SERIAL NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    "oferta_id" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aquisicoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aquisicoes_pessoa_id_oferta_id_key" ON "aquisicoes"("pessoa_id", "oferta_id");

-- AddForeignKey
ALTER TABLE "aquisicoes" ADD CONSTRAINT "aquisicoes_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aquisicoes" ADD CONSTRAINT "aquisicoes_oferta_id_fkey" FOREIGN KEY ("oferta_id") REFERENCES "ofertas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
