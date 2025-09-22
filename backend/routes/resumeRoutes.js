import express from 'express'
import { protect} from '../middleware/authMiddleware.js'
import {createResume, getUserResumes,deleteResume, getResumeById,updateResume } from '../controllers/resumeController.js'
import { uploadResumeImages } from '../controllers/uploadImages.js'





const resumerRouter = express.Router()


resumerRouter.post('/',protect, createResume)
resumerRouter.get('/', protect, getUserResumes)
resumerRouter.get('/:id',protect, getResumeById)

resumerRouter.put('/:id', protect,updateResume)
resumerRouter.put('/:id/upload-images', protect, uploadResumeImages)

resumerRouter.delete('/:id',protect, deleteResume)

export default resumerRouter;