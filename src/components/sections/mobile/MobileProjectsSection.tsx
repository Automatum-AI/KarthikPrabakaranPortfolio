import React, { useState } from 'react';
import { SpaceHUD } from '../../SpaceHUD';
import { projects } from '../../../content/website-content';

interface MobileProjectsSectionProps {
  isActive: boolean;
}

export function MobileProjectsSection({ isActive }: MobileProjectsSectionProps) {
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
    <div 
      className="section-wrapper"
      data-section="projects"
      data-active={isActive}
    >
      <div className="h-full w-full flex flex-col px-4 py-4">
        <div className="flex-1 flex flex-col justify-evenly gap-3 overflow-y-auto">
          {/* Header */}
          <div className="hud-stagger-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full animate-pulse"
                   style={{ backgroundColor: getStatusColor(selectedProject.status) }}></div>
              <span className="text-white font-mono uppercase tracking-wider"
                    style={{ fontSize: 'clamp(12px, 3.5vw, 16px)' }}>
                PROJECTS
              </span>
            </div>
          </div>

          {/* Project Title */}
          <div className="hud-stagger-2">
            <h2 
              className="uppercase"
              style={{ 
                color: getStatusColor(selectedProject.status),
                textShadow: `0 0 12px ${getStatusColor(selectedProject.status)}80`,
                fontSize: 'clamp(24px, 7vw, 36px)',
                fontWeight: 900,
                lineHeight: 1.2
              }}
            >
              {selectedProject.title}
            </h2>
          </div>

          {/* Navigation */}
          <div className="hud-stagger-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                className="px-3 py-1.5 font-mono transition-all duration-300"
                style={{
                  border: `1px solid ${getStatusColor(selectedProject.status)}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: getStatusColor(selectedProject.status),
                  fontSize: 'clamp(11px, 3.2vw, 13px)'
                }}
              >
                ←
              </button>
              
              <span className="text-white/40 font-mono"
                    style={{ fontSize: 'clamp(10px, 3vw, 11px)' }}>
                {displayProjects.findIndex(p => p.id === selectedProject.id) + 1} / {displayProjects.length}
              </span>
              
              <button
                onClick={handleNext}
                className="px-3 py-1.5 font-mono transition-all duration-300"
                style={{
                  border: `1px solid ${getStatusColor(selectedProject.status)}`,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: getStatusColor(selectedProject.status),
                  fontSize: 'clamp(11px, 3.2vw, 13px)'
                }}
              >
                →
              </button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="hud-stagger-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5"
                 style={{
                   backgroundColor: `${getStatusColor(selectedProject.status)}20`,
                   border: `1px solid ${getStatusColor(selectedProject.status)}`,
                   color: getStatusColor(selectedProject.status),
                   fontSize: 'clamp(10px, 3vw, 12px)',
                   fontWeight: 900
                 }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                   style={{ backgroundColor: getStatusColor(selectedProject.status) }}></div>
              {selectedProject.status.toUpperCase()}
            </div>
          </div>

          {/* Description */}
          <div className="hud-stagger-5">
            <div 
              className="p-3 border-l-2 leading-relaxed"
              style={{ 
                borderColor: getStatusColor(selectedProject.status),
                color: getStatusColor(selectedProject.status),
                backgroundColor: `${getStatusColor(selectedProject.status)}10`,
                fontSize: 'clamp(12px, 3.5vw, 14px)'
              }}
            >
              {selectedProject.description}
            </div>
          </div>

          {/* Details */}
          <div className="hud-stagger-6">
            <SpaceHUD variant={getStatusVariant(selectedProject.status)} title="DETAILS" size="small" glow={true}>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b"
                     style={{ 
                       borderColor: `${getStatusColor(selectedProject.status)}30`,
                       fontSize: 'clamp(11px, 3.2vw, 13px)'
                     }}>
                  <span className="text-white/60 font-mono">Category</span>
                  <span className="text-white font-mono">{selectedProject.category}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b"
                     style={{ 
                       borderColor: `${getStatusColor(selectedProject.status)}30`,
                       fontSize: 'clamp(11px, 3.2vw, 13px)'
                     }}>
                  <span className="text-white/60 font-mono">Year</span>
                  <span className="text-white font-mono">{selectedProject.year}</span>
                </div>
                
                {selectedProject.impact && (
                  <div className="flex justify-between items-center pb-2 border-b"
                       style={{ 
                         borderColor: `${getStatusColor(selectedProject.status)}30`,
                         fontSize: 'clamp(11px, 3.2vw, 13px)'
                       }}>
                    <span className="text-white/60 font-mono">Impact</span>
                    <span className="text-white font-mono">{selectedProject.impact}</span>
                  </div>
                )}
              </div>
            </SpaceHUD>
          </div>

          {/* Technologies */}
          <div className="hud-stagger-7 mb-4">
            <SpaceHUD variant={getStatusVariant(selectedProject.status)} title="TECH STACK" size="small" glow={true}>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <div 
                    key={tech}
                    className="px-2 py-1 font-mono"
                    style={{
                      backgroundColor: `${getStatusColor(selectedProject.status)}15`,
                      border: `1px solid ${getStatusColor(selectedProject.status)}40`,
                      color: 'white',
                      fontSize: 'clamp(10px, 3vw, 11px)'
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </SpaceHUD>
          </div>
        </div>
      </div>
    </div>
  );
}
