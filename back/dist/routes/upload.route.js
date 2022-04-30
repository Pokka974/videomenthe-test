"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = (0, express_1.Router)();
router.post('/:resolution', multer_1.default, upload_controller_1.createFile);
exports.default = router;
