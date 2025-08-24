// src/routes/pessoaRoutes.ts

import express from "express";
import {
    createPessoa,
    getPessoa,
    getPessoaById,
    updatePessoa,
    deletePessoa
} from "../controllers/pessoaController.js";

const router = express.Router();

router.post("/pessoas", createPessoa);
router.get("/pessoas", getPessoa);
router.get("/pessoas/:id", getPessoaById); // Rota para buscar por ID
router.put("/pessoas/:id", updatePessoa); // Rota para atualizar por ID
router.delete("/pessoas/:id", deletePessoa); // Rota para excluir por ID

export default router;