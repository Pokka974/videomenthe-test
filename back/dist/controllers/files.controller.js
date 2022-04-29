"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneFile = exports.getFiles = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const rootDir = path_1.default.dirname(require.main.path);
const filesDir = `${rootDir}/files/`;
const getFiles = async (req, res, nest) => {
    const filesNames = [];
    fs_1.default.readdir(filesDir, (err, files) => {
        if (err) {
            console.error("Could not list the directory", err);
            process.exit(1);
        }
        files.forEach((file, index) => {
            filesNames.push({
                id: index,
                filename: file,
            });
        });
        res.status(200).json(filesNames);
    });
};
exports.getFiles = getFiles;
// This route is called when a video is played
const getOneFile = async (req, res, nest) => {
    const filename = req.params.name;
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = `${filesDir}${filename}`;
    const videoSize = fs_1.default.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range === null || range === void 0 ? void 0 : range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs_1.default.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
};
exports.getOneFile = getOneFile;
