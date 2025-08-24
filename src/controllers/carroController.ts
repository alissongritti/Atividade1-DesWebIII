// src/controllers/carroController.ts

import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

// Criar um novo carro
export const createCarro = async (req: Request, res: Response) => {
    try {
        const { modelo, marca, ano } = req.body;
        if (!modelo || !marca || !ano) {
            return res.status(400).json({
                error: "Modelo, marca e ano são obrigatórios"
            });
        }
        const newCarro = await prisma.carro.create({
            data: {
                modelo,
                marca,
                ano
            }
        });
        res.status(201).json(newCarro);
    } catch (error) {
        console.error("Erro ao criar carro:", error);
        res.status(500).json({ error: "Erro ao criar carro" });
    }
};

// Listar todos os carros
export const getCarro = async (req: Request, res: Response) => {
    try {
        const carros = await prisma.carro.findMany();
        res.json(carros);
    } catch (error) {
        console.error("Erro ao buscar carros:", error);
        res.status(500).json({ error: "Erro ao buscar carros" });
    }
};

// Buscar carro por id
export const getCarroById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const carro = await prisma.carro.findUnique({
            where: { id: Number(id) }
        });
        if (!carro) {
            return res.status(404).json({ error: "Carro não encontrado" });
        }
        res.json(carro);
    } catch (error) {
        console.error("Erro ao buscar carro por ID:", error);
        res.status(500).json({ error: "Erro ao buscar carro" });
    }
};

// Atualizar carro por id
export const updateCarro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { modelo, marca, ano } = req.body;
        const updatedCarro = await prisma.carro.update({
            where: { id: Number(id) },
            data: { modelo, marca, ano }
        });
        res.json(updatedCarro);
    } catch (error) {
        console.error("Erro ao atualizar carro:", error);
        res.status(500).json({ error: "Erro ao atualizar carro" });
    }
};

// Excluir carro por id
export const deleteCarro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.carro.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar carro:", error);
        res.status(500).json({ error: "Erro ao deletar carro" });
    }
};