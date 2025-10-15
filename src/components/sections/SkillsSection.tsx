import React, { useState, useMemo, useEffect } from 'react';
import { SpaceHUD } from '../SpaceHUD';
import { SectionLayout, ThreeColumnLayout } from '../SectionLayout';
import { skillCategories, getCategoryById, sectionLabels } from '../../content';
import { Skill } from '../../content/website-content';

interface SkillsSectionProps {
  isActive: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isActive }) => {
  // default to the first category if available so a category is always selected
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(() => (skillCategories && skillCategories.length > 0 ? skillCategories[0].id : ''));
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Get the current category
  const currentCategory = useMemo(() => {
    return getCategoryById(selectedCategoryId) || skillCategories[0];
  }, [selectedCategoryId]);

  // If categories change (or the selected id becomes invalid), ensure we always have a valid selection
  useEffect(() => {
    if (!selectedCategoryId && skillCategories.length > 0) {
      setSelectedCategoryId(skillCategories[0].id);
      return;
    }

    const exists = skillCategories.some(c => c.id === selectedCategoryId);
    if (!exists && skillCategories.length > 0) {
      setSelectedCategoryId(skillCategories[0].id);
    }
  }, [skillCategories, selectedCategoryId]);

  // Combine primary and secondary skills for display
  const allSkills = useMemo(() => {
    if (!currentCategory) return [];
    return [...currentCategory.primarySkills, ...currentCategory.secondarySkills];
  }, [currentCategory]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!currentCategory) return { total: 0, expert: 0, avgLevel: 0, primaryCount: 0, secondaryCount: 0 };
    
    const total = allSkills.length;
    const expert = allSkills.filter(skill => skill.level >= 90).length;
    const avgLevel = total > 0 ? Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / total) : 0;
    const primaryCount = currentCategory.primarySkills.length;
    const secondaryCount = currentCategory.secondarySkills.length;
    
    return { total, expert, avgLevel, primaryCount, secondaryCount };
  }, [currentCategory, allSkills]);

  return (
    <SectionLayout isActive={isActive} sectionId="skills">
      <ThreeColumnLayout
        left={
          <div className="flex flex-col gap-6">
            <div className="hud-stagger-1 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full animate-pulse"
                   style={{ backgroundColor: currentCategory.color }}></div>
              <span className="text-white font-mono text-lg tracking-wider uppercase">
                {sectionLabels.skills.terminalTitle}
              </span>
            </div>
            
            <h3 className="hud-stagger-2 text-white/60 font-mono text-sm uppercase tracking-wider">
              {sectionLabels.skills.categoryTitle}
            </h3>
            
            <div className="hud-stagger-3 flex flex-col gap-3">
              {skillCategories.map((category) => {
                const isSelected = selectedCategoryId === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`px-4 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300 relative overflow-hidden w-full ${
                      isSelected ? 'bg-black text-white' : 'bg-black/30 hover:bg-black/50'
                    }`}
                    style={{
                      border: `2px solid ${category.color}`,
                      color: isSelected ? 'white' : category.color,
                      opacity: isSelected ? 1 : 0.4,
                      boxShadow: isSelected 
                        ? `0 0 30px ${category.color}80, inset 0 0 20px ${category.color}20, 0 0 10px ${category.color}40`
                        : 'none',
                      textShadow: isSelected ? `0 0 10px ${category.color}, 0 0 20px ${category.color}80` : 'none'
                    }}
                  >
                    <span className="relative z-10">{category.name}</span>
                    
                    {isSelected && (
                      <>
                        <div 
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{ 
                            background: `linear-gradient(90deg, transparent, ${category.color}40, transparent)`,
                            animation: 'advanced-scan-horizontal 3s ease-in-out infinite'
                          }}
                        />
                        <div 
                          className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{ 
                            background: `linear-gradient(45deg, ${category.color}00, ${category.color}40, ${category.color}00)`,
                            animation: 'space-title-shine 2s ease-in-out infinite'
                          }}
                        />
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            <div 
              className="hud-stagger-4 p-4 border-l-2 text-sm leading-relaxed transition-all duration-300"
              style={{ 
                borderColor: currentCategory.color,
                color: currentCategory.color,
                backgroundColor: `${currentCategory.color}10`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full animate-pulse"
                     style={{ backgroundColor: currentCategory.color }}></div>
                <span className="font-mono text-xs uppercase tracking-wider">
                  {currentCategory.name} Overview
                </span>
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
          </div>
        }
        
        middle={
          <div className="flex flex-col gap-8">
            <div className="space-y-10">
              {/* Primary Skills */}
              <div>
                <h3 
                  className="font-bold text-xl uppercase tracking-wider mb-6"
                  style={{ 
                    color: currentCategory.color,
                    textShadow: `0 0 10px ${currentCategory.color}80`
                  }}
                >
                  {sectionLabels.skills.primarySkillsTitle}
                </h3>
                <div className="space-y-2">
                  {currentCategory.primarySkills.map((skill: Skill) => (
                    <div key={skill.name} className="text-white/90 text-sm">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Skills */}
              {currentCategory.secondarySkills.length > 0 && (
                <div>
                  <h3 
                    className="font-bold text-xl uppercase tracking-wider mb-6"
                    style={{ 
                      color: currentCategory.color,
                      textShadow: `0 0 10px ${currentCategory.color}80`
                    }}
                  >
                    {sectionLabels.skills.supportingSkillsTitle}
                  </h3>
                  <div className="space-y-2">
                    {currentCategory.secondarySkills.map((skill: Skill) => (
                      <div key={skill.name} className="text-white/70 text-sm">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        }
        
        right={
          <div className="flex flex-col gap-6">
            <SpaceHUD variant="accent" title={sectionLabels.skills.matrixStatsTitle} size="medium" glow={true}>
              <div className="space-y-4">
                <div className="stat-item">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-white/60 uppercase">{sectionLabels.skills.totalSkillsLabel}</span>
                    <span className="font-mono text-lg text-white">{stats.total}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${Math.min(stats.total * 10, 100)}%`,
                        backgroundColor: currentCategory.color,
                        boxShadow: `0 0 10px ${currentCategory.color}80`
                      }}
                    />
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-white/60 uppercase">{sectionLabels.skills.expertLevelLabel}</span>
                    <span className="font-mono text-lg text-white">{stats.expert}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${stats.total > 0 ? (stats.expert / stats.total) * 100 : 0}%`,
                        backgroundColor: '#10B981',
                        boxShadow: '0 0 10px #10B98180'
                      }}
                    />
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-white/60 uppercase">Avg Mastery</span>
                    <span className="font-mono text-lg text-white">{stats.avgLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${stats.avgLevel}%`,
                        backgroundColor: '#FACC14',
                        boxShadow: '0 0 10px #FACC1480'
                      }}
                    />
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-white/60 uppercase">Primary/Secondary</span>
                    <span className="font-mono text-lg text-white">{stats.primaryCount}/{stats.secondaryCount}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1 flex">
                    <div 
                      className="h-full transition-all duration-700"
                      style={{ 
                        width: `${stats.total > 0 ? (stats.primaryCount / stats.total) * 100 : 0}%`,
                        backgroundColor: currentCategory.color,
                        boxShadow: `0 0 5px ${currentCategory.color}80`
                      }}
                    />
                    <div 
                      className="h-full transition-all duration-700"
                      style={{ 
                        width: `${stats.total > 0 ? (stats.secondaryCount / stats.total) * 100 : 0}%`,
                        backgroundColor: `${currentCategory.color}60`,
                        boxShadow: `0 0 5px ${currentCategory.color}40`
                      }}
                    />
                  </div>
                </div>
              </div>
            </SpaceHUD>

            <SpaceHUD variant="warning" title="SYSTEM INFO" size="small">
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400">MATRIX ACTIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-white/60">CATEGORY: {currentCategory.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-white/60">MODE: ASSESSMENT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-white/60">PRIORITY: HIGH</span>
                </div>
              </div>
            </SpaceHUD>
          </div>
        }
      />
    </SectionLayout>
  );
};