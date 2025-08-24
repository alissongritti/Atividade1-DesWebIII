// src/routes/carroRoutes.ts

import express from "express";

import {
    getCarro,
    createCarro,
    getCarroById, // Adicionado
    updateCarro,
    deleteCarro
} from "../controllers/carroController.js";

const router = express.Router();

router.get("/carros", getCarro);
router.post("/carros", createCarro);
router.get("/carros/:id", getCarroById); // Nova rota
router.put("/carros/:id", updateCarro);
router.delete("/carros/:id", deleteCarro);

export default router;