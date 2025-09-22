import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import PersonalInfoForm from "../forms/PersonalInfoForm";
import EducationForm from "../forms/EducationForm";
import ExperienceForm from "../forms/ExperienceForm";
import SkillsForm from "../forms/SkillsForm";
import ProjectsForm from "../forms/ProjectsForm";
import AdditionalInfoForm from "../forms/AdditionalInfoForm";

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Array handlers (local to this component)
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray[index] = { ...updatedArray[index], [key]: value };

      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);

      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // ✅ Fetch resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosInstance.get(`${API_PATHS.RESUME.GET}/${id}`);
        setResumeData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load resume");
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) return <p>Loading resume...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleSave = async () => {
    try {
      await axiosInstance.put(`${API_PATHS.RESUME.UPDATE}/${id}`, resumeData);
      alert("Resume saved successfully!");
      navigate(`/resume/${id}`);
    } catch (err) {
      alert("Failed to save resume");
    }
  };

  // ✅ Renders correct form section
  const renderForm = () => {
    switch (resumeData.currentSection) {
      case "personalInfo":
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            setResumeData={setResumeData}
          />
        );
      case "education":
        return (
          <EducationForm
            education={resumeData.education}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            experience={resumeData.experience}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "skills":
        return (
          <SkillsForm
            skills={resumeData.skills}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            projects={resumeData.projects}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      default:
        return <p>Select a section to edit</p>;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>
      {renderForm()}
      <button
        onClick={handleSave}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Save Resume
      </button>
    </div>
  );
};

export default EditResume;
