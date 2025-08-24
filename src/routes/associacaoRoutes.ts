// src/routes/associacaoRoutes.ts

import { Router } from "express";
import {
    associatePessoaCarro,
    getAllAssociations,
    deleteAssociation
} from "../controllers/associacaoController.js";

const router = Router();

router.post("/associacoes", associatePessoaCarro);
router.get("/associacoes", getAllAssociations);
router.delete("/associacoes/:id", deleteAssociation);

export default router;