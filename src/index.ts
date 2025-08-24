// src/index.ts

import express from "express";
import carroRoutes from "./routes/carroRoutes.js";
import pessoaRoutes from "./routes/pessoaRoutes.js";
import associacaoRoutes from "./routes/associacaoRoutes.js";

const app = express();
app.use(express.json());

// Sirva os arquivos estáticos da pasta public
app.use(express.static("public"));

// Use as rotas da API com seus prefixos específicos
app.use("/api", carroRoutes);
app.use("/api", pessoaRoutes);
app.use("/api", associacaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});