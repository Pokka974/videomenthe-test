import { Router } from 'express'
import { getFiles, getOneFile } from '../controllers/files.controller'
const router = Router()

router.get('/',  getFiles)
router.get('/:name', getOneFile)

export default router