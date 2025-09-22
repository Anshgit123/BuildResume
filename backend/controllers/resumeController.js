import path from "path";
import resumeModel from "../models/resumeModel.js";
import fs from 'fs'
import Resume from "../models/resumeModel.js"

export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create({
            userId:req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message });
        
    }
}

//GET FUNCTION
 export const getUserResumes = async (req,res) => {
    try {
        const resumes = await Resume.find({userId:req.user._id}).sort({updateAt: -1});
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message });
        
        
    }
 }

 //GET RESUME BY ID 

 export const getResumeById = async (req,res) => {
    try {
        const resume = await Resume.findOne({_id:req.params.id, userId:req.user._id});

        if(!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.json(resume);
    } catch (error) {
         res.status(500).json({ message: "Failed to get resumes", error: error.message });
        
        
    }
 }

 //Update resume function
 export const updateResume = async (req,res) => {
    try {
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        //MEERGE UPDATED RESUME 
        Object.assign(resume, req.body);
        //saving
        const savedResume = await resume.save();
        res.json(savedResume)
        
  } catch (error) {
    console.error("Update Resume Error:", error);  // <--- Log full error
    res.status(500).json({ message: "Failed to update resumes", error: error.message });
}

 }

 //DELETE RESUME 
 export const deleteResume =async (req,res) => {

    try {
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        //create a upload folder and store the resume there
        const uploadsFolder = path.join(process.cwd(), 'uploads')

        //Delete THUMBNAIL
        if(resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
            }
        }

        if(resume.profileInfo ?.profilePreviewUrl) {
            const oldProfile = path.join(
                uploadsFolder, 
                path.basename(resume.profileInfo.profilePreviewUrl)
            );
            if(fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
            }
        }

        //delete resume document

        const deleted =await Resume.findOneAndDelete({
             _id:req.params.id,
            userId:req.user._id

        })
        if(!deleted) {
            return res.status(404).json({ message: "Resume not found or not authorized" });
        }
        res.json({ message: "Resume deleted successfully" });


    } catch (error) {
         res.status(500).json({ message: "Failed to delete resumes", error: error.message });
        
    }
 }