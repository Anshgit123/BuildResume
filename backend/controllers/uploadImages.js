import fs from 'fs'
import path from 'path'

import Resume from '../models/resumeModel.js'
import upload from '../middleware/uploadMiddleware.js'

export const uploadResumeImages = (req, res) => {
  upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err.message })
      }

      const resumeId = req.params.id
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id })

      if (!resume) {
        return res.status(404).json({ message: "Resume not found" })
      }

      // Use correct variable name
      const uploadsFolder = path.join(process.cwd(), "uploads")
      const baseUrl = `${req.protocol}://${req.get("host")}`

      const newThumbnail = req.files.thumbnail?.[0]  // fix lowercase 'thumbnail'
      const newProfileImage = req.files.profileImage?.[0]

      if (newThumbnail) {
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
          if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail)
        }
        resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`
      }

      if (newProfileImage) {
        if (!resume.profileInfo) {
          resume.profileInfo = {}  // initialize if missing
        }
        if (resume.profileInfo.profilePreviewUrl) {
          const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl))
          if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile)
        }
        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`
      }

      await resume.save()

      return res.status(200).json({
        message: "Image uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo?.profilePreviewUrl || null
      })

    } catch (error) {
      console.error('Error uploading images:', error)
      return res.status(500).json({
        message: "Failed to upload images",
        error: error.message
      })
    }
  })
}
