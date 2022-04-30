import { Router } from 'express'
import { createFile } from '../controllers/upload.controller'

import multer from '../middleware/multer'
const router : Router = Router()

router.post('/:resolution', multer, createFile)

export default router