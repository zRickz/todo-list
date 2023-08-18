"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_model_1 = __importDefault(require("../../models/task.model"));
const router = (0, express_1.Router)();
router.post('/create', async (req, res) => {
    if (!req.body.title) {
        return res.status(422).send({ message: 'Por favor, configure um título.' });
    }
    try {
        const new_task = new task_model_1.default({
            title: req.body.title,
            done: false,
            created_at: new Date()
        });
        await new_task.save();
        return res.status(200).send({ message: 'Tarefa criada com sucesso!' });
    }
    catch {
        return res.status(500).send({ message: 'Erro ao criar tarefa.' });
    }
});
exports.default = router;
