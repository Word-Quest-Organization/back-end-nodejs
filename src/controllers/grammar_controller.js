const prisma = require("../config/database");


const uploadGrammar = async (req, res) => {
  const bookData = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const newBook = await tx.grammarBook.create({
        data: {
          color: bookData.color,
          title: bookData.title,
          unitList: {
            create: {
              units: {
                create: bookData.units.map((unit) => ({
                  sentencesList: {
                    create: {
                      sentences: {
                        create: unit.sentences.map((sentence) => ({
                          text: sentence.text,
                        })),
                      },
                    },
                  },
                })),
              },
            },
          },
        },
        include: {
          unitList: {
            include: {
              units: {
                include: {
                  sentencesList: {
                    include: {
                      sentences: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return newBook;
    });
    res.status(201).json({
      message: "Material gramatical enviado com sucesso",
      book: result,
    });
  } catch (error) {
    console.error("Erro ao fazer upload do material gramatical:", error);
    res
      .status(500)
      .json({ error: "Erro ao fazer upload do material gramatical" });
  }
};

module.exports = {
  uploadGrammar,
};
