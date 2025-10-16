import React, { useState } from 'react';
import { SpaceHUD } from '../../SpaceHUD';
import { skillCategories, getCategoryById, SkillCategory, Skill } from '../../../content/website-content';

interface MobileSkillsSectionProps {
  isActive: boolean;
}

export function MobileSkillsSection({ isActive }: MobileSkillsSectionProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(skillCategories[0]?.id || '');
  const currentCategory = getCategoryById(selectedCategoryId) || skillCategories[0];
  const avgMastery = Math.round(
    [...currentCategory.primarySkills, ...currentCategory.secondarySkills].reduce((sum, skill) => sum + skill.level, 0) /
    ([...currentCategory.primarySkills, ...currentCategory.secondarySkills].length || 1)
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
              {skillCategories.map((category: SkillCategory) => {
                const isSelected = selectedCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`px-3 py-2 font-mono uppercase tracking-wider transition-all duration-300 relative overflow-hidden ${
                      isSelected ? 'bg-black' : 'bg-black/30'
                    }`}
                    style={{
                      border: `2px solid ${category.color}`,
                      color: isSelected ? 'white' : category.color,
                      opacity: isSelected ? 1 : 0.5,
                      boxShadow: isSelected 
                        ? `0 0 20px ${category.color}60, inset 0 0 15px ${category.color}20`
                        : 'none',
                      textShadow: isSelected ? `0 0 8px ${category.color}` : 'none',
                      fontSize: 'clamp(9px, 2.8vw, 11px)'
                    }}
                  >
                    <span className="relative z-10">{category.name}</span>
                    {isSelected && (
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${category.color}40, transparent)`,
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
              {currentCategory.description}
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
              {currentCategory.primarySkills.map((skill: Skill) => (
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
              {currentCategory.secondarySkills.map((skill: Skill) => (
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
              <SpaceHUD variant="accent" title="STATS" size="small" glow={true}>
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
                    {[...currentCategory.primarySkills, ...currentCategory.secondarySkills].length}
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
                    {[...currentCategory.primarySkills, ...currentCategory.secondarySkills].filter(s => s.level >= 90).length}
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
