"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jszip_1 = __importDefault(require("jszip"));
// const addFilesFromDirectoryToZip = (directoryPath = "", zip: any) => {
//   [...]
// };
const b64Zip = async (directoryPath = "") => {
    const zip = new jszip_1.default();
    zip.file("standalone.txt", "I will exist inside of the zip archive, but I'm not a real file here on the server.");
    //   addFilesFromDirectoryToZip(directoryPath, zip);
    const zipAsBase64 = await zip.generateAsync({ type: "base64" });
    return zipAsBase64;
};
exports.default = b64Zip;
