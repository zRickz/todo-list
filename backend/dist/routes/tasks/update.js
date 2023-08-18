"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_model_1 = __importDefault(require("../../models/task.model"));
const router = (0, express_1.Router)();
router.put('/update/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(422).send({ message: 'Por favor, indique o ID.' });
    }
    const toUpdate = {
        title: req.body.title,
        done: req.body.done
    };
    if (!toUpdate) {
        return res.status(422).send({ message: 'Por favor, indique um título ou estado para ser atualizado.' });
    }
    const taskID = req.params.id;
    const updated_task = await task_model_1.default.findByIdAndUpdate(taskID, toUpdate);
    if (!updated_task) {
        console.log('Tarefa não encontrada');
        return res.status(404).send({ message: 'Tarefa não encontrada.' });
    }
    return res.status(200).send({ message: 'Tarefa atualizada com sucesso!' });
});
exports.default = router;
