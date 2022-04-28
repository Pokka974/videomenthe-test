"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
const files_route_1 = __importDefault(require("./routes/files.route"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('uploads'));
app.use('/upload', upload_route_1.default);
app.use('/files', files_route_1.default);
// app.use("*", (req, res) => {
//      res.send('HELLO')
// })
app.listen(port, () => console.log('Watching port ' + port));
