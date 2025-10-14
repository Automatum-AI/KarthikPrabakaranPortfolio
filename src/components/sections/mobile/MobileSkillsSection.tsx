import React, { useState } from 'react';
import { SpaceHUD } from '../../SpaceHUD';

interface MobileSkillsSectionProps {
  isActive: boolean;
}

export function MobileSkillsSection({ isActive }: MobileSkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Design');
  
  const skillCategories = {
    'Design': {
      title: 'DESIGN SKILLS',
      color: '#20DBE9',
      hudVariant: 'accent' as const,
      summary: 'Creative visual solutions with a focus on user experience, brand identity, and modern design principles.',
      skills: [
        { name: 'Graphic Design', level: 95 },
        { name: 'UI/UX Design', level: 92 },
        { name: 'Brand Identity', level: 88 },
        { name: 'Typography', level: 90 },
        { name: 'Logo Design', level: 94 }
      ]
    },
    'Development': {
      title: 'DEVELOPMENT SKILLS',
      color: '#5BBD96',
      hudVariant: 'secondary' as const,
      summary: 'Modern web development using cutting-edge frameworks and best practices for scalable applications.',
      skills: [
        { name: 'React Development', level: 93 },
        { name: 'TypeScript', level: 89 },
        { name: 'CSS/Tailwind', level: 91 },
        { name: 'JavaScript', level: 94 },
        { name: 'HTML5', level: 96 }
      ]
    },
    'AI & Tech': {
      title: 'AI & TECH SKILLS',
      color: '#FACC14',
      hudVariant: 'primary' as const,
      summary: 'Leveraging artificial intelligence and automation to enhance creative workflows and deliver innovative solutions.',
      skills: [
        { name: 'AI-Assisted Design', level: 88 },
        { name: 'Prompt Engineering', level: 91 },
        { name: 'Workflow Automation', level: 89 },
        { name: 'Content Generation', level: 86 },
        { name: 'Machine Learning', level: 83 }
      ]
    },
    'Tools': {
      title: 'TOOLS & SOFTWARE',
      color: '#F59E0B',
      hudVariant: 'warning' as const,
      summary: 'Professional mastery of industry-standard tools and software for design, development, and collaboration.',
      skills: [
        { name: 'Adobe Creative Suite', level: 96 },
        { name: 'Figma/Sketch', level: 94 },
        { name: 'After Effects', level: 88 },
        { name: 'Blender/C4D', level: 85 },
        { name: 'Git/GitHub', level: 92 }
      ]
    }
  };

  const currentCategory = skillCategories[selectedCategory];
  const avgMastery = Math.round(
    currentCategory.skills.reduce((sum, skill) => sum + skill.level, 0) / currentCategory.skills.length
  );

  return (
    <div 
      className="section-wrapper"
      data-section="skills"
      data-active={isActive}
    >
      <div className="h-full w-full flex flex-col px-4 py-4">
        <div className="flex-1 flex flex-col justify-evenly gap-3 overflow-y-auto">
          {/* Header */}
          <div className="hud-stagger-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full animate-pulse"
                   style={{ backgroundColor: currentCategory.color }}></div>
              <span className="text-white font-mono uppercase tracking-wider"
                    style={{ fontSize: 'clamp(12px, 3.5vw, 16px)' }}>
                SKILL MATRIX
              </span>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="hud-stagger-2">
            <div className="text-white/60 font-mono uppercase tracking-wider mb-2"
                 style={{ fontSize: 'clamp(10px, 3vw, 12px)' }}>
              Select Category
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(skillCategories).map((category) => {
                const catData = skillCategories[category];
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 font-mono uppercase tracking-wider transition-all duration-300 relative overflow-hidden ${
                      isSelected ? 'bg-black' : 'bg-black/30'
                    }`}
                    style={{
                      border: `2px solid ${catData.color}`,
                      color: isSelected ? 'white' : catData.color,
                      opacity: isSelected ? 1 : 0.5,
                      boxShadow: isSelected 
                        ? `0 0 20px ${catData.color}60, inset 0 0 15px ${catData.color}20`
                        : 'none',
                      textShadow: isSelected ? `0 0 8px ${catData.color}` : 'none',
                      fontSize: 'clamp(9px, 2.8vw, 11px)'
                    }}
                  >
                    <span className="relative z-10">{category}</span>
                    {isSelected && (
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${catData.color}40, transparent)`,
                          animation: 'advanced-scan-horizontal 2s ease-in-out infinite'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="hud-stagger-3">
            <div 
              className="p-3 border-l-2 leading-relaxed transition-all duration-300"
              style={{ 
                borderColor: currentCategory.color,
                color: currentCategory.color,
                backgroundColor: `${currentCategory.color}10`,
                fontSize: 'clamp(11px, 3.2vw, 13px)'
              }}
            >
              {currentCategory.summary}
            </div>
          </div>

          {/* Primary Skills */}
          <div className="hud-stagger-4">
            <div className="mb-2"
                 style={{ 
                   color: currentCategory.color,
                   fontSize: 'clamp(14px, 4vw, 18px)',
                   fontWeight: 900
                 }}>
              Primary Skills
            </div>
            <div className="flex flex-col gap-2">
              {currentCategory.skills.slice(0, 3).map((skill) => (
                <div key={skill.name} 
                     className="flex items-center justify-between"
                     style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-1.5 h-1.5 rounded-full"
                         style={{ backgroundColor: currentCategory.color }}></div>
                    <span className="text-white">{skill.name}</span>
                  </div>
                  <div style={{ 
                    color: currentCategory.color,
                    fontWeight: 900
                  }}>
                    {skill.level}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Skills */}
          <div className="hud-stagger-5">
            <div className="mb-2"
                 style={{ 
                   color: currentCategory.color,
                   fontSize: 'clamp(14px, 4vw, 18px)',
                   fontWeight: 900
                 }}>
              Secondary Skills
            </div>
            <div className="flex flex-col gap-2">
              {currentCategory.skills.slice(3, 5).map((skill) => (
                <div key={skill.name} 
                     className="flex items-center justify-between"
                     style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-1.5 h-1.5 rounded-full"
                         style={{ backgroundColor: currentCategory.color }}></div>
                    <span className="text-white">{skill.name}</span>
                  </div>
                  <div style={{ 
                    color: currentCategory.color,
                    fontWeight: 900
                  }}>
                    {skill.level}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="hud-stagger-6 mb-4">
            <SpaceHUD variant={currentCategory.hudVariant} title="STATS" size="small" glow={true}>
              <div className="grid grid-cols-3 gap-2">
                <div className="border p-2"
                     style={{ 
                       backgroundColor: `${currentCategory.color}10`,
                       borderColor: `${currentCategory.color}30`
                     }}>
                  <div className="text-white/60 font-mono mb-1"
                       style={{ fontSize: 'clamp(8px, 2.5vw, 10px)' }}>AVG</div>
                  <div style={{ 
                    color: currentCategory.color,
                    fontSize: 'clamp(16px, 5vw, 20px)',
                    fontWeight: 900
                  }}>
                    {avgMastery}%
                  </div>
                </div>
                
                <div className="border p-2"
                     style={{ 
                       backgroundColor: `${currentCategory.color}10`,
                       borderColor: `${currentCategory.color}30`
                     }}>
                  <div className="text-white/60 font-mono mb-1"
                       style={{ fontSize: 'clamp(8px, 2.5vw, 10px)' }}>TOTAL</div>
                  <div style={{ 
                    color: currentCategory.color,
                    fontSize: 'clamp(16px, 5vw, 20px)',
                    fontWeight: 900
                  }}>
                    {currentCategory.skills.length}
                  </div>
                </div>
                
                <div className="border p-2"
                     style={{ 
                       backgroundColor: `${currentCategory.color}10`,
                       borderColor: `${currentCategory.color}30`
                     }}>
                  <div className="text-white/60 font-mono mb-1"
                       style={{ fontSize: 'clamp(8px, 2.5vw, 10px)' }}>EXPERT</div>
                  <div style={{ 
                    color: currentCategory.color,
                    fontSize: 'clamp(16px, 5vw, 20px)',
                    fontWeight: 900
                  }}>
                    {currentCategory.skills.filter(s => s.level >= 90).length}
                  </div>
                </div>
              </div>
            </SpaceHUD>
          </div>
        </div>
      </div>
    </div>
  );
}
