/**
 * Content Index - Central export for all website content
 * This file exports all content from website-content.ts for easy importing
 */

export {
  // Types
  type ProfileData,
  type ContactMethod,
  type ContactInfo,
  type Skill,
  type SkillCategory,
  type Project,
  type Experience,
  type SectionLabels,
  
  // Data
  profileData,
  contactMethods,
  contactInfo,
  socialLinks,
  collaborationTypes,
  additionalChannels,
  navigationSections,
  sectionTitleMapping,
  coordinateData,
  skills,
  projects,
  experience,
  sectionLabels,
  
  // Skills Management - New Category System
  skillCategories,
  PRIMARY_SKILLS,
  SECONDARY_SKILLS,
  getSkillsByCategory,
  getCategoryById,
  getPrimarySkillsByCategory,
  getSecondarySkillsByCategory,
  getAllCategories,
  getCategorySummary,
  getPrimarySkills,
  getSecondarySkills,
  getTopSkills,
  getSkillsByProficiency,
} from './website-content';
