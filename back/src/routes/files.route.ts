import { Router } from 'express'
import { getFiles, getOneFile } from '../controllers/files.controller'
const router : Router = Router()

router.get('/all',  getFiles)
router.get('/:name', getOneFile)

export default router