"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const list_1 = __importDefault(require("./routes/tasks/list"));
const create_1 = __importDefault(require("./routes/tasks/create"));
const delete_1 = __importDefault(require("./routes/tasks/delete"));
const update_1 = __importDefault(require("./routes/tasks/update"));
const csrf_1 = __importDefault(require("./routes/csrf"));
const app = (0, express_1.default)();
const csrfProtect = (0, csurf_1.default)({ cookie: true });
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
mongoose_1.default.connect('mongodb+srv://facilita:system@facilita.u9qrdzj.mongodb.net/todo').then(() => console.log('Banco de dados conectado com sucesso!')).catch(() => console.log('Erro ao se conectar com o banco de dados...'));
// Rotas
app.use('/token', csrfProtect, csrf_1.default);
app.use('/tasks', csrfProtect, list_1.default);
app.use('/tasks', csrfProtect, create_1.default);
app.use('/tasks', csrfProtect, update_1.default);
app.use('/tasks', csrfProtect, delete_1.default);
exports.default = app;
