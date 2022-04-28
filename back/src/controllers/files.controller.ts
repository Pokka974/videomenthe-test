import { NextFunction, Request, Response } from "express";
import path from 'path'
import fs from 'fs'
export const getFiles = async (req: Request, res: Response, nest: NextFunction) => {
     const rootDir = path.dirname(require.main!.path)
     const uploadsDir = `${rootDir}/uploads/`
     const filesNames : string[] = []
     fs.readdir(uploadsDir, (err, files: string[]) => {
          if (err) {
               console.error("Could not list the directory", err)
               process.exit(1)
          }

          files.forEach((file) => {
               filesNames.push(file)
          })

          res.status(200).json(filesNames)
     })
}

export const getOneFile = (req: Request, res: Response, nest: NextFunction) => {

}