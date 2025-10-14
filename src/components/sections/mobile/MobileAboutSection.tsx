import React from 'react';
import profileImage from "figma:asset/ccb5263e68f9d44fca6b4c7c752e36a4e840e93f.png";
import { PrimarySpaceHUD, SecondarySpaceHUD } from '../../SpaceHUD';

interface MobileAboutSectionProps {
  isActive: boolean;
}

export function MobileAboutSection({ isActive }: MobileAboutSectionProps) {
  return (
    <div 
      className="section-wrapper"
      data-section="about"
      data-active={isActive}
    >
      <div className="h-full w-full flex flex-col px-4 py-4">
        <div className="flex-1 flex flex-col justify-evenly gap-3 overflow-y-auto">
          {/* Header */}
          <div className="hud-stagger-1">
            <div className="text-[#facc14] uppercase"
                 style={{ 
                   fontSize: 'clamp(20px, 6vw, 32px)',
                   fontWeight: 900,
                   textShadow: '0 0 12px rgba(250, 204, 20, 0.8)'
                 }}>
              KARTHIK PRABAKARAN
            </div>
            <div className="text-white uppercase mt-2"
                 style={{ fontSize: 'clamp(14px, 4vw, 20px)' }}>
              Sr. Graphic Designer | AI Generalist
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 hud-stagger-2">
            <div className="flex flex-col gap-1 text-white">
              <div style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>EXPERIENCE</div>
              <div style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 900 }}>10+ YEARS</div>
            </div>
            <div className="flex flex-col gap-1 text-white">
              <div style={{ fontSize: 'clamp(12px, 3.5vw, 14px)' }}>LOCATION</div>
              <div style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 900 }}>BANGALORE</div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="hud-stagger-3 flex justify-center my-2">
            <div className="relative w-48 h-48 overflow-hidden rounded-lg">
              <img alt="Profile" className="w-full h-full object-cover object-top" src={profileImage} />
            </div>
          </div>

          {/* Summary */}
          <div className="hud-stagger-4">
            <PrimarySpaceHUD title="SUMMARY" size="small" glow={true}>
              <div className="text-white leading-relaxed" style={{ fontSize: 'clamp(13px, 3.8vw, 15px)' }}>
                Developer focused on delightful UIs, strong architecture, and performance. I enjoy TypeScript, React, Node, and building small tools that make teams faster.
              </div>
            </PrimarySpaceHUD>
          </div>

          {/* Education */}
          <div className="hud-stagger-5">
            <SecondarySpaceHUD title="EDUCATION" glow={true}>
              <div className="flex flex-col gap-2 text-white">
                <div className="flex justify-between items-start">
                  <span style={{ fontSize: 'clamp(13px, 3.8vw, 15px)' }}>• B.E (EEE)</span>
                  <span style={{ fontSize: 'clamp(11px, 3.2vw, 13px)' }} className="opacity-60">2010 - 2015</span>
                </div>
                <div className="flex justify-between items-start">
                  <span style={{ fontSize: 'clamp(13px, 3.8vw, 15px)' }}>• AI Technology</span>
                  <span style={{ fontSize: 'clamp(11px, 3.2vw, 13px)' }} className="opacity-60">2023 - 2024</span>
                </div>
              </div>
            </SecondarySpaceHUD>
          </div>

          {/* Download Resume Button */}
          <div className="hud-stagger-6 mb-4">
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Karthik_Prabakaran_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-full px-4 py-3 font-mono uppercase tracking-widest transition-all duration-300 relative overflow-hidden"
              style={{
                border: '2px solid #FACC14',
                backgroundColor: 'black',
                color: '#FACC14',
                boxShadow: '0 0 20px #FACC1440, inset 0 0 10px #FACC1420',
                textShadow: '0 0 8px #FACC14',
                fontSize: 'clamp(10px, 3vw, 12px)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>↓</span>
                <span>DOWNLOAD RESUME</span>
              </span>
              <div 
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, #FACC1440, transparent)',
                  animation: 'advanced-scan-horizontal 3s ease-in-out infinite'
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
