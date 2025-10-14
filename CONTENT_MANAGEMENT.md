# 🎯 Content Management System

This document explains how to manage all website content through the centralized content management system.

## 📁 File Structure

```
src/content/
├── website-content.ts    # ✨ Main content file (edit this!)
├── index.ts             # 📤 Export file (don't edit)
└── README.md            # 📚 Detailed documentation
```

## 🚀 Quick Start

All website content is centralized in `/src/content/website-content.ts`. To update any text, data, or configuration on your website, simply edit this file!

### 🎯 Skills Management (Most Common Update)

```typescript
// Edit these arrays in website-content.ts
export const PRIMARY_SKILLS: Skill[] = [
  {
    name: "Your Skill Name",
    category: "Design", // or "Development", "AI", "Leadership", "Strategy"
    level: 95, // 0-100
    description: "Brief description of your expertise",
    color: "#20DBE9", // Skill color
    isPrimary: true
  }
  // ... add more skills
];
```

**Quick Actions:**
- **Add New Skill**: Add object to `PRIMARY_SKILLS` or `SECONDARY_SKILLS`
- **Change Categories**: Update `category` field and colors will update automatically
- **Reorder Skills**: Reorder objects in arrays
- **Update Levels**: Change `level` value (0-100)

## 📝 Content Categories

### 1. **Personal Information**
```typescript
// Your profile data
export const profileData: ProfileData = {
  name: "KARTHIK PRABAKARAN",
  designation: "Sr. Graphic Designer/AI Generalist",
  bio: "Your bio text here...",
  location: "Bangalore, India",
  experience: "10+ Years"
};
```

### 2. **Contact Information**
```typescript
// Contact methods (email, LinkedIn, etc.)
export const contactMethods: ContactMethod[] = [
  {
    icon: "📧",
    label: "Email",
    value: "your.email@gmail.com",
    href: "mailto:your.email@gmail.com"
  }
];

// Contact form collaboration types
export const collaborationTypes = [
  { title: 'Brand Identity', icon: '🎨', color: '#20DBE9' },
  { title: 'AI Implementation', icon: '🤖', color: '#10B981' }
];
```

### 3. **Projects Portfolio**
```typescript
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Your Project Name",
    category: "AI Development",
    description: "Project description...",
    technologies: ["React", "TypeScript", "AI"],
    status: "Completed",
    year: "2024"
  }
];
```

### 4. **Work Experience**
```typescript
export const experience: Experience[] = [
  {
    id: "job-1",
    title: "Senior Designer",
    company: "Company Name",
    period: "2020-2024",
    responsibilities: ["Task 1", "Task 2"],
    achievements: ["Achievement 1", "Achievement 2"]
  }
];
```

### 5. **Navigation & UI**
```typescript
// Section navigation
export const navigationSections = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

// Coordinate system colors
export const coordinateData = [
  { label: 'X', color: '#63c9d9' },
  { label: 'Y', color: '#5bbd96' },
  { label: 'Z', color: '#e5cb41' }
];
```

## 🎨 Color System

The website uses a consistent color scheme:

- **Primary**: `#FACC14` (Gold/Yellow)
- **Secondary**: `#20DBE9` (Cyan) 
- **Accent**: `#5BBD96` (Green)
- **Warning**: `#EF4444` (Red)
- **Purple**: `#A855F7`

## 🛠 Advanced Customization

### Adding New Skills Categories

1. Add skills with new category name:
```typescript
{
  name: "New Skill",
  category: "New Category", // 👈 New category name
  // ... other properties
}
```

2. Skills section will automatically:
   - Generate new category
   - Assign default colors
   - Create category summaries

### Customizing Category Colors & Descriptions

Edit the helper functions in `SkillsSection.tsx`:

```typescript
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Your Category': return '#YOUR_COLOR';
    // ... add your categories
  }
};
```

## 📱 Component Integration

### How Components Use Content

Components automatically import and use the centralized content:

```typescript
// ✅ Components import from centralized content
import { skills, projects, contactInfo } from '../../content/website-content';

// ✅ Content updates automatically everywhere
const skillsList = skills.map(skill => skill.name);
```

### No More Hardcoded Data

❌ **Before (Bad):**
```typescript
// Hardcoded in component
const skills = ["React", "TypeScript", "Design"];
```

✅ **After (Good):**
```typescript
// Centralized in content file
import { skills } from '../content/website-content';
```

## 🔄 Helper Functions

Use these functions to work with your data:

```typescript
// Skills management
getSkillsByCategory('Design')     // Get all design skills
getPrimarySkills()               // Get all primary skills
getTopSkills(5)                  // Get top 5 skills
getSkillsByProficiency(90)       // Get skills above 90%

// Import these functions
import { getSkillsByCategory, getPrimarySkills } from '../content/website-content';
```

## ⚡ Quick Reference

| What to Update | File Location | Section |
|---------------|---------------|---------|
| Skills & Categories | `website-content.ts` | `PRIMARY_SKILLS` / `SECONDARY_SKILLS` |
| Personal Info | `website-content.ts` | `profileData` |
| Contact Details | `website-content.ts` | `contactMethods`, `contactInfo` |
| Projects | `website-content.ts` | `projects` array |
| Work Experience | `website-content.ts` | `experience` array |
| About Section | `website-content.ts` | `aboutData` |

## 🚨 Important Notes

1. **TypeScript Safety**: All content is type-checked - you'll get errors for invalid data
2. **Automatic Updates**: Changes to `website-content.ts` automatically update all components
3. **No Component Edits**: Never edit component files for content changes
4. **Consistent Structure**: Keep the same object structure when adding new items

## 🔧 Troubleshooting

**Problem**: New content not showing up
- **Solution**: Check for TypeScript errors, ensure proper object structure

**Problem**: Colors not matching
- **Solution**: Use the standard color system values listed above

**Problem**: Skills not appearing in categories
- **Solution**: Ensure `category` field matches exactly (case-sensitive)

---

## 🎉 Ready to Customize?

1. Open `/src/content/website-content.ts`
2. Find the section you want to update
3. Edit the values
4. Save the file
5. Check your website - changes appear instantly! 

**Need help?** Check `/src/content/README.md` for detailed technical documentation.