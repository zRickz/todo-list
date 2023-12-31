"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
app_1.default.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).send({ message: 'CSRF Inválido' });
    }
    return next(err);
});
app_1.default.listen(8080, () => {
    console.log('Servidor ligado em http://localhost:8080');
});
