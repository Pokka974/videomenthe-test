import { Request } from 'express';
import multer from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type File = Express.Multer.File

const storage = multer.diskStorage({
    destination: (_: Request, __: File, callback: DestinationCallback) => {
        callback(null, 'tmp/')
    },
    filename: (req: Request, file: File, callback: DestinationCallback) => {
        const name : string[] = file.originalname.split(' ').join('_').split('.');
        name.pop();
        console.log(name);
        const extension : string = file.mimetype.split('/')[1];
        if(extension) callback(null, req.params.resolution + 'p_' + name[0] + Date.now() + '.' + extension)
    }
});

const upload = multer({storage}).single('video')
export default upload