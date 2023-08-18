"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_model_1 = __importDefault(require("../../models/task.model"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const tasks = await task_model_1.default.find({});
        if (!tasks) {
            return res.status(404).send({ message: 'Nenhuma tarefa foi encontrada.' });
        }
        return res.status(200).send({ tasks });
    }
    catch {
        return res.status(500).send({ message: 'Erro ao listar tarefas' });
    }
});
exports.default = router;
