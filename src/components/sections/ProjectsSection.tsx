import React, { useState } from 'react';
import { SpaceHUD } from '../SpaceHUD';
import { SectionLayout, ThreeColumnLayout } from '../SectionLayout';
import { projects } from '../../content/website-content';

interface ProjectsSectionProps {
  isActive: boolean;
}

export function ProjectsSection({ isActive }: ProjectsSectionProps) {
  // Show only first 3 projects
  const displayProjects = projects.slice(0, 3);
  const [selectedProject, setSelectedProject] = useState(displayProjects[0]);
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live': return '#10B981';
      case 'beta': return '#FACC14';
      case 'prototype': return '#F59E0B';
      case 'exhibited': return '#20DBE9';
      case 'implemented': return '#20DBE9';
      default: return 'rgba(255, 255, 255, 0.6)';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI Development': return '#10B981';
      case 'Web Design': return '#20DBE9';
      case 'AI Art': return '#A855F7';
      case 'Design System': return '#20DBE9';
      case 'VR/AR': return '#EC4899';
      default: return 'rgba(255, 255, 255, 0.6)';
    }
  };

  const getStatusVariant = (status: string): "primary" | "secondary" | "accent" | "warning" | "danger" | "success" => {
    switch (status.toLowerCase()) {
      case 'live': return 'success';
      case 'beta': return 'primary';
      case 'prototype': return 'warning';
      case 'exhibited': return 'accent';
      case 'implemented': return 'accent';
      default: return 'secondary';
    }
  };

  const handlePrevious = () => {
    const currentIndex = displayProjects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : displayProjects.length - 1;
    setSelectedProject(displayProjects[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = displayProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = currentIndex < displayProjects.length - 1 ? currentIndex + 1 : 0;
    setSelectedProject(displayProjects[nextIndex]);
  };

  return (
    <SectionLayout isActive={isActive} sectionId="projects">
      <ThreeColumnLayout
        left={
          <div className="flex flex-col gap-6">
            <div className="hud-stagger-1 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full animate-pulse"
                   style={{ backgroundColor: getStatusColor(selectedProject.status) }}></div>
              <span className="text-white font-mono text-lg tracking-wider uppercase">
                PROJECT OVERVIEW
              </span>
            </div>
            
            <div 
              className="hud-stagger-2 p-4 border-l-2 text-sm leading-relaxed transition-all duration-300"
              style={{ 
                borderColor: getStatusColor(selectedProject.status),
                color: getStatusColor(selectedProject.status),
                backgroundColor: `${getStatusColor(selectedProject.status)}10`
              }}
            >
              {selectedProject.description}
            </div>
          </div>
        }
        middle={
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-4">
              <div className="hud-stagger-3">
                <h2 
                  className="text-[48px] font-bold"
                  style={{ 
                    color: getStatusColor(selectedProject.status),
                    textShadow: `0 0 15px ${getStatusColor(selectedProject.status)}80`
                  }}
                >
                  {selectedProject.title}
                </h2>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 font-mono text-sm transition-all duration-300 relative overflow-hidden"
                  style={{
                    border: `2px solid ${getStatusColor(selectedProject.status)}`,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: getStatusColor(selectedProject.status),
                    boxShadow: `0 0 15px ${getStatusColor(selectedProject.status)}30`,
                  }}
                >
                  ←
                </button>
                
                <span className="text-white/40 font-mono text-xs">
                  {displayProjects.findIndex(p => p.id === selectedProject.id) + 1} / {displayProjects.length}
                </span>
                
                <button
                  onClick={handleNext}
                  className="px-4 py-2 font-mono text-sm transition-all duration-300 relative overflow-hidden"
                  style={{
                    border: `2px solid ${getStatusColor(selectedProject.status)}`,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: getStatusColor(selectedProject.status),
                    boxShadow: `0 0 15px ${getStatusColor(selectedProject.status)}30`,
                  }}
                >
                  →
                </button>
              </div>
            </div>
            
            {/* Futuristic Gallery Icon */}
            <div className="hud-stagger-4 relative group">
              <div 
                className="relative rounded-lg overflow-hidden"
                style={{ 
                  backgroundColor: `${getStatusColor(selectedProject.status)}05`,
                  border: `2px solid ${getStatusColor(selectedProject.status)}40`,
                  aspectRatio: '16/9'
                }}
              >
                {/* Corner accents */}
                <div 
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2"
                  style={{ borderColor: getStatusColor(selectedProject.status) }}
                />
                <div 
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2"
                  style={{ borderColor: getStatusColor(selectedProject.status) }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2"
                  style={{ borderColor: getStatusColor(selectedProject.status) }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2"
                  style={{ borderColor: getStatusColor(selectedProject.status) }}
                />
                
                {/* Scanning lines */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      ${getStatusColor(selectedProject.status)}20 2px,
                      ${getStatusColor(selectedProject.status)}20 4px
                    )`
                  }}
                />
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {/* Gallery icon */}
                    <svg 
                      className="w-20 h-20 mx-auto mb-4 transition-all duration-300 group-hover:scale-110" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1}
                      style={{ 
                        stroke: getStatusColor(selectedProject.status),
                        filter: `drop-shadow(0 0 10px ${getStatusColor(selectedProject.status)}80)`
                      }}
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                    </svg>
                    <div 
                      className="text-xs font-mono uppercase tracking-widest"
                      style={{ 
                        color: getStatusColor(selectedProject.status),
                        textShadow: `0 0 8px ${getStatusColor(selectedProject.status)}80`
                      }}
                    >
                      PROJECT GALLERY
                    </div>
                  </div>
                </div>
                
                {/* Animated scan line */}
                <div 
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${getStatusColor(selectedProject.status)}40, transparent)`,
                    animation: 'advanced-scan-vertical 3s ease-in-out infinite'
                  }}
                />
                
                {/* Grid overlay */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(${getStatusColor(selectedProject.status)} 1px, transparent 1px),
                      linear-gradient(90deg, ${getStatusColor(selectedProject.status)} 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>
            </div>
          </div>
        }
        right={
          <div className="flex flex-col gap-4">
            <div className="hud-stagger-5">
              <SpaceHUD variant={getStatusVariant(selectedProject.status)} title="PROJECT DETAILS" size="medium" glow={true}>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white/60 font-mono text-xs mb-1">
                    CATEGORY
                  </div>
                  <div className="text-white">{selectedProject.category}</div>
                </div>
                <div>
                  <div className="text-white/60 font-mono text-xs mb-1">
                    STATUS
                  </div>
                  <div className="text-white">{selectedProject.status}</div>
                </div>
                <div>
                  <div className="text-white/60 font-mono text-xs mb-1">
                    YEAR
                  </div>
                  <div className="text-white">{selectedProject.year}</div>
                </div>
              </div>
              </SpaceHUD>
            </div>
            
            <div className="hud-stagger-6">
              <SpaceHUD variant={getStatusVariant(selectedProject.status)} title="TECH STACK" size="medium" glow={true}>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 font-mono text-xs rounded transition-all duration-300 text-white"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
              </SpaceHUD>
            </div>
          </div>
        }
      />
    </SectionLayout>
  );
}
