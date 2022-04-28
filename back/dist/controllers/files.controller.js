"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneFile = exports.getFiles = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const rootDir = path_1.default.dirname(require.main.path);
const uploadsDir = `${rootDir}/uploads/`;
const getFiles = async (req, res, nest) => {
    const filesNames = [];
    fs_1.default.readdir(uploadsDir, (err, files) => {
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
const getOneFile = async (req, res, nest) => {
    const filename = req.params.name;
    const videoPath = `${uploadsDir}${filename}`;
    const headers = {
        "Accept-Ranges": "bytes",
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs_1.default.createReadStream(videoPath);
    videoStream.pipe(res);
    // await fs.readdir(uploadsDir, (err, files: string[]) => {
    //      if (err) {
    //           console.error("Could not list the directory", err)
    //           process.exit(1)
    //      }
    //      files.forEach((file) => {
    //           if (file === filename) {
    //                res.sendFile(`${uploadsDir}${file}`)
    //           }    
    //      })
    // })
};
exports.getOneFile = getOneFile;
