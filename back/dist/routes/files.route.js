"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const files_controller_1 = require("../controllers/files.controller");
const router = (0, express_1.Router)();
router.get('/', files_controller_1.getFiles);
router.get('/:name', files_controller_1.getOneFile);
exports.default = router;
