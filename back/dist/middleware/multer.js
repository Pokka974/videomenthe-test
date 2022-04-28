"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (_, __, callback) => {
        callback(null, 'tmp/');
    },
    filename: (_, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.');
        name.pop();
        console.log(name);
        const extension = file.mimetype.split('/')[1];
        if (extension)
            callback(null, name[0] + Date.now() + '.' + extension);
    }
});
const upload = (0, multer_1.default)({ storage }).single('video');
exports.default = upload;
