import mongoose, { startSession } from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String,
    },
    template: {
        theme: String,
        colorpalette: [String],
    },
    profileInfo: {
        profilePreview: String,
        fullname: String,
        designation: String,
        summary: String,
    },
    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedIn: String,
        github: String,
        website: String,
    },

    //WORK EXPERIENCE
    workExperience: [
        {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String
    },
],
    //EDUCATION
    education: [
        {
            degree: String,
            institution: String,
            startDate: String,
            endDate: String,
        },
    ],

    skills: [
        {
            name: String,
            progress: Number,

        },
    ],

    projects: [
        {
            title: String,
            description: String,
            github: String,
            liveDemo: String,
        },
    ],

    certifications : [
        {
            tittle: String,
            issuer: String,
            year: String,
        },
    ],

    language: [
        {
            name: String,
            progress: Number,
        },
    ],

    interests : [String],

},
{
    timestamps:{ createdAt : "createAt", updatedAt: "updateAt"}
}
);
const Resume = mongoose.model('Resume',resumeSchema)
export default mongoose.model("Resume",resumeSchema)
