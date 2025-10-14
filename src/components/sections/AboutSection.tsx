import React from 'react';
import profileImage from "figma:asset/ccb5263e68f9d44fca6b4c7c752e36a4e840e93f.png";
import { PrimarySpaceHUD, SecondarySpaceHUD, AccentSpaceHUD } from '../SpaceHUD';
import { SectionLayout, ThreeColumnLayout } from '../SectionLayout';
import { useResponsive } from '../ui/responsive-context';

interface AboutSectionProps {
  isActive: boolean;
}

export function AboutSection({ isActive }: AboutSectionProps) {
  const responsive = useResponsive();
  
  // Calculate responsive font sizes
  let nameFontSize = 48;
  let titleFontSize = 48;
  let statFontSize = 32;
  let gapSize = 16;
  
  if (responsive.width <= 1200) {
    nameFontSize = 28;
    titleFontSize = 28;
    statFontSize = 22;
    gapSize = 12;
  } else if (responsive.width <= 1400) {
    nameFontSize = 36;
    titleFontSize = 36;
    statFontSize = 26;
    gapSize = 14;
  } else if (responsive.width <= 1600) {
    nameFontSize = 42;
    titleFontSize = 42;
    statFontSize = 28;
    gapSize = 16;
  }
  
  return (
    <SectionLayout isActive={isActive} sectionId="about">
      <ThreeColumnLayout
        left={
          <div className="flex flex-col h-full justify-between" style={{ gap: `${responsive.spacing.lg}px` }}>
            <div className="flex flex-col hud-stagger-1" style={{ gap: `${responsive.spacing.lg}px` }}>
              <div className="flex flex-col text-white" style={{ gap: `${responsive.spacing.md}px` }}>
                <div className="font-bold text-[#facc14] uppercase" style={{ fontSize: `${nameFontSize}px` }}>
                  <p>KARTHIK PRABAKARAN</p>
                </div>
                <div className="font-normal text-white uppercase" style={{ fontSize: `${titleFontSize}px` }}>
                  <p>Sr. Graphic Designer | AI Generalist</p>
                </div>
              </div>
            </div>
            
            <div className="flex hud-stagger-2" style={{ gap: `${gapSize * 2}px` }}>
              <div className="flex flex-col text-white" style={{ gap: `${responsive.spacing.sm}px` }}>
                <div className="font-medium" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                  <p>EXPERIENCE</p>
                </div>
                <div className="font-bold" style={{ fontSize: `${statFontSize}px` }}>
                  <p>10+ YEARS</p>
                </div>
              </div>
              <div className="flex flex-col text-white" style={{ gap: `${responsive.spacing.sm}px` }}>
                <div className="font-medium" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                  <p>LOCATION</p>
                </div>
                <div className="font-bold" style={{ fontSize: `${statFontSize}px` }}>
                  <p>BANGALORE</p>
                </div>
              </div>
            </div>
            
            <div className="hud-stagger-3">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Karthik_Prabakaran_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="font-mono uppercase tracking-widest transition-all duration-300 relative overflow-hidden w-full"
                style={{
                  border: '2px solid #FACC14',
                  backgroundColor: 'black',
                  color: '#FACC14',
                  boxShadow: '0 0 20px #FACC1440, inset 0 0 10px #FACC1420',
                  textShadow: '0 0 8px #FACC14',
                  padding: `${responsive.spacing.sm}px ${responsive.spacing.lg}px`,
                  fontSize: `${responsive.fontSize.base * 0.75}px`
                }}
              >
                <span className="relative z-10 flex items-center justify-center" style={{ gap: `${responsive.spacing.xs}px` }}>
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
        }
        middle={
          <div className="flex flex-col h-full" style={{ gap: `${responsive.spacing.lg}px` }}>
            <div className="hud-stagger-4">
              <PrimarySpaceHUD title="SUMMARY" size="medium" glow={true}>
                <div className="font-medium text-white leading-relaxed" style={{ fontSize: `${responsive.fontSize.base}px` }}>
                  <p>Developer focused on delightful UIs, strong architecture, and performance. I enjoy TypeScript, React, Node, and building small tools that make teams faster.</p>
                </div>
              </PrimarySpaceHUD>
            </div>
            
            <div className="flex items-center justify-center flex-1 hud-stagger-5">
              <div 
                className="relative w-full h-full flex items-center justify-center" 
                style={{ maxWidth: responsive.width <= 1200 ? '250px' : '350px' }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg flex items-center justify-center">
                  <img alt="Profile" className="w-full h-full object-contain" src={profileImage} />
                </div>
              </div>
            </div>
          </div>
        }
        right={
          <div className="flex flex-col h-full" style={{ gap: `${responsive.spacing.lg}px` }}>
            <div className="hud-stagger-5">
              <SecondarySpaceHUD title="BASIC DETAILS" glow={true}>
                <div className="flex flex-col text-white" style={{ gap: `${responsive.spacing.md}px` }}>
                  <div className="flex flex-col" style={{ gap: `${responsive.spacing.xs}px` }}>
                    <span className="opacity-80 font-medium" style={{ fontSize: `${responsive.fontSize.base * 0.875}px` }}>DOB</span>
                    <span className="font-bold" style={{ fontSize: `${responsive.fontSize.lg * 1.1}px` }}>09-04-1992</span>
                  </div>
                  <div className="flex flex-col" style={{ gap: `${responsive.spacing.xs}px` }}>
                    <span className="opacity-80 font-medium" style={{ fontSize: `${responsive.fontSize.base * 0.875}px` }}>Marital Status</span>
                    <span className="font-bold" style={{ fontSize: `${responsive.fontSize.lg * 1.1}px` }}>Single</span>
                  </div>
                  <div className="flex flex-col" style={{ gap: `${responsive.spacing.xs}px` }}>
                    <span className="opacity-80 font-medium" style={{ fontSize: `${responsive.fontSize.base * 0.875}px` }}>Languages</span>
                    <span className="font-bold" style={{ fontSize: `${responsive.fontSize.lg * 1.1}px` }}>Tamil, English</span>
                  </div>
                </div>
              </SecondarySpaceHUD>
            </div>

            <div className="hud-stagger-6">
              <AccentSpaceHUD title="CORE SKILLS" glow={true}>
                <div className="flex flex-col font-medium text-white" style={{ gap: `${responsive.spacing.sm}px`, fontSize: `${responsive.fontSize.base}px` }}>
                  {['Graphic Design', 'UI/UX', 'Gen AI', 'Branding'].map((skill) => (
                    <div key={skill}>
                      <ul>
                        <li className="list-disc ml-6">
                          <span>{skill}</span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </AccentSpaceHUD>
            </div>

            <div className="hud-stagger-7">
              <SecondarySpaceHUD title="EDUCATION" glow={true}>
                <div className="flex justify-between items-start" style={{ gap: `${responsive.spacing.md}px` }}>
                  <div className="flex flex-col font-medium text-white" style={{ gap: `${responsive.spacing.sm}px`, fontSize: `${responsive.fontSize.base}px` }}>
                    <ul>
                      <li className="list-disc ml-6">
                        <span>B.E (EEE)</span>
                      </li>
                    </ul>
                    <ul>
                      <li className="list-disc ml-6">
                        <span>AI Technology</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col font-medium text-white text-right" style={{ gap: `${responsive.spacing.sm}px`, fontSize: `${responsive.fontSize.base * 0.875}px` }}>
                    <span>2010 - 2015</span>
                    <span>2023 - 2024</span>
                  </div>
                </div>
              </SecondarySpaceHUD>
            </div>
          </div>
        }
      />
    </SectionLayout>
  );
}
