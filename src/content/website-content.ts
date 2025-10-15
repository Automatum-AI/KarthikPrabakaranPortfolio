// Website Content Configuration
// This file contains all the static content for the space-themed portfolio

export interface ProfileData {
  name: string;
  designation: string;
  avatar: string;
  bio: string;
  location: string;
  experience: string;
}

export interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  href: string;
  description: string;
}

export interface ContactInfo {
  mobile: string;
  email: string;
  location: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  description: string;
  color: string;
  isPrimary: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  primarySkills: Skill[];
  secondarySkills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  status: string;
  year: string;
  link?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  type: "full-time" | "freelance" | "contract";
}

export interface SectionLabels {
  skills: {
    terminalTitle: string;
    categoryTitle: string;
    matrixStatsTitle: string;
    totalSkillsLabel: string;
    expertLevelLabel: string;
    primarySkillsTitle: string;
    supportingSkillsTitle: string;
  };
  home: {
    heroText: string;
  };
  experience: {
    terminalTitle: string;
    serviceSummaryTitle: string;
    missionHistoryTitle: string;
    careerDetailsTitle: string;
    companyLabel: string;
    durationLabel: string;
    locationLabel: string;
  };
  about: {
    profileStatusTitle: string;
    personalDataTitle: string;
    achievementsTitle: string;
  };
  projects: {
    archiveTitle: string;
    missionStatusTitle: string;
    projectDetailsTitle: string;
  };
  contact: {
    commChannelTitle: string;
    collaborationTitle: string;
    contactFormTitle: string;
    missionBriefingTitle: string;
    socialLinksTitle: string;
  };
}

// Profile information
export const profileData: ProfileData = {
  name: "KARTHIK PRABAKARAN",
  designation: "Sr. Graphic Designer/AI Generalist",
  avatar: "🚀",
  bio: "As an innovative and dedicated designer with 10+ years of experience, I've embraced new design trends and technologies, allowing me to stay ahead in a rapidly evolving field. I excel in collaborating with clients, team members, and stakeholders to deliver designs that exceed expectations.",
  location: "Bangalore, India",
  experience: "10+ Years"
};

// Section-specific labels and titles
export const sectionLabels: SectionLabels = {
  skills: {
    terminalTitle: "SKILL MATRIX TERMINAL",
    categoryTitle: "Select Category",
    matrixStatsTitle: "MATRIX STATS",
    totalSkillsLabel: "Total Skills",
    expertLevelLabel: "Expert Level",
    primarySkillsTitle: "Core Expertise",
    supportingSkillsTitle: "Supporting Skills"
  },
  home: {
    heroText: "BEYOND EARTH. BEYOND DESIGN."
  },
  experience: {
    terminalTitle: "CAREER TRAJECTORY",
    serviceSummaryTitle: "SERVICE SUMMARY",
    missionHistoryTitle: "MISSION HISTORY",
    careerDetailsTitle: "CAREER DETAILS",
    companyLabel: "COMPANY",
    durationLabel: "DURATION", 
    locationLabel: "LOCATION"
  },
  about: {
    profileStatusTitle: "COMMANDER PROFILE",
    personalDataTitle: "PERSONAL DATA",
    achievementsTitle: "MISSION ACHIEVEMENTS"
  },
  projects: {
    archiveTitle: "MISSION ARCHIVE",
    missionStatusTitle: "MISSION STATUS",
    projectDetailsTitle: "PROJECT DETAILS"
  },
  contact: {
    commChannelTitle: "COMMUNICATION CHANNELS",
    collaborationTitle: "COLLABORATION TYPES",
    contactFormTitle: "ESTABLISH CONTACT",
    missionBriefingTitle: "MISSION BRIEFING",
    socialLinksTitle: "SOCIAL LINKS"
  }
};



// Contact methods
export const contactMethods: ContactMethod[] = [
  {
    icon: "📧",
    label: "Email",
    value: "karthikbellus@gmail.com",
    href: "mailto:karthikbellus@gmail.com",
    description: "karthikbellus@gmail.com",
  },
  {
    icon: "🔗",
    label: "LinkedIn",
    value: "/in/karthik-prabakaran",
    href: "https://www.linkedin.com/in/karthik-prabakaran",
    description: "/in/karthik-prabakaran",
  },
  {
    icon: "🌐",
    label: "Portfolio",
    value: "karthikprabakaran.weebly.com",
    href: "https://karthikprabakaran.weebly.com",
    description: "karthikprabakaran.weebly.com",
  },
];

// Contact information
export const contactInfo: ContactInfo = {
  mobile: "+91 99945 42400",
  email: "karthikbellus@gmail.com",
  location: "Bangalore, India"
};

// Social links
export const socialLinks = [
  {
    name: "Email",
    url: "mailto:karthikbellus@gmail.com",
    icon: "📧",
    color: "#20DBE9"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/karthik-prabakaran",
    icon: "💼",
    color: "#10B981"
  },
  {
    name: "Portfolio",
    url: "https://karthikprabakaran.weebly.com",
    icon: "🌐",
    color: "#FACC14"
  }
];

// Collaboration types for contact section
export const collaborationTypes = [
  { title: 'Brand Identity', icon: '🎨', color: '#20DBE9' },
  { title: 'AI Implementation', icon: '🤖', color: '#10B981' },
  { title: 'Web Development', icon: '💻', color: '#A855F7' },
  { title: 'Consultation', icon: '💡', color: '#F59E0B' }
];

// Additional communication channels
export const additionalChannels = [
  { icon: '🐦', label: 'Twitter', value: '@karthik_design', color: '#20DBE9' },
  { icon: '💼', label: 'Portfolio', value: 'behance.net/karthik', color: '#5BBD96' },
  { icon: '💬', label: 'Discord', value: 'karthik#1234', color: '#A855F7' }
];

// Navigation sections
export const navigationSections = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

// Section title mapping for the left side display
export const sectionTitleMapping: Record<string, string> = {
  'Home': 'MISSION CONTROL',
  'About': 'COMMANDER PROFILE', 
  'Skills': 'TECH ARSENAL',
  'Projects': 'MISSION ARCHIVES',
  'Experience': 'SERVICE RECORD',
  'Contact': 'COMMUNICATIONS'
};

// Coordinate system data for headers/footers
export const coordinateData = [
  { label: 'X', color: '#63c9d9' },
  { label: 'Y', color: '#5bbd96' },
  { label: 'Z', color: '#e5cb41' }
];



// ================================
// CENTRALIZED SKILL CATEGORIES SYSTEM
// ================================
// 
// 🎯 SKILL CATEGORIES WITH PRIMARY & SECONDARY SKILLS
// Each category contains:
// - Category info (name, description, color, icon)
// - Primary skills (core expertise, 85-98% proficiency)
// - Secondary skills (supporting skills, 70-90% proficiency)
//

export const skillCategories: SkillCategory[] = [
  // 🎨 DESIGN CATEGORY
  {
    id: 'design',
    name: 'Design',
    description: 'Creative visual solutions with a focus on user experience, brand identity, and modern design principles. Expert-level proficiency in industry-standard tools and methodologies.',
    color: '#20DBE9',
    icon: '🎨',
    primarySkills: [
      { name: "Branding", category: "Design", level: 98, isPrimary: true, description: "Expert-level photo editing and digital design", color: "#20DBE9" },
      { name: "Graphic Design", category: "Design", level: 96, isPrimary: true, description: "Advanced vector graphics and logo design", color: "#20DBE9" },
      { name: "Presentations", category: "Design", level: 98, isPrimary: true, description: "Comprehensive visual design expertise", color: "#20DBE9" },
      { name: "Creative Strategies", category: "Design", level: 94, isPrimary: true, description: "Brand identity and strategy development", color: "#20DBE9" },
    ],
    secondarySkills: [
      { name: "Photoshop", category: "Design", level: 90, isPrimary: false, description: "Professional layout and publication design", color: "#20DBE9" },
      { name: "Illustrator", category: "Design", level: 88, isPrimary: false, description: "Motion graphics and animation", color: "#20DBE9" },
      { name: "Indesign", category: "Design", level: 85, isPrimary: false, description: "3D design and product visualization", color: "#20DBE9" },
      { name: "Figma", category: "Design", level: 90, isPrimary: false, description: "User interface and experience design", color: "#20DBE9" },
    ]
  },

  // 🤖 AI CATEGORY
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Leveraging artificial intelligence and automation to enhance creative workflows and deliver innovative solutions. Expertise in generative AI, prompt engineering, and workflow automation.',
    color: '#FACC14',
    icon: '🤖',
    primarySkills: [
      { name: "Gen AI", category: "AI", level: 92, isPrimary: true, description: "Generative AI for creative workflows", color: "#FACC14" },
      { name: "Prompt Engineering", category: "AI", level: 90, isPrimary: true, description: "Advanced prompt crafting and AI optimization", color: "#FACC14" },
      { name: "AI Automation", category: "AI", level: 88, isPrimary: true, description: "Workflow automation and process optimization", color: "#FACC14" },
    ],
    secondarySkills: [
      { name: "App Development", category: "AI", level: 75, isPrimary: false, description: "Basic ML concepts and applications", color: "#FACC14" },
      { name: "Image Generation", category: "AI", level: 85, isPrimary: false, description: "Integrating AI tools into creative workflows", color: "#FACC14" },
      { name: "Data Analysis", category: "AI", level: 80, isPrimary: false, description: "Data-driven insights and optimization", color: "#FACC14" },
    ]
  },


  // 💻 DEVELOPMENT CATEGORY
  {
    id: 'uiux',
    name: 'Ui/UX Design',
    description: 'Modern web development using cutting-edge frameworks and best practices for scalable applications. Growing expertise in full-stack development and modern web technologies.',
    color: '#5BBD96',
    icon: '💻',
    primarySkills: [
      { name: "Web Design", category: "Development", level: 85, isPrimary: true, description: "Website and app development with AI assistance", color: "#5BBD96" },
      { name: "App Design", category: "Development", level: 80, isPrimary: true, description: "Modern web framework development", color: "#5BBD96" },
    ],
    secondarySkills: [
      { name: "TypeScript", category: "Development", level: 78, isPrimary: false, description: "Type-safe JavaScript development", color: "#5BBD96" },
      { name: "HTML/CSS", category: "Development", level: 90, isPrimary: false, description: "Modern web markup and styling", color: "#5BBD96" },
      { name: "JavaScript", category: "Development", level: 82, isPrimary: false, description: "Interactive web development", color: "#5BBD96" },
      { name: "Responsive Design", category: "Development", level: 88, isPrimary: false, description: "Mobile-first web development", color: "#5BBD96" },
    ]
  },


];


// Generate flat arrays for backward compatibility
export const PRIMARY_SKILLS: Skill[] = skillCategories.flatMap(category => category.primarySkills);
export const SECONDARY_SKILLS: Skill[] = skillCategories.flatMap(category => category.secondarySkills);
export const skills: Skill[] = [...PRIMARY_SKILLS, ...SECONDARY_SKILLS];

// 📊 ENHANCED SKILLS ANALYTICS
export const getSkillsByCategory = (categoryId: string): Skill[] => {
  const category = skillCategories.find(cat => cat.id === categoryId || cat.name === categoryId);
  return category ? [...category.primarySkills, ...category.secondarySkills] : [];
};

export const getCategoryById = (categoryId: string): SkillCategory | undefined => {
  return skillCategories.find(cat => cat.id === categoryId);
};

export const getPrimarySkillsByCategory = (categoryId: string): Skill[] => {
  const category = getCategoryById(categoryId);
  return category ? category.primarySkills : [];
};

export const getSecondarySkillsByCategory = (categoryId: string): Skill[] => {
  const category = getCategoryById(categoryId);
  return category ? category.secondarySkills : [];
};

export const getAllCategories = (): SkillCategory[] => skillCategories;

export const getPrimarySkills = (): Skill[] => PRIMARY_SKILLS;
export const getSecondarySkills = (): Skill[] => SECONDARY_SKILLS;
export const getTopSkills = (count: number = 5): Skill[] => PRIMARY_SKILLS.slice(0, count);
export const getSkillsByProficiency = (minLevel: number = 90): Skill[] => skills.filter(skill => skill.level >= minLevel);

// 🎯 CATEGORY SUMMARY HELPER
export const getCategorySummary = (categoryId: string): { 
  totalSkills: number; 
  primaryCount: number; 
  secondaryCount: number; 
  averageLevel: number;
  category: SkillCategory | undefined;
} => {
  const category = getCategoryById(categoryId);
  if (!category) {
    return { totalSkills: 0, primaryCount: 0, secondaryCount: 0, averageLevel: 0, category: undefined };
  }
  
  const allCategorySkills = [...category.primarySkills, ...category.secondarySkills];
  const averageLevel = Math.round(
    allCategorySkills.reduce((sum, skill) => sum + skill.level, 0) / allCategorySkills.length
  );
  
  return {
    totalSkills: allCategorySkills.length,
    primaryCount: category.primarySkills.length,
    secondaryCount: category.secondarySkills.length,
    averageLevel,
    category
  };
};

// Projects data
export const projects: Project[] = [
  {
    id: "ai-brand-generator",
    title: "AI Brand Generator Platform",
    category: "AI Development",
    description: "Developed a comprehensive AI-powered platform that generates complete brand identities including logos, color palettes, typography, and brand guidelines. Used custom-trained models and advanced prompt engineering.",
    technologies: ["Stable Diffusion", "Python", "React", "Node.js", "OpenAI API"],
    image: "ai-brand-platform",
    status: "Live",
    year: "2024",
    link: "https://example.com"
  },
  {
    id: "cosmic-portfolio",
    title: "Interactive Space Portfolio",
    category: "Web Design",
    description: "Created an immersive portfolio website with space exploration theme, featuring smooth animations, interactive elements, and responsive design. Showcases creativity while maintaining professional standards.",
    technologies: ["React", "Three.js", "Motion", "Tailwind CSS"],
    image: "cosmic-portfolio",
    status: "Beta",
    year: "2024"
  },
  {
    id: "neural-art-installation",
    title: "Neural Network Art Installation",
    category: "AI Art",
    description: "Collaborated with a contemporary art museum to create an interactive installation that generates art based on visitor emotions, using computer vision and generative AI models.",
    technologies: ["TensorFlow", "OpenCV", "Processing", "Arduino"],
    image: "neural-art",
    status: "Exhibited",
    year: "2023"
  },
  {
    id: "sustainable-design-system",
    title: "Sustainable Design System",
    category: "Design System",
    description: "Built a comprehensive design system for an eco-friendly tech startup, focusing on accessibility, sustainability metrics, and carbon footprint reduction in digital products.",
    technologies: ["Figma", "Storybook", "React", "Design Tokens"],
    image: "sustainable-design",
    status: "Implemented",
    year: "2023"
  },
  {
    id: "ai-video-editor",
    title: "AI-Powered Video Editor",
    category: "AI Development",
    description: "Designed and prototyped an AI assistant for video editing that automatically suggests cuts, transitions, and effects based on content analysis and user preferences.",
    technologies: ["After Effects", "Python", "OpenAI", "FFmpeg"],
    image: "ai-video-editor",
    status: "Prototype",
    year: "2024"
  },
  {
    id: "metaverse-gallery",
    title: "Virtual Reality Art Gallery",
    category: "VR/AR",
    description: "Created an immersive VR gallery experience for digital artists, featuring spatial audio, interactive exhibits, and real-time collaboration features for virtual art appreciation.",
    technologies: ["Unity", "Blender", "Oculus SDK", "WebXR"],
    image: "vr-gallery",
    status: "Beta",
    year: "2023"
  }
];

// Experience data
export const experience: Experience[] = [
  {
    id: "kreditbee-senior",
    title: "Senior Graphic Designer",
    company: "KreditBee",
    period: "May 2022 - Present",
    location: "Bangalore",
    description: "Leading design initiatives for fintech marketing communications. Manage and mentor a team of 4 designers while creating engaging marketing materials and developing creative campaigns.",
    responsibilities: [
      "Develop marketing communication materials: push notifications, WhatsApp banners, and emailers",
      "Manage and mentor a team of 4 designers, fostering collaboration and growth",
      "Generate creative campaign ideas and develop presentations for stakeholders",
      "Create innovative concepts driving marketing initiatives from brainstorming to execution",
      "Maintain high standards of quality in all creative outputs",
      "Liaise with design agencies ensuring project alignment and timely delivery"
    ],
    achievements: [
      "Successfully led creative team delivering consistent brand communication",
      "Developed multiple successful marketing campaigns for fintech products",
      "Established design guidelines and quality standards for team",
      "Built strong agency relationships ensuring efficient project execution"
    ],
    technologies: ["Photoshop", "Illustrator", "After Effects", "Digital Marketing", "Team Management"],
    type: "full-time"
  },
  {
    id: "citypage-creative-head",
    title: "Creative Head",
    company: "City Page",
    period: "Dec 2020 - Jan 2022",
    location: "Erode",
    description: "Led creative strategy and execution for multiple client businesses. Managed comprehensive digital marketing, branding, and creative concept development while maintaining high-quality standards.",
    responsibilities: [
      "Develop and implement comprehensive digital marketing strategies",
      "Collaborate with clients to understand brand goals and tailor marketing solutions",
      "Conceptualize and execute creative campaign ideas aligned with client objectives",
      "Generate innovative creative concepts for digital ads, social media, and email campaigns",
      "Maintain consistency and quality in all creative outputs",
      "Serve as primary point of contact managing relationships across multiple businesses"
    ],
    achievements: [
      "Successfully managed clients from multiple businesses with tailored solutions",
      "Created data-driven campaigns optimizing performance",
      "Implemented best practices for creative workflows and quality control",
      "Built strong client relationships ensuring satisfaction and repeat business"
    ],
    technologies: ["Adobe Creative Suite", "Digital Marketing", "Brand Strategy", "Client Management"],
    type: "full-time"
  },
  {
    id: "kreditbee-designer",
    title: "Graphic Designer",
    company: "KreditBee",
    period: "Sept 2019 - Nov 2020",
    location: "Bangalore",
    description: "Created visually appealing designs for various digital and print platforms. Focused on banner design, brochures, ad networks, and email marketing with emphasis on brand consistency.",
    responsibilities: [
      "Conceptualize and create visually appealing banners for various platforms",
      "Design informative and attractive brochures communicating key messages",
      "Develop eye-catching ad network designs for different digital advertising platforms",
      "Design compelling emailers focusing on visual appeal and user experience",
      "Work closely with marketing and content teams to meet campaign objectives",
      "Ensure all designs align with brand guidelines and maintain visual consistency"
    ],
    achievements: [
      "Delivered high-quality designs enhancing brand visibility",
      "Improved email marketing performance through compelling design",
      "Maintained brand consistency across all marketing materials",
      "Stayed updated with latest design trends keeping visuals fresh and engaging"
    ],
    technologies: ["Photoshop", "Illustrator", "InDesign", "Email Marketing", "Digital Design"],
    type: "full-time"
  },
  {
    id: "trescon-designer",
    title: "Graphic Designer",
    company: "Trescon Global Business Solution Pvt Ltd",
    period: "Sept 2018 - April 2019",
    location: "Bangalore",
    description: "Specialized in event-related design materials including logos, banners, brochures, emailers, and keynote speaker slides. Ensured brand consistency across all event materials.",
    responsibilities: [
      "Create unique and memorable logos tailored to event themes and branding",
      "Develop eye-catching banners for both digital and print formats",
      "Design informative and visually appealing brochures with event details",
      "Produce engaging emailers for event promotions and communications",
      "Design professional and impactful keynote speaker slides",
      "Work closely with event coordinators and marketing teams to deliver on time"
    ],
    achievements: [
      "Successfully delivered designs for multiple international business events",
      "Created cohesive visual identities for various event series",
      "Ensured highest quality standards with thorough design reviews",
      "Built strong relationships with event teams and stakeholders"
    ],
    technologies: ["Photoshop", "Illustrator", "InDesign", "Presentation Design", "Event Branding"],
    type: "full-time"
  },
  {
    id: "cactus-designer",
    title: "Graphic Designer",
    company: "Cactus Menswear Pvt Ltd",
    period: "Dec 2017 - June 2018",
    location: "Bangalore",
    description: "Focused on apparel industry design including logos, banners, marketing tags, job cards, and Pantone color verification. Ensured brand consistency across products and materials.",
    responsibilities: [
      "Develop unique and memorable logos enhancing brand identity",
      "Create visually striking banners for online and offline marketing campaigns",
      "Design attractive and informative marketing tags for apparel products",
      "Produce detailed job cards for manufacturing and production processes",
      "Verify and ensure accurate use of Pantone colors maintaining brand consistency",
      "Collaborate with marketing, production, and product development teams"
    ],
    achievements: [
      "Maintained consistent brand identity across all visual designs",
      "Ensured accurate color reproduction across various products and materials",
      "Contributed to successful product launches through effective design",
      "Streamlined design-to-production workflow with clear job cards"
    ],
    technologies: ["Photoshop", "Illustrator", "Pantone Color System", "Print Design", "Apparel Design"],
    type: "full-time"
  },
  {
    id: "pepperagro-designer",
    title: "Graphic Designer",
    company: "PepperAgro",
    period: "May 2015 - Dec 2017",
    location: "Bangalore",
    description: "Comprehensive design role including logo design, web banners, social media, website maintenance, product photography, and packaging design. Coordinated with manufacturers for production.",
    responsibilities: [
      "Create and maintain unique brand-consistent logos and visual identity",
      "Design engaging web banners aligned with marketing campaigns and promotions",
      "Develop creative social media posts enhancing online presence and engagement",
      "Regularly update and maintain company website with current visual content",
      "Conduct high-quality product photography sessions including styling and editing",
      "Design innovative and attractive product packaging ensuring functionality",
      "Coordinate with manufacturers overseeing packaging box production"
    ],
    achievements: [
      "Built comprehensive brand identity system from ground up",
      "Increased social media engagement through creative and consistent posts",
      "Successfully managed complete design-to-production workflow",
      "Delivered high-quality product photography used across all platforms"
    ],
    technologies: ["Photoshop", "Illustrator", "Photography", "Web Design", "Packaging Design"],
    type: "full-time"
  }
];

