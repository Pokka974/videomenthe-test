"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const ffprobe_static_1 = __importDefault(require("ffprobe-static"));
const fs_1 = __importDefault(require("fs"));
const createFile = async (req, res) => {
    if (!req.file) {
        return res.status(500).json({ error: 'No file' });
    }
    try {
        await (0, fluent_ffmpeg_1.default)(req.file.path)
            .setFfmpegPath(ffmpeg_static_1.default)
            .setFfprobePath(ffprobe_static_1.default.path)
            .videoCodec('libx264')
            .output(`files/${req.file.filename}`)
            .size(`${req.params.resolution}x?`)
            .on('end', () => {
            fs_1.default.unlink(`tmp/${req.file.filename}`, () => {
                console.log('Video successfully resized');
                return res.status(200).json({ filename: req.file.filename });
            });
        })
            .on('progress', (progress) => {
            console.log(progress.percent);
        })
            .on('error', (err) => {
            console.error(err);
        }).run();
    }
    catch (error) {
        console.error(error);
    }
};
exports.createFile = createFile;
