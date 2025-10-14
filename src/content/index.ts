/**
 * Content Index - Central export for all website content
 * This file exports all content from website-content.ts for easy importing
 */

export {
  // Types
  type PortfolioSection,
  type ProfileData,
  type QuickStat,
  type ContactMethod,
  type MissionLogEntry,
  type Skill,
  type SkillCategory,
  type Project,
  type Experience,
  type AboutData,
  
  // Data
  portfolioSections,
  profileData,
  homeIntroText,
  quickStats,
  contactMethods,
  contactInfo,
  socialLinks,
  collaborationTypes,
  additionalChannels,
  getMissionLogEntries,
  statusColors,
  navigationLabels,
  navigationSections,
  coordinateData,
  aboutData,
  skills,
  projects,
  experience,
  
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
