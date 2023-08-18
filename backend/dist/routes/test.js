"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_model_1 = __importDefault(require("../models/task.model"));
const router = (0, express_1.Router)();
router.get('/test', async (req, res) => {
    const task = new task_model_1.default({ title: 'Teste', done: false, created_at: new Date() });
    await task.save();
    return res.status(200).send('Feito!');
});
exports.default = router;
