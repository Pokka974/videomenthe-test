import { Request, Response } from "express";
import FfmpegCommand from 'fluent-ffmpeg'
import pathToFfmpeg from 'ffmpeg-static'
import ffprobe from 'ffprobe-static'
import fs from 'fs'
export const createFile = async(req: Request, res: Response) => {
     console.log('route upload');
     console.log(req.file);
     
     if (!req.file) { return res.status(500).json({error: 'No file'}) }

     const ok = await FfmpegCommand(req.file!.path)
     .setFfmpegPath(pathToFfmpeg)
     .setFfprobePath(ffprobe.path)
     .videoCodec('libx264')
     .output(`files/${req.file!.filename}`)
     .size('320x?')
     .on('end', () => {
          fs.unlink(`tmp/${req.file!.filename}`, () => {
               console.log('Video successfully resized');
               return res.status(200).json({filename: req.file!.filename})
          })
     })
     .on('error', (err) => {
          console.error(err)
     }).run()

     console.log(ok);

}

// export default createFile