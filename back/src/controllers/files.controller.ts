import { NextFunction, Request, Response } from "express";
import path from 'path'
import fs from 'fs'
const rootDir = path.dirname(require.main!.path)
const filesDir = `${rootDir}/files/`
export const getFiles = async (req: Request, res: Response, nest: NextFunction) => {
     
     const filesNames : object[] = []
     fs.readdir(filesDir, (err, files: string[]) => {
          if (err) {
               console.error("Could not list the directory", err)
               process.exit(1)
          }

          files.forEach((file, index) => {
               filesNames.push({
                    id: index,
                    filename: file,
               })
          })

          res.status(200).json(filesNames)
     })
}

// This route is called when a video is played
export const getOneFile = async (req: Request, res: Response, nest: NextFunction) => {
     
     const filename : string = req.params.name
     const range = req.headers.range;

     if (!range) {
          res.status(400).send("Requires Range header");
     }

     const videoPath = `${filesDir}${filename}`
     const videoSize = fs.statSync(videoPath).size;
     const CHUNK_SIZE = 10 ** 6;
     const start = Number(range?.replace(/\D/g, ""));
     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
     const contentLength = end - start + 1;
     const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
     };
     res.writeHead(206, headers);
     const videoStream = fs.createReadStream(videoPath, { start, end });
     
     videoStream.pipe(res);
}