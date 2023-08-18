"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_model_1 = __importDefault(require("../../models/task.model"));
const router = (0, express_1.Router)();
router.delete('/delete/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(422).send({ message: 'Por favor, indique o ID.' });
    }
    try {
        const taskID = req.params.id;
        const task_to_delete = await task_model_1.default.findByIdAndDelete(taskID);
        if (!task_to_delete) {
            return res.status(404).send({ message: 'Tarefa não encontrada.' });
        }
        return res.status(200).send({ message: 'Tarefa excluída com sucesso!' });
    }
    catch {
        return res.status(500).send({ message: 'Erro ao deletar tarefa.' });
    }
});
exports.default = router;
