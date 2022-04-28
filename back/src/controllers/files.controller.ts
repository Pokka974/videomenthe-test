import { NextFunction, Request, Response } from "express";
import path from 'path'
import fs from 'fs'
const rootDir = path.dirname(require.main!.path)
const uploadsDir = `${rootDir}/uploads/`
export const getFiles = async (req: Request, res: Response, nest: NextFunction) => {
     
     const filesNames : object[] = []
     fs.readdir(uploadsDir, (err, files: string[]) => {
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

export const getOneFile = async (req: Request, res: Response, nest: NextFunction) => {
     
     const filename : string = req.params.name
     const videoPath = `${uploadsDir}${filename}`
   
     const videoStream = fs.createReadStream(videoPath);
     const head = {
          'Accept-Ranges': 'bytes',
          'Content-Type': 'video/mp4',
     }
     res.writeHead(200, head);
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
}